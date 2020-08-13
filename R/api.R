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

#* Return the sum of two numbers
#* @param a The first number to add
#* @param b The second number to add
#* @post /sum
function3 = function(a, b) {
  as.numeric(a) + as.numeric(b)
}

