import { Component, createElement } from 'react'
import Tooltip from 'rc-tooltip'
import { generate } from 'shortid'

const dot = require('dot-prop-immutable')
const set = require('es6-set')
const arrayFrom = require('array-from')
const getNewState = (callback, store, customValueResolver) => {
  const getValue = (...agmnts) => {
    const [config, event] = agmnts
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
      case 'textarea':
      case 'radio':
        return event.currentTarget.value
      case 'number':
        return parseInt(event.currentTarget.value, 10)
      case 'dropdown':
        if (config.componentProps && config.componentProps.multiple) {
          const options = event.currentTarget.options
          const value = []
          for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
              value.push(options[i].value)
            }
          }
          return config.simpleValues
            ? value.join(config.separator || ',')
            : value
        }
        return event.currentTarget.value
      case 'checkbox':
        const value = event.currentTarget.value
        const existingValue = dot.get(store, config.resultPath) || []
        const existingValueArray =
          config.simpleValues && existingValue.split
            ? existingValue.split(config.separator || ',')
            : existingValue
        const valuesSet = new set(existingValueArray)
        if (valuesSet.has(value)) {
          valuesSet.delete(value)
        } else {
          valuesSet.add(value)
        }
        const valueArray = arrayFrom(valuesSet)
        return config.simpleValues
          ? valueArray.join(config.separator || ',')
          : valueArray
      case 'toggle':
        return event.currentTarget.value === 'true'
      default:
        if (customValueResolver) {
          let value = ''
          let i = 0
          while (i < customValueResolver.length) {
            value = customValueResolver[i].apply(null, agmnts)
            if (value || typeof value === 'boolean') {
              break
            }
            i++
          }
          return value
        }
        return ''
    }
  }
  return (config, ...rest) => {
    const value = getValue.apply(null, [config].concat(rest))
    const intermediateStore = dot.set(store, config.resultPath, value)
    const newStore = config.modifyStoreBeforeChange
      ? config.modifyStoreBeforeChange(config, value, intermediateStore) ||
        intermediateStore
      : intermediateStore
    return callback(newStore)
  }
}

require('rc-tooltip/assets/bootstrap.css')
const cn = require('classnames')
class ReactFormTemplate extends Component {
  getTopComponent(config, store) {
    return createElement(
      'div',
      { className: 'react-forms-top-component' },
      config.topComponent(store),
    )
  }
  getBottomComponent(config, store) {
    return createElement(
      'div',
      { className: 'react-forms-bottom-component' },
      config.bottomComponent(store),
    )
  }
  render() {
    const { config, store, error, children } = this.props
    const helpText =
      config.helpText &&
      createElement(
        Tooltip,
        Object.assign(
          {
            placement: 'top',
            overlay: createElement('span', null, config.helpText),
          },
          config.helpTextOptions,
        ),
        createElement(
          'span',
          { className: 'help-text-trigger' },
          createElement('img', {
            src:
              'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PGcgY2xhc3M9Im5jLWljb24td3JhcHBlciIgZmlsbD0iIzQ0NDQ0NCI+PGNpcmNsZSBmaWxsPSJub25lIiBzdHJva2U9IiM0NDQ0NDQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBjeD0iMTIiIGN5PSIxMiIgcj0iMTEiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjwvY2lyY2xlPiA8cGF0aCBkYXRhLWNvbG9yPSJjb2xvci0yIiBmaWxsPSJub25lIiBzdHJva2U9IiM0NDQ0NDQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTIsMTV2LTIgYzEuNjA5LDAsMy0xLjM5MSwzLTNzLTEuMzkxLTMtMy0zYy0xLjE5NCwwLTIuMzQyLDAuODkzLTIuNzkyLDEuOTIxIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIj48L3BhdGg+IDxjaXJjbGUgZGF0YS1jb2xvcj0iY29sb3ItMiIgZGF0YS1zdHJva2U9Im5vbmUiIGZpbGw9IiM0NDQ0NDQiIGN4PSIxMiIgY3k9IjE4IiByPSIxIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIj48L2NpcmNsZT48L2c+PC9zdmc+',
            alt: 'help',
          }),
        ),
      )
    return createElement(
      'div',
      { className: 'react-forms-template' },
      typeof config.topComponent === 'function' &&
        this.getTopComponent(config, store),
      createElement(
        'div',
        { className: 'react-forms-label' },
        createElement('span', null, config.displayName),
        createElement('span', null, helpText),
        config.optional &&
          createElement('span', { className: 'optional' }, '(optional)'),
      ),
      createElement(
        'div',
        { className: 'react-forms-field' },
        createElement('div', { className: 'form-element-wrapper' }, children),
        createElement(
          'div',
          { className: cn('error', { 'is-error': error }) },
          error || ' ',
        ),
      ),
      typeof config.bottomComponent === 'function' &&
        this.getBottomComponent(config, store),
    )
  }
}

