import React from "react";
import { v4 } from "node-uuid";
import { TASK_STATUSES } from "../constants";

const SelectStatus = ({ selected = "", handleStatus = (e) => {} }) => (
  <select value={selected} onChange={handleStatus}>
    {TASK_STATUSES.map((status) => (
      <option key={v4()} value={status}>
        {status}
      </option>
    ))}
  </select>
);

export default SelectStatus;
