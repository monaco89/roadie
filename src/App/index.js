import React, { Component } from 'react';
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
      <div className="App">
        <h1>Was That Concert <span role="img">🔥 🔥 🔥</span>?</h1>
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
          <Fab variant="extended" type="submit" aria-label="Search" className="">
            Search
        </Fab>
        </form>
        {queryString && (<Events artist={queryString} />)}
      </div>
    );
  }
}

export default App;