import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'

const Table: React.FC = () => {

  const columns: GridColDef[] = [
    { field: 'week', headerName: '№ недели', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];

  const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
  ]

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid columns={columns} rows={rows} />
    </div>
  )
}

export { Table }
