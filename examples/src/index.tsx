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

const customValueResolver = (config: any, args: any[]) => {
  switch (config.type) {
    case 'react-select':
      return args[0].value
  }
}

class ReactForms extends React.Component<ReactFormsProps, ReactFormsState> {
  constructor(props: ReactFormsProps) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      input: {
        name: 'Pranesh',
      },
    }
  }

  private onChange(a: ReactFormsState) {
    this.setState(a)
  }

  public render(): JSX.Element {
    const config: IReactFormConfig[] = [
      {
        id: 'input',
        type: 'text',
        resultPath: 'name.firstName',
        displayName: 'First Name',
        placeholder: 'Enter your first name',
        optional: true,
      },
      {
        id: 'input-2',
        type: 'textarea',
        resultPath: 'input.toggle',
        displayName: 'Name',
        placeholder: 'hello',
      },
      {
        id: 'input-3',
        type: 'checkbox',
        resultPath: 'input.radio1',
        displayName: 'Name',
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
        id: 'input-4',
        type: 'radio',
        resultPath: 'input.radio2',
        displayName: 'Name',
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
        id: 'input-33',
        type: 'dropdown',
        resultPath: 'input.radio3',
        displayName: 'Name',
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
    ]
    return (
      <Formgenerator
        customComponentsResolver={[customComponentResolver]}
        onChange={getNewState(this.onChange, this.state, [customValueResolver])}
        config={config}
        store={this.state} />
    );
  }
}

ReactDOM.render(<ReactForms />, document.getElementById('app'))
