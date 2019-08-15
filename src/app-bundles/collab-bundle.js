import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import GeoJSON from 'ol/format/GeoJSON';

const geoJSON = new GeoJSON();

export default {

  name: 'collab',

  getReducer: () => {
    const initialData = {
      layer: null,
      lastMessage: null,
      shouldInitialize: false,
      shouldAnswerMessage: false,
      shouldFetch: false
    }

    return (state = initialData, { type, payload }) => {
      switch(type){
        case 'COLLAB_INITIALIZE_START':
        case 'COLLAB_INITIALIZE_FINISH':
        case 'COLLAB_ANSWER_MESSAGE_START':
        case 'COLLAB_FETCH_START':
          return Object.assign({}, state, payload);
        case 'WEBSOCKET_MESSAGE':
          return Object.assign({}, state, {
            lastMessage: payload.e,
            shouldAnswerMessage: true
          })
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
  doCollabInitialize: () => ({ dispatch, store }) => {
    dispatch({
      type: 'COLLAB_INITIALIZE_START',
      payload: {
        shouldInitialize: false
      }
    })

    const map = store.selectMap();
    const src = new VectorSource();
    const layer = new VectorLayer({
      source: src,
      style: new Style({
        image: new Circle({
          radius: 5,
          stroke: new Stroke({
            color: '#ffffff',
            width: 3
          }),
          fill: new Fill({
            color: '#ed28cc'
          })
        }),
        stroke: new Stroke({
          color: '#ed28cc',
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(237, 40, 204, 0.5)'
        })
      })
    })
    map.addLayer(layer);

    dispatch({
      type: 'COLLAB_INITIALIZE_FINISH',
      payload: {
        layer: layer,
        shouldFetch: true
      }
    })

  },

  doCollabAnswerMessage: (lastMessage) => ({ dispatch, store }) => {
    dispatch({
      type: 'COLLAB_ANSWER_MESSAGE_START',
      payload: {
        shouldAnswerMessage: false
      }
    })
    const myEdipi = store.selectAuthEdipi();
    const data = JSON.parse(lastMessage.data);
    if(data.edipi === myEdipi) return null;

    switch(data.action){
      case 'insert':
        store.doCollabHandleInsert(data);
        break;
      case 'update':
        store.doCollabHandleDelete(data);
        store.doCollabHandleInsert(data);
        break;
      case 'delete':
        store.doCollabHandleDelete(data);
        break;
      default:
        console.log('who knows what just happened...');
    }
  },

  doCollabHandleInsert: (data) => ({ dispatch, store, apiGet }) => {
    const layer = store.selectCollabLayer();
    apiGet(`/data/${data.edipi}/${data.id}`, (err, response, body) => {
      const features = geoJSON.readFeatures(body);
      const source = layer.getSource();
      source.addFeatures(features);
    })
  },

  doCollabHandleDelete: (data) => ({ dispatch, store }) => {
    const layer = store.selectCollabLayer();
    const source = layer.getSource();
    const features = source.getFeatures();
    features.forEach((feature) => {
      if(feature.getId() === data.id){
        source.removeFeature(feature);
      }
    })
  },

  doCollabFetch: () => ({dispatch, store, apiGet }) => {
    dispatch({
      type: 'COLLAB_FETCH_START',
      payload: {
        shouldFetch: false
      }
    })
    const layer = store.selectCollabLayer();
    apiGet('/data', (err, response, body) => {
      if(err || response.statusCode !== 200){
        console.error(response);
      }else{
        const features = geoJSON.readFeatures(body);
        const source = layer.getSource();
        source.addFeatures(features);
      }
    })
  },

  // selectors
  selectCollabLayer: (state) => {
    return state.collab.layer;
  },

  // reactors
  reactCollabShouldInitialize: (state) => {
    if(state.collab.shouldInitialize){
      return { actionCreator: 'doCollabInitialize' };
    }
  },

  reactCollabShouldAnswerMessage: (state) => {
    if(state.collab.shouldAnswerMessage){
      return { 
        actionCreator: 'doCollabAnswerMessage',
        args: [ state.collab.lastMessage ]
      };
    }
  },

  reactCollabShouldFetch: (state) => {
    if(state.collab.shouldFetch){
      console.log('shouldFetch')
      return { actionCreator: 'doCollabFetch' };
    }
  }

}