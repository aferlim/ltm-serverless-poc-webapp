import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

import ScrollToBottom from 'react-scroll-to-bottom'

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },

  fixedHeightScroll: {
    height: 600,
  },
}))

const Chat = ({ messages }) => {
  const classes = useStyles()

  return (
    <ScrollToBottom className={classes.fixedHeightScroll}>
      <Typography className={classes.text} variant="h5" gutterBottom>
        Chat
      </Typography>
      <List dense className={classes.list}>
        {messages.map(({ message, person }, index) => (
          <React.Fragment key={index}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar className={classes.orange}>
                  {person[0].toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={person} secondary={message} />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </ScrollToBottom>
  )
}

export default Chat
