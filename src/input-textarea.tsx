import * as React from 'react'
const cn = require('classnames')

import { IFormElementProps } from './types'

const InputTextArea: React.SFC<IFormElementProps> = ({
  callbacks = {},
  config,
  value = '',
}) => {
  return (
    <div className={cn('form-element', 'input-textarea', config.className)}>
      <textarea
        {...callbacks}
        {...config.componentProps}
        placeholder={config.placeholder}
        className={config.className}
        name={config.id}
        id={config.id}
        value={value}
      />
    </div>
  )
}

export default InputTextArea
