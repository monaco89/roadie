import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from '../Error';

import * as routes from '../constants/routes';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SIGN_IN = gql`
    mutation($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
            token
        }
    }
`;

const SignIn = ({ history, refetch }) => (
    <div>
        <h1>Sign In</h1>
        <SignInForm history={history} refetch={refetch} />
        {/* //TODO Signup link */}
    </div>
);

const INITIAL_STATE = {
    login: '',
    password: '',
};

class SignInForm extends Component {
    state = { ...INITIAL_STATE };

    onChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    onSubmit = (event, signIn) => {
        signIn().then(async ({ data }) => {
            this.setState({ ...INITIAL_STATE });

            localStorage.setItem('token', data.signIn.token);

            await this.props.refetch();

            this.props.history.push(routes.LANDING);
        });

        event.preventDefault();
    };

    render() {
        const { login, password } = this.state;
        const isInvalid = password === '' || login === '';

        return (
            <Mutation mutation={SIGN_IN} variables={{ login, password }}>
                {(signIn, { data, loading, error }) => (
                    <form onSubmit={event => this.onSubmit(event, signIn)}>
                        <TextField
                            name="login"
                            value={login}
                            type="text"
                            floatingLabelText="Email"
                            onChange={this.onChange}
                        />
                        <TextField
                            name="password"
                            value={password}
                            type="text"
                            floatingLabelText="Password"
                            onChange={this.onChange}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isInvalid || loading}
                        >
                            SignIn
                    </Button>

                        {error && <ErrorMessage error={error} />}
                    </form>
                )}
            </Mutation>
        );
    }
}

export default withRouter(SignIn);

export { SignInForm };