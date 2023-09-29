import { Component,OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit{

  articles:any;
  baseUrl:any="http://127.0.0.1:3000/uploads/";
  constructor(private data:DataService){

  }
  ngOnInit(): void {
    this.data.getAll().subscribe((data)=>{
      this.articles = data;
    },(err)=>{
      console.log(err);
    });
  }

}
