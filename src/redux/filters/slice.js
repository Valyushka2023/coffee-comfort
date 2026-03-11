import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: 'Kyiv, Ukraine',
  vehicleEquipment: [],
  vehicleType: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setVehicleEquipment: (state, action) => {
      state.vehicleEquipment = action.payload;
    },
    setVehicleType: (state, action) => {
      state.vehicleType = action.payload;
    },
  },
});

export const { setLocation, setVehicleEquipment, setVehicleType } =
  filtersSlice.actions;
export default filtersSlice.reducer;
