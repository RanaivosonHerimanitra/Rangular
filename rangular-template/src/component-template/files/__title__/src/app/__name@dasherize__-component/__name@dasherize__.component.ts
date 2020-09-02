import { DataMethodsService } from '../data-methods.service';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { min, filter } from 'rxjs/operators';
@Component({
  selector: 'app-<%=dasherize(name)%>',
  templateUrl: './<%=dasherize(name)%>.component.html',
  styleUrls: ['./<%=dasherize(name)%>.component.css'],
})
export class <%= classify(name) %>Component implements OnInit {
  public data: any;
  public displayedColumns = [<%=getTableColumns(columns)%>];

  constructor(private ds: DataMethodsService) { }

  ngOnInit(): void {
  }

  <%=writeMethods(methods)%>

}
