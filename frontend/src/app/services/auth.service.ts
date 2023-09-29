import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 url="http://127.0.0.1:3000/author/";
  constructor(private http:HttpClient) {

   }

register(author:any){
  console.log(this.url+'register');
 return this.http.post(this.url+'register',author);
}
login(author:any){
  console.log(this.url+'login');
 return this.http.post(this.url+'login',author);
}
isLoggedIn(){
  let token = localStorage.getItem('token');
  if(token){
    return true;
  }else { 
    return false;
  }
}

getAuthorDataFromToken(){
  let token = localStorage.getItem('token');
  console.log(token);
  
  if(token){
    let data = JSON.parse(window.atob(token.split('.')[1]));
    console.log(data);
    return data;
  }
}
getById(id:any){
 return this.http.get(this.url+'getbyid/'+id);
}
}
