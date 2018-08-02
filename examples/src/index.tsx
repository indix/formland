require('react-select/dist/react-select.css')
require('codemirror/lib/codemirror.css')
require('codemirror/theme/zenburn.css')
require('codemirror')
require('../../css/index.css')
require('./index.scss')

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Select from 'react-select'
import { UnControlled as CodeMirror } from 'react-codemirror2'

import Formland from '../../lib'
import config from './form-config'

interface FormlandProps {}

interface FormlandState {
  input?: any
  errors?: any
}

const customComponentResolver = (type: string) => {
  switch (type) {
    case 'react-select':
      return (props: any) => (
        <Select
          {...props.callbacks}
          {...props.config.componentProps}
          options={props.config.options}
          value={props.value}
        />
      )
  }
}

const customValueResolver = (config: any, value: any) => {
  switch (config.type) {
    case 'react-select':
      return value ? value.value : ''
  }
}

class FormlandExamples extends React.Component<FormlandProps, FormlandState> {
  forms: Formland
  constructor(props: FormlandProps) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.validate = this.validate.bind(this)
    this.state = {
      input: {},
      errors: {},
    }
  }

  private onChange(a: FormlandState) {
    this.setState(a)
  }

  private validate() {
    this.setState({
      errors: this.forms.validate(),
    })
  }

  public render(): JSX.Element {
    return (
      <div className="react-forms-example">
        <div className="banner">
          <h1>Formland</h1>
          <p>
            A simple, super-flexible, extensible config based form generator for
            React.
          </p>
          <div className="button-container">
            <a href="https://github.com/praneshr/react-forms">
              <button>Github</button>
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="mx-400">
              <h4>Basic Form</h4>
              <a href="https://github.com/praneshr/react-forms/blob/master/examples/src/index.tsx">
                (View source)
              </a>
              <Formland
                secondaryButton={false}
                onSubmit={this.validate}
                ref={el => (this.forms = el)}
                customValueResolvers={[customValueResolver]}
                customComponentResolvers={[customComponentResolver]}
                onChange={this.onChange}
                config={config}
                store={this.state}
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="section config">
              <h4>Config</h4>
              <CodeMirror
                value={JSON.stringify(config, null, 4)}
                options={{
                  theme: 'zenburn',
                }}
              />
            </div>
            <div className="section store">
              <h4>Store</h4>
              <CodeMirror
                onChange={() => {}}
                value={JSON.stringify(this.state.input, null, 4)}
                options={{
                  theme: 'zenburn',
                  readOnly: true,
                }}
              />
            </div>
            <div className="section store">
              <h4>Errors</h4>
              <CodeMirror
                onChange={() => {}}
                value={JSON.stringify(this.state.errors, null, 4)}
                options={{
                  theme: 'zenburn',
                  readOnly: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<FormlandExamples />, document.getElementById('app'))
