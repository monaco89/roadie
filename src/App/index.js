import React, { Component } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import Events from "../Events";
import Event from "../Event";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Confirm from "../Confirm";
import withSession from "../Session/withSession";

import * as routes from "../constants/routes";
import history from "../constants/history";

import TextField from "@material-ui/core/TextField";

import "./App.css";

// TODO Better search button
class App extends Component {
  state = {
    queryString: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ queryString: e.target[0].value });
  };

  render() {
    const { queryString } = this.state;
    const { session, refetch } = this.props;
    document.title = "This Concert Fire";

    return (
      <Router history={history}>
        <div>
          <Navigation session={session} />
          <Route
            exact
            path={routes.LANDING}
            component={() => (
              <div className="App">
                <h1>
                  That Concert{" "}
                  <span role="img" aria-label="fire">
                    🔥 🔥 🔥
                  </span>
                  ?
                </h1>
                <form onSubmit={this.handleSubmit}>
                  <TextField
                    id="standard-full-width"
                    style={{ margin: 8 }}
                    placeholder="Search for artist..."
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </form>
                <br />
                {queryString && <Events artist={queryString} />}
              </div>
            )}
          />
          <Route path={`${routes.EVENT}/:id`} exact component={Event} />
          <Route
            path={routes.SIGN_IN}
            exact
            component={() => <SignIn refetch={refetch} />}
          />
          <Route
            path={routes.SIGN_UP}
            exact
            component={() => <SignUp refetch={refetch} />}
          />
          <Route exact path="/confirm/:id" component={Confirm} />
        </div>
      </Router>
    );
  }
}

export default withSession(App);
