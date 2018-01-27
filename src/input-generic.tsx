import * as React from 'react'
const cn = require('classnames')

import {
  IFormElementProps,
} from './types'


const InputGeneric: React.SFC<IFormElementProps> = ({
  value = '',
  config,
  callbacks = {},
}) => {
  return <div className={cn('form-Element', 'input-text', config.className)}>
    <input
      type={config.type}
      value={value}
      placeholder={config.placeholder}
      name={config.id}
      id={config.id}
      { ...callbacks }
      { ...config.componentProps }
    />
  </div>
}

export default InputGeneric
