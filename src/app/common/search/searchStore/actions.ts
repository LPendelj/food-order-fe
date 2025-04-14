import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Food } from "src/app/shared/models/Food";


export const searchActions = createActionGroup({
  source: "search",
  events: {
    "search food": props<{ searchTerm: string }>(), // Action to search for food,
    "search food success": props<{ items: Food[] }>(), // Action for successful search results
    "search food failure": emptyProps(), // Action for failed search results
  }})