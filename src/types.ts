export interface IOptions {
  value: any;
  label: string;

  disabled?: boolean;
}

export interface IReactFormConfig {
  id: string;
  type: 'dropdown' | 'text';
  resultPath: string;

  displayName?: string;
  isHidden?: <T>(store: T) => boolean;
  optional?: boolean;
  placeholder?: string;
  options?: IOptions[];
  bottomComponent?: <T>(store: T) => JSX.Element;
  componentProps?: any;
  modifyStoreOnChange?: <T>(config: IReactFormConfig, value: any, previousStore: T) => T
}

export interface ISupportedGlobalCallbacks<T> {
  onChange?: Function;
  onFocus?: Function;
  onBlur?: Function;
}

