import axios from 'axios';

let JWT_SERVER_DOMAIN =  'http://localhost:9093/attgroup';

class LoginService{

    authenticate(data){
        return axios.post(JWT_SERVER_DOMAIN+'/api/auth/authenticate',data);
    }

    login() {
        return axios.get(JWT_SERVER_DOMAIN+'/login');
    }

    welcome(token) {
        return axios.get(JWT_SERVER_DOMAIN+'/api/auth/welcome', {
            headers: {
                'Authorization': `Bearer `+token 
              }
          });
    }

    signOut() {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
    }
}
export default new LoginService();