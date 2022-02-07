/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Snackbar from '@mui/material/Snackbar'

export default function PositionedSnackbar() {
  const [show, setShow] = useState(false)
  const msg = useSelector((state) => state.chat.tmpMsg)
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })

  const { vertical, horizontal } = state

  useEffect(() => {
    if (msg !== '') {
      setShow(true)
      setTimeout(() => setShow(false), 5000)
    }
  }, [msg])

  return show ? (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={show}
      message={msg}
      key={vertical + horizontal}
    />
  ) : null
}
