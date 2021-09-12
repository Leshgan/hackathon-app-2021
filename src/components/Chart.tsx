import React, {useState} from 'react'
import { useTheme } from '@material-ui/core/styles'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, ReferenceLine } from 'recharts'
import Typography from '@material-ui/core/Typography'
import {DataItem} from '../types/dataItem'
import {getDateRangeOfWeek} from '../utils/date'
import dayjs from 'dayjs'

// const createData  = ({week, kz}: DataItem): { week: string, kz: string | number | undefined } => {
//   return {
//     week: getDateRangeOfWeek(week),
//     kz
//   }
// }

type Props = {
  data: DataItem[]
}

export const Chart: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  // const initialData = data.map(createData)

  const [items, setItems] = useState(data)
  const currentWeek = dayjs().week()
  const currentWeekValue = items.find(item => +item.week === +currentWeek)?.kz

  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" color="inherit">График</Typography>
      <ResponsiveContainer>
        <LineChart
          data={items}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="week" stroke={theme.palette.text.secondary}>
            <Label
              position="bottom"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Номер недели
            </Label>
          </XAxis>
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              КЗ, %
            </Label>
          </YAxis>
          <ReferenceLine stroke="red" label="Сегодня" segment={[{ x: currentWeek, y: 0 }, { x: currentWeek, y: currentWeekValue }]} />
          <Line type="monotone" dataKey="kz" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
