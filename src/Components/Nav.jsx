import { useState } from "react";
import { Link } from "react-scroll";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

const Nav = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const content = (
    <>
      <div className="lg:hidden block absolute top-20 rounded-3xl w-full left-0 z-20 right-0 bg-black transition ">
        <ul className="text-center text-xl p-5 ">
          <Link spy={true} smooth={true} to="Home">
            <li className="my-4 py-4 border-b border-slate-800 hover:bg-[#F7CB46] hover:text-2xl hover:rounded-xl hover:font-semibold hover:text-black">
              Home
            </li>
          </Link>
          <Link spy={true} smooth={true} to="About">
            <li className="my-4 py-4 border-b border-slate-800 hover:bg-[#F7CB46] hover:text-2xl hover:rounded-xl hover:font-semibold hover:text-black">
              About
            </li>
          </Link>
          <Link spy={true} smooth={true} to="Feature">
            <li className="my-4 py-4 border-b border-slate-800 hover:bg-[#F7CB46] hover:text-2xl hover:rounded-xl hover:font-semibold hover:text-black">
              Feature
            </li>
          </Link>
          <Link spy={true} smooth={true} to="Introduction">
            <li className="my-4 py-4 border-b border-slate-800 hover:bg-[#F7CB46] hover:text-2xl hover:rounded-xl hover:font-semibold hover:text-black">
              Introduction
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
  return (
    <nav className="bg-black rounded-b-3xl sticky z-20 top-0">
      <div className="h-10vh justify-between z-50 text-white lg:py-3 py-4 ">
        <div className="flex items-center flex-1 ">
          <div className="block w-full">
            <img src="/logo.png" alt="Logo" />
          </div>
          <div className="lg:flex md:flex lg: flex-1 items-center justify-end ">
            <div className=" flex-10 pb-1">
              <ul className=" hidden gap-8 mr-16 text-xl md:flex">
                <Link spy={true} smooth={true} to="Home">
                  <li className="hover:text-yellow-500 transition border-b-2 border-slate-950 hover:border-yellow-500 cursor-pointer">
                    Home
                  </li>
                </Link>
                <Link spy={true} smooth={true} to="About">
                  <li className="hover:text-yellow-500 transition border-b-2 border-slate-950 hover:border-yellow-500 cursor-pointer">
                    About
                  </li>
                </Link>
                <Link spy={true} smooth={true} to="Feature">
                  <li className="hover:text-yellow-500 transition border-b-2 border-slate-950 hover:border-yellow-500 cursor-pointer">
                    Feature
                  </li>
                </Link>
                <Link spy={true} smooth={true} to="Introduction">
                  <li className="hover:text-yellow-500 transition border-b-2 border-slate-950 hover:border-yellow-500 cursor-pointer">
                    Introduction
                  </li>
                </Link>
              </ul>
            </div>
            <div>{click && content}</div>
            <div className="w-full flex justify-end px-8 pb-1">
              <button
                className="block sm:hidden transtion "
                onClick={handleClick}
              >
                {click ? <FaTimes size={30} /> : <CiMenuFries size={30} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
