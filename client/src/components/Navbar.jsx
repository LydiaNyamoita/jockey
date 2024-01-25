import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const links = [
    {
      id: 1,
      link: "home",
    },
    {
      id: 2,
      link: "jockeys",
    },
    {
      id: 3,
      link: "Races",
    },
  ];
  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-gray-800  ">
      <div>
        <Link className="text-5xl font-signature ml-2" to="/">
          Jockey
        </Link>
      </div>

      <ul className="hidden lg:flex">
        {links.map(({ id, link }) => (
          <li
            key={id}
            className="md:px-8 cursor-pointer capitalize font-medium text-gray-800 hover:scale-105 duration-200"
          >
            {link}
          </li>
        ))}
      </ul>

      {!loggedIn ? (
        <div className="hidden lg:flex items-center">
          <p className="md:px-8 cursor-pointer capitalize font-medium text-gray-800 hover:scale-105 duration-200">
            <Link to="/login">Sign In</Link>
          </p>
        </div>
      ) : (
        <div className="hidden lg:flex items-center">
          <button
            onClick={handleLogout}
            className="text-white bg-[#00A6AB] hover:bg-[#00DDE5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center"
          >
            Logout
          </button>
        </div>
      )}

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 lg:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-[#bef0f1]  to-white text-gray-500">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="cursor-pointer px-4 capitalize py-6 text-4xl"
            >
              {link}
            </li>
          ))}

          {!loggedIn ? (
            <div className="cursor-pointer px-4 capitalize text-4xl text-center ">
              <p className="py-6  hover:text-[#00DDE5]">
                <Link to="/login">SignIn</Link>
              </p>
              <p className="py-6 hover:text-[#00DDE5]"> GetStarted</p>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white bg-[#00A6AB] hover:bg-[#00DDE5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-auto text-center cursor-pointer px-4 capitalize py-6 text-4xl"
            >
              Logout
            </button>
          )}
        </ul>
      )}
    </div>
  );
};

export default NavBar;
