import React, { Component } from "react";
import DisplayProductData from "./components/DisplayProductData";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/authenticate";
import { register } from "./modules/registration";
import RegistrationForm from "./components/RegistrationForm";

class App extends Component {
  state = {
    renderLoginForm: false,
    authenticated: false,
    renderRegistrationForm: false,
    registered: false
  };

  onLogin = async e => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: response.message, renderLoginForm: false });
    }
  };

  onRegister = async e => {
    e.preventDefault();
    const response = await register(
      e.target.name.value,
      e.target.email.value,
      e.target.password.value,
      e.target.confirm_password.value
    );
    
    if (response.registered) {
      this.setState({ registered: true });
    } else {
      this.setState({ message: response.message, renderRegistrationForm: false });
    }
  };

  render() {
    const { renderLoginForm, authenticated, message, renderRegistrationForm, registered } = this.state;
    let renderResponse;
    let renderLogin;
    let renderRegister
    
    switch (true) {
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case renderRegistrationForm && !authenticated:
        renderRegister = <RegistrationForm submitFormHandler={this.onRegister} />;
        break;
      case !renderRegistrationForm && !authenticated: 
        renderRegister = (
          <>
            <button
              id="register"
              onClick={() => this.setState({ renderRegistrationForm: true })}
            >
              Sign up
            </button>
            <p id="registered_message">{message}</p>
          </>
        );
        break;
      case !renderLoginForm && !authenticated:
        renderLogin = (
          <>
            <button
              id="login"
              onClick={() => this.setState({ renderLoginForm: true })}
            >
              Login
            </button>
            <p id="message">{message}</p>
          </>
        );
        break;
      case authenticated:
        renderResponse = (
          <p id="message">Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}</p>
        );
        break;
      case registered:
        renderResponse = (
          <p id="message">Your account was successfully created</p>
        );
          break;        
    }

    return (
      <>
        <h1>Slowfood</h1>
        {renderLogin}
        {renderRegister}
        <DisplayProductData />
      </>
    );
  }
}
export default App;
