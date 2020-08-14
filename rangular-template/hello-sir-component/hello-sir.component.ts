import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dn-hello-sir',
  templateUrl: './hello-sir.component.html',
  styleUrls: ['./hello-sir.component.css'],
})
export class HelloSirComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  methodA(){
          return 'ok';
        }

methodB(){
          return 'ok';
        }
}
