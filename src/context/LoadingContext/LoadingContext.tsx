import { createContext } from "react";

export interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
