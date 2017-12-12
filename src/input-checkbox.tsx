import * as React from 'react'
import * as id from 'shortid'

import {
  IFormElementProps,
} from './types'

class InputCheckbox extends React.Component<IFormElementProps, {}> {
  public render(): JSX.Element {
    const {
      value = '',
      config,
      additionalProps = {},
    } = this.props
    const { separator = ',' } = config
    const valueArray: any[] = config.simpleValues ? value.split(',') : value

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
}

export default InputCheckbox;
