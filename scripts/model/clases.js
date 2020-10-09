"use strict";
exports.__esModule = true;
exports.Group = exports.User = exports.File = exports.Machine = void 0;
var Machine = /** @class */ (function () {
    function Machine(Name, IPNumber, Disk) {
        this.Name = Name;
        this.IPNumber = IPNumber;
        this.Disk = Disk;
    }
    return Machine;
}());
exports.Machine = Machine;
var File = /** @class */ (function () {
    function File(Name, Date) {
        this.Name = Name;
        this.Date = Date;
    }
    return File;
}());
exports.File = File;
var User = /** @class */ (function () {
    function User(Name, Login, passwd) {
        this.Name = Name;
        this.Login = Login;
        this.passwd = passwd;
    }
    return User;
}());
exports.User = User;
var Group = /** @class */ (function () {
    function Group(Name) {
        this.Name = Name;
    }
    return Group;
}());
exports.Group = Group;
