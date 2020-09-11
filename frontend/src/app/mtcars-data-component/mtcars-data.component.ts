import { DataMethodsService } from '../data-methods.service';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { fromEvent } from 'rxjs';
import { map, min, filter, take } from 'rxjs/operators';
@Component({
  selector: 'app-mtcars-data',
  templateUrl: './mtcars-data.component.html',
  styleUrls: ['./mtcars-data.component.css'],
})
export class MtcarsDataComponent implements OnInit {
  public data: any;
  public displayedColumns = ['mpg','cyl','disp','hp','drat','wt','qsec','vs','am','gear','carb'];
  
  // [6] => reference data for value binding
  
    
       columnToBeRemoved:string;
    
  
    
  
    
  
    
  
  

  constructor(private ds: DataMethodsService) { }

  ngOnInit(): void {
  }

  func0(){return(undefined)}
func1(){return(this.ds.getDataService('api/mtcars').subscribe((data:any)=>{this.data=data.map(obj=>Object.entries(obj).filter(keyValue=>keyValue[0]!==this.columnToBeRemoved));this.data=this.data.map(obj=>Object.fromEntries(obj));}))}
func2(){return(this.ds.getDataService('api/mtcars').subscribe((data:any)=>{this.data=data.map(obj=>Object.entries(obj).filter(keyValue=>keyValue[0]!=='mpg'));this.data=this.data.map(obj=>Object.fromEntries(obj));}))}
func3(){return(this.ds.getDataService('api/mtcars').subscribe((data:any)=>{this.data=data.map(obj=>Object.entries(obj).filter(keyValue=>keyValue[0]!=='hp'));this.data=this.data.map(obj=>Object.fromEntries(obj));}))}

}
