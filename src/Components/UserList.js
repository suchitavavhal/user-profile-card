import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  const fetchData = async () => {
    const response = await fetch("https://randomuser.me/api/?results=10");
    const data = await response.json();
    setUsers(data.results);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
  };

  // const handleInputChange = (key, value) => {
  //   if (editedUser) {
  //     setEditedUser({ ...editedUser, [key]: value });
  //   }
  // };

  const handleInputChange = (key, value) => {
    if (editedUser) {
      // Split the input value into first and last names
      if (key === "name") {
        const [firstName, lastName] = value.split(" "); // Split by space
        setEditedUser({
          ...editedUser,
          name: {
            first: firstName || "", // Handle cases where there's no last name
            last: lastName || "",
          },
        });
      } else {
        setEditedUser({ ...editedUser, [key]: value });
      }
    }
    console.log("editedUser",editedUser)
  };

  const handleResetUser = () => {
    setEditedUser(null);
    setSelectedUser(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="text-dark mt-5 mb-5">Users List</h1>
      <div className="row">
        <div className="col-md-6">
          {users.map((user) => (
            <div className="table border border-success mb-2" key={user.login.uuid}> {/* Key fix: Use user.login.uuid */}
              <div
                className="border border-5 d-flex align-items-center p-2 justify-content-evenly"
                onClick={() => handleUserSelection(user)}
                style={{ cursor: "pointer" }}
              >
                <img src={user.picture.medium} alt="user_picture" className="rounded-circle me-2" />
                <div>
                  {user.name.first} {user.name.last}
                  <br />
                  <small>{user.email}</small>
                  <br />
                  <small>{user.location.country}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-6">
          {selectedUser && (
            <div className="card">
              <div className="card-body">
                <img
                  src={editedUser.picture.large}
                  alt={editedUser.name.first}
                  className="card-image mb-3 rounded mx-auto d-block"
                  style={{ maxWidth: "200px" }}
                />
                <div className="mb-2 d-flex ">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={`${editedUser.name.first} ${editedUser.name.last}`} // Correct value
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="form-control ms-5"
                  />
                </div>
                <div className="mb-2 d-flex">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    value={editedUser.cell || ""} // Handle undefined
                    onChange={(e) => handleInputChange("cell", e.target.value)}
                    className="form-control ms-5"
                  />
                </div>
                <div className="mb-2 d-flex">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    id="email"
                    value={editedUser.email || ""} // Handle undefined
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="form-control ms-5"
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button onClick={handleResetUser} className="btn btn-secondary">
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
