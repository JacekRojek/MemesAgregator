"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require('express');

var client = require('../redis_client');

var _require = require('../sources/jbzd'),
    getImages = _require.getImages;

var router = express.Router();
var REDIS_KEYS = {
  JBZD: 'JBZD'
};
var url = 'https://jbzd.com.pl/str/2';
/* GET home page. */

router.get('/next', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            client.get("".concat(REDIS_KEYS, "_1"), function (err, result) {
              if (err) {
                console.error(err);
                res.json({
                  error: 'error'
                });
              } else {
                res.redirect(result);
              }
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/refresh', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var memes;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getImages(url);

          case 2:
            memes = _context2.sent;
            memes.forEach(function (m, i) {
              console.log("".concat(REDIS_KEYS, "_").concat(i, ": "), m.src);
              client.set("".concat(REDIS_KEYS, "_").concat(i), m.src);
            });
            res.json({
              ok: 'true'
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
module.exports = router;