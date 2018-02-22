import * as React from 'react'
const cn = require('classnames')

import { IFormElementProps } from './types'

const InputRadio: React.SFC<IFormElementProps> = ({
  value = '',
  config,
  callbacks = {},
}) => {
  const radioInputs = (config.options || []).map(option => {
    const unique = Math.random()
      .toString(36)
      .slice(-5)
    return (
      <span className="radio-button" key={`${config.id}_${option.value}`}>
        <input
          {...callbacks}
          {...config.componentProps}
          checked={value === option.value}
          className={config.className}
          type="radio"
          id={`${config.id}_${option.value}_${unique}`}
          value={option.value}
          disabled={option.disabled || false}
        />
        <label htmlFor={`${config.id}_${option.value}_${unique}`}>
          {option.label}
        </label>
      </span>
    )
  })
  return (
    <div className={cn('form-element', 'input-radio', config.className)}>
      {radioInputs}
    </div>
  )
}

export default InputRadio
