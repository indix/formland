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

const InputTextbox: React.SFC<InputTextboxProps> = ({
  value = '',
  config,
  additionalProps = {},
}) => {
  return <input
    type="text"
    value={value}
    placeholder={config.placeholder}
    name={config.id}
    id={config.id}
    { ...additionalProps }
  />
}

export default InputTextbox
