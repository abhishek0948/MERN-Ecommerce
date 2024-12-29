import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { deleteUserDetails, setUserDetails } from "../redux/userSlice";
import Context from "../context";

function Header() {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const search = URLSearch.getAll("q");
  const [searchQuery, setSearchQuery] = useState(search);
  const user = useSelector((state) => state?.user?.user || {});

  const context = useContext(Context);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  const handleLogout = async () => {
    try {
      const dataResponse = await axios.get(
        "http://localhost:8080/api/userLogout",
        {
          withCredentials: true,
        }
      );

      if (dataResponse.data.success) {
        toast.success(dataResponse.data.message);
        dispatch(deleteUserDetails());
        navigate("/");
      }

      if (dataResponse.data.error) {
        toast.success(dataResponse.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong while login");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="container h-full mx-auto flex items-center px-4 justify-between">
        <div className="main-icon">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2">
          <input
            type="text"
            value={searchQuery}
            placeholder="Search items here..."
            className="w-full outline-none "
            onChange={handleSearch}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            <div
              className="text-3xl cursor-pointer relative flex justify-center"
              onClick={() => setMenuDisplay((prev) => !prev)}
            >
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.name.toUpperCase()[0]}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <FaUser />
              )}
            </div>

            {/* Admin User  */}
            {menuDisplay && user?._id && user?.role === "ADMIN" && (
              <div
                className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.role === "ADMIN" && (
                  <nav>
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap md:block hidden hover:bg-slate-100 p-2"
                    >
                      Admin Panel
                    </Link>
                  </nav>
                )}
              </div>
            )}

            {/* General User  */}
            {menuDisplay && user?._id && user?.role === "GENERAL" && (
              <div
                className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                <nav>
                  <Link
                    to={`/order/${user?._id}`}
                    className="whitespace-nowrap md:block hidden hover:bg-slate-100 p-2"
                  >
                    Orders
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-3xl relative">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2">
                <p className="text-xs">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
