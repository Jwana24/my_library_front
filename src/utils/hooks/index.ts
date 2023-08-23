import { useLocation } from "react-router-dom";

export const getLocationPathname = () => {
  const location = useLocation();
  return location.pathname;
}