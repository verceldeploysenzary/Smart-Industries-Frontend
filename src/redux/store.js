import { configureStore } from "@reduxjs/toolkit";
import AdminDashboardSlice from "./slice";
import DeviceAtributesSlice from "./FetchDeviceAtributes";
import AllDashboardSlice from "./fetchalldashboards";
import AllDevicesSlice from "./fetchAllDevices";
import DateGenerateSlice from "./dateGenerate";
import IdStateSlice from "./IdState";
import OneDeviceSlice from "./fetchOneDevice";
import NandinaDeviceSlice from "./getNandinaDevices";
import ManyDevicesSlice from "./fetchManyDevices";
import Widget1Slice from "./Widget1";

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['your/action/type'], 
        ignoredPaths: ['your/path/to/ignore'], 
      },
    }),
  reducer: { 
    AdminDashboardSlice: AdminDashboardSlice.reducer,
    AllDevicesSlice: AllDevicesSlice.reducer,
    AllDashboardSlice: AllDashboardSlice.reducer,
    DeviceAtributesSlice: DeviceAtributesSlice.reducer,
    DateGenerateSlice: DateGenerateSlice.reducer,
    IdStateSlice: IdStateSlice.reducer,
    OneDeviceSlice: OneDeviceSlice.reducer,
    NandinaDeviceSlice: NandinaDeviceSlice.reducer,
    ManyDevicesSlice: ManyDevicesSlice.reducer,
    Widget1Slice: Widget1Slice.reducer
  },
});

export default store;
