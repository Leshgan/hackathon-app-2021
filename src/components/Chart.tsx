import React, {useEffect, useState} from 'react'
import { useTheme } from '@material-ui/core/styles'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
  Legend,
} from 'recharts'
import Typography from '@material-ui/core/Typography'
import {DataItem} from '../types/dataItem'
import dayjs from 'dayjs'
import { useStore } from '../state/store'

type Props = {
  data: DataItem[]
}

type ChartData = {
  week: number | string
  kz: number
  planKz: number
}

const createData  = ({week, kz}: DataItem): ChartData => {
  return {
    week,
    kz,
    planKz: kz
  }
}

export const Chart: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  // @ts-ignore
  const planningData = useStore(state => state.planningData)
  const [items, setItems] = useState<ChartData[]>(data.map(createData))

  const currentWeek = dayjs().week()
  const currentWeekValue = items.find(item => +item.week === +currentWeek)?.kz

  useEffect(() => {
    if (planningData && planningData.length === items.length) {
      const newData = []
      for (let i = 0; i < items.length; i++) {
        newData.push({
          week: items[i].week,
          kz: items[i].kz,
          planKz: planningData[i].kz
        })
      }
      setItems(newData)
    }
  }, [data, planningData])

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
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="kz" stroke={theme.palette.primary.main} dot={false} />
          {planningData && <Line type="monotone" dataKey="planKz" stroke="#82ca9d" dot={false} />}
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
