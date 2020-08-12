import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';

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
    const style = {
      backgroundColor: '#008CBA',
      border: 'none',
      color: 'white',
      padding: '16px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      fontSize: '16px',
      margin: '4px 2px',
      transitionDuration: '0.4s',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightblue',
        color: 'black'
      }
    }
    // ':hover' property just after using the Random
    // import and usage. We need also to wrap the export app
    // With the Random component

    const button_style = { ...style };

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
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />)
          })}

        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'lightred',
        color: 'black'
      }
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red'); // Classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold'); // classes = ['red','bold']
    }

    return (
      <StyleRoot>
        <div className="App" >
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <div style={{
            display: 'flex', flexDirection: 'column',
            width: '30%', margin: '0px auto'
          }}>
            <button
              className='button1'
              onClick={this.togglePersonsHandler}
              style={style}>
              Show Persons</button>
            {/* <button
            style={button_style}
            onClick={() => this.addDefaultPerson(this.state.persons)}>
            Add default Person</button> */}
          </div>

          {/* returning persons from condition out return statement */}
          {persons}

        </div>
      </StyleRoot>
    );
  }

  // The code above has the same result as the below
  // return React.createElement('div', {className: 'App'}, React.createElement('h1',null,'Hi, I'm a React App'))
}

export default Radium(App);
