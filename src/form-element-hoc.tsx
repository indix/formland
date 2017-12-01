import * as React from 'react';

export interface ComponentNameProps {};

export interface ComponentNameState { };

const FormElementHOC = (Component: any) => {
  return class ComponentName extends React.Component<ComponentNameProps, ComponentNameState> {
    ref: any
    public render(): JSX.Element {
      return <Component
        ref={(el: JSX.Element) => this.ref = el}
        {...this.props} />
    }
  }
}

export default FormElementHOC