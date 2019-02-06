import React from 'react'
import { Formik, Form, Field } from 'formik'
import DateForm from './DateForm'
import DropDownForm from './DropDownForm'
import { Consumer } from '../context'
import './styles.scss'

const Search = () =>
  <Consumer>
    {({ filterBooks, resetFilter }) =>
      <Formik initialValues={{
        name: {
          value: undefined,
          exact: undefined,
        },
        genre: '',
        authorName: {
          value: undefined,
          exact: undefined,
        },
        publishDate: {
          day: '',
          month: '',
          year: '',
          weekDay: '',
          isLast: undefined
        }
      }}
        onSubmit={({ name, genre, authorName, authorGender, publishDate }) => {
        filterBooks({
          name: {
            value: name.value,
            exact: name.exact
          },
          genre,
          authorName: {
            value: authorName.value,
            exact: authorName.exact,
          },
          authorGender,
          publishDate: {
            day: publishDate.day && parseInt(publishDate.day),
            month: publishDate.month && parseInt(publishDate.month),
            year: publishDate.year && parseInt(publishDate.year),
            weekDay: publishDate.weekDay && parseInt(publishDate.weekDay),
            isLast: publishDate.isLast
          }
        })
      }}>
        { ({handleChange, values, resetForm, initialValues}) => (
          <Form >
            <input type='text' name='name.value' onChange={handleChange} placeholder='name' value={values.name.value || ''}/>
            <Field type='checkbox' id='name.exact' name='name.exact' onChange={handleChange} value={values.name.exact || ''}/>
            <label id='name.exact' className='checkbox__label'>Exact</label>
            <DropDownForm  property={'genre'} />
            <DateForm property={'publishDate'} />
            <input type='text' name='authorName.value' onChange={handleChange} placeholder='author name' value={values.authorName.value || ''}/>
            <Field type='checkbox' id='authorName.exact' name='authorName.exact' onChange={handleChange} value={values.name.exact || ''}/>
            <label id='authorName.exact' className='checkbox__label'>Exact</label>
            <DropDownForm property={'authorGender'}/>
            <button type='submit'>Search</button>
            <button type='button' onClick={() => {
              resetForm(initialValues)
              resetFilter()
            }} label='Reset'>Reset</button>
          </Form>
        )}
      </Formik>
    }
  </Consumer>


export default Search
