import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import ReplayIcon from '@material-ui/icons/Replay'
import GetAppIcon from '@material-ui/icons/GetApp'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useStore } from '../state/store'
import dayjs from 'dayjs'
import {DataItem} from "../types/dataItem";

type SavedPlan = {
  id: number,
  planName: string,
  data: DataItem[]
}

export const ActionsBlock = () => {
  const [saveDialogVisible, setSaveDialogVisible] = useState(false)
  const [planName, setPlanName] = useState<string | number>(dayjs().week())
  const [plans, setPlans] = useState<any>(JSON.parse(localStorage.getItem('plans') || '[]'))
  const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null)
  const styles = useStyles()
  // @ts-ignore
  const { planningData, updateData } = useStore()

  const handleSave = () => {
    const newPlans = [
      ...plans,
      {
        id: (new Date()).getTime(),
        planName: `План на неделю ${planName}`,
        data: planningData
      }
    ]
    setPlans(newPlans)
    localStorage.setItem('plans', JSON.stringify(newPlans))
    closeSaveDialog()
  }

  const closeSaveDialog = () => {
    setSaveDialogVisible(false)
    setTimeout(() => setPlanName(dayjs().week()), 300)
  }

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorMenu(event.currentTarget);
  }

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  }

  const handleLoadPlan = (plan: SavedPlan) => {
    console.log('CHOSEN PLAN', plan)
    handleCloseMenu()
  }

  const handleRemovePlan = (plan: SavedPlan) => {
    const newPlans = plans.filter((item: SavedPlan) => item.id !== plan.id)
    setPlans(newPlans)
    localStorage.setItem('plans', JSON.stringify(newPlans))
  }

  const handleResetPlan = () => {
    updateData(null)
  }

  const renderMenus = () => {
    if (plans?.length) {
      return plans.map(
        (plan: SavedPlan, index: number
        ) => (
          <MenuItem
            key={index}
            onClick={() => handleLoadPlan(plan)}
          >
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
              {plan.planName}
              <IconButton
                aria-label="delete"
                className={styles.iconButton}
                onClick={() => handleRemovePlan(plan)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </MenuItem>
        )
    )}
    return null
  }

  return (
    <div>
      <Button
        disabled={!planningData}
        variant="contained"
        color="primary"
        className={styles.button}
        startIcon={<AddIcon />}
        onClick={() => setSaveDialogVisible(true)}
      >
        Сохранить план
      </Button>
      <Button
        disabled={!plans.length}
        variant="contained"
        className={styles.button}
        endIcon={<GetAppIcon />}
        onClick={handleOpenMenu}
      >
        Применить план
      </Button>
      <Button
        variant="contained"
        className={styles.button}
        endIcon={<ReplayIcon />}
        onClick={handleResetPlan}
      >
        Сбросить
      </Button>

      <Dialog open={saveDialogVisible} onClose={closeSaveDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Сохранить план</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Номер недели"
            value={planName}
            onChange={({ target }) => setPlanName(target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSaveDialog} color="primary">
            Отмена
          </Button>
          <Button onClick={handleSave} color="primary" disabled={!planName}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        id="select-plans"
        anchorEl={anchorMenu}
        keepMounted
        open={Boolean(anchorMenu)}
        onClose={handleCloseMenu}
      >
        {renderMenus()}
      </Menu>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    iconButton: {
      margin: `0 ${theme.spacing(1)}`,
    }
  }),
);