class ReactFormGroup extends Component {
  render() {
    const { config } = this.props
    return createElement(
      'div',
      { className: 'react-forms-group' },
      createElement('div', { className: 'group-title' }, config.displayName),
      createElement(
        'p',
        { className: 'group-description' },
        config.description,
      ),
      createElement(
        'div',
        { className: 'react-forms-group-elements' },
        this.props.children,
      ),
    )
  }
}

const cn$1 = require('classnames')
const InputGeneric = ({ value = '', config, callbacks = {} }) => {
  return createElement(
    'div',
    { className: cn$1('form-Element', 'input-text', config.className) },
    createElement(
      'input',
      Object.assign({}, callbacks, config.componentProps, {
        type: config.type,
        value: value,
        placeholder: config.placeholder,
        name: config.id,
        id: config.id,
      }),
    ),
  )
}

const cn$2 = require('classnames')
const InputToggle = ({ value = false, config, callbacks = {} }) => {
  const _id = generate()
  const componentProps = config.componentProps || {}
  return createElement(
    'div',
    { className: cn$2('form-element', 'input-toggle', config.className) },
    createElement(
      'span',
      { className: 'input-toggle-wrapper' },
      createElement(
        'input',
        Object.assign({}, callbacks, componentProps, {
          checked: value,
          value: (!value).toString(),
          id: `${config.id}_${_id}`,
          type: 'checkbox',
        }),
      ),
      createElement('label', { htmlFor: `${config.id}_${_id}` }),
    ),
    createElement('span', { className: 'info-text' }, componentProps.infoText),
  )
}

const cn$3 = require('classnames')
const InputRadio = ({ value = '', config, callbacks = {} }) => {
  const radioInputs = (config.options || []).map(option => {
    const unique = generate()
    return createElement(
      'span',
      { className: 'radio-button', key: `${config.id}_${option.value}` },
      createElement(
        'input',
        Object.assign({}, callbacks, config.componentProps, {
          checked: value === option.value,
          className: config.className,
          type: 'radio',
          id: `${config.id}_${option.value}_${unique}`,
          value: option.value,
          disabled: option.disabled || false,
        }),
      ),
      createElement(
        'label',
        { htmlFor: `${config.id}_${option.value}_${unique}` },
        option.label,
      ),
    )
  })
  return createElement(
    'div',
    { className: cn$3('form-element', 'input-radio', config.className) },
    radioInputs,
  )
}

const cn$4 = require('classnames')
const InputDropdown = ({ value: v, config, callbacks = {} }) => {
  const value =
    (v &&
    (config.componentProps &&
      config.componentProps.multiple &&
      config.simpleValues)
      ? v.split(config.separator || ',')
      : v) ||
    (config.componentProps && config.componentProps.multiple ? [] : '')
  const options = (config.options || []).map((option, i) => {
    return createElement(
      'option',
      {
        key: `${config.id}_${i}`,
        value: option.value,
        disabled: option.disabled || false,
      },
      option.label,
    )
  })
  return createElement(
    'div',
    { className: cn$4('form-element', 'input-dropdown', config.className) },
    createElement(
      'span',
      {
        className: cn$4('dropdown-wrapper', {
          multi: config.componentProps && config.componentProps.multiple,
        }),
      },
      createElement(
        'select',
        Object.assign({}, callbacks, config.componentProps, {
          value: value,
          name: config.id,
          id: config.id,
        }),
        options,
      ),
    ),
  )
}

const cn$5 = require('classnames')
const InputCheckbox = ({ value = '', config, callbacks = {} }) => {
  const { separator = ',' } = config
  const valueArray = config.simpleValues ? value.split(separator) : value
  const checkboxInputs = (config.options || []).map(option => {
    const unique = generate()
    return createElement(
      'span',
      { className: 'checkbox-wrapper', key: `${config.id}_${unique}` },
      createElement(
        'input',
        Object.assign({}, callbacks, config.componentProps, {
          checked: valueArray.indexOf(option.value) > -1,
          value: option.value.toString(),
          id: `${config.id}_${unique}`,
          type: 'checkbox',
        }),
      ),
      createElement(
        'label',
        { htmlFor: `${config.id}_${unique}` },
        option.label,
      ),
    )
  })
  return createElement(
    'div',
    { className: cn$5(['form-element', 'input-checkbox', config.className]) },
    checkboxInputs,
  )
}

const cn$6 = require('classnames')
const InputRange = ({ value, config, callbacks = {} }) => {
  const componentProps = config.componentProps || {}
  return createElement(
    'div',
    { className: cn$6('form-element', 'input-range', config.className) },
    componentProps.showValue !== false &&
      createElement('div', { className: 'value' }, value || componentProps.min),
    createElement(
      'input',
      Object.assign({}, callbacks, componentProps, {
        type: 'range',
        value: value || componentProps.min,
        name: config.id,
        id: config.id,
      }),
    ),
    componentProps.showRange !== false &&
      createElement(
        'div',
        { className: 'range' },
        createElement('span', { className: 'min' }, componentProps.min),
        createElement('span', { className: 'max' }, componentProps.max),
      ),
  )
}

