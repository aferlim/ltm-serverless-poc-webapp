import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import GitHubIcon from '@material-ui/icons/GitHub'

import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Home from './Home'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://vertem.com/">
        Vertem
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    textAlign: 'center',
  },
  fixedHeight: {
    height: 1000,
  },
  fixedHeightChat: {
    padding: theme.spacing(2),
    flexDirection: 'column',
    display: 'flex',
    overflow: 'auto',
    height: 640,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    paddingRight: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create('width'),
    width: '100% !important',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sendMessage: {
    position: 'relative',
    left: '86%',
  },
  avatarLarge: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
  avatarGrid: {
    width: 136,
    marginTop: theme.spacing(5),
  },
  avatarPanel: {
    marginLeft: 10,
    width: '90%',
  },
  avatarButton: {
    right: theme.spacing(1.6),
    top: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export default function App() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={clsx(classes.appBar, classes.appBarShift)}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Ltm Serverless POC - Vote
          </Typography>

          <Tooltip title="github.com/aferlim">
            <IconButton href="https://github.com/aferlim" color="inherit">
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Home classes={classes} />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  )
}
