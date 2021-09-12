import {ConstantData, DataItem } from '../types/dataItem'

const initialEmployers = 143
const initialFree = 24

export const mapData = (data: ConstantData[]): DataItem[] => {
  const result: DataItem[] = []

  data.forEach((item, index) => {
    const getGrowPlanWithRoutine = (value: ConstantData): number => value.employmentPlan - value.dismissalPlan
    const getGrowFactWithRoutine = (value: ConstantData): number => value.employmentFact - value.dismissalFact
    const getFree = (value: ConstantData): number => {
      if (index > 0) {
        return result[index - 1].free -
          (result[index - 1].toProject || 0) +
          value.employmentFact +
          result[index - 1].fromProject
      }
      return initialFree
    }
    const getGrowFact = (value: ConstantData): number => {
      return (index > 0 ? result[index - 1].growFact : initialEmployers) + getGrowFactWithRoutine(value)
    }
    const getKz = (value: ConstantData): number => {
      return 100 - (100 / getGrowFact(value) * getFree(value)) - (value.sick + value.vocation)
    }

    result.push({
      ...item,
      growPlanWithRoutine: getGrowPlanWithRoutine(item), // План роста с текучкой
      growFactWithRoutine: getGrowFactWithRoutine(item), // Факт роста с текучкой
      growPlan: (index > 0 ? result[index - 1].growPlan : initialEmployers) + getGrowPlanWithRoutine(item), // План роста с нач. года
      growFact: getGrowFact(item), // Факт роста
      kz: getKz(item), // 'КЗ, %
      free: getFree(item) , // Не занятые
    })
  })

  return result
}
