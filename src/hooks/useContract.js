import { useSelector } from "react-redux";

export const useContract = () => {
  const lottery = useSelector((state) => state.contracts.donate);
  return lottery;
};
