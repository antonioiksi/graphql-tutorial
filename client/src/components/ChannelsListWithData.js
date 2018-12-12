import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';

import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';

const ChannelsList = ({ data: {loading, error, channels }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="channelsList">
      <AddChannel />
      { channels.map( ch => 
        (<div key={ch.id} className={'channel ' + (ch.id < 0 ? 'optimistic' : '')}>
          <div>{ch.id}</div><div>{ch.name}</div><div><RemoveChannel id={ch.id}/></div>
          </div>
          )
      )}
    </div>
  );
};

export const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

export default graphql(channelsListQuery, {
  options: { pollInterval: 10000 },
})(ChannelsList);