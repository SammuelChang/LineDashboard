import { Step } from "../../components/Step";
import { BiRun } from "react-icons/bi";

function ProcessAnalysis() {
  return (
    <>
      <Step phase={2} />
      <div className="w-10/12 h-72 mx-auto">
        <ul className="text-text list-disc pb-8">
          <li>
            訊息分析與儲存僅在您開啟的瀏覽器及電腦記憶體中進行，不會上傳至任何伺服器。當您關閉網頁時資料同時會消失。
          </li>
          <li>訊息分析僅為娛樂用途，網頁詮釋和提醒只是參考唷！</li>
          <li>如有任何有興趣的分析項目，歡迎點選上方導覽列提供。</li>
        </ul>
      </div>
      <div className="flex justify-center flex-col items-center">
        <BiRun className="fill-messageDefault" size="2.5rem" />
      </div>
    </>
  );
}

export default ProcessAnalysis;
