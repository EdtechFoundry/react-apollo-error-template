import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} from 'graphql';

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: {
        id: {type: GraphQLID},
        text: {type: GraphQLString},
    },
});

const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        likes: {type: GraphQLInt},
        messages: {
            args: {
                limit: {type: GraphQLInt},
            },
            type: new GraphQLList(MessageType)
        },
    },
});

const messageData = [
    {id: 0, text: 'Hi'},
    {id: 1, text: 'There'},
    {id: 2, text: 'You!'},
];

const peopleData = [
    {id: 0, name: 'John Smith', likes: 0, messages: messageData},
    {id: 1, name: 'Sara Smith', likes: 0, messages: messageData},
    {id: 2, name: 'Budd Deey', likes: 0, messages: messageData},
];

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        people: {
            type: new GraphQLList(PersonType),
            resolve: () => {
                return peopleData.map(person => {
                    const {messages, ...otherProps} = person;
                    return {
                        messages: messages.slice(0, 1),
                        ...otherProps,
                    };
                });
            }
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

export const schema = new GraphQLSchema({query: QueryType});
