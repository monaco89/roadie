import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Event from '../Event';

import * as routes from '../constants/routes';
import history from '../constants/history';

import Events from '../Events';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

import './App.css';

class App extends Component {
  state = {
    artistName: '',
    queryString: '',
  };

  onArtistSearch = value => {
    this.setState({ artistName: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ queryString: this.state.artistName });
  };

  render() {
    const { artistName, queryString } = this.state;

    return (
      <Router history={history}>
        <div>
          <Route
            exact
            path={routes.LANDING}
            component={() => (
              <div className="App">
                <h1>That Concert <span role="img">🔥 🔥 🔥</span>?</h1>
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
                    value={artistName}
                    onChange={(e) => { this.onArtistSearch(e.target.value) }}
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