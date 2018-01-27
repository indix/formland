require('rc-tooltip/assets/bootstrap.css')
import * as React from 'react'
import Tooltip from 'rc-tooltip'

const cn = require('classnames')

import { IReactFormConfig } from './types'

export interface ReactFormTemplateProps {
  store: any
  config: IReactFormConfig
  error: any
}

export interface ReactFormTemplateState {}

class ReactFormTemplate extends React.Component<
  ReactFormTemplateProps,
  ReactFormTemplateState
> {
  private getTopComponent(config: IReactFormConfig, store: any) {
    return (
      <div className="react-forms-top-component">
        {config.topComponent(store)}
      </div>
    )
  }

  private getBottomComponent(config: IReactFormConfig, store: any) {
    return (
      <div className="react-forms-bottom-component">
        {config.bottomComponent(store)}
      </div>
    )
  }

  public render(): JSX.Element {
    const { config, store, error, children } = this.props

    const helpText = config.helpText && (
      <Tooltip
        placement="top"
        overlay={<span>{config.helpText}</span>}
        {...config.helpTextOptions}
      >
        <span className="help-text-trigger">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PGcgY2xhc3M9Im5jLWljb24td3JhcHBlciIgZmlsbD0iIzQ0NDQ0NCI+PGNpcmNsZSBmaWxsPSJub25lIiBzdHJva2U9IiM0NDQ0NDQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBjeD0iMTIiIGN5PSIxMiIgcj0iMTEiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjwvY2lyY2xlPiA8cGF0aCBkYXRhLWNvbG9yPSJjb2xvci0yIiBmaWxsPSJub25lIiBzdHJva2U9IiM0NDQ0NDQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTIsMTV2LTIgYzEuNjA5LDAsMy0xLjM5MSwzLTNzLTEuMzkxLTMtMy0zYy0xLjE5NCwwLTIuMzQyLDAuODkzLTIuNzkyLDEuOTIxIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIj48L3BhdGg+IDxjaXJjbGUgZGF0YS1jb2xvcj0iY29sb3ItMiIgZGF0YS1zdHJva2U9Im5vbmUiIGZpbGw9IiM0NDQ0NDQiIGN4PSIxMiIgY3k9IjE4IiByPSIxIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIj48L2NpcmNsZT48L2c+PC9zdmc+"
            alt="help"
          />
        </span>
      </Tooltip>
    )

    return (
      <div className="react-forms-template">
        {typeof config.topComponent === 'function' &&
          this.getTopComponent(config, store)}
        <div className="react-forms-label">
          <span>{config.displayName}</span>
          <span>{helpText}</span>
          {config.optional && <span className="optional">(optional)</span>}
        </div>
        <div className="react-forms-field">
          <div className="form-element-wrapper">{children}</div>
          <div className={cn('error', { 'is-error': error })}>
            {error || ' '}
          </div>
        </div>
        {typeof config.bottomComponent === 'function' &&
          this.getBottomComponent(config, store)}
      </div>
    )
  }
}

export default ReactFormTemplate
