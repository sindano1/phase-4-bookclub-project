import React from "react";
import "./Login.css";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Login(){
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
                <Form style={{textAlign: "left"}}>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="username"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="password"></Form.Control>
                    </Form.Group>
                    <Button type="submit">Login</Button>
                </Form>
            </section>
            <hr/>
            <h4>OR</h4>
            <hr/>
            <section>
                <header>
                    <h3>Create a new account.</h3>
                </header>
                <Form style={{textAlign: "left"}}>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="username"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="password"></Form.Control>
                        <Form.Text className="text-muted">Password must be at least X characters long and contain XYZ.</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control type="password" placeholder="password"></Form.Control>
                    </Form.Group>
                    <Button type="submit">Create account</Button>
                </Form>
            </section>
        </article>
    )
}

export default Login;