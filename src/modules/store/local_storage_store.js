import create from "zustand";
import { persist, devtools } from "zustand/middleware";

let store = (set) => ({
    token: null,
    setToken: (item) => set(() => ({token: item})),
    calendarTableSetting: [],
    setCalendarTableSetting: (item) => set(() => ({calendarTableSetting: item})),
    diseaseHistoryTableSetting: [],
    setDiseaseHistoryTableSetting: (item) => set(() => ({diseaseHistoryTableSetting: item})),
    visitsTableSetting: [],
    setVisitsTableSetting: (item) => set(() => ({visitsTableSetting: item})),
    analysisTableSetting: [],
    setAnalysisTableSetting: (item) => set(() => ({analysisTableSetting: item})),
    treatmentTableTableSetting: [],
    setTreatmentTableTableSetting: (item) => set(() => ({treatmentTableTableSetting: item})),
    treatmentMedicationsTableSetting: [],
    setTreatmentMedicationsTableSetting: (item) => set(() => ({treatmentMedicationsTableSetting: item})),

    managersTabs: [],
    setManagersTabs: (item) => set(() => ({managersTabs: item})),
    managersPlaces: [],
    setManagersPlaces: (item) => set(() => ({managersPlaces: item})),
    pathologistsList: [],
    setPathologistsList: (item) => set(() => ({pathologistsList: item})),
});

store = devtools(store);
store = persist(store, {
    name: "localStorage_medAir",
    getStorage: () => localStorage,
});

export const useLocalStorageStore = create(store);