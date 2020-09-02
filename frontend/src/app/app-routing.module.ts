import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataManipulationComponent} from './data-manipulation-component/data-manipulation.component';
import {DataVisualizationComponent} from './data-visualization-component/data-visualization.component';

const routes: Routes = [{path:'default', component: DataManipulationComponent},{path:'cardtable', component: DataVisualizationComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
