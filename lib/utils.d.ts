import { IReactFormConfig } from './types'
declare const getNewState: (
  callback: (val: any) => void,
  store: any,
  customValueResolver?: ((config: IReactFormConfig, args: any[]) => any)[],
) => (config: IReactFormConfig, ...rest: any[]) => void
export { getNewState }
