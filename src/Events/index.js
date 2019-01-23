import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../Loading';
import ErrorMessage from '../Error';
import Map from '../Map';
import { setlistClient } from '../index';

// Testing purposes
import testData from '../test_data.json';

const GET_EVENTS = gql`
    query events($path: String!) {
        events @rest(type: "Events", path: $path) {
            setlist @type(name: "setlist"){
                id
                eventDate
                tour @type(name: "tour"){
                    name
                }
                artist @type(name: "artist") {
                    name
                }
                venue @type(name: "venue") {
                    name
                    city @type(name: "city") {
                        name
                        state
                        coords @type(name: "coords") {
                            lat
                            long
                        }
                    }
                }
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
        // skip={true}
        client={setlistClient}
    >
        {({ data, loading, error }) => {
            if (loading) {
                return <Loading />;
            }

            if (error) {
                console.log("error", error)
                return <ErrorMessage error={error} />;
            }

            // Testing purposes
            // data = testData;

            console.log("data", data);

            if (!data || data.total === 0) {
                return <p>No Results...</p>;
            }

            return (
                <Map events={data} />
            );
        }}
    </Query>
);

export default Events;