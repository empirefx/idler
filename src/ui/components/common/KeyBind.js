import React from "react";
import ToolTip from "./ToolTip";

const KeyBind = ({ value, info }) => {
  return (
    <span className="key-bind">
      <b>{value}</b>
      {info && <ToolTip text={info} />}
    </span>
  );
};

export default KeyBind;
