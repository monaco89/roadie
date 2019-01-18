import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { RetryLink } from 'apollo-link-retry';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';

import registerServiceWorker from './registerServiceWorker';
import App from './App';

import './style.css';

registerServiceWorker();

// setup your `RestLink` with your endpoint
const restLink = new RestLink({ uri: "https://api.seatgeek.com/2/" });

const cache = new InMemoryCache();

// seatgeek api
export const seatgeekClient = new ApolloClient({
    link: restLink,
    cache,
});


// const GITHUB_BASE_URL = 'https://api.github.com/graphql';

// const httpLink = new HttpLink({
//     uri: GITHUB_BASE_URL,
//     headers: {
//         authorization: `Bearer ${
//             process.env.SEATGEEK_API_TOKEN
//             }`,
//     },
// });

// const errorLink = onError(({ graphQLError, networkError }) => {
//     if (graphQLError) {
//         // do something with graphql error
//         console.log("graphql error", graphQLError);
//     }

//     if (networkError) {
//         // do somehting with network error
//         console.log("network error", networkError);
//     }
// });

// const retryLink = new RetryLink();
// /* Defaults
//   new RetryLink({
//     delay: {
//       initial: 300,
//       max: Infinity,
//       jitter: true
//     },
//     attempts: {
//       max: 5,
//       retryIf: (error, _operation) => !!error
//     }
//   });
// */

// const link = ApolloLink.from([errorLink, retryLink, httpLink]);

// const client = new ApolloClient({
//     link,
//     cache,
// });

ReactDOM.render(
    // <ApolloProvider client={client}>
    //     <App />
    // </ApolloProvider>,
    <App />,
    document.getElementById('root')
);