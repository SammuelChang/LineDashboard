import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAppSelector, useAppDispatch } from "../../hook";
import { uploadFile } from "../../redux/slices/file";
import { useNavigate } from "react-router-dom";

declare let gtag: Function;
const NotClickableArea = ({
  children,
  clickable,
}: {
  children: React.ReactElement;
  clickable: boolean;
}) => {
  return (
    <div
      onClick={(e) => {
        if (clickable) {
          e.stopPropagation();
        }
      }}
      className="sm:p-8 sm:absolute sm:bottom-0"
    >
      {children}
    </div>
  );
};

export function StyledDropzone(props: any) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onabort = () => {};
    reader.onerror = () => {};
    reader.onload = () => {
      dispatch(uploadFile(reader.result));
      setLoading(true);
      if (location.origin === "https://good-line-dashboard.web.app") {
        gtag("event", "upload", {});
      }
      setTimeout(() => {
        handleClick();
      }, 3000);
    };
    reader.readAsText(file);
  }, []);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
    },
    maxFiles: 1,
  });

  const file = acceptedFiles.map((file: any) => file.path);
  const content = useAppSelector((state) => state.content);
  const navigate = useNavigate();
  const handleClick = () => navigate("/analysis");

  return (
    <div className="container w-10/12 min-h-[212px] mx-auto bg-light-500 dark:bg-dark-700 relative">
      {loading && (
        <div className="bg-light-500 dark:bg-dark-500 w-full h-full absolute top-0 left-0 flex justify-center items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#91B5A9] via-[#E9BAAA] to-[#DB8381] animate-spin">
            <div className="h-9 w-9 rounded-full bg-gray-200"></div>
          </div>
        </div>
      )}
      <div
        {...getRootProps({})}
        className={`flex flex-col items-start sm:items-center p-5 
        border-dashed border-2 rounded-sm border-gray-200 dark:border-gray-600 outline-none
        text-gray-400 transition .24s ease-in-out
        ${isFocused ? "border-sticker-500 dark:border-sticker-500" : ""}
        ${isDragAccept ? "border-message-500 dark:border-message-500" : ""}
        ${isDragReject ? "border-call-500 dark:border-call-500" : ""}`}
      >
        <input {...getInputProps()} />
        <p className="my-5 md:my-10">
          <span className="underline">點選此處</span>或將檔案
          <span className="underline">拖曳至區域中</span>
          ，以上傳至瀏覽器內，限純文字檔案(.txt)
        </p>
        {!loading && (
          <div className="my-auto p-2 bg-gray-300 bg-opacity-10">
            <p>
              訊息分析與儲存僅在您開啟的瀏覽器中進行，不會上傳至任何伺服器。
            </p>
            <p>訊息分析僅為娛樂用途，網頁詮釋和提醒只是參考唷！</p>
          </div>
        )}
        <NotClickableArea clickable={!!file}>
          <p>{file ? file : ""}</p>
        </NotClickableArea>
      </div>
    </div>
  );
}
