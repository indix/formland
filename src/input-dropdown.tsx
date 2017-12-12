import * as React from 'react'
import {
  IFormElementProps,
} from './types'

const InputDropdown: React.SFC<IFormElementProps> = ({
  value: v,
  config,
  additionalProps = {},
}) => {
  const value = (
    v
      && ((config.componentProps && config.componentProps.multiple) && config.simpleValues)
      ? v.split(config.separator || ',')
      : v
  )
    || ((config.componentProps && config.componentProps.multiple) ? [] : '')

  const options = (config.options || []).map((option, i) => {
    return <option
      key={`${config.id}_${i}`}
      value={option.value}
      disabled={option.disabled || false}>
      {option.label}
    </option>
  })

  return <div className="form-element input-dropdown">
    <select
      value={value}
      name={config.id}
      id={config.id}
      {...additionalProps}
    >
      {options}
    </select>
  </div>
}

export default InputDropdown;
