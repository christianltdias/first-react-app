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
    ]
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

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
    console.log(this.state.persons)
    return (
      <div className="App" >
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button 
        onClick={() => this.switchNameHandler('Dell')}
        style={style}>
          Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age} />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this,'Ty')}
          changed={this.nameChangedHandle} >My hobbies: Hiking</Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age} />

      </div>
    );
  }

  // The code above has the same result as the below
  // return React.createElement('div', {className: 'App'}, React.createElement('h1',null,'Hi, I'm a React App'))
}

export default App;
