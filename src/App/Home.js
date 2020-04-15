import React, { Component } from 'react'
import clsx from 'clsx'
import axios from 'axios'
import * as signalR from '@aspnet/signalr'

import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import SendIcon from '@material-ui/icons/Send'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import lula from '../Vote/img/lula.jpg'
import dilma from '../Vote/img/dilma.jpg'
import fernandoH from '../Vote/img/fernando-h.jpg'
import fernandoCollor from '../Vote/img/fernando-collor.jpg'
import jair from '../Vote/img/jair.jpg'
import michel from '../Vote/img/michel.jpg'

import Chat from '../Chat/Chat'
import SimpleDialog from '../Modal'

import { Doughnut } from 'react-chartjs-2'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

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
      vote: [
        { name: 'Jair Bolsonaro', value: 0, filter: 'jair' },
        { name: 'Michel Temer', value: 0, filter: 'michel' },
        { name: 'Lula', value: 0, filter: 'lula' },
        { name: 'Dilma Rouseff', value: 0, filter: 'dilma' },
        { name: 'Fernando Henrique', value: 0, filter: 'fernandoH' },
        { name: 'Fernando Collor', value: 0, filter: 'fernandoC' },
      ],
      error: false,
      errorDescription: '',
      hasVote: false,
      key: 0,
      chartState: {},
    }

    this.closeSimpleDialog = this.closeSimpleDialog.bind(this)
  }

  baseUrl = process.env.FUNCTION_SERVICE_ENDPOINT
    ? `${process.env.FUNCTION_SERVICE_ENDPOINT}/api`
    : 'https://voteaula2.azurewebsites.net/api'

  componentDidMount = async () => {
    this.setDataChart(this.state.vote)

    let { data: infoSocket } = await axios.get(`${this.baseUrl}/negotiate`)

    let options = {
      accessTokenFactory: () => infoSocket.accessToken,
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(infoSocket.url, options)
      .configureLogging(signalR.LogLevel.Information)
      .build()

    this.hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch((err) => console.error(err.toString()))

    this.hubConnection.on('ChatNotify', (received) => {
      var message = JSON.parse(received)

      if (message.type === 'message') {
        this.receivedMessage(message)
      } else {
        this.receivedVote(message)
      }
      console.log(message)
    })
  }

  fixedHeightPaper = ({ classes }) => {
    return clsx(classes.paper, classes.fixedHeight)
  }

  fixedHeightChatPaper = ({ classes }) => {
    return clsx(classes.paper, classes.fixedHeightChat)
  }

  closeSimpleDialog = (username) => {
    this.setState({ nick: username, dialogOpen: false })
  }

  sendMessage = async (type, message, candidateFilter) => {
    this.setState({ loading: true })

    let sendMessage = {
      type: type,
      user: this.state.nick.trim(),
      message: message,
      candidate: candidateFilter,
    }

    try {
      await axios.post(`${this.baseUrl}/SendMessage`, sendMessage)

      this.setState({ message: '', loading: false, error: false })
    } catch (error) {
      this.setState({
        message: '',
        loading: false,
        error: true,
        errorDescription: 'Não foi possível enviar ao canal',
      })
      console.log(error)
    }
  }

  sendVote = (vote) => async () => {
    if (this.state.nick.trim() === '') {
      this.setState({ dialogOpen: true })
      return
    }

    var candidate = this.state.vote.filter((f) => f.filter === vote)

    if (!candidate || candidate.length === 0) {
      this.setState({
        loading: false,
        error: true,
        errorDescription: 'Não foi um voto válido',
      })
      return
    }

    await this.sendMessage(
      'vote',
      `Deu um voto para ${candidate[0].name}`,
      vote
    )
  }

  handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({
      error: false,
      errorDescription: '',
    })
  }

  handleSendMessage = async () => {
    if (this.state.nick.trim() === '') {
      this.setState({ dialogOpen: true })
      return
    }

    await this.sendMessage('message', this.state.message, null)
  }

  receivedMessage = ({ message, user }) => {
    let messages = this.state.messages
    messages.push({ message: message, person: user })
    this.setState({ messages })
  }

  receivedVote = ({ message, user, votes }) => {
    let messages = this.state.messages
    messages.push({ message: message, person: user })

    this.setState({
      messages: messages,
      vote: votes,
      hasVote: true,
      key: this.state.key + 1,
    })

    this.setDataChart(votes)
  }

  setDataChart = (votes) => {
    this.setState({
      chartState: {
        labels: votes.map((m) => m.name),
        datasets: [
          {
            data: votes.map((m) => m.value),
            backgroundColor: [
              '#f44336',
              '#673ab7',
              '#2196f3',
              '#cddc39',
              '#ffeb3',
              '#4e342e',
            ],
          },
        ],
      },
    })
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
              <Box display={this.state.hasVote ? 'block' : 'none'}>
                <Doughnut data={this.state.chartState} />
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

          <Grid item xs={12} md={4} lg={4}>
            <Paper className={this.fixedHeightChatPaper(this.props)}>
              <Chat messages={this.state.messages} />
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
                    value={this.state.message}
                    onChange={(e) => this.setState({ message: e.target.value })}
                    onKeyPress={(ev) => {
                      if (ev.key === 'Enter') {
                        this.handleSendMessage()
                        ev.preventDefault()
                      }
                    }}
                  />
                </div>
                <IconButton
                  edge="end"
                  aria-label="Enviar mensagem"
                  color="inherit"
                  className={this.props.classes.sendMessage}
                  onClick={this.handleSendMessage}
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

        <Snackbar
          open={this.state.error}
          autoHideDuration={6000}
          onClose={this.handleCloseError}
        >
          <Alert onClose={this.handleCloseError} severity="success">
            {this.errorDescription}
          </Alert>
        </Snackbar>
      </React.Fragment>
    )
  }
}

export default Home
