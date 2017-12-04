import * as React from 'react'

import { getNewState } from './utils'

import Template from './template'
import TextBox from './input-textbox'
import Toggle from './input-toggle'
import Radio from './input-radio'
import Dropdown from './input-dropdown'

const dotObject = require('dot-prop-immutable')

import {
  IReactFormConfig,
  IOptions,
  ISupportedGlobalCallbacks,
} from './types'

export interface ReactFormsProps extends ISupportedGlobalCallbacks<{}>{
  config: IReactFormConfig[]
  store?: any;
};

export interface ReactFormsState {};

class ReactForms extends React.Component<ReactFormsProps, ReactFormsState> {

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
      default:
        return <span/>
    }
  }

  private getFormElements(configs: IReactFormConfig[], callbacks: any, store: any) {
    return configs.map((config, i) => {
      if (config.isHidden && config.isHidden(store)) {
        return false
      }
      if (!config.resultPath) {
        return new Error(`Provide a resultPath in formConfig[${i}]`)
      }
      const value = dotObject.get(store, config.resultPath, undefined)
      const props = {
        config,
        value,
        additionalProps: {
          ...this.bindCallbacks(config, callbacks),
          ...(config.componentProps || {}),
        }
      }

      const Element: any = this.getFormElement(config.type)

      return <Template config={config} store={store} key={config.id}>
        <Element { ...props} />
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
    return <div className="react-form">
      {formElements}
    </div>
  }
}

export {
  getNewState,
}
export default ReactForms
