"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const create_user_1 = require("./routes/users/create_user");
const create_role_1 = require("./routes/role/create_role");
const fetch_users_1 = require("./routes/users/fetch_users");
const delete_user_1 = require("./routes/users/delete_user");
const update_user_1 = require("./routes/users/update_user");
const read_role_1 = require("./routes/role/read_role");
const update_role_1 = require("./routes/role/update_role");
const delete_role_1 = require("./routes/role/delete_role");
const viewRoleforcurrentUser_1 = require("./routes/role/viewRoleforcurrentUser");
const fetch_Current_User_1 = require("./routes/users/fetch_Current_User");
const app = (0, express_1.default)();
const main = async () => {
    await data_source_1.AppDataSource.initialize();
    app.use(express_1.default.json());
    app.use(create_user_1.createClientRouter);
    app.use(create_role_1.createRoleRouter);
    app.use(delete_user_1.deleteClientRouter);
    app.use(fetch_users_1.fetchUsersRouter);
    app.use(update_user_1.updateUserRouter);
    app.use(read_role_1.fetchRoleRouter);
    app.use(update_role_1.updateRoleRouter);
    app.use(delete_role_1.deleteRoleRouter);
    app.use(viewRoleforcurrentUser_1.fetchUserByID);
    app.use(fetch_Current_User_1.fetchCurentUserByID);
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
};
main().catch((error) => console.error('Error initializing the server:', error));
