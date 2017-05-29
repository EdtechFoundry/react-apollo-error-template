import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import PersonDetails from './personDetails';
import {client} from './index';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPerson: 0,
    }
  }

  addLike(id) {
    client.readFragment();
  }

  render() {
    const { data: { loading, people } } = this.props;
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in Apollo Client.
            Edit the source code and watch your browser window reload with the changes.
          </p>
          <p>
            The code which renders this component lives in <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and ids.
          </p>
        </header>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <div>
            <ul>
              {people.map(person => (
                  <li key={person.id}>
                    <p>{person.name}</p>
                    <p>{person.latestMessage[0].text}</p>
                    <button onClick={() => {
                        this.setState({selectedPerson: person.id});
                      }
                    }>Select</button>
                    <button onClick={() => this.addLike(person.id)}>
                      Add like
                    </button>
                  </li>
              ))}
            </ul>
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        )}
      </main>
    );
  }
}

export const fragments = {
    simple: gql`
        fragment people_simple on Person {
            name
        }
    `,
};

export default graphql(
    gql`
        query getAllPeople {
            people {
                id
                latestMessage: messages {
                    id
                    text
                }
                ...people_simple
            }
        }
        ${fragments.simple}
    `,
)(App)
