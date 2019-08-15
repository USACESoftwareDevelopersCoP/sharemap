import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Draw from 'ol/interaction/Draw';
import Select from 'ol/interaction/Select';

export default {

  name: 'draw',

  getReducer: () => {
    const initialData = {
      layer: null,
      drawPoints: null,
      drawLines: null,
      drawPolygons: null,
      selectInteraction: null,
      activeInteraction: null,
      shouldInitialize: false
    }

    return (state = initialData, action) => {
      const { type, payload } = action;
      switch(type){
        case 'DRAW_ADD_INTERACTION':
        case 'DRAW_REMOVE_INTERACTION':
        case 'DRAW_INITIALIZE_STARTED':
        case 'DRAW_INITIALIZE_FINISHED':
          return Object.assign({}, state, payload);
        case 'MAP_INITIALIZED':
          return Object.assign({}, state, {
            shouldInitialize: true
          })
        default:
          return state;
      }
    }

  }, 

  // action creators
  doDrawAddInteraction: (interaction) => ({ dispatch, store }) => {
    store.doDrawRemoveInteraction();
    const map = store.selectMap();
    map.addInteraction(interaction);
    dispatch({
      type: 'DRAW_ADD_INTERACTION',
      payload: {
        activeInteraction: interaction
      }
    })
  },

  doDrawRemoveInteraction: () => ({ dispatch, store }) => {
    const map = store.selectMap();
    const active = store.selectDrawActiveInteraction();
    if(active) map.removeInteraction(active);
    dispatch({
      type: 'DRAW_REMOVE_INTERACTION',
      payload: {
        activeInteraction: null
      }
    })
  },

  doDrawInitialize: () => {
    return ({ dispatch, store }) => {
      dispatch({
        type: 'DRAW_INITIALIZE_STARTED',
        payload: {
          shouldInitialize: false
        }
      })

      const map = store.selectMap();
      const src = new VectorSource();
      const layer = new VectorLayer({
        source: src
      })
      map.addLayer(layer);

      const drawPoints = new Draw({
        type: 'Point',
        source: src
      })

      const drawLines = new Draw({
        type: 'LineString',
        source: src
      })

      const drawPolygons = new Draw({
        type: 'Polygon',
        source: src
      })

      const selectInteraction = new Select({
        layers: [ layer ]
      })

      dispatch({
        type: 'DRAW_INITIALIZE_FINISHED',
        payload: {
          layer: layer,
          drawPoints: drawPoints,
          drawLines: drawLines,
          drawPolygons: drawPolygons,
          selectInteraction: selectInteraction
        }
      })
    }
  },

  doDrawDeleteSelected: () => ({ dispatch, store }) => {
    const layer = store.selectDrawLayer();
    const source = layer.getSource();
    const selectInteraction = store.selectDrawSelectInteraction();
    const features = selectInteraction.getFeatures();
    features.forEach((feature) => {
      source.removeFeature(feature);
    })
    features.clear();
    dispatch({
      type: 'DRAW_DELETE_SELECTED',
      payload: {}
    })
  },

  // selectors
  selectDrawLayer: (state) => {
    return state.draw.layer;
  },

  selectDrawPoints: (state) => {
    return state.draw.drawPoints;
  },

  selectDrawLines: (state) => {
    return state.draw.drawLines;
  },

  selectDrawPolygons: (state) => {
    return state.draw.drawPolygons;
  },

  selectDrawSelectInteraction: (state) => {
    return state.draw.selectInteraction;
  },

  selectDrawActiveInteraction: (state) => {
    return state.draw.activeInteraction;
  },

  // reactors
  reactDrawShouldInitialize: (state) => {
    if(state.draw.shouldInitialize){
      return { actionCreator: 'doDrawInitialize' };
    }
  }

}