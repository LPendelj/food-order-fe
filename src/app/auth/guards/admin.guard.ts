import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user/user.service";


export const adminGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService);
    const router = inject(Router);
    const toastr = inject(ToastrService);
    if(userService.currentUser.token && userService.currentUser.isAdmin === true) return true;
    toastr.error('You are not authorized to access this page', 'Unauthorized Access')
    router.navigate(['/'], {queryParams:{returnUrl: state.url}})
    
    return false;
}