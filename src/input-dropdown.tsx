import * as React from 'react'
import {
  IFormElementProps,
} from './types'

class InputDropdown extends React.Component<IFormElementProps, {}> {
  public render(): JSX.Element {
    const {
      value = '',
      config,
      additionalProps = {},
    } = this.props

    const options = (config.options || []).map((option, i) => {
      return <option
        key={`${config.id}_${i}`}
        value={option.value}
        disabled={option.disabled || false}>
        {option.value}
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
}

export default InputDropdown;
