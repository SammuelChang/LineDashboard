import { useState } from "react";
import { Outlet } from "react-router-dom";
import { StyledDropzone } from "../../components/DropZone";
import { Step } from "../../components/Step";

function Process() {
  return (
    <div className="h-screen w-7/12 mx-auto">
      <Outlet />
    </div>
  );
}

export default Process;
