import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import 'dayjs/locale/ru'
dayjs.extend(weekOfYear)
dayjs.locale('ru')

export const getDateRangeOfWeek = (weeNo: number | string) => {
  const startofWeek = dayjs().week(+weeNo).startOf('week').format('ddd., DD.MM.YYYY');
  const endOfWeek = dayjs().week(+weeNo).endOf('week').format('ddd., DD.MM.YYYY')
  return `${startofWeek} - ${endOfWeek}`
}
