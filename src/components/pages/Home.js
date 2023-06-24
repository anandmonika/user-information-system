import React, { useState, useEffect } from "react";
import * as bootstrap from "bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [userToBeDeleted, setUserToBeDelete] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        var confirmation = new bootstrap.Modal(document.getElementById('deleteConfirmation'), {
            keyboard: false
        })
        setConfirmationModal(confirmation);
        const result = await axios.get("http://localhost:3001/users");
        setUsers(result.data);
        
    };

    const startDeletion =  (id) => {
        setUserToBeDelete(id);
        confirmationModal.show();
    }

    const deleteUser = async id => {
        if(!userToBeDeleted) return;
        await axios.delete(`http://localhost:3001/users/${userToBeDeleted}`);
        loadUser();
        confirmationModal.hide();
    };
    return (
        <div className="container">
            <h3 className="mb-3">Users</h3>

            <table className="table table-dark table-striped">
                <thead>
                    <tr className="bg-dark">
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone number</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {users.map((user,index)=>(
                        <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <Link className="btn btn-primary m-2" to={`/user/${user.id}`}><i className="fa fa-eye" aria-hidden="true"></i></Link>
                                <Link className="btn btn-primary m-2" to={`/user/edit/${user.id}`}>Edit</Link>
                                <button type="button" className="btn btn-danger m-2"  to="/" onClick={() => startDeletion(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="modal fade" id="deleteConfirmation" tabIndex="-1" aria-labelledby="deleteConfirmationLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteConfirmationLabel">Delete User</h5>
                    </div>
                    <div className="modal-body">
                        Are you sure?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={()=>deleteUser()}>Delete</button>
                    </div>
                    </div>
                </div>
                </div>
        </div>
    );
}

export default Home;