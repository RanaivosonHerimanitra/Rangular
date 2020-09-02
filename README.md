# R binding to Angular
This is an **Proof Of Concept** to bind rstats with Angular. R loves Angular and that's why I build this project.
This project will allow R users and developers to get access of the full capabilities of Angular framework. Minimal javascript knowledge is required.

# Requirements:

[Nodejs](https://nodejs.org/en/download/), [angular-cli](https://angular.io/cli), [angular-schematics](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2).

# Installation:

```r
library('devtools')
devtools::install_github('RanaivosonHerimanitra/Rangular')
```


## Design and philosophy:

The package allows R user to build **reactive data driven application** by using the power of Angular ecosystem and packages. R user describe what they want in R language. Example, a button to filter a data on click, a dropdown to select a subset of the data, etc. Data are supplied from a R server using `Plumber` package and retrieved in a reactive manner using `rxjs`.

Binding is made possible thanks to the angular schematics.  We can generate a `typescript/html` templates using metadata supplied from the R functions we write.

### Why another R framework for building web application ?

Instead of reinventing the wheel, it will take the best in class framework to develop enterprise grade application using R. 
This is not just another framework, it will expose, R, to real world web based software development.

# Getting started (API usage):

Currently, you have to launch a plumber server, in a separate R session with CORS enabled. See [plumber page](https://www.rplumber.io/) for documentation. Once, a plumber server is launched, you can run the following code in a 2nd R session and visit url: http://localhost:4200

```r
library('Rangular')

# 02 examples function used as a method of a component, currently, 
## a vanilla string representing rxjs way of handling stream:

## giveMeMin retrieves data exposed in the normal/random 
## endpoint and operates a min transformation to the data
## min will take the object with minimum value of field 'Sepal.Length'.

giveMeMin = function() {
  return ("this.ds.getDataService('normal/random').pipe(min<any>( (a: any, b: any) => a['Sepal.Length'] < b['Sepal.Length'] ? -1 : 1)).subscribe((data: any) => this.data = data)")
}

## switchSpecies, will switch species based on the user chosen option. 
##For that, we use:
## filter operator from rxjs, to filter out species.
switchSpecies = function(specie) {
  return("this.ds.getDataService('api/iris').pipe(filter((data: any) => data['Species'] === specie)).subscribe((data: any) => this.data = data)")
}
## For a complete list of possible operators, see rxjs: https://rxjs.dev/api/operators

component1 = Component$new(url="/",
                           name="data-manipulation",
                           view="table",
                           methods= list(MatButton = list(data = "api/iris", 
                                                          event = "click",
                                                          callback = giveMeMin, 
                                                          arguments=""),
                                         MatSelect = list(data = "echo", 
                                                          event = "selectionChange",
                                                          callback = switchSpecies, 
                                                          arguments="$event"))
                           )
component2 = Component$new(url="/barchart",
                           name="data-visualization",
                           view="barchart",
                           methods= list(MatButton = list(data = "api/normal/random", 
                                                          event = "click",
                                                          callback = giveMeMin, 
                                                          arguments=""),
                                         MatSelect = list(data = "api/binomial/random", 
                                                          event = "selectionChange",
                                                          callback = switchSpecies, 
                                                          arguments="$event",
                                                          options=c("setosa","versicolor","virginica")))
                           )
app = RAngular$new()
## directory must be the directory of your Rangular package:
app$buildFrontEnd(directory="C:/Users/Admin/Documents/Rangular/", 
                  name="frontend", 
                  components= list(component1, component2))
app$serve("frontend")
```

## Application structure:

A modern javascript application is divided in components. In the above example, we defined 02 components in 02 different urls (http://localhost:4200/default, http://localhost:4200/barchart). Each component holds its own logic. First component has 02 widgets (button and dropdown). They are used to control the data coming from api endpoint defined by `data`.