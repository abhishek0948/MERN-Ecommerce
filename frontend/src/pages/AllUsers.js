import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    _id: "",
    name: "",
    email: "",
    role: "",
  });

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/all-user", {
        withCredentials: true,
      });

      if (response.data.success) {
        setAllUser(response.data.data);
        // console.log(allUser);
      }
      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Error fetching All users");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="table-container">
      <table className="userTable">
        <thead className="bg-black text-white">
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {allUser.map((user, idx) => {
            return (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>{moment(user?.createdAt).format("ll")}</td>
                <td>
                  <button
                    className="bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-400 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(user);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          userId={updateUserDetails._id}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          fetchAllUsers={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
