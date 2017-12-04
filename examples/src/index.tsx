import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Formgenerator, { getNewState } from '../../dist/'
import { IReactFormConfig } from '../../dist/types'

interface ReactFormsProps { };

interface ReactFormsState { };

class ReactForms extends React.Component<ReactFormsProps, ReactFormsState> {
  constructor(props: ReactFormsProps) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      input: {
        name: 'Pranesh'
      }
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
        displayName: 'Name'
      },
      {
        id: 'input-3',
        type: 'dropdown',
        resultPath: 'input.radio',
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
        ]
      }
    ]
    return (
      <Formgenerator
        onChange={getNewState(this.onChange, this.state)}
        config={config}
        store={this.state} />
    );
  }
}

ReactDOM.render(<ReactForms />, document.getElementById('app'))
