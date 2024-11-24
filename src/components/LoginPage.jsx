import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { useContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
    const { setAuth } = useContext(AuthContext);
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [match, setMatch] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [isSignUp, setIsSignUp] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, match])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ( isSignUp && pwd !== match) {
            setErrMsg('password not match');
            return
        }
        try {
            setIsLoading(true);
            const response = isSignUp ? await axios.post('/register', isAdmin ? JSON.stringify({ name: user, roles: { admin: 2002 }, password: pwd }) : JSON.stringify({ name: user, password: pwd }), {
                headers: { 'Content-type': 'application/json' }
            }) : await axios.post('/auth', JSON.stringify({ name: user, password: pwd }), {
                headers: { 'Content-Type': 'application/json' }
            });
            const roles = response.data.data.roles;
            !isSignUp && setAuth({ user, roles });
            isSignUp && setIsSignUp(prev => !prev);
            setUser('');
            setPwd('');
            setMatch('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err?.response?.status === 400) {
                setErrMsg('Input cannot be empty');
            } else if (err?.response?.status === 404) {
                setErrMsg('User not found');
            } else if (err?.response?.status === 403) {
                setErrMsg('Invalid username or password');
            } else {
                setErrMsg('Login failed');
            }
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <Row>
        <Col></Col>
        <Col>
            <Form className='login-form border border-3 border-warning rounded p-4'>
            <Row className="mb-3">
                <h1 className='text-warning'>{isSignUp ? "Sign Up" : "Sign In"}</h1>
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter name" 
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    autoComplete='off'
                    autoFocus
                />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                />
                </Form.Group>
            </Row>
            {isSignUp && (
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Confirm password" 
                    onChange={(e) => setMatch(e.target.value)}
                    value={match}
                />
                </Form.Group>
            </Row>
            )}

            <p>{isSignUp ? "already have an account" : "dont have any account ?"}</p>
            <Button 
                variant='primary' 
                className='mb-2'
                onClick={() => setIsSignUp(prev => !prev)}
            >
                {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
            <br />
            <Row>
                <p className='text-danger error'>{errMsg}</p>
                {isSignUp && (
                <Form.Check
                    className='mb-3'
                    label="Sign up as Admin"
                    onChange={() => setIsAdmin(prev => !prev)}
                    checked={isAdmin}
                />  
                )}
                {isLoading ? (
                    <Spinner animation='border' variant='warning' />
                ) : (
                    <Button 
                        variant="warning" 
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                        disabled={(user === '' && pwd === '' && match === '')}
                    >
                        Submit
                    </Button>
                )}
            </Row>
            </Form>
        </Col>
        <Col></Col>
    </Row>
  )
}

export default LoginPage