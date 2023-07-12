"use strict";
exports.id = 506;
exports.ids = [506];
exports.modules = {

/***/ 8506:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vo": () => (/* binding */ AuthContext),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export actions */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const INITIAL_STATE = {
    loading: false,
    isLoggedIn: false,
    token: null
};
const actions = {
    AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
    USER_LOADED: "USER_LOADED",
    LOGOUT: "LOGOUT",
    LOGGED_IN: "LOGGED_IN"
};
const reduder = (state, action)=>{
    switch(action.type){
        case actions.LOGGED_IN:
            return {
                ...state,
                token: action.payload.token,
                isLoggedIn: true,
                loading: false
            };
        case actions.USER_LOADED:
            return {
                ...state,
                token: action.payload.token,
                isLoggedIn: true,
                loading: false
            };
        case actions.AUTHENTICATION_ERROR:
        case actions.LOGOUT:
            localStorage.clear("token");
            return {
                ...state,
                token: null,
                isLoggedIn: false
            };
        default:
            return state;
    }
};
const AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();
function AuthContextProvider({ children  }) {
    const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(reduder, INITIAL_STATE);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AuthContext.Provider, {
        value: {
            dispatch,
            state
        },
        children: children
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthContextProvider);


/***/ })

};
;