import * as React from 'react'
import * as id from 'shortid'

import {
  IFormElementProps,
} from './types'

const InputToggle: React.SFC<IFormElementProps> = ({
  value = false,
  config,
  additionalProps = {},
}) => {
  const _id = id.generate()
  return <div className="form-element input-toggle">
    <input
      checked={value}
      value={(!value).toString()}
      id={`${config.id}_${_id}`}
      type="checkbox"
      {...additionalProps}
    />
    <label htmlFor={`${config.id}_${_id}`}></label>
  </div>
}

export default InputToggle;
