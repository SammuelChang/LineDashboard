import { AiOutlineSafetyCertificate } from "react-icons/ai";

function Safety() {
  return (
    <div className="w-full p-10 text-text ">
      <h1 className="text-2xl font-bold">關於訊息的安全性說明</h1>
      <ul className="[&>li]:py-4 [&>li>*]:pb-2">
        <li>
          <p className="font-bold text-md flex items-center">
            <AiOutlineSafetyCertificate /> &nbsp; 這裡會紀錄我的資訊嗎？
          </p>
          <p className="ml-7">
            本網站為軟體開發職涯中的一個練習作品，也試圖建立一個對公眾日常有幫助的工具，並不計劃收集個人資訊。
            <br />
            關於個資，在這裡區分為兩個部分：
            <p className="ml-7 mb-2">
              1.
              對話紀錄文字檔：本站沒有建立資料庫，無法將文字檔傳送至其他伺服器，也不準備進行這樣的資料儲存。
              <br />
              2.
              使用者事件：本站使用熱門的GA分析，多數現代網站都有安置，以了解您是否瀏覽網頁、是否使用我所開發的各種功能。在本站，由於缺少登入或個資紀錄機制，所以也無法得知使用的人是誰。
            </p>
            如果您有軟體開發背景，亦可檢視原始碼進行檢查。
          </p>
        </li>
        <li>
          <p className="font-bold text-md flex items-center">
            <AiOutlineSafetyCertificate /> &nbsp; 上傳對話紀錄安全嗎？
          </p>
          <p className="ml-7">
            對話紀錄是相當敏感的資訊，這個網站在規劃時就已經參考其他產品，明白揭示不會主動透過伺服器進行聊天記錄收集。
            <br />
            也因為這樣，使用者必須使用相對麻煩的方式，將對話紀錄輸出為文字檔後、上傳至網站，而不能以其他更方便的方式使用，例如Line機器人。
          </p>
        </li>
        <li>
          <p className="font-bold text-md flex items-center">
            <AiOutlineSafetyCertificate /> &nbsp; 為什麼這是安全的？
          </p>
          <p className="ml-7">
            在日常上網時，經常會將檔案或重要資訊填入網頁中，這些資料通常區分為三種方式處理：
            <p className="ml-7 mb-2">
              1.
              前端處理：上傳或填寫個人資料後，於網頁中將資訊進行過濾處理，並將結果回饋使用者。
              <br />
              2.
              伺服器處理：上傳或填寫個人資料後，將資訊傳送至產品佈署的伺服器，並在伺服器端進行處理。
              <br />
              3.
              混合處理：上傳或填寫個人資料後，進行初步過濾，例如必填欄位未填寫的提示，待使用者確實完成後，再將資料傳送到伺服器端處理。
              <br />
            </p>
            這個網站為了避免疑慮，選擇了前端處理，所有資料都會在您開啟的網頁中處理後直接呈現，也因此增加了資料處理上的複雜度。寫網頁的程式語言和使用於資料分析的程式語言是截然不同的。
          </p>
        </li>
        <li>
          <p className="font-bold text-md flex items-center">
            <AiOutlineSafetyCertificate /> &nbsp;
            我要如何確認對話紀錄沒有上傳到其他地方？
          </p>
          <p className="ml-7">
            您可以嘗試我們經常用來追蹤資訊上傳的除錯工具——Chrome
            Devtool，用以確認是否有不符預期的狀況。
            <br />
            對網頁按下右鍵、檢查（inspect）、選擇網路（Network）、點選Fetch/XHR，多數將資料上傳的動作都可以在此檢視。
            <br />
            具體的判斷方式需要程式背景較容易說明，但您可以初步觀察到傳送和接收資料的主要途徑。
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Safety;
