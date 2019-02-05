import React, { Fragment, PureComponent } from 'react'
import { Formik, Field } from 'formik'
import { Consumer } from '../context'
import config from '../configuration'
import './styles.scss'

class Search extends PureComponent {
  render() {

    const getPropertyField = (name, handleChange) => {
      const values = config.bookProperties[name].values
      if (values) {
        return (
          <Field component='select' name='value' >
            <option value="" label="Select an Option" />
            {values.map(value => <option key={value} value={value} label={value}/>)}
          </Field >
        )
      } else {
        return (
          <Fragment>
            <input type="text" name='value' onChange={handleChange} />
            <input type="checkbox" id='exact' name='exact' onChange={handleChange}/>
            <label htmlFor='exact'>Exact Match</label>
          </Fragment>

        )
      }
    }

    return (
      <Consumer>
        {({ filterByProperties, sortByProperty, resetFilter }) =>
          <Fragment>
            <Formik
              initialValues={{ property: 'id' }}
              onSubmit={(values) => {
                sortByProperty(values.property)
              }}
              render={({handleSubmit, values}) => (
                <form onSubmit={handleSubmit}>
                  <Field component='select' name='property' >
                    <option value="id" label="Id" />
                    {Object.keys(config.bookProperties).map(value =>
                      <option key={value} value={value} label={config.bookProperties[value].label}/>)
                    }
                  </Field >
                  <button type="submit">Sort</button>
                </form>
              )}
            />
            <Formik
              initialValues={{ property: '', exact: false }}
              onSubmit={(values) => {
                const exact = config.bookProperties[name] ? true : values.exact
                console.log(exact)
                filterByProperties([{ property: values.property, value: values.value, exact: exact }])
              }}
              render={({handleSubmit, handleChange, values}) => (
                <form onSubmit={handleSubmit}>
                  <Field component='select' name='property' >
                    <option value="" label="Select an Option" />
                    {Object.keys(config.bookProperties).map(value =>
                      <option key={value} value={value} label={config.bookProperties[value].label}/>)
                    }
                  </Field >
                  {values.property && getPropertyField(values.property, handleChange)}
                  <button type="submit">Search</button>
                </form>
              )}
            />
            <Formik
              onSubmit={(values) => {
                resetFilter()
              }}
              render={({handleSubmit, values}) => (
                <form onSubmit={handleSubmit}>
                  <button type="submit">Reset</button>
                </form>
              )}
            />
          </Fragment>
        }
      </Consumer>
    )


  }
}

export default Search
