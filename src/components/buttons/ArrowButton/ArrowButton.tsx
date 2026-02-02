"use client";

import "./ArrowButton.css";
import ArrowIcon from "../../icons/ArrowIcon/ArrowIcon";

export default function ArrowButton() {

  return (
    <button
      className={`arrow-btn`}
    >
      <ArrowIcon />
    </button>
  );
}