import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Login(){
    //Fetch the user states from UserContext
    const { user, setUser } = useContext(UserContext);

    //Two states for each form.
    const [loginFormState, setLoginFormState] = useState({
        username: "",
        password: "",
    })
    const [newAccountFormState, setNewAccountFormState] = useState({
        first_name: "",
        last_name: "",
        birthday: "",
        new_username: "",
        new_password: "",
        verify_password: ""
    })

    //Abstract the state values
    const {username, password} = loginFormState;
    const {first_name, last_name, birthday, new_username, new_password, verify_password} = newAccountFormState;

    //Use Navigate
    const navigate = useNavigate();
    //A function that handles logging in
    //TO DO: Make a fetch request to start a new user session.
    function handleLoginSubmit(e){
        e.preventDefault();

        const configObj ={
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accepts" : "application/json"
            },
            body: JSON.stringify(loginFormState)
        }

        fetch("/login", configObj)
        .then(res => {
            if (res.ok){
                res.json().then((data)=> {
                    setUser(data);
                    navigate('/home');
                })
            }else{
                navigate('/')
            }
        })
    }
    //A function that handles creating a new account
    //TO DO: Make  a fetch request to post a new user and start a new session (aka log them in.)
    function handleNewAccountSubmit(e){
        e.preventDefault();
    }

    //Two functions to handle changes in the form
    function handleLoginChange(e){
        setLoginFormState({...loginFormState, [e.target.name]: e.target.value})
    }
    function handleNewAccountChange(e){
        console.log(newAccountFormState);
        setNewAccountFormState({...newAccountFormState, [e.target.name]: e.target.value})
    }
    return(
        <article id="login-card">
            <header>
                <h2>Welcome to</h2>
                <h1>Book Club App!</h1>
            </header>
            <section>
                <header>
                    <h3>Login.</h3>
                </header>
                <Container>
                <Form onSubmit={handleLoginSubmit} style={{textAlign: "left"}}>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control required type="text" placeholder="Username" value={username} name="username" onChange={handleLoginChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control required type="password" placeholder="Password" value={password} name="password" onChange={handleLoginChange}></Form.Control>
                    </Form.Group>
                    <Button type="submit">Login</Button>
                </Form>
                </Container>
            </section>
            <hr/>
            <h4>OR</h4>
            <hr/>
            <section>
                <header>
                    <h3>Create a new account.</h3>
                </header>
                <Container>
                <Form style={{textAlign: "left"}} onSubmit={handleNewAccountSubmit}>
                        <Row>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control required type="text" placeholder="First name" name="first_name" value={first_name} onChange={handleNewAccountChange}></Form.Control>
                                </Form.Group>
                            </Col>
                
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control required type="text" placeholder="Last name" name="last_name" value={last_name} onChange={handleNewAccountChange}></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    <Form.Group>
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control required type="date" placeholder="Birthday" name="birthday" value={birthday} onChange={handleNewAccountChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control required type="text" placeholder="Username" name="new_username" value={new_username} onChange={handleNewAccountChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control required type="password" placeholder="Password" name="new_password" value={new_password} onChange={handleNewAccountChange}></Form.Control>
                        <Form.Text className="text-muted">Password must be at least X characters long and contain XYZ.</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control required type="password" placeholder="Verify password" name="verify_password" value={verify_password} onChange={handleNewAccountChange}></Form.Control>
                    </Form.Group>
                    <Button type="submit">Create account</Button>
                </Form>
                </Container>
            </section>
        </article>
    )
}

export default Login;