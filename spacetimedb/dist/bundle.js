import * as _syscalls2_0 from "spacetime:sys@2.0";
import { moduleHooks } from "spacetime:sys@2.0";

//#region node_modules/headers-polyfill/lib/index.mjs
var __create$1 = Object.create;
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$1 = Object.getOwnPropertyNames;
var __getProtoOf$1 = Object.getPrototypeOf;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __commonJS$1 = (cb, mod) => function __require() {
	return mod || (0, cb[__getOwnPropNames$1(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps$1 = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (let key of __getOwnPropNames$1(from)) if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$1(to, key, {
			get: () => from[key],
			enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM$1 = (mod, isNodeMode, target) => (target = mod != null ? __create$1(__getProtoOf$1(mod)) : {}, __copyProps$1(isNodeMode || !mod || !mod.__esModule ? __defProp$1(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var import_set_cookie_parser = __toESM$1(__commonJS$1({ "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
	"use strict";
	var defaultParseOptions = {
		decodeValues: true,
		map: false,
		silent: false
	};
	function isNonEmptyString(str) {
		return typeof str === "string" && !!str.trim();
	}
	function parseString(setCookieValue, options) {
		var parts = setCookieValue.split(";").filter(isNonEmptyString);
		var parsed = parseNameValuePair(parts.shift());
		var name = parsed.name;
		var value = parsed.value;
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		try {
			value = options.decodeValues ? decodeURIComponent(value) : value;
		} catch (e) {
			console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e);
		}
		var cookie = {
			name,
			value
		};
		parts.forEach(function(part) {
			var sides = part.split("=");
			var key = sides.shift().trimLeft().toLowerCase();
			var value2 = sides.join("=");
			if (key === "expires") cookie.expires = new Date(value2);
			else if (key === "max-age") cookie.maxAge = parseInt(value2, 10);
			else if (key === "secure") cookie.secure = true;
			else if (key === "httponly") cookie.httpOnly = true;
			else if (key === "samesite") cookie.sameSite = value2;
			else cookie[key] = value2;
		});
		return cookie;
	}
	function parseNameValuePair(nameValuePairStr) {
		var name = "";
		var value = "";
		var nameValueArr = nameValuePairStr.split("=");
		if (nameValueArr.length > 1) {
			name = nameValueArr.shift();
			value = nameValueArr.join("=");
		} else value = nameValuePairStr;
		return {
			name,
			value
		};
	}
	function parse(input, options) {
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		if (!input) if (!options.map) return [];
		else return {};
		if (input.headers) if (typeof input.headers.getSetCookie === "function") input = input.headers.getSetCookie();
		else if (input.headers["set-cookie"]) input = input.headers["set-cookie"];
		else {
			var sch = input.headers[Object.keys(input.headers).find(function(key) {
				return key.toLowerCase() === "set-cookie";
			})];
			if (!sch && input.headers.cookie && !options.silent) console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
			input = sch;
		}
		if (!Array.isArray(input)) input = [input];
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		if (!options.map) return input.filter(isNonEmptyString).map(function(str) {
			return parseString(str, options);
		});
		else return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
			var cookie = parseString(str, options);
			cookies2[cookie.name] = cookie;
			return cookies2;
		}, {});
	}
	function splitCookiesString2(cookiesString) {
		if (Array.isArray(cookiesString)) return cookiesString;
		if (typeof cookiesString !== "string") return [];
		var cookiesStrings = [];
		var pos = 0;
		var start;
		var ch;
		var lastComma;
		var nextStart;
		var cookiesSeparatorFound;
		function skipWhitespace() {
			while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1;
			return pos < cookiesString.length;
		}
		function notSpecialChar() {
			ch = cookiesString.charAt(pos);
			return ch !== "=" && ch !== ";" && ch !== ",";
		}
		while (pos < cookiesString.length) {
			start = pos;
			cookiesSeparatorFound = false;
			while (skipWhitespace()) {
				ch = cookiesString.charAt(pos);
				if (ch === ",") {
					lastComma = pos;
					pos += 1;
					skipWhitespace();
					nextStart = pos;
					while (pos < cookiesString.length && notSpecialChar()) pos += 1;
					if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
						cookiesSeparatorFound = true;
						pos = nextStart;
						cookiesStrings.push(cookiesString.substring(start, lastComma));
						start = pos;
					} else pos = lastComma + 1;
				} else pos += 1;
			}
			if (!cookiesSeparatorFound || pos >= cookiesString.length) cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
		}
		return cookiesStrings;
	}
	module.exports = parse;
	module.exports.parse = parse;
	module.exports.parseString = parseString;
	module.exports.splitCookiesString = splitCookiesString2;
} })());
var HEADERS_INVALID_CHARACTERS = /[^a-z0-9\-#$%&'*+.^_`|~]/i;
function normalizeHeaderName(name) {
	if (HEADERS_INVALID_CHARACTERS.test(name) || name.trim() === "") throw new TypeError("Invalid character in header field name");
	return name.trim().toLowerCase();
}
var charCodesToRemove = [
	String.fromCharCode(10),
	String.fromCharCode(13),
	String.fromCharCode(9),
	String.fromCharCode(32)
];
var HEADER_VALUE_REMOVE_REGEXP = new RegExp(`(^[${charCodesToRemove.join("")}]|$[${charCodesToRemove.join("")}])`, "g");
function normalizeHeaderValue(value) {
	return value.replace(HEADER_VALUE_REMOVE_REGEXP, "");
}
function isValidHeaderName(value) {
	if (typeof value !== "string") return false;
	if (value.length === 0) return false;
	for (let i = 0; i < value.length; i++) {
		const character = value.charCodeAt(i);
		if (character > 127 || !isToken(character)) return false;
	}
	return true;
}
function isToken(value) {
	return ![
		127,
		32,
		"(",
		")",
		"<",
		">",
		"@",
		",",
		";",
		":",
		"\\",
		"\"",
		"/",
		"[",
		"]",
		"?",
		"=",
		"{",
		"}"
	].includes(value);
}
function isValidHeaderValue(value) {
	if (typeof value !== "string") return false;
	if (value.trim() !== value) return false;
	for (let i = 0; i < value.length; i++) {
		const character = value.charCodeAt(i);
		if (character === 0 || character === 10 || character === 13) return false;
	}
	return true;
}
var NORMALIZED_HEADERS = Symbol("normalizedHeaders");
var RAW_HEADER_NAMES = Symbol("rawHeaderNames");
var HEADER_VALUE_DELIMITER = ", ";
var _a, _b, _c;
var Headers = class _Headers {
	constructor(init) {
		this[_a] = {};
		this[_b] = /* @__PURE__ */ new Map();
		this[_c] = "Headers";
		if (["Headers", "HeadersPolyfill"].includes(init?.constructor.name) || init instanceof _Headers || typeof globalThis.Headers !== "undefined" && init instanceof globalThis.Headers) init.forEach((value, name) => {
			this.append(name, value);
		}, this);
		else if (Array.isArray(init)) init.forEach(([name, value]) => {
			this.append(name, Array.isArray(value) ? value.join(HEADER_VALUE_DELIMITER) : value);
		});
		else if (init) Object.getOwnPropertyNames(init).forEach((name) => {
			const value = init[name];
			this.append(name, Array.isArray(value) ? value.join(HEADER_VALUE_DELIMITER) : value);
		});
	}
	[(_a = NORMALIZED_HEADERS, _b = RAW_HEADER_NAMES, _c = Symbol.toStringTag, Symbol.iterator)]() {
		return this.entries();
	}
	*keys() {
		for (const [name] of this.entries()) yield name;
	}
	*values() {
		for (const [, value] of this.entries()) yield value;
	}
	*entries() {
		let sortedKeys = Object.keys(this[NORMALIZED_HEADERS]).sort((a, b) => a.localeCompare(b));
		for (const name of sortedKeys) if (name === "set-cookie") for (const value of this.getSetCookie()) yield [name, value];
		else yield [name, this.get(name)];
	}
	/**
	* Returns a boolean stating whether a `Headers` object contains a certain header.
	*/
	has(name) {
		if (!isValidHeaderName(name)) throw new TypeError(`Invalid header name "${name}"`);
		return this[NORMALIZED_HEADERS].hasOwnProperty(normalizeHeaderName(name));
	}
	/**
	* Returns a `ByteString` sequence of all the values of a header with a given name.
	*/
	get(name) {
		if (!isValidHeaderName(name)) throw TypeError(`Invalid header name "${name}"`);
		return this[NORMALIZED_HEADERS][normalizeHeaderName(name)] ?? null;
	}
	/**
	* Sets a new value for an existing header inside a `Headers` object, or adds the header if it does not already exist.
	*/
	set(name, value) {
		if (!isValidHeaderName(name) || !isValidHeaderValue(value)) return;
		const normalizedName = normalizeHeaderName(name);
		const normalizedValue = normalizeHeaderValue(value);
		this[NORMALIZED_HEADERS][normalizedName] = normalizeHeaderValue(normalizedValue);
		this[RAW_HEADER_NAMES].set(normalizedName, name);
	}
	/**
	* Appends a new value onto an existing header inside a `Headers` object, or adds the header if it does not already exist.
	*/
	append(name, value) {
		if (!isValidHeaderName(name) || !isValidHeaderValue(value)) return;
		const normalizedName = normalizeHeaderName(name);
		const normalizedValue = normalizeHeaderValue(value);
		let resolvedValue = this.has(normalizedName) ? `${this.get(normalizedName)}, ${normalizedValue}` : normalizedValue;
		this.set(name, resolvedValue);
	}
	/**
	* Deletes a header from the `Headers` object.
	*/
	delete(name) {
		if (!isValidHeaderName(name)) return;
		if (!this.has(name)) return;
		const normalizedName = normalizeHeaderName(name);
		delete this[NORMALIZED_HEADERS][normalizedName];
		this[RAW_HEADER_NAMES].delete(normalizedName);
	}
	/**
	* Traverses the `Headers` object,
	* calling the given callback for each header.
	*/
	forEach(callback, thisArg) {
		for (const [name, value] of this.entries()) callback.call(thisArg, value, name, this);
	}
	/**
	* Returns an array containing the values
	* of all Set-Cookie headers associated
	* with a response
	*/
	getSetCookie() {
		const setCookieHeader = this.get("set-cookie");
		if (setCookieHeader === null) return [];
		if (setCookieHeader === "") return [""];
		return (0, import_set_cookie_parser.splitCookiesString)(setCookieHeader);
	}
};
function headersToList(headers) {
	const headersList = [];
	headers.forEach((value, name) => {
		const resolvedValue = value.includes(",") ? value.split(",").map((value2) => value2.trim()) : value;
		headersList.push([name, resolvedValue]);
	});
	return headersList;
}

//#endregion
//#region node_modules/spacetimedb/dist/server/index.mjs
typeof globalThis !== "undefined" && (globalThis.global = globalThis.global || globalThis, globalThis.window = globalThis.window || globalThis);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
	return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: () => from[key],
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(__defProp(target, "default", {
	value: mod,
	enumerable: true
}), mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var require_base64_js = __commonJS({ "../../node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js"(exports) {
	exports.byteLength = byteLength;
	exports.toByteArray = toByteArray;
	exports.fromByteArray = fromByteArray2;
	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
	var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	for (i = 0, len = code.length; i < len; ++i) {
		lookup[i] = code[i];
		revLookup[code.charCodeAt(i)] = i;
	}
	var i;
	var len;
	revLookup["-".charCodeAt(0)] = 62;
	revLookup["_".charCodeAt(0)] = 63;
	function getLens(b64) {
		var len2 = b64.length;
		if (len2 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
		var validLen = b64.indexOf("=");
		if (validLen === -1) validLen = len2;
		var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
		return [validLen, placeHoldersLen];
	}
	function byteLength(b64) {
		var lens = getLens(b64);
		var validLen = lens[0];
		var placeHoldersLen = lens[1];
		return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
	}
	function _byteLength(b64, validLen, placeHoldersLen) {
		return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
	}
	function toByteArray(b64) {
		var tmp;
		var lens = getLens(b64);
		var validLen = lens[0];
		var placeHoldersLen = lens[1];
		var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
		var curByte = 0;
		var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
		var i2;
		for (i2 = 0; i2 < len2; i2 += 4) {
			tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
			arr[curByte++] = tmp >> 16 & 255;
			arr[curByte++] = tmp >> 8 & 255;
			arr[curByte++] = tmp & 255;
		}
		if (placeHoldersLen === 2) {
			tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
			arr[curByte++] = tmp & 255;
		}
		if (placeHoldersLen === 1) {
			tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
			arr[curByte++] = tmp >> 8 & 255;
			arr[curByte++] = tmp & 255;
		}
		return arr;
	}
	function tripletToBase64(num) {
		return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
	}
	function encodeChunk(uint8, start, end) {
		var tmp;
		var output = [];
		for (var i2 = start; i2 < end; i2 += 3) {
			tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
			output.push(tripletToBase64(tmp));
		}
		return output.join("");
	}
	function fromByteArray2(uint8) {
		var tmp;
		var len2 = uint8.length;
		var extraBytes = len2 % 3;
		var parts = [];
		var maxChunkLength = 16383;
		for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
		if (extraBytes === 1) {
			tmp = uint8[len2 - 1];
			parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
		} else if (extraBytes === 2) {
			tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
			parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
		}
		return parts.join("");
	}
} });
var require_codes = __commonJS({ "../../node_modules/.pnpm/statuses@2.0.2/node_modules/statuses/codes.json"(exports, module) {
	module.exports = {
		"100": "Continue",
		"101": "Switching Protocols",
		"102": "Processing",
		"103": "Early Hints",
		"200": "OK",
		"201": "Created",
		"202": "Accepted",
		"203": "Non-Authoritative Information",
		"204": "No Content",
		"205": "Reset Content",
		"206": "Partial Content",
		"207": "Multi-Status",
		"208": "Already Reported",
		"226": "IM Used",
		"300": "Multiple Choices",
		"301": "Moved Permanently",
		"302": "Found",
		"303": "See Other",
		"304": "Not Modified",
		"305": "Use Proxy",
		"307": "Temporary Redirect",
		"308": "Permanent Redirect",
		"400": "Bad Request",
		"401": "Unauthorized",
		"402": "Payment Required",
		"403": "Forbidden",
		"404": "Not Found",
		"405": "Method Not Allowed",
		"406": "Not Acceptable",
		"407": "Proxy Authentication Required",
		"408": "Request Timeout",
		"409": "Conflict",
		"410": "Gone",
		"411": "Length Required",
		"412": "Precondition Failed",
		"413": "Payload Too Large",
		"414": "URI Too Long",
		"415": "Unsupported Media Type",
		"416": "Range Not Satisfiable",
		"417": "Expectation Failed",
		"418": "I'm a Teapot",
		"421": "Misdirected Request",
		"422": "Unprocessable Entity",
		"423": "Locked",
		"424": "Failed Dependency",
		"425": "Too Early",
		"426": "Upgrade Required",
		"428": "Precondition Required",
		"429": "Too Many Requests",
		"431": "Request Header Fields Too Large",
		"451": "Unavailable For Legal Reasons",
		"500": "Internal Server Error",
		"501": "Not Implemented",
		"502": "Bad Gateway",
		"503": "Service Unavailable",
		"504": "Gateway Timeout",
		"505": "HTTP Version Not Supported",
		"506": "Variant Also Negotiates",
		"507": "Insufficient Storage",
		"508": "Loop Detected",
		"509": "Bandwidth Limit Exceeded",
		"510": "Not Extended",
		"511": "Network Authentication Required"
	};
} });
var require_statuses = __commonJS({ "../../node_modules/.pnpm/statuses@2.0.2/node_modules/statuses/index.js"(exports, module) {
	var codes = require_codes();
	module.exports = status2;
	status2.message = codes;
	status2.code = createMessageToStatusCodeMap(codes);
	status2.codes = createStatusCodeList(codes);
	status2.redirect = {
		300: true,
		301: true,
		302: true,
		303: true,
		305: true,
		307: true,
		308: true
	};
	status2.empty = {
		204: true,
		205: true,
		304: true
	};
	status2.retry = {
		502: true,
		503: true,
		504: true
	};
	function createMessageToStatusCodeMap(codes2) {
		var map = {};
		Object.keys(codes2).forEach(function forEachCode(code) {
			var message = codes2[code];
			var status3 = Number(code);
			map[message.toLowerCase()] = status3;
		});
		return map;
	}
	function createStatusCodeList(codes2) {
		return Object.keys(codes2).map(function mapCode(code) {
			return Number(code);
		});
	}
	function getStatusCode(message) {
		var msg = message.toLowerCase();
		if (!Object.prototype.hasOwnProperty.call(status2.code, msg)) throw new Error("invalid status message: \"" + message + "\"");
		return status2.code[msg];
	}
	function getStatusMessage(code) {
		if (!Object.prototype.hasOwnProperty.call(status2.message, code)) throw new Error("invalid status code: " + code);
		return status2.message[code];
	}
	function status2(code) {
		if (typeof code === "number") return getStatusMessage(code);
		if (typeof code !== "string") throw new TypeError("code must be a number or string");
		var n = parseInt(code, 10);
		if (!isNaN(n)) return getStatusMessage(n);
		return getStatusCode(code);
	}
} });
var util_stub_exports = {};
__export(util_stub_exports, { inspect: () => inspect });
var inspect;
var init_util_stub = __esm({ "src/util-stub.ts"() {
	inspect = {};
} });
var require_util_inspect = __commonJS({ "../../node_modules/.pnpm/object-inspect@1.13.4/node_modules/object-inspect/util.inspect.js"(exports, module) {
	module.exports = (init_util_stub(), __toCommonJS(util_stub_exports)).inspect;
} });
var require_object_inspect = __commonJS({ "../../node_modules/.pnpm/object-inspect@1.13.4/node_modules/object-inspect/index.js"(exports, module) {
	var hasMap = typeof Map === "function" && Map.prototype;
	var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
	var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
	var mapForEach = hasMap && Map.prototype.forEach;
	var hasSet = typeof Set === "function" && Set.prototype;
	var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
	var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
	var setForEach = hasSet && Set.prototype.forEach;
	var weakMapHas = typeof WeakMap === "function" && WeakMap.prototype ? WeakMap.prototype.has : null;
	var weakSetHas = typeof WeakSet === "function" && WeakSet.prototype ? WeakSet.prototype.has : null;
	var weakRefDeref = typeof WeakRef === "function" && WeakRef.prototype ? WeakRef.prototype.deref : null;
	var booleanValueOf = Boolean.prototype.valueOf;
	var objectToString = Object.prototype.toString;
	var functionToString = Function.prototype.toString;
	var $match = String.prototype.match;
	var $slice = String.prototype.slice;
	var $replace = String.prototype.replace;
	var $toUpperCase = String.prototype.toUpperCase;
	var $toLowerCase = String.prototype.toLowerCase;
	var $test = RegExp.prototype.test;
	var $concat = Array.prototype.concat;
	var $join = Array.prototype.join;
	var $arrSlice = Array.prototype.slice;
	var $floor = Math.floor;
	var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
	var gOPS = Object.getOwnPropertySymbols;
	var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
	var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
	var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
		return O.__proto__;
	} : null);
	function addNumericSeparator(num, str) {
		if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) return str;
		var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
		if (typeof num === "number") {
			var int = num < 0 ? -$floor(-num) : $floor(num);
			if (int !== num) {
				var intStr = String(int);
				var dec = $slice.call(str, intStr.length + 1);
				return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
			}
		}
		return $replace.call(str, sepRegex, "$&_");
	}
	var utilInspect = require_util_inspect();
	var inspectCustom = utilInspect.custom;
	var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
	var quotes = {
		__proto__: null,
		"double": "\"",
		single: "'"
	};
	var quoteREs = {
		__proto__: null,
		"double": /(["\\])/g,
		single: /(['\\])/g
	};
	module.exports = function inspect_(obj, options, depth, seen) {
		var opts = options || {};
		if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) throw new TypeError("option \"quoteStyle\" must be \"single\" or \"double\"");
		if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) throw new TypeError("option \"maxStringLength\", if provided, must be a positive integer, Infinity, or `null`");
		var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
		if (typeof customInspect !== "boolean" && customInspect !== "symbol") throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
		if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) throw new TypeError("option \"indent\" must be \"\\t\", an integer > 0, or `null`");
		if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") throw new TypeError("option \"numericSeparator\", if provided, must be `true` or `false`");
		var numericSeparator = opts.numericSeparator;
		if (typeof obj === "undefined") return "undefined";
		if (obj === null) return "null";
		if (typeof obj === "boolean") return obj ? "true" : "false";
		if (typeof obj === "string") return inspectString(obj, opts);
		if (typeof obj === "number") {
			if (obj === 0) return Infinity / obj > 0 ? "0" : "-0";
			var str = String(obj);
			return numericSeparator ? addNumericSeparator(obj, str) : str;
		}
		if (typeof obj === "bigint") {
			var bigIntStr = String(obj) + "n";
			return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
		}
		var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
		if (typeof depth === "undefined") depth = 0;
		if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") return isArray(obj) ? "[Array]" : "[Object]";
		var indent = getIndent(opts, depth);
		if (typeof seen === "undefined") seen = [];
		else if (indexOf(seen, obj) >= 0) return "[Circular]";
		function inspect3(value, from, noIndent) {
			if (from) {
				seen = $arrSlice.call(seen);
				seen.push(from);
			}
			if (noIndent) {
				var newOpts = { depth: opts.depth };
				if (has(opts, "quoteStyle")) newOpts.quoteStyle = opts.quoteStyle;
				return inspect_(value, newOpts, depth + 1, seen);
			}
			return inspect_(value, opts, depth + 1, seen);
		}
		if (typeof obj === "function" && !isRegExp(obj)) {
			var name = nameOf(obj);
			var keys = arrObjKeys(obj, inspect3);
			return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
		}
		if (isSymbol(obj)) {
			var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
			return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
		}
		if (isElement(obj)) {
			var s = "<" + $toLowerCase.call(String(obj.nodeName));
			var attrs = obj.attributes || [];
			for (var i = 0; i < attrs.length; i++) s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
			s += ">";
			if (obj.childNodes && obj.childNodes.length) s += "...";
			s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
			return s;
		}
		if (isArray(obj)) {
			if (obj.length === 0) return "[]";
			var xs = arrObjKeys(obj, inspect3);
			if (indent && !singleLineValues(xs)) return "[" + indentedJoin(xs, indent) + "]";
			return "[ " + $join.call(xs, ", ") + " ]";
		}
		if (isError(obj)) {
			var parts = arrObjKeys(obj, inspect3);
			if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect3(obj.cause), parts), ", ") + " }";
			if (parts.length === 0) return "[" + String(obj) + "]";
			return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
		}
		if (typeof obj === "object" && customInspect) {
			if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) return utilInspect(obj, { depth: maxDepth - depth });
			else if (customInspect !== "symbol" && typeof obj.inspect === "function") return obj.inspect();
		}
		if (isMap(obj)) {
			var mapParts = [];
			if (mapForEach) mapForEach.call(obj, function(value, key) {
				mapParts.push(inspect3(key, obj, true) + " => " + inspect3(value, obj));
			});
			return collectionOf("Map", mapSize.call(obj), mapParts, indent);
		}
		if (isSet(obj)) {
			var setParts = [];
			if (setForEach) setForEach.call(obj, function(value) {
				setParts.push(inspect3(value, obj));
			});
			return collectionOf("Set", setSize.call(obj), setParts, indent);
		}
		if (isWeakMap(obj)) return weakCollectionOf("WeakMap");
		if (isWeakSet(obj)) return weakCollectionOf("WeakSet");
		if (isWeakRef(obj)) return weakCollectionOf("WeakRef");
		if (isNumber(obj)) return markBoxed(inspect3(Number(obj)));
		if (isBigInt(obj)) return markBoxed(inspect3(bigIntValueOf.call(obj)));
		if (isBoolean(obj)) return markBoxed(booleanValueOf.call(obj));
		if (isString(obj)) return markBoxed(inspect3(String(obj)));
		if (typeof window !== "undefined" && obj === window) return "{ [object Window] }";
		if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) return "{ [object globalThis] }";
		if (!isDate(obj) && !isRegExp(obj)) {
			var ys = arrObjKeys(obj, inspect3);
			var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
			var protoTag = obj instanceof Object ? "" : "null prototype";
			var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
			var tag = (isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "") + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
			if (ys.length === 0) return tag + "{}";
			if (indent) return tag + "{" + indentedJoin(ys, indent) + "}";
			return tag + "{ " + $join.call(ys, ", ") + " }";
		}
		return String(obj);
	};
	function wrapQuotes(s, defaultStyle, opts) {
		var quoteChar = quotes[opts.quoteStyle || defaultStyle];
		return quoteChar + s + quoteChar;
	}
	function quote(s) {
		return $replace.call(String(s), /"/g, "&quot;");
	}
	function canTrustToString(obj) {
		return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
	}
	function isArray(obj) {
		return toStr(obj) === "[object Array]" && canTrustToString(obj);
	}
	function isDate(obj) {
		return toStr(obj) === "[object Date]" && canTrustToString(obj);
	}
	function isRegExp(obj) {
		return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
	}
	function isError(obj) {
		return toStr(obj) === "[object Error]" && canTrustToString(obj);
	}
	function isString(obj) {
		return toStr(obj) === "[object String]" && canTrustToString(obj);
	}
	function isNumber(obj) {
		return toStr(obj) === "[object Number]" && canTrustToString(obj);
	}
	function isBoolean(obj) {
		return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
	}
	function isSymbol(obj) {
		if (hasShammedSymbols) return obj && typeof obj === "object" && obj instanceof Symbol;
		if (typeof obj === "symbol") return true;
		if (!obj || typeof obj !== "object" || !symToString) return false;
		try {
			symToString.call(obj);
			return true;
		} catch (e) {}
		return false;
	}
	function isBigInt(obj) {
		if (!obj || typeof obj !== "object" || !bigIntValueOf) return false;
		try {
			bigIntValueOf.call(obj);
			return true;
		} catch (e) {}
		return false;
	}
	var hasOwn2 = Object.prototype.hasOwnProperty || function(key) {
		return key in this;
	};
	function has(obj, key) {
		return hasOwn2.call(obj, key);
	}
	function toStr(obj) {
		return objectToString.call(obj);
	}
	function nameOf(f) {
		if (f.name) return f.name;
		var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
		if (m) return m[1];
		return null;
	}
	function indexOf(xs, x) {
		if (xs.indexOf) return xs.indexOf(x);
		for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
		return -1;
	}
	function isMap(x) {
		if (!mapSize || !x || typeof x !== "object") return false;
		try {
			mapSize.call(x);
			try {
				setSize.call(x);
			} catch (s) {
				return true;
			}
			return x instanceof Map;
		} catch (e) {}
		return false;
	}
	function isWeakMap(x) {
		if (!weakMapHas || !x || typeof x !== "object") return false;
		try {
			weakMapHas.call(x, weakMapHas);
			try {
				weakSetHas.call(x, weakSetHas);
			} catch (s) {
				return true;
			}
			return x instanceof WeakMap;
		} catch (e) {}
		return false;
	}
	function isWeakRef(x) {
		if (!weakRefDeref || !x || typeof x !== "object") return false;
		try {
			weakRefDeref.call(x);
			return true;
		} catch (e) {}
		return false;
	}
	function isSet(x) {
		if (!setSize || !x || typeof x !== "object") return false;
		try {
			setSize.call(x);
			try {
				mapSize.call(x);
			} catch (m) {
				return true;
			}
			return x instanceof Set;
		} catch (e) {}
		return false;
	}
	function isWeakSet(x) {
		if (!weakSetHas || !x || typeof x !== "object") return false;
		try {
			weakSetHas.call(x, weakSetHas);
			try {
				weakMapHas.call(x, weakMapHas);
			} catch (s) {
				return true;
			}
			return x instanceof WeakSet;
		} catch (e) {}
		return false;
	}
	function isElement(x) {
		if (!x || typeof x !== "object") return false;
		if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) return true;
		return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
	}
	function inspectString(str, opts) {
		if (str.length > opts.maxStringLength) {
			var remaining = str.length - opts.maxStringLength;
			var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
			return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
		}
		var quoteRE = quoteREs[opts.quoteStyle || "single"];
		quoteRE.lastIndex = 0;
		return wrapQuotes($replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte), "single", opts);
	}
	function lowbyte(c) {
		var n = c.charCodeAt(0);
		var x = {
			8: "b",
			9: "t",
			10: "n",
			12: "f",
			13: "r"
		}[n];
		if (x) return "\\" + x;
		return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
	}
	function markBoxed(str) {
		return "Object(" + str + ")";
	}
	function weakCollectionOf(type) {
		return type + " { ? }";
	}
	function collectionOf(type, size, entries, indent) {
		var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
		return type + " (" + size + ") {" + joinedEntries + "}";
	}
	function singleLineValues(xs) {
		for (var i = 0; i < xs.length; i++) if (indexOf(xs[i], "\n") >= 0) return false;
		return true;
	}
	function getIndent(opts, depth) {
		var baseIndent;
		if (opts.indent === "	") baseIndent = "	";
		else if (typeof opts.indent === "number" && opts.indent > 0) baseIndent = $join.call(Array(opts.indent + 1), " ");
		else return null;
		return {
			base: baseIndent,
			prev: $join.call(Array(depth + 1), baseIndent)
		};
	}
	function indentedJoin(xs, indent) {
		if (xs.length === 0) return "";
		var lineJoiner = "\n" + indent.prev + indent.base;
		return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
	}
	function arrObjKeys(obj, inspect3) {
		var isArr = isArray(obj);
		var xs = [];
		if (isArr) {
			xs.length = obj.length;
			for (var i = 0; i < obj.length; i++) xs[i] = has(obj, i) ? inspect3(obj[i], obj) : "";
		}
		var syms = typeof gOPS === "function" ? gOPS(obj) : [];
		var symMap;
		if (hasShammedSymbols) {
			symMap = {};
			for (var k = 0; k < syms.length; k++) symMap["$" + syms[k]] = syms[k];
		}
		for (var key in obj) {
			if (!has(obj, key)) continue;
			if (isArr && String(Number(key)) === key && key < obj.length) continue;
			if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) continue;
			else if ($test.call(/[^\w$]/, key)) xs.push(inspect3(key, obj) + ": " + inspect3(obj[key], obj));
			else xs.push(key + ": " + inspect3(obj[key], obj));
		}
		if (typeof gOPS === "function") {
			for (var j = 0; j < syms.length; j++) if (isEnumerable.call(obj, syms[j])) xs.push("[" + inspect3(syms[j]) + "]: " + inspect3(obj[syms[j]], obj));
		}
		return xs;
	}
} });
var TimeDuration = class _TimeDuration {
	__time_duration_micros__;
	static MICROS_PER_MILLIS = 1000n;
	/**
	* Get the algebraic type representation of the {@link TimeDuration} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__time_duration_micros__",
			algebraicType: AlgebraicType.I64
		}] });
	}
	static isTimeDuration(algebraicType) {
		if (algebraicType.tag !== "Product") return false;
		const elements = algebraicType.value.elements;
		if (elements.length !== 1) return false;
		const microsElement = elements[0];
		return microsElement.name === "__time_duration_micros__" && microsElement.algebraicType.tag === "I64";
	}
	get micros() {
		return this.__time_duration_micros__;
	}
	get millis() {
		return Number(this.micros / _TimeDuration.MICROS_PER_MILLIS);
	}
	constructor(micros) {
		this.__time_duration_micros__ = micros;
	}
	static fromMillis(millis) {
		return new _TimeDuration(BigInt(millis) * _TimeDuration.MICROS_PER_MILLIS);
	}
	/** This outputs the same string format that we use in the host and in Rust modules */
	toString() {
		const micros = this.micros;
		const sign = micros < 0 ? "-" : "+";
		const pos = micros < 0 ? -micros : micros;
		const secs = pos / 1000000n;
		const micros_remaining = pos % 1000000n;
		return `${sign}${secs}.${String(micros_remaining).padStart(6, "0")}`;
	}
};
var Timestamp = class _Timestamp {
	__timestamp_micros_since_unix_epoch__;
	static MICROS_PER_MILLIS = 1000n;
	get microsSinceUnixEpoch() {
		return this.__timestamp_micros_since_unix_epoch__;
	}
	constructor(micros) {
		this.__timestamp_micros_since_unix_epoch__ = micros;
	}
	/**
	* Get the algebraic type representation of the {@link Timestamp} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__timestamp_micros_since_unix_epoch__",
			algebraicType: AlgebraicType.I64
		}] });
	}
	static isTimestamp(algebraicType) {
		if (algebraicType.tag !== "Product") return false;
		const elements = algebraicType.value.elements;
		if (elements.length !== 1) return false;
		const microsElement = elements[0];
		return microsElement.name === "__timestamp_micros_since_unix_epoch__" && microsElement.algebraicType.tag === "I64";
	}
	/**
	* The Unix epoch, the midnight at the beginning of January 1, 1970, UTC.
	*/
	static UNIX_EPOCH = new _Timestamp(0n);
	/**
	* Get a `Timestamp` representing the execution environment's belief of the current moment in time.
	*/
	static now() {
		return _Timestamp.fromDate(/* @__PURE__ */ new Date());
	}
	/** Convert to milliseconds since Unix epoch. */
	toMillis() {
		return this.microsSinceUnixEpoch / 1000n;
	}
	/**
	* Get a `Timestamp` representing the same point in time as `date`.
	*/
	static fromDate(date) {
		const millis = date.getTime();
		return new _Timestamp(BigInt(millis) * _Timestamp.MICROS_PER_MILLIS);
	}
	/**
	* Get a `Date` representing approximately the same point in time as `this`.
	*
	* This method truncates to millisecond precision,
	* and throws `RangeError` if the `Timestamp` is outside the range representable as a `Date`.
	*/
	toDate() {
		const millis = this.__timestamp_micros_since_unix_epoch__ / _Timestamp.MICROS_PER_MILLIS;
		if (millis > BigInt(Number.MAX_SAFE_INTEGER) || millis < BigInt(Number.MIN_SAFE_INTEGER)) throw new RangeError("Timestamp is outside of the representable range of JS's Date");
		return new Date(Number(millis));
	}
	/**
	* Get an ISO 8601 / RFC 3339 formatted string representation of this timestamp with microsecond precision.
	*
	* This method preserves the full microsecond precision of the timestamp,
	* and throws `RangeError` if the `Timestamp` is outside the range representable in ISO format.
	*
	* @returns ISO 8601 formatted string with microsecond precision (e.g., '2025-02-17T10:30:45.123456Z')
	*/
	toISOString() {
		const micros = this.__timestamp_micros_since_unix_epoch__;
		const millis = micros / _Timestamp.MICROS_PER_MILLIS;
		if (millis > BigInt(Number.MAX_SAFE_INTEGER) || millis < BigInt(Number.MIN_SAFE_INTEGER)) throw new RangeError("Timestamp is outside of the representable range for ISO string formatting");
		const isoBase = new Date(Number(millis)).toISOString();
		const microsRemainder = Math.abs(Number(micros % 1000000n));
		const fractionalPart = String(microsRemainder).padStart(6, "0");
		return isoBase.replace(/\.\d{3}Z$/, `.${fractionalPart}Z`);
	}
	since(other) {
		return new TimeDuration(this.__timestamp_micros_since_unix_epoch__ - other.__timestamp_micros_since_unix_epoch__);
	}
};
var Uuid = class _Uuid {
	__uuid__;
	/**
	* The nil UUID (all zeros).
	*
	* @example
	* ```ts
	* const uuid = Uuid.NIL;
	* console.assert(
	*   uuid.toString() === "00000000-0000-0000-0000-000000000000"
	* );
	* ```
	*/
	static NIL = new _Uuid(0n);
	static MAX_UUID_BIGINT = 340282366920938463463374607431768211455n;
	/**
	* The max UUID (all ones).
	*
	* @example
	* ```ts
	* const uuid = Uuid.MAX;
	* console.assert(
	*   uuid.toString() === "ffffffff-ffff-ffff-ffff-ffffffffffff"
	* );
	* ```
	*/
	static MAX = new _Uuid(_Uuid.MAX_UUID_BIGINT);
	/**
	* Create a UUID from a raw 128-bit value.
	*
	* @param u - Unsigned 128-bit integer
	* @throws {Error} If the value is outside the valid UUID range
	*/
	constructor(u) {
		if (u < 0n || u > _Uuid.MAX_UUID_BIGINT) throw new Error("Invalid UUID: must be between 0 and `MAX_UUID_BIGINT`");
		this.__uuid__ = u;
	}
	/**
	* Create a UUID `v4` from explicit random bytes.
	*
	* This method assumes the bytes are already sufficiently random.
	* It only sets the appropriate bits for the UUID version and variant.
	*
	* @param bytes - Exactly 16 random bytes
	* @returns A UUID `v4`
	* @throws {Error} If `bytes.length !== 16`
	*
	* @example
	* ```ts
	* const randomBytes = new Uint8Array(16);
	* const uuid = Uuid.fromRandomBytesV4(randomBytes);
	*
	* console.assert(
	*   uuid.toString() === "00000000-0000-4000-8000-000000000000"
	* );
	* ```
	*/
	static fromRandomBytesV4(bytes) {
		if (bytes.length !== 16) throw new Error("UUID v4 requires 16 bytes");
		const arr = new Uint8Array(bytes);
		arr[6] = arr[6] & 15 | 64;
		arr[8] = arr[8] & 63 | 128;
		return new _Uuid(_Uuid.bytesToBigInt(arr));
	}
	/**
	* Generate a UUID `v7` using a monotonic counter from `0` to `2^31 - 1`,
	* a timestamp, and 4 random bytes.
	*
	* The counter wraps around on overflow.
	*
	* The UUID `v7` is structured as follows:
	*
	* ```ascii
	* ┌───────────────────────────────────────────────┬───────────────────┐
	* | B0  | B1  | B2  | B3  | B4  | B5              |         B6        |
	* ├───────────────────────────────────────────────┼───────────────────┤
	* |                 unix_ts_ms                    |      version 7    |
	* └───────────────────────────────────────────────┴───────────────────┘
	* ┌──────────────┬─────────┬──────────────────┬───────────────────────┐
	* | B7           | B8      | B9  | B10 | B11  | B12 | B13 | B14 | B15 |
	* ├──────────────┼─────────┼──────────────────┼───────────────────────┤
	* | counter_high | variant |    counter_low   |        random         |
	* └──────────────┴─────────┴──────────────────┴───────────────────────┘
	* ```
	*
	* @param counter - Mutable monotonic counter (31-bit)
	* @param now - Timestamp since the Unix epoch
	* @param randomBytes - Exactly 4 random bytes
	* @returns A UUID `v7`
	*
	* @throws {Error} If the `counter` is negative
	* @throws {Error} If the `timestamp` is before the Unix epoch
	* @throws {Error} If `randomBytes.length !== 4`
	*
	* @example
	* ```ts
	* const now = Timestamp.fromMillis(1_686_000_000_000n);
	* const counter = { value: 1 };
	* const randomBytes = new Uint8Array(4);
	*
	* const uuid = Uuid.fromCounterV7(counter, now, randomBytes);
	*
	* console.assert(
	*   uuid.toString() === "0000647e-5180-7000-8000-000200000000"
	* );
	* ```
	*/
	static fromCounterV7(counter, now, randomBytes) {
		if (randomBytes.length !== 4) throw new Error("`fromCounterV7` requires `randomBytes.length == 4`");
		if (counter.value < 0) throw new Error("`fromCounterV7` uuid `counter` must be non-negative");
		if (now.__timestamp_micros_since_unix_epoch__ < 0) throw new Error("`fromCounterV7` `timestamp` before unix epoch");
		const counterVal = counter.value;
		counter.value = counterVal + 1 & 2147483647;
		const tsMs = now.toMillis() & 281474976710655n;
		const bytes = new Uint8Array(16);
		bytes[0] = Number(tsMs >> 40n & 255n);
		bytes[1] = Number(tsMs >> 32n & 255n);
		bytes[2] = Number(tsMs >> 24n & 255n);
		bytes[3] = Number(tsMs >> 16n & 255n);
		bytes[4] = Number(tsMs >> 8n & 255n);
		bytes[5] = Number(tsMs & 255n);
		bytes[7] = counterVal >>> 23 & 255;
		bytes[9] = counterVal >>> 15 & 255;
		bytes[10] = counterVal >>> 7 & 255;
		bytes[11] = (counterVal & 127) << 1 & 255;
		bytes[12] |= randomBytes[0] & 127;
		bytes[13] = randomBytes[1];
		bytes[14] = randomBytes[2];
		bytes[15] = randomBytes[3];
		bytes[6] = bytes[6] & 15 | 112;
		bytes[8] = bytes[8] & 63 | 128;
		return new _Uuid(_Uuid.bytesToBigInt(bytes));
	}
	/**
	* Parse a UUID from a string representation.
	*
	* @param s - UUID string
	* @returns Parsed UUID
	* @throws {Error} If the string is not a valid UUID
	*
	* @example
	* ```ts
	* const s = "01888d6e-5c00-7000-8000-000000000000";
	* const uuid = Uuid.parse(s);
	*
	* console.assert(uuid.toString() === s);
	* ```
	*/
	static parse(s) {
		const hex = s.replace(/-/g, "");
		if (hex.length !== 32) throw new Error("Invalid hex UUID");
		let v = 0n;
		for (let i = 0; i < 32; i += 2) v = v << 8n | BigInt(parseInt(hex.slice(i, i + 2), 16));
		return new _Uuid(v);
	}
	/** Convert to string (hyphenated form). */
	toString() {
		const hex = [..._Uuid.bigIntToBytes(this.__uuid__)].map((b) => b.toString(16).padStart(2, "0")).join("");
		return hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-" + hex.slice(12, 16) + "-" + hex.slice(16, 20) + "-" + hex.slice(20);
	}
	/** Convert to bigint (u128). */
	asBigInt() {
		return this.__uuid__;
	}
	/** Return a `Uint8Array` of 16 bytes. */
	toBytes() {
		return _Uuid.bigIntToBytes(this.__uuid__);
	}
	static bytesToBigInt(bytes) {
		let result = 0n;
		for (const b of bytes) result = result << 8n | BigInt(b);
		return result;
	}
	static bigIntToBytes(value) {
		const bytes = new Uint8Array(16);
		for (let i = 15; i >= 0; i--) {
			bytes[i] = Number(value & 255n);
			value >>= 8n;
		}
		return bytes;
	}
	/**
	* Returns the version of this UUID.
	*
	* This represents the algorithm used to generate the value.
	*
	* @returns A `UuidVersion`
	* @throws {Error} If the version field is not recognized
	*/
	getVersion() {
		const version = this.toBytes()[6] >> 4 & 15;
		switch (version) {
			case 4: return "V4";
			case 7: return "V7";
			default:
				if (this == _Uuid.NIL) return "Nil";
				if (this == _Uuid.MAX) return "Max";
				throw new Error(`Unsupported UUID version: ${version}`);
		}
	}
	/**
	* Extract the monotonic counter from a UUIDv7.
	*
	* Intended for testing and diagnostics.
	* Behavior is undefined if called on a non-V7 UUID.
	*
	* @returns 31-bit counter value
	*/
	getCounter() {
		const bytes = this.toBytes();
		const high = bytes[7];
		const mid1 = bytes[9];
		const mid2 = bytes[10];
		const low = bytes[11] >>> 1;
		return high << 23 | mid1 << 15 | mid2 << 7 | low | 0;
	}
	compareTo(other) {
		if (this.__uuid__ < other.__uuid__) return -1;
		if (this.__uuid__ > other.__uuid__) return 1;
		return 0;
	}
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__uuid__",
			algebraicType: AlgebraicType.U128
		}] });
	}
};
var BinaryReader = class {
	/**
	* The DataView used to read values from the binary data.
	*
	* Note: The DataView's `byteOffset` is relative to the beginning of the
	* underlying ArrayBuffer, not the start of the provided Uint8Array input.
	* This `BinaryReader`'s `#offset` field is used to track the current read position
	* relative to the start of the provided Uint8Array input.
	*/
	view;
	/**
	* Represents the offset (in bytes) relative to the start of the DataView
	* and provided Uint8Array input.
	*
	* Note: This is *not* the absolute byte offset within the underlying ArrayBuffer.
	*/
	offset = 0;
	constructor(input) {
		this.view = input instanceof DataView ? input : new DataView(input.buffer, input.byteOffset, input.byteLength);
		this.offset = 0;
	}
	reset(view) {
		this.view = view;
		this.offset = 0;
	}
	get remaining() {
		return this.view.byteLength - this.offset;
	}
	/** Ensure we have at least `n` bytes left to read */
	#ensure(n) {
		if (this.offset + n > this.view.byteLength) throw new RangeError(`Tried to read ${n} byte(s) at relative offset ${this.offset}, but only ${this.remaining} byte(s) remain`);
	}
	readUInt8Array() {
		const length = this.readU32();
		this.#ensure(length);
		return this.readBytes(length);
	}
	readBool() {
		const value = this.view.getUint8(this.offset);
		this.offset += 1;
		return value !== 0;
	}
	readByte() {
		const value = this.view.getUint8(this.offset);
		this.offset += 1;
		return value;
	}
	readBytes(length) {
		const array = new Uint8Array(this.view.buffer, this.view.byteOffset + this.offset, length);
		this.offset += length;
		return array;
	}
	readI8() {
		const value = this.view.getInt8(this.offset);
		this.offset += 1;
		return value;
	}
	readU8() {
		return this.readByte();
	}
	readI16() {
		const value = this.view.getInt16(this.offset, true);
		this.offset += 2;
		return value;
	}
	readU16() {
		const value = this.view.getUint16(this.offset, true);
		this.offset += 2;
		return value;
	}
	readI32() {
		const value = this.view.getInt32(this.offset, true);
		this.offset += 4;
		return value;
	}
	readU32() {
		const value = this.view.getUint32(this.offset, true);
		this.offset += 4;
		return value;
	}
	readI64() {
		const value = this.view.getBigInt64(this.offset, true);
		this.offset += 8;
		return value;
	}
	readU64() {
		const value = this.view.getBigUint64(this.offset, true);
		this.offset += 8;
		return value;
	}
	readU128() {
		const lowerPart = this.view.getBigUint64(this.offset, true);
		const upperPart = this.view.getBigUint64(this.offset + 8, true);
		this.offset += 16;
		return (upperPart << BigInt(64)) + lowerPart;
	}
	readI128() {
		const lowerPart = this.view.getBigUint64(this.offset, true);
		const upperPart = this.view.getBigInt64(this.offset + 8, true);
		this.offset += 16;
		return (upperPart << BigInt(64)) + lowerPart;
	}
	readU256() {
		const p0 = this.view.getBigUint64(this.offset, true);
		const p1 = this.view.getBigUint64(this.offset + 8, true);
		const p2 = this.view.getBigUint64(this.offset + 16, true);
		const p3 = this.view.getBigUint64(this.offset + 24, true);
		this.offset += 32;
		return (p3 << BigInt(192)) + (p2 << BigInt(128)) + (p1 << BigInt(64)) + p0;
	}
	readI256() {
		const p0 = this.view.getBigUint64(this.offset, true);
		const p1 = this.view.getBigUint64(this.offset + 8, true);
		const p2 = this.view.getBigUint64(this.offset + 16, true);
		const p3 = this.view.getBigInt64(this.offset + 24, true);
		this.offset += 32;
		return (p3 << BigInt(192)) + (p2 << BigInt(128)) + (p1 << BigInt(64)) + p0;
	}
	readF32() {
		const value = this.view.getFloat32(this.offset, true);
		this.offset += 4;
		return value;
	}
	readF64() {
		const value = this.view.getFloat64(this.offset, true);
		this.offset += 8;
		return value;
	}
	readString() {
		const uint8Array = this.readUInt8Array();
		return new TextDecoder("utf-8").decode(uint8Array);
	}
};
var import_base64_js = __toESM(require_base64_js());
var ArrayBufferPrototypeTransfer = ArrayBuffer.prototype.transfer ?? function(newByteLength) {
	if (newByteLength === void 0) return this.slice();
	else if (newByteLength <= this.byteLength) return this.slice(0, newByteLength);
	else {
		const copy = new Uint8Array(newByteLength);
		copy.set(new Uint8Array(this));
		return copy.buffer;
	}
};
var ResizableBuffer = class {
	buffer;
	view;
	constructor(init) {
		this.buffer = typeof init === "number" ? new ArrayBuffer(init) : init;
		this.view = new DataView(this.buffer);
	}
	get capacity() {
		return this.buffer.byteLength;
	}
	grow(newSize) {
		if (newSize <= this.buffer.byteLength) return;
		this.buffer = ArrayBufferPrototypeTransfer.call(this.buffer, newSize);
		this.view = new DataView(this.buffer);
	}
};
var BinaryWriter = class {
	buffer;
	offset = 0;
	constructor(init) {
		this.buffer = typeof init === "number" ? new ResizableBuffer(init) : init;
	}
	clear() {
		this.offset = 0;
	}
	reset(buffer) {
		this.buffer = buffer;
		this.offset = 0;
	}
	expandBuffer(additionalCapacity) {
		const minCapacity = this.offset + additionalCapacity + 1;
		if (minCapacity <= this.buffer.capacity) return;
		let newCapacity = this.buffer.capacity * 2;
		if (newCapacity < minCapacity) newCapacity = minCapacity;
		this.buffer.grow(newCapacity);
	}
	toBase64() {
		return (0, import_base64_js.fromByteArray)(this.getBuffer());
	}
	getBuffer() {
		return new Uint8Array(this.buffer.buffer, 0, this.offset);
	}
	get view() {
		return this.buffer.view;
	}
	writeUInt8Array(value) {
		const length = value.length;
		this.expandBuffer(4 + length);
		this.writeU32(length);
		new Uint8Array(this.buffer.buffer, this.offset).set(value);
		this.offset += length;
	}
	writeBool(value) {
		this.expandBuffer(1);
		this.view.setUint8(this.offset, value ? 1 : 0);
		this.offset += 1;
	}
	writeByte(value) {
		this.expandBuffer(1);
		this.view.setUint8(this.offset, value);
		this.offset += 1;
	}
	writeI8(value) {
		this.expandBuffer(1);
		this.view.setInt8(this.offset, value);
		this.offset += 1;
	}
	writeU8(value) {
		this.expandBuffer(1);
		this.view.setUint8(this.offset, value);
		this.offset += 1;
	}
	writeI16(value) {
		this.expandBuffer(2);
		this.view.setInt16(this.offset, value, true);
		this.offset += 2;
	}
	writeU16(value) {
		this.expandBuffer(2);
		this.view.setUint16(this.offset, value, true);
		this.offset += 2;
	}
	writeI32(value) {
		this.expandBuffer(4);
		this.view.setInt32(this.offset, value, true);
		this.offset += 4;
	}
	writeU32(value) {
		this.expandBuffer(4);
		this.view.setUint32(this.offset, value, true);
		this.offset += 4;
	}
	writeI64(value) {
		this.expandBuffer(8);
		this.view.setBigInt64(this.offset, value, true);
		this.offset += 8;
	}
	writeU64(value) {
		this.expandBuffer(8);
		this.view.setBigUint64(this.offset, value, true);
		this.offset += 8;
	}
	writeU128(value) {
		this.expandBuffer(16);
		const lowerPart = value & BigInt("0xFFFFFFFFFFFFFFFF");
		const upperPart = value >> BigInt(64);
		this.view.setBigUint64(this.offset, lowerPart, true);
		this.view.setBigUint64(this.offset + 8, upperPart, true);
		this.offset += 16;
	}
	writeI128(value) {
		this.expandBuffer(16);
		const lowerPart = value & BigInt("0xFFFFFFFFFFFFFFFF");
		const upperPart = value >> BigInt(64);
		this.view.setBigInt64(this.offset, lowerPart, true);
		this.view.setBigInt64(this.offset + 8, upperPart, true);
		this.offset += 16;
	}
	writeU256(value) {
		this.expandBuffer(32);
		const low_64_mask = BigInt("0xFFFFFFFFFFFFFFFF");
		const p0 = value & low_64_mask;
		const p1 = value >> BigInt(64) & low_64_mask;
		const p2 = value >> BigInt(128) & low_64_mask;
		const p3 = value >> BigInt(192);
		this.view.setBigUint64(this.offset + 0, p0, true);
		this.view.setBigUint64(this.offset + 8, p1, true);
		this.view.setBigUint64(this.offset + 16, p2, true);
		this.view.setBigUint64(this.offset + 24, p3, true);
		this.offset += 32;
	}
	writeI256(value) {
		this.expandBuffer(32);
		const low_64_mask = BigInt("0xFFFFFFFFFFFFFFFF");
		const p0 = value & low_64_mask;
		const p1 = value >> BigInt(64) & low_64_mask;
		const p2 = value >> BigInt(128) & low_64_mask;
		const p3 = value >> BigInt(192);
		this.view.setBigUint64(this.offset + 0, p0, true);
		this.view.setBigUint64(this.offset + 8, p1, true);
		this.view.setBigUint64(this.offset + 16, p2, true);
		this.view.setBigInt64(this.offset + 24, p3, true);
		this.offset += 32;
	}
	writeF32(value) {
		this.expandBuffer(4);
		this.view.setFloat32(this.offset, value, true);
		this.offset += 4;
	}
	writeF64(value) {
		this.expandBuffer(8);
		this.view.setFloat64(this.offset, value, true);
		this.offset += 8;
	}
	writeString(value) {
		const encodedString = new TextEncoder().encode(value);
		this.writeUInt8Array(encodedString);
	}
};
function uint8ArrayToHexString(array) {
	return Array.prototype.map.call(array.reverse(), (x) => ("00" + x.toString(16)).slice(-2)).join("");
}
function uint8ArrayToU128(array) {
	if (array.length != 16) throw new Error(`Uint8Array is not 16 bytes long: ${array}`);
	return new BinaryReader(array).readU128();
}
function uint8ArrayToU256(array) {
	if (array.length != 32) throw new Error(`Uint8Array is not 32 bytes long: [${array}]`);
	return new BinaryReader(array).readU256();
}
function hexStringToUint8Array(str) {
	if (str.startsWith("0x")) str = str.slice(2);
	const matches = str.match(/.{1,2}/g) || [];
	return Uint8Array.from(matches.map((byte) => parseInt(byte, 16))).reverse();
}
function hexStringToU128(str) {
	return uint8ArrayToU128(hexStringToUint8Array(str));
}
function hexStringToU256(str) {
	return uint8ArrayToU256(hexStringToUint8Array(str));
}
function u128ToUint8Array(data) {
	const writer = new BinaryWriter(16);
	writer.writeU128(data);
	return writer.getBuffer();
}
function u128ToHexString(data) {
	return uint8ArrayToHexString(u128ToUint8Array(data));
}
function u256ToUint8Array(data) {
	const writer = new BinaryWriter(32);
	writer.writeU256(data);
	return writer.getBuffer();
}
function u256ToHexString(data) {
	return uint8ArrayToHexString(u256ToUint8Array(data));
}
function toPascalCase(s) {
	const str = toCamelCase(s);
	return str.charAt(0).toUpperCase() + str.slice(1);
}
function toCamelCase(s) {
	const str = s.replace(/[-_]+/g, "_").replace(/_([a-zA-Z0-9])/g, (_, c) => c.toUpperCase());
	return str.charAt(0).toLowerCase() + str.slice(1);
}
function bsatnBaseSize(typespace, ty) {
	const assumedArrayLength = 4;
	while (ty.tag === "Ref") ty = typespace.types[ty.value];
	if (ty.tag === "Product") {
		let sum = 0;
		for (const { algebraicType: elem } of ty.value.elements) sum += bsatnBaseSize(typespace, elem);
		return sum;
	} else if (ty.tag === "Sum") {
		let min = Infinity;
		for (const { algebraicType: vari } of ty.value.variants) {
			const vSize = bsatnBaseSize(typespace, vari);
			if (vSize < min) min = vSize;
		}
		if (min === Infinity) min = 0;
		return 4 + min;
	} else if (ty.tag == "Array") return 4 + assumedArrayLength * bsatnBaseSize(typespace, ty.value);
	return {
		String: 4 + assumedArrayLength,
		Sum: 1,
		Bool: 1,
		I8: 1,
		U8: 1,
		I16: 2,
		U16: 2,
		I32: 4,
		U32: 4,
		F32: 4,
		I64: 8,
		U64: 8,
		F64: 8,
		I128: 16,
		U128: 16,
		I256: 32,
		U256: 32
	}[ty.tag];
}
var hasOwn = Object.hasOwn;
var ConnectionId = class _ConnectionId {
	__connection_id__;
	/**
	* Creates a new `ConnectionId`.
	*/
	constructor(data) {
		this.__connection_id__ = data;
	}
	/**
	* Get the algebraic type representation of the {@link ConnectionId} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__connection_id__",
			algebraicType: AlgebraicType.U128
		}] });
	}
	isZero() {
		return this.__connection_id__ === BigInt(0);
	}
	static nullIfZero(addr) {
		if (addr.isZero()) return null;
		else return addr;
	}
	static random() {
		function randomU8() {
			return Math.floor(Math.random() * 255);
		}
		let result = BigInt(0);
		for (let i = 0; i < 16; i++) result = result << BigInt(8) | BigInt(randomU8());
		return new _ConnectionId(result);
	}
	/**
	* Compare two connection IDs for equality.
	*/
	isEqual(other) {
		return this.__connection_id__ == other.__connection_id__;
	}
	/**
	* Check if two connection IDs are equal.
	*/
	equals(other) {
		return this.isEqual(other);
	}
	/**
	* Print the connection ID as a hexadecimal string.
	*/
	toHexString() {
		return u128ToHexString(this.__connection_id__);
	}
	/**
	* Convert the connection ID to a Uint8Array.
	*/
	toUint8Array() {
		return u128ToUint8Array(this.__connection_id__);
	}
	/**
	* Parse a connection ID from a hexadecimal string.
	*/
	static fromString(str) {
		return new _ConnectionId(hexStringToU128(str));
	}
	static fromStringOrNull(str) {
		const addr = _ConnectionId.fromString(str);
		if (addr.isZero()) return null;
		else return addr;
	}
};
var Identity = class _Identity {
	__identity__;
	/**
	* Creates a new `Identity`.
	*
	* `data` can be a hexadecimal string or a `bigint`.
	*/
	constructor(data) {
		this.__identity__ = typeof data === "string" ? hexStringToU256(data) : data;
	}
	/**
	* Get the algebraic type representation of the {@link Identity} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__identity__",
			algebraicType: AlgebraicType.U256
		}] });
	}
	/**
	* Check if two identities are equal.
	*/
	isEqual(other) {
		return this.toHexString() === other.toHexString();
	}
	/**
	* Check if two identities are equal.
	*/
	equals(other) {
		return this.isEqual(other);
	}
	/**
	* Print the identity as a hexadecimal string.
	*/
	toHexString() {
		return u256ToHexString(this.__identity__);
	}
	/**
	* Convert the address to a Uint8Array.
	*/
	toUint8Array() {
		return u256ToUint8Array(this.__identity__);
	}
	/**
	* Parse an Identity from a hexadecimal string.
	*/
	static fromString(str) {
		return new _Identity(str);
	}
	/**
	* Zero identity (0x0000000000000000000000000000000000000000000000000000000000000000)
	*/
	static zero() {
		return new _Identity(0n);
	}
	toString() {
		return this.toHexString();
	}
};
var SERIALIZERS = /* @__PURE__ */ new Map();
var DESERIALIZERS = /* @__PURE__ */ new Map();
var AlgebraicType = {
	Ref: (value) => ({
		tag: "Ref",
		value
	}),
	Sum: (value) => ({
		tag: "Sum",
		value
	}),
	Product: (value) => ({
		tag: "Product",
		value
	}),
	Array: (value) => ({
		tag: "Array",
		value
	}),
	String: { tag: "String" },
	Bool: { tag: "Bool" },
	I8: { tag: "I8" },
	U8: { tag: "U8" },
	I16: { tag: "I16" },
	U16: { tag: "U16" },
	I32: { tag: "I32" },
	U32: { tag: "U32" },
	I64: { tag: "I64" },
	U64: { tag: "U64" },
	I128: { tag: "I128" },
	U128: { tag: "U128" },
	I256: { tag: "I256" },
	U256: { tag: "U256" },
	F32: { tag: "F32" },
	F64: { tag: "F64" },
	makeSerializer(ty, typespace) {
		if (ty.tag === "Ref") {
			if (!typespace) throw new Error("cannot serialize refs without a typespace");
			while (ty.tag === "Ref") ty = typespace.types[ty.value];
		}
		switch (ty.tag) {
			case "Product": return ProductType.makeSerializer(ty.value, typespace);
			case "Sum": return SumType.makeSerializer(ty.value, typespace);
			case "Array": if (ty.value.tag === "U8") return serializeUint8Array;
			else {
				const serialize = AlgebraicType.makeSerializer(ty.value, typespace);
				return (writer, value) => {
					writer.writeU32(value.length);
					for (const elem of value) serialize(writer, elem);
				};
			}
			default: return primitiveSerializers[ty.tag];
		}
	},
	serializeValue(writer, ty, value, typespace) {
		AlgebraicType.makeSerializer(ty, typespace)(writer, value);
	},
	makeDeserializer(ty, typespace) {
		if (ty.tag === "Ref") {
			if (!typespace) throw new Error("cannot deserialize refs without a typespace");
			while (ty.tag === "Ref") ty = typespace.types[ty.value];
		}
		switch (ty.tag) {
			case "Product": return ProductType.makeDeserializer(ty.value, typespace);
			case "Sum": return SumType.makeDeserializer(ty.value, typespace);
			case "Array": if (ty.value.tag === "U8") return deserializeUint8Array;
			else {
				const deserialize = AlgebraicType.makeDeserializer(ty.value, typespace);
				return (reader) => {
					const length = reader.readU32();
					const result = Array(length);
					for (let i = 0; i < length; i++) result[i] = deserialize(reader);
					return result;
				};
			}
			default: return primitiveDeserializers[ty.tag];
		}
	},
	deserializeValue(reader, ty, typespace) {
		return AlgebraicType.makeDeserializer(ty, typespace)(reader);
	},
	intoMapKey: function(ty, value) {
		switch (ty.tag) {
			case "U8":
			case "U16":
			case "U32":
			case "U64":
			case "U128":
			case "U256":
			case "I8":
			case "I16":
			case "I32":
			case "I64":
			case "I128":
			case "I256":
			case "F32":
			case "F64":
			case "String":
			case "Bool": return value;
			case "Product": return ProductType.intoMapKey(ty.value, value);
			default: {
				const writer = new BinaryWriter(10);
				AlgebraicType.serializeValue(writer, ty, value);
				return writer.toBase64();
			}
		}
	}
};
function bindCall(f) {
	return Function.prototype.call.bind(f);
}
var primitiveSerializers = {
	Bool: bindCall(BinaryWriter.prototype.writeBool),
	I8: bindCall(BinaryWriter.prototype.writeI8),
	U8: bindCall(BinaryWriter.prototype.writeU8),
	I16: bindCall(BinaryWriter.prototype.writeI16),
	U16: bindCall(BinaryWriter.prototype.writeU16),
	I32: bindCall(BinaryWriter.prototype.writeI32),
	U32: bindCall(BinaryWriter.prototype.writeU32),
	I64: bindCall(BinaryWriter.prototype.writeI64),
	U64: bindCall(BinaryWriter.prototype.writeU64),
	I128: bindCall(BinaryWriter.prototype.writeI128),
	U128: bindCall(BinaryWriter.prototype.writeU128),
	I256: bindCall(BinaryWriter.prototype.writeI256),
	U256: bindCall(BinaryWriter.prototype.writeU256),
	F32: bindCall(BinaryWriter.prototype.writeF32),
	F64: bindCall(BinaryWriter.prototype.writeF64),
	String: bindCall(BinaryWriter.prototype.writeString)
};
Object.freeze(primitiveSerializers);
var serializeUint8Array = bindCall(BinaryWriter.prototype.writeUInt8Array);
var primitiveDeserializers = {
	Bool: bindCall(BinaryReader.prototype.readBool),
	I8: bindCall(BinaryReader.prototype.readI8),
	U8: bindCall(BinaryReader.prototype.readU8),
	I16: bindCall(BinaryReader.prototype.readI16),
	U16: bindCall(BinaryReader.prototype.readU16),
	I32: bindCall(BinaryReader.prototype.readI32),
	U32: bindCall(BinaryReader.prototype.readU32),
	I64: bindCall(BinaryReader.prototype.readI64),
	U64: bindCall(BinaryReader.prototype.readU64),
	I128: bindCall(BinaryReader.prototype.readI128),
	U128: bindCall(BinaryReader.prototype.readU128),
	I256: bindCall(BinaryReader.prototype.readI256),
	U256: bindCall(BinaryReader.prototype.readU256),
	F32: bindCall(BinaryReader.prototype.readF32),
	F64: bindCall(BinaryReader.prototype.readF64),
	String: bindCall(BinaryReader.prototype.readString)
};
Object.freeze(primitiveDeserializers);
var deserializeUint8Array = bindCall(BinaryReader.prototype.readUInt8Array);
var primitiveSizes = {
	Bool: 1,
	I8: 1,
	U8: 1,
	I16: 2,
	U16: 2,
	I32: 4,
	U32: 4,
	I64: 8,
	U64: 8,
	I128: 16,
	U128: 16,
	I256: 32,
	U256: 32,
	F32: 4,
	F64: 8
};
var fixedSizePrimitives = new Set(Object.keys(primitiveSizes));
var isFixedSizeProduct = (ty) => ty.elements.every(({ algebraicType }) => fixedSizePrimitives.has(algebraicType.tag));
var productSize = (ty) => ty.elements.reduce((acc, { algebraicType }) => acc + primitiveSizes[algebraicType.tag], 0);
var primitiveJSName = {
	Bool: "Uint8",
	I8: "Int8",
	U8: "Uint8",
	I16: "Int16",
	U16: "Uint16",
	I32: "Int32",
	U32: "Uint32",
	I64: "BigInt64",
	U64: "BigUint64",
	F32: "Float32",
	F64: "Float64"
};
var specialProductDeserializers = {
	__time_duration_micros__: (reader) => new TimeDuration(reader.readI64()),
	__timestamp_micros_since_unix_epoch__: (reader) => new Timestamp(reader.readI64()),
	__identity__: (reader) => new Identity(reader.readU256()),
	__connection_id__: (reader) => new ConnectionId(reader.readU128()),
	__uuid__: (reader) => new Uuid(reader.readU128())
};
Object.freeze(specialProductDeserializers);
var unitDeserializer = () => ({});
var getElementInitializer = (element) => {
	let init;
	switch (element.algebraicType.tag) {
		case "String":
			init = "''";
			break;
		case "Bool":
			init = "false";
			break;
		case "I8":
		case "U8":
		case "I16":
		case "U16":
		case "I32":
		case "U32":
			init = "0";
			break;
		case "I64":
		case "U64":
		case "I128":
		case "U128":
		case "I256":
		case "U256":
			init = "0n";
			break;
		case "F32":
		case "F64":
			init = "0.0";
			break;
		default: init = "undefined";
	}
	return `${element.name}: ${init}`;
};
var ProductType = {
	makeSerializer(ty, typespace) {
		let serializer = SERIALIZERS.get(ty);
		if (serializer != null) return serializer;
		if (isFixedSizeProduct(ty)) {
			const body2 = `"use strict";
writer.expandBuffer(${productSize(ty)});
const view = writer.view;
${ty.elements.map(({ name, algebraicType: { tag } }) => tag in primitiveJSName ? `view.set${primitiveJSName[tag]}(writer.offset, value.${name}, ${primitiveSizes[tag] > 1 ? "true" : ""});
writer.offset += ${primitiveSizes[tag]};` : `writer.write${tag}(value.${name});`).join("\n")}`;
			serializer = Function("writer", "value", body2);
			SERIALIZERS.set(ty, serializer);
			return serializer;
		}
		const serializers = {};
		const body = "\"use strict\";\n" + ty.elements.map((element) => `this.${element.name}(writer, value.${element.name});`).join("\n");
		serializer = Function("writer", "value", body).bind(serializers);
		SERIALIZERS.set(ty, serializer);
		for (const { name, algebraicType } of ty.elements) serializers[name] = AlgebraicType.makeSerializer(algebraicType, typespace);
		Object.freeze(serializers);
		return serializer;
	},
	serializeValue(writer, ty, value, typespace) {
		ProductType.makeSerializer(ty, typespace)(writer, value);
	},
	makeDeserializer(ty, typespace) {
		switch (ty.elements.length) {
			case 0: return unitDeserializer;
			case 1: {
				const fieldName = ty.elements[0].name;
				if (hasOwn(specialProductDeserializers, fieldName)) return specialProductDeserializers[fieldName];
			}
		}
		let deserializer = DESERIALIZERS.get(ty);
		if (deserializer != null) return deserializer;
		if (isFixedSizeProduct(ty)) {
			const body = `"use strict";
const result = { ${ty.elements.map(getElementInitializer).join(", ")} };
const view = reader.view;
${ty.elements.map(({ name, algebraicType: { tag } }) => tag in primitiveJSName ? tag === "Bool" ? `result.${name} = view.getUint8(reader.offset) !== 0;
reader.offset += 1;` : `result.${name} = view.get${primitiveJSName[tag]}(reader.offset, ${primitiveSizes[tag] > 1 ? "true" : ""});
reader.offset += ${primitiveSizes[tag]};` : `result.${name} = reader.read${tag}();`).join("\n")}
return result;`;
			deserializer = Function("reader", body);
			DESERIALIZERS.set(ty, deserializer);
			return deserializer;
		}
		const deserializers = {};
		deserializer = Function("reader", `"use strict";
const result = { ${ty.elements.map(getElementInitializer).join(", ")} };
${ty.elements.map(({ name }) => `result.${name} = this.${name}(reader);`).join("\n")}
return result;`).bind(deserializers);
		DESERIALIZERS.set(ty, deserializer);
		for (const { name, algebraicType } of ty.elements) deserializers[name] = AlgebraicType.makeDeserializer(algebraicType, typespace);
		Object.freeze(deserializers);
		return deserializer;
	},
	deserializeValue(reader, ty, typespace) {
		return ProductType.makeDeserializer(ty, typespace)(reader);
	},
	intoMapKey(ty, value) {
		if (ty.elements.length === 1) {
			const fieldName = ty.elements[0].name;
			if (hasOwn(specialProductDeserializers, fieldName)) return value[fieldName];
		}
		const writer = new BinaryWriter(10);
		AlgebraicType.serializeValue(writer, AlgebraicType.Product(ty), value);
		return writer.toBase64();
	}
};
var SumType = {
	makeSerializer(ty, typespace) {
		if (ty.variants.length == 2 && ty.variants[0].name === "some" && ty.variants[1].name === "none") {
			const serialize = AlgebraicType.makeSerializer(ty.variants[0].algebraicType, typespace);
			return (writer, value) => {
				if (value !== null && value !== void 0) {
					writer.writeByte(0);
					serialize(writer, value);
				} else writer.writeByte(1);
			};
		} else if (ty.variants.length == 2 && ty.variants[0].name === "ok" && ty.variants[1].name === "err") {
			const serializeOk = AlgebraicType.makeSerializer(ty.variants[0].algebraicType, typespace);
			const serializeErr = AlgebraicType.makeSerializer(ty.variants[0].algebraicType, typespace);
			return (writer, value) => {
				if ("ok" in value) {
					writer.writeU8(0);
					serializeOk(writer, value.ok);
				} else if ("err" in value) {
					writer.writeU8(1);
					serializeErr(writer, value.err);
				} else throw new TypeError("could not serialize result: object had neither a `ok` nor an `err` field");
			};
		} else {
			let serializer = SERIALIZERS.get(ty);
			if (serializer != null) return serializer;
			const serializers = {};
			const body = `switch (value.tag) {
${ty.variants.map(({ name }, i) => `  case ${JSON.stringify(name)}:
    writer.writeByte(${i});
    return this.${name}(writer, value.value);`).join("\n")}
  default:
    throw new TypeError(
      \`Could not serialize sum type; unknown tag \${value.tag}\`
    )
}
`;
			serializer = Function("writer", "value", body).bind(serializers);
			SERIALIZERS.set(ty, serializer);
			for (const { name, algebraicType } of ty.variants) serializers[name] = AlgebraicType.makeSerializer(algebraicType, typespace);
			Object.freeze(serializers);
			return serializer;
		}
	},
	serializeValue(writer, ty, value, typespace) {
		SumType.makeSerializer(ty, typespace)(writer, value);
	},
	makeDeserializer(ty, typespace) {
		if (ty.variants.length == 2 && ty.variants[0].name === "some" && ty.variants[1].name === "none") {
			const deserialize = AlgebraicType.makeDeserializer(ty.variants[0].algebraicType, typespace);
			return (reader) => {
				const tag = reader.readU8();
				if (tag === 0) return deserialize(reader);
				else if (tag === 1) return;
				else throw `Can't deserialize an option type, couldn't find ${tag} tag`;
			};
		} else if (ty.variants.length == 2 && ty.variants[0].name === "ok" && ty.variants[1].name === "err") {
			const deserializeOk = AlgebraicType.makeDeserializer(ty.variants[0].algebraicType, typespace);
			const deserializeErr = AlgebraicType.makeDeserializer(ty.variants[1].algebraicType, typespace);
			return (reader) => {
				const tag = reader.readByte();
				if (tag === 0) return { ok: deserializeOk(reader) };
				else if (tag === 1) return { err: deserializeErr(reader) };
				else throw `Can't deserialize a result type, couldn't find ${tag} tag`;
			};
		} else {
			let deserializer = DESERIALIZERS.get(ty);
			if (deserializer != null) return deserializer;
			const deserializers = {};
			deserializer = Function("reader", `switch (reader.readU8()) {
${ty.variants.map(({ name }, i) => `case ${i}: return { tag: ${JSON.stringify(name)}, value: this.${name}(reader) };`).join("\n")} }`).bind(deserializers);
			DESERIALIZERS.set(ty, deserializer);
			for (const { name, algebraicType } of ty.variants) deserializers[name] = AlgebraicType.makeDeserializer(algebraicType, typespace);
			Object.freeze(deserializers);
			return deserializer;
		}
	},
	deserializeValue(reader, ty, typespace) {
		return SumType.makeDeserializer(ty, typespace)(reader);
	}
};
var Option = { getAlgebraicType(innerType) {
	return AlgebraicType.Sum({ variants: [{
		name: "some",
		algebraicType: innerType
	}, {
		name: "none",
		algebraicType: AlgebraicType.Product({ elements: [] })
	}] });
} };
var Result = { getAlgebraicType(okType, errType) {
	return AlgebraicType.Sum({ variants: [{
		name: "ok",
		algebraicType: okType
	}, {
		name: "err",
		algebraicType: errType
	}] });
} };
var ScheduleAt = {
	interval(value) {
		return Interval(value);
	},
	time(value) {
		return Time(value);
	},
	getAlgebraicType() {
		return AlgebraicType.Sum({ variants: [{
			name: "Interval",
			algebraicType: TimeDuration.getAlgebraicType()
		}, {
			name: "Time",
			algebraicType: Timestamp.getAlgebraicType()
		}] });
	},
	isScheduleAt(algebraicType) {
		if (algebraicType.tag !== "Sum") return false;
		const variants = algebraicType.value.variants;
		if (variants.length !== 2) return false;
		const intervalVariant = variants.find((v) => v.name === "Interval");
		const timeVariant = variants.find((v) => v.name === "Time");
		if (!intervalVariant || !timeVariant) return false;
		return TimeDuration.isTimeDuration(intervalVariant.algebraicType) && Timestamp.isTimestamp(timeVariant.algebraicType);
	}
};
var Interval = (micros) => ({
	tag: "Interval",
	value: new TimeDuration(micros)
});
var Time = (microsSinceUnixEpoch) => ({
	tag: "Time",
	value: new Timestamp(microsSinceUnixEpoch)
});
var schedule_at_default = ScheduleAt;
function set(x, t2) {
	return {
		...x,
		...t2
	};
}
var TypeBuilder = class {
	/**
	* The TypeScript phantom type. This is not stored at runtime,
	* but is visible to the compiler
	*/
	type;
	/**
	* The SpacetimeDB algebraic type (run‑time value). In addition to storing
	* the runtime representation of the `AlgebraicType`, it also captures
	* the TypeScript type information of the `AlgebraicType`. That is to say
	* the value is not merely an `AlgebraicType`, but is constructed to be
	* the corresponding concrete `AlgebraicType` for the TypeScript type `Type`.
	*
	* e.g. `string` corresponds to `AlgebraicType.String`
	*/
	algebraicType;
	constructor(algebraicType) {
		this.algebraicType = algebraicType;
	}
	optional() {
		return new OptionBuilder(this);
	}
	serialize(writer, value) {
		(this.serialize = AlgebraicType.makeSerializer(this.algebraicType))(writer, value);
	}
	deserialize(reader) {
		return (this.deserialize = AlgebraicType.makeDeserializer(this.algebraicType))(reader);
	}
};
var U8Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U8);
	}
	index(algorithm = "btree") {
		return new U8ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U8ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U8ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U8ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U8ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U8ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U16Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U16);
	}
	index(algorithm = "btree") {
		return new U16ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U16ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U16ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U16ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U16ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U16ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U32Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U32);
	}
	index(algorithm = "btree") {
		return new U32ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U32ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U32ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U32ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U32ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U32ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U64Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U64);
	}
	index(algorithm = "btree") {
		return new U64ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U64ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U64ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U64ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U64ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U64ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U128Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U128);
	}
	index(algorithm = "btree") {
		return new U128ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U128ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U128ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U128ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U128ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U128ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U256Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U256);
	}
	index(algorithm = "btree") {
		return new U256ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U256ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U256ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U256ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U256ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U256ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I8Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I8);
	}
	index(algorithm = "btree") {
		return new I8ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I8ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I8ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I8ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I8ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I8ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I16Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I16);
	}
	index(algorithm = "btree") {
		return new I16ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I16ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I16ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I16ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I16ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I16ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I32Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I32);
	}
	index(algorithm = "btree") {
		return new I32ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I32ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I32ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I32ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I32ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I32ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I64Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I64);
	}
	index(algorithm = "btree") {
		return new I64ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I64ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I64ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I64ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I64ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I64ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I128Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I128);
	}
	index(algorithm = "btree") {
		return new I128ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I128ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I128ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I128ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I128ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I128ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I256Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I256);
	}
	index(algorithm = "btree") {
		return new I256ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I256ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I256ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I256ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I256ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I256ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var F32Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.F32);
	}
	default(value) {
		return new F32ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new F32ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var F64Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.F64);
	}
	default(value) {
		return new F64ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new F64ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var BoolBuilder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.Bool);
	}
	index(algorithm = "btree") {
		return new BoolColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new BoolColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new BoolColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new BoolColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new BoolColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var StringBuilder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.String);
	}
	index(algorithm = "btree") {
		return new StringColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new StringColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new StringColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new StringColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new StringColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ArrayBuilder = class extends TypeBuilder {
	element;
	constructor(element) {
		super(AlgebraicType.Array(element.algebraicType));
		this.element = element;
	}
	default(value) {
		return new ArrayColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ArrayColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ByteArrayBuilder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.Array(AlgebraicType.U8));
	}
	default(value) {
		return new ByteArrayColumnBuilder(set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ByteArrayColumnBuilder(set(defaultMetadata, { name }));
	}
};
var OptionBuilder = class extends TypeBuilder {
	value;
	constructor(value) {
		super(Option.getAlgebraicType(value.algebraicType));
		this.value = value;
	}
	default(value) {
		return new OptionColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new OptionColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ProductBuilder = class extends TypeBuilder {
	typeName;
	elements;
	constructor(elements, name) {
		function elementsArrayFromElementsObj(obj) {
			return Object.keys(obj).map((key) => ({
				name: key,
				get algebraicType() {
					return obj[key].algebraicType;
				}
			}));
		}
		super(AlgebraicType.Product({ elements: elementsArrayFromElementsObj(elements) }));
		this.typeName = name;
		this.elements = elements;
	}
	default(value) {
		return new ProductColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ProductColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ResultBuilder = class extends TypeBuilder {
	ok;
	err;
	constructor(ok, err) {
		super(Result.getAlgebraicType(ok.algebraicType, err.algebraicType));
		this.ok = ok;
		this.err = err;
	}
	default(value) {
		return new ResultColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
};
var UnitBuilder = class extends TypeBuilder {
	constructor() {
		super({
			tag: "Product",
			value: { elements: [] }
		});
	}
};
var RowBuilder = class extends TypeBuilder {
	row;
	typeName;
	constructor(row, name) {
		const mappedRow = Object.fromEntries(Object.entries(row).map(([colName, builder]) => [colName, builder instanceof ColumnBuilder ? builder : new ColumnBuilder(builder, {})]));
		const elements = Object.keys(mappedRow).map((name2) => ({
			name: name2,
			get algebraicType() {
				return mappedRow[name2].typeBuilder.algebraicType;
			}
		}));
		super(AlgebraicType.Product({ elements }));
		this.row = mappedRow;
		this.typeName = name;
	}
};
var SumBuilderImpl = class extends TypeBuilder {
	variants;
	typeName;
	constructor(variants, name) {
		function variantsArrayFromVariantsObj(variants2) {
			return Object.keys(variants2).map((key) => ({
				name: key,
				get algebraicType() {
					return variants2[key].algebraicType;
				}
			}));
		}
		super(AlgebraicType.Sum({ variants: variantsArrayFromVariantsObj(variants) }));
		this.variants = variants;
		this.typeName = name;
		for (const key of Object.keys(variants)) {
			const desc = Object.getOwnPropertyDescriptor(variants, key);
			const isAccessor = !!desc && (typeof desc.get === "function" || typeof desc.set === "function");
			let isUnit2 = false;
			if (!isAccessor) isUnit2 = variants[key] instanceof UnitBuilder;
			if (isUnit2) {
				const constant = this.create(key);
				Object.defineProperty(this, key, {
					value: constant,
					writable: false,
					enumerable: true,
					configurable: false
				});
			} else {
				const fn = ((value) => this.create(key, value));
				Object.defineProperty(this, key, {
					value: fn,
					writable: false,
					enumerable: true,
					configurable: false
				});
			}
		}
	}
	create(tag, value) {
		return value === void 0 ? { tag } : {
			tag,
			value
		};
	}
	default(value) {
		return new SumColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new SumColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var SumBuilder = SumBuilderImpl;
var SimpleSumBuilderImpl = class extends SumBuilderImpl {
	index(algorithm = "btree") {
		return new SimpleSumColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	primaryKey() {
		return new SimpleSumColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
};
var ScheduleAtBuilder = class extends TypeBuilder {
	constructor() {
		super(schedule_at_default.getAlgebraicType());
	}
	default(value) {
		return new ScheduleAtColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ScheduleAtColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var IdentityBuilder = class extends TypeBuilder {
	constructor() {
		super(Identity.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ConnectionIdBuilder = class extends TypeBuilder {
	constructor() {
		super(ConnectionId.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var TimestampBuilder = class extends TypeBuilder {
	constructor() {
		super(Timestamp.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var TimeDurationBuilder = class extends TypeBuilder {
	constructor() {
		super(TimeDuration.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var UuidBuilder = class extends TypeBuilder {
	constructor() {
		super(Uuid.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new UuidColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new UuidColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new UuidColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new UuidColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new UuidColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new UuidColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var defaultMetadata = {};
var ColumnBuilder = class {
	typeBuilder;
	columnMetadata;
	constructor(typeBuilder, metadata) {
		this.typeBuilder = typeBuilder;
		this.columnMetadata = metadata;
	}
	serialize(writer, value) {
		this.typeBuilder.serialize(writer, value);
	}
	deserialize(reader) {
		return this.typeBuilder.deserialize(reader);
	}
};
var U8ColumnBuilder = class _U8ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U16ColumnBuilder = class _U16ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U32ColumnBuilder = class _U32ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U64ColumnBuilder = class _U64ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U128ColumnBuilder = class _U128ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U256ColumnBuilder = class _U256ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I8ColumnBuilder = class _I8ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I16ColumnBuilder = class _I16ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I32ColumnBuilder = class _I32ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I64ColumnBuilder = class _I64ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I128ColumnBuilder = class _I128ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I256ColumnBuilder = class _I256ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var F32ColumnBuilder = class _F32ColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _F32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _F32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var F64ColumnBuilder = class _F64ColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _F64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _F64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var BoolColumnBuilder = class _BoolColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var StringColumnBuilder = class _StringColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ArrayColumnBuilder = class _ArrayColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _ArrayColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ArrayColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ByteArrayColumnBuilder = class _ByteArrayColumnBuilder extends ColumnBuilder {
	constructor(metadata) {
		super(new TypeBuilder(AlgebraicType.Array(AlgebraicType.U8)), metadata);
	}
	default(value) {
		return new _ByteArrayColumnBuilder(set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ByteArrayColumnBuilder(set(this.columnMetadata, { name }));
	}
};
var OptionColumnBuilder = class _OptionColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _OptionColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _OptionColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ResultColumnBuilder = class _ResultColumnBuilder extends ColumnBuilder {
	constructor(typeBuilder, metadata) {
		super(typeBuilder, metadata);
	}
	default(value) {
		return new _ResultColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
};
var ProductColumnBuilder = class _ProductColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _ProductColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ProductColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var SumColumnBuilder = class _SumColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _SumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _SumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var SimpleSumColumnBuilder = class _SimpleSumColumnBuilder extends SumColumnBuilder {
	index(algorithm = "btree") {
		return new _SimpleSumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	primaryKey() {
		return new _SimpleSumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
};
var ScheduleAtColumnBuilder = class _ScheduleAtColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _ScheduleAtColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ScheduleAtColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var IdentityColumnBuilder = class _IdentityColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ConnectionIdColumnBuilder = class _ConnectionIdColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var TimestampColumnBuilder = class _TimestampColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var TimeDurationColumnBuilder = class _TimeDurationColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var UuidColumnBuilder = class _UuidColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var RefBuilder = class extends TypeBuilder {
	ref;
	/** The phantom type of the pointee of this ref. */
	__spacetimeType;
	constructor(ref) {
		super(AlgebraicType.Ref(ref));
		this.ref = ref;
	}
};
var enumImpl = ((nameOrObj, maybeObj) => {
	let obj = nameOrObj;
	let name = void 0;
	if (typeof nameOrObj === "string") {
		if (!maybeObj) throw new TypeError("When providing a name, you must also provide the variants object or array.");
		obj = maybeObj;
		name = nameOrObj;
	}
	if (Array.isArray(obj)) {
		const simpleVariantsObj = {};
		for (const variant of obj) simpleVariantsObj[variant] = new UnitBuilder();
		return new SimpleSumBuilderImpl(simpleVariantsObj, name);
	}
	return new SumBuilder(obj, name);
});
var t = {
	bool: () => new BoolBuilder(),
	string: () => new StringBuilder(),
	number: () => new F64Builder(),
	i8: () => new I8Builder(),
	u8: () => new U8Builder(),
	i16: () => new I16Builder(),
	u16: () => new U16Builder(),
	i32: () => new I32Builder(),
	u32: () => new U32Builder(),
	i64: () => new I64Builder(),
	u64: () => new U64Builder(),
	i128: () => new I128Builder(),
	u128: () => new U128Builder(),
	i256: () => new I256Builder(),
	u256: () => new U256Builder(),
	f32: () => new F32Builder(),
	f64: () => new F64Builder(),
	object: ((nameOrObj, maybeObj) => {
		if (typeof nameOrObj === "string") {
			if (!maybeObj) throw new TypeError("When providing a name, you must also provide the object.");
			return new ProductBuilder(maybeObj, nameOrObj);
		}
		return new ProductBuilder(nameOrObj, void 0);
	}),
	row: ((nameOrObj, maybeObj) => {
		const [obj, name] = typeof nameOrObj === "string" ? [maybeObj, nameOrObj] : [nameOrObj, void 0];
		return new RowBuilder(obj, name);
	}),
	array(e) {
		return new ArrayBuilder(e);
	},
	enum: enumImpl,
	unit() {
		return new UnitBuilder();
	},
	lazy(thunk) {
		let cached = null;
		const get = () => cached ??= thunk();
		return new Proxy({}, {
			get(_t, prop, recv) {
				const target = get();
				const val = Reflect.get(target, prop, recv);
				return typeof val === "function" ? val.bind(target) : val;
			},
			set(_t, prop, value, recv) {
				return Reflect.set(get(), prop, value, recv);
			},
			has(_t, prop) {
				return prop in get();
			},
			ownKeys() {
				return Reflect.ownKeys(get());
			},
			getOwnPropertyDescriptor(_t, prop) {
				return Object.getOwnPropertyDescriptor(get(), prop);
			},
			getPrototypeOf() {
				return Object.getPrototypeOf(get());
			}
		});
	},
	scheduleAt: () => {
		return new ScheduleAtBuilder();
	},
	option(value) {
		return new OptionBuilder(value);
	},
	result(ok, err) {
		return new ResultBuilder(ok, err);
	},
	identity: () => {
		return new IdentityBuilder();
	},
	connectionId: () => {
		return new ConnectionIdBuilder();
	},
	timestamp: () => {
		return new TimestampBuilder();
	},
	timeDuration: () => {
		return new TimeDurationBuilder();
	},
	uuid: () => {
		return new UuidBuilder();
	},
	byteArray: () => {
		return new ByteArrayBuilder();
	}
};
var AlgebraicType2 = t.enum("AlgebraicType", {
	Ref: t.u32(),
	get Sum() {
		return SumType2;
	},
	get Product() {
		return ProductType2;
	},
	get Array() {
		return AlgebraicType2;
	},
	String: t.unit(),
	Bool: t.unit(),
	I8: t.unit(),
	U8: t.unit(),
	I16: t.unit(),
	U16: t.unit(),
	I32: t.unit(),
	U32: t.unit(),
	I64: t.unit(),
	U64: t.unit(),
	I128: t.unit(),
	U128: t.unit(),
	I256: t.unit(),
	U256: t.unit(),
	F32: t.unit(),
	F64: t.unit()
});
var CaseConversionPolicy = t.enum("CaseConversionPolicy", {
	None: t.unit(),
	SnakeCase: t.unit()
});
var ExplicitNameEntry = t.enum("ExplicitNameEntry", {
	get Table() {
		return NameMapping;
	},
	get Function() {
		return NameMapping;
	},
	get Index() {
		return NameMapping;
	}
});
var ExplicitNames = t.object("ExplicitNames", { get entries() {
	return t.array(ExplicitNameEntry);
} });
var FunctionVisibility = t.enum("FunctionVisibility", {
	Private: t.unit(),
	ClientCallable: t.unit()
});
var HttpHeaderPair = t.object("HttpHeaderPair", {
	name: t.string(),
	value: t.byteArray()
});
var HttpHeaders = t.object("HttpHeaders", { get entries() {
	return t.array(HttpHeaderPair);
} });
var HttpMethod = t.enum("HttpMethod", {
	Get: t.unit(),
	Head: t.unit(),
	Post: t.unit(),
	Put: t.unit(),
	Delete: t.unit(),
	Connect: t.unit(),
	Options: t.unit(),
	Trace: t.unit(),
	Patch: t.unit(),
	Extension: t.string()
});
var HttpRequest = t.object("HttpRequest", {
	get method() {
		return HttpMethod;
	},
	get headers() {
		return HttpHeaders;
	},
	timeout: t.option(t.timeDuration()),
	uri: t.string(),
	get version() {
		return HttpVersion;
	}
});
var HttpResponse = t.object("HttpResponse", {
	get headers() {
		return HttpHeaders;
	},
	get version() {
		return HttpVersion;
	},
	code: t.u16()
});
var HttpVersion = t.enum("HttpVersion", {
	Http09: t.unit(),
	Http10: t.unit(),
	Http11: t.unit(),
	Http2: t.unit(),
	Http3: t.unit()
});
var IndexType = t.enum("IndexType", {
	BTree: t.unit(),
	Hash: t.unit()
});
var Lifecycle = t.enum("Lifecycle", {
	Init: t.unit(),
	OnConnect: t.unit(),
	OnDisconnect: t.unit()
});
var MiscModuleExport = t.enum("MiscModuleExport", { get TypeAlias() {
	return TypeAlias;
} });
var NameMapping = t.object("NameMapping", {
	sourceName: t.string(),
	canonicalName: t.string()
});
var ProductType2 = t.object("ProductType", { get elements() {
	return t.array(ProductTypeElement);
} });
var ProductTypeElement = t.object("ProductTypeElement", {
	name: t.option(t.string()),
	get algebraicType() {
		return AlgebraicType2;
	}
});
var RawColumnDefV8 = t.object("RawColumnDefV8", {
	colName: t.string(),
	get colType() {
		return AlgebraicType2;
	}
});
var RawColumnDefaultValueV10 = t.object("RawColumnDefaultValueV10", {
	colId: t.u16(),
	value: t.byteArray()
});
var RawColumnDefaultValueV9 = t.object("RawColumnDefaultValueV9", {
	table: t.string(),
	colId: t.u16(),
	value: t.byteArray()
});
var RawConstraintDataV9 = t.enum("RawConstraintDataV9", { get Unique() {
	return RawUniqueConstraintDataV9;
} });
var RawConstraintDefV10 = t.object("RawConstraintDefV10", {
	sourceName: t.option(t.string()),
	get data() {
		return RawConstraintDataV9;
	}
});
var RawConstraintDefV8 = t.object("RawConstraintDefV8", {
	constraintName: t.string(),
	constraints: t.u8(),
	columns: t.array(t.u16())
});
var RawConstraintDefV9 = t.object("RawConstraintDefV9", {
	name: t.option(t.string()),
	get data() {
		return RawConstraintDataV9;
	}
});
var RawIndexAlgorithm = t.enum("RawIndexAlgorithm", {
	BTree: t.array(t.u16()),
	Hash: t.array(t.u16()),
	Direct: t.u16()
});
var RawIndexDefV10 = t.object("RawIndexDefV10", {
	sourceName: t.option(t.string()),
	accessorName: t.option(t.string()),
	get algorithm() {
		return RawIndexAlgorithm;
	}
});
var RawIndexDefV8 = t.object("RawIndexDefV8", {
	indexName: t.string(),
	isUnique: t.bool(),
	get indexType() {
		return IndexType;
	},
	columns: t.array(t.u16())
});
var RawIndexDefV9 = t.object("RawIndexDefV9", {
	name: t.option(t.string()),
	accessorName: t.option(t.string()),
	get algorithm() {
		return RawIndexAlgorithm;
	}
});
var RawLifeCycleReducerDefV10 = t.object("RawLifeCycleReducerDefV10", {
	get lifecycleSpec() {
		return Lifecycle;
	},
	functionName: t.string()
});
var RawMiscModuleExportV9 = t.enum("RawMiscModuleExportV9", {
	get ColumnDefaultValue() {
		return RawColumnDefaultValueV9;
	},
	get Procedure() {
		return RawProcedureDefV9;
	},
	get View() {
		return RawViewDefV9;
	}
});
var RawModuleDef = t.enum("RawModuleDef", {
	get V8BackCompat() {
		return RawModuleDefV8;
	},
	get V9() {
		return RawModuleDefV9;
	},
	get V10() {
		return RawModuleDefV10;
	}
});
var RawModuleDefV10 = t.object("RawModuleDefV10", { get sections() {
	return t.array(RawModuleDefV10Section);
} });
var RawModuleDefV10Section = t.enum("RawModuleDefV10Section", {
	get Typespace() {
		return Typespace;
	},
	get Types() {
		return t.array(RawTypeDefV10);
	},
	get Tables() {
		return t.array(RawTableDefV10);
	},
	get Reducers() {
		return t.array(RawReducerDefV10);
	},
	get Procedures() {
		return t.array(RawProcedureDefV10);
	},
	get Views() {
		return t.array(RawViewDefV10);
	},
	get Schedules() {
		return t.array(RawScheduleDefV10);
	},
	get LifeCycleReducers() {
		return t.array(RawLifeCycleReducerDefV10);
	},
	get RowLevelSecurity() {
		return t.array(RawRowLevelSecurityDefV9);
	},
	get CaseConversionPolicy() {
		return CaseConversionPolicy;
	},
	get ExplicitNames() {
		return ExplicitNames;
	}
});
var RawModuleDefV8 = t.object("RawModuleDefV8", {
	get typespace() {
		return Typespace;
	},
	get tables() {
		return t.array(TableDesc);
	},
	get reducers() {
		return t.array(ReducerDef);
	},
	get miscExports() {
		return t.array(MiscModuleExport);
	}
});
var RawModuleDefV9 = t.object("RawModuleDefV9", {
	get typespace() {
		return Typespace;
	},
	get tables() {
		return t.array(RawTableDefV9);
	},
	get reducers() {
		return t.array(RawReducerDefV9);
	},
	get types() {
		return t.array(RawTypeDefV9);
	},
	get miscExports() {
		return t.array(RawMiscModuleExportV9);
	},
	get rowLevelSecurity() {
		return t.array(RawRowLevelSecurityDefV9);
	}
});
var RawProcedureDefV10 = t.object("RawProcedureDefV10", {
	sourceName: t.string(),
	get params() {
		return ProductType2;
	},
	get returnType() {
		return AlgebraicType2;
	},
	get visibility() {
		return FunctionVisibility;
	}
});
var RawProcedureDefV9 = t.object("RawProcedureDefV9", {
	name: t.string(),
	get params() {
		return ProductType2;
	},
	get returnType() {
		return AlgebraicType2;
	}
});
var RawReducerDefV10 = t.object("RawReducerDefV10", {
	sourceName: t.string(),
	get params() {
		return ProductType2;
	},
	get visibility() {
		return FunctionVisibility;
	},
	get okReturnType() {
		return AlgebraicType2;
	},
	get errReturnType() {
		return AlgebraicType2;
	}
});
var RawReducerDefV9 = t.object("RawReducerDefV9", {
	name: t.string(),
	get params() {
		return ProductType2;
	},
	get lifecycle() {
		return t.option(Lifecycle);
	}
});
var RawRowLevelSecurityDefV9 = t.object("RawRowLevelSecurityDefV9", { sql: t.string() });
var RawScheduleDefV10 = t.object("RawScheduleDefV10", {
	sourceName: t.option(t.string()),
	tableName: t.string(),
	scheduleAtCol: t.u16(),
	functionName: t.string()
});
var RawScheduleDefV9 = t.object("RawScheduleDefV9", {
	name: t.option(t.string()),
	reducerName: t.string(),
	scheduledAtColumn: t.u16()
});
var RawScopedTypeNameV10 = t.object("RawScopedTypeNameV10", {
	scope: t.array(t.string()),
	sourceName: t.string()
});
var RawScopedTypeNameV9 = t.object("RawScopedTypeNameV9", {
	scope: t.array(t.string()),
	name: t.string()
});
var RawSequenceDefV10 = t.object("RawSequenceDefV10", {
	sourceName: t.option(t.string()),
	column: t.u16(),
	start: t.option(t.i128()),
	minValue: t.option(t.i128()),
	maxValue: t.option(t.i128()),
	increment: t.i128()
});
var RawSequenceDefV8 = t.object("RawSequenceDefV8", {
	sequenceName: t.string(),
	colPos: t.u16(),
	increment: t.i128(),
	start: t.option(t.i128()),
	minValue: t.option(t.i128()),
	maxValue: t.option(t.i128()),
	allocated: t.i128()
});
var RawSequenceDefV9 = t.object("RawSequenceDefV9", {
	name: t.option(t.string()),
	column: t.u16(),
	start: t.option(t.i128()),
	minValue: t.option(t.i128()),
	maxValue: t.option(t.i128()),
	increment: t.i128()
});
var RawTableDefV10 = t.object("RawTableDefV10", {
	sourceName: t.string(),
	productTypeRef: t.u32(),
	primaryKey: t.array(t.u16()),
	get indexes() {
		return t.array(RawIndexDefV10);
	},
	get constraints() {
		return t.array(RawConstraintDefV10);
	},
	get sequences() {
		return t.array(RawSequenceDefV10);
	},
	get tableType() {
		return TableType;
	},
	get tableAccess() {
		return TableAccess;
	},
	get defaultValues() {
		return t.array(RawColumnDefaultValueV10);
	},
	isEvent: t.bool()
});
var RawTableDefV8 = t.object("RawTableDefV8", {
	tableName: t.string(),
	get columns() {
		return t.array(RawColumnDefV8);
	},
	get indexes() {
		return t.array(RawIndexDefV8);
	},
	get constraints() {
		return t.array(RawConstraintDefV8);
	},
	get sequences() {
		return t.array(RawSequenceDefV8);
	},
	tableType: t.string(),
	tableAccess: t.string(),
	scheduled: t.option(t.string())
});
var RawTableDefV9 = t.object("RawTableDefV9", {
	name: t.string(),
	productTypeRef: t.u32(),
	primaryKey: t.array(t.u16()),
	get indexes() {
		return t.array(RawIndexDefV9);
	},
	get constraints() {
		return t.array(RawConstraintDefV9);
	},
	get sequences() {
		return t.array(RawSequenceDefV9);
	},
	get schedule() {
		return t.option(RawScheduleDefV9);
	},
	get tableType() {
		return TableType;
	},
	get tableAccess() {
		return TableAccess;
	}
});
var RawTypeDefV10 = t.object("RawTypeDefV10", {
	get sourceName() {
		return RawScopedTypeNameV10;
	},
	ty: t.u32(),
	customOrdering: t.bool()
});
var RawTypeDefV9 = t.object("RawTypeDefV9", {
	get name() {
		return RawScopedTypeNameV9;
	},
	ty: t.u32(),
	customOrdering: t.bool()
});
var RawUniqueConstraintDataV9 = t.object("RawUniqueConstraintDataV9", { columns: t.array(t.u16()) });
var RawViewDefV10 = t.object("RawViewDefV10", {
	sourceName: t.string(),
	index: t.u32(),
	isPublic: t.bool(),
	isAnonymous: t.bool(),
	get params() {
		return ProductType2;
	},
	get returnType() {
		return AlgebraicType2;
	}
});
var RawViewDefV9 = t.object("RawViewDefV9", {
	name: t.string(),
	index: t.u32(),
	isPublic: t.bool(),
	isAnonymous: t.bool(),
	get params() {
		return ProductType2;
	},
	get returnType() {
		return AlgebraicType2;
	}
});
var ReducerDef = t.object("ReducerDef", {
	name: t.string(),
	get args() {
		return t.array(ProductTypeElement);
	}
});
var SumType2 = t.object("SumType", { get variants() {
	return t.array(SumTypeVariant);
} });
var SumTypeVariant = t.object("SumTypeVariant", {
	name: t.option(t.string()),
	get algebraicType() {
		return AlgebraicType2;
	}
});
var TableAccess = t.enum("TableAccess", {
	Public: t.unit(),
	Private: t.unit()
});
var TableDesc = t.object("TableDesc", {
	get schema() {
		return RawTableDefV8;
	},
	data: t.u32()
});
var TableType = t.enum("TableType", {
	System: t.unit(),
	User: t.unit()
});
var TypeAlias = t.object("TypeAlias", {
	name: t.string(),
	ty: t.u32()
});
var Typespace = t.object("Typespace", { get types() {
	return t.array(AlgebraicType2);
} });
var ViewResultHeader = t.enum("ViewResultHeader", {
	RowData: t.unit(),
	RawSql: t.string()
});
function tableToSchema(accName, schema2, tableDef) {
	const getColName = (i) => schema2.rowType.algebraicType.value.elements[i].name;
	const resolvedIndexes = tableDef.indexes.map((idx) => {
		const accessorName = idx.accessorName;
		if (typeof accessorName !== "string" || accessorName.length === 0) throw new TypeError(`Index '${idx.sourceName ?? "<unknown>"}' on table '${tableDef.sourceName}' is missing accessor name`);
		const columnIds = idx.algorithm.tag === "Direct" ? [idx.algorithm.value] : idx.algorithm.value;
		return {
			name: accessorName,
			unique: tableDef.constraints.some((c) => c.data.tag === "Unique" && c.data.value.columns.every((col) => columnIds.includes(col))),
			algorithm: {
				BTree: "btree",
				Hash: "hash",
				Direct: "direct"
			}[idx.algorithm.tag],
			columns: columnIds.map(getColName)
		};
	});
	return {
		sourceName: schema2.tableName || accName,
		accessorName: accName,
		columns: schema2.rowType.row,
		rowType: schema2.rowSpacetimeType,
		indexes: schema2.idxs,
		constraints: tableDef.constraints.map((c) => ({
			name: c.sourceName,
			constraint: "unique",
			columns: c.data.value.columns.map(getColName)
		})),
		resolvedIndexes,
		tableDef,
		...tableDef.isEvent ? { isEvent: true } : {}
	};
}
var ModuleContext = class {
	#compoundTypes = /* @__PURE__ */ new Map();
	/**
	* The global module definition that gets populated by calls to `reducer()` and lifecycle hooks.
	*/
	#moduleDef = {
		typespace: { types: [] },
		tables: [],
		reducers: [],
		types: [],
		rowLevelSecurity: [],
		schedules: [],
		procedures: [],
		views: [],
		lifeCycleReducers: [],
		caseConversionPolicy: { tag: "SnakeCase" },
		explicitNames: { entries: [] }
	};
	get moduleDef() {
		return this.#moduleDef;
	}
	rawModuleDefV10() {
		const sections = [];
		const push = (s) => {
			if (s) sections.push(s);
		};
		const module = this.#moduleDef;
		push(module.typespace && {
			tag: "Typespace",
			value: module.typespace
		});
		push(module.types && {
			tag: "Types",
			value: module.types
		});
		push(module.tables && {
			tag: "Tables",
			value: module.tables
		});
		push(module.reducers && {
			tag: "Reducers",
			value: module.reducers
		});
		push(module.procedures && {
			tag: "Procedures",
			value: module.procedures
		});
		push(module.views && {
			tag: "Views",
			value: module.views
		});
		push(module.schedules && {
			tag: "Schedules",
			value: module.schedules
		});
		push(module.lifeCycleReducers && {
			tag: "LifeCycleReducers",
			value: module.lifeCycleReducers
		});
		push(module.rowLevelSecurity && {
			tag: "RowLevelSecurity",
			value: module.rowLevelSecurity
		});
		push(module.explicitNames && {
			tag: "ExplicitNames",
			value: module.explicitNames
		});
		push(module.caseConversionPolicy && {
			tag: "CaseConversionPolicy",
			value: module.caseConversionPolicy
		});
		return { sections };
	}
	/**
	* Set the case conversion policy for this module.
	* Called by the settings mechanism.
	*/
	setCaseConversionPolicy(policy) {
		this.#moduleDef.caseConversionPolicy = policy;
	}
	get typespace() {
		return this.#moduleDef.typespace;
	}
	/**
	* Resolves the actual type of a TypeBuilder by following its references until it reaches a non-ref type.
	* @param typespace The typespace to resolve types against.
	* @param typeBuilder The TypeBuilder to resolve.
	* @returns The resolved algebraic type.
	*/
	resolveType(typeBuilder) {
		let ty = typeBuilder.algebraicType;
		while (ty.tag === "Ref") ty = this.typespace.types[ty.value];
		return ty;
	}
	/**
	* Adds a type to the module definition's typespace as a `Ref` if it is a named compound type (Product or Sum).
	* Otherwise, returns the type as is.
	* @param name
	* @param ty
	* @returns
	*/
	registerTypesRecursively(typeBuilder) {
		if (typeBuilder instanceof ProductBuilder && !isUnit(typeBuilder) || typeBuilder instanceof SumBuilder || typeBuilder instanceof RowBuilder) return this.#registerCompoundTypeRecursively(typeBuilder);
		else if (typeBuilder instanceof OptionBuilder) return new OptionBuilder(this.registerTypesRecursively(typeBuilder.value));
		else if (typeBuilder instanceof ResultBuilder) return new ResultBuilder(this.registerTypesRecursively(typeBuilder.ok), this.registerTypesRecursively(typeBuilder.err));
		else if (typeBuilder instanceof ArrayBuilder) return new ArrayBuilder(this.registerTypesRecursively(typeBuilder.element));
		else return typeBuilder;
	}
	#registerCompoundTypeRecursively(typeBuilder) {
		const ty = typeBuilder.algebraicType;
		const name = typeBuilder.typeName;
		if (name === void 0) throw new Error(`Missing type name for ${typeBuilder.constructor.name ?? "TypeBuilder"} ${JSON.stringify(typeBuilder)}`);
		let r = this.#compoundTypes.get(ty);
		if (r != null) return r;
		const newTy = typeBuilder instanceof RowBuilder || typeBuilder instanceof ProductBuilder ? {
			tag: "Product",
			value: { elements: [] }
		} : {
			tag: "Sum",
			value: { variants: [] }
		};
		r = new RefBuilder(this.#moduleDef.typespace.types.length);
		this.#moduleDef.typespace.types.push(newTy);
		this.#compoundTypes.set(ty, r);
		if (typeBuilder instanceof RowBuilder) for (const [name2, elem] of Object.entries(typeBuilder.row)) newTy.value.elements.push({
			name: name2,
			algebraicType: this.registerTypesRecursively(elem.typeBuilder).algebraicType
		});
		else if (typeBuilder instanceof ProductBuilder) for (const [name2, elem] of Object.entries(typeBuilder.elements)) newTy.value.elements.push({
			name: name2,
			algebraicType: this.registerTypesRecursively(elem).algebraicType
		});
		else if (typeBuilder instanceof SumBuilder) for (const [name2, variant] of Object.entries(typeBuilder.variants)) newTy.value.variants.push({
			name: name2,
			algebraicType: this.registerTypesRecursively(variant).algebraicType
		});
		this.#moduleDef.types.push({
			sourceName: splitName(name),
			ty: r.ref,
			customOrdering: true
		});
		return r;
	}
};
function isUnit(typeBuilder) {
	return typeBuilder.typeName == null && typeBuilder.algebraicType.value.elements.length === 0;
}
function splitName(name) {
	const scope = name.split(".");
	return {
		sourceName: scope.pop(),
		scope
	};
}
var import_statuses = __toESM(require_statuses());
var Range = class {
	#from;
	#to;
	constructor(from, to) {
		this.#from = from ?? { tag: "unbounded" };
		this.#to = to ?? { tag: "unbounded" };
	}
	get from() {
		return this.#from;
	}
	get to() {
		return this.#to;
	}
};
function table(opts, row, ..._) {
	const { name, public: isPublic = false, indexes: userIndexes = [], scheduled, event: isEvent = false } = opts;
	const colIds = /* @__PURE__ */ new Map();
	const colNameList = [];
	if (!(row instanceof RowBuilder)) row = new RowBuilder(row);
	row.algebraicType.value.elements.forEach((elem, i) => {
		colIds.set(elem.name, i);
		colNameList.push(elem.name);
	});
	const pk = [];
	const indexes = [];
	const constraints = [];
	const sequences = [];
	let scheduleAtCol;
	const defaultValues = [];
	for (const [name2, builder] of Object.entries(row.row)) {
		const meta = builder.columnMetadata;
		if (meta.isPrimaryKey) pk.push(colIds.get(name2));
		const isUnique = meta.isUnique || meta.isPrimaryKey;
		if (meta.indexType || isUnique) {
			const algo = meta.indexType ?? "btree";
			const id = colIds.get(name2);
			let algorithm;
			switch (algo) {
				case "btree":
					algorithm = RawIndexAlgorithm.BTree([id]);
					break;
				case "hash":
					algorithm = RawIndexAlgorithm.Hash([id]);
					break;
				case "direct":
					algorithm = RawIndexAlgorithm.Direct(id);
					break;
			}
			indexes.push({
				sourceName: void 0,
				accessorName: name2,
				algorithm
			});
		}
		if (isUnique) constraints.push({
			sourceName: void 0,
			data: {
				tag: "Unique",
				value: { columns: [colIds.get(name2)] }
			}
		});
		if (meta.isAutoIncrement) sequences.push({
			sourceName: void 0,
			start: void 0,
			minValue: void 0,
			maxValue: void 0,
			column: colIds.get(name2),
			increment: 1n
		});
		if (meta.defaultValue) {
			const writer = new BinaryWriter(16);
			builder.serialize(writer, meta.defaultValue);
			defaultValues.push({
				colId: colIds.get(name2),
				value: writer.getBuffer()
			});
		}
		if (scheduled) {
			const algebraicType = builder.typeBuilder.algebraicType;
			if (schedule_at_default.isScheduleAt(algebraicType)) scheduleAtCol = colIds.get(name2);
		}
	}
	for (const indexOpts of userIndexes ?? []) {
		const accessor = indexOpts.accessor;
		if (typeof accessor !== "string" || accessor.length === 0) {
			const tableLabel = name ?? "<unnamed>";
			const indexLabel = indexOpts.name ?? "<unnamed>";
			throw new TypeError(`Index '${indexLabel}' on table '${tableLabel}' must define a non-empty 'accessor'`);
		}
		let algorithm;
		switch (indexOpts.algorithm) {
			case "btree":
				algorithm = {
					tag: "BTree",
					value: indexOpts.columns.map((c) => colIds.get(c))
				};
				break;
			case "hash":
				algorithm = {
					tag: "Hash",
					value: indexOpts.columns.map((c) => colIds.get(c))
				};
				break;
			case "direct":
				algorithm = {
					tag: "Direct",
					value: colIds.get(indexOpts.column)
				};
				break;
		}
		indexes.push({
			sourceName: void 0,
			accessorName: accessor,
			algorithm,
			canonicalName: indexOpts.name
		});
	}
	for (const constraintOpts of opts.constraints ?? []) if (constraintOpts.constraint === "unique") {
		const data = {
			tag: "Unique",
			value: { columns: constraintOpts.columns.map((c) => colIds.get(c)) }
		};
		constraints.push({
			sourceName: constraintOpts.name,
			data
		});
		continue;
	}
	const productType = row.algebraicType.value;
	return {
		rowType: row,
		tableName: name,
		rowSpacetimeType: productType,
		tableDef: (ctx, accName) => {
			const tableName = name ?? accName;
			if (row.typeName === void 0) row.typeName = toPascalCase(tableName);
			for (const index of indexes) {
				const sourceName = index.sourceName = `${accName}_${(index.algorithm.tag === "Direct" ? [index.algorithm.value] : index.algorithm.value).map((i) => colNameList[i]).join("_")}_idx_${index.algorithm.tag.toLowerCase()}`;
				const { canonicalName } = index;
				if (canonicalName !== void 0) ctx.moduleDef.explicitNames.entries.push(ExplicitNameEntry.Index({
					sourceName,
					canonicalName
				}));
			}
			return {
				sourceName: accName,
				productTypeRef: ctx.registerTypesRecursively(row).ref,
				primaryKey: pk,
				indexes,
				constraints,
				sequences,
				tableType: { tag: "User" },
				tableAccess: { tag: isPublic ? "Public" : "Private" },
				defaultValues,
				isEvent
			};
		},
		idxs: userIndexes,
		constraints,
		schedule: scheduled && scheduleAtCol !== void 0 ? {
			scheduleAtCol,
			reducer: scheduled
		} : void 0
	};
}
var QueryBrand = Symbol("QueryBrand");
var isRowTypedQuery = (val) => !!val && typeof val === "object" && QueryBrand in val;
function toSql(q) {
	return q.toSql();
}
var SemijoinImpl = class _SemijoinImpl {
	constructor(sourceQuery, filterQuery, joinCondition) {
		this.sourceQuery = sourceQuery;
		this.filterQuery = filterQuery;
		this.joinCondition = joinCondition;
		if (sourceQuery.table.sourceName === filterQuery.table.sourceName) throw new Error("Cannot semijoin a table to itself");
	}
	[QueryBrand] = true;
	type = "semijoin";
	build() {
		return this;
	}
	where(predicate) {
		return new _SemijoinImpl(this.sourceQuery.where(predicate), this.filterQuery, this.joinCondition);
	}
	toSql() {
		const left = this.filterQuery;
		const right = this.sourceQuery;
		const leftTable = quoteIdentifier(left.table.sourceName);
		const rightTable = quoteIdentifier(right.table.sourceName);
		let sql = `SELECT ${rightTable}.* FROM ${leftTable} JOIN ${rightTable} ON ${booleanExprToSql(this.joinCondition)}`;
		const clauses = [];
		if (left.whereClause) clauses.push(booleanExprToSql(left.whereClause));
		if (right.whereClause) clauses.push(booleanExprToSql(right.whereClause));
		if (clauses.length > 0) {
			const whereSql = clauses.length === 1 ? clauses[0] : clauses.map(wrapInParens).join(" AND ");
			sql += ` WHERE ${whereSql}`;
		}
		return sql;
	}
};
var FromBuilder = class _FromBuilder {
	constructor(table2, whereClause) {
		this.table = table2;
		this.whereClause = whereClause;
	}
	[QueryBrand] = true;
	where(predicate) {
		const newCondition = normalizePredicateExpr(predicate(this.table.cols));
		const nextWhere = this.whereClause ? this.whereClause.and(newCondition) : newCondition;
		return new _FromBuilder(this.table, nextWhere);
	}
	rightSemijoin(right, on) {
		const sourceQuery = new _FromBuilder(right);
		const joinCondition = on(this.table.indexedCols, right.indexedCols);
		return new SemijoinImpl(sourceQuery, this, joinCondition);
	}
	leftSemijoin(right, on) {
		const filterQuery = new _FromBuilder(right);
		const joinCondition = on(this.table.indexedCols, right.indexedCols);
		return new SemijoinImpl(this, filterQuery, joinCondition);
	}
	toSql() {
		return renderSelectSqlWithJoins(this.table, this.whereClause);
	}
	build() {
		return this;
	}
};
var TableRefImpl = class {
	[QueryBrand] = true;
	type = "table";
	sourceName;
	accessorName;
	cols;
	indexedCols;
	tableDef;
	get columns() {
		return this.tableDef.columns;
	}
	get indexes() {
		return this.tableDef.indexes;
	}
	get rowType() {
		return this.tableDef.rowType;
	}
	get constraints() {
		return this.tableDef.constraints;
	}
	constructor(tableDef) {
		this.sourceName = tableDef.sourceName;
		this.accessorName = tableDef.accessorName;
		this.cols = createRowExpr(tableDef);
		this.indexedCols = this.cols;
		this.tableDef = tableDef;
		Object.freeze(this);
	}
	asFrom() {
		return new FromBuilder(this);
	}
	rightSemijoin(other, on) {
		return this.asFrom().rightSemijoin(other, on);
	}
	leftSemijoin(other, on) {
		return this.asFrom().leftSemijoin(other, on);
	}
	build() {
		return this.asFrom().build();
	}
	toSql() {
		return this.asFrom().toSql();
	}
	where(predicate) {
		return this.asFrom().where(predicate);
	}
};
function createTableRefFromDef(tableDef) {
	return new TableRefImpl(tableDef);
}
function makeQueryBuilder(schema2) {
	const qb = /* @__PURE__ */ Object.create(null);
	for (const table2 of Object.values(schema2.tables)) {
		const ref = createTableRefFromDef(table2);
		qb[table2.accessorName] = ref;
	}
	return Object.freeze(qb);
}
function createRowExpr(tableDef) {
	const row = {};
	for (const columnName of Object.keys(tableDef.columns)) {
		const columnBuilder = tableDef.columns[columnName];
		const column = new ColumnExpression(tableDef.sourceName, columnName, columnBuilder.typeBuilder.algebraicType, columnBuilder.columnMetadata.name);
		row[columnName] = Object.freeze(column);
	}
	return Object.freeze(row);
}
function renderSelectSqlWithJoins(table2, where, extraClauses = []) {
	const sql = `SELECT * FROM ${quoteIdentifier(table2.sourceName)}`;
	const clauses = [];
	if (where) clauses.push(booleanExprToSql(where));
	clauses.push(...extraClauses);
	if (clauses.length === 0) return sql;
	return `${sql} WHERE ${clauses.length === 1 ? clauses[0] : clauses.map(wrapInParens).join(" AND ")}`;
}
var ColumnExpression = class {
	type = "column";
	column;
	columnName;
	table;
	tsValueType;
	spacetimeType;
	constructor(table2, column, spacetimeType, columnName) {
		this.table = table2;
		this.column = column;
		this.columnName = columnName || column;
		this.spacetimeType = spacetimeType;
	}
	eq(x) {
		return new BooleanExpr({
			type: "eq",
			left: this,
			right: normalizeValue(x)
		});
	}
	ne(x) {
		return new BooleanExpr({
			type: "ne",
			left: this,
			right: normalizeValue(x)
		});
	}
	lt(x) {
		return new BooleanExpr({
			type: "lt",
			left: this,
			right: normalizeValue(x)
		});
	}
	lte(x) {
		return new BooleanExpr({
			type: "lte",
			left: this,
			right: normalizeValue(x)
		});
	}
	gt(x) {
		return new BooleanExpr({
			type: "gt",
			left: this,
			right: normalizeValue(x)
		});
	}
	gte(x) {
		return new BooleanExpr({
			type: "gte",
			left: this,
			right: normalizeValue(x)
		});
	}
};
function literal(value) {
	return {
		type: "literal",
		value
	};
}
function normalizeValue(val) {
	if (val.type === "literal") return val;
	if (typeof val === "object" && val != null && "type" in val && val.type === "column") return val;
	return literal(val);
}
function normalizePredicateExpr(value) {
	if (value instanceof BooleanExpr) return value;
	if (typeof value === "boolean") return new BooleanExpr({
		type: "eq",
		left: literal(value),
		right: literal(true)
	});
	return new BooleanExpr({
		type: "eq",
		left: value,
		right: literal(true)
	});
}
var BooleanExpr = class _BooleanExpr {
	constructor(data) {
		this.data = data;
	}
	and(other) {
		return new _BooleanExpr({
			type: "and",
			clauses: [this.data, other.data]
		});
	}
	or(other) {
		return new _BooleanExpr({
			type: "or",
			clauses: [this.data, other.data]
		});
	}
	not() {
		return new _BooleanExpr({
			type: "not",
			clause: this.data
		});
	}
};
function booleanExprToSql(expr, tableAlias) {
	const data = expr instanceof BooleanExpr ? expr.data : expr;
	switch (data.type) {
		case "eq": return `${valueExprToSql(data.left)} = ${valueExprToSql(data.right)}`;
		case "ne": return `${valueExprToSql(data.left)} <> ${valueExprToSql(data.right)}`;
		case "gt": return `${valueExprToSql(data.left)} > ${valueExprToSql(data.right)}`;
		case "gte": return `${valueExprToSql(data.left)} >= ${valueExprToSql(data.right)}`;
		case "lt": return `${valueExprToSql(data.left)} < ${valueExprToSql(data.right)}`;
		case "lte": return `${valueExprToSql(data.left)} <= ${valueExprToSql(data.right)}`;
		case "and": return data.clauses.map((c) => booleanExprToSql(c)).map(wrapInParens).join(" AND ");
		case "or": return data.clauses.map((c) => booleanExprToSql(c)).map(wrapInParens).join(" OR ");
		case "not": return `NOT ${wrapInParens(booleanExprToSql(data.clause))}`;
	}
}
function wrapInParens(sql) {
	return `(${sql})`;
}
function valueExprToSql(expr, tableAlias) {
	if (isLiteralExpr(expr)) return literalValueToSql(expr.value);
	const table2 = expr.table;
	return `${quoteIdentifier(table2)}.${quoteIdentifier(expr.columnName)}`;
}
function literalValueToSql(value) {
	if (value === null || value === void 0) return "NULL";
	if (value instanceof Identity || value instanceof ConnectionId) return `0x${value.toHexString()}`;
	if (value instanceof Timestamp) return `'${value.toISOString()}'`;
	switch (typeof value) {
		case "number":
		case "bigint": return String(value);
		case "boolean": return value ? "TRUE" : "FALSE";
		case "string": return `'${value.replace(/'/g, "''")}'`;
		default: return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
	}
}
function quoteIdentifier(name) {
	return `"${name.replace(/"/g, "\"\"")}"`;
}
function isLiteralExpr(expr) {
	return expr.type === "literal";
}
function makeViewExport(ctx, opts, params, ret, fn) {
	const viewExport = fn.bind();
	viewExport[exportContext] = ctx;
	viewExport[registerExport] = (ctx2, exportName) => {
		registerView(ctx2, opts, exportName, false, params, ret, fn);
	};
	return viewExport;
}
function makeAnonViewExport(ctx, opts, params, ret, fn) {
	const viewExport = fn.bind();
	viewExport[exportContext] = ctx;
	viewExport[registerExport] = (ctx2, exportName) => {
		registerView(ctx2, opts, exportName, true, params, ret, fn);
	};
	return viewExport;
}
function registerView(ctx, opts, exportName, anon, params, ret, fn) {
	const paramsBuilder = new RowBuilder(params, toPascalCase(exportName));
	let returnType = ctx.registerTypesRecursively(ret).algebraicType;
	const { typespace } = ctx;
	const { value: paramType } = ctx.resolveType(ctx.registerTypesRecursively(paramsBuilder));
	ctx.moduleDef.views.push({
		sourceName: exportName,
		index: (anon ? ctx.anonViews : ctx.views).length,
		isPublic: opts.public,
		isAnonymous: anon,
		params: paramType,
		returnType
	});
	if (opts.name != null) ctx.moduleDef.explicitNames.entries.push({
		tag: "Function",
		value: {
			sourceName: exportName,
			canonicalName: opts.name
		}
	});
	if (returnType.tag == "Sum") {
		const originalFn = fn;
		fn = ((ctx2, args) => {
			const ret2 = originalFn(ctx2, args);
			return ret2 == null ? [] : [ret2];
		});
		returnType = AlgebraicType.Array(returnType.value.variants[0].algebraicType);
	}
	(anon ? ctx.anonViews : ctx.views).push({
		fn,
		deserializeParams: ProductType.makeDeserializer(paramType, typespace),
		serializeReturn: AlgebraicType.makeSerializer(returnType, typespace),
		returnTypeBaseSize: bsatnBaseSize(typespace, returnType)
	});
}
var SenderError = class extends Error {
	constructor(message) {
		super(message);
	}
	get name() {
		return "SenderError";
	}
};
var SpacetimeHostError = class extends Error {
	constructor(message) {
		super(message);
	}
	get name() {
		return "SpacetimeHostError";
	}
};
var errorData = {
	HostCallFailure: 1,
	NotInTransaction: 2,
	BsatnDecodeError: 3,
	NoSuchTable: 4,
	NoSuchIndex: 5,
	NoSuchIter: 6,
	NoSuchConsoleTimer: 7,
	NoSuchBytes: 8,
	NoSpace: 9,
	BufferTooSmall: 11,
	UniqueAlreadyExists: 12,
	ScheduleAtDelayTooLong: 13,
	IndexNotUnique: 14,
	NoSuchRow: 15,
	AutoIncOverflow: 16,
	WouldBlockTransaction: 17,
	TransactionNotAnonymous: 18,
	TransactionIsReadOnly: 19,
	TransactionIsMut: 20,
	HttpError: 21
};
function mapEntries(x, f) {
	return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, f(k, v)]));
}
var errnoToClass = /* @__PURE__ */ new Map();
var errors = Object.freeze(mapEntries(errorData, (name, code) => {
	const cls = Object.defineProperty(class extends SpacetimeHostError {
		get name() {
			return name;
		}
	}, "name", {
		value: name,
		writable: false
	});
	errnoToClass.set(code, cls);
	return cls;
}));
function getErrorConstructor(code) {
	return errnoToClass.get(code) ?? SpacetimeHostError;
}
var SBigInt = typeof BigInt !== "undefined" ? BigInt : void 0;
var One = typeof BigInt !== "undefined" ? BigInt(1) : void 0;
var ThirtyTwo = typeof BigInt !== "undefined" ? BigInt(32) : void 0;
var NumValues = typeof BigInt !== "undefined" ? BigInt(4294967296) : void 0;
function unsafeUniformBigIntDistribution(from, to, rng) {
	var diff = to - from + One;
	var FinalNumValues = NumValues;
	var NumIterations = 1;
	while (FinalNumValues < diff) {
		FinalNumValues <<= ThirtyTwo;
		++NumIterations;
	}
	var value = generateNext(NumIterations, rng);
	if (value < diff) return value + from;
	if (value + diff < FinalNumValues) return value % diff + from;
	var MaxAcceptedRandom = FinalNumValues - FinalNumValues % diff;
	while (value >= MaxAcceptedRandom) value = generateNext(NumIterations, rng);
	return value % diff + from;
}
function generateNext(NumIterations, rng) {
	var value = SBigInt(rng.unsafeNext() + 2147483648);
	for (var num = 1; num < NumIterations; ++num) {
		var out = rng.unsafeNext();
		value = (value << ThirtyTwo) + SBigInt(out + 2147483648);
	}
	return value;
}
function unsafeUniformIntDistributionInternal(rangeSize, rng) {
	var MaxAllowed = rangeSize > 2 ? ~~(4294967296 / rangeSize) * rangeSize : 4294967296;
	var deltaV = rng.unsafeNext() + 2147483648;
	while (deltaV >= MaxAllowed) deltaV = rng.unsafeNext() + 2147483648;
	return deltaV % rangeSize;
}
function fromNumberToArrayInt64(out, n) {
	if (n < 0) {
		var posN = -n;
		out.sign = -1;
		out.data[0] = ~~(posN / 4294967296);
		out.data[1] = posN >>> 0;
	} else {
		out.sign = 1;
		out.data[0] = ~~(n / 4294967296);
		out.data[1] = n >>> 0;
	}
	return out;
}
function substractArrayInt64(out, arrayIntA, arrayIntB) {
	var lowA = arrayIntA.data[1];
	var highA = arrayIntA.data[0];
	var signA = arrayIntA.sign;
	var lowB = arrayIntB.data[1];
	var highB = arrayIntB.data[0];
	var signB = arrayIntB.sign;
	out.sign = 1;
	if (signA === 1 && signB === -1) {
		var low_1 = lowA + lowB;
		var high = highA + highB + (low_1 > 4294967295 ? 1 : 0);
		out.data[0] = high >>> 0;
		out.data[1] = low_1 >>> 0;
		return out;
	}
	var lowFirst = lowA;
	var highFirst = highA;
	var lowSecond = lowB;
	var highSecond = highB;
	if (signA === -1) {
		lowFirst = lowB;
		highFirst = highB;
		lowSecond = lowA;
		highSecond = highA;
	}
	var reminderLow = 0;
	var low = lowFirst - lowSecond;
	if (low < 0) {
		reminderLow = 1;
		low = low >>> 0;
	}
	out.data[0] = highFirst - highSecond - reminderLow;
	out.data[1] = low;
	return out;
}
function unsafeUniformArrayIntDistributionInternal(out, rangeSize, rng) {
	var rangeLength = rangeSize.length;
	while (true) {
		for (var index = 0; index !== rangeLength; ++index) out[index] = unsafeUniformIntDistributionInternal(index === 0 ? rangeSize[0] + 1 : 4294967296, rng);
		for (var index = 0; index !== rangeLength; ++index) {
			var current = out[index];
			var currentInRange = rangeSize[index];
			if (current < currentInRange) return out;
			else if (current > currentInRange) break;
		}
	}
}
var safeNumberMaxSafeInteger = Number.MAX_SAFE_INTEGER;
var sharedA = {
	sign: 1,
	data: [0, 0]
};
var sharedB = {
	sign: 1,
	data: [0, 0]
};
var sharedC = {
	sign: 1,
	data: [0, 0]
};
var sharedData = [0, 0];
function uniformLargeIntInternal(from, to, rangeSize, rng) {
	var rangeSizeArrayIntValue = rangeSize <= safeNumberMaxSafeInteger ? fromNumberToArrayInt64(sharedC, rangeSize) : substractArrayInt64(sharedC, fromNumberToArrayInt64(sharedA, to), fromNumberToArrayInt64(sharedB, from));
	if (rangeSizeArrayIntValue.data[1] === 4294967295) {
		rangeSizeArrayIntValue.data[0] += 1;
		rangeSizeArrayIntValue.data[1] = 0;
	} else rangeSizeArrayIntValue.data[1] += 1;
	unsafeUniformArrayIntDistributionInternal(sharedData, rangeSizeArrayIntValue.data, rng);
	return sharedData[0] * 4294967296 + sharedData[1] + from;
}
function unsafeUniformIntDistribution(from, to, rng) {
	var rangeSize = to - from;
	if (rangeSize <= 4294967295) return unsafeUniformIntDistributionInternal(rangeSize + 1, rng) + from;
	return uniformLargeIntInternal(from, to, rangeSize, rng);
}
var XoroShiro128Plus = (function() {
	function XoroShiro128Plus2(s01, s00, s11, s10) {
		this.s01 = s01;
		this.s00 = s00;
		this.s11 = s11;
		this.s10 = s10;
	}
	XoroShiro128Plus2.prototype.clone = function() {
		return new XoroShiro128Plus2(this.s01, this.s00, this.s11, this.s10);
	};
	XoroShiro128Plus2.prototype.next = function() {
		var nextRng = new XoroShiro128Plus2(this.s01, this.s00, this.s11, this.s10);
		return [nextRng.unsafeNext(), nextRng];
	};
	XoroShiro128Plus2.prototype.unsafeNext = function() {
		var out = this.s00 + this.s10 | 0;
		var a0 = this.s10 ^ this.s00;
		var a1 = this.s11 ^ this.s01;
		var s00 = this.s00;
		var s01 = this.s01;
		this.s00 = s00 << 24 ^ s01 >>> 8 ^ a0 ^ a0 << 16;
		this.s01 = s01 << 24 ^ s00 >>> 8 ^ a1 ^ (a1 << 16 | a0 >>> 16);
		this.s10 = a1 << 5 ^ a0 >>> 27;
		this.s11 = a0 << 5 ^ a1 >>> 27;
		return out;
	};
	XoroShiro128Plus2.prototype.jump = function() {
		var nextRng = new XoroShiro128Plus2(this.s01, this.s00, this.s11, this.s10);
		nextRng.unsafeJump();
		return nextRng;
	};
	XoroShiro128Plus2.prototype.unsafeJump = function() {
		var ns01 = 0;
		var ns00 = 0;
		var ns11 = 0;
		var ns10 = 0;
		var jump = [
			3639956645,
			3750757012,
			1261568508,
			386426335
		];
		for (var i = 0; i !== 4; ++i) for (var mask = 1; mask; mask <<= 1) {
			if (jump[i] & mask) {
				ns01 ^= this.s01;
				ns00 ^= this.s00;
				ns11 ^= this.s11;
				ns10 ^= this.s10;
			}
			this.unsafeNext();
		}
		this.s01 = ns01;
		this.s00 = ns00;
		this.s11 = ns11;
		this.s10 = ns10;
	};
	XoroShiro128Plus2.prototype.getState = function() {
		return [
			this.s01,
			this.s00,
			this.s11,
			this.s10
		];
	};
	return XoroShiro128Plus2;
})();
function fromState(state) {
	if (!(state.length === 4)) throw new Error("The state must have been produced by a xoroshiro128plus RandomGenerator");
	return new XoroShiro128Plus(state[0], state[1], state[2], state[3]);
}
var xoroshiro128plus = Object.assign(function(seed) {
	return new XoroShiro128Plus(-1, ~seed, seed | 0, 0);
}, { fromState });
var { asUintN } = BigInt;
function pcg32(state) {
	state = asUintN(64, state * 6364136223846793005n + 11634580027462260723n);
	const xorshifted = Number(asUintN(32, (state >> 18n ^ state) >> 27n));
	const rot = Number(asUintN(32, state >> 59n));
	return xorshifted >> rot | xorshifted << 32 - rot;
}
function generateFloat64(rng) {
	const g1 = unsafeUniformIntDistribution(0, (1 << 26) - 1, rng);
	const g2 = unsafeUniformIntDistribution(0, (1 << 27) - 1, rng);
	return (g1 * Math.pow(2, 27) + g2) * Math.pow(2, -53);
}
function makeRandom(seed) {
	const rng = xoroshiro128plus(pcg32(seed.microsSinceUnixEpoch));
	const random = () => generateFloat64(rng);
	random.fill = (array) => {
		const elem = array.at(0);
		if (typeof elem === "bigint") {
			const upper = (1n << BigInt(array.BYTES_PER_ELEMENT * 8)) - 1n;
			for (let i = 0; i < array.length; i++) array[i] = unsafeUniformBigIntDistribution(0n, upper, rng);
		} else if (typeof elem === "number") {
			const upper = (1 << array.BYTES_PER_ELEMENT * 8) - 1;
			for (let i = 0; i < array.length; i++) array[i] = unsafeUniformIntDistribution(0, upper, rng);
		}
		return array;
	};
	random.uint32 = () => rng.unsafeNext();
	random.integerInRange = (min, max) => unsafeUniformIntDistribution(min, max, rng);
	random.bigintInRange = (min, max) => unsafeUniformBigIntDistribution(min, max, rng);
	return random;
}
var { freeze } = Object;
var sys = _syscalls2_0;
function parseJsonObject(json) {
	let value;
	try {
		value = JSON.parse(json);
	} catch {
		throw new Error("Invalid JSON: failed to parse string");
	}
	if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error("Expected a JSON object at the top level");
	return value;
}
var JwtClaimsImpl = class {
	/**
	* Creates a new JwtClaims instance.
	* @param rawPayload The JWT payload as a raw JSON string.
	* @param identity The identity for this JWT. We are only taking this because we don't have a blake3 implementation (which we need to compute it).
	*/
	constructor(rawPayload, identity) {
		this.rawPayload = rawPayload;
		this.fullPayload = parseJsonObject(rawPayload);
		this._identity = identity;
	}
	fullPayload;
	_identity;
	get identity() {
		return this._identity;
	}
	get subject() {
		return this.fullPayload["sub"];
	}
	get issuer() {
		return this.fullPayload["iss"];
	}
	get audience() {
		const aud = this.fullPayload["aud"];
		if (aud == null) return [];
		return typeof aud === "string" ? [aud] : aud;
	}
};
var AuthCtxImpl = class _AuthCtxImpl {
	isInternal;
	_jwtSource;
	_initializedJWT = false;
	_jwtClaims;
	_senderIdentity;
	constructor(opts) {
		this.isInternal = opts.isInternal;
		this._jwtSource = opts.jwtSource;
		this._senderIdentity = opts.senderIdentity;
	}
	_initializeJWT() {
		if (this._initializedJWT) return;
		this._initializedJWT = true;
		const token = this._jwtSource();
		if (!token) this._jwtClaims = null;
		else this._jwtClaims = new JwtClaimsImpl(token, this._senderIdentity);
		Object.freeze(this);
	}
	/** Lazily compute whether a JWT exists and is parseable. */
	get hasJWT() {
		this._initializeJWT();
		return this._jwtClaims !== null;
	}
	/** Lazily parse the JwtClaims only when accessed. */
	get jwt() {
		this._initializeJWT();
		return this._jwtClaims;
	}
	/** Create a context representing internal (non-user) requests. */
	static internal() {
		return new _AuthCtxImpl({
			isInternal: true,
			jwtSource: () => null,
			senderIdentity: Identity.zero()
		});
	}
	/** If there is a connection id, look up the JWT payload from the system tables. */
	static fromSystemTables(connectionId, sender) {
		if (connectionId === null) return new _AuthCtxImpl({
			isInternal: false,
			jwtSource: () => null,
			senderIdentity: sender
		});
		return new _AuthCtxImpl({
			isInternal: false,
			jwtSource: () => {
				const payloadBuf = sys.get_jwt_payload(connectionId.__connection_id__);
				if (payloadBuf.length === 0) return null;
				return new TextDecoder().decode(payloadBuf);
			},
			senderIdentity: sender
		});
	}
};
var ReducerCtxImpl = class ReducerCtx {
	#identity;
	#senderAuth;
	#uuidCounter;
	#random;
	sender;
	timestamp;
	connectionId;
	db;
	constructor(sender, timestamp, connectionId, dbView) {
		Object.seal(this);
		this.sender = sender;
		this.timestamp = timestamp;
		this.connectionId = connectionId;
		this.db = dbView;
	}
	/** Reset the `ReducerCtx` to be used for a new transaction */
	static reset(me, sender, timestamp, connectionId) {
		me.sender = sender;
		me.timestamp = timestamp;
		me.connectionId = connectionId;
		me.#uuidCounter = void 0;
		me.#senderAuth = void 0;
	}
	get identity() {
		return this.#identity ??= new Identity(sys.identity());
	}
	get senderAuth() {
		return this.#senderAuth ??= AuthCtxImpl.fromSystemTables(this.connectionId, this.sender);
	}
	get random() {
		return this.#random ??= makeRandom(this.timestamp);
	}
	/**
	* Create a new random {@link Uuid} `v4` using this `ReducerCtx`'s RNG.
	*/
	newUuidV4() {
		const bytes = this.random.fill(new Uint8Array(16));
		return Uuid.fromRandomBytesV4(bytes);
	}
	/**
	* Create a new sortable {@link Uuid} `v7` using this `ReducerCtx`'s RNG, counter,
	* and timestamp.
	*/
	newUuidV7() {
		const bytes = this.random.fill(new Uint8Array(4));
		const counter = this.#uuidCounter ??= { value: 0 };
		return Uuid.fromCounterV7(counter, this.timestamp, bytes);
	}
};
var callUserFunction = function __spacetimedb_end_short_backtrace(fn, ...args) {
	return fn(...args);
};
var makeHooks = (schema2) => new ModuleHooksImpl(schema2);
var ModuleHooksImpl = class {
	#schema;
	#dbView_;
	#reducerArgsDeserializers;
	/** Cache the `ReducerCtx` object to avoid allocating anew for ever reducer call. */
	#reducerCtx_;
	constructor(schema2) {
		this.#schema = schema2;
		this.#reducerArgsDeserializers = schema2.moduleDef.reducers.map(({ params }) => ProductType.makeDeserializer(params, schema2.typespace));
	}
	get #dbView() {
		return this.#dbView_ ??= freeze(Object.fromEntries(Object.values(this.#schema.schemaType.tables).map((table2) => [table2.accessorName, makeTableView(this.#schema.typespace, table2.tableDef)])));
	}
	get #reducerCtx() {
		return this.#reducerCtx_ ??= new ReducerCtxImpl(Identity.zero(), Timestamp.UNIX_EPOCH, null, this.#dbView);
	}
	__describe_module__() {
		const writer = new BinaryWriter(128);
		RawModuleDef.serialize(writer, RawModuleDef.V10(this.#schema.rawModuleDefV10()));
		return writer.getBuffer();
	}
	__get_error_constructor__(code) {
		return getErrorConstructor(code);
	}
	get __sender_error_class__() {
		return SenderError;
	}
	__call_reducer__(reducerId, sender, connId, timestamp, argsBuf) {
		const moduleCtx = this.#schema;
		const deserializeArgs = this.#reducerArgsDeserializers[reducerId];
		BINARY_READER.reset(argsBuf);
		const args = deserializeArgs(BINARY_READER);
		const senderIdentity = new Identity(sender);
		const ctx = this.#reducerCtx;
		ReducerCtxImpl.reset(ctx, senderIdentity, new Timestamp(timestamp), ConnectionId.nullIfZero(new ConnectionId(connId)));
		callUserFunction(moduleCtx.reducers[reducerId], ctx, args);
	}
	__call_view__(id, sender, argsBuf) {
		const moduleCtx = this.#schema;
		const { fn, deserializeParams, serializeReturn, returnTypeBaseSize } = moduleCtx.views[id];
		const ret = callUserFunction(fn, freeze({
			sender: new Identity(sender),
			db: this.#dbView,
			from: makeQueryBuilder(moduleCtx.schemaType)
		}), deserializeParams(new BinaryReader(argsBuf)));
		const retBuf = new BinaryWriter(returnTypeBaseSize);
		if (isRowTypedQuery(ret)) {
			const query = toSql(ret);
			ViewResultHeader.serialize(retBuf, ViewResultHeader.RawSql(query));
		} else {
			ViewResultHeader.serialize(retBuf, ViewResultHeader.RowData);
			serializeReturn(retBuf, ret);
		}
		return { data: retBuf.getBuffer() };
	}
	__call_view_anon__(id, argsBuf) {
		const moduleCtx = this.#schema;
		const { fn, deserializeParams, serializeReturn, returnTypeBaseSize } = moduleCtx.anonViews[id];
		const ret = callUserFunction(fn, freeze({
			db: this.#dbView,
			from: makeQueryBuilder(moduleCtx.schemaType)
		}), deserializeParams(new BinaryReader(argsBuf)));
		const retBuf = new BinaryWriter(returnTypeBaseSize);
		if (isRowTypedQuery(ret)) {
			const query = toSql(ret);
			ViewResultHeader.serialize(retBuf, ViewResultHeader.RawSql(query));
		} else {
			ViewResultHeader.serialize(retBuf, ViewResultHeader.RowData);
			serializeReturn(retBuf, ret);
		}
		return { data: retBuf.getBuffer() };
	}
	__call_procedure__(id, sender, connection_id, timestamp, args) {
		return callProcedure(this.#schema, id, new Identity(sender), ConnectionId.nullIfZero(new ConnectionId(connection_id)), new Timestamp(timestamp), args, () => this.#dbView);
	}
};
var BINARY_WRITER = new BinaryWriter(0);
var BINARY_READER = new BinaryReader(new Uint8Array());
function makeTableView(typespace, table2) {
	const table_id = sys.table_id_from_name(table2.sourceName);
	const rowType = typespace.types[table2.productTypeRef];
	if (rowType.tag !== "Product") throw "impossible";
	const serializeRow = AlgebraicType.makeSerializer(rowType, typespace);
	const deserializeRow = AlgebraicType.makeDeserializer(rowType, typespace);
	const sequences = table2.sequences.map((seq) => {
		const col = rowType.value.elements[seq.column];
		const colType = col.algebraicType;
		let sequenceTrigger;
		switch (colType.tag) {
			case "U8":
			case "I8":
			case "U16":
			case "I16":
			case "U32":
			case "I32":
				sequenceTrigger = 0;
				break;
			case "U64":
			case "I64":
			case "U128":
			case "I128":
			case "U256":
			case "I256":
				sequenceTrigger = 0n;
				break;
			default: throw new TypeError("invalid sequence type");
		}
		return {
			colName: col.name,
			sequenceTrigger,
			deserialize: AlgebraicType.makeDeserializer(colType, typespace)
		};
	});
	const hasAutoIncrement = sequences.length > 0;
	const iter = () => tableIterator(sys.datastore_table_scan_bsatn(table_id), deserializeRow);
	const integrateGeneratedColumns = hasAutoIncrement ? (row, ret_buf) => {
		BINARY_READER.reset(ret_buf);
		for (const { colName, deserialize, sequenceTrigger } of sequences) if (row[colName] === sequenceTrigger) row[colName] = deserialize(BINARY_READER);
	} : null;
	const tableMethods = {
		count: () => sys.datastore_table_row_count(table_id),
		iter,
		[Symbol.iterator]: () => iter(),
		insert: (row) => {
			const buf = LEAF_BUF;
			BINARY_WRITER.reset(buf);
			serializeRow(BINARY_WRITER, row);
			sys.datastore_insert_bsatn(table_id, buf.buffer, BINARY_WRITER.offset);
			const ret = { ...row };
			integrateGeneratedColumns?.(ret, buf.view);
			return ret;
		},
		delete: (row) => {
			const buf = LEAF_BUF;
			BINARY_WRITER.reset(buf);
			BINARY_WRITER.writeU32(1);
			serializeRow(BINARY_WRITER, row);
			return sys.datastore_delete_all_by_eq_bsatn(table_id, buf.buffer, BINARY_WRITER.offset) > 0;
		}
	};
	const tableView = Object.assign(/* @__PURE__ */ Object.create(null), tableMethods);
	for (const indexDef of table2.indexes) {
		const accessorName = indexDef.accessorName;
		const index_id = sys.index_id_from_name(indexDef.sourceName);
		let column_ids;
		let isHashIndex = false;
		switch (indexDef.algorithm.tag) {
			case "Hash":
				isHashIndex = true;
				column_ids = indexDef.algorithm.value;
				break;
			case "BTree":
				column_ids = indexDef.algorithm.value;
				break;
			case "Direct":
				column_ids = [indexDef.algorithm.value];
				break;
		}
		const numColumns = column_ids.length;
		const columnSet = new Set(column_ids);
		const isUnique = table2.constraints.filter((x) => x.data.tag === "Unique").some((x) => columnSet.isSubsetOf(new Set(x.data.value.columns)));
		const isPrimaryKey = isUnique && column_ids.length === table2.primaryKey.length && column_ids.every((id, i) => table2.primaryKey[i] === id);
		const indexSerializers = column_ids.map((id) => AlgebraicType.makeSerializer(rowType.value.elements[id].algebraicType, typespace));
		const serializePoint = (buffer, colVal) => {
			BINARY_WRITER.reset(buffer);
			for (let i = 0; i < numColumns; i++) indexSerializers[i](BINARY_WRITER, colVal[i]);
			return BINARY_WRITER.offset;
		};
		const serializeSingleElement = numColumns === 1 ? indexSerializers[0] : null;
		const serializeSinglePoint = serializeSingleElement && ((buffer, colVal) => {
			BINARY_WRITER.reset(buffer);
			serializeSingleElement(BINARY_WRITER, colVal);
			return BINARY_WRITER.offset;
		});
		let index;
		if (isUnique && serializeSinglePoint) {
			const base = {
				find: (colVal) => {
					const buf = LEAF_BUF;
					const point_len = serializeSinglePoint(buf, colVal);
					return tableIterateOne(sys.datastore_index_scan_point_bsatn(index_id, buf.buffer, point_len), deserializeRow);
				},
				delete: (colVal) => {
					const buf = LEAF_BUF;
					const point_len = serializeSinglePoint(buf, colVal);
					return sys.datastore_delete_by_index_scan_point_bsatn(index_id, buf.buffer, point_len) > 0;
				}
			};
			if (isPrimaryKey) base.update = (row) => {
				const buf = LEAF_BUF;
				BINARY_WRITER.reset(buf);
				serializeRow(BINARY_WRITER, row);
				sys.datastore_update_bsatn(table_id, index_id, buf.buffer, BINARY_WRITER.offset);
				integrateGeneratedColumns?.(row, buf.view);
				return row;
			};
			index = base;
		} else if (isUnique) {
			const base = {
				find: (colVal) => {
					if (colVal.length !== numColumns) throw new TypeError("wrong number of elements");
					const buf = LEAF_BUF;
					const point_len = serializePoint(buf, colVal);
					return tableIterateOne(sys.datastore_index_scan_point_bsatn(index_id, buf.buffer, point_len), deserializeRow);
				},
				delete: (colVal) => {
					if (colVal.length !== numColumns) throw new TypeError("wrong number of elements");
					const buf = LEAF_BUF;
					const point_len = serializePoint(buf, colVal);
					return sys.datastore_delete_by_index_scan_point_bsatn(index_id, buf.buffer, point_len) > 0;
				}
			};
			if (isPrimaryKey) base.update = (row) => {
				const buf = LEAF_BUF;
				BINARY_WRITER.reset(buf);
				serializeRow(BINARY_WRITER, row);
				sys.datastore_update_bsatn(table_id, index_id, buf.buffer, BINARY_WRITER.offset);
				integrateGeneratedColumns?.(row, buf.view);
				return row;
			};
			index = base;
		} else if (serializeSinglePoint) {
			const rawIndex = {
				filter: (range) => {
					const buf = LEAF_BUF;
					const point_len = serializeSinglePoint(buf, range);
					return tableIterator(sys.datastore_index_scan_point_bsatn(index_id, buf.buffer, point_len), deserializeRow);
				},
				delete: (range) => {
					const buf = LEAF_BUF;
					const point_len = serializeSinglePoint(buf, range);
					return sys.datastore_delete_by_index_scan_point_bsatn(index_id, buf.buffer, point_len);
				}
			};
			if (isHashIndex) index = rawIndex;
			else index = rawIndex;
		} else if (isHashIndex) index = {
			filter: (range) => {
				const buf = LEAF_BUF;
				const point_len = serializePoint(buf, range);
				return tableIterator(sys.datastore_index_scan_point_bsatn(index_id, buf.buffer, point_len), deserializeRow);
			},
			delete: (range) => {
				const buf = LEAF_BUF;
				const point_len = serializePoint(buf, range);
				return sys.datastore_delete_by_index_scan_point_bsatn(index_id, buf.buffer, point_len);
			}
		};
		else {
			const serializeRange = (buffer, range) => {
				if (range.length > numColumns) throw new TypeError("too many elements");
				BINARY_WRITER.reset(buffer);
				const writer = BINARY_WRITER;
				const prefix_elems = range.length - 1;
				for (let i = 0; i < prefix_elems; i++) indexSerializers[i](writer, range[i]);
				const rstartOffset = writer.offset;
				const term = range[range.length - 1];
				const serializeTerm = indexSerializers[range.length - 1];
				if (term instanceof Range) {
					const writeBound = (bound) => {
						writer.writeU8({
							included: 0,
							excluded: 1,
							unbounded: 2
						}[bound.tag]);
						if (bound.tag !== "unbounded") serializeTerm(writer, bound.value);
					};
					writeBound(term.from);
					const rstartLen = writer.offset - rstartOffset;
					writeBound(term.to);
					return [
						rstartOffset,
						prefix_elems,
						rstartLen,
						writer.offset - rstartLen
					];
				} else {
					writer.writeU8(0);
					serializeTerm(writer, term);
					return [
						rstartOffset,
						prefix_elems,
						writer.offset,
						0
					];
				}
			};
			index = {
				filter: (range) => {
					if (range.length === numColumns) {
						const buf = LEAF_BUF;
						const point_len = serializePoint(buf, range);
						return tableIterator(sys.datastore_index_scan_point_bsatn(index_id, buf.buffer, point_len), deserializeRow);
					} else {
						const buf = LEAF_BUF;
						const args = serializeRange(buf, range);
						return tableIterator(sys.datastore_index_scan_range_bsatn(index_id, buf.buffer, ...args), deserializeRow);
					}
				},
				delete: (range) => {
					if (range.length === numColumns) {
						const buf = LEAF_BUF;
						const point_len = serializePoint(buf, range);
						return sys.datastore_delete_by_index_scan_point_bsatn(index_id, buf.buffer, point_len);
					} else {
						const buf = LEAF_BUF;
						const args = serializeRange(buf, range);
						return sys.datastore_delete_by_index_scan_range_bsatn(index_id, buf.buffer, ...args);
					}
				}
			};
		}
		if (Object.hasOwn(tableView, accessorName)) freeze(Object.assign(tableView[accessorName], index));
		else tableView[accessorName] = freeze(index);
	}
	return freeze(tableView);
}
function* tableIterator(id, deserialize) {
	using iter = new IteratorHandle(id);
	const iterBuf = takeBuf();
	try {
		let amt;
		while (amt = iter.advance(iterBuf)) {
			const reader = new BinaryReader(iterBuf.view);
			while (reader.offset < amt) yield deserialize(reader);
		}
	} finally {
		returnBuf(iterBuf);
	}
}
function tableIterateOne(id, deserialize) {
	const buf = LEAF_BUF;
	if (advanceIterRaw(id, buf) !== 0) {
		BINARY_READER.reset(buf.view);
		return deserialize(BINARY_READER);
	}
	return null;
}
function advanceIterRaw(id, buf) {
	while (true) try {
		return 0 | sys.row_iter_bsatn_advance(id, buf.buffer);
	} catch (e) {
		if (e && typeof e === "object" && hasOwn(e, "__buffer_too_small__")) {
			buf.grow(e.__buffer_too_small__);
			continue;
		}
		throw e;
	}
}
var DEFAULT_BUFFER_CAPACITY = 32 * 1024 * 2;
var ITER_BUFS = [new ResizableBuffer(DEFAULT_BUFFER_CAPACITY)];
var ITER_BUF_COUNT = 1;
function takeBuf() {
	return ITER_BUF_COUNT ? ITER_BUFS[--ITER_BUF_COUNT] : new ResizableBuffer(DEFAULT_BUFFER_CAPACITY);
}
function returnBuf(buf) {
	ITER_BUFS[ITER_BUF_COUNT++] = buf;
}
var LEAF_BUF = new ResizableBuffer(DEFAULT_BUFFER_CAPACITY);
var IteratorHandle = class _IteratorHandle {
	#id;
	static #finalizationRegistry = new FinalizationRegistry(sys.row_iter_bsatn_close);
	constructor(id) {
		this.#id = id;
		_IteratorHandle.#finalizationRegistry.register(this, id, this);
	}
	/** Unregister this object with the finalization registry and return the id */
	#detach() {
		const id = this.#id;
		this.#id = -1;
		_IteratorHandle.#finalizationRegistry.unregister(this);
		return id;
	}
	/** Call `row_iter_bsatn_advance`, returning 0 if this iterator has been exhausted. */
	advance(buf) {
		if (this.#id === -1) return 0;
		const ret = advanceIterRaw(this.#id, buf);
		if (ret <= 0) this.#detach();
		return ret < 0 ? -ret : ret;
	}
	[Symbol.dispose]() {
		if (this.#id >= 0) {
			const id = this.#detach();
			sys.row_iter_bsatn_close(id);
		}
	}
};
var { freeze: freeze2 } = Object;
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder("utf-8");
var makeResponse = Symbol("makeResponse");
var SyncResponse = class _SyncResponse {
	#body;
	#inner;
	constructor(body, init) {
		if (body == null) this.#body = null;
		else if (typeof body === "string") this.#body = body;
		else this.#body = new Uint8Array(body).buffer;
		this.#inner = {
			headers: new Headers(init?.headers),
			status: init?.status ?? 200,
			statusText: init?.statusText ?? "",
			type: "default",
			url: null,
			aborted: false
		};
	}
	static [makeResponse](body, inner) {
		const me = new _SyncResponse(body);
		me.#inner = inner;
		return me;
	}
	get headers() {
		return this.#inner.headers;
	}
	get status() {
		return this.#inner.status;
	}
	get statusText() {
		return this.#inner.statusText;
	}
	get ok() {
		return 200 <= this.#inner.status && this.#inner.status <= 299;
	}
	get url() {
		return this.#inner.url ?? "";
	}
	get type() {
		return this.#inner.type;
	}
	arrayBuffer() {
		return this.bytes().buffer;
	}
	bytes() {
		if (this.#body == null) return new Uint8Array();
		else if (typeof this.#body === "string") return textEncoder.encode(this.#body);
		else return new Uint8Array(this.#body);
	}
	json() {
		return JSON.parse(this.text());
	}
	text() {
		if (this.#body == null) return "";
		else if (typeof this.#body === "string") return this.#body;
		else return textDecoder.decode(this.#body);
	}
};
var requestBaseSize = bsatnBaseSize({ types: [] }, HttpRequest.algebraicType);
var methods = /* @__PURE__ */ new Map([
	["GET", { tag: "Get" }],
	["HEAD", { tag: "Head" }],
	["POST", { tag: "Post" }],
	["PUT", { tag: "Put" }],
	["DELETE", { tag: "Delete" }],
	["CONNECT", { tag: "Connect" }],
	["OPTIONS", { tag: "Options" }],
	["TRACE", { tag: "Trace" }],
	["PATCH", { tag: "Patch" }]
]);
function fetch(url, init = {}) {
	const method = methods.get(init.method?.toUpperCase() ?? "GET") ?? {
		tag: "Extension",
		value: init.method
	};
	const headers = { entries: headersToList(new Headers(init.headers)).flatMap(([k, v]) => Array.isArray(v) ? v.map((v2) => [k, v2]) : [[k, v]]).map(([name, value]) => ({
		name,
		value: textEncoder.encode(value)
	})) };
	const uri = "" + url;
	const request = freeze2({
		method,
		headers,
		timeout: init.timeout,
		uri,
		version: { tag: "Http11" }
	});
	const requestBuf = new BinaryWriter(requestBaseSize);
	HttpRequest.serialize(requestBuf, request);
	const body = init.body == null ? new Uint8Array() : typeof init.body === "string" ? init.body : new Uint8Array(init.body);
	const [responseBuf, responseBody] = sys.procedure_http_request(requestBuf.getBuffer(), body);
	const response = HttpResponse.deserialize(new BinaryReader(responseBuf));
	return SyncResponse[makeResponse](responseBody, {
		type: "basic",
		url: uri,
		status: response.code,
		statusText: (0, import_statuses.default)(response.code),
		headers: new Headers(),
		aborted: false
	});
}
freeze2(fetch);
var httpClient = freeze2({ fetch });
function makeProcedureExport(ctx, opts, params, ret, fn) {
	const name = opts?.name;
	const procedureExport = (...args) => fn(...args);
	procedureExport[exportContext] = ctx;
	procedureExport[registerExport] = (ctx2, exportName) => {
		registerProcedure(ctx2, name ?? exportName, params, ret, fn);
		ctx2.functionExports.set(procedureExport, name ?? exportName);
	};
	return procedureExport;
}
var TransactionCtxImpl = class TransactionCtx extends ReducerCtxImpl {};
function registerProcedure(ctx, exportName, params, ret, fn, opts) {
	ctx.defineFunction(exportName);
	const paramsType = { elements: Object.entries(params).map(([n, c]) => ({
		name: n,
		algebraicType: ctx.registerTypesRecursively("typeBuilder" in c ? c.typeBuilder : c).algebraicType
	})) };
	const returnType = ctx.registerTypesRecursively(ret).algebraicType;
	ctx.moduleDef.procedures.push({
		sourceName: exportName,
		params: paramsType,
		returnType,
		visibility: FunctionVisibility.ClientCallable
	});
	const { typespace } = ctx;
	ctx.procedures.push({
		fn,
		deserializeArgs: ProductType.makeDeserializer(paramsType, typespace),
		serializeReturn: AlgebraicType.makeSerializer(returnType, typespace),
		returnTypeBaseSize: bsatnBaseSize(typespace, returnType)
	});
}
function callProcedure(moduleCtx, id, sender, connectionId, timestamp, argsBuf, dbView) {
	const { fn, deserializeArgs, serializeReturn, returnTypeBaseSize } = moduleCtx.procedures[id];
	const args = deserializeArgs(new BinaryReader(argsBuf));
	const ret = callUserFunction(fn, new ProcedureCtxImpl(sender, timestamp, connectionId, dbView), args);
	const retBuf = new BinaryWriter(returnTypeBaseSize);
	serializeReturn(retBuf, ret);
	return retBuf.getBuffer();
}
var ProcedureCtxImpl = class ProcedureCtx {
	constructor(sender, timestamp, connectionId, dbView) {
		this.sender = sender;
		this.timestamp = timestamp;
		this.connectionId = connectionId;
		this.#dbView = dbView;
	}
	#identity;
	#uuidCounter;
	#random;
	#dbView;
	get identity() {
		return this.#identity ??= new Identity(sys.identity());
	}
	get random() {
		return this.#random ??= makeRandom(this.timestamp);
	}
	get http() {
		return httpClient;
	}
	withTx(body) {
		const run = () => {
			const timestamp = sys.procedure_start_mut_tx();
			try {
				return body(new TransactionCtxImpl(this.sender, new Timestamp(timestamp), this.connectionId, this.#dbView()));
			} catch (e) {
				sys.procedure_abort_mut_tx();
				throw e;
			}
		};
		let res = run();
		try {
			sys.procedure_commit_mut_tx();
			return res;
		} catch {}
		console.warn("committing anonymous transaction failed");
		res = run();
		try {
			sys.procedure_commit_mut_tx();
			return res;
		} catch (e) {
			throw new Error("transaction retry failed again", { cause: e });
		}
	}
	newUuidV4() {
		const bytes = this.random.fill(new Uint8Array(16));
		return Uuid.fromRandomBytesV4(bytes);
	}
	newUuidV7() {
		const bytes = this.random.fill(new Uint8Array(4));
		const counter = this.#uuidCounter ??= { value: 0 };
		return Uuid.fromCounterV7(counter, this.timestamp, bytes);
	}
};
function makeReducerExport(ctx, opts, params, fn, lifecycle) {
	const reducerExport = (...args) => fn(...args);
	reducerExport[exportContext] = ctx;
	reducerExport[registerExport] = (ctx2, exportName) => {
		registerReducer(ctx2, exportName, params, fn, opts, lifecycle);
		ctx2.functionExports.set(reducerExport, exportName);
	};
	return reducerExport;
}
function registerReducer(ctx, exportName, params, fn, opts, lifecycle) {
	ctx.defineFunction(exportName);
	if (!(params instanceof RowBuilder)) params = new RowBuilder(params);
	if (params.typeName === void 0) params.typeName = toPascalCase(exportName);
	const ref = ctx.registerTypesRecursively(params);
	const paramsType = ctx.resolveType(ref).value;
	const isLifecycle = lifecycle != null;
	ctx.moduleDef.reducers.push({
		sourceName: exportName,
		params: paramsType,
		visibility: FunctionVisibility.ClientCallable,
		okReturnType: AlgebraicType.Product({ elements: [] }),
		errReturnType: AlgebraicType.String
	});
	if (opts?.name != null) ctx.moduleDef.explicitNames.entries.push({
		tag: "Function",
		value: {
			sourceName: exportName,
			canonicalName: opts.name
		}
	});
	if (isLifecycle) ctx.moduleDef.lifeCycleReducers.push({
		lifecycleSpec: lifecycle,
		functionName: exportName
	});
	if (!fn.name) Object.defineProperty(fn, "name", {
		value: exportName,
		writable: false
	});
	ctx.reducers.push(fn);
}
var SchemaInner = class extends ModuleContext {
	schemaType;
	existingFunctions = /* @__PURE__ */ new Set();
	reducers = [];
	procedures = [];
	views = [];
	anonViews = [];
	/**
	* Maps ReducerExport objects to the name of the reducer.
	* Used for resolving the reducers of scheduled tables.
	*/
	functionExports = /* @__PURE__ */ new Map();
	pendingSchedules = [];
	constructor(getSchemaType) {
		super();
		this.schemaType = getSchemaType(this);
	}
	defineFunction(name) {
		if (this.existingFunctions.has(name)) throw new TypeError(`There is already a reducer or procedure with the name '${name}'`);
		this.existingFunctions.add(name);
	}
	resolveSchedules() {
		for (const { reducer, scheduleAtCol, tableName } of this.pendingSchedules) {
			const functionName = this.functionExports.get(reducer());
			if (functionName === void 0) {
				const msg = `Table ${tableName} defines a schedule, but it seems like the associated function was not exported.`;
				throw new TypeError(msg);
			}
			this.moduleDef.schedules.push({
				sourceName: void 0,
				tableName,
				scheduleAtCol,
				functionName
			});
		}
	}
};
var Schema = class {
	#ctx;
	constructor(ctx) {
		this.#ctx = ctx;
	}
	[moduleHooks](exports) {
		const registeredSchema = this.#ctx;
		for (const [name, moduleExport] of Object.entries(exports)) {
			if (name === "default") continue;
			if (!isModuleExport(moduleExport)) throw new TypeError("exporting something that is not a spacetime export");
			checkExportContext(moduleExport, registeredSchema);
			moduleExport[registerExport](registeredSchema, name);
		}
		registeredSchema.resolveSchedules();
		return makeHooks(registeredSchema);
	}
	get schemaType() {
		return this.#ctx.schemaType;
	}
	get moduleDef() {
		return this.#ctx.moduleDef;
	}
	get typespace() {
		return this.#ctx.typespace;
	}
	reducer(...args) {
		let opts, params = {}, fn;
		switch (args.length) {
			case 1:
				[fn] = args;
				break;
			case 2: {
				let arg1;
				[arg1, fn] = args;
				if (typeof arg1.name === "string") opts = arg1;
				else params = arg1;
				break;
			}
			case 3:
				[opts, params, fn] = args;
				break;
		}
		return makeReducerExport(this.#ctx, opts, params, fn);
	}
	init(...args) {
		let opts, fn;
		switch (args.length) {
			case 1:
				[fn] = args;
				break;
			case 2:
				[opts, fn] = args;
				break;
		}
		return makeReducerExport(this.#ctx, opts, {}, fn, Lifecycle.Init);
	}
	clientConnected(...args) {
		let opts, fn;
		switch (args.length) {
			case 1:
				[fn] = args;
				break;
			case 2:
				[opts, fn] = args;
				break;
		}
		return makeReducerExport(this.#ctx, opts, {}, fn, Lifecycle.OnConnect);
	}
	clientDisconnected(...args) {
		let opts, fn;
		switch (args.length) {
			case 1:
				[fn] = args;
				break;
			case 2:
				[opts, fn] = args;
				break;
		}
		return makeReducerExport(this.#ctx, opts, {}, fn, Lifecycle.OnDisconnect);
	}
	view(opts, ret, fn) {
		return makeViewExport(this.#ctx, opts, {}, ret, fn);
	}
	anonymousView(opts, ret, fn) {
		return makeAnonViewExport(this.#ctx, opts, {}, ret, fn);
	}
	procedure(...args) {
		let opts, params = {}, ret, fn;
		switch (args.length) {
			case 2:
				[ret, fn] = args;
				break;
			case 3: {
				let arg1;
				[arg1, ret, fn] = args;
				if (typeof arg1.name === "string") opts = arg1;
				else params = arg1;
				break;
			}
			case 4:
				[opts, params, ret, fn] = args;
				break;
		}
		return makeProcedureExport(this.#ctx, opts, params, ret, fn);
	}
	/**
	* Bundle multiple reducers, procedures, etc into one value to export.
	* The name they will be exported with is their corresponding key in the `exports` argument.
	*/
	exportGroup(exports) {
		return {
			[exportContext]: this.#ctx,
			[registerExport](ctx, _exportName) {
				for (const [exportName, moduleExport] of Object.entries(exports)) {
					checkExportContext(moduleExport, ctx);
					moduleExport[registerExport](ctx, exportName);
				}
			}
		};
	}
	clientVisibilityFilter = { sql: (filter) => ({
		[exportContext]: this.#ctx,
		[registerExport](ctx, _exportName) {
			ctx.moduleDef.rowLevelSecurity.push({ sql: filter });
		}
	}) };
};
var registerExport = Symbol("SpacetimeDB.registerExport");
var exportContext = Symbol("SpacetimeDB.exportContext");
function isModuleExport(x) {
	return (typeof x === "function" || typeof x === "object") && x !== null && registerExport in x;
}
function checkExportContext(exp, schema2) {
	if (exp[exportContext] != null && exp[exportContext] !== schema2) throw new TypeError("multiple schemas are not supported");
}
function schema(tables, moduleSettings) {
	return new Schema(new SchemaInner((ctx2) => {
		if (moduleSettings?.CASE_CONVERSION_POLICY != null) ctx2.setCaseConversionPolicy(moduleSettings.CASE_CONVERSION_POLICY);
		const tableSchemas = {};
		for (const [accName, table2] of Object.entries(tables)) {
			const tableDef = table2.tableDef(ctx2, accName);
			tableSchemas[accName] = tableToSchema(accName, table2, tableDef);
			ctx2.moduleDef.tables.push(tableDef);
			if (table2.schedule) ctx2.pendingSchedules.push({
				...table2.schedule,
				tableName: tableDef.sourceName
			});
			if (table2.tableName) ctx2.moduleDef.explicitNames.entries.push({
				tag: "Table",
				value: {
					sourceName: accName,
					canonicalName: table2.tableName
				}
			});
		}
		return { tables: tableSchemas };
	}));
}
var import_object_inspect = __toESM(require_object_inspect());
var fmtLog = (...data) => data.map((x) => typeof x === "string" ? x : (0, import_object_inspect.default)(x)).join(" ");
var console_level_error = 0;
var console_level_warn = 1;
var console_level_info = 2;
var console_level_debug = 3;
var console_level_trace = 4;
var timerMap = /* @__PURE__ */ new Map();
var console2 = {
	__proto__: {},
	[Symbol.toStringTag]: "console",
	assert: (condition = false, ...data) => {
		if (!condition) sys.console_log(console_level_error, fmtLog(...data));
	},
	clear: () => {},
	debug: (...data) => {
		sys.console_log(console_level_debug, fmtLog(...data));
	},
	error: (...data) => {
		sys.console_log(console_level_error, fmtLog(...data));
	},
	info: (...data) => {
		sys.console_log(console_level_info, fmtLog(...data));
	},
	log: (...data) => {
		sys.console_log(console_level_info, fmtLog(...data));
	},
	table: (tabularData, _properties) => {
		sys.console_log(console_level_info, fmtLog(tabularData));
	},
	trace: (...data) => {
		sys.console_log(console_level_trace, fmtLog(...data));
	},
	warn: (...data) => {
		sys.console_log(console_level_warn, fmtLog(...data));
	},
	dir: (_item, _options) => {},
	dirxml: (..._data) => {},
	count: (_label = "default") => {},
	countReset: (_label = "default") => {},
	group: (..._data) => {},
	groupCollapsed: (..._data) => {},
	groupEnd: () => {},
	time: (label = "default") => {
		if (timerMap.has(label)) {
			sys.console_log(console_level_warn, `Timer '${label}' already exists.`);
			return;
		}
		timerMap.set(label, sys.console_timer_start(label));
	},
	timeLog: (label = "default", ...data) => {
		sys.console_log(console_level_info, fmtLog(label, ...data));
	},
	timeEnd: (label = "default") => {
		const spanId = timerMap.get(label);
		if (spanId === void 0) {
			sys.console_log(console_level_warn, `Timer '${label}' does not exist.`);
			return;
		}
		sys.console_timer_end(spanId);
		timerMap.delete(label);
	},
	timeStamp: () => {},
	profile: () => {},
	profileEnd: () => {}
};
globalThis.console = console2;

//#endregion
//#region src/schema/auth.ts
const UserAccount = table({ name: "user_account" }, {
	id: t.u64().primaryKey().autoInc(),
	email: t.string().unique(),
	fullName: t.string(),
	country: t.string(),
	passwordHash: t.string(),
	emailVerifiedAt: t.timestamp().optional(),
	createdAt: t.timestamp(),
	updatedAt: t.timestamp()
});
const Session = table({ name: "session" }, {
	id: t.u64().primaryKey().autoInc(),
	userId: t.u64().index("btree"),
	tokenHash: t.string().unique(),
	expiresAt: t.timestamp(),
	revokedAt: t.timestamp().optional(),
	createdAt: t.timestamp()
});
const EmailVerificationToken = table({ name: "email_verification_token" }, {
	id: t.u64().primaryKey().autoInc(),
	userId: t.u64().index("btree"),
	email: t.string(),
	tokenHash: t.string().unique(),
	expiresAt: t.timestamp(),
	consumedAt: t.timestamp().optional(),
	createdAt: t.timestamp()
});
const AuthAuditEvent = table({
	name: "auth_audit_event",
	indexes: [{
		name: "auth_audit_event_user_id",
		accessor: "auth_audit_event_user_id",
		algorithm: "btree",
		columns: ["userId"]
	}]
}, {
	id: t.u64().primaryKey().autoInc(),
	userId: t.u64().optional(),
	eventType: t.string(),
	eventDetailsJson: t.string(),
	createdAt: t.timestamp()
});

//#endregion
//#region src/schema/locations.ts
const Location = table({
	name: "location",
	indexes: [{
		name: "location_trip_id",
		accessor: "location_trip_id",
		algorithm: "btree",
		columns: ["tripId"]
	}, {
		name: "location_scheduled_date",
		accessor: "location_scheduled_date",
		algorithm: "btree",
		columns: ["scheduledDate"]
	}]
}, {
	id: t.u64().primaryKey().autoInc(),
	tripId: t.u64(),
	locationTitle: t.string(),
	lat: t.f64(),
	lng: t.f64(),
	scheduledDate: t.string().optional(),
	order: t.i32(),
	placeId: t.string().optional(),
	placeTypesJson: t.string(),
	placeCategory: t.string().optional(),
	appreciation: t.i32().optional(),
	priceSentiment: t.string().optional(),
	notes: t.string().optional(),
	createdAt: t.timestamp()
});

//#endregion
//#region src/schema/trips.ts
const Trip = table({ name: "trip" }, {
	id: t.u64().primaryKey().autoInc(),
	userId: t.u64().index("btree"),
	title: t.string(),
	description: t.string(),
	coverImageUrl: t.string().optional(),
	imagesJson: t.string(),
	startDate: t.timestamp(),
	endDate: t.timestamp(),
	createdAt: t.timestamp(),
	updatedAt: t.timestamp()
});

//#endregion
//#region src/schema/index.ts
const spacetimedb = schema({
	userAccount: UserAccount,
	session: Session,
	emailVerificationToken: EmailVerificationToken,
	trip: Trip,
	location: Location,
	authAuditEvent: AuthAuditEvent
});

//#endregion
//#region src/modules/core/reducers.ts
const init = spacetimedb.reducer((ctx) => {});

//#endregion
//#region src/shared/utils.ts
const normalizeEmail = (email) => email.trim().toLowerCase();
const isExpired = (value, now) => value.microsSinceUnixEpoch <= now.microsSinceUnixEpoch;
const compareMaybeStrings = (left, right) => {
	if (left && right) return left.localeCompare(right);
	if (left) return -1;
	if (right) return 1;
	return 0;
};
const sortTrips = (trips) => trips.sort((left, right) => {
	const diff = right.startDate.microsSinceUnixEpoch - left.startDate.microsSinceUnixEpoch;
	if (diff > 0n) return 1;
	if (diff < 0n) return -1;
	return 0;
});
const sortLocations = (locations) => locations.sort((left, right) => {
	const dateComparison = compareMaybeStrings(left.scheduledDate, right.scheduledDate);
	if (dateComparison !== 0) return dateComparison;
	if (left.order !== right.order) return left.order - right.order;
	return left.locationTitle.localeCompare(right.locationTitle);
});

//#endregion
//#region src/modules/auth/reducers.ts
const create_user_account = spacetimedb.reducer({
	email: t.string(),
	fullName: t.string(),
	country: t.string(),
	passwordHash: t.string(),
	verificationTokenHash: t.string(),
	verificationExpiresAt: t.timestamp()
}, (ctx, { email, fullName, country, passwordHash, verificationTokenHash, verificationExpiresAt }) => {
	const normalizedEmail = normalizeEmail(email);
	const trimmedName = fullName.trim();
	const trimmedCountry = country.trim();
	if (!normalizedEmail || !trimmedName || !trimmedCountry || !passwordHash) throw new Error("Missing required user fields");
	if (ctx.db.userAccount.email.find(normalizedEmail)) throw new Error("A user with this email already exists");
	const user = ctx.db.userAccount.insert({
		id: 0n,
		email: normalizedEmail,
		fullName: trimmedName,
		country: trimmedCountry,
		passwordHash,
		emailVerifiedAt: void 0,
		createdAt: ctx.timestamp,
		updatedAt: ctx.timestamp
	});
	ctx.db.emailVerificationToken.insert({
		id: 0n,
		userId: user.id,
		email: normalizedEmail,
		tokenHash: verificationTokenHash,
		expiresAt: verificationExpiresAt,
		consumedAt: void 0,
		createdAt: ctx.timestamp
	});
	ctx.db.authAuditEvent.insert({
		id: 0n,
		userId: user.id,
		eventType: "user_registered",
		eventDetailsJson: JSON.stringify({ email: normalizedEmail }),
		createdAt: ctx.timestamp
	});
});
const create_session = spacetimedb.reducer({
	userId: t.u64(),
	tokenHash: t.string(),
	expiresAt: t.timestamp()
}, (ctx, { userId, tokenHash, expiresAt }) => {
	if (!ctx.db.userAccount.id.find(userId)) throw new Error("User not found");
	if (ctx.db.session.tokenHash.find(tokenHash)) throw new Error("Session token already exists");
	ctx.db.session.insert({
		id: 0n,
		userId,
		tokenHash,
		expiresAt,
		revokedAt: void 0,
		createdAt: ctx.timestamp
	});
	ctx.db.authAuditEvent.insert({
		id: 0n,
		userId,
		eventType: "session_created",
		eventDetailsJson: JSON.stringify({}),
		createdAt: ctx.timestamp
	});
});
const revoke_session_by_token_hash = spacetimedb.reducer({ tokenHash: t.string() }, (ctx, { tokenHash }) => {
	const session = ctx.db.session.tokenHash.find(tokenHash);
	if (!session || session.revokedAt) return;
	ctx.db.session.id.update({
		...session,
		revokedAt: ctx.timestamp
	});
	ctx.db.authAuditEvent.insert({
		id: 0n,
		userId: session.userId,
		eventType: "session_revoked",
		eventDetailsJson: JSON.stringify({}),
		createdAt: ctx.timestamp
	});
});

//#endregion
//#region src/shared/mappers.ts
const toUserAuthRecord = (user) => ({
	id: user.id,
	email: user.email,
	fullName: user.fullName,
	country: user.country,
	passwordHash: user.passwordHash,
	emailVerifiedAt: user.emailVerifiedAt,
	createdAt: user.createdAt,
	updatedAt: user.updatedAt
});
const toSessionUserRecord = (user) => ({
	id: user.id,
	email: user.email,
	fullName: user.fullName,
	country: user.country,
	emailVerifiedAt: user.emailVerifiedAt,
	createdAt: user.createdAt,
	updatedAt: user.updatedAt
});
const toTripRecord = (trip) => ({
	id: trip.id,
	userId: trip.userId,
	title: trip.title,
	description: trip.description,
	coverImageUrl: trip.coverImageUrl,
	imagesJson: trip.imagesJson,
	startDate: trip.startDate,
	endDate: trip.endDate,
	createdAt: trip.createdAt,
	updatedAt: trip.updatedAt
});
const toLocationRecord = (location) => ({
	id: location.id,
	tripId: location.tripId,
	locationTitle: location.locationTitle,
	lat: location.lat,
	lng: location.lng,
	scheduledDate: location.scheduledDate,
	order: location.order,
	placeId: location.placeId,
	placeTypesJson: location.placeTypesJson,
	placeCategory: location.placeCategory,
	appreciation: location.appreciation,
	priceSentiment: location.priceSentiment,
	notes: location.notes,
	createdAt: location.createdAt
});

//#endregion
//#region src/shared/types.ts
const UserAuthRecord = t.object("UserAuthRecord", {
	id: t.u64(),
	email: t.string(),
	fullName: t.string(),
	country: t.string(),
	passwordHash: t.string(),
	emailVerifiedAt: t.timestamp().optional(),
	createdAt: t.timestamp(),
	updatedAt: t.timestamp()
});
const SessionUserRecord = t.object("SessionUserRecord", {
	id: t.u64(),
	email: t.string(),
	fullName: t.string(),
	country: t.string(),
	emailVerifiedAt: t.timestamp().optional(),
	createdAt: t.timestamp(),
	updatedAt: t.timestamp()
});
const VerifyEmailResult = t.object("VerifyEmailResult", {
	ok: t.bool(),
	reason: t.string().optional(),
	userId: t.u64().optional(),
	email: t.string().optional()
});
const TripRecord = t.object("TripRecord", {
	id: t.u64(),
	userId: t.u64(),
	title: t.string(),
	description: t.string(),
	coverImageUrl: t.string().optional(),
	imagesJson: t.string(),
	startDate: t.timestamp(),
	endDate: t.timestamp(),
	createdAt: t.timestamp(),
	updatedAt: t.timestamp()
});
const LocationRecord = t.object("LocationRecord", {
	id: t.u64(),
	tripId: t.u64(),
	locationTitle: t.string(),
	lat: t.f64(),
	lng: t.f64(),
	scheduledDate: t.string().optional(),
	order: t.i32(),
	placeId: t.string().optional(),
	placeTypesJson: t.string(),
	placeCategory: t.string().optional(),
	appreciation: t.i32().optional(),
	priceSentiment: t.string().optional(),
	notes: t.string().optional(),
	createdAt: t.timestamp()
});
const TripWithLocationsRecord = t.object("TripWithLocationsRecord", {
	trip: TripRecord,
	locations: t.array(LocationRecord)
});
const GlobeLocationRecord = t.object("GlobeLocationRecord", {
	tripTitle: t.string(),
	locationTitle: t.string(),
	lat: t.f64(),
	lng: t.f64()
});
const ItineraryLocationInput = t.object("ItineraryLocationInput", {
	id: t.u64().optional(),
	locationTitle: t.string(),
	lat: t.f64(),
	lng: t.f64(),
	scheduledDate: t.string(),
	order: t.i32(),
	placeId: t.string().optional(),
	placeTypesJson: t.string(),
	placeCategory: t.string().optional(),
	appreciation: t.i32().optional(),
	priceSentiment: t.string().optional(),
	notes: t.string().optional()
});

//#endregion
//#region src/modules/auth/procedures.ts
const get_user_auth_by_email = spacetimedb.procedure({ email: t.string() }, t.option(UserAuthRecord), (ctx, { email }) => {
	return ctx.withTx((tx) => {
		const user = tx.db.userAccount.email.find(normalizeEmail(email));
		return user ? toUserAuthRecord(user) : void 0;
	});
});
const get_session_user_by_token_hash = spacetimedb.procedure({ tokenHash: t.string() }, t.option(SessionUserRecord), (ctx, { tokenHash }) => {
	return ctx.withTx((tx) => {
		const session = tx.db.session.tokenHash.find(tokenHash);
		if (!session || session.revokedAt || isExpired(session.expiresAt, tx.timestamp)) return;
		const user = tx.db.userAccount.id.find(session.userId);
		return user ? toSessionUserRecord(user) : void 0;
	});
});
const verify_email_token = spacetimedb.procedure({ tokenHash: t.string() }, VerifyEmailResult, (ctx, { tokenHash }) => {
	return ctx.withTx((tx) => {
		const token = tx.db.emailVerificationToken.tokenHash.find(tokenHash);
		if (!token) return {
			ok: false,
			reason: "invalid_token",
			userId: void 0,
			email: void 0
		};
		if (token.consumedAt) return {
			ok: false,
			reason: "token_already_used",
			userId: void 0,
			email: void 0
		};
		if (isExpired(token.expiresAt, tx.timestamp)) return {
			ok: false,
			reason: "token_expired",
			userId: void 0,
			email: void 0
		};
		const user = tx.db.userAccount.id.find(token.userId);
		if (!user) return {
			ok: false,
			reason: "user_not_found",
			userId: void 0,
			email: void 0
		};
		tx.db.userAccount.id.update({
			...user,
			emailVerifiedAt: user.emailVerifiedAt ?? tx.timestamp,
			updatedAt: tx.timestamp
		});
		tx.db.emailVerificationToken.id.update({
			...token,
			consumedAt: tx.timestamp
		});
		tx.db.authAuditEvent.insert({
			id: 0n,
			userId: user.id,
			eventType: "email_verified",
			eventDetailsJson: JSON.stringify({ email: user.email }),
			createdAt: tx.timestamp
		});
		return {
			ok: true,
			reason: void 0,
			userId: user.id,
			email: user.email
		};
	});
});

//#endregion
//#region src/modules/trips/reducers.ts
const create_trip = spacetimedb.reducer({
	userId: t.u64(),
	title: t.string(),
	description: t.string(),
	coverImageUrl: t.string().optional(),
	startDate: t.timestamp(),
	endDate: t.timestamp()
}, (ctx, { userId, title, description, coverImageUrl, startDate, endDate }) => {
	const trimmedTitle = title.trim();
	const trimmedDescription = description.trim();
	if (!ctx.db.userAccount.id.find(userId)) throw new Error("User not found");
	if (!trimmedTitle || !trimmedDescription) throw new Error("Missing required trip fields");
	if (startDate.microsSinceUnixEpoch >= endDate.microsSinceUnixEpoch) throw new Error("Start date must be before end date");
	ctx.db.trip.insert({
		id: 0n,
		userId,
		title: trimmedTitle,
		description: trimmedDescription,
		coverImageUrl: coverImageUrl?.trim() || void 0,
		imagesJson: "[]",
		startDate,
		endDate,
		createdAt: ctx.timestamp,
		updatedAt: ctx.timestamp
	});
});

//#endregion
//#region src/modules/trips/procedures.ts
const list_trips_by_user = spacetimedb.procedure({ userId: t.u64() }, t.array(TripRecord), (ctx, { userId }) => {
	return ctx.withTx((tx) => {
		return sortTrips([...tx.db.trip.userId.filter(userId)]).map(toTripRecord);
	});
});

//#endregion
//#region src/shared/guards.ts
const requireOwnedTrip = (db, userId, tripId) => {
	const trip = db.trip.id.find(tripId);
	if (!trip || trip.userId !== userId) throw new Error("Trip not found");
	return trip;
};

//#endregion
//#region src/modules/itinerary/helpers.ts
const insertLocation = (ctx, tripId, location) => {
	ctx.db.location.insert({
		id: 0n,
		tripId,
		locationTitle: location.locationTitle,
		lat: location.lat,
		lng: location.lng,
		scheduledDate: location.scheduledDate,
		order: location.order,
		placeId: location.placeId,
		placeTypesJson: location.placeTypesJson ?? "[]",
		placeCategory: location.placeCategory,
		appreciation: location.appreciation,
		priceSentiment: location.priceSentiment,
		notes: location.notes,
		createdAt: ctx.timestamp
	});
};

//#endregion
//#region src/modules/itinerary/reducers.ts
const add_location = spacetimedb.reducer({
	userId: t.u64(),
	tripId: t.u64(),
	locationTitle: t.string(),
	lat: t.f64(),
	lng: t.f64()
}, (ctx, { userId, tripId, locationTitle, lat, lng }) => {
	requireOwnedTrip(ctx.db, userId, tripId);
	insertLocation(ctx, tripId, {
		locationTitle,
		lat,
		lng,
		order: [...ctx.db.location.location_trip_id.filter(tripId)].length
	});
});
const create_itinerary = spacetimedb.reducer({
	userId: t.u64(),
	tripId: t.u64(),
	locations: t.array(ItineraryLocationInput)
}, (ctx, { userId, tripId, locations }) => {
	requireOwnedTrip(ctx.db, userId, tripId);
	if ([...ctx.db.location.location_trip_id.filter(tripId)].length > 0) throw new Error("This trip already has an itinerary. Use edit instead.");
	for (const location of locations) insertLocation(ctx, tripId, location);
});
const save_itinerary = spacetimedb.reducer({
	userId: t.u64(),
	tripId: t.u64(),
	locations: t.array(ItineraryLocationInput),
	deletedLocationIds: t.array(t.u64())
}, (ctx, { userId, tripId, locations, deletedLocationIds }) => {
	requireOwnedTrip(ctx.db, userId, tripId);
	const existingLocations = new Map([...ctx.db.location.location_trip_id.filter(tripId)].map((location) => [location.id, location]));
	for (const locationId of deletedLocationIds) {
		if (!existingLocations.get(locationId)) throw new Error("Invalid itinerary location");
		ctx.db.location.id.delete(locationId);
		existingLocations.delete(locationId);
	}
	for (const location of locations) {
		if (!location.id) {
			insertLocation(ctx, tripId, location);
			continue;
		}
		const existingLocation = existingLocations.get(location.id);
		if (!existingLocation) throw new Error("Invalid itinerary location");
		ctx.db.location.id.update({
			...existingLocation,
			locationTitle: location.locationTitle,
			lat: location.lat,
			lng: location.lng,
			scheduledDate: location.scheduledDate,
			order: location.order,
			placeId: location.placeId,
			placeTypesJson: location.placeTypesJson,
			placeCategory: location.placeCategory,
			appreciation: location.appreciation,
			priceSentiment: location.priceSentiment,
			notes: location.notes
		});
	}
});
const reorder_itinerary_day = spacetimedb.reducer({
	userId: t.u64(),
	tripId: t.u64(),
	scheduledDate: t.string(),
	newOrder: t.array(t.u64())
}, (ctx, { userId, tripId, scheduledDate, newOrder }) => {
	requireOwnedTrip(ctx.db, userId, tripId);
	if (new Set(newOrder).size !== newOrder.length) throw new Error("Invalid itinerary order");
	for (let index = 0; index < newOrder.length; index += 1) {
		const locationId = newOrder[index];
		const location = ctx.db.location.id.find(locationId);
		if (!location || location.tripId !== tripId || location.scheduledDate !== scheduledDate) throw new Error("Invalid itinerary order");
		ctx.db.location.id.update({
			...location,
			order: index
		});
	}
});

//#endregion
//#region src/modules/itinerary/procedures.ts
const get_trip_with_locations = spacetimedb.procedure({
	userId: t.u64(),
	tripId: t.u64()
}, t.option(TripWithLocationsRecord), (ctx, { userId, tripId }) => {
	return ctx.withTx((tx) => {
		const trip = tx.db.trip.id.find(tripId);
		if (!trip || trip.userId !== userId) return;
		const locations = sortLocations([...tx.db.location.location_trip_id.filter(tripId)]).map(toLocationRecord);
		return {
			trip: toTripRecord(trip),
			locations
		};
	});
});
const list_globe_locations_by_user = spacetimedb.procedure({ userId: t.u64() }, t.array(GlobeLocationRecord), (ctx, { userId }) => {
	return ctx.withTx((tx) => {
		const rows = [];
		for (const trip of tx.db.trip.userId.filter(userId)) for (const location of tx.db.location.location_trip_id.filter(trip.id)) rows.push({
			tripTitle: trip.title,
			locationTitle: location.locationTitle,
			lat: location.lat,
			lng: location.lng
		});
		return rows;
	});
});

//#endregion
//#region src/index.ts
var src_default = spacetimedb;

//#endregion
export { add_location, create_itinerary, create_session, create_trip, create_user_account, src_default as default, get_session_user_by_token_hash, get_trip_with_locations, get_user_auth_by_email, init, list_globe_locations_by_user, list_trips_by_user, reorder_itinerary_day, revoke_session_by_token_hash, save_itinerary, verify_email_token };
//# debugId=e0b47afe-0784-4ed7-bc87-4d0a56c68b85
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibmFtZXMiOlsiX19jcmVhdGUiLCJfX2RlZlByb3AiLCJfX2dldE93blByb3BEZXNjIiwiX19nZXRPd25Qcm9wTmFtZXMiLCJfX2dldFByb3RvT2YiLCJfX2hhc093blByb3AiLCJfX2NvbW1vbkpTIiwiX19jb3B5UHJvcHMiLCJfX3RvRVNNIiwiI2Vuc3VyZSIsIiNtb2R1bGVEZWYiLCIjcmVnaXN0ZXJDb21wb3VuZFR5cGVSZWN1cnNpdmVseSIsIiNjb21wb3VuZFR5cGVzIiwiI2Zyb20iLCIjdG8iLCIjdXVpZENvdW50ZXIiLCIjc2VuZGVyQXV0aCIsIiNpZGVudGl0eSIsIiNyYW5kb20iLCIjc2NoZW1hIiwiI3JlZHVjZXJBcmdzRGVzZXJpYWxpemVycyIsIiNkYlZpZXciLCIjZGJWaWV3XyIsIiNyZWR1Y2VyQ3R4IiwiI3JlZHVjZXJDdHhfIiwiI2ZpbmFsaXphdGlvblJlZ2lzdHJ5IiwiI2lkIiwiI2RldGFjaCIsIiNib2R5IiwiI2lubmVyIiwiI2N0eCJdLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9oZWFkZXJzLXBvbHlmaWxsL2xpYi9pbmRleC5tanMiLCJub2RlX21vZHVsZXMvc3BhY2V0aW1lZGIvZGlzdC9zZXJ2ZXIvaW5kZXgubWpzIiwic3JjL3NjaGVtYS9hdXRoLnRzIiwic3JjL3NjaGVtYS9sb2NhdGlvbnMudHMiLCJzcmMvc2NoZW1hL3RyaXBzLnRzIiwic3JjL3NjaGVtYS9pbmRleC50cyIsInNyYy9tb2R1bGVzL2NvcmUvcmVkdWNlcnMudHMiLCJzcmMvc2hhcmVkL3V0aWxzLnRzIiwic3JjL21vZHVsZXMvYXV0aC9yZWR1Y2Vycy50cyIsInNyYy9zaGFyZWQvbWFwcGVycy50cyIsInNyYy9zaGFyZWQvdHlwZXMudHMiLCJzcmMvbW9kdWxlcy9hdXRoL3Byb2NlZHVyZXMudHMiLCJzcmMvbW9kdWxlcy90cmlwcy9yZWR1Y2Vycy50cyIsInNyYy9tb2R1bGVzL3RyaXBzL3Byb2NlZHVyZXMudHMiLCJzcmMvc2hhcmVkL2d1YXJkcy50cyIsInNyYy9tb2R1bGVzL2l0aW5lcmFyeS9oZWxwZXJzLnRzIiwic3JjL21vZHVsZXMvaXRpbmVyYXJ5L3JlZHVjZXJzLnRzIiwic3JjL21vZHVsZXMvaXRpbmVyYXJ5L3Byb2NlZHVyZXMudHMiLCJzcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcbnZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19nZXRPd25Qcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgX19nZXRPd25Qcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBfX2dldFByb3RvT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfX2NvbW1vbkpTID0gKGNiLCBtb2QpID0+IGZ1bmN0aW9uIF9fcmVxdWlyZSgpIHtcbiAgcmV0dXJuIG1vZCB8fCAoMCwgY2JbX19nZXRPd25Qcm9wTmFtZXMoY2IpWzBdXSkoKG1vZCA9IHsgZXhwb3J0czoge30gfSkuZXhwb3J0cywgbW9kKSwgbW9kLmV4cG9ydHM7XG59O1xudmFyIF9fY29weVByb3BzID0gKHRvLCBmcm9tLCBleGNlcHQsIGRlc2MpID0+IHtcbiAgaWYgKGZyb20gJiYgdHlwZW9mIGZyb20gPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGZyb20gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGZvciAobGV0IGtleSBvZiBfX2dldE93blByb3BOYW1lcyhmcm9tKSlcbiAgICAgIGlmICghX19oYXNPd25Qcm9wLmNhbGwodG8sIGtleSkgJiYga2V5ICE9PSBleGNlcHQpXG4gICAgICAgIF9fZGVmUHJvcCh0bywga2V5LCB7IGdldDogKCkgPT4gZnJvbVtrZXldLCBlbnVtZXJhYmxlOiAhKGRlc2MgPSBfX2dldE93blByb3BEZXNjKGZyb20sIGtleSkpIHx8IGRlc2MuZW51bWVyYWJsZSB9KTtcbiAgfVxuICByZXR1cm4gdG87XG59O1xudmFyIF9fdG9FU00gPSAobW9kLCBpc05vZGVNb2RlLCB0YXJnZXQpID0+ICh0YXJnZXQgPSBtb2QgIT0gbnVsbCA/IF9fY3JlYXRlKF9fZ2V0UHJvdG9PZihtb2QpKSA6IHt9LCBfX2NvcHlQcm9wcyhcbiAgLy8gSWYgdGhlIGltcG9ydGVyIGlzIGluIG5vZGUgY29tcGF0aWJpbGl0eSBtb2RlIG9yIHRoaXMgaXMgbm90IGFuIEVTTVxuICAvLyBmaWxlIHRoYXQgaGFzIGJlZW4gY29udmVydGVkIHRvIGEgQ29tbW9uSlMgZmlsZSB1c2luZyBhIEJhYmVsLVxuICAvLyBjb21wYXRpYmxlIHRyYW5zZm9ybSAoaS5lLiBcIl9fZXNNb2R1bGVcIiBoYXMgbm90IGJlZW4gc2V0KSwgdGhlbiBzZXRcbiAgLy8gXCJkZWZhdWx0XCIgdG8gdGhlIENvbW1vbkpTIFwibW9kdWxlLmV4cG9ydHNcIiBmb3Igbm9kZSBjb21wYXRpYmlsaXR5LlxuICBpc05vZGVNb2RlIHx8ICFtb2QgfHwgIW1vZC5fX2VzTW9kdWxlID8gX19kZWZQcm9wKHRhcmdldCwgXCJkZWZhdWx0XCIsIHsgdmFsdWU6IG1vZCwgZW51bWVyYWJsZTogdHJ1ZSB9KSA6IHRhcmdldCxcbiAgbW9kXG4pKTtcblxuLy8gbm9kZV9tb2R1bGVzL3NldC1jb29raWUtcGFyc2VyL2xpYi9zZXQtY29va2llLmpzXG52YXIgcmVxdWlyZV9zZXRfY29va2llID0gX19jb21tb25KUyh7XG4gIFwibm9kZV9tb2R1bGVzL3NldC1jb29raWUtcGFyc2VyL2xpYi9zZXQtY29va2llLmpzXCIoZXhwb3J0cywgbW9kdWxlKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIGRlZmF1bHRQYXJzZU9wdGlvbnMgPSB7XG4gICAgICBkZWNvZGVWYWx1ZXM6IHRydWUsXG4gICAgICBtYXA6IGZhbHNlLFxuICAgICAgc2lsZW50OiBmYWxzZVxuICAgIH07XG4gICAgZnVuY3Rpb24gaXNOb25FbXB0eVN0cmluZyhzdHIpIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiICYmICEhc3RyLnRyaW0oKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VTdHJpbmcoc2V0Q29va2llVmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBwYXJ0cyA9IHNldENvb2tpZVZhbHVlLnNwbGl0KFwiO1wiKS5maWx0ZXIoaXNOb25FbXB0eVN0cmluZyk7XG4gICAgICB2YXIgbmFtZVZhbHVlUGFpclN0ciA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgICB2YXIgcGFyc2VkID0gcGFyc2VOYW1lVmFsdWVQYWlyKG5hbWVWYWx1ZVBhaXJTdHIpO1xuICAgICAgdmFyIG5hbWUgPSBwYXJzZWQubmFtZTtcbiAgICAgIHZhciB2YWx1ZSA9IHBhcnNlZC52YWx1ZTtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zID8gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFBhcnNlT3B0aW9ucywgb3B0aW9ucykgOiBkZWZhdWx0UGFyc2VPcHRpb25zO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFsdWUgPSBvcHRpb25zLmRlY29kZVZhbHVlcyA/IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcInNldC1jb29raWUtcGFyc2VyIGVuY291bnRlcmVkIGFuIGVycm9yIHdoaWxlIGRlY29kaW5nIGEgY29va2llIHdpdGggdmFsdWUgJ1wiICsgdmFsdWUgKyBcIicuIFNldCBvcHRpb25zLmRlY29kZVZhbHVlcyB0byBmYWxzZSB0byBkaXNhYmxlIHRoaXMgZmVhdHVyZS5cIixcbiAgICAgICAgICBlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB2YXIgY29va2llID0ge1xuICAgICAgICBuYW1lLFxuICAgICAgICB2YWx1ZVxuICAgICAgfTtcbiAgICAgIHBhcnRzLmZvckVhY2goZnVuY3Rpb24ocGFydCkge1xuICAgICAgICB2YXIgc2lkZXMgPSBwYXJ0LnNwbGl0KFwiPVwiKTtcbiAgICAgICAgdmFyIGtleSA9IHNpZGVzLnNoaWZ0KCkudHJpbUxlZnQoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgdmFsdWUyID0gc2lkZXMuam9pbihcIj1cIik7XG4gICAgICAgIGlmIChrZXkgPT09IFwiZXhwaXJlc1wiKSB7XG4gICAgICAgICAgY29va2llLmV4cGlyZXMgPSBuZXcgRGF0ZSh2YWx1ZTIpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJtYXgtYWdlXCIpIHtcbiAgICAgICAgICBjb29raWUubWF4QWdlID0gcGFyc2VJbnQodmFsdWUyLCAxMCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcInNlY3VyZVwiKSB7XG4gICAgICAgICAgY29va2llLnNlY3VyZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImh0dHBvbmx5XCIpIHtcbiAgICAgICAgICBjb29raWUuaHR0cE9ubHkgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJzYW1lc2l0ZVwiKSB7XG4gICAgICAgICAgY29va2llLnNhbWVTaXRlID0gdmFsdWUyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvb2tpZVtrZXldID0gdmFsdWUyO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjb29raWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlTmFtZVZhbHVlUGFpcihuYW1lVmFsdWVQYWlyU3RyKSB7XG4gICAgICB2YXIgbmFtZSA9IFwiXCI7XG4gICAgICB2YXIgdmFsdWUgPSBcIlwiO1xuICAgICAgdmFyIG5hbWVWYWx1ZUFyciA9IG5hbWVWYWx1ZVBhaXJTdHIuc3BsaXQoXCI9XCIpO1xuICAgICAgaWYgKG5hbWVWYWx1ZUFyci5sZW5ndGggPiAxKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lVmFsdWVBcnIuc2hpZnQoKTtcbiAgICAgICAgdmFsdWUgPSBuYW1lVmFsdWVBcnIuam9pbihcIj1cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IG5hbWVWYWx1ZVBhaXJTdHI7XG4gICAgICB9XG4gICAgICByZXR1cm4geyBuYW1lLCB2YWx1ZSB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZShpbnB1dCwgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgPyBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0UGFyc2VPcHRpb25zLCBvcHRpb25zKSA6IGRlZmF1bHRQYXJzZU9wdGlvbnM7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5tYXApIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW5wdXQuaGVhZGVycykge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0LmhlYWRlcnMuZ2V0U2V0Q29va2llID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBpbnB1dCA9IGlucHV0LmhlYWRlcnMuZ2V0U2V0Q29va2llKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuaGVhZGVyc1tcInNldC1jb29raWVcIl0pIHtcbiAgICAgICAgICBpbnB1dCA9IGlucHV0LmhlYWRlcnNbXCJzZXQtY29va2llXCJdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBzY2ggPSBpbnB1dC5oZWFkZXJzW09iamVjdC5rZXlzKGlucHV0LmhlYWRlcnMpLmZpbmQoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5LnRvTG93ZXJDYXNlKCkgPT09IFwic2V0LWNvb2tpZVwiO1xuICAgICAgICAgIH0pXTtcbiAgICAgICAgICBpZiAoIXNjaCAmJiBpbnB1dC5oZWFkZXJzLmNvb2tpZSAmJiAhb3B0aW9ucy5zaWxlbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgXCJXYXJuaW5nOiBzZXQtY29va2llLXBhcnNlciBhcHBlYXJzIHRvIGhhdmUgYmVlbiBjYWxsZWQgb24gYSByZXF1ZXN0IG9iamVjdC4gSXQgaXMgZGVzaWduZWQgdG8gcGFyc2UgU2V0LUNvb2tpZSBoZWFkZXJzIGZyb20gcmVzcG9uc2VzLCBub3QgQ29va2llIGhlYWRlcnMgZnJvbSByZXF1ZXN0cy4gU2V0IHRoZSBvcHRpb24ge3NpbGVudDogdHJ1ZX0gdG8gc3VwcHJlc3MgdGhpcyB3YXJuaW5nLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpbnB1dCA9IHNjaDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGlucHV0KSkge1xuICAgICAgICBpbnB1dCA9IFtpbnB1dF07XG4gICAgICB9XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyA/IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRQYXJzZU9wdGlvbnMsIG9wdGlvbnMpIDogZGVmYXVsdFBhcnNlT3B0aW9ucztcbiAgICAgIGlmICghb3B0aW9ucy5tYXApIHtcbiAgICAgICAgcmV0dXJuIGlucHV0LmZpbHRlcihpc05vbkVtcHR5U3RyaW5nKS5tYXAoZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlU3RyaW5nKHN0ciwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNvb2tpZXMgPSB7fTtcbiAgICAgICAgcmV0dXJuIGlucHV0LmZpbHRlcihpc05vbkVtcHR5U3RyaW5nKS5yZWR1Y2UoZnVuY3Rpb24oY29va2llczIsIHN0cikge1xuICAgICAgICAgIHZhciBjb29raWUgPSBwYXJzZVN0cmluZyhzdHIsIG9wdGlvbnMpO1xuICAgICAgICAgIGNvb2tpZXMyW2Nvb2tpZS5uYW1lXSA9IGNvb2tpZTtcbiAgICAgICAgICByZXR1cm4gY29va2llczI7XG4gICAgICAgIH0sIGNvb2tpZXMpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzcGxpdENvb2tpZXNTdHJpbmcyKGNvb2tpZXNTdHJpbmcpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvb2tpZXNTdHJpbmcpKSB7XG4gICAgICAgIHJldHVybiBjb29raWVzU3RyaW5nO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBjb29raWVzU3RyaW5nICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIHZhciBjb29raWVzU3RyaW5ncyA9IFtdO1xuICAgICAgdmFyIHBvcyA9IDA7XG4gICAgICB2YXIgc3RhcnQ7XG4gICAgICB2YXIgY2g7XG4gICAgICB2YXIgbGFzdENvbW1hO1xuICAgICAgdmFyIG5leHRTdGFydDtcbiAgICAgIHZhciBjb29raWVzU2VwYXJhdG9yRm91bmQ7XG4gICAgICBmdW5jdGlvbiBza2lwV2hpdGVzcGFjZSgpIHtcbiAgICAgICAgd2hpbGUgKHBvcyA8IGNvb2tpZXNTdHJpbmcubGVuZ3RoICYmIC9cXHMvLnRlc3QoY29va2llc1N0cmluZy5jaGFyQXQocG9zKSkpIHtcbiAgICAgICAgICBwb3MgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9zIDwgY29va2llc1N0cmluZy5sZW5ndGg7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBub3RTcGVjaWFsQ2hhcigpIHtcbiAgICAgICAgY2ggPSBjb29raWVzU3RyaW5nLmNoYXJBdChwb3MpO1xuICAgICAgICByZXR1cm4gY2ggIT09IFwiPVwiICYmIGNoICE9PSBcIjtcIiAmJiBjaCAhPT0gXCIsXCI7XG4gICAgICB9XG4gICAgICB3aGlsZSAocG9zIDwgY29va2llc1N0cmluZy5sZW5ndGgpIHtcbiAgICAgICAgc3RhcnQgPSBwb3M7XG4gICAgICAgIGNvb2tpZXNTZXBhcmF0b3JGb3VuZCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAoc2tpcFdoaXRlc3BhY2UoKSkge1xuICAgICAgICAgIGNoID0gY29va2llc1N0cmluZy5jaGFyQXQocG9zKTtcbiAgICAgICAgICBpZiAoY2ggPT09IFwiLFwiKSB7XG4gICAgICAgICAgICBsYXN0Q29tbWEgPSBwb3M7XG4gICAgICAgICAgICBwb3MgKz0gMTtcbiAgICAgICAgICAgIHNraXBXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBuZXh0U3RhcnQgPSBwb3M7XG4gICAgICAgICAgICB3aGlsZSAocG9zIDwgY29va2llc1N0cmluZy5sZW5ndGggJiYgbm90U3BlY2lhbENoYXIoKSkge1xuICAgICAgICAgICAgICBwb3MgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwb3MgPCBjb29raWVzU3RyaW5nLmxlbmd0aCAmJiBjb29raWVzU3RyaW5nLmNoYXJBdChwb3MpID09PSBcIj1cIikge1xuICAgICAgICAgICAgICBjb29raWVzU2VwYXJhdG9yRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICBwb3MgPSBuZXh0U3RhcnQ7XG4gICAgICAgICAgICAgIGNvb2tpZXNTdHJpbmdzLnB1c2goY29va2llc1N0cmluZy5zdWJzdHJpbmcoc3RhcnQsIGxhc3RDb21tYSkpO1xuICAgICAgICAgICAgICBzdGFydCA9IHBvcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBvcyA9IGxhc3RDb21tYSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvcyArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvb2tpZXNTZXBhcmF0b3JGb3VuZCB8fCBwb3MgPj0gY29va2llc1N0cmluZy5sZW5ndGgpIHtcbiAgICAgICAgICBjb29raWVzU3RyaW5ncy5wdXNoKGNvb2tpZXNTdHJpbmcuc3Vic3RyaW5nKHN0YXJ0LCBjb29raWVzU3RyaW5nLmxlbmd0aCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY29va2llc1N0cmluZ3M7XG4gICAgfVxuICAgIG1vZHVsZS5leHBvcnRzID0gcGFyc2U7XG4gICAgbW9kdWxlLmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbiAgICBtb2R1bGUuZXhwb3J0cy5wYXJzZVN0cmluZyA9IHBhcnNlU3RyaW5nO1xuICAgIG1vZHVsZS5leHBvcnRzLnNwbGl0Q29va2llc1N0cmluZyA9IHNwbGl0Q29va2llc1N0cmluZzI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvSGVhZGVycy50c1xudmFyIGltcG9ydF9zZXRfY29va2llX3BhcnNlciA9IF9fdG9FU00ocmVxdWlyZV9zZXRfY29va2llKCkpO1xuXG4vLyBzcmMvdXRpbHMvbm9ybWFsaXplSGVhZGVyTmFtZS50c1xudmFyIEhFQURFUlNfSU5WQUxJRF9DSEFSQUNURVJTID0gL1teYS16MC05XFwtIyQlJicqKy5eX2B8fl0vaTtcbmZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUobmFtZSkge1xuICBpZiAoSEVBREVSU19JTlZBTElEX0NIQVJBQ1RFUlMudGVzdChuYW1lKSB8fCBuYW1lLnRyaW0oKSA9PT0gXCJcIikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGNoYXJhY3RlciBpbiBoZWFkZXIgZmllbGQgbmFtZVwiKTtcbiAgfVxuICByZXR1cm4gbmFtZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbn1cblxuLy8gc3JjL3V0aWxzL25vcm1hbGl6ZUhlYWRlclZhbHVlLnRzXG52YXIgY2hhckNvZGVzVG9SZW1vdmUgPSBbXG4gIFN0cmluZy5mcm9tQ2hhckNvZGUoMTApLFxuICBTdHJpbmcuZnJvbUNoYXJDb2RlKDEzKSxcbiAgU3RyaW5nLmZyb21DaGFyQ29kZSg5KSxcbiAgU3RyaW5nLmZyb21DaGFyQ29kZSgzMilcbl07XG52YXIgSEVBREVSX1ZBTFVFX1JFTU9WRV9SRUdFWFAgPSBuZXcgUmVnRXhwKFxuICBgKF5bJHtjaGFyQ29kZXNUb1JlbW92ZS5qb2luKFwiXCIpfV18JFske2NoYXJDb2Rlc1RvUmVtb3ZlLmpvaW4oXCJcIil9XSlgLFxuICBcImdcIlxuKTtcbmZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlclZhbHVlKHZhbHVlKSB7XG4gIGNvbnN0IG5leHRWYWx1ZSA9IHZhbHVlLnJlcGxhY2UoSEVBREVSX1ZBTFVFX1JFTU9WRV9SRUdFWFAsIFwiXCIpO1xuICByZXR1cm4gbmV4dFZhbHVlO1xufVxuXG4vLyBzcmMvdXRpbHMvaXNWYWxpZEhlYWRlck5hbWUudHNcbmZ1bmN0aW9uIGlzVmFsaWRIZWFkZXJOYW1lKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hhcmFjdGVyID0gdmFsdWUuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoY2hhcmFjdGVyID4gMTI3IHx8ICFpc1Rva2VuKGNoYXJhY3RlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBpc1Rva2VuKHZhbHVlKSB7XG4gIHJldHVybiAhW1xuICAgIDEyNyxcbiAgICAzMixcbiAgICBcIihcIixcbiAgICBcIilcIixcbiAgICBcIjxcIixcbiAgICBcIj5cIixcbiAgICBcIkBcIixcbiAgICBcIixcIixcbiAgICBcIjtcIixcbiAgICBcIjpcIixcbiAgICBcIlxcXFxcIixcbiAgICAnXCInLFxuICAgIFwiL1wiLFxuICAgIFwiW1wiLFxuICAgIFwiXVwiLFxuICAgIFwiP1wiLFxuICAgIFwiPVwiLFxuICAgIFwie1wiLFxuICAgIFwifVwiXG4gIF0uaW5jbHVkZXModmFsdWUpO1xufVxuXG4vLyBzcmMvdXRpbHMvaXNWYWxpZEhlYWRlclZhbHVlLnRzXG5mdW5jdGlvbiBpc1ZhbGlkSGVhZGVyVmFsdWUodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodmFsdWUudHJpbSgpICE9PSB2YWx1ZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hhcmFjdGVyID0gdmFsdWUuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoXG4gICAgICAvLyBOVUwuXG4gICAgICBjaGFyYWN0ZXIgPT09IDAgfHwgLy8gSFRUUCBuZXdsaW5lIGJ5dGVzLlxuICAgICAgY2hhcmFjdGVyID09PSAxMCB8fCBjaGFyYWN0ZXIgPT09IDEzXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBzcmMvSGVhZGVycy50c1xudmFyIE5PUk1BTElaRURfSEVBREVSUyA9IFN5bWJvbChcIm5vcm1hbGl6ZWRIZWFkZXJzXCIpO1xudmFyIFJBV19IRUFERVJfTkFNRVMgPSBTeW1ib2woXCJyYXdIZWFkZXJOYW1lc1wiKTtcbnZhciBIRUFERVJfVkFMVUVfREVMSU1JVEVSID0gXCIsIFwiO1xudmFyIF9hLCBfYiwgX2M7XG52YXIgSGVhZGVycyA9IGNsYXNzIF9IZWFkZXJzIHtcbiAgY29uc3RydWN0b3IoaW5pdCkge1xuICAgIC8vIE5vcm1hbGl6ZWQgaGVhZGVyIHtcIm5hbWVcIjpcImEsIGJcIn0gc3RvcmFnZS5cbiAgICB0aGlzW19hXSA9IHt9O1xuICAgIC8vIEtlZXBzIHRoZSBtYXBwaW5nIGJldHdlZW4gdGhlIHJhdyBoZWFkZXIgbmFtZVxuICAgIC8vIGFuZCB0aGUgbm9ybWFsaXplZCBoZWFkZXIgbmFtZSB0byBlYXNlIHRoZSBsb29rdXAuXG4gICAgdGhpc1tfYl0gPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICAgIHRoaXNbX2NdID0gXCJIZWFkZXJzXCI7XG4gICAgaWYgKFtcIkhlYWRlcnNcIiwgXCJIZWFkZXJzUG9seWZpbGxcIl0uaW5jbHVkZXMoaW5pdD8uY29uc3RydWN0b3IubmFtZSkgfHwgaW5pdCBpbnN0YW5jZW9mIF9IZWFkZXJzIHx8IHR5cGVvZiBnbG9iYWxUaGlzLkhlYWRlcnMgIT09IFwidW5kZWZpbmVkXCIgJiYgaW5pdCBpbnN0YW5jZW9mIGdsb2JhbFRoaXMuSGVhZGVycykge1xuICAgICAgY29uc3QgaW5pdGlhbEhlYWRlcnMgPSBpbml0O1xuICAgICAgaW5pdGlhbEhlYWRlcnMuZm9yRWFjaCgodmFsdWUsIG5hbWUpID0+IHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGluaXQpKSB7XG4gICAgICBpbml0LmZvckVhY2goKFtuYW1lLCB2YWx1ZV0pID0+IHtcbiAgICAgICAgdGhpcy5hcHBlbmQoXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oSEVBREVSX1ZBTFVFX0RFTElNSVRFUikgOiB2YWx1ZVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpbml0KSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhpbml0KS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gaW5pdFtuYW1lXTtcbiAgICAgICAgdGhpcy5hcHBlbmQoXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oSEVBREVSX1ZBTFVFX0RFTElNSVRFUikgOiB2YWx1ZVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIFsoX2EgPSBOT1JNQUxJWkVEX0hFQURFUlMsIF9iID0gUkFXX0hFQURFUl9OQU1FUywgX2MgPSBTeW1ib2wudG9TdHJpbmdUYWcsIFN5bWJvbC5pdGVyYXRvcildKCkge1xuICAgIHJldHVybiB0aGlzLmVudHJpZXMoKTtcbiAgfVxuICAqa2V5cygpIHtcbiAgICBmb3IgKGNvbnN0IFtuYW1lXSBvZiB0aGlzLmVudHJpZXMoKSkge1xuICAgICAgeWllbGQgbmFtZTtcbiAgICB9XG4gIH1cbiAgKnZhbHVlcygpIHtcbiAgICBmb3IgKGNvbnN0IFssIHZhbHVlXSBvZiB0aGlzLmVudHJpZXMoKSkge1xuICAgICAgeWllbGQgdmFsdWU7XG4gICAgfVxuICB9XG4gICplbnRyaWVzKCkge1xuICAgIGxldCBzb3J0ZWRLZXlzID0gT2JqZWN0LmtleXModGhpc1tOT1JNQUxJWkVEX0hFQURFUlNdKS5zb3J0KFxuICAgICAgKGEsIGIpID0+IGEubG9jYWxlQ29tcGFyZShiKVxuICAgICk7XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIHNvcnRlZEtleXMpIHtcbiAgICAgIGlmIChuYW1lID09PSBcInNldC1jb29raWVcIikge1xuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHRoaXMuZ2V0U2V0Q29va2llKCkpIHtcbiAgICAgICAgICB5aWVsZCBbbmFtZSwgdmFsdWVdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB5aWVsZCBbbmFtZSwgdGhpcy5nZXQobmFtZSldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBhIGJvb2xlYW4gc3RhdGluZyB3aGV0aGVyIGEgYEhlYWRlcnNgIG9iamVjdCBjb250YWlucyBhIGNlcnRhaW4gaGVhZGVyLlxuICAgKi9cbiAgaGFzKG5hbWUpIHtcbiAgICBpZiAoIWlzVmFsaWRIZWFkZXJOYW1lKG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIGhlYWRlciBuYW1lIFwiJHtuYW1lfVwiYCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzW05PUk1BTElaRURfSEVBREVSU10uaGFzT3duUHJvcGVydHkobm9ybWFsaXplSGVhZGVyTmFtZShuYW1lKSk7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgYSBgQnl0ZVN0cmluZ2Agc2VxdWVuY2Ugb2YgYWxsIHRoZSB2YWx1ZXMgb2YgYSBoZWFkZXIgd2l0aCBhIGdpdmVuIG5hbWUuXG4gICAqL1xuICBnZXQobmFtZSkge1xuICAgIGlmICghaXNWYWxpZEhlYWRlck5hbWUobmFtZSkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihgSW52YWxpZCBoZWFkZXIgbmFtZSBcIiR7bmFtZX1cImApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpc1tOT1JNQUxJWkVEX0hFQURFUlNdW25vcm1hbGl6ZUhlYWRlck5hbWUobmFtZSldID8/IG51bGw7XG4gIH1cbiAgLyoqXG4gICAqIFNldHMgYSBuZXcgdmFsdWUgZm9yIGFuIGV4aXN0aW5nIGhlYWRlciBpbnNpZGUgYSBgSGVhZGVyc2Agb2JqZWN0LCBvciBhZGRzIHRoZSBoZWFkZXIgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdC5cbiAgICovXG4gIHNldChuYW1lLCB2YWx1ZSkge1xuICAgIGlmICghaXNWYWxpZEhlYWRlck5hbWUobmFtZSkgfHwgIWlzVmFsaWRIZWFkZXJWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgbm9ybWFsaXplZE5hbWUgPSBub3JtYWxpemVIZWFkZXJOYW1lKG5hbWUpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRWYWx1ZSA9IG5vcm1hbGl6ZUhlYWRlclZhbHVlKHZhbHVlKTtcbiAgICB0aGlzW05PUk1BTElaRURfSEVBREVSU11bbm9ybWFsaXplZE5hbWVdID0gbm9ybWFsaXplSGVhZGVyVmFsdWUobm9ybWFsaXplZFZhbHVlKTtcbiAgICB0aGlzW1JBV19IRUFERVJfTkFNRVNdLnNldChub3JtYWxpemVkTmFtZSwgbmFtZSk7XG4gIH1cbiAgLyoqXG4gICAqIEFwcGVuZHMgYSBuZXcgdmFsdWUgb250byBhbiBleGlzdGluZyBoZWFkZXIgaW5zaWRlIGEgYEhlYWRlcnNgIG9iamVjdCwgb3IgYWRkcyB0aGUgaGVhZGVyIGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3QuXG4gICAqL1xuICBhcHBlbmQobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoIWlzVmFsaWRIZWFkZXJOYW1lKG5hbWUpIHx8ICFpc1ZhbGlkSGVhZGVyVmFsdWUodmFsdWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gbm9ybWFsaXplSGVhZGVyTmFtZShuYW1lKTtcbiAgICBjb25zdCBub3JtYWxpemVkVmFsdWUgPSBub3JtYWxpemVIZWFkZXJWYWx1ZSh2YWx1ZSk7XG4gICAgbGV0IHJlc29sdmVkVmFsdWUgPSB0aGlzLmhhcyhub3JtYWxpemVkTmFtZSkgPyBgJHt0aGlzLmdldChub3JtYWxpemVkTmFtZSl9LCAke25vcm1hbGl6ZWRWYWx1ZX1gIDogbm9ybWFsaXplZFZhbHVlO1xuICAgIHRoaXMuc2V0KG5hbWUsIHJlc29sdmVkVmFsdWUpO1xuICB9XG4gIC8qKlxuICAgKiBEZWxldGVzIGEgaGVhZGVyIGZyb20gdGhlIGBIZWFkZXJzYCBvYmplY3QuXG4gICAqL1xuICBkZWxldGUobmFtZSkge1xuICAgIGlmICghaXNWYWxpZEhlYWRlck5hbWUobmFtZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmhhcyhuYW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBub3JtYWxpemVkTmFtZSA9IG5vcm1hbGl6ZUhlYWRlck5hbWUobmFtZSk7XG4gICAgZGVsZXRlIHRoaXNbTk9STUFMSVpFRF9IRUFERVJTXVtub3JtYWxpemVkTmFtZV07XG4gICAgdGhpc1tSQVdfSEVBREVSX05BTUVTXS5kZWxldGUobm9ybWFsaXplZE5hbWUpO1xuICB9XG4gIC8qKlxuICAgKiBUcmF2ZXJzZXMgdGhlIGBIZWFkZXJzYCBvYmplY3QsXG4gICAqIGNhbGxpbmcgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBlYWNoIGhlYWRlci5cbiAgICovXG4gIGZvckVhY2goY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgdGhpcy5lbnRyaWVzKCkpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdmFsdWUsIG5hbWUsIHRoaXMpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIHRoZSB2YWx1ZXNcbiAgICogb2YgYWxsIFNldC1Db29raWUgaGVhZGVycyBhc3NvY2lhdGVkXG4gICAqIHdpdGggYSByZXNwb25zZVxuICAgKi9cbiAgZ2V0U2V0Q29va2llKCkge1xuICAgIGNvbnN0IHNldENvb2tpZUhlYWRlciA9IHRoaXMuZ2V0KFwic2V0LWNvb2tpZVwiKTtcbiAgICBpZiAoc2V0Q29va2llSGVhZGVyID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGlmIChzZXRDb29raWVIZWFkZXIgPT09IFwiXCIpIHtcbiAgICAgIHJldHVybiBbXCJcIl07XG4gICAgfVxuICAgIHJldHVybiAoMCwgaW1wb3J0X3NldF9jb29raWVfcGFyc2VyLnNwbGl0Q29va2llc1N0cmluZykoc2V0Q29va2llSGVhZGVyKTtcbiAgfVxufTtcblxuLy8gc3JjL2dldFJhd0hlYWRlcnMudHNcbmZ1bmN0aW9uIGdldFJhd0hlYWRlcnMoaGVhZGVycykge1xuICBjb25zdCByYXdIZWFkZXJzID0ge307XG4gIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBoZWFkZXJzLmVudHJpZXMoKSkge1xuICAgIHJhd0hlYWRlcnNbaGVhZGVyc1tSQVdfSEVBREVSX05BTUVTXS5nZXQobmFtZSldID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHJhd0hlYWRlcnM7XG59XG5cbi8vIHNyYy90cmFuc2Zvcm1lcnMvaGVhZGVyc1RvTGlzdC50c1xuZnVuY3Rpb24gaGVhZGVyc1RvTGlzdChoZWFkZXJzKSB7XG4gIGNvbnN0IGhlYWRlcnNMaXN0ID0gW107XG4gIGhlYWRlcnMuZm9yRWFjaCgodmFsdWUsIG5hbWUpID0+IHtcbiAgICBjb25zdCByZXNvbHZlZFZhbHVlID0gdmFsdWUuaW5jbHVkZXMoXCIsXCIpID8gdmFsdWUuc3BsaXQoXCIsXCIpLm1hcCgodmFsdWUyKSA9PiB2YWx1ZTIudHJpbSgpKSA6IHZhbHVlO1xuICAgIGhlYWRlcnNMaXN0LnB1c2goW25hbWUsIHJlc29sdmVkVmFsdWVdKTtcbiAgfSk7XG4gIHJldHVybiBoZWFkZXJzTGlzdDtcbn1cblxuLy8gc3JjL3RyYW5zZm9ybWVycy9oZWFkZXJzVG9TdHJpbmcudHNcbmZ1bmN0aW9uIGhlYWRlcnNUb1N0cmluZyhoZWFkZXJzKSB7XG4gIGNvbnN0IGxpc3QgPSBoZWFkZXJzVG9MaXN0KGhlYWRlcnMpO1xuICBjb25zdCBsaW5lcyA9IGxpc3QubWFwKChbbmFtZSwgdmFsdWVdKSA9PiB7XG4gICAgY29uc3QgdmFsdWVzID0gW10uY29uY2F0KHZhbHVlKTtcbiAgICByZXR1cm4gYCR7bmFtZX06ICR7dmFsdWVzLmpvaW4oXCIsIFwiKX1gO1xuICB9KTtcbiAgcmV0dXJuIGxpbmVzLmpvaW4oXCJcXHJcXG5cIik7XG59XG5cbi8vIHNyYy90cmFuc2Zvcm1lcnMvaGVhZGVyc1RvT2JqZWN0LnRzXG52YXIgc2luZ2xlVmFsdWVIZWFkZXJzID0gW1widXNlci1hZ2VudFwiXTtcbmZ1bmN0aW9uIGhlYWRlcnNUb09iamVjdChoZWFkZXJzKSB7XG4gIGNvbnN0IGhlYWRlcnNPYmplY3QgPSB7fTtcbiAgaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwgbmFtZSkgPT4ge1xuICAgIGNvbnN0IGlzTXVsdGlWYWx1ZSA9ICFzaW5nbGVWYWx1ZUhlYWRlcnMuaW5jbHVkZXMobmFtZS50b0xvd2VyQ2FzZSgpKSAmJiB2YWx1ZS5pbmNsdWRlcyhcIixcIik7XG4gICAgaGVhZGVyc09iamVjdFtuYW1lXSA9IGlzTXVsdGlWYWx1ZSA/IHZhbHVlLnNwbGl0KFwiLFwiKS5tYXAoKHMpID0+IHMudHJpbSgpKSA6IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIGhlYWRlcnNPYmplY3Q7XG59XG5cbi8vIHNyYy90cmFuc2Zvcm1lcnMvc3RyaW5nVG9IZWFkZXJzLnRzXG5mdW5jdGlvbiBzdHJpbmdUb0hlYWRlcnMoc3RyKSB7XG4gIGNvbnN0IGxpbmVzID0gc3RyLnRyaW0oKS5zcGxpdCgvW1xcclxcbl0rLyk7XG4gIHJldHVybiBsaW5lcy5yZWR1Y2UoKGhlYWRlcnMsIGxpbmUpID0+IHtcbiAgICBpZiAobGluZS50cmltKCkgPT09IFwiXCIpIHtcbiAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cbiAgICBjb25zdCBwYXJ0cyA9IGxpbmUuc3BsaXQoXCI6IFwiKTtcbiAgICBjb25zdCBuYW1lID0gcGFydHMuc2hpZnQoKTtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnRzLmpvaW4oXCI6IFwiKTtcbiAgICBoZWFkZXJzLmFwcGVuZChuYW1lLCB2YWx1ZSk7XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH0sIG5ldyBIZWFkZXJzKCkpO1xufVxuXG4vLyBzcmMvdHJhbnNmb3JtZXJzL2xpc3RUb0hlYWRlcnMudHNcbmZ1bmN0aW9uIGxpc3RUb0hlYWRlcnMobGlzdCkge1xuICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgbGlzdC5mb3JFYWNoKChbbmFtZSwgdmFsdWVdKSA9PiB7XG4gICAgY29uc3QgdmFsdWVzID0gW10uY29uY2F0KHZhbHVlKTtcbiAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUyKSA9PiB7XG4gICAgICBoZWFkZXJzLmFwcGVuZChuYW1lLCB2YWx1ZTIpO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGhlYWRlcnM7XG59XG5cbi8vIHNyYy90cmFuc2Zvcm1lcnMvcmVkdWNlSGVhZGVyc09iamVjdC50c1xuZnVuY3Rpb24gcmVkdWNlSGVhZGVyc09iamVjdChoZWFkZXJzLCByZWR1Y2VyLCBpbml0aWFsU3RhdGUpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGhlYWRlcnMpLnJlZHVjZSgobmV4dEhlYWRlcnMsIG5hbWUpID0+IHtcbiAgICByZXR1cm4gcmVkdWNlcihuZXh0SGVhZGVycywgbmFtZSwgaGVhZGVyc1tuYW1lXSk7XG4gIH0sIGluaXRpYWxTdGF0ZSk7XG59XG5cbi8vIHNyYy90cmFuc2Zvcm1lcnMvb2JqZWN0VG9IZWFkZXJzLnRzXG5mdW5jdGlvbiBvYmplY3RUb0hlYWRlcnMoaGVhZGVyc09iamVjdCkge1xuICByZXR1cm4gcmVkdWNlSGVhZGVyc09iamVjdChcbiAgICBoZWFkZXJzT2JqZWN0LFxuICAgIChoZWFkZXJzLCBuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWVzID0gW10uY29uY2F0KHZhbHVlKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUyKSA9PiB7XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKG5hbWUsIHZhbHVlMik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH0sXG4gICAgbmV3IEhlYWRlcnMoKVxuICApO1xufVxuXG4vLyBzcmMvdHJhbnNmb3JtZXJzL2ZsYXR0ZW5IZWFkZXJzTGlzdC50c1xuZnVuY3Rpb24gZmxhdHRlbkhlYWRlcnNMaXN0KGxpc3QpIHtcbiAgcmV0dXJuIGxpc3QubWFwKChbbmFtZSwgdmFsdWVzXSkgPT4ge1xuICAgIHJldHVybiBbbmFtZSwgW10uY29uY2F0KHZhbHVlcykuam9pbihcIiwgXCIpXTtcbiAgfSk7XG59XG5cbi8vIHNyYy90cmFuc2Zvcm1lcnMvZmxhdHRlbkhlYWRlcnNPYmplY3QudHNcbmZ1bmN0aW9uIGZsYXR0ZW5IZWFkZXJzT2JqZWN0KGhlYWRlcnNPYmplY3QpIHtcbiAgcmV0dXJuIHJlZHVjZUhlYWRlcnNPYmplY3QoXG4gICAgaGVhZGVyc09iamVjdCxcbiAgICAoaGVhZGVycywgbmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGhlYWRlcnNbbmFtZV0gPSBbXS5jb25jYXQodmFsdWUpLmpvaW4oXCIsIFwiKTtcbiAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH0sXG4gICAge31cbiAgKTtcbn1cbmV4cG9ydCB7XG4gIEhlYWRlcnMsXG4gIGZsYXR0ZW5IZWFkZXJzTGlzdCxcbiAgZmxhdHRlbkhlYWRlcnNPYmplY3QsXG4gIGdldFJhd0hlYWRlcnMsXG4gIGhlYWRlcnNUb0xpc3QsXG4gIGhlYWRlcnNUb09iamVjdCxcbiAgaGVhZGVyc1RvU3RyaW5nLFxuICBsaXN0VG9IZWFkZXJzLFxuICBvYmplY3RUb0hlYWRlcnMsXG4gIHJlZHVjZUhlYWRlcnNPYmplY3QsXG4gIHN0cmluZ1RvSGVhZGVyc1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXAiLCJpbXBvcnQgKiBhcyBfc3lzY2FsbHMyXzAgZnJvbSAnc3BhY2V0aW1lOnN5c0AyLjAnO1xuaW1wb3J0IHsgbW9kdWxlSG9va3MgfSBmcm9tICdzcGFjZXRpbWU6c3lzQDIuMCc7XG5pbXBvcnQgeyBoZWFkZXJzVG9MaXN0LCBIZWFkZXJzIH0gZnJvbSAnaGVhZGVycy1wb2x5ZmlsbCc7XG5cbnR5cGVvZiBnbG9iYWxUaGlzIT09XCJ1bmRlZmluZWRcIiYmKChnbG9iYWxUaGlzLmdsb2JhbD1nbG9iYWxUaGlzLmdsb2JhbHx8Z2xvYmFsVGhpcyksKGdsb2JhbFRoaXMud2luZG93PWdsb2JhbFRoaXMud2luZG93fHxnbG9iYWxUaGlzKSk7XG52YXIgX19jcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2dldE93blByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfX2dldE93blByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIF9fZ2V0UHJvdG9PZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbnZhciBfX2hhc093blByb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIF9fZXNtID0gKGZuLCByZXMpID0+IGZ1bmN0aW9uIF9faW5pdCgpIHtcbiAgcmV0dXJuIGZuICYmIChyZXMgPSAoMCwgZm5bX19nZXRPd25Qcm9wTmFtZXMoZm4pWzBdXSkoZm4gPSAwKSksIHJlcztcbn07XG52YXIgX19jb21tb25KUyA9IChjYiwgbW9kKSA9PiBmdW5jdGlvbiBfX3JlcXVpcmUoKSB7XG4gIHJldHVybiBtb2QgfHwgKDAsIGNiW19fZ2V0T3duUHJvcE5hbWVzKGNiKVswXV0pKChtb2QgPSB7IGV4cG9ydHM6IHt9IH0pLmV4cG9ydHMsIG1vZCksIG1vZC5leHBvcnRzO1xufTtcbnZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICBmb3IgKHZhciBuYW1lIGluIGFsbClcbiAgICBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7IGdldDogYWxsW25hbWVdLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XG4gIH1cbiAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3RvRVNNID0gKG1vZCwgaXNOb2RlTW9kZSwgdGFyZ2V0KSA9PiAodGFyZ2V0ID0gbW9kICE9IG51bGwgPyBfX2NyZWF0ZShfX2dldFByb3RvT2YobW9kKSkgOiB7fSwgX19jb3B5UHJvcHMoXG4gIC8vIElmIHRoZSBpbXBvcnRlciBpcyBpbiBub2RlIGNvbXBhdGliaWxpdHkgbW9kZSBvciB0aGlzIGlzIG5vdCBhbiBFU01cbiAgLy8gZmlsZSB0aGF0IGhhcyBiZWVuIGNvbnZlcnRlZCB0byBhIENvbW1vbkpTIGZpbGUgdXNpbmcgYSBCYWJlbC1cbiAgLy8gY29tcGF0aWJsZSB0cmFuc2Zvcm0gKGkuZS4gXCJfX2VzTW9kdWxlXCIgaGFzIG5vdCBiZWVuIHNldCksIHRoZW4gc2V0XG4gIC8vIFwiZGVmYXVsdFwiIHRvIHRoZSBDb21tb25KUyBcIm1vZHVsZS5leHBvcnRzXCIgZm9yIG5vZGUgY29tcGF0aWJpbGl0eS5cbiAgX19kZWZQcm9wKHRhcmdldCwgXCJkZWZhdWx0XCIsIHsgdmFsdWU6IG1vZCwgZW51bWVyYWJsZTogdHJ1ZSB9KSAsXG4gIG1vZFxuKSk7XG52YXIgX190b0NvbW1vbkpTID0gKG1vZCkgPT4gX19jb3B5UHJvcHMoX19kZWZQcm9wKHt9LCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KSwgbW9kKTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2Jhc2U2NC1qc0AxLjUuMS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzXG52YXIgcmVxdWlyZV9iYXNlNjRfanMgPSBfX2NvbW1vbkpTKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vYmFzZTY0LWpzQDEuNS4xL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvaW5kZXguanNcIihleHBvcnRzKSB7XG4gICAgZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aDtcbiAgICBleHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXk7XG4gICAgZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheTI7XG4gICAgdmFyIGxvb2t1cCA9IFtdO1xuICAgIHZhciByZXZMb29rdXAgPSBbXTtcbiAgICB2YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09IFwidW5kZWZpbmVkXCIgPyBVaW50OEFycmF5IDogQXJyYXk7XG4gICAgdmFyIGNvZGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIjtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBsb29rdXBbaV0gPSBjb2RlW2ldO1xuICAgICAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpO1xuICAgIH1cbiAgICB2YXIgaTtcbiAgICB2YXIgbGVuO1xuICAgIHJldkxvb2t1cFtcIi1cIi5jaGFyQ29kZUF0KDApXSA9IDYyO1xuICAgIHJldkxvb2t1cFtcIl9cIi5jaGFyQ29kZUF0KDApXSA9IDYzO1xuICAgIGZ1bmN0aW9uIGdldExlbnMoYjY0KSB7XG4gICAgICB2YXIgbGVuMiA9IGI2NC5sZW5ndGg7XG4gICAgICBpZiAobGVuMiAlIDQgPiAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDRcIik7XG4gICAgICB9XG4gICAgICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZihcIj1cIik7XG4gICAgICBpZiAodmFsaWRMZW4gPT09IC0xKSB2YWxpZExlbiA9IGxlbjI7XG4gICAgICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlbjIgPyAwIDogNCAtIHZhbGlkTGVuICUgNDtcbiAgICAgIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJ5dGVMZW5ndGgoYjY0KSB7XG4gICAgICB2YXIgbGVucyA9IGdldExlbnMoYjY0KTtcbiAgICAgIHZhciB2YWxpZExlbiA9IGxlbnNbMF07XG4gICAgICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXTtcbiAgICAgIHJldHVybiAodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQgLSBwbGFjZUhvbGRlcnNMZW47XG4gICAgfVxuICAgIGZ1bmN0aW9uIF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICAgICAgcmV0dXJuICh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCAtIHBsYWNlSG9sZGVyc0xlbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9CeXRlQXJyYXkoYjY0KSB7XG4gICAgICB2YXIgdG1wO1xuICAgICAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NCk7XG4gICAgICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdO1xuICAgICAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV07XG4gICAgICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKTtcbiAgICAgIHZhciBjdXJCeXRlID0gMDtcbiAgICAgIHZhciBsZW4yID0gcGxhY2VIb2xkZXJzTGVuID4gMCA/IHZhbGlkTGVuIC0gNCA6IHZhbGlkTGVuO1xuICAgICAgdmFyIGkyO1xuICAgICAgZm9yIChpMiA9IDA7IGkyIDwgbGVuMjsgaTIgKz0gNCkge1xuICAgICAgICB0bXAgPSByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIpXSA8PCAxOCB8IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpMiArIDEpXSA8PCAxMiB8IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpMiArIDIpXSA8PCA2IHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkyICsgMyldO1xuICAgICAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCA+PiAxNiAmIDI1NTtcbiAgICAgICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgPj4gOCAmIDI1NTtcbiAgICAgICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAyNTU7XG4gICAgICB9XG4gICAgICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgICAgIHRtcCA9IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpMildIDw8IDIgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIgKyAxKV0gPj4gNDtcbiAgICAgICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAyNTU7XG4gICAgICB9XG4gICAgICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgICAgIHRtcCA9IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpMildIDw8IDEwIHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkyICsgMSldIDw8IDQgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIgKyAyKV0gPj4gMjtcbiAgICAgICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgPj4gOCAmIDI1NTtcbiAgICAgICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAyNTU7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQobnVtKSB7XG4gICAgICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDYzXSArIGxvb2t1cFtudW0gPj4gMTIgJiA2M10gKyBsb29rdXBbbnVtID4+IDYgJiA2M10gKyBsb29rdXBbbnVtICYgNjNdO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlbmNvZGVDaHVuayh1aW50OCwgc3RhcnQsIGVuZCkge1xuICAgICAgdmFyIHRtcDtcbiAgICAgIHZhciBvdXRwdXQgPSBbXTtcbiAgICAgIGZvciAodmFyIGkyID0gc3RhcnQ7IGkyIDwgZW5kOyBpMiArPSAzKSB7XG4gICAgICAgIHRtcCA9ICh1aW50OFtpMl0gPDwgMTYgJiAxNjcxMTY4MCkgKyAodWludDhbaTIgKyAxXSA8PCA4ICYgNjUyODApICsgKHVpbnQ4W2kyICsgMl0gJiAyNTUpO1xuICAgICAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0cHV0LmpvaW4oXCJcIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZyb21CeXRlQXJyYXkyKHVpbnQ4KSB7XG4gICAgICB2YXIgdG1wO1xuICAgICAgdmFyIGxlbjIgPSB1aW50OC5sZW5ndGg7XG4gICAgICB2YXIgZXh0cmFCeXRlcyA9IGxlbjIgJSAzO1xuICAgICAgdmFyIHBhcnRzID0gW107XG4gICAgICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MztcbiAgICAgIGZvciAodmFyIGkyID0gMCwgbGVuMjIgPSBsZW4yIC0gZXh0cmFCeXRlczsgaTIgPCBsZW4yMjsgaTIgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICAgICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaTIsIGkyICsgbWF4Q2h1bmtMZW5ndGggPiBsZW4yMiA/IGxlbjIyIDogaTIgKyBtYXhDaHVua0xlbmd0aCkpO1xuICAgICAgfVxuICAgICAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICAgICAgdG1wID0gdWludDhbbGVuMiAtIDFdO1xuICAgICAgICBwYXJ0cy5wdXNoKFxuICAgICAgICAgIGxvb2t1cFt0bXAgPj4gMl0gKyBsb29rdXBbdG1wIDw8IDQgJiA2M10gKyBcIj09XCJcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgICAgICB0bXAgPSAodWludDhbbGVuMiAtIDJdIDw8IDgpICsgdWludDhbbGVuMiAtIDFdO1xuICAgICAgICBwYXJ0cy5wdXNoKFxuICAgICAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICsgbG9va3VwW3RtcCA+PiA0ICYgNjNdICsgbG9va3VwW3RtcCA8PCAyICYgNjNdICsgXCI9XCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiXCIpO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9zdGF0dXNlc0AyLjAuMi9ub2RlX21vZHVsZXMvc3RhdHVzZXMvY29kZXMuanNvblxudmFyIHJlcXVpcmVfY29kZXMgPSBfX2NvbW1vbkpTKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vc3RhdHVzZXNAMi4wLjIvbm9kZV9tb2R1bGVzL3N0YXR1c2VzL2NvZGVzLmpzb25cIihleHBvcnRzLCBtb2R1bGUpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAgIFwiMTAwXCI6IFwiQ29udGludWVcIixcbiAgICAgIFwiMTAxXCI6IFwiU3dpdGNoaW5nIFByb3RvY29sc1wiLFxuICAgICAgXCIxMDJcIjogXCJQcm9jZXNzaW5nXCIsXG4gICAgICBcIjEwM1wiOiBcIkVhcmx5IEhpbnRzXCIsXG4gICAgICBcIjIwMFwiOiBcIk9LXCIsXG4gICAgICBcIjIwMVwiOiBcIkNyZWF0ZWRcIixcbiAgICAgIFwiMjAyXCI6IFwiQWNjZXB0ZWRcIixcbiAgICAgIFwiMjAzXCI6IFwiTm9uLUF1dGhvcml0YXRpdmUgSW5mb3JtYXRpb25cIixcbiAgICAgIFwiMjA0XCI6IFwiTm8gQ29udGVudFwiLFxuICAgICAgXCIyMDVcIjogXCJSZXNldCBDb250ZW50XCIsXG4gICAgICBcIjIwNlwiOiBcIlBhcnRpYWwgQ29udGVudFwiLFxuICAgICAgXCIyMDdcIjogXCJNdWx0aS1TdGF0dXNcIixcbiAgICAgIFwiMjA4XCI6IFwiQWxyZWFkeSBSZXBvcnRlZFwiLFxuICAgICAgXCIyMjZcIjogXCJJTSBVc2VkXCIsXG4gICAgICBcIjMwMFwiOiBcIk11bHRpcGxlIENob2ljZXNcIixcbiAgICAgIFwiMzAxXCI6IFwiTW92ZWQgUGVybWFuZW50bHlcIixcbiAgICAgIFwiMzAyXCI6IFwiRm91bmRcIixcbiAgICAgIFwiMzAzXCI6IFwiU2VlIE90aGVyXCIsXG4gICAgICBcIjMwNFwiOiBcIk5vdCBNb2RpZmllZFwiLFxuICAgICAgXCIzMDVcIjogXCJVc2UgUHJveHlcIixcbiAgICAgIFwiMzA3XCI6IFwiVGVtcG9yYXJ5IFJlZGlyZWN0XCIsXG4gICAgICBcIjMwOFwiOiBcIlBlcm1hbmVudCBSZWRpcmVjdFwiLFxuICAgICAgXCI0MDBcIjogXCJCYWQgUmVxdWVzdFwiLFxuICAgICAgXCI0MDFcIjogXCJVbmF1dGhvcml6ZWRcIixcbiAgICAgIFwiNDAyXCI6IFwiUGF5bWVudCBSZXF1aXJlZFwiLFxuICAgICAgXCI0MDNcIjogXCJGb3JiaWRkZW5cIixcbiAgICAgIFwiNDA0XCI6IFwiTm90IEZvdW5kXCIsXG4gICAgICBcIjQwNVwiOiBcIk1ldGhvZCBOb3QgQWxsb3dlZFwiLFxuICAgICAgXCI0MDZcIjogXCJOb3QgQWNjZXB0YWJsZVwiLFxuICAgICAgXCI0MDdcIjogXCJQcm94eSBBdXRoZW50aWNhdGlvbiBSZXF1aXJlZFwiLFxuICAgICAgXCI0MDhcIjogXCJSZXF1ZXN0IFRpbWVvdXRcIixcbiAgICAgIFwiNDA5XCI6IFwiQ29uZmxpY3RcIixcbiAgICAgIFwiNDEwXCI6IFwiR29uZVwiLFxuICAgICAgXCI0MTFcIjogXCJMZW5ndGggUmVxdWlyZWRcIixcbiAgICAgIFwiNDEyXCI6IFwiUHJlY29uZGl0aW9uIEZhaWxlZFwiLFxuICAgICAgXCI0MTNcIjogXCJQYXlsb2FkIFRvbyBMYXJnZVwiLFxuICAgICAgXCI0MTRcIjogXCJVUkkgVG9vIExvbmdcIixcbiAgICAgIFwiNDE1XCI6IFwiVW5zdXBwb3J0ZWQgTWVkaWEgVHlwZVwiLFxuICAgICAgXCI0MTZcIjogXCJSYW5nZSBOb3QgU2F0aXNmaWFibGVcIixcbiAgICAgIFwiNDE3XCI6IFwiRXhwZWN0YXRpb24gRmFpbGVkXCIsXG4gICAgICBcIjQxOFwiOiBcIkknbSBhIFRlYXBvdFwiLFxuICAgICAgXCI0MjFcIjogXCJNaXNkaXJlY3RlZCBSZXF1ZXN0XCIsXG4gICAgICBcIjQyMlwiOiBcIlVucHJvY2Vzc2FibGUgRW50aXR5XCIsXG4gICAgICBcIjQyM1wiOiBcIkxvY2tlZFwiLFxuICAgICAgXCI0MjRcIjogXCJGYWlsZWQgRGVwZW5kZW5jeVwiLFxuICAgICAgXCI0MjVcIjogXCJUb28gRWFybHlcIixcbiAgICAgIFwiNDI2XCI6IFwiVXBncmFkZSBSZXF1aXJlZFwiLFxuICAgICAgXCI0MjhcIjogXCJQcmVjb25kaXRpb24gUmVxdWlyZWRcIixcbiAgICAgIFwiNDI5XCI6IFwiVG9vIE1hbnkgUmVxdWVzdHNcIixcbiAgICAgIFwiNDMxXCI6IFwiUmVxdWVzdCBIZWFkZXIgRmllbGRzIFRvbyBMYXJnZVwiLFxuICAgICAgXCI0NTFcIjogXCJVbmF2YWlsYWJsZSBGb3IgTGVnYWwgUmVhc29uc1wiLFxuICAgICAgXCI1MDBcIjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgIFwiNTAxXCI6IFwiTm90IEltcGxlbWVudGVkXCIsXG4gICAgICBcIjUwMlwiOiBcIkJhZCBHYXRld2F5XCIsXG4gICAgICBcIjUwM1wiOiBcIlNlcnZpY2UgVW5hdmFpbGFibGVcIixcbiAgICAgIFwiNTA0XCI6IFwiR2F0ZXdheSBUaW1lb3V0XCIsXG4gICAgICBcIjUwNVwiOiBcIkhUVFAgVmVyc2lvbiBOb3QgU3VwcG9ydGVkXCIsXG4gICAgICBcIjUwNlwiOiBcIlZhcmlhbnQgQWxzbyBOZWdvdGlhdGVzXCIsXG4gICAgICBcIjUwN1wiOiBcIkluc3VmZmljaWVudCBTdG9yYWdlXCIsXG4gICAgICBcIjUwOFwiOiBcIkxvb3AgRGV0ZWN0ZWRcIixcbiAgICAgIFwiNTA5XCI6IFwiQmFuZHdpZHRoIExpbWl0IEV4Y2VlZGVkXCIsXG4gICAgICBcIjUxMFwiOiBcIk5vdCBFeHRlbmRlZFwiLFxuICAgICAgXCI1MTFcIjogXCJOZXR3b3JrIEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkXCJcbiAgICB9O1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3N0YXR1c2VzQDIuMC4yL25vZGVfbW9kdWxlcy9zdGF0dXNlcy9pbmRleC5qc1xudmFyIHJlcXVpcmVfc3RhdHVzZXMgPSBfX2NvbW1vbkpTKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vc3RhdHVzZXNAMi4wLjIvbm9kZV9tb2R1bGVzL3N0YXR1c2VzL2luZGV4LmpzXCIoZXhwb3J0cywgbW9kdWxlKSB7XG4gICAgdmFyIGNvZGVzID0gcmVxdWlyZV9jb2RlcygpO1xuICAgIG1vZHVsZS5leHBvcnRzID0gc3RhdHVzMjtcbiAgICBzdGF0dXMyLm1lc3NhZ2UgPSBjb2RlcztcbiAgICBzdGF0dXMyLmNvZGUgPSBjcmVhdGVNZXNzYWdlVG9TdGF0dXNDb2RlTWFwKGNvZGVzKTtcbiAgICBzdGF0dXMyLmNvZGVzID0gY3JlYXRlU3RhdHVzQ29kZUxpc3QoY29kZXMpO1xuICAgIHN0YXR1czIucmVkaXJlY3QgPSB7XG4gICAgICAzMDA6IHRydWUsXG4gICAgICAzMDE6IHRydWUsXG4gICAgICAzMDI6IHRydWUsXG4gICAgICAzMDM6IHRydWUsXG4gICAgICAzMDU6IHRydWUsXG4gICAgICAzMDc6IHRydWUsXG4gICAgICAzMDg6IHRydWVcbiAgICB9O1xuICAgIHN0YXR1czIuZW1wdHkgPSB7XG4gICAgICAyMDQ6IHRydWUsXG4gICAgICAyMDU6IHRydWUsXG4gICAgICAzMDQ6IHRydWVcbiAgICB9O1xuICAgIHN0YXR1czIucmV0cnkgPSB7XG4gICAgICA1MDI6IHRydWUsXG4gICAgICA1MDM6IHRydWUsXG4gICAgICA1MDQ6IHRydWVcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGNyZWF0ZU1lc3NhZ2VUb1N0YXR1c0NvZGVNYXAoY29kZXMyKSB7XG4gICAgICB2YXIgbWFwID0ge307XG4gICAgICBPYmplY3Qua2V5cyhjb2RlczIpLmZvckVhY2goZnVuY3Rpb24gZm9yRWFjaENvZGUoY29kZSkge1xuICAgICAgICB2YXIgbWVzc2FnZSA9IGNvZGVzMltjb2RlXTtcbiAgICAgICAgdmFyIHN0YXR1czMgPSBOdW1iZXIoY29kZSk7XG4gICAgICAgIG1hcFttZXNzYWdlLnRvTG93ZXJDYXNlKCldID0gc3RhdHVzMztcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlU3RhdHVzQ29kZUxpc3QoY29kZXMyKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29kZXMyKS5tYXAoZnVuY3Rpb24gbWFwQ29kZShjb2RlKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoY29kZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0U3RhdHVzQ29kZShtZXNzYWdlKSB7XG4gICAgICB2YXIgbXNnID0gbWVzc2FnZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RhdHVzMi5jb2RlLCBtc2cpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzdGF0dXMgbWVzc2FnZTogXCInICsgbWVzc2FnZSArICdcIicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXR1czIuY29kZVttc2ddO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRTdGF0dXNNZXNzYWdlKGNvZGUpIHtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0YXR1czIubWVzc2FnZSwgY29kZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBzdGF0dXMgY29kZTogXCIgKyBjb2RlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0dXMyLm1lc3NhZ2VbY29kZV07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN0YXR1czIoY29kZSkge1xuICAgICAgaWYgKHR5cGVvZiBjb2RlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHJldHVybiBnZXRTdGF0dXNNZXNzYWdlKGNvZGUpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBjb2RlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJjb2RlIG11c3QgYmUgYSBudW1iZXIgb3Igc3RyaW5nXCIpO1xuICAgICAgfVxuICAgICAgdmFyIG4gPSBwYXJzZUludChjb2RlLCAxMCk7XG4gICAgICBpZiAoIWlzTmFOKG4pKSB7XG4gICAgICAgIHJldHVybiBnZXRTdGF0dXNNZXNzYWdlKG4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldFN0YXR1c0NvZGUoY29kZSk7XG4gICAgfVxuICB9XG59KTtcblxuLy8gc3JjL3V0aWwtc3R1Yi50c1xudmFyIHV0aWxfc3R1Yl9leHBvcnRzID0ge307XG5fX2V4cG9ydCh1dGlsX3N0dWJfZXhwb3J0cywge1xuICBpbnNwZWN0OiAoKSA9PiBpbnNwZWN0XG59KTtcbnZhciBpbnNwZWN0O1xudmFyIGluaXRfdXRpbF9zdHViID0gX19lc20oe1xuICBcInNyYy91dGlsLXN0dWIudHNcIigpIHtcbiAgICBpbnNwZWN0ID0ge307XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vb2JqZWN0LWluc3BlY3RAMS4xMy40L25vZGVfbW9kdWxlcy9vYmplY3QtaW5zcGVjdC91dGlsLmluc3BlY3QuanNcbnZhciByZXF1aXJlX3V0aWxfaW5zcGVjdCA9IF9fY29tbW9uSlMoe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9vYmplY3QtaW5zcGVjdEAxLjEzLjQvbm9kZV9tb2R1bGVzL29iamVjdC1pbnNwZWN0L3V0aWwuaW5zcGVjdC5qc1wiKGV4cG9ydHMsIG1vZHVsZSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gKGluaXRfdXRpbF9zdHViKCksIF9fdG9Db21tb25KUyh1dGlsX3N0dWJfZXhwb3J0cykpLmluc3BlY3Q7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vb2JqZWN0LWluc3BlY3RAMS4xMy40L25vZGVfbW9kdWxlcy9vYmplY3QtaW5zcGVjdC9pbmRleC5qc1xudmFyIHJlcXVpcmVfb2JqZWN0X2luc3BlY3QgPSBfX2NvbW1vbkpTKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vb2JqZWN0LWluc3BlY3RAMS4xMy40L25vZGVfbW9kdWxlcy9vYmplY3QtaW5zcGVjdC9pbmRleC5qc1wiKGV4cG9ydHMsIG1vZHVsZSkge1xuICAgIHZhciBoYXNNYXAgPSB0eXBlb2YgTWFwID09PSBcImZ1bmN0aW9uXCIgJiYgTWFwLnByb3RvdHlwZTtcbiAgICB2YXIgbWFwU2l6ZURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmIGhhc01hcCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTWFwLnByb3RvdHlwZSwgXCJzaXplXCIpIDogbnVsbDtcbiAgICB2YXIgbWFwU2l6ZSA9IGhhc01hcCAmJiBtYXBTaXplRGVzY3JpcHRvciAmJiB0eXBlb2YgbWFwU2l6ZURlc2NyaXB0b3IuZ2V0ID09PSBcImZ1bmN0aW9uXCIgPyBtYXBTaXplRGVzY3JpcHRvci5nZXQgOiBudWxsO1xuICAgIHZhciBtYXBGb3JFYWNoID0gaGFzTWFwICYmIE1hcC5wcm90b3R5cGUuZm9yRWFjaDtcbiAgICB2YXIgaGFzU2V0ID0gdHlwZW9mIFNldCA9PT0gXCJmdW5jdGlvblwiICYmIFNldC5wcm90b3R5cGU7XG4gICAgdmFyIHNldFNpemVEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiBoYXNTZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFNldC5wcm90b3R5cGUsIFwic2l6ZVwiKSA6IG51bGw7XG4gICAgdmFyIHNldFNpemUgPSBoYXNTZXQgJiYgc2V0U2l6ZURlc2NyaXB0b3IgJiYgdHlwZW9mIHNldFNpemVEZXNjcmlwdG9yLmdldCA9PT0gXCJmdW5jdGlvblwiID8gc2V0U2l6ZURlc2NyaXB0b3IuZ2V0IDogbnVsbDtcbiAgICB2YXIgc2V0Rm9yRWFjaCA9IGhhc1NldCAmJiBTZXQucHJvdG90eXBlLmZvckVhY2g7XG4gICAgdmFyIGhhc1dlYWtNYXAgPSB0eXBlb2YgV2Vha01hcCA9PT0gXCJmdW5jdGlvblwiICYmIFdlYWtNYXAucHJvdG90eXBlO1xuICAgIHZhciB3ZWFrTWFwSGFzID0gaGFzV2Vha01hcCA/IFdlYWtNYXAucHJvdG90eXBlLmhhcyA6IG51bGw7XG4gICAgdmFyIGhhc1dlYWtTZXQgPSB0eXBlb2YgV2Vha1NldCA9PT0gXCJmdW5jdGlvblwiICYmIFdlYWtTZXQucHJvdG90eXBlO1xuICAgIHZhciB3ZWFrU2V0SGFzID0gaGFzV2Vha1NldCA/IFdlYWtTZXQucHJvdG90eXBlLmhhcyA6IG51bGw7XG4gICAgdmFyIGhhc1dlYWtSZWYgPSB0eXBlb2YgV2Vha1JlZiA9PT0gXCJmdW5jdGlvblwiICYmIFdlYWtSZWYucHJvdG90eXBlO1xuICAgIHZhciB3ZWFrUmVmRGVyZWYgPSBoYXNXZWFrUmVmID8gV2Vha1JlZi5wcm90b3R5cGUuZGVyZWYgOiBudWxsO1xuICAgIHZhciBib29sZWFuVmFsdWVPZiA9IEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2Y7XG4gICAgdmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgICB2YXIgZnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbiAgICB2YXIgJG1hdGNoID0gU3RyaW5nLnByb3RvdHlwZS5tYXRjaDtcbiAgICB2YXIgJHNsaWNlID0gU3RyaW5nLnByb3RvdHlwZS5zbGljZTtcbiAgICB2YXIgJHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG4gICAgdmFyICR0b1VwcGVyQ2FzZSA9IFN0cmluZy5wcm90b3R5cGUudG9VcHBlckNhc2U7XG4gICAgdmFyICR0b0xvd2VyQ2FzZSA9IFN0cmluZy5wcm90b3R5cGUudG9Mb3dlckNhc2U7XG4gICAgdmFyICR0ZXN0ID0gUmVnRXhwLnByb3RvdHlwZS50ZXN0O1xuICAgIHZhciAkY29uY2F0ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdDtcbiAgICB2YXIgJGpvaW4gPSBBcnJheS5wcm90b3R5cGUuam9pbjtcbiAgICB2YXIgJGFyclNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuICAgIHZhciAkZmxvb3IgPSBNYXRoLmZsb29yO1xuICAgIHZhciBiaWdJbnRWYWx1ZU9mID0gdHlwZW9mIEJpZ0ludCA9PT0gXCJmdW5jdGlvblwiID8gQmlnSW50LnByb3RvdHlwZS52YWx1ZU9mIDogbnVsbDtcbiAgICB2YXIgZ09QUyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4gICAgdmFyIHN5bVRvU3RyaW5nID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nIDogbnVsbDtcbiAgICB2YXIgaGFzU2hhbW1lZFN5bWJvbHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJvYmplY3RcIjtcbiAgICB2YXIgdG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLnRvU3RyaW5nVGFnICYmICh0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSBoYXNTaGFtbWVkU3ltYm9scyA/IFwib2JqZWN0XCIgOiBcInN5bWJvbFwiKSA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IG51bGw7XG4gICAgdmFyIGlzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG4gICAgdmFyIGdQTyA9ICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJmdW5jdGlvblwiID8gUmVmbGVjdC5nZXRQcm90b3R5cGVPZiA6IE9iamVjdC5nZXRQcm90b3R5cGVPZikgfHwgKFtdLl9fcHJvdG9fXyA9PT0gQXJyYXkucHJvdG90eXBlID8gZnVuY3Rpb24oTykge1xuICAgICAgcmV0dXJuIE8uX19wcm90b19fO1xuICAgIH0gOiBudWxsKTtcbiAgICBmdW5jdGlvbiBhZGROdW1lcmljU2VwYXJhdG9yKG51bSwgc3RyKSB7XG4gICAgICBpZiAobnVtID09PSBJbmZpbml0eSB8fCBudW0gPT09IC1JbmZpbml0eSB8fCBudW0gIT09IG51bSB8fCBudW0gJiYgbnVtID4gLTFlMyAmJiBudW0gPCAxZTMgfHwgJHRlc3QuY2FsbCgvZS8sIHN0cikpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgIH1cbiAgICAgIHZhciBzZXBSZWdleCA9IC9bMC05XSg/PSg/OlswLTldezN9KSsoPyFbMC05XSkpL2c7XG4gICAgICBpZiAodHlwZW9mIG51bSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICB2YXIgaW50ID0gbnVtIDwgMCA/IC0kZmxvb3IoLW51bSkgOiAkZmxvb3IobnVtKTtcbiAgICAgICAgaWYgKGludCAhPT0gbnVtKSB7XG4gICAgICAgICAgdmFyIGludFN0ciA9IFN0cmluZyhpbnQpO1xuICAgICAgICAgIHZhciBkZWMgPSAkc2xpY2UuY2FsbChzdHIsIGludFN0ci5sZW5ndGggKyAxKTtcbiAgICAgICAgICByZXR1cm4gJHJlcGxhY2UuY2FsbChpbnRTdHIsIHNlcFJlZ2V4LCBcIiQmX1wiKSArIFwiLlwiICsgJHJlcGxhY2UuY2FsbCgkcmVwbGFjZS5jYWxsKGRlYywgLyhbMC05XXszfSkvZywgXCIkJl9cIiksIC9fJC8sIFwiXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gJHJlcGxhY2UuY2FsbChzdHIsIHNlcFJlZ2V4LCBcIiQmX1wiKTtcbiAgICB9XG4gICAgdmFyIHV0aWxJbnNwZWN0ID0gcmVxdWlyZV91dGlsX2luc3BlY3QoKTtcbiAgICB2YXIgaW5zcGVjdEN1c3RvbSA9IHV0aWxJbnNwZWN0LmN1c3RvbTtcbiAgICB2YXIgaW5zcGVjdFN5bWJvbCA9IGlzU3ltYm9sKGluc3BlY3RDdXN0b20pID8gaW5zcGVjdEN1c3RvbSA6IG51bGw7XG4gICAgdmFyIHF1b3RlcyA9IHtcbiAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgIFwiZG91YmxlXCI6ICdcIicsXG4gICAgICBzaW5nbGU6IFwiJ1wiXG4gICAgfTtcbiAgICB2YXIgcXVvdGVSRXMgPSB7XG4gICAgICBfX3Byb3RvX186IG51bGwsXG4gICAgICBcImRvdWJsZVwiOiAvKFtcIlxcXFxdKS9nLFxuICAgICAgc2luZ2xlOiAvKFsnXFxcXF0pL2dcbiAgICB9O1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5zcGVjdF8ob2JqLCBvcHRpb25zLCBkZXB0aCwgc2Vlbikge1xuICAgICAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgaWYgKGhhcyhvcHRzLCBcInF1b3RlU3R5bGVcIikgJiYgIWhhcyhxdW90ZXMsIG9wdHMucXVvdGVTdHlsZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIFwicXVvdGVTdHlsZVwiIG11c3QgYmUgXCJzaW5nbGVcIiBvciBcImRvdWJsZVwiJyk7XG4gICAgICB9XG4gICAgICBpZiAoaGFzKG9wdHMsIFwibWF4U3RyaW5nTGVuZ3RoXCIpICYmICh0eXBlb2Ygb3B0cy5tYXhTdHJpbmdMZW5ndGggPT09IFwibnVtYmVyXCIgPyBvcHRzLm1heFN0cmluZ0xlbmd0aCA8IDAgJiYgb3B0cy5tYXhTdHJpbmdMZW5ndGggIT09IEluZmluaXR5IDogb3B0cy5tYXhTdHJpbmdMZW5ndGggIT09IG51bGwpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBcIm1heFN0cmluZ0xlbmd0aFwiLCBpZiBwcm92aWRlZCwgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIsIEluZmluaXR5LCBvciBgbnVsbGAnKTtcbiAgICAgIH1cbiAgICAgIHZhciBjdXN0b21JbnNwZWN0ID0gaGFzKG9wdHMsIFwiY3VzdG9tSW5zcGVjdFwiKSA/IG9wdHMuY3VzdG9tSW5zcGVjdCA6IHRydWU7XG4gICAgICBpZiAodHlwZW9mIGN1c3RvbUluc3BlY3QgIT09IFwiYm9vbGVhblwiICYmIGN1c3RvbUluc3BlY3QgIT09IFwic3ltYm9sXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbiBcXFwiY3VzdG9tSW5zcGVjdFxcXCIsIGlmIHByb3ZpZGVkLCBtdXN0IGJlIGB0cnVlYCwgYGZhbHNlYCwgb3IgYCdzeW1ib2wnYFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChoYXMob3B0cywgXCJpbmRlbnRcIikgJiYgb3B0cy5pbmRlbnQgIT09IG51bGwgJiYgb3B0cy5pbmRlbnQgIT09IFwiXHRcIiAmJiAhKHBhcnNlSW50KG9wdHMuaW5kZW50LCAxMCkgPT09IG9wdHMuaW5kZW50ICYmIG9wdHMuaW5kZW50ID4gMCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIFwiaW5kZW50XCIgbXVzdCBiZSBcIlxcXFx0XCIsIGFuIGludGVnZXIgPiAwLCBvciBgbnVsbGAnKTtcbiAgICAgIH1cbiAgICAgIGlmIChoYXMob3B0cywgXCJudW1lcmljU2VwYXJhdG9yXCIpICYmIHR5cGVvZiBvcHRzLm51bWVyaWNTZXBhcmF0b3IgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBcIm51bWVyaWNTZXBhcmF0b3JcIiwgaWYgcHJvdmlkZWQsIG11c3QgYmUgYHRydWVgIG9yIGBmYWxzZWAnKTtcbiAgICAgIH1cbiAgICAgIHZhciBudW1lcmljU2VwYXJhdG9yID0gb3B0cy5udW1lcmljU2VwYXJhdG9yO1xuICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIFwidW5kZWZpbmVkXCI7XG4gICAgICB9XG4gICAgICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIm51bGxcIjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcImJvb2xlYW5cIikge1xuICAgICAgICByZXR1cm4gb2JqID8gXCJ0cnVlXCIgOiBcImZhbHNlXCI7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gaW5zcGVjdFN0cmluZyhvYmosIG9wdHMpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgaWYgKG9iaiA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBJbmZpbml0eSAvIG9iaiA+IDAgPyBcIjBcIiA6IFwiLTBcIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RyID0gU3RyaW5nKG9iaik7XG4gICAgICAgIHJldHVybiBudW1lcmljU2VwYXJhdG9yID8gYWRkTnVtZXJpY1NlcGFyYXRvcihvYmosIHN0cikgOiBzdHI7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJiaWdpbnRcIikge1xuICAgICAgICB2YXIgYmlnSW50U3RyID0gU3RyaW5nKG9iaikgKyBcIm5cIjtcbiAgICAgICAgcmV0dXJuIG51bWVyaWNTZXBhcmF0b3IgPyBhZGROdW1lcmljU2VwYXJhdG9yKG9iaiwgYmlnSW50U3RyKSA6IGJpZ0ludFN0cjtcbiAgICAgIH1cbiAgICAgIHZhciBtYXhEZXB0aCA9IHR5cGVvZiBvcHRzLmRlcHRoID09PSBcInVuZGVmaW5lZFwiID8gNSA6IG9wdHMuZGVwdGg7XG4gICAgICBpZiAodHlwZW9mIGRlcHRoID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGRlcHRoID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChkZXB0aCA+PSBtYXhEZXB0aCAmJiBtYXhEZXB0aCA+IDAgJiYgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gaXNBcnJheShvYmopID8gXCJbQXJyYXldXCIgOiBcIltPYmplY3RdXCI7XG4gICAgICB9XG4gICAgICB2YXIgaW5kZW50ID0gZ2V0SW5kZW50KG9wdHMsIGRlcHRoKTtcbiAgICAgIGlmICh0eXBlb2Ygc2VlbiA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBzZWVuID0gW107XG4gICAgICB9IGVsc2UgaWYgKGluZGV4T2Yoc2Vlbiwgb2JqKSA+PSAwKSB7XG4gICAgICAgIHJldHVybiBcIltDaXJjdWxhcl1cIjtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGluc3BlY3QzKHZhbHVlLCBmcm9tLCBub0luZGVudCkge1xuICAgICAgICBpZiAoZnJvbSkge1xuICAgICAgICAgIHNlZW4gPSAkYXJyU2xpY2UuY2FsbChzZWVuKTtcbiAgICAgICAgICBzZWVuLnB1c2goZnJvbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vSW5kZW50KSB7XG4gICAgICAgICAgdmFyIG5ld09wdHMgPSB7XG4gICAgICAgICAgICBkZXB0aDogb3B0cy5kZXB0aFxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKGhhcyhvcHRzLCBcInF1b3RlU3R5bGVcIikpIHtcbiAgICAgICAgICAgIG5ld09wdHMucXVvdGVTdHlsZSA9IG9wdHMucXVvdGVTdHlsZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGluc3BlY3RfKHZhbHVlLCBuZXdPcHRzLCBkZXB0aCArIDEsIHNlZW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnNwZWN0Xyh2YWx1ZSwgb3B0cywgZGVwdGggKyAxLCBzZWVuKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIgJiYgIWlzUmVnRXhwKG9iaikpIHtcbiAgICAgICAgdmFyIG5hbWUgPSBuYW1lT2Yob2JqKTtcbiAgICAgICAgdmFyIGtleXMgPSBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdDMpO1xuICAgICAgICByZXR1cm4gXCJbRnVuY3Rpb25cIiArIChuYW1lID8gXCI6IFwiICsgbmFtZSA6IFwiIChhbm9ueW1vdXMpXCIpICsgXCJdXCIgKyAoa2V5cy5sZW5ndGggPiAwID8gXCIgeyBcIiArICRqb2luLmNhbGwoa2V5cywgXCIsIFwiKSArIFwiIH1cIiA6IFwiXCIpO1xuICAgICAgfVxuICAgICAgaWYgKGlzU3ltYm9sKG9iaikpIHtcbiAgICAgICAgdmFyIHN5bVN0cmluZyA9IGhhc1NoYW1tZWRTeW1ib2xzID8gJHJlcGxhY2UuY2FsbChTdHJpbmcob2JqKSwgL14oU3ltYm9sXFwoLipcXCkpX1teKV0qJC8sIFwiJDFcIikgOiBzeW1Ub1N0cmluZy5jYWxsKG9iaik7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmICFoYXNTaGFtbWVkU3ltYm9scyA/IG1hcmtCb3hlZChzeW1TdHJpbmcpIDogc3ltU3RyaW5nO1xuICAgICAgfVxuICAgICAgaWYgKGlzRWxlbWVudChvYmopKSB7XG4gICAgICAgIHZhciBzID0gXCI8XCIgKyAkdG9Mb3dlckNhc2UuY2FsbChTdHJpbmcob2JqLm5vZGVOYW1lKSk7XG4gICAgICAgIHZhciBhdHRycyA9IG9iai5hdHRyaWJ1dGVzIHx8IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF0dHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgcyArPSBcIiBcIiArIGF0dHJzW2ldLm5hbWUgKyBcIj1cIiArIHdyYXBRdW90ZXMocXVvdGUoYXR0cnNbaV0udmFsdWUpLCBcImRvdWJsZVwiLCBvcHRzKTtcbiAgICAgICAgfVxuICAgICAgICBzICs9IFwiPlwiO1xuICAgICAgICBpZiAob2JqLmNoaWxkTm9kZXMgJiYgb2JqLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgcyArPSBcIi4uLlwiO1xuICAgICAgICB9XG4gICAgICAgIHMgKz0gXCI8L1wiICsgJHRvTG93ZXJDYXNlLmNhbGwoU3RyaW5nKG9iai5ub2RlTmFtZSkpICsgXCI+XCI7XG4gICAgICAgIHJldHVybiBzO1xuICAgICAgfVxuICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICBpZiAob2JqLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBcIltdXCI7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHhzID0gYXJyT2JqS2V5cyhvYmosIGluc3BlY3QzKTtcbiAgICAgICAgaWYgKGluZGVudCAmJiAhc2luZ2xlTGluZVZhbHVlcyh4cykpIHtcbiAgICAgICAgICByZXR1cm4gXCJbXCIgKyBpbmRlbnRlZEpvaW4oeHMsIGluZGVudCkgKyBcIl1cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJbIFwiICsgJGpvaW4uY2FsbCh4cywgXCIsIFwiKSArIFwiIF1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpc0Vycm9yKG9iaikpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gYXJyT2JqS2V5cyhvYmosIGluc3BlY3QzKTtcbiAgICAgICAgaWYgKCEoXCJjYXVzZVwiIGluIEVycm9yLnByb3RvdHlwZSkgJiYgXCJjYXVzZVwiIGluIG9iaiAmJiAhaXNFbnVtZXJhYmxlLmNhbGwob2JqLCBcImNhdXNlXCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFwieyBbXCIgKyBTdHJpbmcob2JqKSArIFwiXSBcIiArICRqb2luLmNhbGwoJGNvbmNhdC5jYWxsKFwiW2NhdXNlXTogXCIgKyBpbnNwZWN0MyhvYmouY2F1c2UpLCBwYXJ0cyksIFwiLCBcIikgKyBcIiB9XCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBcIltcIiArIFN0cmluZyhvYmopICsgXCJdXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwieyBbXCIgKyBTdHJpbmcob2JqKSArIFwiXSBcIiArICRqb2luLmNhbGwocGFydHMsIFwiLCBcIikgKyBcIiB9XCI7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiBjdXN0b21JbnNwZWN0KSB7XG4gICAgICAgIGlmIChpbnNwZWN0U3ltYm9sICYmIHR5cGVvZiBvYmpbaW5zcGVjdFN5bWJvbF0gPT09IFwiZnVuY3Rpb25cIiAmJiB1dGlsSW5zcGVjdCkge1xuICAgICAgICAgIHJldHVybiB1dGlsSW5zcGVjdChvYmosIHsgZGVwdGg6IG1heERlcHRoIC0gZGVwdGggfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VzdG9tSW5zcGVjdCAhPT0gXCJzeW1ib2xcIiAmJiB0eXBlb2Ygb2JqLmluc3BlY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHJldHVybiBvYmouaW5zcGVjdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXNNYXAob2JqKSkge1xuICAgICAgICB2YXIgbWFwUGFydHMgPSBbXTtcbiAgICAgICAgaWYgKG1hcEZvckVhY2gpIHtcbiAgICAgICAgICBtYXBGb3JFYWNoLmNhbGwob2JqLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICBtYXBQYXJ0cy5wdXNoKGluc3BlY3QzKGtleSwgb2JqLCB0cnVlKSArIFwiID0+IFwiICsgaW5zcGVjdDModmFsdWUsIG9iaikpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uT2YoXCJNYXBcIiwgbWFwU2l6ZS5jYWxsKG9iaiksIG1hcFBhcnRzLCBpbmRlbnQpO1xuICAgICAgfVxuICAgICAgaWYgKGlzU2V0KG9iaikpIHtcbiAgICAgICAgdmFyIHNldFBhcnRzID0gW107XG4gICAgICAgIGlmIChzZXRGb3JFYWNoKSB7XG4gICAgICAgICAgc2V0Rm9yRWFjaC5jYWxsKG9iaiwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHNldFBhcnRzLnB1c2goaW5zcGVjdDModmFsdWUsIG9iaikpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uT2YoXCJTZXRcIiwgc2V0U2l6ZS5jYWxsKG9iaiksIHNldFBhcnRzLCBpbmRlbnQpO1xuICAgICAgfVxuICAgICAgaWYgKGlzV2Vha01hcChvYmopKSB7XG4gICAgICAgIHJldHVybiB3ZWFrQ29sbGVjdGlvbk9mKFwiV2Vha01hcFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1dlYWtTZXQob2JqKSkge1xuICAgICAgICByZXR1cm4gd2Vha0NvbGxlY3Rpb25PZihcIldlYWtTZXRcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXNXZWFrUmVmKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIHdlYWtDb2xsZWN0aW9uT2YoXCJXZWFrUmVmXCIpO1xuICAgICAgfVxuICAgICAgaWYgKGlzTnVtYmVyKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChpbnNwZWN0MyhOdW1iZXIob2JqKSkpO1xuICAgICAgfVxuICAgICAgaWYgKGlzQmlnSW50KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChpbnNwZWN0MyhiaWdJbnRWYWx1ZU9mLmNhbGwob2JqKSkpO1xuICAgICAgfVxuICAgICAgaWYgKGlzQm9vbGVhbihvYmopKSB7XG4gICAgICAgIHJldHVybiBtYXJrQm94ZWQoYm9vbGVhblZhbHVlT2YuY2FsbChvYmopKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1N0cmluZyhvYmopKSB7XG4gICAgICAgIHJldHVybiBtYXJrQm94ZWQoaW5zcGVjdDMoU3RyaW5nKG9iaikpKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIG9iaiA9PT0gd2luZG93KSB7XG4gICAgICAgIHJldHVybiBcInsgW29iamVjdCBXaW5kb3ddIH1cIjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvYmogPT09IGdsb2JhbFRoaXMgfHwgdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvYmogPT09IGdsb2JhbCkge1xuICAgICAgICByZXR1cm4gXCJ7IFtvYmplY3QgZ2xvYmFsVGhpc10gfVwiO1xuICAgICAgfVxuICAgICAgaWYgKCFpc0RhdGUob2JqKSAmJiAhaXNSZWdFeHAob2JqKSkge1xuICAgICAgICB2YXIgeXMgPSBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdDMpO1xuICAgICAgICB2YXIgaXNQbGFpbk9iamVjdCA9IGdQTyA/IGdQTyhvYmopID09PSBPYmplY3QucHJvdG90eXBlIDogb2JqIGluc3RhbmNlb2YgT2JqZWN0IHx8IG9iai5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xuICAgICAgICB2YXIgcHJvdG9UYWcgPSBvYmogaW5zdGFuY2VvZiBPYmplY3QgPyBcIlwiIDogXCJudWxsIHByb3RvdHlwZVwiO1xuICAgICAgICB2YXIgc3RyaW5nVGFnID0gIWlzUGxhaW5PYmplY3QgJiYgdG9TdHJpbmdUYWcgJiYgT2JqZWN0KG9iaikgPT09IG9iaiAmJiB0b1N0cmluZ1RhZyBpbiBvYmogPyAkc2xpY2UuY2FsbCh0b1N0cihvYmopLCA4LCAtMSkgOiBwcm90b1RhZyA/IFwiT2JqZWN0XCIgOiBcIlwiO1xuICAgICAgICB2YXIgY29uc3RydWN0b3JUYWcgPSBpc1BsYWluT2JqZWN0IHx8IHR5cGVvZiBvYmouY29uc3RydWN0b3IgIT09IFwiZnVuY3Rpb25cIiA/IFwiXCIgOiBvYmouY29uc3RydWN0b3IubmFtZSA/IG9iai5jb25zdHJ1Y3Rvci5uYW1lICsgXCIgXCIgOiBcIlwiO1xuICAgICAgICB2YXIgdGFnID0gY29uc3RydWN0b3JUYWcgKyAoc3RyaW5nVGFnIHx8IHByb3RvVGFnID8gXCJbXCIgKyAkam9pbi5jYWxsKCRjb25jYXQuY2FsbChbXSwgc3RyaW5nVGFnIHx8IFtdLCBwcm90b1RhZyB8fCBbXSksIFwiOiBcIikgKyBcIl0gXCIgOiBcIlwiKTtcbiAgICAgICAgaWYgKHlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0YWcgKyBcInt9XCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGVudCkge1xuICAgICAgICAgIHJldHVybiB0YWcgKyBcIntcIiArIGluZGVudGVkSm9pbih5cywgaW5kZW50KSArIFwifVwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YWcgKyBcInsgXCIgKyAkam9pbi5jYWxsKHlzLCBcIiwgXCIpICsgXCIgfVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFN0cmluZyhvYmopO1xuICAgIH07XG4gICAgZnVuY3Rpb24gd3JhcFF1b3RlcyhzLCBkZWZhdWx0U3R5bGUsIG9wdHMpIHtcbiAgICAgIHZhciBzdHlsZSA9IG9wdHMucXVvdGVTdHlsZSB8fCBkZWZhdWx0U3R5bGU7XG4gICAgICB2YXIgcXVvdGVDaGFyID0gcXVvdGVzW3N0eWxlXTtcbiAgICAgIHJldHVybiBxdW90ZUNoYXIgKyBzICsgcXVvdGVDaGFyO1xuICAgIH1cbiAgICBmdW5jdGlvbiBxdW90ZShzKSB7XG4gICAgICByZXR1cm4gJHJlcGxhY2UuY2FsbChTdHJpbmcocyksIC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2FuVHJ1c3RUb1N0cmluZyhvYmopIHtcbiAgICAgIHJldHVybiAhdG9TdHJpbmdUYWcgfHwgISh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmICh0b1N0cmluZ1RhZyBpbiBvYmogfHwgdHlwZW9mIG9ialt0b1N0cmluZ1RhZ10gIT09IFwidW5kZWZpbmVkXCIpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNBcnJheShvYmopIHtcbiAgICAgIHJldHVybiB0b1N0cihvYmopID09PSBcIltvYmplY3QgQXJyYXldXCIgJiYgY2FuVHJ1c3RUb1N0cmluZyhvYmopO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0RhdGUob2JqKSB7XG4gICAgICByZXR1cm4gdG9TdHIob2JqKSA9PT0gXCJbb2JqZWN0IERhdGVdXCIgJiYgY2FuVHJ1c3RUb1N0cmluZyhvYmopO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgICAgIHJldHVybiB0b1N0cihvYmopID09PSBcIltvYmplY3QgUmVnRXhwXVwiICYmIGNhblRydXN0VG9TdHJpbmcob2JqKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNFcnJvcihvYmopIHtcbiAgICAgIHJldHVybiB0b1N0cihvYmopID09PSBcIltvYmplY3QgRXJyb3JdXCIgJiYgY2FuVHJ1c3RUb1N0cmluZyhvYmopO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1N0cmluZyhvYmopIHtcbiAgICAgIHJldHVybiB0b1N0cihvYmopID09PSBcIltvYmplY3QgU3RyaW5nXVwiICYmIGNhblRydXN0VG9TdHJpbmcob2JqKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNOdW1iZXIob2JqKSB7XG4gICAgICByZXR1cm4gdG9TdHIob2JqKSA9PT0gXCJbb2JqZWN0IE51bWJlcl1cIiAmJiBjYW5UcnVzdFRvU3RyaW5nKG9iaik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzQm9vbGVhbihvYmopIHtcbiAgICAgIHJldHVybiB0b1N0cihvYmopID09PSBcIltvYmplY3QgQm9vbGVhbl1cIiAmJiBjYW5UcnVzdFRvU3RyaW5nKG9iaik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzU3ltYm9sKG9iaikge1xuICAgICAgaWYgKGhhc1NoYW1tZWRTeW1ib2xzKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiBvYmogaW5zdGFuY2VvZiBTeW1ib2w7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJzeW1ib2xcIikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIgfHwgIXN5bVRvU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHN5bVRvU3RyaW5nLmNhbGwob2JqKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzQmlnSW50KG9iaikge1xuICAgICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIiB8fCAhYmlnSW50VmFsdWVPZikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBiaWdJbnRWYWx1ZU9mLmNhbGwob2JqKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBoYXNPd24yID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSB8fCBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBrZXkgaW4gdGhpcztcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGhhcyhvYmosIGtleSkge1xuICAgICAgcmV0dXJuIGhhc093bjIuY2FsbChvYmosIGtleSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvU3RyKG9iaikge1xuICAgICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbmFtZU9mKGYpIHtcbiAgICAgIGlmIChmLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGYubmFtZTtcbiAgICAgIH1cbiAgICAgIHZhciBtID0gJG1hdGNoLmNhbGwoZnVuY3Rpb25Ub1N0cmluZy5jYWxsKGYpLCAvXmZ1bmN0aW9uXFxzKihbXFx3JF0rKS8pO1xuICAgICAgaWYgKG0pIHtcbiAgICAgICAgcmV0dXJuIG1bMV07XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5kZXhPZih4cywgeCkge1xuICAgICAgaWYgKHhzLmluZGV4T2YpIHtcbiAgICAgICAgcmV0dXJuIHhzLmluZGV4T2YoeCk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHhzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoeHNbaV0gPT09IHgpIHtcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc01hcCh4KSB7XG4gICAgICBpZiAoIW1hcFNpemUgfHwgIXggfHwgdHlwZW9mIHggIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgbWFwU2l6ZS5jYWxsKHgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHNldFNpemUuY2FsbCh4KTtcbiAgICAgICAgfSBjYXRjaCAocykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgTWFwO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1dlYWtNYXAoeCkge1xuICAgICAgaWYgKCF3ZWFrTWFwSGFzIHx8ICF4IHx8IHR5cGVvZiB4ICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHdlYWtNYXBIYXMuY2FsbCh4LCB3ZWFrTWFwSGFzKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB3ZWFrU2V0SGFzLmNhbGwoeCwgd2Vha1NldEhhcyk7XG4gICAgICAgIH0gY2F0Y2ggKHMpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geCBpbnN0YW5jZW9mIFdlYWtNYXA7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzV2Vha1JlZih4KSB7XG4gICAgICBpZiAoIXdlYWtSZWZEZXJlZiB8fCAheCB8fCB0eXBlb2YgeCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICB3ZWFrUmVmRGVyZWYuY2FsbCh4KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzU2V0KHgpIHtcbiAgICAgIGlmICghc2V0U2l6ZSB8fCAheCB8fCB0eXBlb2YgeCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBzZXRTaXplLmNhbGwoeCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbWFwU2l6ZS5jYWxsKHgpO1xuICAgICAgICB9IGNhdGNoIChtKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHggaW5zdGFuY2VvZiBTZXQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzV2Vha1NldCh4KSB7XG4gICAgICBpZiAoIXdlYWtTZXRIYXMgfHwgIXggfHwgdHlwZW9mIHggIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgd2Vha1NldEhhcy5jYWxsKHgsIHdlYWtTZXRIYXMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHdlYWtNYXBIYXMuY2FsbCh4LCB3ZWFrTWFwSGFzKTtcbiAgICAgICAgfSBjYXRjaCAocykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgV2Vha1NldDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNFbGVtZW50KHgpIHtcbiAgICAgIGlmICgheCB8fCB0eXBlb2YgeCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIEhUTUxFbGVtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIHggaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0eXBlb2YgeC5ub2RlTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgeC5nZXRBdHRyaWJ1dGUgPT09IFwiZnVuY3Rpb25cIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5zcGVjdFN0cmluZyhzdHIsIG9wdHMpIHtcbiAgICAgIGlmIChzdHIubGVuZ3RoID4gb3B0cy5tYXhTdHJpbmdMZW5ndGgpIHtcbiAgICAgICAgdmFyIHJlbWFpbmluZyA9IHN0ci5sZW5ndGggLSBvcHRzLm1heFN0cmluZ0xlbmd0aDtcbiAgICAgICAgdmFyIHRyYWlsZXIgPSBcIi4uLiBcIiArIHJlbWFpbmluZyArIFwiIG1vcmUgY2hhcmFjdGVyXCIgKyAocmVtYWluaW5nID4gMSA/IFwic1wiIDogXCJcIik7XG4gICAgICAgIHJldHVybiBpbnNwZWN0U3RyaW5nKCRzbGljZS5jYWxsKHN0ciwgMCwgb3B0cy5tYXhTdHJpbmdMZW5ndGgpLCBvcHRzKSArIHRyYWlsZXI7XG4gICAgICB9XG4gICAgICB2YXIgcXVvdGVSRSA9IHF1b3RlUkVzW29wdHMucXVvdGVTdHlsZSB8fCBcInNpbmdsZVwiXTtcbiAgICAgIHF1b3RlUkUubGFzdEluZGV4ID0gMDtcbiAgICAgIHZhciBzID0gJHJlcGxhY2UuY2FsbCgkcmVwbGFjZS5jYWxsKHN0ciwgcXVvdGVSRSwgXCJcXFxcJDFcIiksIC9bXFx4MDAtXFx4MWZdL2csIGxvd2J5dGUpO1xuICAgICAgcmV0dXJuIHdyYXBRdW90ZXMocywgXCJzaW5nbGVcIiwgb3B0cyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxvd2J5dGUoYykge1xuICAgICAgdmFyIG4gPSBjLmNoYXJDb2RlQXQoMCk7XG4gICAgICB2YXIgeCA9IHtcbiAgICAgICAgODogXCJiXCIsXG4gICAgICAgIDk6IFwidFwiLFxuICAgICAgICAxMDogXCJuXCIsXG4gICAgICAgIDEyOiBcImZcIixcbiAgICAgICAgMTM6IFwiclwiXG4gICAgICB9W25dO1xuICAgICAgaWYgKHgpIHtcbiAgICAgICAgcmV0dXJuIFwiXFxcXFwiICsgeDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBcIlxcXFx4XCIgKyAobiA8IDE2ID8gXCIwXCIgOiBcIlwiKSArICR0b1VwcGVyQ2FzZS5jYWxsKG4udG9TdHJpbmcoMTYpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWFya0JveGVkKHN0cikge1xuICAgICAgcmV0dXJuIFwiT2JqZWN0KFwiICsgc3RyICsgXCIpXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHdlYWtDb2xsZWN0aW9uT2YodHlwZSkge1xuICAgICAgcmV0dXJuIHR5cGUgKyBcIiB7ID8gfVwiO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb2xsZWN0aW9uT2YodHlwZSwgc2l6ZSwgZW50cmllcywgaW5kZW50KSB7XG4gICAgICB2YXIgam9pbmVkRW50cmllcyA9IGluZGVudCA/IGluZGVudGVkSm9pbihlbnRyaWVzLCBpbmRlbnQpIDogJGpvaW4uY2FsbChlbnRyaWVzLCBcIiwgXCIpO1xuICAgICAgcmV0dXJuIHR5cGUgKyBcIiAoXCIgKyBzaXplICsgXCIpIHtcIiArIGpvaW5lZEVudHJpZXMgKyBcIn1cIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2luZ2xlTGluZVZhbHVlcyh4cykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaW5kZXhPZih4c1tpXSwgXCJcXG5cIikgPj0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEluZGVudChvcHRzLCBkZXB0aCkge1xuICAgICAgdmFyIGJhc2VJbmRlbnQ7XG4gICAgICBpZiAob3B0cy5pbmRlbnQgPT09IFwiXHRcIikge1xuICAgICAgICBiYXNlSW5kZW50ID0gXCJcdFwiO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0cy5pbmRlbnQgPT09IFwibnVtYmVyXCIgJiYgb3B0cy5pbmRlbnQgPiAwKSB7XG4gICAgICAgIGJhc2VJbmRlbnQgPSAkam9pbi5jYWxsKEFycmF5KG9wdHMuaW5kZW50ICsgMSksIFwiIFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYmFzZTogYmFzZUluZGVudCxcbiAgICAgICAgcHJldjogJGpvaW4uY2FsbChBcnJheShkZXB0aCArIDEpLCBiYXNlSW5kZW50KVxuICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5kZW50ZWRKb2luKHhzLCBpbmRlbnQpIHtcbiAgICAgIGlmICh4cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICB9XG4gICAgICB2YXIgbGluZUpvaW5lciA9IFwiXFxuXCIgKyBpbmRlbnQucHJldiArIGluZGVudC5iYXNlO1xuICAgICAgcmV0dXJuIGxpbmVKb2luZXIgKyAkam9pbi5jYWxsKHhzLCBcIixcIiArIGxpbmVKb2luZXIpICsgXCJcXG5cIiArIGluZGVudC5wcmV2O1xuICAgIH1cbiAgICBmdW5jdGlvbiBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdDMpIHtcbiAgICAgIHZhciBpc0FyciA9IGlzQXJyYXkob2JqKTtcbiAgICAgIHZhciB4cyA9IFtdO1xuICAgICAgaWYgKGlzQXJyKSB7XG4gICAgICAgIHhzLmxlbmd0aCA9IG9iai5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgeHNbaV0gPSBoYXMob2JqLCBpKSA/IGluc3BlY3QzKG9ialtpXSwgb2JqKSA6IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBzeW1zID0gdHlwZW9mIGdPUFMgPT09IFwiZnVuY3Rpb25cIiA/IGdPUFMob2JqKSA6IFtdO1xuICAgICAgdmFyIHN5bU1hcDtcbiAgICAgIGlmIChoYXNTaGFtbWVkU3ltYm9scykge1xuICAgICAgICBzeW1NYXAgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBzeW1zLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgc3ltTWFwW1wiJFwiICsgc3ltc1trXV0gPSBzeW1zW2tdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmICghaGFzKG9iaiwga2V5KSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FyciAmJiBTdHJpbmcoTnVtYmVyKGtleSkpID09PSBrZXkgJiYga2V5IDwgb2JqLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNTaGFtbWVkU3ltYm9scyAmJiBzeW1NYXBbXCIkXCIgKyBrZXldIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSBpZiAoJHRlc3QuY2FsbCgvW15cXHckXS8sIGtleSkpIHtcbiAgICAgICAgICB4cy5wdXNoKGluc3BlY3QzKGtleSwgb2JqKSArIFwiOiBcIiArIGluc3BlY3QzKG9ialtrZXldLCBvYmopKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB4cy5wdXNoKGtleSArIFwiOiBcIiArIGluc3BlY3QzKG9ialtrZXldLCBvYmopKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBnT1BTID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzeW1zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKGlzRW51bWVyYWJsZS5jYWxsKG9iaiwgc3ltc1tqXSkpIHtcbiAgICAgICAgICAgIHhzLnB1c2goXCJbXCIgKyBpbnNwZWN0MyhzeW1zW2pdKSArIFwiXTogXCIgKyBpbnNwZWN0MyhvYmpbc3ltc1tqXV0sIG9iaikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHhzO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvdGltZV9kdXJhdGlvbi50c1xudmFyIFRpbWVEdXJhdGlvbiA9IGNsYXNzIF9UaW1lRHVyYXRpb24ge1xuICBfX3RpbWVfZHVyYXRpb25fbWljcm9zX187XG4gIHN0YXRpYyBNSUNST1NfUEVSX01JTExJUyA9IDEwMDBuO1xuICAvKipcbiAgICogR2V0IHRoZSBhbGdlYnJhaWMgdHlwZSByZXByZXNlbnRhdGlvbiBvZiB0aGUge0BsaW5rIFRpbWVEdXJhdGlvbn0gdHlwZS5cbiAgICogQHJldHVybnMgVGhlIGFsZ2VicmFpYyB0eXBlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0eXBlLlxuICAgKi9cbiAgc3RhdGljIGdldEFsZ2VicmFpY1R5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7XG4gICAgICBlbGVtZW50czogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJfX3RpbWVfZHVyYXRpb25fbWljcm9zX19cIixcbiAgICAgICAgICBhbGdlYnJhaWNUeXBlOiBBbGdlYnJhaWNUeXBlLkk2NFxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG4gIH1cbiAgc3RhdGljIGlzVGltZUR1cmF0aW9uKGFsZ2VicmFpY1R5cGUpIHtcbiAgICBpZiAoYWxnZWJyYWljVHlwZS50YWcgIT09IFwiUHJvZHVjdFwiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGVsZW1lbnRzID0gYWxnZWJyYWljVHlwZS52YWx1ZS5lbGVtZW50cztcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoICE9PSAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IG1pY3Jvc0VsZW1lbnQgPSBlbGVtZW50c1swXTtcbiAgICByZXR1cm4gbWljcm9zRWxlbWVudC5uYW1lID09PSBcIl9fdGltZV9kdXJhdGlvbl9taWNyb3NfX1wiICYmIG1pY3Jvc0VsZW1lbnQuYWxnZWJyYWljVHlwZS50YWcgPT09IFwiSTY0XCI7XG4gIH1cbiAgZ2V0IG1pY3JvcygpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RpbWVfZHVyYXRpb25fbWljcm9zX187XG4gIH1cbiAgZ2V0IG1pbGxpcygpIHtcbiAgICByZXR1cm4gTnVtYmVyKHRoaXMubWljcm9zIC8gX1RpbWVEdXJhdGlvbi5NSUNST1NfUEVSX01JTExJUyk7XG4gIH1cbiAgY29uc3RydWN0b3IobWljcm9zKSB7XG4gICAgdGhpcy5fX3RpbWVfZHVyYXRpb25fbWljcm9zX18gPSBtaWNyb3M7XG4gIH1cbiAgc3RhdGljIGZyb21NaWxsaXMobWlsbGlzKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZUR1cmF0aW9uKEJpZ0ludChtaWxsaXMpICogX1RpbWVEdXJhdGlvbi5NSUNST1NfUEVSX01JTExJUyk7XG4gIH1cbiAgLyoqIFRoaXMgb3V0cHV0cyB0aGUgc2FtZSBzdHJpbmcgZm9ybWF0IHRoYXQgd2UgdXNlIGluIHRoZSBob3N0IGFuZCBpbiBSdXN0IG1vZHVsZXMgKi9cbiAgdG9TdHJpbmcoKSB7XG4gICAgY29uc3QgbWljcm9zID0gdGhpcy5taWNyb3M7XG4gICAgY29uc3Qgc2lnbiA9IG1pY3JvcyA8IDAgPyBcIi1cIiA6IFwiK1wiO1xuICAgIGNvbnN0IHBvcyA9IG1pY3JvcyA8IDAgPyAtbWljcm9zIDogbWljcm9zO1xuICAgIGNvbnN0IHNlY3MgPSBwb3MgLyAxMDAwMDAwbjtcbiAgICBjb25zdCBtaWNyb3NfcmVtYWluaW5nID0gcG9zICUgMTAwMDAwMG47XG4gICAgcmV0dXJuIGAke3NpZ259JHtzZWNzfS4ke1N0cmluZyhtaWNyb3NfcmVtYWluaW5nKS5wYWRTdGFydCg2LCBcIjBcIil9YDtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi90aW1lc3RhbXAudHNcbnZhciBUaW1lc3RhbXAgPSBjbGFzcyBfVGltZXN0YW1wIHtcbiAgX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfXztcbiAgc3RhdGljIE1JQ1JPU19QRVJfTUlMTElTID0gMTAwMG47XG4gIGdldCBtaWNyb3NTaW5jZVVuaXhFcG9jaCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fO1xuICB9XG4gIGNvbnN0cnVjdG9yKG1pY3Jvcykge1xuICAgIHRoaXMuX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfXyA9IG1pY3JvcztcbiAgfVxuICAvKipcbiAgICogR2V0IHRoZSBhbGdlYnJhaWMgdHlwZSByZXByZXNlbnRhdGlvbiBvZiB0aGUge0BsaW5rIFRpbWVzdGFtcH0gdHlwZS5cbiAgICogQHJldHVybnMgVGhlIGFsZ2VicmFpYyB0eXBlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0eXBlLlxuICAgKi9cbiAgc3RhdGljIGdldEFsZ2VicmFpY1R5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7XG4gICAgICBlbGVtZW50czogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJfX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fXCIsXG4gICAgICAgICAgYWxnZWJyYWljVHlwZTogQWxnZWJyYWljVHlwZS5JNjRcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9XG4gIHN0YXRpYyBpc1RpbWVzdGFtcChhbGdlYnJhaWNUeXBlKSB7XG4gICAgaWYgKGFsZ2VicmFpY1R5cGUudGFnICE9PSBcIlByb2R1Y3RcIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBlbGVtZW50cyA9IGFsZ2VicmFpY1R5cGUudmFsdWUuZWxlbWVudHM7XG4gICAgaWYgKGVsZW1lbnRzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBtaWNyb3NFbGVtZW50ID0gZWxlbWVudHNbMF07XG4gICAgcmV0dXJuIG1pY3Jvc0VsZW1lbnQubmFtZSA9PT0gXCJfX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fXCIgJiYgbWljcm9zRWxlbWVudC5hbGdlYnJhaWNUeXBlLnRhZyA9PT0gXCJJNjRcIjtcbiAgfVxuICAvKipcbiAgICogVGhlIFVuaXggZXBvY2gsIHRoZSBtaWRuaWdodCBhdCB0aGUgYmVnaW5uaW5nIG9mIEphbnVhcnkgMSwgMTk3MCwgVVRDLlxuICAgKi9cbiAgc3RhdGljIFVOSVhfRVBPQ0ggPSBuZXcgX1RpbWVzdGFtcCgwbik7XG4gIC8qKlxuICAgKiBHZXQgYSBgVGltZXN0YW1wYCByZXByZXNlbnRpbmcgdGhlIGV4ZWN1dGlvbiBlbnZpcm9ubWVudCdzIGJlbGllZiBvZiB0aGUgY3VycmVudCBtb21lbnQgaW4gdGltZS5cbiAgICovXG4gIHN0YXRpYyBub3coKSB7XG4gICAgcmV0dXJuIF9UaW1lc3RhbXAuZnJvbURhdGUoLyogQF9fUFVSRV9fICovIG5ldyBEYXRlKCkpO1xuICB9XG4gIC8qKiBDb252ZXJ0IHRvIG1pbGxpc2Vjb25kcyBzaW5jZSBVbml4IGVwb2NoLiAqL1xuICB0b01pbGxpcygpIHtcbiAgICByZXR1cm4gdGhpcy5taWNyb3NTaW5jZVVuaXhFcG9jaCAvIDEwMDBuO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgYSBgVGltZXN0YW1wYCByZXByZXNlbnRpbmcgdGhlIHNhbWUgcG9pbnQgaW4gdGltZSBhcyBgZGF0ZWAuXG4gICAqL1xuICBzdGF0aWMgZnJvbURhdGUoZGF0ZSkge1xuICAgIGNvbnN0IG1pbGxpcyA9IGRhdGUuZ2V0VGltZSgpO1xuICAgIGNvbnN0IG1pY3JvcyA9IEJpZ0ludChtaWxsaXMpICogX1RpbWVzdGFtcC5NSUNST1NfUEVSX01JTExJUztcbiAgICByZXR1cm4gbmV3IF9UaW1lc3RhbXAobWljcm9zKTtcbiAgfVxuICAvKipcbiAgICogR2V0IGEgYERhdGVgIHJlcHJlc2VudGluZyBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIHBvaW50IGluIHRpbWUgYXMgYHRoaXNgLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCB0cnVuY2F0ZXMgdG8gbWlsbGlzZWNvbmQgcHJlY2lzaW9uLFxuICAgKiBhbmQgdGhyb3dzIGBSYW5nZUVycm9yYCBpZiB0aGUgYFRpbWVzdGFtcGAgaXMgb3V0c2lkZSB0aGUgcmFuZ2UgcmVwcmVzZW50YWJsZSBhcyBhIGBEYXRlYC5cbiAgICovXG4gIHRvRGF0ZSgpIHtcbiAgICBjb25zdCBtaWNyb3MgPSB0aGlzLl9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX187XG4gICAgY29uc3QgbWlsbGlzID0gbWljcm9zIC8gX1RpbWVzdGFtcC5NSUNST1NfUEVSX01JTExJUztcbiAgICBpZiAobWlsbGlzID4gQmlnSW50KE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSB8fCBtaWxsaXMgPCBCaWdJbnQoTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcbiAgICAgICAgXCJUaW1lc3RhbXAgaXMgb3V0c2lkZSBvZiB0aGUgcmVwcmVzZW50YWJsZSByYW5nZSBvZiBKUydzIERhdGVcIlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEYXRlKE51bWJlcihtaWxsaXMpKTtcbiAgfVxuICAvKipcbiAgICogR2V0IGFuIElTTyA4NjAxIC8gUkZDIDMzMzkgZm9ybWF0dGVkIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIHRpbWVzdGFtcCB3aXRoIG1pY3Jvc2Vjb25kIHByZWNpc2lvbi5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgcHJlc2VydmVzIHRoZSBmdWxsIG1pY3Jvc2Vjb25kIHByZWNpc2lvbiBvZiB0aGUgdGltZXN0YW1wLFxuICAgKiBhbmQgdGhyb3dzIGBSYW5nZUVycm9yYCBpZiB0aGUgYFRpbWVzdGFtcGAgaXMgb3V0c2lkZSB0aGUgcmFuZ2UgcmVwcmVzZW50YWJsZSBpbiBJU08gZm9ybWF0LlxuICAgKlxuICAgKiBAcmV0dXJucyBJU08gODYwMSBmb3JtYXR0ZWQgc3RyaW5nIHdpdGggbWljcm9zZWNvbmQgcHJlY2lzaW9uIChlLmcuLCAnMjAyNS0wMi0xN1QxMDozMDo0NS4xMjM0NTZaJylcbiAgICovXG4gIHRvSVNPU3RyaW5nKCkge1xuICAgIGNvbnN0IG1pY3JvcyA9IHRoaXMuX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfXztcbiAgICBjb25zdCBtaWxsaXMgPSBtaWNyb3MgLyBfVGltZXN0YW1wLk1JQ1JPU19QRVJfTUlMTElTO1xuICAgIGlmIChtaWxsaXMgPiBCaWdJbnQoTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpIHx8IG1pbGxpcyA8IEJpZ0ludChOdW1iZXIuTUlOX1NBRkVfSU5URUdFUikpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFxuICAgICAgICBcIlRpbWVzdGFtcCBpcyBvdXRzaWRlIG9mIHRoZSByZXByZXNlbnRhYmxlIHJhbmdlIGZvciBJU08gc3RyaW5nIGZvcm1hdHRpbmdcIlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKE51bWJlcihtaWxsaXMpKTtcbiAgICBjb25zdCBpc29CYXNlID0gZGF0ZS50b0lTT1N0cmluZygpO1xuICAgIGNvbnN0IG1pY3Jvc1JlbWFpbmRlciA9IE1hdGguYWJzKE51bWJlcihtaWNyb3MgJSAxMDAwMDAwbikpO1xuICAgIGNvbnN0IGZyYWN0aW9uYWxQYXJ0ID0gU3RyaW5nKG1pY3Jvc1JlbWFpbmRlcikucGFkU3RhcnQoNiwgXCIwXCIpO1xuICAgIHJldHVybiBpc29CYXNlLnJlcGxhY2UoL1xcLlxcZHszfVokLywgYC4ke2ZyYWN0aW9uYWxQYXJ0fVpgKTtcbiAgfVxuICBzaW5jZShvdGhlcikge1xuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uKFxuICAgICAgdGhpcy5fX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fIC0gb3RoZXIuX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfX1xuICAgICk7XG4gIH1cbn07XG5cbi8vIHNyYy9saWIvdXVpZC50c1xudmFyIFV1aWQgPSBjbGFzcyBfVXVpZCB7XG4gIF9fdXVpZF9fO1xuICAvKipcbiAgICogVGhlIG5pbCBVVUlEIChhbGwgemVyb3MpLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0c1xuICAgKiBjb25zdCB1dWlkID0gVXVpZC5OSUw7XG4gICAqIGNvbnNvbGUuYXNzZXJ0KFxuICAgKiAgIHV1aWQudG9TdHJpbmcoKSA9PT0gXCIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDBcIlxuICAgKiApO1xuICAgKiBgYGBcbiAgICovXG4gIHN0YXRpYyBOSUwgPSBuZXcgX1V1aWQoMG4pO1xuICBzdGF0aWMgTUFYX1VVSURfQklHSU5UID0gMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZm47XG4gIC8qKlxuICAgKiBUaGUgbWF4IFVVSUQgKGFsbCBvbmVzKS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHNcbiAgICogY29uc3QgdXVpZCA9IFV1aWQuTUFYO1xuICAgKiBjb25zb2xlLmFzc2VydChcbiAgICogICB1dWlkLnRvU3RyaW5nKCkgPT09IFwiZmZmZmZmZmYtZmZmZi1mZmZmLWZmZmYtZmZmZmZmZmZmZmZmXCJcbiAgICogKTtcbiAgICogYGBgXG4gICAqL1xuICBzdGF0aWMgTUFYID0gbmV3IF9VdWlkKF9VdWlkLk1BWF9VVUlEX0JJR0lOVCk7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBVVUlEIGZyb20gYSByYXcgMTI4LWJpdCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHUgLSBVbnNpZ25lZCAxMjgtYml0IGludGVnZXJcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSB2YWx1ZSBpcyBvdXRzaWRlIHRoZSB2YWxpZCBVVUlEIHJhbmdlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih1KSB7XG4gICAgaWYgKHUgPCAwbiB8fCB1ID4gX1V1aWQuTUFYX1VVSURfQklHSU5UKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIFVVSUQ6IG11c3QgYmUgYmV0d2VlbiAwIGFuZCBgTUFYX1VVSURfQklHSU5UYFwiKTtcbiAgICB9XG4gICAgdGhpcy5fX3V1aWRfXyA9IHU7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZSBhIFVVSUQgYHY0YCBmcm9tIGV4cGxpY2l0IHJhbmRvbSBieXRlcy5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgYXNzdW1lcyB0aGUgYnl0ZXMgYXJlIGFscmVhZHkgc3VmZmljaWVudGx5IHJhbmRvbS5cbiAgICogSXQgb25seSBzZXRzIHRoZSBhcHByb3ByaWF0ZSBiaXRzIGZvciB0aGUgVVVJRCB2ZXJzaW9uIGFuZCB2YXJpYW50LlxuICAgKlxuICAgKiBAcGFyYW0gYnl0ZXMgLSBFeGFjdGx5IDE2IHJhbmRvbSBieXRlc1xuICAgKiBAcmV0dXJucyBBIFVVSUQgYHY0YFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgYGJ5dGVzLmxlbmd0aCAhPT0gMTZgXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHRzXG4gICAqIGNvbnN0IHJhbmRvbUJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuICAgKiBjb25zdCB1dWlkID0gVXVpZC5mcm9tUmFuZG9tQnl0ZXNWNChyYW5kb21CeXRlcyk7XG4gICAqXG4gICAqIGNvbnNvbGUuYXNzZXJ0KFxuICAgKiAgIHV1aWQudG9TdHJpbmcoKSA9PT0gXCIwMDAwMDAwMC0wMDAwLTQwMDAtODAwMC0wMDAwMDAwMDAwMDBcIlxuICAgKiApO1xuICAgKiBgYGBcbiAgICovXG4gIHN0YXRpYyBmcm9tUmFuZG9tQnl0ZXNWNChieXRlcykge1xuICAgIGlmIChieXRlcy5sZW5ndGggIT09IDE2KSB0aHJvdyBuZXcgRXJyb3IoXCJVVUlEIHY0IHJlcXVpcmVzIDE2IGJ5dGVzXCIpO1xuICAgIGNvbnN0IGFyciA9IG5ldyBVaW50OEFycmF5KGJ5dGVzKTtcbiAgICBhcnJbNl0gPSBhcnJbNl0gJiAxNSB8IDY0O1xuICAgIGFycls4XSA9IGFycls4XSAmIDYzIHwgMTI4O1xuICAgIHJldHVybiBuZXcgX1V1aWQoX1V1aWQuYnl0ZXNUb0JpZ0ludChhcnIpKTtcbiAgfVxuICAvKipcbiAgICogR2VuZXJhdGUgYSBVVUlEIGB2N2AgdXNpbmcgYSBtb25vdG9uaWMgY291bnRlciBmcm9tIGAwYCB0byBgMl4zMSAtIDFgLFxuICAgKiBhIHRpbWVzdGFtcCwgYW5kIDQgcmFuZG9tIGJ5dGVzLlxuICAgKlxuICAgKiBUaGUgY291bnRlciB3cmFwcyBhcm91bmQgb24gb3ZlcmZsb3cuXG4gICAqXG4gICAqIFRoZSBVVUlEIGB2N2AgaXMgc3RydWN0dXJlZCBhcyBmb2xsb3dzOlxuICAgKlxuICAgKiBgYGBhc2NpaVxuICAgKiDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcbiAgICogfCBCMCAgfCBCMSAgfCBCMiAgfCBCMyAgfCBCNCAgfCBCNSAgICAgICAgICAgICAgfCAgICAgICAgIEI2ICAgICAgICB8XG4gICAqIOKUnOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUpFxuICAgKiB8ICAgICAgICAgICAgICAgICB1bml4X3RzX21zICAgICAgICAgICAgICAgICAgICB8ICAgICAgdmVyc2lvbiA3ICAgIHxcbiAgICog4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG4gICAqIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuICAgKiB8IEI3ICAgICAgICAgICB8IEI4ICAgICAgfCBCOSAgfCBCMTAgfCBCMTEgIHwgQjEyIHwgQjEzIHwgQjE0IHwgQjE1IHxcbiAgICog4pSc4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSkXG4gICAqIHwgY291bnRlcl9oaWdoIHwgdmFyaWFudCB8ICAgIGNvdW50ZXJfbG93ICAgfCAgICAgICAgcmFuZG9tICAgICAgICAgfFxuICAgKiDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSBjb3VudGVyIC0gTXV0YWJsZSBtb25vdG9uaWMgY291bnRlciAoMzEtYml0KVxuICAgKiBAcGFyYW0gbm93IC0gVGltZXN0YW1wIHNpbmNlIHRoZSBVbml4IGVwb2NoXG4gICAqIEBwYXJhbSByYW5kb21CeXRlcyAtIEV4YWN0bHkgNCByYW5kb20gYnl0ZXNcbiAgICogQHJldHVybnMgQSBVVUlEIGB2N2BcbiAgICpcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBgY291bnRlcmAgaXMgbmVnYXRpdmVcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBgdGltZXN0YW1wYCBpcyBiZWZvcmUgdGhlIFVuaXggZXBvY2hcbiAgICogQHRocm93cyB7RXJyb3J9IElmIGByYW5kb21CeXRlcy5sZW5ndGggIT09IDRgXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHRzXG4gICAqIGNvbnN0IG5vdyA9IFRpbWVzdGFtcC5mcm9tTWlsbGlzKDFfNjg2XzAwMF8wMDBfMDAwbik7XG4gICAqIGNvbnN0IGNvdW50ZXIgPSB7IHZhbHVlOiAxIH07XG4gICAqIGNvbnN0IHJhbmRvbUJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoNCk7XG4gICAqXG4gICAqIGNvbnN0IHV1aWQgPSBVdWlkLmZyb21Db3VudGVyVjcoY291bnRlciwgbm93LCByYW5kb21CeXRlcyk7XG4gICAqXG4gICAqIGNvbnNvbGUuYXNzZXJ0KFxuICAgKiAgIHV1aWQudG9TdHJpbmcoKSA9PT0gXCIwMDAwNjQ3ZS01MTgwLTcwMDAtODAwMC0wMDAyMDAwMDAwMDBcIlxuICAgKiApO1xuICAgKiBgYGBcbiAgICovXG4gIHN0YXRpYyBmcm9tQ291bnRlclY3KGNvdW50ZXIsIG5vdywgcmFuZG9tQnl0ZXMpIHtcbiAgICBpZiAocmFuZG9tQnl0ZXMubGVuZ3RoICE9PSA0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJgZnJvbUNvdW50ZXJWN2AgcmVxdWlyZXMgYHJhbmRvbUJ5dGVzLmxlbmd0aCA9PSA0YFwiKTtcbiAgICB9XG4gICAgaWYgKGNvdW50ZXIudmFsdWUgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJgZnJvbUNvdW50ZXJWN2AgdXVpZCBgY291bnRlcmAgbXVzdCBiZSBub24tbmVnYXRpdmVcIik7XG4gICAgfVxuICAgIGlmIChub3cuX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfXyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImBmcm9tQ291bnRlclY3YCBgdGltZXN0YW1wYCBiZWZvcmUgdW5peCBlcG9jaFwiKTtcbiAgICB9XG4gICAgY29uc3QgY291bnRlclZhbCA9IGNvdW50ZXIudmFsdWU7XG4gICAgY291bnRlci52YWx1ZSA9IGNvdW50ZXJWYWwgKyAxICYgMjE0NzQ4MzY0NztcbiAgICBjb25zdCB0c01zID0gbm93LnRvTWlsbGlzKCkgJiAweGZmZmZmZmZmZmZmZm47XG4gICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheSgxNik7XG4gICAgYnl0ZXNbMF0gPSBOdW1iZXIodHNNcyA+PiA0MG4gJiAweGZmbik7XG4gICAgYnl0ZXNbMV0gPSBOdW1iZXIodHNNcyA+PiAzMm4gJiAweGZmbik7XG4gICAgYnl0ZXNbMl0gPSBOdW1iZXIodHNNcyA+PiAyNG4gJiAweGZmbik7XG4gICAgYnl0ZXNbM10gPSBOdW1iZXIodHNNcyA+PiAxNm4gJiAweGZmbik7XG4gICAgYnl0ZXNbNF0gPSBOdW1iZXIodHNNcyA+PiA4biAmIDB4ZmZuKTtcbiAgICBieXRlc1s1XSA9IE51bWJlcih0c01zICYgMHhmZm4pO1xuICAgIGJ5dGVzWzddID0gY291bnRlclZhbCA+Pj4gMjMgJiAyNTU7XG4gICAgYnl0ZXNbOV0gPSBjb3VudGVyVmFsID4+PiAxNSAmIDI1NTtcbiAgICBieXRlc1sxMF0gPSBjb3VudGVyVmFsID4+PiA3ICYgMjU1O1xuICAgIGJ5dGVzWzExXSA9IChjb3VudGVyVmFsICYgMTI3KSA8PCAxICYgMjU1O1xuICAgIGJ5dGVzWzEyXSB8PSByYW5kb21CeXRlc1swXSAmIDEyNztcbiAgICBieXRlc1sxM10gPSByYW5kb21CeXRlc1sxXTtcbiAgICBieXRlc1sxNF0gPSByYW5kb21CeXRlc1syXTtcbiAgICBieXRlc1sxNV0gPSByYW5kb21CeXRlc1szXTtcbiAgICBieXRlc1s2XSA9IGJ5dGVzWzZdICYgMTUgfCAxMTI7XG4gICAgYnl0ZXNbOF0gPSBieXRlc1s4XSAmIDYzIHwgMTI4O1xuICAgIHJldHVybiBuZXcgX1V1aWQoX1V1aWQuYnl0ZXNUb0JpZ0ludChieXRlcykpO1xuICB9XG4gIC8qKlxuICAgKiBQYXJzZSBhIFVVSUQgZnJvbSBhIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHMgLSBVVUlEIHN0cmluZ1xuICAgKiBAcmV0dXJucyBQYXJzZWQgVVVJRFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHN0cmluZyBpcyBub3QgYSB2YWxpZCBVVUlEXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHRzXG4gICAqIGNvbnN0IHMgPSBcIjAxODg4ZDZlLTVjMDAtNzAwMC04MDAwLTAwMDAwMDAwMDAwMFwiO1xuICAgKiBjb25zdCB1dWlkID0gVXVpZC5wYXJzZShzKTtcbiAgICpcbiAgICogY29uc29sZS5hc3NlcnQodXVpZC50b1N0cmluZygpID09PSBzKTtcbiAgICogYGBgXG4gICAqL1xuICBzdGF0aWMgcGFyc2Uocykge1xuICAgIGNvbnN0IGhleCA9IHMucmVwbGFjZSgvLS9nLCBcIlwiKTtcbiAgICBpZiAoaGV4Lmxlbmd0aCAhPT0gMzIpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaGV4IFVVSURcIik7XG4gICAgbGV0IHYgPSAwbjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpICs9IDIpIHtcbiAgICAgIHYgPSB2IDw8IDhuIHwgQmlnSW50KHBhcnNlSW50KGhleC5zbGljZShpLCBpICsgMiksIDE2KSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgX1V1aWQodik7XG4gIH1cbiAgLyoqIENvbnZlcnQgdG8gc3RyaW5nIChoeXBoZW5hdGVkIGZvcm0pLiAqL1xuICB0b1N0cmluZygpIHtcbiAgICBjb25zdCBieXRlcyA9IF9VdWlkLmJpZ0ludFRvQnl0ZXModGhpcy5fX3V1aWRfXyk7XG4gICAgY29uc3QgaGV4ID0gWy4uLmJ5dGVzXS5tYXAoKGIpID0+IGIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKSkuam9pbihcIlwiKTtcbiAgICByZXR1cm4gaGV4LnNsaWNlKDAsIDgpICsgXCItXCIgKyBoZXguc2xpY2UoOCwgMTIpICsgXCItXCIgKyBoZXguc2xpY2UoMTIsIDE2KSArIFwiLVwiICsgaGV4LnNsaWNlKDE2LCAyMCkgKyBcIi1cIiArIGhleC5zbGljZSgyMCk7XG4gIH1cbiAgLyoqIENvbnZlcnQgdG8gYmlnaW50ICh1MTI4KS4gKi9cbiAgYXNCaWdJbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX191dWlkX187XG4gIH1cbiAgLyoqIFJldHVybiBhIGBVaW50OEFycmF5YCBvZiAxNiBieXRlcy4gKi9cbiAgdG9CeXRlcygpIHtcbiAgICByZXR1cm4gX1V1aWQuYmlnSW50VG9CeXRlcyh0aGlzLl9fdXVpZF9fKTtcbiAgfVxuICBzdGF0aWMgYnl0ZXNUb0JpZ0ludChieXRlcykge1xuICAgIGxldCByZXN1bHQgPSAwbjtcbiAgICBmb3IgKGNvbnN0IGIgb2YgYnl0ZXMpIHJlc3VsdCA9IHJlc3VsdCA8PCA4biB8IEJpZ0ludChiKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHN0YXRpYyBiaWdJbnRUb0J5dGVzKHZhbHVlKSB7XG4gICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheSgxNik7XG4gICAgZm9yIChsZXQgaSA9IDE1OyBpID49IDA7IGktLSkge1xuICAgICAgYnl0ZXNbaV0gPSBOdW1iZXIodmFsdWUgJiAweGZmbik7XG4gICAgICB2YWx1ZSA+Pj0gOG47XG4gICAgfVxuICAgIHJldHVybiBieXRlcztcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmVyc2lvbiBvZiB0aGlzIFVVSUQuXG4gICAqXG4gICAqIFRoaXMgcmVwcmVzZW50cyB0aGUgYWxnb3JpdGhtIHVzZWQgdG8gZ2VuZXJhdGUgdGhlIHZhbHVlLlxuICAgKlxuICAgKiBAcmV0dXJucyBBIGBVdWlkVmVyc2lvbmBcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSB2ZXJzaW9uIGZpZWxkIGlzIG5vdCByZWNvZ25pemVkXG4gICAqL1xuICBnZXRWZXJzaW9uKCkge1xuICAgIGNvbnN0IHZlcnNpb24gPSB0aGlzLnRvQnl0ZXMoKVs2XSA+PiA0ICYgMTU7XG4gICAgc3dpdGNoICh2ZXJzaW9uKSB7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHJldHVybiBcIlY0XCI7XG4gICAgICBjYXNlIDc6XG4gICAgICAgIHJldHVybiBcIlY3XCI7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAodGhpcyA9PSBfVXVpZC5OSUwpIHtcbiAgICAgICAgICByZXR1cm4gXCJOaWxcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcyA9PSBfVXVpZC5NQVgpIHtcbiAgICAgICAgICByZXR1cm4gXCJNYXhcIjtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIFVVSUQgdmVyc2lvbjogJHt2ZXJzaW9ufWApO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogRXh0cmFjdCB0aGUgbW9ub3RvbmljIGNvdW50ZXIgZnJvbSBhIFVVSUR2Ny5cbiAgICpcbiAgICogSW50ZW5kZWQgZm9yIHRlc3RpbmcgYW5kIGRpYWdub3N0aWNzLlxuICAgKiBCZWhhdmlvciBpcyB1bmRlZmluZWQgaWYgY2FsbGVkIG9uIGEgbm9uLVY3IFVVSUQuXG4gICAqXG4gICAqIEByZXR1cm5zIDMxLWJpdCBjb3VudGVyIHZhbHVlXG4gICAqL1xuICBnZXRDb3VudGVyKCkge1xuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy50b0J5dGVzKCk7XG4gICAgY29uc3QgaGlnaCA9IGJ5dGVzWzddO1xuICAgIGNvbnN0IG1pZDEgPSBieXRlc1s5XTtcbiAgICBjb25zdCBtaWQyID0gYnl0ZXNbMTBdO1xuICAgIGNvbnN0IGxvdyA9IGJ5dGVzWzExXSA+Pj4gMTtcbiAgICByZXR1cm4gaGlnaCA8PCAyMyB8IG1pZDEgPDwgMTUgfCBtaWQyIDw8IDcgfCBsb3cgfCAwO1xuICB9XG4gIGNvbXBhcmVUbyhvdGhlcikge1xuICAgIGlmICh0aGlzLl9fdXVpZF9fIDwgb3RoZXIuX191dWlkX18pIHJldHVybiAtMTtcbiAgICBpZiAodGhpcy5fX3V1aWRfXyA+IG90aGVyLl9fdXVpZF9fKSByZXR1cm4gMTtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBzdGF0aWMgZ2V0QWxnZWJyYWljVHlwZSgpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHtcbiAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcIl9fdXVpZF9fXCIsXG4gICAgICAgICAgYWxnZWJyYWljVHlwZTogQWxnZWJyYWljVHlwZS5VMTI4XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi9iaW5hcnlfcmVhZGVyLnRzXG52YXIgQmluYXJ5UmVhZGVyID0gY2xhc3Mge1xuICAvKipcbiAgICogVGhlIERhdGFWaWV3IHVzZWQgdG8gcmVhZCB2YWx1ZXMgZnJvbSB0aGUgYmluYXJ5IGRhdGEuXG4gICAqXG4gICAqIE5vdGU6IFRoZSBEYXRhVmlldydzIGBieXRlT2Zmc2V0YCBpcyByZWxhdGl2ZSB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZVxuICAgKiB1bmRlcmx5aW5nIEFycmF5QnVmZmVyLCBub3QgdGhlIHN0YXJ0IG9mIHRoZSBwcm92aWRlZCBVaW50OEFycmF5IGlucHV0LlxuICAgKiBUaGlzIGBCaW5hcnlSZWFkZXJgJ3MgYCNvZmZzZXRgIGZpZWxkIGlzIHVzZWQgdG8gdHJhY2sgdGhlIGN1cnJlbnQgcmVhZCBwb3NpdGlvblxuICAgKiByZWxhdGl2ZSB0byB0aGUgc3RhcnQgb2YgdGhlIHByb3ZpZGVkIFVpbnQ4QXJyYXkgaW5wdXQuXG4gICAqL1xuICB2aWV3O1xuICAvKipcbiAgICogUmVwcmVzZW50cyB0aGUgb2Zmc2V0IChpbiBieXRlcykgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0IG9mIHRoZSBEYXRhVmlld1xuICAgKiBhbmQgcHJvdmlkZWQgVWludDhBcnJheSBpbnB1dC5cbiAgICpcbiAgICogTm90ZTogVGhpcyBpcyAqbm90KiB0aGUgYWJzb2x1dGUgYnl0ZSBvZmZzZXQgd2l0aGluIHRoZSB1bmRlcmx5aW5nIEFycmF5QnVmZmVyLlxuICAgKi9cbiAgb2Zmc2V0ID0gMDtcbiAgY29uc3RydWN0b3IoaW5wdXQpIHtcbiAgICB0aGlzLnZpZXcgPSBpbnB1dCBpbnN0YW5jZW9mIERhdGFWaWV3ID8gaW5wdXQgOiBuZXcgRGF0YVZpZXcoaW5wdXQuYnVmZmVyLCBpbnB1dC5ieXRlT2Zmc2V0LCBpbnB1dC5ieXRlTGVuZ3RoKTtcbiAgICB0aGlzLm9mZnNldCA9IDA7XG4gIH1cbiAgcmVzZXQodmlldykge1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICB9XG4gIGdldCByZW1haW5pbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5ieXRlTGVuZ3RoIC0gdGhpcy5vZmZzZXQ7XG4gIH1cbiAgLyoqIEVuc3VyZSB3ZSBoYXZlIGF0IGxlYXN0IGBuYCBieXRlcyBsZWZ0IHRvIHJlYWQgKi9cbiAgI2Vuc3VyZShuKSB7XG4gICAgaWYgKHRoaXMub2Zmc2V0ICsgbiA+IHRoaXMudmlldy5ieXRlTGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcbiAgICAgICAgYFRyaWVkIHRvIHJlYWQgJHtufSBieXRlKHMpIGF0IHJlbGF0aXZlIG9mZnNldCAke3RoaXMub2Zmc2V0fSwgYnV0IG9ubHkgJHt0aGlzLnJlbWFpbmluZ30gYnl0ZShzKSByZW1haW5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuICByZWFkVUludDhBcnJheSgpIHtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLnJlYWRVMzIoKTtcbiAgICB0aGlzLiNlbnN1cmUobGVuZ3RoKTtcbiAgICByZXR1cm4gdGhpcy5yZWFkQnl0ZXMobGVuZ3RoKTtcbiAgfVxuICByZWFkQm9vbCgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmlldy5nZXRVaW50OCh0aGlzLm9mZnNldCk7XG4gICAgdGhpcy5vZmZzZXQgKz0gMTtcbiAgICByZXR1cm4gdmFsdWUgIT09IDA7XG4gIH1cbiAgcmVhZEJ5dGUoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0VWludDgodGhpcy5vZmZzZXQpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDE7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJlYWRCeXRlcyhsZW5ndGgpIHtcbiAgICBjb25zdCBhcnJheSA9IG5ldyBVaW50OEFycmF5KFxuICAgICAgdGhpcy52aWV3LmJ1ZmZlcixcbiAgICAgIHRoaXMudmlldy5ieXRlT2Zmc2V0ICsgdGhpcy5vZmZzZXQsXG4gICAgICBsZW5ndGhcbiAgICApO1xuICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aDtcbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cbiAgcmVhZEk4KCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy52aWV3LmdldEludDgodGhpcy5vZmZzZXQpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDE7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJlYWRVOCgpIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkQnl0ZSgpO1xuICB9XG4gIHJlYWRJMTYoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0SW50MTYodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDI7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJlYWRVMTYoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0VWludDE2KHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAyO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZWFkSTMyKCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy52aWV3LmdldEludDMyKHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA0O1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZWFkVTMyKCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy52aWV3LmdldFVpbnQzMih0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gNDtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmVhZEk2NCgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmlldy5nZXRCaWdJbnQ2NCh0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gODtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmVhZFU2NCgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmlldy5nZXRCaWdVaW50NjQodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDg7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJlYWRVMTI4KCkge1xuICAgIGNvbnN0IGxvd2VyUGFydCA9IHRoaXMudmlldy5nZXRCaWdVaW50NjQodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIGNvbnN0IHVwcGVyUGFydCA9IHRoaXMudmlldy5nZXRCaWdVaW50NjQodGhpcy5vZmZzZXQgKyA4LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAxNjtcbiAgICByZXR1cm4gKHVwcGVyUGFydCA8PCBCaWdJbnQoNjQpKSArIGxvd2VyUGFydDtcbiAgfVxuICByZWFkSTEyOCgpIHtcbiAgICBjb25zdCBsb3dlclBhcnQgPSB0aGlzLnZpZXcuZ2V0QmlnVWludDY0KHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICBjb25zdCB1cHBlclBhcnQgPSB0aGlzLnZpZXcuZ2V0QmlnSW50NjQodGhpcy5vZmZzZXQgKyA4LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAxNjtcbiAgICByZXR1cm4gKHVwcGVyUGFydCA8PCBCaWdJbnQoNjQpKSArIGxvd2VyUGFydDtcbiAgfVxuICByZWFkVTI1NigpIHtcbiAgICBjb25zdCBwMCA9IHRoaXMudmlldy5nZXRCaWdVaW50NjQodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIGNvbnN0IHAxID0gdGhpcy52aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDgsIHRydWUpO1xuICAgIGNvbnN0IHAyID0gdGhpcy52aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCArIDE2LCB0cnVlKTtcbiAgICBjb25zdCBwMyA9IHRoaXMudmlldy5nZXRCaWdVaW50NjQodGhpcy5vZmZzZXQgKyAyNCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gMzI7XG4gICAgcmV0dXJuIChwMyA8PCBCaWdJbnQoMyAqIDY0KSkgKyAocDIgPDwgQmlnSW50KDIgKiA2NCkpICsgKHAxIDw8IEJpZ0ludCgxICogNjQpKSArIHAwO1xuICB9XG4gIHJlYWRJMjU2KCkge1xuICAgIGNvbnN0IHAwID0gdGhpcy52aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgY29uc3QgcDEgPSB0aGlzLnZpZXcuZ2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgOCwgdHJ1ZSk7XG4gICAgY29uc3QgcDIgPSB0aGlzLnZpZXcuZ2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgMTYsIHRydWUpO1xuICAgIGNvbnN0IHAzID0gdGhpcy52aWV3LmdldEJpZ0ludDY0KHRoaXMub2Zmc2V0ICsgMjQsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDMyO1xuICAgIHJldHVybiAocDMgPDwgQmlnSW50KDMgKiA2NCkpICsgKHAyIDw8IEJpZ0ludCgyICogNjQpKSArIChwMSA8PCBCaWdJbnQoMSAqIDY0KSkgKyBwMDtcbiAgfVxuICByZWFkRjMyKCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy52aWV3LmdldEZsb2F0MzIodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDQ7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJlYWRGNjQoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0RmxvYXQ2NCh0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gODtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmVhZFN0cmluZygpIHtcbiAgICBjb25zdCB1aW50OEFycmF5ID0gdGhpcy5yZWFkVUludDhBcnJheSgpO1xuICAgIHJldHVybiBuZXcgVGV4dERlY29kZXIoXCJ1dGYtOFwiKS5kZWNvZGUodWludDhBcnJheSk7XG4gIH1cbn07XG5cbi8vIHNyYy9saWIvYmluYXJ5X3dyaXRlci50c1xudmFyIGltcG9ydF9iYXNlNjRfanMgPSBfX3RvRVNNKHJlcXVpcmVfYmFzZTY0X2pzKCkpO1xudmFyIEFycmF5QnVmZmVyUHJvdG90eXBlVHJhbnNmZXIgPSBBcnJheUJ1ZmZlci5wcm90b3R5cGUudHJhbnNmZXIgPz8gZnVuY3Rpb24obmV3Qnl0ZUxlbmd0aCkge1xuICBpZiAobmV3Qnl0ZUxlbmd0aCA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIHRoaXMuc2xpY2UoKTtcbiAgfSBlbHNlIGlmIChuZXdCeXRlTGVuZ3RoIDw9IHRoaXMuYnl0ZUxlbmd0aCkge1xuICAgIHJldHVybiB0aGlzLnNsaWNlKDAsIG5ld0J5dGVMZW5ndGgpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGNvcHkgPSBuZXcgVWludDhBcnJheShuZXdCeXRlTGVuZ3RoKTtcbiAgICBjb3B5LnNldChuZXcgVWludDhBcnJheSh0aGlzKSk7XG4gICAgcmV0dXJuIGNvcHkuYnVmZmVyO1xuICB9XG59O1xudmFyIFJlc2l6YWJsZUJ1ZmZlciA9IGNsYXNzIHtcbiAgYnVmZmVyO1xuICB2aWV3O1xuICBjb25zdHJ1Y3Rvcihpbml0KSB7XG4gICAgdGhpcy5idWZmZXIgPSB0eXBlb2YgaW5pdCA9PT0gXCJudW1iZXJcIiA/IG5ldyBBcnJheUJ1ZmZlcihpbml0KSA6IGluaXQ7XG4gICAgdGhpcy52aWV3ID0gbmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyKTtcbiAgfVxuICBnZXQgY2FwYWNpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XG4gIH1cbiAgZ3JvdyhuZXdTaXplKSB7XG4gICAgaWYgKG5ld1NpemUgPD0gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCkgcmV0dXJuO1xuICAgIHRoaXMuYnVmZmVyID0gQXJyYXlCdWZmZXJQcm90b3R5cGVUcmFuc2Zlci5jYWxsKHRoaXMuYnVmZmVyLCBuZXdTaXplKTtcbiAgICB0aGlzLnZpZXcgPSBuZXcgRGF0YVZpZXcodGhpcy5idWZmZXIpO1xuICB9XG59O1xudmFyIEJpbmFyeVdyaXRlciA9IGNsYXNzIHtcbiAgYnVmZmVyO1xuICBvZmZzZXQgPSAwO1xuICBjb25zdHJ1Y3Rvcihpbml0KSB7XG4gICAgdGhpcy5idWZmZXIgPSB0eXBlb2YgaW5pdCA9PT0gXCJudW1iZXJcIiA/IG5ldyBSZXNpemFibGVCdWZmZXIoaW5pdCkgOiBpbml0O1xuICB9XG4gIGNsZWFyKCkge1xuICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgfVxuICByZXNldChidWZmZXIpIHtcbiAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICB0aGlzLm9mZnNldCA9IDA7XG4gIH1cbiAgZXhwYW5kQnVmZmVyKGFkZGl0aW9uYWxDYXBhY2l0eSkge1xuICAgIGNvbnN0IG1pbkNhcGFjaXR5ID0gdGhpcy5vZmZzZXQgKyBhZGRpdGlvbmFsQ2FwYWNpdHkgKyAxO1xuICAgIGlmIChtaW5DYXBhY2l0eSA8PSB0aGlzLmJ1ZmZlci5jYXBhY2l0eSkgcmV0dXJuO1xuICAgIGxldCBuZXdDYXBhY2l0eSA9IHRoaXMuYnVmZmVyLmNhcGFjaXR5ICogMjtcbiAgICBpZiAobmV3Q2FwYWNpdHkgPCBtaW5DYXBhY2l0eSkgbmV3Q2FwYWNpdHkgPSBtaW5DYXBhY2l0eTtcbiAgICB0aGlzLmJ1ZmZlci5ncm93KG5ld0NhcGFjaXR5KTtcbiAgfVxuICB0b0Jhc2U2NCgpIHtcbiAgICByZXR1cm4gKDAsIGltcG9ydF9iYXNlNjRfanMuZnJvbUJ5dGVBcnJheSkodGhpcy5nZXRCdWZmZXIoKSk7XG4gIH1cbiAgZ2V0QnVmZmVyKCkge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlci5idWZmZXIsIDAsIHRoaXMub2Zmc2V0KTtcbiAgfVxuICBnZXQgdmlldygpIHtcbiAgICByZXR1cm4gdGhpcy5idWZmZXIudmlldztcbiAgfVxuICB3cml0ZVVJbnQ4QXJyYXkodmFsdWUpIHtcbiAgICBjb25zdCBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgdGhpcy5leHBhbmRCdWZmZXIoNCArIGxlbmd0aCk7XG4gICAgdGhpcy53cml0ZVUzMihsZW5ndGgpO1xuICAgIG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyLmJ1ZmZlciwgdGhpcy5vZmZzZXQpLnNldCh2YWx1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gbGVuZ3RoO1xuICB9XG4gIHdyaXRlQm9vbCh2YWx1ZSkge1xuICAgIHRoaXMuZXhwYW5kQnVmZmVyKDEpO1xuICAgIHRoaXMudmlldy5zZXRVaW50OCh0aGlzLm9mZnNldCwgdmFsdWUgPyAxIDogMCk7XG4gICAgdGhpcy5vZmZzZXQgKz0gMTtcbiAgfVxuICB3cml0ZUJ5dGUodmFsdWUpIHtcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcigxKTtcbiAgICB0aGlzLnZpZXcuc2V0VWludDgodGhpcy5vZmZzZXQsIHZhbHVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAxO1xuICB9XG4gIHdyaXRlSTgodmFsdWUpIHtcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcigxKTtcbiAgICB0aGlzLnZpZXcuc2V0SW50OCh0aGlzLm9mZnNldCwgdmFsdWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDE7XG4gIH1cbiAgd3JpdGVVOCh2YWx1ZSkge1xuICAgIHRoaXMuZXhwYW5kQnVmZmVyKDEpO1xuICAgIHRoaXMudmlldy5zZXRVaW50OCh0aGlzLm9mZnNldCwgdmFsdWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDE7XG4gIH1cbiAgd3JpdGVJMTYodmFsdWUpIHtcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcigyKTtcbiAgICB0aGlzLnZpZXcuc2V0SW50MTYodGhpcy5vZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAyO1xuICB9XG4gIHdyaXRlVTE2KHZhbHVlKSB7XG4gICAgdGhpcy5leHBhbmRCdWZmZXIoMik7XG4gICAgdGhpcy52aWV3LnNldFVpbnQxNih0aGlzLm9mZnNldCwgdmFsdWUsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDI7XG4gIH1cbiAgd3JpdGVJMzIodmFsdWUpIHtcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcig0KTtcbiAgICB0aGlzLnZpZXcuc2V0SW50MzIodGhpcy5vZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA0O1xuICB9XG4gIHdyaXRlVTMyKHZhbHVlKSB7XG4gICAgdGhpcy5leHBhbmRCdWZmZXIoNCk7XG4gICAgdGhpcy52aWV3LnNldFVpbnQzMih0aGlzLm9mZnNldCwgdmFsdWUsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDQ7XG4gIH1cbiAgd3JpdGVJNjQodmFsdWUpIHtcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcig4KTtcbiAgICB0aGlzLnZpZXcuc2V0QmlnSW50NjQodGhpcy5vZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA4O1xuICB9XG4gIHdyaXRlVTY0KHZhbHVlKSB7XG4gICAgdGhpcy5leHBhbmRCdWZmZXIoOCk7XG4gICAgdGhpcy52aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCwgdmFsdWUsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDg7XG4gIH1cbiAgd3JpdGVVMTI4KHZhbHVlKSB7XG4gICAgdGhpcy5leHBhbmRCdWZmZXIoMTYpO1xuICAgIGNvbnN0IGxvd2VyUGFydCA9IHZhbHVlICYgQmlnSW50KFwiMHhGRkZGRkZGRkZGRkZGRkZGXCIpO1xuICAgIGNvbnN0IHVwcGVyUGFydCA9IHZhbHVlID4+IEJpZ0ludCg2NCk7XG4gICAgdGhpcy52aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLm9mZnNldCwgbG93ZXJQYXJ0LCB0cnVlKTtcbiAgICB0aGlzLnZpZXcuc2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgOCwgdXBwZXJQYXJ0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAxNjtcbiAgfVxuICB3cml0ZUkxMjgodmFsdWUpIHtcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcigxNik7XG4gICAgY29uc3QgbG93ZXJQYXJ0ID0gdmFsdWUgJiBCaWdJbnQoXCIweEZGRkZGRkZGRkZGRkZGRkZcIik7XG4gICAgY29uc3QgdXBwZXJQYXJ0ID0gdmFsdWUgPj4gQmlnSW50KDY0KTtcbiAgICB0aGlzLnZpZXcuc2V0QmlnSW50NjQodGhpcy5vZmZzZXQsIGxvd2VyUGFydCwgdHJ1ZSk7XG4gICAgdGhpcy52aWV3LnNldEJpZ0ludDY0KHRoaXMub2Zmc2V0ICsgOCwgdXBwZXJQYXJ0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAxNjtcbiAgfVxuICB3cml0ZVUyNTYodmFsdWUpIHtcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcigzMik7XG4gICAgY29uc3QgbG93XzY0X21hc2sgPSBCaWdJbnQoXCIweEZGRkZGRkZGRkZGRkZGRkZcIik7XG4gICAgY29uc3QgcDAgPSB2YWx1ZSAmIGxvd182NF9tYXNrO1xuICAgIGNvbnN0IHAxID0gdmFsdWUgPj4gQmlnSW50KDY0ICogMSkgJiBsb3dfNjRfbWFzaztcbiAgICBjb25zdCBwMiA9IHZhbHVlID4+IEJpZ0ludCg2NCAqIDIpICYgbG93XzY0X21hc2s7XG4gICAgY29uc3QgcDMgPSB2YWx1ZSA+PiBCaWdJbnQoNjQgKiAzKTtcbiAgICB0aGlzLnZpZXcuc2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgOCAqIDAsIHAwLCB0cnVlKTtcbiAgICB0aGlzLnZpZXcuc2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgOCAqIDEsIHAxLCB0cnVlKTtcbiAgICB0aGlzLnZpZXcuc2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgOCAqIDIsIHAyLCB0cnVlKTtcbiAgICB0aGlzLnZpZXcuc2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgOCAqIDMsIHAzLCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAzMjtcbiAgfVxuICB3cml0ZUkyNTYodmFsdWUpIHtcbiAgICB0aGlzLmV4cGFuZEJ1ZmZlcigzMik7XG4gICAgY29uc3QgbG93XzY0X21hc2sgPSBCaWdJbnQoXCIweEZGRkZGRkZGRkZGRkZGRkZcIik7XG4gICAgY29uc3QgcDAgPSB2YWx1ZSAmIGxvd182NF9tYXNrO1xuICAgIGNvbnN0IHAxID0gdmFsdWUgPj4gQmlnSW50KDY0ICogMSkgJiBsb3dfNjRfbWFzaztcbiAgICBjb25zdCBwMiA9IHZhbHVlID4+IEJpZ0ludCg2NCAqIDIpICYgbG93XzY0X21hc2s7XG4gICAgY29uc3QgcDMgPSB2YWx1ZSA+PiBCaWdJbnQoNjQgKiAzKTtcbiAgICB0aGlzLnZpZXcuc2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgOCAqIDAsIHAwLCB0cnVlKTtcbiAgICB0aGlzLnZpZXcuc2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgOCAqIDEsIHAxLCB0cnVlKTtcbiAgICB0aGlzLnZpZXcuc2V0QmlnVWludDY0KHRoaXMub2Zmc2V0ICsgOCAqIDIsIHAyLCB0cnVlKTtcbiAgICB0aGlzLnZpZXcuc2V0QmlnSW50NjQodGhpcy5vZmZzZXQgKyA4ICogMywgcDMsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDMyO1xuICB9XG4gIHdyaXRlRjMyKHZhbHVlKSB7XG4gICAgdGhpcy5leHBhbmRCdWZmZXIoNCk7XG4gICAgdGhpcy52aWV3LnNldEZsb2F0MzIodGhpcy5vZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA0O1xuICB9XG4gIHdyaXRlRjY0KHZhbHVlKSB7XG4gICAgdGhpcy5leHBhbmRCdWZmZXIoOCk7XG4gICAgdGhpcy52aWV3LnNldEZsb2F0NjQodGhpcy5vZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA4O1xuICB9XG4gIHdyaXRlU3RyaW5nKHZhbHVlKSB7XG4gICAgY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xuICAgIGNvbnN0IGVuY29kZWRTdHJpbmcgPSBlbmNvZGVyLmVuY29kZSh2YWx1ZSk7XG4gICAgdGhpcy53cml0ZVVJbnQ4QXJyYXkoZW5jb2RlZFN0cmluZyk7XG4gIH1cbn07XG5cbi8vIHNyYy9saWIvdXRpbC50c1xuZnVuY3Rpb24gdWludDhBcnJheVRvSGV4U3RyaW5nKGFycmF5KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoYXJyYXkucmV2ZXJzZSgpLCAoeCkgPT4gKFwiMDBcIiArIHgudG9TdHJpbmcoMTYpKS5zbGljZSgtMikpLmpvaW4oXCJcIik7XG59XG5mdW5jdGlvbiB1aW50OEFycmF5VG9VMTI4KGFycmF5KSB7XG4gIGlmIChhcnJheS5sZW5ndGggIT0gMTYpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVpbnQ4QXJyYXkgaXMgbm90IDE2IGJ5dGVzIGxvbmc6ICR7YXJyYXl9YCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBCaW5hcnlSZWFkZXIoYXJyYXkpLnJlYWRVMTI4KCk7XG59XG5mdW5jdGlvbiB1aW50OEFycmF5VG9VMjU2KGFycmF5KSB7XG4gIGlmIChhcnJheS5sZW5ndGggIT0gMzIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVpbnQ4QXJyYXkgaXMgbm90IDMyIGJ5dGVzIGxvbmc6IFske2FycmF5fV1gKTtcbiAgfVxuICByZXR1cm4gbmV3IEJpbmFyeVJlYWRlcihhcnJheSkucmVhZFUyNTYoKTtcbn1cbmZ1bmN0aW9uIGhleFN0cmluZ1RvVWludDhBcnJheShzdHIpIHtcbiAgaWYgKHN0ci5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICBzdHIgPSBzdHIuc2xpY2UoMik7XG4gIH1cbiAgY29uc3QgbWF0Y2hlcyA9IHN0ci5tYXRjaCgvLnsxLDJ9L2cpIHx8IFtdO1xuICBjb25zdCBkYXRhID0gVWludDhBcnJheS5mcm9tKFxuICAgIG1hdGNoZXMubWFwKChieXRlKSA9PiBwYXJzZUludChieXRlLCAxNikpXG4gICk7XG4gIHJldHVybiBkYXRhLnJldmVyc2UoKTtcbn1cbmZ1bmN0aW9uIGhleFN0cmluZ1RvVTEyOChzdHIpIHtcbiAgcmV0dXJuIHVpbnQ4QXJyYXlUb1UxMjgoaGV4U3RyaW5nVG9VaW50OEFycmF5KHN0cikpO1xufVxuZnVuY3Rpb24gaGV4U3RyaW5nVG9VMjU2KHN0cikge1xuICByZXR1cm4gdWludDhBcnJheVRvVTI1NihoZXhTdHJpbmdUb1VpbnQ4QXJyYXkoc3RyKSk7XG59XG5mdW5jdGlvbiB1MTI4VG9VaW50OEFycmF5KGRhdGEpIHtcbiAgY29uc3Qgd3JpdGVyID0gbmV3IEJpbmFyeVdyaXRlcigxNik7XG4gIHdyaXRlci53cml0ZVUxMjgoZGF0YSk7XG4gIHJldHVybiB3cml0ZXIuZ2V0QnVmZmVyKCk7XG59XG5mdW5jdGlvbiB1MTI4VG9IZXhTdHJpbmcoZGF0YSkge1xuICByZXR1cm4gdWludDhBcnJheVRvSGV4U3RyaW5nKHUxMjhUb1VpbnQ4QXJyYXkoZGF0YSkpO1xufVxuZnVuY3Rpb24gdTI1NlRvVWludDhBcnJheShkYXRhKSB7XG4gIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoMzIpO1xuICB3cml0ZXIud3JpdGVVMjU2KGRhdGEpO1xuICByZXR1cm4gd3JpdGVyLmdldEJ1ZmZlcigpO1xufVxuZnVuY3Rpb24gdTI1NlRvSGV4U3RyaW5nKGRhdGEpIHtcbiAgcmV0dXJuIHVpbnQ4QXJyYXlUb0hleFN0cmluZyh1MjU2VG9VaW50OEFycmF5KGRhdGEpKTtcbn1cbmZ1bmN0aW9uIHRvUGFzY2FsQ2FzZShzKSB7XG4gIGNvbnN0IHN0ciA9IHRvQ2FtZWxDYXNlKHMpO1xuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xufVxuZnVuY3Rpb24gdG9DYW1lbENhc2Uocykge1xuICBjb25zdCBzdHIgPSBzLnJlcGxhY2UoL1stX10rL2csIFwiX1wiKS5yZXBsYWNlKC9fKFthLXpBLVowLTldKS9nLCAoXywgYykgPT4gYy50b1VwcGVyQ2FzZSgpKTtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cbmZ1bmN0aW9uIGJzYXRuQmFzZVNpemUodHlwZXNwYWNlLCB0eSkge1xuICBjb25zdCBhc3N1bWVkQXJyYXlMZW5ndGggPSA0O1xuICB3aGlsZSAodHkudGFnID09PSBcIlJlZlwiKSB0eSA9IHR5cGVzcGFjZS50eXBlc1t0eS52YWx1ZV07XG4gIGlmICh0eS50YWcgPT09IFwiUHJvZHVjdFwiKSB7XG4gICAgbGV0IHN1bSA9IDA7XG4gICAgZm9yIChjb25zdCB7IGFsZ2VicmFpY1R5cGU6IGVsZW0gfSBvZiB0eS52YWx1ZS5lbGVtZW50cykge1xuICAgICAgc3VtICs9IGJzYXRuQmFzZVNpemUodHlwZXNwYWNlLCBlbGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bTtcbiAgfSBlbHNlIGlmICh0eS50YWcgPT09IFwiU3VtXCIpIHtcbiAgICBsZXQgbWluID0gSW5maW5pdHk7XG4gICAgZm9yIChjb25zdCB7IGFsZ2VicmFpY1R5cGU6IHZhcmkgfSBvZiB0eS52YWx1ZS52YXJpYW50cykge1xuICAgICAgY29uc3QgdlNpemUgPSBic2F0bkJhc2VTaXplKHR5cGVzcGFjZSwgdmFyaSk7XG4gICAgICBpZiAodlNpemUgPCBtaW4pIG1pbiA9IHZTaXplO1xuICAgIH1cbiAgICBpZiAobWluID09PSBJbmZpbml0eSkgbWluID0gMDtcbiAgICByZXR1cm4gNCArIG1pbjtcbiAgfSBlbHNlIGlmICh0eS50YWcgPT0gXCJBcnJheVwiKSB7XG4gICAgcmV0dXJuIDQgKyBhc3N1bWVkQXJyYXlMZW5ndGggKiBic2F0bkJhc2VTaXplKHR5cGVzcGFjZSwgdHkudmFsdWUpO1xuICB9XG4gIHJldHVybiB7XG4gICAgU3RyaW5nOiA0ICsgYXNzdW1lZEFycmF5TGVuZ3RoLFxuICAgIFN1bTogMSxcbiAgICBCb29sOiAxLFxuICAgIEk4OiAxLFxuICAgIFU4OiAxLFxuICAgIEkxNjogMixcbiAgICBVMTY6IDIsXG4gICAgSTMyOiA0LFxuICAgIFUzMjogNCxcbiAgICBGMzI6IDQsXG4gICAgSTY0OiA4LFxuICAgIFU2NDogOCxcbiAgICBGNjQ6IDgsXG4gICAgSTEyODogMTYsXG4gICAgVTEyODogMTYsXG4gICAgSTI1NjogMzIsXG4gICAgVTI1NjogMzJcbiAgfVt0eS50YWddO1xufVxudmFyIGhhc093biA9IE9iamVjdC5oYXNPd247XG5cbi8vIHNyYy9saWIvY29ubmVjdGlvbl9pZC50c1xudmFyIENvbm5lY3Rpb25JZCA9IGNsYXNzIF9Db25uZWN0aW9uSWQge1xuICBfX2Nvbm5lY3Rpb25faWRfXztcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYENvbm5lY3Rpb25JZGAuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5fX2Nvbm5lY3Rpb25faWRfXyA9IGRhdGE7XG4gIH1cbiAgLyoqXG4gICAqIEdldCB0aGUgYWxnZWJyYWljIHR5cGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHtAbGluayBDb25uZWN0aW9uSWR9IHR5cGUuXG4gICAqIEByZXR1cm5zIFRoZSBhbGdlYnJhaWMgdHlwZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHlwZS5cbiAgICovXG4gIHN0YXRpYyBnZXRBbGdlYnJhaWNUeXBlKCkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlLlByb2R1Y3Qoe1xuICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgeyBuYW1lOiBcIl9fY29ubmVjdGlvbl9pZF9fXCIsIGFsZ2VicmFpY1R5cGU6IEFsZ2VicmFpY1R5cGUuVTEyOCB9XG4gICAgICBdXG4gICAgfSk7XG4gIH1cbiAgaXNaZXJvKCkge1xuICAgIHJldHVybiB0aGlzLl9fY29ubmVjdGlvbl9pZF9fID09PSBCaWdJbnQoMCk7XG4gIH1cbiAgc3RhdGljIG51bGxJZlplcm8oYWRkcikge1xuICAgIGlmIChhZGRyLmlzWmVybygpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFkZHI7XG4gICAgfVxuICB9XG4gIHN0YXRpYyByYW5kb20oKSB7XG4gICAgZnVuY3Rpb24gcmFuZG9tVTgoKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcbiAgICB9XG4gICAgbGV0IHJlc3VsdCA9IEJpZ0ludCgwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdCA8PCBCaWdJbnQoOCkgfCBCaWdJbnQocmFuZG9tVTgoKSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgX0Nvbm5lY3Rpb25JZChyZXN1bHQpO1xuICB9XG4gIC8qKlxuICAgKiBDb21wYXJlIHR3byBjb25uZWN0aW9uIElEcyBmb3IgZXF1YWxpdHkuXG4gICAqL1xuICBpc0VxdWFsKG90aGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX19jb25uZWN0aW9uX2lkX18gPT0gb3RoZXIuX19jb25uZWN0aW9uX2lkX187XG4gIH1cbiAgLyoqXG4gICAqIENoZWNrIGlmIHR3byBjb25uZWN0aW9uIElEcyBhcmUgZXF1YWwuXG4gICAqL1xuICBlcXVhbHMob3RoZXIpIHtcbiAgICByZXR1cm4gdGhpcy5pc0VxdWFsKG90aGVyKTtcbiAgfVxuICAvKipcbiAgICogUHJpbnQgdGhlIGNvbm5lY3Rpb24gSUQgYXMgYSBoZXhhZGVjaW1hbCBzdHJpbmcuXG4gICAqL1xuICB0b0hleFN0cmluZygpIHtcbiAgICByZXR1cm4gdTEyOFRvSGV4U3RyaW5nKHRoaXMuX19jb25uZWN0aW9uX2lkX18pO1xuICB9XG4gIC8qKlxuICAgKiBDb252ZXJ0IHRoZSBjb25uZWN0aW9uIElEIHRvIGEgVWludDhBcnJheS5cbiAgICovXG4gIHRvVWludDhBcnJheSgpIHtcbiAgICByZXR1cm4gdTEyOFRvVWludDhBcnJheSh0aGlzLl9fY29ubmVjdGlvbl9pZF9fKTtcbiAgfVxuICAvKipcbiAgICogUGFyc2UgYSBjb25uZWN0aW9uIElEIGZyb20gYSBoZXhhZGVjaW1hbCBzdHJpbmcuXG4gICAqL1xuICBzdGF0aWMgZnJvbVN0cmluZyhzdHIpIHtcbiAgICByZXR1cm4gbmV3IF9Db25uZWN0aW9uSWQoaGV4U3RyaW5nVG9VMTI4KHN0cikpO1xuICB9XG4gIHN0YXRpYyBmcm9tU3RyaW5nT3JOdWxsKHN0cikge1xuICAgIGNvbnN0IGFkZHIgPSBfQ29ubmVjdGlvbklkLmZyb21TdHJpbmcoc3RyKTtcbiAgICBpZiAoYWRkci5pc1plcm8oKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhZGRyO1xuICAgIH1cbiAgfVxufTtcblxuLy8gc3JjL2xpYi9pZGVudGl0eS50c1xudmFyIElkZW50aXR5ID0gY2xhc3MgX0lkZW50aXR5IHtcbiAgX19pZGVudGl0eV9fO1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgSWRlbnRpdHlgLlxuICAgKlxuICAgKiBgZGF0YWAgY2FuIGJlIGEgaGV4YWRlY2ltYWwgc3RyaW5nIG9yIGEgYGJpZ2ludGAuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5fX2lkZW50aXR5X18gPSB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiA/IGhleFN0cmluZ1RvVTI1NihkYXRhKSA6IGRhdGE7XG4gIH1cbiAgLyoqXG4gICAqIEdldCB0aGUgYWxnZWJyYWljIHR5cGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHtAbGluayBJZGVudGl0eX0gdHlwZS5cbiAgICogQHJldHVybnMgVGhlIGFsZ2VicmFpYyB0eXBlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0eXBlLlxuICAgKi9cbiAgc3RhdGljIGdldEFsZ2VicmFpY1R5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7XG4gICAgICBlbGVtZW50czogW3sgbmFtZTogXCJfX2lkZW50aXR5X19cIiwgYWxnZWJyYWljVHlwZTogQWxnZWJyYWljVHlwZS5VMjU2IH1dXG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIENoZWNrIGlmIHR3byBpZGVudGl0aWVzIGFyZSBlcXVhbC5cbiAgICovXG4gIGlzRXF1YWwob3RoZXIpIHtcbiAgICByZXR1cm4gdGhpcy50b0hleFN0cmluZygpID09PSBvdGhlci50b0hleFN0cmluZygpO1xuICB9XG4gIC8qKlxuICAgKiBDaGVjayBpZiB0d28gaWRlbnRpdGllcyBhcmUgZXF1YWwuXG4gICAqL1xuICBlcXVhbHMob3RoZXIpIHtcbiAgICByZXR1cm4gdGhpcy5pc0VxdWFsKG90aGVyKTtcbiAgfVxuICAvKipcbiAgICogUHJpbnQgdGhlIGlkZW50aXR5IGFzIGEgaGV4YWRlY2ltYWwgc3RyaW5nLlxuICAgKi9cbiAgdG9IZXhTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHUyNTZUb0hleFN0cmluZyh0aGlzLl9faWRlbnRpdHlfXyk7XG4gIH1cbiAgLyoqXG4gICAqIENvbnZlcnQgdGhlIGFkZHJlc3MgdG8gYSBVaW50OEFycmF5LlxuICAgKi9cbiAgdG9VaW50OEFycmF5KCkge1xuICAgIHJldHVybiB1MjU2VG9VaW50OEFycmF5KHRoaXMuX19pZGVudGl0eV9fKTtcbiAgfVxuICAvKipcbiAgICogUGFyc2UgYW4gSWRlbnRpdHkgZnJvbSBhIGhleGFkZWNpbWFsIHN0cmluZy5cbiAgICovXG4gIHN0YXRpYyBmcm9tU3RyaW5nKHN0cikge1xuICAgIHJldHVybiBuZXcgX0lkZW50aXR5KHN0cik7XG4gIH1cbiAgLyoqXG4gICAqIFplcm8gaWRlbnRpdHkgKDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMClcbiAgICovXG4gIHN0YXRpYyB6ZXJvKCkge1xuICAgIHJldHVybiBuZXcgX0lkZW50aXR5KDBuKTtcbiAgfVxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy50b0hleFN0cmluZygpO1xuICB9XG59O1xuXG4vLyBzcmMvbGliL2FsZ2VicmFpY190eXBlLnRzXG52YXIgU0VSSUFMSVpFUlMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xudmFyIERFU0VSSUFMSVpFUlMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xudmFyIEFsZ2VicmFpY1R5cGUgPSB7XG4gIFJlZjogKHZhbHVlKSA9PiAoeyB0YWc6IFwiUmVmXCIsIHZhbHVlIH0pLFxuICBTdW06ICh2YWx1ZSkgPT4gKHtcbiAgICB0YWc6IFwiU3VtXCIsXG4gICAgdmFsdWVcbiAgfSksXG4gIFByb2R1Y3Q6ICh2YWx1ZSkgPT4gKHtcbiAgICB0YWc6IFwiUHJvZHVjdFwiLFxuICAgIHZhbHVlXG4gIH0pLFxuICBBcnJheTogKHZhbHVlKSA9PiAoe1xuICAgIHRhZzogXCJBcnJheVwiLFxuICAgIHZhbHVlXG4gIH0pLFxuICBTdHJpbmc6IHsgdGFnOiBcIlN0cmluZ1wiIH0sXG4gIEJvb2w6IHsgdGFnOiBcIkJvb2xcIiB9LFxuICBJODogeyB0YWc6IFwiSThcIiB9LFxuICBVODogeyB0YWc6IFwiVThcIiB9LFxuICBJMTY6IHsgdGFnOiBcIkkxNlwiIH0sXG4gIFUxNjogeyB0YWc6IFwiVTE2XCIgfSxcbiAgSTMyOiB7IHRhZzogXCJJMzJcIiB9LFxuICBVMzI6IHsgdGFnOiBcIlUzMlwiIH0sXG4gIEk2NDogeyB0YWc6IFwiSTY0XCIgfSxcbiAgVTY0OiB7IHRhZzogXCJVNjRcIiB9LFxuICBJMTI4OiB7IHRhZzogXCJJMTI4XCIgfSxcbiAgVTEyODogeyB0YWc6IFwiVTEyOFwiIH0sXG4gIEkyNTY6IHsgdGFnOiBcIkkyNTZcIiB9LFxuICBVMjU2OiB7IHRhZzogXCJVMjU2XCIgfSxcbiAgRjMyOiB7IHRhZzogXCJGMzJcIiB9LFxuICBGNjQ6IHsgdGFnOiBcIkY2NFwiIH0sXG4gIG1ha2VTZXJpYWxpemVyKHR5LCB0eXBlc3BhY2UpIHtcbiAgICBpZiAodHkudGFnID09PSBcIlJlZlwiKSB7XG4gICAgICBpZiAoIXR5cGVzcGFjZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IHNlcmlhbGl6ZSByZWZzIHdpdGhvdXQgYSB0eXBlc3BhY2VcIik7XG4gICAgICB3aGlsZSAodHkudGFnID09PSBcIlJlZlwiKSB0eSA9IHR5cGVzcGFjZS50eXBlc1t0eS52YWx1ZV07XG4gICAgfVxuICAgIHN3aXRjaCAodHkudGFnKSB7XG4gICAgICBjYXNlIFwiUHJvZHVjdFwiOlxuICAgICAgICByZXR1cm4gUHJvZHVjdFR5cGUubWFrZVNlcmlhbGl6ZXIodHkudmFsdWUsIHR5cGVzcGFjZSk7XG4gICAgICBjYXNlIFwiU3VtXCI6XG4gICAgICAgIHJldHVybiBTdW1UeXBlLm1ha2VTZXJpYWxpemVyKHR5LnZhbHVlLCB0eXBlc3BhY2UpO1xuICAgICAgY2FzZSBcIkFycmF5XCI6XG4gICAgICAgIGlmICh0eS52YWx1ZS50YWcgPT09IFwiVThcIikge1xuICAgICAgICAgIHJldHVybiBzZXJpYWxpemVVaW50OEFycmF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IEFsZ2VicmFpY1R5cGUubWFrZVNlcmlhbGl6ZXIodHkudmFsdWUsIHR5cGVzcGFjZSk7XG4gICAgICAgICAgcmV0dXJuICh3cml0ZXIsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB3cml0ZXIud3JpdGVVMzIodmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZWxlbSBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgICBzZXJpYWxpemUod3JpdGVyLCBlbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gcHJpbWl0aXZlU2VyaWFsaXplcnNbdHkudGFnXTtcbiAgICB9XG4gIH0sXG4gIC8qKiBAZGVwcmVjYXRlZCBVc2UgYG1ha2VTZXJpYWxpemVyYCBpbnN0ZWFkLiAqL1xuICBzZXJpYWxpemVWYWx1ZSh3cml0ZXIsIHR5LCB2YWx1ZSwgdHlwZXNwYWNlKSB7XG4gICAgQWxnZWJyYWljVHlwZS5tYWtlU2VyaWFsaXplcih0eSwgdHlwZXNwYWNlKSh3cml0ZXIsIHZhbHVlKTtcbiAgfSxcbiAgbWFrZURlc2VyaWFsaXplcih0eSwgdHlwZXNwYWNlKSB7XG4gICAgaWYgKHR5LnRhZyA9PT0gXCJSZWZcIikge1xuICAgICAgaWYgKCF0eXBlc3BhY2UpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbm5vdCBkZXNlcmlhbGl6ZSByZWZzIHdpdGhvdXQgYSB0eXBlc3BhY2VcIik7XG4gICAgICB3aGlsZSAodHkudGFnID09PSBcIlJlZlwiKSB0eSA9IHR5cGVzcGFjZS50eXBlc1t0eS52YWx1ZV07XG4gICAgfVxuICAgIHN3aXRjaCAodHkudGFnKSB7XG4gICAgICBjYXNlIFwiUHJvZHVjdFwiOlxuICAgICAgICByZXR1cm4gUHJvZHVjdFR5cGUubWFrZURlc2VyaWFsaXplcih0eS52YWx1ZSwgdHlwZXNwYWNlKTtcbiAgICAgIGNhc2UgXCJTdW1cIjpcbiAgICAgICAgcmV0dXJuIFN1bVR5cGUubWFrZURlc2VyaWFsaXplcih0eS52YWx1ZSwgdHlwZXNwYWNlKTtcbiAgICAgIGNhc2UgXCJBcnJheVwiOlxuICAgICAgICBpZiAodHkudmFsdWUudGFnID09PSBcIlU4XCIpIHtcbiAgICAgICAgICByZXR1cm4gZGVzZXJpYWxpemVVaW50OEFycmF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGRlc2VyaWFsaXplID0gQWxnZWJyYWljVHlwZS5tYWtlRGVzZXJpYWxpemVyKFxuICAgICAgICAgICAgdHkudmFsdWUsXG4gICAgICAgICAgICB0eXBlc3BhY2VcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiAocmVhZGVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSByZWFkZXIucmVhZFUzMigpO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgcmVzdWx0W2ldID0gZGVzZXJpYWxpemUocmVhZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHByaW1pdGl2ZURlc2VyaWFsaXplcnNbdHkudGFnXTtcbiAgICB9XG4gIH0sXG4gIC8qKiBAZGVwcmVjYXRlZCBVc2UgYG1ha2VEZXNlcmlhbGl6ZXJgIGluc3RlYWQuICovXG4gIGRlc2VyaWFsaXplVmFsdWUocmVhZGVyLCB0eSwgdHlwZXNwYWNlKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUubWFrZURlc2VyaWFsaXplcih0eSwgdHlwZXNwYWNlKShyZWFkZXIpO1xuICB9LFxuICAvKipcbiAgICogQ29udmVydCBhIHZhbHVlIG9mIHRoZSBhbGdlYnJhaWMgdHlwZSBpbnRvIHNvbWV0aGluZyB0aGF0IGNhbiBiZSB1c2VkIGFzIGEga2V5IGluIGEgbWFwLlxuICAgKiBUaGVyZSBhcmUgbm8gZ3VhcmFudGVlcyBhYm91dCBiZWluZyBhYmxlIHRvIG9yZGVyIGl0LlxuICAgKiBUaGlzIGlzIG9ubHkgZ3VhcmFudGVlZCB0byBiZSBjb21wYXJhYmxlIHRvIG90aGVyIHZhbHVlcyBvZiB0aGUgc2FtZSB0eXBlLlxuICAgKiBAcGFyYW0gdmFsdWUgQSB2YWx1ZSBvZiB0aGUgYWxnZWJyYWljIHR5cGVcbiAgICogQHJldHVybnMgU29tZXRoaW5nIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBrZXkgaW4gYSBtYXAuXG4gICAqL1xuICBpbnRvTWFwS2V5OiBmdW5jdGlvbih0eSwgdmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5LnRhZykge1xuICAgICAgY2FzZSBcIlU4XCI6XG4gICAgICBjYXNlIFwiVTE2XCI6XG4gICAgICBjYXNlIFwiVTMyXCI6XG4gICAgICBjYXNlIFwiVTY0XCI6XG4gICAgICBjYXNlIFwiVTEyOFwiOlxuICAgICAgY2FzZSBcIlUyNTZcIjpcbiAgICAgIGNhc2UgXCJJOFwiOlxuICAgICAgY2FzZSBcIkkxNlwiOlxuICAgICAgY2FzZSBcIkkzMlwiOlxuICAgICAgY2FzZSBcIkk2NFwiOlxuICAgICAgY2FzZSBcIkkxMjhcIjpcbiAgICAgIGNhc2UgXCJJMjU2XCI6XG4gICAgICBjYXNlIFwiRjMyXCI6XG4gICAgICBjYXNlIFwiRjY0XCI6XG4gICAgICBjYXNlIFwiU3RyaW5nXCI6XG4gICAgICBjYXNlIFwiQm9vbFwiOlxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICBjYXNlIFwiUHJvZHVjdFwiOlxuICAgICAgICByZXR1cm4gUHJvZHVjdFR5cGUuaW50b01hcEtleSh0eS52YWx1ZSwgdmFsdWUpO1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBjb25zdCB3cml0ZXIgPSBuZXcgQmluYXJ5V3JpdGVyKDEwKTtcbiAgICAgICAgQWxnZWJyYWljVHlwZS5zZXJpYWxpemVWYWx1ZSh3cml0ZXIsIHR5LCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB3cml0ZXIudG9CYXNlNjQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5mdW5jdGlvbiBiaW5kQ2FsbChmKSB7XG4gIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbC5iaW5kKGYpO1xufVxudmFyIHByaW1pdGl2ZVNlcmlhbGl6ZXJzID0ge1xuICBCb29sOiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlQm9vbCksXG4gIEk4OiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlSTgpLFxuICBVODogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVU4KSxcbiAgSTE2OiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlSTE2KSxcbiAgVTE2OiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlVTE2KSxcbiAgSTMyOiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlSTMyKSxcbiAgVTMyOiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlVTMyKSxcbiAgSTY0OiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlSTY0KSxcbiAgVTY0OiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlVTY0KSxcbiAgSTEyODogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZUkxMjgpLFxuICBVMTI4OiBiaW5kQ2FsbChCaW5hcnlXcml0ZXIucHJvdG90eXBlLndyaXRlVTEyOCksXG4gIEkyNTY6IGJpbmRDYWxsKEJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVJMjU2KSxcbiAgVTI1NjogYmluZENhbGwoQmluYXJ5V3JpdGVyLnByb3RvdHlwZS53cml0ZVUyNTYpLFxuICBGMzI6IGJpbmRDYWxsKEJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVGMzIpLFxuICBGNjQ6IGJpbmRDYWxsKEJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVGNjQpLFxuICBTdHJpbmc6IGJpbmRDYWxsKEJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVTdHJpbmcpXG59O1xuT2JqZWN0LmZyZWV6ZShwcmltaXRpdmVTZXJpYWxpemVycyk7XG52YXIgc2VyaWFsaXplVWludDhBcnJheSA9IGJpbmRDYWxsKEJpbmFyeVdyaXRlci5wcm90b3R5cGUud3JpdGVVSW50OEFycmF5KTtcbnZhciBwcmltaXRpdmVEZXNlcmlhbGl6ZXJzID0ge1xuICBCb29sOiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRCb29sKSxcbiAgSTg6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEk4KSxcbiAgVTg6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFU4KSxcbiAgSTE2OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRJMTYpLFxuICBVMTY6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFUxNiksXG4gIEkzMjogYmluZENhbGwoQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkSTMyKSxcbiAgVTMyOiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRVMzIpLFxuICBJNjQ6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZEk2NCksXG4gIFU2NDogYmluZENhbGwoQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkVTY0KSxcbiAgSTEyODogYmluZENhbGwoQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkSTEyOCksXG4gIFUxMjg6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFUxMjgpLFxuICBJMjU2OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRJMjU2KSxcbiAgVTI1NjogYmluZENhbGwoQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkVTI1NiksXG4gIEYzMjogYmluZENhbGwoQmluYXJ5UmVhZGVyLnByb3RvdHlwZS5yZWFkRjMyKSxcbiAgRjY0OiBiaW5kQ2FsbChCaW5hcnlSZWFkZXIucHJvdG90eXBlLnJlYWRGNjQpLFxuICBTdHJpbmc6IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFN0cmluZylcbn07XG5PYmplY3QuZnJlZXplKHByaW1pdGl2ZURlc2VyaWFsaXplcnMpO1xudmFyIGRlc2VyaWFsaXplVWludDhBcnJheSA9IGJpbmRDYWxsKEJpbmFyeVJlYWRlci5wcm90b3R5cGUucmVhZFVJbnQ4QXJyYXkpO1xudmFyIHByaW1pdGl2ZVNpemVzID0ge1xuICBCb29sOiAxLFxuICBJODogMSxcbiAgVTg6IDEsXG4gIEkxNjogMixcbiAgVTE2OiAyLFxuICBJMzI6IDQsXG4gIFUzMjogNCxcbiAgSTY0OiA4LFxuICBVNjQ6IDgsXG4gIEkxMjg6IDE2LFxuICBVMTI4OiAxNixcbiAgSTI1NjogMzIsXG4gIFUyNTY6IDMyLFxuICBGMzI6IDQsXG4gIEY2NDogOFxufTtcbnZhciBmaXhlZFNpemVQcmltaXRpdmVzID0gbmV3IFNldChPYmplY3Qua2V5cyhwcmltaXRpdmVTaXplcykpO1xudmFyIGlzRml4ZWRTaXplUHJvZHVjdCA9ICh0eSkgPT4gdHkuZWxlbWVudHMuZXZlcnkoXG4gICh7IGFsZ2VicmFpY1R5cGUgfSkgPT4gZml4ZWRTaXplUHJpbWl0aXZlcy5oYXMoYWxnZWJyYWljVHlwZS50YWcpXG4pO1xudmFyIHByb2R1Y3RTaXplID0gKHR5KSA9PiB0eS5lbGVtZW50cy5yZWR1Y2UoXG4gIChhY2MsIHsgYWxnZWJyYWljVHlwZSB9KSA9PiBhY2MgKyBwcmltaXRpdmVTaXplc1thbGdlYnJhaWNUeXBlLnRhZ10sXG4gIDBcbik7XG52YXIgcHJpbWl0aXZlSlNOYW1lID0ge1xuICBCb29sOiBcIlVpbnQ4XCIsXG4gIEk4OiBcIkludDhcIixcbiAgVTg6IFwiVWludDhcIixcbiAgSTE2OiBcIkludDE2XCIsXG4gIFUxNjogXCJVaW50MTZcIixcbiAgSTMyOiBcIkludDMyXCIsXG4gIFUzMjogXCJVaW50MzJcIixcbiAgSTY0OiBcIkJpZ0ludDY0XCIsXG4gIFU2NDogXCJCaWdVaW50NjRcIixcbiAgRjMyOiBcIkZsb2F0MzJcIixcbiAgRjY0OiBcIkZsb2F0NjRcIlxufTtcbnZhciBzcGVjaWFsUHJvZHVjdERlc2VyaWFsaXplcnMgPSB7XG4gIF9fdGltZV9kdXJhdGlvbl9taWNyb3NfXzogKHJlYWRlcikgPT4gbmV3IFRpbWVEdXJhdGlvbihyZWFkZXIucmVhZEk2NCgpKSxcbiAgX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfXzogKHJlYWRlcikgPT4gbmV3IFRpbWVzdGFtcChyZWFkZXIucmVhZEk2NCgpKSxcbiAgX19pZGVudGl0eV9fOiAocmVhZGVyKSA9PiBuZXcgSWRlbnRpdHkocmVhZGVyLnJlYWRVMjU2KCkpLFxuICBfX2Nvbm5lY3Rpb25faWRfXzogKHJlYWRlcikgPT4gbmV3IENvbm5lY3Rpb25JZChyZWFkZXIucmVhZFUxMjgoKSksXG4gIF9fdXVpZF9fOiAocmVhZGVyKSA9PiBuZXcgVXVpZChyZWFkZXIucmVhZFUxMjgoKSlcbn07XG5PYmplY3QuZnJlZXplKHNwZWNpYWxQcm9kdWN0RGVzZXJpYWxpemVycyk7XG52YXIgdW5pdERlc2VyaWFsaXplciA9ICgpID0+ICh7fSk7XG52YXIgZ2V0RWxlbWVudEluaXRpYWxpemVyID0gKGVsZW1lbnQpID0+IHtcbiAgbGV0IGluaXQ7XG4gIHN3aXRjaCAoZWxlbWVudC5hbGdlYnJhaWNUeXBlLnRhZykge1xuICAgIGNhc2UgXCJTdHJpbmdcIjpcbiAgICAgIGluaXQgPSBcIicnXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiQm9vbFwiOlxuICAgICAgaW5pdCA9IFwiZmFsc2VcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJJOFwiOlxuICAgIGNhc2UgXCJVOFwiOlxuICAgIGNhc2UgXCJJMTZcIjpcbiAgICBjYXNlIFwiVTE2XCI6XG4gICAgY2FzZSBcIkkzMlwiOlxuICAgIGNhc2UgXCJVMzJcIjpcbiAgICAgIGluaXQgPSBcIjBcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJJNjRcIjpcbiAgICBjYXNlIFwiVTY0XCI6XG4gICAgY2FzZSBcIkkxMjhcIjpcbiAgICBjYXNlIFwiVTEyOFwiOlxuICAgIGNhc2UgXCJJMjU2XCI6XG4gICAgY2FzZSBcIlUyNTZcIjpcbiAgICAgIGluaXQgPSBcIjBuXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiRjMyXCI6XG4gICAgY2FzZSBcIkY2NFwiOlxuICAgICAgaW5pdCA9IFwiMC4wXCI7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgaW5pdCA9IFwidW5kZWZpbmVkXCI7XG4gIH1cbiAgcmV0dXJuIGAke2VsZW1lbnQubmFtZX06ICR7aW5pdH1gO1xufTtcbnZhciBQcm9kdWN0VHlwZSA9IHtcbiAgbWFrZVNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkge1xuICAgIGxldCBzZXJpYWxpemVyID0gU0VSSUFMSVpFUlMuZ2V0KHR5KTtcbiAgICBpZiAoc2VyaWFsaXplciAhPSBudWxsKSByZXR1cm4gc2VyaWFsaXplcjtcbiAgICBpZiAoaXNGaXhlZFNpemVQcm9kdWN0KHR5KSkge1xuICAgICAgY29uc3Qgc2l6ZSA9IHByb2R1Y3RTaXplKHR5KTtcbiAgICAgIGNvbnN0IGJvZHkyID0gYFwidXNlIHN0cmljdFwiO1xud3JpdGVyLmV4cGFuZEJ1ZmZlcigke3NpemV9KTtcbmNvbnN0IHZpZXcgPSB3cml0ZXIudmlldztcbiR7dHkuZWxlbWVudHMubWFwKFxuICAgICAgICAoeyBuYW1lLCBhbGdlYnJhaWNUeXBlOiB7IHRhZyB9IH0pID0+IHRhZyBpbiBwcmltaXRpdmVKU05hbWUgPyBgdmlldy5zZXQke3ByaW1pdGl2ZUpTTmFtZVt0YWddfSh3cml0ZXIub2Zmc2V0LCB2YWx1ZS4ke25hbWV9LCAke3ByaW1pdGl2ZVNpemVzW3RhZ10gPiAxID8gXCJ0cnVlXCIgOiBcIlwifSk7XG53cml0ZXIub2Zmc2V0ICs9ICR7cHJpbWl0aXZlU2l6ZXNbdGFnXX07YCA6IGB3cml0ZXIud3JpdGUke3RhZ30odmFsdWUuJHtuYW1lfSk7YFxuICAgICAgKS5qb2luKFwiXFxuXCIpfWA7XG4gICAgICBzZXJpYWxpemVyID0gRnVuY3Rpb24oXCJ3cml0ZXJcIiwgXCJ2YWx1ZVwiLCBib2R5Mik7XG4gICAgICBTRVJJQUxJWkVSUy5zZXQodHksIHNlcmlhbGl6ZXIpO1xuICAgICAgcmV0dXJuIHNlcmlhbGl6ZXI7XG4gICAgfVxuICAgIGNvbnN0IHNlcmlhbGl6ZXJzID0ge307XG4gICAgY29uc3QgYm9keSA9ICdcInVzZSBzdHJpY3RcIjtcXG4nICsgdHkuZWxlbWVudHMubWFwKFxuICAgICAgKGVsZW1lbnQpID0+IGB0aGlzLiR7ZWxlbWVudC5uYW1lfSh3cml0ZXIsIHZhbHVlLiR7ZWxlbWVudC5uYW1lfSk7YFxuICAgICkuam9pbihcIlxcblwiKTtcbiAgICBzZXJpYWxpemVyID0gRnVuY3Rpb24oXCJ3cml0ZXJcIiwgXCJ2YWx1ZVwiLCBib2R5KS5iaW5kKFxuICAgICAgc2VyaWFsaXplcnNcbiAgICApO1xuICAgIFNFUklBTElaRVJTLnNldCh0eSwgc2VyaWFsaXplcik7XG4gICAgZm9yIChjb25zdCB7IG5hbWUsIGFsZ2VicmFpY1R5cGUgfSBvZiB0eS5lbGVtZW50cykge1xuICAgICAgc2VyaWFsaXplcnNbbmFtZV0gPSBBbGdlYnJhaWNUeXBlLm1ha2VTZXJpYWxpemVyKFxuICAgICAgICBhbGdlYnJhaWNUeXBlLFxuICAgICAgICB0eXBlc3BhY2VcbiAgICAgICk7XG4gICAgfVxuICAgIE9iamVjdC5mcmVlemUoc2VyaWFsaXplcnMpO1xuICAgIHJldHVybiBzZXJpYWxpemVyO1xuICB9LFxuICAvKiogQGRlcHJlY2F0ZWQgVXNlIGBtYWtlU2VyaWFsaXplcmAgaW5zdGVhZC4gKi9cbiAgc2VyaWFsaXplVmFsdWUod3JpdGVyLCB0eSwgdmFsdWUsIHR5cGVzcGFjZSkge1xuICAgIFByb2R1Y3RUeXBlLm1ha2VTZXJpYWxpemVyKHR5LCB0eXBlc3BhY2UpKHdyaXRlciwgdmFsdWUpO1xuICB9LFxuICBtYWtlRGVzZXJpYWxpemVyKHR5LCB0eXBlc3BhY2UpIHtcbiAgICBzd2l0Y2ggKHR5LmVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gdW5pdERlc2VyaWFsaXplcjtcbiAgICAgIGNhc2UgMToge1xuICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSB0eS5lbGVtZW50c1swXS5uYW1lO1xuICAgICAgICBpZiAoaGFzT3duKHNwZWNpYWxQcm9kdWN0RGVzZXJpYWxpemVycywgZmllbGROYW1lKSlcbiAgICAgICAgICByZXR1cm4gc3BlY2lhbFByb2R1Y3REZXNlcmlhbGl6ZXJzW2ZpZWxkTmFtZV07XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBkZXNlcmlhbGl6ZXIgPSBERVNFUklBTElaRVJTLmdldCh0eSk7XG4gICAgaWYgKGRlc2VyaWFsaXplciAhPSBudWxsKSByZXR1cm4gZGVzZXJpYWxpemVyO1xuICAgIGlmIChpc0ZpeGVkU2l6ZVByb2R1Y3QodHkpKSB7XG4gICAgICBjb25zdCBib2R5ID0gYFwidXNlIHN0cmljdFwiO1xuY29uc3QgcmVzdWx0ID0geyAke3R5LmVsZW1lbnRzLm1hcChnZXRFbGVtZW50SW5pdGlhbGl6ZXIpLmpvaW4oXCIsIFwiKX0gfTtcbmNvbnN0IHZpZXcgPSByZWFkZXIudmlldztcbiR7dHkuZWxlbWVudHMubWFwKFxuICAgICAgICAoeyBuYW1lLCBhbGdlYnJhaWNUeXBlOiB7IHRhZyB9IH0pID0+IHRhZyBpbiBwcmltaXRpdmVKU05hbWUgPyB0YWcgPT09IFwiQm9vbFwiID8gYHJlc3VsdC4ke25hbWV9ID0gdmlldy5nZXRVaW50OChyZWFkZXIub2Zmc2V0KSAhPT0gMDtcbnJlYWRlci5vZmZzZXQgKz0gMTtgIDogYHJlc3VsdC4ke25hbWV9ID0gdmlldy5nZXQke3ByaW1pdGl2ZUpTTmFtZVt0YWddfShyZWFkZXIub2Zmc2V0LCAke3ByaW1pdGl2ZVNpemVzW3RhZ10gPiAxID8gXCJ0cnVlXCIgOiBcIlwifSk7XG5yZWFkZXIub2Zmc2V0ICs9ICR7cHJpbWl0aXZlU2l6ZXNbdGFnXX07YCA6IGByZXN1bHQuJHtuYW1lfSA9IHJlYWRlci5yZWFkJHt0YWd9KCk7YFxuICAgICAgKS5qb2luKFwiXFxuXCIpfVxucmV0dXJuIHJlc3VsdDtgO1xuICAgICAgZGVzZXJpYWxpemVyID0gRnVuY3Rpb24oXCJyZWFkZXJcIiwgYm9keSk7XG4gICAgICBERVNFUklBTElaRVJTLnNldCh0eSwgZGVzZXJpYWxpemVyKTtcbiAgICAgIHJldHVybiBkZXNlcmlhbGl6ZXI7XG4gICAgfVxuICAgIGNvbnN0IGRlc2VyaWFsaXplcnMgPSB7fTtcbiAgICBkZXNlcmlhbGl6ZXIgPSBGdW5jdGlvbihcbiAgICAgIFwicmVhZGVyXCIsXG4gICAgICBgXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCByZXN1bHQgPSB7ICR7dHkuZWxlbWVudHMubWFwKGdldEVsZW1lbnRJbml0aWFsaXplcikuam9pbihcIiwgXCIpfSB9O1xuJHt0eS5lbGVtZW50cy5tYXAoKHsgbmFtZSB9KSA9PiBgcmVzdWx0LiR7bmFtZX0gPSB0aGlzLiR7bmFtZX0ocmVhZGVyKTtgKS5qb2luKFwiXFxuXCIpfVxucmV0dXJuIHJlc3VsdDtgXG4gICAgKS5iaW5kKGRlc2VyaWFsaXplcnMpO1xuICAgIERFU0VSSUFMSVpFUlMuc2V0KHR5LCBkZXNlcmlhbGl6ZXIpO1xuICAgIGZvciAoY29uc3QgeyBuYW1lLCBhbGdlYnJhaWNUeXBlIH0gb2YgdHkuZWxlbWVudHMpIHtcbiAgICAgIGRlc2VyaWFsaXplcnNbbmFtZV0gPSBBbGdlYnJhaWNUeXBlLm1ha2VEZXNlcmlhbGl6ZXIoXG4gICAgICAgIGFsZ2VicmFpY1R5cGUsXG4gICAgICAgIHR5cGVzcGFjZVxuICAgICAgKTtcbiAgICB9XG4gICAgT2JqZWN0LmZyZWV6ZShkZXNlcmlhbGl6ZXJzKTtcbiAgICByZXR1cm4gZGVzZXJpYWxpemVyO1xuICB9LFxuICAvKiogQGRlcHJlY2F0ZWQgVXNlIGBtYWtlRGVzZXJpYWxpemVyYCBpbnN0ZWFkLiAqL1xuICBkZXNlcmlhbGl6ZVZhbHVlKHJlYWRlciwgdHksIHR5cGVzcGFjZSkge1xuICAgIHJldHVybiBQcm9kdWN0VHlwZS5tYWtlRGVzZXJpYWxpemVyKHR5LCB0eXBlc3BhY2UpKHJlYWRlcik7XG4gIH0sXG4gIGludG9NYXBLZXkodHksIHZhbHVlKSB7XG4gICAgaWYgKHR5LmVsZW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgZmllbGROYW1lID0gdHkuZWxlbWVudHNbMF0ubmFtZTtcbiAgICAgIGlmIChoYXNPd24oc3BlY2lhbFByb2R1Y3REZXNlcmlhbGl6ZXJzLCBmaWVsZE5hbWUpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZVtmaWVsZE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB3cml0ZXIgPSBuZXcgQmluYXJ5V3JpdGVyKDEwKTtcbiAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHR5KSwgdmFsdWUpO1xuICAgIHJldHVybiB3cml0ZXIudG9CYXNlNjQoKTtcbiAgfVxufTtcbnZhciBTdW1UeXBlID0ge1xuICBtYWtlU2VyaWFsaXplcih0eSwgdHlwZXNwYWNlKSB7XG4gICAgaWYgKHR5LnZhcmlhbnRzLmxlbmd0aCA9PSAyICYmIHR5LnZhcmlhbnRzWzBdLm5hbWUgPT09IFwic29tZVwiICYmIHR5LnZhcmlhbnRzWzFdLm5hbWUgPT09IFwibm9uZVwiKSB7XG4gICAgICBjb25zdCBzZXJpYWxpemUgPSBBbGdlYnJhaWNUeXBlLm1ha2VTZXJpYWxpemVyKFxuICAgICAgICB0eS52YXJpYW50c1swXS5hbGdlYnJhaWNUeXBlLFxuICAgICAgICB0eXBlc3BhY2VcbiAgICAgICk7XG4gICAgICByZXR1cm4gKHdyaXRlciwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcbiAgICAgICAgICB3cml0ZXIud3JpdGVCeXRlKDApO1xuICAgICAgICAgIHNlcmlhbGl6ZSh3cml0ZXIsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3cml0ZXIud3JpdGVCeXRlKDEpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHkudmFyaWFudHMubGVuZ3RoID09IDIgJiYgdHkudmFyaWFudHNbMF0ubmFtZSA9PT0gXCJva1wiICYmIHR5LnZhcmlhbnRzWzFdLm5hbWUgPT09IFwiZXJyXCIpIHtcbiAgICAgIGNvbnN0IHNlcmlhbGl6ZU9rID0gQWxnZWJyYWljVHlwZS5tYWtlU2VyaWFsaXplcihcbiAgICAgICAgdHkudmFyaWFudHNbMF0uYWxnZWJyYWljVHlwZSxcbiAgICAgICAgdHlwZXNwYWNlXG4gICAgICApO1xuICAgICAgY29uc3Qgc2VyaWFsaXplRXJyID0gQWxnZWJyYWljVHlwZS5tYWtlU2VyaWFsaXplcihcbiAgICAgICAgdHkudmFyaWFudHNbMF0uYWxnZWJyYWljVHlwZSxcbiAgICAgICAgdHlwZXNwYWNlXG4gICAgICApO1xuICAgICAgcmV0dXJuICh3cml0ZXIsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChcIm9rXCIgaW4gdmFsdWUpIHtcbiAgICAgICAgICB3cml0ZXIud3JpdGVVOCgwKTtcbiAgICAgICAgICBzZXJpYWxpemVPayh3cml0ZXIsIHZhbHVlLm9rKTtcbiAgICAgICAgfSBlbHNlIGlmIChcImVyclwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgd3JpdGVyLndyaXRlVTgoMSk7XG4gICAgICAgICAgc2VyaWFsaXplRXJyKHdyaXRlciwgdmFsdWUuZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgXCJjb3VsZCBub3Qgc2VyaWFsaXplIHJlc3VsdDogb2JqZWN0IGhhZCBuZWl0aGVyIGEgYG9rYCBub3IgYW4gYGVycmAgZmllbGRcIlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzZXJpYWxpemVyID0gU0VSSUFMSVpFUlMuZ2V0KHR5KTtcbiAgICAgIGlmIChzZXJpYWxpemVyICE9IG51bGwpIHJldHVybiBzZXJpYWxpemVyO1xuICAgICAgY29uc3Qgc2VyaWFsaXplcnMgPSB7fTtcbiAgICAgIGNvbnN0IGJvZHkgPSBgc3dpdGNoICh2YWx1ZS50YWcpIHtcbiR7dHkudmFyaWFudHMubWFwKFxuICAgICAgICAoeyBuYW1lIH0sIGkpID0+IGAgIGNhc2UgJHtKU09OLnN0cmluZ2lmeShuYW1lKX06XG4gICAgd3JpdGVyLndyaXRlQnl0ZSgke2l9KTtcbiAgICByZXR1cm4gdGhpcy4ke25hbWV9KHdyaXRlciwgdmFsdWUudmFsdWUpO2BcbiAgICAgICkuam9pbihcIlxcblwiKX1cbiAgZGVmYXVsdDpcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgXFxgQ291bGQgbm90IHNlcmlhbGl6ZSBzdW0gdHlwZTsgdW5rbm93biB0YWcgXFwke3ZhbHVlLnRhZ31cXGBcbiAgICApXG59XG5gO1xuICAgICAgc2VyaWFsaXplciA9IEZ1bmN0aW9uKFwid3JpdGVyXCIsIFwidmFsdWVcIiwgYm9keSkuYmluZChcbiAgICAgICAgc2VyaWFsaXplcnNcbiAgICAgICk7XG4gICAgICBTRVJJQUxJWkVSUy5zZXQodHksIHNlcmlhbGl6ZXIpO1xuICAgICAgZm9yIChjb25zdCB7IG5hbWUsIGFsZ2VicmFpY1R5cGUgfSBvZiB0eS52YXJpYW50cykge1xuICAgICAgICBzZXJpYWxpemVyc1tuYW1lXSA9IEFsZ2VicmFpY1R5cGUubWFrZVNlcmlhbGl6ZXIoXG4gICAgICAgICAgYWxnZWJyYWljVHlwZSxcbiAgICAgICAgICB0eXBlc3BhY2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIE9iamVjdC5mcmVlemUoc2VyaWFsaXplcnMpO1xuICAgICAgcmV0dXJuIHNlcmlhbGl6ZXI7XG4gICAgfVxuICB9LFxuICAvKiogQGRlcHJlY2F0ZWQgVXNlIGBtYWtlU2VyaWFsaXplcmAgaW5zdGVhZC4gKi9cbiAgc2VyaWFsaXplVmFsdWUod3JpdGVyLCB0eSwgdmFsdWUsIHR5cGVzcGFjZSkge1xuICAgIFN1bVR5cGUubWFrZVNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkod3JpdGVyLCB2YWx1ZSk7XG4gIH0sXG4gIG1ha2VEZXNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkge1xuICAgIGlmICh0eS52YXJpYW50cy5sZW5ndGggPT0gMiAmJiB0eS52YXJpYW50c1swXS5uYW1lID09PSBcInNvbWVcIiAmJiB0eS52YXJpYW50c1sxXS5uYW1lID09PSBcIm5vbmVcIikge1xuICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBBbGdlYnJhaWNUeXBlLm1ha2VEZXNlcmlhbGl6ZXIoXG4gICAgICAgIHR5LnZhcmlhbnRzWzBdLmFsZ2VicmFpY1R5cGUsXG4gICAgICAgIHR5cGVzcGFjZVxuICAgICAgKTtcbiAgICAgIHJldHVybiAocmVhZGVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhZyA9IHJlYWRlci5yZWFkVTgoKTtcbiAgICAgICAgaWYgKHRhZyA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBkZXNlcmlhbGl6ZShyZWFkZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhZyA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgYENhbid0IGRlc2VyaWFsaXplIGFuIG9wdGlvbiB0eXBlLCBjb3VsZG4ndCBmaW5kICR7dGFnfSB0YWdgO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHkudmFyaWFudHMubGVuZ3RoID09IDIgJiYgdHkudmFyaWFudHNbMF0ubmFtZSA9PT0gXCJva1wiICYmIHR5LnZhcmlhbnRzWzFdLm5hbWUgPT09IFwiZXJyXCIpIHtcbiAgICAgIGNvbnN0IGRlc2VyaWFsaXplT2sgPSBBbGdlYnJhaWNUeXBlLm1ha2VEZXNlcmlhbGl6ZXIoXG4gICAgICAgIHR5LnZhcmlhbnRzWzBdLmFsZ2VicmFpY1R5cGUsXG4gICAgICAgIHR5cGVzcGFjZVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRlc2VyaWFsaXplRXJyID0gQWxnZWJyYWljVHlwZS5tYWtlRGVzZXJpYWxpemVyKFxuICAgICAgICB0eS52YXJpYW50c1sxXS5hbGdlYnJhaWNUeXBlLFxuICAgICAgICB0eXBlc3BhY2VcbiAgICAgICk7XG4gICAgICByZXR1cm4gKHJlYWRlcikgPT4ge1xuICAgICAgICBjb25zdCB0YWcgPSByZWFkZXIucmVhZEJ5dGUoKTtcbiAgICAgICAgaWYgKHRhZyA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB7IG9rOiBkZXNlcmlhbGl6ZU9rKHJlYWRlcikgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0YWcgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4geyBlcnI6IGRlc2VyaWFsaXplRXJyKHJlYWRlcikgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBgQ2FuJ3QgZGVzZXJpYWxpemUgYSByZXN1bHQgdHlwZSwgY291bGRuJ3QgZmluZCAke3RhZ30gdGFnYDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGRlc2VyaWFsaXplciA9IERFU0VSSUFMSVpFUlMuZ2V0KHR5KTtcbiAgICAgIGlmIChkZXNlcmlhbGl6ZXIgIT0gbnVsbCkgcmV0dXJuIGRlc2VyaWFsaXplcjtcbiAgICAgIGNvbnN0IGRlc2VyaWFsaXplcnMgPSB7fTtcbiAgICAgIGRlc2VyaWFsaXplciA9IEZ1bmN0aW9uKFxuICAgICAgICBcInJlYWRlclwiLFxuICAgICAgICBgc3dpdGNoIChyZWFkZXIucmVhZFU4KCkpIHtcbiR7dHkudmFyaWFudHMubWFwKFxuICAgICAgICAgICh7IG5hbWUgfSwgaSkgPT4gYGNhc2UgJHtpfTogcmV0dXJuIHsgdGFnOiAke0pTT04uc3RyaW5naWZ5KG5hbWUpfSwgdmFsdWU6IHRoaXMuJHtuYW1lfShyZWFkZXIpIH07YFxuICAgICAgICApLmpvaW4oXCJcXG5cIil9IH1gXG4gICAgICApLmJpbmQoZGVzZXJpYWxpemVycyk7XG4gICAgICBERVNFUklBTElaRVJTLnNldCh0eSwgZGVzZXJpYWxpemVyKTtcbiAgICAgIGZvciAoY29uc3QgeyBuYW1lLCBhbGdlYnJhaWNUeXBlIH0gb2YgdHkudmFyaWFudHMpIHtcbiAgICAgICAgZGVzZXJpYWxpemVyc1tuYW1lXSA9IEFsZ2VicmFpY1R5cGUubWFrZURlc2VyaWFsaXplcihcbiAgICAgICAgICBhbGdlYnJhaWNUeXBlLFxuICAgICAgICAgIHR5cGVzcGFjZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgT2JqZWN0LmZyZWV6ZShkZXNlcmlhbGl6ZXJzKTtcbiAgICAgIHJldHVybiBkZXNlcmlhbGl6ZXI7XG4gICAgfVxuICB9LFxuICAvKiogQGRlcHJlY2F0ZWQgVXNlIGBtYWtlRGVzZXJpYWxpemVyYCBpbnN0ZWFkLiAqL1xuICBkZXNlcmlhbGl6ZVZhbHVlKHJlYWRlciwgdHksIHR5cGVzcGFjZSkge1xuICAgIHJldHVybiBTdW1UeXBlLm1ha2VEZXNlcmlhbGl6ZXIodHksIHR5cGVzcGFjZSkocmVhZGVyKTtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi9vcHRpb24udHNcbnZhciBPcHRpb24gPSB7XG4gIGdldEFsZ2VicmFpY1R5cGUoaW5uZXJUeXBlKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuU3VtKHtcbiAgICAgIHZhcmlhbnRzOiBbXG4gICAgICAgIHsgbmFtZTogXCJzb21lXCIsIGFsZ2VicmFpY1R5cGU6IGlubmVyVHlwZSB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJub25lXCIsXG4gICAgICAgICAgYWxnZWJyYWljVHlwZTogQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHsgZWxlbWVudHM6IFtdIH0pXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi9yZXN1bHQudHNcbnZhciBSZXN1bHQgPSB7XG4gIGdldEFsZ2VicmFpY1R5cGUob2tUeXBlLCBlcnJUeXBlKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuU3VtKHtcbiAgICAgIHZhcmlhbnRzOiBbXG4gICAgICAgIHsgbmFtZTogXCJva1wiLCBhbGdlYnJhaWNUeXBlOiBva1R5cGUgfSxcbiAgICAgICAgeyBuYW1lOiBcImVyclwiLCBhbGdlYnJhaWNUeXBlOiBlcnJUeXBlIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi9zY2hlZHVsZV9hdC50c1xudmFyIFNjaGVkdWxlQXQgPSB7XG4gIGludGVydmFsKHZhbHVlKSB7XG4gICAgcmV0dXJuIEludGVydmFsKHZhbHVlKTtcbiAgfSxcbiAgdGltZSh2YWx1ZSkge1xuICAgIHJldHVybiBUaW1lKHZhbHVlKTtcbiAgfSxcbiAgZ2V0QWxnZWJyYWljVHlwZSgpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZS5TdW0oe1xuICAgICAgdmFyaWFudHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiSW50ZXJ2YWxcIixcbiAgICAgICAgICBhbGdlYnJhaWNUeXBlOiBUaW1lRHVyYXRpb24uZ2V0QWxnZWJyYWljVHlwZSgpXG4gICAgICAgIH0sXG4gICAgICAgIHsgbmFtZTogXCJUaW1lXCIsIGFsZ2VicmFpY1R5cGU6IFRpbWVzdGFtcC5nZXRBbGdlYnJhaWNUeXBlKCkgfVxuICAgICAgXVxuICAgIH0pO1xuICB9LFxuICBpc1NjaGVkdWxlQXQoYWxnZWJyYWljVHlwZSkge1xuICAgIGlmIChhbGdlYnJhaWNUeXBlLnRhZyAhPT0gXCJTdW1cIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB2YXJpYW50cyA9IGFsZ2VicmFpY1R5cGUudmFsdWUudmFyaWFudHM7XG4gICAgaWYgKHZhcmlhbnRzLmxlbmd0aCAhPT0gMikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpbnRlcnZhbFZhcmlhbnQgPSB2YXJpYW50cy5maW5kKCh2KSA9PiB2Lm5hbWUgPT09IFwiSW50ZXJ2YWxcIik7XG4gICAgY29uc3QgdGltZVZhcmlhbnQgPSB2YXJpYW50cy5maW5kKCh2KSA9PiB2Lm5hbWUgPT09IFwiVGltZVwiKTtcbiAgICBpZiAoIWludGVydmFsVmFyaWFudCB8fCAhdGltZVZhcmlhbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIFRpbWVEdXJhdGlvbi5pc1RpbWVEdXJhdGlvbihpbnRlcnZhbFZhcmlhbnQuYWxnZWJyYWljVHlwZSkgJiYgVGltZXN0YW1wLmlzVGltZXN0YW1wKHRpbWVWYXJpYW50LmFsZ2VicmFpY1R5cGUpO1xuICB9XG59O1xudmFyIEludGVydmFsID0gKG1pY3JvcykgPT4gKHtcbiAgdGFnOiBcIkludGVydmFsXCIsXG4gIHZhbHVlOiBuZXcgVGltZUR1cmF0aW9uKG1pY3Jvcylcbn0pO1xudmFyIFRpbWUgPSAobWljcm9zU2luY2VVbml4RXBvY2gpID0+ICh7XG4gIHRhZzogXCJUaW1lXCIsXG4gIHZhbHVlOiBuZXcgVGltZXN0YW1wKG1pY3Jvc1NpbmNlVW5peEVwb2NoKVxufSk7XG52YXIgc2NoZWR1bGVfYXRfZGVmYXVsdCA9IFNjaGVkdWxlQXQ7XG5cbi8vIHNyYy9saWIvdHlwZV91dGlsLnRzXG5mdW5jdGlvbiBzZXQoeCwgdDIpIHtcbiAgcmV0dXJuIHsgLi4ueCwgLi4udDIgfTtcbn1cblxuLy8gc3JjL2xpYi90eXBlX2J1aWxkZXJzLnRzXG52YXIgVHlwZUJ1aWxkZXIgPSBjbGFzcyB7XG4gIC8qKlxuICAgKiBUaGUgVHlwZVNjcmlwdCBwaGFudG9tIHR5cGUuIFRoaXMgaXMgbm90IHN0b3JlZCBhdCBydW50aW1lLFxuICAgKiBidXQgaXMgdmlzaWJsZSB0byB0aGUgY29tcGlsZXJcbiAgICovXG4gIHR5cGU7XG4gIC8qKlxuICAgKiBUaGUgU3BhY2V0aW1lREIgYWxnZWJyYWljIHR5cGUgKHJ1buKAkXRpbWUgdmFsdWUpLiBJbiBhZGRpdGlvbiB0byBzdG9yaW5nXG4gICAqIHRoZSBydW50aW1lIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBgQWxnZWJyYWljVHlwZWAsIGl0IGFsc28gY2FwdHVyZXNcbiAgICogdGhlIFR5cGVTY3JpcHQgdHlwZSBpbmZvcm1hdGlvbiBvZiB0aGUgYEFsZ2VicmFpY1R5cGVgLiBUaGF0IGlzIHRvIHNheVxuICAgKiB0aGUgdmFsdWUgaXMgbm90IG1lcmVseSBhbiBgQWxnZWJyYWljVHlwZWAsIGJ1dCBpcyBjb25zdHJ1Y3RlZCB0byBiZVxuICAgKiB0aGUgY29ycmVzcG9uZGluZyBjb25jcmV0ZSBgQWxnZWJyYWljVHlwZWAgZm9yIHRoZSBUeXBlU2NyaXB0IHR5cGUgYFR5cGVgLlxuICAgKlxuICAgKiBlLmcuIGBzdHJpbmdgIGNvcnJlc3BvbmRzIHRvIGBBbGdlYnJhaWNUeXBlLlN0cmluZ2BcbiAgICovXG4gIGFsZ2VicmFpY1R5cGU7XG4gIGNvbnN0cnVjdG9yKGFsZ2VicmFpY1R5cGUpIHtcbiAgICB0aGlzLmFsZ2VicmFpY1R5cGUgPSBhbGdlYnJhaWNUeXBlO1xuICB9XG4gIG9wdGlvbmFsKCkge1xuICAgIHJldHVybiBuZXcgT3B0aW9uQnVpbGRlcih0aGlzKTtcbiAgfVxuICBzZXJpYWxpemUod3JpdGVyLCB2YWx1ZSkge1xuICAgIGNvbnN0IHNlcmlhbGl6ZSA9IHRoaXMuc2VyaWFsaXplID0gQWxnZWJyYWljVHlwZS5tYWtlU2VyaWFsaXplcihcbiAgICAgIHRoaXMuYWxnZWJyYWljVHlwZVxuICAgICk7XG4gICAgc2VyaWFsaXplKHdyaXRlciwgdmFsdWUpO1xuICB9XG4gIGRlc2VyaWFsaXplKHJlYWRlcikge1xuICAgIGNvbnN0IGRlc2VyaWFsaXplID0gdGhpcy5kZXNlcmlhbGl6ZSA9IEFsZ2VicmFpY1R5cGUubWFrZURlc2VyaWFsaXplcihcbiAgICAgIHRoaXMuYWxnZWJyYWljVHlwZVxuICAgICk7XG4gICAgcmV0dXJuIGRlc2VyaWFsaXplKHJlYWRlcik7XG4gIH1cbn07XG52YXIgVThCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuVTgpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IFU4Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBVOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFU4Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFUxNkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5VMTYpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBVMTZDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBVMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFUzMkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5VMzIpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBVMzJDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBVMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFU2NEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5VNjQpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBVNjRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBVNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVTY0Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFUxMjhCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuVTEyOCk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBVMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBVMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBVMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFUxMjhDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgVTI1NkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5VMjU2KTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IFUyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IFUyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBVMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IFUyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBVMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVTI1NkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBJOEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5JOCk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBJOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgSThDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBJOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBJOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEk4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgSThDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgSTE2QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkkxNik7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEkxNkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KSk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IEkxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgSTMyQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkkzMik7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEkzMkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KSk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IEkzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgSTY0QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkk2NCk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBJNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEk2NENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KSk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IEk2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBJNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBJNjRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgSTEyOEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5JMTI4KTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IEkxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEkxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBJMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IEkxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgSTEyOENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBJMjU2QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkkyNTYpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IEkyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEkyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBJMjU2Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIEYzMkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5GMzIpO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEYzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEYzMkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBGNjRCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuRjY0KTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBGNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBGNjRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgQm9vbEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5Cb29sKTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBCb29sQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgQm9vbENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgU3RyaW5nQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLlN0cmluZyk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBTdHJpbmdDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IFN0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IFN0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFN0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFN0cmluZ0NvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBBcnJheUJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgZWxlbWVudDtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuQXJyYXkoZWxlbWVudC5hbGdlYnJhaWNUeXBlKSk7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBBcnJheUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEFycmF5Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIEJ5dGVBcnJheUJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5BcnJheShBbGdlYnJhaWNUeXBlLlU4KSk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgQnl0ZUFycmF5Q29sdW1uQnVpbGRlcihcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBCeXRlQXJyYXlDb2x1bW5CdWlsZGVyKHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgT3B0aW9uQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICB2YWx1ZTtcbiAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICBzdXBlcihPcHRpb24uZ2V0QWxnZWJyYWljVHlwZSh2YWx1ZS5hbGdlYnJhaWNUeXBlKSk7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IE9wdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IE9wdGlvbkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBQcm9kdWN0QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICB0eXBlTmFtZTtcbiAgZWxlbWVudHM7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRzLCBuYW1lKSB7XG4gICAgZnVuY3Rpb24gZWxlbWVudHNBcnJheUZyb21FbGVtZW50c09iaihvYmopIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcCgoa2V5KSA9PiAoe1xuICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgIC8vIExhemlseSByZXNvbHZlIHRoZSB1bmRlcmx5aW5nIG9iamVjdCdzIGFsZ2VicmFpY1R5cGUuXG4gICAgICAgIC8vIFRoaXMgd2lsbCBjYWxsIG9ialtrZXldLmFsZ2VicmFpY1R5cGUgb25seSB3aGVuIHNvbWVvbmVcbiAgICAgICAgLy8gYWN0dWFsbHkgcmVhZHMgdGhpcyBwcm9wZXJ0eS5cbiAgICAgICAgZ2V0IGFsZ2VicmFpY1R5cGUoKSB7XG4gICAgICAgICAgcmV0dXJuIG9ialtrZXldLmFsZ2VicmFpY1R5cGU7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9XG4gICAgc3VwZXIoXG4gICAgICBBbGdlYnJhaWNUeXBlLlByb2R1Y3Qoe1xuICAgICAgICBlbGVtZW50czogZWxlbWVudHNBcnJheUZyb21FbGVtZW50c09iaihlbGVtZW50cylcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnR5cGVOYW1lID0gbmFtZTtcbiAgICB0aGlzLmVsZW1lbnRzID0gZWxlbWVudHM7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgUHJvZHVjdENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb2R1Y3RDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgUmVzdWx0QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBvaztcbiAgZXJyO1xuICBjb25zdHJ1Y3RvcihvaywgZXJyKSB7XG4gICAgc3VwZXIoUmVzdWx0LmdldEFsZ2VicmFpY1R5cGUob2suYWxnZWJyYWljVHlwZSwgZXJyLmFsZ2VicmFpY1R5cGUpKTtcbiAgICB0aGlzLm9rID0gb2s7XG4gICAgdGhpcy5lcnIgPSBlcnI7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgUmVzdWx0Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSkpO1xuICB9XG59O1xudmFyIFVuaXRCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHsgdGFnOiBcIlByb2R1Y3RcIiwgdmFsdWU6IHsgZWxlbWVudHM6IFtdIH0gfSk7XG4gIH1cbn07XG52YXIgUm93QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICByb3c7XG4gIHR5cGVOYW1lO1xuICBjb25zdHJ1Y3Rvcihyb3csIG5hbWUpIHtcbiAgICBjb25zdCBtYXBwZWRSb3cgPSBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICBPYmplY3QuZW50cmllcyhyb3cpLm1hcCgoW2NvbE5hbWUsIGJ1aWxkZXJdKSA9PiBbXG4gICAgICAgIGNvbE5hbWUsXG4gICAgICAgIGJ1aWxkZXIgaW5zdGFuY2VvZiBDb2x1bW5CdWlsZGVyID8gYnVpbGRlciA6IG5ldyBDb2x1bW5CdWlsZGVyKGJ1aWxkZXIsIHt9KVxuICAgICAgXSlcbiAgICApO1xuICAgIGNvbnN0IGVsZW1lbnRzID0gT2JqZWN0LmtleXMobWFwcGVkUm93KS5tYXAoKG5hbWUyKSA9PiAoe1xuICAgICAgbmFtZTogbmFtZTIsXG4gICAgICBnZXQgYWxnZWJyYWljVHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIG1hcHBlZFJvd1tuYW1lMl0udHlwZUJ1aWxkZXIuYWxnZWJyYWljVHlwZTtcbiAgICAgIH1cbiAgICB9KSk7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHsgZWxlbWVudHMgfSkpO1xuICAgIHRoaXMucm93ID0gbWFwcGVkUm93O1xuICAgIHRoaXMudHlwZU5hbWUgPSBuYW1lO1xuICB9XG59O1xudmFyIFN1bUJ1aWxkZXJJbXBsID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIHZhcmlhbnRzO1xuICB0eXBlTmFtZTtcbiAgY29uc3RydWN0b3IodmFyaWFudHMsIG5hbWUpIHtcbiAgICBmdW5jdGlvbiB2YXJpYW50c0FycmF5RnJvbVZhcmlhbnRzT2JqKHZhcmlhbnRzMikge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhcmlhbnRzMikubWFwKChrZXkpID0+ICh7XG4gICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgLy8gTGF6aWx5IHJlc29sdmUgdGhlIHVuZGVybHlpbmcgb2JqZWN0J3MgYWxnZWJyYWljVHlwZS5cbiAgICAgICAgLy8gVGhpcyB3aWxsIGNhbGwgb2JqW2tleV0uYWxnZWJyYWljVHlwZSBvbmx5IHdoZW4gc29tZW9uZVxuICAgICAgICAvLyBhY3R1YWxseSByZWFkcyB0aGlzIHByb3BlcnR5LlxuICAgICAgICBnZXQgYWxnZWJyYWljVHlwZSgpIHtcbiAgICAgICAgICByZXR1cm4gdmFyaWFudHMyW2tleV0uYWxnZWJyYWljVHlwZTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH1cbiAgICBzdXBlcihcbiAgICAgIEFsZ2VicmFpY1R5cGUuU3VtKHtcbiAgICAgICAgdmFyaWFudHM6IHZhcmlhbnRzQXJyYXlGcm9tVmFyaWFudHNPYmoodmFyaWFudHMpXG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy52YXJpYW50cyA9IHZhcmlhbnRzO1xuICAgIHRoaXMudHlwZU5hbWUgPSBuYW1lO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHZhcmlhbnRzKSkge1xuICAgICAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFyaWFudHMsIGtleSk7XG4gICAgICBjb25zdCBpc0FjY2Vzc29yID0gISFkZXNjICYmICh0eXBlb2YgZGVzYy5nZXQgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgZGVzYy5zZXQgPT09IFwiZnVuY3Rpb25cIik7XG4gICAgICBsZXQgaXNVbml0MiA9IGZhbHNlO1xuICAgICAgaWYgKCFpc0FjY2Vzc29yKSB7XG4gICAgICAgIGNvbnN0IHZhcmlhbnQgPSB2YXJpYW50c1trZXldO1xuICAgICAgICBpc1VuaXQyID0gdmFyaWFudCBpbnN0YW5jZW9mIFVuaXRCdWlsZGVyO1xuICAgICAgfVxuICAgICAgaWYgKGlzVW5pdDIpIHtcbiAgICAgICAgY29uc3QgY29uc3RhbnQgPSB0aGlzLmNyZWF0ZShrZXkpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCB7XG4gICAgICAgICAgdmFsdWU6IGNvbnN0YW50LFxuICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmbiA9ICgodmFsdWUpID0+IHRoaXMuY3JlYXRlKGtleSwgdmFsdWUpKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwge1xuICAgICAgICAgIHZhbHVlOiBmbixcbiAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjcmVhdGUodGFnLCB2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdm9pZCAwID8geyB0YWcgfSA6IHsgdGFnLCB2YWx1ZSB9O1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFN1bUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFN1bUNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBTdW1CdWlsZGVyID0gU3VtQnVpbGRlckltcGw7XG52YXIgU2ltcGxlU3VtQnVpbGRlckltcGwgPSBjbGFzcyBleHRlbmRzIFN1bUJ1aWxkZXJJbXBsIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBTaW1wbGVTdW1Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBTaW1wbGVTdW1Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBTaW1wbGVTdW1CdWlsZGVyID0gU2ltcGxlU3VtQnVpbGRlckltcGw7XG52YXIgU2NoZWR1bGVBdEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoc2NoZWR1bGVfYXRfZGVmYXVsdC5nZXRBbGdlYnJhaWNUeXBlKCkpO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFNjaGVkdWxlQXRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBTY2hlZHVsZUF0Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIElkZW50aXR5QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihJZGVudGl0eS5nZXRBbGdlYnJhaWNUeXBlKCkpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IElkZW50aXR5Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJZGVudGl0eUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IElkZW50aXR5Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIENvbm5lY3Rpb25JZEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQ29ubmVjdGlvbklkLmdldEFsZ2VicmFpY1R5cGUoKSk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgVGltZXN0YW1wQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihUaW1lc3RhbXAuZ2V0QWxnZWJyYWljVHlwZSgpKTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBUaW1lRHVyYXRpb25CdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFRpbWVEdXJhdGlvbi5nZXRBbGdlYnJhaWNUeXBlKCkpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFV1aWRCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFV1aWQuZ2V0QWxnZWJyYWljVHlwZSgpKTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IFV1aWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IFV1aWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBVdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IFV1aWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBVdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVXVpZENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBkZWZhdWx0TWV0YWRhdGEgPSB7fTtcbnZhciBDb2x1bW5CdWlsZGVyID0gY2xhc3Mge1xuICB0eXBlQnVpbGRlcjtcbiAgY29sdW1uTWV0YWRhdGE7XG4gIGNvbnN0cnVjdG9yKHR5cGVCdWlsZGVyLCBtZXRhZGF0YSkge1xuICAgIHRoaXMudHlwZUJ1aWxkZXIgPSB0eXBlQnVpbGRlcjtcbiAgICB0aGlzLmNvbHVtbk1ldGFkYXRhID0gbWV0YWRhdGE7XG4gIH1cbiAgc2VyaWFsaXplKHdyaXRlciwgdmFsdWUpIHtcbiAgICB0aGlzLnR5cGVCdWlsZGVyLnNlcmlhbGl6ZSh3cml0ZXIsIHZhbHVlKTtcbiAgfVxuICBkZXNlcmlhbGl6ZShyZWFkZXIpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlQnVpbGRlci5kZXNlcmlhbGl6ZShyZWFkZXIpO1xuICB9XG59O1xudmFyIFU4Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9VOENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX1U4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1U4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFUxNkNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfVTE2Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9VMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9VMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9VMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1UxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1UxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgVTMyQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9VMzJDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX1UzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9VMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX1UzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX1UzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBVNjRDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1U2NENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX1U2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9VNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9VNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFUxMjhDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1UxMjhDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX1UxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX1UxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1UxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9VMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBVMjU2Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9VMjU2Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9VMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX1UyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX1UyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9VMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9VMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfVTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgSThDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0k4Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9JOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9JOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfSThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9JOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfSThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9JOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgSTE2Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9JMTZDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX0kxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9JMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX0kxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX0kxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfSTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfSTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBJMzJDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0kzMkNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfSTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX0kzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9JMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9JMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIEk2NENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfSTY0Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9JNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9JNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9JNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0k2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0k2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgSTEyOENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfSTEyOENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfSTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9JMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9JMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfSTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0kxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIEkyNTZDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0kyNTZDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX0kyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX0kyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0kyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9JMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBGMzJDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0YzMkNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0YzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0YzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgRjY0Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9GNjRDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9GNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9GNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIEJvb2xDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0Jvb2xDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX0Jvb2xDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfQm9vbENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfQm9vbENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfQm9vbENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0Jvb2xDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFN0cmluZ0NvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfU3RyaW5nQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9TdHJpbmdDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfU3RyaW5nQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9TdHJpbmdDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1N0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1N0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgQXJyYXlDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0FycmF5Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfQXJyYXlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9BcnJheUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgQnl0ZUFycmF5Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9CeXRlQXJyYXlDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKG1ldGFkYXRhKSB7XG4gICAgc3VwZXIobmV3IFR5cGVCdWlsZGVyKEFsZ2VicmFpY1R5cGUuQXJyYXkoQWxnZWJyYWljVHlwZS5VOCkpLCBtZXRhZGF0YSk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0J5dGVBcnJheUNvbHVtbkJ1aWxkZXIoXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9CeXRlQXJyYXlDb2x1bW5CdWlsZGVyKHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIE9wdGlvbkNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfT3B0aW9uQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfT3B0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfT3B0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBSZXN1bHRDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1Jlc3VsdENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgY29uc3RydWN0b3IodHlwZUJ1aWxkZXIsIG1ldGFkYXRhKSB7XG4gICAgc3VwZXIodHlwZUJ1aWxkZXIsIG1ldGFkYXRhKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfUmVzdWx0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgUHJvZHVjdENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfUHJvZHVjdENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1Byb2R1Y3RDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1Byb2R1Y3RDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFN1bUNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfU3VtQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfU3VtQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9TdW1Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFNpbXBsZVN1bUNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfU2ltcGxlU3VtQ29sdW1uQnVpbGRlciBleHRlbmRzIFN1bUNvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9TaW1wbGVTdW1Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX1NpbXBsZVN1bUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBTY2hlZHVsZUF0Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9TY2hlZHVsZUF0Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfU2NoZWR1bGVBdENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfU2NoZWR1bGVBdENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgSWRlbnRpdHlDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0lkZW50aXR5Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9JZGVudGl0eUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9JZGVudGl0eUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0lkZW50aXR5Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9JZGVudGl0eUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9Db25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX0Nvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9Db25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX0Nvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9Db25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfVGltZXN0YW1wQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9UaW1lc3RhbXBDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9UaW1lc3RhbXBDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1RpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBUaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyID0gY2xhc3MgX1RpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX1RpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9UaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1RpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgVXVpZENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfVXVpZENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfVXVpZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9VdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9VdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9VdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9VdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBSZWZCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIHJlZjtcbiAgLyoqIFRoZSBwaGFudG9tIHR5cGUgb2YgdGhlIHBvaW50ZWUgb2YgdGhpcyByZWYuICovXG4gIF9fc3BhY2V0aW1lVHlwZTtcbiAgY29uc3RydWN0b3IocmVmKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5SZWYocmVmKSk7XG4gICAgdGhpcy5yZWYgPSByZWY7XG4gIH1cbn07XG52YXIgZW51bUltcGwgPSAoKG5hbWVPck9iaiwgbWF5YmVPYmopID0+IHtcbiAgbGV0IG9iaiA9IG5hbWVPck9iajtcbiAgbGV0IG5hbWUgPSB2b2lkIDA7XG4gIGlmICh0eXBlb2YgbmFtZU9yT2JqID09PSBcInN0cmluZ1wiKSB7XG4gICAgaWYgKCFtYXliZU9iaikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgXCJXaGVuIHByb3ZpZGluZyBhIG5hbWUsIHlvdSBtdXN0IGFsc28gcHJvdmlkZSB0aGUgdmFyaWFudHMgb2JqZWN0IG9yIGFycmF5LlwiXG4gICAgICApO1xuICAgIH1cbiAgICBvYmogPSBtYXliZU9iajtcbiAgICBuYW1lID0gbmFtZU9yT2JqO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICBjb25zdCBzaW1wbGVWYXJpYW50c09iaiA9IHt9O1xuICAgIGZvciAoY29uc3QgdmFyaWFudCBvZiBvYmopIHtcbiAgICAgIHNpbXBsZVZhcmlhbnRzT2JqW3ZhcmlhbnRdID0gbmV3IFVuaXRCdWlsZGVyKCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU2ltcGxlU3VtQnVpbGRlckltcGwoc2ltcGxlVmFyaWFudHNPYmosIG5hbWUpO1xuICB9XG4gIHJldHVybiBuZXcgU3VtQnVpbGRlcihvYmosIG5hbWUpO1xufSk7XG52YXIgdCA9IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYEJvb2xgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBib29sZWFuYCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgQm9vbEJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBib29sOiAoKSA9PiBuZXcgQm9vbEJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYFN0cmluZ2Age0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYHN0cmluZ2AgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFN0cmluZ0J1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBzdHJpbmc6ICgpID0+IG5ldyBTdHJpbmdCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBGNjRgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBGNjRCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgbnVtYmVyOiAoKSA9PiBuZXcgRjY0QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgSThgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBJOEJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBpODogKCkgPT4gbmV3IEk4QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgVThgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBVOEJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICB1ODogKCkgPT4gbmV3IFU4QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgSTE2YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgbnVtYmVyYCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgSTE2QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIGkxNjogKCkgPT4gbmV3IEkxNkJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYFUxNmAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYG51bWJlcmAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFUxNkJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICB1MTY6ICgpID0+IG5ldyBVMTZCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBJMzJgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBJMzJCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgaTMyOiAoKSA9PiBuZXcgSTMyQnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgVTMyYCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgbnVtYmVyYCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVTMyQnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIHUzMjogKCkgPT4gbmV3IFUzMkJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYEk2NGAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYGJpZ2ludGAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEk2NEJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBpNjQ6ICgpID0+IG5ldyBJNjRCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBVNjRgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBiaWdpbnRgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBVNjRCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgdTY0OiAoKSA9PiBuZXcgVTY0QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgSTEyOGAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYGJpZ2ludGAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEkxMjhCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgaTEyODogKCkgPT4gbmV3IEkxMjhCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBVMTI4YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgYmlnaW50YCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVTEyOEJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICB1MTI4OiAoKSA9PiBuZXcgVTEyOEJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYEkyNTZgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBiaWdpbnRgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBJMjU2QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIGkyNTY6ICgpID0+IG5ldyBJMjU2QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgVTI1NmAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYGJpZ2ludGAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFUyNTZCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgdTI1NjogKCkgPT4gbmV3IFUyNTZCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBGMzJgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBGMzJCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgZjMyOiAoKSA9PiBuZXcgRjMyQnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgRjY0YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgbnVtYmVyYCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgRjY0QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIGY2NDogKCkgPT4gbmV3IEY2NEJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYFByb2R1Y3RgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zLiBQcm9kdWN0IHR5cGVzIGluIFNwYWNldGltZURCXG4gICAqIGFyZSBlc3NlbnRpYWxseSB0aGUgc2FtZSBhcyBvYmplY3RzIGluIEphdmFTY3JpcHQvVHlwZVNjcmlwdC5cbiAgICogUHJvcGVydGllcyBvZiB0aGUgb2JqZWN0IG11c3QgYWxzbyBiZSB7QGxpbmsgVHlwZUJ1aWxkZXJ9cy5cbiAgICogUmVwcmVzZW50ZWQgYXMgYW4gb2JqZWN0IHdpdGggc3BlY2lmaWMgcHJvcGVydGllcyBpbiBUeXBlU2NyaXB0LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSAob3B0aW9uYWwpIEEgZGlzcGxheSBuYW1lIGZvciB0aGUgcHJvZHVjdCB0eXBlLiBJZiBvbWl0dGVkLCBhbiBhbm9ueW1vdXMgcHJvZHVjdCB0eXBlIGlzIGNyZWF0ZWQuXG4gICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCBkZWZpbmluZyB0aGUgcHJvcGVydGllcyBvZiB0aGUgdHlwZSwgd2hvc2UgcHJvcGVydHlcbiAgICogdmFsdWVzIG11c3QgYmUge0BsaW5rIFR5cGVCdWlsZGVyfXMuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBQcm9kdWN0QnVpbGRlcn0gaW5zdGFuY2UuXG4gICAqL1xuICBvYmplY3Q6ICgobmFtZU9yT2JqLCBtYXliZU9iaikgPT4ge1xuICAgIGlmICh0eXBlb2YgbmFtZU9yT2JqID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBpZiAoIW1heWJlT2JqKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJXaGVuIHByb3ZpZGluZyBhIG5hbWUsIHlvdSBtdXN0IGFsc28gcHJvdmlkZSB0aGUgb2JqZWN0LlwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFByb2R1Y3RCdWlsZGVyKG1heWJlT2JqLCBuYW1lT3JPYmopO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb2R1Y3RCdWlsZGVyKG5hbWVPck9iaiwgdm9pZCAwKTtcbiAgfSksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBSb3dgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zLiBSb3cgdHlwZXMgaW4gU3BhY2V0aW1lREJcbiAgICogYXJlIHNpbWlsYXIgdG8gYFByb2R1Y3RgIHR5cGVzLCBidXQgYXJlIHNwZWNpZmljYWxseSB1c2VkIHRvIGRlZmluZSB0aGUgc2NoZW1hIG9mIGEgdGFibGUgcm93LlxuICAgKiBQcm9wZXJ0aWVzIG9mIHRoZSBvYmplY3QgbXVzdCBhbHNvIGJlIHtAbGluayBUeXBlQnVpbGRlcn0gb3Ige0BsaW5rIENvbHVtbkJ1aWxkZXJ9cy5cbiAgICpcbiAgICogWW91IGNhbiByZXByZXNlbnQgYSBgUm93YCBhcyBlaXRoZXIgYSB7QGxpbmsgUm93T2JqfSBvciBhbiB7QGxpbmsgUm93QnVpbGRlcn0gdHlwZSB3aGVuXG4gICAqIGRlZmluaW5nIGEgdGFibGUgc2NoZW1hLlxuICAgKlxuICAgKiBUaGUge0BsaW5rIFJvd0J1aWxkZXJ9IHR5cGUgaXMgdXNlZnVsIHdoZW4geW91IHdhbnQgdG8gY3JlYXRlIGEgdHlwZSB3aGljaCBjYW4gYmUgdXNlZCBhbnl3aGVyZVxuICAgKiBhIHtAbGluayBUeXBlQnVpbGRlcn0gaXMgYWNjZXB0ZWQsIHN1Y2ggYXMgaW4gbmVzdGVkIG9iamVjdHMgb3IgYXJyYXlzLCBvciBhcyB0aGUgYXJndW1lbnRcbiAgICogdG8gYSBzY2hlZHVsZWQgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCBkZWZpbmluZyB0aGUgcHJvcGVydGllcyBvZiB0aGUgcm93LCB3aG9zZSBwcm9wZXJ0eVxuICAgKiB2YWx1ZXMgbXVzdCBiZSB7QGxpbmsgVHlwZUJ1aWxkZXJ9cyBvciB7QGxpbmsgQ29sdW1uQnVpbGRlcn1zLlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgUm93QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIHJvdzogKChuYW1lT3JPYmosIG1heWJlT2JqKSA9PiB7XG4gICAgY29uc3QgW29iaiwgbmFtZV0gPSB0eXBlb2YgbmFtZU9yT2JqID09PSBcInN0cmluZ1wiID8gW21heWJlT2JqLCBuYW1lT3JPYmpdIDogW25hbWVPck9iaiwgdm9pZCAwXTtcbiAgICByZXR1cm4gbmV3IFJvd0J1aWxkZXIob2JqLCBuYW1lKTtcbiAgfSksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBBcnJheWAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnMuXG4gICAqIFJlcHJlc2VudGVkIGFzIGFuIGFycmF5IGluIFR5cGVTY3JpcHQuXG4gICAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IHR5cGUgb2YgdGhlIGFycmF5LCB3aGljaCBtdXN0IGJlIGEgYFR5cGVCdWlsZGVyYC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEFycmF5QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIGFycmF5KGUpIHtcbiAgICByZXR1cm4gbmV3IEFycmF5QnVpbGRlcihlKTtcbiAgfSxcbiAgZW51bTogZW51bUltcGwsXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgc3BlY2lhbCBoZWxwZXIgZnVuY3Rpb24gZm9yIGNvbnZlbmllbnRseSBjcmVhdGluZyBgUHJvZHVjdGAgdHlwZSBjb2x1bW5zIHdpdGggbm8gZmllbGRzLlxuICAgKlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgUHJvZHVjdEJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggbm8gZmllbGRzLlxuICAgKi9cbiAgdW5pdCgpIHtcbiAgICByZXR1cm4gbmV3IFVuaXRCdWlsZGVyKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbGF6aWx5LWV2YWx1YXRlZCB7QGxpbmsgVHlwZUJ1aWxkZXJ9LiBUaGlzIGlzIHVzZWZ1bCBmb3IgY3JlYXRpbmdcbiAgICogcmVjdXJzaXZlIHR5cGVzLCBzdWNoIGFzIGEgdHJlZSBvciBsaW5rZWQgbGlzdC5cbiAgICogQHBhcmFtIHRodW5rIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEge0BsaW5rIFR5cGVCdWlsZGVyfS5cbiAgICogQHJldHVybnMgQSBwcm94eSB7QGxpbmsgVHlwZUJ1aWxkZXJ9IHRoYXQgZXZhbHVhdGVzIHRoZSB0aHVuayBvbiBmaXJzdCBhY2Nlc3MuXG4gICAqL1xuICBsYXp5KHRodW5rKSB7XG4gICAgbGV0IGNhY2hlZCA9IG51bGw7XG4gICAgY29uc3QgZ2V0ID0gKCkgPT4gY2FjaGVkID8/PSB0aHVuaygpO1xuICAgIGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KHt9LCB7XG4gICAgICBnZXQoX3QsIHByb3AsIHJlY3YpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZ2V0KCk7XG4gICAgICAgIGNvbnN0IHZhbCA9IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcCwgcmVjdik7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcImZ1bmN0aW9uXCIgPyB2YWwuYmluZCh0YXJnZXQpIDogdmFsO1xuICAgICAgfSxcbiAgICAgIHNldChfdCwgcHJvcCwgdmFsdWUsIHJlY3YpIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3Quc2V0KGdldCgpLCBwcm9wLCB2YWx1ZSwgcmVjdik7XG4gICAgICB9LFxuICAgICAgaGFzKF90LCBwcm9wKSB7XG4gICAgICAgIHJldHVybiBwcm9wIGluIGdldCgpO1xuICAgICAgfSxcbiAgICAgIG93bktleXMoKSB7XG4gICAgICAgIHJldHVybiBSZWZsZWN0Lm93bktleXMoZ2V0KCkpO1xuICAgICAgfSxcbiAgICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihfdCwgcHJvcCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihnZXQoKSwgcHJvcCk7XG4gICAgICB9LFxuICAgICAgZ2V0UHJvdG90eXBlT2YoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2V0KCkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwcm94eTtcbiAgfSxcbiAgLyoqXG4gICAqIFRoaXMgaXMgYSBzcGVjaWFsIGhlbHBlciBmdW5jdGlvbiBmb3IgY29udmVuaWVudGx5IGNyZWF0aW5nIHtAbGluayBTY2hlZHVsZUF0fSB0eXBlIGNvbHVtbnMuXG4gICAqIEByZXR1cm5zIEEgbmV3IENvbHVtbkJ1aWxkZXIgaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIFNjaGVkdWxlQXR9IHR5cGUuXG4gICAqL1xuICBzY2hlZHVsZUF0OiAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBTY2hlZHVsZUF0QnVpbGRlcigpO1xuICB9LFxuICAvKipcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIE9wdGlvbn0gdHlwZS5cbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gZW51bSB3aXRoIGEgYHNvbWVgIGFuZCBgbm9uZWAgdmFyaWFudC5cbiAgICogQHBhcmFtIHZhbHVlIFRoZSB0eXBlIG9mIHRoZSB2YWx1ZSBjb250YWluZWQgaW4gdGhlIGBzb21lYCB2YXJpYW50IG9mIHRoZSBgT3B0aW9uYC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIE9wdGlvbkJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggdGhlIHtAbGluayBPcHRpb259IHR5cGUuXG4gICAqL1xuICBvcHRpb24odmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IE9wdGlvbkJ1aWxkZXIodmFsdWUpO1xuICB9LFxuICAvKipcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIFJlc3VsdH0gdHlwZS5cbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gZW51bSB3aXRoIGFuIGBva2AgYW5kIGBlcnJgIHZhcmlhbnQuXG4gICAqIEBwYXJhbSBvayBUaGUgdHlwZSBvZiB0aGUgdmFsdWUgY29udGFpbmVkIGluIHRoZSBgb2tgIHZhcmlhbnQgb2YgdGhlIGBSZXN1bHRgLlxuICAgKiBAcGFyYW0gZXJyIFRoZSB0eXBlIG9mIHRoZSB2YWx1ZSBjb250YWluZWQgaW4gdGhlIGBlcnJgIHZhcmlhbnQgb2YgdGhlIGBSZXN1bHRgLlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgUmVzdWx0QnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIFJlc3VsdH0gdHlwZS5cbiAgICovXG4gIHJlc3VsdChvaywgZXJyKSB7XG4gICAgcmV0dXJuIG5ldyBSZXN1bHRCdWlsZGVyKG9rLCBlcnIpO1xuICB9LFxuICAvKipcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIElkZW50aXR5fSB0eXBlLlxuICAgKiBZb3UgY2FuIGNyZWF0ZSBhIGNvbHVtbiBvZiB0aGUgc2FtZSB0eXBlIGJ5IGNvbnN0cnVjdGluZyBhbiBgb2JqZWN0YCB3aXRoIGEgc2luZ2xlIGBfX2lkZW50aXR5X19gIGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBUeXBlQnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIElkZW50aXR5fSB0eXBlLlxuICAgKi9cbiAgaWRlbnRpdHk6ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IElkZW50aXR5QnVpbGRlcigpO1xuICB9LFxuICAvKipcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIENvbm5lY3Rpb25JZH0gdHlwZS5cbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gYG9iamVjdGAgd2l0aCBhIHNpbmdsZSBgX19jb25uZWN0aW9uX2lkX19gIGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBUeXBlQnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIENvbm5lY3Rpb25JZH0gdHlwZS5cbiAgICovXG4gIGNvbm5lY3Rpb25JZDogKCkgPT4ge1xuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbklkQnVpbGRlcigpO1xuICB9LFxuICAvKipcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIFRpbWVzdGFtcH0gdHlwZS5cbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gYG9iamVjdGAgd2l0aCBhIHNpbmdsZSBgX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfX2AgZWxlbWVudC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFR5cGVCdWlsZGVyfSBpbnN0YW5jZSB3aXRoIHRoZSB7QGxpbmsgVGltZXN0YW1wfSB0eXBlLlxuICAgKi9cbiAgdGltZXN0YW1wOiAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBUaW1lc3RhbXBCdWlsZGVyKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgY29udmVuaWVuY2UgbWV0aG9kIGZvciBjcmVhdGluZyBhIGNvbHVtbiB3aXRoIHRoZSB7QGxpbmsgVGltZUR1cmF0aW9ufSB0eXBlLlxuICAgKiBZb3UgY2FuIGNyZWF0ZSBhIGNvbHVtbiBvZiB0aGUgc2FtZSB0eXBlIGJ5IGNvbnN0cnVjdGluZyBhbiBgb2JqZWN0YCB3aXRoIGEgc2luZ2xlIGBfX3RpbWVfZHVyYXRpb25fbWljcm9zX19gIGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBUeXBlQnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIFRpbWVEdXJhdGlvbn0gdHlwZS5cbiAgICovXG4gIHRpbWVEdXJhdGlvbjogKCkgPT4ge1xuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uQnVpbGRlcigpO1xuICB9LFxuICAvKipcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIFV1aWR9IHR5cGUuXG4gICAqIFlvdSBjYW4gY3JlYXRlIGEgY29sdW1uIG9mIHRoZSBzYW1lIHR5cGUgYnkgY29uc3RydWN0aW5nIGFuIGBvYmplY3RgIHdpdGggYSBzaW5nbGUgYF9fdXVpZF9fYCBlbGVtZW50LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVHlwZUJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggdGhlIHtAbGluayBVdWlkfSB0eXBlLlxuICAgKi9cbiAgdXVpZDogKCkgPT4ge1xuICAgIHJldHVybiBuZXcgVXVpZEJ1aWxkZXIoKTtcbiAgfSxcbiAgLyoqXG4gICAqIFRoaXMgaXMgYSBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNyZWF0aW5nIGEgY29sdW1uIHdpdGggdGhlIGBCeXRlQXJyYXlgIHR5cGUuXG4gICAqIFlvdSBjYW4gY3JlYXRlIGEgY29sdW1uIG9mIHRoZSBzYW1lIHR5cGUgYnkgY29uc3RydWN0aW5nIGFuIGBhcnJheWAgb2YgYHU4YC5cbiAgICogVGhlIFR5cGVTY3JpcHQgcmVwcmVzZW50YXRpb24gaXMge0BsaW5rIFVpbnQ4QXJyYXl9LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgQnl0ZUFycmF5QnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCB0aGUgYEJ5dGVBcnJheWAgdHlwZS5cbiAgICovXG4gIGJ5dGVBcnJheTogKCkgPT4ge1xuICAgIHJldHVybiBuZXcgQnl0ZUFycmF5QnVpbGRlcigpO1xuICB9XG59O1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vdHlwZXMudHNcbnZhciBBbGdlYnJhaWNUeXBlMiA9IHQuZW51bShcIkFsZ2VicmFpY1R5cGVcIiwge1xuICBSZWY6IHQudTMyKCksXG4gIGdldCBTdW0oKSB7XG4gICAgcmV0dXJuIFN1bVR5cGUyO1xuICB9LFxuICBnZXQgUHJvZHVjdCgpIHtcbiAgICByZXR1cm4gUHJvZHVjdFR5cGUyO1xuICB9LFxuICBnZXQgQXJyYXkoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUyO1xuICB9LFxuICBTdHJpbmc6IHQudW5pdCgpLFxuICBCb29sOiB0LnVuaXQoKSxcbiAgSTg6IHQudW5pdCgpLFxuICBVODogdC51bml0KCksXG4gIEkxNjogdC51bml0KCksXG4gIFUxNjogdC51bml0KCksXG4gIEkzMjogdC51bml0KCksXG4gIFUzMjogdC51bml0KCksXG4gIEk2NDogdC51bml0KCksXG4gIFU2NDogdC51bml0KCksXG4gIEkxMjg6IHQudW5pdCgpLFxuICBVMTI4OiB0LnVuaXQoKSxcbiAgSTI1NjogdC51bml0KCksXG4gIFUyNTY6IHQudW5pdCgpLFxuICBGMzI6IHQudW5pdCgpLFxuICBGNjQ6IHQudW5pdCgpXG59KTtcbnZhciBDYXNlQ29udmVyc2lvblBvbGljeSA9IHQuZW51bShcIkNhc2VDb252ZXJzaW9uUG9saWN5XCIsIHtcbiAgTm9uZTogdC51bml0KCksXG4gIFNuYWtlQ2FzZTogdC51bml0KClcbn0pO1xudmFyIEV4cGxpY2l0TmFtZUVudHJ5ID0gdC5lbnVtKFwiRXhwbGljaXROYW1lRW50cnlcIiwge1xuICBnZXQgVGFibGUoKSB7XG4gICAgcmV0dXJuIE5hbWVNYXBwaW5nO1xuICB9LFxuICBnZXQgRnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIE5hbWVNYXBwaW5nO1xuICB9LFxuICBnZXQgSW5kZXgoKSB7XG4gICAgcmV0dXJuIE5hbWVNYXBwaW5nO1xuICB9XG59KTtcbnZhciBFeHBsaWNpdE5hbWVzID0gdC5vYmplY3QoXCJFeHBsaWNpdE5hbWVzXCIsIHtcbiAgZ2V0IGVudHJpZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoRXhwbGljaXROYW1lRW50cnkpO1xuICB9XG59KTtcbnZhciBGdW5jdGlvblZpc2liaWxpdHkgPSB0LmVudW0oXCJGdW5jdGlvblZpc2liaWxpdHlcIiwge1xuICBQcml2YXRlOiB0LnVuaXQoKSxcbiAgQ2xpZW50Q2FsbGFibGU6IHQudW5pdCgpXG59KTtcbnZhciBIdHRwSGVhZGVyUGFpciA9IHQub2JqZWN0KFwiSHR0cEhlYWRlclBhaXJcIiwge1xuICBuYW1lOiB0LnN0cmluZygpLFxuICB2YWx1ZTogdC5ieXRlQXJyYXkoKVxufSk7XG52YXIgSHR0cEhlYWRlcnMgPSB0Lm9iamVjdChcIkh0dHBIZWFkZXJzXCIsIHtcbiAgZ2V0IGVudHJpZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoSHR0cEhlYWRlclBhaXIpO1xuICB9XG59KTtcbnZhciBIdHRwTWV0aG9kID0gdC5lbnVtKFwiSHR0cE1ldGhvZFwiLCB7XG4gIEdldDogdC51bml0KCksXG4gIEhlYWQ6IHQudW5pdCgpLFxuICBQb3N0OiB0LnVuaXQoKSxcbiAgUHV0OiB0LnVuaXQoKSxcbiAgRGVsZXRlOiB0LnVuaXQoKSxcbiAgQ29ubmVjdDogdC51bml0KCksXG4gIE9wdGlvbnM6IHQudW5pdCgpLFxuICBUcmFjZTogdC51bml0KCksXG4gIFBhdGNoOiB0LnVuaXQoKSxcbiAgRXh0ZW5zaW9uOiB0LnN0cmluZygpXG59KTtcbnZhciBIdHRwUmVxdWVzdCA9IHQub2JqZWN0KFwiSHR0cFJlcXVlc3RcIiwge1xuICBnZXQgbWV0aG9kKCkge1xuICAgIHJldHVybiBIdHRwTWV0aG9kO1xuICB9LFxuICBnZXQgaGVhZGVycygpIHtcbiAgICByZXR1cm4gSHR0cEhlYWRlcnM7XG4gIH0sXG4gIHRpbWVvdXQ6IHQub3B0aW9uKHQudGltZUR1cmF0aW9uKCkpLFxuICB1cmk6IHQuc3RyaW5nKCksXG4gIGdldCB2ZXJzaW9uKCkge1xuICAgIHJldHVybiBIdHRwVmVyc2lvbjtcbiAgfVxufSk7XG52YXIgSHR0cFJlc3BvbnNlID0gdC5vYmplY3QoXCJIdHRwUmVzcG9uc2VcIiwge1xuICBnZXQgaGVhZGVycygpIHtcbiAgICByZXR1cm4gSHR0cEhlYWRlcnM7XG4gIH0sXG4gIGdldCB2ZXJzaW9uKCkge1xuICAgIHJldHVybiBIdHRwVmVyc2lvbjtcbiAgfSxcbiAgY29kZTogdC51MTYoKVxufSk7XG52YXIgSHR0cFZlcnNpb24gPSB0LmVudW0oXCJIdHRwVmVyc2lvblwiLCB7XG4gIEh0dHAwOTogdC51bml0KCksXG4gIEh0dHAxMDogdC51bml0KCksXG4gIEh0dHAxMTogdC51bml0KCksXG4gIEh0dHAyOiB0LnVuaXQoKSxcbiAgSHR0cDM6IHQudW5pdCgpXG59KTtcbnZhciBJbmRleFR5cGUgPSB0LmVudW0oXCJJbmRleFR5cGVcIiwge1xuICBCVHJlZTogdC51bml0KCksXG4gIEhhc2g6IHQudW5pdCgpXG59KTtcbnZhciBMaWZlY3ljbGUgPSB0LmVudW0oXCJMaWZlY3ljbGVcIiwge1xuICBJbml0OiB0LnVuaXQoKSxcbiAgT25Db25uZWN0OiB0LnVuaXQoKSxcbiAgT25EaXNjb25uZWN0OiB0LnVuaXQoKVxufSk7XG52YXIgTWlzY01vZHVsZUV4cG9ydCA9IHQuZW51bShcIk1pc2NNb2R1bGVFeHBvcnRcIiwge1xuICBnZXQgVHlwZUFsaWFzKCkge1xuICAgIHJldHVybiBUeXBlQWxpYXM7XG4gIH1cbn0pO1xudmFyIE5hbWVNYXBwaW5nID0gdC5vYmplY3QoXCJOYW1lTWFwcGluZ1wiLCB7XG4gIHNvdXJjZU5hbWU6IHQuc3RyaW5nKCksXG4gIGNhbm9uaWNhbE5hbWU6IHQuc3RyaW5nKClcbn0pO1xudmFyIFByb2R1Y3RUeXBlMiA9IHQub2JqZWN0KFwiUHJvZHVjdFR5cGVcIiwge1xuICBnZXQgZWxlbWVudHMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUHJvZHVjdFR5cGVFbGVtZW50KTtcbiAgfVxufSk7XG52YXIgUHJvZHVjdFR5cGVFbGVtZW50ID0gdC5vYmplY3QoXCJQcm9kdWN0VHlwZUVsZW1lbnRcIiwge1xuICBuYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgZ2V0IGFsZ2VicmFpY1R5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUyO1xuICB9XG59KTtcbnZhciBSYXdDb2x1bW5EZWZWOCA9IHQub2JqZWN0KFwiUmF3Q29sdW1uRGVmVjhcIiwge1xuICBjb2xOYW1lOiB0LnN0cmluZygpLFxuICBnZXQgY29sVHlwZSgpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZTI7XG4gIH1cbn0pO1xudmFyIFJhd0NvbHVtbkRlZmF1bHRWYWx1ZVYxMCA9IHQub2JqZWN0KFwiUmF3Q29sdW1uRGVmYXVsdFZhbHVlVjEwXCIsIHtcbiAgY29sSWQ6IHQudTE2KCksXG4gIHZhbHVlOiB0LmJ5dGVBcnJheSgpXG59KTtcbnZhciBSYXdDb2x1bW5EZWZhdWx0VmFsdWVWOSA9IHQub2JqZWN0KFwiUmF3Q29sdW1uRGVmYXVsdFZhbHVlVjlcIiwge1xuICB0YWJsZTogdC5zdHJpbmcoKSxcbiAgY29sSWQ6IHQudTE2KCksXG4gIHZhbHVlOiB0LmJ5dGVBcnJheSgpXG59KTtcbnZhciBSYXdDb25zdHJhaW50RGF0YVY5ID0gdC5lbnVtKFwiUmF3Q29uc3RyYWludERhdGFWOVwiLCB7XG4gIGdldCBVbmlxdWUoKSB7XG4gICAgcmV0dXJuIFJhd1VuaXF1ZUNvbnN0cmFpbnREYXRhVjk7XG4gIH1cbn0pO1xudmFyIFJhd0NvbnN0cmFpbnREZWZWMTAgPSB0Lm9iamVjdChcIlJhd0NvbnN0cmFpbnREZWZWMTBcIiwge1xuICBzb3VyY2VOYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgZ2V0IGRhdGEoKSB7XG4gICAgcmV0dXJuIFJhd0NvbnN0cmFpbnREYXRhVjk7XG4gIH1cbn0pO1xudmFyIFJhd0NvbnN0cmFpbnREZWZWOCA9IHQub2JqZWN0KFwiUmF3Q29uc3RyYWludERlZlY4XCIsIHtcbiAgY29uc3RyYWludE5hbWU6IHQuc3RyaW5nKCksXG4gIGNvbnN0cmFpbnRzOiB0LnU4KCksXG4gIGNvbHVtbnM6IHQuYXJyYXkodC51MTYoKSlcbn0pO1xudmFyIFJhd0NvbnN0cmFpbnREZWZWOSA9IHQub2JqZWN0KFwiUmF3Q29uc3RyYWludERlZlY5XCIsIHtcbiAgbmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXG4gIGdldCBkYXRhKCkge1xuICAgIHJldHVybiBSYXdDb25zdHJhaW50RGF0YVY5O1xuICB9XG59KTtcbnZhciBSYXdJbmRleEFsZ29yaXRobSA9IHQuZW51bShcIlJhd0luZGV4QWxnb3JpdGhtXCIsIHtcbiAgQlRyZWU6IHQuYXJyYXkodC51MTYoKSksXG4gIEhhc2g6IHQuYXJyYXkodC51MTYoKSksXG4gIERpcmVjdDogdC51MTYoKVxufSk7XG52YXIgUmF3SW5kZXhEZWZWMTAgPSB0Lm9iamVjdChcIlJhd0luZGV4RGVmVjEwXCIsIHtcbiAgc291cmNlTmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXG4gIGFjY2Vzc29yTmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXG4gIGdldCBhbGdvcml0aG0oKSB7XG4gICAgcmV0dXJuIFJhd0luZGV4QWxnb3JpdGhtO1xuICB9XG59KTtcbnZhciBSYXdJbmRleERlZlY4ID0gdC5vYmplY3QoXCJSYXdJbmRleERlZlY4XCIsIHtcbiAgaW5kZXhOYW1lOiB0LnN0cmluZygpLFxuICBpc1VuaXF1ZTogdC5ib29sKCksXG4gIGdldCBpbmRleFR5cGUoKSB7XG4gICAgcmV0dXJuIEluZGV4VHlwZTtcbiAgfSxcbiAgY29sdW1uczogdC5hcnJheSh0LnUxNigpKVxufSk7XG52YXIgUmF3SW5kZXhEZWZWOSA9IHQub2JqZWN0KFwiUmF3SW5kZXhEZWZWOVwiLCB7XG4gIG5hbWU6IHQub3B0aW9uKHQuc3RyaW5nKCkpLFxuICBhY2Nlc3Nvck5hbWU6IHQub3B0aW9uKHQuc3RyaW5nKCkpLFxuICBnZXQgYWxnb3JpdGhtKCkge1xuICAgIHJldHVybiBSYXdJbmRleEFsZ29yaXRobTtcbiAgfVxufSk7XG52YXIgUmF3TGlmZUN5Y2xlUmVkdWNlckRlZlYxMCA9IHQub2JqZWN0KFxuICBcIlJhd0xpZmVDeWNsZVJlZHVjZXJEZWZWMTBcIixcbiAge1xuICAgIGdldCBsaWZlY3ljbGVTcGVjKCkge1xuICAgICAgcmV0dXJuIExpZmVjeWNsZTtcbiAgICB9LFxuICAgIGZ1bmN0aW9uTmFtZTogdC5zdHJpbmcoKVxuICB9XG4pO1xudmFyIFJhd01pc2NNb2R1bGVFeHBvcnRWOSA9IHQuZW51bShcIlJhd01pc2NNb2R1bGVFeHBvcnRWOVwiLCB7XG4gIGdldCBDb2x1bW5EZWZhdWx0VmFsdWUoKSB7XG4gICAgcmV0dXJuIFJhd0NvbHVtbkRlZmF1bHRWYWx1ZVY5O1xuICB9LFxuICBnZXQgUHJvY2VkdXJlKCkge1xuICAgIHJldHVybiBSYXdQcm9jZWR1cmVEZWZWOTtcbiAgfSxcbiAgZ2V0IFZpZXcoKSB7XG4gICAgcmV0dXJuIFJhd1ZpZXdEZWZWOTtcbiAgfVxufSk7XG52YXIgUmF3TW9kdWxlRGVmID0gdC5lbnVtKFwiUmF3TW9kdWxlRGVmXCIsIHtcbiAgZ2V0IFY4QmFja0NvbXBhdCgpIHtcbiAgICByZXR1cm4gUmF3TW9kdWxlRGVmVjg7XG4gIH0sXG4gIGdldCBWOSgpIHtcbiAgICByZXR1cm4gUmF3TW9kdWxlRGVmVjk7XG4gIH0sXG4gIGdldCBWMTAoKSB7XG4gICAgcmV0dXJuIFJhd01vZHVsZURlZlYxMDtcbiAgfVxufSk7XG52YXIgUmF3TW9kdWxlRGVmVjEwID0gdC5vYmplY3QoXCJSYXdNb2R1bGVEZWZWMTBcIiwge1xuICBnZXQgc2VjdGlvbnMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3TW9kdWxlRGVmVjEwU2VjdGlvbik7XG4gIH1cbn0pO1xudmFyIFJhd01vZHVsZURlZlYxMFNlY3Rpb24gPSB0LmVudW0oXCJSYXdNb2R1bGVEZWZWMTBTZWN0aW9uXCIsIHtcbiAgZ2V0IFR5cGVzcGFjZSgpIHtcbiAgICByZXR1cm4gVHlwZXNwYWNlO1xuICB9LFxuICBnZXQgVHlwZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3VHlwZURlZlYxMCk7XG4gIH0sXG4gIGdldCBUYWJsZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3VGFibGVEZWZWMTApO1xuICB9LFxuICBnZXQgUmVkdWNlcnMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3UmVkdWNlckRlZlYxMCk7XG4gIH0sXG4gIGdldCBQcm9jZWR1cmVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KFJhd1Byb2NlZHVyZURlZlYxMCk7XG4gIH0sXG4gIGdldCBWaWV3cygpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdWaWV3RGVmVjEwKTtcbiAgfSxcbiAgZ2V0IFNjaGVkdWxlcygpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdTY2hlZHVsZURlZlYxMCk7XG4gIH0sXG4gIGdldCBMaWZlQ3ljbGVSZWR1Y2VycygpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdMaWZlQ3ljbGVSZWR1Y2VyRGVmVjEwKTtcbiAgfSxcbiAgZ2V0IFJvd0xldmVsU2VjdXJpdHkoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3Um93TGV2ZWxTZWN1cml0eURlZlY5KTtcbiAgfSxcbiAgZ2V0IENhc2VDb252ZXJzaW9uUG9saWN5KCkge1xuICAgIHJldHVybiBDYXNlQ29udmVyc2lvblBvbGljeTtcbiAgfSxcbiAgZ2V0IEV4cGxpY2l0TmFtZXMoKSB7XG4gICAgcmV0dXJuIEV4cGxpY2l0TmFtZXM7XG4gIH1cbn0pO1xudmFyIFJhd01vZHVsZURlZlY4ID0gdC5vYmplY3QoXCJSYXdNb2R1bGVEZWZWOFwiLCB7XG4gIGdldCB0eXBlc3BhY2UoKSB7XG4gICAgcmV0dXJuIFR5cGVzcGFjZTtcbiAgfSxcbiAgZ2V0IHRhYmxlcygpIHtcbiAgICByZXR1cm4gdC5hcnJheShUYWJsZURlc2MpO1xuICB9LFxuICBnZXQgcmVkdWNlcnMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmVkdWNlckRlZik7XG4gIH0sXG4gIGdldCBtaXNjRXhwb3J0cygpIHtcbiAgICByZXR1cm4gdC5hcnJheShNaXNjTW9kdWxlRXhwb3J0KTtcbiAgfVxufSk7XG52YXIgUmF3TW9kdWxlRGVmVjkgPSB0Lm9iamVjdChcIlJhd01vZHVsZURlZlY5XCIsIHtcbiAgZ2V0IHR5cGVzcGFjZSgpIHtcbiAgICByZXR1cm4gVHlwZXNwYWNlO1xuICB9LFxuICBnZXQgdGFibGVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KFJhd1RhYmxlRGVmVjkpO1xuICB9LFxuICBnZXQgcmVkdWNlcnMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3UmVkdWNlckRlZlY5KTtcbiAgfSxcbiAgZ2V0IHR5cGVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KFJhd1R5cGVEZWZWOSk7XG4gIH0sXG4gIGdldCBtaXNjRXhwb3J0cygpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdNaXNjTW9kdWxlRXhwb3J0VjkpO1xuICB9LFxuICBnZXQgcm93TGV2ZWxTZWN1cml0eSgpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdSb3dMZXZlbFNlY3VyaXR5RGVmVjkpO1xuICB9XG59KTtcbnZhciBSYXdQcm9jZWR1cmVEZWZWMTAgPSB0Lm9iamVjdChcIlJhd1Byb2NlZHVyZURlZlYxMFwiLCB7XG4gIHNvdXJjZU5hbWU6IHQuc3RyaW5nKCksXG4gIGdldCBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFByb2R1Y3RUeXBlMjtcbiAgfSxcbiAgZ2V0IHJldHVyblR5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUyO1xuICB9LFxuICBnZXQgdmlzaWJpbGl0eSgpIHtcbiAgICByZXR1cm4gRnVuY3Rpb25WaXNpYmlsaXR5O1xuICB9XG59KTtcbnZhciBSYXdQcm9jZWR1cmVEZWZWOSA9IHQub2JqZWN0KFwiUmF3UHJvY2VkdXJlRGVmVjlcIiwge1xuICBuYW1lOiB0LnN0cmluZygpLFxuICBnZXQgcGFyYW1zKCkge1xuICAgIHJldHVybiBQcm9kdWN0VHlwZTI7XG4gIH0sXG4gIGdldCByZXR1cm5UeXBlKCkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlMjtcbiAgfVxufSk7XG52YXIgUmF3UmVkdWNlckRlZlYxMCA9IHQub2JqZWN0KFwiUmF3UmVkdWNlckRlZlYxMFwiLCB7XG4gIHNvdXJjZU5hbWU6IHQuc3RyaW5nKCksXG4gIGdldCBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFByb2R1Y3RUeXBlMjtcbiAgfSxcbiAgZ2V0IHZpc2liaWxpdHkoKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uVmlzaWJpbGl0eTtcbiAgfSxcbiAgZ2V0IG9rUmV0dXJuVHlwZSgpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZTI7XG4gIH0sXG4gIGdldCBlcnJSZXR1cm5UeXBlKCkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlMjtcbiAgfVxufSk7XG52YXIgUmF3UmVkdWNlckRlZlY5ID0gdC5vYmplY3QoXCJSYXdSZWR1Y2VyRGVmVjlcIiwge1xuICBuYW1lOiB0LnN0cmluZygpLFxuICBnZXQgcGFyYW1zKCkge1xuICAgIHJldHVybiBQcm9kdWN0VHlwZTI7XG4gIH0sXG4gIGdldCBsaWZlY3ljbGUoKSB7XG4gICAgcmV0dXJuIHQub3B0aW9uKExpZmVjeWNsZSk7XG4gIH1cbn0pO1xudmFyIFJhd1Jvd0xldmVsU2VjdXJpdHlEZWZWOSA9IHQub2JqZWN0KFwiUmF3Um93TGV2ZWxTZWN1cml0eURlZlY5XCIsIHtcbiAgc3FsOiB0LnN0cmluZygpXG59KTtcbnZhciBSYXdTY2hlZHVsZURlZlYxMCA9IHQub2JqZWN0KFwiUmF3U2NoZWR1bGVEZWZWMTBcIiwge1xuICBzb3VyY2VOYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgdGFibGVOYW1lOiB0LnN0cmluZygpLFxuICBzY2hlZHVsZUF0Q29sOiB0LnUxNigpLFxuICBmdW5jdGlvbk5hbWU6IHQuc3RyaW5nKClcbn0pO1xudmFyIFJhd1NjaGVkdWxlRGVmVjkgPSB0Lm9iamVjdChcIlJhd1NjaGVkdWxlRGVmVjlcIiwge1xuICBuYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgcmVkdWNlck5hbWU6IHQuc3RyaW5nKCksXG4gIHNjaGVkdWxlZEF0Q29sdW1uOiB0LnUxNigpXG59KTtcbnZhciBSYXdTY29wZWRUeXBlTmFtZVYxMCA9IHQub2JqZWN0KFwiUmF3U2NvcGVkVHlwZU5hbWVWMTBcIiwge1xuICBzY29wZTogdC5hcnJheSh0LnN0cmluZygpKSxcbiAgc291cmNlTmFtZTogdC5zdHJpbmcoKVxufSk7XG52YXIgUmF3U2NvcGVkVHlwZU5hbWVWOSA9IHQub2JqZWN0KFwiUmF3U2NvcGVkVHlwZU5hbWVWOVwiLCB7XG4gIHNjb3BlOiB0LmFycmF5KHQuc3RyaW5nKCkpLFxuICBuYW1lOiB0LnN0cmluZygpXG59KTtcbnZhciBSYXdTZXF1ZW5jZURlZlYxMCA9IHQub2JqZWN0KFwiUmF3U2VxdWVuY2VEZWZWMTBcIiwge1xuICBzb3VyY2VOYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgY29sdW1uOiB0LnUxNigpLFxuICBzdGFydDogdC5vcHRpb24odC5pMTI4KCkpLFxuICBtaW5WYWx1ZTogdC5vcHRpb24odC5pMTI4KCkpLFxuICBtYXhWYWx1ZTogdC5vcHRpb24odC5pMTI4KCkpLFxuICBpbmNyZW1lbnQ6IHQuaTEyOCgpXG59KTtcbnZhciBSYXdTZXF1ZW5jZURlZlY4ID0gdC5vYmplY3QoXCJSYXdTZXF1ZW5jZURlZlY4XCIsIHtcbiAgc2VxdWVuY2VOYW1lOiB0LnN0cmluZygpLFxuICBjb2xQb3M6IHQudTE2KCksXG4gIGluY3JlbWVudDogdC5pMTI4KCksXG4gIHN0YXJ0OiB0Lm9wdGlvbih0LmkxMjgoKSksXG4gIG1pblZhbHVlOiB0Lm9wdGlvbih0LmkxMjgoKSksXG4gIG1heFZhbHVlOiB0Lm9wdGlvbih0LmkxMjgoKSksXG4gIGFsbG9jYXRlZDogdC5pMTI4KClcbn0pO1xudmFyIFJhd1NlcXVlbmNlRGVmVjkgPSB0Lm9iamVjdChcIlJhd1NlcXVlbmNlRGVmVjlcIiwge1xuICBuYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgY29sdW1uOiB0LnUxNigpLFxuICBzdGFydDogdC5vcHRpb24odC5pMTI4KCkpLFxuICBtaW5WYWx1ZTogdC5vcHRpb24odC5pMTI4KCkpLFxuICBtYXhWYWx1ZTogdC5vcHRpb24odC5pMTI4KCkpLFxuICBpbmNyZW1lbnQ6IHQuaTEyOCgpXG59KTtcbnZhciBSYXdUYWJsZURlZlYxMCA9IHQub2JqZWN0KFwiUmF3VGFibGVEZWZWMTBcIiwge1xuICBzb3VyY2VOYW1lOiB0LnN0cmluZygpLFxuICBwcm9kdWN0VHlwZVJlZjogdC51MzIoKSxcbiAgcHJpbWFyeUtleTogdC5hcnJheSh0LnUxNigpKSxcbiAgZ2V0IGluZGV4ZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3SW5kZXhEZWZWMTApO1xuICB9LFxuICBnZXQgY29uc3RyYWludHMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3Q29uc3RyYWludERlZlYxMCk7XG4gIH0sXG4gIGdldCBzZXF1ZW5jZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3U2VxdWVuY2VEZWZWMTApO1xuICB9LFxuICBnZXQgdGFibGVUeXBlKCkge1xuICAgIHJldHVybiBUYWJsZVR5cGU7XG4gIH0sXG4gIGdldCB0YWJsZUFjY2VzcygpIHtcbiAgICByZXR1cm4gVGFibGVBY2Nlc3M7XG4gIH0sXG4gIGdldCBkZWZhdWx0VmFsdWVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KFJhd0NvbHVtbkRlZmF1bHRWYWx1ZVYxMCk7XG4gIH0sXG4gIGlzRXZlbnQ6IHQuYm9vbCgpXG59KTtcbnZhciBSYXdUYWJsZURlZlY4ID0gdC5vYmplY3QoXCJSYXdUYWJsZURlZlY4XCIsIHtcbiAgdGFibGVOYW1lOiB0LnN0cmluZygpLFxuICBnZXQgY29sdW1ucygpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdDb2x1bW5EZWZWOCk7XG4gIH0sXG4gIGdldCBpbmRleGVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KFJhd0luZGV4RGVmVjgpO1xuICB9LFxuICBnZXQgY29uc3RyYWludHMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3Q29uc3RyYWludERlZlY4KTtcbiAgfSxcbiAgZ2V0IHNlcXVlbmNlcygpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdTZXF1ZW5jZURlZlY4KTtcbiAgfSxcbiAgdGFibGVUeXBlOiB0LnN0cmluZygpLFxuICB0YWJsZUFjY2VzczogdC5zdHJpbmcoKSxcbiAgc2NoZWR1bGVkOiB0Lm9wdGlvbih0LnN0cmluZygpKVxufSk7XG52YXIgUmF3VGFibGVEZWZWOSA9IHQub2JqZWN0KFwiUmF3VGFibGVEZWZWOVwiLCB7XG4gIG5hbWU6IHQuc3RyaW5nKCksXG4gIHByb2R1Y3RUeXBlUmVmOiB0LnUzMigpLFxuICBwcmltYXJ5S2V5OiB0LmFycmF5KHQudTE2KCkpLFxuICBnZXQgaW5kZXhlcygpIHtcbiAgICByZXR1cm4gdC5hcnJheShSYXdJbmRleERlZlY5KTtcbiAgfSxcbiAgZ2V0IGNvbnN0cmFpbnRzKCkge1xuICAgIHJldHVybiB0LmFycmF5KFJhd0NvbnN0cmFpbnREZWZWOSk7XG4gIH0sXG4gIGdldCBzZXF1ZW5jZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUmF3U2VxdWVuY2VEZWZWOSk7XG4gIH0sXG4gIGdldCBzY2hlZHVsZSgpIHtcbiAgICByZXR1cm4gdC5vcHRpb24oUmF3U2NoZWR1bGVEZWZWOSk7XG4gIH0sXG4gIGdldCB0YWJsZVR5cGUoKSB7XG4gICAgcmV0dXJuIFRhYmxlVHlwZTtcbiAgfSxcbiAgZ2V0IHRhYmxlQWNjZXNzKCkge1xuICAgIHJldHVybiBUYWJsZUFjY2VzcztcbiAgfVxufSk7XG52YXIgUmF3VHlwZURlZlYxMCA9IHQub2JqZWN0KFwiUmF3VHlwZURlZlYxMFwiLCB7XG4gIGdldCBzb3VyY2VOYW1lKCkge1xuICAgIHJldHVybiBSYXdTY29wZWRUeXBlTmFtZVYxMDtcbiAgfSxcbiAgdHk6IHQudTMyKCksXG4gIGN1c3RvbU9yZGVyaW5nOiB0LmJvb2woKVxufSk7XG52YXIgUmF3VHlwZURlZlY5ID0gdC5vYmplY3QoXCJSYXdUeXBlRGVmVjlcIiwge1xuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gUmF3U2NvcGVkVHlwZU5hbWVWOTtcbiAgfSxcbiAgdHk6IHQudTMyKCksXG4gIGN1c3RvbU9yZGVyaW5nOiB0LmJvb2woKVxufSk7XG52YXIgUmF3VW5pcXVlQ29uc3RyYWludERhdGFWOSA9IHQub2JqZWN0KFxuICBcIlJhd1VuaXF1ZUNvbnN0cmFpbnREYXRhVjlcIixcbiAge1xuICAgIGNvbHVtbnM6IHQuYXJyYXkodC51MTYoKSlcbiAgfVxuKTtcbnZhciBSYXdWaWV3RGVmVjEwID0gdC5vYmplY3QoXCJSYXdWaWV3RGVmVjEwXCIsIHtcbiAgc291cmNlTmFtZTogdC5zdHJpbmcoKSxcbiAgaW5kZXg6IHQudTMyKCksXG4gIGlzUHVibGljOiB0LmJvb2woKSxcbiAgaXNBbm9ueW1vdXM6IHQuYm9vbCgpLFxuICBnZXQgcGFyYW1zKCkge1xuICAgIHJldHVybiBQcm9kdWN0VHlwZTI7XG4gIH0sXG4gIGdldCByZXR1cm5UeXBlKCkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlMjtcbiAgfVxufSk7XG52YXIgUmF3Vmlld0RlZlY5ID0gdC5vYmplY3QoXCJSYXdWaWV3RGVmVjlcIiwge1xuICBuYW1lOiB0LnN0cmluZygpLFxuICBpbmRleDogdC51MzIoKSxcbiAgaXNQdWJsaWM6IHQuYm9vbCgpLFxuICBpc0Fub255bW91czogdC5ib29sKCksXG4gIGdldCBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFByb2R1Y3RUeXBlMjtcbiAgfSxcbiAgZ2V0IHJldHVyblR5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUyO1xuICB9XG59KTtcbnZhciBSZWR1Y2VyRGVmID0gdC5vYmplY3QoXCJSZWR1Y2VyRGVmXCIsIHtcbiAgbmFtZTogdC5zdHJpbmcoKSxcbiAgZ2V0IGFyZ3MoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoUHJvZHVjdFR5cGVFbGVtZW50KTtcbiAgfVxufSk7XG52YXIgU3VtVHlwZTIgPSB0Lm9iamVjdChcIlN1bVR5cGVcIiwge1xuICBnZXQgdmFyaWFudHMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoU3VtVHlwZVZhcmlhbnQpO1xuICB9XG59KTtcbnZhciBTdW1UeXBlVmFyaWFudCA9IHQub2JqZWN0KFwiU3VtVHlwZVZhcmlhbnRcIiwge1xuICBuYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgZ2V0IGFsZ2VicmFpY1R5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUyO1xuICB9XG59KTtcbnZhciBUYWJsZUFjY2VzcyA9IHQuZW51bShcIlRhYmxlQWNjZXNzXCIsIHtcbiAgUHVibGljOiB0LnVuaXQoKSxcbiAgUHJpdmF0ZTogdC51bml0KClcbn0pO1xudmFyIFRhYmxlRGVzYyA9IHQub2JqZWN0KFwiVGFibGVEZXNjXCIsIHtcbiAgZ2V0IHNjaGVtYSgpIHtcbiAgICByZXR1cm4gUmF3VGFibGVEZWZWODtcbiAgfSxcbiAgZGF0YTogdC51MzIoKVxufSk7XG52YXIgVGFibGVUeXBlID0gdC5lbnVtKFwiVGFibGVUeXBlXCIsIHtcbiAgU3lzdGVtOiB0LnVuaXQoKSxcbiAgVXNlcjogdC51bml0KClcbn0pO1xudmFyIFR5cGVBbGlhcyA9IHQub2JqZWN0KFwiVHlwZUFsaWFzXCIsIHtcbiAgbmFtZTogdC5zdHJpbmcoKSxcbiAgdHk6IHQudTMyKClcbn0pO1xudmFyIFR5cGVzcGFjZSA9IHQub2JqZWN0KFwiVHlwZXNwYWNlXCIsIHtcbiAgZ2V0IHR5cGVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KEFsZ2VicmFpY1R5cGUyKTtcbiAgfVxufSk7XG52YXIgVmlld1Jlc3VsdEhlYWRlciA9IHQuZW51bShcIlZpZXdSZXN1bHRIZWFkZXJcIiwge1xuICBSb3dEYXRhOiB0LnVuaXQoKSxcbiAgUmF3U3FsOiB0LnN0cmluZygpXG59KTtcblxuLy8gc3JjL2xpYi9zY2hlbWEudHNcbmZ1bmN0aW9uIHRhYmxlVG9TY2hlbWEoYWNjTmFtZSwgc2NoZW1hMiwgdGFibGVEZWYpIHtcbiAgY29uc3QgZ2V0Q29sTmFtZSA9IChpKSA9PiBzY2hlbWEyLnJvd1R5cGUuYWxnZWJyYWljVHlwZS52YWx1ZS5lbGVtZW50c1tpXS5uYW1lO1xuICBjb25zdCByZXNvbHZlZEluZGV4ZXMgPSB0YWJsZURlZi5pbmRleGVzLm1hcChcbiAgICAoaWR4KSA9PiB7XG4gICAgICBjb25zdCBhY2Nlc3Nvck5hbWUgPSBpZHguYWNjZXNzb3JOYW1lO1xuICAgICAgaWYgKHR5cGVvZiBhY2Nlc3Nvck5hbWUgIT09IFwic3RyaW5nXCIgfHwgYWNjZXNzb3JOYW1lLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIGBJbmRleCAnJHtpZHguc291cmNlTmFtZSA/PyBcIjx1bmtub3duPlwifScgb24gdGFibGUgJyR7dGFibGVEZWYuc291cmNlTmFtZX0nIGlzIG1pc3NpbmcgYWNjZXNzb3IgbmFtZWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbHVtbklkcyA9IGlkeC5hbGdvcml0aG0udGFnID09PSBcIkRpcmVjdFwiID8gW2lkeC5hbGdvcml0aG0udmFsdWVdIDogaWR4LmFsZ29yaXRobS52YWx1ZTtcbiAgICAgIGNvbnN0IHVuaXF1ZSA9IHRhYmxlRGVmLmNvbnN0cmFpbnRzLnNvbWUoXG4gICAgICAgIChjKSA9PiBjLmRhdGEudGFnID09PSBcIlVuaXF1ZVwiICYmIGMuZGF0YS52YWx1ZS5jb2x1bW5zLmV2ZXJ5KChjb2wpID0+IGNvbHVtbklkcy5pbmNsdWRlcyhjb2wpKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGFsZ29yaXRobSA9IHtcbiAgICAgICAgQlRyZWU6IFwiYnRyZWVcIixcbiAgICAgICAgSGFzaDogXCJoYXNoXCIsXG4gICAgICAgIERpcmVjdDogXCJkaXJlY3RcIlxuICAgICAgfVtpZHguYWxnb3JpdGhtLnRhZ107XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBhY2Nlc3Nvck5hbWUsXG4gICAgICAgIHVuaXF1ZSxcbiAgICAgICAgYWxnb3JpdGhtLFxuICAgICAgICBjb2x1bW5zOiBjb2x1bW5JZHMubWFwKGdldENvbE5hbWUpXG4gICAgICB9O1xuICAgIH1cbiAgKTtcbiAgcmV0dXJuIHtcbiAgICAvLyBGb3IgY2xpZW50LGBzY2hhbWEudGFibGVOYW1lYCB3aWxsIGFsd2F5cyBiZSB0aGVyZSBhcyBjYW5vbmljYWwgbmFtZS5cbiAgICAvLyBGb3IgbW9kdWxlLCBpZiBleHBsaWNpdCBuYW1lIGlzIG5vdCBwcm92aWRlZCB2aWEgYG5hbWVgLCBhY2Nlc3NvciBuYW1lIHdpbGxcbiAgICAvLyBiZSB1c2VkLCBpdCBpcyBzdG9yZWQgYXMgYWxpYXMgaW4gZGF0YWJhc2UsIGhlbmNlIHdvcmtzIGluIHF1ZXJ5IGJ1aWxkZXIuXG4gICAgc291cmNlTmFtZTogc2NoZW1hMi50YWJsZU5hbWUgfHwgYWNjTmFtZSxcbiAgICBhY2Nlc3Nvck5hbWU6IGFjY05hbWUsXG4gICAgY29sdW1uczogc2NoZW1hMi5yb3dUeXBlLnJvdyxcbiAgICAvLyB0eXBlZCBhcyBUW2ldWydyb3dUeXBlJ11bJ3JvdyddIHVuZGVyIFRhYmxlc1RvU2NoZW1hPFQ+XG4gICAgcm93VHlwZTogc2NoZW1hMi5yb3dTcGFjZXRpbWVUeXBlLFxuICAgIC8vIEtlZXAgZGVjbGFyYXRpdmUgaW5kZXhlcyBpbiB0aGVpciBvcmlnaW5hbCBzaGFwZSBmb3IgdHlwZS1sZXZlbCBjb25zdW1lcnMuXG4gICAgaW5kZXhlczogc2NoZW1hMi5pZHhzLFxuICAgIGNvbnN0cmFpbnRzOiB0YWJsZURlZi5jb25zdHJhaW50cy5tYXAoKGMpID0+ICh7XG4gICAgICBuYW1lOiBjLnNvdXJjZU5hbWUsXG4gICAgICBjb25zdHJhaW50OiBcInVuaXF1ZVwiLFxuICAgICAgY29sdW1uczogYy5kYXRhLnZhbHVlLmNvbHVtbnMubWFwKGdldENvbE5hbWUpXG4gICAgfSkpLFxuICAgIC8vIEV4cG9zZSByZXNvbHZlZCBydW50aW1lIGluZGV4ZXMgc2VwYXJhdGVseSBzbyBydW50aW1lIHVzZXJzIGRvbid0IGhhdmUgdG9cbiAgICAvLyByZWludGVycHJldCBgaW5kZXhlc2Agd2l0aCB1bnNhZmUgY2FzdHMuXG4gICAgcmVzb2x2ZWRJbmRleGVzLFxuICAgIHRhYmxlRGVmLFxuICAgIC4uLnRhYmxlRGVmLmlzRXZlbnQgPyB7IGlzRXZlbnQ6IHRydWUgfSA6IHt9XG4gIH07XG59XG52YXIgTW9kdWxlQ29udGV4dCA9IGNsYXNzIHtcbiAgI2NvbXBvdW5kVHlwZXMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICAvKipcbiAgICogVGhlIGdsb2JhbCBtb2R1bGUgZGVmaW5pdGlvbiB0aGF0IGdldHMgcG9wdWxhdGVkIGJ5IGNhbGxzIHRvIGByZWR1Y2VyKClgIGFuZCBsaWZlY3ljbGUgaG9va3MuXG4gICAqL1xuICAjbW9kdWxlRGVmID0ge1xuICAgIHR5cGVzcGFjZTogeyB0eXBlczogW10gfSxcbiAgICB0YWJsZXM6IFtdLFxuICAgIHJlZHVjZXJzOiBbXSxcbiAgICB0eXBlczogW10sXG4gICAgcm93TGV2ZWxTZWN1cml0eTogW10sXG4gICAgc2NoZWR1bGVzOiBbXSxcbiAgICBwcm9jZWR1cmVzOiBbXSxcbiAgICB2aWV3czogW10sXG4gICAgbGlmZUN5Y2xlUmVkdWNlcnM6IFtdLFxuICAgIGNhc2VDb252ZXJzaW9uUG9saWN5OiB7IHRhZzogXCJTbmFrZUNhc2VcIiB9LFxuICAgIGV4cGxpY2l0TmFtZXM6IHtcbiAgICAgIGVudHJpZXM6IFtdXG4gICAgfVxuICB9O1xuICBnZXQgbW9kdWxlRGVmKCkge1xuICAgIHJldHVybiB0aGlzLiNtb2R1bGVEZWY7XG4gIH1cbiAgcmF3TW9kdWxlRGVmVjEwKCkge1xuICAgIGNvbnN0IHNlY3Rpb25zID0gW107XG4gICAgY29uc3QgcHVzaCA9IChzKSA9PiB7XG4gICAgICBpZiAocykgc2VjdGlvbnMucHVzaChzKTtcbiAgICB9O1xuICAgIGNvbnN0IG1vZHVsZSA9IHRoaXMuI21vZHVsZURlZjtcbiAgICBwdXNoKG1vZHVsZS50eXBlc3BhY2UgJiYgeyB0YWc6IFwiVHlwZXNwYWNlXCIsIHZhbHVlOiBtb2R1bGUudHlwZXNwYWNlIH0pO1xuICAgIHB1c2gobW9kdWxlLnR5cGVzICYmIHsgdGFnOiBcIlR5cGVzXCIsIHZhbHVlOiBtb2R1bGUudHlwZXMgfSk7XG4gICAgcHVzaChtb2R1bGUudGFibGVzICYmIHsgdGFnOiBcIlRhYmxlc1wiLCB2YWx1ZTogbW9kdWxlLnRhYmxlcyB9KTtcbiAgICBwdXNoKG1vZHVsZS5yZWR1Y2VycyAmJiB7IHRhZzogXCJSZWR1Y2Vyc1wiLCB2YWx1ZTogbW9kdWxlLnJlZHVjZXJzIH0pO1xuICAgIHB1c2gobW9kdWxlLnByb2NlZHVyZXMgJiYgeyB0YWc6IFwiUHJvY2VkdXJlc1wiLCB2YWx1ZTogbW9kdWxlLnByb2NlZHVyZXMgfSk7XG4gICAgcHVzaChtb2R1bGUudmlld3MgJiYgeyB0YWc6IFwiVmlld3NcIiwgdmFsdWU6IG1vZHVsZS52aWV3cyB9KTtcbiAgICBwdXNoKG1vZHVsZS5zY2hlZHVsZXMgJiYgeyB0YWc6IFwiU2NoZWR1bGVzXCIsIHZhbHVlOiBtb2R1bGUuc2NoZWR1bGVzIH0pO1xuICAgIHB1c2goXG4gICAgICBtb2R1bGUubGlmZUN5Y2xlUmVkdWNlcnMgJiYge1xuICAgICAgICB0YWc6IFwiTGlmZUN5Y2xlUmVkdWNlcnNcIixcbiAgICAgICAgdmFsdWU6IG1vZHVsZS5saWZlQ3ljbGVSZWR1Y2Vyc1xuICAgICAgfVxuICAgICk7XG4gICAgcHVzaChcbiAgICAgIG1vZHVsZS5yb3dMZXZlbFNlY3VyaXR5ICYmIHtcbiAgICAgICAgdGFnOiBcIlJvd0xldmVsU2VjdXJpdHlcIixcbiAgICAgICAgdmFsdWU6IG1vZHVsZS5yb3dMZXZlbFNlY3VyaXR5XG4gICAgICB9XG4gICAgKTtcbiAgICBwdXNoKFxuICAgICAgbW9kdWxlLmV4cGxpY2l0TmFtZXMgJiYge1xuICAgICAgICB0YWc6IFwiRXhwbGljaXROYW1lc1wiLFxuICAgICAgICB2YWx1ZTogbW9kdWxlLmV4cGxpY2l0TmFtZXNcbiAgICAgIH1cbiAgICApO1xuICAgIHB1c2goXG4gICAgICBtb2R1bGUuY2FzZUNvbnZlcnNpb25Qb2xpY3kgJiYge1xuICAgICAgICB0YWc6IFwiQ2FzZUNvbnZlcnNpb25Qb2xpY3lcIixcbiAgICAgICAgdmFsdWU6IG1vZHVsZS5jYXNlQ29udmVyc2lvblBvbGljeVxuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIHsgc2VjdGlvbnMgfTtcbiAgfVxuICAvKipcbiAgICogU2V0IHRoZSBjYXNlIGNvbnZlcnNpb24gcG9saWN5IGZvciB0aGlzIG1vZHVsZS5cbiAgICogQ2FsbGVkIGJ5IHRoZSBzZXR0aW5ncyBtZWNoYW5pc20uXG4gICAqL1xuICBzZXRDYXNlQ29udmVyc2lvblBvbGljeShwb2xpY3kpIHtcbiAgICB0aGlzLiNtb2R1bGVEZWYuY2FzZUNvbnZlcnNpb25Qb2xpY3kgPSBwb2xpY3k7XG4gIH1cbiAgZ2V0IHR5cGVzcGFjZSgpIHtcbiAgICByZXR1cm4gdGhpcy4jbW9kdWxlRGVmLnR5cGVzcGFjZTtcbiAgfVxuICAvKipcbiAgICogUmVzb2x2ZXMgdGhlIGFjdHVhbCB0eXBlIG9mIGEgVHlwZUJ1aWxkZXIgYnkgZm9sbG93aW5nIGl0cyByZWZlcmVuY2VzIHVudGlsIGl0IHJlYWNoZXMgYSBub24tcmVmIHR5cGUuXG4gICAqIEBwYXJhbSB0eXBlc3BhY2UgVGhlIHR5cGVzcGFjZSB0byByZXNvbHZlIHR5cGVzIGFnYWluc3QuXG4gICAqIEBwYXJhbSB0eXBlQnVpbGRlciBUaGUgVHlwZUJ1aWxkZXIgdG8gcmVzb2x2ZS5cbiAgICogQHJldHVybnMgVGhlIHJlc29sdmVkIGFsZ2VicmFpYyB0eXBlLlxuICAgKi9cbiAgcmVzb2x2ZVR5cGUodHlwZUJ1aWxkZXIpIHtcbiAgICBsZXQgdHkgPSB0eXBlQnVpbGRlci5hbGdlYnJhaWNUeXBlO1xuICAgIHdoaWxlICh0eS50YWcgPT09IFwiUmVmXCIpIHtcbiAgICAgIHR5ID0gdGhpcy50eXBlc3BhY2UudHlwZXNbdHkudmFsdWVdO1xuICAgIH1cbiAgICByZXR1cm4gdHk7XG4gIH1cbiAgLyoqXG4gICAqIEFkZHMgYSB0eXBlIHRvIHRoZSBtb2R1bGUgZGVmaW5pdGlvbidzIHR5cGVzcGFjZSBhcyBhIGBSZWZgIGlmIGl0IGlzIGEgbmFtZWQgY29tcG91bmQgdHlwZSAoUHJvZHVjdCBvciBTdW0pLlxuICAgKiBPdGhlcndpc2UsIHJldHVybnMgdGhlIHR5cGUgYXMgaXMuXG4gICAqIEBwYXJhbSBuYW1lXG4gICAqIEBwYXJhbSB0eVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHR5cGVCdWlsZGVyKSB7XG4gICAgaWYgKHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgUHJvZHVjdEJ1aWxkZXIgJiYgIWlzVW5pdCh0eXBlQnVpbGRlcikgfHwgdHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBTdW1CdWlsZGVyIHx8IHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgUm93QnVpbGRlcikge1xuICAgICAgcmV0dXJuIHRoaXMuI3JlZ2lzdGVyQ29tcG91bmRUeXBlUmVjdXJzaXZlbHkodHlwZUJ1aWxkZXIpO1xuICAgIH0gZWxzZSBpZiAodHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBPcHRpb25CdWlsZGVyKSB7XG4gICAgICByZXR1cm4gbmV3IE9wdGlvbkJ1aWxkZXIoXG4gICAgICAgIHRoaXMucmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHR5cGVCdWlsZGVyLnZhbHVlKVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgUmVzdWx0QnVpbGRlcikge1xuICAgICAgcmV0dXJuIG5ldyBSZXN1bHRCdWlsZGVyKFxuICAgICAgICB0aGlzLnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseSh0eXBlQnVpbGRlci5vayksXG4gICAgICAgIHRoaXMucmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHR5cGVCdWlsZGVyLmVycilcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICh0eXBlQnVpbGRlciBpbnN0YW5jZW9mIEFycmF5QnVpbGRlcikge1xuICAgICAgcmV0dXJuIG5ldyBBcnJheUJ1aWxkZXIoXG4gICAgICAgIHRoaXMucmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHR5cGVCdWlsZGVyLmVsZW1lbnQpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHlwZUJ1aWxkZXI7XG4gICAgfVxuICB9XG4gICNyZWdpc3RlckNvbXBvdW5kVHlwZVJlY3Vyc2l2ZWx5KHR5cGVCdWlsZGVyKSB7XG4gICAgY29uc3QgdHkgPSB0eXBlQnVpbGRlci5hbGdlYnJhaWNUeXBlO1xuICAgIGNvbnN0IG5hbWUgPSB0eXBlQnVpbGRlci50eXBlTmFtZTtcbiAgICBpZiAobmFtZSA9PT0gdm9pZCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBNaXNzaW5nIHR5cGUgbmFtZSBmb3IgJHt0eXBlQnVpbGRlci5jb25zdHJ1Y3Rvci5uYW1lID8/IFwiVHlwZUJ1aWxkZXJcIn0gJHtKU09OLnN0cmluZ2lmeSh0eXBlQnVpbGRlcil9YFxuICAgICAgKTtcbiAgICB9XG4gICAgbGV0IHIgPSB0aGlzLiNjb21wb3VuZFR5cGVzLmdldCh0eSk7XG4gICAgaWYgKHIgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHI7XG4gICAgfVxuICAgIGNvbnN0IG5ld1R5ID0gdHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBSb3dCdWlsZGVyIHx8IHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgUHJvZHVjdEJ1aWxkZXIgPyB7XG4gICAgICB0YWc6IFwiUHJvZHVjdFwiLFxuICAgICAgdmFsdWU6IHsgZWxlbWVudHM6IFtdIH1cbiAgICB9IDoge1xuICAgICAgdGFnOiBcIlN1bVwiLFxuICAgICAgdmFsdWU6IHsgdmFyaWFudHM6IFtdIH1cbiAgICB9O1xuICAgIHIgPSBuZXcgUmVmQnVpbGRlcih0aGlzLiNtb2R1bGVEZWYudHlwZXNwYWNlLnR5cGVzLmxlbmd0aCk7XG4gICAgdGhpcy4jbW9kdWxlRGVmLnR5cGVzcGFjZS50eXBlcy5wdXNoKG5ld1R5KTtcbiAgICB0aGlzLiNjb21wb3VuZFR5cGVzLnNldCh0eSwgcik7XG4gICAgaWYgKHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgUm93QnVpbGRlcikge1xuICAgICAgZm9yIChjb25zdCBbbmFtZTIsIGVsZW1dIG9mIE9iamVjdC5lbnRyaWVzKHR5cGVCdWlsZGVyLnJvdykpIHtcbiAgICAgICAgbmV3VHkudmFsdWUuZWxlbWVudHMucHVzaCh7XG4gICAgICAgICAgbmFtZTogbmFtZTIsXG4gICAgICAgICAgYWxnZWJyYWljVHlwZTogdGhpcy5yZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkoZWxlbS50eXBlQnVpbGRlcikuYWxnZWJyYWljVHlwZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgUHJvZHVjdEJ1aWxkZXIpIHtcbiAgICAgIGZvciAoY29uc3QgW25hbWUyLCBlbGVtXSBvZiBPYmplY3QuZW50cmllcyh0eXBlQnVpbGRlci5lbGVtZW50cykpIHtcbiAgICAgICAgbmV3VHkudmFsdWUuZWxlbWVudHMucHVzaCh7XG4gICAgICAgICAgbmFtZTogbmFtZTIsXG4gICAgICAgICAgYWxnZWJyYWljVHlwZTogdGhpcy5yZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkoZWxlbSkuYWxnZWJyYWljVHlwZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgU3VtQnVpbGRlcikge1xuICAgICAgZm9yIChjb25zdCBbbmFtZTIsIHZhcmlhbnRdIG9mIE9iamVjdC5lbnRyaWVzKHR5cGVCdWlsZGVyLnZhcmlhbnRzKSkge1xuICAgICAgICBuZXdUeS52YWx1ZS52YXJpYW50cy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBuYW1lMixcbiAgICAgICAgICBhbGdlYnJhaWNUeXBlOiB0aGlzLnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseSh2YXJpYW50KS5hbGdlYnJhaWNUeXBlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLiNtb2R1bGVEZWYudHlwZXMucHVzaCh7XG4gICAgICBzb3VyY2VOYW1lOiBzcGxpdE5hbWUobmFtZSksXG4gICAgICB0eTogci5yZWYsXG4gICAgICBjdXN0b21PcmRlcmluZzogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiByO1xuICB9XG59O1xuZnVuY3Rpb24gaXNVbml0KHR5cGVCdWlsZGVyKSB7XG4gIHJldHVybiB0eXBlQnVpbGRlci50eXBlTmFtZSA9PSBudWxsICYmIHR5cGVCdWlsZGVyLmFsZ2VicmFpY1R5cGUudmFsdWUuZWxlbWVudHMubGVuZ3RoID09PSAwO1xufVxuZnVuY3Rpb24gc3BsaXROYW1lKG5hbWUpIHtcbiAgY29uc3Qgc2NvcGUgPSBuYW1lLnNwbGl0KFwiLlwiKTtcbiAgcmV0dXJuIHsgc291cmNlTmFtZTogc2NvcGUucG9wKCksIHNjb3BlIH07XG59XG5cbi8vIHNyYy9zZXJ2ZXIvaHR0cF9pbnRlcm5hbC50c1xudmFyIGltcG9ydF9zdGF0dXNlcyA9IF9fdG9FU00ocmVxdWlyZV9zdGF0dXNlcygpKTtcblxuLy8gc3JjL3NlcnZlci9yYW5nZS50c1xudmFyIFJhbmdlID0gY2xhc3Mge1xuICAjZnJvbTtcbiAgI3RvO1xuICBjb25zdHJ1Y3Rvcihmcm9tLCB0bykge1xuICAgIHRoaXMuI2Zyb20gPSBmcm9tID8/IHsgdGFnOiBcInVuYm91bmRlZFwiIH07XG4gICAgdGhpcy4jdG8gPSB0byA/PyB7IHRhZzogXCJ1bmJvdW5kZWRcIiB9O1xuICB9XG4gIGdldCBmcm9tKCkge1xuICAgIHJldHVybiB0aGlzLiNmcm9tO1xuICB9XG4gIGdldCB0bygpIHtcbiAgICByZXR1cm4gdGhpcy4jdG87XG4gIH1cbn07XG5cbi8vIHNyYy9saWIvdGFibGUudHNcbmZ1bmN0aW9uIHRhYmxlKG9wdHMsIHJvdywgLi4uXykge1xuICBjb25zdCB7XG4gICAgbmFtZSxcbiAgICBwdWJsaWM6IGlzUHVibGljID0gZmFsc2UsXG4gICAgaW5kZXhlczogdXNlckluZGV4ZXMgPSBbXSxcbiAgICBzY2hlZHVsZWQsXG4gICAgZXZlbnQ6IGlzRXZlbnQgPSBmYWxzZVxuICB9ID0gb3B0cztcbiAgY29uc3QgY29sSWRzID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgY29uc3QgY29sTmFtZUxpc3QgPSBbXTtcbiAgaWYgKCEocm93IGluc3RhbmNlb2YgUm93QnVpbGRlcikpIHtcbiAgICByb3cgPSBuZXcgUm93QnVpbGRlcihyb3cpO1xuICB9XG4gIHJvdy5hbGdlYnJhaWNUeXBlLnZhbHVlLmVsZW1lbnRzLmZvckVhY2goKGVsZW0sIGkpID0+IHtcbiAgICBjb2xJZHMuc2V0KGVsZW0ubmFtZSwgaSk7XG4gICAgY29sTmFtZUxpc3QucHVzaChlbGVtLm5hbWUpO1xuICB9KTtcbiAgY29uc3QgcGsgPSBbXTtcbiAgY29uc3QgaW5kZXhlcyA9IFtdO1xuICBjb25zdCBjb25zdHJhaW50cyA9IFtdO1xuICBjb25zdCBzZXF1ZW5jZXMgPSBbXTtcbiAgbGV0IHNjaGVkdWxlQXRDb2w7XG4gIGNvbnN0IGRlZmF1bHRWYWx1ZXMgPSBbXTtcbiAgZm9yIChjb25zdCBbbmFtZTIsIGJ1aWxkZXJdIG9mIE9iamVjdC5lbnRyaWVzKHJvdy5yb3cpKSB7XG4gICAgY29uc3QgbWV0YSA9IGJ1aWxkZXIuY29sdW1uTWV0YWRhdGE7XG4gICAgaWYgKG1ldGEuaXNQcmltYXJ5S2V5KSB7XG4gICAgICBway5wdXNoKGNvbElkcy5nZXQobmFtZTIpKTtcbiAgICB9XG4gICAgY29uc3QgaXNVbmlxdWUgPSBtZXRhLmlzVW5pcXVlIHx8IG1ldGEuaXNQcmltYXJ5S2V5O1xuICAgIGlmIChtZXRhLmluZGV4VHlwZSB8fCBpc1VuaXF1ZSkge1xuICAgICAgY29uc3QgYWxnbyA9IG1ldGEuaW5kZXhUeXBlID8/IFwiYnRyZWVcIjtcbiAgICAgIGNvbnN0IGlkID0gY29sSWRzLmdldChuYW1lMik7XG4gICAgICBsZXQgYWxnb3JpdGhtO1xuICAgICAgc3dpdGNoIChhbGdvKSB7XG4gICAgICAgIGNhc2UgXCJidHJlZVwiOlxuICAgICAgICAgIGFsZ29yaXRobSA9IFJhd0luZGV4QWxnb3JpdGhtLkJUcmVlKFtpZF0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaGFzaFwiOlxuICAgICAgICAgIGFsZ29yaXRobSA9IFJhd0luZGV4QWxnb3JpdGhtLkhhc2goW2lkXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkaXJlY3RcIjpcbiAgICAgICAgICBhbGdvcml0aG0gPSBSYXdJbmRleEFsZ29yaXRobS5EaXJlY3QoaWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaW5kZXhlcy5wdXNoKHtcbiAgICAgICAgc291cmNlTmFtZTogdm9pZCAwLFxuICAgICAgICAvLyBVbm5hbWVkIGluZGV4ZXMgd2lsbCBiZSBhc3NpZ25lZCBhIGdsb2JhbGx5IHVuaXF1ZSBuYW1lXG4gICAgICAgIGFjY2Vzc29yTmFtZTogbmFtZTIsXG4gICAgICAgIGFsZ29yaXRobVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChpc1VuaXF1ZSkge1xuICAgICAgY29uc3RyYWludHMucHVzaCh7XG4gICAgICAgIHNvdXJjZU5hbWU6IHZvaWQgMCxcbiAgICAgICAgZGF0YTogeyB0YWc6IFwiVW5pcXVlXCIsIHZhbHVlOiB7IGNvbHVtbnM6IFtjb2xJZHMuZ2V0KG5hbWUyKV0gfSB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1ldGEuaXNBdXRvSW5jcmVtZW50KSB7XG4gICAgICBzZXF1ZW5jZXMucHVzaCh7XG4gICAgICAgIHNvdXJjZU5hbWU6IHZvaWQgMCxcbiAgICAgICAgc3RhcnQ6IHZvaWQgMCxcbiAgICAgICAgbWluVmFsdWU6IHZvaWQgMCxcbiAgICAgICAgbWF4VmFsdWU6IHZvaWQgMCxcbiAgICAgICAgY29sdW1uOiBjb2xJZHMuZ2V0KG5hbWUyKSxcbiAgICAgICAgaW5jcmVtZW50OiAxblxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChtZXRhLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgY29uc3Qgd3JpdGVyID0gbmV3IEJpbmFyeVdyaXRlcigxNik7XG4gICAgICBidWlsZGVyLnNlcmlhbGl6ZSh3cml0ZXIsIG1ldGEuZGVmYXVsdFZhbHVlKTtcbiAgICAgIGRlZmF1bHRWYWx1ZXMucHVzaCh7XG4gICAgICAgIGNvbElkOiBjb2xJZHMuZ2V0KG5hbWUyKSxcbiAgICAgICAgdmFsdWU6IHdyaXRlci5nZXRCdWZmZXIoKVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChzY2hlZHVsZWQpIHtcbiAgICAgIGNvbnN0IGFsZ2VicmFpY1R5cGUgPSBidWlsZGVyLnR5cGVCdWlsZGVyLmFsZ2VicmFpY1R5cGU7XG4gICAgICBpZiAoc2NoZWR1bGVfYXRfZGVmYXVsdC5pc1NjaGVkdWxlQXQoYWxnZWJyYWljVHlwZSkpIHtcbiAgICAgICAgc2NoZWR1bGVBdENvbCA9IGNvbElkcy5nZXQobmFtZTIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IGluZGV4T3B0cyBvZiB1c2VySW5kZXhlcyA/PyBbXSkge1xuICAgIGNvbnN0IGFjY2Vzc29yID0gaW5kZXhPcHRzLmFjY2Vzc29yO1xuICAgIGlmICh0eXBlb2YgYWNjZXNzb3IgIT09IFwic3RyaW5nXCIgfHwgYWNjZXNzb3IubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zdCB0YWJsZUxhYmVsID0gbmFtZSA/PyBcIjx1bm5hbWVkPlwiO1xuICAgICAgY29uc3QgaW5kZXhMYWJlbCA9IGluZGV4T3B0cy5uYW1lID8/IFwiPHVubmFtZWQ+XCI7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICBgSW5kZXggJyR7aW5kZXhMYWJlbH0nIG9uIHRhYmxlICcke3RhYmxlTGFiZWx9JyBtdXN0IGRlZmluZSBhIG5vbi1lbXB0eSAnYWNjZXNzb3InYFxuICAgICAgKTtcbiAgICB9XG4gICAgbGV0IGFsZ29yaXRobTtcbiAgICBzd2l0Y2ggKGluZGV4T3B0cy5hbGdvcml0aG0pIHtcbiAgICAgIGNhc2UgXCJidHJlZVwiOlxuICAgICAgICBhbGdvcml0aG0gPSB7XG4gICAgICAgICAgdGFnOiBcIkJUcmVlXCIsXG4gICAgICAgICAgdmFsdWU6IGluZGV4T3B0cy5jb2x1bW5zLm1hcCgoYykgPT4gY29sSWRzLmdldChjKSlcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiaGFzaFwiOlxuICAgICAgICBhbGdvcml0aG0gPSB7XG4gICAgICAgICAgdGFnOiBcIkhhc2hcIixcbiAgICAgICAgICB2YWx1ZTogaW5kZXhPcHRzLmNvbHVtbnMubWFwKChjKSA9PiBjb2xJZHMuZ2V0KGMpKVxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkaXJlY3RcIjpcbiAgICAgICAgYWxnb3JpdGhtID0geyB0YWc6IFwiRGlyZWN0XCIsIHZhbHVlOiBjb2xJZHMuZ2V0KGluZGV4T3B0cy5jb2x1bW4pIH07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpbmRleGVzLnB1c2goe1xuICAgICAgc291cmNlTmFtZTogdm9pZCAwLFxuICAgICAgYWNjZXNzb3JOYW1lOiBhY2Nlc3NvcixcbiAgICAgIGFsZ29yaXRobSxcbiAgICAgIGNhbm9uaWNhbE5hbWU6IGluZGV4T3B0cy5uYW1lXG4gICAgfSk7XG4gIH1cbiAgZm9yIChjb25zdCBjb25zdHJhaW50T3B0cyBvZiBvcHRzLmNvbnN0cmFpbnRzID8/IFtdKSB7XG4gICAgaWYgKGNvbnN0cmFpbnRPcHRzLmNvbnN0cmFpbnQgPT09IFwidW5pcXVlXCIpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHRhZzogXCJVbmlxdWVcIixcbiAgICAgICAgdmFsdWU6IHsgY29sdW1uczogY29uc3RyYWludE9wdHMuY29sdW1ucy5tYXAoKGMpID0+IGNvbElkcy5nZXQoYykpIH1cbiAgICAgIH07XG4gICAgICBjb25zdHJhaW50cy5wdXNoKHsgc291cmNlTmFtZTogY29uc3RyYWludE9wdHMubmFtZSwgZGF0YSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgfVxuICBjb25zdCBwcm9kdWN0VHlwZSA9IHJvdy5hbGdlYnJhaWNUeXBlLnZhbHVlO1xuICBjb25zdCBzY2hlZHVsZSA9IHNjaGVkdWxlZCAmJiBzY2hlZHVsZUF0Q29sICE9PSB2b2lkIDAgPyB7IHNjaGVkdWxlQXRDb2wsIHJlZHVjZXI6IHNjaGVkdWxlZCB9IDogdm9pZCAwO1xuICByZXR1cm4ge1xuICAgIHJvd1R5cGU6IHJvdyxcbiAgICB0YWJsZU5hbWU6IG5hbWUsXG4gICAgcm93U3BhY2V0aW1lVHlwZTogcHJvZHVjdFR5cGUsXG4gICAgdGFibGVEZWY6IChjdHgsIGFjY05hbWUpID0+IHtcbiAgICAgIGNvbnN0IHRhYmxlTmFtZSA9IG5hbWUgPz8gYWNjTmFtZTtcbiAgICAgIGlmIChyb3cudHlwZU5hbWUgPT09IHZvaWQgMCkge1xuICAgICAgICByb3cudHlwZU5hbWUgPSB0b1Bhc2NhbENhc2UodGFibGVOYW1lKTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgaW5kZXggb2YgaW5kZXhlcykge1xuICAgICAgICBjb25zdCBjb2xzID0gaW5kZXguYWxnb3JpdGhtLnRhZyA9PT0gXCJEaXJlY3RcIiA/IFtpbmRleC5hbGdvcml0aG0udmFsdWVdIDogaW5kZXguYWxnb3JpdGhtLnZhbHVlO1xuICAgICAgICBjb25zdCBjb2xTID0gY29scy5tYXAoKGkpID0+IGNvbE5hbWVMaXN0W2ldKS5qb2luKFwiX1wiKTtcbiAgICAgICAgY29uc3Qgc291cmNlTmFtZSA9IGluZGV4LnNvdXJjZU5hbWUgPSBgJHthY2NOYW1lfV8ke2NvbFN9X2lkeF8ke2luZGV4LmFsZ29yaXRobS50YWcudG9Mb3dlckNhc2UoKX1gO1xuICAgICAgICBjb25zdCB7IGNhbm9uaWNhbE5hbWUgfSA9IGluZGV4O1xuICAgICAgICBpZiAoY2Fub25pY2FsTmFtZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY3R4Lm1vZHVsZURlZi5leHBsaWNpdE5hbWVzLmVudHJpZXMucHVzaChcbiAgICAgICAgICAgIEV4cGxpY2l0TmFtZUVudHJ5LkluZGV4KHsgc291cmNlTmFtZSwgY2Fub25pY2FsTmFtZSB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNvdXJjZU5hbWU6IGFjY05hbWUsXG4gICAgICAgIHByb2R1Y3RUeXBlUmVmOiBjdHgucmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHJvdykucmVmLFxuICAgICAgICBwcmltYXJ5S2V5OiBwayxcbiAgICAgICAgaW5kZXhlcyxcbiAgICAgICAgY29uc3RyYWludHMsXG4gICAgICAgIHNlcXVlbmNlcyxcbiAgICAgICAgdGFibGVUeXBlOiB7IHRhZzogXCJVc2VyXCIgfSxcbiAgICAgICAgdGFibGVBY2Nlc3M6IHsgdGFnOiBpc1B1YmxpYyA/IFwiUHVibGljXCIgOiBcIlByaXZhdGVcIiB9LFxuICAgICAgICBkZWZhdWx0VmFsdWVzLFxuICAgICAgICBpc0V2ZW50XG4gICAgICB9O1xuICAgIH0sXG4gICAgLy8gUHJlc2VydmUgdGhlIGRlY2xhcmVkIGluZGV4IG9wdGlvbnMgYXMgcnVudGltZSBkYXRhIHNvIGB0YWJsZVRvU2NoZW1hYFxuICAgIC8vIGNhbiBleHBvc2UgdGhlbSB3aXRob3V0IHR5cGUtc211Z2dsaW5nLlxuICAgIGlkeHM6IHVzZXJJbmRleGVzLFxuICAgIGNvbnN0cmFpbnRzLFxuICAgIHNjaGVkdWxlXG4gIH07XG59XG5cbi8vIHNyYy9saWIvcXVlcnkudHNcbnZhciBRdWVyeUJyYW5kID0gU3ltYm9sKFwiUXVlcnlCcmFuZFwiKTtcbnZhciBpc1Jvd1R5cGVkUXVlcnkgPSAodmFsKSA9PiAhIXZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiICYmIFF1ZXJ5QnJhbmQgaW4gdmFsO1xudmFyIGlzVHlwZWRRdWVyeSA9ICh2YWwpID0+ICEhdmFsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIgJiYgUXVlcnlCcmFuZCBpbiB2YWw7XG5mdW5jdGlvbiB0b1NxbChxKSB7XG4gIHJldHVybiBxLnRvU3FsKCk7XG59XG52YXIgU2VtaWpvaW5JbXBsID0gY2xhc3MgX1NlbWlqb2luSW1wbCB7XG4gIGNvbnN0cnVjdG9yKHNvdXJjZVF1ZXJ5LCBmaWx0ZXJRdWVyeSwgam9pbkNvbmRpdGlvbikge1xuICAgIHRoaXMuc291cmNlUXVlcnkgPSBzb3VyY2VRdWVyeTtcbiAgICB0aGlzLmZpbHRlclF1ZXJ5ID0gZmlsdGVyUXVlcnk7XG4gICAgdGhpcy5qb2luQ29uZGl0aW9uID0gam9pbkNvbmRpdGlvbjtcbiAgICBpZiAoc291cmNlUXVlcnkudGFibGUuc291cmNlTmFtZSA9PT0gZmlsdGVyUXVlcnkudGFibGUuc291cmNlTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHNlbWlqb2luIGEgdGFibGUgdG8gaXRzZWxmXCIpO1xuICAgIH1cbiAgfVxuICBbUXVlcnlCcmFuZF0gPSB0cnVlO1xuICB0eXBlID0gXCJzZW1pam9pblwiO1xuICBidWlsZCgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB3aGVyZShwcmVkaWNhdGUpIHtcbiAgICBjb25zdCBuZXh0U291cmNlUXVlcnkgPSB0aGlzLnNvdXJjZVF1ZXJ5LndoZXJlKHByZWRpY2F0ZSk7XG4gICAgcmV0dXJuIG5ldyBfU2VtaWpvaW5JbXBsKFxuICAgICAgbmV4dFNvdXJjZVF1ZXJ5LFxuICAgICAgdGhpcy5maWx0ZXJRdWVyeSxcbiAgICAgIHRoaXMuam9pbkNvbmRpdGlvblxuICAgICk7XG4gIH1cbiAgdG9TcWwoKSB7XG4gICAgY29uc3QgbGVmdCA9IHRoaXMuZmlsdGVyUXVlcnk7XG4gICAgY29uc3QgcmlnaHQgPSB0aGlzLnNvdXJjZVF1ZXJ5O1xuICAgIGNvbnN0IGxlZnRUYWJsZSA9IHF1b3RlSWRlbnRpZmllcihsZWZ0LnRhYmxlLnNvdXJjZU5hbWUpO1xuICAgIGNvbnN0IHJpZ2h0VGFibGUgPSBxdW90ZUlkZW50aWZpZXIocmlnaHQudGFibGUuc291cmNlTmFtZSk7XG4gICAgbGV0IHNxbCA9IGBTRUxFQ1QgJHtyaWdodFRhYmxlfS4qIEZST00gJHtsZWZ0VGFibGV9IEpPSU4gJHtyaWdodFRhYmxlfSBPTiAke2Jvb2xlYW5FeHByVG9TcWwodGhpcy5qb2luQ29uZGl0aW9uKX1gO1xuICAgIGNvbnN0IGNsYXVzZXMgPSBbXTtcbiAgICBpZiAobGVmdC53aGVyZUNsYXVzZSkge1xuICAgICAgY2xhdXNlcy5wdXNoKGJvb2xlYW5FeHByVG9TcWwobGVmdC53aGVyZUNsYXVzZSkpO1xuICAgIH1cbiAgICBpZiAocmlnaHQud2hlcmVDbGF1c2UpIHtcbiAgICAgIGNsYXVzZXMucHVzaChib29sZWFuRXhwclRvU3FsKHJpZ2h0LndoZXJlQ2xhdXNlKSk7XG4gICAgfVxuICAgIGlmIChjbGF1c2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHdoZXJlU3FsID0gY2xhdXNlcy5sZW5ndGggPT09IDEgPyBjbGF1c2VzWzBdIDogY2xhdXNlcy5tYXAod3JhcEluUGFyZW5zKS5qb2luKFwiIEFORCBcIik7XG4gICAgICBzcWwgKz0gYCBXSEVSRSAke3doZXJlU3FsfWA7XG4gICAgfVxuICAgIHJldHVybiBzcWw7XG4gIH1cbn07XG52YXIgRnJvbUJ1aWxkZXIgPSBjbGFzcyBfRnJvbUJ1aWxkZXIge1xuICBjb25zdHJ1Y3Rvcih0YWJsZTIsIHdoZXJlQ2xhdXNlKSB7XG4gICAgdGhpcy50YWJsZSA9IHRhYmxlMjtcbiAgICB0aGlzLndoZXJlQ2xhdXNlID0gd2hlcmVDbGF1c2U7XG4gIH1cbiAgW1F1ZXJ5QnJhbmRdID0gdHJ1ZTtcbiAgd2hlcmUocHJlZGljYXRlKSB7XG4gICAgY29uc3QgbmV3Q29uZGl0aW9uID0gbm9ybWFsaXplUHJlZGljYXRlRXhwcihwcmVkaWNhdGUodGhpcy50YWJsZS5jb2xzKSk7XG4gICAgY29uc3QgbmV4dFdoZXJlID0gdGhpcy53aGVyZUNsYXVzZSA/IHRoaXMud2hlcmVDbGF1c2UuYW5kKG5ld0NvbmRpdGlvbikgOiBuZXdDb25kaXRpb247XG4gICAgcmV0dXJuIG5ldyBfRnJvbUJ1aWxkZXIodGhpcy50YWJsZSwgbmV4dFdoZXJlKTtcbiAgfVxuICByaWdodFNlbWlqb2luKHJpZ2h0LCBvbikge1xuICAgIGNvbnN0IHNvdXJjZVF1ZXJ5ID0gbmV3IF9Gcm9tQnVpbGRlcihyaWdodCk7XG4gICAgY29uc3Qgam9pbkNvbmRpdGlvbiA9IG9uKFxuICAgICAgdGhpcy50YWJsZS5pbmRleGVkQ29scyxcbiAgICAgIHJpZ2h0LmluZGV4ZWRDb2xzXG4gICAgKTtcbiAgICByZXR1cm4gbmV3IFNlbWlqb2luSW1wbChzb3VyY2VRdWVyeSwgdGhpcywgam9pbkNvbmRpdGlvbik7XG4gIH1cbiAgbGVmdFNlbWlqb2luKHJpZ2h0LCBvbikge1xuICAgIGNvbnN0IGZpbHRlclF1ZXJ5ID0gbmV3IF9Gcm9tQnVpbGRlcihyaWdodCk7XG4gICAgY29uc3Qgam9pbkNvbmRpdGlvbiA9IG9uKFxuICAgICAgdGhpcy50YWJsZS5pbmRleGVkQ29scyxcbiAgICAgIHJpZ2h0LmluZGV4ZWRDb2xzXG4gICAgKTtcbiAgICByZXR1cm4gbmV3IFNlbWlqb2luSW1wbCh0aGlzLCBmaWx0ZXJRdWVyeSwgam9pbkNvbmRpdGlvbik7XG4gIH1cbiAgdG9TcWwoKSB7XG4gICAgcmV0dXJuIHJlbmRlclNlbGVjdFNxbFdpdGhKb2lucyh0aGlzLnRhYmxlLCB0aGlzLndoZXJlQ2xhdXNlKTtcbiAgfVxuICBidWlsZCgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufTtcbnZhciBUYWJsZVJlZkltcGwgPSBjbGFzcyB7XG4gIFtRdWVyeUJyYW5kXSA9IHRydWU7XG4gIHR5cGUgPSBcInRhYmxlXCI7XG4gIHNvdXJjZU5hbWU7XG4gIGFjY2Vzc29yTmFtZTtcbiAgY29scztcbiAgaW5kZXhlZENvbHM7XG4gIHRhYmxlRGVmO1xuICAvLyBEZWxlZ2F0ZSBVbnR5cGVkVGFibGVEZWYgcHJvcGVydGllcyBmcm9tIHRhYmxlRGVmIHNvIHRoaXMgY2FuIGJlIHVzZWQgYXMgYSB0YWJsZSBkZWYuXG4gIGdldCBjb2x1bW5zKCkge1xuICAgIHJldHVybiB0aGlzLnRhYmxlRGVmLmNvbHVtbnM7XG4gIH1cbiAgZ2V0IGluZGV4ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFibGVEZWYuaW5kZXhlcztcbiAgfVxuICBnZXQgcm93VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50YWJsZURlZi5yb3dUeXBlO1xuICB9XG4gIGdldCBjb25zdHJhaW50cygpIHtcbiAgICByZXR1cm4gdGhpcy50YWJsZURlZi5jb25zdHJhaW50cztcbiAgfVxuICBjb25zdHJ1Y3Rvcih0YWJsZURlZikge1xuICAgIHRoaXMuc291cmNlTmFtZSA9IHRhYmxlRGVmLnNvdXJjZU5hbWU7XG4gICAgdGhpcy5hY2Nlc3Nvck5hbWUgPSB0YWJsZURlZi5hY2Nlc3Nvck5hbWU7XG4gICAgdGhpcy5jb2xzID0gY3JlYXRlUm93RXhwcih0YWJsZURlZik7XG4gICAgdGhpcy5pbmRleGVkQ29scyA9IHRoaXMuY29scztcbiAgICB0aGlzLnRhYmxlRGVmID0gdGFibGVEZWY7XG4gICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbiAgfVxuICBhc0Zyb20oKSB7XG4gICAgcmV0dXJuIG5ldyBGcm9tQnVpbGRlcih0aGlzKTtcbiAgfVxuICByaWdodFNlbWlqb2luKG90aGVyLCBvbikge1xuICAgIHJldHVybiB0aGlzLmFzRnJvbSgpLnJpZ2h0U2VtaWpvaW4ob3RoZXIsIG9uKTtcbiAgfVxuICBsZWZ0U2VtaWpvaW4ob3RoZXIsIG9uKSB7XG4gICAgcmV0dXJuIHRoaXMuYXNGcm9tKCkubGVmdFNlbWlqb2luKG90aGVyLCBvbik7XG4gIH1cbiAgYnVpbGQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXNGcm9tKCkuYnVpbGQoKTtcbiAgfVxuICB0b1NxbCgpIHtcbiAgICByZXR1cm4gdGhpcy5hc0Zyb20oKS50b1NxbCgpO1xuICB9XG4gIHdoZXJlKHByZWRpY2F0ZSkge1xuICAgIHJldHVybiB0aGlzLmFzRnJvbSgpLndoZXJlKHByZWRpY2F0ZSk7XG4gIH1cbn07XG5mdW5jdGlvbiBjcmVhdGVUYWJsZVJlZkZyb21EZWYodGFibGVEZWYpIHtcbiAgcmV0dXJuIG5ldyBUYWJsZVJlZkltcGwodGFibGVEZWYpO1xufVxuZnVuY3Rpb24gbWFrZVF1ZXJ5QnVpbGRlcihzY2hlbWEyKSB7XG4gIGNvbnN0IHFiID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGZvciAoY29uc3QgdGFibGUyIG9mIE9iamVjdC52YWx1ZXMoc2NoZW1hMi50YWJsZXMpKSB7XG4gICAgY29uc3QgcmVmID0gY3JlYXRlVGFibGVSZWZGcm9tRGVmKFxuICAgICAgdGFibGUyXG4gICAgKTtcbiAgICBxYlt0YWJsZTIuYWNjZXNzb3JOYW1lXSA9IHJlZjtcbiAgfVxuICByZXR1cm4gT2JqZWN0LmZyZWV6ZShxYik7XG59XG5mdW5jdGlvbiBjcmVhdGVSb3dFeHByKHRhYmxlRGVmKSB7XG4gIGNvbnN0IHJvdyA9IHt9O1xuICBmb3IgKGNvbnN0IGNvbHVtbk5hbWUgb2YgT2JqZWN0LmtleXModGFibGVEZWYuY29sdW1ucykpIHtcbiAgICBjb25zdCBjb2x1bW5CdWlsZGVyID0gdGFibGVEZWYuY29sdW1uc1tjb2x1bW5OYW1lXTtcbiAgICBjb25zdCBjb2x1bW4gPSBuZXcgQ29sdW1uRXhwcmVzc2lvbihcbiAgICAgIHRhYmxlRGVmLnNvdXJjZU5hbWUsXG4gICAgICBjb2x1bW5OYW1lLFxuICAgICAgY29sdW1uQnVpbGRlci50eXBlQnVpbGRlci5hbGdlYnJhaWNUeXBlLFxuICAgICAgY29sdW1uQnVpbGRlci5jb2x1bW5NZXRhZGF0YS5uYW1lXG4gICAgKTtcbiAgICByb3dbY29sdW1uTmFtZV0gPSBPYmplY3QuZnJlZXplKGNvbHVtbik7XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5mcmVlemUocm93KTtcbn1cbmZ1bmN0aW9uIHJlbmRlclNlbGVjdFNxbFdpdGhKb2lucyh0YWJsZTIsIHdoZXJlLCBleHRyYUNsYXVzZXMgPSBbXSkge1xuICBjb25zdCBxdW90ZWRUYWJsZSA9IHF1b3RlSWRlbnRpZmllcih0YWJsZTIuc291cmNlTmFtZSk7XG4gIGNvbnN0IHNxbCA9IGBTRUxFQ1QgKiBGUk9NICR7cXVvdGVkVGFibGV9YDtcbiAgY29uc3QgY2xhdXNlcyA9IFtdO1xuICBpZiAod2hlcmUpIGNsYXVzZXMucHVzaChib29sZWFuRXhwclRvU3FsKHdoZXJlKSk7XG4gIGNsYXVzZXMucHVzaCguLi5leHRyYUNsYXVzZXMpO1xuICBpZiAoY2xhdXNlcy5sZW5ndGggPT09IDApIHJldHVybiBzcWw7XG4gIGNvbnN0IHdoZXJlU3FsID0gY2xhdXNlcy5sZW5ndGggPT09IDEgPyBjbGF1c2VzWzBdIDogY2xhdXNlcy5tYXAod3JhcEluUGFyZW5zKS5qb2luKFwiIEFORCBcIik7XG4gIHJldHVybiBgJHtzcWx9IFdIRVJFICR7d2hlcmVTcWx9YDtcbn1cbnZhciBDb2x1bW5FeHByZXNzaW9uID0gY2xhc3Mge1xuICB0eXBlID0gXCJjb2x1bW5cIjtcbiAgLy8gVGhpcyBpcyB0aGUgY29sdW1uIGFjY2Vzc29yXG4gIGNvbHVtbjtcbiAgLy8gVGhlIG5hbWUgb2YgdGhlIGNvbHVtbiBpbiB0aGUgZGF0YWJhc2UuXG4gIGNvbHVtbk5hbWU7XG4gIHRhYmxlO1xuICAvLyBwaGFudG9tOiBhY3R1YWwgcnVudGltZSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAgdHNWYWx1ZVR5cGU7XG4gIHNwYWNldGltZVR5cGU7XG4gIGNvbnN0cnVjdG9yKHRhYmxlMiwgY29sdW1uLCBzcGFjZXRpbWVUeXBlLCBjb2x1bW5OYW1lKSB7XG4gICAgdGhpcy50YWJsZSA9IHRhYmxlMjtcbiAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICB0aGlzLmNvbHVtbk5hbWUgPSBjb2x1bW5OYW1lIHx8IGNvbHVtbjtcbiAgICB0aGlzLnNwYWNldGltZVR5cGUgPSBzcGFjZXRpbWVUeXBlO1xuICB9XG4gIGVxKHgpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xlYW5FeHByKHtcbiAgICAgIHR5cGU6IFwiZXFcIixcbiAgICAgIGxlZnQ6IHRoaXMsXG4gICAgICByaWdodDogbm9ybWFsaXplVmFsdWUoeClcbiAgICB9KTtcbiAgfVxuICBuZSh4KSB7XG4gICAgcmV0dXJuIG5ldyBCb29sZWFuRXhwcih7XG4gICAgICB0eXBlOiBcIm5lXCIsXG4gICAgICBsZWZ0OiB0aGlzLFxuICAgICAgcmlnaHQ6IG5vcm1hbGl6ZVZhbHVlKHgpXG4gICAgfSk7XG4gIH1cbiAgbHQoeCkge1xuICAgIHJldHVybiBuZXcgQm9vbGVhbkV4cHIoe1xuICAgICAgdHlwZTogXCJsdFwiLFxuICAgICAgbGVmdDogdGhpcyxcbiAgICAgIHJpZ2h0OiBub3JtYWxpemVWYWx1ZSh4KVxuICAgIH0pO1xuICB9XG4gIGx0ZSh4KSB7XG4gICAgcmV0dXJuIG5ldyBCb29sZWFuRXhwcih7XG4gICAgICB0eXBlOiBcImx0ZVwiLFxuICAgICAgbGVmdDogdGhpcyxcbiAgICAgIHJpZ2h0OiBub3JtYWxpemVWYWx1ZSh4KVxuICAgIH0pO1xuICB9XG4gIGd0KHgpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xlYW5FeHByKHtcbiAgICAgIHR5cGU6IFwiZ3RcIixcbiAgICAgIGxlZnQ6IHRoaXMsXG4gICAgICByaWdodDogbm9ybWFsaXplVmFsdWUoeClcbiAgICB9KTtcbiAgfVxuICBndGUoeCkge1xuICAgIHJldHVybiBuZXcgQm9vbGVhbkV4cHIoe1xuICAgICAgdHlwZTogXCJndGVcIixcbiAgICAgIGxlZnQ6IHRoaXMsXG4gICAgICByaWdodDogbm9ybWFsaXplVmFsdWUoeClcbiAgICB9KTtcbiAgfVxufTtcbmZ1bmN0aW9uIGxpdGVyYWwodmFsdWUpIHtcbiAgcmV0dXJuIHsgdHlwZTogXCJsaXRlcmFsXCIsIHZhbHVlIH07XG59XG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWwpIHtcbiAgaWYgKHZhbC50eXBlID09PSBcImxpdGVyYWxcIilcbiAgICByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIiAmJiB2YWwgIT0gbnVsbCAmJiBcInR5cGVcIiBpbiB2YWwgJiYgdmFsLnR5cGUgPT09IFwiY29sdW1uXCIpIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG4gIHJldHVybiBsaXRlcmFsKHZhbCk7XG59XG5mdW5jdGlvbiBub3JtYWxpemVQcmVkaWNhdGVFeHByKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEJvb2xlYW5FeHByKSByZXR1cm4gdmFsdWU7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgcmV0dXJuIG5ldyBCb29sZWFuRXhwcih7XG4gICAgICB0eXBlOiBcImVxXCIsXG4gICAgICBsZWZ0OiBsaXRlcmFsKHZhbHVlKSxcbiAgICAgIHJpZ2h0OiBsaXRlcmFsKHRydWUpXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBCb29sZWFuRXhwcih7XG4gICAgdHlwZTogXCJlcVwiLFxuICAgIGxlZnQ6IHZhbHVlLFxuICAgIHJpZ2h0OiBsaXRlcmFsKHRydWUpXG4gIH0pO1xufVxudmFyIEJvb2xlYW5FeHByID0gY2xhc3MgX0Jvb2xlYW5FeHByIHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cbiAgYW5kKG90aGVyKSB7XG4gICAgcmV0dXJuIG5ldyBfQm9vbGVhbkV4cHIoe1xuICAgICAgdHlwZTogXCJhbmRcIixcbiAgICAgIGNsYXVzZXM6IFt0aGlzLmRhdGEsIG90aGVyLmRhdGFdXG4gICAgfSk7XG4gIH1cbiAgb3Iob3RoZXIpIHtcbiAgICByZXR1cm4gbmV3IF9Cb29sZWFuRXhwcih7XG4gICAgICB0eXBlOiBcIm9yXCIsXG4gICAgICBjbGF1c2VzOiBbdGhpcy5kYXRhLCBvdGhlci5kYXRhXVxuICAgIH0pO1xuICB9XG4gIG5vdCgpIHtcbiAgICByZXR1cm4gbmV3IF9Cb29sZWFuRXhwcih7IHR5cGU6IFwibm90XCIsIGNsYXVzZTogdGhpcy5kYXRhIH0pO1xuICB9XG59O1xuZnVuY3Rpb24gbm90KGNsYXVzZSkge1xuICByZXR1cm4gbmV3IEJvb2xlYW5FeHByKHsgdHlwZTogXCJub3RcIiwgY2xhdXNlOiBjbGF1c2UuZGF0YSB9KTtcbn1cbmZ1bmN0aW9uIGFuZChmaXJzdCwgc2Vjb25kLCAuLi5yZXN0KSB7XG4gIGNvbnN0IGNsYXVzZXMgPSBbZmlyc3QsIHNlY29uZCwgLi4ucmVzdF07XG4gIHJldHVybiBuZXcgQm9vbGVhbkV4cHIoe1xuICAgIHR5cGU6IFwiYW5kXCIsXG4gICAgY2xhdXNlczogY2xhdXNlcy5tYXAoKGMpID0+IGMuZGF0YSlcbiAgfSk7XG59XG5mdW5jdGlvbiBvcihmaXJzdCwgc2Vjb25kLCAuLi5yZXN0KSB7XG4gIGNvbnN0IGNsYXVzZXMgPSBbZmlyc3QsIHNlY29uZCwgLi4ucmVzdF07XG4gIHJldHVybiBuZXcgQm9vbGVhbkV4cHIoe1xuICAgIHR5cGU6IFwib3JcIixcbiAgICBjbGF1c2VzOiBjbGF1c2VzLm1hcCgoYykgPT4gYy5kYXRhKVxuICB9KTtcbn1cbmZ1bmN0aW9uIGJvb2xlYW5FeHByVG9TcWwoZXhwciwgdGFibGVBbGlhcykge1xuICBjb25zdCBkYXRhID0gZXhwciBpbnN0YW5jZW9mIEJvb2xlYW5FeHByID8gZXhwci5kYXRhIDogZXhwcjtcbiAgc3dpdGNoIChkYXRhLnR5cGUpIHtcbiAgICBjYXNlIFwiZXFcIjpcbiAgICAgIHJldHVybiBgJHt2YWx1ZUV4cHJUb1NxbChkYXRhLmxlZnQpfSA9ICR7dmFsdWVFeHByVG9TcWwoZGF0YS5yaWdodCl9YDtcbiAgICBjYXNlIFwibmVcIjpcbiAgICAgIHJldHVybiBgJHt2YWx1ZUV4cHJUb1NxbChkYXRhLmxlZnQpfSA8PiAke3ZhbHVlRXhwclRvU3FsKGRhdGEucmlnaHQpfWA7XG4gICAgY2FzZSBcImd0XCI6XG4gICAgICByZXR1cm4gYCR7dmFsdWVFeHByVG9TcWwoZGF0YS5sZWZ0KX0gPiAke3ZhbHVlRXhwclRvU3FsKGRhdGEucmlnaHQpfWA7XG4gICAgY2FzZSBcImd0ZVwiOlxuICAgICAgcmV0dXJuIGAke3ZhbHVlRXhwclRvU3FsKGRhdGEubGVmdCl9ID49ICR7dmFsdWVFeHByVG9TcWwoZGF0YS5yaWdodCl9YDtcbiAgICBjYXNlIFwibHRcIjpcbiAgICAgIHJldHVybiBgJHt2YWx1ZUV4cHJUb1NxbChkYXRhLmxlZnQpfSA8ICR7dmFsdWVFeHByVG9TcWwoZGF0YS5yaWdodCl9YDtcbiAgICBjYXNlIFwibHRlXCI6XG4gICAgICByZXR1cm4gYCR7dmFsdWVFeHByVG9TcWwoZGF0YS5sZWZ0KX0gPD0gJHt2YWx1ZUV4cHJUb1NxbChkYXRhLnJpZ2h0KX1gO1xuICAgIGNhc2UgXCJhbmRcIjpcbiAgICAgIHJldHVybiBkYXRhLmNsYXVzZXMubWFwKChjKSA9PiBib29sZWFuRXhwclRvU3FsKGMpKS5tYXAod3JhcEluUGFyZW5zKS5qb2luKFwiIEFORCBcIik7XG4gICAgY2FzZSBcIm9yXCI6XG4gICAgICByZXR1cm4gZGF0YS5jbGF1c2VzLm1hcCgoYykgPT4gYm9vbGVhbkV4cHJUb1NxbChjKSkubWFwKHdyYXBJblBhcmVucykuam9pbihcIiBPUiBcIik7XG4gICAgY2FzZSBcIm5vdFwiOlxuICAgICAgcmV0dXJuIGBOT1QgJHt3cmFwSW5QYXJlbnMoYm9vbGVhbkV4cHJUb1NxbChkYXRhLmNsYXVzZSkpfWA7XG4gIH1cbn1cbmZ1bmN0aW9uIHdyYXBJblBhcmVucyhzcWwpIHtcbiAgcmV0dXJuIGAoJHtzcWx9KWA7XG59XG5mdW5jdGlvbiB2YWx1ZUV4cHJUb1NxbChleHByLCB0YWJsZUFsaWFzKSB7XG4gIGlmIChpc0xpdGVyYWxFeHByKGV4cHIpKSB7XG4gICAgcmV0dXJuIGxpdGVyYWxWYWx1ZVRvU3FsKGV4cHIudmFsdWUpO1xuICB9XG4gIGNvbnN0IHRhYmxlMiA9IGV4cHIudGFibGU7XG4gIHJldHVybiBgJHtxdW90ZUlkZW50aWZpZXIodGFibGUyKX0uJHtxdW90ZUlkZW50aWZpZXIoZXhwci5jb2x1bW5OYW1lKX1gO1xufVxuZnVuY3Rpb24gbGl0ZXJhbFZhbHVlVG9TcWwodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB2b2lkIDApIHtcbiAgICByZXR1cm4gXCJOVUxMXCI7XG4gIH1cbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSWRlbnRpdHkgfHwgdmFsdWUgaW5zdGFuY2VvZiBDb25uZWN0aW9uSWQpIHtcbiAgICByZXR1cm4gYDB4JHt2YWx1ZS50b0hleFN0cmluZygpfWA7XG4gIH1cbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGltZXN0YW1wKSB7XG4gICAgcmV0dXJuIGAnJHt2YWx1ZS50b0lTT1N0cmluZygpfSdgO1xuICB9XG4gIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgY2FzZSBcIm51bWJlclwiOlxuICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICByZXR1cm4gdmFsdWUgPyBcIlRSVUVcIiA6IFwiRkFMU0VcIjtcbiAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICByZXR1cm4gYCcke3ZhbHVlLnJlcGxhY2UoLycvZywgXCInJ1wiKX0nYDtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGAnJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSkucmVwbGFjZSgvJy9nLCBcIicnXCIpfSdgO1xuICB9XG59XG5mdW5jdGlvbiBxdW90ZUlkZW50aWZpZXIobmFtZSkge1xuICByZXR1cm4gYFwiJHtuYW1lLnJlcGxhY2UoL1wiL2csICdcIlwiJyl9XCJgO1xufVxuZnVuY3Rpb24gaXNMaXRlcmFsRXhwcihleHByKSB7XG4gIHJldHVybiBleHByLnR5cGUgPT09IFwibGl0ZXJhbFwiO1xufVxuZnVuY3Rpb24gZXZhbHVhdGVCb29sZWFuRXhwcihleHByLCByb3cpIHtcbiAgcmV0dXJuIGV2YWx1YXRlRGF0YShleHByLmRhdGEsIHJvdyk7XG59XG5mdW5jdGlvbiBldmFsdWF0ZURhdGEoZGF0YSwgcm93KSB7XG4gIHN3aXRjaCAoZGF0YS50eXBlKSB7XG4gICAgY2FzZSBcImVxXCI6XG4gICAgICByZXR1cm4gcmVzb2x2ZVZhbHVlKGRhdGEubGVmdCwgcm93KSA9PT0gcmVzb2x2ZVZhbHVlKGRhdGEucmlnaHQsIHJvdyk7XG4gICAgY2FzZSBcIm5lXCI6XG4gICAgICByZXR1cm4gcmVzb2x2ZVZhbHVlKGRhdGEubGVmdCwgcm93KSAhPT0gcmVzb2x2ZVZhbHVlKGRhdGEucmlnaHQsIHJvdyk7XG4gICAgY2FzZSBcImd0XCI6XG4gICAgICByZXR1cm4gcmVzb2x2ZVZhbHVlKGRhdGEubGVmdCwgcm93KSA+IHJlc29sdmVWYWx1ZShkYXRhLnJpZ2h0LCByb3cpO1xuICAgIGNhc2UgXCJndGVcIjpcbiAgICAgIHJldHVybiByZXNvbHZlVmFsdWUoZGF0YS5sZWZ0LCByb3cpID49IHJlc29sdmVWYWx1ZShkYXRhLnJpZ2h0LCByb3cpO1xuICAgIGNhc2UgXCJsdFwiOlxuICAgICAgcmV0dXJuIHJlc29sdmVWYWx1ZShkYXRhLmxlZnQsIHJvdykgPCByZXNvbHZlVmFsdWUoZGF0YS5yaWdodCwgcm93KTtcbiAgICBjYXNlIFwibHRlXCI6XG4gICAgICByZXR1cm4gcmVzb2x2ZVZhbHVlKGRhdGEubGVmdCwgcm93KSA8PSByZXNvbHZlVmFsdWUoZGF0YS5yaWdodCwgcm93KTtcbiAgICBjYXNlIFwiYW5kXCI6XG4gICAgICByZXR1cm4gZGF0YS5jbGF1c2VzLmV2ZXJ5KChjKSA9PiBldmFsdWF0ZURhdGEoYywgcm93KSk7XG4gICAgY2FzZSBcIm9yXCI6XG4gICAgICByZXR1cm4gZGF0YS5jbGF1c2VzLnNvbWUoKGMpID0+IGV2YWx1YXRlRGF0YShjLCByb3cpKTtcbiAgICBjYXNlIFwibm90XCI6XG4gICAgICByZXR1cm4gIWV2YWx1YXRlRGF0YShkYXRhLmNsYXVzZSwgcm93KTtcbiAgfVxufVxuZnVuY3Rpb24gcmVzb2x2ZVZhbHVlKGV4cHIsIHJvdykge1xuICBpZiAoaXNMaXRlcmFsRXhwcihleHByKSkge1xuICAgIHJldHVybiB0b0NvbXBhcmFibGVWYWx1ZShleHByLnZhbHVlKTtcbiAgfVxuICByZXR1cm4gdG9Db21wYXJhYmxlVmFsdWUocm93W2V4cHIuY29sdW1uXSk7XG59XG5mdW5jdGlvbiBpc0hleFNlcmlhbGl6YWJsZUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZS50b0hleFN0cmluZyA9PT0gXCJmdW5jdGlvblwiO1xufVxuZnVuY3Rpb24gaXNUaW1lc3RhbXBMaWtlKHZhbHVlKSB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gZmFsc2U7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFRpbWVzdGFtcCkgcmV0dXJuIHRydWU7XG4gIGNvbnN0IG1pY3JvcyA9IHZhbHVlW1wiX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfX1wiXTtcbiAgcmV0dXJuIHR5cGVvZiBtaWNyb3MgPT09IFwiYmlnaW50XCI7XG59XG5mdW5jdGlvbiB0b0NvbXBhcmFibGVWYWx1ZSh2YWx1ZSkge1xuICBpZiAoaXNIZXhTZXJpYWxpemFibGVMaWtlKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS50b0hleFN0cmluZygpO1xuICB9XG4gIGlmIChpc1RpbWVzdGFtcExpa2UodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLl9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX187XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gZ2V0UXVlcnlUYWJsZU5hbWUocXVlcnkpIHtcbiAgaWYgKHF1ZXJ5LnRhYmxlKSByZXR1cm4gcXVlcnkudGFibGUubmFtZTtcbiAgaWYgKHF1ZXJ5Lm5hbWUpIHJldHVybiBxdWVyeS5uYW1lO1xuICBpZiAocXVlcnkuc291cmNlUXVlcnkpIHJldHVybiBxdWVyeS5zb3VyY2VRdWVyeS50YWJsZS5uYW1lO1xuICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZXh0cmFjdCB0YWJsZSBuYW1lIGZyb20gcXVlcnlcIik7XG59XG5mdW5jdGlvbiBnZXRRdWVyeUFjY2Vzc29yTmFtZShxdWVyeSkge1xuICBpZiAocXVlcnkudGFibGUpIHJldHVybiBxdWVyeS50YWJsZS5hY2Nlc3Nvck5hbWU7XG4gIGlmIChxdWVyeS5hY2Nlc3Nvck5hbWUpIHJldHVybiBxdWVyeS5hY2Nlc3Nvck5hbWU7XG4gIGlmIChxdWVyeS5zb3VyY2VRdWVyeSkgcmV0dXJuIHF1ZXJ5LnNvdXJjZVF1ZXJ5LnRhYmxlLmFjY2Vzc29yTmFtZTtcbiAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGV4dHJhY3QgYWNjZXNzb3IgbmFtZSBmcm9tIHF1ZXJ5XCIpO1xufVxuZnVuY3Rpb24gZ2V0UXVlcnlXaGVyZUNsYXVzZShxdWVyeSkge1xuICBpZiAocXVlcnkud2hlcmVDbGF1c2UpIHJldHVybiBxdWVyeS53aGVyZUNsYXVzZTtcbiAgcmV0dXJuIHZvaWQgMDtcbn1cblxuLy8gc3JjL3NlcnZlci92aWV3cy50c1xuZnVuY3Rpb24gbWFrZVZpZXdFeHBvcnQoY3R4LCBvcHRzLCBwYXJhbXMsIHJldCwgZm4pIHtcbiAgY29uc3Qgdmlld0V4cG9ydCA9IChcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHR5cGVzY3JpcHQgaW5jb3JyZWN0bHkgc2F5cyBGdW5jdGlvbiNiaW5kIHJlcXVpcmVzIGFuIGFyZ3VtZW50LlxuICAgIGZuLmJpbmQoKVxuICApO1xuICB2aWV3RXhwb3J0W2V4cG9ydENvbnRleHRdID0gY3R4O1xuICB2aWV3RXhwb3J0W3JlZ2lzdGVyRXhwb3J0XSA9IChjdHgyLCBleHBvcnROYW1lKSA9PiB7XG4gICAgcmVnaXN0ZXJWaWV3KGN0eDIsIG9wdHMsIGV4cG9ydE5hbWUsIGZhbHNlLCBwYXJhbXMsIHJldCwgZm4pO1xuICB9O1xuICByZXR1cm4gdmlld0V4cG9ydDtcbn1cbmZ1bmN0aW9uIG1ha2VBbm9uVmlld0V4cG9ydChjdHgsIG9wdHMsIHBhcmFtcywgcmV0LCBmbikge1xuICBjb25zdCB2aWV3RXhwb3J0ID0gKFxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgdHlwZXNjcmlwdCBpbmNvcnJlY3RseSBzYXlzIEZ1bmN0aW9uI2JpbmQgcmVxdWlyZXMgYW4gYXJndW1lbnQuXG4gICAgZm4uYmluZCgpXG4gICk7XG4gIHZpZXdFeHBvcnRbZXhwb3J0Q29udGV4dF0gPSBjdHg7XG4gIHZpZXdFeHBvcnRbcmVnaXN0ZXJFeHBvcnRdID0gKGN0eDIsIGV4cG9ydE5hbWUpID0+IHtcbiAgICByZWdpc3RlclZpZXcoY3R4Miwgb3B0cywgZXhwb3J0TmFtZSwgdHJ1ZSwgcGFyYW1zLCByZXQsIGZuKTtcbiAgfTtcbiAgcmV0dXJuIHZpZXdFeHBvcnQ7XG59XG5mdW5jdGlvbiByZWdpc3RlclZpZXcoY3R4LCBvcHRzLCBleHBvcnROYW1lLCBhbm9uLCBwYXJhbXMsIHJldCwgZm4pIHtcbiAgY29uc3QgcGFyYW1zQnVpbGRlciA9IG5ldyBSb3dCdWlsZGVyKHBhcmFtcywgdG9QYXNjYWxDYXNlKGV4cG9ydE5hbWUpKTtcbiAgbGV0IHJldHVyblR5cGUgPSBjdHgucmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHJldCkuYWxnZWJyYWljVHlwZTtcbiAgY29uc3QgeyB0eXBlc3BhY2UgfSA9IGN0eDtcbiAgY29uc3QgeyB2YWx1ZTogcGFyYW1UeXBlIH0gPSBjdHgucmVzb2x2ZVR5cGUoXG4gICAgY3R4LnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseShwYXJhbXNCdWlsZGVyKVxuICApO1xuICBjdHgubW9kdWxlRGVmLnZpZXdzLnB1c2goe1xuICAgIHNvdXJjZU5hbWU6IGV4cG9ydE5hbWUsXG4gICAgaW5kZXg6IChhbm9uID8gY3R4LmFub25WaWV3cyA6IGN0eC52aWV3cykubGVuZ3RoLFxuICAgIGlzUHVibGljOiBvcHRzLnB1YmxpYyxcbiAgICBpc0Fub255bW91czogYW5vbixcbiAgICBwYXJhbXM6IHBhcmFtVHlwZSxcbiAgICByZXR1cm5UeXBlXG4gIH0pO1xuICBpZiAob3B0cy5uYW1lICE9IG51bGwpIHtcbiAgICBjdHgubW9kdWxlRGVmLmV4cGxpY2l0TmFtZXMuZW50cmllcy5wdXNoKHtcbiAgICAgIHRhZzogXCJGdW5jdGlvblwiLFxuICAgICAgdmFsdWU6IHtcbiAgICAgICAgc291cmNlTmFtZTogZXhwb3J0TmFtZSxcbiAgICAgICAgY2Fub25pY2FsTmFtZTogb3B0cy5uYW1lXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgaWYgKHJldHVyblR5cGUudGFnID09IFwiU3VtXCIpIHtcbiAgICBjb25zdCBvcmlnaW5hbEZuID0gZm47XG4gICAgZm4gPSAoKGN0eDIsIGFyZ3MpID0+IHtcbiAgICAgIGNvbnN0IHJldDIgPSBvcmlnaW5hbEZuKGN0eDIsIGFyZ3MpO1xuICAgICAgcmV0dXJuIHJldDIgPT0gbnVsbCA/IFtdIDogW3JldDJdO1xuICAgIH0pO1xuICAgIHJldHVyblR5cGUgPSBBbGdlYnJhaWNUeXBlLkFycmF5KFxuICAgICAgcmV0dXJuVHlwZS52YWx1ZS52YXJpYW50c1swXS5hbGdlYnJhaWNUeXBlXG4gICAgKTtcbiAgfVxuICAoYW5vbiA/IGN0eC5hbm9uVmlld3MgOiBjdHgudmlld3MpLnB1c2goe1xuICAgIGZuLFxuICAgIGRlc2VyaWFsaXplUGFyYW1zOiBQcm9kdWN0VHlwZS5tYWtlRGVzZXJpYWxpemVyKHBhcmFtVHlwZSwgdHlwZXNwYWNlKSxcbiAgICBzZXJpYWxpemVSZXR1cm46IEFsZ2VicmFpY1R5cGUubWFrZVNlcmlhbGl6ZXIocmV0dXJuVHlwZSwgdHlwZXNwYWNlKSxcbiAgICByZXR1cm5UeXBlQmFzZVNpemU6IGJzYXRuQmFzZVNpemUodHlwZXNwYWNlLCByZXR1cm5UeXBlKVxuICB9KTtcbn1cblxuLy8gc3JjL2xpYi9lcnJvcnMudHNcbnZhciBTZW5kZXJFcnJvciA9IGNsYXNzIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gIH1cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIFwiU2VuZGVyRXJyb3JcIjtcbiAgfVxufTtcblxuLy8gc3JjL3NlcnZlci9lcnJvcnMudHNcbnZhciBTcGFjZXRpbWVIb3N0RXJyb3IgPSBjbGFzcyBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICB9XG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiBcIlNwYWNldGltZUhvc3RFcnJvclwiO1xuICB9XG59O1xudmFyIGVycm9yRGF0YSA9IHtcbiAgLyoqXG4gICAqIEEgZ2VuZXJpYyBlcnJvciBjbGFzcyBmb3IgdW5rbm93biBlcnJvciBjb2Rlcy5cbiAgICovXG4gIEhvc3RDYWxsRmFpbHVyZTogMSxcbiAgLyoqXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCBhbiBBQkkgY2FsbCB3YXMgbWFkZSBvdXRzaWRlIG9mIGEgdHJhbnNhY3Rpb24uXG4gICAqL1xuICBOb3RJblRyYW5zYWN0aW9uOiAyLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IEJTQVROIGRlY29kaW5nIGZhaWxlZC5cbiAgICogVGhpcyB0eXBpY2FsbHkgbWVhbnMgdGhhdCB0aGUgZGF0YSBjb3VsZCBub3QgYmUgZGVjb2RlZCB0byB0aGUgZXhwZWN0ZWQgdHlwZS5cbiAgICovXG4gIEJzYXRuRGVjb2RlRXJyb3I6IDMsXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYSBzcGVjaWZpZWQgdGFibGUgZG9lcyBub3QgZXhpc3QuXG4gICAqL1xuICBOb1N1Y2hUYWJsZTogNCxcbiAgLyoqXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCBhIHNwZWNpZmllZCBpbmRleCBkb2VzIG5vdCBleGlzdC5cbiAgICovXG4gIE5vU3VjaEluZGV4OiA1LFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGEgc3BlY2lmaWVkIHJvdyBpdGVyYXRvciBpcyBub3QgdmFsaWQuXG4gICAqL1xuICBOb1N1Y2hJdGVyOiA2LFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGEgc3BlY2lmaWVkIGNvbnNvbGUgdGltZXIgZG9lcyBub3QgZXhpc3QuXG4gICAqL1xuICBOb1N1Y2hDb25zb2xlVGltZXI6IDcsXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYSBzcGVjaWZpZWQgYnl0ZXMgc291cmNlIG9yIHNpbmsgaXMgbm90IHZhbGlkLlxuICAgKi9cbiAgTm9TdWNoQnl0ZXM6IDgsXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYSBwcm92aWRlZCBzaW5rIGhhcyBubyBtb3JlIHNwYWNlIGxlZnQuXG4gICAqL1xuICBOb1NwYWNlOiA5LFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IHRoZXJlIGlzIG5vIG1vcmUgc3BhY2UgaW4gdGhlIGRhdGFiYXNlLlxuICAgKi9cbiAgQnVmZmVyVG9vU21hbGw6IDExLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGEgdmFsdWUgd2l0aCBhIGdpdmVuIHVuaXF1ZSBpZGVudGlmaWVyIGFscmVhZHkgZXhpc3RzLlxuICAgKi9cbiAgVW5pcXVlQWxyZWFkeUV4aXN0czogMTIsXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgdGhlIHNwZWNpZmllZCBkZWxheSBpbiBzY2hlZHVsaW5nIGEgcm93IHdhcyB0b28gbG9uZy5cbiAgICovXG4gIFNjaGVkdWxlQXREZWxheVRvb0xvbmc6IDEzLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGFuIGluZGV4IHdhcyBub3QgdW5pcXVlIHdoZW4gaXQgd2FzIGV4cGVjdGVkIHRvIGJlLlxuICAgKi9cbiAgSW5kZXhOb3RVbmlxdWU6IDE0LFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGFuIGluZGV4IHdhcyBub3QgdW5pcXVlIHdoZW4gaXQgd2FzIGV4cGVjdGVkIHRvIGJlLlxuICAgKi9cbiAgTm9TdWNoUm93OiAxNSxcbiAgLyoqXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCBhbiBhdXRvLWluY3JlbWVudCBzZXF1ZW5jZSBoYXMgb3ZlcmZsb3dlZC5cbiAgICovXG4gIEF1dG9JbmNPdmVyZmxvdzogMTYsXG4gIFdvdWxkQmxvY2tUcmFuc2FjdGlvbjogMTcsXG4gIFRyYW5zYWN0aW9uTm90QW5vbnltb3VzOiAxOCxcbiAgVHJhbnNhY3Rpb25Jc1JlYWRPbmx5OiAxOSxcbiAgVHJhbnNhY3Rpb25Jc011dDogMjAsXG4gIEh0dHBFcnJvcjogMjFcbn07XG5mdW5jdGlvbiBtYXBFbnRyaWVzKHgsIGYpIHtcbiAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhcbiAgICBPYmplY3QuZW50cmllcyh4KS5tYXAoKFtrLCB2XSkgPT4gW2ssIGYoaywgdildKVxuICApO1xufVxudmFyIGVycm5vVG9DbGFzcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG52YXIgZXJyb3JzID0gT2JqZWN0LmZyZWV6ZShcbiAgbWFwRW50cmllcyhlcnJvckRhdGEsIChuYW1lLCBjb2RlKSA9PiB7XG4gICAgY29uc3QgY2xzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAgICAgY2xhc3MgZXh0ZW5kcyBTcGFjZXRpbWVIb3N0RXJyb3Ige1xuICAgICAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwibmFtZVwiLFxuICAgICAgeyB2YWx1ZTogbmFtZSwgd3JpdGFibGU6IGZhbHNlIH1cbiAgICApO1xuICAgIGVycm5vVG9DbGFzcy5zZXQoY29kZSwgY2xzKTtcbiAgICByZXR1cm4gY2xzO1xuICB9KVxuKTtcbmZ1bmN0aW9uIGdldEVycm9yQ29uc3RydWN0b3IoY29kZSkge1xuICByZXR1cm4gZXJybm9Ub0NsYXNzLmdldChjb2RlKSA/PyBTcGFjZXRpbWVIb3N0RXJyb3I7XG59XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9wdXJlLXJhbmRANy4wLjEvbm9kZV9tb2R1bGVzL3B1cmUtcmFuZC9saWIvZXNtL2Rpc3RyaWJ1dGlvbi9VbnNhZmVVbmlmb3JtQmlnSW50RGlzdHJpYnV0aW9uLmpzXG52YXIgU0JpZ0ludCA9IHR5cGVvZiBCaWdJbnQgIT09IFwidW5kZWZpbmVkXCIgPyBCaWdJbnQgOiB2b2lkIDA7XG52YXIgT25lID0gdHlwZW9mIEJpZ0ludCAhPT0gXCJ1bmRlZmluZWRcIiA/IEJpZ0ludCgxKSA6IHZvaWQgMDtcbnZhciBUaGlydHlUd28gPSB0eXBlb2YgQmlnSW50ICE9PSBcInVuZGVmaW5lZFwiID8gQmlnSW50KDMyKSA6IHZvaWQgMDtcbnZhciBOdW1WYWx1ZXMgPSB0eXBlb2YgQmlnSW50ICE9PSBcInVuZGVmaW5lZFwiID8gQmlnSW50KDQyOTQ5NjcyOTYpIDogdm9pZCAwO1xuZnVuY3Rpb24gdW5zYWZlVW5pZm9ybUJpZ0ludERpc3RyaWJ1dGlvbihmcm9tLCB0bywgcm5nKSB7XG4gIHZhciBkaWZmID0gdG8gLSBmcm9tICsgT25lO1xuICB2YXIgRmluYWxOdW1WYWx1ZXMgPSBOdW1WYWx1ZXM7XG4gIHZhciBOdW1JdGVyYXRpb25zID0gMTtcbiAgd2hpbGUgKEZpbmFsTnVtVmFsdWVzIDwgZGlmZikge1xuICAgIEZpbmFsTnVtVmFsdWVzIDw8PSBUaGlydHlUd287XG4gICAgKytOdW1JdGVyYXRpb25zO1xuICB9XG4gIHZhciB2YWx1ZSA9IGdlbmVyYXRlTmV4dChOdW1JdGVyYXRpb25zLCBybmcpO1xuICBpZiAodmFsdWUgPCBkaWZmKSB7XG4gICAgcmV0dXJuIHZhbHVlICsgZnJvbTtcbiAgfVxuICBpZiAodmFsdWUgKyBkaWZmIDwgRmluYWxOdW1WYWx1ZXMpIHtcbiAgICByZXR1cm4gdmFsdWUgJSBkaWZmICsgZnJvbTtcbiAgfVxuICB2YXIgTWF4QWNjZXB0ZWRSYW5kb20gPSBGaW5hbE51bVZhbHVlcyAtIEZpbmFsTnVtVmFsdWVzICUgZGlmZjtcbiAgd2hpbGUgKHZhbHVlID49IE1heEFjY2VwdGVkUmFuZG9tKSB7XG4gICAgdmFsdWUgPSBnZW5lcmF0ZU5leHQoTnVtSXRlcmF0aW9ucywgcm5nKTtcbiAgfVxuICByZXR1cm4gdmFsdWUgJSBkaWZmICsgZnJvbTtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlTmV4dChOdW1JdGVyYXRpb25zLCBybmcpIHtcbiAgdmFyIHZhbHVlID0gU0JpZ0ludChybmcudW5zYWZlTmV4dCgpICsgMjE0NzQ4MzY0OCk7XG4gIGZvciAodmFyIG51bSA9IDE7IG51bSA8IE51bUl0ZXJhdGlvbnM7ICsrbnVtKSB7XG4gICAgdmFyIG91dCA9IHJuZy51bnNhZmVOZXh0KCk7XG4gICAgdmFsdWUgPSAodmFsdWUgPDwgVGhpcnR5VHdvKSArIFNCaWdJbnQob3V0ICsgMjE0NzQ4MzY0OCk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcHVyZS1yYW5kQDcuMC4xL25vZGVfbW9kdWxlcy9wdXJlLXJhbmQvbGliL2VzbS9kaXN0cmlidXRpb24vaW50ZXJuYWxzL1Vuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb25JbnRlcm5hbC5qc1xuZnVuY3Rpb24gdW5zYWZlVW5pZm9ybUludERpc3RyaWJ1dGlvbkludGVybmFsKHJhbmdlU2l6ZSwgcm5nKSB7XG4gIHZhciBNYXhBbGxvd2VkID0gcmFuZ2VTaXplID4gMiA/IH5+KDQyOTQ5NjcyOTYgLyByYW5nZVNpemUpICogcmFuZ2VTaXplIDogNDI5NDk2NzI5NjtcbiAgdmFyIGRlbHRhViA9IHJuZy51bnNhZmVOZXh0KCkgKyAyMTQ3NDgzNjQ4O1xuICB3aGlsZSAoZGVsdGFWID49IE1heEFsbG93ZWQpIHtcbiAgICBkZWx0YVYgPSBybmcudW5zYWZlTmV4dCgpICsgMjE0NzQ4MzY0ODtcbiAgfVxuICByZXR1cm4gZGVsdGFWICUgcmFuZ2VTaXplO1xufVxuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcHVyZS1yYW5kQDcuMC4xL25vZGVfbW9kdWxlcy9wdXJlLXJhbmQvbGliL2VzbS9kaXN0cmlidXRpb24vaW50ZXJuYWxzL0FycmF5SW50NjQuanNcbmZ1bmN0aW9uIGZyb21OdW1iZXJUb0FycmF5SW50NjQob3V0LCBuKSB7XG4gIGlmIChuIDwgMCkge1xuICAgIHZhciBwb3NOID0gLW47XG4gICAgb3V0LnNpZ24gPSAtMTtcbiAgICBvdXQuZGF0YVswXSA9IH5+KHBvc04gLyA0Mjk0OTY3Mjk2KTtcbiAgICBvdXQuZGF0YVsxXSA9IHBvc04gPj4+IDA7XG4gIH0gZWxzZSB7XG4gICAgb3V0LnNpZ24gPSAxO1xuICAgIG91dC5kYXRhWzBdID0gfn4obiAvIDQyOTQ5NjcyOTYpO1xuICAgIG91dC5kYXRhWzFdID0gbiA+Pj4gMDtcbiAgfVxuICByZXR1cm4gb3V0O1xufVxuZnVuY3Rpb24gc3Vic3RyYWN0QXJyYXlJbnQ2NChvdXQsIGFycmF5SW50QSwgYXJyYXlJbnRCKSB7XG4gIHZhciBsb3dBID0gYXJyYXlJbnRBLmRhdGFbMV07XG4gIHZhciBoaWdoQSA9IGFycmF5SW50QS5kYXRhWzBdO1xuICB2YXIgc2lnbkEgPSBhcnJheUludEEuc2lnbjtcbiAgdmFyIGxvd0IgPSBhcnJheUludEIuZGF0YVsxXTtcbiAgdmFyIGhpZ2hCID0gYXJyYXlJbnRCLmRhdGFbMF07XG4gIHZhciBzaWduQiA9IGFycmF5SW50Qi5zaWduO1xuICBvdXQuc2lnbiA9IDE7XG4gIGlmIChzaWduQSA9PT0gMSAmJiBzaWduQiA9PT0gLTEpIHtcbiAgICB2YXIgbG93XzEgPSBsb3dBICsgbG93QjtcbiAgICB2YXIgaGlnaCA9IGhpZ2hBICsgaGlnaEIgKyAobG93XzEgPiA0Mjk0OTY3Mjk1ID8gMSA6IDApO1xuICAgIG91dC5kYXRhWzBdID0gaGlnaCA+Pj4gMDtcbiAgICBvdXQuZGF0YVsxXSA9IGxvd18xID4+PiAwO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgdmFyIGxvd0ZpcnN0ID0gbG93QTtcbiAgdmFyIGhpZ2hGaXJzdCA9IGhpZ2hBO1xuICB2YXIgbG93U2Vjb25kID0gbG93QjtcbiAgdmFyIGhpZ2hTZWNvbmQgPSBoaWdoQjtcbiAgaWYgKHNpZ25BID09PSAtMSkge1xuICAgIGxvd0ZpcnN0ID0gbG93QjtcbiAgICBoaWdoRmlyc3QgPSBoaWdoQjtcbiAgICBsb3dTZWNvbmQgPSBsb3dBO1xuICAgIGhpZ2hTZWNvbmQgPSBoaWdoQTtcbiAgfVxuICB2YXIgcmVtaW5kZXJMb3cgPSAwO1xuICB2YXIgbG93ID0gbG93Rmlyc3QgLSBsb3dTZWNvbmQ7XG4gIGlmIChsb3cgPCAwKSB7XG4gICAgcmVtaW5kZXJMb3cgPSAxO1xuICAgIGxvdyA9IGxvdyA+Pj4gMDtcbiAgfVxuICBvdXQuZGF0YVswXSA9IGhpZ2hGaXJzdCAtIGhpZ2hTZWNvbmQgLSByZW1pbmRlckxvdztcbiAgb3V0LmRhdGFbMV0gPSBsb3c7XG4gIHJldHVybiBvdXQ7XG59XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9wdXJlLXJhbmRANy4wLjEvbm9kZV9tb2R1bGVzL3B1cmUtcmFuZC9saWIvZXNtL2Rpc3RyaWJ1dGlvbi9pbnRlcm5hbHMvVW5zYWZlVW5pZm9ybUFycmF5SW50RGlzdHJpYnV0aW9uSW50ZXJuYWwuanNcbmZ1bmN0aW9uIHVuc2FmZVVuaWZvcm1BcnJheUludERpc3RyaWJ1dGlvbkludGVybmFsKG91dCwgcmFuZ2VTaXplLCBybmcpIHtcbiAgdmFyIHJhbmdlTGVuZ3RoID0gcmFuZ2VTaXplLmxlbmd0aDtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4ICE9PSByYW5nZUxlbmd0aDsgKytpbmRleCkge1xuICAgICAgdmFyIGluZGV4UmFuZ2VTaXplID0gaW5kZXggPT09IDAgPyByYW5nZVNpemVbMF0gKyAxIDogNDI5NDk2NzI5NjtcbiAgICAgIHZhciBnID0gdW5zYWZlVW5pZm9ybUludERpc3RyaWJ1dGlvbkludGVybmFsKGluZGV4UmFuZ2VTaXplLCBybmcpO1xuICAgICAgb3V0W2luZGV4XSA9IGc7XG4gICAgfVxuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggIT09IHJhbmdlTGVuZ3RoOyArK2luZGV4KSB7XG4gICAgICB2YXIgY3VycmVudCA9IG91dFtpbmRleF07XG4gICAgICB2YXIgY3VycmVudEluUmFuZ2UgPSByYW5nZVNpemVbaW5kZXhdO1xuICAgICAgaWYgKGN1cnJlbnQgPCBjdXJyZW50SW5SYW5nZSkge1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50ID4gY3VycmVudEluUmFuZ2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9wdXJlLXJhbmRANy4wLjEvbm9kZV9tb2R1bGVzL3B1cmUtcmFuZC9saWIvZXNtL2Rpc3RyaWJ1dGlvbi9VbnNhZmVVbmlmb3JtSW50RGlzdHJpYnV0aW9uLmpzXG52YXIgc2FmZU51bWJlck1heFNhZmVJbnRlZ2VyID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG52YXIgc2hhcmVkQSA9IHsgc2lnbjogMSwgZGF0YTogWzAsIDBdIH07XG52YXIgc2hhcmVkQiA9IHsgc2lnbjogMSwgZGF0YTogWzAsIDBdIH07XG52YXIgc2hhcmVkQyA9IHsgc2lnbjogMSwgZGF0YTogWzAsIDBdIH07XG52YXIgc2hhcmVkRGF0YSA9IFswLCAwXTtcbmZ1bmN0aW9uIHVuaWZvcm1MYXJnZUludEludGVybmFsKGZyb20sIHRvLCByYW5nZVNpemUsIHJuZykge1xuICB2YXIgcmFuZ2VTaXplQXJyYXlJbnRWYWx1ZSA9IHJhbmdlU2l6ZSA8PSBzYWZlTnVtYmVyTWF4U2FmZUludGVnZXIgPyBmcm9tTnVtYmVyVG9BcnJheUludDY0KHNoYXJlZEMsIHJhbmdlU2l6ZSkgOiBzdWJzdHJhY3RBcnJheUludDY0KHNoYXJlZEMsIGZyb21OdW1iZXJUb0FycmF5SW50NjQoc2hhcmVkQSwgdG8pLCBmcm9tTnVtYmVyVG9BcnJheUludDY0KHNoYXJlZEIsIGZyb20pKTtcbiAgaWYgKHJhbmdlU2l6ZUFycmF5SW50VmFsdWUuZGF0YVsxXSA9PT0gNDI5NDk2NzI5NSkge1xuICAgIHJhbmdlU2l6ZUFycmF5SW50VmFsdWUuZGF0YVswXSArPSAxO1xuICAgIHJhbmdlU2l6ZUFycmF5SW50VmFsdWUuZGF0YVsxXSA9IDA7XG4gIH0gZWxzZSB7XG4gICAgcmFuZ2VTaXplQXJyYXlJbnRWYWx1ZS5kYXRhWzFdICs9IDE7XG4gIH1cbiAgdW5zYWZlVW5pZm9ybUFycmF5SW50RGlzdHJpYnV0aW9uSW50ZXJuYWwoc2hhcmVkRGF0YSwgcmFuZ2VTaXplQXJyYXlJbnRWYWx1ZS5kYXRhLCBybmcpO1xuICByZXR1cm4gc2hhcmVkRGF0YVswXSAqIDQyOTQ5NjcyOTYgKyBzaGFyZWREYXRhWzFdICsgZnJvbTtcbn1cbmZ1bmN0aW9uIHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb24oZnJvbSwgdG8sIHJuZykge1xuICB2YXIgcmFuZ2VTaXplID0gdG8gLSBmcm9tO1xuICBpZiAocmFuZ2VTaXplIDw9IDQyOTQ5NjcyOTUpIHtcbiAgICB2YXIgZyA9IHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb25JbnRlcm5hbChyYW5nZVNpemUgKyAxLCBybmcpO1xuICAgIHJldHVybiBnICsgZnJvbTtcbiAgfVxuICByZXR1cm4gdW5pZm9ybUxhcmdlSW50SW50ZXJuYWwoZnJvbSwgdG8sIHJhbmdlU2l6ZSwgcm5nKTtcbn1cblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3B1cmUtcmFuZEA3LjAuMS9ub2RlX21vZHVsZXMvcHVyZS1yYW5kL2xpYi9lc20vZ2VuZXJhdG9yL1hvcm9TaGlyby5qc1xudmFyIFhvcm9TaGlybzEyOFBsdXMgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFhvcm9TaGlybzEyOFBsdXMyKHMwMSwgczAwLCBzMTEsIHMxMCkge1xuICAgIHRoaXMuczAxID0gczAxO1xuICAgIHRoaXMuczAwID0gczAwO1xuICAgIHRoaXMuczExID0gczExO1xuICAgIHRoaXMuczEwID0gczEwO1xuICB9XG4gIFhvcm9TaGlybzEyOFBsdXMyLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgWG9yb1NoaXJvMTI4UGx1czIodGhpcy5zMDEsIHRoaXMuczAwLCB0aGlzLnMxMSwgdGhpcy5zMTApO1xuICB9O1xuICBYb3JvU2hpcm8xMjhQbHVzMi5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZXh0Um5nID0gbmV3IFhvcm9TaGlybzEyOFBsdXMyKHRoaXMuczAxLCB0aGlzLnMwMCwgdGhpcy5zMTEsIHRoaXMuczEwKTtcbiAgICB2YXIgb3V0ID0gbmV4dFJuZy51bnNhZmVOZXh0KCk7XG4gICAgcmV0dXJuIFtvdXQsIG5leHRSbmddO1xuICB9O1xuICBYb3JvU2hpcm8xMjhQbHVzMi5wcm90b3R5cGUudW5zYWZlTmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSB0aGlzLnMwMCArIHRoaXMuczEwIHwgMDtcbiAgICB2YXIgYTAgPSB0aGlzLnMxMCBeIHRoaXMuczAwO1xuICAgIHZhciBhMSA9IHRoaXMuczExIF4gdGhpcy5zMDE7XG4gICAgdmFyIHMwMCA9IHRoaXMuczAwO1xuICAgIHZhciBzMDEgPSB0aGlzLnMwMTtcbiAgICB0aGlzLnMwMCA9IHMwMCA8PCAyNCBeIHMwMSA+Pj4gOCBeIGEwIF4gYTAgPDwgMTY7XG4gICAgdGhpcy5zMDEgPSBzMDEgPDwgMjQgXiBzMDAgPj4+IDggXiBhMSBeIChhMSA8PCAxNiB8IGEwID4+PiAxNik7XG4gICAgdGhpcy5zMTAgPSBhMSA8PCA1IF4gYTAgPj4+IDI3O1xuICAgIHRoaXMuczExID0gYTAgPDwgNSBeIGExID4+PiAyNztcbiAgICByZXR1cm4gb3V0O1xuICB9O1xuICBYb3JvU2hpcm8xMjhQbHVzMi5wcm90b3R5cGUuanVtcCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZXh0Um5nID0gbmV3IFhvcm9TaGlybzEyOFBsdXMyKHRoaXMuczAxLCB0aGlzLnMwMCwgdGhpcy5zMTEsIHRoaXMuczEwKTtcbiAgICBuZXh0Um5nLnVuc2FmZUp1bXAoKTtcbiAgICByZXR1cm4gbmV4dFJuZztcbiAgfTtcbiAgWG9yb1NoaXJvMTI4UGx1czIucHJvdG90eXBlLnVuc2FmZUp1bXAgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbnMwMSA9IDA7XG4gICAgdmFyIG5zMDAgPSAwO1xuICAgIHZhciBuczExID0gMDtcbiAgICB2YXIgbnMxMCA9IDA7XG4gICAgdmFyIGp1bXAgPSBbMzYzOTk1NjY0NSwgMzc1MDc1NzAxMiwgMTI2MTU2ODUwOCwgMzg2NDI2MzM1XTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSAhPT0gNDsgKytpKSB7XG4gICAgICBmb3IgKHZhciBtYXNrID0gMTsgbWFzazsgbWFzayA8PD0gMSkge1xuICAgICAgICBpZiAoanVtcFtpXSAmIG1hc2spIHtcbiAgICAgICAgICBuczAxIF49IHRoaXMuczAxO1xuICAgICAgICAgIG5zMDAgXj0gdGhpcy5zMDA7XG4gICAgICAgICAgbnMxMSBePSB0aGlzLnMxMTtcbiAgICAgICAgICBuczEwIF49IHRoaXMuczEwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudW5zYWZlTmV4dCgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnMwMSA9IG5zMDE7XG4gICAgdGhpcy5zMDAgPSBuczAwO1xuICAgIHRoaXMuczExID0gbnMxMTtcbiAgICB0aGlzLnMxMCA9IG5zMTA7XG4gIH07XG4gIFhvcm9TaGlybzEyOFBsdXMyLnByb3RvdHlwZS5nZXRTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBbdGhpcy5zMDEsIHRoaXMuczAwLCB0aGlzLnMxMSwgdGhpcy5zMTBdO1xuICB9O1xuICByZXR1cm4gWG9yb1NoaXJvMTI4UGx1czI7XG59KSgpO1xuZnVuY3Rpb24gZnJvbVN0YXRlKHN0YXRlKSB7XG4gIHZhciB2YWxpZCA9IHN0YXRlLmxlbmd0aCA9PT0gNDtcbiAgaWYgKCF2YWxpZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdGF0ZSBtdXN0IGhhdmUgYmVlbiBwcm9kdWNlZCBieSBhIHhvcm9zaGlybzEyOHBsdXMgUmFuZG9tR2VuZXJhdG9yXCIpO1xuICB9XG4gIHJldHVybiBuZXcgWG9yb1NoaXJvMTI4UGx1cyhzdGF0ZVswXSwgc3RhdGVbMV0sIHN0YXRlWzJdLCBzdGF0ZVszXSk7XG59XG52YXIgeG9yb3NoaXJvMTI4cGx1cyA9IE9iamVjdC5hc3NpZ24oZnVuY3Rpb24oc2VlZCkge1xuICByZXR1cm4gbmV3IFhvcm9TaGlybzEyOFBsdXMoLTEsIH5zZWVkLCBzZWVkIHwgMCwgMCk7XG59LCB7IGZyb21TdGF0ZSB9KTtcblxuLy8gc3JjL3NlcnZlci9ybmcudHNcbnZhciB7IGFzVWludE4gfSA9IEJpZ0ludDtcbmZ1bmN0aW9uIHBjZzMyKHN0YXRlKSB7XG4gIGNvbnN0IE1VTCA9IDYzNjQxMzYyMjM4NDY3OTMwMDVuO1xuICBjb25zdCBJTkMgPSAxMTYzNDU4MDAyNzQ2MjI2MDcyM247XG4gIHN0YXRlID0gYXNVaW50Tig2NCwgc3RhdGUgKiBNVUwgKyBJTkMpO1xuICBjb25zdCB4b3JzaGlmdGVkID0gTnVtYmVyKGFzVWludE4oMzIsIChzdGF0ZSA+PiAxOG4gXiBzdGF0ZSkgPj4gMjduKSk7XG4gIGNvbnN0IHJvdCA9IE51bWJlcihhc1VpbnROKDMyLCBzdGF0ZSA+PiA1OW4pKTtcbiAgcmV0dXJuIHhvcnNoaWZ0ZWQgPj4gcm90IHwgeG9yc2hpZnRlZCA8PCAzMiAtIHJvdDtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlRmxvYXQ2NChybmcpIHtcbiAgY29uc3QgZzEgPSB1bnNhZmVVbmlmb3JtSW50RGlzdHJpYnV0aW9uKDAsICgxIDw8IDI2KSAtIDEsIHJuZyk7XG4gIGNvbnN0IGcyID0gdW5zYWZlVW5pZm9ybUludERpc3RyaWJ1dGlvbigwLCAoMSA8PCAyNykgLSAxLCBybmcpO1xuICBjb25zdCB2YWx1ZSA9IChnMSAqIE1hdGgucG93KDIsIDI3KSArIGcyKSAqIE1hdGgucG93KDIsIC01Myk7XG4gIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIG1ha2VSYW5kb20oc2VlZCkge1xuICBjb25zdCBybmcgPSB4b3Jvc2hpcm8xMjhwbHVzKHBjZzMyKHNlZWQubWljcm9zU2luY2VVbml4RXBvY2gpKTtcbiAgY29uc3QgcmFuZG9tID0gKCkgPT4gZ2VuZXJhdGVGbG9hdDY0KHJuZyk7XG4gIHJhbmRvbS5maWxsID0gKGFycmF5KSA9PiB7XG4gICAgY29uc3QgZWxlbSA9IGFycmF5LmF0KDApO1xuICAgIGlmICh0eXBlb2YgZWxlbSA9PT0gXCJiaWdpbnRcIikge1xuICAgICAgY29uc3QgdXBwZXIgPSAoMW4gPDwgQmlnSW50KGFycmF5LkJZVEVTX1BFUl9FTEVNRU5UICogOCkpIC0gMW47XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFycmF5W2ldID0gdW5zYWZlVW5pZm9ybUJpZ0ludERpc3RyaWJ1dGlvbigwbiwgdXBwZXIsIHJuZyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgY29uc3QgdXBwZXIgPSAoMSA8PCBhcnJheS5CWVRFU19QRVJfRUxFTUVOVCAqIDgpIC0gMTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJyYXlbaV0gPSB1bnNhZmVVbmlmb3JtSW50RGlzdHJpYnV0aW9uKDAsIHVwcGVyLCBybmcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG4gIH07XG4gIHJhbmRvbS51aW50MzIgPSAoKSA9PiBybmcudW5zYWZlTmV4dCgpO1xuICByYW5kb20uaW50ZWdlckluUmFuZ2UgPSAobWluLCBtYXgpID0+IHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb24obWluLCBtYXgsIHJuZyk7XG4gIHJhbmRvbS5iaWdpbnRJblJhbmdlID0gKG1pbiwgbWF4KSA9PiB1bnNhZmVVbmlmb3JtQmlnSW50RGlzdHJpYnV0aW9uKG1pbiwgbWF4LCBybmcpO1xuICByZXR1cm4gcmFuZG9tO1xufVxuXG4vLyBzcmMvc2VydmVyL3J1bnRpbWUudHNcbnZhciB7IGZyZWV6ZSB9ID0gT2JqZWN0O1xudmFyIHN5cyA9IF9zeXNjYWxsczJfMDtcbmZ1bmN0aW9uIHBhcnNlSnNvbk9iamVjdChqc29uKSB7XG4gIGxldCB2YWx1ZTtcbiAgdHJ5IHtcbiAgICB2YWx1ZSA9IEpTT04ucGFyc2UoanNvbik7XG4gIH0gY2F0Y2gge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgSlNPTjogZmFpbGVkIHRvIHBhcnNlIHN0cmluZ1wiKTtcbiAgfVxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgYSBKU09OIG9iamVjdCBhdCB0aGUgdG9wIGxldmVsXCIpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cbnZhciBKd3RDbGFpbXNJbXBsID0gY2xhc3Mge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBKd3RDbGFpbXMgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSByYXdQYXlsb2FkIFRoZSBKV1QgcGF5bG9hZCBhcyBhIHJhdyBKU09OIHN0cmluZy5cbiAgICogQHBhcmFtIGlkZW50aXR5IFRoZSBpZGVudGl0eSBmb3IgdGhpcyBKV1QuIFdlIGFyZSBvbmx5IHRha2luZyB0aGlzIGJlY2F1c2Ugd2UgZG9uJ3QgaGF2ZSBhIGJsYWtlMyBpbXBsZW1lbnRhdGlvbiAod2hpY2ggd2UgbmVlZCB0byBjb21wdXRlIGl0KS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHJhd1BheWxvYWQsIGlkZW50aXR5KSB7XG4gICAgdGhpcy5yYXdQYXlsb2FkID0gcmF3UGF5bG9hZDtcbiAgICB0aGlzLmZ1bGxQYXlsb2FkID0gcGFyc2VKc29uT2JqZWN0KHJhd1BheWxvYWQpO1xuICAgIHRoaXMuX2lkZW50aXR5ID0gaWRlbnRpdHk7XG4gIH1cbiAgZnVsbFBheWxvYWQ7XG4gIF9pZGVudGl0eTtcbiAgZ2V0IGlkZW50aXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9pZGVudGl0eTtcbiAgfVxuICBnZXQgc3ViamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5mdWxsUGF5bG9hZFtcInN1YlwiXTtcbiAgfVxuICBnZXQgaXNzdWVyKCkge1xuICAgIHJldHVybiB0aGlzLmZ1bGxQYXlsb2FkW1wiaXNzXCJdO1xuICB9XG4gIGdldCBhdWRpZW5jZSgpIHtcbiAgICBjb25zdCBhdWQgPSB0aGlzLmZ1bGxQYXlsb2FkW1wiYXVkXCJdO1xuICAgIGlmIChhdWQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIGF1ZCA9PT0gXCJzdHJpbmdcIiA/IFthdWRdIDogYXVkO1xuICB9XG59O1xudmFyIEF1dGhDdHhJbXBsID0gY2xhc3MgX0F1dGhDdHhJbXBsIHtcbiAgaXNJbnRlcm5hbDtcbiAgLy8gU291cmNlIG9mIHRoZSBKV1QgcGF5bG9hZCBzdHJpbmcsIGlmIHRoZXJlIGlzIG9uZS5cbiAgX2p3dFNvdXJjZTtcbiAgLy8gV2hldGhlciB3ZSBoYXZlIGluaXRpYWxpemVkIHRoZSBKV1QgY2xhaW1zLlxuICBfaW5pdGlhbGl6ZWRKV1QgPSBmYWxzZTtcbiAgX2p3dENsYWltcztcbiAgX3NlbmRlcklkZW50aXR5O1xuICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgdGhpcy5pc0ludGVybmFsID0gb3B0cy5pc0ludGVybmFsO1xuICAgIHRoaXMuX2p3dFNvdXJjZSA9IG9wdHMuand0U291cmNlO1xuICAgIHRoaXMuX3NlbmRlcklkZW50aXR5ID0gb3B0cy5zZW5kZXJJZGVudGl0eTtcbiAgfVxuICBfaW5pdGlhbGl6ZUpXVCgpIHtcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWRKV1QpIHJldHVybjtcbiAgICB0aGlzLl9pbml0aWFsaXplZEpXVCA9IHRydWU7XG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLl9qd3RTb3VyY2UoKTtcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICB0aGlzLl9qd3RDbGFpbXMgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9qd3RDbGFpbXMgPSBuZXcgSnd0Q2xhaW1zSW1wbCh0b2tlbiwgdGhpcy5fc2VuZGVySWRlbnRpdHkpO1xuICAgIH1cbiAgICBPYmplY3QuZnJlZXplKHRoaXMpO1xuICB9XG4gIC8qKiBMYXppbHkgY29tcHV0ZSB3aGV0aGVyIGEgSldUIGV4aXN0cyBhbmQgaXMgcGFyc2VhYmxlLiAqL1xuICBnZXQgaGFzSldUKCkge1xuICAgIHRoaXMuX2luaXRpYWxpemVKV1QoKTtcbiAgICByZXR1cm4gdGhpcy5fand0Q2xhaW1zICE9PSBudWxsO1xuICB9XG4gIC8qKiBMYXppbHkgcGFyc2UgdGhlIEp3dENsYWltcyBvbmx5IHdoZW4gYWNjZXNzZWQuICovXG4gIGdldCBqd3QoKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZUpXVCgpO1xuICAgIHJldHVybiB0aGlzLl9qd3RDbGFpbXM7XG4gIH1cbiAgLyoqIENyZWF0ZSBhIGNvbnRleHQgcmVwcmVzZW50aW5nIGludGVybmFsIChub24tdXNlcikgcmVxdWVzdHMuICovXG4gIHN0YXRpYyBpbnRlcm5hbCgpIHtcbiAgICByZXR1cm4gbmV3IF9BdXRoQ3R4SW1wbCh7XG4gICAgICBpc0ludGVybmFsOiB0cnVlLFxuICAgICAgand0U291cmNlOiAoKSA9PiBudWxsLFxuICAgICAgc2VuZGVySWRlbnRpdHk6IElkZW50aXR5Lnplcm8oKVxuICAgIH0pO1xuICB9XG4gIC8qKiBJZiB0aGVyZSBpcyBhIGNvbm5lY3Rpb24gaWQsIGxvb2sgdXAgdGhlIEpXVCBwYXlsb2FkIGZyb20gdGhlIHN5c3RlbSB0YWJsZXMuICovXG4gIHN0YXRpYyBmcm9tU3lzdGVtVGFibGVzKGNvbm5lY3Rpb25JZCwgc2VuZGVyKSB7XG4gICAgaWYgKGNvbm5lY3Rpb25JZCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG5ldyBfQXV0aEN0eEltcGwoe1xuICAgICAgICBpc0ludGVybmFsOiBmYWxzZSxcbiAgICAgICAgand0U291cmNlOiAoKSA9PiBudWxsLFxuICAgICAgICBzZW5kZXJJZGVudGl0eTogc2VuZGVyXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBfQXV0aEN0eEltcGwoe1xuICAgICAgaXNJbnRlcm5hbDogZmFsc2UsXG4gICAgICBqd3RTb3VyY2U6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZEJ1ZiA9IHN5cy5nZXRfand0X3BheWxvYWQoY29ubmVjdGlvbklkLl9fY29ubmVjdGlvbl9pZF9fKTtcbiAgICAgICAgaWYgKHBheWxvYWRCdWYubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgcGF5bG9hZFN0ciA9IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShwYXlsb2FkQnVmKTtcbiAgICAgICAgcmV0dXJuIHBheWxvYWRTdHI7XG4gICAgICB9LFxuICAgICAgc2VuZGVySWRlbnRpdHk6IHNlbmRlclxuICAgIH0pO1xuICB9XG59O1xudmFyIFJlZHVjZXJDdHhJbXBsID0gY2xhc3MgUmVkdWNlckN0eCB7XG4gICNpZGVudGl0eTtcbiAgI3NlbmRlckF1dGg7XG4gICN1dWlkQ291bnRlcjtcbiAgI3JhbmRvbTtcbiAgc2VuZGVyO1xuICB0aW1lc3RhbXA7XG4gIGNvbm5lY3Rpb25JZDtcbiAgZGI7XG4gIGNvbnN0cnVjdG9yKHNlbmRlciwgdGltZXN0YW1wLCBjb25uZWN0aW9uSWQsIGRiVmlldykge1xuICAgIE9iamVjdC5zZWFsKHRoaXMpO1xuICAgIHRoaXMuc2VuZGVyID0gc2VuZGVyO1xuICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgIHRoaXMuY29ubmVjdGlvbklkID0gY29ubmVjdGlvbklkO1xuICAgIHRoaXMuZGIgPSBkYlZpZXc7XG4gIH1cbiAgLyoqIFJlc2V0IHRoZSBgUmVkdWNlckN0eGAgdG8gYmUgdXNlZCBmb3IgYSBuZXcgdHJhbnNhY3Rpb24gKi9cbiAgc3RhdGljIHJlc2V0KG1lLCBzZW5kZXIsIHRpbWVzdGFtcCwgY29ubmVjdGlvbklkKSB7XG4gICAgbWUuc2VuZGVyID0gc2VuZGVyO1xuICAgIG1lLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICBtZS5jb25uZWN0aW9uSWQgPSBjb25uZWN0aW9uSWQ7XG4gICAgbWUuI3V1aWRDb3VudGVyID0gdm9pZCAwO1xuICAgIG1lLiNzZW5kZXJBdXRoID0gdm9pZCAwO1xuICB9XG4gIGdldCBpZGVudGl0eSgpIHtcbiAgICByZXR1cm4gdGhpcy4jaWRlbnRpdHkgPz89IG5ldyBJZGVudGl0eShzeXMuaWRlbnRpdHkoKSk7XG4gIH1cbiAgZ2V0IHNlbmRlckF1dGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3NlbmRlckF1dGggPz89IEF1dGhDdHhJbXBsLmZyb21TeXN0ZW1UYWJsZXMoXG4gICAgICB0aGlzLmNvbm5lY3Rpb25JZCxcbiAgICAgIHRoaXMuc2VuZGVyXG4gICAgKTtcbiAgfVxuICBnZXQgcmFuZG9tKCkge1xuICAgIHJldHVybiB0aGlzLiNyYW5kb20gPz89IG1ha2VSYW5kb20odGhpcy50aW1lc3RhbXApO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgcmFuZG9tIHtAbGluayBVdWlkfSBgdjRgIHVzaW5nIHRoaXMgYFJlZHVjZXJDdHhgJ3MgUk5HLlxuICAgKi9cbiAgbmV3VXVpZFY0KCkge1xuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy5yYW5kb20uZmlsbChuZXcgVWludDhBcnJheSgxNikpO1xuICAgIHJldHVybiBVdWlkLmZyb21SYW5kb21CeXRlc1Y0KGJ5dGVzKTtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHNvcnRhYmxlIHtAbGluayBVdWlkfSBgdjdgIHVzaW5nIHRoaXMgYFJlZHVjZXJDdHhgJ3MgUk5HLCBjb3VudGVyLFxuICAgKiBhbmQgdGltZXN0YW1wLlxuICAgKi9cbiAgbmV3VXVpZFY3KCkge1xuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy5yYW5kb20uZmlsbChuZXcgVWludDhBcnJheSg0KSk7XG4gICAgY29uc3QgY291bnRlciA9IHRoaXMuI3V1aWRDb3VudGVyID8/PSB7IHZhbHVlOiAwIH07XG4gICAgcmV0dXJuIFV1aWQuZnJvbUNvdW50ZXJWNyhjb3VudGVyLCB0aGlzLnRpbWVzdGFtcCwgYnl0ZXMpO1xuICB9XG59O1xudmFyIGNhbGxVc2VyRnVuY3Rpb24gPSBmdW5jdGlvbiBfX3NwYWNldGltZWRiX2VuZF9zaG9ydF9iYWNrdHJhY2UoZm4sIC4uLmFyZ3MpIHtcbiAgcmV0dXJuIGZuKC4uLmFyZ3MpO1xufTtcbnZhciBtYWtlSG9va3MgPSAoc2NoZW1hMikgPT4gbmV3IE1vZHVsZUhvb2tzSW1wbChzY2hlbWEyKTtcbnZhciBNb2R1bGVIb29rc0ltcGwgPSBjbGFzcyB7XG4gICNzY2hlbWE7XG4gICNkYlZpZXdfO1xuICAjcmVkdWNlckFyZ3NEZXNlcmlhbGl6ZXJzO1xuICAvKiogQ2FjaGUgdGhlIGBSZWR1Y2VyQ3R4YCBvYmplY3QgdG8gYXZvaWQgYWxsb2NhdGluZyBhbmV3IGZvciBldmVyIHJlZHVjZXIgY2FsbC4gKi9cbiAgI3JlZHVjZXJDdHhfO1xuICBjb25zdHJ1Y3RvcihzY2hlbWEyKSB7XG4gICAgdGhpcy4jc2NoZW1hID0gc2NoZW1hMjtcbiAgICB0aGlzLiNyZWR1Y2VyQXJnc0Rlc2VyaWFsaXplcnMgPSBzY2hlbWEyLm1vZHVsZURlZi5yZWR1Y2Vycy5tYXAoXG4gICAgICAoeyBwYXJhbXMgfSkgPT4gUHJvZHVjdFR5cGUubWFrZURlc2VyaWFsaXplcihwYXJhbXMsIHNjaGVtYTIudHlwZXNwYWNlKVxuICAgICk7XG4gIH1cbiAgZ2V0ICNkYlZpZXcoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2RiVmlld18gPz89IGZyZWV6ZShcbiAgICAgIE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLiNzY2hlbWEuc2NoZW1hVHlwZS50YWJsZXMpLm1hcCgodGFibGUyKSA9PiBbXG4gICAgICAgICAgdGFibGUyLmFjY2Vzc29yTmFtZSxcbiAgICAgICAgICBtYWtlVGFibGVWaWV3KHRoaXMuI3NjaGVtYS50eXBlc3BhY2UsIHRhYmxlMi50YWJsZURlZilcbiAgICAgICAgXSlcbiAgICAgIClcbiAgICApO1xuICB9XG4gIGdldCAjcmVkdWNlckN0eCgpIHtcbiAgICByZXR1cm4gdGhpcy4jcmVkdWNlckN0eF8gPz89IG5ldyBSZWR1Y2VyQ3R4SW1wbChcbiAgICAgIElkZW50aXR5Lnplcm8oKSxcbiAgICAgIFRpbWVzdGFtcC5VTklYX0VQT0NILFxuICAgICAgbnVsbCxcbiAgICAgIHRoaXMuI2RiVmlld1xuICAgICk7XG4gIH1cbiAgX19kZXNjcmliZV9tb2R1bGVfXygpIHtcbiAgICBjb25zdCB3cml0ZXIgPSBuZXcgQmluYXJ5V3JpdGVyKDEyOCk7XG4gICAgUmF3TW9kdWxlRGVmLnNlcmlhbGl6ZShcbiAgICAgIHdyaXRlcixcbiAgICAgIFJhd01vZHVsZURlZi5WMTAodGhpcy4jc2NoZW1hLnJhd01vZHVsZURlZlYxMCgpKVxuICAgICk7XG4gICAgcmV0dXJuIHdyaXRlci5nZXRCdWZmZXIoKTtcbiAgfVxuICBfX2dldF9lcnJvcl9jb25zdHJ1Y3Rvcl9fKGNvZGUpIHtcbiAgICByZXR1cm4gZ2V0RXJyb3JDb25zdHJ1Y3Rvcihjb2RlKTtcbiAgfVxuICBnZXQgX19zZW5kZXJfZXJyb3JfY2xhc3NfXygpIHtcbiAgICByZXR1cm4gU2VuZGVyRXJyb3I7XG4gIH1cbiAgX19jYWxsX3JlZHVjZXJfXyhyZWR1Y2VySWQsIHNlbmRlciwgY29ubklkLCB0aW1lc3RhbXAsIGFyZ3NCdWYpIHtcbiAgICBjb25zdCBtb2R1bGVDdHggPSB0aGlzLiNzY2hlbWE7XG4gICAgY29uc3QgZGVzZXJpYWxpemVBcmdzID0gdGhpcy4jcmVkdWNlckFyZ3NEZXNlcmlhbGl6ZXJzW3JlZHVjZXJJZF07XG4gICAgQklOQVJZX1JFQURFUi5yZXNldChhcmdzQnVmKTtcbiAgICBjb25zdCBhcmdzID0gZGVzZXJpYWxpemVBcmdzKEJJTkFSWV9SRUFERVIpO1xuICAgIGNvbnN0IHNlbmRlcklkZW50aXR5ID0gbmV3IElkZW50aXR5KHNlbmRlcik7XG4gICAgY29uc3QgY3R4ID0gdGhpcy4jcmVkdWNlckN0eDtcbiAgICBSZWR1Y2VyQ3R4SW1wbC5yZXNldChcbiAgICAgIGN0eCxcbiAgICAgIHNlbmRlcklkZW50aXR5LFxuICAgICAgbmV3IFRpbWVzdGFtcCh0aW1lc3RhbXApLFxuICAgICAgQ29ubmVjdGlvbklkLm51bGxJZlplcm8obmV3IENvbm5lY3Rpb25JZChjb25uSWQpKVxuICAgICk7XG4gICAgY2FsbFVzZXJGdW5jdGlvbihtb2R1bGVDdHgucmVkdWNlcnNbcmVkdWNlcklkXSwgY3R4LCBhcmdzKTtcbiAgfVxuICBfX2NhbGxfdmlld19fKGlkLCBzZW5kZXIsIGFyZ3NCdWYpIHtcbiAgICBjb25zdCBtb2R1bGVDdHggPSB0aGlzLiNzY2hlbWE7XG4gICAgY29uc3QgeyBmbiwgZGVzZXJpYWxpemVQYXJhbXMsIHNlcmlhbGl6ZVJldHVybiwgcmV0dXJuVHlwZUJhc2VTaXplIH0gPSBtb2R1bGVDdHgudmlld3NbaWRdO1xuICAgIGNvbnN0IGN0eCA9IGZyZWV6ZSh7XG4gICAgICBzZW5kZXI6IG5ldyBJZGVudGl0eShzZW5kZXIpLFxuICAgICAgLy8gdGhpcyBpcyB0aGUgbm9uLXJlYWRvbmx5IERiVmlldywgYnV0IHRoZSB0eXBpbmcgZm9yIHRoZSB1c2VyIHdpbGwgYmVcbiAgICAgIC8vIHRoZSByZWFkb25seSBvbmUsIGFuZCBpZiB0aGV5IGRvIGNhbGwgbXV0YXRpbmcgZnVuY3Rpb25zIGl0IHdpbGwgZmFpbFxuICAgICAgLy8gYXQgcnVudGltZVxuICAgICAgZGI6IHRoaXMuI2RiVmlldyxcbiAgICAgIGZyb206IG1ha2VRdWVyeUJ1aWxkZXIobW9kdWxlQ3R4LnNjaGVtYVR5cGUpXG4gICAgfSk7XG4gICAgY29uc3QgYXJncyA9IGRlc2VyaWFsaXplUGFyYW1zKG5ldyBCaW5hcnlSZWFkZXIoYXJnc0J1ZikpO1xuICAgIGNvbnN0IHJldCA9IGNhbGxVc2VyRnVuY3Rpb24oZm4sIGN0eCwgYXJncyk7XG4gICAgY29uc3QgcmV0QnVmID0gbmV3IEJpbmFyeVdyaXRlcihyZXR1cm5UeXBlQmFzZVNpemUpO1xuICAgIGlmIChpc1Jvd1R5cGVkUXVlcnkocmV0KSkge1xuICAgICAgY29uc3QgcXVlcnkgPSB0b1NxbChyZXQpO1xuICAgICAgVmlld1Jlc3VsdEhlYWRlci5zZXJpYWxpemUocmV0QnVmLCBWaWV3UmVzdWx0SGVhZGVyLlJhd1NxbChxdWVyeSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBWaWV3UmVzdWx0SGVhZGVyLnNlcmlhbGl6ZShyZXRCdWYsIFZpZXdSZXN1bHRIZWFkZXIuUm93RGF0YSk7XG4gICAgICBzZXJpYWxpemVSZXR1cm4ocmV0QnVmLCByZXQpO1xuICAgIH1cbiAgICByZXR1cm4geyBkYXRhOiByZXRCdWYuZ2V0QnVmZmVyKCkgfTtcbiAgfVxuICBfX2NhbGxfdmlld19hbm9uX18oaWQsIGFyZ3NCdWYpIHtcbiAgICBjb25zdCBtb2R1bGVDdHggPSB0aGlzLiNzY2hlbWE7XG4gICAgY29uc3QgeyBmbiwgZGVzZXJpYWxpemVQYXJhbXMsIHNlcmlhbGl6ZVJldHVybiwgcmV0dXJuVHlwZUJhc2VTaXplIH0gPSBtb2R1bGVDdHguYW5vblZpZXdzW2lkXTtcbiAgICBjb25zdCBjdHggPSBmcmVlemUoe1xuICAgICAgLy8gdGhpcyBpcyB0aGUgbm9uLXJlYWRvbmx5IERiVmlldywgYnV0IHRoZSB0eXBpbmcgZm9yIHRoZSB1c2VyIHdpbGwgYmVcbiAgICAgIC8vIHRoZSByZWFkb25seSBvbmUsIGFuZCBpZiB0aGV5IGRvIGNhbGwgbXV0YXRpbmcgZnVuY3Rpb25zIGl0IHdpbGwgZmFpbFxuICAgICAgLy8gYXQgcnVudGltZVxuICAgICAgZGI6IHRoaXMuI2RiVmlldyxcbiAgICAgIGZyb206IG1ha2VRdWVyeUJ1aWxkZXIobW9kdWxlQ3R4LnNjaGVtYVR5cGUpXG4gICAgfSk7XG4gICAgY29uc3QgYXJncyA9IGRlc2VyaWFsaXplUGFyYW1zKG5ldyBCaW5hcnlSZWFkZXIoYXJnc0J1ZikpO1xuICAgIGNvbnN0IHJldCA9IGNhbGxVc2VyRnVuY3Rpb24oZm4sIGN0eCwgYXJncyk7XG4gICAgY29uc3QgcmV0QnVmID0gbmV3IEJpbmFyeVdyaXRlcihyZXR1cm5UeXBlQmFzZVNpemUpO1xuICAgIGlmIChpc1Jvd1R5cGVkUXVlcnkocmV0KSkge1xuICAgICAgY29uc3QgcXVlcnkgPSB0b1NxbChyZXQpO1xuICAgICAgVmlld1Jlc3VsdEhlYWRlci5zZXJpYWxpemUocmV0QnVmLCBWaWV3UmVzdWx0SGVhZGVyLlJhd1NxbChxdWVyeSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBWaWV3UmVzdWx0SGVhZGVyLnNlcmlhbGl6ZShyZXRCdWYsIFZpZXdSZXN1bHRIZWFkZXIuUm93RGF0YSk7XG4gICAgICBzZXJpYWxpemVSZXR1cm4ocmV0QnVmLCByZXQpO1xuICAgIH1cbiAgICByZXR1cm4geyBkYXRhOiByZXRCdWYuZ2V0QnVmZmVyKCkgfTtcbiAgfVxuICBfX2NhbGxfcHJvY2VkdXJlX18oaWQsIHNlbmRlciwgY29ubmVjdGlvbl9pZCwgdGltZXN0YW1wLCBhcmdzKSB7XG4gICAgcmV0dXJuIGNhbGxQcm9jZWR1cmUoXG4gICAgICB0aGlzLiNzY2hlbWEsXG4gICAgICBpZCxcbiAgICAgIG5ldyBJZGVudGl0eShzZW5kZXIpLFxuICAgICAgQ29ubmVjdGlvbklkLm51bGxJZlplcm8obmV3IENvbm5lY3Rpb25JZChjb25uZWN0aW9uX2lkKSksXG4gICAgICBuZXcgVGltZXN0YW1wKHRpbWVzdGFtcCksXG4gICAgICBhcmdzLFxuICAgICAgKCkgPT4gdGhpcy4jZGJWaWV3XG4gICAgKTtcbiAgfVxufTtcbnZhciBCSU5BUllfV1JJVEVSID0gbmV3IEJpbmFyeVdyaXRlcigwKTtcbnZhciBCSU5BUllfUkVBREVSID0gbmV3IEJpbmFyeVJlYWRlcihuZXcgVWludDhBcnJheSgpKTtcbmZ1bmN0aW9uIG1ha2VUYWJsZVZpZXcodHlwZXNwYWNlLCB0YWJsZTIpIHtcbiAgY29uc3QgdGFibGVfaWQgPSBzeXMudGFibGVfaWRfZnJvbV9uYW1lKHRhYmxlMi5zb3VyY2VOYW1lKTtcbiAgY29uc3Qgcm93VHlwZSA9IHR5cGVzcGFjZS50eXBlc1t0YWJsZTIucHJvZHVjdFR5cGVSZWZdO1xuICBpZiAocm93VHlwZS50YWcgIT09IFwiUHJvZHVjdFwiKSB7XG4gICAgdGhyb3cgXCJpbXBvc3NpYmxlXCI7XG4gIH1cbiAgY29uc3Qgc2VyaWFsaXplUm93ID0gQWxnZWJyYWljVHlwZS5tYWtlU2VyaWFsaXplcihyb3dUeXBlLCB0eXBlc3BhY2UpO1xuICBjb25zdCBkZXNlcmlhbGl6ZVJvdyA9IEFsZ2VicmFpY1R5cGUubWFrZURlc2VyaWFsaXplcihyb3dUeXBlLCB0eXBlc3BhY2UpO1xuICBjb25zdCBzZXF1ZW5jZXMgPSB0YWJsZTIuc2VxdWVuY2VzLm1hcCgoc2VxKSA9PiB7XG4gICAgY29uc3QgY29sID0gcm93VHlwZS52YWx1ZS5lbGVtZW50c1tzZXEuY29sdW1uXTtcbiAgICBjb25zdCBjb2xUeXBlID0gY29sLmFsZ2VicmFpY1R5cGU7XG4gICAgbGV0IHNlcXVlbmNlVHJpZ2dlcjtcbiAgICBzd2l0Y2ggKGNvbFR5cGUudGFnKSB7XG4gICAgICBjYXNlIFwiVThcIjpcbiAgICAgIGNhc2UgXCJJOFwiOlxuICAgICAgY2FzZSBcIlUxNlwiOlxuICAgICAgY2FzZSBcIkkxNlwiOlxuICAgICAgY2FzZSBcIlUzMlwiOlxuICAgICAgY2FzZSBcIkkzMlwiOlxuICAgICAgICBzZXF1ZW5jZVRyaWdnZXIgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJVNjRcIjpcbiAgICAgIGNhc2UgXCJJNjRcIjpcbiAgICAgIGNhc2UgXCJVMTI4XCI6XG4gICAgICBjYXNlIFwiSTEyOFwiOlxuICAgICAgY2FzZSBcIlUyNTZcIjpcbiAgICAgIGNhc2UgXCJJMjU2XCI6XG4gICAgICAgIHNlcXVlbmNlVHJpZ2dlciA9IDBuO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJpbnZhbGlkIHNlcXVlbmNlIHR5cGVcIik7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBjb2xOYW1lOiBjb2wubmFtZSxcbiAgICAgIHNlcXVlbmNlVHJpZ2dlcixcbiAgICAgIGRlc2VyaWFsaXplOiBBbGdlYnJhaWNUeXBlLm1ha2VEZXNlcmlhbGl6ZXIoY29sVHlwZSwgdHlwZXNwYWNlKVxuICAgIH07XG4gIH0pO1xuICBjb25zdCBoYXNBdXRvSW5jcmVtZW50ID0gc2VxdWVuY2VzLmxlbmd0aCA+IDA7XG4gIGNvbnN0IGl0ZXIgPSAoKSA9PiB0YWJsZUl0ZXJhdG9yKHN5cy5kYXRhc3RvcmVfdGFibGVfc2Nhbl9ic2F0bih0YWJsZV9pZCksIGRlc2VyaWFsaXplUm93KTtcbiAgY29uc3QgaW50ZWdyYXRlR2VuZXJhdGVkQ29sdW1ucyA9IGhhc0F1dG9JbmNyZW1lbnQgPyAocm93LCByZXRfYnVmKSA9PiB7XG4gICAgQklOQVJZX1JFQURFUi5yZXNldChyZXRfYnVmKTtcbiAgICBmb3IgKGNvbnN0IHsgY29sTmFtZSwgZGVzZXJpYWxpemUsIHNlcXVlbmNlVHJpZ2dlciB9IG9mIHNlcXVlbmNlcykge1xuICAgICAgaWYgKHJvd1tjb2xOYW1lXSA9PT0gc2VxdWVuY2VUcmlnZ2VyKSB7XG4gICAgICAgIHJvd1tjb2xOYW1lXSA9IGRlc2VyaWFsaXplKEJJTkFSWV9SRUFERVIpO1xuICAgICAgfVxuICAgIH1cbiAgfSA6IG51bGw7XG4gIGNvbnN0IHRhYmxlTWV0aG9kcyA9IHtcbiAgICBjb3VudDogKCkgPT4gc3lzLmRhdGFzdG9yZV90YWJsZV9yb3dfY291bnQodGFibGVfaWQpLFxuICAgIGl0ZXIsXG4gICAgW1N5bWJvbC5pdGVyYXRvcl06ICgpID0+IGl0ZXIoKSxcbiAgICBpbnNlcnQ6IChyb3cpID0+IHtcbiAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgQklOQVJZX1dSSVRFUi5yZXNldChidWYpO1xuICAgICAgc2VyaWFsaXplUm93KEJJTkFSWV9XUklURVIsIHJvdyk7XG4gICAgICBzeXMuZGF0YXN0b3JlX2luc2VydF9ic2F0bih0YWJsZV9pZCwgYnVmLmJ1ZmZlciwgQklOQVJZX1dSSVRFUi5vZmZzZXQpO1xuICAgICAgY29uc3QgcmV0ID0geyAuLi5yb3cgfTtcbiAgICAgIGludGVncmF0ZUdlbmVyYXRlZENvbHVtbnM/LihyZXQsIGJ1Zi52aWV3KTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcbiAgICBkZWxldGU6IChyb3cpID0+IHtcbiAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgQklOQVJZX1dSSVRFUi5yZXNldChidWYpO1xuICAgICAgQklOQVJZX1dSSVRFUi53cml0ZVUzMigxKTtcbiAgICAgIHNlcmlhbGl6ZVJvdyhCSU5BUllfV1JJVEVSLCByb3cpO1xuICAgICAgY29uc3QgY291bnQgPSBzeXMuZGF0YXN0b3JlX2RlbGV0ZV9hbGxfYnlfZXFfYnNhdG4oXG4gICAgICAgIHRhYmxlX2lkLFxuICAgICAgICBidWYuYnVmZmVyLFxuICAgICAgICBCSU5BUllfV1JJVEVSLm9mZnNldFxuICAgICAgKTtcbiAgICAgIHJldHVybiBjb3VudCA+IDA7XG4gICAgfVxuICB9O1xuICBjb25zdCB0YWJsZVZpZXcgPSBPYmplY3QuYXNzaWduKFxuICAgIC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIHRhYmxlTWV0aG9kc1xuICApO1xuICBmb3IgKGNvbnN0IGluZGV4RGVmIG9mIHRhYmxlMi5pbmRleGVzKSB7XG4gICAgY29uc3QgYWNjZXNzb3JOYW1lID0gaW5kZXhEZWYuYWNjZXNzb3JOYW1lO1xuICAgIGNvbnN0IGluZGV4X2lkID0gc3lzLmluZGV4X2lkX2Zyb21fbmFtZShpbmRleERlZi5zb3VyY2VOYW1lKTtcbiAgICBsZXQgY29sdW1uX2lkcztcbiAgICBsZXQgaXNIYXNoSW5kZXggPSBmYWxzZTtcbiAgICBzd2l0Y2ggKGluZGV4RGVmLmFsZ29yaXRobS50YWcpIHtcbiAgICAgIGNhc2UgXCJIYXNoXCI6XG4gICAgICAgIGlzSGFzaEluZGV4ID0gdHJ1ZTtcbiAgICAgICAgY29sdW1uX2lkcyA9IGluZGV4RGVmLmFsZ29yaXRobS52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQlRyZWVcIjpcbiAgICAgICAgY29sdW1uX2lkcyA9IGluZGV4RGVmLmFsZ29yaXRobS52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiRGlyZWN0XCI6XG4gICAgICAgIGNvbHVtbl9pZHMgPSBbaW5kZXhEZWYuYWxnb3JpdGhtLnZhbHVlXTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnN0IG51bUNvbHVtbnMgPSBjb2x1bW5faWRzLmxlbmd0aDtcbiAgICBjb25zdCBjb2x1bW5TZXQgPSBuZXcgU2V0KGNvbHVtbl9pZHMpO1xuICAgIGNvbnN0IGlzVW5pcXVlID0gdGFibGUyLmNvbnN0cmFpbnRzLmZpbHRlcigoeCkgPT4geC5kYXRhLnRhZyA9PT0gXCJVbmlxdWVcIikuc29tZSgoeCkgPT4gY29sdW1uU2V0LmlzU3Vic2V0T2YobmV3IFNldCh4LmRhdGEudmFsdWUuY29sdW1ucykpKTtcbiAgICBjb25zdCBpc1ByaW1hcnlLZXkgPSBpc1VuaXF1ZSAmJiBjb2x1bW5faWRzLmxlbmd0aCA9PT0gdGFibGUyLnByaW1hcnlLZXkubGVuZ3RoICYmIGNvbHVtbl9pZHMuZXZlcnkoKGlkLCBpKSA9PiB0YWJsZTIucHJpbWFyeUtleVtpXSA9PT0gaWQpO1xuICAgIGNvbnN0IGluZGV4U2VyaWFsaXplcnMgPSBjb2x1bW5faWRzLm1hcChcbiAgICAgIChpZCkgPT4gQWxnZWJyYWljVHlwZS5tYWtlU2VyaWFsaXplcihcbiAgICAgICAgcm93VHlwZS52YWx1ZS5lbGVtZW50c1tpZF0uYWxnZWJyYWljVHlwZSxcbiAgICAgICAgdHlwZXNwYWNlXG4gICAgICApXG4gICAgKTtcbiAgICBjb25zdCBzZXJpYWxpemVQb2ludCA9IChidWZmZXIsIGNvbFZhbCkgPT4ge1xuICAgICAgQklOQVJZX1dSSVRFUi5yZXNldChidWZmZXIpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Db2x1bW5zOyBpKyspIHtcbiAgICAgICAgaW5kZXhTZXJpYWxpemVyc1tpXShCSU5BUllfV1JJVEVSLCBjb2xWYWxbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIEJJTkFSWV9XUklURVIub2Zmc2V0O1xuICAgIH07XG4gICAgY29uc3Qgc2VyaWFsaXplU2luZ2xlRWxlbWVudCA9IG51bUNvbHVtbnMgPT09IDEgPyBpbmRleFNlcmlhbGl6ZXJzWzBdIDogbnVsbDtcbiAgICBjb25zdCBzZXJpYWxpemVTaW5nbGVQb2ludCA9IHNlcmlhbGl6ZVNpbmdsZUVsZW1lbnQgJiYgKChidWZmZXIsIGNvbFZhbCkgPT4ge1xuICAgICAgQklOQVJZX1dSSVRFUi5yZXNldChidWZmZXIpO1xuICAgICAgc2VyaWFsaXplU2luZ2xlRWxlbWVudChCSU5BUllfV1JJVEVSLCBjb2xWYWwpO1xuICAgICAgcmV0dXJuIEJJTkFSWV9XUklURVIub2Zmc2V0O1xuICAgIH0pO1xuICAgIGxldCBpbmRleDtcbiAgICBpZiAoaXNVbmlxdWUgJiYgc2VyaWFsaXplU2luZ2xlUG9pbnQpIHtcbiAgICAgIGNvbnN0IGJhc2UgPSB7XG4gICAgICAgIGZpbmQ6IChjb2xWYWwpID0+IHtcbiAgICAgICAgICBjb25zdCBidWYgPSBMRUFGX0JVRjtcbiAgICAgICAgICBjb25zdCBwb2ludF9sZW4gPSBzZXJpYWxpemVTaW5nbGVQb2ludChidWYsIGNvbFZhbCk7XG4gICAgICAgICAgY29uc3QgaXRlcl9pZCA9IHN5cy5kYXRhc3RvcmVfaW5kZXhfc2Nhbl9wb2ludF9ic2F0bihcbiAgICAgICAgICAgIGluZGV4X2lkLFxuICAgICAgICAgICAgYnVmLmJ1ZmZlcixcbiAgICAgICAgICAgIHBvaW50X2xlblxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHRhYmxlSXRlcmF0ZU9uZShpdGVyX2lkLCBkZXNlcmlhbGl6ZVJvdyk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZTogKGNvbFZhbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgICAgIGNvbnN0IHBvaW50X2xlbiA9IHNlcmlhbGl6ZVNpbmdsZVBvaW50KGJ1ZiwgY29sVmFsKTtcbiAgICAgICAgICBjb25zdCBudW0gPSBzeXMuZGF0YXN0b3JlX2RlbGV0ZV9ieV9pbmRleF9zY2FuX3BvaW50X2JzYXRuKFxuICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICBidWYuYnVmZmVyLFxuICAgICAgICAgICAgcG9pbnRfbGVuXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gbnVtID4gMDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGlmIChpc1ByaW1hcnlLZXkpIHtcbiAgICAgICAgYmFzZS51cGRhdGUgPSAocm93KSA9PiB7XG4gICAgICAgICAgY29uc3QgYnVmID0gTEVBRl9CVUY7XG4gICAgICAgICAgQklOQVJZX1dSSVRFUi5yZXNldChidWYpO1xuICAgICAgICAgIHNlcmlhbGl6ZVJvdyhCSU5BUllfV1JJVEVSLCByb3cpO1xuICAgICAgICAgIHN5cy5kYXRhc3RvcmVfdXBkYXRlX2JzYXRuKFxuICAgICAgICAgICAgdGFibGVfaWQsXG4gICAgICAgICAgICBpbmRleF9pZCxcbiAgICAgICAgICAgIGJ1Zi5idWZmZXIsXG4gICAgICAgICAgICBCSU5BUllfV1JJVEVSLm9mZnNldFxuICAgICAgICAgICk7XG4gICAgICAgICAgaW50ZWdyYXRlR2VuZXJhdGVkQ29sdW1ucz8uKHJvdywgYnVmLnZpZXcpO1xuICAgICAgICAgIHJldHVybiByb3c7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpbmRleCA9IGJhc2U7XG4gICAgfSBlbHNlIGlmIChpc1VuaXF1ZSkge1xuICAgICAgY29uc3QgYmFzZSA9IHtcbiAgICAgICAgZmluZDogKGNvbFZhbCkgPT4ge1xuICAgICAgICAgIGlmIChjb2xWYWwubGVuZ3RoICE9PSBudW1Db2x1bW5zKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwid3JvbmcgbnVtYmVyIG9mIGVsZW1lbnRzXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBidWYgPSBMRUFGX0JVRjtcbiAgICAgICAgICBjb25zdCBwb2ludF9sZW4gPSBzZXJpYWxpemVQb2ludChidWYsIGNvbFZhbCk7XG4gICAgICAgICAgY29uc3QgaXRlcl9pZCA9IHN5cy5kYXRhc3RvcmVfaW5kZXhfc2Nhbl9wb2ludF9ic2F0bihcbiAgICAgICAgICAgIGluZGV4X2lkLFxuICAgICAgICAgICAgYnVmLmJ1ZmZlcixcbiAgICAgICAgICAgIHBvaW50X2xlblxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHRhYmxlSXRlcmF0ZU9uZShpdGVyX2lkLCBkZXNlcmlhbGl6ZVJvdyk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZTogKGNvbFZhbCkgPT4ge1xuICAgICAgICAgIGlmIChjb2xWYWwubGVuZ3RoICE9PSBudW1Db2x1bW5zKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIndyb25nIG51bWJlciBvZiBlbGVtZW50c1wiKTtcbiAgICAgICAgICBjb25zdCBidWYgPSBMRUFGX0JVRjtcbiAgICAgICAgICBjb25zdCBwb2ludF9sZW4gPSBzZXJpYWxpemVQb2ludChidWYsIGNvbFZhbCk7XG4gICAgICAgICAgY29uc3QgbnVtID0gc3lzLmRhdGFzdG9yZV9kZWxldGVfYnlfaW5kZXhfc2Nhbl9wb2ludF9ic2F0bihcbiAgICAgICAgICAgIGluZGV4X2lkLFxuICAgICAgICAgICAgYnVmLmJ1ZmZlcixcbiAgICAgICAgICAgIHBvaW50X2xlblxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIG51bSA+IDA7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpZiAoaXNQcmltYXJ5S2V5KSB7XG4gICAgICAgIGJhc2UudXBkYXRlID0gKHJvdykgPT4ge1xuICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgICAgIEJJTkFSWV9XUklURVIucmVzZXQoYnVmKTtcbiAgICAgICAgICBzZXJpYWxpemVSb3coQklOQVJZX1dSSVRFUiwgcm93KTtcbiAgICAgICAgICBzeXMuZGF0YXN0b3JlX3VwZGF0ZV9ic2F0bihcbiAgICAgICAgICAgIHRhYmxlX2lkLFxuICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICBidWYuYnVmZmVyLFxuICAgICAgICAgICAgQklOQVJZX1dSSVRFUi5vZmZzZXRcbiAgICAgICAgICApO1xuICAgICAgICAgIGludGVncmF0ZUdlbmVyYXRlZENvbHVtbnM/Lihyb3csIGJ1Zi52aWV3KTtcbiAgICAgICAgICByZXR1cm4gcm93O1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaW5kZXggPSBiYXNlO1xuICAgIH0gZWxzZSBpZiAoc2VyaWFsaXplU2luZ2xlUG9pbnQpIHtcbiAgICAgIGNvbnN0IHJhd0luZGV4ID0ge1xuICAgICAgICBmaWx0ZXI6IChyYW5nZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgICAgIGNvbnN0IHBvaW50X2xlbiA9IHNlcmlhbGl6ZVNpbmdsZVBvaW50KGJ1ZiwgcmFuZ2UpO1xuICAgICAgICAgIGNvbnN0IGl0ZXJfaWQgPSBzeXMuZGF0YXN0b3JlX2luZGV4X3NjYW5fcG9pbnRfYnNhdG4oXG4gICAgICAgICAgICBpbmRleF9pZCxcbiAgICAgICAgICAgIGJ1Zi5idWZmZXIsXG4gICAgICAgICAgICBwb2ludF9sZW5cbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiB0YWJsZUl0ZXJhdG9yKGl0ZXJfaWQsIGRlc2VyaWFsaXplUm93KTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlOiAocmFuZ2UpID0+IHtcbiAgICAgICAgICBjb25zdCBidWYgPSBMRUFGX0JVRjtcbiAgICAgICAgICBjb25zdCBwb2ludF9sZW4gPSBzZXJpYWxpemVTaW5nbGVQb2ludChidWYsIHJhbmdlKTtcbiAgICAgICAgICByZXR1cm4gc3lzLmRhdGFzdG9yZV9kZWxldGVfYnlfaW5kZXhfc2Nhbl9wb2ludF9ic2F0bihcbiAgICAgICAgICAgIGluZGV4X2lkLFxuICAgICAgICAgICAgYnVmLmJ1ZmZlcixcbiAgICAgICAgICAgIHBvaW50X2xlblxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpZiAoaXNIYXNoSW5kZXgpIHtcbiAgICAgICAgaW5kZXggPSByYXdJbmRleDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ID0gcmF3SW5kZXg7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0hhc2hJbmRleCkge1xuICAgICAgaW5kZXggPSB7XG4gICAgICAgIGZpbHRlcjogKHJhbmdlKSA9PiB7XG4gICAgICAgICAgY29uc3QgYnVmID0gTEVBRl9CVUY7XG4gICAgICAgICAgY29uc3QgcG9pbnRfbGVuID0gc2VyaWFsaXplUG9pbnQoYnVmLCByYW5nZSk7XG4gICAgICAgICAgY29uc3QgaXRlcl9pZCA9IHN5cy5kYXRhc3RvcmVfaW5kZXhfc2Nhbl9wb2ludF9ic2F0bihcbiAgICAgICAgICAgIGluZGV4X2lkLFxuICAgICAgICAgICAgYnVmLmJ1ZmZlcixcbiAgICAgICAgICAgIHBvaW50X2xlblxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHRhYmxlSXRlcmF0b3IoaXRlcl9pZCwgZGVzZXJpYWxpemVSb3cpO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGU6IChyYW5nZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgICAgIGNvbnN0IHBvaW50X2xlbiA9IHNlcmlhbGl6ZVBvaW50KGJ1ZiwgcmFuZ2UpO1xuICAgICAgICAgIHJldHVybiBzeXMuZGF0YXN0b3JlX2RlbGV0ZV9ieV9pbmRleF9zY2FuX3BvaW50X2JzYXRuKFxuICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICBidWYuYnVmZmVyLFxuICAgICAgICAgICAgcG9pbnRfbGVuXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2VyaWFsaXplUmFuZ2UgPSAoYnVmZmVyLCByYW5nZSkgPT4ge1xuICAgICAgICBpZiAocmFuZ2UubGVuZ3RoID4gbnVtQ29sdW1ucykgdGhyb3cgbmV3IFR5cGVFcnJvcihcInRvbyBtYW55IGVsZW1lbnRzXCIpO1xuICAgICAgICBCSU5BUllfV1JJVEVSLnJlc2V0KGJ1ZmZlcik7XG4gICAgICAgIGNvbnN0IHdyaXRlciA9IEJJTkFSWV9XUklURVI7XG4gICAgICAgIGNvbnN0IHByZWZpeF9lbGVtcyA9IHJhbmdlLmxlbmd0aCAtIDE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlZml4X2VsZW1zOyBpKyspIHtcbiAgICAgICAgICBpbmRleFNlcmlhbGl6ZXJzW2ldKHdyaXRlciwgcmFuZ2VbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJzdGFydE9mZnNldCA9IHdyaXRlci5vZmZzZXQ7XG4gICAgICAgIGNvbnN0IHRlcm0gPSByYW5nZVtyYW5nZS5sZW5ndGggLSAxXTtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplVGVybSA9IGluZGV4U2VyaWFsaXplcnNbcmFuZ2UubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmICh0ZXJtIGluc3RhbmNlb2YgUmFuZ2UpIHtcbiAgICAgICAgICBjb25zdCB3cml0ZUJvdW5kID0gKGJvdW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YWdzID0geyBpbmNsdWRlZDogMCwgZXhjbHVkZWQ6IDEsIHVuYm91bmRlZDogMiB9O1xuICAgICAgICAgICAgd3JpdGVyLndyaXRlVTgodGFnc1tib3VuZC50YWddKTtcbiAgICAgICAgICAgIGlmIChib3VuZC50YWcgIT09IFwidW5ib3VuZGVkXCIpIHNlcmlhbGl6ZVRlcm0od3JpdGVyLCBib3VuZC52YWx1ZSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB3cml0ZUJvdW5kKHRlcm0uZnJvbSk7XG4gICAgICAgICAgY29uc3QgcnN0YXJ0TGVuID0gd3JpdGVyLm9mZnNldCAtIHJzdGFydE9mZnNldDtcbiAgICAgICAgICB3cml0ZUJvdW5kKHRlcm0udG8pO1xuICAgICAgICAgIGNvbnN0IHJlbmRMZW4gPSB3cml0ZXIub2Zmc2V0IC0gcnN0YXJ0TGVuO1xuICAgICAgICAgIHJldHVybiBbcnN0YXJ0T2Zmc2V0LCBwcmVmaXhfZWxlbXMsIHJzdGFydExlbiwgcmVuZExlbl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3JpdGVyLndyaXRlVTgoMCk7XG4gICAgICAgICAgc2VyaWFsaXplVGVybSh3cml0ZXIsIHRlcm0pO1xuICAgICAgICAgIGNvbnN0IHJzdGFydExlbiA9IHdyaXRlci5vZmZzZXQ7XG4gICAgICAgICAgY29uc3QgcmVuZExlbiA9IDA7XG4gICAgICAgICAgcmV0dXJuIFtyc3RhcnRPZmZzZXQsIHByZWZpeF9lbGVtcywgcnN0YXJ0TGVuLCByZW5kTGVuXTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGluZGV4ID0ge1xuICAgICAgICBmaWx0ZXI6IChyYW5nZSkgPT4ge1xuICAgICAgICAgIGlmIChyYW5nZS5sZW5ndGggPT09IG51bUNvbHVtbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgICAgICAgY29uc3QgcG9pbnRfbGVuID0gc2VyaWFsaXplUG9pbnQoYnVmLCByYW5nZSk7XG4gICAgICAgICAgICBjb25zdCBpdGVyX2lkID0gc3lzLmRhdGFzdG9yZV9pbmRleF9zY2FuX3BvaW50X2JzYXRuKFxuICAgICAgICAgICAgICBpbmRleF9pZCxcbiAgICAgICAgICAgICAgYnVmLmJ1ZmZlcixcbiAgICAgICAgICAgICAgcG9pbnRfbGVuXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHRhYmxlSXRlcmF0b3IoaXRlcl9pZCwgZGVzZXJpYWxpemVSb3cpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBidWYgPSBMRUFGX0JVRjtcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBzZXJpYWxpemVSYW5nZShidWYsIHJhbmdlKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZXJfaWQgPSBzeXMuZGF0YXN0b3JlX2luZGV4X3NjYW5fcmFuZ2VfYnNhdG4oXG4gICAgICAgICAgICAgIGluZGV4X2lkLFxuICAgICAgICAgICAgICBidWYuYnVmZmVyLFxuICAgICAgICAgICAgICAuLi5hcmdzXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHRhYmxlSXRlcmF0b3IoaXRlcl9pZCwgZGVzZXJpYWxpemVSb3cpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlOiAocmFuZ2UpID0+IHtcbiAgICAgICAgICBpZiAocmFuZ2UubGVuZ3RoID09PSBudW1Db2x1bW5zKSB7XG4gICAgICAgICAgICBjb25zdCBidWYgPSBMRUFGX0JVRjtcbiAgICAgICAgICAgIGNvbnN0IHBvaW50X2xlbiA9IHNlcmlhbGl6ZVBvaW50KGJ1ZiwgcmFuZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIHN5cy5kYXRhc3RvcmVfZGVsZXRlX2J5X2luZGV4X3NjYW5fcG9pbnRfYnNhdG4oXG4gICAgICAgICAgICAgIGluZGV4X2lkLFxuICAgICAgICAgICAgICBidWYuYnVmZmVyLFxuICAgICAgICAgICAgICBwb2ludF9sZW5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZiA9IExFQUZfQlVGO1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IHNlcmlhbGl6ZVJhbmdlKGJ1ZiwgcmFuZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIHN5cy5kYXRhc3RvcmVfZGVsZXRlX2J5X2luZGV4X3NjYW5fcmFuZ2VfYnNhdG4oXG4gICAgICAgICAgICAgIGluZGV4X2lkLFxuICAgICAgICAgICAgICBidWYuYnVmZmVyLFxuICAgICAgICAgICAgICAuLi5hcmdzXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKE9iamVjdC5oYXNPd24odGFibGVWaWV3LCBhY2Nlc3Nvck5hbWUpKSB7XG4gICAgICBmcmVlemUoT2JqZWN0LmFzc2lnbih0YWJsZVZpZXdbYWNjZXNzb3JOYW1lXSwgaW5kZXgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFibGVWaWV3W2FjY2Vzc29yTmFtZV0gPSBmcmVlemUoaW5kZXgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZnJlZXplKHRhYmxlVmlldyk7XG59XG5mdW5jdGlvbiogdGFibGVJdGVyYXRvcihpZCwgZGVzZXJpYWxpemUpIHtcbiAgdXNpbmcgaXRlciA9IG5ldyBJdGVyYXRvckhhbmRsZShpZCk7XG4gIGNvbnN0IGl0ZXJCdWYgPSB0YWtlQnVmKCk7XG4gIHRyeSB7XG4gICAgbGV0IGFtdDtcbiAgICB3aGlsZSAoYW10ID0gaXRlci5hZHZhbmNlKGl0ZXJCdWYpKSB7XG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgQmluYXJ5UmVhZGVyKGl0ZXJCdWYudmlldyk7XG4gICAgICB3aGlsZSAocmVhZGVyLm9mZnNldCA8IGFtdCkge1xuICAgICAgICB5aWVsZCBkZXNlcmlhbGl6ZShyZWFkZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICByZXR1cm5CdWYoaXRlckJ1Zik7XG4gIH1cbn1cbmZ1bmN0aW9uIHRhYmxlSXRlcmF0ZU9uZShpZCwgZGVzZXJpYWxpemUpIHtcbiAgY29uc3QgYnVmID0gTEVBRl9CVUY7XG4gIGNvbnN0IHJldCA9IGFkdmFuY2VJdGVyUmF3KGlkLCBidWYpO1xuICBpZiAocmV0ICE9PSAwKSB7XG4gICAgQklOQVJZX1JFQURFUi5yZXNldChidWYudmlldyk7XG4gICAgcmV0dXJuIGRlc2VyaWFsaXplKEJJTkFSWV9SRUFERVIpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gYWR2YW5jZUl0ZXJSYXcoaWQsIGJ1Zikge1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gMCB8IHN5cy5yb3dfaXRlcl9ic2F0bl9hZHZhbmNlKGlkLCBidWYuYnVmZmVyKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSAmJiB0eXBlb2YgZSA9PT0gXCJvYmplY3RcIiAmJiBoYXNPd24oZSwgXCJfX2J1ZmZlcl90b29fc21hbGxfX1wiKSkge1xuICAgICAgICBidWYuZ3JvdyhlLl9fYnVmZmVyX3Rvb19zbWFsbF9fKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxufVxudmFyIERFRkFVTFRfQlVGRkVSX0NBUEFDSVRZID0gMzIgKiAxMDI0ICogMjtcbnZhciBJVEVSX0JVRlMgPSBbXG4gIG5ldyBSZXNpemFibGVCdWZmZXIoREVGQVVMVF9CVUZGRVJfQ0FQQUNJVFkpXG5dO1xudmFyIElURVJfQlVGX0NPVU5UID0gMTtcbmZ1bmN0aW9uIHRha2VCdWYoKSB7XG4gIHJldHVybiBJVEVSX0JVRl9DT1VOVCA/IElURVJfQlVGU1stLUlURVJfQlVGX0NPVU5UXSA6IG5ldyBSZXNpemFibGVCdWZmZXIoREVGQVVMVF9CVUZGRVJfQ0FQQUNJVFkpO1xufVxuZnVuY3Rpb24gcmV0dXJuQnVmKGJ1Zikge1xuICBJVEVSX0JVRlNbSVRFUl9CVUZfQ09VTlQrK10gPSBidWY7XG59XG52YXIgTEVBRl9CVUYgPSBuZXcgUmVzaXphYmxlQnVmZmVyKERFRkFVTFRfQlVGRkVSX0NBUEFDSVRZKTtcbnZhciBJdGVyYXRvckhhbmRsZSA9IGNsYXNzIF9JdGVyYXRvckhhbmRsZSB7XG4gICNpZDtcbiAgc3RhdGljICNmaW5hbGl6YXRpb25SZWdpc3RyeSA9IG5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeShcbiAgICBzeXMucm93X2l0ZXJfYnNhdG5fY2xvc2VcbiAgKTtcbiAgY29uc3RydWN0b3IoaWQpIHtcbiAgICB0aGlzLiNpZCA9IGlkO1xuICAgIF9JdGVyYXRvckhhbmRsZS4jZmluYWxpemF0aW9uUmVnaXN0cnkucmVnaXN0ZXIodGhpcywgaWQsIHRoaXMpO1xuICB9XG4gIC8qKiBVbnJlZ2lzdGVyIHRoaXMgb2JqZWN0IHdpdGggdGhlIGZpbmFsaXphdGlvbiByZWdpc3RyeSBhbmQgcmV0dXJuIHRoZSBpZCAqL1xuICAjZGV0YWNoKCkge1xuICAgIGNvbnN0IGlkID0gdGhpcy4jaWQ7XG4gICAgdGhpcy4jaWQgPSAtMTtcbiAgICBfSXRlcmF0b3JIYW5kbGUuI2ZpbmFsaXphdGlvblJlZ2lzdHJ5LnVucmVnaXN0ZXIodGhpcyk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG4gIC8qKiBDYWxsIGByb3dfaXRlcl9ic2F0bl9hZHZhbmNlYCwgcmV0dXJuaW5nIDAgaWYgdGhpcyBpdGVyYXRvciBoYXMgYmVlbiBleGhhdXN0ZWQuICovXG4gIGFkdmFuY2UoYnVmKSB7XG4gICAgaWYgKHRoaXMuI2lkID09PSAtMSkgcmV0dXJuIDA7XG4gICAgY29uc3QgcmV0ID0gYWR2YW5jZUl0ZXJSYXcodGhpcy4jaWQsIGJ1Zik7XG4gICAgaWYgKHJldCA8PSAwKSB0aGlzLiNkZXRhY2goKTtcbiAgICByZXR1cm4gcmV0IDwgMCA/IC1yZXQgOiByZXQ7XG4gIH1cbiAgW1N5bWJvbC5kaXNwb3NlXSgpIHtcbiAgICBpZiAodGhpcy4jaWQgPj0gMCkge1xuICAgICAgY29uc3QgaWQgPSB0aGlzLiNkZXRhY2goKTtcbiAgICAgIHN5cy5yb3dfaXRlcl9ic2F0bl9jbG9zZShpZCk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBzcmMvc2VydmVyL2h0dHBfaW50ZXJuYWwudHNcbnZhciB7IGZyZWV6ZTogZnJlZXplMiB9ID0gT2JqZWN0O1xudmFyIHRleHRFbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCk7XG52YXIgdGV4dERlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoXG4gIFwidXRmLThcIlxuICAvKiB7IGZhdGFsOiB0cnVlIH0gKi9cbik7XG52YXIgbWFrZVJlc3BvbnNlID0gU3ltYm9sKFwibWFrZVJlc3BvbnNlXCIpO1xudmFyIFN5bmNSZXNwb25zZSA9IGNsYXNzIF9TeW5jUmVzcG9uc2Uge1xuICAjYm9keTtcbiAgI2lubmVyO1xuICBjb25zdHJ1Y3Rvcihib2R5LCBpbml0KSB7XG4gICAgaWYgKGJvZHkgPT0gbnVsbCkge1xuICAgICAgdGhpcy4jYm9keSA9IG51bGw7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy4jYm9keSA9IGJvZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI2JvZHkgPSBuZXcgVWludDhBcnJheShib2R5KS5idWZmZXI7XG4gICAgfVxuICAgIHRoaXMuI2lubmVyID0ge1xuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoaW5pdD8uaGVhZGVycyksXG4gICAgICBzdGF0dXM6IGluaXQ/LnN0YXR1cyA/PyAyMDAsXG4gICAgICBzdGF0dXNUZXh0OiBpbml0Py5zdGF0dXNUZXh0ID8/IFwiXCIsXG4gICAgICB0eXBlOiBcImRlZmF1bHRcIixcbiAgICAgIHVybDogbnVsbCxcbiAgICAgIGFib3J0ZWQ6IGZhbHNlXG4gICAgfTtcbiAgfVxuICBzdGF0aWMgW21ha2VSZXNwb25zZV0oYm9keSwgaW5uZXIpIHtcbiAgICBjb25zdCBtZSA9IG5ldyBfU3luY1Jlc3BvbnNlKGJvZHkpO1xuICAgIG1lLiNpbm5lciA9IGlubmVyO1xuICAgIHJldHVybiBtZTtcbiAgfVxuICBnZXQgaGVhZGVycygpIHtcbiAgICByZXR1cm4gdGhpcy4jaW5uZXIuaGVhZGVycztcbiAgfVxuICBnZXQgc3RhdHVzKCkge1xuICAgIHJldHVybiB0aGlzLiNpbm5lci5zdGF0dXM7XG4gIH1cbiAgZ2V0IHN0YXR1c1RleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2lubmVyLnN0YXR1c1RleHQ7XG4gIH1cbiAgZ2V0IG9rKCkge1xuICAgIHJldHVybiAyMDAgPD0gdGhpcy4jaW5uZXIuc3RhdHVzICYmIHRoaXMuI2lubmVyLnN0YXR1cyA8PSAyOTk7XG4gIH1cbiAgZ2V0IHVybCgpIHtcbiAgICByZXR1cm4gdGhpcy4jaW5uZXIudXJsID8/IFwiXCI7XG4gIH1cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2lubmVyLnR5cGU7XG4gIH1cbiAgYXJyYXlCdWZmZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYnl0ZXMoKS5idWZmZXI7XG4gIH1cbiAgYnl0ZXMoKSB7XG4gICAgaWYgKHRoaXMuI2JvZHkgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy4jYm9keSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIHRleHRFbmNvZGVyLmVuY29kZSh0aGlzLiNib2R5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHRoaXMuI2JvZHkpO1xuICAgIH1cbiAgfVxuICBqc29uKCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMudGV4dCgpKTtcbiAgfVxuICB0ZXh0KCkge1xuICAgIGlmICh0aGlzLiNib2R5ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuI2JvZHkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLiNib2R5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGV4dERlY29kZXIuZGVjb2RlKHRoaXMuI2JvZHkpO1xuICAgIH1cbiAgfVxufTtcbnZhciByZXF1ZXN0QmFzZVNpemUgPSBic2F0bkJhc2VTaXplKHsgdHlwZXM6IFtdIH0sIEh0dHBSZXF1ZXN0LmFsZ2VicmFpY1R5cGUpO1xudmFyIG1ldGhvZHMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcChbXG4gIFtcIkdFVFwiLCB7IHRhZzogXCJHZXRcIiB9XSxcbiAgW1wiSEVBRFwiLCB7IHRhZzogXCJIZWFkXCIgfV0sXG4gIFtcIlBPU1RcIiwgeyB0YWc6IFwiUG9zdFwiIH1dLFxuICBbXCJQVVRcIiwgeyB0YWc6IFwiUHV0XCIgfV0sXG4gIFtcIkRFTEVURVwiLCB7IHRhZzogXCJEZWxldGVcIiB9XSxcbiAgW1wiQ09OTkVDVFwiLCB7IHRhZzogXCJDb25uZWN0XCIgfV0sXG4gIFtcIk9QVElPTlNcIiwgeyB0YWc6IFwiT3B0aW9uc1wiIH1dLFxuICBbXCJUUkFDRVwiLCB7IHRhZzogXCJUcmFjZVwiIH1dLFxuICBbXCJQQVRDSFwiLCB7IHRhZzogXCJQYXRjaFwiIH1dXG5dKTtcbmZ1bmN0aW9uIGZldGNoKHVybCwgaW5pdCA9IHt9KSB7XG4gIGNvbnN0IG1ldGhvZCA9IG1ldGhvZHMuZ2V0KGluaXQubWV0aG9kPy50b1VwcGVyQ2FzZSgpID8/IFwiR0VUXCIpID8/IHtcbiAgICB0YWc6IFwiRXh0ZW5zaW9uXCIsXG4gICAgdmFsdWU6IGluaXQubWV0aG9kXG4gIH07XG4gIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgLy8gYW55cyBiZWNhdXNlIHRoZSB0eXBpbmdzIGFyZSB3b25reSAtIHNlZSBjb21tZW50IGluIFN5bmNSZXNwb25zZS5jb25zdHJ1Y3RvclxuICAgIGVudHJpZXM6IGhlYWRlcnNUb0xpc3QobmV3IEhlYWRlcnMoaW5pdC5oZWFkZXJzKSkuZmxhdE1hcCgoW2ssIHZdKSA9PiBBcnJheS5pc0FycmF5KHYpID8gdi5tYXAoKHYyKSA9PiBbaywgdjJdKSA6IFtbaywgdl1dKS5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+ICh7IG5hbWUsIHZhbHVlOiB0ZXh0RW5jb2Rlci5lbmNvZGUodmFsdWUpIH0pKVxuICB9O1xuICBjb25zdCB1cmkgPSBcIlwiICsgdXJsO1xuICBjb25zdCByZXF1ZXN0ID0gZnJlZXplMih7XG4gICAgbWV0aG9kLFxuICAgIGhlYWRlcnMsXG4gICAgdGltZW91dDogaW5pdC50aW1lb3V0LFxuICAgIHVyaSxcbiAgICB2ZXJzaW9uOiB7IHRhZzogXCJIdHRwMTFcIiB9XG4gIH0pO1xuICBjb25zdCByZXF1ZXN0QnVmID0gbmV3IEJpbmFyeVdyaXRlcihyZXF1ZXN0QmFzZVNpemUpO1xuICBIdHRwUmVxdWVzdC5zZXJpYWxpemUocmVxdWVzdEJ1ZiwgcmVxdWVzdCk7XG4gIGNvbnN0IGJvZHkgPSBpbml0LmJvZHkgPT0gbnVsbCA/IG5ldyBVaW50OEFycmF5KCkgOiB0eXBlb2YgaW5pdC5ib2R5ID09PSBcInN0cmluZ1wiID8gaW5pdC5ib2R5IDogbmV3IFVpbnQ4QXJyYXkoaW5pdC5ib2R5KTtcbiAgY29uc3QgW3Jlc3BvbnNlQnVmLCByZXNwb25zZUJvZHldID0gc3lzLnByb2NlZHVyZV9odHRwX3JlcXVlc3QoXG4gICAgcmVxdWVzdEJ1Zi5nZXRCdWZmZXIoKSxcbiAgICBib2R5XG4gICk7XG4gIGNvbnN0IHJlc3BvbnNlID0gSHR0cFJlc3BvbnNlLmRlc2VyaWFsaXplKG5ldyBCaW5hcnlSZWFkZXIocmVzcG9uc2VCdWYpKTtcbiAgcmV0dXJuIFN5bmNSZXNwb25zZVttYWtlUmVzcG9uc2VdKHJlc3BvbnNlQm9keSwge1xuICAgIHR5cGU6IFwiYmFzaWNcIixcbiAgICB1cmw6IHVyaSxcbiAgICBzdGF0dXM6IHJlc3BvbnNlLmNvZGUsXG4gICAgc3RhdHVzVGV4dDogKDAsIGltcG9ydF9zdGF0dXNlcy5kZWZhdWx0KShyZXNwb25zZS5jb2RlKSxcbiAgICBoZWFkZXJzOiBuZXcgSGVhZGVycygpLFxuICAgIGFib3J0ZWQ6IGZhbHNlXG4gIH0pO1xufVxuZnJlZXplMihmZXRjaCk7XG52YXIgaHR0cENsaWVudCA9IGZyZWV6ZTIoeyBmZXRjaCB9KTtcblxuLy8gc3JjL3NlcnZlci9wcm9jZWR1cmVzLnRzXG5mdW5jdGlvbiBtYWtlUHJvY2VkdXJlRXhwb3J0KGN0eCwgb3B0cywgcGFyYW1zLCByZXQsIGZuKSB7XG4gIGNvbnN0IG5hbWUgPSBvcHRzPy5uYW1lO1xuICBjb25zdCBwcm9jZWR1cmVFeHBvcnQgPSAoLi4uYXJncykgPT4gZm4oLi4uYXJncyk7XG4gIHByb2NlZHVyZUV4cG9ydFtleHBvcnRDb250ZXh0XSA9IGN0eDtcbiAgcHJvY2VkdXJlRXhwb3J0W3JlZ2lzdGVyRXhwb3J0XSA9IChjdHgyLCBleHBvcnROYW1lKSA9PiB7XG4gICAgcmVnaXN0ZXJQcm9jZWR1cmUoY3R4MiwgbmFtZSA/PyBleHBvcnROYW1lLCBwYXJhbXMsIHJldCwgZm4pO1xuICAgIGN0eDIuZnVuY3Rpb25FeHBvcnRzLnNldChcbiAgICAgIHByb2NlZHVyZUV4cG9ydCxcbiAgICAgIG5hbWUgPz8gZXhwb3J0TmFtZVxuICAgICk7XG4gIH07XG4gIHJldHVybiBwcm9jZWR1cmVFeHBvcnQ7XG59XG52YXIgVHJhbnNhY3Rpb25DdHhJbXBsID0gY2xhc3MgVHJhbnNhY3Rpb25DdHggZXh0ZW5kcyBSZWR1Y2VyQ3R4SW1wbCB7XG59O1xuZnVuY3Rpb24gcmVnaXN0ZXJQcm9jZWR1cmUoY3R4LCBleHBvcnROYW1lLCBwYXJhbXMsIHJldCwgZm4sIG9wdHMpIHtcbiAgY3R4LmRlZmluZUZ1bmN0aW9uKGV4cG9ydE5hbWUpO1xuICBjb25zdCBwYXJhbXNUeXBlID0ge1xuICAgIGVsZW1lbnRzOiBPYmplY3QuZW50cmllcyhwYXJhbXMpLm1hcCgoW24sIGNdKSA9PiAoe1xuICAgICAgbmFtZTogbixcbiAgICAgIGFsZ2VicmFpY1R5cGU6IGN0eC5yZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkoXG4gICAgICAgIFwidHlwZUJ1aWxkZXJcIiBpbiBjID8gYy50eXBlQnVpbGRlciA6IGNcbiAgICAgICkuYWxnZWJyYWljVHlwZVxuICAgIH0pKVxuICB9O1xuICBjb25zdCByZXR1cm5UeXBlID0gY3R4LnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseShyZXQpLmFsZ2VicmFpY1R5cGU7XG4gIGN0eC5tb2R1bGVEZWYucHJvY2VkdXJlcy5wdXNoKHtcbiAgICBzb3VyY2VOYW1lOiBleHBvcnROYW1lLFxuICAgIHBhcmFtczogcGFyYW1zVHlwZSxcbiAgICByZXR1cm5UeXBlLFxuICAgIHZpc2liaWxpdHk6IEZ1bmN0aW9uVmlzaWJpbGl0eS5DbGllbnRDYWxsYWJsZVxuICB9KTtcbiAgY29uc3QgeyB0eXBlc3BhY2UgfSA9IGN0eDtcbiAgY3R4LnByb2NlZHVyZXMucHVzaCh7XG4gICAgZm4sXG4gICAgZGVzZXJpYWxpemVBcmdzOiBQcm9kdWN0VHlwZS5tYWtlRGVzZXJpYWxpemVyKHBhcmFtc1R5cGUsIHR5cGVzcGFjZSksXG4gICAgc2VyaWFsaXplUmV0dXJuOiBBbGdlYnJhaWNUeXBlLm1ha2VTZXJpYWxpemVyKHJldHVyblR5cGUsIHR5cGVzcGFjZSksXG4gICAgcmV0dXJuVHlwZUJhc2VTaXplOiBic2F0bkJhc2VTaXplKHR5cGVzcGFjZSwgcmV0dXJuVHlwZSlcbiAgfSk7XG59XG5mdW5jdGlvbiBjYWxsUHJvY2VkdXJlKG1vZHVsZUN0eCwgaWQsIHNlbmRlciwgY29ubmVjdGlvbklkLCB0aW1lc3RhbXAsIGFyZ3NCdWYsIGRiVmlldykge1xuICBjb25zdCB7IGZuLCBkZXNlcmlhbGl6ZUFyZ3MsIHNlcmlhbGl6ZVJldHVybiwgcmV0dXJuVHlwZUJhc2VTaXplIH0gPSBtb2R1bGVDdHgucHJvY2VkdXJlc1tpZF07XG4gIGNvbnN0IGFyZ3MgPSBkZXNlcmlhbGl6ZUFyZ3MobmV3IEJpbmFyeVJlYWRlcihhcmdzQnVmKSk7XG4gIGNvbnN0IGN0eCA9IG5ldyBQcm9jZWR1cmVDdHhJbXBsKFxuICAgIHNlbmRlcixcbiAgICB0aW1lc3RhbXAsXG4gICAgY29ubmVjdGlvbklkLFxuICAgIGRiVmlld1xuICApO1xuICBjb25zdCByZXQgPSBjYWxsVXNlckZ1bmN0aW9uKGZuLCBjdHgsIGFyZ3MpO1xuICBjb25zdCByZXRCdWYgPSBuZXcgQmluYXJ5V3JpdGVyKHJldHVyblR5cGVCYXNlU2l6ZSk7XG4gIHNlcmlhbGl6ZVJldHVybihyZXRCdWYsIHJldCk7XG4gIHJldHVybiByZXRCdWYuZ2V0QnVmZmVyKCk7XG59XG52YXIgUHJvY2VkdXJlQ3R4SW1wbCA9IGNsYXNzIFByb2NlZHVyZUN0eCB7XG4gIGNvbnN0cnVjdG9yKHNlbmRlciwgdGltZXN0YW1wLCBjb25uZWN0aW9uSWQsIGRiVmlldykge1xuICAgIHRoaXMuc2VuZGVyID0gc2VuZGVyO1xuICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgIHRoaXMuY29ubmVjdGlvbklkID0gY29ubmVjdGlvbklkO1xuICAgIHRoaXMuI2RiVmlldyA9IGRiVmlldztcbiAgfVxuICAjaWRlbnRpdHk7XG4gICN1dWlkQ291bnRlcjtcbiAgI3JhbmRvbTtcbiAgI2RiVmlldztcbiAgZ2V0IGlkZW50aXR5KCkge1xuICAgIHJldHVybiB0aGlzLiNpZGVudGl0eSA/Pz0gbmV3IElkZW50aXR5KHN5cy5pZGVudGl0eSgpKTtcbiAgfVxuICBnZXQgcmFuZG9tKCkge1xuICAgIHJldHVybiB0aGlzLiNyYW5kb20gPz89IG1ha2VSYW5kb20odGhpcy50aW1lc3RhbXApO1xuICB9XG4gIGdldCBodHRwKCkge1xuICAgIHJldHVybiBodHRwQ2xpZW50O1xuICB9XG4gIHdpdGhUeChib2R5KSB7XG4gICAgY29uc3QgcnVuID0gKCkgPT4ge1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gc3lzLnByb2NlZHVyZV9zdGFydF9tdXRfdHgoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IG5ldyBUcmFuc2FjdGlvbkN0eEltcGwoXG4gICAgICAgICAgdGhpcy5zZW5kZXIsXG4gICAgICAgICAgbmV3IFRpbWVzdGFtcCh0aW1lc3RhbXApLFxuICAgICAgICAgIHRoaXMuY29ubmVjdGlvbklkLFxuICAgICAgICAgIHRoaXMuI2RiVmlldygpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBib2R5KGN0eCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHN5cy5wcm9jZWR1cmVfYWJvcnRfbXV0X3R4KCk7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfTtcbiAgICBsZXQgcmVzID0gcnVuKCk7XG4gICAgdHJ5IHtcbiAgICAgIHN5cy5wcm9jZWR1cmVfY29tbWl0X211dF90eCgpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGNhdGNoIHtcbiAgICB9XG4gICAgY29uc29sZS53YXJuKFwiY29tbWl0dGluZyBhbm9ueW1vdXMgdHJhbnNhY3Rpb24gZmFpbGVkXCIpO1xuICAgIHJlcyA9IHJ1bigpO1xuICAgIHRyeSB7XG4gICAgICBzeXMucHJvY2VkdXJlX2NvbW1pdF9tdXRfdHgoKTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJhbnNhY3Rpb24gcmV0cnkgZmFpbGVkIGFnYWluXCIsIHsgY2F1c2U6IGUgfSk7XG4gICAgfVxuICB9XG4gIG5ld1V1aWRWNCgpIHtcbiAgICBjb25zdCBieXRlcyA9IHRoaXMucmFuZG9tLmZpbGwobmV3IFVpbnQ4QXJyYXkoMTYpKTtcbiAgICByZXR1cm4gVXVpZC5mcm9tUmFuZG9tQnl0ZXNWNChieXRlcyk7XG4gIH1cbiAgbmV3VXVpZFY3KCkge1xuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy5yYW5kb20uZmlsbChuZXcgVWludDhBcnJheSg0KSk7XG4gICAgY29uc3QgY291bnRlciA9IHRoaXMuI3V1aWRDb3VudGVyID8/PSB7IHZhbHVlOiAwIH07XG4gICAgcmV0dXJuIFV1aWQuZnJvbUNvdW50ZXJWNyhjb3VudGVyLCB0aGlzLnRpbWVzdGFtcCwgYnl0ZXMpO1xuICB9XG59O1xuXG4vLyBzcmMvc2VydmVyL3JlZHVjZXJzLnRzXG5mdW5jdGlvbiBtYWtlUmVkdWNlckV4cG9ydChjdHgsIG9wdHMsIHBhcmFtcywgZm4sIGxpZmVjeWNsZSkge1xuICBjb25zdCByZWR1Y2VyRXhwb3J0ID0gKC4uLmFyZ3MpID0+IGZuKC4uLmFyZ3MpO1xuICByZWR1Y2VyRXhwb3J0W2V4cG9ydENvbnRleHRdID0gY3R4O1xuICByZWR1Y2VyRXhwb3J0W3JlZ2lzdGVyRXhwb3J0XSA9IChjdHgyLCBleHBvcnROYW1lKSA9PiB7XG4gICAgcmVnaXN0ZXJSZWR1Y2VyKGN0eDIsIGV4cG9ydE5hbWUsIHBhcmFtcywgZm4sIG9wdHMsIGxpZmVjeWNsZSk7XG4gICAgY3R4Mi5mdW5jdGlvbkV4cG9ydHMuc2V0KFxuICAgICAgcmVkdWNlckV4cG9ydCxcbiAgICAgIGV4cG9ydE5hbWVcbiAgICApO1xuICB9O1xuICByZXR1cm4gcmVkdWNlckV4cG9ydDtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyUmVkdWNlcihjdHgsIGV4cG9ydE5hbWUsIHBhcmFtcywgZm4sIG9wdHMsIGxpZmVjeWNsZSkge1xuICBjdHguZGVmaW5lRnVuY3Rpb24oZXhwb3J0TmFtZSk7XG4gIGlmICghKHBhcmFtcyBpbnN0YW5jZW9mIFJvd0J1aWxkZXIpKSB7XG4gICAgcGFyYW1zID0gbmV3IFJvd0J1aWxkZXIocGFyYW1zKTtcbiAgfVxuICBpZiAocGFyYW1zLnR5cGVOYW1lID09PSB2b2lkIDApIHtcbiAgICBwYXJhbXMudHlwZU5hbWUgPSB0b1Bhc2NhbENhc2UoZXhwb3J0TmFtZSk7XG4gIH1cbiAgY29uc3QgcmVmID0gY3R4LnJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseShwYXJhbXMpO1xuICBjb25zdCBwYXJhbXNUeXBlID0gY3R4LnJlc29sdmVUeXBlKHJlZikudmFsdWU7XG4gIGNvbnN0IGlzTGlmZWN5Y2xlID0gbGlmZWN5Y2xlICE9IG51bGw7XG4gIGN0eC5tb2R1bGVEZWYucmVkdWNlcnMucHVzaCh7XG4gICAgc291cmNlTmFtZTogZXhwb3J0TmFtZSxcbiAgICBwYXJhbXM6IHBhcmFtc1R5cGUsXG4gICAgLy9Nb2R1bGVEZWYgdmFsaWRhdGlvbiBjb2RlIGlzIHJlc3BvbnNpYmxlIHRvIG1hcmsgcHJpdmF0ZSByZWR1Y2Vyc1xuICAgIHZpc2liaWxpdHk6IEZ1bmN0aW9uVmlzaWJpbGl0eS5DbGllbnRDYWxsYWJsZSxcbiAgICAvL0hhcmRjb2RlZCBmb3Igbm93IC0gcmVkdWNlcnMgZG8gbm90IHJldHVybiB2YWx1ZXMgeWV0XG4gICAgb2tSZXR1cm5UeXBlOiBBbGdlYnJhaWNUeXBlLlByb2R1Y3QoeyBlbGVtZW50czogW10gfSksXG4gICAgZXJyUmV0dXJuVHlwZTogQWxnZWJyYWljVHlwZS5TdHJpbmdcbiAgfSk7XG4gIGlmIChvcHRzPy5uYW1lICE9IG51bGwpIHtcbiAgICBjdHgubW9kdWxlRGVmLmV4cGxpY2l0TmFtZXMuZW50cmllcy5wdXNoKHtcbiAgICAgIHRhZzogXCJGdW5jdGlvblwiLFxuICAgICAgdmFsdWU6IHtcbiAgICAgICAgc291cmNlTmFtZTogZXhwb3J0TmFtZSxcbiAgICAgICAgY2Fub25pY2FsTmFtZTogb3B0cy5uYW1lXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgaWYgKGlzTGlmZWN5Y2xlKSB7XG4gICAgY3R4Lm1vZHVsZURlZi5saWZlQ3ljbGVSZWR1Y2Vycy5wdXNoKHtcbiAgICAgIGxpZmVjeWNsZVNwZWM6IGxpZmVjeWNsZSxcbiAgICAgIGZ1bmN0aW9uTmFtZTogZXhwb3J0TmFtZVxuICAgIH0pO1xuICB9XG4gIGlmICghZm4ubmFtZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgXCJuYW1lXCIsIHsgdmFsdWU6IGV4cG9ydE5hbWUsIHdyaXRhYmxlOiBmYWxzZSB9KTtcbiAgfVxuICBjdHgucmVkdWNlcnMucHVzaChmbik7XG59XG5cbi8vIHNyYy9zZXJ2ZXIvc2NoZW1hLnRzXG52YXIgU2NoZW1hSW5uZXIgPSBjbGFzcyBleHRlbmRzIE1vZHVsZUNvbnRleHQge1xuICBzY2hlbWFUeXBlO1xuICBleGlzdGluZ0Z1bmN0aW9ucyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCk7XG4gIHJlZHVjZXJzID0gW107XG4gIHByb2NlZHVyZXMgPSBbXTtcbiAgdmlld3MgPSBbXTtcbiAgYW5vblZpZXdzID0gW107XG4gIC8qKlxuICAgKiBNYXBzIFJlZHVjZXJFeHBvcnQgb2JqZWN0cyB0byB0aGUgbmFtZSBvZiB0aGUgcmVkdWNlci5cbiAgICogVXNlZCBmb3IgcmVzb2x2aW5nIHRoZSByZWR1Y2VycyBvZiBzY2hlZHVsZWQgdGFibGVzLlxuICAgKi9cbiAgZnVuY3Rpb25FeHBvcnRzID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgcGVuZGluZ1NjaGVkdWxlcyA9IFtdO1xuICBjb25zdHJ1Y3RvcihnZXRTY2hlbWFUeXBlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNjaGVtYVR5cGUgPSBnZXRTY2hlbWFUeXBlKHRoaXMpO1xuICB9XG4gIGRlZmluZUZ1bmN0aW9uKG5hbWUpIHtcbiAgICBpZiAodGhpcy5leGlzdGluZ0Z1bmN0aW9ucy5oYXMobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgIGBUaGVyZSBpcyBhbHJlYWR5IGEgcmVkdWNlciBvciBwcm9jZWR1cmUgd2l0aCB0aGUgbmFtZSAnJHtuYW1lfSdgXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLmV4aXN0aW5nRnVuY3Rpb25zLmFkZChuYW1lKTtcbiAgfVxuICByZXNvbHZlU2NoZWR1bGVzKCkge1xuICAgIGZvciAoY29uc3QgeyByZWR1Y2VyLCBzY2hlZHVsZUF0Q29sLCB0YWJsZU5hbWUgfSBvZiB0aGlzLnBlbmRpbmdTY2hlZHVsZXMpIHtcbiAgICAgIGNvbnN0IGZ1bmN0aW9uTmFtZSA9IHRoaXMuZnVuY3Rpb25FeHBvcnRzLmdldChyZWR1Y2VyKCkpO1xuICAgICAgaWYgKGZ1bmN0aW9uTmFtZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IGBUYWJsZSAke3RhYmxlTmFtZX0gZGVmaW5lcyBhIHNjaGVkdWxlLCBidXQgaXQgc2VlbXMgbGlrZSB0aGUgYXNzb2NpYXRlZCBmdW5jdGlvbiB3YXMgbm90IGV4cG9ydGVkLmA7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubW9kdWxlRGVmLnNjaGVkdWxlcy5wdXNoKHtcbiAgICAgICAgc291cmNlTmFtZTogdm9pZCAwLFxuICAgICAgICB0YWJsZU5hbWUsXG4gICAgICAgIHNjaGVkdWxlQXRDb2wsXG4gICAgICAgIGZ1bmN0aW9uTmFtZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xudmFyIFNjaGVtYSA9IGNsYXNzIHtcbiAgI2N0eDtcbiAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgdGhpcy4jY3R4ID0gY3R4O1xuICB9XG4gIFttb2R1bGVIb29rc10oZXhwb3J0cykge1xuICAgIGNvbnN0IHJlZ2lzdGVyZWRTY2hlbWEgPSB0aGlzLiNjdHg7XG4gICAgZm9yIChjb25zdCBbbmFtZSwgbW9kdWxlRXhwb3J0XSBvZiBPYmplY3QuZW50cmllcyhleHBvcnRzKSkge1xuICAgICAgaWYgKG5hbWUgPT09IFwiZGVmYXVsdFwiKSBjb250aW51ZTtcbiAgICAgIGlmICghaXNNb2R1bGVFeHBvcnQobW9kdWxlRXhwb3J0KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiZXhwb3J0aW5nIHNvbWV0aGluZyB0aGF0IGlzIG5vdCBhIHNwYWNldGltZSBleHBvcnRcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2hlY2tFeHBvcnRDb250ZXh0KG1vZHVsZUV4cG9ydCwgcmVnaXN0ZXJlZFNjaGVtYSk7XG4gICAgICBtb2R1bGVFeHBvcnRbcmVnaXN0ZXJFeHBvcnRdKHJlZ2lzdGVyZWRTY2hlbWEsIG5hbWUpO1xuICAgIH1cbiAgICByZWdpc3RlcmVkU2NoZW1hLnJlc29sdmVTY2hlZHVsZXMoKTtcbiAgICByZXR1cm4gbWFrZUhvb2tzKHJlZ2lzdGVyZWRTY2hlbWEpO1xuICB9XG4gIGdldCBzY2hlbWFUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLiNjdHguc2NoZW1hVHlwZTtcbiAgfVxuICBnZXQgbW9kdWxlRGVmKCkge1xuICAgIHJldHVybiB0aGlzLiNjdHgubW9kdWxlRGVmO1xuICB9XG4gIGdldCB0eXBlc3BhY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2N0eC50eXBlc3BhY2U7XG4gIH1cbiAgcmVkdWNlciguLi5hcmdzKSB7XG4gICAgbGV0IG9wdHMsIHBhcmFtcyA9IHt9LCBmbjtcbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIFtmbl0gPSBhcmdzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjoge1xuICAgICAgICBsZXQgYXJnMTtcbiAgICAgICAgW2FyZzEsIGZuXSA9IGFyZ3M7XG4gICAgICAgIGlmICh0eXBlb2YgYXJnMS5uYW1lID09PSBcInN0cmluZ1wiKSBvcHRzID0gYXJnMTtcbiAgICAgICAgZWxzZSBwYXJhbXMgPSBhcmcxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgMzpcbiAgICAgICAgW29wdHMsIHBhcmFtcywgZm5dID0gYXJncztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBtYWtlUmVkdWNlckV4cG9ydCh0aGlzLiNjdHgsIG9wdHMsIHBhcmFtcywgZm4pO1xuICB9XG4gIGluaXQoLi4uYXJncykge1xuICAgIGxldCBvcHRzLCBmbjtcbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIFtmbl0gPSBhcmdzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgW29wdHMsIGZuXSA9IGFyZ3M7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gbWFrZVJlZHVjZXJFeHBvcnQodGhpcy4jY3R4LCBvcHRzLCB7fSwgZm4sIExpZmVjeWNsZS5Jbml0KTtcbiAgfVxuICBjbGllbnRDb25uZWN0ZWQoLi4uYXJncykge1xuICAgIGxldCBvcHRzLCBmbjtcbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIFtmbl0gPSBhcmdzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgW29wdHMsIGZuXSA9IGFyZ3M7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gbWFrZVJlZHVjZXJFeHBvcnQodGhpcy4jY3R4LCBvcHRzLCB7fSwgZm4sIExpZmVjeWNsZS5PbkNvbm5lY3QpO1xuICB9XG4gIGNsaWVudERpc2Nvbm5lY3RlZCguLi5hcmdzKSB7XG4gICAgbGV0IG9wdHMsIGZuO1xuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgW2ZuXSA9IGFyZ3M7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBbb3B0cywgZm5dID0gYXJncztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBtYWtlUmVkdWNlckV4cG9ydCh0aGlzLiNjdHgsIG9wdHMsIHt9LCBmbiwgTGlmZWN5Y2xlLk9uRGlzY29ubmVjdCk7XG4gIH1cbiAgdmlldyhvcHRzLCByZXQsIGZuKSB7XG4gICAgcmV0dXJuIG1ha2VWaWV3RXhwb3J0KHRoaXMuI2N0eCwgb3B0cywge30sIHJldCwgZm4pO1xuICB9XG4gIC8vIFRPRE86IHJlLWVuYWJsZSBvbmNlIHBhcmFtZXRlcml6ZWQgdmlld3MgYXJlIHN1cHBvcnRlZCBpbiBTUUxcbiAgLy8gdmlldzxSZXQgZXh0ZW5kcyBWaWV3UmV0dXJuVHlwZUJ1aWxkZXI+KFxuICAvLyAgIG9wdHM6IFZpZXdPcHRzLFxuICAvLyAgIHJldDogUmV0LFxuICAvLyAgIGZuOiBWaWV3Rm48Uywge30sIFJldD5cbiAgLy8gKTogdm9pZDtcbiAgLy8gdmlldzxQYXJhbXMgZXh0ZW5kcyBQYXJhbXNPYmosIFJldCBleHRlbmRzIFZpZXdSZXR1cm5UeXBlQnVpbGRlcj4oXG4gIC8vICAgb3B0czogVmlld09wdHMsXG4gIC8vICAgcGFyYW1zOiBQYXJhbXMsXG4gIC8vICAgcmV0OiBSZXQsXG4gIC8vICAgZm46IFZpZXdGbjxTLCB7fSwgUmV0PlxuICAvLyApOiB2b2lkO1xuICAvLyB2aWV3PFBhcmFtcyBleHRlbmRzIFBhcmFtc09iaiwgUmV0IGV4dGVuZHMgVmlld1JldHVyblR5cGVCdWlsZGVyPihcbiAgLy8gICBvcHRzOiBWaWV3T3B0cyxcbiAgLy8gICBwYXJhbXNPclJldDogUmV0IHwgUGFyYW1zLFxuICAvLyAgIHJldE9yRm46IFZpZXdGbjxTLCB7fSwgUmV0PiB8IFJldCxcbiAgLy8gICBtYXliZUZuPzogVmlld0ZuPFMsIFBhcmFtcywgUmV0PlxuICAvLyApOiB2b2lkIHtcbiAgLy8gICBpZiAodHlwZW9mIHJldE9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gICAgIGRlZmluZVZpZXcobmFtZSwgZmFsc2UsIHt9LCBwYXJhbXNPclJldCBhcyBSZXQsIHJldE9yRm4pO1xuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICBkZWZpbmVWaWV3KG5hbWUsIGZhbHNlLCBwYXJhbXNPclJldCBhcyBQYXJhbXMsIHJldE9yRm4sIG1heWJlRm4hKTtcbiAgLy8gICB9XG4gIC8vIH1cbiAgYW5vbnltb3VzVmlldyhvcHRzLCByZXQsIGZuKSB7XG4gICAgcmV0dXJuIG1ha2VBbm9uVmlld0V4cG9ydCh0aGlzLiNjdHgsIG9wdHMsIHt9LCByZXQsIGZuKTtcbiAgfVxuICBwcm9jZWR1cmUoLi4uYXJncykge1xuICAgIGxldCBvcHRzLCBwYXJhbXMgPSB7fSwgcmV0LCBmbjtcbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIFtyZXQsIGZuXSA9IGFyZ3M7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOiB7XG4gICAgICAgIGxldCBhcmcxO1xuICAgICAgICBbYXJnMSwgcmV0LCBmbl0gPSBhcmdzO1xuICAgICAgICBpZiAodHlwZW9mIGFyZzEubmFtZSA9PT0gXCJzdHJpbmdcIikgb3B0cyA9IGFyZzE7XG4gICAgICAgIGVsc2UgcGFyYW1zID0gYXJnMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIFtvcHRzLCBwYXJhbXMsIHJldCwgZm5dID0gYXJncztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBtYWtlUHJvY2VkdXJlRXhwb3J0KHRoaXMuI2N0eCwgb3B0cywgcGFyYW1zLCByZXQsIGZuKTtcbiAgfVxuICAvKipcbiAgICogQnVuZGxlIG11bHRpcGxlIHJlZHVjZXJzLCBwcm9jZWR1cmVzLCBldGMgaW50byBvbmUgdmFsdWUgdG8gZXhwb3J0LlxuICAgKiBUaGUgbmFtZSB0aGV5IHdpbGwgYmUgZXhwb3J0ZWQgd2l0aCBpcyB0aGVpciBjb3JyZXNwb25kaW5nIGtleSBpbiB0aGUgYGV4cG9ydHNgIGFyZ3VtZW50LlxuICAgKi9cbiAgZXhwb3J0R3JvdXAoZXhwb3J0cykge1xuICAgIHJldHVybiB7XG4gICAgICBbZXhwb3J0Q29udGV4dF06IHRoaXMuI2N0eCxcbiAgICAgIFtyZWdpc3RlckV4cG9ydF0oY3R4LCBfZXhwb3J0TmFtZSkge1xuICAgICAgICBmb3IgKGNvbnN0IFtleHBvcnROYW1lLCBtb2R1bGVFeHBvcnRdIG9mIE9iamVjdC5lbnRyaWVzKGV4cG9ydHMpKSB7XG4gICAgICAgICAgY2hlY2tFeHBvcnRDb250ZXh0KG1vZHVsZUV4cG9ydCwgY3R4KTtcbiAgICAgICAgICBtb2R1bGVFeHBvcnRbcmVnaXN0ZXJFeHBvcnRdKGN0eCwgZXhwb3J0TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGNsaWVudFZpc2liaWxpdHlGaWx0ZXIgPSB7XG4gICAgc3FsOiAoZmlsdGVyKSA9PiAoe1xuICAgICAgW2V4cG9ydENvbnRleHRdOiB0aGlzLiNjdHgsXG4gICAgICBbcmVnaXN0ZXJFeHBvcnRdKGN0eCwgX2V4cG9ydE5hbWUpIHtcbiAgICAgICAgY3R4Lm1vZHVsZURlZi5yb3dMZXZlbFNlY3VyaXR5LnB1c2goeyBzcWw6IGZpbHRlciB9KTtcbiAgICAgIH1cbiAgICB9KVxuICB9O1xufTtcbnZhciByZWdpc3RlckV4cG9ydCA9IFN5bWJvbChcIlNwYWNldGltZURCLnJlZ2lzdGVyRXhwb3J0XCIpO1xudmFyIGV4cG9ydENvbnRleHQgPSBTeW1ib2woXCJTcGFjZXRpbWVEQi5leHBvcnRDb250ZXh0XCIpO1xuZnVuY3Rpb24gaXNNb2R1bGVFeHBvcnQoeCkge1xuICByZXR1cm4gKHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHggPT09IFwib2JqZWN0XCIpICYmIHggIT09IG51bGwgJiYgcmVnaXN0ZXJFeHBvcnQgaW4geDtcbn1cbmZ1bmN0aW9uIGNoZWNrRXhwb3J0Q29udGV4dChleHAsIHNjaGVtYTIpIHtcbiAgaWYgKGV4cFtleHBvcnRDb250ZXh0XSAhPSBudWxsICYmIGV4cFtleHBvcnRDb250ZXh0XSAhPT0gc2NoZW1hMikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJtdWx0aXBsZSBzY2hlbWFzIGFyZSBub3Qgc3VwcG9ydGVkXCIpO1xuICB9XG59XG5mdW5jdGlvbiBzY2hlbWEodGFibGVzLCBtb2R1bGVTZXR0aW5ncykge1xuICBjb25zdCBjdHggPSBuZXcgU2NoZW1hSW5uZXIoKGN0eDIpID0+IHtcbiAgICBpZiAobW9kdWxlU2V0dGluZ3M/LkNBU0VfQ09OVkVSU0lPTl9QT0xJQ1kgIT0gbnVsbCkge1xuICAgICAgY3R4Mi5zZXRDYXNlQ29udmVyc2lvblBvbGljeShtb2R1bGVTZXR0aW5ncy5DQVNFX0NPTlZFUlNJT05fUE9MSUNZKTtcbiAgICB9XG4gICAgY29uc3QgdGFibGVTY2hlbWFzID0ge307XG4gICAgZm9yIChjb25zdCBbYWNjTmFtZSwgdGFibGUyXSBvZiBPYmplY3QuZW50cmllcyh0YWJsZXMpKSB7XG4gICAgICBjb25zdCB0YWJsZURlZiA9IHRhYmxlMi50YWJsZURlZihjdHgyLCBhY2NOYW1lKTtcbiAgICAgIHRhYmxlU2NoZW1hc1thY2NOYW1lXSA9IHRhYmxlVG9TY2hlbWEoYWNjTmFtZSwgdGFibGUyLCB0YWJsZURlZik7XG4gICAgICBjdHgyLm1vZHVsZURlZi50YWJsZXMucHVzaCh0YWJsZURlZik7XG4gICAgICBpZiAodGFibGUyLnNjaGVkdWxlKSB7XG4gICAgICAgIGN0eDIucGVuZGluZ1NjaGVkdWxlcy5wdXNoKHtcbiAgICAgICAgICAuLi50YWJsZTIuc2NoZWR1bGUsXG4gICAgICAgICAgdGFibGVOYW1lOiB0YWJsZURlZi5zb3VyY2VOYW1lXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHRhYmxlMi50YWJsZU5hbWUpIHtcbiAgICAgICAgY3R4Mi5tb2R1bGVEZWYuZXhwbGljaXROYW1lcy5lbnRyaWVzLnB1c2goe1xuICAgICAgICAgIHRhZzogXCJUYWJsZVwiLFxuICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICBzb3VyY2VOYW1lOiBhY2NOYW1lLFxuICAgICAgICAgICAgY2Fub25pY2FsTmFtZTogdGFibGUyLnRhYmxlTmFtZVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHRhYmxlczogdGFibGVTY2hlbWFzIH07XG4gIH0pO1xuICByZXR1cm4gbmV3IFNjaGVtYShjdHgpO1xufVxuXG4vLyBzcmMvc2VydmVyL2NvbnNvbGUudHNcbnZhciBpbXBvcnRfb2JqZWN0X2luc3BlY3QgPSBfX3RvRVNNKHJlcXVpcmVfb2JqZWN0X2luc3BlY3QoKSk7XG52YXIgZm10TG9nID0gKC4uLmRhdGEpID0+IGRhdGEubWFwKCh4KSA9PiB0eXBlb2YgeCA9PT0gXCJzdHJpbmdcIiA/IHggOiAoMCwgaW1wb3J0X29iamVjdF9pbnNwZWN0LmRlZmF1bHQpKHgpKS5qb2luKFwiIFwiKTtcbnZhciBjb25zb2xlX2xldmVsX2Vycm9yID0gMDtcbnZhciBjb25zb2xlX2xldmVsX3dhcm4gPSAxO1xudmFyIGNvbnNvbGVfbGV2ZWxfaW5mbyA9IDI7XG52YXIgY29uc29sZV9sZXZlbF9kZWJ1ZyA9IDM7XG52YXIgY29uc29sZV9sZXZlbF90cmFjZSA9IDQ7XG52YXIgdGltZXJNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xudmFyIGNvbnNvbGUyID0ge1xuICAvLyBAdHMtZXhwZWN0LWVycm9yIHdlIHdhbnQgYSBibGFuayBwcm90b3R5cGUsIGJ1dCB0eXBlc2NyaXB0IGNvbXBsYWluc1xuICBfX3Byb3RvX186IHt9LFxuICBbU3ltYm9sLnRvU3RyaW5nVGFnXTogXCJjb25zb2xlXCIsXG4gIGFzc2VydDogKGNvbmRpdGlvbiA9IGZhbHNlLCAuLi5kYXRhKSA9PiB7XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIHN5cy5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX2Vycm9yLCBmbXRMb2coLi4uZGF0YSkpO1xuICAgIH1cbiAgfSxcbiAgY2xlYXI6ICgpID0+IHtcbiAgfSxcbiAgZGVidWc6ICguLi5kYXRhKSA9PiB7XG4gICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfZGVidWcsIGZtdExvZyguLi5kYXRhKSk7XG4gIH0sXG4gIGVycm9yOiAoLi4uZGF0YSkgPT4ge1xuICAgIHN5cy5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX2Vycm9yLCBmbXRMb2coLi4uZGF0YSkpO1xuICB9LFxuICBpbmZvOiAoLi4uZGF0YSkgPT4ge1xuICAgIHN5cy5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX2luZm8sIGZtdExvZyguLi5kYXRhKSk7XG4gIH0sXG4gIGxvZzogKC4uLmRhdGEpID0+IHtcbiAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF9pbmZvLCBmbXRMb2coLi4uZGF0YSkpO1xuICB9LFxuICB0YWJsZTogKHRhYnVsYXJEYXRhLCBfcHJvcGVydGllcykgPT4ge1xuICAgIHN5cy5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX2luZm8sIGZtdExvZyh0YWJ1bGFyRGF0YSkpO1xuICB9LFxuICB0cmFjZTogKC4uLmRhdGEpID0+IHtcbiAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF90cmFjZSwgZm10TG9nKC4uLmRhdGEpKTtcbiAgfSxcbiAgd2FybjogKC4uLmRhdGEpID0+IHtcbiAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF93YXJuLCBmbXRMb2coLi4uZGF0YSkpO1xuICB9LFxuICBkaXI6IChfaXRlbSwgX29wdGlvbnMpID0+IHtcbiAgfSxcbiAgZGlyeG1sOiAoLi4uX2RhdGEpID0+IHtcbiAgfSxcbiAgLy8gQ291bnRpbmdcbiAgY291bnQ6IChfbGFiZWwgPSBcImRlZmF1bHRcIikgPT4ge1xuICB9LFxuICBjb3VudFJlc2V0OiAoX2xhYmVsID0gXCJkZWZhdWx0XCIpID0+IHtcbiAgfSxcbiAgLy8gR3JvdXBpbmdcbiAgZ3JvdXA6ICguLi5fZGF0YSkgPT4ge1xuICB9LFxuICBncm91cENvbGxhcHNlZDogKC4uLl9kYXRhKSA9PiB7XG4gIH0sXG4gIGdyb3VwRW5kOiAoKSA9PiB7XG4gIH0sXG4gIC8vIFRpbWluZ1xuICB0aW1lOiAobGFiZWwgPSBcImRlZmF1bHRcIikgPT4ge1xuICAgIGlmICh0aW1lck1hcC5oYXMobGFiZWwpKSB7XG4gICAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF93YXJuLCBgVGltZXIgJyR7bGFiZWx9JyBhbHJlYWR5IGV4aXN0cy5gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGltZXJNYXAuc2V0KGxhYmVsLCBzeXMuY29uc29sZV90aW1lcl9zdGFydChsYWJlbCkpO1xuICB9LFxuICB0aW1lTG9nOiAobGFiZWwgPSBcImRlZmF1bHRcIiwgLi4uZGF0YSkgPT4ge1xuICAgIHN5cy5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX2luZm8sIGZtdExvZyhsYWJlbCwgLi4uZGF0YSkpO1xuICB9LFxuICB0aW1lRW5kOiAobGFiZWwgPSBcImRlZmF1bHRcIikgPT4ge1xuICAgIGNvbnN0IHNwYW5JZCA9IHRpbWVyTWFwLmdldChsYWJlbCk7XG4gICAgaWYgKHNwYW5JZCA9PT0gdm9pZCAwKSB7XG4gICAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF93YXJuLCBgVGltZXIgJyR7bGFiZWx9JyBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3lzLmNvbnNvbGVfdGltZXJfZW5kKHNwYW5JZCk7XG4gICAgdGltZXJNYXAuZGVsZXRlKGxhYmVsKTtcbiAgfSxcbiAgLy8gQWRkaXRpb25hbCBjb25zb2xlIG1ldGhvZHMgdG8gc2F0aXNmeSB0aGUgQ29uc29sZSBpbnRlcmZhY2VcbiAgdGltZVN0YW1wOiAoKSA9PiB7XG4gIH0sXG4gIHByb2ZpbGU6ICgpID0+IHtcbiAgfSxcbiAgcHJvZmlsZUVuZDogKCkgPT4ge1xuICB9XG59O1xuXG4vLyBzcmMvc2VydmVyL3BvbHlmaWxscy50c1xuZ2xvYmFsVGhpcy5jb25zb2xlID0gY29uc29sZTI7XG4vKiEgQnVuZGxlZCBsaWNlbnNlIGluZm9ybWF0aW9uOlxuXG5zdGF0dXNlcy9pbmRleC5qczpcbiAgKCohXG4gICAqIHN0YXR1c2VzXG4gICAqIENvcHlyaWdodChjKSAyMDE0IEpvbmF0aGFuIE9uZ1xuICAgKiBDb3B5cmlnaHQoYykgMjAxNiBEb3VnbGFzIENocmlzdG9waGVyIFdpbHNvblxuICAgKiBNSVQgTGljZW5zZWRcbiAgICopXG4qL1xuXG5leHBvcnQgeyBBcnJheUJ1aWxkZXIsIEFycmF5Q29sdW1uQnVpbGRlciwgQm9vbEJ1aWxkZXIsIEJvb2xDb2x1bW5CdWlsZGVyLCBCb29sZWFuRXhwciwgQnl0ZUFycmF5QnVpbGRlciwgQnl0ZUFycmF5Q29sdW1uQnVpbGRlciwgQ2FzZUNvbnZlcnNpb25Qb2xpY3ksIENvbHVtbkJ1aWxkZXIsIENvbHVtbkV4cHJlc3Npb24sIENvbm5lY3Rpb25JZEJ1aWxkZXIsIENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIsIEYzMkJ1aWxkZXIsIEYzMkNvbHVtbkJ1aWxkZXIsIEY2NEJ1aWxkZXIsIEY2NENvbHVtbkJ1aWxkZXIsIEkxMjhCdWlsZGVyLCBJMTI4Q29sdW1uQnVpbGRlciwgSTE2QnVpbGRlciwgSTE2Q29sdW1uQnVpbGRlciwgSTI1NkJ1aWxkZXIsIEkyNTZDb2x1bW5CdWlsZGVyLCBJMzJCdWlsZGVyLCBJMzJDb2x1bW5CdWlsZGVyLCBJNjRCdWlsZGVyLCBJNjRDb2x1bW5CdWlsZGVyLCBJOEJ1aWxkZXIsIEk4Q29sdW1uQnVpbGRlciwgSWRlbnRpdHlCdWlsZGVyLCBJZGVudGl0eUNvbHVtbkJ1aWxkZXIsIE9wdGlvbkJ1aWxkZXIsIE9wdGlvbkNvbHVtbkJ1aWxkZXIsIFByb2R1Y3RCdWlsZGVyLCBQcm9kdWN0Q29sdW1uQnVpbGRlciwgUmFuZ2UsIFJlZkJ1aWxkZXIsIFJlc3VsdEJ1aWxkZXIsIFJlc3VsdENvbHVtbkJ1aWxkZXIsIFJvd0J1aWxkZXIsIFNjaGVkdWxlQXRCdWlsZGVyLCBTY2hlZHVsZUF0Q29sdW1uQnVpbGRlciwgU2VuZGVyRXJyb3IsIFNpbXBsZVN1bUJ1aWxkZXIsIFNpbXBsZVN1bUNvbHVtbkJ1aWxkZXIsIFNwYWNldGltZUhvc3RFcnJvciwgU3RyaW5nQnVpbGRlciwgU3RyaW5nQ29sdW1uQnVpbGRlciwgU3VtQnVpbGRlciwgU3VtQ29sdW1uQnVpbGRlciwgVGltZUR1cmF0aW9uQnVpbGRlciwgVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlciwgVGltZXN0YW1wQnVpbGRlciwgVGltZXN0YW1wQ29sdW1uQnVpbGRlciwgVHlwZUJ1aWxkZXIsIFUxMjhCdWlsZGVyLCBVMTI4Q29sdW1uQnVpbGRlciwgVTE2QnVpbGRlciwgVTE2Q29sdW1uQnVpbGRlciwgVTI1NkJ1aWxkZXIsIFUyNTZDb2x1bW5CdWlsZGVyLCBVMzJCdWlsZGVyLCBVMzJDb2x1bW5CdWlsZGVyLCBVNjRCdWlsZGVyLCBVNjRDb2x1bW5CdWlsZGVyLCBVOEJ1aWxkZXIsIFU4Q29sdW1uQnVpbGRlciwgVXVpZEJ1aWxkZXIsIFV1aWRDb2x1bW5CdWlsZGVyLCBhbmQsIGNyZWF0ZVRhYmxlUmVmRnJvbURlZiwgZXJyb3JzLCBldmFsdWF0ZUJvb2xlYW5FeHByLCBnZXRRdWVyeUFjY2Vzc29yTmFtZSwgZ2V0UXVlcnlUYWJsZU5hbWUsIGdldFF1ZXJ5V2hlcmVDbGF1c2UsIGlzUm93VHlwZWRRdWVyeSwgaXNUeXBlZFF1ZXJ5LCBsaXRlcmFsLCBtYWtlUXVlcnlCdWlsZGVyLCBub3QsIG9yLCBzY2hlbWEsIHQsIHRhYmxlLCB0b0NhbWVsQ2FzZSwgdG9Db21wYXJhYmxlVmFsdWUsIHRvU3FsIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwIiwiaW1wb3J0IHsgdGFibGUsIHQgfSBmcm9tICdzcGFjZXRpbWVkYi9zZXJ2ZXInO1xuXG5leHBvcnQgY29uc3QgVXNlckFjY291bnQgPSB0YWJsZShcbiAgeyBuYW1lOiAndXNlcl9hY2NvdW50JyB9LFxuICB7XG4gICAgaWQ6IHQudTY0KCkucHJpbWFyeUtleSgpLmF1dG9JbmMoKSxcbiAgICBlbWFpbDogdC5zdHJpbmcoKS51bmlxdWUoKSxcbiAgICBmdWxsTmFtZTogdC5zdHJpbmcoKSxcbiAgICBjb3VudHJ5OiB0LnN0cmluZygpLFxuICAgIHBhc3N3b3JkSGFzaDogdC5zdHJpbmcoKSxcbiAgICBlbWFpbFZlcmlmaWVkQXQ6IHQudGltZXN0YW1wKCkub3B0aW9uYWwoKSxcbiAgICBjcmVhdGVkQXQ6IHQudGltZXN0YW1wKCksXG4gICAgdXBkYXRlZEF0OiB0LnRpbWVzdGFtcCgpLFxuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgU2Vzc2lvbiA9IHRhYmxlKFxuICB7IG5hbWU6ICdzZXNzaW9uJyB9LFxuICB7XG4gICAgaWQ6IHQudTY0KCkucHJpbWFyeUtleSgpLmF1dG9JbmMoKSxcbiAgICB1c2VySWQ6IHQudTY0KCkuaW5kZXgoJ2J0cmVlJyksXG4gICAgdG9rZW5IYXNoOiB0LnN0cmluZygpLnVuaXF1ZSgpLFxuICAgIGV4cGlyZXNBdDogdC50aW1lc3RhbXAoKSxcbiAgICByZXZva2VkQXQ6IHQudGltZXN0YW1wKCkub3B0aW9uYWwoKSxcbiAgICBjcmVhdGVkQXQ6IHQudGltZXN0YW1wKCksXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBFbWFpbFZlcmlmaWNhdGlvblRva2VuID0gdGFibGUoXG4gIHsgbmFtZTogJ2VtYWlsX3ZlcmlmaWNhdGlvbl90b2tlbicgfSxcbiAge1xuICAgIGlkOiB0LnU2NCgpLnByaW1hcnlLZXkoKS5hdXRvSW5jKCksXG4gICAgdXNlcklkOiB0LnU2NCgpLmluZGV4KCdidHJlZScpLFxuICAgIGVtYWlsOiB0LnN0cmluZygpLFxuICAgIHRva2VuSGFzaDogdC5zdHJpbmcoKS51bmlxdWUoKSxcbiAgICBleHBpcmVzQXQ6IHQudGltZXN0YW1wKCksXG4gICAgY29uc3VtZWRBdDogdC50aW1lc3RhbXAoKS5vcHRpb25hbCgpLFxuICAgIGNyZWF0ZWRBdDogdC50aW1lc3RhbXAoKSxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IEF1dGhBdWRpdEV2ZW50ID0gdGFibGUoXG4gIHtcbiAgICBuYW1lOiAnYXV0aF9hdWRpdF9ldmVudCcsXG4gICAgaW5kZXhlczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnYXV0aF9hdWRpdF9ldmVudF91c2VyX2lkJyxcbiAgICAgICAgYWNjZXNzb3I6ICdhdXRoX2F1ZGl0X2V2ZW50X3VzZXJfaWQnLFxuICAgICAgICBhbGdvcml0aG06ICdidHJlZScsXG4gICAgICAgIGNvbHVtbnM6IFsndXNlcklkJ10sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBpZDogdC51NjQoKS5wcmltYXJ5S2V5KCkuYXV0b0luYygpLFxuICAgIHVzZXJJZDogdC51NjQoKS5vcHRpb25hbCgpLFxuICAgIGV2ZW50VHlwZTogdC5zdHJpbmcoKSxcbiAgICBldmVudERldGFpbHNKc29uOiB0LnN0cmluZygpLFxuICAgIGNyZWF0ZWRBdDogdC50aW1lc3RhbXAoKSxcbiAgfVxuKTtcbiIsImltcG9ydCB7IHRhYmxlLCB0IH0gZnJvbSAnc3BhY2V0aW1lZGIvc2VydmVyJztcblxuZXhwb3J0IGNvbnN0IExvY2F0aW9uID0gdGFibGUoXG4gIHtcbiAgICBuYW1lOiAnbG9jYXRpb24nLFxuICAgIGluZGV4ZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2xvY2F0aW9uX3RyaXBfaWQnLFxuICAgICAgICBhY2Nlc3NvcjogJ2xvY2F0aW9uX3RyaXBfaWQnLFxuICAgICAgICBhbGdvcml0aG06ICdidHJlZScsXG4gICAgICAgIGNvbHVtbnM6IFsndHJpcElkJ10sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnbG9jYXRpb25fc2NoZWR1bGVkX2RhdGUnLFxuICAgICAgICBhY2Nlc3NvcjogJ2xvY2F0aW9uX3NjaGVkdWxlZF9kYXRlJyxcbiAgICAgICAgYWxnb3JpdGhtOiAnYnRyZWUnLFxuICAgICAgICBjb2x1bW5zOiBbJ3NjaGVkdWxlZERhdGUnXSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIGlkOiB0LnU2NCgpLnByaW1hcnlLZXkoKS5hdXRvSW5jKCksXG4gICAgdHJpcElkOiB0LnU2NCgpLFxuICAgIGxvY2F0aW9uVGl0bGU6IHQuc3RyaW5nKCksXG4gICAgbGF0OiB0LmY2NCgpLFxuICAgIGxuZzogdC5mNjQoKSxcbiAgICBzY2hlZHVsZWREYXRlOiB0LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgb3JkZXI6IHQuaTMyKCksXG4gICAgcGxhY2VJZDogdC5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICAgIHBsYWNlVHlwZXNKc29uOiB0LnN0cmluZygpLFxuICAgIHBsYWNlQ2F0ZWdvcnk6IHQuc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgICBhcHByZWNpYXRpb246IHQuaTMyKCkub3B0aW9uYWwoKSxcbiAgICBwcmljZVNlbnRpbWVudDogdC5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICAgIG5vdGVzOiB0LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgY3JlYXRlZEF0OiB0LnRpbWVzdGFtcCgpLFxuICB9XG4pO1xuIiwiaW1wb3J0IHsgdGFibGUsIHQgfSBmcm9tICdzcGFjZXRpbWVkYi9zZXJ2ZXInO1xuXG5leHBvcnQgY29uc3QgVHJpcCA9IHRhYmxlKFxuICB7IG5hbWU6ICd0cmlwJyB9LFxuICB7XG4gICAgaWQ6IHQudTY0KCkucHJpbWFyeUtleSgpLmF1dG9JbmMoKSxcbiAgICB1c2VySWQ6IHQudTY0KCkuaW5kZXgoJ2J0cmVlJyksXG4gICAgdGl0bGU6IHQuc3RyaW5nKCksXG4gICAgZGVzY3JpcHRpb246IHQuc3RyaW5nKCksXG4gICAgY292ZXJJbWFnZVVybDogdC5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICAgIGltYWdlc0pzb246IHQuc3RyaW5nKCksXG4gICAgc3RhcnREYXRlOiB0LnRpbWVzdGFtcCgpLFxuICAgIGVuZERhdGU6IHQudGltZXN0YW1wKCksXG4gICAgY3JlYXRlZEF0OiB0LnRpbWVzdGFtcCgpLFxuICAgIHVwZGF0ZWRBdDogdC50aW1lc3RhbXAoKSxcbiAgfVxuKTtcbiIsImltcG9ydCB7IHNjaGVtYSB9IGZyb20gJ3NwYWNldGltZWRiL3NlcnZlcic7XG5pbXBvcnQge1xuICBBdXRoQXVkaXRFdmVudCxcbiAgRW1haWxWZXJpZmljYXRpb25Ub2tlbixcbiAgU2Vzc2lvbixcbiAgVXNlckFjY291bnQsXG59IGZyb20gJy4vYXV0aCc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJy4vbG9jYXRpb25zJztcbmltcG9ydCB7IFRyaXAgfSBmcm9tICcuL3RyaXBzJztcblxuY29uc3Qgc3BhY2V0aW1lZGIgPSBzY2hlbWEoe1xuICB1c2VyQWNjb3VudDogVXNlckFjY291bnQsXG4gIHNlc3Npb246IFNlc3Npb24sXG4gIGVtYWlsVmVyaWZpY2F0aW9uVG9rZW46IEVtYWlsVmVyaWZpY2F0aW9uVG9rZW4sXG4gIHRyaXA6IFRyaXAsXG4gIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgYXV0aEF1ZGl0RXZlbnQ6IEF1dGhBdWRpdEV2ZW50LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHNwYWNldGltZWRiO1xuIiwiaW1wb3J0IHNwYWNldGltZWRiIGZyb20gJy4uLy4uL3NjaGVtYSc7XG5cbmV4cG9ydCBjb25zdCBpbml0ID0gc3BhY2V0aW1lZGIucmVkdWNlcigoY3R4KSA9PiB7XG4gIHZvaWQgY3R4O1xufSk7XG4iLCJpbXBvcnQgeyBUaW1lc3RhbXAgfSBmcm9tICdzcGFjZXRpbWVkYic7XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFbWFpbCA9IChlbWFpbDogc3RyaW5nKSA9PiBlbWFpbC50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuZXhwb3J0IGNvbnN0IGlzRXhwaXJlZCA9ICh2YWx1ZTogVGltZXN0YW1wLCBub3c6IFRpbWVzdGFtcCkgPT5cbiAgdmFsdWUubWljcm9zU2luY2VVbml4RXBvY2ggPD0gbm93Lm1pY3Jvc1NpbmNlVW5peEVwb2NoO1xuXG5leHBvcnQgY29uc3QgY29tcGFyZU1heWJlU3RyaW5ncyA9IChsZWZ0Pzogc3RyaW5nLCByaWdodD86IHN0cmluZykgPT4ge1xuICBpZiAobGVmdCAmJiByaWdodCkgcmV0dXJuIGxlZnQubG9jYWxlQ29tcGFyZShyaWdodCk7XG4gIGlmIChsZWZ0KSByZXR1cm4gLTE7XG4gIGlmIChyaWdodCkgcmV0dXJuIDE7XG4gIHJldHVybiAwO1xufTtcblxuZXhwb3J0IGNvbnN0IHNvcnRUcmlwcyA9IDxUIGV4dGVuZHMgeyBzdGFydERhdGU6IFRpbWVzdGFtcCB9Pih0cmlwczogVFtdKSA9PlxuICB0cmlwcy5zb3J0KChsZWZ0LCByaWdodCkgPT4ge1xuICAgIGNvbnN0IGRpZmYgPVxuICAgICAgcmlnaHQuc3RhcnREYXRlLm1pY3Jvc1NpbmNlVW5peEVwb2NoIC1cbiAgICAgIGxlZnQuc3RhcnREYXRlLm1pY3Jvc1NpbmNlVW5peEVwb2NoO1xuICAgIGlmIChkaWZmID4gMG4pIHJldHVybiAxO1xuICAgIGlmIChkaWZmIDwgMG4pIHJldHVybiAtMTtcbiAgICByZXR1cm4gMDtcbiAgfSk7XG5cbmV4cG9ydCBjb25zdCBzb3J0TG9jYXRpb25zID0gPFxuICBUIGV4dGVuZHMgeyBzY2hlZHVsZWREYXRlPzogc3RyaW5nOyBvcmRlcjogbnVtYmVyOyBsb2NhdGlvblRpdGxlOiBzdHJpbmcgfSxcbj4oXG4gIGxvY2F0aW9uczogVFtdXG4pID0+XG4gIGxvY2F0aW9ucy5zb3J0KChsZWZ0LCByaWdodCkgPT4ge1xuICAgIGNvbnN0IGRhdGVDb21wYXJpc29uID0gY29tcGFyZU1heWJlU3RyaW5ncyhcbiAgICAgIGxlZnQuc2NoZWR1bGVkRGF0ZSxcbiAgICAgIHJpZ2h0LnNjaGVkdWxlZERhdGVcbiAgICApO1xuICAgIGlmIChkYXRlQ29tcGFyaXNvbiAhPT0gMCkgcmV0dXJuIGRhdGVDb21wYXJpc29uO1xuICAgIGlmIChsZWZ0Lm9yZGVyICE9PSByaWdodC5vcmRlcikgcmV0dXJuIGxlZnQub3JkZXIgLSByaWdodC5vcmRlcjtcbiAgICByZXR1cm4gbGVmdC5sb2NhdGlvblRpdGxlLmxvY2FsZUNvbXBhcmUocmlnaHQubG9jYXRpb25UaXRsZSk7XG4gIH0pO1xuIiwiaW1wb3J0IHsgdCB9IGZyb20gJ3NwYWNldGltZWRiL3NlcnZlcic7XG5pbXBvcnQgc3BhY2V0aW1lZGIgZnJvbSAnLi4vLi4vc2NoZW1hJztcbmltcG9ydCB7IG5vcm1hbGl6ZUVtYWlsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZV91c2VyX2FjY291bnQgPSBzcGFjZXRpbWVkYi5yZWR1Y2VyKFxuICB7XG4gICAgZW1haWw6IHQuc3RyaW5nKCksXG4gICAgZnVsbE5hbWU6IHQuc3RyaW5nKCksXG4gICAgY291bnRyeTogdC5zdHJpbmcoKSxcbiAgICBwYXNzd29yZEhhc2g6IHQuc3RyaW5nKCksXG4gICAgdmVyaWZpY2F0aW9uVG9rZW5IYXNoOiB0LnN0cmluZygpLFxuICAgIHZlcmlmaWNhdGlvbkV4cGlyZXNBdDogdC50aW1lc3RhbXAoKSxcbiAgfSxcbiAgKFxuICAgIGN0eCxcbiAgICB7XG4gICAgICBlbWFpbCxcbiAgICAgIGZ1bGxOYW1lLFxuICAgICAgY291bnRyeSxcbiAgICAgIHBhc3N3b3JkSGFzaCxcbiAgICAgIHZlcmlmaWNhdGlvblRva2VuSGFzaCxcbiAgICAgIHZlcmlmaWNhdGlvbkV4cGlyZXNBdCxcbiAgICB9XG4gICkgPT4ge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRFbWFpbCA9IG5vcm1hbGl6ZUVtYWlsKGVtYWlsKTtcbiAgICBjb25zdCB0cmltbWVkTmFtZSA9IGZ1bGxOYW1lLnRyaW0oKTtcbiAgICBjb25zdCB0cmltbWVkQ291bnRyeSA9IGNvdW50cnkudHJpbSgpO1xuXG4gICAgaWYgKCFub3JtYWxpemVkRW1haWwgfHwgIXRyaW1tZWROYW1lIHx8ICF0cmltbWVkQ291bnRyeSB8fCAhcGFzc3dvcmRIYXNoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcmVxdWlyZWQgdXNlciBmaWVsZHMnKTtcbiAgICB9XG5cbiAgICBpZiAoY3R4LmRiLnVzZXJBY2NvdW50LmVtYWlsLmZpbmQobm9ybWFsaXplZEVtYWlsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIHVzZXIgd2l0aCB0aGlzIGVtYWlsIGFscmVhZHkgZXhpc3RzJyk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlciA9IGN0eC5kYi51c2VyQWNjb3VudC5pbnNlcnQoe1xuICAgICAgaWQ6IDBuLFxuICAgICAgZW1haWw6IG5vcm1hbGl6ZWRFbWFpbCxcbiAgICAgIGZ1bGxOYW1lOiB0cmltbWVkTmFtZSxcbiAgICAgIGNvdW50cnk6IHRyaW1tZWRDb3VudHJ5LFxuICAgICAgcGFzc3dvcmRIYXNoLFxuICAgICAgZW1haWxWZXJpZmllZEF0OiB1bmRlZmluZWQsXG4gICAgICBjcmVhdGVkQXQ6IGN0eC50aW1lc3RhbXAsXG4gICAgICB1cGRhdGVkQXQ6IGN0eC50aW1lc3RhbXAsXG4gICAgfSk7XG5cbiAgICBjdHguZGIuZW1haWxWZXJpZmljYXRpb25Ub2tlbi5pbnNlcnQoe1xuICAgICAgaWQ6IDBuLFxuICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgZW1haWw6IG5vcm1hbGl6ZWRFbWFpbCxcbiAgICAgIHRva2VuSGFzaDogdmVyaWZpY2F0aW9uVG9rZW5IYXNoLFxuICAgICAgZXhwaXJlc0F0OiB2ZXJpZmljYXRpb25FeHBpcmVzQXQsXG4gICAgICBjb25zdW1lZEF0OiB1bmRlZmluZWQsXG4gICAgICBjcmVhdGVkQXQ6IGN0eC50aW1lc3RhbXAsXG4gICAgfSk7XG5cbiAgICBjdHguZGIuYXV0aEF1ZGl0RXZlbnQuaW5zZXJ0KHtcbiAgICAgIGlkOiAwbixcbiAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgIGV2ZW50VHlwZTogJ3VzZXJfcmVnaXN0ZXJlZCcsXG4gICAgICBldmVudERldGFpbHNKc29uOiBKU09OLnN0cmluZ2lmeSh7IGVtYWlsOiBub3JtYWxpemVkRW1haWwgfSksXG4gICAgICBjcmVhdGVkQXQ6IGN0eC50aW1lc3RhbXAsXG4gICAgfSk7XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVfc2Vzc2lvbiA9IHNwYWNldGltZWRiLnJlZHVjZXIoXG4gIHtcbiAgICB1c2VySWQ6IHQudTY0KCksXG4gICAgdG9rZW5IYXNoOiB0LnN0cmluZygpLFxuICAgIGV4cGlyZXNBdDogdC50aW1lc3RhbXAoKSxcbiAgfSxcbiAgKGN0eCwgeyB1c2VySWQsIHRva2VuSGFzaCwgZXhwaXJlc0F0IH0pID0+IHtcbiAgICBjb25zdCB1c2VyID0gY3R4LmRiLnVzZXJBY2NvdW50LmlkLmZpbmQodXNlcklkKTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVc2VyIG5vdCBmb3VuZCcpO1xuICAgIH1cblxuICAgIGlmIChjdHguZGIuc2Vzc2lvbi50b2tlbkhhc2guZmluZCh0b2tlbkhhc2gpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nlc3Npb24gdG9rZW4gYWxyZWFkeSBleGlzdHMnKTtcbiAgICB9XG5cbiAgICBjdHguZGIuc2Vzc2lvbi5pbnNlcnQoe1xuICAgICAgaWQ6IDBuLFxuICAgICAgdXNlcklkLFxuICAgICAgdG9rZW5IYXNoLFxuICAgICAgZXhwaXJlc0F0LFxuICAgICAgcmV2b2tlZEF0OiB1bmRlZmluZWQsXG4gICAgICBjcmVhdGVkQXQ6IGN0eC50aW1lc3RhbXAsXG4gICAgfSk7XG5cbiAgICBjdHguZGIuYXV0aEF1ZGl0RXZlbnQuaW5zZXJ0KHtcbiAgICAgIGlkOiAwbixcbiAgICAgIHVzZXJJZCxcbiAgICAgIGV2ZW50VHlwZTogJ3Nlc3Npb25fY3JlYXRlZCcsXG4gICAgICBldmVudERldGFpbHNKc29uOiBKU09OLnN0cmluZ2lmeSh7fSksXG4gICAgICBjcmVhdGVkQXQ6IGN0eC50aW1lc3RhbXAsXG4gICAgfSk7XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCByZXZva2Vfc2Vzc2lvbl9ieV90b2tlbl9oYXNoID0gc3BhY2V0aW1lZGIucmVkdWNlcihcbiAgeyB0b2tlbkhhc2g6IHQuc3RyaW5nKCkgfSxcbiAgKGN0eCwgeyB0b2tlbkhhc2ggfSkgPT4ge1xuICAgIGNvbnN0IHNlc3Npb24gPSBjdHguZGIuc2Vzc2lvbi50b2tlbkhhc2guZmluZCh0b2tlbkhhc2gpO1xuXG4gICAgaWYgKCFzZXNzaW9uIHx8IHNlc3Npb24ucmV2b2tlZEF0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY3R4LmRiLnNlc3Npb24uaWQudXBkYXRlKHtcbiAgICAgIC4uLnNlc3Npb24sXG4gICAgICByZXZva2VkQXQ6IGN0eC50aW1lc3RhbXAsXG4gICAgfSk7XG5cbiAgICBjdHguZGIuYXV0aEF1ZGl0RXZlbnQuaW5zZXJ0KHtcbiAgICAgIGlkOiAwbixcbiAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VySWQsXG4gICAgICBldmVudFR5cGU6ICdzZXNzaW9uX3Jldm9rZWQnLFxuICAgICAgZXZlbnREZXRhaWxzSnNvbjogSlNPTi5zdHJpbmdpZnkoe30pLFxuICAgICAgY3JlYXRlZEF0OiBjdHgudGltZXN0YW1wLFxuICAgIH0pO1xuICB9XG4pO1xuIiwiaW1wb3J0IHsgVGltZXN0YW1wIH0gZnJvbSAnc3BhY2V0aW1lZGInO1xuXG5leHBvcnQgY29uc3QgdG9Vc2VyQXV0aFJlY29yZCA9ICh1c2VyOiB7XG4gIGlkOiBiaWdpbnQ7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIGZ1bGxOYW1lOiBzdHJpbmc7XG4gIGNvdW50cnk6IHN0cmluZztcbiAgcGFzc3dvcmRIYXNoOiBzdHJpbmc7XG4gIGVtYWlsVmVyaWZpZWRBdD86IFRpbWVzdGFtcDtcbiAgY3JlYXRlZEF0OiBUaW1lc3RhbXA7XG4gIHVwZGF0ZWRBdDogVGltZXN0YW1wO1xufSkgPT4gKHtcbiAgaWQ6IHVzZXIuaWQsXG4gIGVtYWlsOiB1c2VyLmVtYWlsLFxuICBmdWxsTmFtZTogdXNlci5mdWxsTmFtZSxcbiAgY291bnRyeTogdXNlci5jb3VudHJ5LFxuICBwYXNzd29yZEhhc2g6IHVzZXIucGFzc3dvcmRIYXNoLFxuICBlbWFpbFZlcmlmaWVkQXQ6IHVzZXIuZW1haWxWZXJpZmllZEF0LFxuICBjcmVhdGVkQXQ6IHVzZXIuY3JlYXRlZEF0LFxuICB1cGRhdGVkQXQ6IHVzZXIudXBkYXRlZEF0LFxufSk7XG5cbmV4cG9ydCBjb25zdCB0b1Nlc3Npb25Vc2VyUmVjb3JkID0gKHVzZXI6IHtcbiAgaWQ6IGJpZ2ludDtcbiAgZW1haWw6IHN0cmluZztcbiAgZnVsbE5hbWU6IHN0cmluZztcbiAgY291bnRyeTogc3RyaW5nO1xuICBlbWFpbFZlcmlmaWVkQXQ/OiBUaW1lc3RhbXA7XG4gIGNyZWF0ZWRBdDogVGltZXN0YW1wO1xuICB1cGRhdGVkQXQ6IFRpbWVzdGFtcDtcbn0pID0+ICh7XG4gIGlkOiB1c2VyLmlkLFxuICBlbWFpbDogdXNlci5lbWFpbCxcbiAgZnVsbE5hbWU6IHVzZXIuZnVsbE5hbWUsXG4gIGNvdW50cnk6IHVzZXIuY291bnRyeSxcbiAgZW1haWxWZXJpZmllZEF0OiB1c2VyLmVtYWlsVmVyaWZpZWRBdCxcbiAgY3JlYXRlZEF0OiB1c2VyLmNyZWF0ZWRBdCxcbiAgdXBkYXRlZEF0OiB1c2VyLnVwZGF0ZWRBdCxcbn0pO1xuXG5leHBvcnQgY29uc3QgdG9UcmlwUmVjb3JkID0gKHRyaXA6IHtcbiAgaWQ6IGJpZ2ludDtcbiAgdXNlcklkOiBiaWdpbnQ7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGNvdmVySW1hZ2VVcmw/OiBzdHJpbmc7XG4gIGltYWdlc0pzb246IHN0cmluZztcbiAgc3RhcnREYXRlOiBUaW1lc3RhbXA7XG4gIGVuZERhdGU6IFRpbWVzdGFtcDtcbiAgY3JlYXRlZEF0OiBUaW1lc3RhbXA7XG4gIHVwZGF0ZWRBdDogVGltZXN0YW1wO1xufSkgPT4gKHtcbiAgaWQ6IHRyaXAuaWQsXG4gIHVzZXJJZDogdHJpcC51c2VySWQsXG4gIHRpdGxlOiB0cmlwLnRpdGxlLFxuICBkZXNjcmlwdGlvbjogdHJpcC5kZXNjcmlwdGlvbixcbiAgY292ZXJJbWFnZVVybDogdHJpcC5jb3ZlckltYWdlVXJsLFxuICBpbWFnZXNKc29uOiB0cmlwLmltYWdlc0pzb24sXG4gIHN0YXJ0RGF0ZTogdHJpcC5zdGFydERhdGUsXG4gIGVuZERhdGU6IHRyaXAuZW5kRGF0ZSxcbiAgY3JlYXRlZEF0OiB0cmlwLmNyZWF0ZWRBdCxcbiAgdXBkYXRlZEF0OiB0cmlwLnVwZGF0ZWRBdCxcbn0pO1xuXG5leHBvcnQgY29uc3QgdG9Mb2NhdGlvblJlY29yZCA9IChsb2NhdGlvbjoge1xuICBpZDogYmlnaW50O1xuICB0cmlwSWQ6IGJpZ2ludDtcbiAgbG9jYXRpb25UaXRsZTogc3RyaW5nO1xuICBsYXQ6IG51bWJlcjtcbiAgbG5nOiBudW1iZXI7XG4gIHNjaGVkdWxlZERhdGU/OiBzdHJpbmc7XG4gIG9yZGVyOiBudW1iZXI7XG4gIHBsYWNlSWQ/OiBzdHJpbmc7XG4gIHBsYWNlVHlwZXNKc29uOiBzdHJpbmc7XG4gIHBsYWNlQ2F0ZWdvcnk/OiBzdHJpbmc7XG4gIGFwcHJlY2lhdGlvbj86IG51bWJlcjtcbiAgcHJpY2VTZW50aW1lbnQ/OiBzdHJpbmc7XG4gIG5vdGVzPzogc3RyaW5nO1xuICBjcmVhdGVkQXQ6IFRpbWVzdGFtcDtcbn0pID0+ICh7XG4gIGlkOiBsb2NhdGlvbi5pZCxcbiAgdHJpcElkOiBsb2NhdGlvbi50cmlwSWQsXG4gIGxvY2F0aW9uVGl0bGU6IGxvY2F0aW9uLmxvY2F0aW9uVGl0bGUsXG4gIGxhdDogbG9jYXRpb24ubGF0LFxuICBsbmc6IGxvY2F0aW9uLmxuZyxcbiAgc2NoZWR1bGVkRGF0ZTogbG9jYXRpb24uc2NoZWR1bGVkRGF0ZSxcbiAgb3JkZXI6IGxvY2F0aW9uLm9yZGVyLFxuICBwbGFjZUlkOiBsb2NhdGlvbi5wbGFjZUlkLFxuICBwbGFjZVR5cGVzSnNvbjogbG9jYXRpb24ucGxhY2VUeXBlc0pzb24sXG4gIHBsYWNlQ2F0ZWdvcnk6IGxvY2F0aW9uLnBsYWNlQ2F0ZWdvcnksXG4gIGFwcHJlY2lhdGlvbjogbG9jYXRpb24uYXBwcmVjaWF0aW9uLFxuICBwcmljZVNlbnRpbWVudDogbG9jYXRpb24ucHJpY2VTZW50aW1lbnQsXG4gIG5vdGVzOiBsb2NhdGlvbi5ub3RlcyxcbiAgY3JlYXRlZEF0OiBsb2NhdGlvbi5jcmVhdGVkQXQsXG59KTtcbiIsImltcG9ydCB7IHQgfSBmcm9tICdzcGFjZXRpbWVkYi9zZXJ2ZXInO1xuXG5leHBvcnQgY29uc3QgVXNlckF1dGhSZWNvcmQgPSB0Lm9iamVjdCgnVXNlckF1dGhSZWNvcmQnLCB7XG4gIGlkOiB0LnU2NCgpLFxuICBlbWFpbDogdC5zdHJpbmcoKSxcbiAgZnVsbE5hbWU6IHQuc3RyaW5nKCksXG4gIGNvdW50cnk6IHQuc3RyaW5nKCksXG4gIHBhc3N3b3JkSGFzaDogdC5zdHJpbmcoKSxcbiAgZW1haWxWZXJpZmllZEF0OiB0LnRpbWVzdGFtcCgpLm9wdGlvbmFsKCksXG4gIGNyZWF0ZWRBdDogdC50aW1lc3RhbXAoKSxcbiAgdXBkYXRlZEF0OiB0LnRpbWVzdGFtcCgpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBTZXNzaW9uVXNlclJlY29yZCA9IHQub2JqZWN0KCdTZXNzaW9uVXNlclJlY29yZCcsIHtcbiAgaWQ6IHQudTY0KCksXG4gIGVtYWlsOiB0LnN0cmluZygpLFxuICBmdWxsTmFtZTogdC5zdHJpbmcoKSxcbiAgY291bnRyeTogdC5zdHJpbmcoKSxcbiAgZW1haWxWZXJpZmllZEF0OiB0LnRpbWVzdGFtcCgpLm9wdGlvbmFsKCksXG4gIGNyZWF0ZWRBdDogdC50aW1lc3RhbXAoKSxcbiAgdXBkYXRlZEF0OiB0LnRpbWVzdGFtcCgpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBWZXJpZnlFbWFpbFJlc3VsdCA9IHQub2JqZWN0KCdWZXJpZnlFbWFpbFJlc3VsdCcsIHtcbiAgb2s6IHQuYm9vbCgpLFxuICByZWFzb246IHQuc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgdXNlcklkOiB0LnU2NCgpLm9wdGlvbmFsKCksXG4gIGVtYWlsOiB0LnN0cmluZygpLm9wdGlvbmFsKCksXG59KTtcblxuZXhwb3J0IGNvbnN0IFRyaXBSZWNvcmQgPSB0Lm9iamVjdCgnVHJpcFJlY29yZCcsIHtcbiAgaWQ6IHQudTY0KCksXG4gIHVzZXJJZDogdC51NjQoKSxcbiAgdGl0bGU6IHQuc3RyaW5nKCksXG4gIGRlc2NyaXB0aW9uOiB0LnN0cmluZygpLFxuICBjb3ZlckltYWdlVXJsOiB0LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIGltYWdlc0pzb246IHQuc3RyaW5nKCksXG4gIHN0YXJ0RGF0ZTogdC50aW1lc3RhbXAoKSxcbiAgZW5kRGF0ZTogdC50aW1lc3RhbXAoKSxcbiAgY3JlYXRlZEF0OiB0LnRpbWVzdGFtcCgpLFxuICB1cGRhdGVkQXQ6IHQudGltZXN0YW1wKCksXG59KTtcblxuZXhwb3J0IGNvbnN0IExvY2F0aW9uUmVjb3JkID0gdC5vYmplY3QoJ0xvY2F0aW9uUmVjb3JkJywge1xuICBpZDogdC51NjQoKSxcbiAgdHJpcElkOiB0LnU2NCgpLFxuICBsb2NhdGlvblRpdGxlOiB0LnN0cmluZygpLFxuICBsYXQ6IHQuZjY0KCksXG4gIGxuZzogdC5mNjQoKSxcbiAgc2NoZWR1bGVkRGF0ZTogdC5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBvcmRlcjogdC5pMzIoKSxcbiAgcGxhY2VJZDogdC5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBwbGFjZVR5cGVzSnNvbjogdC5zdHJpbmcoKSxcbiAgcGxhY2VDYXRlZ29yeTogdC5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBhcHByZWNpYXRpb246IHQuaTMyKCkub3B0aW9uYWwoKSxcbiAgcHJpY2VTZW50aW1lbnQ6IHQuc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgbm90ZXM6IHQuc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgY3JlYXRlZEF0OiB0LnRpbWVzdGFtcCgpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBUcmlwV2l0aExvY2F0aW9uc1JlY29yZCA9IHQub2JqZWN0KCdUcmlwV2l0aExvY2F0aW9uc1JlY29yZCcsIHtcbiAgdHJpcDogVHJpcFJlY29yZCxcbiAgbG9jYXRpb25zOiB0LmFycmF5KExvY2F0aW9uUmVjb3JkKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgR2xvYmVMb2NhdGlvblJlY29yZCA9IHQub2JqZWN0KCdHbG9iZUxvY2F0aW9uUmVjb3JkJywge1xuICB0cmlwVGl0bGU6IHQuc3RyaW5nKCksXG4gIGxvY2F0aW9uVGl0bGU6IHQuc3RyaW5nKCksXG4gIGxhdDogdC5mNjQoKSxcbiAgbG5nOiB0LmY2NCgpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBJdGluZXJhcnlMb2NhdGlvbklucHV0ID0gdC5vYmplY3QoJ0l0aW5lcmFyeUxvY2F0aW9uSW5wdXQnLCB7XG4gIGlkOiB0LnU2NCgpLm9wdGlvbmFsKCksXG4gIGxvY2F0aW9uVGl0bGU6IHQuc3RyaW5nKCksXG4gIGxhdDogdC5mNjQoKSxcbiAgbG5nOiB0LmY2NCgpLFxuICBzY2hlZHVsZWREYXRlOiB0LnN0cmluZygpLFxuICBvcmRlcjogdC5pMzIoKSxcbiAgcGxhY2VJZDogdC5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBwbGFjZVR5cGVzSnNvbjogdC5zdHJpbmcoKSxcbiAgcGxhY2VDYXRlZ29yeTogdC5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBhcHByZWNpYXRpb246IHQuaTMyKCkub3B0aW9uYWwoKSxcbiAgcHJpY2VTZW50aW1lbnQ6IHQuc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgbm90ZXM6IHQuc3RyaW5nKCkub3B0aW9uYWwoKSxcbn0pO1xuIiwiaW1wb3J0IHsgdCB9IGZyb20gJ3NwYWNldGltZWRiL3NlcnZlcic7XG5pbXBvcnQgc3BhY2V0aW1lZGIgZnJvbSAnLi4vLi4vc2NoZW1hJztcbmltcG9ydCB7XG4gIHRvU2Vzc2lvblVzZXJSZWNvcmQsXG4gIHRvVXNlckF1dGhSZWNvcmQsXG59IGZyb20gJy4uLy4uL3NoYXJlZC9tYXBwZXJzJztcbmltcG9ydCB7XG4gIFNlc3Npb25Vc2VyUmVjb3JkLFxuICBVc2VyQXV0aFJlY29yZCxcbiAgVmVyaWZ5RW1haWxSZXN1bHQsXG59IGZyb20gJy4uLy4uL3NoYXJlZC90eXBlcyc7XG5pbXBvcnQgeyBpc0V4cGlyZWQsIG5vcm1hbGl6ZUVtYWlsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IGdldF91c2VyX2F1dGhfYnlfZW1haWwgPSBzcGFjZXRpbWVkYi5wcm9jZWR1cmUoXG4gIHsgZW1haWw6IHQuc3RyaW5nKCkgfSxcbiAgdC5vcHRpb24oVXNlckF1dGhSZWNvcmQpLFxuICAoY3R4LCB7IGVtYWlsIH0pID0+IHtcbiAgICByZXR1cm4gY3R4LndpdGhUeCgodHgpID0+IHtcbiAgICAgIGNvbnN0IHVzZXIgPSB0eC5kYi51c2VyQWNjb3VudC5lbWFpbC5maW5kKG5vcm1hbGl6ZUVtYWlsKGVtYWlsKSk7XG4gICAgICByZXR1cm4gdXNlciA/IHRvVXNlckF1dGhSZWNvcmQodXNlcikgOiB1bmRlZmluZWQ7XG4gICAgfSk7XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBnZXRfc2Vzc2lvbl91c2VyX2J5X3Rva2VuX2hhc2ggPSBzcGFjZXRpbWVkYi5wcm9jZWR1cmUoXG4gIHsgdG9rZW5IYXNoOiB0LnN0cmluZygpIH0sXG4gIHQub3B0aW9uKFNlc3Npb25Vc2VyUmVjb3JkKSxcbiAgKGN0eCwgeyB0b2tlbkhhc2ggfSkgPT4ge1xuICAgIHJldHVybiBjdHgud2l0aFR4KCh0eCkgPT4ge1xuICAgICAgY29uc3Qgc2Vzc2lvbiA9IHR4LmRiLnNlc3Npb24udG9rZW5IYXNoLmZpbmQodG9rZW5IYXNoKTtcblxuICAgICAgaWYgKFxuICAgICAgICAhc2Vzc2lvbiB8fFxuICAgICAgICBzZXNzaW9uLnJldm9rZWRBdCB8fFxuICAgICAgICBpc0V4cGlyZWQoc2Vzc2lvbi5leHBpcmVzQXQsIHR4LnRpbWVzdGFtcClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1c2VyID0gdHguZGIudXNlckFjY291bnQuaWQuZmluZChzZXNzaW9uLnVzZXJJZCk7XG4gICAgICByZXR1cm4gdXNlciA/IHRvU2Vzc2lvblVzZXJSZWNvcmQodXNlcikgOiB1bmRlZmluZWQ7XG4gICAgfSk7XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCB2ZXJpZnlfZW1haWxfdG9rZW4gPSBzcGFjZXRpbWVkYi5wcm9jZWR1cmUoXG4gIHsgdG9rZW5IYXNoOiB0LnN0cmluZygpIH0sXG4gIFZlcmlmeUVtYWlsUmVzdWx0LFxuICAoY3R4LCB7IHRva2VuSGFzaCB9KSA9PiB7XG4gICAgcmV0dXJuIGN0eC53aXRoVHgoKHR4KSA9PiB7XG4gICAgICBjb25zdCB0b2tlbiA9IHR4LmRiLmVtYWlsVmVyaWZpY2F0aW9uVG9rZW4udG9rZW5IYXNoLmZpbmQodG9rZW5IYXNoKTtcblxuICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZWFzb246ICdpbnZhbGlkX3Rva2VuJyxcbiAgICAgICAgICB1c2VySWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICBlbWFpbDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAodG9rZW4uY29uc3VtZWRBdCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZWFzb246ICd0b2tlbl9hbHJlYWR5X3VzZWQnLFxuICAgICAgICAgIHVzZXJJZDogdW5kZWZpbmVkLFxuICAgICAgICAgIGVtYWlsOiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0V4cGlyZWQodG9rZW4uZXhwaXJlc0F0LCB0eC50aW1lc3RhbXApKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlYXNvbjogJ3Rva2VuX2V4cGlyZWQnLFxuICAgICAgICAgIHVzZXJJZDogdW5kZWZpbmVkLFxuICAgICAgICAgIGVtYWlsOiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVzZXIgPSB0eC5kYi51c2VyQWNjb3VudC5pZC5maW5kKHRva2VuLnVzZXJJZCk7XG4gICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVhc29uOiAndXNlcl9ub3RfZm91bmQnLFxuICAgICAgICAgIHVzZXJJZDogdW5kZWZpbmVkLFxuICAgICAgICAgIGVtYWlsOiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHR4LmRiLnVzZXJBY2NvdW50LmlkLnVwZGF0ZSh7XG4gICAgICAgIC4uLnVzZXIsXG4gICAgICAgIGVtYWlsVmVyaWZpZWRBdDogdXNlci5lbWFpbFZlcmlmaWVkQXQgPz8gdHgudGltZXN0YW1wLFxuICAgICAgICB1cGRhdGVkQXQ6IHR4LnRpbWVzdGFtcCxcbiAgICAgIH0pO1xuXG4gICAgICB0eC5kYi5lbWFpbFZlcmlmaWNhdGlvblRva2VuLmlkLnVwZGF0ZSh7XG4gICAgICAgIC4uLnRva2VuLFxuICAgICAgICBjb25zdW1lZEF0OiB0eC50aW1lc3RhbXAsXG4gICAgICB9KTtcblxuICAgICAgdHguZGIuYXV0aEF1ZGl0RXZlbnQuaW5zZXJ0KHtcbiAgICAgICAgaWQ6IDBuLFxuICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgIGV2ZW50VHlwZTogJ2VtYWlsX3ZlcmlmaWVkJyxcbiAgICAgICAgZXZlbnREZXRhaWxzSnNvbjogSlNPTi5zdHJpbmdpZnkoeyBlbWFpbDogdXNlci5lbWFpbCB9KSxcbiAgICAgICAgY3JlYXRlZEF0OiB0eC50aW1lc3RhbXAsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb2s6IHRydWUsXG4gICAgICAgIHJlYXNvbjogdW5kZWZpbmVkLFxuICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuKTtcbiIsImltcG9ydCB7IHQgfSBmcm9tICdzcGFjZXRpbWVkYi9zZXJ2ZXInO1xuaW1wb3J0IHNwYWNldGltZWRiIGZyb20gJy4uLy4uL3NjaGVtYSc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVfdHJpcCA9IHNwYWNldGltZWRiLnJlZHVjZXIoXG4gIHtcbiAgICB1c2VySWQ6IHQudTY0KCksXG4gICAgdGl0bGU6IHQuc3RyaW5nKCksXG4gICAgZGVzY3JpcHRpb246IHQuc3RyaW5nKCksXG4gICAgY292ZXJJbWFnZVVybDogdC5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICAgIHN0YXJ0RGF0ZTogdC50aW1lc3RhbXAoKSxcbiAgICBlbmREYXRlOiB0LnRpbWVzdGFtcCgpLFxuICB9LFxuICAoY3R4LCB7IHVzZXJJZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBjb3ZlckltYWdlVXJsLCBzdGFydERhdGUsIGVuZERhdGUgfSkgPT4ge1xuICAgIGNvbnN0IHRyaW1tZWRUaXRsZSA9IHRpdGxlLnRyaW0oKTtcbiAgICBjb25zdCB0cmltbWVkRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbi50cmltKCk7XG5cbiAgICBpZiAoIWN0eC5kYi51c2VyQWNjb3VudC5pZC5maW5kKHVzZXJJZCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVXNlciBub3QgZm91bmQnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRyaW1tZWRUaXRsZSB8fCAhdHJpbW1lZERlc2NyaXB0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcmVxdWlyZWQgdHJpcCBmaWVsZHMnKTtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnREYXRlLm1pY3Jvc1NpbmNlVW5peEVwb2NoID49IGVuZERhdGUubWljcm9zU2luY2VVbml4RXBvY2gpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3RhcnQgZGF0ZSBtdXN0IGJlIGJlZm9yZSBlbmQgZGF0ZScpO1xuICAgIH1cblxuICAgIGN0eC5kYi50cmlwLmluc2VydCh7XG4gICAgICBpZDogMG4sXG4gICAgICB1c2VySWQsXG4gICAgICB0aXRsZTogdHJpbW1lZFRpdGxlLFxuICAgICAgZGVzY3JpcHRpb246IHRyaW1tZWREZXNjcmlwdGlvbixcbiAgICAgIGNvdmVySW1hZ2VVcmw6IGNvdmVySW1hZ2VVcmw/LnRyaW0oKSB8fCB1bmRlZmluZWQsXG4gICAgICBpbWFnZXNKc29uOiAnW10nLFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZW5kRGF0ZSxcbiAgICAgIGNyZWF0ZWRBdDogY3R4LnRpbWVzdGFtcCxcbiAgICAgIHVwZGF0ZWRBdDogY3R4LnRpbWVzdGFtcCxcbiAgICB9KTtcbiAgfVxuKTtcbiIsImltcG9ydCB7IHQgfSBmcm9tICdzcGFjZXRpbWVkYi9zZXJ2ZXInO1xuaW1wb3J0IHNwYWNldGltZWRiIGZyb20gJy4uLy4uL3NjaGVtYSc7XG5pbXBvcnQgeyB0b1RyaXBSZWNvcmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvbWFwcGVycyc7XG5pbXBvcnQgeyBUcmlwUmVjb3JkIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3R5cGVzJztcbmltcG9ydCB7IHNvcnRUcmlwcyB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBsaXN0X3RyaXBzX2J5X3VzZXIgPSBzcGFjZXRpbWVkYi5wcm9jZWR1cmUoXG4gIHsgdXNlcklkOiB0LnU2NCgpIH0sXG4gIHQuYXJyYXkoVHJpcFJlY29yZCksXG4gIChjdHgsIHsgdXNlcklkIH0pID0+IHtcbiAgICByZXR1cm4gY3R4LndpdGhUeCgodHgpID0+IHtcbiAgICAgIGNvbnN0IHRyaXBzID0gWy4uLnR4LmRiLnRyaXAudXNlcklkLmZpbHRlcih1c2VySWQpXTtcbiAgICAgIHJldHVybiBzb3J0VHJpcHModHJpcHMpLm1hcCh0b1RyaXBSZWNvcmQpO1xuICAgIH0pO1xuICB9XG4pO1xuIiwidHlwZSBUcmlwTG9va3VwRGIgPSB7XG4gIHRyaXA6IHtcbiAgICBpZDoge1xuICAgICAgZmluZDogKHRyaXBJZDogYmlnaW50KSA9PiB7IHVzZXJJZDogYmlnaW50IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIH07XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcmVxdWlyZU93bmVkVHJpcCA9IChcbiAgZGI6IFRyaXBMb29rdXBEYixcbiAgdXNlcklkOiBiaWdpbnQsXG4gIHRyaXBJZDogYmlnaW50XG4pID0+IHtcbiAgY29uc3QgdHJpcCA9IGRiLnRyaXAuaWQuZmluZCh0cmlwSWQpO1xuXG4gIGlmICghdHJpcCB8fCB0cmlwLnVzZXJJZCAhPT0gdXNlcklkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcmlwIG5vdCBmb3VuZCcpO1xuICB9XG5cbiAgcmV0dXJuIHRyaXA7XG59O1xuIiwiaW1wb3J0IHsgVGltZXN0YW1wIH0gZnJvbSAnc3BhY2V0aW1lZGInO1xuXG50eXBlIExvY2F0aW9uSW5zZXJ0Um93ID0ge1xuICBpZDogYmlnaW50O1xuICB0cmlwSWQ6IGJpZ2ludDtcbiAgbG9jYXRpb25UaXRsZTogc3RyaW5nO1xuICBsYXQ6IG51bWJlcjtcbiAgbG5nOiBudW1iZXI7XG4gIHNjaGVkdWxlZERhdGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgb3JkZXI6IG51bWJlcjtcbiAgcGxhY2VJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwbGFjZVR5cGVzSnNvbjogc3RyaW5nO1xuICBwbGFjZUNhdGVnb3J5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGFwcHJlY2lhdGlvbjogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBwcmljZVNlbnRpbWVudDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBub3Rlczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBjcmVhdGVkQXQ6IFRpbWVzdGFtcDtcbn07XG5cbnR5cGUgTG9jYXRpb25JbnNlcnRDb250ZXh0ID0ge1xuICB0aW1lc3RhbXA6IFRpbWVzdGFtcDtcbiAgZGI6IHtcbiAgICBsb2NhdGlvbjoge1xuICAgICAgaW5zZXJ0OiAobG9jYXRpb246IExvY2F0aW9uSW5zZXJ0Um93KSA9PiB1bmtub3duO1xuICAgIH07XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgaW5zZXJ0TG9jYXRpb24gPSAoXG4gIGN0eDogTG9jYXRpb25JbnNlcnRDb250ZXh0LFxuICB0cmlwSWQ6IGJpZ2ludCxcbiAgbG9jYXRpb246IHtcbiAgICBsb2NhdGlvblRpdGxlOiBzdHJpbmc7XG4gICAgbGF0OiBudW1iZXI7XG4gICAgbG5nOiBudW1iZXI7XG4gICAgc2NoZWR1bGVkRGF0ZT86IHN0cmluZztcbiAgICBvcmRlcjogbnVtYmVyO1xuICAgIHBsYWNlSWQ/OiBzdHJpbmc7XG4gICAgcGxhY2VUeXBlc0pzb24/OiBzdHJpbmc7XG4gICAgcGxhY2VDYXRlZ29yeT86IHN0cmluZztcbiAgICBhcHByZWNpYXRpb24/OiBudW1iZXI7XG4gICAgcHJpY2VTZW50aW1lbnQ/OiBzdHJpbmc7XG4gICAgbm90ZXM/OiBzdHJpbmc7XG4gIH1cbikgPT4ge1xuICBjdHguZGIubG9jYXRpb24uaW5zZXJ0KHtcbiAgICBpZDogMG4sXG4gICAgdHJpcElkLFxuICAgIGxvY2F0aW9uVGl0bGU6IGxvY2F0aW9uLmxvY2F0aW9uVGl0bGUsXG4gICAgbGF0OiBsb2NhdGlvbi5sYXQsXG4gICAgbG5nOiBsb2NhdGlvbi5sbmcsXG4gICAgc2NoZWR1bGVkRGF0ZTogbG9jYXRpb24uc2NoZWR1bGVkRGF0ZSxcbiAgICBvcmRlcjogbG9jYXRpb24ub3JkZXIsXG4gICAgcGxhY2VJZDogbG9jYXRpb24ucGxhY2VJZCxcbiAgICBwbGFjZVR5cGVzSnNvbjogbG9jYXRpb24ucGxhY2VUeXBlc0pzb24gPz8gJ1tdJyxcbiAgICBwbGFjZUNhdGVnb3J5OiBsb2NhdGlvbi5wbGFjZUNhdGVnb3J5LFxuICAgIGFwcHJlY2lhdGlvbjogbG9jYXRpb24uYXBwcmVjaWF0aW9uLFxuICAgIHByaWNlU2VudGltZW50OiBsb2NhdGlvbi5wcmljZVNlbnRpbWVudCxcbiAgICBub3RlczogbG9jYXRpb24ubm90ZXMsXG4gICAgY3JlYXRlZEF0OiBjdHgudGltZXN0YW1wLFxuICB9KTtcbn07XG4iLCJpbXBvcnQgeyB0IH0gZnJvbSAnc3BhY2V0aW1lZGIvc2VydmVyJztcbmltcG9ydCBzcGFjZXRpbWVkYiBmcm9tICcuLi8uLi9zY2hlbWEnO1xuaW1wb3J0IHsgcmVxdWlyZU93bmVkVHJpcCB9IGZyb20gJy4uLy4uL3NoYXJlZC9ndWFyZHMnO1xuaW1wb3J0IHsgSXRpbmVyYXJ5TG9jYXRpb25JbnB1dCB9IGZyb20gJy4uLy4uL3NoYXJlZC90eXBlcyc7XG5pbXBvcnQgeyBpbnNlcnRMb2NhdGlvbiB9IGZyb20gJy4vaGVscGVycyc7XG5cbmV4cG9ydCBjb25zdCBhZGRfbG9jYXRpb24gPSBzcGFjZXRpbWVkYi5yZWR1Y2VyKFxuICB7XG4gICAgdXNlcklkOiB0LnU2NCgpLFxuICAgIHRyaXBJZDogdC51NjQoKSxcbiAgICBsb2NhdGlvblRpdGxlOiB0LnN0cmluZygpLFxuICAgIGxhdDogdC5mNjQoKSxcbiAgICBsbmc6IHQuZjY0KCksXG4gIH0sXG4gIChjdHgsIHsgdXNlcklkLCB0cmlwSWQsIGxvY2F0aW9uVGl0bGUsIGxhdCwgbG5nIH0pID0+IHtcbiAgICByZXF1aXJlT3duZWRUcmlwKGN0eC5kYiwgdXNlcklkLCB0cmlwSWQpO1xuXG4gICAgY29uc3QgZXhpc3RpbmdMb2NhdGlvbnMgPSBbLi4uY3R4LmRiLmxvY2F0aW9uLmxvY2F0aW9uX3RyaXBfaWQuZmlsdGVyKHRyaXBJZCldO1xuICAgIGluc2VydExvY2F0aW9uKGN0eCwgdHJpcElkLCB7XG4gICAgICBsb2NhdGlvblRpdGxlLFxuICAgICAgbGF0LFxuICAgICAgbG5nLFxuICAgICAgb3JkZXI6IGV4aXN0aW5nTG9jYXRpb25zLmxlbmd0aCxcbiAgICB9KTtcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZV9pdGluZXJhcnkgPSBzcGFjZXRpbWVkYi5yZWR1Y2VyKFxuICB7XG4gICAgdXNlcklkOiB0LnU2NCgpLFxuICAgIHRyaXBJZDogdC51NjQoKSxcbiAgICBsb2NhdGlvbnM6IHQuYXJyYXkoSXRpbmVyYXJ5TG9jYXRpb25JbnB1dCksXG4gIH0sXG4gIChjdHgsIHsgdXNlcklkLCB0cmlwSWQsIGxvY2F0aW9ucyB9KSA9PiB7XG4gICAgcmVxdWlyZU93bmVkVHJpcChjdHguZGIsIHVzZXJJZCwgdHJpcElkKTtcblxuICAgIGlmIChbLi4uY3R4LmRiLmxvY2F0aW9uLmxvY2F0aW9uX3RyaXBfaWQuZmlsdGVyKHRyaXBJZCldLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyB0cmlwIGFscmVhZHkgaGFzIGFuIGl0aW5lcmFyeS4gVXNlIGVkaXQgaW5zdGVhZC4nKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGxvY2F0aW9uIG9mIGxvY2F0aW9ucykge1xuICAgICAgaW5zZXJ0TG9jYXRpb24oY3R4LCB0cmlwSWQsIGxvY2F0aW9uKTtcbiAgICB9XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBzYXZlX2l0aW5lcmFyeSA9IHNwYWNldGltZWRiLnJlZHVjZXIoXG4gIHtcbiAgICB1c2VySWQ6IHQudTY0KCksXG4gICAgdHJpcElkOiB0LnU2NCgpLFxuICAgIGxvY2F0aW9uczogdC5hcnJheShJdGluZXJhcnlMb2NhdGlvbklucHV0KSxcbiAgICBkZWxldGVkTG9jYXRpb25JZHM6IHQuYXJyYXkodC51NjQoKSksXG4gIH0sXG4gIChjdHgsIHsgdXNlcklkLCB0cmlwSWQsIGxvY2F0aW9ucywgZGVsZXRlZExvY2F0aW9uSWRzIH0pID0+IHtcbiAgICByZXF1aXJlT3duZWRUcmlwKGN0eC5kYiwgdXNlcklkLCB0cmlwSWQpO1xuXG4gICAgY29uc3QgZXhpc3RpbmdMb2NhdGlvbnMgPSBuZXcgTWFwKFxuICAgICAgWy4uLmN0eC5kYi5sb2NhdGlvbi5sb2NhdGlvbl90cmlwX2lkLmZpbHRlcih0cmlwSWQpXS5tYXAoKGxvY2F0aW9uKSA9PiBbXG4gICAgICAgIGxvY2F0aW9uLmlkLFxuICAgICAgICBsb2NhdGlvbixcbiAgICAgIF0pXG4gICAgKTtcblxuICAgIGZvciAoY29uc3QgbG9jYXRpb25JZCBvZiBkZWxldGVkTG9jYXRpb25JZHMpIHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nTG9jYXRpb24gPSBleGlzdGluZ0xvY2F0aW9ucy5nZXQobG9jYXRpb25JZCk7XG4gICAgICBpZiAoIWV4aXN0aW5nTG9jYXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGl0aW5lcmFyeSBsb2NhdGlvbicpO1xuICAgICAgfVxuXG4gICAgICBjdHguZGIubG9jYXRpb24uaWQuZGVsZXRlKGxvY2F0aW9uSWQpO1xuICAgICAgZXhpc3RpbmdMb2NhdGlvbnMuZGVsZXRlKGxvY2F0aW9uSWQpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgbG9jYXRpb24gb2YgbG9jYXRpb25zKSB7XG4gICAgICBpZiAoIWxvY2F0aW9uLmlkKSB7XG4gICAgICAgIGluc2VydExvY2F0aW9uKGN0eCwgdHJpcElkLCBsb2NhdGlvbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleGlzdGluZ0xvY2F0aW9uID0gZXhpc3RpbmdMb2NhdGlvbnMuZ2V0KGxvY2F0aW9uLmlkKTtcbiAgICAgIGlmICghZXhpc3RpbmdMb2NhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaXRpbmVyYXJ5IGxvY2F0aW9uJyk7XG4gICAgICB9XG5cbiAgICAgIGN0eC5kYi5sb2NhdGlvbi5pZC51cGRhdGUoe1xuICAgICAgICAuLi5leGlzdGluZ0xvY2F0aW9uLFxuICAgICAgICBsb2NhdGlvblRpdGxlOiBsb2NhdGlvbi5sb2NhdGlvblRpdGxlLFxuICAgICAgICBsYXQ6IGxvY2F0aW9uLmxhdCxcbiAgICAgICAgbG5nOiBsb2NhdGlvbi5sbmcsXG4gICAgICAgIHNjaGVkdWxlZERhdGU6IGxvY2F0aW9uLnNjaGVkdWxlZERhdGUsXG4gICAgICAgIG9yZGVyOiBsb2NhdGlvbi5vcmRlcixcbiAgICAgICAgcGxhY2VJZDogbG9jYXRpb24ucGxhY2VJZCxcbiAgICAgICAgcGxhY2VUeXBlc0pzb246IGxvY2F0aW9uLnBsYWNlVHlwZXNKc29uLFxuICAgICAgICBwbGFjZUNhdGVnb3J5OiBsb2NhdGlvbi5wbGFjZUNhdGVnb3J5LFxuICAgICAgICBhcHByZWNpYXRpb246IGxvY2F0aW9uLmFwcHJlY2lhdGlvbixcbiAgICAgICAgcHJpY2VTZW50aW1lbnQ6IGxvY2F0aW9uLnByaWNlU2VudGltZW50LFxuICAgICAgICBub3RlczogbG9jYXRpb24ubm90ZXMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCByZW9yZGVyX2l0aW5lcmFyeV9kYXkgPSBzcGFjZXRpbWVkYi5yZWR1Y2VyKFxuICB7XG4gICAgdXNlcklkOiB0LnU2NCgpLFxuICAgIHRyaXBJZDogdC51NjQoKSxcbiAgICBzY2hlZHVsZWREYXRlOiB0LnN0cmluZygpLFxuICAgIG5ld09yZGVyOiB0LmFycmF5KHQudTY0KCkpLFxuICB9LFxuICAoY3R4LCB7IHVzZXJJZCwgdHJpcElkLCBzY2hlZHVsZWREYXRlLCBuZXdPcmRlciB9KSA9PiB7XG4gICAgcmVxdWlyZU93bmVkVHJpcChjdHguZGIsIHVzZXJJZCwgdHJpcElkKTtcblxuICAgIGNvbnN0IHVuaXF1ZUxvY2F0aW9uSWRzID0gbmV3IFNldChuZXdPcmRlcik7XG4gICAgaWYgKHVuaXF1ZUxvY2F0aW9uSWRzLnNpemUgIT09IG5ld09yZGVyLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGl0aW5lcmFyeSBvcmRlcicpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBuZXdPcmRlci5sZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgIGNvbnN0IGxvY2F0aW9uSWQgPSBuZXdPcmRlcltpbmRleF07XG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGN0eC5kYi5sb2NhdGlvbi5pZC5maW5kKGxvY2F0aW9uSWQpO1xuXG4gICAgICBpZiAoXG4gICAgICAgICFsb2NhdGlvbiB8fFxuICAgICAgICBsb2NhdGlvbi50cmlwSWQgIT09IHRyaXBJZCB8fFxuICAgICAgICBsb2NhdGlvbi5zY2hlZHVsZWREYXRlICE9PSBzY2hlZHVsZWREYXRlXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGl0aW5lcmFyeSBvcmRlcicpO1xuICAgICAgfVxuXG4gICAgICBjdHguZGIubG9jYXRpb24uaWQudXBkYXRlKHtcbiAgICAgICAgLi4ubG9jYXRpb24sXG4gICAgICAgIG9yZGVyOiBpbmRleCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuKTtcbiIsImltcG9ydCB7IHQgfSBmcm9tICdzcGFjZXRpbWVkYi9zZXJ2ZXInO1xuaW1wb3J0IHNwYWNldGltZWRiIGZyb20gJy4uLy4uL3NjaGVtYSc7XG5pbXBvcnQgeyB0b0xvY2F0aW9uUmVjb3JkLCB0b1RyaXBSZWNvcmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvbWFwcGVycyc7XG5pbXBvcnQge1xuICBHbG9iZUxvY2F0aW9uUmVjb3JkLFxuICBUcmlwV2l0aExvY2F0aW9uc1JlY29yZCxcbn0gZnJvbSAnLi4vLi4vc2hhcmVkL3R5cGVzJztcbmltcG9ydCB7IHNvcnRMb2NhdGlvbnMgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgZ2V0X3RyaXBfd2l0aF9sb2NhdGlvbnMgPSBzcGFjZXRpbWVkYi5wcm9jZWR1cmUoXG4gIHsgdXNlcklkOiB0LnU2NCgpLCB0cmlwSWQ6IHQudTY0KCkgfSxcbiAgdC5vcHRpb24oVHJpcFdpdGhMb2NhdGlvbnNSZWNvcmQpLFxuICAoY3R4LCB7IHVzZXJJZCwgdHJpcElkIH0pID0+IHtcbiAgICByZXR1cm4gY3R4LndpdGhUeCgodHgpID0+IHtcbiAgICAgIGNvbnN0IHRyaXAgPSB0eC5kYi50cmlwLmlkLmZpbmQodHJpcElkKTtcblxuICAgICAgaWYgKCF0cmlwIHx8IHRyaXAudXNlcklkICE9PSB1c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbG9jYXRpb25zID0gc29ydExvY2F0aW9ucyhbXG4gICAgICAgIC4uLnR4LmRiLmxvY2F0aW9uLmxvY2F0aW9uX3RyaXBfaWQuZmlsdGVyKHRyaXBJZCksXG4gICAgICBdKS5tYXAodG9Mb2NhdGlvblJlY29yZCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyaXA6IHRvVHJpcFJlY29yZCh0cmlwKSxcbiAgICAgICAgbG9jYXRpb25zLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGxpc3RfZ2xvYmVfbG9jYXRpb25zX2J5X3VzZXIgPSBzcGFjZXRpbWVkYi5wcm9jZWR1cmUoXG4gIHsgdXNlcklkOiB0LnU2NCgpIH0sXG4gIHQuYXJyYXkoR2xvYmVMb2NhdGlvblJlY29yZCksXG4gIChjdHgsIHsgdXNlcklkIH0pID0+IHtcbiAgICByZXR1cm4gY3R4LndpdGhUeCgodHgpID0+IHtcbiAgICAgIGNvbnN0IHJvd3M6IHtcbiAgICAgICAgdHJpcFRpdGxlOiBzdHJpbmc7XG4gICAgICAgIGxvY2F0aW9uVGl0bGU6IHN0cmluZztcbiAgICAgICAgbGF0OiBudW1iZXI7XG4gICAgICAgIGxuZzogbnVtYmVyO1xuICAgICAgfVtdID0gW107XG5cbiAgICAgIGZvciAoY29uc3QgdHJpcCBvZiB0eC5kYi50cmlwLnVzZXJJZC5maWx0ZXIodXNlcklkKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGxvY2F0aW9uIG9mIHR4LmRiLmxvY2F0aW9uLmxvY2F0aW9uX3RyaXBfaWQuZmlsdGVyKHRyaXAuaWQpKSB7XG4gICAgICAgICAgcm93cy5wdXNoKHtcbiAgICAgICAgICAgIHRyaXBUaXRsZTogdHJpcC50aXRsZSxcbiAgICAgICAgICAgIGxvY2F0aW9uVGl0bGU6IGxvY2F0aW9uLmxvY2F0aW9uVGl0bGUsXG4gICAgICAgICAgICBsYXQ6IGxvY2F0aW9uLmxhdCxcbiAgICAgICAgICAgIGxuZzogbG9jYXRpb24ubG5nLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByb3dzO1xuICAgIH0pO1xuICB9XG4pO1xuIiwiaW1wb3J0IHNwYWNldGltZWRiIGZyb20gJy4vc2NoZW1hJztcblxuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGVzL2NvcmUvcmVkdWNlcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGVzL2F1dGgvcmVkdWNlcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGVzL2F1dGgvcHJvY2VkdXJlcyc7XG5leHBvcnQgKiBmcm9tICcuL21vZHVsZXMvdHJpcHMvcmVkdWNlcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGVzL3RyaXBzL3Byb2NlZHVyZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGVzL2l0aW5lcmFyeS9yZWR1Y2Vycyc7XG5leHBvcnQgKiBmcm9tICcuL21vZHVsZXMvaXRpbmVyYXJ5L3Byb2NlZHVyZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBzcGFjZXRpbWVkYjtcbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQUlBLGFBQVcsT0FBTztBQUN0QixJQUFJQyxjQUFZLE9BQU87QUFDdkIsSUFBSUMscUJBQW1CLE9BQU87QUFDOUIsSUFBSUMsc0JBQW9CLE9BQU87QUFDL0IsSUFBSUMsaUJBQWUsT0FBTztBQUMxQixJQUFJQyxpQkFBZSxPQUFPLFVBQVU7QUFDcEMsSUFBSUMsZ0JBQWMsSUFBSSxRQUFRLFNBQVMsWUFBWTtBQUNqRCxRQUFPLFFBQVEsR0FBRyxHQUFHSCxvQkFBa0IsR0FBRyxDQUFDLE1BQU0sTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsU0FBUyxJQUFJLEVBQUUsSUFBSTs7QUFFN0YsSUFBSUksaUJBQWUsSUFBSSxNQUFNLFFBQVEsU0FBUztBQUM1QyxLQUFJLFFBQVEsT0FBTyxTQUFTLFlBQVksT0FBTyxTQUFTLFlBQ3REO09BQUssSUFBSSxPQUFPSixvQkFBa0IsS0FBSyxDQUNyQyxLQUFJLENBQUNFLGVBQWEsS0FBSyxJQUFJLElBQUksSUFBSSxRQUFRLE9BQ3pDLGFBQVUsSUFBSSxLQUFLO0dBQUUsV0FBVyxLQUFLO0dBQU0sWUFBWSxFQUFFLE9BQU9ILG1CQUFpQixNQUFNLElBQUksS0FBSyxLQUFLO0dBQVksQ0FBQzs7QUFFeEgsUUFBTzs7QUFFVCxJQUFJTSxhQUFXLEtBQUssWUFBWSxZQUFZLFNBQVMsT0FBTyxPQUFPUixXQUFTSSxlQUFhLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRUcsY0FLbkcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGFBQWFOLFlBQVUsUUFBUSxXQUFXO0NBQUUsT0FBTztDQUFLLFlBQVk7Q0FBTSxDQUFDLEdBQUcsUUFDekcsSUFDRDtBQTJLRCxJQUFJLDJCQUEyQk8sVUF4S05GLGFBQVcsRUFDbEMsbURBQW1ELFNBQVMsUUFBUTtBQUNsRTtDQUNBLElBQUksc0JBQXNCO0VBQ3hCLGNBQWM7RUFDZCxLQUFLO0VBQ0wsUUFBUTtFQUNUO0NBQ0QsU0FBUyxpQkFBaUIsS0FBSztBQUM3QixTQUFPLE9BQU8sUUFBUSxZQUFZLENBQUMsQ0FBQyxJQUFJLE1BQU07O0NBRWhELFNBQVMsWUFBWSxnQkFBZ0IsU0FBUztFQUM1QyxJQUFJLFFBQVEsZUFBZSxNQUFNLElBQUksQ0FBQyxPQUFPLGlCQUFpQjtFQUU5RCxJQUFJLFNBQVMsbUJBRFUsTUFBTSxPQUFPLENBQ2E7RUFDakQsSUFBSSxPQUFPLE9BQU87RUFDbEIsSUFBSSxRQUFRLE9BQU87QUFDbkIsWUFBVSxVQUFVLE9BQU8sT0FBTyxFQUFFLEVBQUUscUJBQXFCLFFBQVEsR0FBRztBQUN0RSxNQUFJO0FBQ0YsV0FBUSxRQUFRLGVBQWUsbUJBQW1CLE1BQU0sR0FBRztXQUNwRCxHQUFHO0FBQ1YsV0FBUSxNQUNOLGdGQUFnRixRQUFRLGlFQUN4RixFQUNEOztFQUVILElBQUksU0FBUztHQUNYO0dBQ0E7R0FDRDtBQUNELFFBQU0sUUFBUSxTQUFTLE1BQU07R0FDM0IsSUFBSSxRQUFRLEtBQUssTUFBTSxJQUFJO0dBQzNCLElBQUksTUFBTSxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYTtHQUNoRCxJQUFJLFNBQVMsTUFBTSxLQUFLLElBQUk7QUFDNUIsT0FBSSxRQUFRLFVBQ1YsUUFBTyxVQUFVLElBQUksS0FBSyxPQUFPO1lBQ3hCLFFBQVEsVUFDakIsUUFBTyxTQUFTLFNBQVMsUUFBUSxHQUFHO1lBQzNCLFFBQVEsU0FDakIsUUFBTyxTQUFTO1lBQ1AsUUFBUSxXQUNqQixRQUFPLFdBQVc7WUFDVCxRQUFRLFdBQ2pCLFFBQU8sV0FBVztPQUVsQixRQUFPLE9BQU87SUFFaEI7QUFDRixTQUFPOztDQUVULFNBQVMsbUJBQW1CLGtCQUFrQjtFQUM1QyxJQUFJLE9BQU87RUFDWCxJQUFJLFFBQVE7RUFDWixJQUFJLGVBQWUsaUJBQWlCLE1BQU0sSUFBSTtBQUM5QyxNQUFJLGFBQWEsU0FBUyxHQUFHO0FBQzNCLFVBQU8sYUFBYSxPQUFPO0FBQzNCLFdBQVEsYUFBYSxLQUFLLElBQUk7UUFFOUIsU0FBUTtBQUVWLFNBQU87R0FBRTtHQUFNO0dBQU87O0NBRXhCLFNBQVMsTUFBTSxPQUFPLFNBQVM7QUFDN0IsWUFBVSxVQUFVLE9BQU8sT0FBTyxFQUFFLEVBQUUscUJBQXFCLFFBQVEsR0FBRztBQUN0RSxNQUFJLENBQUMsTUFDSCxLQUFJLENBQUMsUUFBUSxJQUNYLFFBQU8sRUFBRTtNQUVULFFBQU8sRUFBRTtBQUdiLE1BQUksTUFBTSxRQUNSLEtBQUksT0FBTyxNQUFNLFFBQVEsaUJBQWlCLFdBQ3hDLFNBQVEsTUFBTSxRQUFRLGNBQWM7V0FDM0IsTUFBTSxRQUFRLGNBQ3ZCLFNBQVEsTUFBTSxRQUFRO09BQ2pCO0dBQ0wsSUFBSSxNQUFNLE1BQU0sUUFBUSxPQUFPLEtBQUssTUFBTSxRQUFRLENBQUMsS0FBSyxTQUFTLEtBQUs7QUFDcEUsV0FBTyxJQUFJLGFBQWEsS0FBSztLQUM3QjtBQUNGLE9BQUksQ0FBQyxPQUFPLE1BQU0sUUFBUSxVQUFVLENBQUMsUUFBUSxPQUMzQyxTQUFRLEtBQ04sbU9BQ0Q7QUFFSCxXQUFROztBQUdaLE1BQUksQ0FBQyxNQUFNLFFBQVEsTUFBTSxDQUN2QixTQUFRLENBQUMsTUFBTTtBQUVqQixZQUFVLFVBQVUsT0FBTyxPQUFPLEVBQUUsRUFBRSxxQkFBcUIsUUFBUSxHQUFHO0FBQ3RFLE1BQUksQ0FBQyxRQUFRLElBQ1gsUUFBTyxNQUFNLE9BQU8saUJBQWlCLENBQUMsSUFBSSxTQUFTLEtBQUs7QUFDdEQsVUFBTyxZQUFZLEtBQUssUUFBUTtJQUNoQztNQUdGLFFBQU8sTUFBTSxPQUFPLGlCQUFpQixDQUFDLE9BQU8sU0FBUyxVQUFVLEtBQUs7R0FDbkUsSUFBSSxTQUFTLFlBQVksS0FBSyxRQUFRO0FBQ3RDLFlBQVMsT0FBTyxRQUFRO0FBQ3hCLFVBQU87S0FKSyxFQUFFLENBS0w7O0NBR2YsU0FBUyxvQkFBb0IsZUFBZTtBQUMxQyxNQUFJLE1BQU0sUUFBUSxjQUFjLENBQzlCLFFBQU87QUFFVCxNQUFJLE9BQU8sa0JBQWtCLFNBQzNCLFFBQU8sRUFBRTtFQUVYLElBQUksaUJBQWlCLEVBQUU7RUFDdkIsSUFBSSxNQUFNO0VBQ1YsSUFBSTtFQUNKLElBQUk7RUFDSixJQUFJO0VBQ0osSUFBSTtFQUNKLElBQUk7RUFDSixTQUFTLGlCQUFpQjtBQUN4QixVQUFPLE1BQU0sY0FBYyxVQUFVLEtBQUssS0FBSyxjQUFjLE9BQU8sSUFBSSxDQUFDLENBQ3ZFLFFBQU87QUFFVCxVQUFPLE1BQU0sY0FBYzs7RUFFN0IsU0FBUyxpQkFBaUI7QUFDeEIsUUFBSyxjQUFjLE9BQU8sSUFBSTtBQUM5QixVQUFPLE9BQU8sT0FBTyxPQUFPLE9BQU8sT0FBTzs7QUFFNUMsU0FBTyxNQUFNLGNBQWMsUUFBUTtBQUNqQyxXQUFRO0FBQ1IsMkJBQXdCO0FBQ3hCLFVBQU8sZ0JBQWdCLEVBQUU7QUFDdkIsU0FBSyxjQUFjLE9BQU8sSUFBSTtBQUM5QixRQUFJLE9BQU8sS0FBSztBQUNkLGlCQUFZO0FBQ1osWUFBTztBQUNQLHFCQUFnQjtBQUNoQixpQkFBWTtBQUNaLFlBQU8sTUFBTSxjQUFjLFVBQVUsZ0JBQWdCLENBQ25ELFFBQU87QUFFVCxTQUFJLE1BQU0sY0FBYyxVQUFVLGNBQWMsT0FBTyxJQUFJLEtBQUssS0FBSztBQUNuRSw4QkFBd0I7QUFDeEIsWUFBTTtBQUNOLHFCQUFlLEtBQUssY0FBYyxVQUFVLE9BQU8sVUFBVSxDQUFDO0FBQzlELGNBQVE7V0FFUixPQUFNLFlBQVk7VUFHcEIsUUFBTzs7QUFHWCxPQUFJLENBQUMseUJBQXlCLE9BQU8sY0FBYyxPQUNqRCxnQkFBZSxLQUFLLGNBQWMsVUFBVSxPQUFPLGNBQWMsT0FBTyxDQUFDOztBQUc3RSxTQUFPOztBQUVULFFBQU8sVUFBVTtBQUNqQixRQUFPLFFBQVEsUUFBUTtBQUN2QixRQUFPLFFBQVEsY0FBYztBQUM3QixRQUFPLFFBQVEscUJBQXFCO0dBRXZDLENBQUMsRUFHeUQsQ0FBQztBQUc1RCxJQUFJLDZCQUE2QjtBQUNqQyxTQUFTLG9CQUFvQixNQUFNO0FBQ2pDLEtBQUksMkJBQTJCLEtBQUssS0FBSyxJQUFJLEtBQUssTUFBTSxLQUFLLEdBQzNELE9BQU0sSUFBSSxVQUFVLHlDQUF5QztBQUUvRCxRQUFPLEtBQUssTUFBTSxDQUFDLGFBQWE7O0FBSWxDLElBQUksb0JBQW9CO0NBQ3RCLE9BQU8sYUFBYSxHQUFHO0NBQ3ZCLE9BQU8sYUFBYSxHQUFHO0NBQ3ZCLE9BQU8sYUFBYSxFQUFFO0NBQ3RCLE9BQU8sYUFBYSxHQUFHO0NBQ3hCO0FBQ0QsSUFBSSw2QkFBNkIsSUFBSSxPQUNuQyxNQUFNLGtCQUFrQixLQUFLLEdBQUcsQ0FBQyxNQUFNLGtCQUFrQixLQUFLLEdBQUcsQ0FBQyxLQUNsRSxJQUNEO0FBQ0QsU0FBUyxxQkFBcUIsT0FBTztBQUVuQyxRQURrQixNQUFNLFFBQVEsNEJBQTRCLEdBQUc7O0FBS2pFLFNBQVMsa0JBQWtCLE9BQU87QUFDaEMsS0FBSSxPQUFPLFVBQVUsU0FDbkIsUUFBTztBQUVULEtBQUksTUFBTSxXQUFXLEVBQ25CLFFBQU87QUFFVCxNQUFLLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUs7RUFDckMsTUFBTSxZQUFZLE1BQU0sV0FBVyxFQUFFO0FBQ3JDLE1BQUksWUFBWSxPQUFPLENBQUMsUUFBUSxVQUFVLENBQ3hDLFFBQU87O0FBR1gsUUFBTzs7QUFFVCxTQUFTLFFBQVEsT0FBTztBQUN0QixRQUFPLENBQUM7RUFDTjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNELENBQUMsU0FBUyxNQUFNOztBQUluQixTQUFTLG1CQUFtQixPQUFPO0FBQ2pDLEtBQUksT0FBTyxVQUFVLFNBQ25CLFFBQU87QUFFVCxLQUFJLE1BQU0sTUFBTSxLQUFLLE1BQ25CLFFBQU87QUFFVCxNQUFLLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUs7RUFDckMsTUFBTSxZQUFZLE1BQU0sV0FBVyxFQUFFO0FBQ3JDLE1BRUUsY0FBYyxLQUNkLGNBQWMsTUFBTSxjQUFjLEdBRWxDLFFBQU87O0FBR1gsUUFBTzs7QUFJVCxJQUFJLHFCQUFxQixPQUFPLG9CQUFvQjtBQUNwRCxJQUFJLG1CQUFtQixPQUFPLGlCQUFpQjtBQUMvQyxJQUFJLHlCQUF5QjtBQUM3QixJQUFJLElBQUksSUFBSTtBQUNaLElBQUksVUFBVSxNQUFNLFNBQVM7Q0FDM0IsWUFBWSxNQUFNO0FBRWhCLE9BQUssTUFBTSxFQUFFO0FBR2IsT0FBSyxzQkFBc0IsSUFBSSxLQUFLO0FBQ3BDLE9BQUssTUFBTTtBQUNYLE1BQUksQ0FBQyxXQUFXLGtCQUFrQixDQUFDLFNBQVMsTUFBTSxZQUFZLEtBQUssSUFBSSxnQkFBZ0IsWUFBWSxPQUFPLFdBQVcsWUFBWSxlQUFlLGdCQUFnQixXQUFXLFFBRXpLLENBRHVCLEtBQ1IsU0FBUyxPQUFPLFNBQVM7QUFDdEMsUUFBSyxPQUFPLE1BQU0sTUFBTTtLQUN2QixLQUFLO1dBQ0MsTUFBTSxRQUFRLEtBQUssQ0FDNUIsTUFBSyxTQUFTLENBQUMsTUFBTSxXQUFXO0FBQzlCLFFBQUssT0FDSCxNQUNBLE1BQU0sUUFBUSxNQUFNLEdBQUcsTUFBTSxLQUFLLHVCQUF1QixHQUFHLE1BQzdEO0lBQ0Q7V0FDTyxLQUNULFFBQU8sb0JBQW9CLEtBQUssQ0FBQyxTQUFTLFNBQVM7R0FDakQsTUFBTSxRQUFRLEtBQUs7QUFDbkIsUUFBSyxPQUNILE1BQ0EsTUFBTSxRQUFRLE1BQU0sR0FBRyxNQUFNLEtBQUssdUJBQXVCLEdBQUcsTUFDN0Q7SUFDRDs7Q0FHTixFQUFFLEtBQUssb0JBQW9CLEtBQUssa0JBQWtCLEtBQUssT0FBTyxhQUFhLE9BQU8sYUFBYTtBQUM3RixTQUFPLEtBQUssU0FBUzs7Q0FFdkIsQ0FBQyxPQUFPO0FBQ04sT0FBSyxNQUFNLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FDakMsT0FBTTs7Q0FHVixDQUFDLFNBQVM7QUFDUixPQUFLLE1BQU0sR0FBRyxVQUFVLEtBQUssU0FBUyxDQUNwQyxPQUFNOztDQUdWLENBQUMsVUFBVTtFQUNULElBQUksYUFBYSxPQUFPLEtBQUssS0FBSyxvQkFBb0IsQ0FBQyxNQUNwRCxHQUFHLE1BQU0sRUFBRSxjQUFjLEVBQUUsQ0FDN0I7QUFDRCxPQUFLLE1BQU0sUUFBUSxXQUNqQixLQUFJLFNBQVMsYUFDWCxNQUFLLE1BQU0sU0FBUyxLQUFLLGNBQWMsQ0FDckMsT0FBTSxDQUFDLE1BQU0sTUFBTTtNQUdyQixPQUFNLENBQUMsTUFBTSxLQUFLLElBQUksS0FBSyxDQUFDOzs7OztDQU9sQyxJQUFJLE1BQU07QUFDUixNQUFJLENBQUMsa0JBQWtCLEtBQUssQ0FDMUIsT0FBTSxJQUFJLFVBQVUsd0JBQXdCLEtBQUssR0FBRztBQUV0RCxTQUFPLEtBQUssb0JBQW9CLGVBQWUsb0JBQW9CLEtBQUssQ0FBQzs7Ozs7Q0FLM0UsSUFBSSxNQUFNO0FBQ1IsTUFBSSxDQUFDLGtCQUFrQixLQUFLLENBQzFCLE9BQU0sVUFBVSx3QkFBd0IsS0FBSyxHQUFHO0FBRWxELFNBQU8sS0FBSyxvQkFBb0Isb0JBQW9CLEtBQUssS0FBSzs7Ozs7Q0FLaEUsSUFBSSxNQUFNLE9BQU87QUFDZixNQUFJLENBQUMsa0JBQWtCLEtBQUssSUFBSSxDQUFDLG1CQUFtQixNQUFNLENBQ3hEO0VBRUYsTUFBTSxpQkFBaUIsb0JBQW9CLEtBQUs7RUFDaEQsTUFBTSxrQkFBa0IscUJBQXFCLE1BQU07QUFDbkQsT0FBSyxvQkFBb0Isa0JBQWtCLHFCQUFxQixnQkFBZ0I7QUFDaEYsT0FBSyxrQkFBa0IsSUFBSSxnQkFBZ0IsS0FBSzs7Ozs7Q0FLbEQsT0FBTyxNQUFNLE9BQU87QUFDbEIsTUFBSSxDQUFDLGtCQUFrQixLQUFLLElBQUksQ0FBQyxtQkFBbUIsTUFBTSxDQUN4RDtFQUVGLE1BQU0saUJBQWlCLG9CQUFvQixLQUFLO0VBQ2hELE1BQU0sa0JBQWtCLHFCQUFxQixNQUFNO0VBQ25ELElBQUksZ0JBQWdCLEtBQUssSUFBSSxlQUFlLEdBQUcsR0FBRyxLQUFLLElBQUksZUFBZSxDQUFDLElBQUksb0JBQW9CO0FBQ25HLE9BQUssSUFBSSxNQUFNLGNBQWM7Ozs7O0NBSy9CLE9BQU8sTUFBTTtBQUNYLE1BQUksQ0FBQyxrQkFBa0IsS0FBSyxDQUMxQjtBQUVGLE1BQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUNqQjtFQUVGLE1BQU0saUJBQWlCLG9CQUFvQixLQUFLO0FBQ2hELFNBQU8sS0FBSyxvQkFBb0I7QUFDaEMsT0FBSyxrQkFBa0IsT0FBTyxlQUFlOzs7Ozs7Q0FNL0MsUUFBUSxVQUFVLFNBQVM7QUFDekIsT0FBSyxNQUFNLENBQUMsTUFBTSxVQUFVLEtBQUssU0FBUyxDQUN4QyxVQUFTLEtBQUssU0FBUyxPQUFPLE1BQU0sS0FBSzs7Ozs7OztDQVE3QyxlQUFlO0VBQ2IsTUFBTSxrQkFBa0IsS0FBSyxJQUFJLGFBQWE7QUFDOUMsTUFBSSxvQkFBb0IsS0FDdEIsUUFBTyxFQUFFO0FBRVgsTUFBSSxvQkFBb0IsR0FDdEIsUUFBTyxDQUFDLEdBQUc7QUFFYixVQUFRLEdBQUcseUJBQXlCLG9CQUFvQixnQkFBZ0I7OztBQWM1RSxTQUFTLGNBQWMsU0FBUztDQUM5QixNQUFNLGNBQWMsRUFBRTtBQUN0QixTQUFRLFNBQVMsT0FBTyxTQUFTO0VBQy9CLE1BQU0sZ0JBQWdCLE1BQU0sU0FBUyxJQUFJLEdBQUcsTUFBTSxNQUFNLElBQUksQ0FBQyxLQUFLLFdBQVcsT0FBTyxNQUFNLENBQUMsR0FBRztBQUM5RixjQUFZLEtBQUssQ0FBQyxNQUFNLGNBQWMsQ0FBQztHQUN2QztBQUNGLFFBQU87Ozs7O0FDdmJULE9BQU8sZUFBYSxnQkFBZSxXQUFXLFNBQU8sV0FBVyxVQUFRLFlBQWEsV0FBVyxTQUFPLFdBQVcsVUFBUTtBQUMxSCxJQUFJLFdBQVcsT0FBTztBQUN0QixJQUFJLFlBQVksT0FBTztBQUN2QixJQUFJLG1CQUFtQixPQUFPO0FBQzlCLElBQUksb0JBQW9CLE9BQU87QUFDL0IsSUFBSSxlQUFlLE9BQU87QUFDMUIsSUFBSSxlQUFlLE9BQU8sVUFBVTtBQUNwQyxJQUFJLFNBQVMsSUFBSSxRQUFRLFNBQVMsU0FBUztBQUN6QyxRQUFPLE9BQU8sT0FBTyxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsQ0FBQyxLQUFLLEtBQUssRUFBRSxHQUFHOztBQUVsRSxJQUFJLGNBQWMsSUFBSSxRQUFRLFNBQVMsWUFBWTtBQUNqRCxRQUFPLFFBQVEsR0FBRyxHQUFHLGtCQUFrQixHQUFHLENBQUMsTUFBTSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxTQUFTLElBQUksRUFBRSxJQUFJOztBQUU3RixJQUFJLFlBQVksUUFBUSxRQUFRO0FBQzlCLE1BQUssSUFBSSxRQUFRLElBQ2YsV0FBVSxRQUFRLE1BQU07RUFBRSxLQUFLLElBQUk7RUFBTyxZQUFZO0VBQU0sQ0FBQzs7QUFFakUsSUFBSSxlQUFlLElBQUksTUFBTSxRQUFRLFNBQVM7QUFDNUMsS0FBSSxRQUFRLE9BQU8sU0FBUyxZQUFZLE9BQU8sU0FBUyxZQUN0RDtPQUFLLElBQUksT0FBTyxrQkFBa0IsS0FBSyxDQUNyQyxLQUFJLENBQUMsYUFBYSxLQUFLLElBQUksSUFBSSxJQUFJLFFBQVEsT0FDekMsV0FBVSxJQUFJLEtBQUs7R0FBRSxXQUFXLEtBQUs7R0FBTSxZQUFZLEVBQUUsT0FBTyxpQkFBaUIsTUFBTSxJQUFJLEtBQUssS0FBSztHQUFZLENBQUM7O0FBRXhILFFBQU87O0FBRVQsSUFBSSxXQUFXLEtBQUssWUFBWSxZQUFZLFNBQVMsT0FBTyxPQUFPLFNBQVMsYUFBYSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFLbkcsVUFBVSxRQUFRLFdBQVc7Q0FBRSxPQUFPO0NBQUssWUFBWTtDQUFNLENBQUMsRUFDOUQsSUFDRDtBQUNELElBQUksZ0JBQWdCLFFBQVEsWUFBWSxVQUFVLEVBQUUsRUFBRSxjQUFjLEVBQUUsT0FBTyxNQUFNLENBQUMsRUFBRSxJQUFJO0FBRzFGLElBQUksb0JBQW9CLFdBQVcsRUFDakMsMkVBQTJFLFNBQVM7QUFDbEYsU0FBUSxhQUFhO0FBQ3JCLFNBQVEsY0FBYztBQUN0QixTQUFRLGdCQUFnQjtDQUN4QixJQUFJLFNBQVMsRUFBRTtDQUNmLElBQUksWUFBWSxFQUFFO0NBQ2xCLElBQUksTUFBTSxPQUFPLGVBQWUsY0FBYyxhQUFhO0NBQzNELElBQUksT0FBTztBQUNYLE1BQUssSUFBSSxHQUFHLE1BQU0sS0FBSyxRQUFRLElBQUksS0FBSyxFQUFFLEdBQUc7QUFDM0MsU0FBTyxLQUFLLEtBQUs7QUFDakIsWUFBVSxLQUFLLFdBQVcsRUFBRSxJQUFJOztDQUVsQyxJQUFJO0NBQ0osSUFBSTtBQUNKLFdBQVUsSUFBSSxXQUFXLEVBQUUsSUFBSTtBQUMvQixXQUFVLElBQUksV0FBVyxFQUFFLElBQUk7Q0FDL0IsU0FBUyxRQUFRLEtBQUs7RUFDcEIsSUFBSSxPQUFPLElBQUk7QUFDZixNQUFJLE9BQU8sSUFBSSxFQUNiLE9BQU0sSUFBSSxNQUFNLGlEQUFpRDtFQUVuRSxJQUFJLFdBQVcsSUFBSSxRQUFRLElBQUk7QUFDL0IsTUFBSSxhQUFhLEdBQUksWUFBVztFQUNoQyxJQUFJLGtCQUFrQixhQUFhLE9BQU8sSUFBSSxJQUFJLFdBQVc7QUFDN0QsU0FBTyxDQUFDLFVBQVUsZ0JBQWdCOztDQUVwQyxTQUFTLFdBQVcsS0FBSztFQUN2QixJQUFJLE9BQU8sUUFBUSxJQUFJO0VBQ3ZCLElBQUksV0FBVyxLQUFLO0VBQ3BCLElBQUksa0JBQWtCLEtBQUs7QUFDM0IsVUFBUSxXQUFXLG1CQUFtQixJQUFJLElBQUk7O0NBRWhELFNBQVMsWUFBWSxLQUFLLFVBQVUsaUJBQWlCO0FBQ25ELFVBQVEsV0FBVyxtQkFBbUIsSUFBSSxJQUFJOztDQUVoRCxTQUFTLFlBQVksS0FBSztFQUN4QixJQUFJO0VBQ0osSUFBSSxPQUFPLFFBQVEsSUFBSTtFQUN2QixJQUFJLFdBQVcsS0FBSztFQUNwQixJQUFJLGtCQUFrQixLQUFLO0VBQzNCLElBQUksTUFBTSxJQUFJLElBQUksWUFBWSxLQUFLLFVBQVUsZ0JBQWdCLENBQUM7RUFDOUQsSUFBSSxVQUFVO0VBQ2QsSUFBSSxPQUFPLGtCQUFrQixJQUFJLFdBQVcsSUFBSTtFQUNoRCxJQUFJO0FBQ0osT0FBSyxLQUFLLEdBQUcsS0FBSyxNQUFNLE1BQU0sR0FBRztBQUMvQixTQUFNLFVBQVUsSUFBSSxXQUFXLEdBQUcsS0FBSyxLQUFLLFVBQVUsSUFBSSxXQUFXLEtBQUssRUFBRSxLQUFLLEtBQUssVUFBVSxJQUFJLFdBQVcsS0FBSyxFQUFFLEtBQUssSUFBSSxVQUFVLElBQUksV0FBVyxLQUFLLEVBQUU7QUFDL0osT0FBSSxhQUFhLE9BQU8sS0FBSztBQUM3QixPQUFJLGFBQWEsT0FBTyxJQUFJO0FBQzVCLE9BQUksYUFBYSxNQUFNOztBQUV6QixNQUFJLG9CQUFvQixHQUFHO0FBQ3pCLFNBQU0sVUFBVSxJQUFJLFdBQVcsR0FBRyxLQUFLLElBQUksVUFBVSxJQUFJLFdBQVcsS0FBSyxFQUFFLEtBQUs7QUFDaEYsT0FBSSxhQUFhLE1BQU07O0FBRXpCLE1BQUksb0JBQW9CLEdBQUc7QUFDekIsU0FBTSxVQUFVLElBQUksV0FBVyxHQUFHLEtBQUssS0FBSyxVQUFVLElBQUksV0FBVyxLQUFLLEVBQUUsS0FBSyxJQUFJLFVBQVUsSUFBSSxXQUFXLEtBQUssRUFBRSxLQUFLO0FBQzFILE9BQUksYUFBYSxPQUFPLElBQUk7QUFDNUIsT0FBSSxhQUFhLE1BQU07O0FBRXpCLFNBQU87O0NBRVQsU0FBUyxnQkFBZ0IsS0FBSztBQUM1QixTQUFPLE9BQU8sT0FBTyxLQUFLLE1BQU0sT0FBTyxPQUFPLEtBQUssTUFBTSxPQUFPLE9BQU8sSUFBSSxNQUFNLE9BQU8sTUFBTTs7Q0FFaEcsU0FBUyxZQUFZLE9BQU8sT0FBTyxLQUFLO0VBQ3RDLElBQUk7RUFDSixJQUFJLFNBQVMsRUFBRTtBQUNmLE9BQUssSUFBSSxLQUFLLE9BQU8sS0FBSyxLQUFLLE1BQU0sR0FBRztBQUN0QyxVQUFPLE1BQU0sT0FBTyxLQUFLLGFBQWEsTUFBTSxLQUFLLE1BQU0sSUFBSSxVQUFVLE1BQU0sS0FBSyxLQUFLO0FBQ3JGLFVBQU8sS0FBSyxnQkFBZ0IsSUFBSSxDQUFDOztBQUVuQyxTQUFPLE9BQU8sS0FBSyxHQUFHOztDQUV4QixTQUFTLGVBQWUsT0FBTztFQUM3QixJQUFJO0VBQ0osSUFBSSxPQUFPLE1BQU07RUFDakIsSUFBSSxhQUFhLE9BQU87RUFDeEIsSUFBSSxRQUFRLEVBQUU7RUFDZCxJQUFJLGlCQUFpQjtBQUNyQixPQUFLLElBQUksS0FBSyxHQUFHLFFBQVEsT0FBTyxZQUFZLEtBQUssT0FBTyxNQUFNLGVBQzVELE9BQU0sS0FBSyxZQUFZLE9BQU8sSUFBSSxLQUFLLGlCQUFpQixRQUFRLFFBQVEsS0FBSyxlQUFlLENBQUM7QUFFL0YsTUFBSSxlQUFlLEdBQUc7QUFDcEIsU0FBTSxNQUFNLE9BQU87QUFDbkIsU0FBTSxLQUNKLE9BQU8sT0FBTyxLQUFLLE9BQU8sT0FBTyxJQUFJLE1BQU0sS0FDNUM7YUFDUSxlQUFlLEdBQUc7QUFDM0IsVUFBTyxNQUFNLE9BQU8sTUFBTSxLQUFLLE1BQU0sT0FBTztBQUM1QyxTQUFNLEtBQ0osT0FBTyxPQUFPLE1BQU0sT0FBTyxPQUFPLElBQUksTUFBTSxPQUFPLE9BQU8sSUFBSSxNQUFNLElBQ3JFOztBQUVILFNBQU8sTUFBTSxLQUFLLEdBQUc7O0dBRzFCLENBQUM7QUFHRixJQUFJLGdCQUFnQixXQUFXLEVBQzdCLDJFQUEyRSxTQUFTLFFBQVE7QUFDMUYsUUFBTyxVQUFVO0VBQ2YsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1AsT0FBTztFQUNQLE9BQU87RUFDUCxPQUFPO0VBQ1I7R0FFSixDQUFDO0FBR0YsSUFBSSxtQkFBbUIsV0FBVyxFQUNoQyx5RUFBeUUsU0FBUyxRQUFRO0NBQ3hGLElBQUksUUFBUSxlQUFlO0FBQzNCLFFBQU8sVUFBVTtBQUNqQixTQUFRLFVBQVU7QUFDbEIsU0FBUSxPQUFPLDZCQUE2QixNQUFNO0FBQ2xELFNBQVEsUUFBUSxxQkFBcUIsTUFBTTtBQUMzQyxTQUFRLFdBQVc7RUFDakIsS0FBSztFQUNMLEtBQUs7RUFDTCxLQUFLO0VBQ0wsS0FBSztFQUNMLEtBQUs7RUFDTCxLQUFLO0VBQ0wsS0FBSztFQUNOO0FBQ0QsU0FBUSxRQUFRO0VBQ2QsS0FBSztFQUNMLEtBQUs7RUFDTCxLQUFLO0VBQ047QUFDRCxTQUFRLFFBQVE7RUFDZCxLQUFLO0VBQ0wsS0FBSztFQUNMLEtBQUs7RUFDTjtDQUNELFNBQVMsNkJBQTZCLFFBQVE7RUFDNUMsSUFBSSxNQUFNLEVBQUU7QUFDWixTQUFPLEtBQUssT0FBTyxDQUFDLFFBQVEsU0FBUyxZQUFZLE1BQU07R0FDckQsSUFBSSxVQUFVLE9BQU87R0FDckIsSUFBSSxVQUFVLE9BQU8sS0FBSztBQUMxQixPQUFJLFFBQVEsYUFBYSxJQUFJO0lBQzdCO0FBQ0YsU0FBTzs7Q0FFVCxTQUFTLHFCQUFxQixRQUFRO0FBQ3BDLFNBQU8sT0FBTyxLQUFLLE9BQU8sQ0FBQyxJQUFJLFNBQVMsUUFBUSxNQUFNO0FBQ3BELFVBQU8sT0FBTyxLQUFLO0lBQ25COztDQUVKLFNBQVMsY0FBYyxTQUFTO0VBQzlCLElBQUksTUFBTSxRQUFRLGFBQWE7QUFDL0IsTUFBSSxDQUFDLE9BQU8sVUFBVSxlQUFlLEtBQUssUUFBUSxNQUFNLElBQUksQ0FDMUQsT0FBTSxJQUFJLE1BQU0sK0JBQThCLFVBQVUsS0FBSTtBQUU5RCxTQUFPLFFBQVEsS0FBSzs7Q0FFdEIsU0FBUyxpQkFBaUIsTUFBTTtBQUM5QixNQUFJLENBQUMsT0FBTyxVQUFVLGVBQWUsS0FBSyxRQUFRLFNBQVMsS0FBSyxDQUM5RCxPQUFNLElBQUksTUFBTSwwQkFBMEIsS0FBSztBQUVqRCxTQUFPLFFBQVEsUUFBUTs7Q0FFekIsU0FBUyxRQUFRLE1BQU07QUFDckIsTUFBSSxPQUFPLFNBQVMsU0FDbEIsUUFBTyxpQkFBaUIsS0FBSztBQUUvQixNQUFJLE9BQU8sU0FBUyxTQUNsQixPQUFNLElBQUksVUFBVSxrQ0FBa0M7RUFFeEQsSUFBSSxJQUFJLFNBQVMsTUFBTSxHQUFHO0FBQzFCLE1BQUksQ0FBQyxNQUFNLEVBQUUsQ0FDWCxRQUFPLGlCQUFpQixFQUFFO0FBRTVCLFNBQU8sY0FBYyxLQUFLOztHQUcvQixDQUFDO0FBR0YsSUFBSSxvQkFBb0IsRUFBRTtBQUMxQixTQUFTLG1CQUFtQixFQUMxQixlQUFlLFNBQ2hCLENBQUM7QUFDRixJQUFJO0FBQ0osSUFBSSxpQkFBaUIsTUFBTSxFQUN6QixxQkFBcUI7QUFDbkIsV0FBVSxFQUFFO0dBRWYsQ0FBQztBQUdGLElBQUksdUJBQXVCLFdBQVcsRUFDcEMsNkZBQTZGLFNBQVMsUUFBUTtBQUM1RyxRQUFPLFdBQVcsZ0JBQWdCLEVBQUUsYUFBYSxrQkFBa0IsRUFBRTtHQUV4RSxDQUFDO0FBR0YsSUFBSSx5QkFBeUIsV0FBVyxFQUN0QyxzRkFBc0YsU0FBUyxRQUFRO0NBQ3JHLElBQUksU0FBUyxPQUFPLFFBQVEsY0FBYyxJQUFJO0NBQzlDLElBQUksb0JBQW9CLE9BQU8sNEJBQTRCLFNBQVMsT0FBTyx5QkFBeUIsSUFBSSxXQUFXLE9BQU8sR0FBRztDQUM3SCxJQUFJLFVBQVUsVUFBVSxxQkFBcUIsT0FBTyxrQkFBa0IsUUFBUSxhQUFhLGtCQUFrQixNQUFNO0NBQ25ILElBQUksYUFBYSxVQUFVLElBQUksVUFBVTtDQUN6QyxJQUFJLFNBQVMsT0FBTyxRQUFRLGNBQWMsSUFBSTtDQUM5QyxJQUFJLG9CQUFvQixPQUFPLDRCQUE0QixTQUFTLE9BQU8seUJBQXlCLElBQUksV0FBVyxPQUFPLEdBQUc7Q0FDN0gsSUFBSSxVQUFVLFVBQVUscUJBQXFCLE9BQU8sa0JBQWtCLFFBQVEsYUFBYSxrQkFBa0IsTUFBTTtDQUNuSCxJQUFJLGFBQWEsVUFBVSxJQUFJLFVBQVU7Q0FFekMsSUFBSSxhQURhLE9BQU8sWUFBWSxjQUFjLFFBQVEsWUFDNUIsUUFBUSxVQUFVLE1BQU07Q0FFdEQsSUFBSSxhQURhLE9BQU8sWUFBWSxjQUFjLFFBQVEsWUFDNUIsUUFBUSxVQUFVLE1BQU07Q0FFdEQsSUFBSSxlQURhLE9BQU8sWUFBWSxjQUFjLFFBQVEsWUFDMUIsUUFBUSxVQUFVLFFBQVE7Q0FDMUQsSUFBSSxpQkFBaUIsUUFBUSxVQUFVO0NBQ3ZDLElBQUksaUJBQWlCLE9BQU8sVUFBVTtDQUN0QyxJQUFJLG1CQUFtQixTQUFTLFVBQVU7Q0FDMUMsSUFBSSxTQUFTLE9BQU8sVUFBVTtDQUM5QixJQUFJLFNBQVMsT0FBTyxVQUFVO0NBQzlCLElBQUksV0FBVyxPQUFPLFVBQVU7Q0FDaEMsSUFBSSxlQUFlLE9BQU8sVUFBVTtDQUNwQyxJQUFJLGVBQWUsT0FBTyxVQUFVO0NBQ3BDLElBQUksUUFBUSxPQUFPLFVBQVU7Q0FDN0IsSUFBSSxVQUFVLE1BQU0sVUFBVTtDQUM5QixJQUFJLFFBQVEsTUFBTSxVQUFVO0NBQzVCLElBQUksWUFBWSxNQUFNLFVBQVU7Q0FDaEMsSUFBSSxTQUFTLEtBQUs7Q0FDbEIsSUFBSSxnQkFBZ0IsT0FBTyxXQUFXLGFBQWEsT0FBTyxVQUFVLFVBQVU7Q0FDOUUsSUFBSSxPQUFPLE9BQU87Q0FDbEIsSUFBSSxjQUFjLE9BQU8sV0FBVyxjQUFjLE9BQU8sT0FBTyxhQUFhLFdBQVcsT0FBTyxVQUFVLFdBQVc7Q0FDcEgsSUFBSSxvQkFBb0IsT0FBTyxXQUFXLGNBQWMsT0FBTyxPQUFPLGFBQWE7Q0FDbkYsSUFBSSxjQUFjLE9BQU8sV0FBVyxjQUFjLE9BQU8sZ0JBQWdCLE9BQU8sT0FBTyxnQkFBZ0Isb0JBQW9CLFdBQVcsWUFBWSxPQUFPLGNBQWM7Q0FDdkssSUFBSSxlQUFlLE9BQU8sVUFBVTtDQUNwQyxJQUFJLE9BQU8sT0FBTyxZQUFZLGFBQWEsUUFBUSxpQkFBaUIsT0FBTyxvQkFBb0IsRUFBRSxDQUFDLGNBQWMsTUFBTSxZQUFZLFNBQVMsR0FBRztBQUM1SSxTQUFPLEVBQUU7S0FDUDtDQUNKLFNBQVMsb0JBQW9CLEtBQUssS0FBSztBQUNyQyxNQUFJLFFBQVEsWUFBWSxRQUFRLGFBQWEsUUFBUSxPQUFPLE9BQU8sTUFBTSxRQUFRLE1BQU0sT0FBTyxNQUFNLEtBQUssS0FBSyxJQUFJLENBQ2hILFFBQU87RUFFVCxJQUFJLFdBQVc7QUFDZixNQUFJLE9BQU8sUUFBUSxVQUFVO0dBQzNCLElBQUksTUFBTSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sSUFBSTtBQUMvQyxPQUFJLFFBQVEsS0FBSztJQUNmLElBQUksU0FBUyxPQUFPLElBQUk7SUFDeEIsSUFBSSxNQUFNLE9BQU8sS0FBSyxLQUFLLE9BQU8sU0FBUyxFQUFFO0FBQzdDLFdBQU8sU0FBUyxLQUFLLFFBQVEsVUFBVSxNQUFNLEdBQUcsTUFBTSxTQUFTLEtBQUssU0FBUyxLQUFLLEtBQUssZUFBZSxNQUFNLEVBQUUsTUFBTSxHQUFHOzs7QUFHM0gsU0FBTyxTQUFTLEtBQUssS0FBSyxVQUFVLE1BQU07O0NBRTVDLElBQUksY0FBYyxzQkFBc0I7Q0FDeEMsSUFBSSxnQkFBZ0IsWUFBWTtDQUNoQyxJQUFJLGdCQUFnQixTQUFTLGNBQWMsR0FBRyxnQkFBZ0I7Q0FDOUQsSUFBSSxTQUFTO0VBQ1gsV0FBVztFQUNYLFVBQVU7RUFDVixRQUFRO0VBQ1Q7Q0FDRCxJQUFJLFdBQVc7RUFDYixXQUFXO0VBQ1gsVUFBVTtFQUNWLFFBQVE7RUFDVDtBQUNELFFBQU8sVUFBVSxTQUFTLFNBQVMsS0FBSyxTQUFTLE9BQU8sTUFBTTtFQUM1RCxJQUFJLE9BQU8sV0FBVyxFQUFFO0FBQ3hCLE1BQUksSUFBSSxNQUFNLGFBQWEsSUFBSSxDQUFDLElBQUksUUFBUSxLQUFLLFdBQVcsQ0FDMUQsT0FBTSxJQUFJLFVBQVUseURBQW1EO0FBRXpFLE1BQUksSUFBSSxNQUFNLGtCQUFrQixLQUFLLE9BQU8sS0FBSyxvQkFBb0IsV0FBVyxLQUFLLGtCQUFrQixLQUFLLEtBQUssb0JBQW9CLFdBQVcsS0FBSyxvQkFBb0IsTUFDdkssT0FBTSxJQUFJLFVBQVUsMkZBQXlGO0VBRS9HLElBQUksZ0JBQWdCLElBQUksTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLGdCQUFnQjtBQUN0RSxNQUFJLE9BQU8sa0JBQWtCLGFBQWEsa0JBQWtCLFNBQzFELE9BQU0sSUFBSSxVQUFVLGdGQUFnRjtBQUV0RyxNQUFJLElBQUksTUFBTSxTQUFTLElBQUksS0FBSyxXQUFXLFFBQVEsS0FBSyxXQUFXLE9BQU8sRUFBRSxTQUFTLEtBQUssUUFBUSxHQUFHLEtBQUssS0FBSyxVQUFVLEtBQUssU0FBUyxHQUNySSxPQUFNLElBQUksVUFBVSwrREFBMkQ7QUFFakYsTUFBSSxJQUFJLE1BQU0sbUJBQW1CLElBQUksT0FBTyxLQUFLLHFCQUFxQixVQUNwRSxPQUFNLElBQUksVUFBVSxzRUFBb0U7RUFFMUYsSUFBSSxtQkFBbUIsS0FBSztBQUM1QixNQUFJLE9BQU8sUUFBUSxZQUNqQixRQUFPO0FBRVQsTUFBSSxRQUFRLEtBQ1YsUUFBTztBQUVULE1BQUksT0FBTyxRQUFRLFVBQ2pCLFFBQU8sTUFBTSxTQUFTO0FBRXhCLE1BQUksT0FBTyxRQUFRLFNBQ2pCLFFBQU8sY0FBYyxLQUFLLEtBQUs7QUFFakMsTUFBSSxPQUFPLFFBQVEsVUFBVTtBQUMzQixPQUFJLFFBQVEsRUFDVixRQUFPLFdBQVcsTUFBTSxJQUFJLE1BQU07R0FFcEMsSUFBSSxNQUFNLE9BQU8sSUFBSTtBQUNyQixVQUFPLG1CQUFtQixvQkFBb0IsS0FBSyxJQUFJLEdBQUc7O0FBRTVELE1BQUksT0FBTyxRQUFRLFVBQVU7R0FDM0IsSUFBSSxZQUFZLE9BQU8sSUFBSSxHQUFHO0FBQzlCLFVBQU8sbUJBQW1CLG9CQUFvQixLQUFLLFVBQVUsR0FBRzs7RUFFbEUsSUFBSSxXQUFXLE9BQU8sS0FBSyxVQUFVLGNBQWMsSUFBSSxLQUFLO0FBQzVELE1BQUksT0FBTyxVQUFVLFlBQ25CLFNBQVE7QUFFVixNQUFJLFNBQVMsWUFBWSxXQUFXLEtBQUssT0FBTyxRQUFRLFNBQ3RELFFBQU8sUUFBUSxJQUFJLEdBQUcsWUFBWTtFQUVwQyxJQUFJLFNBQVMsVUFBVSxNQUFNLE1BQU07QUFDbkMsTUFBSSxPQUFPLFNBQVMsWUFDbEIsUUFBTyxFQUFFO1dBQ0EsUUFBUSxNQUFNLElBQUksSUFBSSxFQUMvQixRQUFPO0VBRVQsU0FBUyxTQUFTLE9BQU8sTUFBTSxVQUFVO0FBQ3ZDLE9BQUksTUFBTTtBQUNSLFdBQU8sVUFBVSxLQUFLLEtBQUs7QUFDM0IsU0FBSyxLQUFLLEtBQUs7O0FBRWpCLE9BQUksVUFBVTtJQUNaLElBQUksVUFBVSxFQUNaLE9BQU8sS0FBSyxPQUNiO0FBQ0QsUUFBSSxJQUFJLE1BQU0sYUFBYSxDQUN6QixTQUFRLGFBQWEsS0FBSztBQUU1QixXQUFPLFNBQVMsT0FBTyxTQUFTLFFBQVEsR0FBRyxLQUFLOztBQUVsRCxVQUFPLFNBQVMsT0FBTyxNQUFNLFFBQVEsR0FBRyxLQUFLOztBQUUvQyxNQUFJLE9BQU8sUUFBUSxjQUFjLENBQUMsU0FBUyxJQUFJLEVBQUU7R0FDL0MsSUFBSSxPQUFPLE9BQU8sSUFBSTtHQUN0QixJQUFJLE9BQU8sV0FBVyxLQUFLLFNBQVM7QUFDcEMsVUFBTyxlQUFlLE9BQU8sT0FBTyxPQUFPLGtCQUFrQixPQUFPLEtBQUssU0FBUyxJQUFJLFFBQVEsTUFBTSxLQUFLLE1BQU0sS0FBSyxHQUFHLE9BQU87O0FBRWhJLE1BQUksU0FBUyxJQUFJLEVBQUU7R0FDakIsSUFBSSxZQUFZLG9CQUFvQixTQUFTLEtBQUssT0FBTyxJQUFJLEVBQUUsMEJBQTBCLEtBQUssR0FBRyxZQUFZLEtBQUssSUFBSTtBQUN0SCxVQUFPLE9BQU8sUUFBUSxZQUFZLENBQUMsb0JBQW9CLFVBQVUsVUFBVSxHQUFHOztBQUVoRixNQUFJLFVBQVUsSUFBSSxFQUFFO0dBQ2xCLElBQUksSUFBSSxNQUFNLGFBQWEsS0FBSyxPQUFPLElBQUksU0FBUyxDQUFDO0dBQ3JELElBQUksUUFBUSxJQUFJLGNBQWMsRUFBRTtBQUNoQyxRQUFLLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLElBQ2hDLE1BQUssTUFBTSxNQUFNLEdBQUcsT0FBTyxNQUFNLFdBQVcsTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFLFVBQVUsS0FBSztBQUVwRixRQUFLO0FBQ0wsT0FBSSxJQUFJLGNBQWMsSUFBSSxXQUFXLE9BQ25DLE1BQUs7QUFFUCxRQUFLLE9BQU8sYUFBYSxLQUFLLE9BQU8sSUFBSSxTQUFTLENBQUMsR0FBRztBQUN0RCxVQUFPOztBQUVULE1BQUksUUFBUSxJQUFJLEVBQUU7QUFDaEIsT0FBSSxJQUFJLFdBQVcsRUFDakIsUUFBTztHQUVULElBQUksS0FBSyxXQUFXLEtBQUssU0FBUztBQUNsQyxPQUFJLFVBQVUsQ0FBQyxpQkFBaUIsR0FBRyxDQUNqQyxRQUFPLE1BQU0sYUFBYSxJQUFJLE9BQU8sR0FBRztBQUUxQyxVQUFPLE9BQU8sTUFBTSxLQUFLLElBQUksS0FBSyxHQUFHOztBQUV2QyxNQUFJLFFBQVEsSUFBSSxFQUFFO0dBQ2hCLElBQUksUUFBUSxXQUFXLEtBQUssU0FBUztBQUNyQyxPQUFJLEVBQUUsV0FBVyxNQUFNLGNBQWMsV0FBVyxPQUFPLENBQUMsYUFBYSxLQUFLLEtBQUssUUFBUSxDQUNyRixRQUFPLFFBQVEsT0FBTyxJQUFJLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxLQUFLLGNBQWMsU0FBUyxJQUFJLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxHQUFHO0FBRWpILE9BQUksTUFBTSxXQUFXLEVBQ25CLFFBQU8sTUFBTSxPQUFPLElBQUksR0FBRztBQUU3QixVQUFPLFFBQVEsT0FBTyxJQUFJLEdBQUcsT0FBTyxNQUFNLEtBQUssT0FBTyxLQUFLLEdBQUc7O0FBRWhFLE1BQUksT0FBTyxRQUFRLFlBQVksZUFDN0I7T0FBSSxpQkFBaUIsT0FBTyxJQUFJLG1CQUFtQixjQUFjLFlBQy9ELFFBQU8sWUFBWSxLQUFLLEVBQUUsT0FBTyxXQUFXLE9BQU8sQ0FBQztZQUMzQyxrQkFBa0IsWUFBWSxPQUFPLElBQUksWUFBWSxXQUM5RCxRQUFPLElBQUksU0FBUzs7QUFHeEIsTUFBSSxNQUFNLElBQUksRUFBRTtHQUNkLElBQUksV0FBVyxFQUFFO0FBQ2pCLE9BQUksV0FDRixZQUFXLEtBQUssS0FBSyxTQUFTLE9BQU8sS0FBSztBQUN4QyxhQUFTLEtBQUssU0FBUyxLQUFLLEtBQUssS0FBSyxHQUFHLFNBQVMsU0FBUyxPQUFPLElBQUksQ0FBQztLQUN2RTtBQUVKLFVBQU8sYUFBYSxPQUFPLFFBQVEsS0FBSyxJQUFJLEVBQUUsVUFBVSxPQUFPOztBQUVqRSxNQUFJLE1BQU0sSUFBSSxFQUFFO0dBQ2QsSUFBSSxXQUFXLEVBQUU7QUFDakIsT0FBSSxXQUNGLFlBQVcsS0FBSyxLQUFLLFNBQVMsT0FBTztBQUNuQyxhQUFTLEtBQUssU0FBUyxPQUFPLElBQUksQ0FBQztLQUNuQztBQUVKLFVBQU8sYUFBYSxPQUFPLFFBQVEsS0FBSyxJQUFJLEVBQUUsVUFBVSxPQUFPOztBQUVqRSxNQUFJLFVBQVUsSUFBSSxDQUNoQixRQUFPLGlCQUFpQixVQUFVO0FBRXBDLE1BQUksVUFBVSxJQUFJLENBQ2hCLFFBQU8saUJBQWlCLFVBQVU7QUFFcEMsTUFBSSxVQUFVLElBQUksQ0FDaEIsUUFBTyxpQkFBaUIsVUFBVTtBQUVwQyxNQUFJLFNBQVMsSUFBSSxDQUNmLFFBQU8sVUFBVSxTQUFTLE9BQU8sSUFBSSxDQUFDLENBQUM7QUFFekMsTUFBSSxTQUFTLElBQUksQ0FDZixRQUFPLFVBQVUsU0FBUyxjQUFjLEtBQUssSUFBSSxDQUFDLENBQUM7QUFFckQsTUFBSSxVQUFVLElBQUksQ0FDaEIsUUFBTyxVQUFVLGVBQWUsS0FBSyxJQUFJLENBQUM7QUFFNUMsTUFBSSxTQUFTLElBQUksQ0FDZixRQUFPLFVBQVUsU0FBUyxPQUFPLElBQUksQ0FBQyxDQUFDO0FBRXpDLE1BQUksT0FBTyxXQUFXLGVBQWUsUUFBUSxPQUMzQyxRQUFPO0FBRVQsTUFBSSxPQUFPLGVBQWUsZUFBZSxRQUFRLGNBQWMsT0FBTyxXQUFXLGVBQWUsUUFBUSxPQUN0RyxRQUFPO0FBRVQsTUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUU7R0FDbEMsSUFBSSxLQUFLLFdBQVcsS0FBSyxTQUFTO0dBQ2xDLElBQUksZ0JBQWdCLE1BQU0sSUFBSSxJQUFJLEtBQUssT0FBTyxZQUFZLGVBQWUsVUFBVSxJQUFJLGdCQUFnQjtHQUN2RyxJQUFJLFdBQVcsZUFBZSxTQUFTLEtBQUs7R0FDNUMsSUFBSSxZQUFZLENBQUMsaUJBQWlCLGVBQWUsT0FBTyxJQUFJLEtBQUssT0FBTyxlQUFlLE1BQU0sT0FBTyxLQUFLLE1BQU0sSUFBSSxFQUFFLEdBQUcsR0FBRyxHQUFHLFdBQVcsV0FBVztHQUVwSixJQUFJLE9BRGlCLGlCQUFpQixPQUFPLElBQUksZ0JBQWdCLGFBQWEsS0FBSyxJQUFJLFlBQVksT0FBTyxJQUFJLFlBQVksT0FBTyxNQUFNLE9BQzNHLGFBQWEsV0FBVyxNQUFNLE1BQU0sS0FBSyxRQUFRLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsS0FBSyxHQUFHLE9BQU87QUFDdkksT0FBSSxHQUFHLFdBQVcsRUFDaEIsUUFBTyxNQUFNO0FBRWYsT0FBSSxPQUNGLFFBQU8sTUFBTSxNQUFNLGFBQWEsSUFBSSxPQUFPLEdBQUc7QUFFaEQsVUFBTyxNQUFNLE9BQU8sTUFBTSxLQUFLLElBQUksS0FBSyxHQUFHOztBQUU3QyxTQUFPLE9BQU8sSUFBSTs7Q0FFcEIsU0FBUyxXQUFXLEdBQUcsY0FBYyxNQUFNO0VBRXpDLElBQUksWUFBWSxPQURKLEtBQUssY0FBYztBQUUvQixTQUFPLFlBQVksSUFBSTs7Q0FFekIsU0FBUyxNQUFNLEdBQUc7QUFDaEIsU0FBTyxTQUFTLEtBQUssT0FBTyxFQUFFLEVBQUUsTUFBTSxTQUFTOztDQUVqRCxTQUFTLGlCQUFpQixLQUFLO0FBQzdCLFNBQU8sQ0FBQyxlQUFlLEVBQUUsT0FBTyxRQUFRLGFBQWEsZUFBZSxPQUFPLE9BQU8sSUFBSSxpQkFBaUI7O0NBRXpHLFNBQVMsUUFBUSxLQUFLO0FBQ3BCLFNBQU8sTUFBTSxJQUFJLEtBQUssb0JBQW9CLGlCQUFpQixJQUFJOztDQUVqRSxTQUFTLE9BQU8sS0FBSztBQUNuQixTQUFPLE1BQU0sSUFBSSxLQUFLLG1CQUFtQixpQkFBaUIsSUFBSTs7Q0FFaEUsU0FBUyxTQUFTLEtBQUs7QUFDckIsU0FBTyxNQUFNLElBQUksS0FBSyxxQkFBcUIsaUJBQWlCLElBQUk7O0NBRWxFLFNBQVMsUUFBUSxLQUFLO0FBQ3BCLFNBQU8sTUFBTSxJQUFJLEtBQUssb0JBQW9CLGlCQUFpQixJQUFJOztDQUVqRSxTQUFTLFNBQVMsS0FBSztBQUNyQixTQUFPLE1BQU0sSUFBSSxLQUFLLHFCQUFxQixpQkFBaUIsSUFBSTs7Q0FFbEUsU0FBUyxTQUFTLEtBQUs7QUFDckIsU0FBTyxNQUFNLElBQUksS0FBSyxxQkFBcUIsaUJBQWlCLElBQUk7O0NBRWxFLFNBQVMsVUFBVSxLQUFLO0FBQ3RCLFNBQU8sTUFBTSxJQUFJLEtBQUssc0JBQXNCLGlCQUFpQixJQUFJOztDQUVuRSxTQUFTLFNBQVMsS0FBSztBQUNyQixNQUFJLGtCQUNGLFFBQU8sT0FBTyxPQUFPLFFBQVEsWUFBWSxlQUFlO0FBRTFELE1BQUksT0FBTyxRQUFRLFNBQ2pCLFFBQU87QUFFVCxNQUFJLENBQUMsT0FBTyxPQUFPLFFBQVEsWUFBWSxDQUFDLFlBQ3RDLFFBQU87QUFFVCxNQUFJO0FBQ0YsZUFBWSxLQUFLLElBQUk7QUFDckIsVUFBTztXQUNBLEdBQUc7QUFFWixTQUFPOztDQUVULFNBQVMsU0FBUyxLQUFLO0FBQ3JCLE1BQUksQ0FBQyxPQUFPLE9BQU8sUUFBUSxZQUFZLENBQUMsY0FDdEMsUUFBTztBQUVULE1BQUk7QUFDRixpQkFBYyxLQUFLLElBQUk7QUFDdkIsVUFBTztXQUNBLEdBQUc7QUFFWixTQUFPOztDQUVULElBQUksVUFBVSxPQUFPLFVBQVUsa0JBQWtCLFNBQVMsS0FBSztBQUM3RCxTQUFPLE9BQU87O0NBRWhCLFNBQVMsSUFBSSxLQUFLLEtBQUs7QUFDckIsU0FBTyxRQUFRLEtBQUssS0FBSyxJQUFJOztDQUUvQixTQUFTLE1BQU0sS0FBSztBQUNsQixTQUFPLGVBQWUsS0FBSyxJQUFJOztDQUVqQyxTQUFTLE9BQU8sR0FBRztBQUNqQixNQUFJLEVBQUUsS0FDSixRQUFPLEVBQUU7RUFFWCxJQUFJLElBQUksT0FBTyxLQUFLLGlCQUFpQixLQUFLLEVBQUUsRUFBRSx1QkFBdUI7QUFDckUsTUFBSSxFQUNGLFFBQU8sRUFBRTtBQUVYLFNBQU87O0NBRVQsU0FBUyxRQUFRLElBQUksR0FBRztBQUN0QixNQUFJLEdBQUcsUUFDTCxRQUFPLEdBQUcsUUFBUSxFQUFFO0FBRXRCLE9BQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLFFBQVEsSUFBSSxHQUFHLElBQ3BDLEtBQUksR0FBRyxPQUFPLEVBQ1osUUFBTztBQUdYLFNBQU87O0NBRVQsU0FBUyxNQUFNLEdBQUc7QUFDaEIsTUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLE9BQU8sTUFBTSxTQUNqQyxRQUFPO0FBRVQsTUFBSTtBQUNGLFdBQVEsS0FBSyxFQUFFO0FBQ2YsT0FBSTtBQUNGLFlBQVEsS0FBSyxFQUFFO1lBQ1IsR0FBRztBQUNWLFdBQU87O0FBRVQsVUFBTyxhQUFhO1dBQ2IsR0FBRztBQUVaLFNBQU87O0NBRVQsU0FBUyxVQUFVLEdBQUc7QUFDcEIsTUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLE9BQU8sTUFBTSxTQUNwQyxRQUFPO0FBRVQsTUFBSTtBQUNGLGNBQVcsS0FBSyxHQUFHLFdBQVc7QUFDOUIsT0FBSTtBQUNGLGVBQVcsS0FBSyxHQUFHLFdBQVc7WUFDdkIsR0FBRztBQUNWLFdBQU87O0FBRVQsVUFBTyxhQUFhO1dBQ2IsR0FBRztBQUVaLFNBQU87O0NBRVQsU0FBUyxVQUFVLEdBQUc7QUFDcEIsTUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssT0FBTyxNQUFNLFNBQ3RDLFFBQU87QUFFVCxNQUFJO0FBQ0YsZ0JBQWEsS0FBSyxFQUFFO0FBQ3BCLFVBQU87V0FDQSxHQUFHO0FBRVosU0FBTzs7Q0FFVCxTQUFTLE1BQU0sR0FBRztBQUNoQixNQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssT0FBTyxNQUFNLFNBQ2pDLFFBQU87QUFFVCxNQUFJO0FBQ0YsV0FBUSxLQUFLLEVBQUU7QUFDZixPQUFJO0FBQ0YsWUFBUSxLQUFLLEVBQUU7WUFDUixHQUFHO0FBQ1YsV0FBTzs7QUFFVCxVQUFPLGFBQWE7V0FDYixHQUFHO0FBRVosU0FBTzs7Q0FFVCxTQUFTLFVBQVUsR0FBRztBQUNwQixNQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssT0FBTyxNQUFNLFNBQ3BDLFFBQU87QUFFVCxNQUFJO0FBQ0YsY0FBVyxLQUFLLEdBQUcsV0FBVztBQUM5QixPQUFJO0FBQ0YsZUFBVyxLQUFLLEdBQUcsV0FBVztZQUN2QixHQUFHO0FBQ1YsV0FBTzs7QUFFVCxVQUFPLGFBQWE7V0FDYixHQUFHO0FBRVosU0FBTzs7Q0FFVCxTQUFTLFVBQVUsR0FBRztBQUNwQixNQUFJLENBQUMsS0FBSyxPQUFPLE1BQU0sU0FDckIsUUFBTztBQUVULE1BQUksT0FBTyxnQkFBZ0IsZUFBZSxhQUFhLFlBQ3JELFFBQU87QUFFVCxTQUFPLE9BQU8sRUFBRSxhQUFhLFlBQVksT0FBTyxFQUFFLGlCQUFpQjs7Q0FFckUsU0FBUyxjQUFjLEtBQUssTUFBTTtBQUNoQyxNQUFJLElBQUksU0FBUyxLQUFLLGlCQUFpQjtHQUNyQyxJQUFJLFlBQVksSUFBSSxTQUFTLEtBQUs7R0FDbEMsSUFBSSxVQUFVLFNBQVMsWUFBWSxxQkFBcUIsWUFBWSxJQUFJLE1BQU07QUFDOUUsVUFBTyxjQUFjLE9BQU8sS0FBSyxLQUFLLEdBQUcsS0FBSyxnQkFBZ0IsRUFBRSxLQUFLLEdBQUc7O0VBRTFFLElBQUksVUFBVSxTQUFTLEtBQUssY0FBYztBQUMxQyxVQUFRLFlBQVk7QUFFcEIsU0FBTyxXQURDLFNBQVMsS0FBSyxTQUFTLEtBQUssS0FBSyxTQUFTLE9BQU8sRUFBRSxnQkFBZ0IsUUFBUSxFQUM5RCxVQUFVLEtBQUs7O0NBRXRDLFNBQVMsUUFBUSxHQUFHO0VBQ2xCLElBQUksSUFBSSxFQUFFLFdBQVcsRUFBRTtFQUN2QixJQUFJLElBQUk7R0FDTixHQUFHO0dBQ0gsR0FBRztHQUNILElBQUk7R0FDSixJQUFJO0dBQ0osSUFBSTtHQUNMLENBQUM7QUFDRixNQUFJLEVBQ0YsUUFBTyxPQUFPO0FBRWhCLFNBQU8sU0FBUyxJQUFJLEtBQUssTUFBTSxNQUFNLGFBQWEsS0FBSyxFQUFFLFNBQVMsR0FBRyxDQUFDOztDQUV4RSxTQUFTLFVBQVUsS0FBSztBQUN0QixTQUFPLFlBQVksTUFBTTs7Q0FFM0IsU0FBUyxpQkFBaUIsTUFBTTtBQUM5QixTQUFPLE9BQU87O0NBRWhCLFNBQVMsYUFBYSxNQUFNLE1BQU0sU0FBUyxRQUFRO0VBQ2pELElBQUksZ0JBQWdCLFNBQVMsYUFBYSxTQUFTLE9BQU8sR0FBRyxNQUFNLEtBQUssU0FBUyxLQUFLO0FBQ3RGLFNBQU8sT0FBTyxPQUFPLE9BQU8sUUFBUSxnQkFBZ0I7O0NBRXRELFNBQVMsaUJBQWlCLElBQUk7QUFDNUIsT0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsUUFBUSxJQUM3QixLQUFJLFFBQVEsR0FBRyxJQUFJLEtBQUssSUFBSSxFQUMxQixRQUFPO0FBR1gsU0FBTzs7Q0FFVCxTQUFTLFVBQVUsTUFBTSxPQUFPO0VBQzlCLElBQUk7QUFDSixNQUFJLEtBQUssV0FBVyxJQUNsQixjQUFhO1dBQ0osT0FBTyxLQUFLLFdBQVcsWUFBWSxLQUFLLFNBQVMsRUFDMUQsY0FBYSxNQUFNLEtBQUssTUFBTSxLQUFLLFNBQVMsRUFBRSxFQUFFLElBQUk7TUFFcEQsUUFBTztBQUVULFNBQU87R0FDTCxNQUFNO0dBQ04sTUFBTSxNQUFNLEtBQUssTUFBTSxRQUFRLEVBQUUsRUFBRSxXQUFXO0dBQy9DOztDQUVILFNBQVMsYUFBYSxJQUFJLFFBQVE7QUFDaEMsTUFBSSxHQUFHLFdBQVcsRUFDaEIsUUFBTztFQUVULElBQUksYUFBYSxPQUFPLE9BQU8sT0FBTyxPQUFPO0FBQzdDLFNBQU8sYUFBYSxNQUFNLEtBQUssSUFBSSxNQUFNLFdBQVcsR0FBRyxPQUFPLE9BQU87O0NBRXZFLFNBQVMsV0FBVyxLQUFLLFVBQVU7RUFDakMsSUFBSSxRQUFRLFFBQVEsSUFBSTtFQUN4QixJQUFJLEtBQUssRUFBRTtBQUNYLE1BQUksT0FBTztBQUNULE1BQUcsU0FBUyxJQUFJO0FBQ2hCLFFBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLFFBQVEsSUFDOUIsSUFBRyxLQUFLLElBQUksS0FBSyxFQUFFLEdBQUcsU0FBUyxJQUFJLElBQUksSUFBSSxHQUFHOztFQUdsRCxJQUFJLE9BQU8sT0FBTyxTQUFTLGFBQWEsS0FBSyxJQUFJLEdBQUcsRUFBRTtFQUN0RCxJQUFJO0FBQ0osTUFBSSxtQkFBbUI7QUFDckIsWUFBUyxFQUFFO0FBQ1gsUUFBSyxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssUUFBUSxJQUMvQixRQUFPLE1BQU0sS0FBSyxNQUFNLEtBQUs7O0FBR2pDLE9BQUssSUFBSSxPQUFPLEtBQUs7QUFDbkIsT0FBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQ2hCO0FBRUYsT0FBSSxTQUFTLE9BQU8sT0FBTyxJQUFJLENBQUMsS0FBSyxPQUFPLE1BQU0sSUFBSSxPQUNwRDtBQUVGLE9BQUkscUJBQXFCLE9BQU8sTUFBTSxnQkFBZ0IsT0FDcEQ7WUFDUyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQ2xDLElBQUcsS0FBSyxTQUFTLEtBQUssSUFBSSxHQUFHLE9BQU8sU0FBUyxJQUFJLE1BQU0sSUFBSSxDQUFDO09BRTVELElBQUcsS0FBSyxNQUFNLE9BQU8sU0FBUyxJQUFJLE1BQU0sSUFBSSxDQUFDOztBQUdqRCxNQUFJLE9BQU8sU0FBUyxZQUNsQjtRQUFLLElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLElBQy9CLEtBQUksYUFBYSxLQUFLLEtBQUssS0FBSyxHQUFHLENBQ2pDLElBQUcsS0FBSyxNQUFNLFNBQVMsS0FBSyxHQUFHLEdBQUcsUUFBUSxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQzs7QUFJNUUsU0FBTzs7R0FHWixDQUFDO0FBR0YsSUFBSSxlQUFlLE1BQU0sY0FBYztDQUNyQztDQUNBLE9BQU8sb0JBQW9COzs7OztDQUszQixPQUFPLG1CQUFtQjtBQUN4QixTQUFPLGNBQWMsUUFBUSxFQUMzQixVQUFVLENBQ1I7R0FDRSxNQUFNO0dBQ04sZUFBZSxjQUFjO0dBQzlCLENBQ0YsRUFDRixDQUFDOztDQUVKLE9BQU8sZUFBZSxlQUFlO0FBQ25DLE1BQUksY0FBYyxRQUFRLFVBQ3hCLFFBQU87RUFFVCxNQUFNLFdBQVcsY0FBYyxNQUFNO0FBQ3JDLE1BQUksU0FBUyxXQUFXLEVBQ3RCLFFBQU87RUFFVCxNQUFNLGdCQUFnQixTQUFTO0FBQy9CLFNBQU8sY0FBYyxTQUFTLDhCQUE4QixjQUFjLGNBQWMsUUFBUTs7Q0FFbEcsSUFBSSxTQUFTO0FBQ1gsU0FBTyxLQUFLOztDQUVkLElBQUksU0FBUztBQUNYLFNBQU8sT0FBTyxLQUFLLFNBQVMsY0FBYyxrQkFBa0I7O0NBRTlELFlBQVksUUFBUTtBQUNsQixPQUFLLDJCQUEyQjs7Q0FFbEMsT0FBTyxXQUFXLFFBQVE7QUFDeEIsU0FBTyxJQUFJLGNBQWMsT0FBTyxPQUFPLEdBQUcsY0FBYyxrQkFBa0I7OztDQUc1RSxXQUFXO0VBQ1QsTUFBTSxTQUFTLEtBQUs7RUFDcEIsTUFBTSxPQUFPLFNBQVMsSUFBSSxNQUFNO0VBQ2hDLE1BQU0sTUFBTSxTQUFTLElBQUksQ0FBQyxTQUFTO0VBQ25DLE1BQU0sT0FBTyxNQUFNO0VBQ25CLE1BQU0sbUJBQW1CLE1BQU07QUFDL0IsU0FBTyxHQUFHLE9BQU8sS0FBSyxHQUFHLE9BQU8saUJBQWlCLENBQUMsU0FBUyxHQUFHLElBQUk7OztBQUt0RSxJQUFJLFlBQVksTUFBTSxXQUFXO0NBQy9CO0NBQ0EsT0FBTyxvQkFBb0I7Q0FDM0IsSUFBSSx1QkFBdUI7QUFDekIsU0FBTyxLQUFLOztDQUVkLFlBQVksUUFBUTtBQUNsQixPQUFLLHdDQUF3Qzs7Ozs7O0NBTS9DLE9BQU8sbUJBQW1CO0FBQ3hCLFNBQU8sY0FBYyxRQUFRLEVBQzNCLFVBQVUsQ0FDUjtHQUNFLE1BQU07R0FDTixlQUFlLGNBQWM7R0FDOUIsQ0FDRixFQUNGLENBQUM7O0NBRUosT0FBTyxZQUFZLGVBQWU7QUFDaEMsTUFBSSxjQUFjLFFBQVEsVUFDeEIsUUFBTztFQUVULE1BQU0sV0FBVyxjQUFjLE1BQU07QUFDckMsTUFBSSxTQUFTLFdBQVcsRUFDdEIsUUFBTztFQUVULE1BQU0sZ0JBQWdCLFNBQVM7QUFDL0IsU0FBTyxjQUFjLFNBQVMsMkNBQTJDLGNBQWMsY0FBYyxRQUFROzs7OztDQUsvRyxPQUFPLGFBQWEsSUFBSSxXQUFXLEdBQUc7Ozs7Q0FJdEMsT0FBTyxNQUFNO0FBQ1gsU0FBTyxXQUFXLHlCQUF5QixJQUFJLE1BQU0sQ0FBQzs7O0NBR3hELFdBQVc7QUFDVCxTQUFPLEtBQUssdUJBQXVCOzs7OztDQUtyQyxPQUFPLFNBQVMsTUFBTTtFQUNwQixNQUFNLFNBQVMsS0FBSyxTQUFTO0FBRTdCLFNBQU8sSUFBSSxXQURJLE9BQU8sT0FBTyxHQUFHLFdBQVcsa0JBQ2Q7Ozs7Ozs7O0NBUS9CLFNBQVM7RUFFUCxNQUFNLFNBRFMsS0FBSyx3Q0FDSSxXQUFXO0FBQ25DLE1BQUksU0FBUyxPQUFPLE9BQU8saUJBQWlCLElBQUksU0FBUyxPQUFPLE9BQU8saUJBQWlCLENBQ3RGLE9BQU0sSUFBSSxXQUNSLCtEQUNEO0FBRUgsU0FBTyxJQUFJLEtBQUssT0FBTyxPQUFPLENBQUM7Ozs7Ozs7Ozs7Q0FVakMsY0FBYztFQUNaLE1BQU0sU0FBUyxLQUFLO0VBQ3BCLE1BQU0sU0FBUyxTQUFTLFdBQVc7QUFDbkMsTUFBSSxTQUFTLE9BQU8sT0FBTyxpQkFBaUIsSUFBSSxTQUFTLE9BQU8sT0FBTyxpQkFBaUIsQ0FDdEYsT0FBTSxJQUFJLFdBQ1IsNEVBQ0Q7RUFHSCxNQUFNLFVBRE8sSUFBSSxLQUFLLE9BQU8sT0FBTyxDQUFDLENBQ2hCLGFBQWE7RUFDbEMsTUFBTSxrQkFBa0IsS0FBSyxJQUFJLE9BQU8sU0FBUyxTQUFTLENBQUM7RUFDM0QsTUFBTSxpQkFBaUIsT0FBTyxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsSUFBSTtBQUMvRCxTQUFPLFFBQVEsUUFBUSxhQUFhLElBQUksZUFBZSxHQUFHOztDQUU1RCxNQUFNLE9BQU87QUFDWCxTQUFPLElBQUksYUFDVCxLQUFLLHdDQUF3QyxNQUFNLHNDQUNwRDs7O0FBS0wsSUFBSSxPQUFPLE1BQU0sTUFBTTtDQUNyQjs7Ozs7Ozs7Ozs7O0NBWUEsT0FBTyxNQUFNLElBQUksTUFBTSxHQUFHO0NBQzFCLE9BQU8sa0JBQWtCOzs7Ozs7Ozs7Ozs7Q0FZekIsT0FBTyxNQUFNLElBQUksTUFBTSxNQUFNLGdCQUFnQjs7Ozs7OztDQU83QyxZQUFZLEdBQUc7QUFDYixNQUFJLElBQUksTUFBTSxJQUFJLE1BQU0sZ0JBQ3RCLE9BQU0sSUFBSSxNQUFNLHdEQUF3RDtBQUUxRSxPQUFLLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FzQmxCLE9BQU8sa0JBQWtCLE9BQU87QUFDOUIsTUFBSSxNQUFNLFdBQVcsR0FBSSxPQUFNLElBQUksTUFBTSw0QkFBNEI7RUFDckUsTUFBTSxNQUFNLElBQUksV0FBVyxNQUFNO0FBQ2pDLE1BQUksS0FBSyxJQUFJLEtBQUssS0FBSztBQUN2QixNQUFJLEtBQUssSUFBSSxLQUFLLEtBQUs7QUFDdkIsU0FBTyxJQUFJLE1BQU0sTUFBTSxjQUFjLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBNkM1QyxPQUFPLGNBQWMsU0FBUyxLQUFLLGFBQWE7QUFDOUMsTUFBSSxZQUFZLFdBQVcsRUFDekIsT0FBTSxJQUFJLE1BQU0scURBQXFEO0FBRXZFLE1BQUksUUFBUSxRQUFRLEVBQ2xCLE9BQU0sSUFBSSxNQUFNLHNEQUFzRDtBQUV4RSxNQUFJLElBQUksd0NBQXdDLEVBQzlDLE9BQU0sSUFBSSxNQUFNLGdEQUFnRDtFQUVsRSxNQUFNLGFBQWEsUUFBUTtBQUMzQixVQUFRLFFBQVEsYUFBYSxJQUFJO0VBQ2pDLE1BQU0sT0FBTyxJQUFJLFVBQVUsR0FBRztFQUM5QixNQUFNLFFBQVEsSUFBSSxXQUFXLEdBQUc7QUFDaEMsUUFBTSxLQUFLLE9BQU8sUUFBUSxNQUFNLEtBQU07QUFDdEMsUUFBTSxLQUFLLE9BQU8sUUFBUSxNQUFNLEtBQU07QUFDdEMsUUFBTSxLQUFLLE9BQU8sUUFBUSxNQUFNLEtBQU07QUFDdEMsUUFBTSxLQUFLLE9BQU8sUUFBUSxNQUFNLEtBQU07QUFDdEMsUUFBTSxLQUFLLE9BQU8sUUFBUSxLQUFLLEtBQU07QUFDckMsUUFBTSxLQUFLLE9BQU8sT0FBTyxLQUFNO0FBQy9CLFFBQU0sS0FBSyxlQUFlLEtBQUs7QUFDL0IsUUFBTSxLQUFLLGVBQWUsS0FBSztBQUMvQixRQUFNLE1BQU0sZUFBZSxJQUFJO0FBQy9CLFFBQU0sT0FBTyxhQUFhLFFBQVEsSUFBSTtBQUN0QyxRQUFNLE9BQU8sWUFBWSxLQUFLO0FBQzlCLFFBQU0sTUFBTSxZQUFZO0FBQ3hCLFFBQU0sTUFBTSxZQUFZO0FBQ3hCLFFBQU0sTUFBTSxZQUFZO0FBQ3hCLFFBQU0sS0FBSyxNQUFNLEtBQUssS0FBSztBQUMzQixRQUFNLEtBQUssTUFBTSxLQUFLLEtBQUs7QUFDM0IsU0FBTyxJQUFJLE1BQU0sTUFBTSxjQUFjLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FpQjlDLE9BQU8sTUFBTSxHQUFHO0VBQ2QsTUFBTSxNQUFNLEVBQUUsUUFBUSxNQUFNLEdBQUc7QUFDL0IsTUFBSSxJQUFJLFdBQVcsR0FBSSxPQUFNLElBQUksTUFBTSxtQkFBbUI7RUFDMUQsSUFBSSxJQUFJO0FBQ1IsT0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksS0FBSyxFQUMzQixLQUFJLEtBQUssS0FBSyxPQUFPLFNBQVMsSUFBSSxNQUFNLEdBQUcsSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDO0FBRXpELFNBQU8sSUFBSSxNQUFNLEVBQUU7OztDQUdyQixXQUFXO0VBRVQsTUFBTSxNQUFNLENBQUMsR0FEQyxNQUFNLGNBQWMsS0FBSyxTQUFTLENBQzFCLENBQUMsS0FBSyxNQUFNLEVBQUUsU0FBUyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRztBQUMzRSxTQUFPLElBQUksTUFBTSxHQUFHLEVBQUUsR0FBRyxNQUFNLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLElBQUksTUFBTSxJQUFJLEdBQUcsR0FBRyxNQUFNLElBQUksTUFBTSxJQUFJLEdBQUcsR0FBRyxNQUFNLElBQUksTUFBTSxHQUFHOzs7Q0FHM0gsV0FBVztBQUNULFNBQU8sS0FBSzs7O0NBR2QsVUFBVTtBQUNSLFNBQU8sTUFBTSxjQUFjLEtBQUssU0FBUzs7Q0FFM0MsT0FBTyxjQUFjLE9BQU87RUFDMUIsSUFBSSxTQUFTO0FBQ2IsT0FBSyxNQUFNLEtBQUssTUFBTyxVQUFTLFVBQVUsS0FBSyxPQUFPLEVBQUU7QUFDeEQsU0FBTzs7Q0FFVCxPQUFPLGNBQWMsT0FBTztFQUMxQixNQUFNLFFBQVEsSUFBSSxXQUFXLEdBQUc7QUFDaEMsT0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEdBQUcsS0FBSztBQUM1QixTQUFNLEtBQUssT0FBTyxRQUFRLEtBQU07QUFDaEMsYUFBVTs7QUFFWixTQUFPOzs7Ozs7Ozs7O0NBVVQsYUFBYTtFQUNYLE1BQU0sVUFBVSxLQUFLLFNBQVMsQ0FBQyxNQUFNLElBQUk7QUFDekMsVUFBUSxTQUFSO0dBQ0UsS0FBSyxFQUNILFFBQU87R0FDVCxLQUFLLEVBQ0gsUUFBTztHQUNUO0FBQ0UsUUFBSSxRQUFRLE1BQU0sSUFDaEIsUUFBTztBQUVULFFBQUksUUFBUSxNQUFNLElBQ2hCLFFBQU87QUFFVCxVQUFNLElBQUksTUFBTSw2QkFBNkIsVUFBVTs7Ozs7Ozs7Ozs7Q0FXN0QsYUFBYTtFQUNYLE1BQU0sUUFBUSxLQUFLLFNBQVM7RUFDNUIsTUFBTSxPQUFPLE1BQU07RUFDbkIsTUFBTSxPQUFPLE1BQU07RUFDbkIsTUFBTSxPQUFPLE1BQU07RUFDbkIsTUFBTSxNQUFNLE1BQU0sUUFBUTtBQUMxQixTQUFPLFFBQVEsS0FBSyxRQUFRLEtBQUssUUFBUSxJQUFJLE1BQU07O0NBRXJELFVBQVUsT0FBTztBQUNmLE1BQUksS0FBSyxXQUFXLE1BQU0sU0FBVSxRQUFPO0FBQzNDLE1BQUksS0FBSyxXQUFXLE1BQU0sU0FBVSxRQUFPO0FBQzNDLFNBQU87O0NBRVQsT0FBTyxtQkFBbUI7QUFDeEIsU0FBTyxjQUFjLFFBQVEsRUFDM0IsVUFBVSxDQUNSO0dBQ0UsTUFBTTtHQUNOLGVBQWUsY0FBYztHQUM5QixDQUNGLEVBQ0YsQ0FBQzs7O0FBS04sSUFBSSxlQUFlLE1BQU07Ozs7Ozs7OztDQVN2Qjs7Ozs7OztDQU9BLFNBQVM7Q0FDVCxZQUFZLE9BQU87QUFDakIsT0FBSyxPQUFPLGlCQUFpQixXQUFXLFFBQVEsSUFBSSxTQUFTLE1BQU0sUUFBUSxNQUFNLFlBQVksTUFBTSxXQUFXO0FBQzlHLE9BQUssU0FBUzs7Q0FFaEIsTUFBTSxNQUFNO0FBQ1YsT0FBSyxPQUFPO0FBQ1osT0FBSyxTQUFTOztDQUVoQixJQUFJLFlBQVk7QUFDZCxTQUFPLEtBQUssS0FBSyxhQUFhLEtBQUs7OztDQUdyQyxRQUFRLEdBQUc7QUFDVCxNQUFJLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxXQUM5QixPQUFNLElBQUksV0FDUixpQkFBaUIsRUFBRSw4QkFBOEIsS0FBSyxPQUFPLGFBQWEsS0FBSyxVQUFVLGlCQUMxRjs7Q0FHTCxpQkFBaUI7RUFDZixNQUFNLFNBQVMsS0FBSyxTQUFTO0FBQzdCLFFBQUtHLE9BQVEsT0FBTztBQUNwQixTQUFPLEtBQUssVUFBVSxPQUFPOztDQUUvQixXQUFXO0VBQ1QsTUFBTSxRQUFRLEtBQUssS0FBSyxTQUFTLEtBQUssT0FBTztBQUM3QyxPQUFLLFVBQVU7QUFDZixTQUFPLFVBQVU7O0NBRW5CLFdBQVc7RUFDVCxNQUFNLFFBQVEsS0FBSyxLQUFLLFNBQVMsS0FBSyxPQUFPO0FBQzdDLE9BQUssVUFBVTtBQUNmLFNBQU87O0NBRVQsVUFBVSxRQUFRO0VBQ2hCLE1BQU0sUUFBUSxJQUFJLFdBQ2hCLEtBQUssS0FBSyxRQUNWLEtBQUssS0FBSyxhQUFhLEtBQUssUUFDNUIsT0FDRDtBQUNELE9BQUssVUFBVTtBQUNmLFNBQU87O0NBRVQsU0FBUztFQUNQLE1BQU0sUUFBUSxLQUFLLEtBQUssUUFBUSxLQUFLLE9BQU87QUFDNUMsT0FBSyxVQUFVO0FBQ2YsU0FBTzs7Q0FFVCxTQUFTO0FBQ1AsU0FBTyxLQUFLLFVBQVU7O0NBRXhCLFVBQVU7RUFDUixNQUFNLFFBQVEsS0FBSyxLQUFLLFNBQVMsS0FBSyxRQUFRLEtBQUs7QUFDbkQsT0FBSyxVQUFVO0FBQ2YsU0FBTzs7Q0FFVCxVQUFVO0VBQ1IsTUFBTSxRQUFRLEtBQUssS0FBSyxVQUFVLEtBQUssUUFBUSxLQUFLO0FBQ3BELE9BQUssVUFBVTtBQUNmLFNBQU87O0NBRVQsVUFBVTtFQUNSLE1BQU0sUUFBUSxLQUFLLEtBQUssU0FBUyxLQUFLLFFBQVEsS0FBSztBQUNuRCxPQUFLLFVBQVU7QUFDZixTQUFPOztDQUVULFVBQVU7RUFDUixNQUFNLFFBQVEsS0FBSyxLQUFLLFVBQVUsS0FBSyxRQUFRLEtBQUs7QUFDcEQsT0FBSyxVQUFVO0FBQ2YsU0FBTzs7Q0FFVCxVQUFVO0VBQ1IsTUFBTSxRQUFRLEtBQUssS0FBSyxZQUFZLEtBQUssUUFBUSxLQUFLO0FBQ3RELE9BQUssVUFBVTtBQUNmLFNBQU87O0NBRVQsVUFBVTtFQUNSLE1BQU0sUUFBUSxLQUFLLEtBQUssYUFBYSxLQUFLLFFBQVEsS0FBSztBQUN2RCxPQUFLLFVBQVU7QUFDZixTQUFPOztDQUVULFdBQVc7RUFDVCxNQUFNLFlBQVksS0FBSyxLQUFLLGFBQWEsS0FBSyxRQUFRLEtBQUs7RUFDM0QsTUFBTSxZQUFZLEtBQUssS0FBSyxhQUFhLEtBQUssU0FBUyxHQUFHLEtBQUs7QUFDL0QsT0FBSyxVQUFVO0FBQ2YsVUFBUSxhQUFhLE9BQU8sR0FBRyxJQUFJOztDQUVyQyxXQUFXO0VBQ1QsTUFBTSxZQUFZLEtBQUssS0FBSyxhQUFhLEtBQUssUUFBUSxLQUFLO0VBQzNELE1BQU0sWUFBWSxLQUFLLEtBQUssWUFBWSxLQUFLLFNBQVMsR0FBRyxLQUFLO0FBQzlELE9BQUssVUFBVTtBQUNmLFVBQVEsYUFBYSxPQUFPLEdBQUcsSUFBSTs7Q0FFckMsV0FBVztFQUNULE1BQU0sS0FBSyxLQUFLLEtBQUssYUFBYSxLQUFLLFFBQVEsS0FBSztFQUNwRCxNQUFNLEtBQUssS0FBSyxLQUFLLGFBQWEsS0FBSyxTQUFTLEdBQUcsS0FBSztFQUN4RCxNQUFNLEtBQUssS0FBSyxLQUFLLGFBQWEsS0FBSyxTQUFTLElBQUksS0FBSztFQUN6RCxNQUFNLEtBQUssS0FBSyxLQUFLLGFBQWEsS0FBSyxTQUFTLElBQUksS0FBSztBQUN6RCxPQUFLLFVBQVU7QUFDZixVQUFRLE1BQU0sT0FBTyxJQUFPLEtBQUssTUFBTSxPQUFPLElBQU8sS0FBSyxNQUFNLE9BQU8sR0FBTyxJQUFJOztDQUVwRixXQUFXO0VBQ1QsTUFBTSxLQUFLLEtBQUssS0FBSyxhQUFhLEtBQUssUUFBUSxLQUFLO0VBQ3BELE1BQU0sS0FBSyxLQUFLLEtBQUssYUFBYSxLQUFLLFNBQVMsR0FBRyxLQUFLO0VBQ3hELE1BQU0sS0FBSyxLQUFLLEtBQUssYUFBYSxLQUFLLFNBQVMsSUFBSSxLQUFLO0VBQ3pELE1BQU0sS0FBSyxLQUFLLEtBQUssWUFBWSxLQUFLLFNBQVMsSUFBSSxLQUFLO0FBQ3hELE9BQUssVUFBVTtBQUNmLFVBQVEsTUFBTSxPQUFPLElBQU8sS0FBSyxNQUFNLE9BQU8sSUFBTyxLQUFLLE1BQU0sT0FBTyxHQUFPLElBQUk7O0NBRXBGLFVBQVU7RUFDUixNQUFNLFFBQVEsS0FBSyxLQUFLLFdBQVcsS0FBSyxRQUFRLEtBQUs7QUFDckQsT0FBSyxVQUFVO0FBQ2YsU0FBTzs7Q0FFVCxVQUFVO0VBQ1IsTUFBTSxRQUFRLEtBQUssS0FBSyxXQUFXLEtBQUssUUFBUSxLQUFLO0FBQ3JELE9BQUssVUFBVTtBQUNmLFNBQU87O0NBRVQsYUFBYTtFQUNYLE1BQU0sYUFBYSxLQUFLLGdCQUFnQjtBQUN4QyxTQUFPLElBQUksWUFBWSxRQUFRLENBQUMsT0FBTyxXQUFXOzs7QUFLdEQsSUFBSSxtQkFBbUIsUUFBUSxtQkFBbUIsQ0FBQztBQUNuRCxJQUFJLCtCQUErQixZQUFZLFVBQVUsWUFBWSxTQUFTLGVBQWU7QUFDM0YsS0FBSSxrQkFBa0IsS0FBSyxFQUN6QixRQUFPLEtBQUssT0FBTztVQUNWLGlCQUFpQixLQUFLLFdBQy9CLFFBQU8sS0FBSyxNQUFNLEdBQUcsY0FBYztNQUM5QjtFQUNMLE1BQU0sT0FBTyxJQUFJLFdBQVcsY0FBYztBQUMxQyxPQUFLLElBQUksSUFBSSxXQUFXLEtBQUssQ0FBQztBQUM5QixTQUFPLEtBQUs7OztBQUdoQixJQUFJLGtCQUFrQixNQUFNO0NBQzFCO0NBQ0E7Q0FDQSxZQUFZLE1BQU07QUFDaEIsT0FBSyxTQUFTLE9BQU8sU0FBUyxXQUFXLElBQUksWUFBWSxLQUFLLEdBQUc7QUFDakUsT0FBSyxPQUFPLElBQUksU0FBUyxLQUFLLE9BQU87O0NBRXZDLElBQUksV0FBVztBQUNiLFNBQU8sS0FBSyxPQUFPOztDQUVyQixLQUFLLFNBQVM7QUFDWixNQUFJLFdBQVcsS0FBSyxPQUFPLFdBQVk7QUFDdkMsT0FBSyxTQUFTLDZCQUE2QixLQUFLLEtBQUssUUFBUSxRQUFRO0FBQ3JFLE9BQUssT0FBTyxJQUFJLFNBQVMsS0FBSyxPQUFPOzs7QUFHekMsSUFBSSxlQUFlLE1BQU07Q0FDdkI7Q0FDQSxTQUFTO0NBQ1QsWUFBWSxNQUFNO0FBQ2hCLE9BQUssU0FBUyxPQUFPLFNBQVMsV0FBVyxJQUFJLGdCQUFnQixLQUFLLEdBQUc7O0NBRXZFLFFBQVE7QUFDTixPQUFLLFNBQVM7O0NBRWhCLE1BQU0sUUFBUTtBQUNaLE9BQUssU0FBUztBQUNkLE9BQUssU0FBUzs7Q0FFaEIsYUFBYSxvQkFBb0I7RUFDL0IsTUFBTSxjQUFjLEtBQUssU0FBUyxxQkFBcUI7QUFDdkQsTUFBSSxlQUFlLEtBQUssT0FBTyxTQUFVO0VBQ3pDLElBQUksY0FBYyxLQUFLLE9BQU8sV0FBVztBQUN6QyxNQUFJLGNBQWMsWUFBYSxlQUFjO0FBQzdDLE9BQUssT0FBTyxLQUFLLFlBQVk7O0NBRS9CLFdBQVc7QUFDVCxVQUFRLEdBQUcsaUJBQWlCLGVBQWUsS0FBSyxXQUFXLENBQUM7O0NBRTlELFlBQVk7QUFDVixTQUFPLElBQUksV0FBVyxLQUFLLE9BQU8sUUFBUSxHQUFHLEtBQUssT0FBTzs7Q0FFM0QsSUFBSSxPQUFPO0FBQ1QsU0FBTyxLQUFLLE9BQU87O0NBRXJCLGdCQUFnQixPQUFPO0VBQ3JCLE1BQU0sU0FBUyxNQUFNO0FBQ3JCLE9BQUssYUFBYSxJQUFJLE9BQU87QUFDN0IsT0FBSyxTQUFTLE9BQU87QUFDckIsTUFBSSxXQUFXLEtBQUssT0FBTyxRQUFRLEtBQUssT0FBTyxDQUFDLElBQUksTUFBTTtBQUMxRCxPQUFLLFVBQVU7O0NBRWpCLFVBQVUsT0FBTztBQUNmLE9BQUssYUFBYSxFQUFFO0FBQ3BCLE9BQUssS0FBSyxTQUFTLEtBQUssUUFBUSxRQUFRLElBQUksRUFBRTtBQUM5QyxPQUFLLFVBQVU7O0NBRWpCLFVBQVUsT0FBTztBQUNmLE9BQUssYUFBYSxFQUFFO0FBQ3BCLE9BQUssS0FBSyxTQUFTLEtBQUssUUFBUSxNQUFNO0FBQ3RDLE9BQUssVUFBVTs7Q0FFakIsUUFBUSxPQUFPO0FBQ2IsT0FBSyxhQUFhLEVBQUU7QUFDcEIsT0FBSyxLQUFLLFFBQVEsS0FBSyxRQUFRLE1BQU07QUFDckMsT0FBSyxVQUFVOztDQUVqQixRQUFRLE9BQU87QUFDYixPQUFLLGFBQWEsRUFBRTtBQUNwQixPQUFLLEtBQUssU0FBUyxLQUFLLFFBQVEsTUFBTTtBQUN0QyxPQUFLLFVBQVU7O0NBRWpCLFNBQVMsT0FBTztBQUNkLE9BQUssYUFBYSxFQUFFO0FBQ3BCLE9BQUssS0FBSyxTQUFTLEtBQUssUUFBUSxPQUFPLEtBQUs7QUFDNUMsT0FBSyxVQUFVOztDQUVqQixTQUFTLE9BQU87QUFDZCxPQUFLLGFBQWEsRUFBRTtBQUNwQixPQUFLLEtBQUssVUFBVSxLQUFLLFFBQVEsT0FBTyxLQUFLO0FBQzdDLE9BQUssVUFBVTs7Q0FFakIsU0FBUyxPQUFPO0FBQ2QsT0FBSyxhQUFhLEVBQUU7QUFDcEIsT0FBSyxLQUFLLFNBQVMsS0FBSyxRQUFRLE9BQU8sS0FBSztBQUM1QyxPQUFLLFVBQVU7O0NBRWpCLFNBQVMsT0FBTztBQUNkLE9BQUssYUFBYSxFQUFFO0FBQ3BCLE9BQUssS0FBSyxVQUFVLEtBQUssUUFBUSxPQUFPLEtBQUs7QUFDN0MsT0FBSyxVQUFVOztDQUVqQixTQUFTLE9BQU87QUFDZCxPQUFLLGFBQWEsRUFBRTtBQUNwQixPQUFLLEtBQUssWUFBWSxLQUFLLFFBQVEsT0FBTyxLQUFLO0FBQy9DLE9BQUssVUFBVTs7Q0FFakIsU0FBUyxPQUFPO0FBQ2QsT0FBSyxhQUFhLEVBQUU7QUFDcEIsT0FBSyxLQUFLLGFBQWEsS0FBSyxRQUFRLE9BQU8sS0FBSztBQUNoRCxPQUFLLFVBQVU7O0NBRWpCLFVBQVUsT0FBTztBQUNmLE9BQUssYUFBYSxHQUFHO0VBQ3JCLE1BQU0sWUFBWSxRQUFRLE9BQU8scUJBQXFCO0VBQ3RELE1BQU0sWUFBWSxTQUFTLE9BQU8sR0FBRztBQUNyQyxPQUFLLEtBQUssYUFBYSxLQUFLLFFBQVEsV0FBVyxLQUFLO0FBQ3BELE9BQUssS0FBSyxhQUFhLEtBQUssU0FBUyxHQUFHLFdBQVcsS0FBSztBQUN4RCxPQUFLLFVBQVU7O0NBRWpCLFVBQVUsT0FBTztBQUNmLE9BQUssYUFBYSxHQUFHO0VBQ3JCLE1BQU0sWUFBWSxRQUFRLE9BQU8scUJBQXFCO0VBQ3RELE1BQU0sWUFBWSxTQUFTLE9BQU8sR0FBRztBQUNyQyxPQUFLLEtBQUssWUFBWSxLQUFLLFFBQVEsV0FBVyxLQUFLO0FBQ25ELE9BQUssS0FBSyxZQUFZLEtBQUssU0FBUyxHQUFHLFdBQVcsS0FBSztBQUN2RCxPQUFLLFVBQVU7O0NBRWpCLFVBQVUsT0FBTztBQUNmLE9BQUssYUFBYSxHQUFHO0VBQ3JCLE1BQU0sY0FBYyxPQUFPLHFCQUFxQjtFQUNoRCxNQUFNLEtBQUssUUFBUTtFQUNuQixNQUFNLEtBQUssU0FBUyxPQUFPLEdBQU8sR0FBRztFQUNyQyxNQUFNLEtBQUssU0FBUyxPQUFPLElBQU8sR0FBRztFQUNyQyxNQUFNLEtBQUssU0FBUyxPQUFPLElBQU87QUFDbEMsT0FBSyxLQUFLLGFBQWEsS0FBSyxTQUFTLEdBQU8sSUFBSSxLQUFLO0FBQ3JELE9BQUssS0FBSyxhQUFhLEtBQUssU0FBUyxHQUFPLElBQUksS0FBSztBQUNyRCxPQUFLLEtBQUssYUFBYSxLQUFLLFNBQVMsSUFBTyxJQUFJLEtBQUs7QUFDckQsT0FBSyxLQUFLLGFBQWEsS0FBSyxTQUFTLElBQU8sSUFBSSxLQUFLO0FBQ3JELE9BQUssVUFBVTs7Q0FFakIsVUFBVSxPQUFPO0FBQ2YsT0FBSyxhQUFhLEdBQUc7RUFDckIsTUFBTSxjQUFjLE9BQU8scUJBQXFCO0VBQ2hELE1BQU0sS0FBSyxRQUFRO0VBQ25CLE1BQU0sS0FBSyxTQUFTLE9BQU8sR0FBTyxHQUFHO0VBQ3JDLE1BQU0sS0FBSyxTQUFTLE9BQU8sSUFBTyxHQUFHO0VBQ3JDLE1BQU0sS0FBSyxTQUFTLE9BQU8sSUFBTztBQUNsQyxPQUFLLEtBQUssYUFBYSxLQUFLLFNBQVMsR0FBTyxJQUFJLEtBQUs7QUFDckQsT0FBSyxLQUFLLGFBQWEsS0FBSyxTQUFTLEdBQU8sSUFBSSxLQUFLO0FBQ3JELE9BQUssS0FBSyxhQUFhLEtBQUssU0FBUyxJQUFPLElBQUksS0FBSztBQUNyRCxPQUFLLEtBQUssWUFBWSxLQUFLLFNBQVMsSUFBTyxJQUFJLEtBQUs7QUFDcEQsT0FBSyxVQUFVOztDQUVqQixTQUFTLE9BQU87QUFDZCxPQUFLLGFBQWEsRUFBRTtBQUNwQixPQUFLLEtBQUssV0FBVyxLQUFLLFFBQVEsT0FBTyxLQUFLO0FBQzlDLE9BQUssVUFBVTs7Q0FFakIsU0FBUyxPQUFPO0FBQ2QsT0FBSyxhQUFhLEVBQUU7QUFDcEIsT0FBSyxLQUFLLFdBQVcsS0FBSyxRQUFRLE9BQU8sS0FBSztBQUM5QyxPQUFLLFVBQVU7O0NBRWpCLFlBQVksT0FBTztFQUVqQixNQUFNLGdCQURVLElBQUksYUFBYSxDQUNILE9BQU8sTUFBTTtBQUMzQyxPQUFLLGdCQUFnQixjQUFjOzs7QUFLdkMsU0FBUyxzQkFBc0IsT0FBTztBQUNwQyxRQUFPLE1BQU0sVUFBVSxJQUFJLEtBQUssTUFBTSxTQUFTLEdBQUcsT0FBTyxPQUFPLEVBQUUsU0FBUyxHQUFHLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUc7O0FBRXJHLFNBQVMsaUJBQWlCLE9BQU87QUFDL0IsS0FBSSxNQUFNLFVBQVUsR0FDbEIsT0FBTSxJQUFJLE1BQU0sb0NBQW9DLFFBQVE7QUFFOUQsUUFBTyxJQUFJLGFBQWEsTUFBTSxDQUFDLFVBQVU7O0FBRTNDLFNBQVMsaUJBQWlCLE9BQU87QUFDL0IsS0FBSSxNQUFNLFVBQVUsR0FDbEIsT0FBTSxJQUFJLE1BQU0scUNBQXFDLE1BQU0sR0FBRztBQUVoRSxRQUFPLElBQUksYUFBYSxNQUFNLENBQUMsVUFBVTs7QUFFM0MsU0FBUyxzQkFBc0IsS0FBSztBQUNsQyxLQUFJLElBQUksV0FBVyxLQUFLLENBQ3RCLE9BQU0sSUFBSSxNQUFNLEVBQUU7Q0FFcEIsTUFBTSxVQUFVLElBQUksTUFBTSxVQUFVLElBQUksRUFBRTtBQUkxQyxRQUhhLFdBQVcsS0FDdEIsUUFBUSxLQUFLLFNBQVMsU0FBUyxNQUFNLEdBQUcsQ0FBQyxDQUMxQyxDQUNXLFNBQVM7O0FBRXZCLFNBQVMsZ0JBQWdCLEtBQUs7QUFDNUIsUUFBTyxpQkFBaUIsc0JBQXNCLElBQUksQ0FBQzs7QUFFckQsU0FBUyxnQkFBZ0IsS0FBSztBQUM1QixRQUFPLGlCQUFpQixzQkFBc0IsSUFBSSxDQUFDOztBQUVyRCxTQUFTLGlCQUFpQixNQUFNO0NBQzlCLE1BQU0sU0FBUyxJQUFJLGFBQWEsR0FBRztBQUNuQyxRQUFPLFVBQVUsS0FBSztBQUN0QixRQUFPLE9BQU8sV0FBVzs7QUFFM0IsU0FBUyxnQkFBZ0IsTUFBTTtBQUM3QixRQUFPLHNCQUFzQixpQkFBaUIsS0FBSyxDQUFDOztBQUV0RCxTQUFTLGlCQUFpQixNQUFNO0NBQzlCLE1BQU0sU0FBUyxJQUFJLGFBQWEsR0FBRztBQUNuQyxRQUFPLFVBQVUsS0FBSztBQUN0QixRQUFPLE9BQU8sV0FBVzs7QUFFM0IsU0FBUyxnQkFBZ0IsTUFBTTtBQUM3QixRQUFPLHNCQUFzQixpQkFBaUIsS0FBSyxDQUFDOztBQUV0RCxTQUFTLGFBQWEsR0FBRztDQUN2QixNQUFNLE1BQU0sWUFBWSxFQUFFO0FBQzFCLFFBQU8sSUFBSSxPQUFPLEVBQUUsQ0FBQyxhQUFhLEdBQUcsSUFBSSxNQUFNLEVBQUU7O0FBRW5ELFNBQVMsWUFBWSxHQUFHO0NBQ3RCLE1BQU0sTUFBTSxFQUFFLFFBQVEsVUFBVSxJQUFJLENBQUMsUUFBUSxvQkFBb0IsR0FBRyxNQUFNLEVBQUUsYUFBYSxDQUFDO0FBQzFGLFFBQU8sSUFBSSxPQUFPLEVBQUUsQ0FBQyxhQUFhLEdBQUcsSUFBSSxNQUFNLEVBQUU7O0FBRW5ELFNBQVMsY0FBYyxXQUFXLElBQUk7Q0FDcEMsTUFBTSxxQkFBcUI7QUFDM0IsUUFBTyxHQUFHLFFBQVEsTUFBTyxNQUFLLFVBQVUsTUFBTSxHQUFHO0FBQ2pELEtBQUksR0FBRyxRQUFRLFdBQVc7RUFDeEIsSUFBSSxNQUFNO0FBQ1YsT0FBSyxNQUFNLEVBQUUsZUFBZSxVQUFVLEdBQUcsTUFBTSxTQUM3QyxRQUFPLGNBQWMsV0FBVyxLQUFLO0FBRXZDLFNBQU87WUFDRSxHQUFHLFFBQVEsT0FBTztFQUMzQixJQUFJLE1BQU07QUFDVixPQUFLLE1BQU0sRUFBRSxlQUFlLFVBQVUsR0FBRyxNQUFNLFVBQVU7R0FDdkQsTUFBTSxRQUFRLGNBQWMsV0FBVyxLQUFLO0FBQzVDLE9BQUksUUFBUSxJQUFLLE9BQU07O0FBRXpCLE1BQUksUUFBUSxTQUFVLE9BQU07QUFDNUIsU0FBTyxJQUFJO1lBQ0YsR0FBRyxPQUFPLFFBQ25CLFFBQU8sSUFBSSxxQkFBcUIsY0FBYyxXQUFXLEdBQUcsTUFBTTtBQUVwRSxRQUFPO0VBQ0wsUUFBUSxJQUFJO0VBQ1osS0FBSztFQUNMLE1BQU07RUFDTixJQUFJO0VBQ0osSUFBSTtFQUNKLEtBQUs7RUFDTCxLQUFLO0VBQ0wsS0FBSztFQUNMLEtBQUs7RUFDTCxLQUFLO0VBQ0wsS0FBSztFQUNMLEtBQUs7RUFDTCxLQUFLO0VBQ0wsTUFBTTtFQUNOLE1BQU07RUFDTixNQUFNO0VBQ04sTUFBTTtFQUNQLENBQUMsR0FBRzs7QUFFUCxJQUFJLFNBQVMsT0FBTztBQUdwQixJQUFJLGVBQWUsTUFBTSxjQUFjO0NBQ3JDOzs7O0NBSUEsWUFBWSxNQUFNO0FBQ2hCLE9BQUssb0JBQW9COzs7Ozs7Q0FNM0IsT0FBTyxtQkFBbUI7QUFDeEIsU0FBTyxjQUFjLFFBQVEsRUFDM0IsVUFBVSxDQUNSO0dBQUUsTUFBTTtHQUFxQixlQUFlLGNBQWM7R0FBTSxDQUNqRSxFQUNGLENBQUM7O0NBRUosU0FBUztBQUNQLFNBQU8sS0FBSyxzQkFBc0IsT0FBTyxFQUFFOztDQUU3QyxPQUFPLFdBQVcsTUFBTTtBQUN0QixNQUFJLEtBQUssUUFBUSxDQUNmLFFBQU87TUFFUCxRQUFPOztDQUdYLE9BQU8sU0FBUztFQUNkLFNBQVMsV0FBVztBQUNsQixVQUFPLEtBQUssTUFBTSxLQUFLLFFBQVEsR0FBRyxJQUFJOztFQUV4QyxJQUFJLFNBQVMsT0FBTyxFQUFFO0FBQ3RCLE9BQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQ3RCLFVBQVMsVUFBVSxPQUFPLEVBQUUsR0FBRyxPQUFPLFVBQVUsQ0FBQztBQUVuRCxTQUFPLElBQUksY0FBYyxPQUFPOzs7OztDQUtsQyxRQUFRLE9BQU87QUFDYixTQUFPLEtBQUsscUJBQXFCLE1BQU07Ozs7O0NBS3pDLE9BQU8sT0FBTztBQUNaLFNBQU8sS0FBSyxRQUFRLE1BQU07Ozs7O0NBSzVCLGNBQWM7QUFDWixTQUFPLGdCQUFnQixLQUFLLGtCQUFrQjs7Ozs7Q0FLaEQsZUFBZTtBQUNiLFNBQU8saUJBQWlCLEtBQUssa0JBQWtCOzs7OztDQUtqRCxPQUFPLFdBQVcsS0FBSztBQUNyQixTQUFPLElBQUksY0FBYyxnQkFBZ0IsSUFBSSxDQUFDOztDQUVoRCxPQUFPLGlCQUFpQixLQUFLO0VBQzNCLE1BQU0sT0FBTyxjQUFjLFdBQVcsSUFBSTtBQUMxQyxNQUFJLEtBQUssUUFBUSxDQUNmLFFBQU87TUFFUCxRQUFPOzs7QUFNYixJQUFJLFdBQVcsTUFBTSxVQUFVO0NBQzdCOzs7Ozs7Q0FNQSxZQUFZLE1BQU07QUFDaEIsT0FBSyxlQUFlLE9BQU8sU0FBUyxXQUFXLGdCQUFnQixLQUFLLEdBQUc7Ozs7OztDQU16RSxPQUFPLG1CQUFtQjtBQUN4QixTQUFPLGNBQWMsUUFBUSxFQUMzQixVQUFVLENBQUM7R0FBRSxNQUFNO0dBQWdCLGVBQWUsY0FBYztHQUFNLENBQUMsRUFDeEUsQ0FBQzs7Ozs7Q0FLSixRQUFRLE9BQU87QUFDYixTQUFPLEtBQUssYUFBYSxLQUFLLE1BQU0sYUFBYTs7Ozs7Q0FLbkQsT0FBTyxPQUFPO0FBQ1osU0FBTyxLQUFLLFFBQVEsTUFBTTs7Ozs7Q0FLNUIsY0FBYztBQUNaLFNBQU8sZ0JBQWdCLEtBQUssYUFBYTs7Ozs7Q0FLM0MsZUFBZTtBQUNiLFNBQU8saUJBQWlCLEtBQUssYUFBYTs7Ozs7Q0FLNUMsT0FBTyxXQUFXLEtBQUs7QUFDckIsU0FBTyxJQUFJLFVBQVUsSUFBSTs7Ozs7Q0FLM0IsT0FBTyxPQUFPO0FBQ1osU0FBTyxJQUFJLFVBQVUsR0FBRzs7Q0FFMUIsV0FBVztBQUNULFNBQU8sS0FBSyxhQUFhOzs7QUFLN0IsSUFBSSw4QkFBOEIsSUFBSSxLQUFLO0FBQzNDLElBQUksZ0NBQWdDLElBQUksS0FBSztBQUM3QyxJQUFJLGdCQUFnQjtDQUNsQixNQUFNLFdBQVc7RUFBRSxLQUFLO0VBQU87RUFBTztDQUN0QyxNQUFNLFdBQVc7RUFDZixLQUFLO0VBQ0w7RUFDRDtDQUNELFVBQVUsV0FBVztFQUNuQixLQUFLO0VBQ0w7RUFDRDtDQUNELFFBQVEsV0FBVztFQUNqQixLQUFLO0VBQ0w7RUFDRDtDQUNELFFBQVEsRUFBRSxLQUFLLFVBQVU7Q0FDekIsTUFBTSxFQUFFLEtBQUssUUFBUTtDQUNyQixJQUFJLEVBQUUsS0FBSyxNQUFNO0NBQ2pCLElBQUksRUFBRSxLQUFLLE1BQU07Q0FDakIsS0FBSyxFQUFFLEtBQUssT0FBTztDQUNuQixLQUFLLEVBQUUsS0FBSyxPQUFPO0NBQ25CLEtBQUssRUFBRSxLQUFLLE9BQU87Q0FDbkIsS0FBSyxFQUFFLEtBQUssT0FBTztDQUNuQixLQUFLLEVBQUUsS0FBSyxPQUFPO0NBQ25CLEtBQUssRUFBRSxLQUFLLE9BQU87Q0FDbkIsTUFBTSxFQUFFLEtBQUssUUFBUTtDQUNyQixNQUFNLEVBQUUsS0FBSyxRQUFRO0NBQ3JCLE1BQU0sRUFBRSxLQUFLLFFBQVE7Q0FDckIsTUFBTSxFQUFFLEtBQUssUUFBUTtDQUNyQixLQUFLLEVBQUUsS0FBSyxPQUFPO0NBQ25CLEtBQUssRUFBRSxLQUFLLE9BQU87Q0FDbkIsZUFBZSxJQUFJLFdBQVc7QUFDNUIsTUFBSSxHQUFHLFFBQVEsT0FBTztBQUNwQixPQUFJLENBQUMsVUFDSCxPQUFNLElBQUksTUFBTSw0Q0FBNEM7QUFDOUQsVUFBTyxHQUFHLFFBQVEsTUFBTyxNQUFLLFVBQVUsTUFBTSxHQUFHOztBQUVuRCxVQUFRLEdBQUcsS0FBWDtHQUNFLEtBQUssVUFDSCxRQUFPLFlBQVksZUFBZSxHQUFHLE9BQU8sVUFBVTtHQUN4RCxLQUFLLE1BQ0gsUUFBTyxRQUFRLGVBQWUsR0FBRyxPQUFPLFVBQVU7R0FDcEQsS0FBSyxRQUNILEtBQUksR0FBRyxNQUFNLFFBQVEsS0FDbkIsUUFBTztRQUNGO0lBQ0wsTUFBTSxZQUFZLGNBQWMsZUFBZSxHQUFHLE9BQU8sVUFBVTtBQUNuRSxZQUFRLFFBQVEsVUFBVTtBQUN4QixZQUFPLFNBQVMsTUFBTSxPQUFPO0FBQzdCLFVBQUssTUFBTSxRQUFRLE1BQ2pCLFdBQVUsUUFBUSxLQUFLOzs7R0FJL0IsUUFDRSxRQUFPLHFCQUFxQixHQUFHOzs7Q0FJckMsZUFBZSxRQUFRLElBQUksT0FBTyxXQUFXO0FBQzNDLGdCQUFjLGVBQWUsSUFBSSxVQUFVLENBQUMsUUFBUSxNQUFNOztDQUU1RCxpQkFBaUIsSUFBSSxXQUFXO0FBQzlCLE1BQUksR0FBRyxRQUFRLE9BQU87QUFDcEIsT0FBSSxDQUFDLFVBQ0gsT0FBTSxJQUFJLE1BQU0sOENBQThDO0FBQ2hFLFVBQU8sR0FBRyxRQUFRLE1BQU8sTUFBSyxVQUFVLE1BQU0sR0FBRzs7QUFFbkQsVUFBUSxHQUFHLEtBQVg7R0FDRSxLQUFLLFVBQ0gsUUFBTyxZQUFZLGlCQUFpQixHQUFHLE9BQU8sVUFBVTtHQUMxRCxLQUFLLE1BQ0gsUUFBTyxRQUFRLGlCQUFpQixHQUFHLE9BQU8sVUFBVTtHQUN0RCxLQUFLLFFBQ0gsS0FBSSxHQUFHLE1BQU0sUUFBUSxLQUNuQixRQUFPO1FBQ0Y7SUFDTCxNQUFNLGNBQWMsY0FBYyxpQkFDaEMsR0FBRyxPQUNILFVBQ0Q7QUFDRCxZQUFRLFdBQVc7S0FDakIsTUFBTSxTQUFTLE9BQU8sU0FBUztLQUMvQixNQUFNLFNBQVMsTUFBTSxPQUFPO0FBQzVCLFVBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxRQUFRLElBQzFCLFFBQU8sS0FBSyxZQUFZLE9BQU87QUFFakMsWUFBTzs7O0dBR2IsUUFDRSxRQUFPLHVCQUF1QixHQUFHOzs7Q0FJdkMsaUJBQWlCLFFBQVEsSUFBSSxXQUFXO0FBQ3RDLFNBQU8sY0FBYyxpQkFBaUIsSUFBSSxVQUFVLENBQUMsT0FBTzs7Q0FTOUQsWUFBWSxTQUFTLElBQUksT0FBTztBQUM5QixVQUFRLEdBQUcsS0FBWDtHQUNFLEtBQUs7R0FDTCxLQUFLO0dBQ0wsS0FBSztHQUNMLEtBQUs7R0FDTCxLQUFLO0dBQ0wsS0FBSztHQUNMLEtBQUs7R0FDTCxLQUFLO0dBQ0wsS0FBSztHQUNMLEtBQUs7R0FDTCxLQUFLO0dBQ0wsS0FBSztHQUNMLEtBQUs7R0FDTCxLQUFLO0dBQ0wsS0FBSztHQUNMLEtBQUssT0FDSCxRQUFPO0dBQ1QsS0FBSyxVQUNILFFBQU8sWUFBWSxXQUFXLEdBQUcsT0FBTyxNQUFNO0dBQ2hELFNBQVM7SUFDUCxNQUFNLFNBQVMsSUFBSSxhQUFhLEdBQUc7QUFDbkMsa0JBQWMsZUFBZSxRQUFRLElBQUksTUFBTTtBQUMvQyxXQUFPLE9BQU8sVUFBVTs7OztDQUkvQjtBQUNELFNBQVMsU0FBUyxHQUFHO0FBQ25CLFFBQU8sU0FBUyxVQUFVLEtBQUssS0FBSyxFQUFFOztBQUV4QyxJQUFJLHVCQUF1QjtDQUN6QixNQUFNLFNBQVMsYUFBYSxVQUFVLFVBQVU7Q0FDaEQsSUFBSSxTQUFTLGFBQWEsVUFBVSxRQUFRO0NBQzVDLElBQUksU0FBUyxhQUFhLFVBQVUsUUFBUTtDQUM1QyxLQUFLLFNBQVMsYUFBYSxVQUFVLFNBQVM7Q0FDOUMsS0FBSyxTQUFTLGFBQWEsVUFBVSxTQUFTO0NBQzlDLEtBQUssU0FBUyxhQUFhLFVBQVUsU0FBUztDQUM5QyxLQUFLLFNBQVMsYUFBYSxVQUFVLFNBQVM7Q0FDOUMsS0FBSyxTQUFTLGFBQWEsVUFBVSxTQUFTO0NBQzlDLEtBQUssU0FBUyxhQUFhLFVBQVUsU0FBUztDQUM5QyxNQUFNLFNBQVMsYUFBYSxVQUFVLFVBQVU7Q0FDaEQsTUFBTSxTQUFTLGFBQWEsVUFBVSxVQUFVO0NBQ2hELE1BQU0sU0FBUyxhQUFhLFVBQVUsVUFBVTtDQUNoRCxNQUFNLFNBQVMsYUFBYSxVQUFVLFVBQVU7Q0FDaEQsS0FBSyxTQUFTLGFBQWEsVUFBVSxTQUFTO0NBQzlDLEtBQUssU0FBUyxhQUFhLFVBQVUsU0FBUztDQUM5QyxRQUFRLFNBQVMsYUFBYSxVQUFVLFlBQVk7Q0FDckQ7QUFDRCxPQUFPLE9BQU8scUJBQXFCO0FBQ25DLElBQUksc0JBQXNCLFNBQVMsYUFBYSxVQUFVLGdCQUFnQjtBQUMxRSxJQUFJLHlCQUF5QjtDQUMzQixNQUFNLFNBQVMsYUFBYSxVQUFVLFNBQVM7Q0FDL0MsSUFBSSxTQUFTLGFBQWEsVUFBVSxPQUFPO0NBQzNDLElBQUksU0FBUyxhQUFhLFVBQVUsT0FBTztDQUMzQyxLQUFLLFNBQVMsYUFBYSxVQUFVLFFBQVE7Q0FDN0MsS0FBSyxTQUFTLGFBQWEsVUFBVSxRQUFRO0NBQzdDLEtBQUssU0FBUyxhQUFhLFVBQVUsUUFBUTtDQUM3QyxLQUFLLFNBQVMsYUFBYSxVQUFVLFFBQVE7Q0FDN0MsS0FBSyxTQUFTLGFBQWEsVUFBVSxRQUFRO0NBQzdDLEtBQUssU0FBUyxhQUFhLFVBQVUsUUFBUTtDQUM3QyxNQUFNLFNBQVMsYUFBYSxVQUFVLFNBQVM7Q0FDL0MsTUFBTSxTQUFTLGFBQWEsVUFBVSxTQUFTO0NBQy9DLE1BQU0sU0FBUyxhQUFhLFVBQVUsU0FBUztDQUMvQyxNQUFNLFNBQVMsYUFBYSxVQUFVLFNBQVM7Q0FDL0MsS0FBSyxTQUFTLGFBQWEsVUFBVSxRQUFRO0NBQzdDLEtBQUssU0FBUyxhQUFhLFVBQVUsUUFBUTtDQUM3QyxRQUFRLFNBQVMsYUFBYSxVQUFVLFdBQVc7Q0FDcEQ7QUFDRCxPQUFPLE9BQU8sdUJBQXVCO0FBQ3JDLElBQUksd0JBQXdCLFNBQVMsYUFBYSxVQUFVLGVBQWU7QUFDM0UsSUFBSSxpQkFBaUI7Q0FDbkIsTUFBTTtDQUNOLElBQUk7Q0FDSixJQUFJO0NBQ0osS0FBSztDQUNMLEtBQUs7Q0FDTCxLQUFLO0NBQ0wsS0FBSztDQUNMLEtBQUs7Q0FDTCxLQUFLO0NBQ0wsTUFBTTtDQUNOLE1BQU07Q0FDTixNQUFNO0NBQ04sTUFBTTtDQUNOLEtBQUs7Q0FDTCxLQUFLO0NBQ047QUFDRCxJQUFJLHNCQUFzQixJQUFJLElBQUksT0FBTyxLQUFLLGVBQWUsQ0FBQztBQUM5RCxJQUFJLHNCQUFzQixPQUFPLEdBQUcsU0FBUyxPQUMxQyxFQUFFLG9CQUFvQixvQkFBb0IsSUFBSSxjQUFjLElBQUksQ0FDbEU7QUFDRCxJQUFJLGVBQWUsT0FBTyxHQUFHLFNBQVMsUUFDbkMsS0FBSyxFQUFFLG9CQUFvQixNQUFNLGVBQWUsY0FBYyxNQUMvRCxFQUNEO0FBQ0QsSUFBSSxrQkFBa0I7Q0FDcEIsTUFBTTtDQUNOLElBQUk7Q0FDSixJQUFJO0NBQ0osS0FBSztDQUNMLEtBQUs7Q0FDTCxLQUFLO0NBQ0wsS0FBSztDQUNMLEtBQUs7Q0FDTCxLQUFLO0NBQ0wsS0FBSztDQUNMLEtBQUs7Q0FDTjtBQUNELElBQUksOEJBQThCO0NBQ2hDLDJCQUEyQixXQUFXLElBQUksYUFBYSxPQUFPLFNBQVMsQ0FBQztDQUN4RSx3Q0FBd0MsV0FBVyxJQUFJLFVBQVUsT0FBTyxTQUFTLENBQUM7Q0FDbEYsZUFBZSxXQUFXLElBQUksU0FBUyxPQUFPLFVBQVUsQ0FBQztDQUN6RCxvQkFBb0IsV0FBVyxJQUFJLGFBQWEsT0FBTyxVQUFVLENBQUM7Q0FDbEUsV0FBVyxXQUFXLElBQUksS0FBSyxPQUFPLFVBQVUsQ0FBQztDQUNsRDtBQUNELE9BQU8sT0FBTyw0QkFBNEI7QUFDMUMsSUFBSSwwQkFBMEIsRUFBRTtBQUNoQyxJQUFJLHlCQUF5QixZQUFZO0NBQ3ZDLElBQUk7QUFDSixTQUFRLFFBQVEsY0FBYyxLQUE5QjtFQUNFLEtBQUs7QUFDSCxVQUFPO0FBQ1A7RUFDRixLQUFLO0FBQ0gsVUFBTztBQUNQO0VBQ0YsS0FBSztFQUNMLEtBQUs7RUFDTCxLQUFLO0VBQ0wsS0FBSztFQUNMLEtBQUs7RUFDTCxLQUFLO0FBQ0gsVUFBTztBQUNQO0VBQ0YsS0FBSztFQUNMLEtBQUs7RUFDTCxLQUFLO0VBQ0wsS0FBSztFQUNMLEtBQUs7RUFDTCxLQUFLO0FBQ0gsVUFBTztBQUNQO0VBQ0YsS0FBSztFQUNMLEtBQUs7QUFDSCxVQUFPO0FBQ1A7RUFDRixRQUNFLFFBQU87O0FBRVgsUUFBTyxHQUFHLFFBQVEsS0FBSyxJQUFJOztBQUU3QixJQUFJLGNBQWM7Q0FDaEIsZUFBZSxJQUFJLFdBQVc7RUFDNUIsSUFBSSxhQUFhLFlBQVksSUFBSSxHQUFHO0FBQ3BDLE1BQUksY0FBYyxLQUFNLFFBQU87QUFDL0IsTUFBSSxtQkFBbUIsR0FBRyxFQUFFO0dBRTFCLE1BQU0sUUFBUTtzQkFERCxZQUFZLEdBQUcsQ0FFUDs7RUFFekIsR0FBRyxTQUFTLEtBQ0wsRUFBRSxNQUFNLGVBQWUsRUFBRSxZQUFZLE9BQU8sa0JBQWtCLFdBQVcsZ0JBQWdCLEtBQUssd0JBQXdCLEtBQUssSUFBSSxlQUFlLE9BQU8sSUFBSSxTQUFTLEdBQUc7bUJBQzNKLGVBQWUsS0FBSyxLQUFLLGVBQWUsSUFBSSxTQUFTLEtBQUssSUFDdEUsQ0FBQyxLQUFLLEtBQUs7QUFDWixnQkFBYSxTQUFTLFVBQVUsU0FBUyxNQUFNO0FBQy9DLGVBQVksSUFBSSxJQUFJLFdBQVc7QUFDL0IsVUFBTzs7RUFFVCxNQUFNLGNBQWMsRUFBRTtFQUN0QixNQUFNLE9BQU8sc0JBQW9CLEdBQUcsU0FBUyxLQUMxQyxZQUFZLFFBQVEsUUFBUSxLQUFLLGlCQUFpQixRQUFRLEtBQUssSUFDakUsQ0FBQyxLQUFLLEtBQUs7QUFDWixlQUFhLFNBQVMsVUFBVSxTQUFTLEtBQUssQ0FBQyxLQUM3QyxZQUNEO0FBQ0QsY0FBWSxJQUFJLElBQUksV0FBVztBQUMvQixPQUFLLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixHQUFHLFNBQ3ZDLGFBQVksUUFBUSxjQUFjLGVBQ2hDLGVBQ0EsVUFDRDtBQUVILFNBQU8sT0FBTyxZQUFZO0FBQzFCLFNBQU87O0NBR1QsZUFBZSxRQUFRLElBQUksT0FBTyxXQUFXO0FBQzNDLGNBQVksZUFBZSxJQUFJLFVBQVUsQ0FBQyxRQUFRLE1BQU07O0NBRTFELGlCQUFpQixJQUFJLFdBQVc7QUFDOUIsVUFBUSxHQUFHLFNBQVMsUUFBcEI7R0FDRSxLQUFLLEVBQ0gsUUFBTztHQUNULEtBQUssR0FBRztJQUNOLE1BQU0sWUFBWSxHQUFHLFNBQVMsR0FBRztBQUNqQyxRQUFJLE9BQU8sNkJBQTZCLFVBQVUsQ0FDaEQsUUFBTyw0QkFBNEI7OztFQUd6QyxJQUFJLGVBQWUsY0FBYyxJQUFJLEdBQUc7QUFDeEMsTUFBSSxnQkFBZ0IsS0FBTSxRQUFPO0FBQ2pDLE1BQUksbUJBQW1CLEdBQUcsRUFBRTtHQUMxQixNQUFNLE9BQU87bUJBQ0EsR0FBRyxTQUFTLElBQUksc0JBQXNCLENBQUMsS0FBSyxLQUFLLENBQUM7O0VBRW5FLEdBQUcsU0FBUyxLQUNMLEVBQUUsTUFBTSxlQUFlLEVBQUUsWUFBWSxPQUFPLGtCQUFrQixRQUFRLFNBQVMsVUFBVSxLQUFLO3VCQUNoRixVQUFVLEtBQUssYUFBYSxnQkFBZ0IsS0FBSyxrQkFBa0IsZUFBZSxPQUFPLElBQUksU0FBUyxHQUFHO21CQUM3RyxlQUFlLEtBQUssS0FBSyxVQUFVLEtBQUssZ0JBQWdCLElBQUksS0FDeEUsQ0FBQyxLQUFLLEtBQUssQ0FBQzs7QUFFYixrQkFBZSxTQUFTLFVBQVUsS0FBSztBQUN2QyxpQkFBYyxJQUFJLElBQUksYUFBYTtBQUNuQyxVQUFPOztFQUVULE1BQU0sZ0JBQWdCLEVBQUU7QUFDeEIsaUJBQWUsU0FDYixVQUNBO21CQUNhLEdBQUcsU0FBUyxJQUFJLHNCQUFzQixDQUFDLEtBQUssS0FBSyxDQUFDO0VBQ25FLEdBQUcsU0FBUyxLQUFLLEVBQUUsV0FBVyxVQUFVLEtBQUssVUFBVSxLQUFLLFdBQVcsQ0FBQyxLQUFLLEtBQUssQ0FBQztnQkFFaEYsQ0FBQyxLQUFLLGNBQWM7QUFDckIsZ0JBQWMsSUFBSSxJQUFJLGFBQWE7QUFDbkMsT0FBSyxNQUFNLEVBQUUsTUFBTSxtQkFBbUIsR0FBRyxTQUN2QyxlQUFjLFFBQVEsY0FBYyxpQkFDbEMsZUFDQSxVQUNEO0FBRUgsU0FBTyxPQUFPLGNBQWM7QUFDNUIsU0FBTzs7Q0FHVCxpQkFBaUIsUUFBUSxJQUFJLFdBQVc7QUFDdEMsU0FBTyxZQUFZLGlCQUFpQixJQUFJLFVBQVUsQ0FBQyxPQUFPOztDQUU1RCxXQUFXLElBQUksT0FBTztBQUNwQixNQUFJLEdBQUcsU0FBUyxXQUFXLEdBQUc7R0FDNUIsTUFBTSxZQUFZLEdBQUcsU0FBUyxHQUFHO0FBQ2pDLE9BQUksT0FBTyw2QkFBNkIsVUFBVSxDQUNoRCxRQUFPLE1BQU07O0VBR2pCLE1BQU0sU0FBUyxJQUFJLGFBQWEsR0FBRztBQUNuQyxnQkFBYyxlQUFlLFFBQVEsY0FBYyxRQUFRLEdBQUcsRUFBRSxNQUFNO0FBQ3RFLFNBQU8sT0FBTyxVQUFVOztDQUUzQjtBQUNELElBQUksVUFBVTtDQUNaLGVBQWUsSUFBSSxXQUFXO0FBQzVCLE1BQUksR0FBRyxTQUFTLFVBQVUsS0FBSyxHQUFHLFNBQVMsR0FBRyxTQUFTLFVBQVUsR0FBRyxTQUFTLEdBQUcsU0FBUyxRQUFRO0dBQy9GLE1BQU0sWUFBWSxjQUFjLGVBQzlCLEdBQUcsU0FBUyxHQUFHLGVBQ2YsVUFDRDtBQUNELFdBQVEsUUFBUSxVQUFVO0FBQ3hCLFFBQUksVUFBVSxRQUFRLFVBQVUsS0FBSyxHQUFHO0FBQ3RDLFlBQU8sVUFBVSxFQUFFO0FBQ25CLGVBQVUsUUFBUSxNQUFNO1VBRXhCLFFBQU8sVUFBVSxFQUFFOzthQUdkLEdBQUcsU0FBUyxVQUFVLEtBQUssR0FBRyxTQUFTLEdBQUcsU0FBUyxRQUFRLEdBQUcsU0FBUyxHQUFHLFNBQVMsT0FBTztHQUNuRyxNQUFNLGNBQWMsY0FBYyxlQUNoQyxHQUFHLFNBQVMsR0FBRyxlQUNmLFVBQ0Q7R0FDRCxNQUFNLGVBQWUsY0FBYyxlQUNqQyxHQUFHLFNBQVMsR0FBRyxlQUNmLFVBQ0Q7QUFDRCxXQUFRLFFBQVEsVUFBVTtBQUN4QixRQUFJLFFBQVEsT0FBTztBQUNqQixZQUFPLFFBQVEsRUFBRTtBQUNqQixpQkFBWSxRQUFRLE1BQU0sR0FBRztlQUNwQixTQUFTLE9BQU87QUFDekIsWUFBTyxRQUFRLEVBQUU7QUFDakIsa0JBQWEsUUFBUSxNQUFNLElBQUk7VUFFL0IsT0FBTSxJQUFJLFVBQ1IsMkVBQ0Q7O1NBR0E7R0FDTCxJQUFJLGFBQWEsWUFBWSxJQUFJLEdBQUc7QUFDcEMsT0FBSSxjQUFjLEtBQU0sUUFBTztHQUMvQixNQUFNLGNBQWMsRUFBRTtHQUN0QixNQUFNLE9BQU87RUFDakIsR0FBRyxTQUFTLEtBQ0wsRUFBRSxRQUFRLE1BQU0sVUFBVSxLQUFLLFVBQVUsS0FBSyxDQUFDO3VCQUNqQyxFQUFFO2tCQUNQLEtBQUssd0JBQ2hCLENBQUMsS0FBSyxLQUFLLENBQUM7Ozs7Ozs7QUFPYixnQkFBYSxTQUFTLFVBQVUsU0FBUyxLQUFLLENBQUMsS0FDN0MsWUFDRDtBQUNELGVBQVksSUFBSSxJQUFJLFdBQVc7QUFDL0IsUUFBSyxNQUFNLEVBQUUsTUFBTSxtQkFBbUIsR0FBRyxTQUN2QyxhQUFZLFFBQVEsY0FBYyxlQUNoQyxlQUNBLFVBQ0Q7QUFFSCxVQUFPLE9BQU8sWUFBWTtBQUMxQixVQUFPOzs7Q0FJWCxlQUFlLFFBQVEsSUFBSSxPQUFPLFdBQVc7QUFDM0MsVUFBUSxlQUFlLElBQUksVUFBVSxDQUFDLFFBQVEsTUFBTTs7Q0FFdEQsaUJBQWlCLElBQUksV0FBVztBQUM5QixNQUFJLEdBQUcsU0FBUyxVQUFVLEtBQUssR0FBRyxTQUFTLEdBQUcsU0FBUyxVQUFVLEdBQUcsU0FBUyxHQUFHLFNBQVMsUUFBUTtHQUMvRixNQUFNLGNBQWMsY0FBYyxpQkFDaEMsR0FBRyxTQUFTLEdBQUcsZUFDZixVQUNEO0FBQ0QsV0FBUSxXQUFXO0lBQ2pCLE1BQU0sTUFBTSxPQUFPLFFBQVE7QUFDM0IsUUFBSSxRQUFRLEVBQ1YsUUFBTyxZQUFZLE9BQU87YUFDakIsUUFBUSxFQUNqQjtRQUVBLE9BQU0sbURBQW1ELElBQUk7O2FBR3hELEdBQUcsU0FBUyxVQUFVLEtBQUssR0FBRyxTQUFTLEdBQUcsU0FBUyxRQUFRLEdBQUcsU0FBUyxHQUFHLFNBQVMsT0FBTztHQUNuRyxNQUFNLGdCQUFnQixjQUFjLGlCQUNsQyxHQUFHLFNBQVMsR0FBRyxlQUNmLFVBQ0Q7R0FDRCxNQUFNLGlCQUFpQixjQUFjLGlCQUNuQyxHQUFHLFNBQVMsR0FBRyxlQUNmLFVBQ0Q7QUFDRCxXQUFRLFdBQVc7SUFDakIsTUFBTSxNQUFNLE9BQU8sVUFBVTtBQUM3QixRQUFJLFFBQVEsRUFDVixRQUFPLEVBQUUsSUFBSSxjQUFjLE9BQU8sRUFBRTthQUMzQixRQUFRLEVBQ2pCLFFBQU8sRUFBRSxLQUFLLGVBQWUsT0FBTyxFQUFFO1FBRXRDLE9BQU0sa0RBQWtELElBQUk7O1NBRzNEO0dBQ0wsSUFBSSxlQUFlLGNBQWMsSUFBSSxHQUFHO0FBQ3hDLE9BQUksZ0JBQWdCLEtBQU0sUUFBTztHQUNqQyxNQUFNLGdCQUFnQixFQUFFO0FBQ3hCLGtCQUFlLFNBQ2IsVUFDQTtFQUNOLEdBQUcsU0FBUyxLQUNILEVBQUUsUUFBUSxNQUFNLFFBQVEsRUFBRSxrQkFBa0IsS0FBSyxVQUFVLEtBQUssQ0FBQyxnQkFBZ0IsS0FBSyxhQUN4RixDQUFDLEtBQUssS0FBSyxDQUFDLElBQ2QsQ0FBQyxLQUFLLGNBQWM7QUFDckIsaUJBQWMsSUFBSSxJQUFJLGFBQWE7QUFDbkMsUUFBSyxNQUFNLEVBQUUsTUFBTSxtQkFBbUIsR0FBRyxTQUN2QyxlQUFjLFFBQVEsY0FBYyxpQkFDbEMsZUFDQSxVQUNEO0FBRUgsVUFBTyxPQUFPLGNBQWM7QUFDNUIsVUFBTzs7O0NBSVgsaUJBQWlCLFFBQVEsSUFBSSxXQUFXO0FBQ3RDLFNBQU8sUUFBUSxpQkFBaUIsSUFBSSxVQUFVLENBQUMsT0FBTzs7Q0FFekQ7QUFHRCxJQUFJLFNBQVMsRUFDWCxpQkFBaUIsV0FBVztBQUMxQixRQUFPLGNBQWMsSUFBSSxFQUN2QixVQUFVLENBQ1I7RUFBRSxNQUFNO0VBQVEsZUFBZTtFQUFXLEVBQzFDO0VBQ0UsTUFBTTtFQUNOLGVBQWUsY0FBYyxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQztFQUN2RCxDQUNGLEVBQ0YsQ0FBQztHQUVMO0FBR0QsSUFBSSxTQUFTLEVBQ1gsaUJBQWlCLFFBQVEsU0FBUztBQUNoQyxRQUFPLGNBQWMsSUFBSSxFQUN2QixVQUFVLENBQ1I7RUFBRSxNQUFNO0VBQU0sZUFBZTtFQUFRLEVBQ3JDO0VBQUUsTUFBTTtFQUFPLGVBQWU7RUFBUyxDQUN4QyxFQUNGLENBQUM7R0FFTDtBQUdELElBQUksYUFBYTtDQUNmLFNBQVMsT0FBTztBQUNkLFNBQU8sU0FBUyxNQUFNOztDQUV4QixLQUFLLE9BQU87QUFDVixTQUFPLEtBQUssTUFBTTs7Q0FFcEIsbUJBQW1CO0FBQ2pCLFNBQU8sY0FBYyxJQUFJLEVBQ3ZCLFVBQVUsQ0FDUjtHQUNFLE1BQU07R0FDTixlQUFlLGFBQWEsa0JBQWtCO0dBQy9DLEVBQ0Q7R0FBRSxNQUFNO0dBQVEsZUFBZSxVQUFVLGtCQUFrQjtHQUFFLENBQzlELEVBQ0YsQ0FBQzs7Q0FFSixhQUFhLGVBQWU7QUFDMUIsTUFBSSxjQUFjLFFBQVEsTUFDeEIsUUFBTztFQUVULE1BQU0sV0FBVyxjQUFjLE1BQU07QUFDckMsTUFBSSxTQUFTLFdBQVcsRUFDdEIsUUFBTztFQUVULE1BQU0sa0JBQWtCLFNBQVMsTUFBTSxNQUFNLEVBQUUsU0FBUyxXQUFXO0VBQ25FLE1BQU0sY0FBYyxTQUFTLE1BQU0sTUFBTSxFQUFFLFNBQVMsT0FBTztBQUMzRCxNQUFJLENBQUMsbUJBQW1CLENBQUMsWUFDdkIsUUFBTztBQUVULFNBQU8sYUFBYSxlQUFlLGdCQUFnQixjQUFjLElBQUksVUFBVSxZQUFZLFlBQVksY0FBYzs7Q0FFeEg7QUFDRCxJQUFJLFlBQVksWUFBWTtDQUMxQixLQUFLO0NBQ0wsT0FBTyxJQUFJLGFBQWEsT0FBTztDQUNoQztBQUNELElBQUksUUFBUSwwQkFBMEI7Q0FDcEMsS0FBSztDQUNMLE9BQU8sSUFBSSxVQUFVLHFCQUFxQjtDQUMzQztBQUNELElBQUksc0JBQXNCO0FBRzFCLFNBQVMsSUFBSSxHQUFHLElBQUk7QUFDbEIsUUFBTztFQUFFLEdBQUc7RUFBRyxHQUFHO0VBQUk7O0FBSXhCLElBQUksY0FBYyxNQUFNOzs7OztDQUt0Qjs7Ozs7Ozs7OztDQVVBO0NBQ0EsWUFBWSxlQUFlO0FBQ3pCLE9BQUssZ0JBQWdCOztDQUV2QixXQUFXO0FBQ1QsU0FBTyxJQUFJLGNBQWMsS0FBSzs7Q0FFaEMsVUFBVSxRQUFRLE9BQU87QUFJdkIsR0FIa0IsS0FBSyxZQUFZLGNBQWMsZUFDL0MsS0FBSyxjQUNOLEVBQ1MsUUFBUSxNQUFNOztDQUUxQixZQUFZLFFBQVE7QUFJbEIsVUFIb0IsS0FBSyxjQUFjLGNBQWMsaUJBQ25ELEtBQUssY0FDTixFQUNrQixPQUFPOzs7QUFHOUIsSUFBSSxZQUFZLGNBQWMsWUFBWTtDQUN4QyxjQUFjO0FBQ1osUUFBTSxjQUFjLEdBQUc7O0NBRXpCLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxnQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsV0FBVyxXQUFXLENBQUMsQ0FDL0M7O0NBRUgsU0FBUztBQUNQLFNBQU8sSUFBSSxnQkFBZ0IsTUFBTSxJQUFJLGlCQUFpQixFQUFFLFVBQVUsTUFBTSxDQUFDLENBQUM7O0NBRTVFLGFBQWE7QUFDWCxTQUFPLElBQUksZ0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsTUFBTSxDQUFDLENBQzdDOztDQUVILFVBQVU7QUFDUixTQUFPLElBQUksZ0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDaEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGdCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxjQUFjLE9BQU8sQ0FBQyxDQUM5Qzs7Q0FFSCxLQUFLLE1BQU07QUFDVCxTQUFPLElBQUksZ0JBQWdCLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQzs7O0FBR3BFLElBQUksYUFBYSxjQUFjLFlBQVk7Q0FDekMsY0FBYztBQUNaLFFBQU0sY0FBYyxJQUFJOztDQUUxQixNQUFNLFlBQVksU0FBUztBQUN6QixTQUFPLElBQUksaUJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQy9DOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksaUJBQWlCLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUFDOztDQUU3RSxhQUFhO0FBQ1gsU0FBTyxJQUFJLGlCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxjQUFjLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxVQUFVO0FBQ1IsU0FBTyxJQUFJLGlCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxpQkFBaUIsTUFBTSxDQUFDLENBQ2hEOztDQUVILFFBQVEsT0FBTztBQUNiLFNBQU8sSUFBSSxpQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsY0FBYyxPQUFPLENBQUMsQ0FDOUM7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLGlCQUFpQixNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7OztBQUdyRSxJQUFJLGFBQWEsY0FBYyxZQUFZO0NBQ3pDLGNBQWM7QUFDWixRQUFNLGNBQWMsSUFBSTs7Q0FFMUIsTUFBTSxZQUFZLFNBQVM7QUFDekIsU0FBTyxJQUFJLGlCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxXQUFXLFdBQVcsQ0FBQyxDQUMvQzs7Q0FFSCxTQUFTO0FBQ1AsU0FBTyxJQUFJLGlCQUFpQixNQUFNLElBQUksaUJBQWlCLEVBQUUsVUFBVSxNQUFNLENBQUMsQ0FBQzs7Q0FFN0UsYUFBYTtBQUNYLFNBQU8sSUFBSSxpQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDN0M7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSxpQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsaUJBQWlCLE1BQU0sQ0FBQyxDQUNoRDs7Q0FFSCxRQUFRLE9BQU87QUFDYixTQUFPLElBQUksaUJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsT0FBTyxDQUFDLENBQzlDOztDQUVILEtBQUssTUFBTTtBQUNULFNBQU8sSUFBSSxpQkFBaUIsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7QUFHckUsSUFBSSxhQUFhLGNBQWMsWUFBWTtDQUN6QyxjQUFjO0FBQ1osUUFBTSxjQUFjLElBQUk7O0NBRTFCLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxpQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsV0FBVyxXQUFXLENBQUMsQ0FDL0M7O0NBRUgsU0FBUztBQUNQLFNBQU8sSUFBSSxpQkFBaUIsTUFBTSxJQUFJLGlCQUFpQixFQUFFLFVBQVUsTUFBTSxDQUFDLENBQUM7O0NBRTdFLGFBQWE7QUFDWCxTQUFPLElBQUksaUJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsTUFBTSxDQUFDLENBQzdDOztDQUVILFVBQVU7QUFDUixTQUFPLElBQUksaUJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDaEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGlCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxjQUFjLE9BQU8sQ0FBQyxDQUM5Qzs7Q0FFSCxLQUFLLE1BQU07QUFDVCxTQUFPLElBQUksaUJBQWlCLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQzs7O0FBR3JFLElBQUksY0FBYyxjQUFjLFlBQVk7Q0FDMUMsY0FBYztBQUNaLFFBQU0sY0FBYyxLQUFLOztDQUUzQixNQUFNLFlBQVksU0FBUztBQUN6QixTQUFPLElBQUksa0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQy9DOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksa0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLFVBQVUsTUFBTSxDQUFDLENBQ3pDOztDQUVILGFBQWE7QUFDWCxTQUFPLElBQUksa0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsTUFBTSxDQUFDLENBQzdDOztDQUVILFVBQVU7QUFDUixTQUFPLElBQUksa0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDaEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGtCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxjQUFjLE9BQU8sQ0FBQyxDQUM5Qzs7Q0FFSCxLQUFLLE1BQU07QUFDVCxTQUFPLElBQUksa0JBQWtCLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQzs7O0FBR3RFLElBQUksY0FBYyxjQUFjLFlBQVk7Q0FDMUMsY0FBYztBQUNaLFFBQU0sY0FBYyxLQUFLOztDQUUzQixNQUFNLFlBQVksU0FBUztBQUN6QixTQUFPLElBQUksa0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQy9DOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksa0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLFVBQVUsTUFBTSxDQUFDLENBQ3pDOztDQUVILGFBQWE7QUFDWCxTQUFPLElBQUksa0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsTUFBTSxDQUFDLENBQzdDOztDQUVILFVBQVU7QUFDUixTQUFPLElBQUksa0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDaEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGtCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxjQUFjLE9BQU8sQ0FBQyxDQUM5Qzs7Q0FFSCxLQUFLLE1BQU07QUFDVCxTQUFPLElBQUksa0JBQWtCLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQzs7O0FBR3RFLElBQUksWUFBWSxjQUFjLFlBQVk7Q0FDeEMsY0FBYztBQUNaLFFBQU0sY0FBYyxHQUFHOztDQUV6QixNQUFNLFlBQVksU0FBUztBQUN6QixTQUFPLElBQUksZ0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQy9DOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksZ0JBQWdCLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUFDOztDQUU1RSxhQUFhO0FBQ1gsU0FBTyxJQUFJLGdCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxjQUFjLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxVQUFVO0FBQ1IsU0FBTyxJQUFJLGdCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxpQkFBaUIsTUFBTSxDQUFDLENBQ2hEOztDQUVILFFBQVEsT0FBTztBQUNiLFNBQU8sSUFBSSxnQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsY0FBYyxPQUFPLENBQUMsQ0FDOUM7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLGdCQUFnQixNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7OztBQUdwRSxJQUFJLGFBQWEsY0FBYyxZQUFZO0NBQ3pDLGNBQWM7QUFDWixRQUFNLGNBQWMsSUFBSTs7Q0FFMUIsTUFBTSxZQUFZLFNBQVM7QUFDekIsU0FBTyxJQUFJLGlCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxXQUFXLFdBQVcsQ0FBQyxDQUMvQzs7Q0FFSCxTQUFTO0FBQ1AsU0FBTyxJQUFJLGlCQUFpQixNQUFNLElBQUksaUJBQWlCLEVBQUUsVUFBVSxNQUFNLENBQUMsQ0FBQzs7Q0FFN0UsYUFBYTtBQUNYLFNBQU8sSUFBSSxpQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDN0M7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSxpQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsaUJBQWlCLE1BQU0sQ0FBQyxDQUNoRDs7Q0FFSCxRQUFRLE9BQU87QUFDYixTQUFPLElBQUksaUJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsT0FBTyxDQUFDLENBQzlDOztDQUVILEtBQUssTUFBTTtBQUNULFNBQU8sSUFBSSxpQkFBaUIsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7QUFHckUsSUFBSSxhQUFhLGNBQWMsWUFBWTtDQUN6QyxjQUFjO0FBQ1osUUFBTSxjQUFjLElBQUk7O0NBRTFCLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxpQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsV0FBVyxXQUFXLENBQUMsQ0FDL0M7O0NBRUgsU0FBUztBQUNQLFNBQU8sSUFBSSxpQkFBaUIsTUFBTSxJQUFJLGlCQUFpQixFQUFFLFVBQVUsTUFBTSxDQUFDLENBQUM7O0NBRTdFLGFBQWE7QUFDWCxTQUFPLElBQUksaUJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsTUFBTSxDQUFDLENBQzdDOztDQUVILFVBQVU7QUFDUixTQUFPLElBQUksaUJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDaEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGlCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxjQUFjLE9BQU8sQ0FBQyxDQUM5Qzs7Q0FFSCxLQUFLLE1BQU07QUFDVCxTQUFPLElBQUksaUJBQWlCLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQzs7O0FBR3JFLElBQUksYUFBYSxjQUFjLFlBQVk7Q0FDekMsY0FBYztBQUNaLFFBQU0sY0FBYyxJQUFJOztDQUUxQixNQUFNLFlBQVksU0FBUztBQUN6QixTQUFPLElBQUksaUJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQy9DOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksaUJBQWlCLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUFDOztDQUU3RSxhQUFhO0FBQ1gsU0FBTyxJQUFJLGlCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxjQUFjLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxVQUFVO0FBQ1IsU0FBTyxJQUFJLGlCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxpQkFBaUIsTUFBTSxDQUFDLENBQ2hEOztDQUVILFFBQVEsT0FBTztBQUNiLFNBQU8sSUFBSSxpQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsY0FBYyxPQUFPLENBQUMsQ0FDOUM7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLGlCQUFpQixNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7OztBQUdyRSxJQUFJLGNBQWMsY0FBYyxZQUFZO0NBQzFDLGNBQWM7QUFDWixRQUFNLGNBQWMsS0FBSzs7Q0FFM0IsTUFBTSxZQUFZLFNBQVM7QUFDekIsU0FBTyxJQUFJLGtCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxXQUFXLFdBQVcsQ0FBQyxDQUMvQzs7Q0FFSCxTQUFTO0FBQ1AsU0FBTyxJQUFJLGtCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUN6Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLGtCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxjQUFjLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxVQUFVO0FBQ1IsU0FBTyxJQUFJLGtCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxpQkFBaUIsTUFBTSxDQUFDLENBQ2hEOztDQUVILFFBQVEsT0FBTztBQUNiLFNBQU8sSUFBSSxrQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsY0FBYyxPQUFPLENBQUMsQ0FDOUM7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLGtCQUFrQixNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7OztBQUd0RSxJQUFJLGNBQWMsY0FBYyxZQUFZO0NBQzFDLGNBQWM7QUFDWixRQUFNLGNBQWMsS0FBSzs7Q0FFM0IsTUFBTSxZQUFZLFNBQVM7QUFDekIsU0FBTyxJQUFJLGtCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxXQUFXLFdBQVcsQ0FBQyxDQUMvQzs7Q0FFSCxTQUFTO0FBQ1AsU0FBTyxJQUFJLGtCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUN6Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLGtCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxjQUFjLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxVQUFVO0FBQ1IsU0FBTyxJQUFJLGtCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxpQkFBaUIsTUFBTSxDQUFDLENBQ2hEOztDQUVILFFBQVEsT0FBTztBQUNiLFNBQU8sSUFBSSxrQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsY0FBYyxPQUFPLENBQUMsQ0FDOUM7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLGtCQUFrQixNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7OztBQUd0RSxJQUFJLGFBQWEsY0FBYyxZQUFZO0NBQ3pDLGNBQWM7QUFDWixRQUFNLGNBQWMsSUFBSTs7Q0FFMUIsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGlCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxjQUFjLE9BQU8sQ0FBQyxDQUM5Qzs7Q0FFSCxLQUFLLE1BQU07QUFDVCxTQUFPLElBQUksaUJBQWlCLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQzs7O0FBR3JFLElBQUksYUFBYSxjQUFjLFlBQVk7Q0FDekMsY0FBYztBQUNaLFFBQU0sY0FBYyxJQUFJOztDQUUxQixRQUFRLE9BQU87QUFDYixTQUFPLElBQUksaUJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsT0FBTyxDQUFDLENBQzlDOztDQUVILEtBQUssTUFBTTtBQUNULFNBQU8sSUFBSSxpQkFBaUIsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7QUFHckUsSUFBSSxjQUFjLGNBQWMsWUFBWTtDQUMxQyxjQUFjO0FBQ1osUUFBTSxjQUFjLEtBQUs7O0NBRTNCLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxrQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsV0FBVyxXQUFXLENBQUMsQ0FDL0M7O0NBRUgsU0FBUztBQUNQLFNBQU8sSUFBSSxrQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsVUFBVSxNQUFNLENBQUMsQ0FDekM7O0NBRUgsYUFBYTtBQUNYLFNBQU8sSUFBSSxrQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDN0M7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGtCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxjQUFjLE9BQU8sQ0FBQyxDQUM5Qzs7Q0FFSCxLQUFLLE1BQU07QUFDVCxTQUFPLElBQUksa0JBQWtCLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQzs7O0FBR3RFLElBQUksZ0JBQWdCLGNBQWMsWUFBWTtDQUM1QyxjQUFjO0FBQ1osUUFBTSxjQUFjLE9BQU87O0NBRTdCLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxvQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsV0FBVyxXQUFXLENBQUMsQ0FDL0M7O0NBRUgsU0FBUztBQUNQLFNBQU8sSUFBSSxvQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsVUFBVSxNQUFNLENBQUMsQ0FDekM7O0NBRUgsYUFBYTtBQUNYLFNBQU8sSUFBSSxvQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDN0M7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLG9CQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxjQUFjLE9BQU8sQ0FBQyxDQUM5Qzs7Q0FFSCxLQUFLLE1BQU07QUFDVCxTQUFPLElBQUksb0JBQW9CLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQzs7O0FBR3hFLElBQUksZUFBZSxjQUFjLFlBQVk7Q0FDM0M7Q0FDQSxZQUFZLFNBQVM7QUFDbkIsUUFBTSxjQUFjLE1BQU0sUUFBUSxjQUFjLENBQUM7QUFDakQsT0FBSyxVQUFVOztDQUVqQixRQUFRLE9BQU87QUFDYixTQUFPLElBQUksbUJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsT0FBTyxDQUFDLENBQzlDOztDQUVILEtBQUssTUFBTTtBQUNULFNBQU8sSUFBSSxtQkFBbUIsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7QUFHdkUsSUFBSSxtQkFBbUIsY0FBYyxZQUFZO0NBQy9DLGNBQWM7QUFDWixRQUFNLGNBQWMsTUFBTSxjQUFjLEdBQUcsQ0FBQzs7Q0FFOUMsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLHVCQUNULElBQUksaUJBQWlCLEVBQUUsY0FBYyxPQUFPLENBQUMsQ0FDOUM7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLHVCQUF1QixJQUFJLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7QUFHckUsSUFBSSxnQkFBZ0IsY0FBYyxZQUFZO0NBQzVDO0NBQ0EsWUFBWSxPQUFPO0FBQ2pCLFFBQU0sT0FBTyxpQkFBaUIsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBSyxRQUFROztDQUVmLFFBQVEsT0FBTztBQUNiLFNBQU8sSUFBSSxvQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsY0FBYyxPQUFPLENBQUMsQ0FDOUM7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLG9CQUFvQixNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7OztBQUd4RSxJQUFJLGlCQUFpQixjQUFjLFlBQVk7Q0FDN0M7Q0FDQTtDQUNBLFlBQVksVUFBVSxNQUFNO0VBQzFCLFNBQVMsNkJBQTZCLEtBQUs7QUFDekMsVUFBTyxPQUFPLEtBQUssSUFBSSxDQUFDLEtBQUssU0FBUztJQUNwQyxNQUFNO0lBSU4sSUFBSSxnQkFBZ0I7QUFDbEIsWUFBTyxJQUFJLEtBQUs7O0lBRW5CLEVBQUU7O0FBRUwsUUFDRSxjQUFjLFFBQVEsRUFDcEIsVUFBVSw2QkFBNkIsU0FBUyxFQUNqRCxDQUFDLENBQ0g7QUFDRCxPQUFLLFdBQVc7QUFDaEIsT0FBSyxXQUFXOztDQUVsQixRQUFRLE9BQU87QUFDYixTQUFPLElBQUkscUJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsT0FBTyxDQUFDLENBQzlDOztDQUVILEtBQUssTUFBTTtBQUNULFNBQU8sSUFBSSxxQkFBcUIsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7QUFHekUsSUFBSSxnQkFBZ0IsY0FBYyxZQUFZO0NBQzVDO0NBQ0E7Q0FDQSxZQUFZLElBQUksS0FBSztBQUNuQixRQUFNLE9BQU8saUJBQWlCLEdBQUcsZUFBZSxJQUFJLGNBQWMsQ0FBQztBQUNuRSxPQUFLLEtBQUs7QUFDVixPQUFLLE1BQU07O0NBRWIsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLG9CQUFvQixNQUFNLElBQUksaUJBQWlCLEVBQUUsY0FBYyxPQUFPLENBQUMsQ0FBQzs7O0FBR3ZGLElBQUksY0FBYyxjQUFjLFlBQVk7Q0FDMUMsY0FBYztBQUNaLFFBQU07R0FBRSxLQUFLO0dBQVcsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFO0dBQUUsQ0FBQzs7O0FBR3RELElBQUksYUFBYSxjQUFjLFlBQVk7Q0FDekM7Q0FDQTtDQUNBLFlBQVksS0FBSyxNQUFNO0VBQ3JCLE1BQU0sWUFBWSxPQUFPLFlBQ3ZCLE9BQU8sUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsYUFBYSxDQUM5QyxTQUNBLG1CQUFtQixnQkFBZ0IsVUFBVSxJQUFJLGNBQWMsU0FBUyxFQUFFLENBQUMsQ0FDNUUsQ0FBQyxDQUNIO0VBQ0QsTUFBTSxXQUFXLE9BQU8sS0FBSyxVQUFVLENBQUMsS0FBSyxXQUFXO0dBQ3RELE1BQU07R0FDTixJQUFJLGdCQUFnQjtBQUNsQixXQUFPLFVBQVUsT0FBTyxZQUFZOztHQUV2QyxFQUFFO0FBQ0gsUUFBTSxjQUFjLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUMxQyxPQUFLLE1BQU07QUFDWCxPQUFLLFdBQVc7OztBQUdwQixJQUFJLGlCQUFpQixjQUFjLFlBQVk7Q0FDN0M7Q0FDQTtDQUNBLFlBQVksVUFBVSxNQUFNO0VBQzFCLFNBQVMsNkJBQTZCLFdBQVc7QUFDL0MsVUFBTyxPQUFPLEtBQUssVUFBVSxDQUFDLEtBQUssU0FBUztJQUMxQyxNQUFNO0lBSU4sSUFBSSxnQkFBZ0I7QUFDbEIsWUFBTyxVQUFVLEtBQUs7O0lBRXpCLEVBQUU7O0FBRUwsUUFDRSxjQUFjLElBQUksRUFDaEIsVUFBVSw2QkFBNkIsU0FBUyxFQUNqRCxDQUFDLENBQ0g7QUFDRCxPQUFLLFdBQVc7QUFDaEIsT0FBSyxXQUFXO0FBQ2hCLE9BQUssTUFBTSxPQUFPLE9BQU8sS0FBSyxTQUFTLEVBQUU7R0FDdkMsTUFBTSxPQUFPLE9BQU8seUJBQXlCLFVBQVUsSUFBSTtHQUMzRCxNQUFNLGFBQWEsQ0FBQyxDQUFDLFNBQVMsT0FBTyxLQUFLLFFBQVEsY0FBYyxPQUFPLEtBQUssUUFBUTtHQUNwRixJQUFJLFVBQVU7QUFDZCxPQUFJLENBQUMsV0FFSCxXQURnQixTQUFTLGdCQUNJO0FBRS9CLE9BQUksU0FBUztJQUNYLE1BQU0sV0FBVyxLQUFLLE9BQU8sSUFBSTtBQUNqQyxXQUFPLGVBQWUsTUFBTSxLQUFLO0tBQy9CLE9BQU87S0FDUCxVQUFVO0tBQ1YsWUFBWTtLQUNaLGNBQWM7S0FDZixDQUFDO1VBQ0c7SUFDTCxNQUFNLE9BQU8sVUFBVSxLQUFLLE9BQU8sS0FBSyxNQUFNO0FBQzlDLFdBQU8sZUFBZSxNQUFNLEtBQUs7S0FDL0IsT0FBTztLQUNQLFVBQVU7S0FDVixZQUFZO0tBQ1osY0FBYztLQUNmLENBQUM7Ozs7Q0FJUixPQUFPLEtBQUssT0FBTztBQUNqQixTQUFPLFVBQVUsS0FBSyxJQUFJLEVBQUUsS0FBSyxHQUFHO0dBQUU7R0FBSztHQUFPOztDQUVwRCxRQUFRLE9BQU87QUFDYixTQUFPLElBQUksaUJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsT0FBTyxDQUFDLENBQzlDOztDQUVILEtBQUssTUFBTTtBQUNULFNBQU8sSUFBSSxpQkFBaUIsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7QUFHckUsSUFBSSxhQUFhO0FBQ2pCLElBQUksdUJBQXVCLGNBQWMsZUFBZTtDQUN0RCxNQUFNLFlBQVksU0FBUztBQUN6QixTQUFPLElBQUksdUJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQy9DOztDQUVILGFBQWE7QUFDWCxTQUFPLElBQUksdUJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsTUFBTSxDQUFDLENBQzdDOzs7QUFJTCxJQUFJLG9CQUFvQixjQUFjLFlBQVk7Q0FDaEQsY0FBYztBQUNaLFFBQU0sb0JBQW9CLGtCQUFrQixDQUFDOztDQUUvQyxRQUFRLE9BQU87QUFDYixTQUFPLElBQUksd0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsT0FBTyxDQUFDLENBQzlDOztDQUVILEtBQUssTUFBTTtBQUNULFNBQU8sSUFBSSx3QkFBd0IsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7QUFHNUUsSUFBSSxrQkFBa0IsY0FBYyxZQUFZO0NBQzlDLGNBQWM7QUFDWixRQUFNLFNBQVMsa0JBQWtCLENBQUM7O0NBRXBDLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxzQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsV0FBVyxXQUFXLENBQUMsQ0FDL0M7O0NBRUgsU0FBUztBQUNQLFNBQU8sSUFBSSxzQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsVUFBVSxNQUFNLENBQUMsQ0FDekM7O0NBRUgsYUFBYTtBQUNYLFNBQU8sSUFBSSxzQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDN0M7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSxzQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsaUJBQWlCLE1BQU0sQ0FBQyxDQUNoRDs7Q0FFSCxRQUFRLE9BQU87QUFDYixTQUFPLElBQUksc0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsT0FBTyxDQUFDLENBQzlDOztDQUVILEtBQUssTUFBTTtBQUNULFNBQU8sSUFBSSxzQkFBc0IsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7QUFHMUUsSUFBSSxzQkFBc0IsY0FBYyxZQUFZO0NBQ2xELGNBQWM7QUFDWixRQUFNLGFBQWEsa0JBQWtCLENBQUM7O0NBRXhDLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSwwQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsV0FBVyxXQUFXLENBQUMsQ0FDL0M7O0NBRUgsU0FBUztBQUNQLFNBQU8sSUFBSSwwQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsVUFBVSxNQUFNLENBQUMsQ0FDekM7O0NBRUgsYUFBYTtBQUNYLFNBQU8sSUFBSSwwQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDN0M7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSwwQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsaUJBQWlCLE1BQU0sQ0FBQyxDQUNoRDs7Q0FFSCxRQUFRLE9BQU87QUFDYixTQUFPLElBQUksMEJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsT0FBTyxDQUFDLENBQzlDOztDQUVILEtBQUssTUFBTTtBQUNULFNBQU8sSUFBSSwwQkFBMEIsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7QUFHOUUsSUFBSSxtQkFBbUIsY0FBYyxZQUFZO0NBQy9DLGNBQWM7QUFDWixRQUFNLFVBQVUsa0JBQWtCLENBQUM7O0NBRXJDLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSx1QkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsV0FBVyxXQUFXLENBQUMsQ0FDL0M7O0NBRUgsU0FBUztBQUNQLFNBQU8sSUFBSSx1QkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsVUFBVSxNQUFNLENBQUMsQ0FDekM7O0NBRUgsYUFBYTtBQUNYLFNBQU8sSUFBSSx1QkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDN0M7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSx1QkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsaUJBQWlCLE1BQU0sQ0FBQyxDQUNoRDs7Q0FFSCxRQUFRLE9BQU87QUFDYixTQUFPLElBQUksdUJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsT0FBTyxDQUFDLENBQzlDOztDQUVILEtBQUssTUFBTTtBQUNULFNBQU8sSUFBSSx1QkFBdUIsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7QUFHM0UsSUFBSSxzQkFBc0IsY0FBYyxZQUFZO0NBQ2xELGNBQWM7QUFDWixRQUFNLGFBQWEsa0JBQWtCLENBQUM7O0NBRXhDLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSwwQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsV0FBVyxXQUFXLENBQUMsQ0FDL0M7O0NBRUgsU0FBUztBQUNQLFNBQU8sSUFBSSwwQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsVUFBVSxNQUFNLENBQUMsQ0FDekM7O0NBRUgsYUFBYTtBQUNYLFNBQU8sSUFBSSwwQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDN0M7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSwwQkFDVCxNQUNBLElBQUksaUJBQWlCLEVBQUUsaUJBQWlCLE1BQU0sQ0FBQyxDQUNoRDs7Q0FFSCxRQUFRLE9BQU87QUFDYixTQUFPLElBQUksMEJBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsT0FBTyxDQUFDLENBQzlDOztDQUVILEtBQUssTUFBTTtBQUNULFNBQU8sSUFBSSwwQkFBMEIsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7QUFHOUUsSUFBSSxjQUFjLGNBQWMsWUFBWTtDQUMxQyxjQUFjO0FBQ1osUUFBTSxLQUFLLGtCQUFrQixDQUFDOztDQUVoQyxNQUFNLFlBQVksU0FBUztBQUN6QixTQUFPLElBQUksa0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQy9DOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksa0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLFVBQVUsTUFBTSxDQUFDLENBQ3pDOztDQUVILGFBQWE7QUFDWCxTQUFPLElBQUksa0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGNBQWMsTUFBTSxDQUFDLENBQzdDOztDQUVILFVBQVU7QUFDUixTQUFPLElBQUksa0JBQ1QsTUFDQSxJQUFJLGlCQUFpQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDaEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGtCQUNULE1BQ0EsSUFBSSxpQkFBaUIsRUFBRSxjQUFjLE9BQU8sQ0FBQyxDQUM5Qzs7Q0FFSCxLQUFLLE1BQU07QUFDVCxTQUFPLElBQUksa0JBQWtCLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQzs7O0FBR3RFLElBQUksa0JBQWtCLEVBQUU7QUFDeEIsSUFBSSxnQkFBZ0IsTUFBTTtDQUN4QjtDQUNBO0NBQ0EsWUFBWSxhQUFhLFVBQVU7QUFDakMsT0FBSyxjQUFjO0FBQ25CLE9BQUssaUJBQWlCOztDQUV4QixVQUFVLFFBQVEsT0FBTztBQUN2QixPQUFLLFlBQVksVUFBVSxRQUFRLE1BQU07O0NBRTNDLFlBQVksUUFBUTtBQUNsQixTQUFPLEtBQUssWUFBWSxZQUFZLE9BQU87OztBQUcvQyxJQUFJLGtCQUFrQixNQUFNLHlCQUF5QixjQUFjO0NBQ2pFLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxpQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksaUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLGlCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSxpQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDcEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGlCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQ3ZCLGNBQWMsT0FDZixDQUFDLENBQ0g7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLGlCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLG1CQUFtQixNQUFNLDBCQUEwQixjQUFjO0NBQ25FLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxrQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksa0JBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSxrQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDcEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQ3ZCLGNBQWMsT0FDZixDQUFDLENBQ0g7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLG1CQUFtQixNQUFNLDBCQUEwQixjQUFjO0NBQ25FLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxrQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksa0JBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSxrQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDcEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQ3ZCLGNBQWMsT0FDZixDQUFDLENBQ0g7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLG1CQUFtQixNQUFNLDBCQUEwQixjQUFjO0NBQ25FLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxrQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksa0JBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSxrQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDcEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQ3ZCLGNBQWMsT0FDZixDQUFDLENBQ0g7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLG9CQUFvQixNQUFNLDJCQUEyQixjQUFjO0NBQ3JFLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxtQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksbUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSxtQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDcEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQ3ZCLGNBQWMsT0FDZixDQUFDLENBQ0g7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLG9CQUFvQixNQUFNLDJCQUEyQixjQUFjO0NBQ3JFLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxtQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksbUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSxtQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDcEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQ3ZCLGNBQWMsT0FDZixDQUFDLENBQ0g7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLGtCQUFrQixNQUFNLHlCQUF5QixjQUFjO0NBQ2pFLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxpQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksaUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLGlCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSxpQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDcEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGlCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQ3ZCLGNBQWMsT0FDZixDQUFDLENBQ0g7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLGlCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLG1CQUFtQixNQUFNLDBCQUEwQixjQUFjO0NBQ25FLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxrQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksa0JBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSxrQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDcEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQ3ZCLGNBQWMsT0FDZixDQUFDLENBQ0g7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLG1CQUFtQixNQUFNLDBCQUEwQixjQUFjO0NBQ25FLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxrQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksa0JBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSxrQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDcEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQ3ZCLGNBQWMsT0FDZixDQUFDLENBQ0g7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLG1CQUFtQixNQUFNLDBCQUEwQixjQUFjO0NBQ25FLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxrQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksa0JBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSxrQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDcEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQ3ZCLGNBQWMsT0FDZixDQUFDLENBQ0g7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLGtCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLG9CQUFvQixNQUFNLDJCQUEyQixjQUFjO0NBQ3JFLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxtQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksbUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSxtQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDcEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQ3ZCLGNBQWMsT0FDZixDQUFDLENBQ0g7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLG9CQUFvQixNQUFNLDJCQUEyQixjQUFjO0NBQ3JFLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxtQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksbUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsVUFBVTtBQUNSLFNBQU8sSUFBSSxtQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLGlCQUFpQixNQUFNLENBQUMsQ0FDcEQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQ3ZCLGNBQWMsT0FDZixDQUFDLENBQ0g7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLG1CQUFtQixNQUFNLDBCQUEwQixjQUFjO0NBQ25FLFFBQVEsT0FBTztBQUNiLFNBQU8sSUFBSSxrQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUN2QixjQUFjLE9BQ2YsQ0FBQyxDQUNIOztDQUVILEtBQUssTUFBTTtBQUNULFNBQU8sSUFBSSxrQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUNuQzs7O0FBR0wsSUFBSSxtQkFBbUIsTUFBTSwwQkFBMEIsY0FBYztDQUNuRSxRQUFRLE9BQU87QUFDYixTQUFPLElBQUksa0JBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFDdkIsY0FBYyxPQUNmLENBQUMsQ0FDSDs7Q0FFSCxLQUFLLE1BQU07QUFDVCxTQUFPLElBQUksa0JBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FDbkM7OztBQUdMLElBQUksb0JBQW9CLE1BQU0sMkJBQTJCLGNBQWM7Q0FDckUsTUFBTSxZQUFZLFNBQVM7QUFDekIsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsV0FBVyxXQUFXLENBQUMsQ0FDbkQ7O0NBRUgsU0FBUztBQUNQLFNBQU8sSUFBSSxtQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFVBQVUsTUFBTSxDQUFDLENBQzdDOztDQUVILGFBQWE7QUFDWCxTQUFPLElBQUksbUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxjQUFjLE1BQU0sQ0FBQyxDQUNqRDs7Q0FFSCxRQUFRLE9BQU87QUFDYixTQUFPLElBQUksbUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFDdkIsY0FBYyxPQUNmLENBQUMsQ0FDSDs7Q0FFSCxLQUFLLE1BQU07QUFDVCxTQUFPLElBQUksbUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FDbkM7OztBQUdMLElBQUksc0JBQXNCLE1BQU0sNkJBQTZCLGNBQWM7Q0FDekUsTUFBTSxZQUFZLFNBQVM7QUFDekIsU0FBTyxJQUFJLHFCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsV0FBVyxXQUFXLENBQUMsQ0FDbkQ7O0NBRUgsU0FBUztBQUNQLFNBQU8sSUFBSSxxQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFVBQVUsTUFBTSxDQUFDLENBQzdDOztDQUVILGFBQWE7QUFDWCxTQUFPLElBQUkscUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxjQUFjLE1BQU0sQ0FBQyxDQUNqRDs7Q0FFSCxRQUFRLE9BQU87QUFDYixTQUFPLElBQUkscUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFDdkIsY0FBYyxPQUNmLENBQUMsQ0FDSDs7Q0FFSCxLQUFLLE1BQU07QUFDVCxTQUFPLElBQUkscUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FDbkM7OztBQUdMLElBQUkscUJBQXFCLE1BQU0sNEJBQTRCLGNBQWM7Q0FDdkUsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLG9CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQ3ZCLGNBQWMsT0FDZixDQUFDLENBQ0g7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLG9CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLHlCQUF5QixNQUFNLGdDQUFnQyxjQUFjO0NBQy9FLFlBQVksVUFBVTtBQUNwQixRQUFNLElBQUksWUFBWSxjQUFjLE1BQU0sY0FBYyxHQUFHLENBQUMsRUFBRSxTQUFTOztDQUV6RSxRQUFRLE9BQU87QUFDYixTQUFPLElBQUksd0JBQ1QsSUFBSSxLQUFLLGdCQUFnQixFQUFFLGNBQWMsT0FBTyxDQUFDLENBQ2xEOztDQUVILEtBQUssTUFBTTtBQUNULFNBQU8sSUFBSSx3QkFBd0IsSUFBSSxLQUFLLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7QUFHMUUsSUFBSSxzQkFBc0IsTUFBTSw2QkFBNkIsY0FBYztDQUN6RSxRQUFRLE9BQU87QUFDYixTQUFPLElBQUkscUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFDdkIsY0FBYyxPQUNmLENBQUMsQ0FDSDs7Q0FFSCxLQUFLLE1BQU07QUFDVCxTQUFPLElBQUkscUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FDbkM7OztBQUdMLElBQUksc0JBQXNCLE1BQU0sNkJBQTZCLGNBQWM7Q0FDekUsWUFBWSxhQUFhLFVBQVU7QUFDakMsUUFBTSxhQUFhLFNBQVM7O0NBRTlCLFFBQVEsT0FBTztBQUNiLFNBQU8sSUFBSSxxQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUN2QixjQUFjLE9BQ2YsQ0FBQyxDQUNIOzs7QUFHTCxJQUFJLHVCQUF1QixNQUFNLDhCQUE4QixjQUFjO0NBQzNFLFFBQVEsT0FBTztBQUNiLFNBQU8sSUFBSSxzQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLGNBQWMsT0FBTyxDQUFDLENBQ2xEOztDQUVILEtBQUssTUFBTTtBQUNULFNBQU8sSUFBSSxzQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUNuQzs7O0FBR0wsSUFBSSxtQkFBbUIsTUFBTSwwQkFBMEIsY0FBYztDQUNuRSxRQUFRLE9BQU87QUFDYixTQUFPLElBQUksa0JBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxjQUFjLE9BQU8sQ0FBQyxDQUNsRDs7Q0FFSCxLQUFLLE1BQU07QUFDVCxTQUFPLElBQUksa0JBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FDbkM7OztBQUdMLElBQUkseUJBQXlCLE1BQU0sZ0NBQWdDLGlCQUFpQjtDQUNsRixNQUFNLFlBQVksU0FBUztBQUN6QixTQUFPLElBQUksd0JBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxXQUFXLFdBQVcsQ0FBQyxDQUNuRDs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLHdCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7OztBQUdMLElBQUksMEJBQTBCLE1BQU0saUNBQWlDLGNBQWM7Q0FDakYsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLHlCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxPQUFPLENBQUMsQ0FDbEQ7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLHlCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLHdCQUF3QixNQUFNLCtCQUErQixjQUFjO0NBQzdFLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSx1QkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksdUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLHVCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLHVCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxPQUFPLENBQUMsQ0FDbEQ7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLHVCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLDRCQUE0QixNQUFNLG1DQUFtQyxjQUFjO0NBQ3JGLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSwyQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksMkJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLDJCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLDJCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxPQUFPLENBQUMsQ0FDbEQ7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLDJCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLHlCQUF5QixNQUFNLGdDQUFnQyxjQUFjO0NBQy9FLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSx3QkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksd0JBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLHdCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLHdCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxPQUFPLENBQUMsQ0FDbEQ7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLHdCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLDRCQUE0QixNQUFNLG1DQUFtQyxjQUFjO0NBQ3JGLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSwyQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksMkJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLDJCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLDJCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxPQUFPLENBQUMsQ0FDbEQ7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLDJCQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLG9CQUFvQixNQUFNLDJCQUEyQixjQUFjO0NBQ3JFLE1BQU0sWUFBWSxTQUFTO0FBQ3pCLFNBQU8sSUFBSSxtQkFDVCxLQUFLLGFBQ0wsSUFBSSxLQUFLLGdCQUFnQixFQUFFLFdBQVcsV0FBVyxDQUFDLENBQ25EOztDQUVILFNBQVM7QUFDUCxTQUFPLElBQUksbUJBQ1QsS0FBSyxhQUNMLElBQUksS0FBSyxnQkFBZ0IsRUFBRSxVQUFVLE1BQU0sQ0FBQyxDQUM3Qzs7Q0FFSCxhQUFhO0FBQ1gsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxNQUFNLENBQUMsQ0FDakQ7O0NBRUgsUUFBUSxPQUFPO0FBQ2IsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsY0FBYyxPQUFPLENBQUMsQ0FDbEQ7O0NBRUgsS0FBSyxNQUFNO0FBQ1QsU0FBTyxJQUFJLG1CQUNULEtBQUssYUFDTCxJQUFJLEtBQUssZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQ25DOzs7QUFHTCxJQUFJLGFBQWEsY0FBYyxZQUFZO0NBQ3pDOztDQUVBO0NBQ0EsWUFBWSxLQUFLO0FBQ2YsUUFBTSxjQUFjLElBQUksSUFBSSxDQUFDO0FBQzdCLE9BQUssTUFBTTs7O0FBR2YsSUFBSSxhQUFhLFdBQVcsYUFBYTtDQUN2QyxJQUFJLE1BQU07Q0FDVixJQUFJLE9BQU8sS0FBSztBQUNoQixLQUFJLE9BQU8sY0FBYyxVQUFVO0FBQ2pDLE1BQUksQ0FBQyxTQUNILE9BQU0sSUFBSSxVQUNSLDZFQUNEO0FBRUgsUUFBTTtBQUNOLFNBQU87O0FBRVQsS0FBSSxNQUFNLFFBQVEsSUFBSSxFQUFFO0VBQ3RCLE1BQU0sb0JBQW9CLEVBQUU7QUFDNUIsT0FBSyxNQUFNLFdBQVcsSUFDcEIsbUJBQWtCLFdBQVcsSUFBSSxhQUFhO0FBRWhELFNBQU8sSUFBSSxxQkFBcUIsbUJBQW1CLEtBQUs7O0FBRTFELFFBQU8sSUFBSSxXQUFXLEtBQUssS0FBSzs7QUFFbEMsSUFBSSxJQUFJO0NBTU4sWUFBWSxJQUFJLGFBQWE7Q0FNN0IsY0FBYyxJQUFJLGVBQWU7Q0FNakMsY0FBYyxJQUFJLFlBQVk7Q0FNOUIsVUFBVSxJQUFJLFdBQVc7Q0FNekIsVUFBVSxJQUFJLFdBQVc7Q0FNekIsV0FBVyxJQUFJLFlBQVk7Q0FNM0IsV0FBVyxJQUFJLFlBQVk7Q0FNM0IsV0FBVyxJQUFJLFlBQVk7Q0FNM0IsV0FBVyxJQUFJLFlBQVk7Q0FNM0IsV0FBVyxJQUFJLFlBQVk7Q0FNM0IsV0FBVyxJQUFJLFlBQVk7Q0FNM0IsWUFBWSxJQUFJLGFBQWE7Q0FNN0IsWUFBWSxJQUFJLGFBQWE7Q0FNN0IsWUFBWSxJQUFJLGFBQWE7Q0FNN0IsWUFBWSxJQUFJLGFBQWE7Q0FNN0IsV0FBVyxJQUFJLFlBQVk7Q0FNM0IsV0FBVyxJQUFJLFlBQVk7Q0FZM0IsVUFBVSxXQUFXLGFBQWE7QUFDaEMsTUFBSSxPQUFPLGNBQWMsVUFBVTtBQUNqQyxPQUFJLENBQUMsU0FDSCxPQUFNLElBQUksVUFDUiwyREFDRDtBQUVILFVBQU8sSUFBSSxlQUFlLFVBQVUsVUFBVTs7QUFFaEQsU0FBTyxJQUFJLGVBQWUsV0FBVyxLQUFLLEVBQUU7O0NBa0I5QyxPQUFPLFdBQVcsYUFBYTtFQUM3QixNQUFNLENBQUMsS0FBSyxRQUFRLE9BQU8sY0FBYyxXQUFXLENBQUMsVUFBVSxVQUFVLEdBQUcsQ0FBQyxXQUFXLEtBQUssRUFBRTtBQUMvRixTQUFPLElBQUksV0FBVyxLQUFLLEtBQUs7O0NBUWxDLE1BQU0sR0FBRztBQUNQLFNBQU8sSUFBSSxhQUFhLEVBQUU7O0NBRTVCLE1BQU07Q0FNTixPQUFPO0FBQ0wsU0FBTyxJQUFJLGFBQWE7O0NBUTFCLEtBQUssT0FBTztFQUNWLElBQUksU0FBUztFQUNiLE1BQU0sWUFBWSxXQUFXLE9BQU87QUF1QnBDLFNBdEJjLElBQUksTUFBTSxFQUFFLEVBQUU7R0FDMUIsSUFBSSxJQUFJLE1BQU0sTUFBTTtJQUNsQixNQUFNLFNBQVMsS0FBSztJQUNwQixNQUFNLE1BQU0sUUFBUSxJQUFJLFFBQVEsTUFBTSxLQUFLO0FBQzNDLFdBQU8sT0FBTyxRQUFRLGFBQWEsSUFBSSxLQUFLLE9BQU8sR0FBRzs7R0FFeEQsSUFBSSxJQUFJLE1BQU0sT0FBTyxNQUFNO0FBQ3pCLFdBQU8sUUFBUSxJQUFJLEtBQUssRUFBRSxNQUFNLE9BQU8sS0FBSzs7R0FFOUMsSUFBSSxJQUFJLE1BQU07QUFDWixXQUFPLFFBQVEsS0FBSzs7R0FFdEIsVUFBVTtBQUNSLFdBQU8sUUFBUSxRQUFRLEtBQUssQ0FBQzs7R0FFL0IseUJBQXlCLElBQUksTUFBTTtBQUNqQyxXQUFPLE9BQU8seUJBQXlCLEtBQUssRUFBRSxLQUFLOztHQUVyRCxpQkFBaUI7QUFDZixXQUFPLE9BQU8sZUFBZSxLQUFLLENBQUM7O0dBRXRDLENBQUM7O0NBT0osa0JBQWtCO0FBQ2hCLFNBQU8sSUFBSSxtQkFBbUI7O0NBUWhDLE9BQU8sT0FBTztBQUNaLFNBQU8sSUFBSSxjQUFjLE1BQU07O0NBU2pDLE9BQU8sSUFBSSxLQUFLO0FBQ2QsU0FBTyxJQUFJLGNBQWMsSUFBSSxJQUFJOztDQU9uQyxnQkFBZ0I7QUFDZCxTQUFPLElBQUksaUJBQWlCOztDQU85QixvQkFBb0I7QUFDbEIsU0FBTyxJQUFJLHFCQUFxQjs7Q0FPbEMsaUJBQWlCO0FBQ2YsU0FBTyxJQUFJLGtCQUFrQjs7Q0FPL0Isb0JBQW9CO0FBQ2xCLFNBQU8sSUFBSSxxQkFBcUI7O0NBT2xDLFlBQVk7QUFDVixTQUFPLElBQUksYUFBYTs7Q0FRMUIsaUJBQWlCO0FBQ2YsU0FBTyxJQUFJLGtCQUFrQjs7Q0FFaEM7QUFHRCxJQUFJLGlCQUFpQixFQUFFLEtBQUssaUJBQWlCO0NBQzNDLEtBQUssRUFBRSxLQUFLO0NBQ1osSUFBSSxNQUFNO0FBQ1IsU0FBTzs7Q0FFVCxJQUFJLFVBQVU7QUFDWixTQUFPOztDQUVULElBQUksUUFBUTtBQUNWLFNBQU87O0NBRVQsUUFBUSxFQUFFLE1BQU07Q0FDaEIsTUFBTSxFQUFFLE1BQU07Q0FDZCxJQUFJLEVBQUUsTUFBTTtDQUNaLElBQUksRUFBRSxNQUFNO0NBQ1osS0FBSyxFQUFFLE1BQU07Q0FDYixLQUFLLEVBQUUsTUFBTTtDQUNiLEtBQUssRUFBRSxNQUFNO0NBQ2IsS0FBSyxFQUFFLE1BQU07Q0FDYixLQUFLLEVBQUUsTUFBTTtDQUNiLEtBQUssRUFBRSxNQUFNO0NBQ2IsTUFBTSxFQUFFLE1BQU07Q0FDZCxNQUFNLEVBQUUsTUFBTTtDQUNkLE1BQU0sRUFBRSxNQUFNO0NBQ2QsTUFBTSxFQUFFLE1BQU07Q0FDZCxLQUFLLEVBQUUsTUFBTTtDQUNiLEtBQUssRUFBRSxNQUFNO0NBQ2QsQ0FBQztBQUNGLElBQUksdUJBQXVCLEVBQUUsS0FBSyx3QkFBd0I7Q0FDeEQsTUFBTSxFQUFFLE1BQU07Q0FDZCxXQUFXLEVBQUUsTUFBTTtDQUNwQixDQUFDO0FBQ0YsSUFBSSxvQkFBb0IsRUFBRSxLQUFLLHFCQUFxQjtDQUNsRCxJQUFJLFFBQVE7QUFDVixTQUFPOztDQUVULElBQUksV0FBVztBQUNiLFNBQU87O0NBRVQsSUFBSSxRQUFRO0FBQ1YsU0FBTzs7Q0FFVixDQUFDO0FBQ0YsSUFBSSxnQkFBZ0IsRUFBRSxPQUFPLGlCQUFpQixFQUM1QyxJQUFJLFVBQVU7QUFDWixRQUFPLEVBQUUsTUFBTSxrQkFBa0I7R0FFcEMsQ0FBQztBQUNGLElBQUkscUJBQXFCLEVBQUUsS0FBSyxzQkFBc0I7Q0FDcEQsU0FBUyxFQUFFLE1BQU07Q0FDakIsZ0JBQWdCLEVBQUUsTUFBTTtDQUN6QixDQUFDO0FBQ0YsSUFBSSxpQkFBaUIsRUFBRSxPQUFPLGtCQUFrQjtDQUM5QyxNQUFNLEVBQUUsUUFBUTtDQUNoQixPQUFPLEVBQUUsV0FBVztDQUNyQixDQUFDO0FBQ0YsSUFBSSxjQUFjLEVBQUUsT0FBTyxlQUFlLEVBQ3hDLElBQUksVUFBVTtBQUNaLFFBQU8sRUFBRSxNQUFNLGVBQWU7R0FFakMsQ0FBQztBQUNGLElBQUksYUFBYSxFQUFFLEtBQUssY0FBYztDQUNwQyxLQUFLLEVBQUUsTUFBTTtDQUNiLE1BQU0sRUFBRSxNQUFNO0NBQ2QsTUFBTSxFQUFFLE1BQU07Q0FDZCxLQUFLLEVBQUUsTUFBTTtDQUNiLFFBQVEsRUFBRSxNQUFNO0NBQ2hCLFNBQVMsRUFBRSxNQUFNO0NBQ2pCLFNBQVMsRUFBRSxNQUFNO0NBQ2pCLE9BQU8sRUFBRSxNQUFNO0NBQ2YsT0FBTyxFQUFFLE1BQU07Q0FDZixXQUFXLEVBQUUsUUFBUTtDQUN0QixDQUFDO0FBQ0YsSUFBSSxjQUFjLEVBQUUsT0FBTyxlQUFlO0NBQ3hDLElBQUksU0FBUztBQUNYLFNBQU87O0NBRVQsSUFBSSxVQUFVO0FBQ1osU0FBTzs7Q0FFVCxTQUFTLEVBQUUsT0FBTyxFQUFFLGNBQWMsQ0FBQztDQUNuQyxLQUFLLEVBQUUsUUFBUTtDQUNmLElBQUksVUFBVTtBQUNaLFNBQU87O0NBRVYsQ0FBQztBQUNGLElBQUksZUFBZSxFQUFFLE9BQU8sZ0JBQWdCO0NBQzFDLElBQUksVUFBVTtBQUNaLFNBQU87O0NBRVQsSUFBSSxVQUFVO0FBQ1osU0FBTzs7Q0FFVCxNQUFNLEVBQUUsS0FBSztDQUNkLENBQUM7QUFDRixJQUFJLGNBQWMsRUFBRSxLQUFLLGVBQWU7Q0FDdEMsUUFBUSxFQUFFLE1BQU07Q0FDaEIsUUFBUSxFQUFFLE1BQU07Q0FDaEIsUUFBUSxFQUFFLE1BQU07Q0FDaEIsT0FBTyxFQUFFLE1BQU07Q0FDZixPQUFPLEVBQUUsTUFBTTtDQUNoQixDQUFDO0FBQ0YsSUFBSSxZQUFZLEVBQUUsS0FBSyxhQUFhO0NBQ2xDLE9BQU8sRUFBRSxNQUFNO0NBQ2YsTUFBTSxFQUFFLE1BQU07Q0FDZixDQUFDO0FBQ0YsSUFBSSxZQUFZLEVBQUUsS0FBSyxhQUFhO0NBQ2xDLE1BQU0sRUFBRSxNQUFNO0NBQ2QsV0FBVyxFQUFFLE1BQU07Q0FDbkIsY0FBYyxFQUFFLE1BQU07Q0FDdkIsQ0FBQztBQUNGLElBQUksbUJBQW1CLEVBQUUsS0FBSyxvQkFBb0IsRUFDaEQsSUFBSSxZQUFZO0FBQ2QsUUFBTztHQUVWLENBQUM7QUFDRixJQUFJLGNBQWMsRUFBRSxPQUFPLGVBQWU7Q0FDeEMsWUFBWSxFQUFFLFFBQVE7Q0FDdEIsZUFBZSxFQUFFLFFBQVE7Q0FDMUIsQ0FBQztBQUNGLElBQUksZUFBZSxFQUFFLE9BQU8sZUFBZSxFQUN6QyxJQUFJLFdBQVc7QUFDYixRQUFPLEVBQUUsTUFBTSxtQkFBbUI7R0FFckMsQ0FBQztBQUNGLElBQUkscUJBQXFCLEVBQUUsT0FBTyxzQkFBc0I7Q0FDdEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7Q0FDMUIsSUFBSSxnQkFBZ0I7QUFDbEIsU0FBTzs7Q0FFVixDQUFDO0FBQ0YsSUFBSSxpQkFBaUIsRUFBRSxPQUFPLGtCQUFrQjtDQUM5QyxTQUFTLEVBQUUsUUFBUTtDQUNuQixJQUFJLFVBQVU7QUFDWixTQUFPOztDQUVWLENBQUM7QUFDRixJQUFJLDJCQUEyQixFQUFFLE9BQU8sNEJBQTRCO0NBQ2xFLE9BQU8sRUFBRSxLQUFLO0NBQ2QsT0FBTyxFQUFFLFdBQVc7Q0FDckIsQ0FBQztBQUNGLElBQUksMEJBQTBCLEVBQUUsT0FBTywyQkFBMkI7Q0FDaEUsT0FBTyxFQUFFLFFBQVE7Q0FDakIsT0FBTyxFQUFFLEtBQUs7Q0FDZCxPQUFPLEVBQUUsV0FBVztDQUNyQixDQUFDO0FBQ0YsSUFBSSxzQkFBc0IsRUFBRSxLQUFLLHVCQUF1QixFQUN0RCxJQUFJLFNBQVM7QUFDWCxRQUFPO0dBRVYsQ0FBQztBQUNGLElBQUksc0JBQXNCLEVBQUUsT0FBTyx1QkFBdUI7Q0FDeEQsWUFBWSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7Q0FDaEMsSUFBSSxPQUFPO0FBQ1QsU0FBTzs7Q0FFVixDQUFDO0FBQ0YsSUFBSSxxQkFBcUIsRUFBRSxPQUFPLHNCQUFzQjtDQUN0RCxnQkFBZ0IsRUFBRSxRQUFRO0NBQzFCLGFBQWEsRUFBRSxJQUFJO0NBQ25CLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDO0NBQzFCLENBQUM7QUFDRixJQUFJLHFCQUFxQixFQUFFLE9BQU8sc0JBQXNCO0NBQ3RELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO0NBQzFCLElBQUksT0FBTztBQUNULFNBQU87O0NBRVYsQ0FBQztBQUNGLElBQUksb0JBQW9CLEVBQUUsS0FBSyxxQkFBcUI7Q0FDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUM7Q0FDdkIsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUM7Q0FDdEIsUUFBUSxFQUFFLEtBQUs7Q0FDaEIsQ0FBQztBQUNGLElBQUksaUJBQWlCLEVBQUUsT0FBTyxrQkFBa0I7Q0FDOUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7Q0FDaEMsY0FBYyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7Q0FDbEMsSUFBSSxZQUFZO0FBQ2QsU0FBTzs7Q0FFVixDQUFDO0FBQ0YsSUFBSSxnQkFBZ0IsRUFBRSxPQUFPLGlCQUFpQjtDQUM1QyxXQUFXLEVBQUUsUUFBUTtDQUNyQixVQUFVLEVBQUUsTUFBTTtDQUNsQixJQUFJLFlBQVk7QUFDZCxTQUFPOztDQUVULFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDO0NBQzFCLENBQUM7QUFDRixJQUFJLGdCQUFnQixFQUFFLE9BQU8saUJBQWlCO0NBQzVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO0NBQzFCLGNBQWMsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO0NBQ2xDLElBQUksWUFBWTtBQUNkLFNBQU87O0NBRVYsQ0FBQztBQUNGLElBQUksNEJBQTRCLEVBQUUsT0FDaEMsNkJBQ0E7Q0FDRSxJQUFJLGdCQUFnQjtBQUNsQixTQUFPOztDQUVULGNBQWMsRUFBRSxRQUFRO0NBQ3pCLENBQ0Y7QUFDRCxJQUFJLHdCQUF3QixFQUFFLEtBQUsseUJBQXlCO0NBQzFELElBQUkscUJBQXFCO0FBQ3ZCLFNBQU87O0NBRVQsSUFBSSxZQUFZO0FBQ2QsU0FBTzs7Q0FFVCxJQUFJLE9BQU87QUFDVCxTQUFPOztDQUVWLENBQUM7QUFDRixJQUFJLGVBQWUsRUFBRSxLQUFLLGdCQUFnQjtDQUN4QyxJQUFJLGVBQWU7QUFDakIsU0FBTzs7Q0FFVCxJQUFJLEtBQUs7QUFDUCxTQUFPOztDQUVULElBQUksTUFBTTtBQUNSLFNBQU87O0NBRVYsQ0FBQztBQUNGLElBQUksa0JBQWtCLEVBQUUsT0FBTyxtQkFBbUIsRUFDaEQsSUFBSSxXQUFXO0FBQ2IsUUFBTyxFQUFFLE1BQU0sdUJBQXVCO0dBRXpDLENBQUM7QUFDRixJQUFJLHlCQUF5QixFQUFFLEtBQUssMEJBQTBCO0NBQzVELElBQUksWUFBWTtBQUNkLFNBQU87O0NBRVQsSUFBSSxRQUFRO0FBQ1YsU0FBTyxFQUFFLE1BQU0sY0FBYzs7Q0FFL0IsSUFBSSxTQUFTO0FBQ1gsU0FBTyxFQUFFLE1BQU0sZUFBZTs7Q0FFaEMsSUFBSSxXQUFXO0FBQ2IsU0FBTyxFQUFFLE1BQU0saUJBQWlCOztDQUVsQyxJQUFJLGFBQWE7QUFDZixTQUFPLEVBQUUsTUFBTSxtQkFBbUI7O0NBRXBDLElBQUksUUFBUTtBQUNWLFNBQU8sRUFBRSxNQUFNLGNBQWM7O0NBRS9CLElBQUksWUFBWTtBQUNkLFNBQU8sRUFBRSxNQUFNLGtCQUFrQjs7Q0FFbkMsSUFBSSxvQkFBb0I7QUFDdEIsU0FBTyxFQUFFLE1BQU0sMEJBQTBCOztDQUUzQyxJQUFJLG1CQUFtQjtBQUNyQixTQUFPLEVBQUUsTUFBTSx5QkFBeUI7O0NBRTFDLElBQUksdUJBQXVCO0FBQ3pCLFNBQU87O0NBRVQsSUFBSSxnQkFBZ0I7QUFDbEIsU0FBTzs7Q0FFVixDQUFDO0FBQ0YsSUFBSSxpQkFBaUIsRUFBRSxPQUFPLGtCQUFrQjtDQUM5QyxJQUFJLFlBQVk7QUFDZCxTQUFPOztDQUVULElBQUksU0FBUztBQUNYLFNBQU8sRUFBRSxNQUFNLFVBQVU7O0NBRTNCLElBQUksV0FBVztBQUNiLFNBQU8sRUFBRSxNQUFNLFdBQVc7O0NBRTVCLElBQUksY0FBYztBQUNoQixTQUFPLEVBQUUsTUFBTSxpQkFBaUI7O0NBRW5DLENBQUM7QUFDRixJQUFJLGlCQUFpQixFQUFFLE9BQU8sa0JBQWtCO0NBQzlDLElBQUksWUFBWTtBQUNkLFNBQU87O0NBRVQsSUFBSSxTQUFTO0FBQ1gsU0FBTyxFQUFFLE1BQU0sY0FBYzs7Q0FFL0IsSUFBSSxXQUFXO0FBQ2IsU0FBTyxFQUFFLE1BQU0sZ0JBQWdCOztDQUVqQyxJQUFJLFFBQVE7QUFDVixTQUFPLEVBQUUsTUFBTSxhQUFhOztDQUU5QixJQUFJLGNBQWM7QUFDaEIsU0FBTyxFQUFFLE1BQU0sc0JBQXNCOztDQUV2QyxJQUFJLG1CQUFtQjtBQUNyQixTQUFPLEVBQUUsTUFBTSx5QkFBeUI7O0NBRTNDLENBQUM7QUFDRixJQUFJLHFCQUFxQixFQUFFLE9BQU8sc0JBQXNCO0NBQ3RELFlBQVksRUFBRSxRQUFRO0NBQ3RCLElBQUksU0FBUztBQUNYLFNBQU87O0NBRVQsSUFBSSxhQUFhO0FBQ2YsU0FBTzs7Q0FFVCxJQUFJLGFBQWE7QUFDZixTQUFPOztDQUVWLENBQUM7QUFDRixJQUFJLG9CQUFvQixFQUFFLE9BQU8scUJBQXFCO0NBQ3BELE1BQU0sRUFBRSxRQUFRO0NBQ2hCLElBQUksU0FBUztBQUNYLFNBQU87O0NBRVQsSUFBSSxhQUFhO0FBQ2YsU0FBTzs7Q0FFVixDQUFDO0FBQ0YsSUFBSSxtQkFBbUIsRUFBRSxPQUFPLG9CQUFvQjtDQUNsRCxZQUFZLEVBQUUsUUFBUTtDQUN0QixJQUFJLFNBQVM7QUFDWCxTQUFPOztDQUVULElBQUksYUFBYTtBQUNmLFNBQU87O0NBRVQsSUFBSSxlQUFlO0FBQ2pCLFNBQU87O0NBRVQsSUFBSSxnQkFBZ0I7QUFDbEIsU0FBTzs7Q0FFVixDQUFDO0FBQ0YsSUFBSSxrQkFBa0IsRUFBRSxPQUFPLG1CQUFtQjtDQUNoRCxNQUFNLEVBQUUsUUFBUTtDQUNoQixJQUFJLFNBQVM7QUFDWCxTQUFPOztDQUVULElBQUksWUFBWTtBQUNkLFNBQU8sRUFBRSxPQUFPLFVBQVU7O0NBRTdCLENBQUM7QUFDRixJQUFJLDJCQUEyQixFQUFFLE9BQU8sNEJBQTRCLEVBQ2xFLEtBQUssRUFBRSxRQUFRLEVBQ2hCLENBQUM7QUFDRixJQUFJLG9CQUFvQixFQUFFLE9BQU8scUJBQXFCO0NBQ3BELFlBQVksRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO0NBQ2hDLFdBQVcsRUFBRSxRQUFRO0NBQ3JCLGVBQWUsRUFBRSxLQUFLO0NBQ3RCLGNBQWMsRUFBRSxRQUFRO0NBQ3pCLENBQUM7QUFDRixJQUFJLG1CQUFtQixFQUFFLE9BQU8sb0JBQW9CO0NBQ2xELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO0NBQzFCLGFBQWEsRUFBRSxRQUFRO0NBQ3ZCLG1CQUFtQixFQUFFLEtBQUs7Q0FDM0IsQ0FBQztBQUNGLElBQUksdUJBQXVCLEVBQUUsT0FBTyx3QkFBd0I7Q0FDMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7Q0FDMUIsWUFBWSxFQUFFLFFBQVE7Q0FDdkIsQ0FBQztBQUNGLElBQUksc0JBQXNCLEVBQUUsT0FBTyx1QkFBdUI7Q0FDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7Q0FDMUIsTUFBTSxFQUFFLFFBQVE7Q0FDakIsQ0FBQztBQUNGLElBQUksb0JBQW9CLEVBQUUsT0FBTyxxQkFBcUI7Q0FDcEQsWUFBWSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7Q0FDaEMsUUFBUSxFQUFFLEtBQUs7Q0FDZixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztDQUN6QixVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztDQUM1QixVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztDQUM1QixXQUFXLEVBQUUsTUFBTTtDQUNwQixDQUFDO0FBQ0YsSUFBSSxtQkFBbUIsRUFBRSxPQUFPLG9CQUFvQjtDQUNsRCxjQUFjLEVBQUUsUUFBUTtDQUN4QixRQUFRLEVBQUUsS0FBSztDQUNmLFdBQVcsRUFBRSxNQUFNO0NBQ25CLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0NBQ3pCLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0NBQzVCLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0NBQzVCLFdBQVcsRUFBRSxNQUFNO0NBQ3BCLENBQUM7QUFDRixJQUFJLG1CQUFtQixFQUFFLE9BQU8sb0JBQW9CO0NBQ2xELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO0NBQzFCLFFBQVEsRUFBRSxLQUFLO0NBQ2YsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7Q0FDekIsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7Q0FDNUIsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7Q0FDNUIsV0FBVyxFQUFFLE1BQU07Q0FDcEIsQ0FBQztBQUNGLElBQUksaUJBQWlCLEVBQUUsT0FBTyxrQkFBa0I7Q0FDOUMsWUFBWSxFQUFFLFFBQVE7Q0FDdEIsZ0JBQWdCLEVBQUUsS0FBSztDQUN2QixZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQztDQUM1QixJQUFJLFVBQVU7QUFDWixTQUFPLEVBQUUsTUFBTSxlQUFlOztDQUVoQyxJQUFJLGNBQWM7QUFDaEIsU0FBTyxFQUFFLE1BQU0sb0JBQW9COztDQUVyQyxJQUFJLFlBQVk7QUFDZCxTQUFPLEVBQUUsTUFBTSxrQkFBa0I7O0NBRW5DLElBQUksWUFBWTtBQUNkLFNBQU87O0NBRVQsSUFBSSxjQUFjO0FBQ2hCLFNBQU87O0NBRVQsSUFBSSxnQkFBZ0I7QUFDbEIsU0FBTyxFQUFFLE1BQU0seUJBQXlCOztDQUUxQyxTQUFTLEVBQUUsTUFBTTtDQUNsQixDQUFDO0FBQ0YsSUFBSSxnQkFBZ0IsRUFBRSxPQUFPLGlCQUFpQjtDQUM1QyxXQUFXLEVBQUUsUUFBUTtDQUNyQixJQUFJLFVBQVU7QUFDWixTQUFPLEVBQUUsTUFBTSxlQUFlOztDQUVoQyxJQUFJLFVBQVU7QUFDWixTQUFPLEVBQUUsTUFBTSxjQUFjOztDQUUvQixJQUFJLGNBQWM7QUFDaEIsU0FBTyxFQUFFLE1BQU0sbUJBQW1COztDQUVwQyxJQUFJLFlBQVk7QUFDZCxTQUFPLEVBQUUsTUFBTSxpQkFBaUI7O0NBRWxDLFdBQVcsRUFBRSxRQUFRO0NBQ3JCLGFBQWEsRUFBRSxRQUFRO0NBQ3ZCLFdBQVcsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO0NBQ2hDLENBQUM7QUFDRixJQUFJLGdCQUFnQixFQUFFLE9BQU8saUJBQWlCO0NBQzVDLE1BQU0sRUFBRSxRQUFRO0NBQ2hCLGdCQUFnQixFQUFFLEtBQUs7Q0FDdkIsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUM7Q0FDNUIsSUFBSSxVQUFVO0FBQ1osU0FBTyxFQUFFLE1BQU0sY0FBYzs7Q0FFL0IsSUFBSSxjQUFjO0FBQ2hCLFNBQU8sRUFBRSxNQUFNLG1CQUFtQjs7Q0FFcEMsSUFBSSxZQUFZO0FBQ2QsU0FBTyxFQUFFLE1BQU0saUJBQWlCOztDQUVsQyxJQUFJLFdBQVc7QUFDYixTQUFPLEVBQUUsT0FBTyxpQkFBaUI7O0NBRW5DLElBQUksWUFBWTtBQUNkLFNBQU87O0NBRVQsSUFBSSxjQUFjO0FBQ2hCLFNBQU87O0NBRVYsQ0FBQztBQUNGLElBQUksZ0JBQWdCLEVBQUUsT0FBTyxpQkFBaUI7Q0FDNUMsSUFBSSxhQUFhO0FBQ2YsU0FBTzs7Q0FFVCxJQUFJLEVBQUUsS0FBSztDQUNYLGdCQUFnQixFQUFFLE1BQU07Q0FDekIsQ0FBQztBQUNGLElBQUksZUFBZSxFQUFFLE9BQU8sZ0JBQWdCO0NBQzFDLElBQUksT0FBTztBQUNULFNBQU87O0NBRVQsSUFBSSxFQUFFLEtBQUs7Q0FDWCxnQkFBZ0IsRUFBRSxNQUFNO0NBQ3pCLENBQUM7QUFDRixJQUFJLDRCQUE0QixFQUFFLE9BQ2hDLDZCQUNBLEVBQ0UsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFDMUIsQ0FDRjtBQUNELElBQUksZ0JBQWdCLEVBQUUsT0FBTyxpQkFBaUI7Q0FDNUMsWUFBWSxFQUFFLFFBQVE7Q0FDdEIsT0FBTyxFQUFFLEtBQUs7Q0FDZCxVQUFVLEVBQUUsTUFBTTtDQUNsQixhQUFhLEVBQUUsTUFBTTtDQUNyQixJQUFJLFNBQVM7QUFDWCxTQUFPOztDQUVULElBQUksYUFBYTtBQUNmLFNBQU87O0NBRVYsQ0FBQztBQUNGLElBQUksZUFBZSxFQUFFLE9BQU8sZ0JBQWdCO0NBQzFDLE1BQU0sRUFBRSxRQUFRO0NBQ2hCLE9BQU8sRUFBRSxLQUFLO0NBQ2QsVUFBVSxFQUFFLE1BQU07Q0FDbEIsYUFBYSxFQUFFLE1BQU07Q0FDckIsSUFBSSxTQUFTO0FBQ1gsU0FBTzs7Q0FFVCxJQUFJLGFBQWE7QUFDZixTQUFPOztDQUVWLENBQUM7QUFDRixJQUFJLGFBQWEsRUFBRSxPQUFPLGNBQWM7Q0FDdEMsTUFBTSxFQUFFLFFBQVE7Q0FDaEIsSUFBSSxPQUFPO0FBQ1QsU0FBTyxFQUFFLE1BQU0sbUJBQW1COztDQUVyQyxDQUFDO0FBQ0YsSUFBSSxXQUFXLEVBQUUsT0FBTyxXQUFXLEVBQ2pDLElBQUksV0FBVztBQUNiLFFBQU8sRUFBRSxNQUFNLGVBQWU7R0FFakMsQ0FBQztBQUNGLElBQUksaUJBQWlCLEVBQUUsT0FBTyxrQkFBa0I7Q0FDOUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7Q0FDMUIsSUFBSSxnQkFBZ0I7QUFDbEIsU0FBTzs7Q0FFVixDQUFDO0FBQ0YsSUFBSSxjQUFjLEVBQUUsS0FBSyxlQUFlO0NBQ3RDLFFBQVEsRUFBRSxNQUFNO0NBQ2hCLFNBQVMsRUFBRSxNQUFNO0NBQ2xCLENBQUM7QUFDRixJQUFJLFlBQVksRUFBRSxPQUFPLGFBQWE7Q0FDcEMsSUFBSSxTQUFTO0FBQ1gsU0FBTzs7Q0FFVCxNQUFNLEVBQUUsS0FBSztDQUNkLENBQUM7QUFDRixJQUFJLFlBQVksRUFBRSxLQUFLLGFBQWE7Q0FDbEMsUUFBUSxFQUFFLE1BQU07Q0FDaEIsTUFBTSxFQUFFLE1BQU07Q0FDZixDQUFDO0FBQ0YsSUFBSSxZQUFZLEVBQUUsT0FBTyxhQUFhO0NBQ3BDLE1BQU0sRUFBRSxRQUFRO0NBQ2hCLElBQUksRUFBRSxLQUFLO0NBQ1osQ0FBQztBQUNGLElBQUksWUFBWSxFQUFFLE9BQU8sYUFBYSxFQUNwQyxJQUFJLFFBQVE7QUFDVixRQUFPLEVBQUUsTUFBTSxlQUFlO0dBRWpDLENBQUM7QUFDRixJQUFJLG1CQUFtQixFQUFFLEtBQUssb0JBQW9CO0NBQ2hELFNBQVMsRUFBRSxNQUFNO0NBQ2pCLFFBQVEsRUFBRSxRQUFRO0NBQ25CLENBQUM7QUFHRixTQUFTLGNBQWMsU0FBUyxTQUFTLFVBQVU7Q0FDakQsTUFBTSxjQUFjLE1BQU0sUUFBUSxRQUFRLGNBQWMsTUFBTSxTQUFTLEdBQUc7Q0FDMUUsTUFBTSxrQkFBa0IsU0FBUyxRQUFRLEtBQ3RDLFFBQVE7RUFDUCxNQUFNLGVBQWUsSUFBSTtBQUN6QixNQUFJLE9BQU8saUJBQWlCLFlBQVksYUFBYSxXQUFXLEVBQzlELE9BQU0sSUFBSSxVQUNSLFVBQVUsSUFBSSxjQUFjLFlBQVksY0FBYyxTQUFTLFdBQVcsNEJBQzNFO0VBRUgsTUFBTSxZQUFZLElBQUksVUFBVSxRQUFRLFdBQVcsQ0FBQyxJQUFJLFVBQVUsTUFBTSxHQUFHLElBQUksVUFBVTtBQVN6RixTQUFPO0dBQ0wsTUFBTTtHQUNOLFFBVmEsU0FBUyxZQUFZLE1BQ2pDLE1BQU0sRUFBRSxLQUFLLFFBQVEsWUFBWSxFQUFFLEtBQUssTUFBTSxRQUFRLE9BQU8sUUFBUSxVQUFVLFNBQVMsSUFBSSxDQUFDLENBQy9GO0dBU0MsV0FSZ0I7SUFDaEIsT0FBTztJQUNQLE1BQU07SUFDTixRQUFRO0lBQ1QsQ0FBQyxJQUFJLFVBQVU7R0FLZCxTQUFTLFVBQVUsSUFBSSxXQUFXO0dBQ25DO0dBRUo7QUFDRCxRQUFPO0VBSUwsWUFBWSxRQUFRLGFBQWE7RUFDakMsY0FBYztFQUNkLFNBQVMsUUFBUSxRQUFRO0VBRXpCLFNBQVMsUUFBUTtFQUVqQixTQUFTLFFBQVE7RUFDakIsYUFBYSxTQUFTLFlBQVksS0FBSyxPQUFPO0dBQzVDLE1BQU0sRUFBRTtHQUNSLFlBQVk7R0FDWixTQUFTLEVBQUUsS0FBSyxNQUFNLFFBQVEsSUFBSSxXQUFXO0dBQzlDLEVBQUU7RUFHSDtFQUNBO0VBQ0EsR0FBRyxTQUFTLFVBQVUsRUFBRSxTQUFTLE1BQU0sR0FBRyxFQUFFO0VBQzdDOztBQUVILElBQUksZ0JBQWdCLE1BQU07Q0FDeEIsaUNBQWlDLElBQUksS0FBSzs7OztDQUkxQyxhQUFhO0VBQ1gsV0FBVyxFQUFFLE9BQU8sRUFBRSxFQUFFO0VBQ3hCLFFBQVEsRUFBRTtFQUNWLFVBQVUsRUFBRTtFQUNaLE9BQU8sRUFBRTtFQUNULGtCQUFrQixFQUFFO0VBQ3BCLFdBQVcsRUFBRTtFQUNiLFlBQVksRUFBRTtFQUNkLE9BQU8sRUFBRTtFQUNULG1CQUFtQixFQUFFO0VBQ3JCLHNCQUFzQixFQUFFLEtBQUssYUFBYTtFQUMxQyxlQUFlLEVBQ2IsU0FBUyxFQUFFLEVBQ1o7RUFDRjtDQUNELElBQUksWUFBWTtBQUNkLFNBQU8sTUFBS0M7O0NBRWQsa0JBQWtCO0VBQ2hCLE1BQU0sV0FBVyxFQUFFO0VBQ25CLE1BQU0sUUFBUSxNQUFNO0FBQ2xCLE9BQUksRUFBRyxVQUFTLEtBQUssRUFBRTs7RUFFekIsTUFBTSxTQUFTLE1BQUtBO0FBQ3BCLE9BQUssT0FBTyxhQUFhO0dBQUUsS0FBSztHQUFhLE9BQU8sT0FBTztHQUFXLENBQUM7QUFDdkUsT0FBSyxPQUFPLFNBQVM7R0FBRSxLQUFLO0dBQVMsT0FBTyxPQUFPO0dBQU8sQ0FBQztBQUMzRCxPQUFLLE9BQU8sVUFBVTtHQUFFLEtBQUs7R0FBVSxPQUFPLE9BQU87R0FBUSxDQUFDO0FBQzlELE9BQUssT0FBTyxZQUFZO0dBQUUsS0FBSztHQUFZLE9BQU8sT0FBTztHQUFVLENBQUM7QUFDcEUsT0FBSyxPQUFPLGNBQWM7R0FBRSxLQUFLO0dBQWMsT0FBTyxPQUFPO0dBQVksQ0FBQztBQUMxRSxPQUFLLE9BQU8sU0FBUztHQUFFLEtBQUs7R0FBUyxPQUFPLE9BQU87R0FBTyxDQUFDO0FBQzNELE9BQUssT0FBTyxhQUFhO0dBQUUsS0FBSztHQUFhLE9BQU8sT0FBTztHQUFXLENBQUM7QUFDdkUsT0FDRSxPQUFPLHFCQUFxQjtHQUMxQixLQUFLO0dBQ0wsT0FBTyxPQUFPO0dBQ2YsQ0FDRjtBQUNELE9BQ0UsT0FBTyxvQkFBb0I7R0FDekIsS0FBSztHQUNMLE9BQU8sT0FBTztHQUNmLENBQ0Y7QUFDRCxPQUNFLE9BQU8saUJBQWlCO0dBQ3RCLEtBQUs7R0FDTCxPQUFPLE9BQU87R0FDZixDQUNGO0FBQ0QsT0FDRSxPQUFPLHdCQUF3QjtHQUM3QixLQUFLO0dBQ0wsT0FBTyxPQUFPO0dBQ2YsQ0FDRjtBQUNELFNBQU8sRUFBRSxVQUFVOzs7Ozs7Q0FNckIsd0JBQXdCLFFBQVE7QUFDOUIsUUFBS0EsVUFBVyx1QkFBdUI7O0NBRXpDLElBQUksWUFBWTtBQUNkLFNBQU8sTUFBS0EsVUFBVzs7Ozs7Ozs7Q0FRekIsWUFBWSxhQUFhO0VBQ3ZCLElBQUksS0FBSyxZQUFZO0FBQ3JCLFNBQU8sR0FBRyxRQUFRLE1BQ2hCLE1BQUssS0FBSyxVQUFVLE1BQU0sR0FBRztBQUUvQixTQUFPOzs7Ozs7Ozs7Q0FTVCx5QkFBeUIsYUFBYTtBQUNwQyxNQUFJLHVCQUF1QixrQkFBa0IsQ0FBQyxPQUFPLFlBQVksSUFBSSx1QkFBdUIsY0FBYyx1QkFBdUIsV0FDL0gsUUFBTyxNQUFLQyxnQ0FBaUMsWUFBWTtXQUNoRCx1QkFBdUIsY0FDaEMsUUFBTyxJQUFJLGNBQ1QsS0FBSyx5QkFBeUIsWUFBWSxNQUFNLENBQ2pEO1dBQ1EsdUJBQXVCLGNBQ2hDLFFBQU8sSUFBSSxjQUNULEtBQUsseUJBQXlCLFlBQVksR0FBRyxFQUM3QyxLQUFLLHlCQUF5QixZQUFZLElBQUksQ0FDL0M7V0FDUSx1QkFBdUIsYUFDaEMsUUFBTyxJQUFJLGFBQ1QsS0FBSyx5QkFBeUIsWUFBWSxRQUFRLENBQ25EO01BRUQsUUFBTzs7Q0FHWCxpQ0FBaUMsYUFBYTtFQUM1QyxNQUFNLEtBQUssWUFBWTtFQUN2QixNQUFNLE9BQU8sWUFBWTtBQUN6QixNQUFJLFNBQVMsS0FBSyxFQUNoQixPQUFNLElBQUksTUFDUix5QkFBeUIsWUFBWSxZQUFZLFFBQVEsY0FBYyxHQUFHLEtBQUssVUFBVSxZQUFZLEdBQ3RHO0VBRUgsSUFBSSxJQUFJLE1BQUtDLGNBQWUsSUFBSSxHQUFHO0FBQ25DLE1BQUksS0FBSyxLQUNQLFFBQU87RUFFVCxNQUFNLFFBQVEsdUJBQXVCLGNBQWMsdUJBQXVCLGlCQUFpQjtHQUN6RixLQUFLO0dBQ0wsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFO0dBQ3hCLEdBQUc7R0FDRixLQUFLO0dBQ0wsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFO0dBQ3hCO0FBQ0QsTUFBSSxJQUFJLFdBQVcsTUFBS0YsVUFBVyxVQUFVLE1BQU0sT0FBTztBQUMxRCxRQUFLQSxVQUFXLFVBQVUsTUFBTSxLQUFLLE1BQU07QUFDM0MsUUFBS0UsY0FBZSxJQUFJLElBQUksRUFBRTtBQUM5QixNQUFJLHVCQUF1QixXQUN6QixNQUFLLE1BQU0sQ0FBQyxPQUFPLFNBQVMsT0FBTyxRQUFRLFlBQVksSUFBSSxDQUN6RCxPQUFNLE1BQU0sU0FBUyxLQUFLO0dBQ3hCLE1BQU07R0FDTixlQUFlLEtBQUsseUJBQXlCLEtBQUssWUFBWSxDQUFDO0dBQ2hFLENBQUM7V0FFSyx1QkFBdUIsZUFDaEMsTUFBSyxNQUFNLENBQUMsT0FBTyxTQUFTLE9BQU8sUUFBUSxZQUFZLFNBQVMsQ0FDOUQsT0FBTSxNQUFNLFNBQVMsS0FBSztHQUN4QixNQUFNO0dBQ04sZUFBZSxLQUFLLHlCQUF5QixLQUFLLENBQUM7R0FDcEQsQ0FBQztXQUVLLHVCQUF1QixXQUNoQyxNQUFLLE1BQU0sQ0FBQyxPQUFPLFlBQVksT0FBTyxRQUFRLFlBQVksU0FBUyxDQUNqRSxPQUFNLE1BQU0sU0FBUyxLQUFLO0dBQ3hCLE1BQU07R0FDTixlQUFlLEtBQUsseUJBQXlCLFFBQVEsQ0FBQztHQUN2RCxDQUFDO0FBR04sUUFBS0YsVUFBVyxNQUFNLEtBQUs7R0FDekIsWUFBWSxVQUFVLEtBQUs7R0FDM0IsSUFBSSxFQUFFO0dBQ04sZ0JBQWdCO0dBQ2pCLENBQUM7QUFDRixTQUFPOzs7QUFHWCxTQUFTLE9BQU8sYUFBYTtBQUMzQixRQUFPLFlBQVksWUFBWSxRQUFRLFlBQVksY0FBYyxNQUFNLFNBQVMsV0FBVzs7QUFFN0YsU0FBUyxVQUFVLE1BQU07Q0FDdkIsTUFBTSxRQUFRLEtBQUssTUFBTSxJQUFJO0FBQzdCLFFBQU87RUFBRSxZQUFZLE1BQU0sS0FBSztFQUFFO0VBQU87O0FBSTNDLElBQUksa0JBQWtCLFFBQVEsa0JBQWtCLENBQUM7QUFHakQsSUFBSSxRQUFRLE1BQU07Q0FDaEI7Q0FDQTtDQUNBLFlBQVksTUFBTSxJQUFJO0FBQ3BCLFFBQUtHLE9BQVEsUUFBUSxFQUFFLEtBQUssYUFBYTtBQUN6QyxRQUFLQyxLQUFNLE1BQU0sRUFBRSxLQUFLLGFBQWE7O0NBRXZDLElBQUksT0FBTztBQUNULFNBQU8sTUFBS0Q7O0NBRWQsSUFBSSxLQUFLO0FBQ1AsU0FBTyxNQUFLQzs7O0FBS2hCLFNBQVMsTUFBTSxNQUFNLEtBQUssR0FBRyxHQUFHO0NBQzlCLE1BQU0sRUFDSixNQUNBLFFBQVEsV0FBVyxPQUNuQixTQUFTLGNBQWMsRUFBRSxFQUN6QixXQUNBLE9BQU8sVUFBVSxVQUNmO0NBQ0osTUFBTSx5QkFBeUIsSUFBSSxLQUFLO0NBQ3hDLE1BQU0sY0FBYyxFQUFFO0FBQ3RCLEtBQUksRUFBRSxlQUFlLFlBQ25CLE9BQU0sSUFBSSxXQUFXLElBQUk7QUFFM0IsS0FBSSxjQUFjLE1BQU0sU0FBUyxTQUFTLE1BQU0sTUFBTTtBQUNwRCxTQUFPLElBQUksS0FBSyxNQUFNLEVBQUU7QUFDeEIsY0FBWSxLQUFLLEtBQUssS0FBSztHQUMzQjtDQUNGLE1BQU0sS0FBSyxFQUFFO0NBQ2IsTUFBTSxVQUFVLEVBQUU7Q0FDbEIsTUFBTSxjQUFjLEVBQUU7Q0FDdEIsTUFBTSxZQUFZLEVBQUU7Q0FDcEIsSUFBSTtDQUNKLE1BQU0sZ0JBQWdCLEVBQUU7QUFDeEIsTUFBSyxNQUFNLENBQUMsT0FBTyxZQUFZLE9BQU8sUUFBUSxJQUFJLElBQUksRUFBRTtFQUN0RCxNQUFNLE9BQU8sUUFBUTtBQUNyQixNQUFJLEtBQUssYUFDUCxJQUFHLEtBQUssT0FBTyxJQUFJLE1BQU0sQ0FBQztFQUU1QixNQUFNLFdBQVcsS0FBSyxZQUFZLEtBQUs7QUFDdkMsTUFBSSxLQUFLLGFBQWEsVUFBVTtHQUM5QixNQUFNLE9BQU8sS0FBSyxhQUFhO0dBQy9CLE1BQU0sS0FBSyxPQUFPLElBQUksTUFBTTtHQUM1QixJQUFJO0FBQ0osV0FBUSxNQUFSO0lBQ0UsS0FBSztBQUNILGlCQUFZLGtCQUFrQixNQUFNLENBQUMsR0FBRyxDQUFDO0FBQ3pDO0lBQ0YsS0FBSztBQUNILGlCQUFZLGtCQUFrQixLQUFLLENBQUMsR0FBRyxDQUFDO0FBQ3hDO0lBQ0YsS0FBSztBQUNILGlCQUFZLGtCQUFrQixPQUFPLEdBQUc7QUFDeEM7O0FBRUosV0FBUSxLQUFLO0lBQ1gsWUFBWSxLQUFLO0lBRWpCLGNBQWM7SUFDZDtJQUNELENBQUM7O0FBRUosTUFBSSxTQUNGLGFBQVksS0FBSztHQUNmLFlBQVksS0FBSztHQUNqQixNQUFNO0lBQUUsS0FBSztJQUFVLE9BQU8sRUFBRSxTQUFTLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxFQUFFO0lBQUU7R0FDakUsQ0FBQztBQUVKLE1BQUksS0FBSyxnQkFDUCxXQUFVLEtBQUs7R0FDYixZQUFZLEtBQUs7R0FDakIsT0FBTyxLQUFLO0dBQ1osVUFBVSxLQUFLO0dBQ2YsVUFBVSxLQUFLO0dBQ2YsUUFBUSxPQUFPLElBQUksTUFBTTtHQUN6QixXQUFXO0dBQ1osQ0FBQztBQUVKLE1BQUksS0FBSyxjQUFjO0dBQ3JCLE1BQU0sU0FBUyxJQUFJLGFBQWEsR0FBRztBQUNuQyxXQUFRLFVBQVUsUUFBUSxLQUFLLGFBQWE7QUFDNUMsaUJBQWMsS0FBSztJQUNqQixPQUFPLE9BQU8sSUFBSSxNQUFNO0lBQ3hCLE9BQU8sT0FBTyxXQUFXO0lBQzFCLENBQUM7O0FBRUosTUFBSSxXQUFXO0dBQ2IsTUFBTSxnQkFBZ0IsUUFBUSxZQUFZO0FBQzFDLE9BQUksb0JBQW9CLGFBQWEsY0FBYyxDQUNqRCxpQkFBZ0IsT0FBTyxJQUFJLE1BQU07OztBQUl2QyxNQUFLLE1BQU0sYUFBYSxlQUFlLEVBQUUsRUFBRTtFQUN6QyxNQUFNLFdBQVcsVUFBVTtBQUMzQixNQUFJLE9BQU8sYUFBYSxZQUFZLFNBQVMsV0FBVyxHQUFHO0dBQ3pELE1BQU0sYUFBYSxRQUFRO0dBQzNCLE1BQU0sYUFBYSxVQUFVLFFBQVE7QUFDckMsU0FBTSxJQUFJLFVBQ1IsVUFBVSxXQUFXLGNBQWMsV0FBVyxzQ0FDL0M7O0VBRUgsSUFBSTtBQUNKLFVBQVEsVUFBVSxXQUFsQjtHQUNFLEtBQUs7QUFDSCxnQkFBWTtLQUNWLEtBQUs7S0FDTCxPQUFPLFVBQVUsUUFBUSxLQUFLLE1BQU0sT0FBTyxJQUFJLEVBQUUsQ0FBQztLQUNuRDtBQUNEO0dBQ0YsS0FBSztBQUNILGdCQUFZO0tBQ1YsS0FBSztLQUNMLE9BQU8sVUFBVSxRQUFRLEtBQUssTUFBTSxPQUFPLElBQUksRUFBRSxDQUFDO0tBQ25EO0FBQ0Q7R0FDRixLQUFLO0FBQ0gsZ0JBQVk7S0FBRSxLQUFLO0tBQVUsT0FBTyxPQUFPLElBQUksVUFBVSxPQUFPO0tBQUU7QUFDbEU7O0FBRUosVUFBUSxLQUFLO0dBQ1gsWUFBWSxLQUFLO0dBQ2pCLGNBQWM7R0FDZDtHQUNBLGVBQWUsVUFBVTtHQUMxQixDQUFDOztBQUVKLE1BQUssTUFBTSxrQkFBa0IsS0FBSyxlQUFlLEVBQUUsQ0FDakQsS0FBSSxlQUFlLGVBQWUsVUFBVTtFQUMxQyxNQUFNLE9BQU87R0FDWCxLQUFLO0dBQ0wsT0FBTyxFQUFFLFNBQVMsZUFBZSxRQUFRLEtBQUssTUFBTSxPQUFPLElBQUksRUFBRSxDQUFDLEVBQUU7R0FDckU7QUFDRCxjQUFZLEtBQUs7R0FBRSxZQUFZLGVBQWU7R0FBTTtHQUFNLENBQUM7QUFDM0Q7O0NBR0osTUFBTSxjQUFjLElBQUksY0FBYztBQUV0QyxRQUFPO0VBQ0wsU0FBUztFQUNULFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsV0FBVyxLQUFLLFlBQVk7R0FDMUIsTUFBTSxZQUFZLFFBQVE7QUFDMUIsT0FBSSxJQUFJLGFBQWEsS0FBSyxFQUN4QixLQUFJLFdBQVcsYUFBYSxVQUFVO0FBRXhDLFFBQUssTUFBTSxTQUFTLFNBQVM7SUFHM0IsTUFBTSxhQUFhLE1BQU0sYUFBYSxHQUFHLFFBQVEsSUFGcEMsTUFBTSxVQUFVLFFBQVEsV0FBVyxDQUFDLE1BQU0sVUFBVSxNQUFNLEdBQUcsTUFBTSxVQUFVLE9BQ3hFLEtBQUssTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FDRyxPQUFPLE1BQU0sVUFBVSxJQUFJLGFBQWE7SUFDakcsTUFBTSxFQUFFLGtCQUFrQjtBQUMxQixRQUFJLGtCQUFrQixLQUFLLEVBQ3pCLEtBQUksVUFBVSxjQUFjLFFBQVEsS0FDbEMsa0JBQWtCLE1BQU07S0FBRTtLQUFZO0tBQWUsQ0FBQyxDQUN2RDs7QUFHTCxVQUFPO0lBQ0wsWUFBWTtJQUNaLGdCQUFnQixJQUFJLHlCQUF5QixJQUFJLENBQUM7SUFDbEQsWUFBWTtJQUNaO0lBQ0E7SUFDQTtJQUNBLFdBQVcsRUFBRSxLQUFLLFFBQVE7SUFDMUIsYUFBYSxFQUFFLEtBQUssV0FBVyxXQUFXLFdBQVc7SUFDckQ7SUFDQTtJQUNEOztFQUlILE1BQU07RUFDTjtFQUNBLFVBdENlLGFBQWEsa0JBQWtCLEtBQUssSUFBSTtHQUFFO0dBQWUsU0FBUztHQUFXLEdBQUcsS0FBSztFQXVDckc7O0FBSUgsSUFBSSxhQUFhLE9BQU8sYUFBYTtBQUNyQyxJQUFJLG1CQUFtQixRQUFRLENBQUMsQ0FBQyxPQUFPLE9BQU8sUUFBUSxZQUFZLGNBQWM7QUFFakYsU0FBUyxNQUFNLEdBQUc7QUFDaEIsUUFBTyxFQUFFLE9BQU87O0FBRWxCLElBQUksZUFBZSxNQUFNLGNBQWM7Q0FDckMsWUFBWSxhQUFhLGFBQWEsZUFBZTtBQUNuRCxPQUFLLGNBQWM7QUFDbkIsT0FBSyxjQUFjO0FBQ25CLE9BQUssZ0JBQWdCO0FBQ3JCLE1BQUksWUFBWSxNQUFNLGVBQWUsWUFBWSxNQUFNLFdBQ3JELE9BQU0sSUFBSSxNQUFNLG9DQUFvQzs7Q0FHeEQsQ0FBQyxjQUFjO0NBQ2YsT0FBTztDQUNQLFFBQVE7QUFDTixTQUFPOztDQUVULE1BQU0sV0FBVztBQUVmLFNBQU8sSUFBSSxjQURhLEtBQUssWUFBWSxNQUFNLFVBQVUsRUFHdkQsS0FBSyxhQUNMLEtBQUssY0FDTjs7Q0FFSCxRQUFRO0VBQ04sTUFBTSxPQUFPLEtBQUs7RUFDbEIsTUFBTSxRQUFRLEtBQUs7RUFDbkIsTUFBTSxZQUFZLGdCQUFnQixLQUFLLE1BQU0sV0FBVztFQUN4RCxNQUFNLGFBQWEsZ0JBQWdCLE1BQU0sTUFBTSxXQUFXO0VBQzFELElBQUksTUFBTSxVQUFVLFdBQVcsVUFBVSxVQUFVLFFBQVEsV0FBVyxNQUFNLGlCQUFpQixLQUFLLGNBQWM7RUFDaEgsTUFBTSxVQUFVLEVBQUU7QUFDbEIsTUFBSSxLQUFLLFlBQ1AsU0FBUSxLQUFLLGlCQUFpQixLQUFLLFlBQVksQ0FBQztBQUVsRCxNQUFJLE1BQU0sWUFDUixTQUFRLEtBQUssaUJBQWlCLE1BQU0sWUFBWSxDQUFDO0FBRW5ELE1BQUksUUFBUSxTQUFTLEdBQUc7R0FDdEIsTUFBTSxXQUFXLFFBQVEsV0FBVyxJQUFJLFFBQVEsS0FBSyxRQUFRLElBQUksYUFBYSxDQUFDLEtBQUssUUFBUTtBQUM1RixVQUFPLFVBQVU7O0FBRW5CLFNBQU87OztBQUdYLElBQUksY0FBYyxNQUFNLGFBQWE7Q0FDbkMsWUFBWSxRQUFRLGFBQWE7QUFDL0IsT0FBSyxRQUFRO0FBQ2IsT0FBSyxjQUFjOztDQUVyQixDQUFDLGNBQWM7Q0FDZixNQUFNLFdBQVc7RUFDZixNQUFNLGVBQWUsdUJBQXVCLFVBQVUsS0FBSyxNQUFNLEtBQUssQ0FBQztFQUN2RSxNQUFNLFlBQVksS0FBSyxjQUFjLEtBQUssWUFBWSxJQUFJLGFBQWEsR0FBRztBQUMxRSxTQUFPLElBQUksYUFBYSxLQUFLLE9BQU8sVUFBVTs7Q0FFaEQsY0FBYyxPQUFPLElBQUk7RUFDdkIsTUFBTSxjQUFjLElBQUksYUFBYSxNQUFNO0VBQzNDLE1BQU0sZ0JBQWdCLEdBQ3BCLEtBQUssTUFBTSxhQUNYLE1BQU0sWUFDUDtBQUNELFNBQU8sSUFBSSxhQUFhLGFBQWEsTUFBTSxjQUFjOztDQUUzRCxhQUFhLE9BQU8sSUFBSTtFQUN0QixNQUFNLGNBQWMsSUFBSSxhQUFhLE1BQU07RUFDM0MsTUFBTSxnQkFBZ0IsR0FDcEIsS0FBSyxNQUFNLGFBQ1gsTUFBTSxZQUNQO0FBQ0QsU0FBTyxJQUFJLGFBQWEsTUFBTSxhQUFhLGNBQWM7O0NBRTNELFFBQVE7QUFDTixTQUFPLHlCQUF5QixLQUFLLE9BQU8sS0FBSyxZQUFZOztDQUUvRCxRQUFRO0FBQ04sU0FBTzs7O0FBR1gsSUFBSSxlQUFlLE1BQU07Q0FDdkIsQ0FBQyxjQUFjO0NBQ2YsT0FBTztDQUNQO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FFQSxJQUFJLFVBQVU7QUFDWixTQUFPLEtBQUssU0FBUzs7Q0FFdkIsSUFBSSxVQUFVO0FBQ1osU0FBTyxLQUFLLFNBQVM7O0NBRXZCLElBQUksVUFBVTtBQUNaLFNBQU8sS0FBSyxTQUFTOztDQUV2QixJQUFJLGNBQWM7QUFDaEIsU0FBTyxLQUFLLFNBQVM7O0NBRXZCLFlBQVksVUFBVTtBQUNwQixPQUFLLGFBQWEsU0FBUztBQUMzQixPQUFLLGVBQWUsU0FBUztBQUM3QixPQUFLLE9BQU8sY0FBYyxTQUFTO0FBQ25DLE9BQUssY0FBYyxLQUFLO0FBQ3hCLE9BQUssV0FBVztBQUNoQixTQUFPLE9BQU8sS0FBSzs7Q0FFckIsU0FBUztBQUNQLFNBQU8sSUFBSSxZQUFZLEtBQUs7O0NBRTlCLGNBQWMsT0FBTyxJQUFJO0FBQ3ZCLFNBQU8sS0FBSyxRQUFRLENBQUMsY0FBYyxPQUFPLEdBQUc7O0NBRS9DLGFBQWEsT0FBTyxJQUFJO0FBQ3RCLFNBQU8sS0FBSyxRQUFRLENBQUMsYUFBYSxPQUFPLEdBQUc7O0NBRTlDLFFBQVE7QUFDTixTQUFPLEtBQUssUUFBUSxDQUFDLE9BQU87O0NBRTlCLFFBQVE7QUFDTixTQUFPLEtBQUssUUFBUSxDQUFDLE9BQU87O0NBRTlCLE1BQU0sV0FBVztBQUNmLFNBQU8sS0FBSyxRQUFRLENBQUMsTUFBTSxVQUFVOzs7QUFHekMsU0FBUyxzQkFBc0IsVUFBVTtBQUN2QyxRQUFPLElBQUksYUFBYSxTQUFTOztBQUVuQyxTQUFTLGlCQUFpQixTQUFTO0NBQ2pDLE1BQU0sS0FBcUIsdUJBQU8sT0FBTyxLQUFLO0FBQzlDLE1BQUssTUFBTSxVQUFVLE9BQU8sT0FBTyxRQUFRLE9BQU8sRUFBRTtFQUNsRCxNQUFNLE1BQU0sc0JBQ1YsT0FDRDtBQUNELEtBQUcsT0FBTyxnQkFBZ0I7O0FBRTVCLFFBQU8sT0FBTyxPQUFPLEdBQUc7O0FBRTFCLFNBQVMsY0FBYyxVQUFVO0NBQy9CLE1BQU0sTUFBTSxFQUFFO0FBQ2QsTUFBSyxNQUFNLGNBQWMsT0FBTyxLQUFLLFNBQVMsUUFBUSxFQUFFO0VBQ3RELE1BQU0sZ0JBQWdCLFNBQVMsUUFBUTtFQUN2QyxNQUFNLFNBQVMsSUFBSSxpQkFDakIsU0FBUyxZQUNULFlBQ0EsY0FBYyxZQUFZLGVBQzFCLGNBQWMsZUFBZSxLQUM5QjtBQUNELE1BQUksY0FBYyxPQUFPLE9BQU8sT0FBTzs7QUFFekMsUUFBTyxPQUFPLE9BQU8sSUFBSTs7QUFFM0IsU0FBUyx5QkFBeUIsUUFBUSxPQUFPLGVBQWUsRUFBRSxFQUFFO0NBRWxFLE1BQU0sTUFBTSxpQkFEUSxnQkFBZ0IsT0FBTyxXQUFXO0NBRXRELE1BQU0sVUFBVSxFQUFFO0FBQ2xCLEtBQUksTUFBTyxTQUFRLEtBQUssaUJBQWlCLE1BQU0sQ0FBQztBQUNoRCxTQUFRLEtBQUssR0FBRyxhQUFhO0FBQzdCLEtBQUksUUFBUSxXQUFXLEVBQUcsUUFBTztBQUVqQyxRQUFPLEdBQUcsSUFBSSxTQURHLFFBQVEsV0FBVyxJQUFJLFFBQVEsS0FBSyxRQUFRLElBQUksYUFBYSxDQUFDLEtBQUssUUFBUTs7QUFHOUYsSUFBSSxtQkFBbUIsTUFBTTtDQUMzQixPQUFPO0NBRVA7Q0FFQTtDQUNBO0NBRUE7Q0FDQTtDQUNBLFlBQVksUUFBUSxRQUFRLGVBQWUsWUFBWTtBQUNyRCxPQUFLLFFBQVE7QUFDYixPQUFLLFNBQVM7QUFDZCxPQUFLLGFBQWEsY0FBYztBQUNoQyxPQUFLLGdCQUFnQjs7Q0FFdkIsR0FBRyxHQUFHO0FBQ0osU0FBTyxJQUFJLFlBQVk7R0FDckIsTUFBTTtHQUNOLE1BQU07R0FDTixPQUFPLGVBQWUsRUFBRTtHQUN6QixDQUFDOztDQUVKLEdBQUcsR0FBRztBQUNKLFNBQU8sSUFBSSxZQUFZO0dBQ3JCLE1BQU07R0FDTixNQUFNO0dBQ04sT0FBTyxlQUFlLEVBQUU7R0FDekIsQ0FBQzs7Q0FFSixHQUFHLEdBQUc7QUFDSixTQUFPLElBQUksWUFBWTtHQUNyQixNQUFNO0dBQ04sTUFBTTtHQUNOLE9BQU8sZUFBZSxFQUFFO0dBQ3pCLENBQUM7O0NBRUosSUFBSSxHQUFHO0FBQ0wsU0FBTyxJQUFJLFlBQVk7R0FDckIsTUFBTTtHQUNOLE1BQU07R0FDTixPQUFPLGVBQWUsRUFBRTtHQUN6QixDQUFDOztDQUVKLEdBQUcsR0FBRztBQUNKLFNBQU8sSUFBSSxZQUFZO0dBQ3JCLE1BQU07R0FDTixNQUFNO0dBQ04sT0FBTyxlQUFlLEVBQUU7R0FDekIsQ0FBQzs7Q0FFSixJQUFJLEdBQUc7QUFDTCxTQUFPLElBQUksWUFBWTtHQUNyQixNQUFNO0dBQ04sTUFBTTtHQUNOLE9BQU8sZUFBZSxFQUFFO0dBQ3pCLENBQUM7OztBQUdOLFNBQVMsUUFBUSxPQUFPO0FBQ3RCLFFBQU87RUFBRSxNQUFNO0VBQVc7RUFBTzs7QUFFbkMsU0FBUyxlQUFlLEtBQUs7QUFDM0IsS0FBSSxJQUFJLFNBQVMsVUFDZixRQUFPO0FBQ1QsS0FBSSxPQUFPLFFBQVEsWUFBWSxPQUFPLFFBQVEsVUFBVSxPQUFPLElBQUksU0FBUyxTQUMxRSxRQUFPO0FBRVQsUUFBTyxRQUFRLElBQUk7O0FBRXJCLFNBQVMsdUJBQXVCLE9BQU87QUFDckMsS0FBSSxpQkFBaUIsWUFBYSxRQUFPO0FBQ3pDLEtBQUksT0FBTyxVQUFVLFVBQ25CLFFBQU8sSUFBSSxZQUFZO0VBQ3JCLE1BQU07RUFDTixNQUFNLFFBQVEsTUFBTTtFQUNwQixPQUFPLFFBQVEsS0FBSztFQUNyQixDQUFDO0FBRUosUUFBTyxJQUFJLFlBQVk7RUFDckIsTUFBTTtFQUNOLE1BQU07RUFDTixPQUFPLFFBQVEsS0FBSztFQUNyQixDQUFDOztBQUVKLElBQUksY0FBYyxNQUFNLGFBQWE7Q0FDbkMsWUFBWSxNQUFNO0FBQ2hCLE9BQUssT0FBTzs7Q0FFZCxJQUFJLE9BQU87QUFDVCxTQUFPLElBQUksYUFBYTtHQUN0QixNQUFNO0dBQ04sU0FBUyxDQUFDLEtBQUssTUFBTSxNQUFNLEtBQUs7R0FDakMsQ0FBQzs7Q0FFSixHQUFHLE9BQU87QUFDUixTQUFPLElBQUksYUFBYTtHQUN0QixNQUFNO0dBQ04sU0FBUyxDQUFDLEtBQUssTUFBTSxNQUFNLEtBQUs7R0FDakMsQ0FBQzs7Q0FFSixNQUFNO0FBQ0osU0FBTyxJQUFJLGFBQWE7R0FBRSxNQUFNO0dBQU8sUUFBUSxLQUFLO0dBQU0sQ0FBQzs7O0FBb0IvRCxTQUFTLGlCQUFpQixNQUFNLFlBQVk7Q0FDMUMsTUFBTSxPQUFPLGdCQUFnQixjQUFjLEtBQUssT0FBTztBQUN2RCxTQUFRLEtBQUssTUFBYjtFQUNFLEtBQUssS0FDSCxRQUFPLEdBQUcsZUFBZSxLQUFLLEtBQUssQ0FBQyxLQUFLLGVBQWUsS0FBSyxNQUFNO0VBQ3JFLEtBQUssS0FDSCxRQUFPLEdBQUcsZUFBZSxLQUFLLEtBQUssQ0FBQyxNQUFNLGVBQWUsS0FBSyxNQUFNO0VBQ3RFLEtBQUssS0FDSCxRQUFPLEdBQUcsZUFBZSxLQUFLLEtBQUssQ0FBQyxLQUFLLGVBQWUsS0FBSyxNQUFNO0VBQ3JFLEtBQUssTUFDSCxRQUFPLEdBQUcsZUFBZSxLQUFLLEtBQUssQ0FBQyxNQUFNLGVBQWUsS0FBSyxNQUFNO0VBQ3RFLEtBQUssS0FDSCxRQUFPLEdBQUcsZUFBZSxLQUFLLEtBQUssQ0FBQyxLQUFLLGVBQWUsS0FBSyxNQUFNO0VBQ3JFLEtBQUssTUFDSCxRQUFPLEdBQUcsZUFBZSxLQUFLLEtBQUssQ0FBQyxNQUFNLGVBQWUsS0FBSyxNQUFNO0VBQ3RFLEtBQUssTUFDSCxRQUFPLEtBQUssUUFBUSxLQUFLLE1BQU0saUJBQWlCLEVBQUUsQ0FBQyxDQUFDLElBQUksYUFBYSxDQUFDLEtBQUssUUFBUTtFQUNyRixLQUFLLEtBQ0gsUUFBTyxLQUFLLFFBQVEsS0FBSyxNQUFNLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLE9BQU87RUFDcEYsS0FBSyxNQUNILFFBQU8sT0FBTyxhQUFhLGlCQUFpQixLQUFLLE9BQU8sQ0FBQzs7O0FBRy9ELFNBQVMsYUFBYSxLQUFLO0FBQ3pCLFFBQU8sSUFBSSxJQUFJOztBQUVqQixTQUFTLGVBQWUsTUFBTSxZQUFZO0FBQ3hDLEtBQUksY0FBYyxLQUFLLENBQ3JCLFFBQU8sa0JBQWtCLEtBQUssTUFBTTtDQUV0QyxNQUFNLFNBQVMsS0FBSztBQUNwQixRQUFPLEdBQUcsZ0JBQWdCLE9BQU8sQ0FBQyxHQUFHLGdCQUFnQixLQUFLLFdBQVc7O0FBRXZFLFNBQVMsa0JBQWtCLE9BQU87QUFDaEMsS0FBSSxVQUFVLFFBQVEsVUFBVSxLQUFLLEVBQ25DLFFBQU87QUFFVCxLQUFJLGlCQUFpQixZQUFZLGlCQUFpQixhQUNoRCxRQUFPLEtBQUssTUFBTSxhQUFhO0FBRWpDLEtBQUksaUJBQWlCLFVBQ25CLFFBQU8sSUFBSSxNQUFNLGFBQWEsQ0FBQztBQUVqQyxTQUFRLE9BQU8sT0FBZjtFQUNFLEtBQUs7RUFDTCxLQUFLLFNBQ0gsUUFBTyxPQUFPLE1BQU07RUFDdEIsS0FBSyxVQUNILFFBQU8sUUFBUSxTQUFTO0VBQzFCLEtBQUssU0FDSCxRQUFPLElBQUksTUFBTSxRQUFRLE1BQU0sS0FBSyxDQUFDO0VBQ3ZDLFFBQ0UsUUFBTyxJQUFJLEtBQUssVUFBVSxNQUFNLENBQUMsUUFBUSxNQUFNLEtBQUssQ0FBQzs7O0FBRzNELFNBQVMsZ0JBQWdCLE1BQU07QUFDN0IsUUFBTyxJQUFJLEtBQUssUUFBUSxNQUFNLE9BQUssQ0FBQzs7QUFFdEMsU0FBUyxjQUFjLE1BQU07QUFDM0IsUUFBTyxLQUFLLFNBQVM7O0FBcUV2QixTQUFTLGVBQWUsS0FBSyxNQUFNLFFBQVEsS0FBSyxJQUFJO0NBQ2xELE1BQU0sYUFFSixHQUFHLE1BQU07QUFFWCxZQUFXLGlCQUFpQjtBQUM1QixZQUFXLG1CQUFtQixNQUFNLGVBQWU7QUFDakQsZUFBYSxNQUFNLE1BQU0sWUFBWSxPQUFPLFFBQVEsS0FBSyxHQUFHOztBQUU5RCxRQUFPOztBQUVULFNBQVMsbUJBQW1CLEtBQUssTUFBTSxRQUFRLEtBQUssSUFBSTtDQUN0RCxNQUFNLGFBRUosR0FBRyxNQUFNO0FBRVgsWUFBVyxpQkFBaUI7QUFDNUIsWUFBVyxtQkFBbUIsTUFBTSxlQUFlO0FBQ2pELGVBQWEsTUFBTSxNQUFNLFlBQVksTUFBTSxRQUFRLEtBQUssR0FBRzs7QUFFN0QsUUFBTzs7QUFFVCxTQUFTLGFBQWEsS0FBSyxNQUFNLFlBQVksTUFBTSxRQUFRLEtBQUssSUFBSTtDQUNsRSxNQUFNLGdCQUFnQixJQUFJLFdBQVcsUUFBUSxhQUFhLFdBQVcsQ0FBQztDQUN0RSxJQUFJLGFBQWEsSUFBSSx5QkFBeUIsSUFBSSxDQUFDO0NBQ25ELE1BQU0sRUFBRSxjQUFjO0NBQ3RCLE1BQU0sRUFBRSxPQUFPLGNBQWMsSUFBSSxZQUMvQixJQUFJLHlCQUF5QixjQUFjLENBQzVDO0FBQ0QsS0FBSSxVQUFVLE1BQU0sS0FBSztFQUN2QixZQUFZO0VBQ1osUUFBUSxPQUFPLElBQUksWUFBWSxJQUFJLE9BQU87RUFDMUMsVUFBVSxLQUFLO0VBQ2YsYUFBYTtFQUNiLFFBQVE7RUFDUjtFQUNELENBQUM7QUFDRixLQUFJLEtBQUssUUFBUSxLQUNmLEtBQUksVUFBVSxjQUFjLFFBQVEsS0FBSztFQUN2QyxLQUFLO0VBQ0wsT0FBTztHQUNMLFlBQVk7R0FDWixlQUFlLEtBQUs7R0FDckI7RUFDRixDQUFDO0FBRUosS0FBSSxXQUFXLE9BQU8sT0FBTztFQUMzQixNQUFNLGFBQWE7QUFDbkIsU0FBTyxNQUFNLFNBQVM7R0FDcEIsTUFBTSxPQUFPLFdBQVcsTUFBTSxLQUFLO0FBQ25DLFVBQU8sUUFBUSxPQUFPLEVBQUUsR0FBRyxDQUFDLEtBQUs7O0FBRW5DLGVBQWEsY0FBYyxNQUN6QixXQUFXLE1BQU0sU0FBUyxHQUFHLGNBQzlCOztBQUVILEVBQUMsT0FBTyxJQUFJLFlBQVksSUFBSSxPQUFPLEtBQUs7RUFDdEM7RUFDQSxtQkFBbUIsWUFBWSxpQkFBaUIsV0FBVyxVQUFVO0VBQ3JFLGlCQUFpQixjQUFjLGVBQWUsWUFBWSxVQUFVO0VBQ3BFLG9CQUFvQixjQUFjLFdBQVcsV0FBVztFQUN6RCxDQUFDOztBQUlKLElBQUksY0FBYyxjQUFjLE1BQU07Q0FDcEMsWUFBWSxTQUFTO0FBQ25CLFFBQU0sUUFBUTs7Q0FFaEIsSUFBSSxPQUFPO0FBQ1QsU0FBTzs7O0FBS1gsSUFBSSxxQkFBcUIsY0FBYyxNQUFNO0NBQzNDLFlBQVksU0FBUztBQUNuQixRQUFNLFFBQVE7O0NBRWhCLElBQUksT0FBTztBQUNULFNBQU87OztBQUdYLElBQUksWUFBWTtDQUlkLGlCQUFpQjtDQUlqQixrQkFBa0I7Q0FLbEIsa0JBQWtCO0NBSWxCLGFBQWE7Q0FJYixhQUFhO0NBSWIsWUFBWTtDQUlaLG9CQUFvQjtDQUlwQixhQUFhO0NBSWIsU0FBUztDQUlULGdCQUFnQjtDQUloQixxQkFBcUI7Q0FJckIsd0JBQXdCO0NBSXhCLGdCQUFnQjtDQUloQixXQUFXO0NBSVgsaUJBQWlCO0NBQ2pCLHVCQUF1QjtDQUN2Qix5QkFBeUI7Q0FDekIsdUJBQXVCO0NBQ3ZCLGtCQUFrQjtDQUNsQixXQUFXO0NBQ1o7QUFDRCxTQUFTLFdBQVcsR0FBRyxHQUFHO0FBQ3hCLFFBQU8sT0FBTyxZQUNaLE9BQU8sUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQ2hEOztBQUVILElBQUksK0JBQStCLElBQUksS0FBSztBQUM1QyxJQUFJLFNBQVMsT0FBTyxPQUNsQixXQUFXLFlBQVksTUFBTSxTQUFTO0NBQ3BDLE1BQU0sTUFBTSxPQUFPLGVBQ2pCLGNBQWMsbUJBQW1CO0VBQy9CLElBQUksT0FBTztBQUNULFVBQU87O0lBR1gsUUFDQTtFQUFFLE9BQU87RUFBTSxVQUFVO0VBQU8sQ0FDakM7QUFDRCxjQUFhLElBQUksTUFBTSxJQUFJO0FBQzNCLFFBQU87RUFDUCxDQUNIO0FBQ0QsU0FBUyxvQkFBb0IsTUFBTTtBQUNqQyxRQUFPLGFBQWEsSUFBSSxLQUFLLElBQUk7O0FBSW5DLElBQUksVUFBVSxPQUFPLFdBQVcsY0FBYyxTQUFTLEtBQUs7QUFDNUQsSUFBSSxNQUFNLE9BQU8sV0FBVyxjQUFjLE9BQU8sRUFBRSxHQUFHLEtBQUs7QUFDM0QsSUFBSSxZQUFZLE9BQU8sV0FBVyxjQUFjLE9BQU8sR0FBRyxHQUFHLEtBQUs7QUFDbEUsSUFBSSxZQUFZLE9BQU8sV0FBVyxjQUFjLE9BQU8sV0FBVyxHQUFHLEtBQUs7QUFDMUUsU0FBUyxnQ0FBZ0MsTUFBTSxJQUFJLEtBQUs7Q0FDdEQsSUFBSSxPQUFPLEtBQUssT0FBTztDQUN2QixJQUFJLGlCQUFpQjtDQUNyQixJQUFJLGdCQUFnQjtBQUNwQixRQUFPLGlCQUFpQixNQUFNO0FBQzVCLHFCQUFtQjtBQUNuQixJQUFFOztDQUVKLElBQUksUUFBUSxhQUFhLGVBQWUsSUFBSTtBQUM1QyxLQUFJLFFBQVEsS0FDVixRQUFPLFFBQVE7QUFFakIsS0FBSSxRQUFRLE9BQU8sZUFDakIsUUFBTyxRQUFRLE9BQU87Q0FFeEIsSUFBSSxvQkFBb0IsaUJBQWlCLGlCQUFpQjtBQUMxRCxRQUFPLFNBQVMsa0JBQ2QsU0FBUSxhQUFhLGVBQWUsSUFBSTtBQUUxQyxRQUFPLFFBQVEsT0FBTzs7QUFFeEIsU0FBUyxhQUFhLGVBQWUsS0FBSztDQUN4QyxJQUFJLFFBQVEsUUFBUSxJQUFJLFlBQVksR0FBRyxXQUFXO0FBQ2xELE1BQUssSUFBSSxNQUFNLEdBQUcsTUFBTSxlQUFlLEVBQUUsS0FBSztFQUM1QyxJQUFJLE1BQU0sSUFBSSxZQUFZO0FBQzFCLFdBQVMsU0FBUyxhQUFhLFFBQVEsTUFBTSxXQUFXOztBQUUxRCxRQUFPOztBQUlULFNBQVMscUNBQXFDLFdBQVcsS0FBSztDQUM1RCxJQUFJLGFBQWEsWUFBWSxJQUFJLENBQUMsRUFBRSxhQUFhLGFBQWEsWUFBWTtDQUMxRSxJQUFJLFNBQVMsSUFBSSxZQUFZLEdBQUc7QUFDaEMsUUFBTyxVQUFVLFdBQ2YsVUFBUyxJQUFJLFlBQVksR0FBRztBQUU5QixRQUFPLFNBQVM7O0FBSWxCLFNBQVMsdUJBQXVCLEtBQUssR0FBRztBQUN0QyxLQUFJLElBQUksR0FBRztFQUNULElBQUksT0FBTyxDQUFDO0FBQ1osTUFBSSxPQUFPO0FBQ1gsTUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLE9BQU87QUFDeEIsTUFBSSxLQUFLLEtBQUssU0FBUztRQUNsQjtBQUNMLE1BQUksT0FBTztBQUNYLE1BQUksS0FBSyxLQUFLLENBQUMsRUFBRSxJQUFJO0FBQ3JCLE1BQUksS0FBSyxLQUFLLE1BQU07O0FBRXRCLFFBQU87O0FBRVQsU0FBUyxvQkFBb0IsS0FBSyxXQUFXLFdBQVc7Q0FDdEQsSUFBSSxPQUFPLFVBQVUsS0FBSztDQUMxQixJQUFJLFFBQVEsVUFBVSxLQUFLO0NBQzNCLElBQUksUUFBUSxVQUFVO0NBQ3RCLElBQUksT0FBTyxVQUFVLEtBQUs7Q0FDMUIsSUFBSSxRQUFRLFVBQVUsS0FBSztDQUMzQixJQUFJLFFBQVEsVUFBVTtBQUN0QixLQUFJLE9BQU87QUFDWCxLQUFJLFVBQVUsS0FBSyxVQUFVLElBQUk7RUFDL0IsSUFBSSxRQUFRLE9BQU87RUFDbkIsSUFBSSxPQUFPLFFBQVEsU0FBUyxRQUFRLGFBQWEsSUFBSTtBQUNyRCxNQUFJLEtBQUssS0FBSyxTQUFTO0FBQ3ZCLE1BQUksS0FBSyxLQUFLLFVBQVU7QUFDeEIsU0FBTzs7Q0FFVCxJQUFJLFdBQVc7Q0FDZixJQUFJLFlBQVk7Q0FDaEIsSUFBSSxZQUFZO0NBQ2hCLElBQUksYUFBYTtBQUNqQixLQUFJLFVBQVUsSUFBSTtBQUNoQixhQUFXO0FBQ1gsY0FBWTtBQUNaLGNBQVk7QUFDWixlQUFhOztDQUVmLElBQUksY0FBYztDQUNsQixJQUFJLE1BQU0sV0FBVztBQUNyQixLQUFJLE1BQU0sR0FBRztBQUNYLGdCQUFjO0FBQ2QsUUFBTSxRQUFROztBQUVoQixLQUFJLEtBQUssS0FBSyxZQUFZLGFBQWE7QUFDdkMsS0FBSSxLQUFLLEtBQUs7QUFDZCxRQUFPOztBQUlULFNBQVMsMENBQTBDLEtBQUssV0FBVyxLQUFLO0NBQ3RFLElBQUksY0FBYyxVQUFVO0FBQzVCLFFBQU8sTUFBTTtBQUNYLE9BQUssSUFBSSxRQUFRLEdBQUcsVUFBVSxhQUFhLEVBQUUsTUFHM0MsS0FBSSxTQURJLHFDQURhLFVBQVUsSUFBSSxVQUFVLEtBQUssSUFBSSxZQUNPLElBQUk7QUFHbkUsT0FBSyxJQUFJLFFBQVEsR0FBRyxVQUFVLGFBQWEsRUFBRSxPQUFPO0dBQ2xELElBQUksVUFBVSxJQUFJO0dBQ2xCLElBQUksaUJBQWlCLFVBQVU7QUFDL0IsT0FBSSxVQUFVLGVBQ1osUUFBTztZQUNFLFVBQVUsZUFDbkI7Ozs7QUFPUixJQUFJLDJCQUEyQixPQUFPO0FBQ3RDLElBQUksVUFBVTtDQUFFLE1BQU07Q0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFO0NBQUU7QUFDdkMsSUFBSSxVQUFVO0NBQUUsTUFBTTtDQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Q0FBRTtBQUN2QyxJQUFJLFVBQVU7Q0FBRSxNQUFNO0NBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRTtDQUFFO0FBQ3ZDLElBQUksYUFBYSxDQUFDLEdBQUcsRUFBRTtBQUN2QixTQUFTLHdCQUF3QixNQUFNLElBQUksV0FBVyxLQUFLO0NBQ3pELElBQUkseUJBQXlCLGFBQWEsMkJBQTJCLHVCQUF1QixTQUFTLFVBQVUsR0FBRyxvQkFBb0IsU0FBUyx1QkFBdUIsU0FBUyxHQUFHLEVBQUUsdUJBQXVCLFNBQVMsS0FBSyxDQUFDO0FBQzFOLEtBQUksdUJBQXVCLEtBQUssT0FBTyxZQUFZO0FBQ2pELHlCQUF1QixLQUFLLE1BQU07QUFDbEMseUJBQXVCLEtBQUssS0FBSztPQUVqQyx3QkFBdUIsS0FBSyxNQUFNO0FBRXBDLDJDQUEwQyxZQUFZLHVCQUF1QixNQUFNLElBQUk7QUFDdkYsUUFBTyxXQUFXLEtBQUssYUFBYSxXQUFXLEtBQUs7O0FBRXRELFNBQVMsNkJBQTZCLE1BQU0sSUFBSSxLQUFLO0NBQ25ELElBQUksWUFBWSxLQUFLO0FBQ3JCLEtBQUksYUFBYSxXQUVmLFFBRFEscUNBQXFDLFlBQVksR0FBRyxJQUFJLEdBQ3JEO0FBRWIsUUFBTyx3QkFBd0IsTUFBTSxJQUFJLFdBQVcsSUFBSTs7QUFJMUQsSUFBSSxvQkFBb0IsV0FBVztDQUNqQyxTQUFTLGtCQUFrQixLQUFLLEtBQUssS0FBSyxLQUFLO0FBQzdDLE9BQUssTUFBTTtBQUNYLE9BQUssTUFBTTtBQUNYLE9BQUssTUFBTTtBQUNYLE9BQUssTUFBTTs7QUFFYixtQkFBa0IsVUFBVSxRQUFRLFdBQVc7QUFDN0MsU0FBTyxJQUFJLGtCQUFrQixLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLElBQUk7O0FBRXRFLG1CQUFrQixVQUFVLE9BQU8sV0FBVztFQUM1QyxJQUFJLFVBQVUsSUFBSSxrQkFBa0IsS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxJQUFJO0FBRTNFLFNBQU8sQ0FERyxRQUFRLFlBQVksRUFDakIsUUFBUTs7QUFFdkIsbUJBQWtCLFVBQVUsYUFBYSxXQUFXO0VBQ2xELElBQUksTUFBTSxLQUFLLE1BQU0sS0FBSyxNQUFNO0VBQ2hDLElBQUksS0FBSyxLQUFLLE1BQU0sS0FBSztFQUN6QixJQUFJLEtBQUssS0FBSyxNQUFNLEtBQUs7RUFDekIsSUFBSSxNQUFNLEtBQUs7RUFDZixJQUFJLE1BQU0sS0FBSztBQUNmLE9BQUssTUFBTSxPQUFPLEtBQUssUUFBUSxJQUFJLEtBQUssTUFBTTtBQUM5QyxPQUFLLE1BQU0sT0FBTyxLQUFLLFFBQVEsSUFBSSxNQUFNLE1BQU0sS0FBSyxPQUFPO0FBQzNELE9BQUssTUFBTSxNQUFNLElBQUksT0FBTztBQUM1QixPQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU87QUFDNUIsU0FBTzs7QUFFVCxtQkFBa0IsVUFBVSxPQUFPLFdBQVc7RUFDNUMsSUFBSSxVQUFVLElBQUksa0JBQWtCLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssSUFBSTtBQUMzRSxVQUFRLFlBQVk7QUFDcEIsU0FBTzs7QUFFVCxtQkFBa0IsVUFBVSxhQUFhLFdBQVc7RUFDbEQsSUFBSSxPQUFPO0VBQ1gsSUFBSSxPQUFPO0VBQ1gsSUFBSSxPQUFPO0VBQ1gsSUFBSSxPQUFPO0VBQ1gsSUFBSSxPQUFPO0dBQUM7R0FBWTtHQUFZO0dBQVk7R0FBVTtBQUMxRCxPQUFLLElBQUksSUFBSSxHQUFHLE1BQU0sR0FBRyxFQUFFLEVBQ3pCLE1BQUssSUFBSSxPQUFPLEdBQUcsTUFBTSxTQUFTLEdBQUc7QUFDbkMsT0FBSSxLQUFLLEtBQUssTUFBTTtBQUNsQixZQUFRLEtBQUs7QUFDYixZQUFRLEtBQUs7QUFDYixZQUFRLEtBQUs7QUFDYixZQUFRLEtBQUs7O0FBRWYsUUFBSyxZQUFZOztBQUdyQixPQUFLLE1BQU07QUFDWCxPQUFLLE1BQU07QUFDWCxPQUFLLE1BQU07QUFDWCxPQUFLLE1BQU07O0FBRWIsbUJBQWtCLFVBQVUsV0FBVyxXQUFXO0FBQ2hELFNBQU87R0FBQyxLQUFLO0dBQUssS0FBSztHQUFLLEtBQUs7R0FBSyxLQUFLO0dBQUk7O0FBRWpELFFBQU87SUFDTDtBQUNKLFNBQVMsVUFBVSxPQUFPO0FBRXhCLEtBQUksRUFEUSxNQUFNLFdBQVcsR0FFM0IsT0FBTSxJQUFJLE1BQU0sMEVBQTBFO0FBRTVGLFFBQU8sSUFBSSxpQkFBaUIsTUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxHQUFHOztBQUVyRSxJQUFJLG1CQUFtQixPQUFPLE9BQU8sU0FBUyxNQUFNO0FBQ2xELFFBQU8sSUFBSSxpQkFBaUIsSUFBSSxDQUFDLE1BQU0sT0FBTyxHQUFHLEVBQUU7R0FDbEQsRUFBRSxXQUFXLENBQUM7QUFHakIsSUFBSSxFQUFFLFlBQVk7QUFDbEIsU0FBUyxNQUFNLE9BQU87QUFHcEIsU0FBUSxRQUFRLElBQUksUUFGUix1QkFDQSxzQkFDMEI7Q0FDdEMsTUFBTSxhQUFhLE9BQU8sUUFBUSxLQUFLLFNBQVMsTUFBTSxVQUFVLElBQUksQ0FBQztDQUNyRSxNQUFNLE1BQU0sT0FBTyxRQUFRLElBQUksU0FBUyxJQUFJLENBQUM7QUFDN0MsUUFBTyxjQUFjLE1BQU0sY0FBYyxLQUFLOztBQUVoRCxTQUFTLGdCQUFnQixLQUFLO0NBQzVCLE1BQU0sS0FBSyw2QkFBNkIsSUFBSSxLQUFLLE1BQU0sR0FBRyxJQUFJO0NBQzlELE1BQU0sS0FBSyw2QkFBNkIsSUFBSSxLQUFLLE1BQU0sR0FBRyxJQUFJO0FBRTlELFNBRGUsS0FBSyxLQUFLLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTSxLQUFLLElBQUksR0FBRyxJQUFJOztBQUc5RCxTQUFTLFdBQVcsTUFBTTtDQUN4QixNQUFNLE1BQU0saUJBQWlCLE1BQU0sS0FBSyxxQkFBcUIsQ0FBQztDQUM5RCxNQUFNLGVBQWUsZ0JBQWdCLElBQUk7QUFDekMsUUFBTyxRQUFRLFVBQVU7RUFDdkIsTUFBTSxPQUFPLE1BQU0sR0FBRyxFQUFFO0FBQ3hCLE1BQUksT0FBTyxTQUFTLFVBQVU7R0FDNUIsTUFBTSxTQUFTLE1BQU0sT0FBTyxNQUFNLG9CQUFvQixFQUFFLElBQUk7QUFDNUQsUUFBSyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxJQUNoQyxPQUFNLEtBQUssZ0NBQWdDLElBQUksT0FBTyxJQUFJO2FBRW5ELE9BQU8sU0FBUyxVQUFVO0dBQ25DLE1BQU0sU0FBUyxLQUFLLE1BQU0sb0JBQW9CLEtBQUs7QUFDbkQsUUFBSyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxJQUNoQyxPQUFNLEtBQUssNkJBQTZCLEdBQUcsT0FBTyxJQUFJOztBQUcxRCxTQUFPOztBQUVULFFBQU8sZUFBZSxJQUFJLFlBQVk7QUFDdEMsUUFBTyxrQkFBa0IsS0FBSyxRQUFRLDZCQUE2QixLQUFLLEtBQUssSUFBSTtBQUNqRixRQUFPLGlCQUFpQixLQUFLLFFBQVEsZ0NBQWdDLEtBQUssS0FBSyxJQUFJO0FBQ25GLFFBQU87O0FBSVQsSUFBSSxFQUFFLFdBQVc7QUFDakIsSUFBSSxNQUFNO0FBQ1YsU0FBUyxnQkFBZ0IsTUFBTTtDQUM3QixJQUFJO0FBQ0osS0FBSTtBQUNGLFVBQVEsS0FBSyxNQUFNLEtBQUs7U0FDbEI7QUFDTixRQUFNLElBQUksTUFBTSx1Q0FBdUM7O0FBRXpELEtBQUksVUFBVSxRQUFRLE9BQU8sVUFBVSxZQUFZLE1BQU0sUUFBUSxNQUFNLENBQ3JFLE9BQU0sSUFBSSxNQUFNLDBDQUEwQztBQUU1RCxRQUFPOztBQUVULElBQUksZ0JBQWdCLE1BQU07Ozs7OztDQU14QixZQUFZLFlBQVksVUFBVTtBQUNoQyxPQUFLLGFBQWE7QUFDbEIsT0FBSyxjQUFjLGdCQUFnQixXQUFXO0FBQzlDLE9BQUssWUFBWTs7Q0FFbkI7Q0FDQTtDQUNBLElBQUksV0FBVztBQUNiLFNBQU8sS0FBSzs7Q0FFZCxJQUFJLFVBQVU7QUFDWixTQUFPLEtBQUssWUFBWTs7Q0FFMUIsSUFBSSxTQUFTO0FBQ1gsU0FBTyxLQUFLLFlBQVk7O0NBRTFCLElBQUksV0FBVztFQUNiLE1BQU0sTUFBTSxLQUFLLFlBQVk7QUFDN0IsTUFBSSxPQUFPLEtBQ1QsUUFBTyxFQUFFO0FBRVgsU0FBTyxPQUFPLFFBQVEsV0FBVyxDQUFDLElBQUksR0FBRzs7O0FBRzdDLElBQUksY0FBYyxNQUFNLGFBQWE7Q0FDbkM7Q0FFQTtDQUVBLGtCQUFrQjtDQUNsQjtDQUNBO0NBQ0EsWUFBWSxNQUFNO0FBQ2hCLE9BQUssYUFBYSxLQUFLO0FBQ3ZCLE9BQUssYUFBYSxLQUFLO0FBQ3ZCLE9BQUssa0JBQWtCLEtBQUs7O0NBRTlCLGlCQUFpQjtBQUNmLE1BQUksS0FBSyxnQkFBaUI7QUFDMUIsT0FBSyxrQkFBa0I7RUFDdkIsTUFBTSxRQUFRLEtBQUssWUFBWTtBQUMvQixNQUFJLENBQUMsTUFDSCxNQUFLLGFBQWE7TUFFbEIsTUFBSyxhQUFhLElBQUksY0FBYyxPQUFPLEtBQUssZ0JBQWdCO0FBRWxFLFNBQU8sT0FBTyxLQUFLOzs7Q0FHckIsSUFBSSxTQUFTO0FBQ1gsT0FBSyxnQkFBZ0I7QUFDckIsU0FBTyxLQUFLLGVBQWU7OztDQUc3QixJQUFJLE1BQU07QUFDUixPQUFLLGdCQUFnQjtBQUNyQixTQUFPLEtBQUs7OztDQUdkLE9BQU8sV0FBVztBQUNoQixTQUFPLElBQUksYUFBYTtHQUN0QixZQUFZO0dBQ1osaUJBQWlCO0dBQ2pCLGdCQUFnQixTQUFTLE1BQU07R0FDaEMsQ0FBQzs7O0NBR0osT0FBTyxpQkFBaUIsY0FBYyxRQUFRO0FBQzVDLE1BQUksaUJBQWlCLEtBQ25CLFFBQU8sSUFBSSxhQUFhO0dBQ3RCLFlBQVk7R0FDWixpQkFBaUI7R0FDakIsZ0JBQWdCO0dBQ2pCLENBQUM7QUFFSixTQUFPLElBQUksYUFBYTtHQUN0QixZQUFZO0dBQ1osaUJBQWlCO0lBQ2YsTUFBTSxhQUFhLElBQUksZ0JBQWdCLGFBQWEsa0JBQWtCO0FBQ3RFLFFBQUksV0FBVyxXQUFXLEVBQUcsUUFBTztBQUVwQyxXQURtQixJQUFJLGFBQWEsQ0FBQyxPQUFPLFdBQVc7O0dBR3pELGdCQUFnQjtHQUNqQixDQUFDOzs7QUFHTixJQUFJLGlCQUFpQixNQUFNLFdBQVc7Q0FDcEM7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFlBQVksUUFBUSxXQUFXLGNBQWMsUUFBUTtBQUNuRCxTQUFPLEtBQUssS0FBSztBQUNqQixPQUFLLFNBQVM7QUFDZCxPQUFLLFlBQVk7QUFDakIsT0FBSyxlQUFlO0FBQ3BCLE9BQUssS0FBSzs7O0NBR1osT0FBTyxNQUFNLElBQUksUUFBUSxXQUFXLGNBQWM7QUFDaEQsS0FBRyxTQUFTO0FBQ1osS0FBRyxZQUFZO0FBQ2YsS0FBRyxlQUFlO0FBQ2xCLE1BQUdDLGNBQWUsS0FBSztBQUN2QixNQUFHQyxhQUFjLEtBQUs7O0NBRXhCLElBQUksV0FBVztBQUNiLFNBQU8sTUFBS0MsYUFBYyxJQUFJLFNBQVMsSUFBSSxVQUFVLENBQUM7O0NBRXhELElBQUksYUFBYTtBQUNmLFNBQU8sTUFBS0QsZUFBZ0IsWUFBWSxpQkFDdEMsS0FBSyxjQUNMLEtBQUssT0FDTjs7Q0FFSCxJQUFJLFNBQVM7QUFDWCxTQUFPLE1BQUtFLFdBQVksV0FBVyxLQUFLLFVBQVU7Ozs7O0NBS3BELFlBQVk7RUFDVixNQUFNLFFBQVEsS0FBSyxPQUFPLEtBQUssSUFBSSxXQUFXLEdBQUcsQ0FBQztBQUNsRCxTQUFPLEtBQUssa0JBQWtCLE1BQU07Ozs7OztDQU10QyxZQUFZO0VBQ1YsTUFBTSxRQUFRLEtBQUssT0FBTyxLQUFLLElBQUksV0FBVyxFQUFFLENBQUM7RUFDakQsTUFBTSxVQUFVLE1BQUtILGdCQUFpQixFQUFFLE9BQU8sR0FBRztBQUNsRCxTQUFPLEtBQUssY0FBYyxTQUFTLEtBQUssV0FBVyxNQUFNOzs7QUFHN0QsSUFBSSxtQkFBbUIsU0FBUyxrQ0FBa0MsSUFBSSxHQUFHLE1BQU07QUFDN0UsUUFBTyxHQUFHLEdBQUcsS0FBSzs7QUFFcEIsSUFBSSxhQUFhLFlBQVksSUFBSSxnQkFBZ0IsUUFBUTtBQUN6RCxJQUFJLGtCQUFrQixNQUFNO0NBQzFCO0NBQ0E7Q0FDQTs7Q0FFQTtDQUNBLFlBQVksU0FBUztBQUNuQixRQUFLSSxTQUFVO0FBQ2YsUUFBS0MsMkJBQTRCLFFBQVEsVUFBVSxTQUFTLEtBQ3pELEVBQUUsYUFBYSxZQUFZLGlCQUFpQixRQUFRLFFBQVEsVUFBVSxDQUN4RTs7Q0FFSCxLQUFJQyxTQUFVO0FBQ1osU0FBTyxNQUFLQyxZQUFhLE9BQ3ZCLE9BQU8sWUFDTCxPQUFPLE9BQU8sTUFBS0gsT0FBUSxXQUFXLE9BQU8sQ0FBQyxLQUFLLFdBQVcsQ0FDNUQsT0FBTyxjQUNQLGNBQWMsTUFBS0EsT0FBUSxXQUFXLE9BQU8sU0FBUyxDQUN2RCxDQUFDLENBQ0gsQ0FDRjs7Q0FFSCxLQUFJSSxhQUFjO0FBQ2hCLFNBQU8sTUFBS0MsZ0JBQWlCLElBQUksZUFDL0IsU0FBUyxNQUFNLEVBQ2YsVUFBVSxZQUNWLE1BQ0EsTUFBS0gsT0FDTjs7Q0FFSCxzQkFBc0I7RUFDcEIsTUFBTSxTQUFTLElBQUksYUFBYSxJQUFJO0FBQ3BDLGVBQWEsVUFDWCxRQUNBLGFBQWEsSUFBSSxNQUFLRixPQUFRLGlCQUFpQixDQUFDLENBQ2pEO0FBQ0QsU0FBTyxPQUFPLFdBQVc7O0NBRTNCLDBCQUEwQixNQUFNO0FBQzlCLFNBQU8sb0JBQW9CLEtBQUs7O0NBRWxDLElBQUkseUJBQXlCO0FBQzNCLFNBQU87O0NBRVQsaUJBQWlCLFdBQVcsUUFBUSxRQUFRLFdBQVcsU0FBUztFQUM5RCxNQUFNLFlBQVksTUFBS0E7RUFDdkIsTUFBTSxrQkFBa0IsTUFBS0MseUJBQTBCO0FBQ3ZELGdCQUFjLE1BQU0sUUFBUTtFQUM1QixNQUFNLE9BQU8sZ0JBQWdCLGNBQWM7RUFDM0MsTUFBTSxpQkFBaUIsSUFBSSxTQUFTLE9BQU87RUFDM0MsTUFBTSxNQUFNLE1BQUtHO0FBQ2pCLGlCQUFlLE1BQ2IsS0FDQSxnQkFDQSxJQUFJLFVBQVUsVUFBVSxFQUN4QixhQUFhLFdBQVcsSUFBSSxhQUFhLE9BQU8sQ0FBQyxDQUNsRDtBQUNELG1CQUFpQixVQUFVLFNBQVMsWUFBWSxLQUFLLEtBQUs7O0NBRTVELGNBQWMsSUFBSSxRQUFRLFNBQVM7RUFDakMsTUFBTSxZQUFZLE1BQUtKO0VBQ3ZCLE1BQU0sRUFBRSxJQUFJLG1CQUFtQixpQkFBaUIsdUJBQXVCLFVBQVUsTUFBTTtFQVV2RixNQUFNLE1BQU0saUJBQWlCLElBVGpCLE9BQU87R0FDakIsUUFBUSxJQUFJLFNBQVMsT0FBTztHQUk1QixJQUFJLE1BQUtFO0dBQ1QsTUFBTSxpQkFBaUIsVUFBVSxXQUFXO0dBQzdDLENBQUMsRUFDVyxrQkFBa0IsSUFBSSxhQUFhLFFBQVEsQ0FBQyxDQUNkO0VBQzNDLE1BQU0sU0FBUyxJQUFJLGFBQWEsbUJBQW1CO0FBQ25ELE1BQUksZ0JBQWdCLElBQUksRUFBRTtHQUN4QixNQUFNLFFBQVEsTUFBTSxJQUFJO0FBQ3hCLG9CQUFpQixVQUFVLFFBQVEsaUJBQWlCLE9BQU8sTUFBTSxDQUFDO1NBQzdEO0FBQ0wsb0JBQWlCLFVBQVUsUUFBUSxpQkFBaUIsUUFBUTtBQUM1RCxtQkFBZ0IsUUFBUSxJQUFJOztBQUU5QixTQUFPLEVBQUUsTUFBTSxPQUFPLFdBQVcsRUFBRTs7Q0FFckMsbUJBQW1CLElBQUksU0FBUztFQUM5QixNQUFNLFlBQVksTUFBS0Y7RUFDdkIsTUFBTSxFQUFFLElBQUksbUJBQW1CLGlCQUFpQix1QkFBdUIsVUFBVSxVQUFVO0VBUzNGLE1BQU0sTUFBTSxpQkFBaUIsSUFSakIsT0FBTztHQUlqQixJQUFJLE1BQUtFO0dBQ1QsTUFBTSxpQkFBaUIsVUFBVSxXQUFXO0dBQzdDLENBQUMsRUFDVyxrQkFBa0IsSUFBSSxhQUFhLFFBQVEsQ0FBQyxDQUNkO0VBQzNDLE1BQU0sU0FBUyxJQUFJLGFBQWEsbUJBQW1CO0FBQ25ELE1BQUksZ0JBQWdCLElBQUksRUFBRTtHQUN4QixNQUFNLFFBQVEsTUFBTSxJQUFJO0FBQ3hCLG9CQUFpQixVQUFVLFFBQVEsaUJBQWlCLE9BQU8sTUFBTSxDQUFDO1NBQzdEO0FBQ0wsb0JBQWlCLFVBQVUsUUFBUSxpQkFBaUIsUUFBUTtBQUM1RCxtQkFBZ0IsUUFBUSxJQUFJOztBQUU5QixTQUFPLEVBQUUsTUFBTSxPQUFPLFdBQVcsRUFBRTs7Q0FFckMsbUJBQW1CLElBQUksUUFBUSxlQUFlLFdBQVcsTUFBTTtBQUM3RCxTQUFPLGNBQ0wsTUFBS0YsUUFDTCxJQUNBLElBQUksU0FBUyxPQUFPLEVBQ3BCLGFBQWEsV0FBVyxJQUFJLGFBQWEsY0FBYyxDQUFDLEVBQ3hELElBQUksVUFBVSxVQUFVLEVBQ3hCLFlBQ00sTUFBS0UsT0FDWjs7O0FBR0wsSUFBSSxnQkFBZ0IsSUFBSSxhQUFhLEVBQUU7QUFDdkMsSUFBSSxnQkFBZ0IsSUFBSSxhQUFhLElBQUksWUFBWSxDQUFDO0FBQ3RELFNBQVMsY0FBYyxXQUFXLFFBQVE7Q0FDeEMsTUFBTSxXQUFXLElBQUksbUJBQW1CLE9BQU8sV0FBVztDQUMxRCxNQUFNLFVBQVUsVUFBVSxNQUFNLE9BQU87QUFDdkMsS0FBSSxRQUFRLFFBQVEsVUFDbEIsT0FBTTtDQUVSLE1BQU0sZUFBZSxjQUFjLGVBQWUsU0FBUyxVQUFVO0NBQ3JFLE1BQU0saUJBQWlCLGNBQWMsaUJBQWlCLFNBQVMsVUFBVTtDQUN6RSxNQUFNLFlBQVksT0FBTyxVQUFVLEtBQUssUUFBUTtFQUM5QyxNQUFNLE1BQU0sUUFBUSxNQUFNLFNBQVMsSUFBSTtFQUN2QyxNQUFNLFVBQVUsSUFBSTtFQUNwQixJQUFJO0FBQ0osVUFBUSxRQUFRLEtBQWhCO0dBQ0UsS0FBSztHQUNMLEtBQUs7R0FDTCxLQUFLO0dBQ0wsS0FBSztHQUNMLEtBQUs7R0FDTCxLQUFLO0FBQ0gsc0JBQWtCO0FBQ2xCO0dBQ0YsS0FBSztHQUNMLEtBQUs7R0FDTCxLQUFLO0dBQ0wsS0FBSztHQUNMLEtBQUs7R0FDTCxLQUFLO0FBQ0gsc0JBQWtCO0FBQ2xCO0dBQ0YsUUFDRSxPQUFNLElBQUksVUFBVSx3QkFBd0I7O0FBRWhELFNBQU87R0FDTCxTQUFTLElBQUk7R0FDYjtHQUNBLGFBQWEsY0FBYyxpQkFBaUIsU0FBUyxVQUFVO0dBQ2hFO0dBQ0Q7Q0FDRixNQUFNLG1CQUFtQixVQUFVLFNBQVM7Q0FDNUMsTUFBTSxhQUFhLGNBQWMsSUFBSSwyQkFBMkIsU0FBUyxFQUFFLGVBQWU7Q0FDMUYsTUFBTSw0QkFBNEIsb0JBQW9CLEtBQUssWUFBWTtBQUNyRSxnQkFBYyxNQUFNLFFBQVE7QUFDNUIsT0FBSyxNQUFNLEVBQUUsU0FBUyxhQUFhLHFCQUFxQixVQUN0RCxLQUFJLElBQUksYUFBYSxnQkFDbkIsS0FBSSxXQUFXLFlBQVksY0FBYztLQUczQztDQUNKLE1BQU0sZUFBZTtFQUNuQixhQUFhLElBQUksMEJBQTBCLFNBQVM7RUFDcEQ7R0FDQyxPQUFPLGlCQUFpQixNQUFNO0VBQy9CLFNBQVMsUUFBUTtHQUNmLE1BQU0sTUFBTTtBQUNaLGlCQUFjLE1BQU0sSUFBSTtBQUN4QixnQkFBYSxlQUFlLElBQUk7QUFDaEMsT0FBSSx1QkFBdUIsVUFBVSxJQUFJLFFBQVEsY0FBYyxPQUFPO0dBQ3RFLE1BQU0sTUFBTSxFQUFFLEdBQUcsS0FBSztBQUN0QiwrQkFBNEIsS0FBSyxJQUFJLEtBQUs7QUFDMUMsVUFBTzs7RUFFVCxTQUFTLFFBQVE7R0FDZixNQUFNLE1BQU07QUFDWixpQkFBYyxNQUFNLElBQUk7QUFDeEIsaUJBQWMsU0FBUyxFQUFFO0FBQ3pCLGdCQUFhLGVBQWUsSUFBSTtBQU1oQyxVQUxjLElBQUksaUNBQ2hCLFVBQ0EsSUFBSSxRQUNKLGNBQWMsT0FDZixHQUNjOztFQUVsQjtDQUNELE1BQU0sWUFBWSxPQUFPLE9BQ1AsdUJBQU8sT0FBTyxLQUFLLEVBQ25DLGFBQ0Q7QUFDRCxNQUFLLE1BQU0sWUFBWSxPQUFPLFNBQVM7RUFDckMsTUFBTSxlQUFlLFNBQVM7RUFDOUIsTUFBTSxXQUFXLElBQUksbUJBQW1CLFNBQVMsV0FBVztFQUM1RCxJQUFJO0VBQ0osSUFBSSxjQUFjO0FBQ2xCLFVBQVEsU0FBUyxVQUFVLEtBQTNCO0dBQ0UsS0FBSztBQUNILGtCQUFjO0FBQ2QsaUJBQWEsU0FBUyxVQUFVO0FBQ2hDO0dBQ0YsS0FBSztBQUNILGlCQUFhLFNBQVMsVUFBVTtBQUNoQztHQUNGLEtBQUs7QUFDSCxpQkFBYSxDQUFDLFNBQVMsVUFBVSxNQUFNO0FBQ3ZDOztFQUVKLE1BQU0sYUFBYSxXQUFXO0VBQzlCLE1BQU0sWUFBWSxJQUFJLElBQUksV0FBVztFQUNyQyxNQUFNLFdBQVcsT0FBTyxZQUFZLFFBQVEsTUFBTSxFQUFFLEtBQUssUUFBUSxTQUFTLENBQUMsTUFBTSxNQUFNLFVBQVUsV0FBVyxJQUFJLElBQUksRUFBRSxLQUFLLE1BQU0sUUFBUSxDQUFDLENBQUM7RUFDM0ksTUFBTSxlQUFlLFlBQVksV0FBVyxXQUFXLE9BQU8sV0FBVyxVQUFVLFdBQVcsT0FBTyxJQUFJLE1BQU0sT0FBTyxXQUFXLE9BQU8sR0FBRztFQUMzSSxNQUFNLG1CQUFtQixXQUFXLEtBQ2pDLE9BQU8sY0FBYyxlQUNwQixRQUFRLE1BQU0sU0FBUyxJQUFJLGVBQzNCLFVBQ0QsQ0FDRjtFQUNELE1BQU0sa0JBQWtCLFFBQVEsV0FBVztBQUN6QyxpQkFBYyxNQUFNLE9BQU87QUFDM0IsUUFBSyxJQUFJLElBQUksR0FBRyxJQUFJLFlBQVksSUFDOUIsa0JBQWlCLEdBQUcsZUFBZSxPQUFPLEdBQUc7QUFFL0MsVUFBTyxjQUFjOztFQUV2QixNQUFNLHlCQUF5QixlQUFlLElBQUksaUJBQWlCLEtBQUs7RUFDeEUsTUFBTSx1QkFBdUIsNEJBQTRCLFFBQVEsV0FBVztBQUMxRSxpQkFBYyxNQUFNLE9BQU87QUFDM0IsMEJBQXVCLGVBQWUsT0FBTztBQUM3QyxVQUFPLGNBQWM7O0VBRXZCLElBQUk7QUFDSixNQUFJLFlBQVksc0JBQXNCO0dBQ3BDLE1BQU0sT0FBTztJQUNYLE9BQU8sV0FBVztLQUNoQixNQUFNLE1BQU07S0FDWixNQUFNLFlBQVkscUJBQXFCLEtBQUssT0FBTztBQU1uRCxZQUFPLGdCQUxTLElBQUksaUNBQ2xCLFVBQ0EsSUFBSSxRQUNKLFVBQ0QsRUFDK0IsZUFBZTs7SUFFakQsU0FBUyxXQUFXO0tBQ2xCLE1BQU0sTUFBTTtLQUNaLE1BQU0sWUFBWSxxQkFBcUIsS0FBSyxPQUFPO0FBTW5ELFlBTFksSUFBSSwyQ0FDZCxVQUNBLElBQUksUUFDSixVQUNELEdBQ1k7O0lBRWhCO0FBQ0QsT0FBSSxhQUNGLE1BQUssVUFBVSxRQUFRO0lBQ3JCLE1BQU0sTUFBTTtBQUNaLGtCQUFjLE1BQU0sSUFBSTtBQUN4QixpQkFBYSxlQUFlLElBQUk7QUFDaEMsUUFBSSx1QkFDRixVQUNBLFVBQ0EsSUFBSSxRQUNKLGNBQWMsT0FDZjtBQUNELGdDQUE0QixLQUFLLElBQUksS0FBSztBQUMxQyxXQUFPOztBQUdYLFdBQVE7YUFDQyxVQUFVO0dBQ25CLE1BQU0sT0FBTztJQUNYLE9BQU8sV0FBVztBQUNoQixTQUFJLE9BQU8sV0FBVyxXQUNwQixPQUFNLElBQUksVUFBVSwyQkFBMkI7S0FFakQsTUFBTSxNQUFNO0tBQ1osTUFBTSxZQUFZLGVBQWUsS0FBSyxPQUFPO0FBTTdDLFlBQU8sZ0JBTFMsSUFBSSxpQ0FDbEIsVUFDQSxJQUFJLFFBQ0osVUFDRCxFQUMrQixlQUFlOztJQUVqRCxTQUFTLFdBQVc7QUFDbEIsU0FBSSxPQUFPLFdBQVcsV0FDcEIsT0FBTSxJQUFJLFVBQVUsMkJBQTJCO0tBQ2pELE1BQU0sTUFBTTtLQUNaLE1BQU0sWUFBWSxlQUFlLEtBQUssT0FBTztBQU03QyxZQUxZLElBQUksMkNBQ2QsVUFDQSxJQUFJLFFBQ0osVUFDRCxHQUNZOztJQUVoQjtBQUNELE9BQUksYUFDRixNQUFLLFVBQVUsUUFBUTtJQUNyQixNQUFNLE1BQU07QUFDWixrQkFBYyxNQUFNLElBQUk7QUFDeEIsaUJBQWEsZUFBZSxJQUFJO0FBQ2hDLFFBQUksdUJBQ0YsVUFDQSxVQUNBLElBQUksUUFDSixjQUFjLE9BQ2Y7QUFDRCxnQ0FBNEIsS0FBSyxJQUFJLEtBQUs7QUFDMUMsV0FBTzs7QUFHWCxXQUFRO2FBQ0Msc0JBQXNCO0dBQy9CLE1BQU0sV0FBVztJQUNmLFNBQVMsVUFBVTtLQUNqQixNQUFNLE1BQU07S0FDWixNQUFNLFlBQVkscUJBQXFCLEtBQUssTUFBTTtBQU1sRCxZQUFPLGNBTFMsSUFBSSxpQ0FDbEIsVUFDQSxJQUFJLFFBQ0osVUFDRCxFQUM2QixlQUFlOztJQUUvQyxTQUFTLFVBQVU7S0FDakIsTUFBTSxNQUFNO0tBQ1osTUFBTSxZQUFZLHFCQUFxQixLQUFLLE1BQU07QUFDbEQsWUFBTyxJQUFJLDJDQUNULFVBQ0EsSUFBSSxRQUNKLFVBQ0Q7O0lBRUo7QUFDRCxPQUFJLFlBQ0YsU0FBUTtPQUVSLFNBQVE7YUFFRCxZQUNULFNBQVE7R0FDTixTQUFTLFVBQVU7SUFDakIsTUFBTSxNQUFNO0lBQ1osTUFBTSxZQUFZLGVBQWUsS0FBSyxNQUFNO0FBTTVDLFdBQU8sY0FMUyxJQUFJLGlDQUNsQixVQUNBLElBQUksUUFDSixVQUNELEVBQzZCLGVBQWU7O0dBRS9DLFNBQVMsVUFBVTtJQUNqQixNQUFNLE1BQU07SUFDWixNQUFNLFlBQVksZUFBZSxLQUFLLE1BQU07QUFDNUMsV0FBTyxJQUFJLDJDQUNULFVBQ0EsSUFBSSxRQUNKLFVBQ0Q7O0dBRUo7T0FDSTtHQUNMLE1BQU0sa0JBQWtCLFFBQVEsVUFBVTtBQUN4QyxRQUFJLE1BQU0sU0FBUyxXQUFZLE9BQU0sSUFBSSxVQUFVLG9CQUFvQjtBQUN2RSxrQkFBYyxNQUFNLE9BQU87SUFDM0IsTUFBTSxTQUFTO0lBQ2YsTUFBTSxlQUFlLE1BQU0sU0FBUztBQUNwQyxTQUFLLElBQUksSUFBSSxHQUFHLElBQUksY0FBYyxJQUNoQyxrQkFBaUIsR0FBRyxRQUFRLE1BQU0sR0FBRztJQUV2QyxNQUFNLGVBQWUsT0FBTztJQUM1QixNQUFNLE9BQU8sTUFBTSxNQUFNLFNBQVM7SUFDbEMsTUFBTSxnQkFBZ0IsaUJBQWlCLE1BQU0sU0FBUztBQUN0RCxRQUFJLGdCQUFnQixPQUFPO0tBQ3pCLE1BQU0sY0FBYyxVQUFVO0FBRTVCLGFBQU8sUUFETTtPQUFFLFVBQVU7T0FBRyxVQUFVO09BQUcsV0FBVztPQUFHLENBQ25DLE1BQU0sS0FBSztBQUMvQixVQUFJLE1BQU0sUUFBUSxZQUFhLGVBQWMsUUFBUSxNQUFNLE1BQU07O0FBRW5FLGdCQUFXLEtBQUssS0FBSztLQUNyQixNQUFNLFlBQVksT0FBTyxTQUFTO0FBQ2xDLGdCQUFXLEtBQUssR0FBRztBQUVuQixZQUFPO01BQUM7TUFBYztNQUFjO01BRHBCLE9BQU8sU0FBUztNQUN1QjtXQUNsRDtBQUNMLFlBQU8sUUFBUSxFQUFFO0FBQ2pCLG1CQUFjLFFBQVEsS0FBSztBQUczQixZQUFPO01BQUM7TUFBYztNQUZKLE9BQU87TUFDVDtNQUN1Qzs7O0FBRzNELFdBQVE7SUFDTixTQUFTLFVBQVU7QUFDakIsU0FBSSxNQUFNLFdBQVcsWUFBWTtNQUMvQixNQUFNLE1BQU07TUFDWixNQUFNLFlBQVksZUFBZSxLQUFLLE1BQU07QUFNNUMsYUFBTyxjQUxTLElBQUksaUNBQ2xCLFVBQ0EsSUFBSSxRQUNKLFVBQ0QsRUFDNkIsZUFBZTtZQUN4QztNQUNMLE1BQU0sTUFBTTtNQUNaLE1BQU0sT0FBTyxlQUFlLEtBQUssTUFBTTtBQU12QyxhQUFPLGNBTFMsSUFBSSxpQ0FDbEIsVUFDQSxJQUFJLFFBQ0osR0FBRyxLQUNKLEVBQzZCLGVBQWU7OztJQUdqRCxTQUFTLFVBQVU7QUFDakIsU0FBSSxNQUFNLFdBQVcsWUFBWTtNQUMvQixNQUFNLE1BQU07TUFDWixNQUFNLFlBQVksZUFBZSxLQUFLLE1BQU07QUFDNUMsYUFBTyxJQUFJLDJDQUNULFVBQ0EsSUFBSSxRQUNKLFVBQ0Q7WUFDSTtNQUNMLE1BQU0sTUFBTTtNQUNaLE1BQU0sT0FBTyxlQUFlLEtBQUssTUFBTTtBQUN2QyxhQUFPLElBQUksMkNBQ1QsVUFDQSxJQUFJLFFBQ0osR0FBRyxLQUNKOzs7SUFHTjs7QUFFSCxNQUFJLE9BQU8sT0FBTyxXQUFXLGFBQWEsQ0FDeEMsUUFBTyxPQUFPLE9BQU8sVUFBVSxlQUFlLE1BQU0sQ0FBQztNQUVyRCxXQUFVLGdCQUFnQixPQUFPLE1BQU07O0FBRzNDLFFBQU8sT0FBTyxVQUFVOztBQUUxQixVQUFVLGNBQWMsSUFBSSxhQUFhO0NBQ3ZDLE1BQU0sT0FBTyxJQUFJLGVBQWUsR0FBRztDQUNuQyxNQUFNLFVBQVUsU0FBUztBQUN6QixLQUFJO0VBQ0YsSUFBSTtBQUNKLFNBQU8sTUFBTSxLQUFLLFFBQVEsUUFBUSxFQUFFO0dBQ2xDLE1BQU0sU0FBUyxJQUFJLGFBQWEsUUFBUSxLQUFLO0FBQzdDLFVBQU8sT0FBTyxTQUFTLElBQ3JCLE9BQU0sWUFBWSxPQUFPOztXQUdyQjtBQUNSLFlBQVUsUUFBUTs7O0FBR3RCLFNBQVMsZ0JBQWdCLElBQUksYUFBYTtDQUN4QyxNQUFNLE1BQU07QUFFWixLQURZLGVBQWUsSUFBSSxJQUFJLEtBQ3ZCLEdBQUc7QUFDYixnQkFBYyxNQUFNLElBQUksS0FBSztBQUM3QixTQUFPLFlBQVksY0FBYzs7QUFFbkMsUUFBTzs7QUFFVCxTQUFTLGVBQWUsSUFBSSxLQUFLO0FBQy9CLFFBQU8sS0FDTCxLQUFJO0FBQ0YsU0FBTyxJQUFJLElBQUksdUJBQXVCLElBQUksSUFBSSxPQUFPO1VBQzlDLEdBQUc7QUFDVixNQUFJLEtBQUssT0FBTyxNQUFNLFlBQVksT0FBTyxHQUFHLHVCQUF1QixFQUFFO0FBQ25FLE9BQUksS0FBSyxFQUFFLHFCQUFxQjtBQUNoQzs7QUFFRixRQUFNOzs7QUFJWixJQUFJLDBCQUEwQixLQUFLLE9BQU87QUFDMUMsSUFBSSxZQUFZLENBQ2QsSUFBSSxnQkFBZ0Isd0JBQXdCLENBQzdDO0FBQ0QsSUFBSSxpQkFBaUI7QUFDckIsU0FBUyxVQUFVO0FBQ2pCLFFBQU8saUJBQWlCLFVBQVUsRUFBRSxrQkFBa0IsSUFBSSxnQkFBZ0Isd0JBQXdCOztBQUVwRyxTQUFTLFVBQVUsS0FBSztBQUN0QixXQUFVLG9CQUFvQjs7QUFFaEMsSUFBSSxXQUFXLElBQUksZ0JBQWdCLHdCQUF3QjtBQUMzRCxJQUFJLGlCQUFpQixNQUFNLGdCQUFnQjtDQUN6QztDQUNBLFFBQU9JLHVCQUF3QixJQUFJLHFCQUNqQyxJQUFJLHFCQUNMO0NBQ0QsWUFBWSxJQUFJO0FBQ2QsUUFBS0MsS0FBTTtBQUNYLG1CQUFnQkQscUJBQXNCLFNBQVMsTUFBTSxJQUFJLEtBQUs7OztDQUdoRSxVQUFVO0VBQ1IsTUFBTSxLQUFLLE1BQUtDO0FBQ2hCLFFBQUtBLEtBQU07QUFDWCxtQkFBZ0JELHFCQUFzQixXQUFXLEtBQUs7QUFDdEQsU0FBTzs7O0NBR1QsUUFBUSxLQUFLO0FBQ1gsTUFBSSxNQUFLQyxPQUFRLEdBQUksUUFBTztFQUM1QixNQUFNLE1BQU0sZUFBZSxNQUFLQSxJQUFLLElBQUk7QUFDekMsTUFBSSxPQUFPLEVBQUcsT0FBS0MsUUFBUztBQUM1QixTQUFPLE1BQU0sSUFBSSxDQUFDLE1BQU07O0NBRTFCLENBQUMsT0FBTyxXQUFXO0FBQ2pCLE1BQUksTUFBS0QsTUFBTyxHQUFHO0dBQ2pCLE1BQU0sS0FBSyxNQUFLQyxRQUFTO0FBQ3pCLE9BQUkscUJBQXFCLEdBQUc7Ozs7QUFNbEMsSUFBSSxFQUFFLFFBQVEsWUFBWTtBQUMxQixJQUFJLGNBQWMsSUFBSSxhQUFhO0FBQ25DLElBQUksY0FBYyxJQUFJLFlBQ3BCLFFBRUQ7QUFDRCxJQUFJLGVBQWUsT0FBTyxlQUFlO0FBQ3pDLElBQUksZUFBZSxNQUFNLGNBQWM7Q0FDckM7Q0FDQTtDQUNBLFlBQVksTUFBTSxNQUFNO0FBQ3RCLE1BQUksUUFBUSxLQUNWLE9BQUtDLE9BQVE7V0FDSixPQUFPLFNBQVMsU0FDekIsT0FBS0EsT0FBUTtNQUViLE9BQUtBLE9BQVEsSUFBSSxXQUFXLEtBQUssQ0FBQztBQUVwQyxRQUFLQyxRQUFTO0dBQ1osU0FBUyxJQUFJLFFBQVEsTUFBTSxRQUFRO0dBQ25DLFFBQVEsTUFBTSxVQUFVO0dBQ3hCLFlBQVksTUFBTSxjQUFjO0dBQ2hDLE1BQU07R0FDTixLQUFLO0dBQ0wsU0FBUztHQUNWOztDQUVILFFBQVEsY0FBYyxNQUFNLE9BQU87RUFDakMsTUFBTSxLQUFLLElBQUksY0FBYyxLQUFLO0FBQ2xDLE1BQUdBLFFBQVM7QUFDWixTQUFPOztDQUVULElBQUksVUFBVTtBQUNaLFNBQU8sTUFBS0EsTUFBTzs7Q0FFckIsSUFBSSxTQUFTO0FBQ1gsU0FBTyxNQUFLQSxNQUFPOztDQUVyQixJQUFJLGFBQWE7QUFDZixTQUFPLE1BQUtBLE1BQU87O0NBRXJCLElBQUksS0FBSztBQUNQLFNBQU8sT0FBTyxNQUFLQSxNQUFPLFVBQVUsTUFBS0EsTUFBTyxVQUFVOztDQUU1RCxJQUFJLE1BQU07QUFDUixTQUFPLE1BQUtBLE1BQU8sT0FBTzs7Q0FFNUIsSUFBSSxPQUFPO0FBQ1QsU0FBTyxNQUFLQSxNQUFPOztDQUVyQixjQUFjO0FBQ1osU0FBTyxLQUFLLE9BQU8sQ0FBQzs7Q0FFdEIsUUFBUTtBQUNOLE1BQUksTUFBS0QsUUFBUyxLQUNoQixRQUFPLElBQUksWUFBWTtXQUNkLE9BQU8sTUFBS0EsU0FBVSxTQUMvQixRQUFPLFlBQVksT0FBTyxNQUFLQSxLQUFNO01BRXJDLFFBQU8sSUFBSSxXQUFXLE1BQUtBLEtBQU07O0NBR3JDLE9BQU87QUFDTCxTQUFPLEtBQUssTUFBTSxLQUFLLE1BQU0sQ0FBQzs7Q0FFaEMsT0FBTztBQUNMLE1BQUksTUFBS0EsUUFBUyxLQUNoQixRQUFPO1dBQ0UsT0FBTyxNQUFLQSxTQUFVLFNBQy9CLFFBQU8sTUFBS0E7TUFFWixRQUFPLFlBQVksT0FBTyxNQUFLQSxLQUFNOzs7QUFJM0MsSUFBSSxrQkFBa0IsY0FBYyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsWUFBWSxjQUFjO0FBQzdFLElBQUksMEJBQTBCLElBQUksSUFBSTtDQUNwQyxDQUFDLE9BQU8sRUFBRSxLQUFLLE9BQU8sQ0FBQztDQUN2QixDQUFDLFFBQVEsRUFBRSxLQUFLLFFBQVEsQ0FBQztDQUN6QixDQUFDLFFBQVEsRUFBRSxLQUFLLFFBQVEsQ0FBQztDQUN6QixDQUFDLE9BQU8sRUFBRSxLQUFLLE9BQU8sQ0FBQztDQUN2QixDQUFDLFVBQVUsRUFBRSxLQUFLLFVBQVUsQ0FBQztDQUM3QixDQUFDLFdBQVcsRUFBRSxLQUFLLFdBQVcsQ0FBQztDQUMvQixDQUFDLFdBQVcsRUFBRSxLQUFLLFdBQVcsQ0FBQztDQUMvQixDQUFDLFNBQVMsRUFBRSxLQUFLLFNBQVMsQ0FBQztDQUMzQixDQUFDLFNBQVMsRUFBRSxLQUFLLFNBQVMsQ0FBQztDQUM1QixDQUFDO0FBQ0YsU0FBUyxNQUFNLEtBQUssT0FBTyxFQUFFLEVBQUU7Q0FDN0IsTUFBTSxTQUFTLFFBQVEsSUFBSSxLQUFLLFFBQVEsYUFBYSxJQUFJLE1BQU0sSUFBSTtFQUNqRSxLQUFLO0VBQ0wsT0FBTyxLQUFLO0VBQ2I7Q0FDRCxNQUFNLFVBQVUsRUFFZCxTQUFTLGNBQWMsSUFBSSxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxNQUFNLFFBQVEsRUFBRSxHQUFHLEVBQUUsS0FBSyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLFlBQVk7RUFBRTtFQUFNLE9BQU8sWUFBWSxPQUFPLE1BQU07RUFBRSxFQUFFLEVBQ2pNO0NBQ0QsTUFBTSxNQUFNLEtBQUs7Q0FDakIsTUFBTSxVQUFVLFFBQVE7RUFDdEI7RUFDQTtFQUNBLFNBQVMsS0FBSztFQUNkO0VBQ0EsU0FBUyxFQUFFLEtBQUssVUFBVTtFQUMzQixDQUFDO0NBQ0YsTUFBTSxhQUFhLElBQUksYUFBYSxnQkFBZ0I7QUFDcEQsYUFBWSxVQUFVLFlBQVksUUFBUTtDQUMxQyxNQUFNLE9BQU8sS0FBSyxRQUFRLE9BQU8sSUFBSSxZQUFZLEdBQUcsT0FBTyxLQUFLLFNBQVMsV0FBVyxLQUFLLE9BQU8sSUFBSSxXQUFXLEtBQUssS0FBSztDQUN6SCxNQUFNLENBQUMsYUFBYSxnQkFBZ0IsSUFBSSx1QkFDdEMsV0FBVyxXQUFXLEVBQ3RCLEtBQ0Q7Q0FDRCxNQUFNLFdBQVcsYUFBYSxZQUFZLElBQUksYUFBYSxZQUFZLENBQUM7QUFDeEUsUUFBTyxhQUFhLGNBQWMsY0FBYztFQUM5QyxNQUFNO0VBQ04sS0FBSztFQUNMLFFBQVEsU0FBUztFQUNqQixhQUFhLEdBQUcsZ0JBQWdCLFNBQVMsU0FBUyxLQUFLO0VBQ3ZELFNBQVMsSUFBSSxTQUFTO0VBQ3RCLFNBQVM7RUFDVixDQUFDOztBQUVKLFFBQVEsTUFBTTtBQUNkLElBQUksYUFBYSxRQUFRLEVBQUUsT0FBTyxDQUFDO0FBR25DLFNBQVMsb0JBQW9CLEtBQUssTUFBTSxRQUFRLEtBQUssSUFBSTtDQUN2RCxNQUFNLE9BQU8sTUFBTTtDQUNuQixNQUFNLG1CQUFtQixHQUFHLFNBQVMsR0FBRyxHQUFHLEtBQUs7QUFDaEQsaUJBQWdCLGlCQUFpQjtBQUNqQyxpQkFBZ0IsbUJBQW1CLE1BQU0sZUFBZTtBQUN0RCxvQkFBa0IsTUFBTSxRQUFRLFlBQVksUUFBUSxLQUFLLEdBQUc7QUFDNUQsT0FBSyxnQkFBZ0IsSUFDbkIsaUJBQ0EsUUFBUSxXQUNUOztBQUVILFFBQU87O0FBRVQsSUFBSSxxQkFBcUIsTUFBTSx1QkFBdUIsZUFBZTtBQUVyRSxTQUFTLGtCQUFrQixLQUFLLFlBQVksUUFBUSxLQUFLLElBQUksTUFBTTtBQUNqRSxLQUFJLGVBQWUsV0FBVztDQUM5QixNQUFNLGFBQWEsRUFDakIsVUFBVSxPQUFPLFFBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLFFBQVE7RUFDaEQsTUFBTTtFQUNOLGVBQWUsSUFBSSx5QkFDakIsaUJBQWlCLElBQUksRUFBRSxjQUFjLEVBQ3RDLENBQUM7RUFDSCxFQUFFLEVBQ0o7Q0FDRCxNQUFNLGFBQWEsSUFBSSx5QkFBeUIsSUFBSSxDQUFDO0FBQ3JELEtBQUksVUFBVSxXQUFXLEtBQUs7RUFDNUIsWUFBWTtFQUNaLFFBQVE7RUFDUjtFQUNBLFlBQVksbUJBQW1CO0VBQ2hDLENBQUM7Q0FDRixNQUFNLEVBQUUsY0FBYztBQUN0QixLQUFJLFdBQVcsS0FBSztFQUNsQjtFQUNBLGlCQUFpQixZQUFZLGlCQUFpQixZQUFZLFVBQVU7RUFDcEUsaUJBQWlCLGNBQWMsZUFBZSxZQUFZLFVBQVU7RUFDcEUsb0JBQW9CLGNBQWMsV0FBVyxXQUFXO0VBQ3pELENBQUM7O0FBRUosU0FBUyxjQUFjLFdBQVcsSUFBSSxRQUFRLGNBQWMsV0FBVyxTQUFTLFFBQVE7Q0FDdEYsTUFBTSxFQUFFLElBQUksaUJBQWlCLGlCQUFpQix1QkFBdUIsVUFBVSxXQUFXO0NBQzFGLE1BQU0sT0FBTyxnQkFBZ0IsSUFBSSxhQUFhLFFBQVEsQ0FBQztDQU92RCxNQUFNLE1BQU0saUJBQWlCLElBTmpCLElBQUksaUJBQ2QsUUFDQSxXQUNBLGNBQ0EsT0FDRCxFQUNxQyxLQUFLO0NBQzNDLE1BQU0sU0FBUyxJQUFJLGFBQWEsbUJBQW1CO0FBQ25ELGlCQUFnQixRQUFRLElBQUk7QUFDNUIsUUFBTyxPQUFPLFdBQVc7O0FBRTNCLElBQUksbUJBQW1CLE1BQU0sYUFBYTtDQUN4QyxZQUFZLFFBQVEsV0FBVyxjQUFjLFFBQVE7QUFDbkQsT0FBSyxTQUFTO0FBQ2QsT0FBSyxZQUFZO0FBQ2pCLE9BQUssZUFBZTtBQUNwQixRQUFLUCxTQUFVOztDQUVqQjtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElBQUksV0FBVztBQUNiLFNBQU8sTUFBS0osYUFBYyxJQUFJLFNBQVMsSUFBSSxVQUFVLENBQUM7O0NBRXhELElBQUksU0FBUztBQUNYLFNBQU8sTUFBS0MsV0FBWSxXQUFXLEtBQUssVUFBVTs7Q0FFcEQsSUFBSSxPQUFPO0FBQ1QsU0FBTzs7Q0FFVCxPQUFPLE1BQU07RUFDWCxNQUFNLFlBQVk7R0FDaEIsTUFBTSxZQUFZLElBQUksd0JBQXdCO0FBQzlDLE9BQUk7QUFPRixXQUFPLEtBTkssSUFBSSxtQkFDZCxLQUFLLFFBQ0wsSUFBSSxVQUFVLFVBQVUsRUFDeEIsS0FBSyxjQUNMLE1BQUtHLFFBQVMsQ0FDZixDQUNlO1lBQ1QsR0FBRztBQUNWLFFBQUksd0JBQXdCO0FBQzVCLFVBQU07OztFQUdWLElBQUksTUFBTSxLQUFLO0FBQ2YsTUFBSTtBQUNGLE9BQUkseUJBQXlCO0FBQzdCLFVBQU87VUFDRDtBQUVSLFVBQVEsS0FBSywwQ0FBMEM7QUFDdkQsUUFBTSxLQUFLO0FBQ1gsTUFBSTtBQUNGLE9BQUkseUJBQXlCO0FBQzdCLFVBQU87V0FDQSxHQUFHO0FBQ1YsU0FBTSxJQUFJLE1BQU0sa0NBQWtDLEVBQUUsT0FBTyxHQUFHLENBQUM7OztDQUduRSxZQUFZO0VBQ1YsTUFBTSxRQUFRLEtBQUssT0FBTyxLQUFLLElBQUksV0FBVyxHQUFHLENBQUM7QUFDbEQsU0FBTyxLQUFLLGtCQUFrQixNQUFNOztDQUV0QyxZQUFZO0VBQ1YsTUFBTSxRQUFRLEtBQUssT0FBTyxLQUFLLElBQUksV0FBVyxFQUFFLENBQUM7RUFDakQsTUFBTSxVQUFVLE1BQUtOLGdCQUFpQixFQUFFLE9BQU8sR0FBRztBQUNsRCxTQUFPLEtBQUssY0FBYyxTQUFTLEtBQUssV0FBVyxNQUFNOzs7QUFLN0QsU0FBUyxrQkFBa0IsS0FBSyxNQUFNLFFBQVEsSUFBSSxXQUFXO0NBQzNELE1BQU0saUJBQWlCLEdBQUcsU0FBUyxHQUFHLEdBQUcsS0FBSztBQUM5QyxlQUFjLGlCQUFpQjtBQUMvQixlQUFjLG1CQUFtQixNQUFNLGVBQWU7QUFDcEQsa0JBQWdCLE1BQU0sWUFBWSxRQUFRLElBQUksTUFBTSxVQUFVO0FBQzlELE9BQUssZ0JBQWdCLElBQ25CLGVBQ0EsV0FDRDs7QUFFSCxRQUFPOztBQUVULFNBQVMsZ0JBQWdCLEtBQUssWUFBWSxRQUFRLElBQUksTUFBTSxXQUFXO0FBQ3JFLEtBQUksZUFBZSxXQUFXO0FBQzlCLEtBQUksRUFBRSxrQkFBa0IsWUFDdEIsVUFBUyxJQUFJLFdBQVcsT0FBTztBQUVqQyxLQUFJLE9BQU8sYUFBYSxLQUFLLEVBQzNCLFFBQU8sV0FBVyxhQUFhLFdBQVc7Q0FFNUMsTUFBTSxNQUFNLElBQUkseUJBQXlCLE9BQU87Q0FDaEQsTUFBTSxhQUFhLElBQUksWUFBWSxJQUFJLENBQUM7Q0FDeEMsTUFBTSxjQUFjLGFBQWE7QUFDakMsS0FBSSxVQUFVLFNBQVMsS0FBSztFQUMxQixZQUFZO0VBQ1osUUFBUTtFQUVSLFlBQVksbUJBQW1CO0VBRS9CLGNBQWMsY0FBYyxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQztFQUNyRCxlQUFlLGNBQWM7RUFDOUIsQ0FBQztBQUNGLEtBQUksTUFBTSxRQUFRLEtBQ2hCLEtBQUksVUFBVSxjQUFjLFFBQVEsS0FBSztFQUN2QyxLQUFLO0VBQ0wsT0FBTztHQUNMLFlBQVk7R0FDWixlQUFlLEtBQUs7R0FDckI7RUFDRixDQUFDO0FBRUosS0FBSSxZQUNGLEtBQUksVUFBVSxrQkFBa0IsS0FBSztFQUNuQyxlQUFlO0VBQ2YsY0FBYztFQUNmLENBQUM7QUFFSixLQUFJLENBQUMsR0FBRyxLQUNOLFFBQU8sZUFBZSxJQUFJLFFBQVE7RUFBRSxPQUFPO0VBQVksVUFBVTtFQUFPLENBQUM7QUFFM0UsS0FBSSxTQUFTLEtBQUssR0FBRzs7QUFJdkIsSUFBSSxjQUFjLGNBQWMsY0FBYztDQUM1QztDQUNBLG9DQUFvQyxJQUFJLEtBQUs7Q0FDN0MsV0FBVyxFQUFFO0NBQ2IsYUFBYSxFQUFFO0NBQ2YsUUFBUSxFQUFFO0NBQ1YsWUFBWSxFQUFFOzs7OztDQUtkLGtDQUFrQyxJQUFJLEtBQUs7Q0FDM0MsbUJBQW1CLEVBQUU7Q0FDckIsWUFBWSxlQUFlO0FBQ3pCLFNBQU87QUFDUCxPQUFLLGFBQWEsY0FBYyxLQUFLOztDQUV2QyxlQUFlLE1BQU07QUFDbkIsTUFBSSxLQUFLLGtCQUFrQixJQUFJLEtBQUssQ0FDbEMsT0FBTSxJQUFJLFVBQ1IsMERBQTBELEtBQUssR0FDaEU7QUFFSCxPQUFLLGtCQUFrQixJQUFJLEtBQUs7O0NBRWxDLG1CQUFtQjtBQUNqQixPQUFLLE1BQU0sRUFBRSxTQUFTLGVBQWUsZUFBZSxLQUFLLGtCQUFrQjtHQUN6RSxNQUFNLGVBQWUsS0FBSyxnQkFBZ0IsSUFBSSxTQUFTLENBQUM7QUFDeEQsT0FBSSxpQkFBaUIsS0FBSyxHQUFHO0lBQzNCLE1BQU0sTUFBTSxTQUFTLFVBQVU7QUFDL0IsVUFBTSxJQUFJLFVBQVUsSUFBSTs7QUFFMUIsUUFBSyxVQUFVLFVBQVUsS0FBSztJQUM1QixZQUFZLEtBQUs7SUFDakI7SUFDQTtJQUNBO0lBQ0QsQ0FBQzs7OztBQUlSLElBQUksU0FBUyxNQUFNO0NBQ2pCO0NBQ0EsWUFBWSxLQUFLO0FBQ2YsUUFBS2UsTUFBTzs7Q0FFZCxDQUFDLGFBQWEsU0FBUztFQUNyQixNQUFNLG1CQUFtQixNQUFLQTtBQUM5QixPQUFLLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixPQUFPLFFBQVEsUUFBUSxFQUFFO0FBQzFELE9BQUksU0FBUyxVQUFXO0FBQ3hCLE9BQUksQ0FBQyxlQUFlLGFBQWEsQ0FDL0IsT0FBTSxJQUFJLFVBQ1IscURBQ0Q7QUFFSCxzQkFBbUIsY0FBYyxpQkFBaUI7QUFDbEQsZ0JBQWEsZ0JBQWdCLGtCQUFrQixLQUFLOztBQUV0RCxtQkFBaUIsa0JBQWtCO0FBQ25DLFNBQU8sVUFBVSxpQkFBaUI7O0NBRXBDLElBQUksYUFBYTtBQUNmLFNBQU8sTUFBS0EsSUFBSzs7Q0FFbkIsSUFBSSxZQUFZO0FBQ2QsU0FBTyxNQUFLQSxJQUFLOztDQUVuQixJQUFJLFlBQVk7QUFDZCxTQUFPLE1BQUtBLElBQUs7O0NBRW5CLFFBQVEsR0FBRyxNQUFNO0VBQ2YsSUFBSSxNQUFNLFNBQVMsRUFBRSxFQUFFO0FBQ3ZCLFVBQVEsS0FBSyxRQUFiO0dBQ0UsS0FBSztBQUNILEtBQUMsTUFBTTtBQUNQO0dBQ0YsS0FBSyxHQUFHO0lBQ04sSUFBSTtBQUNKLEtBQUMsTUFBTSxNQUFNO0FBQ2IsUUFBSSxPQUFPLEtBQUssU0FBUyxTQUFVLFFBQU87UUFDckMsVUFBUztBQUNkOztHQUVGLEtBQUs7QUFDSCxLQUFDLE1BQU0sUUFBUSxNQUFNO0FBQ3JCOztBQUVKLFNBQU8sa0JBQWtCLE1BQUtBLEtBQU0sTUFBTSxRQUFRLEdBQUc7O0NBRXZELEtBQUssR0FBRyxNQUFNO0VBQ1osSUFBSSxNQUFNO0FBQ1YsVUFBUSxLQUFLLFFBQWI7R0FDRSxLQUFLO0FBQ0gsS0FBQyxNQUFNO0FBQ1A7R0FDRixLQUFLO0FBQ0gsS0FBQyxNQUFNLE1BQU07QUFDYjs7QUFFSixTQUFPLGtCQUFrQixNQUFLQSxLQUFNLE1BQU0sRUFBRSxFQUFFLElBQUksVUFBVSxLQUFLOztDQUVuRSxnQkFBZ0IsR0FBRyxNQUFNO0VBQ3ZCLElBQUksTUFBTTtBQUNWLFVBQVEsS0FBSyxRQUFiO0dBQ0UsS0FBSztBQUNILEtBQUMsTUFBTTtBQUNQO0dBQ0YsS0FBSztBQUNILEtBQUMsTUFBTSxNQUFNO0FBQ2I7O0FBRUosU0FBTyxrQkFBa0IsTUFBS0EsS0FBTSxNQUFNLEVBQUUsRUFBRSxJQUFJLFVBQVUsVUFBVTs7Q0FFeEUsbUJBQW1CLEdBQUcsTUFBTTtFQUMxQixJQUFJLE1BQU07QUFDVixVQUFRLEtBQUssUUFBYjtHQUNFLEtBQUs7QUFDSCxLQUFDLE1BQU07QUFDUDtHQUNGLEtBQUs7QUFDSCxLQUFDLE1BQU0sTUFBTTtBQUNiOztBQUVKLFNBQU8sa0JBQWtCLE1BQUtBLEtBQU0sTUFBTSxFQUFFLEVBQUUsSUFBSSxVQUFVLGFBQWE7O0NBRTNFLEtBQUssTUFBTSxLQUFLLElBQUk7QUFDbEIsU0FBTyxlQUFlLE1BQUtBLEtBQU0sTUFBTSxFQUFFLEVBQUUsS0FBSyxHQUFHOztDQTBCckQsY0FBYyxNQUFNLEtBQUssSUFBSTtBQUMzQixTQUFPLG1CQUFtQixNQUFLQSxLQUFNLE1BQU0sRUFBRSxFQUFFLEtBQUssR0FBRzs7Q0FFekQsVUFBVSxHQUFHLE1BQU07RUFDakIsSUFBSSxNQUFNLFNBQVMsRUFBRSxFQUFFLEtBQUs7QUFDNUIsVUFBUSxLQUFLLFFBQWI7R0FDRSxLQUFLO0FBQ0gsS0FBQyxLQUFLLE1BQU07QUFDWjtHQUNGLEtBQUssR0FBRztJQUNOLElBQUk7QUFDSixLQUFDLE1BQU0sS0FBSyxNQUFNO0FBQ2xCLFFBQUksT0FBTyxLQUFLLFNBQVMsU0FBVSxRQUFPO1FBQ3JDLFVBQVM7QUFDZDs7R0FFRixLQUFLO0FBQ0gsS0FBQyxNQUFNLFFBQVEsS0FBSyxNQUFNO0FBQzFCOztBQUVKLFNBQU8sb0JBQW9CLE1BQUtBLEtBQU0sTUFBTSxRQUFRLEtBQUssR0FBRzs7Ozs7O0NBTTlELFlBQVksU0FBUztBQUNuQixTQUFPO0lBQ0osZ0JBQWdCLE1BQUtBO0dBQ3RCLENBQUMsZ0JBQWdCLEtBQUssYUFBYTtBQUNqQyxTQUFLLE1BQU0sQ0FBQyxZQUFZLGlCQUFpQixPQUFPLFFBQVEsUUFBUSxFQUFFO0FBQ2hFLHdCQUFtQixjQUFjLElBQUk7QUFDckMsa0JBQWEsZ0JBQWdCLEtBQUssV0FBVzs7O0dBR2xEOztDQUVILHlCQUF5QixFQUN2QixNQUFNLFlBQVk7R0FDZixnQkFBZ0IsTUFBS0E7RUFDdEIsQ0FBQyxnQkFBZ0IsS0FBSyxhQUFhO0FBQ2pDLE9BQUksVUFBVSxpQkFBaUIsS0FBSyxFQUFFLEtBQUssUUFBUSxDQUFDOztFQUV2RCxHQUNGOztBQUVILElBQUksaUJBQWlCLE9BQU8sNkJBQTZCO0FBQ3pELElBQUksZ0JBQWdCLE9BQU8sNEJBQTRCO0FBQ3ZELFNBQVMsZUFBZSxHQUFHO0FBQ3pCLFNBQVEsT0FBTyxNQUFNLGNBQWMsT0FBTyxNQUFNLGFBQWEsTUFBTSxRQUFRLGtCQUFrQjs7QUFFL0YsU0FBUyxtQkFBbUIsS0FBSyxTQUFTO0FBQ3hDLEtBQUksSUFBSSxrQkFBa0IsUUFBUSxJQUFJLG1CQUFtQixRQUN2RCxPQUFNLElBQUksVUFBVSxxQ0FBcUM7O0FBRzdELFNBQVMsT0FBTyxRQUFRLGdCQUFnQjtBQTRCdEMsUUFBTyxJQUFJLE9BM0JDLElBQUksYUFBYSxTQUFTO0FBQ3BDLE1BQUksZ0JBQWdCLDBCQUEwQixLQUM1QyxNQUFLLHdCQUF3QixlQUFlLHVCQUF1QjtFQUVyRSxNQUFNLGVBQWUsRUFBRTtBQUN2QixPQUFLLE1BQU0sQ0FBQyxTQUFTLFdBQVcsT0FBTyxRQUFRLE9BQU8sRUFBRTtHQUN0RCxNQUFNLFdBQVcsT0FBTyxTQUFTLE1BQU0sUUFBUTtBQUMvQyxnQkFBYSxXQUFXLGNBQWMsU0FBUyxRQUFRLFNBQVM7QUFDaEUsUUFBSyxVQUFVLE9BQU8sS0FBSyxTQUFTO0FBQ3BDLE9BQUksT0FBTyxTQUNULE1BQUssaUJBQWlCLEtBQUs7SUFDekIsR0FBRyxPQUFPO0lBQ1YsV0FBVyxTQUFTO0lBQ3JCLENBQUM7QUFFSixPQUFJLE9BQU8sVUFDVCxNQUFLLFVBQVUsY0FBYyxRQUFRLEtBQUs7SUFDeEMsS0FBSztJQUNMLE9BQU87S0FDTCxZQUFZO0tBQ1osZUFBZSxPQUFPO0tBQ3ZCO0lBQ0YsQ0FBQzs7QUFHTixTQUFPLEVBQUUsUUFBUSxjQUFjO0dBQy9CLENBQ29COztBQUl4QixJQUFJLHdCQUF3QixRQUFRLHdCQUF3QixDQUFDO0FBQzdELElBQUksVUFBVSxHQUFHLFNBQVMsS0FBSyxLQUFLLE1BQU0sT0FBTyxNQUFNLFdBQVcsS0FBSyxHQUFHLHNCQUFzQixTQUFTLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSTtBQUN0SCxJQUFJLHNCQUFzQjtBQUMxQixJQUFJLHFCQUFxQjtBQUN6QixJQUFJLHFCQUFxQjtBQUN6QixJQUFJLHNCQUFzQjtBQUMxQixJQUFJLHNCQUFzQjtBQUMxQixJQUFJLDJCQUEyQixJQUFJLEtBQUs7QUFDeEMsSUFBSSxXQUFXO0NBRWIsV0FBVyxFQUFFO0VBQ1osT0FBTyxjQUFjO0NBQ3RCLFNBQVMsWUFBWSxPQUFPLEdBQUcsU0FBUztBQUN0QyxNQUFJLENBQUMsVUFDSCxLQUFJLFlBQVkscUJBQXFCLE9BQU8sR0FBRyxLQUFLLENBQUM7O0NBR3pELGFBQWE7Q0FFYixRQUFRLEdBQUcsU0FBUztBQUNsQixNQUFJLFlBQVkscUJBQXFCLE9BQU8sR0FBRyxLQUFLLENBQUM7O0NBRXZELFFBQVEsR0FBRyxTQUFTO0FBQ2xCLE1BQUksWUFBWSxxQkFBcUIsT0FBTyxHQUFHLEtBQUssQ0FBQzs7Q0FFdkQsT0FBTyxHQUFHLFNBQVM7QUFDakIsTUFBSSxZQUFZLG9CQUFvQixPQUFPLEdBQUcsS0FBSyxDQUFDOztDQUV0RCxNQUFNLEdBQUcsU0FBUztBQUNoQixNQUFJLFlBQVksb0JBQW9CLE9BQU8sR0FBRyxLQUFLLENBQUM7O0NBRXRELFFBQVEsYUFBYSxnQkFBZ0I7QUFDbkMsTUFBSSxZQUFZLG9CQUFvQixPQUFPLFlBQVksQ0FBQzs7Q0FFMUQsUUFBUSxHQUFHLFNBQVM7QUFDbEIsTUFBSSxZQUFZLHFCQUFxQixPQUFPLEdBQUcsS0FBSyxDQUFDOztDQUV2RCxPQUFPLEdBQUcsU0FBUztBQUNqQixNQUFJLFlBQVksb0JBQW9CLE9BQU8sR0FBRyxLQUFLLENBQUM7O0NBRXRELE1BQU0sT0FBTyxhQUFhO0NBRTFCLFNBQVMsR0FBRyxVQUFVO0NBR3RCLFFBQVEsU0FBUyxjQUFjO0NBRS9CLGFBQWEsU0FBUyxjQUFjO0NBR3BDLFFBQVEsR0FBRyxVQUFVO0NBRXJCLGlCQUFpQixHQUFHLFVBQVU7Q0FFOUIsZ0JBQWdCO0NBR2hCLE9BQU8sUUFBUSxjQUFjO0FBQzNCLE1BQUksU0FBUyxJQUFJLE1BQU0sRUFBRTtBQUN2QixPQUFJLFlBQVksb0JBQW9CLFVBQVUsTUFBTSxtQkFBbUI7QUFDdkU7O0FBRUYsV0FBUyxJQUFJLE9BQU8sSUFBSSxvQkFBb0IsTUFBTSxDQUFDOztDQUVyRCxVQUFVLFFBQVEsV0FBVyxHQUFHLFNBQVM7QUFDdkMsTUFBSSxZQUFZLG9CQUFvQixPQUFPLE9BQU8sR0FBRyxLQUFLLENBQUM7O0NBRTdELFVBQVUsUUFBUSxjQUFjO0VBQzlCLE1BQU0sU0FBUyxTQUFTLElBQUksTUFBTTtBQUNsQyxNQUFJLFdBQVcsS0FBSyxHQUFHO0FBQ3JCLE9BQUksWUFBWSxvQkFBb0IsVUFBVSxNQUFNLG1CQUFtQjtBQUN2RTs7QUFFRixNQUFJLGtCQUFrQixPQUFPO0FBQzdCLFdBQVMsT0FBTyxNQUFNOztDQUd4QixpQkFBaUI7Q0FFakIsZUFBZTtDQUVmLGtCQUFrQjtDQUVuQjtBQUdELFdBQVcsVUFBVTs7OztBQzc3T3JCLE1BQWEsY0FBYyxNQUN6QixFQUFFLE1BQU0sZ0JBQWdCLEVBQ3hCO0NBQ0UsSUFBSSxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUztDQUNsQyxPQUFPLEVBQUUsUUFBUSxDQUFDLFFBQVE7Q0FDMUIsVUFBVSxFQUFFLFFBQVE7Q0FDcEIsU0FBUyxFQUFFLFFBQVE7Q0FDbkIsY0FBYyxFQUFFLFFBQVE7Q0FDeEIsaUJBQWlCLEVBQUUsV0FBVyxDQUFDLFVBQVU7Q0FDekMsV0FBVyxFQUFFLFdBQVc7Q0FDeEIsV0FBVyxFQUFFLFdBQVc7Q0FDekIsQ0FDRjtBQUVELE1BQWEsVUFBVSxNQUNyQixFQUFFLE1BQU0sV0FBVyxFQUNuQjtDQUNFLElBQUksRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVM7Q0FDbEMsUUFBUSxFQUFFLEtBQUssQ0FBQyxNQUFNLFFBQVE7Q0FDOUIsV0FBVyxFQUFFLFFBQVEsQ0FBQyxRQUFRO0NBQzlCLFdBQVcsRUFBRSxXQUFXO0NBQ3hCLFdBQVcsRUFBRSxXQUFXLENBQUMsVUFBVTtDQUNuQyxXQUFXLEVBQUUsV0FBVztDQUN6QixDQUNGO0FBRUQsTUFBYSx5QkFBeUIsTUFDcEMsRUFBRSxNQUFNLDRCQUE0QixFQUNwQztDQUNFLElBQUksRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVM7Q0FDbEMsUUFBUSxFQUFFLEtBQUssQ0FBQyxNQUFNLFFBQVE7Q0FDOUIsT0FBTyxFQUFFLFFBQVE7Q0FDakIsV0FBVyxFQUFFLFFBQVEsQ0FBQyxRQUFRO0NBQzlCLFdBQVcsRUFBRSxXQUFXO0NBQ3hCLFlBQVksRUFBRSxXQUFXLENBQUMsVUFBVTtDQUNwQyxXQUFXLEVBQUUsV0FBVztDQUN6QixDQUNGO0FBRUQsTUFBYSxpQkFBaUIsTUFDNUI7Q0FDRSxNQUFNO0NBQ04sU0FBUyxDQUNQO0VBQ0UsTUFBTTtFQUNOLFVBQVU7RUFDVixXQUFXO0VBQ1gsU0FBUyxDQUFDLFNBQVM7RUFDcEIsQ0FDRjtDQUNGLEVBQ0Q7Q0FDRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTO0NBQ2xDLFFBQVEsRUFBRSxLQUFLLENBQUMsVUFBVTtDQUMxQixXQUFXLEVBQUUsUUFBUTtDQUNyQixrQkFBa0IsRUFBRSxRQUFRO0NBQzVCLFdBQVcsRUFBRSxXQUFXO0NBQ3pCLENBQ0Y7Ozs7QUMxREQsTUFBYSxXQUFXLE1BQ3RCO0NBQ0UsTUFBTTtDQUNOLFNBQVMsQ0FDUDtFQUNFLE1BQU07RUFDTixVQUFVO0VBQ1YsV0FBVztFQUNYLFNBQVMsQ0FBQyxTQUFTO0VBQ3BCLEVBQ0Q7RUFDRSxNQUFNO0VBQ04sVUFBVTtFQUNWLFdBQVc7RUFDWCxTQUFTLENBQUMsZ0JBQWdCO0VBQzNCLENBQ0Y7Q0FDRixFQUNEO0NBQ0UsSUFBSSxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUztDQUNsQyxRQUFRLEVBQUUsS0FBSztDQUNmLGVBQWUsRUFBRSxRQUFRO0NBQ3pCLEtBQUssRUFBRSxLQUFLO0NBQ1osS0FBSyxFQUFFLEtBQUs7Q0FDWixlQUFlLEVBQUUsUUFBUSxDQUFDLFVBQVU7Q0FDcEMsT0FBTyxFQUFFLEtBQUs7Q0FDZCxTQUFTLEVBQUUsUUFBUSxDQUFDLFVBQVU7Q0FDOUIsZ0JBQWdCLEVBQUUsUUFBUTtDQUMxQixlQUFlLEVBQUUsUUFBUSxDQUFDLFVBQVU7Q0FDcEMsY0FBYyxFQUFFLEtBQUssQ0FBQyxVQUFVO0NBQ2hDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxVQUFVO0NBQ3JDLE9BQU8sRUFBRSxRQUFRLENBQUMsVUFBVTtDQUM1QixXQUFXLEVBQUUsV0FBVztDQUN6QixDQUNGOzs7O0FDbENELE1BQWEsT0FBTyxNQUNsQixFQUFFLE1BQU0sUUFBUSxFQUNoQjtDQUNFLElBQUksRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVM7Q0FDbEMsUUFBUSxFQUFFLEtBQUssQ0FBQyxNQUFNLFFBQVE7Q0FDOUIsT0FBTyxFQUFFLFFBQVE7Q0FDakIsYUFBYSxFQUFFLFFBQVE7Q0FDdkIsZUFBZSxFQUFFLFFBQVEsQ0FBQyxVQUFVO0NBQ3BDLFlBQVksRUFBRSxRQUFRO0NBQ3RCLFdBQVcsRUFBRSxXQUFXO0NBQ3hCLFNBQVMsRUFBRSxXQUFXO0NBQ3RCLFdBQVcsRUFBRSxXQUFXO0NBQ3hCLFdBQVcsRUFBRSxXQUFXO0NBQ3pCLENBQ0Y7Ozs7QUNORCxNQUFNLGNBQWMsT0FBTztDQUN6QixhQUFhO0NBQ2IsU0FBUztDQUNULHdCQUF3QjtDQUN4QixNQUFNO0NBQ04sVUFBVTtDQUNWLGdCQUFnQjtDQUNqQixDQUFDOzs7O0FDZkYsTUFBYSxPQUFPLFlBQVksU0FBUyxRQUFRLEdBRS9DOzs7O0FDRkYsTUFBYSxrQkFBa0IsVUFBa0IsTUFBTSxNQUFNLENBQUMsYUFBYTtBQUUzRSxNQUFhLGFBQWEsT0FBa0IsUUFDMUMsTUFBTSx3QkFBd0IsSUFBSTtBQUVwQyxNQUFhLHVCQUF1QixNQUFlLFVBQW1CO0FBQ3BFLEtBQUksUUFBUSxNQUFPLFFBQU8sS0FBSyxjQUFjLE1BQU07QUFDbkQsS0FBSSxLQUFNLFFBQU87QUFDakIsS0FBSSxNQUFPLFFBQU87QUFDbEIsUUFBTzs7QUFHVCxNQUFhLGFBQWlELFVBQzVELE1BQU0sTUFBTSxNQUFNLFVBQVU7Q0FDMUIsTUFBTSxPQUNKLE1BQU0sVUFBVSx1QkFDaEIsS0FBSyxVQUFVO0FBQ2pCLEtBQUksT0FBTyxHQUFJLFFBQU87QUFDdEIsS0FBSSxPQUFPLEdBQUksUUFBTztBQUN0QixRQUFPO0VBQ1A7QUFFSixNQUFhLGlCQUdYLGNBRUEsVUFBVSxNQUFNLE1BQU0sVUFBVTtDQUM5QixNQUFNLGlCQUFpQixvQkFDckIsS0FBSyxlQUNMLE1BQU0sY0FDUDtBQUNELEtBQUksbUJBQW1CLEVBQUcsUUFBTztBQUNqQyxLQUFJLEtBQUssVUFBVSxNQUFNLE1BQU8sUUFBTyxLQUFLLFFBQVEsTUFBTTtBQUMxRCxRQUFPLEtBQUssY0FBYyxjQUFjLE1BQU0sY0FBYztFQUM1RDs7OztBQ2pDSixNQUFhLHNCQUFzQixZQUFZLFFBQzdDO0NBQ0UsT0FBTyxFQUFFLFFBQVE7Q0FDakIsVUFBVSxFQUFFLFFBQVE7Q0FDcEIsU0FBUyxFQUFFLFFBQVE7Q0FDbkIsY0FBYyxFQUFFLFFBQVE7Q0FDeEIsdUJBQXVCLEVBQUUsUUFBUTtDQUNqQyx1QkFBdUIsRUFBRSxXQUFXO0NBQ3JDLEdBRUMsS0FDQSxFQUNFLE9BQ0EsVUFDQSxTQUNBLGNBQ0EsdUJBQ0EsNEJBRUM7Q0FDSCxNQUFNLGtCQUFrQixlQUFlLE1BQU07Q0FDN0MsTUFBTSxjQUFjLFNBQVMsTUFBTTtDQUNuQyxNQUFNLGlCQUFpQixRQUFRLE1BQU07QUFFckMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxhQUMxRCxPQUFNLElBQUksTUFBTSwrQkFBK0I7QUFHakQsS0FBSSxJQUFJLEdBQUcsWUFBWSxNQUFNLEtBQUssZ0JBQWdCLENBQ2hELE9BQU0sSUFBSSxNQUFNLHdDQUF3QztDQUcxRCxNQUFNLE9BQU8sSUFBSSxHQUFHLFlBQVksT0FBTztFQUNyQyxJQUFJO0VBQ0osT0FBTztFQUNQLFVBQVU7RUFDVixTQUFTO0VBQ1Q7RUFDQSxpQkFBaUI7RUFDakIsV0FBVyxJQUFJO0VBQ2YsV0FBVyxJQUFJO0VBQ2hCLENBQUM7QUFFRixLQUFJLEdBQUcsdUJBQXVCLE9BQU87RUFDbkMsSUFBSTtFQUNKLFFBQVEsS0FBSztFQUNiLE9BQU87RUFDUCxXQUFXO0VBQ1gsV0FBVztFQUNYLFlBQVk7RUFDWixXQUFXLElBQUk7RUFDaEIsQ0FBQztBQUVGLEtBQUksR0FBRyxlQUFlLE9BQU87RUFDM0IsSUFBSTtFQUNKLFFBQVEsS0FBSztFQUNiLFdBQVc7RUFDWCxrQkFBa0IsS0FBSyxVQUFVLEVBQUUsT0FBTyxpQkFBaUIsQ0FBQztFQUM1RCxXQUFXLElBQUk7RUFDaEIsQ0FBQztFQUVMO0FBRUQsTUFBYSxpQkFBaUIsWUFBWSxRQUN4QztDQUNFLFFBQVEsRUFBRSxLQUFLO0NBQ2YsV0FBVyxFQUFFLFFBQVE7Q0FDckIsV0FBVyxFQUFFLFdBQVc7Q0FDekIsR0FDQSxLQUFLLEVBQUUsUUFBUSxXQUFXLGdCQUFnQjtBQUd6QyxLQUFJLENBRlMsSUFBSSxHQUFHLFlBQVksR0FBRyxLQUFLLE9BQU8sQ0FHN0MsT0FBTSxJQUFJLE1BQU0saUJBQWlCO0FBR25DLEtBQUksSUFBSSxHQUFHLFFBQVEsVUFBVSxLQUFLLFVBQVUsQ0FDMUMsT0FBTSxJQUFJLE1BQU0sK0JBQStCO0FBR2pELEtBQUksR0FBRyxRQUFRLE9BQU87RUFDcEIsSUFBSTtFQUNKO0VBQ0E7RUFDQTtFQUNBLFdBQVc7RUFDWCxXQUFXLElBQUk7RUFDaEIsQ0FBQztBQUVGLEtBQUksR0FBRyxlQUFlLE9BQU87RUFDM0IsSUFBSTtFQUNKO0VBQ0EsV0FBVztFQUNYLGtCQUFrQixLQUFLLFVBQVUsRUFBRSxDQUFDO0VBQ3BDLFdBQVcsSUFBSTtFQUNoQixDQUFDO0VBRUw7QUFFRCxNQUFhLCtCQUErQixZQUFZLFFBQ3RELEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxHQUN4QixLQUFLLEVBQUUsZ0JBQWdCO0NBQ3RCLE1BQU0sVUFBVSxJQUFJLEdBQUcsUUFBUSxVQUFVLEtBQUssVUFBVTtBQUV4RCxLQUFJLENBQUMsV0FBVyxRQUFRLFVBQ3RCO0FBR0YsS0FBSSxHQUFHLFFBQVEsR0FBRyxPQUFPO0VBQ3ZCLEdBQUc7RUFDSCxXQUFXLElBQUk7RUFDaEIsQ0FBQztBQUVGLEtBQUksR0FBRyxlQUFlLE9BQU87RUFDM0IsSUFBSTtFQUNKLFFBQVEsUUFBUTtFQUNoQixXQUFXO0VBQ1gsa0JBQWtCLEtBQUssVUFBVSxFQUFFLENBQUM7RUFDcEMsV0FBVyxJQUFJO0VBQ2hCLENBQUM7RUFFTDs7OztBQzNIRCxNQUFhLG9CQUFvQixVQVMxQjtDQUNMLElBQUksS0FBSztDQUNULE9BQU8sS0FBSztDQUNaLFVBQVUsS0FBSztDQUNmLFNBQVMsS0FBSztDQUNkLGNBQWMsS0FBSztDQUNuQixpQkFBaUIsS0FBSztDQUN0QixXQUFXLEtBQUs7Q0FDaEIsV0FBVyxLQUFLO0NBQ2pCO0FBRUQsTUFBYSx1QkFBdUIsVUFRN0I7Q0FDTCxJQUFJLEtBQUs7Q0FDVCxPQUFPLEtBQUs7Q0FDWixVQUFVLEtBQUs7Q0FDZixTQUFTLEtBQUs7Q0FDZCxpQkFBaUIsS0FBSztDQUN0QixXQUFXLEtBQUs7Q0FDaEIsV0FBVyxLQUFLO0NBQ2pCO0FBRUQsTUFBYSxnQkFBZ0IsVUFXdEI7Q0FDTCxJQUFJLEtBQUs7Q0FDVCxRQUFRLEtBQUs7Q0FDYixPQUFPLEtBQUs7Q0FDWixhQUFhLEtBQUs7Q0FDbEIsZUFBZSxLQUFLO0NBQ3BCLFlBQVksS0FBSztDQUNqQixXQUFXLEtBQUs7Q0FDaEIsU0FBUyxLQUFLO0NBQ2QsV0FBVyxLQUFLO0NBQ2hCLFdBQVcsS0FBSztDQUNqQjtBQUVELE1BQWEsb0JBQW9CLGNBZTFCO0NBQ0wsSUFBSSxTQUFTO0NBQ2IsUUFBUSxTQUFTO0NBQ2pCLGVBQWUsU0FBUztDQUN4QixLQUFLLFNBQVM7Q0FDZCxLQUFLLFNBQVM7Q0FDZCxlQUFlLFNBQVM7Q0FDeEIsT0FBTyxTQUFTO0NBQ2hCLFNBQVMsU0FBUztDQUNsQixnQkFBZ0IsU0FBUztDQUN6QixlQUFlLFNBQVM7Q0FDeEIsY0FBYyxTQUFTO0NBQ3ZCLGdCQUFnQixTQUFTO0NBQ3pCLE9BQU8sU0FBUztDQUNoQixXQUFXLFNBQVM7Q0FDckI7Ozs7QUM1RkQsTUFBYSxpQkFBaUIsRUFBRSxPQUFPLGtCQUFrQjtDQUN2RCxJQUFJLEVBQUUsS0FBSztDQUNYLE9BQU8sRUFBRSxRQUFRO0NBQ2pCLFVBQVUsRUFBRSxRQUFRO0NBQ3BCLFNBQVMsRUFBRSxRQUFRO0NBQ25CLGNBQWMsRUFBRSxRQUFRO0NBQ3hCLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxVQUFVO0NBQ3pDLFdBQVcsRUFBRSxXQUFXO0NBQ3hCLFdBQVcsRUFBRSxXQUFXO0NBQ3pCLENBQUM7QUFFRixNQUFhLG9CQUFvQixFQUFFLE9BQU8scUJBQXFCO0NBQzdELElBQUksRUFBRSxLQUFLO0NBQ1gsT0FBTyxFQUFFLFFBQVE7Q0FDakIsVUFBVSxFQUFFLFFBQVE7Q0FDcEIsU0FBUyxFQUFFLFFBQVE7Q0FDbkIsaUJBQWlCLEVBQUUsV0FBVyxDQUFDLFVBQVU7Q0FDekMsV0FBVyxFQUFFLFdBQVc7Q0FDeEIsV0FBVyxFQUFFLFdBQVc7Q0FDekIsQ0FBQztBQUVGLE1BQWEsb0JBQW9CLEVBQUUsT0FBTyxxQkFBcUI7Q0FDN0QsSUFBSSxFQUFFLE1BQU07Q0FDWixRQUFRLEVBQUUsUUFBUSxDQUFDLFVBQVU7Q0FDN0IsUUFBUSxFQUFFLEtBQUssQ0FBQyxVQUFVO0NBQzFCLE9BQU8sRUFBRSxRQUFRLENBQUMsVUFBVTtDQUM3QixDQUFDO0FBRUYsTUFBYSxhQUFhLEVBQUUsT0FBTyxjQUFjO0NBQy9DLElBQUksRUFBRSxLQUFLO0NBQ1gsUUFBUSxFQUFFLEtBQUs7Q0FDZixPQUFPLEVBQUUsUUFBUTtDQUNqQixhQUFhLEVBQUUsUUFBUTtDQUN2QixlQUFlLEVBQUUsUUFBUSxDQUFDLFVBQVU7Q0FDcEMsWUFBWSxFQUFFLFFBQVE7Q0FDdEIsV0FBVyxFQUFFLFdBQVc7Q0FDeEIsU0FBUyxFQUFFLFdBQVc7Q0FDdEIsV0FBVyxFQUFFLFdBQVc7Q0FDeEIsV0FBVyxFQUFFLFdBQVc7Q0FDekIsQ0FBQztBQUVGLE1BQWEsaUJBQWlCLEVBQUUsT0FBTyxrQkFBa0I7Q0FDdkQsSUFBSSxFQUFFLEtBQUs7Q0FDWCxRQUFRLEVBQUUsS0FBSztDQUNmLGVBQWUsRUFBRSxRQUFRO0NBQ3pCLEtBQUssRUFBRSxLQUFLO0NBQ1osS0FBSyxFQUFFLEtBQUs7Q0FDWixlQUFlLEVBQUUsUUFBUSxDQUFDLFVBQVU7Q0FDcEMsT0FBTyxFQUFFLEtBQUs7Q0FDZCxTQUFTLEVBQUUsUUFBUSxDQUFDLFVBQVU7Q0FDOUIsZ0JBQWdCLEVBQUUsUUFBUTtDQUMxQixlQUFlLEVBQUUsUUFBUSxDQUFDLFVBQVU7Q0FDcEMsY0FBYyxFQUFFLEtBQUssQ0FBQyxVQUFVO0NBQ2hDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxVQUFVO0NBQ3JDLE9BQU8sRUFBRSxRQUFRLENBQUMsVUFBVTtDQUM1QixXQUFXLEVBQUUsV0FBVztDQUN6QixDQUFDO0FBRUYsTUFBYSwwQkFBMEIsRUFBRSxPQUFPLDJCQUEyQjtDQUN6RSxNQUFNO0NBQ04sV0FBVyxFQUFFLE1BQU0sZUFBZTtDQUNuQyxDQUFDO0FBRUYsTUFBYSxzQkFBc0IsRUFBRSxPQUFPLHVCQUF1QjtDQUNqRSxXQUFXLEVBQUUsUUFBUTtDQUNyQixlQUFlLEVBQUUsUUFBUTtDQUN6QixLQUFLLEVBQUUsS0FBSztDQUNaLEtBQUssRUFBRSxLQUFLO0NBQ2IsQ0FBQztBQUVGLE1BQWEseUJBQXlCLEVBQUUsT0FBTywwQkFBMEI7Q0FDdkUsSUFBSSxFQUFFLEtBQUssQ0FBQyxVQUFVO0NBQ3RCLGVBQWUsRUFBRSxRQUFRO0NBQ3pCLEtBQUssRUFBRSxLQUFLO0NBQ1osS0FBSyxFQUFFLEtBQUs7Q0FDWixlQUFlLEVBQUUsUUFBUTtDQUN6QixPQUFPLEVBQUUsS0FBSztDQUNkLFNBQVMsRUFBRSxRQUFRLENBQUMsVUFBVTtDQUM5QixnQkFBZ0IsRUFBRSxRQUFRO0NBQzFCLGVBQWUsRUFBRSxRQUFRLENBQUMsVUFBVTtDQUNwQyxjQUFjLEVBQUUsS0FBSyxDQUFDLFVBQVU7Q0FDaEMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLFVBQVU7Q0FDckMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxVQUFVO0NBQzdCLENBQUM7Ozs7QUN4RUYsTUFBYSx5QkFBeUIsWUFBWSxVQUNoRCxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFDckIsRUFBRSxPQUFPLGVBQWUsR0FDdkIsS0FBSyxFQUFFLFlBQVk7QUFDbEIsUUFBTyxJQUFJLFFBQVEsT0FBTztFQUN4QixNQUFNLE9BQU8sR0FBRyxHQUFHLFlBQVksTUFBTSxLQUFLLGVBQWUsTUFBTSxDQUFDO0FBQ2hFLFNBQU8sT0FBTyxpQkFBaUIsS0FBSyxHQUFHO0dBQ3ZDO0VBRUw7QUFFRCxNQUFhLGlDQUFpQyxZQUFZLFVBQ3hELEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxFQUN6QixFQUFFLE9BQU8sa0JBQWtCLEdBQzFCLEtBQUssRUFBRSxnQkFBZ0I7QUFDdEIsUUFBTyxJQUFJLFFBQVEsT0FBTztFQUN4QixNQUFNLFVBQVUsR0FBRyxHQUFHLFFBQVEsVUFBVSxLQUFLLFVBQVU7QUFFdkQsTUFDRSxDQUFDLFdBQ0QsUUFBUSxhQUNSLFVBQVUsUUFBUSxXQUFXLEdBQUcsVUFBVSxDQUUxQztFQUdGLE1BQU0sT0FBTyxHQUFHLEdBQUcsWUFBWSxHQUFHLEtBQUssUUFBUSxPQUFPO0FBQ3RELFNBQU8sT0FBTyxvQkFBb0IsS0FBSyxHQUFHO0dBQzFDO0VBRUw7QUFFRCxNQUFhLHFCQUFxQixZQUFZLFVBQzVDLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxFQUN6QixvQkFDQyxLQUFLLEVBQUUsZ0JBQWdCO0FBQ3RCLFFBQU8sSUFBSSxRQUFRLE9BQU87RUFDeEIsTUFBTSxRQUFRLEdBQUcsR0FBRyx1QkFBdUIsVUFBVSxLQUFLLFVBQVU7QUFFcEUsTUFBSSxDQUFDLE1BQ0gsUUFBTztHQUNMLElBQUk7R0FDSixRQUFRO0dBQ1IsUUFBUTtHQUNSLE9BQU87R0FDUjtBQUdILE1BQUksTUFBTSxXQUNSLFFBQU87R0FDTCxJQUFJO0dBQ0osUUFBUTtHQUNSLFFBQVE7R0FDUixPQUFPO0dBQ1I7QUFHSCxNQUFJLFVBQVUsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUMxQyxRQUFPO0dBQ0wsSUFBSTtHQUNKLFFBQVE7R0FDUixRQUFRO0dBQ1IsT0FBTztHQUNSO0VBR0gsTUFBTSxPQUFPLEdBQUcsR0FBRyxZQUFZLEdBQUcsS0FBSyxNQUFNLE9BQU87QUFDcEQsTUFBSSxDQUFDLEtBQ0gsUUFBTztHQUNMLElBQUk7R0FDSixRQUFRO0dBQ1IsUUFBUTtHQUNSLE9BQU87R0FDUjtBQUdILEtBQUcsR0FBRyxZQUFZLEdBQUcsT0FBTztHQUMxQixHQUFHO0dBQ0gsaUJBQWlCLEtBQUssbUJBQW1CLEdBQUc7R0FDNUMsV0FBVyxHQUFHO0dBQ2YsQ0FBQztBQUVGLEtBQUcsR0FBRyx1QkFBdUIsR0FBRyxPQUFPO0dBQ3JDLEdBQUc7R0FDSCxZQUFZLEdBQUc7R0FDaEIsQ0FBQztBQUVGLEtBQUcsR0FBRyxlQUFlLE9BQU87R0FDMUIsSUFBSTtHQUNKLFFBQVEsS0FBSztHQUNiLFdBQVc7R0FDWCxrQkFBa0IsS0FBSyxVQUFVLEVBQUUsT0FBTyxLQUFLLE9BQU8sQ0FBQztHQUN2RCxXQUFXLEdBQUc7R0FDZixDQUFDO0FBRUYsU0FBTztHQUNMLElBQUk7R0FDSixRQUFRO0dBQ1IsUUFBUSxLQUFLO0dBQ2IsT0FBTyxLQUFLO0dBQ2I7R0FDRDtFQUVMOzs7O0FDakhELE1BQWEsY0FBYyxZQUFZLFFBQ3JDO0NBQ0UsUUFBUSxFQUFFLEtBQUs7Q0FDZixPQUFPLEVBQUUsUUFBUTtDQUNqQixhQUFhLEVBQUUsUUFBUTtDQUN2QixlQUFlLEVBQUUsUUFBUSxDQUFDLFVBQVU7Q0FDcEMsV0FBVyxFQUFFLFdBQVc7Q0FDeEIsU0FBUyxFQUFFLFdBQVc7Q0FDdkIsR0FDQSxLQUFLLEVBQUUsUUFBUSxPQUFPLGFBQWEsZUFBZSxXQUFXLGNBQWM7Q0FDMUUsTUFBTSxlQUFlLE1BQU0sTUFBTTtDQUNqQyxNQUFNLHFCQUFxQixZQUFZLE1BQU07QUFFN0MsS0FBSSxDQUFDLElBQUksR0FBRyxZQUFZLEdBQUcsS0FBSyxPQUFPLENBQ3JDLE9BQU0sSUFBSSxNQUFNLGlCQUFpQjtBQUduQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQ3BCLE9BQU0sSUFBSSxNQUFNLCtCQUErQjtBQUdqRCxLQUFJLFVBQVUsd0JBQXdCLFFBQVEscUJBQzVDLE9BQU0sSUFBSSxNQUFNLHFDQUFxQztBQUd2RCxLQUFJLEdBQUcsS0FBSyxPQUFPO0VBQ2pCLElBQUk7RUFDSjtFQUNBLE9BQU87RUFDUCxhQUFhO0VBQ2IsZUFBZSxlQUFlLE1BQU0sSUFBSTtFQUN4QyxZQUFZO0VBQ1o7RUFDQTtFQUNBLFdBQVcsSUFBSTtFQUNmLFdBQVcsSUFBSTtFQUNoQixDQUFDO0VBRUw7Ozs7QUNuQ0QsTUFBYSxxQkFBcUIsWUFBWSxVQUM1QyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFDbkIsRUFBRSxNQUFNLFdBQVcsR0FDbEIsS0FBSyxFQUFFLGFBQWE7QUFDbkIsUUFBTyxJQUFJLFFBQVEsT0FBTztBQUV4QixTQUFPLFVBRE8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLE9BQU8sT0FBTyxPQUFPLENBQUMsQ0FDNUIsQ0FBQyxJQUFJLGFBQWE7R0FDekM7RUFFTDs7OztBQ1BELE1BQWEsb0JBQ1gsSUFDQSxRQUNBLFdBQ0c7Q0FDSCxNQUFNLE9BQU8sR0FBRyxLQUFLLEdBQUcsS0FBSyxPQUFPO0FBRXBDLEtBQUksQ0FBQyxRQUFRLEtBQUssV0FBVyxPQUMzQixPQUFNLElBQUksTUFBTSxpQkFBaUI7QUFHbkMsUUFBTzs7Ozs7QUNTVCxNQUFhLGtCQUNYLEtBQ0EsUUFDQSxhQWFHO0FBQ0gsS0FBSSxHQUFHLFNBQVMsT0FBTztFQUNyQixJQUFJO0VBQ0o7RUFDQSxlQUFlLFNBQVM7RUFDeEIsS0FBSyxTQUFTO0VBQ2QsS0FBSyxTQUFTO0VBQ2QsZUFBZSxTQUFTO0VBQ3hCLE9BQU8sU0FBUztFQUNoQixTQUFTLFNBQVM7RUFDbEIsZ0JBQWdCLFNBQVMsa0JBQWtCO0VBQzNDLGVBQWUsU0FBUztFQUN4QixjQUFjLFNBQVM7RUFDdkIsZ0JBQWdCLFNBQVM7RUFDekIsT0FBTyxTQUFTO0VBQ2hCLFdBQVcsSUFBSTtFQUNoQixDQUFDOzs7OztBQ3RESixNQUFhLGVBQWUsWUFBWSxRQUN0QztDQUNFLFFBQVEsRUFBRSxLQUFLO0NBQ2YsUUFBUSxFQUFFLEtBQUs7Q0FDZixlQUFlLEVBQUUsUUFBUTtDQUN6QixLQUFLLEVBQUUsS0FBSztDQUNaLEtBQUssRUFBRSxLQUFLO0NBQ2IsR0FDQSxLQUFLLEVBQUUsUUFBUSxRQUFRLGVBQWUsS0FBSyxVQUFVO0FBQ3BELGtCQUFpQixJQUFJLElBQUksUUFBUSxPQUFPO0FBR3hDLGdCQUFlLEtBQUssUUFBUTtFQUMxQjtFQUNBO0VBQ0E7RUFDQSxPQUx3QixDQUFDLEdBQUcsSUFBSSxHQUFHLFNBQVMsaUJBQWlCLE9BQU8sT0FBTyxDQUFDLENBS25EO0VBQzFCLENBQUM7RUFFTDtBQUVELE1BQWEsbUJBQW1CLFlBQVksUUFDMUM7Q0FDRSxRQUFRLEVBQUUsS0FBSztDQUNmLFFBQVEsRUFBRSxLQUFLO0NBQ2YsV0FBVyxFQUFFLE1BQU0sdUJBQXVCO0NBQzNDLEdBQ0EsS0FBSyxFQUFFLFFBQVEsUUFBUSxnQkFBZ0I7QUFDdEMsa0JBQWlCLElBQUksSUFBSSxRQUFRLE9BQU87QUFFeEMsS0FBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLFNBQVMsaUJBQWlCLE9BQU8sT0FBTyxDQUFDLENBQUMsU0FBUyxFQUNoRSxPQUFNLElBQUksTUFBTSx3REFBd0Q7QUFHMUUsTUFBSyxNQUFNLFlBQVksVUFDckIsZ0JBQWUsS0FBSyxRQUFRLFNBQVM7RUFHMUM7QUFFRCxNQUFhLGlCQUFpQixZQUFZLFFBQ3hDO0NBQ0UsUUFBUSxFQUFFLEtBQUs7Q0FDZixRQUFRLEVBQUUsS0FBSztDQUNmLFdBQVcsRUFBRSxNQUFNLHVCQUF1QjtDQUMxQyxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDO0NBQ3JDLEdBQ0EsS0FBSyxFQUFFLFFBQVEsUUFBUSxXQUFXLHlCQUF5QjtBQUMxRCxrQkFBaUIsSUFBSSxJQUFJLFFBQVEsT0FBTztDQUV4QyxNQUFNLG9CQUFvQixJQUFJLElBQzVCLENBQUMsR0FBRyxJQUFJLEdBQUcsU0FBUyxpQkFBaUIsT0FBTyxPQUFPLENBQUMsQ0FBQyxLQUFLLGFBQWEsQ0FDckUsU0FBUyxJQUNULFNBQ0QsQ0FBQyxDQUNIO0FBRUQsTUFBSyxNQUFNLGNBQWMsb0JBQW9CO0FBRTNDLE1BQUksQ0FEcUIsa0JBQWtCLElBQUksV0FBVyxDQUV4RCxPQUFNLElBQUksTUFBTSw2QkFBNkI7QUFHL0MsTUFBSSxHQUFHLFNBQVMsR0FBRyxPQUFPLFdBQVc7QUFDckMsb0JBQWtCLE9BQU8sV0FBVzs7QUFHdEMsTUFBSyxNQUFNLFlBQVksV0FBVztBQUNoQyxNQUFJLENBQUMsU0FBUyxJQUFJO0FBQ2hCLGtCQUFlLEtBQUssUUFBUSxTQUFTO0FBQ3JDOztFQUdGLE1BQU0sbUJBQW1CLGtCQUFrQixJQUFJLFNBQVMsR0FBRztBQUMzRCxNQUFJLENBQUMsaUJBQ0gsT0FBTSxJQUFJLE1BQU0sNkJBQTZCO0FBRy9DLE1BQUksR0FBRyxTQUFTLEdBQUcsT0FBTztHQUN4QixHQUFHO0dBQ0gsZUFBZSxTQUFTO0dBQ3hCLEtBQUssU0FBUztHQUNkLEtBQUssU0FBUztHQUNkLGVBQWUsU0FBUztHQUN4QixPQUFPLFNBQVM7R0FDaEIsU0FBUyxTQUFTO0dBQ2xCLGdCQUFnQixTQUFTO0dBQ3pCLGVBQWUsU0FBUztHQUN4QixjQUFjLFNBQVM7R0FDdkIsZ0JBQWdCLFNBQVM7R0FDekIsT0FBTyxTQUFTO0dBQ2pCLENBQUM7O0VBR1A7QUFFRCxNQUFhLHdCQUF3QixZQUFZLFFBQy9DO0NBQ0UsUUFBUSxFQUFFLEtBQUs7Q0FDZixRQUFRLEVBQUUsS0FBSztDQUNmLGVBQWUsRUFBRSxRQUFRO0NBQ3pCLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDO0NBQzNCLEdBQ0EsS0FBSyxFQUFFLFFBQVEsUUFBUSxlQUFlLGVBQWU7QUFDcEQsa0JBQWlCLElBQUksSUFBSSxRQUFRLE9BQU87QUFHeEMsS0FEMEIsSUFBSSxJQUFJLFNBQVMsQ0FDckIsU0FBUyxTQUFTLE9BQ3RDLE9BQU0sSUFBSSxNQUFNLDBCQUEwQjtBQUc1QyxNQUFLLElBQUksUUFBUSxHQUFHLFFBQVEsU0FBUyxRQUFRLFNBQVMsR0FBRztFQUN2RCxNQUFNLGFBQWEsU0FBUztFQUM1QixNQUFNLFdBQVcsSUFBSSxHQUFHLFNBQVMsR0FBRyxLQUFLLFdBQVc7QUFFcEQsTUFDRSxDQUFDLFlBQ0QsU0FBUyxXQUFXLFVBQ3BCLFNBQVMsa0JBQWtCLGNBRTNCLE9BQU0sSUFBSSxNQUFNLDBCQUEwQjtBQUc1QyxNQUFJLEdBQUcsU0FBUyxHQUFHLE9BQU87R0FDeEIsR0FBRztHQUNILE9BQU87R0FDUixDQUFDOztFQUdQOzs7O0FDOUhELE1BQWEsMEJBQTBCLFlBQVksVUFDakQ7Q0FBRSxRQUFRLEVBQUUsS0FBSztDQUFFLFFBQVEsRUFBRSxLQUFLO0NBQUUsRUFDcEMsRUFBRSxPQUFPLHdCQUF3QixHQUNoQyxLQUFLLEVBQUUsUUFBUSxhQUFhO0FBQzNCLFFBQU8sSUFBSSxRQUFRLE9BQU87RUFDeEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxLQUFLLEdBQUcsS0FBSyxPQUFPO0FBRXZDLE1BQUksQ0FBQyxRQUFRLEtBQUssV0FBVyxPQUMzQjtFQUdGLE1BQU0sWUFBWSxjQUFjLENBQzlCLEdBQUcsR0FBRyxHQUFHLFNBQVMsaUJBQWlCLE9BQU8sT0FBTyxDQUNsRCxDQUFDLENBQUMsSUFBSSxpQkFBaUI7QUFFeEIsU0FBTztHQUNMLE1BQU0sYUFBYSxLQUFLO0dBQ3hCO0dBQ0Q7R0FDRDtFQUVMO0FBRUQsTUFBYSwrQkFBK0IsWUFBWSxVQUN0RCxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFDbkIsRUFBRSxNQUFNLG9CQUFvQixHQUMzQixLQUFLLEVBQUUsYUFBYTtBQUNuQixRQUFPLElBQUksUUFBUSxPQUFPO0VBQ3hCLE1BQU0sT0FLQSxFQUFFO0FBRVIsT0FBSyxNQUFNLFFBQVEsR0FBRyxHQUFHLEtBQUssT0FBTyxPQUFPLE9BQU8sQ0FDakQsTUFBSyxNQUFNLFlBQVksR0FBRyxHQUFHLFNBQVMsaUJBQWlCLE9BQU8sS0FBSyxHQUFHLENBQ3BFLE1BQUssS0FBSztHQUNSLFdBQVcsS0FBSztHQUNoQixlQUFlLFNBQVM7R0FDeEIsS0FBSyxTQUFTO0dBQ2QsS0FBSyxTQUFTO0dBQ2YsQ0FBQztBQUlOLFNBQU87R0FDUDtFQUVMOzs7O0FDaERELGtCQUFlIiwiZGVidWdJZCI6ImUwYjQ3YWZlLTA3ODQtNGVkNy1iYzg3LTRkMGE1NmM2OGI4NSJ9