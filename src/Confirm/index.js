import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const CONFIRM = gql`
  mutation($id: String!) {
    confirm(id: $id) {
      bool
    }
  }
`;

const Confirm = ({ match }) => (
  <Mutation mutation={CONFIRM} variables={{ id: match.params.id }}>
    {({ data, loading, error }) => (
      <div>
        <h2>Thanks for confirming your email address</h2>
      </div>
    )}
  </Mutation>
);

export default Confirm;
