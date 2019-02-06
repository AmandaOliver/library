import React, { Fragment } from 'react'
import { Formik, Field, Form } from 'formik'
import { Consumer } from '../context'
import { bookPropertiesDropDown } from '../utils'
import config from '../configuration'
import './styles.scss'

const Search = () => {

  const getPropertyValues = property => config.bookProperties[property].values

  const inputField =
    <Fragment>
      <Field type="text" name='value'/>
      <Field type="checkbox" id='exact' name='exact' />
      <label id="exact">Exact Match</label>
    </Fragment>

  const getDropDownField = values =>
    <Field component='select' name='value' >
      <option value="" label="Select an Option" />
      {values.map(value => <option key={value} value={value} label={value}/>)}
    </Field >

  const propertiesDropDown =
    <Field component='select' name='property' >
      <option value="" label="Select an Option" />
      {bookPropertiesDropDown}
    </Field >

  const getPropertyField = (name, handleChange) => {
    const values = getPropertyValues(name)
    if (values) {
      return getDropDownField(values)
    }
    return inputField
  }


  return (
    <Fragment>
      <Consumer>
        {({ filterByProperties, sortByProperty, resetFilter }) =>
          <Formik
            initialValues={{ property: '', value: '',exact: false }}
            onSubmit={({property, value, exact}) => {
              const calculatedExact = getPropertyValues(property) ? true : exact
              filterByProperties([{
                property,
                value,
                exact: calculatedExact
              }])
            }}
            render={({ handleChange, values, resetForm}) => (
              <Form>
                {propertiesDropDown}
                {values.property && getPropertyField(values.property, handleChange)}
                <button type="submit">Search</button>
                <button type="button" onClick={() => {
                  resetForm()
                  resetFilter()
                }} label='Reset'>Reset</button>
              </Form>
            )}
          />
        }
      </Consumer>
    </Fragment>
  )
}

export default Search
