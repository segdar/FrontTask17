import { Routes } from "@angular/router";
import { authGuard } from "./services/authGuard.service";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
  },
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent: () => import("./modules/example-page/example-page.component").then((m) => m.ExamplePageComponent)

    },
     {
    path: "login",
    loadComponent: () => import("./modules/login/login.component").then((m) => m.LoginComponent),
    
  },

  {
    path: "welcome",
    canActivate: [authGuard],
   loadComponent: () => import("./modules/welcome/welcome.component").then((m) => m.WelcomeComponent)
  }
  

];
