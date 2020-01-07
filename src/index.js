import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { RetryLink } from "apollo-link-retry";
import { InMemoryCache } from "apollo-cache-inmemory";
import { RestLink } from "apollo-link-rest";
import "mapbox-gl/dist/mapbox-gl.css";

import registerServiceWorker from "./registerServiceWorker";
import App from "./components/App";
import { signOut } from "./components/SignOut";

import "./style.css";

// TODO Move setlist api calls to server
const corsProxy = "https://infinite-sierra-19095.herokuapp.com/";

// seatlist api, https://api.setlist.fm/docs/1.0/
const setlistRestLink = new RestLink({
  uri: `${corsProxy}https://api.setlist.fm/rest/1.0/`,
  headers: {
    "x-api-key": `${process.env.REACT_APP_SETLIST_KEY}`,
    Accept: "application/json"
  }
});

// local server
const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql"
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "x-token": localStorage.getItem("token")
    }
  }));

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log("GraphQL error", message);

      if (message === "NOT_AUTHENTICATED") {
        signOut(client);
      }
    });
  }

  if (networkError) {
    console.log("Network error", networkError);

    if (networkError.statusCode === 401) {
      signOut(client);
    }
  }
});
const retryLink = new RetryLink();
/* Defaults
  new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true
    },
    attempts: {
      max: 5,
      retryIf: (error, _operation) => !!error
    }
  });
*/

const cache = new InMemoryCache();

const setlistLink = ApolloLink.from([errorLink, retryLink, setlistRestLink]);

export const setlistClient = new ApolloClient({
  link: setlistLink,
  cache
});

const link = ApolloLink.from([authLink, errorLink, retryLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();
