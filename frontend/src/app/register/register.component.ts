import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

author={
  name:'',
  lastname:'',
  email:'',
  password:'',
  about:''
}
image:any;
constructor(private authService:AuthService,private router:Router){

}

ngOnInit(): void {
  
}
select(event:any){
console.log(event);
this.image = event.target.files[0];
console.log(this.image);
}
register(){
  let fd = new FormData;
 
  fd.append('name',this.author.name);
  fd.append('lastname',this.author.lastname);
  fd.append('email',this.author.email);
  fd.append('password',this.author.password);
  fd.append('about',this.author.about);
  fd.append('image',this.image);
  this.authService.register(fd).subscribe((res)=>{
    console.log(res);
    this.router.navigate(["/login"]);
  },(err)=>{
    console.log(err);
    this.router.navigate(["/login"]);
  });
}
}
