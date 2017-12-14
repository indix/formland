import * as React from 'react'

import { getNewState } from './utils'

import Template from './template'
import TextBox from './input-textbox'
import Toggle from './input-toggle'
import Radio from './input-radio'
import Dropdown from './input-dropdown'
import Checkbox from './input-checkbox'
import Range from './input-range'
import TextArea from './input-textarea'

const dotObject = require('dot-prop-immutable')

import {
  IReactFormConfig,
  IOptions,
  ISupportedGlobalCallbacks,
  IFormErrors,
} from './types'

export interface ReactFormsProps extends ISupportedGlobalCallbacks<{}> {
  config: IReactFormConfig[]
  store?: any;
  customComponentsResolver?: {(type: string): any}[];
};

export interface ReactFormsState {
  validate?: boolean;
};

class ReactForms extends React.Component<ReactFormsProps, ReactFormsState> {
  errors: IFormErrors[]
  constructor(props: ReactFormsProps) {
    super(props)
    this.state = {
      validate: false,
    }
    this.errors = []
  }

  public validate() {
    this.setState({
      validate: true,
    })
    return this.errors
  }

  private bindCallbacks (config: IReactFormConfig, callbacks: any): any {
    const bindedCallbacks: any = {}
    Object.keys(callbacks || {}).forEach((event) => {
      if (callbacks[event]) {
        bindedCallbacks[event] = (...args: any[]): void => {
          callbacks[event].apply(null, [config].concat(args))
        }
      }
    })
    return bindedCallbacks
  }

  private getFormElement(type: string) {
    switch (type) {
      case 'text':
        return TextBox
      case 'toggle':
        return Toggle
      case 'radio':
        return Radio
      case 'dropdown':
        return Dropdown
      case 'checkbox':
        return Checkbox
      case 'range':
        return Range
      case 'textarea':
        return TextArea
      default:
        const { customComponentsResolver } = this.props
        if (customComponentsResolver) {
          let Component = null
          let i = 0
          while (i < customComponentsResolver.length) {
            Component = customComponentsResolver[i](type)
            if (Component) {
              break
            }
            i++
          }
          return Component
        }
        return null
    }
  }

  private validateField(value: any, config: IReactFormConfig) {
    if (typeof config.validation === 'function') {
      return config.validation(value) || null
    }
    if (typeof config.required !== 'undefined' && typeof value === 'undefined') {
      return typeof config.required === 'string'
        ? config.required
        : 'Required Value'
    }
    return null
  }

  private getFormElements(configs: IReactFormConfig[], callbacks: any, store: any) {
    return configs.map((config, i) => {
      if (config.isHidden && config.isHidden(store)) {
        return false
      }
      if (!config.resultPath) {
        return new Error(`Provide a resultPath in config[${i}]`)
      }
      const value = dotObject.get(store, config.resultPath, undefined)
      const error = this.validateField(value, config)
      this.errors[i] = {
        id: config.id,
        error,
      }
      const props = {
        config,
        value,
        additionalProps: {
          ...this.bindCallbacks(config, callbacks),
          ...(config.componentProps || {}),
        },
      }

      const Element: any = this.getFormElement(config.type)

      return <Template
        error={(this.state.validate || config.instantValidation) && error}
        config={config}
        store={store}
        key={config.id}>
        {
          Element
            ? <Element { ...props} />
            : null
        }
      </Template>
    })
  }

  public render(): JSX.Element {
    const {
      config,
      onBlur,
      onChange,
      onFocus,
      store,
    } = this.props
    const formElements = this.getFormElements(
      config,
      { onChange, onBlur, onFocus },
      store,
    )
    return <div className="react-forms">
      {formElements}
    </div>
  }
}

export {
  getNewState,
}
export default ReactForms
