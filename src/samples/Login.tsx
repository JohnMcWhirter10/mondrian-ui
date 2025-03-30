import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Alert,
  AlertTitle,
  AlertDescription,
} from '../components';

export const LoginSample = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Simulate API login
    if (email === 'test@example.com' && password === 'password') {
      setSuccess(true);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Box>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert theme="red">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert theme="green">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                You have successfully logged in!
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button theme="blue" onClick={handleSubmit}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};
