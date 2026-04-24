import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PatientStatus, HospitalTypeEnum, AssistanceCategory, OfficeLocation, AssistanceProvider, ProviderChannel } from '@/data/types';

export interface NearestOffice extends OfficeLocation {
  distance?: number;
  provider?: AssistanceProvider;
}

export interface WizardState {
  currentStep: number;
  patientStatus: PatientStatus | null;
  hospitalType: HospitalTypeEnum | null;
  assistanceCategory: AssistanceCategory | null;
  selectedChannel: ProviderChannel | null;
  checkedDocuments: string[]; // Array for JSON serialization compatibility
  userLocation: { lat: number; lng: number } | null;
  nearestOffices: NearestOffice[];

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setPatientSituation: (status: PatientStatus, type: HospitalTypeEnum) => void;
  setAssistanceCategory: (category: AssistanceCategory) => void;
  setSelectedChannel: (channel: ProviderChannel) => void;
  toggleDocument: (docId: string) => void;
  setUserLocation: (lat: number, lng: number) => void;
  setNearestOffices: (offices: NearestOffice[]) => void;
  reset: () => void;
}

const defaultState = {
  currentStep: 1,
  patientStatus: null as PatientStatus | null,
  hospitalType: null as HospitalTypeEnum | null,
  assistanceCategory: null as AssistanceCategory | null,
  selectedChannel: null as ProviderChannel | null,
  checkedDocuments: [] as string[],
  userLocation: null as { lat: number; lng: number } | null,
  nearestOffices: [] as NearestOffice[],
};

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      ...defaultState,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

      setPatientSituation: (status, type) => set({
        patientStatus: status,
        hospitalType: type,
      }),

      setAssistanceCategory: (category) => set({
        assistanceCategory: category,
        selectedChannel: null,
        checkedDocuments: [],
      }),

      setSelectedChannel: (channel) => set({
        selectedChannel: channel,
        checkedDocuments: [],
      }),

      toggleDocument: (docId) => set((state) => {
        // Defensive: handle case where persisted value is somehow not an array
        const docs = Array.isArray(state.checkedDocuments) ? state.checkedDocuments : [];
        const isChecked = docs.includes(docId);
        return {
          checkedDocuments: isChecked
            ? docs.filter((id) => id !== docId)
            : [...docs, docId],
        };
      }),

      setUserLocation: (lat, lng) => set({ userLocation: { lat, lng } }),

      setNearestOffices: (offices) => set({ nearestOffices: offices }),

      reset: () => set({
        currentStep: 1,
        patientStatus: null,
        hospitalType: null,
        assistanceCategory: null,
        checkedDocuments: [],
      }),
    }),
    {
      name: 'bayanihan-wizard-storage',
      version: 2, // Bump to flush any old corrupt persisted state (e.g. Set data)
      migrate: () => defaultState, // On version mismatch, start fresh
      partialize: (state) => ({
        checkedDocuments: Array.isArray(state.checkedDocuments) ? state.checkedDocuments : [],
        userLocation: state.userLocation,
        nearestOffices: state.nearestOffices,
      }),
    }
  )
);
