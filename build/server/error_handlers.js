'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// error handlers
// catch 404 and forward to error handler
router.use(function (request, response, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
  router.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.json({
      message: error.message,
      error: error,
      stack: error.stack
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  router.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.json({
      message: error.message,
      error: {},
      stack: []
    });
  });
}

exports.default = router;