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

const store = configureStore({
    reducer:{ 
        AdminDashboardSlice: AdminDashboardSlice.reducer,
        AllDevicesSlice: AllDevicesSlice.reducer,
        AllDashboardSlice: AllDashboardSlice.reducer,
        DeviceAtributesSlice: DeviceAtributesSlice.reducer,
        DateGenerateSlice: DateGenerateSlice.reducer,
        IdStateSlice: IdStateSlice.reducer,
        OneDeviceSlice: OneDeviceSlice.reducer,
        NandinaDeviceSlice: NandinaDeviceSlice.reducer,
        ManyDevicesSlice: ManyDevicesSlice.reducer,
    }
})

export default store
