import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../Loading';
import ErrorMessage from '../Error';
import { setlistClient } from '../index';

const GET_EVENTS = gql`
    query events($path: String!) {
        events @rest(type: "Events", path: $path) {
            type
            setlist {
                id
                __typename: id
            }
        }
    }
`;

const Events = ({ artist }) => (
    <Query
        query={GET_EVENTS}
        variables={{
            path: `search/setlists?artistName=${artist}&p=1`,
        }}
        skip={artist === ''}
        client={setlistClient}
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

            if (!data || !data.events) {
                return <p>No Results...</p>;
            }

            return (
                <p>test</p>
            );
        }}
    </Query>
);

export default Events;