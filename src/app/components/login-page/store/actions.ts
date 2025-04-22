import { createActionGroup, props } from '@ngrx/store';

export const authActions = createActionGroup({
    source: 'Login Page',
    events: {
        'Login User': props<{ request: any }>(),
        'Login User Success': props<{ user: any }>(),
        'Login User Failure': props<{ error: string }>(),
        
        'Register User': props<{ request: any }>(),
        'Register User Success': props<{ user: any }>(),
        'Register User Failure': props<{ error: string }>(),
    },
}); 
