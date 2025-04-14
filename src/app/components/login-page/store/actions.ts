import { createActionGroup, props } from '@ngrx/store';

export const loginActions = createActionGroup({
    source: 'Login Page',
    events: {
        'Login User': props<{ request: any }>(),
        'Login User Success': props<{ user: any }>(),
        'Login User Failure': props<{ error: string }>(),
    },
});
