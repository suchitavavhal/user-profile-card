import React, { useEffect, useState, useRef } from "react";



const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  const cardRef = useRef(null);
  const nameRef = useRef(null);

  const fetchData = async () => {
    const response = await fetch("https://randomuser.me/api/?results=10");
    const data = await response.json();
    console.log(data.results);
    setUsers(data.results);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user }); // Initialize editedUser with a copy
    console.log(selectedUser);
    console.log(editedUser);
  };

  const handleInputChange = (key, value) => {
    // console.log(e.target);

    // const { name, value } = e.target;
    // setEditedUser({ ...editedUser, [name]: value });

    if(editedUser){
      setEditedUser({...editedUser, [key]: value})
    }
    console.log("editedUser", editedUser);
    console.log("selected", selectedUser);
  };

  const handleResetUser = () => {
    setEditedUser(null);
    setSelectedUser(null);
  };

  // const handleNameClick = ()=>{
  //   setEditedUser({ ...editedUser, [name]: nameRef.current.value });
  // }

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("selectedUser", selectedUser);
  // }, [selectedUser, editedUser]);

  return (
    <div className="container">
      <h1 className="text-dark mt-5 mb-5">Users List</h1>
      <div className="row">
        <div className="col-md-6">
          {users.map((user) => (
            <>
              <div className="table border border-success " key={user.index}>
                <div
                  className="border border-5 d-flex justify-content-between"
                  onClick={() => handleUserSelection(user)}
                >
                  <div className="">
                    {" "}
                    <img src={user.picture.medium} alt="user_picture" />
                  </div>
                  <div className="">
                    {" "}
                    {user.name.first} {user.name.last}
                  </div>
                  <div className=""> {user.email}</div>
                  <div className=""> {user.location.country} </div>
                  {/* <button className="btn btn-success btn-lg" onClick={e => handleSelect(user)}>Edit</button> */}
                </div>
              </div>

              {/* { navigate('/userProfile/:selctedUser.id')} */}
              {/* <Route path="/userProfile/:user.index" component={UserProfile user={selectedUser}} /> */}

              {/* <UserProfile key={selectedUser.index} user={selectedUser}/> */}
            </>
          ))}
        </div>
        <div className="col-md-6">
          {selectedUser && (
            <div className="card-container">
              <div className="profile-card" ref={cardRef}>
                <img
                  src={editedUser.picture.large}
                  alt={editedUser.name.first}
                  className="card-image"
                />
                <div className="card-content">
                  {/* <input
                    ref={nameRef}
                    type="text"
                    name="name.first"
                    defaultValue={editedUser.name.first || ""}
                    onChange={handleNameClick}
                    // onChange={(e) => handleInputChange('name.first', e.target.value)}
                    className="card-input"
                  /> */}

                  <input
                    type="text"
                    value={editedUser.name.first + " " + editedUser.name.last}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    // onChange={handleInputChange}
                 
                    className="card-input"
                  />
                  {/* <input
                    type="text"
                    name="name.last"
                    value={editedUser.name.last || ""}
                    onChange={handleInputChange}
                    // onChange={(e) => handleInputChange('name.last', e.target.value)}
                    className="card-input"
                  /> */}
                  <input
                    type="text"
                    // name="cell"
                    value={editedUser.cell || "Phone"} // Handle undefined designation
                    onChange={(e) => handleInputChange('cell', e.target.value)}
                    // onChange={handleInputChange}
                    className="card-input"
                  />
                  <input
                    type="text"
                    // name="email"
                    value={editedUser.email || "Email"} // Handle undefined company
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    // onChange={handleInputChange}
                    className="card-input"
                  />

                  {/* <p>Location: {editedUser.location.country}</p> */}
                </div>
              </div>
              <div className="card-buttons">
                {/* <button onClick={handleDownload}>Download</button> */}
                <button onClick={handleResetUser}>Reset</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserList;
