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
    private getTopComponent;
    private getBottomComponent;
    render(): JSX.Element;
}
export default ReactFormTemplate;
