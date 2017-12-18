import * as React from 'react'

const cn = require('classnames')
const Tooltip = require('@atlaskit/tooltip').default

import {
  IReactFormConfig,
} from './types'

export interface ReactFormTemplateProps {
  store: any;
  config: IReactFormConfig;
  error: any;
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
      error,
      children,
    } = this.props

    const helpText = config.helpText
      && <Tooltip
        content={config.helpText}
        position="top"
        className="hello"
        tag="span"
        {...config.helpTextOptions || {}}>
        <span className="help-text-trigger">
          ?
        </span>
      </Tooltip>

    return <div className="react-forms-template">
      {
        typeof config.topComponent === 'function'
        && this.getTopComponent(config, store)
      }
      <div className="react-forms-label">
        <span>{config.displayName}</span>
        <span>{helpText}</span>
        {
          config.optional && <span className="optional">(optional)</span>
        }
      </div>
      <div className="react-forms-field">
        <div className="form-element-wrapper">
          {children}
        </div>
        <div className={cn('error', { 'is-error': error })}>
          {error || ' '}
        </div>
      </div>
      {
        typeof config.bottomComponent === 'function'
        && this.getBottomComponent(config, store)
      }
    </div>
  }
}

export default ReactFormTemplate;
