import React, { useEffect, useState } from 'react'
import Banner from '../Components/Banner'
import Card from '../Components/Card'
import Jobs from './Jobs'
import Sidebar from '../Sidebar/Sidebar'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);

  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }

  //Fetch Jobs data from Jobs.json
  useEffect(() => {
    fetch("jobs.json")
      .then(res => res.json())
      .then((data) => {
        setJobs(data);
      })
  }, [])
  console.log(jobs);

  //Filter Jobs by title, by search
  const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1)

  //Radio button based filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  //Button based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  }

  //Main function - filtering
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    //1- filtered Jobs by title (search bar)
    if (query) {
      filteredJobs = filteredItems;
    }

    //2- Category wise filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate }) => (
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
      ));
    }

    //In the end, return filtered Jobs
    return filteredJobs.map((data, i) => <Card key={i} data={data} />)
  }

  //Call the function, take desired filtering
  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* Main Content */}
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
        {/* left side */}
        <div className='bg-white p-4 rounded'>
          <Sidebar handleChange = {handleChange} handleClick={handleClick}></Sidebar>
        </div>

        {/* Job Card */}
        <div className='col-span-2 bg-white p-4 rounded-sm'><Jobs result={result} /></div>

        {/* Right Card */}
        <div className='bg-white p-4 rounded'>Right</div>
      </div>

    </div>
  )
}

export default Home 