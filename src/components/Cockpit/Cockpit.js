import React from 'react'
import classes from './Cockpit.module.css'

const cockpit = (props) => {
    const insertClasses = [];
    let btnClass = [classes.Button];

    if (props.showPersons) {
        btnClass.push(classes.Red)
    }

    if (props.persons.length <= 2) {
        insertClasses.push(classes.red); // Classes = ['red']
    }
    if (props.persons.length <= 1) {
        insertClasses.push(classes.bold); // classes = ['red','bold']
    }

    return (
        <div className={classes.Cockpit}>
            <h1>Hi, I'm a React App</h1>
            <p className={insertClasses.join(' ')}>This is really working!</p>
            <div className={classes.ButtonsContainer}>
                <button
                    className={btnClass.join(' ')}
                    onClick={props.toggle}>
                    Show Persons</button>
                <button
                    className={classes.Button}
                    onClick={() => props.add(props.persons)}>
                    Add Person</button>
            </div>
        </div>
    );
};

export default cockpit;