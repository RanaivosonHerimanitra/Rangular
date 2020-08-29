import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<%=handleComponentImportation(components)%>

const routes: Routes = [<%=generateRoutes(urls, components)%>];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
