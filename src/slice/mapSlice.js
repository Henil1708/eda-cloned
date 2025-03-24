import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Common data
  mapDetails: {
    clientWidth: 0,
    clientHeight: 0,
    bounds: {
      northEast: {
        lat: 0,
        lng: 0,
      },
      southWest: {
        lat: 0,
        lng: 0,
      },
    },
  },
};

export const formSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapProportions: (state, action) => {
      return {
        ...state,
        mapDetails: {
          ...state.mapDetails,
          clientWidth: action.payload.clientWidth,
          clientHeight: action.payload.clientHeight,
        },
      };
    },
    setBounds: (state, action) => {
      return {
        ...state,
        mapDetails: {
          ...state.mapDetails,
          bounds: {
            northEast: action.payload.northEast,
            southWest: action.payload.southWest,
          },
        },
      };
    },
  },
});

export const { setMapProportions, setBounds } = formSlice.actions;

export const selectMapData = (state) => {
  return state.map.mapDetails;
};

export default formSlice.reducer;
