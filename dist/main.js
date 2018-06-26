/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var format = __webpack_require__(2);
var originalConsole = __webpack_require__(5);

transport.level = 'silly';
transport.format = '[{h}:{i}:{s}.{ms}] [{level}] {text}';

module.exports = transport;

function transport(msg) {
  var text = format.format(msg, transport.format);
  if (originalConsole[msg.level]) {
    originalConsole[msg.level](text);
  } else {
    originalConsole.log(text);
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(12);
var EOL = __webpack_require__(3).EOL;

module.exports = {
  format: format,
  formatTimeZone: formatTimeZone,
  pad: pad,
  stringifyArray: stringifyArray
};

function format(msg, formatter) {
  if (typeof formatter === 'function') {
    return formatter(msg);
  }

  var date = msg.date;

  return formatter.replace('{level}', msg.level).replace('{text}', stringifyArray(msg.data)).replace('{y}', date.getFullYear()).replace('{m}', pad(date.getMonth() + 1)).replace('{d}', pad(date.getDate())).replace('{h}', pad(date.getHours())).replace('{i}', pad(date.getMinutes())).replace('{s}', pad(date.getSeconds())).replace('{ms}', pad(date.getMilliseconds(), 3)).replace('{z}', formatTimeZone(date.getTimezoneOffset()));
}

function stringifyArray(data) {
  data = data.map(function formatErrors(arg) {
    return arg instanceof Error ? arg.stack + EOL : arg;
  });
  return util.format.apply(util, data);
}

function pad(number, zeros) {
  zeros = zeros || 2;
  return (new Array(zeros + 1).join('0') + number).substr(-zeros, zeros);
}

function formatTimeZone(minutesOffset) {
  var m = Math.abs(minutesOffset);
  return (minutesOffset >= 0 ? '-' : '+') + pad(Math.floor(m / 60)) + ':' + pad(m % 60);
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Save console methods for using when originals are overridden
 */

module.exports = {
  context: console,
  error: console.error,
  warn: console.warn,
  info: console.info,
  verbose: console.verbose,
  debug: console.debug,
  silly: console.silly,
  log: console.log
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(0);

var _electronLog = __webpack_require__(8);

var log = _interopRequireWildcard(_electronLog);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

let mainWindow;
// import installExtension , { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'
/*import * as url from 'url'
import * as path from 'path'*/

_electron.ipcMain.once('close', () => {
    mainWindow.close();
});
_electron.ipcMain.on('hide', () => {
    mainWindow.minimize();
});
_electron.app.on('ready', () => {
    mainWindow = new _electron.BrowserWindow({ width: 1024, height: 720, resizable: false,
        fullscreen: false });
    mainWindow.loadURL(`file:///${__dirname}/index.html`);
    mainWindow.webContents.toggleDevTools();
    setupLogger();
    mainWindow.once('ready-to-show', () => mainWindow.show());
    // const fileName = 'file:///' + __dirname + '/index.html'
    // mainWindow.loadURL(fileName)
    /* mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))*/
    /*installExtension(REACT_DEVELOPER_TOOLS).then((name => console.log(`Added Extension:  ${name}`))).catch((err) => console.log('An error occurred: ', err))
    installExtension(REDUX_DEVTOOLS).then((name => console.log(`Added Extension:  ${name}`))).catch((err) => console.log('An error occurred: ', err))
    */
});
_electron.app.on('window-all-closed', () => {
    _electron.app.quit();
});
function setupLogger() {
    // Same as for console transport
    log.transports.file.level = 'info';
    log.transports.file.format = '{h}:{i}:{s}:{ms} {text}';
    // Set approximate maximum log size in bytes. When it exceeds,
    // the archived log will be saved as the log.old.log file
    log.transports.file.maxSize = 5 * 1024 * 1024;
    // Write to this file, must be set before first logging
    log.transports.file.file = __dirname + '/../log.log';
    log.transports.file.streamConfig = { flags: 'a' };
    // fs.createWriteStream options, must be set before first logging
    /*
    fs.exists(__dirname + '../log.log', (value) => {
      console.log('EXISTS', value)
      if (value) {
        log.transports.file.streamConfig = { flags: 'a' }
      } else {
        log.transports.file.streamConfig = { flags: 'w' }
      }
    })
    */
    // set existed file stream
    // log.transports.file.file = 'log.log'
    // log.transports.file.stream = fs.createWriteStream('log.log')
}
/*app.on('before-quit', () => {
  mainWindow.removeAllListeners('close')
  mainWindow.close()
})
*/
// 5354580012000022800000002400000001201B009D8F696140000000000F424068400000000000000C811456D4D9A220C51B290E00A15B5019D589C11C5D64831482C0E674B6450F7AD33B24AC89F127687843011B
// 5354580012000022800000002400000001201B009D8F696140000000000F424068400000000000000C73210223254FE57496571E79D92C69F3A9E928E5B2E045A237752166801336084F5B38811456D4D9A220C51B290E00A15B5019D589C11C5D64831482C0E674B6450F7AD33B24AC89F127687843011B

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (process.type === 'renderer') {
  module.exports = __webpack_require__(9);
} else {
  module.exports = __webpack_require__(10);
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = null;

var ipcRenderer;
try {
  ipcRenderer = __webpack_require__(0).ipcRenderer;
} catch (e) {
  ipcRenderer = null;
}

var originalConsole = __webpack_require__(5);

if (ipcRenderer) {
  module.exports = {
    error: log.bind(null, 'error'),
    warn: log.bind(null, 'warn'),
    info: log.bind(null, 'info'),
    verbose: log.bind(null, 'verbose'),
    debug: log.bind(null, 'debug'),
    silly: log.bind(null, 'silly'),
    log: log.bind(null, 'info')
  };

  module.exports['default'] = module.exports;

  ipcRenderer.on('__ELECTRON_LOG_RENDERER__', function (event, level, text) {
    if (level === 'verbose') {
      level = 'log';
    } else if (level === 'silly') {
      level = 'debug';
    }

    originalConsole[level].call(originalConsole.context, text);
  });
}

function log() {
  var data = Array.prototype.slice.call(arguments);

  data = data.map(function (obj) {
    if (obj instanceof Error) {
      obj = obj.stack || obj;
    }

    return obj;
  });

  ipcRenderer.send('__ELECTRON_LOG__', data);
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var electron;
try {
  electron = __webpack_require__(0);
} catch (e) {
  electron = null;
}

var log = __webpack_require__(11);
var transportConsole = __webpack_require__(1);
var transportFile = __webpack_require__(13);
var transportLogS = __webpack_require__(16);
var transportRendererConsole = __webpack_require__(20);

var transports = {
  console: transportConsole,
  file: transportFile,
  logS: transportLogS,
  rendererConsole: transportRendererConsole
};

module.exports = {
  transports: transports,

  error: log.bind(null, transports, 'error'),
  warn: log.bind(null, transports, 'warn'),
  info: log.bind(null, transports, 'info'),
  verbose: log.bind(null, transports, 'verbose'),
  debug: log.bind(null, transports, 'debug'),
  silly: log.bind(null, transports, 'silly'),
  log: log.bind(null, transports, 'info')
};

module.exports['default'] = module.exports;

if (electron && electron.ipcMain) {
  electron.ipcMain.on('__ELECTRON_LOG__', onRendererLog);
  var appName = electron.app.getName();
  if (appName !== 'Electron') {
    transportFile.appName = appName;
  }
}

function onRendererLog(event, data) {
  if (Array.isArray(data)) {
    data.unshift(transports);
    log.apply(null, data);
  }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// jshint -W040


var LEVELS = ['error', 'warn', 'info', 'verbose', 'debug', 'silly'];

module.exports = log;

function log(transports, level, text) {
  var data = Array.prototype.slice.call(arguments, 2);

  var msg = {
    data: data,
    date: new Date(),
    level: level
  };

  for (var i in transports) {
    // jshint -W089
    if (!transports.hasOwnProperty(i) || typeof transports[i] !== 'function') {
      continue;
    }

    var transport = transports[i];

    if (transport === false || !compareLevels(transport.level, level)) {
      continue;
    }

    if (transport.level === false) continue;

    transport.call(null, msg);
  }
}

function compareLevels(passLevel, checkLevel) {
  var pass = LEVELS.indexOf(passLevel);
  var check = LEVELS.indexOf(checkLevel);
  if (check === -1 || pass === -1) {
    return true;
  }
  return check <= pass;
}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(4);
var EOL = __webpack_require__(3).EOL;
var format = __webpack_require__(2);
var consoleTransport = __webpack_require__(1);
var findLogPath = __webpack_require__(14);

transport.findLogPath = findLogPath;
transport.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}';
transport.level = 'warn';
transport.maxSize = 1024 * 1024;
transport.streamConfig = undefined;

module.exports = transport;

function transport(msg) {
  var text = format.format(msg, transport.format) + EOL;

  if (transport.stream === undefined) {
    initSteamConfig();
    openStream();
  }

  if (transport.level === false) {
    return;
  }

  var needLogRotation = transport.maxSize > 0 && getStreamSize(transport.stream) > transport.maxSize;

  if (needLogRotation) {
    archiveLog(transport.stream);
    openStream();
  }

  transport.stream.write(text);
}

function initSteamConfig() {
  transport.file = transport.file || findLogPath(transport.appName);

  if (!transport.file) {
    transport.level = false;
    logConsole('Could not set a log file');
  }
}

function openStream() {
  if (transport.level === false) {
    return;
  }

  transport.stream = fs.createWriteStream(transport.file, transport.streamConfig || { flags: 'a' });
}

function getStreamSize(stream) {
  if (!stream) {
    return 0;
  }

  if (stream.logSizeAtStart === undefined) {
    try {
      stream.logSizeAtStart = fs.statSync(stream.path).size;
    } catch (e) {
      stream.logSizeAtStart = 0;
    }
  }

  return stream.logSizeAtStart + stream.bytesWritten;
}

function archiveLog(stream) {
  if (stream.end) {
    stream.end();
  }

  try {
    fs.renameSync(stream.path, stream.path.replace(/log$/, 'old.log'));
  } catch (e) {
    logConsole('Could not rotate log', e);
  }
}

function logConsole(message, error) {
  var data = ['electron-log.transports.file: ' + message];

  if (error) {
    data.push(error);
  }

  consoleTransport({ data: data, date: new Date(), level: 'warn' });
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(4);
var path = __webpack_require__(6);
var os = __webpack_require__(3);
var getAppName = __webpack_require__(15);

module.exports = findLogPath;

/**
 * Try to determine a platform-specific path where can write logs
 * @param {string} [appName] Used to determine the last part of a log path
 * @return {string|boolean}
 */
function findLogPath(appName) {
  appName = appName || getAppName();
  if (!appName) {
    return false;
  }

  var homeDir = os.homedir ? os.homedir() : process.env['HOME'];

  var dir;
  switch (process.platform) {
    case 'linux':
      {
        dir = prepareDir(process.env['XDG_CONFIG_HOME'], appName).or(homeDir, '.config', appName).or(process.env['XDG_DATA_HOME'], appName).or(homeDir, '.local', 'share', appName).result;
        break;
      }

    case 'darwin':
      {
        dir = prepareDir(homeDir, 'Library', 'Logs', appName).or(homeDir, 'Library', 'Application Support', appName).result;
        break;
      }

    case 'win32':
      {
        dir = prepareDir(process.env['APPDATA'], appName).or(homeDir, 'AppData', 'Roaming', appName).result;
        break;
      }
  }

  if (dir) {
    return path.join(dir, 'log.log');
  } else {
    return false;
  }
}

function prepareDir(dirPath) {
  // jshint -W040
  if (!this || this.or !== prepareDir || !this.result) {
    if (!dirPath) {
      return { or: prepareDir };
    }

    //noinspection JSCheckFunctionSignatures
    dirPath = path.join.apply(path, arguments);
    mkDir(dirPath);

    try {
      fs.accessSync(dirPath, fs.W_OK);
    } catch (e) {
      return { or: prepareDir };
    }
  }

  return {
    or: prepareDir,
    result: (this ? this.result : false) || dirPath
  };
}

function mkDir(dirPath, root) {
  var dirs = dirPath.split(path.sep);
  var dir = dirs.shift();
  root = (root || '') + dir + path.sep;

  try {
    fs.mkdirSync(root);
  } catch (e) {
    if (!fs.statSync(root).isDirectory()) {
      throw new Error(e);
    }
  }

  return !dirs.length || mkDir(dirs.join(path.sep), root);
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// jshint -W074


/** @name process.resourcesPath */

var fs = __webpack_require__(4);
var path = __webpack_require__(6);
var consoleTransport = __webpack_require__(1);

module.exports = getAppName;

function getAppName() {
  try {
    var name = loadPackageName();
    if (name) {
      return name;
    }
    return warn('electron-log: unable to load the app name from package.json');
  } catch (e) {
    return warn('electron-log: ' + e.message);
  }
}

/**
 * Try to load main app package
 * @throws {Error}
 * @return {Object|null}
 */
function loadPackageName() {
  var packageFile;

  try {
    if (__webpack_require__.c[__webpack_require__.s].filename) {
      packageFile = find(path.dirname(__webpack_require__.c[__webpack_require__.s].filename));
    }
  } catch (e) {}

  if (!packageFile && process.resourcesPath) {
    packageFile = find(path.join(process.resourcesPath, 'app.asar'));
    var electronModule = path.join('node_modules', 'electron', 'package.json');
    if (packageFile && packageFile.indexOf(electronModule) !== -1) {
      packageFile = null;
    }
  }

  if (!packageFile) {
    packageFile = find(process.cwd());
  }

  if (!packageFile) {
    return null;
  }

  var content = fs.readFileSync(packageFile, 'utf-8');
  var packageData = JSON.parse(content);

  //noinspection JSUnresolvedVariable
  return packageData ? packageData.productName || packageData.name : false;
}

function find(root) {
  var file;

  while (!file) {
    var parent;
    file = path.join(root, 'package.json');

    try {
      fs.statSync(file);
    } catch (e) {
      parent = path.resolve(root, '..');
      file = null;
    }

    if (root === parent) {
      break;
    }

    root = parent;
  }

  return file;
}

function warn(message) {
  consoleTransport({
    data: [message],
    date: new Date(),
    level: 'warn'
  });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// jshint -W074, -W089


var http = __webpack_require__(17);
var https = __webpack_require__(18);
var url = __webpack_require__(19);

transport.client = { name: 'electron-application' };
transport.depth = 6;
transport.level = false;
transport.url = null;

module.exports = transport;

function transport(msg) {
  if (!transport.url) return;

  var data = jsonDepth({
    client: transport.client,
    data: msg.data,
    date: msg.date.getTime(),
    level: msg.level
  }, transport.depth + 1);

  post(transport.url, data);
}

function post(serverUrl, data) {
  var urlObject = url.parse(serverUrl);
  var transport = urlObject.protocol === 'https:' ? https : http;

  var body = JSON.stringify(data);

  var options = {
    hostname: urlObject.hostname,
    port: urlObject.port,
    path: urlObject.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body.length
    }
  };

  var request = transport.request(options);
  request.write(body);
  request.end();
}

function jsonDepth(json, depth) {
  if (depth < 1) {
    if (Array.isArray(json)) return '[array]';
    if (typeof json === 'object') return '[object]';
    return json;
  }

  if (Array.isArray(json)) {
    return json.map(function (child) {
      return jsonDepth(child, depth - 1);
    });
  }

  if (json && typeof json.getMonth === 'function') {
    return json;
  }

  if (json === null) {
    return null;
  }

  if (typeof json === 'object') {
    if (typeof json.toJSON === 'function') {
      json = json.toJSON();
    }

    var newJson = {};
    for (var i in json) {
      //noinspection JSUnfilteredForInLoop
      newJson[i] = jsonDepth(json[i], depth - 1);
    }

    return newJson;
  }

  return json;
}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BrowserWindow;
try {
  BrowserWindow = __webpack_require__(0).BrowserWindow;
} catch (e) {
  BrowserWindow = null;
}

var format = __webpack_require__(2);

transport.level = BrowserWindow ? 'silly' : false;
transport.format = '[{h}:{i}:{s}.{ms}] {text}';

module.exports = transport;

function transport(msg) {
  if (!BrowserWindow) return;

  var text = format.format(msg, transport.format);
  BrowserWindow.getAllWindows().forEach(function (wnd) {
    wnd.webContents.send('__ELECTRON_LOG_RENDERER__', msg.level, text);
  });
}

/***/ })
/******/ ]);