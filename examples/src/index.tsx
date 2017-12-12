require('react-select/dist/react-select.css')
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
    default:
      return null
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
        resultPath: 'input.text',
        displayName: 'Name',
      },
      {
        id: 'input-2',
        type: 'toggle',
        resultPath: 'input.toggle',
        displayName: 'Name',
      },
      {
        id: 'input-3',
        type: 'react-select',
        resultPath: 'input.radio',
        displayName: 'Name',
        componentProps: {
          clearable: false,
        },
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
        onChange={getNewState(this.onChange, this.state, customValueResolver)}
        config={config}
        store={this.state} />
    );
  }
}

ReactDOM.render(<ReactForms />, document.getElementById('app'))
