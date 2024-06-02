import { useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { IUserContext, IUserContextState, UserContext, setLSUserContext } from '../App';

interface ILoginForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default () => {
    const [isLogin, setIsLogin] = useState(true);
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [loginForm, setLoginForm] = useState<ILoginForm>({ username: "", email: "", password: "", confirmPassword: "" });

    const { user, setUser } = useContext<IUserContextState>(UserContext);

    const submitForm = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        if (form.checkValidity()) {
            if (isLogin) {
                const data = { username: loginForm.username, password: loginForm.password };

                // Send login request 
                fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const userContext: IUserContext = {
                            username: data.result.username,
                            email: data.result.email,
                            idUserType: data.result.idUserType,
                            accessToken: data.result.accessToken
                        };

                        console.log(data)
                        console.log(userContext)

                        if (setUser) {
                            setUser(userContext);
                            setLSUserContext(userContext);
                        }

                        // Redirect to home page
                        window.location.href = "/";
                    } else {
                        // Show error message
                        setValidated(false);
                        setErrorMessage(data.message);
                    }
                })
            } else {
                // Send register request
                const data = { username: loginForm.username, email: loginForm.email, password: loginForm.password };

                fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const userContext: IUserContext = {
                            username: data.result.username,
                            email: data.result.email,
                            idUserType: data.result.idUserType,
                            accessToken: data.result.accessToken
                        };

                        if (setUser) {
                            setUser(userContext);
                            setLSUserContext(userContext);
                        }

                        // Redirect to home page
                        window.location.href = "/";
                    } else {
                        // Show error message
                        setValidated(false);
                        setErrorMessage(data.message);
                    }
                })
            }
        }

        setValidated(true);
    }

    const toggleIsLogin = () => {
        setIsLogin(!isLogin);
        setLoginForm({ username: "", email: "", password: "", confirmPassword: "" });
        setValidated(false);
    }

    useEffect(() => {
        if(user) {
            // Redirect to home page
            window.location.href = "/";
        }
    }, [isLogin, loginForm]);

    return (
        <div id="loginPageContainer">
            <div id="loginFormContainer" className="shadow rounded">
                <Form id="loginForm" noValidate onSubmit={submitForm} validated={validated}>
                    <Row>
                        <Col md="12">
                            {isLogin ? <h3>Sign In</h3> : <h3>Register</h3>}
                        </Col>
                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label>Username</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter username"
                                    value={loginForm.username}
                                    onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} md="12" controlId="validationCustom02" style={isLogin ? { display: "none" } : {}}>
                            <Form.Label>Email address</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    value={loginForm.email}
                                    onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                                    {...isLogin ? {} : { required: true }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose an email.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} md="12" controlId="validationCustom03">
                            <Form.Label>Password</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={loginForm.password}
                                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a password.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} md="12" controlId="validationCustom04" style={isLogin ? { display: "none" } : {}}>
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm password"
                                    value={loginForm.confirmPassword}
                                    onChange={e => setLoginForm({ ...loginForm, confirmPassword: e.target.value })}
                                    isInvalid={loginForm.password !== loginForm.confirmPassword}
                                    {...isLogin ? {} : { required: true }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please confirm your password.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} md="12" controlId="validationCustom05">
                            <Form.Label style={{ color: "red" }}>{errorMessage}</Form.Label>
                        </Form.Group>

                        <div className="col-12 row buttonsContainer">
                            <div className="col">
                                <Button id="registerButton" variant="outline-primary" onClick={e => { e.preventDefault(); toggleIsLogin(); }}>
                                    {isLogin ? "Register Instead" : "Login Instead"}
                                </Button>
                            </div>
                            <div className="col">
                                <Button type="submit" id="loginButton">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </Row>
                </Form>
            </div>
        </div>
    )
}
