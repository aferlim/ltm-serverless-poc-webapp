import React, { Component } from 'react'

import clsx from 'clsx'
import Chat from '../Chat/Chat'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

import SendIcon from '@material-ui/icons/Send'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'

import SimpleDialog from '../Modal'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

import lula from '../Vote/img/lula.jpg'
import dilma from '../Vote/img/dilma.jpg'
import fernandoH from '../Vote/img/fernando-h.jpg'
import fernandoCollor from '../Vote/img/fernando-collor.jpg'
import jair from '../Vote/img/jair.jpg'
import michel from '../Vote/img/michel.jpg'

import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'

import VoteChart from '../Vote/VoteChart'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nick: '',
      message: '',
      messages: [],
      hubConnection: null,
      dialogOpen: true,
      loading: false,
    }

    this.closeSimpleDialog = this.closeSimpleDialog.bind(this)
  }
  componentDidMount = async () => {}

  fixedHeightPaper = ({ classes }) => {
    return clsx(classes.paper, classes.fixedHeight)
  }

  fixedHeightChatPaper = ({ classes }) => {
    return clsx(classes.paper, classes.fixedHeightChat)
  }

  closeSimpleDialog = (username) => {
    this.setState({ nick: username, dialogOpen: false })
  }

  sendMessage = (message) => {
    if (this.state.nick.trim() === '') {
      this.setState({ dialogOpen: true })
      return
    }

    console.log('message sent')
  }

  sendVote = (vote) => () => {
    if (this.state.nick.trim() === '') {
      this.setState({ dialogOpen: true })
      return
    }

    console.log('message sent ' + vote)
  }

  render() {
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            <Paper className={this.fixedHeightPaper(this.props)}>
              <Typography variant="h3" component="h3" gutterBottom>
                {this.state.nick.trim() === ''
                  ? 'Qual o melhor presidente o Brasil já teve?'
                  : `${this.state.nick}, qual o melhor presidente o Brasil já teve?`}
              </Typography>
              <Box className={this.props.classes.chart}>
                <VoteChart />
              </Box>
              <Grid
                container
                spacing={3}
                className={this.props.classes.avatarPanel}
              >
                <Grid
                  item
                  className={this.props.classes.avatarGrid}
                  xs={5}
                  sm={3}
                >
                  <Avatar
                    alt="Jair Bonsonaro"
                    src={jair}
                    className={this.props.classes.avatarLarge}
                  />

                  <Button
                    variant="contained"
                    className={this.props.classes.avatarButton}
                    onClick={this.sendVote('jair')}
                  >
                    Votar
                  </Button>
                </Grid>

                <Grid
                  item
                  className={this.props.classes.avatarGrid}
                  xs={5}
                  sm={3}
                >
                  <Avatar
                    alt="Michel Temer"
                    src={michel}
                    className={this.props.classes.avatarLarge}
                  />

                  <Button
                    variant="contained"
                    className={this.props.classes.avatarButton}
                    onClick={this.sendVote('michel')}
                  >
                    Votar
                  </Button>
                </Grid>

                <Grid
                  item
                  className={this.props.classes.avatarGrid}
                  xs={5}
                  sm={3}
                >
                  <Avatar
                    alt="Luiz Inácio Lula da Silva"
                    src={lula}
                    className={this.props.classes.avatarLarge}
                  />

                  <Button
                    variant="contained"
                    className={this.props.classes.avatarButton}
                    onClick={this.sendVote('lula')}
                  >
                    Votar
                  </Button>
                </Grid>

                <Grid
                  item
                  className={this.props.classes.avatarGrid}
                  xs={6}
                  sm={3}
                >
                  <Avatar
                    alt="Dilma Rousseff"
                    src={dilma}
                    className={this.props.classes.avatarLarge}
                  />

                  <Button
                    variant="contained"
                    className={this.props.classes.avatarButton}
                    onClick={this.sendVote('dilma')}
                  >
                    Votar
                  </Button>
                </Grid>

                <Grid
                  item
                  className={this.props.classes.avatarGrid}
                  xs={6}
                  sm={3}
                >
                  <Avatar
                    alt="Fernando Henrique Cardoso"
                    src={fernandoH}
                    className={this.props.classes.avatarLarge}
                  />

                  <Button
                    variant="contained"
                    className={this.props.classes.avatarButton}
                    onClick={this.sendVote('fernandoH')}
                  >
                    Votar
                  </Button>
                </Grid>

                <Grid
                  item
                  className={this.props.classes.avatarGrid}
                  xs={6}
                  sm={3}
                >
                  <Avatar
                    alt="Fernando Collor de Mello"
                    src={fernandoCollor}
                    className={this.props.classes.avatarLarge}
                  />

                  <Button
                    variant="contained"
                    className={this.props.classes.avatarButton}
                    onClick={this.sendVote('fernandoC')}
                  >
                    Votar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Box></Box>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={this.fixedHeightChatPaper(this.props)}>
              <Chat />
            </Paper>
            <Grid position="fixed" item xs={12}>
              <Box
                boxShadow={3}
                bgcolor="primary.main"
                color="primary.contrastText"
                p={2}
              >
                <div className={this.props.classes.search}>
                  <InputBase
                    placeholder="Digite uma mensagem para enviar."
                    classes={{
                      root: this.props.classes.inputRoot,
                      input: this.props.classes.inputInput,
                    }}
                    inputProps={{
                      'aria-label': 'Digite uma mensagem para enviar.',
                    }}
                  />
                </div>
                <IconButton
                  edge="end"
                  aria-label="Enviar mensagem"
                  color="inherit"
                  className={this.props.classes.sendMessage}
                  onClick={this.sendMessage}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <SimpleDialog
          userName={this.state.nick}
          open={this.state.dialogOpen}
          onClose={this.closeSimpleDialog}
        />

        <Backdrop
          className={this.props.classes.backdrop}
          open={this.state.loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    )
  }
}

export default Home
