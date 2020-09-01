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

extractUrls = function(components) {
  urls =c()
  for (component in components) {
    urls = c(urls, paste0("'",ifelse(component$url == "/","default", component$url),"'"))
  }
  return(str_replace_all(paste(urls, collapse=";"),fixed("/"),""))
}

extractJsonData = function(dataList) {
  widgets = names(dataList)
  metadata = c()
  index = 1
  for ( element in dataList) {
    metadata = c(metadata, paste(widgets[index],element$data,element$event,paste0("func",index-1, "(",element$arguments,")"),sep="-"))
    index = index + 1
  }
  return (paste(metadata,collapse = ";"))
}

stringiFy = function (vecData, sep=";") {
  return (paste(vecData,collapse = sep))
}

giveMeMin = function() {
  return ("this.ds.getDataService('normal/random').pipe(min<any>( (a: any, b: any) => a['Sepal.Length'] < b['Sepal.Length'] ? -1 : 1)).subscribe((data: any) => this.data = data)")
}

switchSpecies = function(specie) {
  return("this.ds.getDataService('api/iris').pipe(filter((data: any) => data['Species'] === specie)).subscribe((data: any) => this.data = data)")
}

RAngular = R6Class("RAngular", list( components =list(),
                               buildFrontEnd = function(directory="C:/Users/Admin/Documents/Rangular/", name="frontend", components) {
                                 # generate component as specified by R-user:
                                 setwd(directory)
                                 if (length(components) > 0) {
                                   # here we call the schematics
                                   urls = extractUrls(components)
                                   componentNames = c()
                                   vecEndpoint = c()
                                   for (component in components) {
                                     vecMethods = c()

                                     componentNames = c(componentNames, component$name)
                                     vecOptions = ";"
                                     for (widget in c("MatButton","MatSelect")) {
                                       currentWidget = component$methods[[widget]]
                                       if (length(currentWidget[["callback"]]) > 0) {
                                           vecMethods = c(vecMethods,extractMethods(currentWidget[["callback"]]))
                                       }
                                       if (length(currentWidget[["data"]]) > 0) {
                                          vecEndpoint = c(vecEndpoint, currentWidget[["data"]])
                                       }
                                       if (widget == "MatSelect" && length(currentWidget[["options"]]) > 0) {
                                          vecOptions = paste(currentWidget[["options"]],collapse = ";")
                                       }
                                     }
                                     methods = mergeMethods(vecMethods)
                                     metadata = extractJsonData(component$methods)
                                     system2("schematics",
                                             c("./rangular-template:component-template","--debug=false",
                                               paste0("--title=",name),
                                               paste0("--name=",component$name),
                                               paste0("--view=",component$view),
                                               paste0("--methods=",methods),
                                               paste0("--metadata=",metadata),
                                               paste0("--urls=",urls),
                                               paste0("--options=",vecOptions),
                                               "--force")
                                             , stderr = TRUE,invisible = FALSE)
                                   }
                                   ## import components into app-module.ts:

                                   system2("schematics",
                                           c("./rangular-template:module-template","--debug=false",
                                             paste0("--components=",stringiFy(componentNames)),
                                             paste0("--title=",name),
                                             "--force")
                                           , stderr = TRUE,invisible = FALSE)
                                   ## run routing schematics at this point with urls and componentNames:
                                   system2("schematics",
                                           c("./rangular-template:routing-template","--debug=false",
                                             paste0("--components=",stringiFy(componentNames)),
                                             paste0("--title=",name),
                                             paste0("--urls=",urls),
                                             "--force")
                                           , stderr = TRUE,invisible = FALSE)
                                   ## run service schematics, to bind data to the application
                                   system2("schematics",
                                           c("./rangular-template:service-template","--debug=false",
                                             paste0("--endpoints=",paste(vecEndpoint,collapse = ";")),
                                             paste0("--title=",name),
                                             "--force")
                                           , stderr = TRUE,invisible = FALSE)
                                 }
                               },
                               serve = function(name) {
                                 # if directory node_modules exists, launch directly
                                 # otherwise install and launch
                                 setwd(name)
                                 if (dir.exists("node_modules")) {
                                   system("npm start", wait = TRUE,invisible = FALSE)
                                 } else {
                                   system(paste("npm i","npm start",sep="&&"), wait = TRUE,invisible = FALSE)
                                 }
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
                           methods= list(MatButton = list(data = "api/iris", event = "click",
                                                          callback = giveMeMin, arguments=""),
                                         MatSelect = list(data = "echo", event = "selectionChange",
                                                          callback = switchSpecies, arguments="$event"))
                           )
component2 = Component$new(url="/barchart",
                           name="data-visualization",
                           view="barchart",
                           methods= list(MatButton = list(data = "api/normal/random", event = "click",
                                                          callback = giveMeMin, arguments=""),
                                         MatSelect = list(data = "api/binomial/random", event = "selectionChange",
                                                          callback = switchSpecies, arguments="$event",
                                                          options=c("setosa","versicolor","virginica")))
                           )
app = RAngular$new()
app$buildFrontEnd(directory="C:/Users/Admin/Documents/Rangular/", name="frontend", components= list(component1, component2))
app$serve("frontend")




