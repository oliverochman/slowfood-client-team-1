import React, { Component } from "react";
import DisplayProductData from "./components/DisplayProductData";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/authenticate";

class App extends Component {
  state = {
    renderLoginForm: false,
    authenticated: false,
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

  render() {
    const { renderLoginForm, authenticated, message } = this.state;
    let renderLogin;
    switch (true) {
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
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
        renderLogin = (
          <p id="message">Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}</p>
        );
        break;
    }

    return (
      <>
        <h1>Slowfood</h1>
        {renderLogin}
        <DisplayProductData />
      </>
    );
  }
}
export default App;
