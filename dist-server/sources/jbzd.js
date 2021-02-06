"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImages = getImages;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var cheerio = require('cheerio');

var axios = require('axios');

var memes = [];

function getImages(_x) {
  return _getImages.apply(this, arguments);
}

function _getImages() {
  _getImages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
    var response, $, images;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return axios.get(url);

          case 3:
            response = _context.sent;
            $ = cheerio.load(response.data);
            images = $('article .article-image');
            images.each(function () {
              var src = $(this).find('img').attr('src');
              memes.push({
                src: src
              });
            });
            return _context.abrupt("return", memes.filter(function (m) {
              return m.src;
            }));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            return _context.abrupt("return", []);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));
  return _getImages.apply(this, arguments);
}

var _default = getImages;
exports["default"] = _default;