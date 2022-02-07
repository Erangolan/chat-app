/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MessageLeft, MessageRight } from './Message'
import { TextInput } from './TextInput'
import { io } from 'socket.io-client'
import { ENDPOINT, CONNECT, MESSAGE, MESSAGES, LEFT, JOIN, REFRESH } from './chatEvent'
import { startChannel, setInitMessages, addMsg, setUserName, setMsg } from './chatSlice'
import { Box, CssBaseline, Container } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '70vh',
  },
  box: {
    backgroundColor: '#cfe8fc',
    height: '70vh',
    marginTop: '5%',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    '&:last-child': {
      marginBottom: '10%',
    }
  },
}))

export default function ChatList() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.chat.messages)
  const userName = useSelector((state) => state.chat.userName)
  let socket

  const setHandshake = () => {
    socket = io.connect(ENDPOINT, {
      transports: ['websocket'],
      upgrade: false,
      query: { name: userName }
    })
  }

  useEffect(() => {
    console.log(moment().format('MM/DD hh:mm'))
    setHandshake()
    socket.on(CONNECT, () => dispatch(startChannel(socket)))

    socket.on(LEFT, (msg) => dispatch(setMsg(msg)))
    socket.on(JOIN, (msg) => dispatch(setMsg(msg)))
    socket.on(REFRESH, (name) => dispatch(setUserName(name)))

    socket.on(MESSAGES, ({ messages }) => dispatch(setInitMessages(messages)))
    socket.on(MESSAGE, (data) => dispatch(addMsg(data)))
  }, [])

  const renderEachIdea = (msg, i) => {
    const now = moment().format('MM/DD hh:mm')
    return msg.userName === userName ?
      <MessageRight key={i} message={msg.userTxt} timestamp={now} /> :
      <MessageLeft key={i} message={msg.userTxt} displayName={msg.userName} timestamp={now} />
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container}>
        <Box className={classes.box}>
          { messages.map(renderEachIdea) }
        </Box>
        <TextInput socketId={socket} />
      </Container>
    </React.Fragment>
  )
}
