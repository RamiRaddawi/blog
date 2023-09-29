import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(public auth:AuthService,public router:Router){

  }
  ngOnInit(): void {
    console.log("id auth from token: "+this.auth.getAuthorDataFromToken()._id);
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}
