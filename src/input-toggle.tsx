import * as React from 'react'
import * as id from 'shortid'
const cn = require('classnames')

import { IFormElementProps } from './types'

const InputToggle: React.SFC<IFormElementProps> = ({
  value = false,
  config,
  callbacks = {},
}) => {
  const _id = id.generate()
  const componentProps = config.componentProps || {}
  return (
    <div className={cn('form-element', 'input-toggle', config.className)}>
      <span className="input-toggle-wrapper">
        <input
          {...callbacks}
          {...componentProps}
          checked={value}
          value={(!value).toString()}
          id={`${config.id}_${_id}`}
          type="checkbox"
        />
        <label htmlFor={`${config.id}_${_id}`} />
      </span>
      <span className="info-text">{componentProps.infoText}</span>
    </div>
  )
}

export default InputToggle
