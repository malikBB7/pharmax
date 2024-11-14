import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import './LoginPage.css';
import { getAccessToken } from '../utils/auth';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      isAuthenticated: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
        const { access_token } = await getAccessToken();

        const response = await fetch(`https://graph.microsoft.com/v1.0/sites/${process.env.REACT_APP_SITE_ID}/lists/${process.env.REACT_APP_REGISTER_LOGIN_LIST_ID}/items?$expand=fields($select=email,password)`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            const items = data.value || [];
            const user = items.find(
                (item) => item.fields && item.fields.email === email && item.fields.password === password
            );

            if (user) {
                // Store email in localStorage
                localStorage.setItem('userEmail', email);

                this.setState({ isAuthenticated: true });
                this.props.onLogin(); // Call onLogin to update isAuthenticated in App.js
            } else {
                this.setState({ errorMessage: 'Invalid email or password' });
            }
        } else {
            this.setState({ errorMessage: 'Error fetching data from backend' });
        }
    } catch (error) {
        this.setState({ errorMessage: `Login error: ${error.message}` });
    }
};


  render() {
    if (this.state.isAuthenticated) {
      return <Navigate to="/home" />;
    }

    return (
      <div className="login-container">
        <h2>Login</h2>
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
          <button type="submit">Login</button>
          {this.state.errorMessage && <p className="error">{this.state.errorMessage}</p>}
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    );
  }
}

export default LoginPage;