"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var translationFunktion_exports = {};
__export(translationFunktion_exports, {
  setLocale: () => setLocale,
  translation: () => translation
});
module.exports = __toCommonJS(translationFunktion_exports);
var import_i18n = require("i18n");
var import_path = __toESM(require("path"));
const i18n = new import_i18n.I18n({
  locales: ["en", "de", "ru", "pt", "nl", "fr", "it", "es", "pl", "uk", "zh-cn"],
  defaultLocale: "en",
  directory: import_path.default.join("../../admin/src", "i18n")
});
const setLocale = (locale) => {
  i18n.setLocale(locale);
};
const translation = (key, replace) => {
  return i18n.__(key, replace != null ? replace : "");
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setLocale,
  translation
});
//# sourceMappingURL=translationFunktion.js.map
