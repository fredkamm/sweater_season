import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        // firstName: formState.firstName,
        // lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <div className="container my-1">
    <Link to="/login">← Go to Login</Link>
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" id="email" onChange={handleChange} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label htmlFor="pwd">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" id="pwd" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Make me a Seller" />
      </Form.Group>
      <Button onSubmit={handleFormSubmit} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
}



export default Signup;
