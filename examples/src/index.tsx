import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Formgenerator from '../../dist/'

interface FormGeneratorProps {};

interface FormGeneratorState {};

class FormGenerator extends React.Component<FormGeneratorProps, FormGeneratorState> {
  public render(): JSX.Element {
    return (
      <Formgenerator/>
    );
  }
}

ReactDOM.render(<FormGenerator />, document.getElementById('app'))
