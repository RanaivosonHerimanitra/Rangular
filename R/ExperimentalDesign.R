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
  if (vectorString == "") return ("function() {return (undefined)}")
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

# should be renamed differently event arguments and results and cmd options for the schematics
extractJsonMetaData = function(dataList) {
  widgets = names(dataList)
  metadata = c()
  index = 1
  for (element in dataList) {
    if(length(element$options)>0) {
      metadata = c(metadata,
                   paste(widgets[index],
                         element$data,
                         element$event,
                         paste0("func",index-1, "(",element$arguments,")"),
                         formatLabel(element$label),
                         paste(element$options,collapse="%"),
                         handleNullOption(element$reference),
                         handleNullOption(element$icon),
                         sep="-")

      )
    } else {
      metadata = c(metadata,
                   paste(widgets[index],
                         element$data,
                         element$event,
                         paste0("func",index-1, "(",element$arguments,")"),
                         formatLabel(element$label),
                         handleNullOption(element$reference),
                         handleNullOption(element$icon),
                         sep="-")

      )
    }

    index = index + 1
  }
  print(metadata)
  return (paste(metadata,collapse = ";"))
}

# utils function:
handleNullOption = function(widgetOption) {
  return(ifelse(is.null(widgetOption) == TRUE, "undefined", widgetOption))
}

# future view options should handled by this function
extractViewOptions = function(componentViewOptions) {
  outputParam = c()
  for (view in names(componentViewOptions)) {
    if (view %in% c("title", "subtitle")) {
      outputParam = c(outputParam, formatLabel(componentViewOptions[view]))
    }
  }
  return (paste(outputParam, collapse = ";"))
}

stringiFy = function (vecData, sep=";") {
  return (paste(vecData,collapse = sep))
}

formatLabel = function (label) {
  return(str_replace_all(label, fixed(" "),"%"))
}

handlePlotlyViewOption = function(data) {
  result = c()
  for (param in names(data)) {
    if (param == "title") {
      result = c(result, formatLabel(data[param]))
    } else {
      result = c(result, data[param])
    }
  }
  return (paste(result, collapse = ";"))
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

switchSepal = function(event) {
  return("this.ds.getDataService('api/iris').subscribe((data: any) => this.graph.data[0].x = data.map(x=> x[event.value] ))")
}

switchPetal = function(event) {
  return("this.ds.getDataService('api/iris').subscribe((data: any) => this.graph.data[0].y = data.map(x=> x[event.value] ))")
}

removeMpgColumn = function() {
  return("this.ds.getDataService('api/mtcars').subscribe((data: any)=>{ this.data = data.map(obj => Object.entries(obj).filter(keyValue => keyValue[0] !== 'mpg')) % this.data = this.data.map(obj => Object.fromEntries(obj)  )% this.displayedColumns = Object.keys(this.data[0])%})"
  )
}

removeHpColumn = function() {
  return("this.ds.getDataService('api/mtcars').subscribe((data: any)=>{ this.data = data.map(obj => Object.entries(obj).filter(keyValue => keyValue[0] !== 'hp')) % this.data = this.data.map(obj => Object.fromEntries(obj)  )% this.displayedColumns = Object.keys(this.data[0])%})"
  )
}

removeColumn = function() {
  return("this.ds.getDataService('api/mtcars').subscribe((data: any)=>{ this.data = data.map(obj => Object.entries(obj).filter(keyValue => keyValue[0] !== this.columnToBeRemoved)) % this.data = this.data.map(obj => Object.fromEntries(obj)  )% this.displayedColumns = Object.keys(this.data[0])%})"
  )
}

RAngular = R6Class("RAngular", list( components =list(),
                               buildFrontEnd = function(directory="C:/Users/Admin/Documents/Rangular/",
                                                        servicePort, name="frontend", components) {
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
                                     sliderOptions = ";"

                                     for (widget in c(1:length(names(component$methods))) ) {
                                       currentWidget = component$methods[[widget]]
                                       if (length(currentWidget[["callback"]]) > 0) {
                                           vecMethods = c(vecMethods,extractMethods(currentWidget[["callback"]]))
                                       }
                                       if (length(currentWidget[["data"]]) > 0) {
                                          vecEndpoint = c(vecEndpoint, currentWidget[["data"]])
                                       }

                                       # MatSlider: min-max-step:
                                       if (names(component$methods)[widget] == "MatSlider") {
                                          sliderOptions = paste(currentWidget[["options"]],collapse = ";")
                                       }
                                     }

                                     methods = mergeMethods(vecMethods)
                                     metadata = extractJsonMetaData(component$methods)
                                     viewOptions = extractViewOptions(component$view)

                                     system2("schematics",
                                             c("./rangular-template:component-template","--debug=false",
                                               paste0("--title=",name),
                                               paste0("--name=",component$name),
                                               paste0("--view=",component$view$view),
                                               paste0("--viewOptions=", viewOptions),
                                               paste0("--viewdata=", handlePlotlyViewOption(component$view$data)),
                                               paste0("--viewlayout=", handlePlotlyViewOption(component$view$layout)),
                                               paste0("--columns=",paste(component$view$columns,collapse = ";")),
                                               paste0("--methods=",methods),
                                               paste0("--metadata=",metadata),
                                               paste0("--urls=",urls),
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
                                 # always install/update
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

irisTableComponent = Component$new(url="/",
                           name="table-manipulation",
                           view=list(view="table",columns=c("Sepal.Length","Petal.Length","Species")),
                           methods= list(MatButton = list(data = "api/iris",
                                                          event = "click",
                                                          label="order by sepal length",
                                                          callback = orderBySepalLength,
                                                          arguments="",
                                                          icon = "dns"),
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
                                                          arguments = "",
                                                          icon = "home"),
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
                                                          arguments = "",
                                                          icon = "done"),
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
app$buildFrontEnd(directory="C:/Users/Admin/Documents/Rangular/",
                  servicePort ="7999",
                  name="frontend", components= list(irisTableComponent,
                                                    cardComponent,
                                                    plotlyComponent,
                                                    toggleColumnComponent))
app$serve("frontend")




