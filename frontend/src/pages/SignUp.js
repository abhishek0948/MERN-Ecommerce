import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageTobase64 from "../helpers/imageToBase64";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/signup",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          profilePic: data.profilePic
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }

      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (err) {
      if(err.response) {
        toast.error(err.response.data.message);
        navigate('/login')
      } else {
        toast("Error from server");
      }
    }
  };

  return (
    <section id="signup">
      <div className="container mx-auto p-4">
        <div className="bg-white p-2 py-5 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="loginIcons" />
            </div>
            <form>
              <label>
                <div className="text-xs w-full bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 ">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form className="flex flex-col " onSubmit={handleSubmit}>
            <div>
              <label className="flex p-2">Name : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  placeholder="Enter your name..."
                  required
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div>
              <label className="flex p-2">Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Enter Email"
                  required
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
                  required
                  placeholder="Enter password"
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
            </div>

            <div>
              <label className="flex p-2">Confirm password : </label>
              <div className="flex bg-slate-100 p-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  required
                  placeholder="Enter confirm password"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                />
                <div
                  className="text-xl cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button className="px-6 py-2 w-full max-w-[150px] rounded-full bg-red-500 text-white hover:bg-red-700 hover:scale-110 transition-all mx-auto block mt-6">
              SignUp
            </button>

            <p className="my-4">
              Already have a account ?{" "}
              <Link
                to={"/login"}
                className="text-red-500 hover:underline hover:text-red-600"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
