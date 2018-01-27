/// <reference types="react" />
import * as React from 'react';
import { IReactFormConfig } from './types';
export interface ReactFormGroupProps {
    config: IReactFormConfig;
}
export interface ReactFormGroupState {
}
declare class ReactFormGroup extends React.Component<ReactFormGroupProps, ReactFormGroupState> {
    render(): JSX.Element;
}
export default ReactFormGroup;
