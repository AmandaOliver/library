import React, {Fragment} from 'react'
import { Field } from 'formik'
import config from '../configuration'
import './styles.scss'

const DateForm = ({property}) => {

  const getDayValues = () => new Array(31).fill().map((_, index) => {
    const label = index + 1
    return (<option key={label} value={label} label={label} />)
  })

  const getMonthValues = () => new Array(12).fill().map((_, index) => {
    const value = index+1
    return (<option key={value} value={value} label={value} />)
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
    return config.weekDays.map((weekDay, index) => {
      return (<option type='' key={index} value={index} label={weekDay} />)
    })
  }

  return (
    <Fragment>
      <Field component='select' name={`${property}.day`} >
        <option label='Day' />
        {getDayValues()}
      </Field >
      <Field component='select' name={`${property}.month`} >
        <option label='Month' />
        {getMonthValues()}
      </Field >
      <Field component='select' name={`${property}.year`} >
        <option label='Year' />
        {getYearValues()}
      </Field >
      <Field component='select' name={`${property}.weekDay`} >
        <option label='Week Day' />
        {getWeekDayValues()}
      </Field >
      <Field type='checkbox' id='exact' name={`${property}.isLast`}  />
      <label id={`${property}.isLast`} className='checkbox__label'>Last of the month</label>
    </Fragment>
  )
}

export default DateForm
