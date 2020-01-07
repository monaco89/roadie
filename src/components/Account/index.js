import React from "react";
import { Query } from "react-apollo";
import Loading from "../Loading";
import ErrorMessage from "../Error";
import { loader } from "graphql.macro";

const GET_USER = loader("../../queries/User.gql");

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
          {/* // TODO Show user's top songs & events */}
        </div>
      );
    }}
  </Query>
);

export default Account;
