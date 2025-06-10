
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";


export const authGuard: CanActivateFn = (route, state) => {

  const isLoggedIn = !!localStorage.getItem('token');
  const router = inject(Router);

  if (isLoggedIn) {
   
    return true;
  } else {
    
    router.navigate(['/login']);
    return false;
  }

}
