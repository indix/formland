(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('shortid')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'shortid'], factory) :
	(factory((global.library = {}),global.React,global.id));
}(this, (function (exports,React,id) { 'use strict';

const dot = require('dot-prop-immutable');
const set = require('es6-set');
const arrayFrom = require('array-from');
const getNewState = (callback, store, customValueResolver) => {
    const getValue = (...agmnts) => {
        const [config, event] = agmnts;
        switch (config.type) {
            case 'radio':
            case 'text':
            case 'textarea':
            case 'range':
                return event.currentTarget.value;
            case 'dropdown':
                if (config.componentProps && config.componentProps.multiple) {
                    const options = event.currentTarget.options;
                    const value = [];
                    for (let i = 0, l = options.length; i < l; i++) {
                        if (options[i].selected) {
                            value.push(options[i].value);
                        }
                    }
                    return config.simpleValues ? value.join(config.separator || ',') : value;
                }
                return event.currentTarget.value;
            case 'checkbox':
                const value = event.currentTarget.value;
                const existingValue = dot.get(store, config.resultPath) || [];
                const existingValueArray = (config.simpleValues && existingValue.split)
                    ? existingValue.split(config.separator || ',')
                    : existingValue;
                const valuesSet = new set(existingValueArray);
                if (valuesSet.has(value)) {
                    valuesSet.delete(value);
                }
                else {
                    valuesSet.add(value);
                }
                const valueArray = arrayFrom(valuesSet);
                return config.simpleValues
                    ? valueArray.join(config.separator || ',')
                    : valueArray;
            case 'toggle':
                return event.currentTarget.value === 'true';
            default:
                if (customValueResolver) {
                    let value = '';
                    let i = 0;
                    while (i < customValueResolver.length) {
                        value = customValueResolver[i].apply(null, agmnts);
                        if (value || typeof value === 'boolean') {
                            break;
                        }
                        i++;
                    }
                    return value;
                }
                return '';
        }
    };
    return (config, ...rest) => {
        const value = getValue.apply(null, [config].concat(rest));
        const intermediateStore = dot.set(store, config.resultPath, value);
        const newStore = config.modifyStoreBeforeChange
            ? (config.modifyStoreBeforeChange(config, value, intermediateStore) || intermediateStore)
            : intermediateStore;
        return callback(newStore);
    };
};

const cn = require('classnames');
const Tooltip = require('@atlaskit/tooltip').default;


class ReactFormTemplate extends React.Component {
    getTopComponent(config, store) {
        return React.createElement("div", { className: "react-forms-top-component" }, config.topComponent(store));
    }
    getBottomComponent(config, store) {
        return React.createElement("div", { className: "react-forms-bottom-component" }, config.bottomComponent(store));
    }
    render() {
        const { config, store, error, children, } = this.props;
        const helpText = config.helpText
            && React.createElement(Tooltip, Object.assign({ content: config.helpText, position: "top", className: "hello", tag: "span" }, config.helpTextOptions || {}),
                React.createElement("span", { className: "help-text-trigger" }, "?"));
        return React.createElement("div", { className: "react-forms-template" },
            typeof config.topComponent === 'function'
                && this.getTopComponent(config, store),
            React.createElement("div", { className: "react-forms-label" },
                React.createElement("span", null, config.displayName),
                React.createElement("span", null, helpText),
                config.optional && React.createElement("span", { className: "optional" }, "(optional)")),
            React.createElement("div", { className: "react-forms-field" },
                React.createElement("div", { className: "form-element-wrapper" }, children),
                React.createElement("div", { className: cn('error', { 'is-error': error }) }, error || ' ')),
            typeof config.bottomComponent === 'function'
                && this.getBottomComponent(config, store));
    }
}

const cn$1 = require('classnames');
const InputTextbox = ({ value = '', config, additionalProps = {}, }) => {
    return React.createElement("div", { className: cn$1('form-Element', 'input-text', config.className) },
        React.createElement("input", Object.assign({ type: "text", value: value, placeholder: config.placeholder, name: config.id, id: config.id }, additionalProps)));
};

const cn$2 = require('classnames');
const InputToggle = ({ value = false, config, additionalProps = {}, }) => {
    const _id = id.generate();
    return React.createElement("div", { className: cn$2('form-element', 'input-toggle', config.className) },
        React.createElement("span", { className: "input-toggle-wrapper" },
            React.createElement("input", Object.assign({ checked: value, value: (!value).toString(), id: `${config.id}_${_id}`, type: "checkbox" }, additionalProps)),
            React.createElement("label", { htmlFor: `${config.id}_${_id}` })),
        React.createElement("span", { className: "info-text" }, config.infoText));
};

const cn$3 = require('classnames');
const InputRadio = ({ value = '', config, additionalProps = {}, }) => {
    const radioInputs = (config.options || []).map((option) => {
        const unique = id.generate();
        return React.createElement("span", { className: "radio-button", key: `${config.id}_${option.value}` },
            React.createElement("input", Object.assign({ checked: value === option.value, className: config.className, type: "radio", id: `${config.id}_${option.value}_${unique}`, value: option.value, disabled: option.disabled || false }, additionalProps)),
            React.createElement("label", { htmlFor: `${config.id}_${option.value}_${unique}` }, option.label));
    });
    return React.createElement("div", { className: cn$3('form-element', 'input-radio', config.className) }, radioInputs);
};

const cn$4 = require('classnames');
const InputDropdown = ({ value: v, config, additionalProps = {}, }) => {
    const value = (v
        && ((config.componentProps && config.componentProps.multiple) && config.simpleValues)
        ? v.split(config.separator || ',')
        : v)
        || ((config.componentProps && config.componentProps.multiple) ? [] : '');
    const options = (config.options || []).map((option, i) => {
        return React.createElement("option", { key: `${config.id}_${i}`, value: option.value, disabled: option.disabled || false }, option.label);
    });
    return React.createElement("div", { className: cn$4('form-element', 'input-dropdown', config.className) },
        React.createElement("span", { className: cn$4('dropdown-wrapper', { multi: (config.componentProps && config.componentProps.multiple) }) },
            React.createElement("select", Object.assign({ value: value, name: config.id, id: config.id }, additionalProps), options)));
};

const cn$5 = require('classnames');
const InputCheckbox = ({ value = '', config, additionalProps = {}, }) => {
    const { separator = ',' } = config;
    const valueArray = config.simpleValues ? value.split(separator) : value;
    const checkboxInputs = (config.options || []).map((option) => {
        const unique = id.generate();
        return (React.createElement("span", { className: "checkbox-wrapper", key: `${config.id}_${unique}` },
            React.createElement("input", Object.assign({ checked: valueArray.indexOf(option.value) > -1, value: option.value.toString(), id: `${config.id}_${unique}`, type: "checkbox" }, additionalProps)),
            React.createElement("label", { htmlFor: `${config.id}_${unique}` }, option.label)));
    });
    return React.createElement("div", { className: cn$5(['form-element', 'input-checkbox', config.className]) }, checkboxInputs);
};

const cn$6 = require('classnames');
const InputRange = ({ value, config, additionalProps }) => {
    return React.createElement("div", { className: cn$6('form-element', 'input-range', config.className) },
        config.showValue !== false
            && React.createElement("div", { className: "value" }, value || additionalProps.min),
        React.createElement("input", Object.assign({ type: "range", value: value || additionalProps.min, name: config.id, id: config.id }, additionalProps)),
        config.showRange !== false
            && React.createElement("div", { className: "range" },
                React.createElement("span", { className: "min" }, additionalProps.min),
                React.createElement("span", { className: "max" }, additionalProps.max)));
};

const cn$7 = require('classnames');
const InputTextArea = ({ additionalProps, config, value = '', }) => {
    return React.createElement("div", { className: cn$7('form-element', 'input-textarea', config.className) },
        React.createElement("textarea", Object.assign({ placeholder: config.placeholder, className: config.className, name: config.id, id: config.id, value: value }, additionalProps)));
};

const dotObject = require('dot-prop-immutable');


class ReactForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validate: false,
        };
        this.errors = [];
    }
    validate() {
        this.setState({
            validate: true,
        });
        return this.errors;
    }
    eventProxyHandlers(config, callback, args) {
        getNewState(callback, this.props.store, this.props.customValueResolvers)
            .apply(null, [config].concat(...args));
    }
    bindCallbacks(config, callbacks) {
        const bindedCallbacks = {};
        Object.keys(callbacks || {}).forEach((event) => {
            if (callbacks[event]) {
                bindedCallbacks[event] = (...args) => {
                    if (this.props.useNativeEvent) {
                        callbacks[event].apply(null, [config].concat(...args));
                    }
                    else {
                        this.eventProxyHandlers(config, callbacks[event], args);
                    }
                };
            }
        });
        return bindedCallbacks;
    }
    getFormElement(type) {
        switch (type) {
            case 'text':
                return InputTextbox;
            case 'toggle':
                return InputToggle;
            case 'radio':
                return InputRadio;
            case 'dropdown':
                return InputDropdown;
            case 'checkbox':
                return InputCheckbox;
            case 'range':
                return InputRange;
            case 'textarea':
                return InputTextArea;
            default:
                const { customComponentsResolvers } = this.props;
                if (customComponentsResolvers) {
                    let Component$$1 = null;
                    let i = 0;
                    while (i < customComponentsResolvers.length) {
                        Component$$1 = customComponentsResolvers[i](type);
                        if (Component$$1) {
                            break;
                        }
                        i++;
                    }
                    return Component$$1;
                }
                return null;
        }
    }
    validateField(value, config) {
        if (typeof config.validation === 'function') {
            return config.validation(value) || null;
        }
        if (typeof config.required !== 'undefined' && typeof value === 'undefined') {
            return typeof config.required === 'string'
                ? config.required
                : 'Required Value';
        }
        return null;
    }
    getFormElements(configs, callbacks, store) {
        return configs.map((config, i) => {
            if (config.isHidden && config.isHidden(store)) {
                return false;
            }
            if (!config.resultPath) {
                return new Error(`Provide a resultPath in config[${i}]`);
            }
            const value = dotObject.get(store, config.resultPath, undefined);
            const error = this.validateField(value, config);
            this.errors[i] = {
                id: config.id,
                error,
            };
            const props = {
                config,
                value,
                additionalProps: Object.assign({}, this.bindCallbacks(config, callbacks), (config.componentProps || {})),
            };
            const Element = this.getFormElement(config.type);
            return React.createElement(ReactFormTemplate, { error: (this.state.validate || config.instantValidation) && error, config: config, store: store, key: config.id }, Element
                ? React.createElement(Element, Object.assign({}, props))
                : null);
        });
    }
    render() {
        const { config, onBlur, onChange, onFocus, store, } = this.props;
        const formElements = this.getFormElements(config, { onChange, onBlur, onFocus }, store);
        return React.createElement("div", { className: "react-forms" }, formElements);
    }
}
ReactForms.defaultProps = {
    useNativeEvent: false,
    store: {},
};

exports.getNewState = getNewState;
exports['default'] = ReactForms;

Object.defineProperty(exports, '__esModule', { value: true });

})));
