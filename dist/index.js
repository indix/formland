'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var Tooltip = _interopDefault(require('rc-tooltip'));
var id = require('shortid');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var dot = require('dot-prop-immutable');
var set = require('es6-set');
var arrayFrom = require('array-from');
var getNewState = function (callback, store, customValueResolver) {
    var getValue = function () {
        var agmnts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            agmnts[_i] = arguments[_i];
        }
        var config = agmnts[0], event = agmnts[1];
        switch (config.type) {
            case 'color':
            case 'date':
            case 'email':
            case 'month':
            case 'text':
            case 'range':
            case 'tel':
            case 'time':
            case 'url':
            case 'week':
                return event.currentTarget.value;
            case 'number':
                return parseInt(event.currentTarget.value, 10);
            case 'dropdown':
                if (config.componentProps && config.componentProps.multiple) {
                    var options = event.currentTarget.options;
                    var value_1 = [];
                    for (var i = 0, l = options.length; i < l; i++) {
                        if (options[i].selected) {
                            value_1.push(options[i].value);
                        }
                    }
                    return config.simpleValues ? value_1.join(config.separator || ',') : value_1;
                }
                return event.currentTarget.value;
            case 'checkbox':
                var value = event.currentTarget.value;
                var existingValue = dot.get(store, config.resultPath) || [];
                var existingValueArray = (config.simpleValues && existingValue.split)
                    ? existingValue.split(config.separator || ',')
                    : existingValue;
                var valuesSet = new set(existingValueArray);
                if (valuesSet.has(value)) {
                    valuesSet.delete(value);
                }
                else {
                    valuesSet.add(value);
                }
                var valueArray = arrayFrom(valuesSet);
                return config.simpleValues
                    ? valueArray.join(config.separator || ',')
                    : valueArray;
            case 'toggle':
                return event.currentTarget.value === 'true';
            default:
                if (customValueResolver) {
                    var value_2 = '';
                    var i = 0;
                    while (i < customValueResolver.length) {
                        value_2 = customValueResolver[i].apply(null, agmnts);
                        if (value_2 || typeof value_2 === 'boolean') {
                            break;
                        }
                        i++;
                    }
                    return value_2;
                }
                return '';
        }
    };
    return function (config) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var value = getValue.apply(null, [config].concat(rest));
        var intermediateStore = dot.set(store, config.resultPath, value);
        var newStore = config.modifyStoreBeforeChange
            ? (config.modifyStoreBeforeChange(config, value, intermediateStore) || intermediateStore)
            : intermediateStore;
        return callback(newStore);
    };
};

require('rc-tooltip/assets/bootstrap.css');
var cn = require('classnames');


var ReactFormTemplate = /** @class */ (function (_super) {
    __extends(ReactFormTemplate, _super);
    function ReactFormTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReactFormTemplate.prototype.getTopComponent = function (config, store) {
        return React.createElement("div", { className: "react-forms-top-component" }, config.topComponent(store));
    };
    ReactFormTemplate.prototype.getBottomComponent = function (config, store) {
        return React.createElement("div", { className: "react-forms-bottom-component" }, config.bottomComponent(store));
    };
    ReactFormTemplate.prototype.render = function () {
        var _a = this.props, config = _a.config, store = _a.store, error = _a.error, children = _a.children;
        var helpText = config.helpText
            && React.createElement(Tooltip, __assign({ placement: "top", overlay: React.createElement("span", null, config.helpText) }, config.helpTextOptions),
                React.createElement("span", { className: "help-text-trigger" },
                    React.createElement("img", { src: "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PGcgY2xhc3M9Im5jLWljb24td3JhcHBlciIgZmlsbD0iIzQ0NDQ0NCI+PGNpcmNsZSBmaWxsPSJub25lIiBzdHJva2U9IiM0NDQ0NDQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBjeD0iMTIiIGN5PSIxMiIgcj0iMTEiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjwvY2lyY2xlPiA8cGF0aCBkYXRhLWNvbG9yPSJjb2xvci0yIiBmaWxsPSJub25lIiBzdHJva2U9IiM0NDQ0NDQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTIsMTV2LTIgYzEuNjA5LDAsMy0xLjM5MSwzLTNzLTEuMzkxLTMtMy0zYy0xLjE5NCwwLTIuMzQyLDAuODkzLTIuNzkyLDEuOTIxIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIj48L3BhdGg+IDxjaXJjbGUgZGF0YS1jb2xvcj0iY29sb3ItMiIgZGF0YS1zdHJva2U9Im5vbmUiIGZpbGw9IiM0NDQ0NDQiIGN4PSIxMiIgY3k9IjE4IiByPSIxIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIj48L2NpcmNsZT48L2c+PC9zdmc+", alt: "help" })));
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
    };
    return ReactFormTemplate;
}(React.Component));

