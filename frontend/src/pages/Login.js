import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {toast}  from "react-toastify";
import axios from "axios";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const {fetchUserDetails ,fetchUserAddToCartCount} = useContext(Context);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setData({...data, [e.target.name]:e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      )
      
      if(response.data.success) {
        toast.success(response.data.message);
        await fetchUserDetails();
        await fetchUserAddToCartCount();
        navigate('/');
      }

      if(response.data.error) {
        toast.error(response.data.message);
      }
    } catch(error) {
      toast.error("Something went wrong while login");
    }
  }

  return (
    <section id="login">
      <div className="container mx-auto p-4">
        <div className="bg-white p-2 py-5 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="loginIcons" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="flex p-2">Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  required
                  placeholder="Enter Email"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div>
              <label className="flex p-2">Password : </label>
              <div className="flex bg-slate-100 p-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  placeholder="Enter password"
                  required
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                />
                <div
                  className="text-xl cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot Password ?
              </Link>
            </div>

            <button className="px-6 py-2 w-full max-w-[150px] rounded-full bg-red-500 text-white hover:bg-red-700 hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>

            <p className="my-4">
              Don't have a account ?{" "}
              <Link
                to={"/sign-up"}
                className="text-red-500 hover:underline hover:text-red-600"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
