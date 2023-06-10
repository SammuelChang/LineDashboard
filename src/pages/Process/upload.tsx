import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledDropzone } from "../../components/DropZone";
import { Step } from "../../components/Step";
import { useAppSelector, useAppDispatch } from "../../hook";
import { BiRun } from "react-icons/bi";
import { reset } from "../../redux/slices/file";

function ProcessUpload() {
  const file = useAppSelector((state) => state.file);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());
  }, []);

  const onUpload = () => {
    if (file.length > 0) {
      navigate("/process/analysis");
    }
  };

  return (
    <>
      <Step phase={1} />
      <div className="w-10/12 h-72 mx-auto">
        <StyledDropzone />
      </div>
      <div className="flex justify-center flex-col items-center">
        <BiRun
          className={`fill-messageDefault ${
            file.length > 0 ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          size="2.5rem"
          onClick={onUpload}
        />
      </div>
    </>
  );
}

export default ProcessUpload;
