import * as React from 'react'
import * as id from 'shortid'
const cn = require('classnames')

import { IFormElementProps } from './types'

const InputCheckbox: React.SFC<IFormElementProps> = ({
  value = '',
  config,
  callbacks = {},
}) => {
  const { separator = ',' } = config
  const valueArray: any[] = config.simpleValues ? value.split(separator) : value

  const checkboxInputs = (config.options || []).map(option => {
    const unique = id.generate()
    return (
      <span className="checkbox-wrapper" key={`${config.id}_${unique}`}>
        <input
          {...callbacks}
          {...config.componentProps}
          checked={valueArray.indexOf(option.value) > -1}
          value={option.value.toString()}
          id={`${config.id}_${unique}`}
          type="checkbox"
        />
        <label htmlFor={`${config.id}_${unique}`}>{option.label}</label>
      </span>
    )
  })

  return (
    <div className={cn(['form-element', 'input-checkbox', config.className])}>
      {checkboxInputs}
    </div>
  )
}

export default InputCheckbox
