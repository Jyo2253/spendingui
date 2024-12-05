// src/components/LoginRegister.jsx
import React, { useState } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  FloatingLabel,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const navigate = useNavigate(); 
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [preferredCurrency, setPreferredCurrency] = useState('USD');
  const [notificationPref, setNotificationPref] = useState(false); // Email/SMS notifications

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
          monthlyBudget,
          preferredCurrency,
          notificationPref,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('User registered successfully!');
        setIsLogin(true); // Switch to login
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

// src/components/LoginRegister.jsx

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token); // Store token
      localStorage.setItem('user', JSON.stringify(data.user)); // Store user details
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Login Error:', error);
    alert('Something went wrong. Please try again.');
  }
};


  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: 'linear-gradient(to bottom right, #6a11cb, #2575fc)',
        backgroundSize: 'cover',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="p-4 shadow-lg" style={{ borderRadius: '1.5rem' }}>
              <Card.Title className="text-center mb-4 display-6 fw-bold text-primary">
                {isLogin ? 'Welcome Back!' : 'Create Your Account'}
              </Card.Title>

              <Form
                style={{ maxHeight: '400px', overflowY: 'auto' }}
                onSubmit={isLogin ? handleLogin : handleRegister}
              >
                {isLogin ? (
                  <>
                    <FloatingLabel controlId="loginEmail" label="Email Address" className="mb-3">
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="loginPassword" label="Password" className="mb-4">
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </FloatingLabel>

                    <Button variant="primary" type="submit" className="w-100 fw-bold" style={{ borderRadius: '1rem' }}>
                      Login
                    </Button>
                  </>
                ) : (
                  <>
                    <FloatingLabel controlId="registerFullName" label="Full Name" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="registerEmail" label="Email Address" className="mb-3">
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="registerPassword" label="Password" className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder="Enter a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="confirmPassword" label="Confirm Password" className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="monthlyBudget" label="Monthly Budget Limit (Optional)" className="mb-3">
                      <Form.Control
                        type="number"
                        placeholder="Enter your budget limit"
                        value={monthlyBudget}
                        onChange={(e) => setMonthlyBudget(e.target.value)}
                      />
                    </FloatingLabel>

                    <Form.Group className="mb-3">
                      <Form.Label>Preferred Currency</Form.Label>
                      <Form.Select
                        value={preferredCurrency}
                        onChange={(e) => setPreferredCurrency(e.target.value)}
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="INR">INR</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Check
                        type="checkbox"
                        label="Receive alerts via Email/SMS"
                        checked={notificationPref}
                        onChange={(e) => setNotificationPref(e.target.checked)}
                      />
                    </Form.Group>

                    <Button variant="success" type="submit" className="w-100 fw-bold" style={{ borderRadius: '1rem' }}>
                      Register
                    </Button>
                  </>
                )}
              </Form>

              <div className="text-center mt-3">
                <Button
                  variant="link"
                  className="text-decoration-none fw-bold"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'New user? Register here' : 'Already have an account? Login'}
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginRegister;
