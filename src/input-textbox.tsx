import * as React from 'react'

import {
  IReactFormConfig,
  ISupportedGlobalCallbacks,
} from './types'

export interface InputTextboxProps {
  value: any;
  config: IReactFormConfig;
  additionalProps: any,
}

export interface InputTextboxState {};

class InputTextbox extends React.Component < InputTextboxProps,
  InputTextboxState> {
  ref: any;
  public getInstance() {
    return this.ref
  }
  public render(): JSX.Element {
    const {
      value = '',
      config,
      additionalProps = {},
    } = this.props
    return <input
      ref={(el: JSX.Element) => this.ref = el}
      type="text"
      value={value}
      placeholder={config.placeholder}
      name={config.id}
      id={config.id}
      { ...additionalProps }
    />
  }
}

export default InputTextbox