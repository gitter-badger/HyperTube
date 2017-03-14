import React, { Component } from 'react'

import { Col, Row , Clearfix, ControlLabel, FormControl, FormGroup, Form, Button } from 'react-bootstrap';

import './Login.css'

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            errorLogin: '',
            errorRegister: ''
        };
    }

    handleSubmit = () => {
        localStorage.setItem('tata', 'toto');
        // axio.post blabla
        // .then(
        //     localStorage.setItem('token', response.data);
        // )

    };

    render() {
        const { errorLogin } = this.state;
        const { errorRegister } = this.state;

        return (
            <div className="Login">
                <Col xsOffset={4} xs={12} lg={4}>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Email" />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={10}>
                                <FormControl type="password" placeholder="Password" />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button
                                    type="submit"
                                    onClick={this.handleSubmit}
                                >
                                    Sign in
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </div>
        )};
}

export default Login;