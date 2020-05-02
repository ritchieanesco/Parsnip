import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "../reducers";
import * as actions from "../actions";

const Header = () => {
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const onCurrentProjectChange = (e) => {
    dispatch(actions.setCurrentProjectId(Number(e.target.value)));
  };

  return (
    <div className="project-item">
      Project:
      <select onChange={onCurrentProjectChange} className="project-menu">
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Header;
