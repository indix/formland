import * as React from 'react'
const cn = require('classnames')

import { IFormElementProps } from './types'

const InputRange: React.SFC<IFormElementProps> = ({
  value,
  config,
  callbacks = {},
}) => {
  const componentProps = config.componentProps || {}
  return (
    <div className={cn('form-element', 'input-range', config.className)}>
      {componentProps.showValue !== false && (
        <div className="value">{value || componentProps.min}</div>
      )}
      <input
        {...callbacks}
        {...componentProps}
        type="range"
        value={value || componentProps.min}
        name={config.id}
        id={config.id}
      />
      {componentProps.showRange !== false && (
        <div className="range">
          <span className="min">{componentProps.min}</span>
          <span className="max">{componentProps.max}</span>
        </div>
      )}
    </div>
  )
}

export default InputRange
