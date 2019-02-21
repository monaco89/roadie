import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Button from "@material-ui/core/Button";

const CONFIRM = gql`
  query($id: String!) {
    confirm(id: $id) {
      boolean
    }
  }
`;

const Confirm = ({ match }) => (
  <Mutation mutation={CONFIRM} variables={{ id: match.params.id }}>
    {(confirm, { data, loading, error }) => (
      <div>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={confirm}
        >
          Click here to confirm
        </Button>
      </div>
    )}
  </Mutation>
);

export default Confirm;
