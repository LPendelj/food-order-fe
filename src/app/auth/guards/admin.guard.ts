import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "src/app/services/user/user.service";


export const adminGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService);
    const router = inject(Router);
    if(userService.currentUser.token && userService.currentUser.isAdmin === true) return true;
    
    router.navigate(['/login'], {queryParams:{returnUrl: state.url}})
    
    return false;
}