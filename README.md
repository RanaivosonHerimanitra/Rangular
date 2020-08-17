# R binding to Angular
This is an experimental approach to bind rstat to Angular. R loves Angular and that's why I build this project.
This project allows R users and developers to get access of the full capabilities of Angular framework.
No javascript knowledge is required though but helpful.

# Requirements:

Nodejs, angular-cli, angular-schematics.

# Installation:

We will see.


## Design and philosophy:

The package allows R user to build **reactive data driven application**, showcases or visualizations in R without touching Javascript. R user describes what they want. 
Example, a button to filter a data, a dropdown to select a subset of the data, etc.

Data are supplied using `Plumber` package. Logic of the application is described in a vector. Let's say `MatButton = c(data, onclick, slice_min,bottom)` will, on click, `slice_min` (remember `dplyr` package) your data based on value of `bottom` variable (a column, more precisely, you can name it whatever you want) .

Hard parts have been carried out by binding `dplyr` syntax with `rxjs` equivalent. All you need to do is:

# Getting started

# Yechnical Roadmap:

* avoid changing working directory
* implement binding with angular material or material design (prioritize components widely used in data driven app)
* implement scaffolding of data offered by plumber API with schematics
* implement rxjs/dplyr syntax binding with working examples