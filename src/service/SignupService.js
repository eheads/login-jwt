import axios from 'axios';

let JWT_SERVER_DOMAIN =  'http://localhost:9093/attgroup';

class SignupService{
    register(data){
        console.log('Calling /register api...');
        return axios.post(JWT_SERVER_DOMAIN+'/api/auth/register',data);
    }

    signup(){
        return axios.get(JWT_SERVER_DOMAIN+'/signup');
    }
}
export default new SignupService();