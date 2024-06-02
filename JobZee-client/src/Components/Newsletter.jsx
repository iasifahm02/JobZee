import React from 'react'
import {FaEnvelopeOpenText, FaRocket} from 'react-icons/fa6'

const Newsletter = () => {
  return (
    <div>
        <div>
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'> <FaEnvelopeOpenText/> Email me for Jobs</h3>
            <p className='text-primary/75 text-base mb-4'>For getting job updates, Put your email here to subscribe for the latest Job Updates!</p>
            <div className='w-full space-y-4'>
                <input type="email" id='email' placeholder='name@email.com' className='w-full block py-2 pl-3 border focus:outline-none'/>
                <input type="submit" value={"Subscribed"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold'/>
            </div>
        </div>
        {/* 2nd div */}
        <div className='mt-20'>
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'> <FaRocket/> Get noticed faster</h3>
            <p className='text-primary/75 text-base mb-4'>To get noticed faster by the companies, put your updated resume here</p>
            <div className='w-full space-y-4'>
                <input type="submit" value={"Upload your resume"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold'/>
            </div>
        </div>
    </div>
  )
}

export default Newsletter