import * as React from 'react'
import * as Select from 'react-select'


const ReactSelect = (props: any) => {
  return <Select.default
    options={props.config.options}
    value={props.value}
    {...props.additionalProps}
  />

}

export default ReactSelect
