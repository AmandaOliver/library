import React, { Fragment } from 'react'
import { Formik, Field, Form } from 'formik'
import DateForm from './DateForm'
import InputForm from './InputForm'
import DropDownForm from './DropDownForm'
import { Consumer } from '../context'
import { bookPropertiesDropDown } from '../utils'
import { getPropertyValues } from '../utils'
import './styles.scss'

const Search = () => {


  const choosePropertyField = (property, number) => {
    if (property === 'publishDate') {
      return <DateForm number={number} />
    }
    if (property === 'authorGender' || property === 'genre' ) {
      return <DropDownForm property={property}/>
    }
    return <InputForm property={property}/>
  }

  return (
    <Consumer>
      {({ filterByProperties, sortByProperty, resetFilter }) =>
        <Formik
          initialValues={{ property: '', value: '',exact: false }}
          onSubmit={({ property, value, exact, publishDay, publishMonth, publishYear, publishWeekDay, isLast }) => {
            const calculatedExact = getPropertyValues(property) ? true : exact
            filterByProperties([{
              property,
              value,
              exact: calculatedExact,
              publishDate: {
                publishDay, publishMonth, publishYear, publishWeekDay, isLast
              }
            }])
          }}
          render={({ handleChange, values, resetForm, setFieldValue }) => (
            <Fragment>
              <Form>
                <Field component='select' name='property' >
                  <option value='' label='Select an Option' />
                  {bookPropertiesDropDown}
                </Field >
                {values.property && choosePropertyField(values.property, handleChange, 1)}
                <button type='submit'>Search</button>
                <button type='button' onClick={() => {
                  resetForm()
                  resetFilter()
                }} label='Reset'>Reset</button>
              </Form>
            </Fragment>
          )}
        />
      }
    </Consumer>
  )
}

export default Search
