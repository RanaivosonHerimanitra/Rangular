import { DataMethodsService } from '../../../../../service-template/files/src/app/data-methods.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dn-<%=dasherize(name)%>',
  templateUrl: './<%=dasherize(name)%>.component.html',
  styleUrls: ['./<%=dasherize(name)%>.component.css'],
})
export class <%= classify(name) %>Component implements OnInit {

  constructor(private ds:DataMethodsService) { }

  ngOnInit(): void {
  }

  <%=writeMethods(methods)%>

}
