import * as React from 'react'
import * as id from 'shortid'

import {
  IFormElementProps,
} from './types'

class InputToggle extends React.Component<IFormElementProps, {}> {
  public render(): JSX.Element {
    const {
      value = false,
      config,
      additionalProps = {},
    } = this.props
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
}

export default InputToggle;