var ReactFormGroup = /** @class */ (function (_super) {
    __extends(ReactFormGroup, _super);
    function ReactFormGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReactFormGroup.prototype.render = function () {
        var config = this.props.config;
        return React.createElement("div", { className: "react-forms-group" },
            React.createElement("div", { className: "group-title" }, config.displayName),
            React.createElement("p", { className: "group-description" }, config.description),
            React.createElement("div", { className: "react-forms-group-elements" }, this.props.children));
    };
    return ReactFormGroup;
}(React.Component));

var cn$1 = require('classnames');
var InputGeneric = function (_a) {
    var _b = _a.value, value = _b === void 0 ? '' : _b, config = _a.config, _c = _a.callbacks, callbacks = _c === void 0 ? {} : _c;
    return React.createElement("div", { className: cn$1('form-Element', 'input-text', config.className) },
        React.createElement("input", __assign({ type: config.type, value: value, placeholder: config.placeholder, name: config.id, id: config.id }, callbacks, config.componentProps)));
};

var cn$2 = require('classnames');
var InputToggle = function (_a) {
    var _b = _a.value, value = _b === void 0 ? false : _b, config = _a.config, _c = _a.callbacks, callbacks = _c === void 0 ? {} : _c;
    var _id = id.generate();
    var componentProps = config.componentProps || {};
    return React.createElement("div", { className: cn$2('form-element', 'input-toggle', config.className) },
        React.createElement("span", { className: "input-toggle-wrapper" },
            React.createElement("input", __assign({ checked: value, value: (!value).toString(), id: config.id + "_" + _id, type: "checkbox" }, callbacks, componentProps)),
            React.createElement("label", { htmlFor: config.id + "_" + _id })),
        React.createElement("span", { className: "info-text" }, componentProps.infoText));
};

var cn$3 = require('classnames');
var InputRadio = function (_a) {
    var _b = _a.value, value = _b === void 0 ? '' : _b, config = _a.config, _c = _a.callbacks, callbacks = _c === void 0 ? {} : _c;
    var radioInputs = (config.options || []).map(function (option) {
        var unique = id.generate();
        return React.createElement("span", { className: "radio-button", key: config.id + "_" + option.value },
            React.createElement("input", __assign({ checked: value === option.value, className: config.className, type: "radio", id: config.id + "_" + option.value + "_" + unique, value: option.value, disabled: option.disabled || false }, callbacks, config.componentProps)),
            React.createElement("label", { htmlFor: config.id + "_" + option.value + "_" + unique }, option.label));
    });
    return React.createElement("div", { className: cn$3('form-element', 'input-radio', config.className) }, radioInputs);
};

var cn$4 = require('classnames');
var InputDropdown = function (_a) {
    var v = _a.value, config = _a.config, _b = _a.callbacks, callbacks = _b === void 0 ? {} : _b;
    var value = (v
        && ((config.componentProps && config.componentProps.multiple) && config.simpleValues)
        ? v.split(config.separator || ',')
        : v)
        || ((config.componentProps && config.componentProps.multiple) ? [] : '');
    var options = (config.options || []).map(function (option, i) {
        return React.createElement("option", { key: config.id + "_" + i, value: option.value, disabled: option.disabled || false }, option.label);
    });
    return React.createElement("div", { className: cn$4('form-element', 'input-dropdown', config.className) },
        React.createElement("span", { className: cn$4('dropdown-wrapper', { multi: (config.componentProps && config.componentProps.multiple) }) },
            React.createElement("select", __assign({ value: value, name: config.id, id: config.id }, callbacks, config.componentProps), options)));
};

var cn$5 = require('classnames');
var InputCheckbox = function (_a) {
    var _b = _a.value, value = _b === void 0 ? '' : _b, config = _a.config, _c = _a.callbacks, callbacks = _c === void 0 ? {} : _c;
    var _d = config.separator, separator = _d === void 0 ? ',' : _d;
    var valueArray = config.simpleValues ? value.split(separator) : value;
    var checkboxInputs = (config.options || []).map(function (option) {
        var unique = id.generate();
        return (React.createElement("span", { className: "checkbox-wrapper", key: config.id + "_" + unique },
            React.createElement("input", __assign({ checked: valueArray.indexOf(option.value) > -1, value: option.value.toString(), id: config.id + "_" + unique, type: "checkbox" }, callbacks, config.componentProps)),
            React.createElement("label", { htmlFor: config.id + "_" + unique }, option.label)));
    });
    return React.createElement("div", { className: cn$5(['form-element', 'input-checkbox', config.className]) }, checkboxInputs);
};

var cn$6 = require('classnames');
var InputRange = function (_a) {
    var value = _a.value, config = _a.config, _b = _a.callbacks, callbacks = _b === void 0 ? {} : _b;
    var componentProps = config.componentProps || {};
    return React.createElement("div", { className: cn$6('form-element', 'input-range', config.className) },
        componentProps.showValue !== false
            && React.createElement("div", { className: "value" }, value || componentProps.min),
        React.createElement("input", __assign({ type: "range", value: value || componentProps.min, name: config.id, id: config.id }, callbacks, componentProps)),
        componentProps.showRange !== false
            && React.createElement("div", { className: "range" },
                React.createElement("span", { className: "min" }, componentProps.min),
                React.createElement("span", { className: "max" }, componentProps.max)));
};

