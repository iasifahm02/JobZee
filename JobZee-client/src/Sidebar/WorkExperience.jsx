import React from 'react'
import InputField from '../Components/InputField'

const WorkExperience = ({ handleChange }) => {
    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Work experience</h4>
            <div>
                <label className='sidebar-label-container'>
                    <input type="radio" name="test" value="" onChange={handleChange} />
                    <span className='checkmark'></span> Any Experience
                </label>
                <InputField handleChange={handleChange} value="Internship" title="Internship" name="test"></InputField>
                <InputField handleChange={handleChange} value="Work remotely" title="Work remotely" name="test"></InputField>
            </div>
        </div>
    )
}

export default WorkExperience