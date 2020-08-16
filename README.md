# R binding to Angular
This is an experimental approach to bind rstat to Angular. R loves Angular and that's why I build this project.
This project allows R users and developers to get access of he full and infinite potential of Angular javascript framework.
No javascript knowledge is required though but helpful.

## Design and philosophy:
The package allows R user to build **reactive data driven application**, showcases or visualizations in R without touching Javascript.
R user describes what they want. Example, a button to filter a data, a dropdown to select a subsset of the data.
Data are supplied using `Plumber` package. Logic of the application is described in a vector `c(data, slice_min,bottom)` where data is the one supplied earlier, `slice_min` is an utility from `dplyr` package and ``bottom` is a variable (a column, more precisely) where we will filter the data.
Hard parts have been carried out by binding `dplyr` syntax with `rxjs` equivalent.

# Requirements:

Nodejs, angular-cli, angular-schematics.

# Getting started