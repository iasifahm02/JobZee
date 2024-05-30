import React from 'react'
import Button from './Button'

const Salary = ({handleChange, handleClick}) => {
  return (
    <div>
        <h4 className='text-lg font-medium mb-2'>Salary</h4>
        <div className='mb-4'>
            <Button onClickHandler={handleClick} value="" title="Hourly"></Button>
            <Button onClickHandler={handleClick} value="Monthly" title="Monthly"></Button>
            <Button onClickHandler={handleClick} value="Yearly" title="Yearly"></Button>
        </div>
    </div>
  )
}

export default Salary