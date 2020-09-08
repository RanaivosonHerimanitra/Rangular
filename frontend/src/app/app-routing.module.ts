import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableManipulationComponent} from './table-manipulation-component/table-manipulation.component';
import {SummaryComponent} from './summary-component/summary.component';
import {DataVisualizationComponent} from './data-visualization-component/data-visualization.component';

const routes: Routes = [{path:'default', component: TableManipulationComponent},{path:'cardtable', component: SummaryComponent},{path:'visualization', component: DataVisualizationComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
