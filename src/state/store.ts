import create from 'zustand'
import { DataItem } from '../types/dataItem'

export const useStore = create(set => ({
  planningData: null,
  updateData: (newData: DataItem[]) => set(() => ({ planningData: newData })),
}))
