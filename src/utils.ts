import {
  IReactFormConfig,
} from './types'

const dot = require('dot-prop-immutable')

const getNewState = (callback: (val: any) => void, store: any) => {
  const getValue = (type: string, args: any[]) => {
    switch (type) {
      case 'text':
        return args[0].currentTarget.value
    }
  }
  return (config: IReactFormConfig, ...rest: any[]) => {
    const value = getValue(config.type, rest)
    const intermediateStore = dot.set(store, config.resultPath, value)
    const newStore = config.modifyStoreOnChange
      ? config.modifyStoreOnChange(config, value, intermediateStore)
      : intermediateStore
    return callback(newStore)
  }
}

export {
  getNewState,
}