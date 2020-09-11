"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var common_1 = require("@angular/common");
var layout_1 = require("@angular/cdk/layout");
var table_1 = require("@angular/material/table");
var sidenav_1 = require("@angular/material/sidenav");
var card_1 = require("@angular/material/card");
var list_1 = require("@angular/material/list");
var slider_1 = require("@angular/material/slider");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var toolbar_1 = require("@angular/material/toolbar");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var icon_1 = require("@angular/material/icon");
var select_1 = require("@angular/material/select");
var radio_1 = require("@angular/material/radio");
var datepicker_1 = require("@angular/material/datepicker");
var core_1 = require("@angular/material/core");
var button_1 = require("@angular/material/button");
var main_nav_component_1 = require("./main-nav.component");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var PlotlyJS = require("plotly.js/dist/plotly.js");
var angular_plotly_js_1 = require("angular-plotly.js");
angular_plotly_js_1.PlotlyModule.plotlyjs = PlotlyJS;
;
handleComponentImportation(components) %  >
;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_2.NgModule({
            declarations: [app_component_1.AppComponent, main_nav_component_1.MainNavComponent, , getComponentNames(components) %  > ],
            imports: [
                app_routing_module_1.AppRoutingModule,
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                common_1.CommonModule,
                angular_plotly_js_1.PlotlyModule,
                layout_1.LayoutModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                card_1.MatCardModule,
                sidenav_1.MatSidenavModule,
                table_1.MatTableModule,
                slider_1.MatSliderModule,
                slide_toggle_1.MatSlideToggleModule,
                list_1.MatListModule,
                toolbar_1.MatToolbarModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                icon_1.MatIconModule,
                select_1.MatSelectModule,
                radio_1.MatRadioModule,
                datepicker_1.MatDatepickerModule,
                core_1.MatNativeDateModule,
                ng_bootstrap_1.NgbModule,
                button_1.MatButtonModule,
            ],
            providers: [datepicker_1.MatDatepickerModule],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
