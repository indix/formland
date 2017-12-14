import * as React from 'react'
const cn = require('classnames')

import {
  IFormElementProps,
} from './types'

const InputRange: React.SFC<IFormElementProps> = ({ value, config, additionalProps }) => {
  return <div className={cn('form-element', 'input-range', config.className)}>
    {
      config.showValue !== false
      && <div className="value">{value || additionalProps.min}</div>
    }
    <input
      type="range"
      value={value || additionalProps.min}
      name={config.id}
      id={config.id}
      { ...additionalProps }
    />
    {
      config.showRange !== false
      && <div className="range">
        <span className="min">{additionalProps.min}</span>
        <span className="max">{additionalProps.max}</span>
      </div>
    }
  </div>
}

export default InputRange
