import JobPostingData from './JobPostingData'
import WorkExperience from './WorkExperience'
import EmploymentType from './EmploymentType'
import Location from './Location'
import Salary from './Salary'
import React from 'react'

const Sidebar = ({handleChange, handleClick}) => {
  return (
    <div className='space-y-5'>
        <h3 className='text-lg font-bold mb-2'>Filters</h3>
        <Location handleChange={handleChange}></Location>
        <Salary handleChange={handleChange} handleClick={handleClick}></Salary>
        <JobPostingData handleChange={handleChange}></JobPostingData>
        <WorkExperience handleChange={handleChange}></WorkExperience>
        <EmploymentType handleChange={handleChange}></EmploymentType>
    </div>
  )
}

export default Sidebar