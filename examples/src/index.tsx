require('react-select/dist/react-select.css')
require('../../css/index.css')
require('./index.scss')
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Formgenerator, { getNewState } from '../../dist/'
import { IReactFormConfig } from '../../dist/types'
import Select from './react-select'

interface ReactFormsProps { };

interface ReactFormsState {
  input: any;
};

const customComponentResolver = (type: string) => {
  switch (type) {
    case 'react-select':
      return Select
  }
}

const customValueResolver = (config: any, value: any) => {
  switch (config.type) {
    case 'react-select':
      return value ? value.value : ''
  }
}

class ReactForms extends React.Component<ReactFormsProps, ReactFormsState> {
  formgenerator: Formgenerator
  constructor(props: ReactFormsProps) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.validate = this.validate.bind(this)
    this.state = {
      input: {
        text: 'Pranesh',
      },
    }
  }

  private onChange(a: ReactFormsState) {
    this.setState(a)
  }

  private validate() {
    const errors = this.formgenerator.validate()
  }

  public render(): JSX.Element {
    const config: IReactFormConfig[] = [
      {
        id: 'text',
        type: 'text',
        resultPath: 'input.text',
        displayName: 'Input Textbox',
        placeholder: 'Enter something',
      },
      {
        id: 'textarea',
        type: 'textarea',
        resultPath: 'input.textarea',
        displayName: 'Input Textarea',
        placeholder: 'hello',
        optional: true,
      },
      {
        id: 'checkbox',
        type: 'checkbox',
        helpText: 'help text',
        required: true,
        resultPath: 'input.checkbox',
        displayName: 'Input Checkbox',
        options: [
          {
            value: 'one',
            label: 'One',
          },
          {
            value: 'two',
            label: 'Two',
          },
          {
            value: 'three',
            label: 'Three',
          },
        ],
      },
      {
        id: 'radio',
        type: 'radio',
        resultPath: 'input.radio',
        displayName: 'Input Radio',
        options: [
          {
            value: 'one',
            label: 'One',
          },
          {
            value: 'two',
            label: 'Two',
          },
          {
            value: 'three',
            label: 'Three',
          },
        ],
      },
      {
        id: 'dropdown',
        type: 'dropdown',
        resultPath: 'input.dropdown',
        displayName: 'Input Dropdown',
        options: [
          {
            value: 'one',
            label: 'One',
          },
          {
            value: 'two',
            label: 'Two',
          },
          {
            value: 'three',
            label: 'Three',
          },
        ],
      },
      {
        id: 'toggle',
        type: 'toggle',
        resultPath: 'input.toggle',
        displayName: 'Input Toggle',
      },
      {
        id: 'range',
        type: 'range',
        resultPath: 'input.range',
        displayName: 'Input Range',
        componentProps: {
          step: 1,
          min: 0,
          max: 50,
        },
      },
    ]
    return (
      <div className="mx-400">
        <h1>React Forms</h1>
        <Formgenerator
          ref={(el) => this.formgenerator = el}
          customValueResolvers={[customValueResolver]}
          customComponentsResolvers={[customComponentResolver]}
          onChange={this.onChange}
          config={config}
          store={this.state} />
        <button onClick={this.validate}>Validate</button>
      </div>
    )
  }
}

ReactDOM.render(<ReactForms />, document.getElementById('app'))
