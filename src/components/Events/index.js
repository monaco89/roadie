import React from "react";
import { Query } from "react-apollo";
import Loading from "../Loading";
import ErrorMessage from "../Error";
import Map from "../Map";
import { setlistClient } from "../../index";
import { loader } from "graphql.macro";

const GET_EVENTS = loader("../../queries/Events.gql");

const Events = ({ artist }) => (
  <Query
    query={GET_EVENTS}
    variables={{
      path: `search/setlists?artistName=${artist}&p=1`
    }}
    skip={artist === ""}
    client={setlistClient}
  >
    {({ data, loading, error }) => {
      if (loading) {
        return <Loading />;
      }

      if (error) {
        console.log("error", error);
        return <ErrorMessage error={error} />;
      }

      console.log("data", data);

      if (!data || data.total === 0) {
        return <p>No Results...</p>;
      }

      return <Map events={data} />;
    }}
  </Query>
);

export default Events;
