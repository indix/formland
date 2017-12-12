import * as React from 'react'
import * as id from 'shortid'

import {
  IFormElementProps,
} from './types'


const InputRadio: React.SFC<IFormElementProps> = ({
  value = '',
  config,
  additionalProps = {},
}) => {
  const radioInputs = (config.options || []).map((option) => {
    const unique = id.generate()
    return <span key={`${config.id}_${option.value}`}>
      <input
        checked={value === option.value}
        className={config.className}
        type="radio"
        id={`${config.id}_${option.value}_${unique}`}
        value={option.value}
        disabled={option.disabled || false}
        {...additionalProps} />
      <label
        htmlFor={`${config.id}_${option.value}_${unique}`}>
        {option.label}
      </label>
    </span>
  })
  return <div className="form-element input-radio">
    { radioInputs }
  </div>
}

export default InputRadio;
