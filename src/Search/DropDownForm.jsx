import React from 'react'
import { Field } from 'formik'
import { getPropertyValues } from '../utils'


const DropDownForm = ({ property }) => {
  return (
    <Field component='select' name={property} >
      <option value='' label={`${property}`} />
      {getPropertyValues(property).map(value => <option key={value} value={value} label={value} />)}
    </Field >
  )
}

export default DropDownForm
