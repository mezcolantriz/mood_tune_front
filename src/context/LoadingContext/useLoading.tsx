import { useContext } from "react";
import { LoadingContext } from "./LoadingContext";

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading debe usarse dentro de un LoadingProvider");
    }
    return context;
};
