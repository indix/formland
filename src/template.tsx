import * as React from 'react'

import {
  IReactFormConfig,
} from './types'

export interface ReactFormTemplateProps {
  store: any;
  config: IReactFormConfig,
};

export interface ReactFormTemplateState {};

class ReactFormTemplate extends React.Component<ReactFormTemplateProps, ReactFormTemplateState> {

  private getTopComponent(config: IReactFormConfig, store: any) {
    return <div className="react-forms-top-component">
      {config.topComponent(store)}
    </div>
  }

  private getBottomComponent(config: IReactFormConfig, store: any) {
    return <div className="react-forms-bottom-component">
      {config.bottomComponent(store)}
    </div>
  }

  public render(): JSX.Element {
    const {
      config,
      store,
      children,
    } = this.props
    return <div className="react-forms-template">
      {
        typeof config.topComponent === 'function'
        && this.getTopComponent(config, store)
      }
      <div className="react-forms-label">
        <span>{config.displayName}</span>
        {
          config.optional && <span>(optional)</span>
        }
      </div>
      <div className="react-forms-field">
        {children}
      </div>
      {
        typeof config.bottomComponent === 'function'
        && this.getBottomComponent(config, store)
      }
    </div>
  }
}

export default ReactFormTemplate;
