import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const CONFIRM = gql`
  query($id: String!) {
    confirm(id: $id) {
      bool
    }
  }
`;

const Confirm = ({ match }) => (
  <Query mutation={CONFIRM} variables={{ id: match.params.id }}>
    {({ data, loading, error }) => (
      <div>
        <h2>Thanks for confirming your email address</h2>
      </div>
    )}
  </Query>
);

export default Confirm;
