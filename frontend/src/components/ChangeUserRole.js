import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";

const ChangeUserRole = ({ userId, name, email, role, onClose ,fetchAllUsers }) => {
  const [userRole, setUserRole] = useState(role);

//   console.log("User Id", userId);
//   console.log("name:", name);
//   console.log("email:", email);
//   console.log("Role", role);

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/update-user",
        {
          userId: userId,
          name: name,
          email: email,
          role: userRole,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        await fetchAllUsers();
        toast.success(response.data.message);
        onClose();
      }
    } catch (err) {
      toast.error("Error in updating user");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-60">
      <div className="bg-white shadow-2xl p-4 w-full max-w-sm">

        <div className="flex justify-between items-center pb-4">
          <h1 className="font-medium text-lg">Change User Role</h1>
          <button className="text-xl" onClick={onClose}>
            <IoCloseCircle className="rounded-full bg-white text-red-500 hover:text-red-700" />
          </button>
        </div>

        <div className="flex flex-col items-start space-y-6">
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <div className="flex gap-4">
            <p>Role:</p>
            <select
              className="border px-4 py-1"
              value={userRole}
              onChange={handleRoleChange}
            >
              <option value="ADMIN">ADMIN</option>
              <option value="GENERAL">GENERAL</option>
            </select>
          </div>

          <button
            className="mx-auto px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700"
            onClick={updateUserRole}
          >
            Change Role
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
