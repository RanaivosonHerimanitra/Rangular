import { DataMethodsService } from '../data-methods.service';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { fromEvent } from 'rxjs';
import { map, min, filter, take } from 'rxjs/operators';
@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css'],
})
export class DataVisualizationComponent implements OnInit {
  public data: any;
  public displayedColumns = [''];
  
  // [6] => reference data for value binding
  
    
  
    
  
  
    private x: any[] = [];
    private y: any[] = [];
    private content = { x: this.x, y: this.y, type: 'scatter', mode: 'markers', marker: {color: '+'} }
    graph = {
      data: [this.content],
      layout: {width:640 , height:640 , title:'Scatter plot with mode markers' }
    };

  constructor(private ds: DataMethodsService) { }

  ngOnInit(): void {
  }

  func0(event){return(this.ds.getDataService('api/iris').subscribe((data:any)=>this.graph.data[0].x=data.map(x=>x[event.value])))}
func1(event){return(this.ds.getDataService('api/iris').subscribe((data:any)=>this.graph.data[0].y=data.map(x=>x[event.value])))}

}
