# React Forms

A simple, supercool, extensible config based form element generator for React.

## Features

- All basic form elements available out of the box
- Infinite custom elements as plugins
- Stateless components
- Total control over every single form element
- Generate output value in your desired structure

## Install

```bash
  npm i @praneshravi/react-forms

  # or

  yarn add @praneshravi/react-forms

```

## Usage

```javascript
import '@praneshravi/react-forms/css/index.css'
import React, { Component } from 'react'
import Form, { getNewState } from '@praneshravi/react-forms'

class Example extends Component {
  constructor() {
    super()
    this.state = {}
    this.onChange = this.onChange.bind(this)
  }

  onChange(newState) {
    this.setState{newState}
  }

  render() {
    const config = [
      {
        id: 'firstName',
        type: 'text',
        displayName: 'First Name',
        resultPath: 'name.firstName',
        placeholder: 'Enter your first name',
      },
      {
        id: 'lastName',
        type: 'text',
        displayName: 'Last Name',
        resultPath: 'name.lastName',
        placeholder: 'Enter your last name',
      },
      {
        id: 'gender',
        type: 'dropdown',
        displayName: 'dropdown',
        options: [
          {
            value: 'male',
            label: 'Male',
          },
          {
            value: 'female',
            label: 'Female',
          },
        ]
        resultPath: 'gender',
        placeholder: 'Enter your last name',
      },
      {
        id: 'age',
        type: 'number',
        displayName: 'Age',
        resultPath: 'age',
        placeholder: 'Enter your age',
      },
    ]

    return <Form
      config={config}
      store={this.state}
      onChange={getNewState(this.onChange, this.state)} />
  }
}
```

### Custom Form Elements
Custom form elements can be added to any instance of React-Forms via `customComponentsResolver` prop and `customValueResolver` param of `getNewState`. `customComponentsResolver` takes an array of function and expected to return a React component instance based on the `type` which is passed as param.

To resolve the `value` of the custom component, add additional params `customValueResolver` to `getNewState`. This will be a function which will receive `onChange` event params and it is expected to return a value. For example:

```javascript
import '@praneshravi/react-forms/css/index.css'
import React, { Component } from 'react'
import Select from 'react-select'
import Form, { getNewState } from '@praneshravi/react-forms'

const customComponentsResolver = (type) => {
  switch(type) {
    case 'custom-dropdown':
      return ({ config, value = '', additionalProps = {}}) =>
        <Select
          value={value}
          options={config.options}
          {...additionalProps} />
    default:
      return <span/>
  }
}

const customValueResolver = (config, args) => {
  switch(config.type) {
    case 'custom-dropdown':
      return args[0].value
    default
      return null
  }
}

class Example extends Component {
  constructor() {
    super()
    this.state = {}
    this.onChange = this.onChange.bind(this)
  }

  onChange(newState) {
    this.setState{newState}
  }

  render() {
    const config = [
      {
        id: 'firstName',
        type: 'custom-dropdown',
        resultPath: 'country'
        displayName: 'Shipping Country',
        placeholder: 'Select a country',
        options: [
          {
            value: 'india',
            label: 'India',
          },
          {
            value: 'usa',
            label: 'The United States',
          },
          {
            value: 'china',
            label: 'China',
          }
        ],
      },
    ]

    return <Form
      customComponentsResolver={[customComponentsResolver]}
      config={config}
      store={this.state}
      onChange={getNewState(this.onChange, this.state, customValueResolver)} />
  }
}
```
