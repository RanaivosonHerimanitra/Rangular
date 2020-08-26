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

# Getting started (API usage):

```r
library('RAngular')

# 02 examples function used as a method of a component
giveMeMin = function(data, columnName, bottom) {
  return(c(data, slice_min(columnName, bottom)))
}

switchSpecies = function() {
  return ("test")
}

component1 = Component$new(url="/",
                           name="data-manipulation",
                           view="table",
                           methods= list(MatButton = list(data = "api/iris", event = "click", 
                                                          callback = giveMeMin),
                                         MatSelect = list(data = "echo", event = "selectionChange",
                                                          callback = switchSpecies))
                           )
component2 = Component$new(url="/barchart",
                           name="data-visualization",
                           view="barchart",
                           methods= list(MatButton = list(data = "api/normal/random", event = "click", 
                                                          callback = giveMeMin),
                                         MatSelect = list(data = "api/binomial/random", event = "selectionChange",
                                                          callback = switchSpecies))

                           )
app = RAngular$new()
app$buildFrontEnd(initialize = FALSE, name="frontend", components= list(component1, component2))
app$serve()
```

# Technical Roadmap:

* avoid changing working directory in R code ==> partially done

* implement component/url binding as can be seen in Angular. ==> done

* add angular navigation (`ng add @angular/material:material-nav --name=main-nav`) as default layout for navigation. ==> done

* implement binding with angular material or material design (prioritize components widely used in data driven app). ==> a POC has been written

* add angular material dashboard as a default template for displaying data

* Start scaffolding service for data reception, module (for loading angular material components).

* implement scaffolding of data supplied by the plumber API with schematics.

* implement rxjs/dplyr syntax binding with working examples (Not sure It's the best way though).

* Load created schematics template in an isolated folder.