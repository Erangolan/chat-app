/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Input, InputLabel, FormControl, Button, Paper } from '@material-ui/core'
import logoImage from '../../images/logo.png'
import { Link } from 'react-router-dom'
import { setUserName } from './chatSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 425,
    height: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    margin: theme.spacing(10),
    borderRadius: '20px',
    backgroundColor: '#fcfcf4',
  },
  margin: {
    margin: theme.spacing(1),
  },
  form: {
    margin: theme.spacing(6),
  },
  textField: {
    width: '30ch',
    marginLeft: theme.spacing(4.5),
    marginBottom: theme.spacing(10),
  },
  loginBtn: {
    width: '325px',
    height: '60px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '-100px',
    display: 'block',
    backgroundColor: '#0F8FFF',
    color: '#FFFFFF',
    borderRadius: '30px',
  },
  logo: {
    backgroundImage: `url(${logoImage})`,
    width: '205px',
    height: '150px',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  footer: {
    width: '100%',
  }
}))

export default function Login() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const handleSubmit = () => dispatch(setUserName(name))

  return (
    <div>
      <Paper component="form" className={classes.root} >
        <div className={classes.logo} />
        <div className={classes.form} >
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel>Nick Name</InputLabel>
            <Input
              placeholder="Name"
              label="With normal TextField"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>
        </div>
        <div className={classes.footer}>
          {name.length > 0 ? <Link onClick={handleSubmit} to={`/chat?name=${name}`} style={{ textDecoration: 'none', }}>
            <Button variant="contained" className={classes.loginBtn}>
              Enter chat
            </Button>
          </Link> : <Link onClick={(e) => e.preventDefault()} to={'/'} style={{ textDecoration: 'none', }}>
            <Button variant="contained" disabled={!name.length} className={classes.loginBtn}>
              Enter chat
            </Button>
          </Link>}
        </div>
      </Paper>
    </div>
  )
}
