import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, toIdValue, } from 'react-apollo';
import { networkInterface } from './graphql/networkInterface';
import App from './App';

const dataIdFromObject = (obj) => {
    if (obj.__typename && obj.id) {
        return `${obj.__typename}.${obj.id}`;
    }

    return undefined;
};

const customResolvers = {
    Query: {
        person: (_empty, args) => {
            return toIdValue(`Person.${args.personId}`);
        },
    },
};

export const client = new ApolloClient({
    addTypename: true,
    customResolvers,
    dataIdFromObject,
    networkInterface,
    queryDeduplication: true,
});

ReactDOM.render(
  <ApolloProvider client={client}><App /></ApolloProvider>,
  document.getElementById('root'),
);