const cn$7 = require('classnames')
const InputTextArea = ({ callbacks = {}, config, value = '' }) => {
  return createElement(
    'div',
    { className: cn$7('form-element', 'input-textarea', config.className) },
    createElement(
      'textarea',
      Object.assign({}, callbacks, config.componentProps, {
        placeholder: config.placeholder,
        className: config.className,
        name: config.id,
        id: config.id,
        value: value,
      }),
    ),
  )
}

const dotObject = require('dot-prop-immutable')
class ReactForms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      validate: false,
    }
    this.errors = []
    this.onSubmit = this.onSubmit.bind(this)
  }
  validate() {
    this.setState({
      validate: true,
    })
    return this.errors
  }
  eventProxyHandlers(config, callback, args) {
    getNewState(
      callback,
      this.props.store,
      this.props.customValueResolvers,
    ).apply(null, [config].concat(...args))
  }
  bindCallbacks(config, callbacks) {
    const bindedCallbacks = {}
    Object.keys(callbacks || {}).forEach(event => {
      if (callbacks[event]) {
        bindedCallbacks[event] = (...args) => {
          if (this.props.useNativeEvent || event !== 'onChange') {
            callbacks[event].apply(null, [config].concat(...args))
          } else {
            this.eventProxyHandlers(config, callbacks[event], args)
          }
        }
      }
    })
    return bindedCallbacks
  }
  getFormElement(type) {
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
        return InputGeneric
      case 'toggle':
        return InputToggle
      case 'radio':
        return InputRadio
      case 'dropdown':
        return InputDropdown
      case 'checkbox':
        return InputCheckbox
      case 'range':
        return InputRange
      case 'textarea':
        return InputTextArea
      default:
        const { customComponentResolvers } = this.props
        if (customComponentResolvers) {
          let Component$$1 = null
          let i = 0
          while (i < customComponentResolvers.length) {
            Component$$1 = customComponentResolvers[i](type)
            if (Component$$1) {
              break
            }
            i++
          }
          return Component$$1
        }
        return null
    }
  }
  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(e)
  }
  validateField(value, config) {
    if (typeof config.validation === 'function') {
      return config.validation(value) || null
    }
    if (
      typeof config.required !== 'undefined' &&
      typeof value === 'undefined'
    ) {
      return typeof config.required === 'string'
        ? config.required
        : 'Required Value'
    }
    return null
  }
  getFormGroup(config, callbacks, store) {
    return createElement(
      ReactFormGroup,
      { config: config, key: config.id },
      this.getFormElements(config.elements, callbacks, store),
    )
  }
  getFormElements(configs, callbacks, store) {
    return configs.map((config, i) => {
      if (config.type === 'group') {
        return this.getFormGroup(config, callbacks, store)
      }
      if (config.isHidden && config.isHidden(store)) {
        return false
      }
      if (!config.resultPath) {
        return new Error(`Provide a resultPath in config[${i}]`)
      }
      const value = dotObject.get(store, config.resultPath, undefined)
      const error = this.validateField(value, config)
      this.errors[i] = {
        id: config.id,
        error,
      }
      const props = {
        config,
        value,
        callbacks: this.bindCallbacks(config, callbacks),
      }
      const Element = this.getFormElement(config.type)
      return createElement(
        ReactFormTemplate,
        {
          error: (this.state.validate || config.instantValidation) && error,
          config: config,
          store: store,
          key: config.id,
        },
        Element ? createElement(Element, Object.assign({}, props)) : null,
      )
    })
  }
  render() {
    const {
      config,
      onBlur,
      onChange,
      onFocus,
      store,
      primaryButton,
      secondaryButton,
      onSecondaryButtonClick,
    } = this.props
    const formElements = this.getFormElements(
      config,
      { onChange, onBlur, onFocus },
      store,
    )
    return createElement(
      'form',
      { className: 'react-forms', onSubmit: this.onSubmit },
      createElement('div', { className: 'form-elements' }, formElements),
      createElement(
        'div',
        { className: 'form-buttons-container' },
        this.props.children ||
          createElement(
            'div',
            { className: 'form-buttons' },
            secondaryButton &&
              createElement(
                'button',
                {
                  className: 'cancel',
                  onClick: onSecondaryButtonClick,
                  type: 'button',
                },
                secondaryButton,
              ),
            primaryButton &&
              createElement(
                'button',
                { className: 'submit', type: 'submit' },
                primaryButton,
              ),
          ),
      ),
    )
  }
}
ReactForms.defaultProps = {
  useNativeEvent: false,
  store: {},
  primaryButton: 'Submit',
  secondaryButton: 'Cancel',
  onSecondaryButtonClick: () => {},
  onSubmit: () => {},
}

export default ReactForms
