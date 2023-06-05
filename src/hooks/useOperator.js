import { useSelector } from "react-redux";

export const useOperator = () => {
  const operator = useSelector((state) => state.data.operator);
  return operator;
};
