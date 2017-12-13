import * as React from 'react'
const cn = require('classnames')

import {
  IFormElementProps,
} from './types'


const InputTextbox: React.SFC<IFormElementProps> = ({
  value = '',
  config,
  additionalProps = {},
}) => {
  return <div className={cn('form-Element', 'input-text', config.className)}>
    <input
      type="text"
      value={value}
      placeholder={config.placeholder}
      name={config.id}
      id={config.id}
      { ...additionalProps }
    />
  </div>
}

export default InputTextbox
