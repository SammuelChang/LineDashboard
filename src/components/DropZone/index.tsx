import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useAppDispatch } from "../../hook";
import { uploadFile } from "../../redux/slices/file";

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
  const dispatch = useAppDispatch();
  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onabort = () => {};
    reader.onerror = () => {};
    reader.onload = () => {
      dispatch(uploadFile(reader.result));
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

  return (
    <div className="container w-10/12 mx-auto bg-light-500 dark:bg-dark-700 relative">
      <div
        {...getRootProps({})}
        className={`h-60 flex flex-col items-start sm:items-center p-5 
        border-dashed border-2 rounded-sm border-gray-200 dark:border-gray-600 outline-none
        text-gray-400 transition .24s ease-in-out
        ${isFocused ? "border-sticker-500 dark:border-sticker-500" : ""}
        ${isDragAccept ? "border-message-500 dark:border-message-500" : ""}
        ${isDragReject ? "border-call-500 dark:border-call-500" : ""}`}
      >
        <input {...getInputProps()} />
        <p className="my-auto">
          <span className="underline">點選此處</span>或將檔案
          <span className="underline">拖曳至區域中</span>
          ，上傳至瀏覽器內，限純文字檔案(.txt)
        </p>
        <NotClickableArea clickable={!!file}>
          <p>{file ? file : ""}</p>
        </NotClickableArea>
      </div>
    </div>
  );
}
