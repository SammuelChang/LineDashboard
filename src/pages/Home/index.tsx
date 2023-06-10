function Home() {
  return (
    <div className="h-fit w-screen">
      <div className="w-8/12 max-w-[800px] h-[calc(100vh-64px)] flex flex-col items-center justify-center mx-auto text-text ">
        <h1 className="w-full text-6xl font-extrabold mb-6 text-center">
          想要了解聊天
          <span className="pb-2 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-[length:100%_8px] bg-no-repeat bg-bottom">
            進展到哪
          </span>
          嗎？
        </h1>
        <br />
        <p className="mb-6 px-28">
          Line訊息儀表板，提供你跟重要對象對話紀錄的整體檢視，除了有淺顯易懂的數字和分析外，也提供你長期趨勢，更能從其中嘗試判斷目前進展狀況
        </p>
        <button className="text-3xl text-text rounded-md bg-messageDefault px-6 py-4 mt-28">
          開始分析
        </button>
        <p className="text-text mt-20">捲動查看更多介紹</p>
      </div>
      <div className="flex flex-wrap gap-10 justify-center text-text">
        <div className="p-10 flex flex-col items-center gap-4">
          <div className="w-64 h-64 bg-gray-400"></div>
          <div className="font-bold text-2xl">掌握重要數字</div>
          <div>Lorem ipsum dolor sit amet consectetur</div>
        </div>
        <div className="p-10 flex flex-col items-center gap-4">
          <div className="w-64 h-64 bg-gray-400"></div>
          <div className="font-bold text-2xl">探索長期趨勢</div>
          <div>Lorem ipsum dolor sit amet consectetur</div>
        </div>
        <div className="p-10 flex flex-col items-center gap-4">
          <div className="w-64 h-64 bg-gray-400"></div>
          <div className="font-bold text-2xl">簡單精確的詮釋</div>
          <div>Lorem ipsum dolor sit amet consectetur</div>
        </div>
      </div>
      {/* <div className="w-[500px] min-w-fit m-10 bg-[#adbbe2] dark:bg-black rounded-md p-5 text-text">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="../src/assets/chat.jpg" />
            </div>
          </div>
          <div className="flex items-end">
            <div className="chat-bubble">安安</div>
            <time className="chat-footer text-xs opacity-50 pl-2">
              下午3:39
            </time>
          </div>
        </div>
        <div className="chat chat-end">
          <div className="flex">
            <div className="flex flex-col items-end justify-end  pr-2">
              <div className="chat-footer opacity-50">已讀</div>
              <time className="chat-footer text-xs opacity-50">下午3:40</time>
            </div>
            <div className="chat-bubble">幹嘛？</div>
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="../src/assets/chat.jpg" />
            </div>
          </div>
          <div className="flex items-end">
            <div className="chat-bubble">貓咪後空翻了</div>
            <time className="chat-footer text-xs opacity-50 pl-2">
              下午3:40
            </time>
          </div>
        </div>
        <div className="chat chat-end">
          <div className="flex">
            <div className="flex flex-col items-end justify-end  pr-2">
              <div className="chat-footer opacity-50">已讀</div>
              <time className="chat-footer text-xs opacity-50">下午3:40</time>
            </div>
            <div className="chat-bubble">我現在過去</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Home;