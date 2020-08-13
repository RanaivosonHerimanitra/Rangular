#   Build and Reload Package:  'Ctrl + Shift + B'
#   Check Package:             'Ctrl + Shift + E'
#   Test Package:              'Ctrl + Shift + T'
library("R6")
library("plumber")
library("dplyr")
library("tidyverse")
library("magrittr")
library("jsonlite")
mainDirectory = getwd()
RAngular = R6Class("RAngular", list(directory="", components =list(),
                               buildFrontEnd = function(scaffold = FALSE, name="frontend", components) {
                                 if (scaffold == TRUE) {
                                   system(paste("ng new",name,"--routing=true","--force=true"), TRUE,invisible = FALSE)
                                   setwd(name)
                                   system(paste("ng add @ng-bootstrap/ng-bootstrap"))
                                   system(paste("ng add @angular/material"))
                                   system(paste("npm i plotly.js-dist"), TRUE, invisible= FALSE)
                                   system(paste("npm i d3"), TRUE, invisible= FALSE)
                                   system(paste("npm i d3-array"), TRUE, invisible= FALSE)
                                   system("npm i", TRUE, invisible = FALSE)
                                   setwd(mainDirectory)
                                 }
                                 if (length(components) > 0) {
                                   # generate component as specified by R-user:
                                   for (component in components) {

                                   }
                                 }
                               },
                               serve = function() {
                                 r = plumb(paste0(getwd() , "/R/api.R"))
                                 r$run()
                               })
                   )

Component = R6Class("Component", list(url="/", name="", view="", methods=list(),
                                      initialize = function(url, name, view, methods) {
                                        self$url = url
                                        self$name = name
                                        self$view  = view
                                        self$methods = methods
                                      })
                    )


# example usage Build 02 components and append then to the application:
data("iris")
giveMeMin = function(data, columnName, bottom) {
  return(data %>% slice_min(columnName, bottom))
}

switchSpecies = function() {
  return ("test")
}
component1 = Component$new(url="/",
                           name="data-manipulation",
                           view="table",
                           methods= list(button = giveMeMin(iris,"Sepal.Length",2))
                           )
component2 = Component$new(url="/barchart",
                           name="data-visualization",
                           view="barchart",
                           methods = list(select = switchSpecies()))
app = RAngular$new()
app$buildFrontEnd(scaffold = TRUE, name="frontend", components= list(component1, component2))
# app$serve()










