import React from 'react';
import { Home, Info, ContactMail, Lock } from '@mui/icons-material';  // Import icons from Material UI
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className=" sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-2 ml-4">
  <img 
    src="https://th.bing.com/th/id/R.f81a6f373c244b1f70f4b7402b5ab372?rik=rbXh4ieLuKt%2bmA&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f09%2fReact_logo_logotype_emblem.png&ehk=QhGOkKcUKCU7FBQgHOajOiJqJBACUTD2Ni6LsfqzCEA%3d&risl=&pid=ImgRaw&r=0"
    alt="React Logo"
    className="w-16 h-16 object-contain" 
  />
 <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-600 text-3xl font-semibold tracking-wide">
        Lokmanya Tilak School
      </h1>
</div>
          <div className="flex space-x-6">
          <button className="flex items-center text-black hover:underline px-4 py-2 rounded-md transition duration-300 ease-in-out">
  <Home className="mr-2" />
  Home
</button>

            <button className="flex items-center text-black hover:underline  px-4 py-2 rounded-md transition duration-300 ease-in-out">
              <Info className="mr-2" />
              About
            </button>
            <button className="flex items-center text-black  hover:underline px-4 py-2 rounded-md transition duration-300 ease-in-out">
              <ContactMail className="mr-2" />
              Contact
            </button>
            <Link to='/signin'>
            <button className="flex items-center text-white ml-50 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-800 px-4 py-2 rounded-md transition duration-300 ease-in-out">
            <Lock className="mr-3" />
  SignIn
</button></Link>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
