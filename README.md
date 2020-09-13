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
Unable to install? Just download the project and launch `ExperimentalDesign.R`

## Design and philosophy:

The package will allow R user to build **reactive data driven application** by using the amazing power of Angular ecosystem such as [angular material](https://material.angular.io/components/categories) and [rxjs](https://rxjs-dev.firebaseapp.com/). 
R user describe what they want in R language. Example, a button to filter data on click, a dropdown to select a subset of the data, etc. Data are supplied from a R server using `Plumber` package (but it can be any backend that speaks http protocol) and retrieved in a reactive manner using `rxjs`. Currently, vanilla rxjs string operations is supplied from within R, but one could easily construct wrappers around them.

Binding is made possible thanks to [angular schematics](https://angular.io/guide/schematics).  We can generate a `typescript/html/css/json` templates using metadata supplied from the R functions we write.

### Why another R framework for building web application ?

This is not just another framework, it is an entire javascript ecosystem that will be binded using R syntax. Instead of reinventing the wheel, it will take the best in class framework to develop enterprise grade application using R. 

# Getting started (API usage):

Currently, you have to launch a plumber server, in a separate R session with CORS enabled. See [plumber page](https://www.rplumber.io/) for documentation. Once, a plumber server is launched, you can run the following code in a 2nd R session then visit url: http://localhost:4200

```r
library('Rangular')

# 02 examples function used as a method of a component, currently, 
## a vanilla string representing rxjs way of handling stream:

## orderBySepalLength will order data descending 

## giveMeMin retrieves iris data exposed in the api/iris
## endpoint and operates a min transformation to the data
## min will order iris object dataset with minimum value of field 'Sepal.Length'.
## and takes first value which corresponds to minimum Sepal.Length

orderBySepalLength = function() {
  return ("this.ds.getDataService('api/iris').pipe(min<any>( (a: any, b: any) => a['Sepal.Length'] < b['Sepal.Length'] ? -1 : 1)).subscribe((data: any) => this.data = data)")
}

giveMeMin = function() {
  return ("this.ds.getDataService('api/iris').pipe(min<any>( (a: any, b: any) => a['Sepal.Length'] < b['Sepal.Length'] ? -1 : 1), take(1)).subscribe((data: any) => this.data = data)")
}

## switchSpecies, will switch species based on the user chosen option. 
##For that, we use:
## filter operator from rxjs, to filter out species.
switchSpecies = function(event) {
  return("this.ds.getDataService('api/iris').pipe(map(data => data.filter(x => x['Species'] === event.value))).subscribe((data: any) => this.data = data)")
}

filterSepalLength = function(event) {
  return("this.ds.getDataService('api/iris').pipe(map(data => data.filter(x => x['Sepal.Length'] >= event.value))).subscribe((data: any) => this.data = data)")
}

switchSepal = function(event) {
  return("this.ds.getDataService('api/iris').subscribe((data: any) => this.graph.data[0].x = data.map(x=> x[event.value] ))")
}

switchPetal = function(event) {
  return("this.ds.getDataService('api/iris').subscribe((data: any) => this.graph.data[0].y = data.map(x=> x[event.value] ))")
}

removeMpgColumn = function() {
  return("this.ds.getDataService('api/mtcars').subscribe((data: any)=>{ this.data = data.map(obj => Object.entries(obj).filter(keyValue => keyValue[0] !== 'mpg')) % this.data = this.data.map(obj => Object.fromEntries(obj)  )%})"
  )
}

removeHpColumn = function() {
  return("this.ds.getDataService('api/mtcars').subscribe((data: any)=>{ this.data = data.map(obj => Object.entries(obj).filter(keyValue => keyValue[0] !== 'hp')) % this.data = this.data.map(obj => Object.fromEntries(obj)  )%})"
  )
}

removeColumn = function() {
  return("this.ds.getDataService('api/mtcars').subscribe((data: any)=>{ this.data = data.map(obj => Object.entries(obj).filter(keyValue => keyValue[0] !== this.columnToBeRemoved)) % this.data = this.data.map(obj => Object.fromEntries(obj)  )%})"
  )
}

## For a complete list of possible operators, see rxjs: https://rxjs.dev/api/operators

# example usage Build components and append then to the application:
irisTableComponent = Component$new(url="/",
                           name="table-manipulation",
                           view=list(view="table",columns=c("Sepal.Length","Petal.Length","Species")),
                           methods= list(MatButton = list(data = "api/iris",
                                                          event = "click",
                                                          label="order by sepal length",
                                                          callback = orderBySepalLength,
                                                          arguments=""),
                                         MatSelect = list(data = "api/iris",
                                                          event = "selectionChange",
                                                          label = "change specy",
                                                          callback = switchSpecies,
                                                          arguments="$event",
                                                          options=c("setosa","versicolor","virginica")),
                                         MatSlider = list(data="api/iris",
                                                          label = "filter by sepal length",
                                                          event = "change",
                                                          callback = filterSepalLength,
                                                          arguments = "$event",
                                                          options = c(3,10,0.5))
                                         ))
data("mtcars")
toggleColumnComponent =  Component$new(url="/mtcars-dataset",
                                       name="mtcars-data",
                                       view=list(view="table", columns=names(mtcars)),
                                       methods = list(
                                         MatSelect = list(data = "api/mtcars",
                                                          event = "",
                                                          reference = "columnToBeRemoved:string",
                                                          label = "Select a column to remove",
                                                          callback ="",
                                                          options = names(mtcars)),
                                         MatButton = list(data = "api/mtcars",
                                                          event = "click",
                                                          label="Remove selected column",
                                                          callback = removeColumn,
                                                          arguments = ""),
                                         Toggle = list(data ="api/mtcars",
                                                       label="Remove mpg column",
                                                       event ="change",
                                                       callback = removeMpgColumn,
                                                       arguments=""),
                                         Toggle = list(data ="api/mpg",
                                                       event ="change",
                                                       label="Remove Hp column",
                                                       callback = removeHpColumn,
                                                       arguments=""))
                                       )

cardComponent = Component$new(url="/cardtable",
                           name="summary",
                           view=list(view="mat-card",
                                     columns = c("Sepal.Length","Petal.Length","Species"),
                                     title="Card table title",
                                     subtitle = "You can add subtitle as well"),
                           methods= list(MatButton = list(data = "api/iris",
                                                          event = "click",
                                                          label = "click me for minimum",
                                                          callback = giveMeMin,
                                                          arguments = ""),
                                         MatSelect = list(data = "api/iris",
                                                          label ="Select a specy",
                                                          event = "selectionChange",
                                                          callback = switchSpecies,
                                                          arguments = "$event",
                                                          options = c("setosa","versicolor","virginica"))
                                         ))
plotlyComponent = Component$new(url="/visualization",
                           name = "data-visualization",
                           view = list(view="plotly", data = list(x = "Sepal.Length",
                                                              y = "Petal.Width",
                                                              type = "scatter",
                                                              mode="markers",
                                                              marker = "+"),
                                                   layout = list(width = 640,
                                                                 height = 640,
                                                                title = 'Scatter plot with mode markers')),
                           methods = list(MatSelect = list(data = "api/iris",
                                                          label = "Select xaxis",
                                                          event = "selectionChange",
                                                          callback = switchSepal,
                                                          arguments = "$event",
                                                          options = c("Sepal.Length","Sepal.Width")
                                                          ),
                                         MatSelect = list(data = "api/iris",
                                                          label = "Select yaxis",
                                                          event = "selectionChange",
                                                          callback = switchPetal,
                                                          arguments = "$event",
                                                          options = c("Petal.Length","Petal.Width")
                                         )
                           ))
app = RAngular$new()
app$buildFrontEnd(directory="{YOUR DIR PACKAGE}",
                  servicePort ="7999",
                  name="example", components= list(irisTableComponent,
                                                    cardComponent,
                                                    plotlyComponent,
                                                    toggleColumnComponent))

app$serve("example")
```

## Overview of a modern application structure:

A modern javascript application is divided into components. A component defines a way to display its content or view and its controller to handle logic applied to the view. Currently, supported views are `mat-table` (alias table), `mat-card` and `plotly` (via [angular-plotly](https://github.com/plotly/angular-plotly.js)). In the above example, we defined components in distinct urls. Each component holds its own logic surrounded by methods which control the data. Components have widgets (we aim to support all angular material components). They are used to display the data coming from api endpoint defined by `data`.
Views are predefined angular components that are used to display the data.

![alt text](EarlyPreview.PNG "preview")

![alt text](EarlyPreview2.PNG "preview")

![alt text](EarlyPreview3.PNG "preview")
