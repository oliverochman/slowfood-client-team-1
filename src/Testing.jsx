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
  };

  onSignIn = async e => {
    let response
    e.preventDefault();

    if (e.target.id === "signup") {
      response = await register(
        e.target.name.value,
        e.target.email.value,
        e.target.password.value,
        e.target.confirm_password.value
      );
    } else {
      response = await authenticate(
        e.target.email.value,
        e.target.password.value
      );
    }

    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      debugger;
      this.setState({ message: response.message[0], renderRegistrationForm: false, renderLoginForm: false });
    }
  };


  render() {
    const {
      renderLoginForm,
      authenticated,
      message,
      renderRegistrationForm
    } = this.state;
    let renderLogin;
    let renderRegister;
    let renderResponse;
    let renderSignIn;

    switch (true) {
      case renderRegistrationForm && !authenticated:
        renderRegister = <RegistrationForm submitFormHandler={this.onSignIn} />
        break;

      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onSignIn} />;
        break;

      case !authenticated:
        renderSignIn = (
          <>
            <button
              id="render-signup"
              onClick={() => this.setState({ renderRegistrationForm: true })}
            >
              Sign up
            </button>

            <button
              id="render-login"
              onClick={() => this.setState({ renderLoginForm: true })}
            ></button>
            <p id="message">{message}</p>
          </>
        );
        break; 
       
      case authenticated:
        renderResponse = (
          <p id="message">
            Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}
          </p>
        );
        break;
    }

    return (
      <>
        <h1>Slowfood</h1>
        {renderLogin}
        {renderRegister}
        {renderResponse}
        {renderSignIn}
        <DisplayProductData />
      </>
    );
  }
}
export default App;
