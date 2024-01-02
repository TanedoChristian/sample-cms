"use client";

import Image from "next/image";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import IUser from "./interfaces/IUser";
import axios from "axios";
import Swal from "sweetalert2";

export default function Home() {
  const [users, setUsers] = useState<IUser[]>();
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<IUser>();

  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [success]);

  const handleDelete = async (user: IUser) => {
    await axios
      .delete(`/api/user/${user.id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: "Deleted",
        });
        setSuccess(!success);
        setAddModal(false)
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = async (user: IUser) => {
    setShowModal(true);
    setUser(user);
  };

  const handleUpdateUser = () => {
    axios
      .put(`/api/user/${user?.id}`, user)
      .then((data) => {
        Swal.fire({
          icon: "success",
          text: "Updated",
        });
        setSuccess(!success);
        setShowModal(false)
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseAddModal = () => {
    setAddModal(false);
  };

  const handleAddUser = () => {
    axios
      .post("/api/user", user)
      .then((data) => {
        Swal.fire({
          icon: "success",
          text: "Added",
        });
        setSuccess(!success);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center justify-center  w-full min-h-screen bg-gray-700 py-10 relative">
      <button
        className="absolute top-0 right-2 p-3"
        onClick={() => setAddModal(true)}
      >
        Add Contact
      </button>

      {addModal ? (
        <div className="">
          <div
            id="authentication-modal"
            aria-hidden="true"
            className="backdrop-blur-[2px] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add Contact
                  </h3>
                  <button
                    onClick={() => handleCloseAddModal()}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-4 md:p-5">
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Last name
                      </label>
                      <input
                        type="text"
                        onChange={(e: any) => handleChange(e)}
                        name="lastname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        First name
                      </label>
                      <input
                        type="text"
                        onChange={(e: any) => handleChange(e)}
                        name="firstname"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </label>
                      <input
                        type="text"
                        onChange={(e: any) => handleChange(e)}
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Address
                      </label>
                      <input
                        type="text"
                        onChange={(e: any) => handleChange(e)}
                        name="address"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phonenumber"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      onClick={() => handleAddUser()}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {showModal ? (
        <div className="">
          <div
            id="authentication-modal"
            aria-hidden="true"
            className="backdrop-blur-[2px] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Update Contact
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-4 md:p-5">
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Last name
                      </label>
                      <input
                        type="text"
                        onChange={(e: any) => handleChange(e)}
                        value={user?.lastname}
                        name="lastname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        First name
                      </label>
                      <input
                        type="text"
                        onChange={(e: any) => handleChange(e)}
                        value={user?.firstname}
                        name="firstname"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </label>
                      <input
                        type="text"
                        onChange={(e: any) => handleChange(e)}
                        value={user?.email}
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Address
                      </label>
                      <input
                        type="text"
                        onChange={(e: any) => handleChange(e)}
                        name="address.city"
                        value={user?.address}
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phonenumber"
                        value={user?.phonenumber}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      onClick={() => handleUpdateUser()}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <h1 className="text-lg text-gray-400 font-medium">
        User Contact Management System
      </h1>
      <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full text-sm text-gray-400">
                <thead className="bg-gray-800 text-xs uppercase font-medium">
                  <tr>
                    <th></th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      First Name
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Email
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Phone Number
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Address
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800">
                  {users?.map((user: IUser) => (
                    <tr key={user.id} className="bg-black bg-opacity-20">
                      <td className="pl-4">{user.id}</td>
                      <td className="flex px-6 py-4 whitespace-nowrap">
                        <span className="ml-2 font-medium">
                          {user.lastname}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.firstname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.phonenumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-5">
                        <button onClick={() => handleUpdate(user)}>
                          Update
                        </button>
                        <button onClick={() => handleDelete(user)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
