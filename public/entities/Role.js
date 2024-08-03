"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.RoleTypes = void 0;
const typeorm_1 = require("typeorm");
const Client_1 = require("./Client");
var RoleTypes;
(function (RoleTypes) {
    RoleTypes["ADMIN"] = "admin";
    RoleTypes["USER"] = "user";
    RoleTypes["TEST"] = "test";
})(RoleTypes || (exports.RoleTypes = RoleTypes = {}));
let Role = class Role extends typeorm_1.BaseEntity {
};
exports.Role = Role;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Role.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: RoleTypes
    }),
    __metadata("design:type", String)
], Role.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Client_1.Client, client => client.role),
    __metadata("design:type", Array)
], Role.prototype, "clients", void 0);
exports.Role = Role = __decorate([
    (0, typeorm_1.Entity)('role')
], Role);
