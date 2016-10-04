'use strict';

require('../../config/environment');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieSession = require('cookie-session');

var _cookieSession2 = _interopRequireDefault(_cookieSession);

var _error_handlers = require('./error_handlers');

var _error_handlers2 = _interopRequireDefault(_error_handlers);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appRoot = process.env.APP_ROOT;
var buildPath = process.env.BUILD_PATH;
var server = (0, _express2.default)();

module.exports = server;

server.set('env', process.env.NODE_ENV);
server.set('port', process.env.PORT || '4000');
if (process.env.NODE_ENV !== 'test') server.use((0, _morgan2.default)('dev'));
server.use((0, _cookieSession2.default)({
  name: 'session',
  keys: [process.env.SESSION_KEY]
}));
server.use(_express2.default.static(buildPath + '/public'));
server.use(_bodyParser2.default.json());

server.use('/', _api2.default);

server.use(_error_handlers2.default);

if (process.env.NODE_ENV !== 'test') {
  server.listen(server.get('port'));
}