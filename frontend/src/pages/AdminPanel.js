import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user || {});
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 custom-shadow">
        <div className="h-36 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.name.toUpperCase()[0]}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <FaUser />
            )}
          </div>

          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/* Navigation */}
        <div>
          <nav className="grid p-4">
            <NavLink
              to="all-users"
              className={({ isActive }) =>
                isActive
                  ? "px-2 py-1 bg-slate-100"
                  : "px-2 py-1 hover:bg-slate-100"
              }
            >
              All Users
            </NavLink>

            <NavLink
              to="all-products"
              className={({ isActive }) =>
                isActive
                  ? "px-2 py-1 bg-slate-100"
                  : "px-2 py-1 hover:bg-slate-100"
              }
            >
              All Products
            </NavLink>
          </nav>
        </div>
      </aside>

      <main className="w-full mx-2 my-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