var cn$7 = require('classnames');
var InputTextArea = function (_a) {
    var _b = _a.callbacks, callbacks = _b === void 0 ? {} : _b, config = _a.config, _c = _a.value, value = _c === void 0 ? '' : _c;
    return React.createElement("div", { className: cn$7('form-element', 'input-textarea', config.className) },
        React.createElement("textarea", __assign({ placeholder: config.placeholder, className: config.className, name: config.id, id: config.id, value: value }, callbacks, config.componentProps)));
};

var dotObject = require('dot-prop-immutable');


var ReactForms = /** @class */ (function (_super) {
    __extends(ReactForms, _super);
    function ReactForms(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            validate: false,
        };
        _this.errors = [];
        _this.onSubmit = _this.onSubmit.bind(_this);
        return _this;
    }
    ReactForms.prototype.validate = function () {
        this.setState({
            validate: true,
        });
        return this.errors;
    };
    ReactForms.prototype.eventProxyHandlers = function (config, callback, args) {
        getNewState(callback, this.props.store, this.props.customValueResolvers)
            .apply(null, (_a = [config]).concat.apply(_a, args));
        var _a;
    };
    ReactForms.prototype.bindCallbacks = function (config, callbacks) {
        var _this = this;
        var bindedCallbacks = {};
        Object.keys(callbacks || {}).forEach(function (event) {
            if (callbacks[event]) {
                bindedCallbacks[event] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (_this.props.useNativeEvent || event !== 'onChange') {
                        callbacks[event].apply(null, (_a = [config]).concat.apply(_a, args));
                    }
                    else {
                        _this.eventProxyHandlers(config, callbacks[event], args);
                    }
                    var _a;
                };
            }
        });
        return bindedCallbacks;
    };
    ReactForms.prototype.getFormElement = function (type) {
        switch (type) {
            case 'color':
            case 'date':
            case 'email':
            case 'month':
            case 'number':
            case 'text':
            case 'tel':
            case 'time':
            case 'url':
            case 'week':
                return InputGeneric;
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
                var customComponentResolvers = this.props.customComponentResolvers;
                if (customComponentResolvers) {
                    var Component$$1 = null;
                    var i = 0;
                    while (i < customComponentResolvers.length) {
                        Component$$1 = customComponentResolvers[i](type);
                        if (Component$$1) {
                            break;
                        }
                        i++;
                    }
                    return Component$$1;
                }
                return null;
        }
    };
    ReactForms.prototype.onSubmit = function (e) {
        e.preventDefault();
        this.props.onSubmit && this.props.onSubmit();
    };
    ReactForms.prototype.validateField = function (value, config) {
        if (typeof config.validation === 'function') {
            return config.validation(value) || null;
        }
        if (typeof config.required !== 'undefined' && typeof value === 'undefined') {
            return typeof config.required === 'string'
                ? config.required
                : 'Required Value';
        }
        return null;
    };
    ReactForms.prototype.getFormGroup = function (config, callbacks, store) {
        return React.createElement(ReactFormGroup, { config: config, key: config.id }, this.getFormElements(config.elements, callbacks, store));
    };
    ReactForms.prototype.getFormElements = function (configs, callbacks, store) {
        var _this = this;
        return configs.map(function (config, i) {
            if (config.type === 'group') {
                return _this.getFormGroup(config, callbacks, store);
            }
            if (config.isHidden && config.isHidden(store)) {
                return false;
            }
            if (!config.resultPath) {
                return new Error("Provide a resultPath in config[" + i + "]");
            }
            var value = dotObject.get(store, config.resultPath, undefined);
            var error = _this.validateField(value, config);
            _this.errors[i] = {
                id: config.id,
                error: error,
            };
            var props = {
                config: config,
                value: value,
                callbacks: _this.bindCallbacks(config, callbacks),
            };
            var Element = _this.getFormElement(config.type);
            return React.createElement(ReactFormTemplate, { error: (_this.state.validate || config.instantValidation) && error, config: config, store: store, key: config.id }, Element
                ? React.createElement(Element, __assign({}, props))
                : null);
        });
    };
    ReactForms.prototype.render = function () {
        var _a = this.props, config = _a.config, onBlur = _a.onBlur, onChange = _a.onChange, onFocus = _a.onFocus, store = _a.store;
        var formElements = this.getFormElements(config, { onChange: onChange, onBlur: onBlur, onFocus: onFocus }, store);
        return React.createElement("form", { className: "react-forms", onSubmit: this.onSubmit },
            React.createElement("div", { className: "form-elements" }, formElements),
            React.createElement("div", { className: "form-buttons" }, this.props.children));
    };
    ReactForms.defaultProps = {
        useNativeEvent: false,
        store: {},
    };
    return ReactForms;
}(React.Component));

module.exports = ReactForms;
