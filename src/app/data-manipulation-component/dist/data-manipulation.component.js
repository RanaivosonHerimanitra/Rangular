"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports. = void 0;
var data_methods_service_1 = require("../../../../../service-template/files/src/app/data-methods.service");
var core_1 = require("@angular/core");
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    default_1 = __decorate([
        core_1.Component({
            selector: 'dn-data-manipulation',
            templateUrl: './data-manipulation.component.html',
            styleUrls: ['./data-manipulation.component.css']
        })
    ], default_1);
    return default_1;
}());
(name) %  > core_1.Component;
implements;
core_1.OnInit;
{
    constructor(private, ds, data_methods_service_1.DataMethodsService);
    { }
    ngOnInit();
    void {}
        < ;
    writeMethods(methods) %  >
    ;
}
