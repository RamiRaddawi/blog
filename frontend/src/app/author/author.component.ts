import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit{

    id:any;
    author:any;
    baseUrl:any="http://127.0.0.1:3000/uploads/";
    articles:any;
  constructor(private act:ActivatedRoute,private auth:AuthService,private data:DataService){

  }

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id');
    this.auth.getById(this.id).subscribe(res=>{
      this.author = res;
      //console.log(this.author);
      console.log(this.baseUrl+this.author.image);
    });
    this.data.getArticleByIdAuthor(this.id).subscribe((data)=>{
      this.articles = data;
      console.log(this.articles);
    },err=>{
      console.log(err);
    });
  }

}
