import React, {Fragment} from 'react'
import { Field } from 'formik'
import config from '../configuration'

const DateForm = () => {

  const getDayValues = () => new Array(31).fill().map((_, index) => {
    const label = index + 1
    return (<option key={label} value={label} label={label} />)
  })

  const getMonthValues = () => new Array(12).fill().map((_, index) => {
    const label = index+1
    return (<option key={index} value={index} label={label} />)
  })

  const getYearValues = () => {
    const yearOfOldestBook = config.oldestBookPublishDate.getFullYear()
    const yearsInRange = new Date().getFullYear() - yearOfOldestBook
    return new Array(yearsInRange).fill().map((_, index) => {
      const value = yearOfOldestBook + index
      return (<option key={value} value={value} label={value} />)
    })
  }
  const getWeekDayValues = () => {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return weekDays.map((weekDay, index) => {
      return (<option key={index} value={index} label={weekDay} />)
    })
  }

  return (
    <Fragment>
      <Field component='select' name='publishDay' >
        <option label="Day" />
        {getDayValues()}
      </Field >
      <Field component='select' name='publishMonth' >
        <option label="Month" />
        {getMonthValues()}
      </Field >
      <Field component='select' name='publishYear' >
        <option label="Year" />
        {getYearValues()}
      </Field >
      <Field component='select' name='publishWeekDay' >
        <option label="Week Day" />
        {getWeekDayValues()}
      </Field >
    </Fragment>
  )
}

export default DateForm
