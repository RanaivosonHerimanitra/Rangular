"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var sidenav_1 = require("@angular/material/sidenav");
var list_1 = require("@angular/material/list");
var toolbar_1 = require("@angular/material/toolbar");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var icon_1 = require("@angular/material/icon");
var select_1 = require("@angular/material/select");
var radio_1 = require("@angular/material/radio");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var datepicker_1 = require("@angular/material/datepicker");
var core_2 = require("@angular/material/core");
var layout_1 = require("@angular/cdk/layout");
var button_1 = require("@angular/material/button");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [, getComponentNames() %  > ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.ReactiveFormsModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                sidenav_1.MatSidenavModule,
                list_1.MatListModule,
                toolbar_1.MatToolbarModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                icon_1.MatIconModule,
                select_1.MatSelectModule,
                radio_1.MatRadioModule,
                datepicker_1.MatDatepickerModule,
                core_2.MatNativeDateModule,
                ng_bootstrap_1.NgbModule,
                layout_1.LayoutModule,
                button_1.MatButtonModule,
            ],
            providers: [datepicker_1.MatDatepickerModule],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
