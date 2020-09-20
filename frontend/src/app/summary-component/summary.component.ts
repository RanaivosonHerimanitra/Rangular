import { DataMethodsService } from '../data-methods.service';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { fromEvent } from 'rxjs';
import { map, min, filter, take } from 'rxjs/operators';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  public data: any;
  public displayedColumns = ['Sepal.Length','Petal.Length','Species'];
  
  // [6] => reference data for value binding
  
    
       done;
    
  
    
  
  

  constructor(private ds: DataMethodsService) { }

  ngOnInit(): void {
  }

  func0(){return(this.ds.getDataService('api/iris').pipe(min<any>((a:any,b:any)=>a['Sepal.Length']<b['Sepal.Length']?-1:1),take(1)).subscribe((data:any)=>this.data=data))}
func1(event){return(this.ds.getDataService('api/iris').pipe(map(data=>data.filter(x=>x['Species']===event.value))).subscribe((data:any)=>this.data=data))}

}
