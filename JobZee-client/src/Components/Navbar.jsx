import React from 'react'
import logo from '../assets/icon.png'
import { NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen); //opposite set krdo, true-false
    }

    const navItems = [
        { path: "/", title: "Start a search" },
        { path: "/my-jobs", title: "My Jobs" },
        { path: "/salary", title: "Salary estimate" },
        { path: "/post-job", title: "Post A Job" },
    ]

    return (
        <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <nav className="flex justify-between items-center py-6">
                <a href="/" className='flex items-center gap-2 text-2xl text-black'>
                <img src={logo} alt="Logo" className="logo w-10 h-auto" />
                    <span>JobZee</span>
                </a>
                {/* Nav Items for large device */}
                <ul className="hidden md:flex gap-12">
                    {navItems.map(({ path, title }) => (
                        <li key={path}>
                            <NavLink to={path} className={({ isActive }) => isActive ? "active" : ""}>
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                {/* Signup login button */}
                <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
                    <NavLink to="/login" className="py-2 px-5 border rounded">Log In</NavLink>
                    <NavLink to="/sign-up" className="py-2 px-5 border rounded bg-blue text-white">Sign Up</NavLink>
                </div>

                {/* Toggler for mobile device */}
                <div className='md:hidden block'>
                    <button onClick={handleMenuToggler}>
                        {
                            isMenuOpen ? <FaXmark className='w-5 h-5 text-primary' /> : <FaBarsStaggered className='w-5 h-5 text-primary' />
                        }
                    </button>
                </div>
            </nav>

            {/* Nav Items for Mobile device */}
            <div className={`px-4 bg-black py-5 rounded-sm md:hidden ${isMenuOpen ? "" : "hidden"}`}>
                <ul>
                    {navItems.map(({ path, title }) => (
                        <li key={path} className='text-base text-white first:text-white py-1'>
                            <NavLink to={path} className={({ isActive }) => isActive ? "active" : ""}>
                                {title}
                            </NavLink>
                        </li>
                    ))}
                    <li className='text-white py-1'>
                        <NavLink to="/login">Log In</NavLink>
                    </li>
                </ul>
            </div>

        </header>
    )
}

export default Navbar