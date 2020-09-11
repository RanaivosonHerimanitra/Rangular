### My API ####
#* @filter cors
cors <- function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}
#* Echo back the input
#* @param msg The message to echo
#* @get /echo
function0 = function(msg="") {
  list(msg = paste0("The message is: '", msg, "'"))
}

#* Plot a histogram
#* @png
#* @get /plot
function1 = function() {
  rand <- rnorm(100)
  hist(rand)
}

#* return iris dataset for interactive data manipulation
#* @get /api/iris
function2 = function() {
  data("iris")
  return (iris)
}

#* return iris dataset for interactive data manipulation
#* @get /api/mtcars
function2 = function() {
  data("mtcars")
  return (mtcars)
}


#* Return the sum of two numbers
#* @param a The first number to add
#* @param b The second number to add
#* @post /sum
function3 = function(a, b) {
  as.numeric(a) + as.numeric(b)
}

#* @get /api/normal/random
function4 = function() {
  rnorm(100,0,1)
}

#* @get /api/binomial/random
function4 = function() {
  rbinom(100,50,0.3)
}
