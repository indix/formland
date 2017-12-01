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
        resultPath: 'input.name',
        displayName: 'Name',
        componentProps: {
          autoFocus: true,
        },
        modifyStoreOnChange: (config, val, oldStore: any) => {
          if (val.includes('pranesh')) {
            oldStore.input.address = 'Tamil nadu'
          }
          return oldStore
        }
      },
      {
        id: 'input-2',
        type: 'text',
        resultPath: 'input.address',
        displayName: 'Name'
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
