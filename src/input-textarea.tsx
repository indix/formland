import * as React from 'react'
const cn = require('classnames')

import {
  IFormElementProps,
} from './types'

const InputTextArea: React.SFC<IFormElementProps> = ({
  additionalProps,
  config,
  value = '',
}) => {
  return <div className={cn('form-element', 'input-textarea', config.className)}>
      <textarea
        className={config.className}
        name={config.id}
        id={config.id}
        value={value}
        { ...additionalProps }
    />
  </div>
}

export default InputTextArea
