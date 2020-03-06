import React, { Component } from "react";
import DisplayProductData from "./components/DisplayProductData";
import LoginForm from "./components/LoginForm";
import { authenticate, register } from "./modules/authenticate";
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

  onRegister = e => {
    e.preventDefault();
    const response = register(
      e.target.name.value,
      e.target.email.value,
      e.target.password.value,
      e.target.confirm_password.value
    );
    if (response.registered) {
      this.setState({
        message: response.message,
        registered: true
      });
    } else {
      this.setState({
        message: response.message,
        renderRegistrationForm: false
      });
    }
  };

  render() {
    const {
      renderLoginForm,
      authenticated,
      message,
      renderRegistrationForm,
      registered
    } = this.state;
    let renderLogin;
    let renderRegister;
    let renderResponse;

    switch (true) {
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case renderRegistrationForm && !authenticated:
        renderRegister = (
          <RegistrationForm submitFormHandler={this.onRegister} />
        );
        break;
      case !renderRegistrationForm && !renderLoginForm && !authenticated:
        renderRegister = (
          <>
            <button
              id="signup"
              onClick={() => this.setState({ renderRegistrationForm: true })}
            >
              Sign up
            </button>
            <p id="message">{message}</p>
          </>
        );
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
      case authenticated || registered:
        renderResponse = (
          <p id="message">
            Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}
          </p>
        );
        break;
      //case registered:
        //renderResponse = (
          //<p id="message">Your account has been successfully created</p>
        //);
        //break;
    }

    return (
      <>
        <h1>Slowfood</h1>
        {renderLogin}
        {renderRegister}
        {renderResponse}
        <DisplayProductData />
      </>
    );
  }
}
export default App;
