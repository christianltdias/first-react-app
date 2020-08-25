import React, { Component } from 'react';
import PropTypes from 'prop-types'

import classes from './Person.module.css';
import Aux from '../../../hoc/Auxiliary';
import WithClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';

// Defines a component by function. Not really a React Component
class Person extends Component {
    // Another way of creating  a refence
    // constructor(props){
    //     super(props); 
    //     this.inputElement = React.createRef();
    // }

    // With this creation. We can use this.context directly 
    // without the need of AuthContext
    static contextType = AuthContext;

    // Setting the focus to the person input element after rendering
    componentDidMount() {
        this.inputElement.focus()
        console.log(this.context.authenticated)
        // when creating red from constructor
        // this.inputElement.current.focus()
    }

    render() {
        return (
            <Aux>
                {/* <AuthContext.Consumer>
                    {(context) => */}
                        {this.context.authenticated ? <p>Authenticated!</p> : <p>Please, Log in</p>}
                    {/* }
                </AuthContext.Consumer> */}
                < p onClick={this.props.click} >
                    I'm {this.props.name} and I'm {this.props.age} years old!
                </p >
                <p>{this.props.children}</p>
                <input
                    ref={(inputEl) => { this.inputElement = inputEl }}
                    // ref = {this.inputElement} -- When creating from constructor
                    type="text"
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