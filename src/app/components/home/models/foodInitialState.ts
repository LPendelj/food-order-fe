import { Food } from "src/app/shared/models/Food";


export interface FoodInitialState {
  foodData: Food[] | null; // Array to hold food data
  isLoading: boolean; // Flag to indicate loading state
  error: string | null; // Variable to hold error messages
  searchTerm: string | null; // Variable to hold the search term
  tag: string | null; // Variable to hold the selected tag
}