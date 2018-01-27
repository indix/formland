/// <reference types="react" />
import * as React from 'react';
import { getNewState } from './utils';
import { IReactFormConfig, ISupportedGlobalCallbacks, IFormErrors } from './types';
export interface ReactFormsProps extends ISupportedGlobalCallbacks<{}> {
    config: IReactFormConfig[];
    store?: any;
    customComponentsResolvers?: {
        (type: string): any;
    }[];
    customValueResolvers?: {
        (config: IReactFormConfig, args: any[]): any;
    }[];
    useNativeEvent?: boolean;
}
export interface ReactFormsState {
    validate?: boolean;
}
declare class ReactForms extends React.Component<ReactFormsProps, ReactFormsState> {
    errors: IFormErrors[];
    static defaultProps: {
        useNativeEvent: boolean;
        store: {};
    };
    constructor(props: ReactFormsProps);
    validate(): IFormErrors[];
    private eventProxyHandlers(config, callback, args);
    private bindCallbacks(config, callbacks);
    private getFormElement(type);
    private validateField(value, config);
    private getFormGroup(config, callbacks, store);
    private getFormElements(configs, callbacks, store);
    render(): JSX.Element;
}
export { getNewState };
export default ReactForms;
