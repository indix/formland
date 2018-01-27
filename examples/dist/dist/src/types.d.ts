/// <reference types="react" />
export interface IOptions {
    value: any;
    label: string;
    disabled?: boolean;
}
export interface IReactFormConfig {
    id: string;
    type: 'group' | 'dropdown' | 'text' | 'toggle' | 'radio' | 'checkbox' | 'range' | 'textarea' | string;
    resultPath: string;
    displayName?: string;
    elements?: IReactFormConfig[];
    description?: string;
    className?: string;
    isHidden?: <T>(store: T) => boolean;
    optional?: boolean;
    placeholder?: string;
    options?: IOptions[];
    separator?: string;
    topComponent?: <T>(store: T) => JSX.Element;
    simpleValues?: boolean;
    bottomComponent?: <T>(store: T) => JSX.Element;
    componentProps?: any;
    helpText?: string;
    helpTextOptions?: any;
    infoText?: string;
    showValue?: boolean;
    showRange?: boolean;
    instantValidation?: boolean;
    required?: boolean | string;
    validation?: (value: any) => string | false | null | undefined;
    modifyStoreBeforeChange?: <T>(config: IReactFormConfig, value: any, previousStore: T) => T;
}
export interface ISupportedGlobalCallbacks<T> {
    onChange?: Function;
    onFocus?: Function;
    onBlur?: Function;
}
export interface IFormElementProps {
    value: any;
    config: IReactFormConfig;
    additionalProps: any;
}
export interface IFormErrors {
    id: string;
    error: string | null;
}
