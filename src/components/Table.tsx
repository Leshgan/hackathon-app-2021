import React, {useEffect, useState} from 'react'
import {
  DataGrid, GridCellEditCommitParams,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams, GridRowParams,
} from '@mui/x-data-grid'
import Typography from "@material-ui/core/Typography"
import {ConstantData, DataItem} from '../types/dataItem'
import { getDateRangeOfWeek } from '../utils/date'
import { mapData } from '../hooks/data'
import { makeStyles, darken, lighten } from '@material-ui/core/styles'
import dayjs from "dayjs";
import { useStore } from '../state/store'

type Props = {
  rows: ConstantData[]
}

export const Table: React.FC<Props> = ({ rows }) => {
  const classes = useStyles()
  const initialData = mapData(rows)
  const [data, setData] = useState<DataItem[]>(initialData)
  const currentWeek = dayjs().week()
  // @ts-ignore
  const { updateData } = useStore()

  useEffect(() => {
    updateData(data)
  }, [data, updateData])

  const handleCellEditCommit = ({id, field, value}: GridCellEditCommitParams): void => {
    let isEdited = false
    const newData = data.map((item) => {
      if (item.id === id && item[field as keyof DataItem] !== value) {
        isEdited = true
        return {
          ...item,
          [field]: value,
        }
      }
      return item
    })
    if (isEdited) {
      setData(mapData(newData))
    }
  }

  const getRowClassName = ({ id, getValue }: GridRowParams): string => {
    const week = getValue(id, 'week')
    if (week === currentWeek) {
      return 'current-week-row'
    }
    return ''
  }

  return (
    <div style={{ height: '500px', width: '100%' }} className={classes.root}>
      <DataGrid
        columns={columns}
        rows={data}
        headerHeight={100}
        disableColumnMenu
        hideFooterPagination
        onCellEditCommit={handleCellEditCommit}
        getRowClassName={getRowClassName}
      />
    </div>
  )

}

const useStyles = makeStyles((theme) => {
  const getBackgroundColor = (color: string) =>
    theme.palette.type === 'dark'
      ? darken(color, 0.6)
      : lighten(color, 0.6);

  const getHoverBackgroundColor = (color: string) =>
    theme.palette.type === 'dark'
      ? darken(color, 0.5)
      : lighten(color, 0.5);

  return {
    root: {
      '& .current-week-row': {
        backgroundColor: getBackgroundColor(theme.palette.success.main),
        '&:hover': {
          backgroundColor: getHoverBackgroundColor(theme.palette.success.main),
        },
      }
    }
  }
})

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
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', margin: '0 10px', padding: '0 10px' }}>
            {params.value}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {values.map((item, i) => <Typography key={i}>{item}</Typography>)}
          </div>
        </div>
      )
    },
    width: 180,
  },
  {
    field: 'employmentPlan',
    headerName: 'План выходов',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
    editable: true,
  },
  {
    field: 'dismissalPlan',
    headerName: 'План увольнений',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true,
  },
  {
    field: 'growPlanWithRoutine',
    headerName: 'План роста с текучкой',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
  },
  {
    field: 'employmentFact',
    headerName: 'Выход из найма, факт.',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
    editable: true,
  },
  {
    field: 'dismissalFact',
    headerName: 'Факт увольнений',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true,
  },
  {
    field: 'growFactWithRoutine',
    headerName: 'Факт роста с текучкой',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
  },
  {
    field: 'growPlan',
    headerName: 'План роста с нач. года',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
  },
  {
    field: 'growFact',
    headerName: 'Факт роста',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
  },
  {
    field: 'sick',
    headerName: 'Больничные, %',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true,
  },
  {
    field: 'vocation',
    headerName: 'Отпуска, %',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true,
  },
  {
    field: 'kz',
    headerName: 'КЗ, %',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
  },
  {
    field: 'free',
    headerName: 'Не занятые',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
  },
  {
    field: 'toProject',
    headerName: 'Ушли на проект',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
    editable: true,
  },
  {
    field: 'fromProject',
    headerName: 'Выходы с проектов',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true,
  },
];
