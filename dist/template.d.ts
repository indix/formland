/// <reference types="react" />
import * as React from 'react';
import { IReactFormConfig } from './types';
export interface ReactFormTemplateProps {
    store: any;
    config: IReactFormConfig;
    error: any;
}
export interface ReactFormTemplateState {
}
declare class ReactFormTemplate extends React.Component<ReactFormTemplateProps, ReactFormTemplateState> {
    private getTopComponent(config, store);
    private getBottomComponent(config, store);
    render(): JSX.Element;
}
export default ReactFormTemplate;
