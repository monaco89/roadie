import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading from "../Loading";
import ErrorMessage from "../Error";

const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      email
    }
  }
`;

const Account = ({ match }) => (
  <Query
    query={GET_USER}
    variables={{
      id: Number(match.params.id)
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

      console.log(data);

      return (
        <div>
          <h2>{data.user.email}</h2>
        </div>
      );
    }}
  </Query>
);

export default Account;
