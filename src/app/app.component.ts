import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { DemoService } from './demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: string[] = ['A', 'B', 'C', 'D'];
  
  data:Observable<any[]>[] = [];
  
  constructor(private service: DemoService){ }

  ngOnInit(): void {
    this.data.push(this.service.getTodos());
    this.data.push(this.service.getPosts());
    this.data.push(this.service.getAlbums());
  
    forkJoin(this.data).subscribe(item => {
      console.log('Todos');
      console.log(JSON.stringify(item[0]));
      console.log('Posts');
      console.log(JSON.stringify(item[1]));
      console.log('Albums');
      console.log(JSON.stringify(item[2]));
    })
  
  }
}
