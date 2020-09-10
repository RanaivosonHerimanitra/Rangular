import { DataMethodsService } from '../data-methods.service';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { fromEvent } from 'rxjs';
import { map, min, filter, take } from 'rxjs/operators';
@Component({
  selector: 'app-table-manipulation',
  templateUrl: './table-manipulation.component.html',
  styleUrls: ['./table-manipulation.component.css'],
})
export class TableManipulationComponent implements OnInit {
  public data: any;
  public displayedColumns = ['Sepal.Length','Petal.Length','Species'];
  
  
    
  
    
  
    
  
  

  constructor(private ds: DataMethodsService) { }

  ngOnInit(): void {
  }

  func0(){return(this.ds.getDataService('api/iris').pipe(min<any>((a:any,b:any)=>a['Sepal.Length']<b['Sepal.Length']?-1:1)).subscribe((data:any)=>this.data=data))}
func1(event){return(this.ds.getDataService('api/iris').pipe(map(data=>data.filter(x=>x['Species']===event.value))).subscribe((data:any)=>this.data=data))}
func2(event){return(this.ds.getDataService('api/iris').pipe(map(data=>data.filter(x=>x['Sepal.Length']>=event.value))).subscribe((data:any)=>this.data=data))}

}
