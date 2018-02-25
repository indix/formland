declare const _default: ({
    id: string;
    type: string;
    displayName: string;
    description: string;
    elements: ({
        id: string;
        type: string;
        resultPath: string;
        displayName: string;
        placeholder: string;
    } | {
        id: string;
        type: string;
        resultPath: string;
        displayName: string;
        placeholder: string;
        validation: (value: any) => string;
        optional: boolean;
    } | {
        id: string;
        type: string;
        helpText: string;
        required: boolean;
        resultPath: string;
        displayName: string;
        simpleValues: boolean;
        separator: string;
        options: {
            value: string;
            label: string;
        }[];
    })[];
} | {
    id: string;
    type: string;
    displayName: string;
    description: string;
    elements: ({
        id: string;
        type: string;
        resultPath: string;
        displayName: string;
        options: {
            value: string;
            label: string;
        }[];
    } | {
        id: string;
        type: string;
        resultPath: string;
        displayName: string;
    } | {
        id: string;
        type: string;
        resultPath: string;
        displayName: string;
        required: boolean;
        componentProps: {
            step: number;
            min: number;
            max: number;
        };
    })[];
} | {
    id: string;
    type: string;
    resultPath: string;
    displayName: string;
    optional: boolean;
    options: {
        value: string;
        label: string;
    }[];
})[];
export default _default;
