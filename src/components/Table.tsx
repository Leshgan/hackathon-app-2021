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
  const { planningData, updateData } = useStore()

  useEffect(() => {
    if (!planningData) {
      setData(initialData)
    }
  }, [planningData])

  const handleCellEditCommit = ({id, field, value}: GridCellEditCommitParams): void => {
    let isEdited = false
    let newData = data.map((item) => {
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
      newData = mapData(newData)
      setData(newData)
      updateData(newData)
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
      '& .cell-readonly': {
        backgroundColor: lighten('#ccc', 0.3),
        '&:hover': {
          backgroundColor: darken('#ccc', 0.1),
        },
      },
      '& .current-week-row': {
        backgroundColor: getBackgroundColor(theme.palette.success.main),
        '&:hover': {
          backgroundColor: getHoverBackgroundColor(theme.palette.success.main),
        },
      },
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
    headerName: '??? ????????????',
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
    cellClassName: 'cell-readonly',
  },
  {
    field: 'employmentPlan',
    headerName: '???????? ??????????????',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
    editable: true,
  },
  {
    field: 'dismissalPlan',
    headerName: '???????? ????????????????????',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true,
  },
  {
    field: 'growPlanWithRoutine',
    headerName: '???????? ?????????? ?? ????????????????',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
    cellClassName: 'cell-readonly',
  },
  {
    field: 'employmentFact',
    headerName: '?????????? ???? ??????????, ????????.',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
    editable: true,
  },
  {
    field: 'dismissalFact',
    headerName: '???????? ????????????????????',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true,
  },
  {
    field: 'growFactWithRoutine',
    headerName: '???????? ?????????? ?? ????????????????',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    cellClassName: 'cell-readonly',
  },
  {
    field: 'growPlan',
    headerName: '???????? ?????????? ?? ??????. ????????',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    cellClassName: 'cell-readonly',
  },
  {
    field: 'growFact',
    headerName: '???????????????? ????????. ????????.',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
    cellClassName: 'cell-readonly',
  },
  {
    field: 'sick',
    headerName: '????????????????????, %',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true,
  },
  {
    field: 'vocation',
    headerName: '??????????????, %',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true,
  },
  {
    field: 'kz',
    headerName: '????, %',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
    cellClassName: 'cell-readonly',
  },
  {
    field: 'free',
    headerName: '???? ??????????????',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    cellClassName: 'cell-readonly',
  },
  {
    field: 'toProject',
    headerName: '???????? ???? ????????????',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 100,
    editable: true,
  },
  {
    field: 'fromProject',
    headerName: '???????????? ?? ????????????????',
    type: 'number',
    renderHeader: renderMultilineHeader,
    width: 120,
    editable: true,
  },
];
