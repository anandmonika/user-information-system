import React, {useState,useEffect, useRef} from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";


const EditUser = () =>{
    let history = useHistory();
    const { id } = useParams();

    const [user, setUser] = useState({
        name:"",
        email:"",
        phone:"",
    });

    const formRef = useRef(null);

    const {name, email, phone} = user;
    const onInputChange = e =>{
       setUser({...user,[e.target.name]:e.target.value});
    };

    useEffect(() => {
        loadUser();
    },[]);

    const onSubmit = async e =>{
        e.preventDefault();
        const isValidated = formRef.current.checkValidity();
        formRef.current.classList.add('was-validated');
        if(!isValidated) e.stopPropagation();
        else {
            await axios.put(`http://localhost:3001/users/${id}`,user)
            history.push("/");
        }
     };

     const loadUser = async () =>{
        const result = await axios.get(`http://localhost:3001/users/${id}`);
        setUser(result.data);
     };
    return(
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Update User: {id}</h2>
                <form ref={formRef} className="row g-4" onSubmit={e => onSubmit(e)} noValidate>
                    <div className="form-group col-12">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Name"
                            name="name"
                            value={name}
                            required
                            onChange={e => onInputChange(e)}
                            />
                            <div className="invalid-feedback">
                                Please enter name
                            </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Enter Your E-mail Address"
                            name="email"
                            value={email}
                            required
                            onChange={e => onInputChange(e)}
                            />
                        <div className="invalid-feedback">
                            Please enter a valid email id
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="tel"
                            pattern="^[+]91(9|8|7)\d{9}$"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Phone Number"
                            name="phone"
                            value={phone}
                            required
                            onChange={e => onInputChange(e)}
                            />
                        <div className="invalid-feedback">
                            Please enter a valid indian phone number eg: +919123456789
                        </div>
                    </div>
                    <button className="btn btn-primary btn-block">Update User</button>
                </form>
            </div>
        </div>
    );
}

export default EditUser;