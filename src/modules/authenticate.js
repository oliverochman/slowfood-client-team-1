import axios from 'axios';

const authenticate = async (email, password) => {
    try {
        const response = await axios.post('auth/sign_in', {
            email: email,
            password: password
        });
        await storeAuthCredentials(response);
        return { authenticated: true };
    } catch (error) {
        return { authenticated: false, message: 'Invalid login credentials. Please try again.' };
    }
};

const register = async (name, email, password, confirm_password) => {
    try {
      const response = await axios.post("auth/sign_up", {
        name: name,
        email: email,
        password: password,
        confirm_password: confirm_password
      });
      
      await storeAuthCredentials(response);
      debugger
      return {
        registered: response.status,
      };
  
    } catch (error) {
        debugger
      return { registered: false, message: "Invalid entries. Please try again." };
    }
  };

const storeAuthCredentials = ({ headers }) => {
    const credentials = {
        uid: headers['uid'],
        client: headers['client'],
        access_token: headers['access-token'],
        expiry: headers['expiry'],
        token_type: 'Bearer'
    };
    sessionStorage.setItem('credentials', JSON.stringify(credentials));
};


export { authenticate, register }