import * as React from "react";
import { v4 } from "uuid";
import { TASK_STATUSES } from "../constants";

interface Props {
  selected: string;
  handleStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectStatus: React.FC<Props> = ({
  selected = "",
  handleStatus = (e) => {},
}) => (
  <select value={selected} onChange={handleStatus}>
    {TASK_STATUSES.map((status) => (
      <option key={v4()} value={status}>
        {status}
      </option>
    ))}
  </select>
);

export default SelectStatus;
