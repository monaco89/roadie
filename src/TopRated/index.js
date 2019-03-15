import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading from "../Loading";
import ErrorMessage from "../Error";

const GET_RATED = gql`
    query(id: $id, type: $type) {
        topRated(id: $id, type: $type) {
            id
            date
            artist {
                name
                mbid
                sortName
            }
            name
        }
    }
`;

const TopRated = ({ id, type }) => (
  <Query
    query={GET_RATED}
    variables={{
      id: id,
      type: type
    }}
  >
    {({ data, loading, error }) => {
      if (loading) {
        return <Loading />;
      }

      if (error || !data) {
        console.log("error", error);
        return <ErrorMessage error={error} />;
      }

      // TODO: Use Setlist component
      return <div />;
    }}
  </Query>
);

export default TopRated;
