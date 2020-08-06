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
      { name: 'Christian', age: 25 },
      { name: 'Holanda', age: 21 },
      { name: 'Bruno', age: 32 }
    ],
    showPersons: false
  }


  switchNameHandler = (newName) => {
    // DON'T DO THIS 
    // React doesn't know about this change- Use SetState() function instead
    //this.state.persons[0].name = 'Another Name!'
    this.setState({
      persons: [
        { name: newName, age: 25 },
        { name: 'Holanda', age: 21 },
        { name: 'Bruno', age: 32 }
      ]
    })
  }

  nameChangedHandle = (event) => {
    this.setState({
      persons: [
        { name: 'Christian', age: 25 },
        { name: event.target.value, age: 21 },
        { name: 'Bruno', age: 32 }
      ]
    })
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
          {/* How to return a list of data */}
          {this.state.persons.map((person) => {
            return (<Person
              name={person.name}
              age={person.age} />)
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
