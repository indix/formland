import * as React from 'react'
import {
  IReactFormConfig,
} from './types'

export interface ReactFormGroupProps {
  config: IReactFormConfig;
};

export interface ReactFormGroupState {};

class ReactFormGroup extends React.Component<ReactFormGroupProps, ReactFormGroupState> {
  public render(): JSX.Element {
    const {
      config,
    } = this.props
    return <div className="react-forms-group">
      <div className="group-title">
        {config.displayName}
      </div>
      <p className="group-description">
        {config.description}
      </p>
      <div className="react-forms-group-elements">
        {this.props.children}
      </div>
    </div>
  }
}

export default ReactFormGroup;
