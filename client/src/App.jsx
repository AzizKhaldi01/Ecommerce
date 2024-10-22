import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // State to hold any response message or error
  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      setMessage(`Success: ${response.data}`);
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${JSON.stringify(error.response.data.errors)}`);
      } else {
        setMessage('Error: Something went wrong');
      }
    }
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <button type="submit">Register</button>
      </form>

      {/* Display success or error message */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
