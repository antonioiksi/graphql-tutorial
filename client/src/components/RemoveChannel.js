import React from 'react';
import { gql, graphql } from 'react-apollo';

import { channelsListQuery } from './ChannelsListWithData';

const RemoveChannel = ({ id, mutate }) => {


  const handleClick = (evt) => {
      // alert(id);
      mutate({ 
        variables: { id: id },
        optimisticResponse: {
          // deleteChannel: {
          //   id: id,
          // },
        },
        update: (store, { data: { deleteChannel } }) => {
            // console.log("store.data",store.data);
            // console.log("channelsListQuery", channelsListQuery);
            // Read the data from the cache for this query.
            const data = store.readQuery({ query: channelsListQuery });
            // Add our channel from the mutation to the end.

            // data.channels. .push(addChannel);
            data.channels = data.channels.filter(ch => ch.id != id);
            
            // Write the data back to the cache.
            store.writeQuery({ query: channelsListQuery, data });
          },
      });
    
  };

  return (
    // <div
    //   onClick={handleClick}
    //   // onKeyUp={handleKeyUp}
      
    // >{`remove channel with id=${id}`}</div>
    <input type="button" onClick={handleClick} value={`remove channel with id=${id}`}/>
  );
};

const deleteChannelMutation = gql`
  mutation deleteChannel($id: ID!) {
    deleteChannel(id: $id)
  }
`;


const RemoveChannelWithMutation = graphql(
  deleteChannelMutation,
)(RemoveChannel);

export default RemoveChannelWithMutation;