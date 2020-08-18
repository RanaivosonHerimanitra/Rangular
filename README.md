# R binding to Angular
This is an experimental approach to bind rstat to Angular. R loves Angular and that's why I build this project.
This project allows R users and developers to get access of the full capabilities of Angular framework.
No javascript knowledge is required though but helpful.

# Requirements:

Nodejs, angular-cli, angular-schematics.

# Installation:

We will see.


## Design and philosophy:

The package allows R user to build **reactive data driven application** by leveraging the power of Angular ecosystem and packages. R user describes what they want in R language. Example, a button to filter a data on click, a dropdown to select a subset of the data, etc.

Data are supplied from a R server using `Plumber` package and retrieved in a reactive manner using `rxjs`. 
Logic of the application is described in a vector. Let's say `MatButton = c(data, onclick, slice_min,bottom)` will, on click, `slice_min` (remember `dplyr` package) the data based on value of `bottom` variable (a column, more precisely, you can name it whatever you want).

Hard parts have been carried out by binding `dplyr` syntax with `rxjs` equivalent. All you need to do is:

# Getting started (API usage):

# Technical Roadmap:

* avoid changing working directory in R code ==> ok

* add angular material dashboard as a default template for displaying data

* add angular navigation (`ng add @angular/material:material-nav --name=main-nav`) as default layout for navigation

* implement binding with angular material or material design (prioritize components widely used in data driven app). ==> a POC has been written

* implement component/url binding as can be seen in Angular.

* implement scaffolding of data supplied by the plumber API with schematics.

* implement rxjs/dplyr syntax binding with working examples.