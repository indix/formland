import {
  IReactFormConfig,
} from './types'

const dot = require('dot-prop-immutable')
const set = require('es6-set')
const arrayFrom = require('array-from')

const getNewState = (
  callback: (val: any) => void,
  store: any,
  customValueResolver?: {(config: IReactFormConfig, args: any[]): any}[],
) => {
  const getValue = (config: IReactFormConfig, args: any[]) => {
    switch (config.type) {
      case 'radio':
      case 'text':
      case 'textarea':
      case 'range':
        return args[0].currentTarget.value
      case 'dropdown':
        if (config.componentProps && config.componentProps.multiple) {
          const options = args[0].currentTarget.options
          const value = []
          for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
              value.push(options[i].value)
            }
          }
          return config.simpleValues ? value.join(config.separator || ',') : value
        }
        return args[0].currentTarget.value
      case 'checkbox':
        const value = args[0].currentTarget.value
        const existingValue = dot.get(store, config.resultPath) || []
        const existingValueArray = (config.simpleValues && existingValue.split)
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
        return args[0].currentTarget.value === 'true'
      default:
        if (customValueResolver) {
          let value = ''
          let i = 0
          while (i < customValueResolver.length) {
            value = customValueResolver[i](config, args)
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
  return (config: IReactFormConfig, ...rest: any[]) => {
    const value = getValue(config, rest)
    const intermediateStore = dot.set(store, config.resultPath, value)
    const newStore = config.modifyStoreBeforeChange
      ? (config.modifyStoreBeforeChange(config, value, intermediateStore) || intermediateStore)
      : intermediateStore
    return callback(newStore)
  }
}

export {
  getNewState,
}
