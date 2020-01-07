import React from "react";
import { ApolloConsumer } from "react-apollo";

import * as routes from "../../constants/routes";
import history from "../../constants/history";

import IconButton from "@material-ui/core/IconButton";
import ExitToApp from "@material-ui/icons/ExitToApp";

const signOut = client => {
  localStorage.removeItem("token");
  client.resetStore();
  history.push(routes.SIGN_IN);
};

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <IconButton
        aria-label="Logout"
        type="button"
        onClick={() => signOut(client)}
      >
        <ExitToApp fontSize="small" />
      </IconButton>
    )}
  </ApolloConsumer>
);

export { signOut };

export default SignOutButton;
