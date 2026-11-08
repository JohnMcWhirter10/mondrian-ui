import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Textarea,
  Label,
  Checkbox,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Alert,
  AlertTitle,
  AlertDescription,
} from '../components';

export const ContactFormSample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    subscribe: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, subscribe: checked }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setError('Please fill in all required fields');
      return;
    }

    // Success simulation
    setSubmitted(true);
    setError('');
  };

  return (
    <Box>
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            Fill in the form below to get in touch with our team
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert theme="red">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {submitted && (
            <Alert theme="green">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your message has been sent successfully!
              </AlertDescription>
            </Alert>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
              />
            </div>

            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Select
                value={formData.subject}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
              />
            </div>
            <div>
              <Checkbox
                id="subscribe"
                checked={formData.subscribe}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="subscribe">Subscribe to our newsletter</Label>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button theme="blue" onClick={handleSubmit}>
            Send Message
          </Button>
          <Button
            theme="neutral"
            type="button"
            onClick={() => {
              setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                subscribe: false,
              });
              setSubmitted(false);
              setError('');
            }}
          >
            Reset
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};
