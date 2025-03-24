import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Common data
  roofPanels: [],

  // Page 1 data
  roofArea: null,
  selectedHouseType: null,

  // Page 2 data
  peopleCount: 0,
  householdConsumption: "0",
  timeOfUse: "Morgens & Abends",

  // Page 3 data
  roofType: "",

  // Page 4 data
  roofPitchAngle: "",

  // Page 5 data
  roofMaterial: "",

  // Page 6 data
  heatPump: "Nicht Geplant",
  chargingStation: "Nicht Geplant",
  totalConsumption: "0",

  // Page 7 data
  isInterestInWallbox: "",

  // Page 8 data
  solarPanelOption: "",

  // Page 9 data
  solarPanelOption2: "",

  // Page 10 data
  installationTime: null,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setRoofArea: (state, action) => {
      return { ...state, roofArea: action.payload };
    },
    updateRoofPanels: (state, action) => {
      return { ...state, roofPanels: action.payload };
    },
  },
});

export const {
  updateFormData,
  setRoofArea,
  updateRoofPanels,
  setMapHeightAndWidthDetails,
} = formSlice.actions;

export const selectFormData = (state) => state.form;

export default formSlice.reducer;
