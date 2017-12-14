import * as React from 'react'
import * as id from 'shortid'
const cn = require('classnames')

import {
  IFormElementProps,
} from './types'

const InputToggle: React.SFC<IFormElementProps> = ({
  value = false,
  config,
  additionalProps = {},
}) => {
  const _id = id.generate()
  return <div className={cn('form-element', 'input-toggle', config.className)}>
    <span className="input-toggle-wrapper">
      <input
        checked={value}
        value={(!value).toString()}
        id={`${config.id}_${_id}`}
        type="checkbox"
        {...additionalProps}
      />
      <label htmlFor={`${config.id}_${_id}`}></label>
    </span>
    <span className="info-text">{config.infoText}</span>
  </div>
}

export default InputToggle
