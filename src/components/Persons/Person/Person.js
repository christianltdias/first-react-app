import React, { Component } from 'react';
import PropTypes from 'prop-types'

import classes from './Person.module.css';
import Aux from '../../../hoc/Auxiliary';
import WithClass from '../../../hoc/withClass';

// Defines a component by function. Not really a React Component
class Person extends Component {

    render() {
        return (
            <Aux>
                < p onClick={this.props.click} >
                    I'm {this.props.name} and I'm {this.props.age} years old!
                </p >
                <p>{this.props.children}</p>
                <input type="text"
                    onChange={this.props.changed}
                    value={this.props.name} />
            </Aux>
        );
    }


}

// Setting the type of the props
// Setting diferent type will cause an error
Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default WithClass(Person, classes.Person);