import React from "react";
import { Query } from "react-apollo";
import { loader } from "graphql.macro";

const GET_ME = loader("../../queries/Me.gql");

// TODO Use Apollo Link State for Session
const withSession = Component => props => (
  <Query query={GET_ME}>
    {({ data, refetch }) => (
      <Component {...props} session={data} refetch={refetch} />
    )}
  </Query>
);

export default withSession;
