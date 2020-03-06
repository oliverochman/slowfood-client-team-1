import axios from 'axios';

const register = (name, email, password, confirm_password) => {
    try {
        debugger
        const response = axios.post('auth/sign_up', {
            name: name,
            email: email,
            password: password,
            confirm_password: confirm_password
        });
        return { registered: true, message: "Your account was successfully created" };
    } catch (error) {
        return { registered: false, message: 'Invalid entries. Please try again.' };
    }
};

export { register }