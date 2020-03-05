import axios from 'axios';

const register = async (name, email, password, confirm_password) => {
    try {
        const response = await axios.post('auth/', {
            name: name,
            email: email,
            password: password,
            confirm_password: confirm_password
        });
        return { registered: true };
    } catch (error) {
        return { registered: false, message: 'Invalid entries. Please try again.' };
    }
};

export { register }