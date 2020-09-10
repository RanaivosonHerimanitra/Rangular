import { DataMethodsService } from '../data-methods.service';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { fromEvent } from 'rxjs';
import { map, min, filter, take } from 'rxjs/operators';
@Component({
  selector: 'app-mpg-data',
  templateUrl: './mpg-data.component.html',
  styleUrls: ['./mpg-data.component.css'],
})
export class MpgDataComponent implements OnInit {
  public data: any;
  public displayedColumns = ['manufacturer','model','displ','year','cyl','trans','drv','cty','hwy','fl','class'];
  
  
    
       columnToBeRemoved:string;
    
  
    
  
    
  
    
  
  

  constructor(private ds: DataMethodsService) { }

  ngOnInit(): void {
  }

  func0(){return(undefined)}
func1(){return(this.ds.getDataService('api/mpg').subscribe((data:any)=>{this.data=data.map(item=>{delete(item[this.columnToBeRemoved]);return(item);});this.displayedColumns=Object.keys(this.data[0]);}))}
func2(){return(this.ds.getDataService('api/mpg').subscribe((data:any)=>{this.data=data.map(item=>{delete(item['manufacturer']);return(item);});this.displayedColumns=Object.keys(this.data[0]);}))}
func3(){return(this.ds.getDataService('api/mpg').subscribe((data:any)=>{this.data=data.map(item=>{delete(item['transmission']);return(item);});this.displayedColumns=Object.keys(this.data[0]);}))}

}
