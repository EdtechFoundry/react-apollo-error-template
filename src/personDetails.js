import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

class PersonDetails extends Component {
    render() {
        const { data: { loading, person } } = this.props;
        return (
            <div>
                <h3>Details</h3>
                <div>
                    {loading ? (
                        <p>Loading…</p>
                    ) : (
                        <ul>
                            <li>id: {person.id}</li>
                            <li>name: {person.name}</li>
                            <li>likes: {person.likes}</li>
                        </ul>
                    )}
                </div>
            </div>
        );
    }
}

export const fragments = {
    detailed: gql`
        fragment people_detailed on Person {
            name
            likes
        }
    `,
};

export default graphql(
    gql`
        query getPersonDetails($personId: Int!) {
            person(personId: $personId) {
                id
                ...people_detailed
            }
        }
        ${fragments.detailed}
    `, {
        options(ownProps) {
           return {
               variables: {
                   personId: ownProps.personId,
               }
           }
        }
    }
)(PersonDetails)
