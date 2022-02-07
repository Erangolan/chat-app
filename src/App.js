/* eslint-disable no-unused-vars */
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import ChatList from './features/chat/ChatList'
import PositionedSnackbar from './features/chat/PositionedSnackbar'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/chat"
            render={() => (
              <React.Fragment>
                <PositionedSnackbar />
                <ChatList />
              </React.Fragment>
            )}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
