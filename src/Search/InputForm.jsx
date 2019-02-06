import React, { Fragment } from 'react'
import { Field } from 'formik'

const InputForm = () =>
  <Fragment>
    <Field type='text' name='value'/>
    <Field type='checkbox' id='exact' name='exact' />
    <label id='exact'>Exact Match</label>
  </Fragment>
export default InputForm
