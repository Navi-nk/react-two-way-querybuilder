# React Two Way Querybuilder - Additional input Tag

This is a fork of the [React-Two-Way-Querybuilder](https://github.com/Lefortov/react-two-way-querybuilder) retrofitted for one of my project requirements.

The modified component can now accept an additional select field along with the standard three fields in rule 

![image](https://github.com/Navi-nk/react-two-way-querybuilder/tree/master/blob/builder-1.png) 

## Usage
```
    import React, { Component } from 'react';
    import TwoWayQuerybuilder from './TwoWayQuerybuilder';

     const fields = [
      { name: 'Weight', operators: 'all', label: 'Weight', input: { type: 'number' }, unitInput:['KG','Pound'] },
      { name: 'BMI', operators: 'all', label: 'BMI', input: { type: 'number' }, unitInput:['kg/m2'] },
      { name: 'Height', operators: 'all', label: 'Height', input: { type: 'text' }, unitInput:['meter','feet'] }
    ];
 
    const config = {
      query: "((Weight='90 : kg' AND Height='1.9 : meter') AND BMI='26 : kg/m2')",
    };

    class App extends Component {
 
        handleChange(event) {
          console.log('query', event.query);
        }
 
        render() {
            return (
                 <TwoWayQuerybuilder config={config} fields={fields} onChange={this.handleChange} />
            );
        }
    }

export default App;
```
##License

React-two-way-quierybuidler is MIT licensed


