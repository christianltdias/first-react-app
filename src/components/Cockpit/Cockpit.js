import React, { useEffect } from 'react';
import classes from './Cockpit.module.css';

const Cockpit = props => {

    // useEffect is a hook that is called
    // the second argument is the parameter that
    // when changed, call this function
    // An empty array, the function is called once
    useEffect(() => {
        console.log('{Cockpit.js} useEffect')
        const timer = setTimeout(() => {
            alert('Saved data to cloud')
        }, 1000);

        return () => {
            clearTimeout(timer);
            console.log('{Cockput.js} cleanup function called at end of render cycle')
        };

    }, []);

    useEffect(()=>{
        console.log('{Cockpit.js} 2nd useEffect call')
    })



    const insertClasses = [];
    let btnClass = [classes.Button];

    if (props.showPersons) {
        btnClass.push(classes.Red)
    }

    if (props.personsLength <= 2) {
        insertClasses.push(classes.red); // Classes = ['red']
    }
    if (props.personsLength <= 1) {
        insertClasses.push(classes.bold); // classes = ['red','bold']
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
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

// Just renders cockpit when it props changes 
export default React.memo(Cockpit);