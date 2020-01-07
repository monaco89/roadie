import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import ErrorMessage from "../Error";
import { loader } from "graphql.macro";

import * as routes from "../../constants/routes";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

const SIGN_UP = loader("../../mutations/SignOut.gql");

const INITIAL_STATE = {
  email: "",
  password: "",
  passwordConfirmation: ""
};

const SignUp = ({ history, refetch }) => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history} refetch={refetch} />
  </div>
);

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, signUp) => {
    signUp.then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });

      localStorage.setItem("token", data.signUp.token);

      await this.props.refetch();

      this.props.history.push(routes.ACCOUNT);
    });

    event.preventDefault();
  };

  render() {
    const { email, password, passwordConfirmation } = this.state;

    const isInvalid =
      password !== passwordConfirmation || password === "" || email === "";

    return (
      <Mutation mutation={SIGN_UP} variables={{ email, password }}>
        {(signUp, { data, loading, error }) => (
          <form onSubmit={event => this.onSubmit(event, signUp)}>
            <FormControl margin="normal">
              <TextField
                name="email"
                value={email}
                type="text"
                label="Email"
                onChange={this.onChange}
                required
              />
              <br />
              <TextField
                name="password"
                value={password}
                type="password"
                label="Password"
                onChange={this.onChange}
                required
              />
              <br />
              <TextField
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                label="Password Confirmation"
                onChange={this.onChange}
                required
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

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUp);

export { SignUpForm, SignUpLink };
