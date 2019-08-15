import GeoJSON from 'ol/format/GeoJSON';

const geoJSON = new GeoJSON();

export default {

  name: 'drawData',

  getReducer: () => {
    const initialData = {
      shouldFetch: false
    }

    return (state = initialData, { type, payload }) => {
      switch(type){
        case 'DRAW_DATA_FETCH_START':
          return Object.assign({}, state, payload);
        case 'DRAW_INITIALIZE_FINISHED':
          return Object.assign({}, state, {
            shouldFetch: true
          })
        default:
          return state;
      }
    }
  },

  // action creators
  doDrawDataSave: (e) => ({ dispatch, store, apiPost }) => {
    const feature = e.feature;
    const id = feature.getId();
    if(id) return null;
    const geoJSONFeature = geoJSON.writeFeature(feature);
    apiPost('/data', JSON.parse(geoJSONFeature), (err, response, body) => {
      if(err || response.statusCode !== 200){
        console.error(err, response);
      }else{
        feature.setId(body.id);
      }
    })
  },

  doDrawDataUpdate: (e) => ({ dispatch, store, apiPut }) => {
    const feature = e.feature;
    const id = feature.getId();
    if(!id) return null;
    const geoJSONFeature = geoJSON.writeFeature(feature);
    apiPut(`/data/${id}`, JSON.parse(geoJSONFeature), (err, response, body) => {
      if(err || response.statusCode !== 200){
        console.error(err, response);
      }
    })
  },

  doDrawDataFetch: () => ({ dispatch, store, apiGet }) => {
    dispatch({
      type: 'DRAW_DATA_FETCH_START',
      payload: {
        shouldFetch: false
      }
    })

    const layer = store.selectDrawLayer();

    apiGet('/mydata', (err, response, body) => {
      if(err || response.statusCode !== 200){
        console.error(err, response);
      }else{
        const features = geoJSON.readFeatures(body);
        const source = layer.getSource();
        source.addFeatures(features);
      }
    })
  },

  doDrawDataDelete: (e) => ({ dispatch, store, apiDelete }) => {
    const feature = e.feature;
    const id = feature.getId();
    if(!id) return null;
    apiDelete(`/data/${id}`, (err, response, body) => {
      if(err || response.statusCode !== 200){
        console.error(err, response);
      }
    })
  },

  // selectors

  // reactors
  reactDrawDataShouldFetch: (state) => {
    if(state.drawData.shouldFetch){
      return { actionCreator: 'doDrawDataFetch' };
    }
  }
}