import React, { useEffect, useState } from 'react'
import Banner from '../Components/Banner'
import Card from '../Components/Card'
import Jobs from './Jobs'
import Sidebar from '../Sidebar/Sidebar'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  //we gonna show 6 Items per page
  const itemsPerPage = 6;

  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }

  //Fetch Jobs data from Jobs.json
  useEffect(() => {
    setIsLoading(true);
    fetch("jobs.json")
      .then(res => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false); //Jobs fetch then, no loading
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

  //Calculate the Index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  }

  //function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  //function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
      filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experienceLevel, postingDate, salaryType, employmentType }) =>
        jobLocation.toLowerCase() === selected.toLowerCase() ||
        parseInt(maxPrice) <= parseInt(selected) ||
        postingDate >= selected ||
        experienceLevel.toLowerCase() === selected.toLowerCase() ||
        salaryType.toLowerCase() === selected.toLowerCase() ||
        employmentType.toLowerCase() === selected.toLowerCase()
      );
    }

    //Slice the data based on currentPage
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

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
          <Sidebar handleChange={handleChange} handleClick={handleClick}></Sidebar>
        </div>

        {/* Job Card */}
        <div className='col-span-2 bg-white p-4 rounded-sm'>
          {
            isLoading ? (<p className='text-lg font-bold'>Loading....</p>) : result.length > 0 ? (<Jobs result={result} />) : <>
              <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
              <p>No data found</p>
            </>
          }

          {/* Pagination here */}
          {
            result.length > 0 ? (<div className='flex justify-center mt-4 space-x-8'>
              <button onClick={prevPage} disabled={currentPage === 1} className='hover:underline'>Previous</button>
              <span className='mx-2'>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
              <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} className='hover:underline'>Next</button>
            </div>) : ""
          }

        </div>

        {/* Right Card */}
        <div className='bg-white p-4 rounded'>Right</div>
      </div>

    </div>
  )
}

export default Home 