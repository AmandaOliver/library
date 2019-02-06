import React from 'react'
import { Formik, Field, Form } from 'formik'
import DateForm from './DateForm'
import InputForm from './InputForm'
import DropDownForm from './DropDownForm'
import { Consumer } from '../context'
import { bookPropertiesDropDown } from '../utils'
import { getPropertyValues } from '../utils'
import './styles.scss'

const Search = () => {


  const choosePropertyField = (property) => {
    if (property === 'publishDate') {
      return <DateForm property={property}/>
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
          onSubmit={({ property, value, exact, publishDay, publishMonth, publishYear, publishWeekDay }) => {
            const calculatedExact = getPropertyValues(property) ? true : exact
            filterByProperties([{
              property,
              value,
              exact: calculatedExact,
              publishDate: {
                publishDay, publishMonth, publishYear, publishWeekDay
              }
            }])
          }}
          render={({ handleChange, values, resetForm, setFieldValue}) => (
            <Form>
              <Field component='select' name='property' >
                <option value="" label="Select an Option" />
                {bookPropertiesDropDown}
              </Field >
              {values.property && choosePropertyField(values.property, handleChange)}
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
  )
}

export default Search
