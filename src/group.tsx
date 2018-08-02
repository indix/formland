import * as React from 'react'
import { IFormlandConfig } from './types'

export interface FormlandGroupProps {
  config: IFormlandConfig
}

export interface FormlandGroupState {}

class FormlandGroup extends React.Component<
  FormlandGroupProps,
  FormlandGroupState
> {
  public render(): JSX.Element {
    const { config } = this.props
    return (
      <div className="formland-group">
        <div className="group-title">{config.displayName}</div>
        <p className="group-description">{config.description}</p>
        <div className="formland-group-elements">{this.props.children}</div>
      </div>
    )
  }
}

export default FormlandGroup
