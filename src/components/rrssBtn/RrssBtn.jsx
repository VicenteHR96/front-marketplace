import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RrssBtn = ({ colorHover, icon, styleIcon }) => {
  return (
    <>
      <a href="#" className="icon">
        <FontAwesomeIcon
          onMouseOver={colorHover}
          icon={icon}
          size="2xl"
          style={styleIcon}
        />
      </a>
    </>
  );
};

export default RrssBtn;
