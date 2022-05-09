import React from "react";
import "./Footer.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Footer(){
    return(
        <footer>
            <Container>
                <Row>
                    <Col>
                        <h4>Navigate</h4>
                        <ul>
                            <li>Home</li>
                            <li>Library</li>
                            <li>Books</li>
                            <li>About</li>
                        </ul>
                    </Col>
                    <Col>
                        <h4>GitHub</h4>
                        <ul>
                            <li>Sarah Indano</li>
                            <li>Yannik Büchi</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
        
    )
}

export default Footer;