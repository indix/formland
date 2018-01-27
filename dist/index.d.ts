/// <reference types="react" />
import * as React from 'react';
import { IReactFormConfig, ISupportedGlobalCallbacks, IFormErrors } from './types';
export interface ReactFormsProps extends ISupportedGlobalCallbacks<{}> {
    config: IReactFormConfig[];
    store?: any;
    customComponentResolvers?: {
        (type: string): any;
    }[];
    customValueResolvers?: {
        (config: IReactFormConfig, args: any[]): any;
    }[];
    useNativeEvent?: boolean;
    onSubmit?: (e?: any) => void;
    primaryButton?: string;
    secondaryButton?: string;
    onSecondaryButtonClick?: (e?: any) => void;
}
export interface ReactFormsState {
    validate?: boolean;
}
declare class ReactForms extends React.Component<ReactFormsProps, ReactFormsState> {
    errors: IFormErrors[];
    static defaultProps: {
        useNativeEvent: boolean;
        store: {};
        primaryButton: string;
        secondaryButton: string;
        onSecondaryButtonClick: () => void;
        onSubmit: () => void;
    };
    constructor(props: ReactFormsProps);
    validate(): IFormErrors[];
    private eventProxyHandlers(config, callback, args);
    private bindCallbacks(config, callbacks);
    private getFormElement(type);
    private onSubmit(e);
    private validateField(value, config);
    private getFormGroup(config, callbacks, store);
    private getFormElements(configs, callbacks, store);
    render(): JSX.Element;
}
export default ReactForms;
