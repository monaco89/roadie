import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading from "../Loading";
import ErrorMessage from "../Error";

const GET_USER = gql``;

const Account = ({ id }) => (
  <Query
    query={GET_USER}
    variables={{
      id: id
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

      return <div />;
    }}
  </Query>
);

export default Account;
