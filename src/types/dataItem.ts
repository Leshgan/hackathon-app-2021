export type ConstantData = {
  id: number
  week: number
  employmentPlan: number // План выходов
  dismissalPlan: number // План увольнений
  employmentFact: number // Выход из найма, факт.
  dismissalFact: number // Факт увольнений
  sick: number // Больничные, %'
  vocation: number // Отпуска, %
  toProject: number // Ушли на проект
  fromProject: number // Выходы с проектов
}

type CalculatedData = {
  growPlanWithRoutine: number // План роста с текучкой
  growFactWithRoutine: number // Факт роста с текучкой
  growPlan: number // План роста с нач. года
  growFact: number // Факт роста
  kz: number // 'КЗ, %
  free: number // Не занятые
}

export type DataItem = ConstantData & CalculatedData
// type keys = keyof ConstantData & keyof CalculatedData
// export type DataItem = {
//   [key: keys]: any
// }
