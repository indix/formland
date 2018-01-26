import * as React from 'react'
const cn = require('classnames')

import {
  IFormElementProps,
} from './types'

const InputTextArea: React.SFC<IFormElementProps> = ({
  callbacks = {},
  config,
  value = '',
}) => {
  return <div className={cn('form-element', 'input-textarea', config.className)}>
    <textarea
        placeholder={config.placeholder}
        className={config.className}
        name={config.id}
        id={config.id}
        value={value}
        { ...callbacks }
        { ...config.componentProps }
    />
  </div>
}

export default InputTextArea
