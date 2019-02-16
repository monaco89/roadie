import React from 'react';
import { ApolloConsumer } from 'react-apollo';

import * as routes from '../constants/routes';
import history from '../constants/history';

import Button from '@material-ui/core/Button';

const signOut = client => {
    localStorage.removeItem('token');
    client.resetStore();
    history.push(routes.SIGN_IN);
}

const SignOutButton = () => (
    <ApolloConsumer>
        {client => (
            <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() => signOut(client)}
            >
                Logout
        </Button>
        )}
    </ApolloConsumer>
);

export { signOut };

export default SignOutButton;