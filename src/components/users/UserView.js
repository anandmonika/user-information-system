import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";

const User = () =>{

    const [user, setUser] = useState({
        name:"",
        email:"",
        phone:"",
    });

    useEffect(() => {
        loadUser();
    },[]);

    const loadUser = async () =>{
        const result = await axios.get(`${API_URL}/users/${id}`);
        setUser(result.data);
     };

    const {id} = useParams ();
    return(
        <div className="container py-4">
            <div className="row">
                <div className="col-10">
                    <h3 className="display-6">User Id: {id}</h3>
                </div>
                <div className="col-2">
                    <Link className="btn btn-primary" to="/">
                        Back To Home
                    </Link>
                </div>
            </div>
            <hr />
            <ul className="list-group w-50">
                <li className="list-group-item">Name: {user.name}</li>
                <li className="list-group-item">Email: {user.email}</li>
                <li className="list-group-item">Phone: {user.phone}</li>
            </ul>
        </div>
    );
}

export default User;