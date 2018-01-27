import * as React from 'react'
const cn = require('classnames')

import { IFormElementProps } from './types'

const InputGeneric: React.SFC<IFormElementProps> = ({
  value = '',
  config,
  callbacks = {},
}) => {
  return (
    <div className={cn('form-Element', 'input-text', config.className)}>
      <input
        {...callbacks}
        {...config.componentProps}
        type={config.type}
        value={value}
        placeholder={config.placeholder}
        name={config.id}
        id={config.id}
      />
    </div>
  )
}

export default InputGeneric
