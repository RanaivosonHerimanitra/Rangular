# R binding to Angular
This is an **early experimental** approach to bind rstats to Angular. R loves Angular and that's why I build this project.
This project will allow R users and developers to get access of the full capabilities of Angular framework.
No javascript knowledge is required though but helpful.

# Requirements:

[Nodejs](https://nodejs.org/en/download/), [angular-cli](https://angular.io/cli), [angular-schematics](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2).

# Installation:

```r
library('devtools')
devtools::install_github('RanaivosonHerimanitra/RAngular')
```


## Design and philosophy:

The package allows R user to build **reactive data driven application** by leveraging the power of Angular ecosystem and packages. R user describes what they want in R language. Example, a button to filter a data on click, a dropdown to select a subset of the data, etc. Data are supplied from a R server using `Plumber` package and retrieved in a reactive manner using `rxjs`.

Binding is made possible and easy thanks to the angular schematics ecosystem.  We can generate a `typescript/html` templates using metadata supplied from the R functions we write.

### Why another R framework for building web application ?

Instead of reinventing the wheel, it will take the best in class framework to develop enterprise grade application using R. 

# Getting started (API usage):

```r
library('RAngular')

# 02 examples function used as a method of a component
giveMeMin = function() {
  return(list("api/iris","min","data","Species.Length"))
}

switchSpecies = function() {
  return (list("normal/random"))
}

component1 = Component$new(url="/",
                           name="data-manipulation",
                           view="table",
                           methods= list(MatButton = list(data = "api/iris", 
                                                          event = "click", 
                                                          callback = giveMeMin),
                                         MatSelect = list(data = "echo", 
                                                          event = "selectionChange",
                                                          callback = switchSpecies)
                                                          )
                           )
component2 = Component$new(url="/barchart",
                           name="data-visualization",
                           view="barchart",
                           methods= list(MatButton = list(data = "api/normal/random", 
                                                          event = "click", 
                                                          callback = giveMeMin),
                                         MatSelect = list(data = "api/binomial/random", 
                                                          event = "selectionChange",
                                                          callback = switchSpecies)
                                                          )

                           )
app = RAngular$new()
app$buildFrontEnd(initialize = FALSE, name="frontend", components= list(component1, component2))
app$serve()
```

# Todos:

* avoid changing working directory in R code ==> partially done

* implement binding with angular material or material design (prioritize components widely used in data driven app). ==> a POC has been written

* add angular material dashboard as a default template for displaying data

* implement scaffolding of data supplied by the plumber API with schematics.

* Load created schematics template in an isolated folder.