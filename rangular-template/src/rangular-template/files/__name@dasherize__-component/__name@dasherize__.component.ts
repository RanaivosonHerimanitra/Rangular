import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dn-<%=dasherize(name)%>',
  templateUrl: './<%=dasherize(name)%>.component.html',
  styleUrls: ['./<%=dasherize(name)%>.component.css'],
})
export class <%= classify(name) %>Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  <%=writeMethods(methods)%>
}
