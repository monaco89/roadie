import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "../Error";

import "./Confirm.css";

import Button from "@material-ui/core/Button";

const CONFIRM = gql`
  mutation($id: String!) {
    confirm(id: $id) {
      msg
    }
  }
`;

const Confirm = ({ match }) => (
  <Mutation mutation={CONFIRM} variables={{ id: match.params.id }}>
    {(confirm, { data, loading, error }) => (
      <div className="confirm">
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={confirm}
        >
          Click here to confirm
        </Button>
        <br />
        {data && data.confirm.msg}
        {error && <ErrorMessage error={error} />}
      </div>
    )}
  </Mutation>
);

export default Confirm;
