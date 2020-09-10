"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports. = void 0;
var data_methods_service_1 = require("../data-methods.service");
var core_1 = require("@angular/core");
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    default_1 = __decorate([
        core_1.Component({
            selector: 'app-table-manipulation',
            templateUrl: './table-manipulation.component.html',
            styleUrls: ['./table-manipulation.component.css']
        })
    ], default_1);
    return default_1;
}());
(name) %  > core_1.Component;
implements;
core_1.OnInit;
{
    data: any;
    displayedColumns = [, getTableColumns(columns) %  > ];
     % ;
    var value = metadata.split(";") %  >
         % ;
    for (var i = 0; i < value.length; i++) {
         %  >
             % ;
        if (value[i].split("-")[6]) {
             %  >
            ;
            value[i].split("-")[6] %  > ;
             % ;
        }
         %  >
             % ;
    }
     %  >
    ;
    handlePlotlyGraphDataSource(view, viewdata, viewlayout) %  >
        constructor(private, ds, data_methods_service_1.DataMethodsService);
    { }
    ngOnInit();
    void {}
        < ;
    writeMethods(methods) %  >
    ;
}
