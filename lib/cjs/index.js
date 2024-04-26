"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const mockLookupObjects = mockGenerator => {
  mockGenerator.context.utils.lookupObjects.callsFake(lookupOptions => {
    return new Promise(resolve => {
      resolve([]);
    });
  });
  console.log(mockGenerator);
};
var _default = exports.default = mockLookupObjects;