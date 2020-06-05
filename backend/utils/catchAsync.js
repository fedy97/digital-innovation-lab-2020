/**
 * wrap each async function with this
 * so each of them return a anonymous function
 * that will be called only if it is requested
 * but every function will first return that anonym one
 * because is always called
 * @param fn
 * @returns {function(...[*]=)}
 */
module.exports = fn => {
  //once it is really called, execute the await
  //and then for each function
  //that I wrapped with catchAsync(),
  //throw a catch, in this way
  //I do not need to put try catch
  //in each async functions
  return (req, res, next) => {
    //or simply fn(...).catch(next);
    fn(req, res, next).catch(err => next(err));
  };
};
