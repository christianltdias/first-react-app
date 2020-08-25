import React, { Component } from 'react';

import Person from './Person/Person'

class Persons extends Component {

    componentWillUnmount() {
        console.log('{Persons.js} componentWillUnmount - cleanup after rendering')
    }

    // Extending PureComponent will be the same
    // as it contains a default shouldcomponentupdate with
    // props change check
    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextProps.persons !== this.props.persons ||
            nextProps.changed !== this.props.changed ||
            nextProps.clicked !== this.props.clicked ||
            nextProps.authentication !== this.props.authentication
        ) {
            return true;
        }
        return false;
    }

    render() {
        console.log("{Persons.js} rendering...")
        return this.props.persons.map((person, index) => {

            return (
                <Person
                    click={() => this.props.clicked(index)}
                    name={person.name}
                    age={person.age}
                    key={person.id}
                    changed={(event) => this.props.changed(event, person.id)} />
            )
        });
    }
}

export default Persons;