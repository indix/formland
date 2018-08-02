import * as React from 'react'

import { getNewState } from './utils'

import Template from './template'
import Group from './group'
import InputGeneric from './input-generic'
import Toggle from './input-toggle'
import Radio from './input-radio'
import Dropdown from './input-dropdown'
import Checkbox from './input-checkbox'
import Range from './input-range'
import TextArea from './input-textarea'

const dotObject = require('dot-prop-immutable')

import {
  IFormlandConfig,
  IOptions,
  ISupportedGlobalCallbacks,
  IFormErrors,
} from './types'

interface FormlandsProps extends ISupportedGlobalCallbacks<{}> {
  config: IFormlandConfig[]
  store?: any
  customComponentResolvers?: { (type: string): any }[]
  customValueResolvers?: { (config: IFormlandConfig, args: any[]): any }[]
  useNativeEvent?: boolean
  onSubmit?: (e?: any) => void
  primaryButton?: string | false | undefined
  secondaryButton?: string | false | undefined
  onSecondaryButtonClick?: (e?: any) => void
}
export interface IFormlandConfig extends IFormlandConfig {}
interface FormlandsState {
  validate?: boolean
}

class Formlands extends React.Component<FormlandsProps, FormlandsState> {
  errors: {
    [key: string]: IFormErrors[]
  }

  static defaultProps = {
    useNativeEvent: false,
    store: {},
    primaryButton: 'Submit',
    secondaryButton: 'Cancel',
    onSecondaryButtonClick: () => {},
    onSubmit: () => {},
  }

  constructor(props: FormlandsProps) {
    super(props)
    this.state = {
      validate: false,
    }
    this.errors = {}
    this.onSubmit = this.onSubmit.bind(this)
  }

  public validate() {
    this.setState({
      validate: true,
    })
    return this.errors
  }

  private eventProxyHandlers(
    config: IFormlandConfig,
    callback: any,
    args: any[],
  ) {
    getNewState(
      callback,
      this.props.store,
      this.props.customValueResolvers,
    ).apply(null, [config].concat(...args))
  }

  private bindCallbacks(config: IFormlandConfig, callbacks: any): any {
    const bindedCallbacks: any = {}
    Object.keys(callbacks || {}).forEach(event => {
      if (callbacks[event]) {
        bindedCallbacks[event] = (...args: any[]): void => {
          if (this.props.useNativeEvent || event !== 'onChange') {
            callbacks[event].apply(null, [config].concat(...args))
          } else {
            this.eventProxyHandlers(config, callbacks[event], args)
          }
        }
      }
    })
    return bindedCallbacks
  }

  private getFormElement(type: string) {
    switch (type) {
      case 'color':
      case 'date':
      case 'email':
      case 'month':
      case 'number':
      case 'text':
      case 'tel':
      case 'time':
      case 'url':
      case 'week':
        return InputGeneric
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
        const { customComponentResolvers } = this.props
        if (customComponentResolvers) {
          let Component = null
          let i = 0
          while (i < customComponentResolvers.length) {
            Component = customComponentResolvers[i](type)
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

  private onSubmit(e: any) {
    e.preventDefault()
    this.props.onSubmit(e)
  }

  private validateField(value: any, config: IFormlandConfig) {
    if (typeof config.validation === 'function') {
      return config.validation(value) || null
    }
    if (
      typeof config.required !== 'undefined' &&
      typeof value === 'undefined'
    ) {
      return typeof config.required === 'string'
        ? config.required
        : 'Required Value'
    }
    return null
  }

  private getFormGroup(
    config: IFormlandConfig,
    callbacks: any,
    store: any,
  ): JSX.Element {
    return (
      <Group config={config} key={config.id}>
        {this.getFormElements(config.elements, callbacks, store, config.id)}
      </Group>
    )
  }

  private getFormElements(
    configs: IFormlandConfig[],
    callbacks: any,
    store: any,
    groupId: string = 'default',
  ) {
    return configs.map((config, i) => {
      if (config.type === 'group') {
        return this.getFormGroup(config, callbacks, store)
      }
      if (config.isHidden && config.isHidden(store)) {
        return false
      }
      if (!config.resultPath) {
        return new Error(`Provide a resultPath in config[${i}]`)
      }
      const value = dotObject.get(store, config.resultPath, undefined)
      const error = this.validateField(value, config)
      this.errors[groupId] = this.errors[groupId] || []
      this.errors[groupId][i] = {
        id: config.id,
        error,
      }
      const props = {
        config,
        value,
        callbacks: this.bindCallbacks(config, callbacks),
      }

      const Element: any = this.getFormElement(config.type)

      return (
        <Template
          error={(this.state.validate || config.instantValidation) && error}
          config={config}
          store={store}
          key={config.id}
        >
          {Element ? <Element {...props} /> : null}
        </Template>
      )
    })
  }

  public render(): JSX.Element {
    const {
      config,
      onBlur,
      onChange,
      onFocus,
      store,
      primaryButton,
      secondaryButton,
      onSecondaryButtonClick,
    } = this.props
    const formElements = this.getFormElements(
      config,
      { onChange, onBlur, onFocus },
      store,
    )
    return (
      <form className="formland" onSubmit={this.onSubmit}>
        <div className="form-elements">{formElements}</div>
        <div className="form-buttons-container">
          {this.props.children || (
            <div className="form-buttons">
              {secondaryButton && (
                <button
                  className="cancel"
                  onClick={onSecondaryButtonClick}
                  type="button"
                >
                  {secondaryButton}
                </button>
              )}
              {primaryButton && (
                <button className="submit" type="submit">
                  {primaryButton}
                </button>
              )}
            </div>
          )}
        </div>
      </form>
    )
  }
}

export default Formlands
