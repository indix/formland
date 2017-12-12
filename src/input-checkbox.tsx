import * as React from 'react'
import * as id from 'shortid'

import {
  IFormElementProps,
} from './types'

const InputCheckbox: React.SFC<IFormElementProps> = ({
  value = '',
  config,
  additionalProps = {},
}) => {
  const { separator = ',' } = config
  const valueArray: any[] = config.simpleValues ? value.split(separator) : value

  const checkboxInputs = (config.options || []).map((option) => {
    const unique = id.generate()
    return (
      <span key={`${config.id}_${unique}`}>
        <input
            checked={valueArray.indexOf(option.value) > -1}
            value={option.value.toString()}
            id={`${config.id}_${unique}`}
            type="checkbox"
            {...additionalProps}
          />
          <label htmlFor={`${config.id}_${unique}`}>{option.label}</label>
      </span>
    )
  })

  return <div className="form-element input-checkbox">
    {checkboxInputs}
  </div>
}

export default InputCheckbox;
