import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading from "../Loading";
import ErrorMessage from "../Error";
import Song from "../Song";
import EventTeaser from "../Event/EventTeaser";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";

const GET_RATED = gql`
  query($id: String, $type: String!) {
    topRated(id: $id, type: $type) {
      id
      date
      artist {
        name
        mbid
        sortName
      }
      name
      album {
        images {
          url
        }
      }
      venue {
        city {
          name
          stateCode
        }
        name
      }
    }
  }
`;

const TopRated = ({ id, type }) => (
  <Query
    query={GET_RATED}
    variables={{
      type: type
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
        <Paper>
          <h2 className="trackList">
            Top {type.charAt(0).toUpperCase() + type.slice(1) + "s"}
          </h2>
          <List className="setlistList">
            {data.topRated.map((item, index) => {
              return type === "song" ? (
                <Song song={item} key={index} artist={data.artist} />
              ) : (
                <EventTeaser event={item} key={index} />
              );
            })}
          </List>
        </Paper>
      );
    }}
  </Query>
);

export default TopRated;
