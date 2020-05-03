import * as React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../actions";

const SearchTask: React.FC = () => {
  const dispatch = useDispatch();
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.filterTasks(e.target.value));
  };

  return <input onChange={onSearch} type="text" placeholder="Search..." />;
};

export default SearchTask;
