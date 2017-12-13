import * as React from 'react'
const cn = require('classnames')

import {
  IFormElementProps,
} from './types'

const InputRange: React.SFC<IFormElementProps> = ({ value = '', config, additionalProps }) => {
  return <div className={cn('form-element', 'input-radio', config.className)}>
    <input
      type="range"
      value={value}
      name={config.id}
      id={config.id}
      { ...additionalProps }
    />
  </div>
}

export default InputRange
