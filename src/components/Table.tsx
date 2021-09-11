import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import Typography from "@material-ui/core/Typography"
import {ConstantData, DataItem} from '../types/dataItem'
import { getDateRangeOfWeek } from '../utils/date'
import { useState } from 'react'
import { mapData } from '../hooks/data'

const renderMultilineHeader = ({ colDef }: GridColumnHeaderParams) => {
  const label = colDef.headerName!.split(' ')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {label.map((titlePart, i) => <Typography key={i} variant="body2">{titlePart}</Typography>)}
    </div>
  )
}

const columns: GridColDef[] = [
  {
    field: 'week',
    type: 'number',
    headerName: '№ недели',
    renderHeader: renderMultilineHeader,
    renderCell: (params: GridRenderCellParams) => {
      const values = getDateRangeOfWeek(params.value as number).split(' - ')
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {values.map((item, i) => <Typography key={i}>{item}</Typography>)}
        </div>
      )
    },
    width: 150
  },
  {
    field: 'employmentPlan',
    headerName: 'План выходов',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
    editable: true
  },
  {
    field: 'dismissalPlan',
    headerName: 'План увольнений',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true
  },
  {
    field: 'growPlanWithRoutine',
    headerName: 'План роста с текучкой',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
    editable: true
  },
  {
    field: 'employmentFact',
    headerName: 'Выход из найма, факт.',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
    editable: true
  },
  {
    field: 'dismissalFact',
    headerName: 'Факт увольнений',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true
  },
  {
    field: 'growFactWithRoutine',
    headerName: 'Факт роста с текучкой',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true
  },
  {
    field: 'growPlan',
    headerName: 'План роста с нач. года',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true
  },
  {
    field: 'growFact',
    headerName: 'Факт роста',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
    editable: true
  },
  {
    field: 'sick',
    headerName: 'Больничные, %',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true
  },
  {
    field: 'vocation',
    headerName: 'Отпуска, %',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true
  },
  {
    field: 'kz',
    headerName: 'КЗ, %',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100
  },
  {
    field: 'free',
    headerName: 'Не занятые',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true
  },
  {
    field: 'toProject',
    headerName: 'Ушли на проект',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
    editable: true
  },
  {
    field: 'fromProject',
    headerName: 'Выходы с проектов',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true
  },
];

type Props = {
  rows: ConstantData[]
}

const Table: React.FC<Props> = ({ rows }) => {
  const initialData = mapData(rows)
  console.log('mapped data', initialData)
  const [data, setData] = useState<DataItem[]>(initialData.slice())

  return (
    <div style={{ height: '800px', width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={data}
        headerHeight={100}
        disableColumnMenu
        hideFooterPagination
      />
    </div>
  )
}

export { Table }
