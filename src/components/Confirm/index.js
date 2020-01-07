import React from "react";
import { Mutation } from "react-apollo";
import ErrorMessage from "../Error";
import { loader } from "graphql.macro";

import "./Confirm.css";

import Button from "@material-ui/core/Button";

const Confirm = loader("../../mutations/Confirm.gql");

const Confirm = ({ match }) => (
  <Mutation mutation={Confirm} variables={{ id: match.params.id }}>
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
