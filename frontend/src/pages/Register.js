// src/pages/RegisterPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import { getAccessToken } from '../utils/auth'; // Import the utility function

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      gender: '',
      errorMessage: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, name, gender } = this.state;

    try {
      const { access_token } = await getAccessToken(); // Get access token dynamically

      // Your API call to register the user with the access token
      const response = await fetch(`https://graph.microsoft.com/v1.0/sites/${process.env.REACT_APP_SITE_ID}/lists/${process.env.listId}/items`, {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          fields: {
            email,
            password,
            name,
            gender,
          },
        }),
      });

      if (response.ok) {
        // Handle successful registration
        alert('Registration successful!');
      } else {
        this.setState({ errorMessage: 'Registration failed' });
      }
    } catch (error) {
      this.setState({ errorMessage: `Registration error: ${error.message}` });
    }
  };

  render() {
    return (
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={this.state.gender}
              onChange={this.handleChange}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button type="submit">Register</button>
          {this.state.errorMessage && <p className="error">{this.state.errorMessage}</p>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    );
  }
}

export default RegisterPage;
