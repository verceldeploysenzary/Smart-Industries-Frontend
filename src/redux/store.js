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
import Widget2Slice from "./fetchWidget2";
import Widget3Slice from "./fetchWidget3";
import Widget4Slice from "./fetchWidget4";

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
    Widget1Slice: Widget1Slice.reducer,
    Widget2Slice: Widget2Slice.reducer,
    Widget3Slice: Widget3Slice.reducer,
    Widget4Slice: Widget4Slice.reducer,
  },
});

export default store;
