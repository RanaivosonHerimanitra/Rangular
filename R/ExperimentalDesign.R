#   Build and Reload Package:  'Ctrl + Shift + B'
#   Check Package:             'Ctrl + Shift + E'
#   Test Package:              'Ctrl + Shift + T'
library("R6")
library("plumber")
library("dplyr")
library("tidyverse")
library("magrittr")
library("jsonlite")
library("stringr")

setwd("C:/Users/Admin/Documents/Rangular/")
mainDirectory = getwd()

extractMethods = function(srcMethod) {
  vectorRepresentation = c(srcMethod)
  vectorString = paste0(vectorRepresentation, collapse = "")
  vectorString = str_replace_all(vectorString, fixed(" "), "")
  vectorString = str_replace_all(vectorString, fixed("\n"),"")
  return(vectorString)
}

mergeMethods = function(srcListMethod) {
  vectorRepresentation = c()
  for (src in srcListMethod) {
    vectorRepresentation = c(vectorRepresentation, src)
  }
  vectorString = paste0(vectorRepresentation, collapse = ";")
  vectorString = str_replace_all(vectorString, fixed(" "), "")
  vectorString = str_replace_all(vectorString, fixed("\n"),"")
  return(vectorString)
}

extractJsonData = function(dataList) {
  widgets = names(dataList)
  metadata = c()
  index = 1
  for ( element in dataList) {
    metadata = c(metadata, paste(widgets[index],element$data,element$event,paste0("func",index),sep="-"))
    index = index + 1
  }
  return (paste(metadata,collapse = ";"))
}
#extractJsonData(list(MatButton = list(data = "data", event = "click", callback = giveMeMin),
 #                    MatSelect = list(data = "data", event = "selectionChange", callback = switchSpecies)))

giveMeMin = function(data, columnName, bottom) {
  return(c(data, slice_min(columnName, bottom)))
}

switchSpecies = function() {
  return ("test")
}

RAngular = R6Class("RAngular", list(directory="", components =list(),
                               buildFrontEnd = function(initialize = FALSE, name="frontend", components) {
                                 if (initialize == TRUE) {
                                   system(paste("ng new",name,"--routing=true","--force=true"), TRUE,invisible = FALSE)
                                   setwd(name)
                                   system(paste("ng add @ng-bootstrap/ng-bootstrap"))
                                   system(paste("ng add @angular/material"))
                                   system(paste("npm i plotly.js-dist"), TRUE, invisible = FALSE)
                                   system(paste("npm i d3"), TRUE, invisible = FALSE)
                                   system(paste("npm i d3-array"), TRUE, invisible = FALSE)
                                   system("npm i", TRUE, invisible = FALSE)
                                   setwd(mainDirectory)
                                 }
                                 # generate component as specified by R-user:
                                 if (length(components) > 0) {
                                   # here we call the schematics
                                   for (component in components) {
                                     vecMethods = c()
                                     for (widget in c("MatButton","MatSelect")) {
                                       currentWidget = component$methods[[widget]]
                                         if (length(currentWidget[["callback"]]) > 0) {
                                           vecMethods = c(vecMethods,extractMethods(currentWidget[["callback"]]))
                                         }
                                     }
                                     methods = mergeMethods(vecMethods)
                                     metadata = extractJsonData(component$methods)
                                     print(metadata)
                                     system2("schematics",
                                             c("./rangular-template:rangular-template","--debug=false",
                                               paste0("--name=",component$name),
                                               paste0("--view=",component$view),
                                               paste0("--methods=",methods),
                                               paste0("--metadata=",metadata),
                                               "--force")
                                             , stderr = TRUE,invisible = FALSE)
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

component1 = Component$new(url="/",
                           name="data-manipulation",
                           view="table",
                           methods= list(MatButton = list(data = "data", event = "click", callback = giveMeMin),
                                         MatSelect = list(data = "data", event = "selectionChange", callback = switchSpecies))
                           )
component2 = Component$new(url="/barchart",
                           name="data-visualization",
                           view="barchart",
                           methods= list(MatButton = list(data = "data", event = "click", callback = giveMeMin),
                                         MatSelect = list(data = "data", event = "selectionChange", callback = switchSpecies))

                           )
app = RAngular$new()
app$buildFrontEnd(initialize = FALSE, name="frontend", components= list(component1, component2))
app$serve()




