import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    likes: { type: GraphQLInt },
  },
});

const peopleData = [
  { id: 0, name: 'John Smith', likes: 0},
  { id: 1, name: 'Sara Smith', likes: 0},
  { id: 2, name: 'Budd Deey', likes: 0},
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData,
    },
    person: {
      args: {
        personId: {type: new GraphQLNonNull(GraphQLInt)}
      },
      type: PersonType,
      resolve: (_empty, args) => {
        return peopleData[args.personId];
      }
    }
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
