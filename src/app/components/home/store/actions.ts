import { props, createActionGroup, emptyProps } from "@ngrx/store";


export const homeActions = createActionGroup({
  source: 'Home',
  events: {
    'Get Food Data': emptyProps(), // Action to get home data
    'Get Food Data Success': props<{ response: any }>(), // Action for successful data retrieval
    'Get Food Data Failure': props<{ error: string }>(), // Action for failed data retrieval

    'Get Food Data By Search Term': props<{ searchTerm: string }>(), // Action to get food data by search term
    'Get Food Data By Search Term Success': props<{ response: any }>(), // Action for successful search data retrieval
    'Get Food Data By Search Term Failure': props<{ error: string }>(), // Action for failed search data retrieval
    
    'Get Food Data By Tag': props<{ tag: string }>(), // Action to get food data by tag
    'Get Food Data By Tag Success': props<{ response: any }>(), // Action for successful tag data retrieval
    'Get Food Data By Tag Failure': props<{ error: string }>(), // Action for failed tag data retrieval
  }
});