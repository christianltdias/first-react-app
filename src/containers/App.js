import React, { Component } from 'react';

import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'
import Aux from '../hoc/Auxiliary';
import WithClass from '../hoc/withClass'
import AuthContext from '../context/auth-context'

// class App extends Component 

class App extends Component {

  state = {
    persons: [
      { id: 'randomid', name: 'Christian', age: 25 },
      { id: 'sads', name: 'Holanda', age: 21 },
      { id: 'uniquekey', name: 'Bruno', age: 32 }
    ],
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }


  nameChangedHandler = (event, id) => {
    // We could also pass the index as a paramenter of the function
    // This is an alternative
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // Gets a copy of the desired person object
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [
      ...this.state.persons
    ]

    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  }

  ageChangedHandler = (event, id) => {

    let age = event.target.value;

    if (age > 999) {
      event.target.value = age = 999;
    } else if (age < 0 || age === '00') {
      event.target.value = age = 0;
    } else if (age[0] === '0' & age[1] !== undefined) {

      event.target.value = age = age.slice(1, age.length);
    }


    // We could also pass the index as a paramenter of the function
    // This is an alternative
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // Gets a copy of the desired person object
    const person = {
      ...this.state.persons[personIndex]
    };

    person.age = age;

    const persons = [
      ...this.state.persons
    ]

    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons
      };
    });
  }

  addDefaultPerson = (array) => {
    const persons = [
      ...this.state.persons,
      { id: this.makeid(5), name: 'Default', age: Math.floor(Math.random() * 100) }
    ]
    this.setState({
      persons: persons
    })
  }

  makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  deletePersonHandler = (personIndex) => {
    // We can change a state array immutably. That is, we create a copy
    // of the array, change it, and after that update the original array
    // In the other way, we would only get a pointer of the array and
    // change it directly
    // const persons = this.state.persons; -> get a pointer of the array

    // Create a copy and then delete and update
    const persons = this.state.persons.slice();
    // Same result as
    // const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({
      showPersons: !doesShow
    })
  }

  deleteCockpit = () => {
    let flag = true;

    if (this.state.showCockpit) {
      flag = false;
    }

    this.setState({
      showCockpit: flag,
      showPersons: false
    })
  }

  loginHandler = () => {
    console.log('Log in called')
    this.setState({
      authenticated: true
    })
  }

  render() {
    let persons = null;
    let cockpit = null;

    // Conditional to generate the list of persons if boolean is true
    if (this.state.showPersons) {
      persons = <Persons persons={this.state.persons}
        clicked={this.deletePersonHandler}
        nameChanged={this.nameChangedHandler}
        ageChanged={this.ageChangedHandler} />
    }

    // Conditional to generate cockipit
    if (this.state.showCockpit) {
      cockpit = <Cockpit
        title={this.props.appTitle}
        showPersons={this.state.showPersons}
        personsLength={this.state.persons.length}
        toggle={this.togglePersonsHandler}
        add={this.addDefaultPerson} />
    }


    return (
      <Aux className={classes.Container}>

        <AuthContext.Provider value={{ authenticated: this.state.authenticated, login: this.loginHandler }}>
          <button
            onClick={this.deleteCockpit}
            className={[classes.Button, classes.Grey].join(' ')}>{this.state.showCockpit ? 'Delete Cockpit' : 'Show Cockpit'}</button>

          <AuthContext.Consumer>
            {(context) => <button
              onClick={context.login}
              className={[classes.Button, classes.Green].join(' ')}>Log in</button>}
          </AuthContext.Consumer>


          {cockpit}
          {persons}
        </AuthContext.Provider>

      </Aux>
    );
  }

  // The code above has the same result as the below
  // return React.createElement('div', {className: 'App'}, React.createElement('h1',null,'Hi, I'm a React App'))
}

export default WithClass(App, classes.App);
