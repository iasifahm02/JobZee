import React from 'react'
import Button from './Button'
import InputField from '../Components/InputField'

const Salary = ({ handleChange, handleClick }) => {
  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>Salary</h4>
      <div className='mb-4'>
        <Button onClickHandler={handleClick} value="" title="Hourly"></Button>
        <Button onClickHandler={handleClick} value="Monthly" title="Monthly"></Button>
        <Button onClickHandler={handleClick} value="Yearly" title="Yearly"></Button>
      </div>
      {/* For radio button */}
      <div>
        <label className='sidebar-label-container'>
          <input type="radio" name="test" value="" onChange={handleChange} />
          <span className='checkmark'></span> Any
        </label>
        {/* Now We'll create component for all location option */}
        <InputField handleChange={handleChange} value="30" title="<30K" name="test"></InputField>
        <InputField handleChange={handleChange} value="50" title="<50K" name="test"></InputField>
        <InputField handleChange={handleChange} value="80" title="<80K" name="test"></InputField>
        <InputField handleChange={handleChange} value="100" title="<100K" name="test"></InputField>
      </div>
    </div>
  )
}

export default Salary