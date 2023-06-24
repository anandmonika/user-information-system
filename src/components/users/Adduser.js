import {React, useState, useRef} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";


const Adduser = () =>{
    let history = useHistory();
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

     const onSubmit = async e =>{
        e.preventDefault();
        const isValidated = formRef.current.checkValidity();
        formRef.current.classList.add('was-validated');
        if(!isValidated) e.stopPropagation();
        else {
            await axios.post(`${API_URL}/users`,user)
            history.push("/");
        }
     }
    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add A User</h2>
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
                    <button className="btn btn-primary btn-block">Add User</button>
                </form>
            </div>
        </div>
    );
}

export default Adduser;