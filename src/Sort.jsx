import React from 'react'
import { getBookPropertiesDropDown } from './utils'
import { Formik, Field, Form } from 'formik'
import { Consumer } from './context'

const Sort = () =>
  <Consumer>
    {({ sortByProperty }) =>
      <Formik
        initialValues={{ property: 'id' }}
        onSubmit={(values) => sortByProperty(values.property)}
        render={() => (
          <Form >
            <Field component='select' name='property' >
              <option value='id' label='Id' />
              {getBookPropertiesDropDown()}
            </Field >
            <button type='submit'>Sort</button>
          </Form>
        )}
      />}
  </Consumer>

export default Sort
