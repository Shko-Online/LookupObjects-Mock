"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _LookupComponent = _interopRequireDefault(require("./LookupComponent"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mockLookupObjects = mockGenerator => {
  let container = document.getElementById('so.lookupObjects');
  if (container === null) {
    const root = document.getElementById('storybook-root');
    container = document.createElement('div');
    container.style.position = 'absolute';
    root.insertAdjacentElement('afterend', container);
  }
  mockGenerator.context.utils.lookupObjects.callsFake(lookupOptions => {
    return new Promise((resolve, reject) => {
      const unmount = cancelled => {
        _reactDom.default.unmountComponentAtNode(container);
        if (cancelled) {
          reject();
        } else {
          resolve([]);
        }
      };
      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_LookupComponent.default, {
        unmount: unmount
      }), container);
    });
  });
};
var _default = exports.default = mockLookupObjects;