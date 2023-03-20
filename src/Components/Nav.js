import { useRef, useState } from "react";
// import 'react-bootstrap';

const Nav = () => {
  const citySearch = useRef(null);
  
  return (
    <div className='nav'>
        <div>
            <p className='bg-black text-white w-fit px-2'>Wea</p>
        </div>
        <div className="search-bar">
          <input type='text' placeholder='Enter a location'></input>
          <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.99215 1.873C6.70815 1.873 4.85015 3.739 4.85015 6.033C4.85015 8.327 6.70815 10.193 8.99215 10.193C11.2762 10.193 13.1342 8.327 13.1342 6.033C13.1342 3.739 11.2762 1.873 8.99215 1.873ZM4.52515 10.053C3.57115 8.985 2.98415 7.578 2.98415 6.033C2.98415 2.706 5.67915 0 8.99115 0C12.3032 0 14.9982 2.707 14.9982 6.033C14.9982 9.36 12.3032 12.066 8.99115 12.066C7.88815 12.066 6.85815 11.761 5.96915 11.238L1.64215 16.337C1.45715 16.554 1.19515 16.666 0.932151 16.666C0.717151 16.666 0.502151 16.593 0.327151 16.442C-0.0648491 16.106 -0.110849 15.515 0.223151 15.122L4.52515 10.053Z" fill="#F2F2F2"></path>
          </svg>
        </div>
    </div>
  );
}

export default Nav;
