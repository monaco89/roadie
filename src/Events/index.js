import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../Loading';
import ErrorMessage from '../Error';
import { seatgeekClient } from '../index';

const GET_EVENTS = gql`
    query events($path: String!) {
        events @rest(type: "Events", path: $path) {
            events
        }
    }
`;

const Events = ({ artist }) => (
    <Query
        query={GET_EVENTS}
        variables={{
            path: `events?performers.slug=${artist}&client_id=${process.env.REACT_APP_SEATGEEK_CLIENT_ID}`,
        }}
        skip={artist === ''}
        client={seatgeekClient}
    >
        {({ data, loading, error, fetchMore }) => {
            if (error) {
                console.log("error", error)
                return <ErrorMessage error={error} />;
            }

            console.log("data", data);

            if (loading) {
                return <Loading />;
            }

            if (!data || !data.events || !data.events.events) {
                return <p>error</p>;
            }

            return (
                <p>{data.events.events[0].title}</p>
            );
        }}
    </Query>
);

export default Events;