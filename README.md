# React Forms

A simple, super-cool, super-flexiable, extensible config based form element generator for React.

## Features

- Super flexible
- Config based UI creation
- Take super control over all the form elements
- Use third party components as form element


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
    this.setState(newState)
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
    ]

    return <Form
      config={config}
      store={this.state}
      onChange={getNewState(this.onChange, this.state)} />
  }
}
```

### Supported Props
|Property|Type|Default|Description|
|--------|----|-------|-----------|
|config|array|[]|Config to populate form elements.|
|store|object \| array|{}| The data store to read the values from.|
|onChange| function| undefined| Callback for `onChange` event|
|onBlur|function|undefined|Callback for `onBlur` event|
|onFocus|function|undefined|Callback fro `onFocus` event|
|customComponentsResolver|array| undefined| Array of resolvers to resolve custom form elements|

### Configuration File Options
|Property   |Type   |Default   |Description   |
|---|---|---|---|
|id|string|undefined|ID for each form field. This should be unique.|
|type|string|undefined|Type of the form field to be generated. The native package supports `text | number | radio | checkbox | range | textarea | dropdown` types. New types can be added via `Custom Form Elements`.|
|resultPath|string|undefined|A [dot-prop-immutable](https://github.com/debitoor/dot-prop-immutable) compatible path to store the form field value.|
|displayName|string|undefined|Display text for the form field.|
|className|string|undefined|ClassName for the root form field element.|
|isHidden|function|undefined|Method to hide form field element in runtime. `(store) => boolean`|
|optional|boolean|undefined|Says if the form field is optional.|
|placeholder|string|undefined| Placeholder text for the form elements|
|options|array|[]|Array of options.|
|separator|string|','|Separator to join multi values like checkbox, multi-dropdown, etc.|
|topComponent|function|undefined|Methode to render any additional elements to the top of the form field element. `(store) => JSX.Element`|
|simpleValues|boolean| false| Handle multi values as string|
|bottomComponent|function|undefined|Methode to render any additional elements to the bottom of the form field element. `(store) => JSX.Element`|
|componentProps|object|undefined| Any additional props that should be to the underlying form field element. For example, to make the `dropdown` multi-select, pass `componentProps: { multiple: true }`.|
|infoText|string|undefined|Additional information text displayed to the right of the `toggle` form field element.|
|showValue|boolean|true|Show `range` value.|
|showRange|boolean|true|Show the min and max range for `range`.|
|instantValidation|boolean|false|Do validation on user input.|
|required|boolean|false|Make the field required.|
|validation|function|undefined|Mathod to perform validation. `(value) => errorMessage|null`|
|modifyStoreBeforeChange|function|undefined| Method to modify store directly before any value is stored. `(config, value, store) => store`.|

### Resolve values form events
As all the components used in react-forms are controlled components, you need to use a `onChange` handler to get the value from the event and set it in the store. When it comes to multiple components, it will become a bit messy to get and set value.

To make this easy, react-forms provides a utility called `getNewState` to resolve and set values. `getNewState(callback, store [, customResolvers])`

|Parameter|type|default|description|
|---------|----|-------|-----------|
|callback|function|undefined|The function to be called with the new value on `onChange` event.|
|store| object \| array|{}| The data store(can be the state, redux or mobx).|
|customResolvers| array | undefined| Array of custom value resolvers to resolve values for custom components. This is an optional param.|

```javascript
<Form
  config={config}
  store={this.state}
  onChange={getNewState(
  	this.onChange,
  	this.state,
  	[reactSelectValueResolver],
  )} />

```

### Modify store value directly from config
You can access the store and change any store value directly from the config using `modifyStoreBeforeChange` method. This method will be called during `onChange` event of the form with the config, value and the store as params. You can modify the state and return it. It will be used for the next render.

To make this work, you need to use `getNewState` utility provided by react-forms. It takes three arguments, the event callback function, the store and an array of optional custom value resolvers.

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
    this.setState(newState)
  }

  render() {
    const config = [
      {
        id: 'firstName',
        type: 'text',
        displayName: 'First Name',
        resultPath: 'name.firstName',
        placeholder: 'Enter your first name',
        modifyStoreBeforeChange: (config, value, store) => {
        	store.readonly = value
        	return store
        },
      },
      {
        id: 'readyonly',
        type: 'text',
        displayName: 'Output',
        resultPath: 'readonly',
        componentProps: {
        	disabled: true,
        },
      },
    ]

    return <Form
      config={config}
      store={this.state}
      onChange={getNewState(this.onChange, this.state)} />
  }
}
```

If you're not using `getNewState`, you won't be able use `modifyStoreBeforeChange`.


### Custom Form Elements
Custom form elements can be added to any instance of react-forms via `customComponentsResolver` prop and `customValueResolver` param of `getNewState`. `customComponentsResolver` takes an array of function and expected to return a React component instance based on the `type` which is passed as param.

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
    this.setState(newState)
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
