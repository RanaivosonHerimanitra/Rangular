import { DataMethodsService } from '../data-methods.service';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { fromEvent } from 'rxjs';
import { map, min, filter, take } from 'rxjs/operators';
@Component({
  selector: 'app-<%=dasherize(name)%>',
  templateUrl: './<%=dasherize(name)%>.component.html',
  styleUrls: ['./<%=dasherize(name)%>.component.css'],
})
export class <%= classify(name) %>Component implements OnInit {
  public data: any;
  public displayedColumns = [<%=getTableColumns(columns)%>];
  <% const value = metadata.split(";") %>
  // [6] => reference data for value binding
  <% for ( let i = 0; i < value.length; i++) { %>
    <% if (value[i].split("-")[6]) {%>
       <%=value[i].split("-")[6]%>;
    <% } %>
  <% } %>
  <%=handlePlotlyGraphDataSource(view, viewdata, viewlayout)%>

  constructor(private ds: DataMethodsService) { }

  ngOnInit(): void {
  }

  <%=writeMethods(methods)%>

}
