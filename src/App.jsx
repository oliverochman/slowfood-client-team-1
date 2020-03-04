import React, { Component } from "react";
import DisplayProductData from "./components/DisplayProductData";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/authenticate";

class App extends Component {
  state = {
    renderLoginForm: false
  };

  handleClick(event) {
    this.setState({ renderLoginForm: true });
	}
	
	onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogin = async e => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ 
				authenticated: true })
    } else {
      this.setState({ message: response.message });
    }
  };

  render() {

    return (
      <>
        <h1>Slowfood</h1>
        <button onClick={event => this.handleClick(event)} id="login">
          Login
        </button>
        {this.state.renderLoginForm && <LoginForm submitFormHandler={this.onLogin}/>}
        <DisplayProductData />
      </>
    );
  }
}
export default App;
