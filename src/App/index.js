import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import Events from '../Events';
import Event from '../Event';

import * as routes from '../constants/routes';
import history from '../constants/history';

import TextField from '@material-ui/core/TextField';

import './App.css';

// TODO Better search button
class App extends Component {
  state = {
    queryString: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ queryString: e.target[0].value });
  };

  render() {
    const { queryString } = this.state;
    document.title = "This Concert Fire";
    return (
      <Router history={history}>
        <div>
          <Navigation />
          <Route
            exact
            path={routes.LANDING}
            component={() => (
              <div className="App">
                <h1>That Concert <span role="img" aria-label="fire">🔥 🔥 🔥</span>?</h1>
                <form onSubmit={this.handleSubmit}>
                  <TextField
                    id="standard-full-width"
                    style={{ margin: 8 }}
                    placeholder="Search for artist..."
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
                <br />
                {queryString && (<Events artist={queryString} />)}
              </div>
            )} />
          <Route path={`${routes.EVENT}/:id`} exact component={Event} />
        </div>
      </Router>
    );
  }
}

export default App;