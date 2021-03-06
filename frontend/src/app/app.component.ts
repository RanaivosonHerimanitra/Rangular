import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'mtcars-data';

  constructor(private eref: ElementRef, private router: Router) {
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

}
