import React, {useState, MouseEvent } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { Chart } from '../components/Chart'
import { Table } from '../components/Table'
import { data } from '../services/data'
import { mapData } from '../hooks/data'
import { ActionsBlock } from '../components/ActionsBlock'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    maxWidth: '100%',
    padding: '0 40px',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 300,
  },
}))

const Dashboard: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)
  const styles = useStyles()
  const fixedHeightPaper = [styles.paper, styles.fixedHeight].join(' ')

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="account-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>??????????????</MenuItem>
      <MenuItem onClick={handleMenuClose}>??????????</MenuItem>
    </Menu>
  )

  return (
    <div className={styles.root}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar className={styles.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => {}}
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={styles.title}>
            ??????????????????????
          </Typography>
          <Button
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            ?????? ????
          </Button>
        </Toolbar>
      </AppBar>
      <main className={styles.content}>
        <div className={styles.appBarSpacer} />
        <Container maxWidth="lg" className={styles.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Chart data={mapData(data)} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={styles.paper}>
                <ActionsBlock />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={styles.paper}>
                <Table rows={data} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            {/*<Copyright />*/}
          </Box>
        </Container>
      </main>
      {renderMenu}
    </div>
  )
}

export default Dashboard
