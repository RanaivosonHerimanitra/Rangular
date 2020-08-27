import { DataMethodsService } from '../../../../../service-template/files/src/app/data-methods.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dn-data-manipulation',
  templateUrl: './data-manipulation.component.html',
  styleUrls: ['./data-manipulation.component.css'],
})
export class DataManipulationComponent implements OnInit {

  constructor(private ds:DataMethodsService) { }

  ngOnInit(): void {
  }

  func0(){return(list(api/iris,min,data,Species.Length))}
func1(){return(list(/normal/random))}

}
