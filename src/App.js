import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

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

  nameChangedHandle = (event) => {
    this.setState({
      persons: [
        { id: 'randomid', name: 'Christian', age: 25 },
        { id: 'sads', name: event.target.value, age: 21 },
        { id: 'uniquekey', name: 'Bruno', age: 32 }
      ]
    })
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
          {/* How to return a list of data 
              React expects a key property when creating this kind
              of list to help it update the elements
              */}
          {this.state.persons.map((person, index) => {
            return (<Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id} />)
          })}

        </div>
      )
    }

    return (
      <div className="App" >
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button
          className='button1'
          onClick={this.togglePersonsHandler}>
          Show Persons</button>

        {/* returning persons from condition out return statement */}
        {persons}

      </div>
    );
  }

  // The code above has the same result as the below
  // return React.createElement('div', {className: 'App'}, React.createElement('h1',null,'Hi, I'm a React App'))
}

export default App;
