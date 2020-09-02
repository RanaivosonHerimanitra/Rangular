import { DataMethodsService } from '../data-methods.service';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { min, filter } from 'rxjs/operators';
@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css'],
})
export class DataVisualizationComponent implements OnInit {
  public data: any;

  public displayedColumns = ['Sepal.Length','Petal.Length','Species'];
  constructor(private ds: DataMethodsService) { }

  ngOnInit(): void {
  }

  func0(){return(this.ds.getDataService('normal/random').pipe(min<any>((a:any,b:any)=>a['Sepal.Length']<b['Sepal.Length']?-1:1)).subscribe((data:any)=>this.data=data))}
func1(specie){return(this.ds.getDataService('api/iris').pipe(filter((data:any)=>data['Species']===specie)).subscribe((data:any)=>this.data=data))}

}
