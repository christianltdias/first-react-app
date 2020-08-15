import React, { Component } from 'react';
import classes from './App.module.css';
import Person from '../components/Persons/Person/Person';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'

// class App extends Component 

class App extends Component {
  // Defining a component as a function using Hook to track the state of
  // properties

  // the useState returns two elements
  // first is the state
  // second is the function to change this state
  // You can use array destructuring
  state = {
    persons: [
      { id: 'randomid', name: 'Christian', age: 25 },
      { id: 'sads', name: 'Holanda', age: 21 },
      { id: 'uniquekey', name: 'Bruno', age: 32 }
    ],
    showPersons: false
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

    this.setState({
      persons: persons
    });
  }

  addDefaultPerson = (array) => {
    const persons = [
      ...this.state.persons,
      { id: this.makeid(5), name: 'Default', age: 99 }
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


  render() {
    let persons = null;

    // Conditional to generate the list of persons if boolean is true
    if (this.state.showPersons) {
      persons = (
        <div>
          {/* Created Persons component to load person list of components */}
          <Persons persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}/>
        </div>
      );

    }

    return (
      <div className={classes.App} >
        <Cockpit
        showPersons = {this.state.showPersons}
        persons={this.state.persons} 
        toggle={this.togglePersonsHandler}
        add={this.addDefaultPerson}/>
        {persons}

      </div>
    );
  }

  // The code above has the same result as the below
  // return React.createElement('div', {className: 'App'}, React.createElement('h1',null,'Hi, I'm a React App'))
}

export default App;
