"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = exports.RoleEnum = void 0;
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["ADMIN"] = "admin";
    RoleEnum["USER"] = "user";
    RoleEnum["TEST"] = "test";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
exports.Constants = {
    ADMIN: RoleEnum.ADMIN,
    USER: RoleEnum.USER,
    TEST: RoleEnum.TEST,
};
