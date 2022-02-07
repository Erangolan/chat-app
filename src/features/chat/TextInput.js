/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Button }from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'
import { sendMsg } from './chatSlice'

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm : {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      margin: `${theme.spacing(0)} auto`,
      position: 'sticky',
      top: 0,
    },
    input: {
      width: '100%'
    },
  })
)

export const TextInput = () => {
  const [input, setInput] = useState('')
  const classes = useStyles()
  const dispatch = useDispatch()
  const onContentChanged = e => setInput(e.target.value)

  const sendInput = () => {
    dispatch(sendMsg(input))
    setInput('')
  }

  const handleKeypress = e => {
    if (e.keyCode === 13) {
      sendInput()
    }
  }

  return (
    <form className={classes.wrapForm} noValidate autoComplete="off">
      <TextField
        id="standard-text"
        label="share your thoughts"
        value={input}
        className={classes.input}
        onChange={onContentChanged}
        onKeyPress={handleKeypress}
      />
      <Button variant="contained" color="primary" type="submit" disabled={!input.length} onClick={sendInput}>
        <SendIcon />
      </Button>
    </form>
  )
}
