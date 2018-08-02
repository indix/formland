export interface IOptions {
  value: any
  label: string

  disabled?: boolean
}

export interface IFormlandConfig {
  id: string
  type:
    | 'group'
    | 'dropdown'
    | 'text'
    | 'toggle'
    | 'radio'
    | 'checkbox'
    | 'range'
    | 'textarea'
    | string
  resultPath?: string

  displayName?: string
  elements?: IFormlandConfig[]
  description?: string
  className?: string
  isHidden?: <T>(store: T) => boolean
  optional?: boolean
  placeholder?: string
  options?: IOptions[]
  separator?: string
  topComponent?: <T>(store: T) => JSX.Element
  simpleValues?: boolean
  bottomComponent?: <T>(store: T) => JSX.Element
  componentProps?: any
  helpText?: string
  helpTextOptions?: any
  instantValidation?: boolean
  required?: boolean | string
  validation?: (value: any) => string | false | null | undefined
  modifyStoreBeforeChange?: <T>(
    config: IFormlandConfig,
    value: any,
    previousStore: T,
  ) => T
}

export interface ISupportedGlobalCallbacks<T> {
  onChange?: Function
  onFocus?: Function
  onBlur?: Function
}

export interface IFormElementProps {
  value: any
  config: IFormlandConfig
  componentProps: any
  callbacks: any
}

export interface IFormErrors {
  id: string
  error: string | null
}
