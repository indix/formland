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
        validation?: undefined;
        optional?: undefined;
        helpText?: undefined;
        required?: undefined;
        simpleValues?: undefined;
        separator?: undefined;
        options?: undefined;
    } | {
        id: string;
        type: string;
        resultPath: string;
        displayName: string;
        placeholder: string;
        validation: (value: any) => string;
        optional: boolean;
        helpText?: undefined;
        required?: undefined;
        simpleValues?: undefined;
        separator?: undefined;
        options?: undefined;
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
        placeholder?: undefined;
        validation?: undefined;
        optional?: undefined;
    })[];
    resultPath?: undefined;
    optional?: undefined;
    options?: undefined;
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
        required?: undefined;
        componentProps?: undefined;
    } | {
        id: string;
        type: string;
        resultPath: string;
        displayName: string;
        options?: undefined;
        required?: undefined;
        componentProps?: undefined;
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
        options?: undefined;
    })[];
    resultPath?: undefined;
    optional?: undefined;
    options?: undefined;
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
    description?: undefined;
    elements?: undefined;
})[];
export default _default;
