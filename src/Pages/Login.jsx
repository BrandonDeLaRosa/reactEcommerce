import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const {register, handleSubmit, reset} = useForm()
    const navigate= useNavigate()

    const submit= data => {
        axios.post(`https://e-commerce-api.academlo.tech/api/v1/users/login`, data)
         .then(res => {
            navigate(`/`)
            console.log(res)
            // Almacenamiento en localStorage del token ("key", "value").
            localStorage.setItem("token", res.data.data.token)
         }
         )
          .catch(error => {
            if(error.response?.status === 404){
                alert('Credenciales incorrectas')
            } else{
                console.log(error.response?.data);
            }
          })
    }

    return (
        <div className='loginContainer'>
            <h1>Login page</h1><br />
            <h3>Credenciales de prueba ///   Email: brandon@academlo.com /// password: brandon1234</h3>
            <Form onSubmit={handleSubmit(submit)} className="formContainer">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register("email")} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  {...register("password")}/>
                </Form.Group>
                <button className='formBtn'  type="submit">
                    Submit
                </button>
            </Form>
            <h3>Don't you have an account? <Link to={"/singin"}>Click Here</Link></h3>
        </div>
    );
};

export default Login;