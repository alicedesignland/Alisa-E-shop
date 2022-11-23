import JwtManager from './jwtManager';
import IUser from '../interfaces/IUser';
import ILoginRequest from '../interfaces/ILoginRequest';
import axios from 'axios';
import { toast } from 'react-toastify';

export interface IUserInfo {
  user: IUser;
  token: string;
}

class AuthManager {

  static get token(): string | null {
    return JwtManager.accessToken;
  }

  static async getUserFromToken(token:string): Promise<IUser> {
    let userInfo: IUser = null;
      try {
        let result = await (await axios.get(`authentication/validate-token`,{headers:{token:JwtManager.accessToken}})).data;
        console.log('res', result);
        userInfo = result;
      } catch (e) {
        throw e;
      }
    return userInfo;
  }

  static async getTokenWithCredentials(payload: ILoginRequest): Promise<IUserInfo> {

    const { data }  = await axios.post('authentication/login', payload);
    console.log('data', data);
    
    if(data?.message){
      if(data.status){
          toast.info(`${data?.message}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
          });
        }else{
          toast.error(data?.message, {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
          });
      }
    }
    
    const responseLogin: IUserInfo = {
      user: data?.user,
      token: data?.token
    };

    if (responseLogin?.token) {
      JwtManager.setAccessToken(responseLogin.token);
    }

    return responseLogin;
  }

  static async loginWithCredentials(credentials: ILoginRequest): Promise<IUserInfo> {
    const response = await AuthManager.getTokenWithCredentials(credentials);
    return response;    
  }

  static async register(user: IUser): Promise<void> {
    const { data }  = await axios.post('authentication/register',user);
    if (data?.token) {
      JwtManager.setAccessToken(data.token);
      window.location.pathname='/';
    }
  }
  static logout() {
    JwtManager.clearToken();
  }
}

export default AuthManager;
