import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import ErrorMessage from "../Error";
import { SignUpLink } from "../SignUp";
import { loader } from "graphql.macro";

import * as routes from "../../constants/routes";
import "./Form.css";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

const SIGN_IN = loader("../../mutations/SignIn.gql");

const SignIn = ({ history, refetch }) => (
  <div>
    <h1>Sign In</h1>
    <SignInForm history={history} refetch={refetch} />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  login: "",
  password: ""
};

class SignInForm extends Component {
  state = { ...INITIAL_STATE };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, signIn) => {
    signIn().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });

      localStorage.setItem("token", data.signIn.token);

      await this.props.refetch();

      this.props.history.push(routes.LANDING);
    });

    event.preventDefault();
  };

  render() {
    const { login, password } = this.state;
    const isInvalid = password === "" || login === "";

    return (
      <Mutation mutation={SIGN_IN} variables={{ login, password }}>
        {(signIn, { data, loading, error }) => (
          <form onSubmit={event => this.onSubmit(event, signIn)}>
            <FormControl margin="normal">
              <TextField
                name="login"
                value={login}
                type="text"
                label="Email"
                onChange={this.onChange}
              />
              <br />
              <TextField
                name="password"
                value={password}
                type="password"
                label="Password"
                onChange={this.onChange}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isInvalid || loading}
              >
                SignIn
              </Button>

              {error && <ErrorMessage error={error} />}
            </FormControl>
          </form>
        )}
      </Mutation>
    );
  }
}

export default withRouter(SignIn);

export { SignInForm };
