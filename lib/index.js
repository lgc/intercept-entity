'use strict';

var cheerio = require('cheerio');
var Q = require('q');
var util = require('util');
var judge = 'substring';

var entity = function (obj) {
    var defer = Q.defer();
    if (util.isNumber(arguments[1]) && (arguments.length == 3) ? util.isNumber(arguments[2]) : true) {
        var _result = intercept(obj, arguments[1], (arguments.length == 3) ? arguments[2] : '');
        if (_result) {
            defer.resolve(_result);
        } else {
            fail(defer);
        }
    } else {
        fail(defer);
    }
    return defer.promise;
};

function fail(defer) {
    defer.reject('intercept-entity:arguments is invalid');
}

function interceptOne(obj, begin, end) {
    if (end === '') {
        end = undefined;
    }
    var $ = cheerio.load('<span></span>');
    var _dom = $('span');
    _dom.html(obj);
    var string = _dom.text().toString().substring(begin, end);
    _dom.html(string);
    if (judge == 'decode')
        return _dom.text();
    else
        return _dom.html()
}

function intercept(obj, begin, end) {
    if (util.isString(obj)) {
        return interceptOne(obj, begin, end);
    } else if (util.isArray(obj)) {
        var arr = [];
        for (var i = 0; i < obj.length; i++) {
            if (util.isString(obj[i]))
                arr[i] = interceptOne(obj[i], begin, end);
            else if (util.isObject(obj))
                arr[i] = interceptOne(obj[i], begin, end);
            else if (util.isArray(obj))
                arr[i] = intercept(obj[i], begin, end);
            else
                return;
        }
        return arr;
    } else if (util.isObject(obj)) {
        var resObj = {};
        for (var key in obj) {
            if (util.isString(obj[key]))
                resObj[key] = interceptOne(obj[key], begin, end);
            else if (util.isObject(obj))
                resObj[key] = intercept(obj[key], begin, end);
            else if (util.isArray(obj))
                resObj[key] = intercept(obj[key], begin, end);
            else
                return;
        }
        return resObj;
    }
}

/**
 * @param {String|Object|Array} obj 信息
 * @param {Number} begin 开始
 * @param {Number|} end 结束
 * @param {function} callback
 */
function interceptEntity(obj, begin, end, callback) {
    judge = 'substring';
    if (obj && (util.isString(obj) || util.isArray(obj) || util.isObject(obj))) {
        if (arguments.length == 3 && typeof arguments[2] == 'function') {
            var _cb = arguments[2];
            entity(obj, arguments[1]).then(function (fulfilled) {
                _cb(fulfilled);
            }, function (rejected) {
                throw new Error(rejected);
            }).done();
        } else if (arguments.length == 4 && typeof arguments[3] == 'function') {
            var cb = arguments[3];
            entity(obj, arguments[1], arguments[2]).then(function (fulfilled) {
                cb(fulfilled);
            }, function (rejected) {
                throw new Error(rejected);
            }).done();
        } else {
            throw new Error('intercept-entity:arguments is invalid');
        }
    } else {
        throw new Error('intercept-entity:arguments is invalid');
    }
}

/**
 * @param {String|Object|Array} obj 信息
 */
function encode(obj) {
    judge = 'encode';
    if (obj && (util.isString(obj) || util.isArray(obj) || util.isObject(obj))) {
        return intercept(obj)
    } else {
        throw new Error('intercept-entity:arguments is invalid');
    }
}

/**
 * @param {String|Object|Array} obj 信息
 */
function decode(obj) {
    judge = 'decode';
    if (obj && (util.isString(obj) || util.isArray(obj) || util.isObject(obj))) {
        return intercept(obj)
    } else {
        throw new Error('intercept-entity:arguments is invalid');
    }
}

module.exports = {
    intercept: interceptEntity,
    decode: decode,
    encode: encode
};


