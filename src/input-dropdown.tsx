import * as React from 'react'
const cn = require('classnames')
import {
  IFormElementProps,
} from './types'

const InputDropdown: React.SFC<IFormElementProps> = ({
  value: v,
  config,
  callbacks = {},
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

  return <div className={cn('form-element', 'input-dropdown', config.className)}>
    <span className={cn('dropdown-wrapper', { multi: (config.componentProps && config.componentProps.multiple)})}>
      <select
        value={value}
        name={config.id}
        id={config.id}
        {...callbacks}
        {...config.componentProps}
      >
        {options}
      </select>
    </span>
  </div>
}

export default InputDropdown;
