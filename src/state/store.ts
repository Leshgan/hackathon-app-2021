import create from 'zustand'
import { DataItem } from '../types/dataItem'

export const useStore = create(set => ({
  planningData: null,
  loadedPlan: null,
  updateData: (newData: DataItem[]) => set(() => ({ planningData: newData })),
  setLoadedPlan: (plan: any) => set(() => ({ planningData: plan.data, loadedPlan: plan.week})),
  resetPlan: () => set(() => ({ planningData: null, loadedPlan: null}))
}))
