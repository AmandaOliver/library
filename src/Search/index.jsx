import React, { PureComponent } from 'react'
import { Formik, Field } from 'formik'
import { Consumer } from '../context'
import config from '../configuration'
import './styles.scss'

class Search extends PureComponent {
  render() {

    const getPropertyField = (name) => {
      const values = config.bookProperties[name].values
      if (values) {
        return (
          <Field component='select' name='value' >
            <option value="" label="Select an Option" />
            {values.map(value => <option key={value} value={value}>{value}</option>)}
          </Field >
        )
      } else {
        return <input type="text" name='value' />
      }
    }

    return (
      <Consumer>
        {({ filterByProperties }) =>
          <Formik
            initialValues={{ property: '' }}
            onSubmit={(values, actions) => {
              filterByProperties([{ property: values.property, value: values.value }])
            }}
            render={({handleSubmit, handleChange, values, ...props}) => (
              <form onSubmit={handleSubmit}>
                <Field component='select' name='property' >
                  <option value="" label="Select an Option" />
                  {Object.keys(config.bookProperties).map(value =>
                    <option key={value} value={value}>{config.bookProperties[value].label}</option>)
                  }
                </Field >
                {values.property && getPropertyField(values.property)}
                <button type="submit">Search</button>
              </form>
            )}
          />
        }
      </Consumer>
    )


  }
}

export default Search
