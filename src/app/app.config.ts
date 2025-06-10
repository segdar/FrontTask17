import { ApplicationConfig } from "@angular/core";
import { routes } from "./app.routes";
import {  provideHttpClient, withInterceptors } from "@angular/common/http";
import {  authInterceptorFn } from "./services/interceptor.service";
import { provideRouter } from "@angular/router";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient( withInterceptors([ authInterceptorFn])),
       
       
        
    ]
};
