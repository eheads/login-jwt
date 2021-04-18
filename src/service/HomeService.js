class HomeService{
    isAuthenticated() {
        console.log('Validating token...');
        let token = sessionStorage.getItem('token');

        if(!token){
            sessionStorage.clear();
            return false;
        }

        console.log('token: '+token);
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        let decodedJwt = JSON.parse(jsonPayload);

        let jwtExp = new Date(decodedJwt.exp);
        console.log('token.exp: '+jwtExp);
        console.log('today: '+new Date().getTime()/1000);
        if (jwtExp < new Date().getTime()/1000) {
            console.log("token expired!");
            sessionStorage.clear();
            return false;
        }
        return true;
    }
}
export default new HomeService();