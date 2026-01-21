import React, { useState, useEffect } from "react";
import eye from "../assets/eye.png";
import hiddeneye from "../assets/hidden.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
const Managger = () => {
  const [eyeimage, setEyeimage] = useState(true);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  
      const getPasswords = async () => {
          let req = await fetch("http://localhost:3000/")
          let passwords = await req.json()
          setPasswordArray(passwords)
      }
  
  
      useEffect(() => {
          getPasswords()
      }, [])
  
  
      const copyText = (text) => {
          toast('Copied to clipboard!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
          });
          navigator.clipboard.writeText(text)
      }
  
      const showPassword = () => {
          passwordRef.current.type = "text"
          console.log(ref.current.src)
          if (ref.current.src.includes("icons/eyecross.png")) {
              ref.current.src = "icons/eye.png"
              passwordRef.current.type = "password"
          }
          else {
              passwordRef.current.type = "text"
              ref.current.src = "icons/eyecross.png"
          }
  
      }
  
      const savePassword = async () => {
          if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
  
              // If any such id exists in the db, delete it 
              await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
  
              setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
              await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
  
              // Otherwise clear the form and show toast
              setForm({ site: "", username: "", password: "" })
              toast('Password saved!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
              });
          }
          else {
              toast('Error: Password not saved!');
          }
  
      }
  
      const deletePassword = async (id) => {
          console.log("Deleting password with id ", id)
          let c = confirm("Do you really want to delete this password?")
          if (c) {
              setPasswordArray(passwordArray.filter(item => item.id !== id))
              
              await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
  
              toast('Password Deleted!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true, 
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
              });
          }
  
      }
  
      const editPassword = (id) => {
          setForm({ ...passwordArray.filter(i => i.id === id)[0], id: id })
          setPasswordArray(passwordArray.filter(item => item.id !== id))
      }
  
  
      const handleChange = (e) => {
          setForm({ ...form, [e.target.name]: e.target.value })
      }
  
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-2 md:p-0 md:mycontainer">
        <h1 className="text-4xl text font-bold text-center py-2 border border-white ">
          <span className="text-green-500">&lt;</span>
          Password-Manager
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-center py-2 border border-white  text-lg">
          Your Password Manger
        </p>

        <div className="text-white flex flex-col p-4 gap-8 items-center">
          <input
            className="rounded-full border text-black p-4 py-1  border-green-500 w-full"
            type="text"
            placeholder="Enter website URL"
            name="site"
            id="site"
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex flex-col md:flex-row w-full gap-8 ">
            <input
              className="rounded-full border text-black p-4 py-1  border-green-500 w-full"
              type="text"
              placeholder="Enter username"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
            />
            <div className="relative flex justify-center items-center">
              <input
                className="rounded-full border text-black p-4 py-1 overflow-hidden  border-green-500 w-full"
                type={eyeimage ? "password" : "text"}
                placeholder="Enter password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="absolute right-1.5 top-1.5 text-black "
                onClick={() => setEyeimage((prev) => !prev)}
              >
                {eyeimage ? (
                  <img className="w-6" src={eye} alt="sfdsdf" />
                ) : (
                  <img className="w-6" src={hiddeneye} alt="sfdsdf" />
                )}
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 font-bold text-black bg-green-400 hover:bg-green-300 border border-black rounded-full px-8 py-2 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/ueoydrft.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your password</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <div className="overflow-x-auto">
              
            <table className="table-auto min-w-150 w-full rounded-md overflow-hidden my-5 ">
              <thead className="bg-green-800 text-white ">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Passwords</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((items, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center py-2 border border-white ">
                        <div className="flex items-center justify-center  gap-2">
                          <a
                            href={items.site}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {items.site}
                          </a>
                          <div
                            className="cursor-pointer"
                            onClick={() => copyText(items.site)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              className="w-7 h-7 py-1.5"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" text-center py-2 border border-white">
                        <div className="flex items-center justify-center  gap-2">
                          <span>{items.username}</span>
                          <div
                            className="cursor-pointer"
                            onClick={() => copyText(items.username)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              className="w-7 h-7 py-1.5"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" text-center py-2 border border-white ">
                        <div className="flex items-center justify-center  gap-2">
                          <span>{items.password}</span>

                          <div
                            className="cursor-pointer"
                            onClick={() => copyText(items.password)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              className="w-7 h-7 py-1.5"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="justify-center py-2 border border-white text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(items.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(items.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table> </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Managger;
