import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const NewUser = () => {

    const { register, handleSubmit, reset } = useForm()

    const submit = (data) => {
        axios.post("https://e-commerce-api.academlo.tech/api/v1/users", data)
            .then(res => {
                navigate(`/`)
                console.log(res)
        }
        )
        .catch(error => {
            if(error.response?.status === 404){
                alert('Datos Incorrectos')
            } else{
                console.log(error.response?.data);
            }
          })
    }

   

    return (
        <form onSubmit={handleSubmit(submit)} className="loginContainer">
            <h1>New User page</h1>
            <h3>La api no permite ingresar nuevos usuarios. Usar crendenciales de prueba en Log in.</h3>
            <div className='formContainer'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" {...register("firstName")} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" {...register("lastName")} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register("email")} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register("password")} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone (10 Digits)</Form.Label>
                    <Form.Control type="number" placeholder="Phone" {...register("phone")} />
                </Form.Group>

                <button className='formBtn' variant="primary" type="submit">
                    Submit
                </button>
            </div>
            <h3>Already have an account?<Link to={"/login"}> CLick Here!</Link></h3>
        </form>
    );
};

export default NewUser;