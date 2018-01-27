require('react-select/dist/react-select.css')
require('../../css/index.css')
require('./index.scss')
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import ReactForms from '../../dist/'
import { IReactFormConfig } from '../../dist/types'
import Select from 'react-select'

interface ReactFormsProps { };

interface ReactFormsState {
  input: any;
};

const customComponentResolver = (type: string) => {
  switch (type) {
    case 'react-select':
      return (props: any) =>
        <Select
          options={props.config.options}
          value={props.value}
          {...props.componentProps}
        />
  }
}

const customValueResolver = (config: any, value: any) => {
  switch (config.type) {
    case 'react-select':
      return value ? value.value : ''
  }
}

class ReactFormsExamples extends React.Component<ReactFormsProps, ReactFormsState> {
  forms: ReactForms
  constructor(props: ReactFormsProps) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.validate = this.validate.bind(this)
    this.state = {
      input: {
        text: '',
      },
    }
  }

  private onChange(a: ReactFormsState) {
    this.setState(a)
  }

  private validate() {
    const errors = this.forms.validate()
  }

  public render(): JSX.Element {
    const config: IReactFormConfig[] = [
      {
        id: 'group-1',
        type: 'group',
        displayName: 'Group 1',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia impedit minus laudantium, excepturi unde tenetur commodi voluptatem iste, beatae saepe ipsa consequatur maiores eaque provident dolor qui numquam nam laborum.',
        elements: [
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
        ],
      },
      {
        id: 'group-2',
        type: 'group',
        displayName: 'Group 2',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil officia possimus rerum, dolor ea temporibus quidem necessitatibus omnis praesentium cumque magnam, autem atque dignissimos consequatur. Distinctio, consequatur nemo? Quibusdam, maiores!',
        elements: [
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
        ],
      },
    ]
    return (
      <div className="mx-400">
        <h1>React Forms</h1>
        <ReactForms
          secondaryButton={false}
          onSubmit={this.validate}
          ref={(el) => this.forms = el}
          customValueResolvers={[customValueResolver]}
          customComponentResolvers={[customComponentResolver]}
          onChange={this.onChange}
          config={config}
          store={this.state}>
        </ReactForms>
      </div>
    )
  }
}

ReactDOM.render(<ReactFormsExamples />, document.getElementById('app'))
