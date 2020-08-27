import { DataMethodsService } from '../../../../../service-template/files/src/app/data-methods.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dn-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css'],
})
export class DataVisualizationComponent implements OnInit {

  constructor(private ds:DataMethodsService) { }

  ngOnInit(): void {
  }

  func0(){return(list(api/iris,min,data,Species.Length))}
func1(){return(list(/normal/random))}

}
