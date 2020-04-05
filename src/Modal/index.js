import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

function SimpleDialog(props) {
  const { onClose, userName, open } = props

  const handleClose = () => {
    onClose(nameValue)
  }

  const [nameValue, setNameValue] = React.useState(userName)

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Informe seu nome</DialogTitle>

      <DialogContent>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            abel="Seu nome aqui."
            variant="outlined"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
}

export default SimpleDialog

// export default function SimpleDialogDemo() {
//   const [open, setOpen] = React.useState(false)
//   const [selectedValue, setSelectedValue] = React.useState(emails[1])

//   const handleClickOpen = () => {
//     setOpen(true)
//   }

//   const handleClose = (value) => {
//     setOpen(false)
//     setSelectedValue(value)
//   }

//   return (
//     <div>
//       <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
//       <br />
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog
//         selectedValue={selectedValue}
//         open={open}
//         onClose={handleClose}
//       />
//     </div>
//   )
// }
