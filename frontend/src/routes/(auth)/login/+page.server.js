import axios from 'axios';

export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();

        const email = data.get('email')
        const password = data.get('password')

        const res = await axios.post("http://localhost:3000/auth/login", {
            email: email,
            password: password
        })

        cookies.set('access_token', res.data.token, { path: '/' });
        console.log(res.data.token)

        return {
            status: 200,
            body: {
                message: 'Login Successful'
            }
        }
    }
}