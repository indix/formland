import * as React from 'react';
import { IReactFormConfig, ISupportedGlobalCallbacks, IFormErrors } from './types';
interface ReactFormsProps extends ISupportedGlobalCallbacks<{}> {
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
    primaryButton?: string | false | undefined;
    secondaryButton?: string | false | undefined;
    onSecondaryButtonClick?: (e?: any) => void;
}
export interface IReactFormConfig extends IReactFormConfig {
}
interface ReactFormsState {
    validate?: boolean;
}
declare class ReactForms extends React.Component<ReactFormsProps, ReactFormsState> {
    errors: {
        [key: string]: IFormErrors[];
    };
    static defaultProps: {
        useNativeEvent: boolean;
        store: {};
        primaryButton: string;
        secondaryButton: string;
        onSecondaryButtonClick: () => void;
        onSubmit: () => void;
    };
    constructor(props: ReactFormsProps);
    validate(): {
        [key: string]: IFormErrors[];
    };
    private eventProxyHandlers;
    private bindCallbacks;
    private getFormElement;
    private onSubmit;
    private validateField;
    private getFormGroup;
    private getFormElements;
    render(): JSX.Element;
}
export default ReactForms;
