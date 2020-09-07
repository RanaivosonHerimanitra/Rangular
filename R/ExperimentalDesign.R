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

extractJsonMetaData = function(dataList) {
  widgets = names(dataList)
  metadata = c()
  index = 1
  for ( element in dataList) {
    metadata = c(metadata,
                 paste(widgets[index],
                       element$data,
                       element$event,
                       paste0("func",index-1, "(",element$arguments,")"),
                       formatLabel(element$label),
                       sep="-")

                 )
    index = index + 1
  }
  print((paste(metadata,collapse = ";")))
  return (paste(metadata,collapse = ";"))
}

stringiFy = function (vecData, sep=";") {
  return (paste(vecData,collapse = sep))
}

formatLabel = function (label) {
  return(str_replace_all(label, fixed(" "),"%"))
}

orderBySepalLength = function() {
  return ("this.ds.getDataService('api/iris').pipe(min<any>( (a: any, b: any) => a['Sepal.Length'] < b['Sepal.Length'] ? -1 : 1)).subscribe((data: any) => this.data = data)")
}

giveMeMin = function() {
  return ("this.ds.getDataService('api/iris').pipe(min<any>( (a: any, b: any) => a['Sepal.Length'] < b['Sepal.Length'] ? -1 : 1), take(1)).subscribe((data: any) => this.data = data)")
}

switchSpecies = function(event) {
  return("this.ds.getDataService('api/iris').pipe(map(data => data.filter(x => x['Species'] === event.value))).subscribe((data: any) => this.data = data)")
}

filterSepalLength = function(event) {
  return("this.ds.getDataService('api/iris').pipe(map(data => data.filter(x => x['Sepal.Length'] >= event.value))).subscribe((data: any) => this.data = data)")
}

RAngular = R6Class("RAngular", list( components =list(),
                               buildFrontEnd = function(directory="C:/Users/Admin/Documents/Rangular/", servicePort, name="frontend", components) {
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
                                     selectOptions = ";"
                                     sliderOptions = ";"
                                     for (widget in c("MatButton","MatSelect","MatSlider")) {
                                       currentWidget = component$methods[[widget]]
                                       if (length(currentWidget[["callback"]]) > 0) {
                                           vecMethods = c(vecMethods,extractMethods(currentWidget[["callback"]]))
                                       }
                                       if (length(currentWidget[["data"]]) > 0) {
                                          vecEndpoint = c(vecEndpoint, currentWidget[["data"]])
                                       }
                                       # MatSelect
                                       if (widget == "MatSelect" && length(currentWidget[["options"]]) > 0) {
                                          selectOptions = paste(currentWidget[["options"]],collapse = ";")
                                       }
                                       # MatSlider: min-max-step:
                                       if (widget == "MatSlider") {
                                          sliderOptions = paste(currentWidget[["options"]],collapse = ";")
                                       }
                                     }

                                     methods = mergeMethods(vecMethods)
                                     metadata = extractJsonMetaData(component$methods)

                                     system2("schematics",
                                             c("./rangular-template:component-template","--debug=false",
                                               paste0("--title=",name),
                                               paste0("--name=",component$name),
                                               paste0("--view=",component$view$view),
                                               paste0("--columns=",paste(component$view$columns,collapse = ";")),
                                               paste0("--methods=",methods),
                                               paste0("--metadata=",metadata),
                                               paste0("--urls=",urls),
                                               paste0("--selectoptions=",selectOptions),
                                               paste0("--slideroptions=",sliderOptions),
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
                                             paste0("--port=",servicePort),
                                             paste0("--endpoints=",paste(vecEndpoint,collapse = ";")),
                                             paste0("--title=",name),
                                             "--force")
                                           , stderr = TRUE,invisible = FALSE)
                                 }
                               },
                               serve = function(name) {
                                 # always intall/update
                                 setwd(name)
                                 system(paste("npm i", "npm start", sep="&&"), wait = TRUE, invisible = FALSE)
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
                                                          event ="change",
                                                          callback= filterSepalLength,
                                                          arguments="$event",
                                                          options =c(3,10,0.5))
                                         ))
component2 = Component$new(url="/cardtable",
                           name="summary",
                           view=list(view="mat-card",columns=c("Sepal.Length","Petal.Length","Species")),
                           methods= list(MatButton = list(data = "api/iris",
                                                          event = "click",
                                                          label = "click me for minimum",
                                                          callback = giveMeMin,
                                                          arguments=""),
                                         MatSelect = list(data = "api/iris",
                                                          label ="Select a specy",
                                                          event = "selectionChange",
                                                          callback = switchSpecies,
                                                          arguments="$event",
                                                          options=c("setosa","versicolor","virginica"))
                                         ))
plotlyComponent = Component$new(url="/visualization",
                           name="data-visualization",
                           view=list(view="plotly", data=list(x = "Sepal.Length",
                                                             y = "Petal.Width",
                                                             type = "line",
                                                             marker = ""),
                                                   layout= list(width = 320,
                                                                height = 240,
                                                                title = 'Evolution')),
                           methods= list(MatSelect = list(data = "api/iris",
                                                          label = "Select x-axis",
                                                          event = "selectionChange",
                                                          callback = switchSepal,
                                                          arguments = "$event",
                                                          options = c("Sepal.Length","Sepal.Width")
                                                          ),
                                         MatSelect = list(data = "api/iris",
                                                          label = "Select y-axis",
                                                          event = "selectionChange",
                                                          callback = switchPetal,
                                                          arguments = "$event",
                                                          options = c("Petal.Length","Petal.Width")
                                         )
                           ))
app = RAngular$new()
app$buildFrontEnd(directory="C:/Users/Admin/Documents/Rangular/",
                  servicePort ="7999",
                  name="frontend", components= list(component1, component2, plotlyComponent))
app$serve("frontend")




