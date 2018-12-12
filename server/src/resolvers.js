const channels = [{
  id: 1,
  name: 'soccer',
}, {
  id: 2,
  name: 'baseball',
}];
let nextId = 3;

Array.prototype.remById = function(id) {
  for (var i = 0; i < this.length; i++) {
    // compare without converting type
      if (this[i].id == id) {
          this.splice(i, 1);
          i--;
          // return this[i];
      }
  }
  return this;
}

export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: nextId++, name: args.name };
      channels.push(newChannel);
      return newChannel;
    },
    deleteChannel: (root, args) => {
      const id = args.id;
      // const el = channels.getById(id);
      // channels.filter(item => (item.id != id));
      // delete el;
      channels.remById(id);
      // channels.splice(0, 1);
      console.log("newArray", channels);
      // console.log("id", id);
      return 1;
    },
  },
};
