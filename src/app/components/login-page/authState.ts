import { User } from "src/app/shared/models/User";

export interface AuthState {
    isLoading: boolean;
    error: string | null;
    user: User | null;
  }