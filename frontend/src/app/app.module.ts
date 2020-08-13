import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsComponent } from './components/components.component';
import { DataManipulationComponent } from './components/data-manipulation/data-manipulation.component';
import { DataVisualizationComponent } from './components/data-visualization/data-visualization.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    DataManipulationComponent,
    DataVisualizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
