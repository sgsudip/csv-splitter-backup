import React, { useEffect } from "react";
import Avatar from "react-avatar";
import { getList } from "../service/envoyService";
import "./envoytable.css";

const EnvoyTable = () => {
  const [user, setUser] = React.useState("");

  useEffect(() => {
    let mounted = true;
    getList().then((response) => {
      if (mounted) {
        setUser(response);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div className="">
      <table className="table table-hover table-bordered" id="myTable">
        <thead>
          <tr className="bg-primary text-center w-100">
            <th>Id</th>
            <th></th>
            <th>Name</th>
            <th>Username</th>
            <th>email</th>
            <th>phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {user.length > 0 ? (
            user.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>
                    <Avatar name={user.name} size={45} round={true} />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.website}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EnvoyTable;
