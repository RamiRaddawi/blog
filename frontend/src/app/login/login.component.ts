import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

author={
  email:'',
  password:''
}
token:any;

  constructor(private authService:AuthService,private router:Router){

  }


  ngOnInit(){

  }
  login(){
    this.authService.login(this.author).subscribe((res)=>{
      console.log(res);
      this.token = res;
      console.log(this.token);
      
      localStorage.setItem('token',this.token.mytoken);
      console.log(localStorage.getItem('token'));
      this.router.navigate(['/home']);
      //this.router.navigate(["/login"]);
    },(err)=>{
      console.log(err);
      //this.router.navigate(["/login"]);
    });
  }
}
