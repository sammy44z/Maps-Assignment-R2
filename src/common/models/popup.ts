import { Dispatch, SetStateAction } from "react";
import Route from "./route";

export interface PopupProps {
    routesList: Route[];
    editRoute:Route|undefined;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: Dispatch<SetStateAction<Route[]>>;
  }