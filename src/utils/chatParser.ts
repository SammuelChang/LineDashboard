import moment from "moment";

const dateReg = new RegExp(
  "^([0-9]{4})([./]{1})([0-9]{1,2})([./]{1})([0-9]{1,2})"
);
const messageReg = new RegExp(
  "^([\u4e00-\u9fa5]{0,2})([0-9]{1,2})[:]{1}([0-9]{1,2})"
);
const urlReg = new RegExp("^http");
const notContentLists = [
  "[貼圖]",
  "[照片]",
  "[影片]",
  "收回訊息",
  "邀請",
  "加入", // '我在思考我也要一起加入'
  "退出",
  "更改了群組圖片",
  "通話",
  "相簿",
  "群組名稱",
  "已讀",
  // "離開",
  "已新增",
];

/**
 * 將時間轉換為24小時制
 */
function parseTime(time: string) {
  const regex = /^(下午|上午|[AaPp][Mm])(\d{1,2}):(\d{2})$/;
  let [fullTime, AMPM, hour, minute] = time.match(regex) as RegExpMatchArray;
  if (!fullTime) return;
  if (hour === "12") {
    hour = "0";
  }
  const isPM = ["下午", "PM", "pm", "Pm", "pM"].includes(AMPM);
  const newTime = `${isPM ? +hour + 12 : hour}:${minute}`;
  return newTime;
}

/**
 * 時間分組
 */
function periodOfTimeGrouper(datetime: any) {
  const hour = moment(datetime).hour();
  switch (true) {
    case hour < 6:
      return { value: 0, label: "凌晨" };
    case hour < 11:
      return { value: 1, label: "上午" };
    case hour < 14:
      return { value: 2, label: "中午" };
    case hour < 17:
      return { value: 3, label: "下午" };
    case hour < 19:
      return { value: 4, label: "傍晚" };
    case hour < 24:
      return { value: 5, label: "晚上" };
    default:
      return { value: 9, label: "無法定義" };
  }
}

/**
 * 聊天室基本資訊
 */
function basicInfoProcessor(firstLine: string) {
  const title = firstLine.replace(/^\[LINE\] /, "");
  const titleUserLists = title.replace(/的聊天記錄$/, "").split(/, /);
  const thisUser = "";
  return { title, titleUserLists };
  // 可能存在title未收錄之user
}

/**
 * 一般文字訊息判定
 */
function messageTypeParser(message: string) {
  const messageReg = new RegExp(
    "^([\u4e00-\u9fa5]{0,2})([0-9]{1,2})[:]{1}([0-9]{1,2})"
  );
  const MediaLists = [
    "[貼圖]",
    "[照片]",
    "[影片]",
    "[相簿]",
    "未接來電",
    "取消通話",
    "通話時間",
  ];

  const sysContentLists = [
    "收回訊息",
    "加入聊天",
    "離開聊天",
    "已讀",
    "邀請",
    "已新增",
    "已加入",
    "加入群組",
    "已退出群組",
    "更改了群組",
    "變更群組",
    "群組名稱",
    "已封鎖使用網址",
    "相簿內的照片",
    "設定公告",
  ];

  const isMedia = MediaLists.some((el) => message.includes(el)); // 媒體訊息（非一般文字）
  const isSystem = sysContentLists.some((el) => message.includes(el)); // 系統訊息
  const isText = !isMedia && !isSystem && message.length > 0; // 聊天文字訊息
  const isMessage = messageReg.test(message.split(/(\s+)/)[0]);
  const note = notContentLists.find((item) => message.includes(item)) || "";
  return { isMedia, isSystem, isText, isMessage, note };
}

/**
 * 日期處理
 */
function dateProcessor(message: string) {
  const dateReg = new RegExp(
    "^([0-9]{4})([./]{1})([0-9]{1,2})([./]{1})([0-9]{1,2})"
  );

  const match = dateReg.exec(message);
  const isDate = match !== null;
  let date = "";

  if (isDate) {
    let year = match[1];
    let month = ("0" + match[3]).slice(-2);
    let day = ("0" + match[5]).slice(-2);
    date = `${year}-${month}-${day}`;
  }

  return { isDate, date };
}

/**
 * 時間處理
 */
function timeProcessor(message: string) {
  let messageTime;
  const time = message.split(/(\s+)/)[0];
  const timeRegex = /^(下午|上午|[AaPp][Mm])?(\d{1,2}):(\d{2})$/;
  const isTime = timeRegex.test(time);
  if (!isTime) return "";

  let [fullTime, AMPM, hour, minute] = time.match(
    timeRegex
  ) as RegExpMatchArray;

  const isAM = ["上午", "AM", "am", "Am", "aM"].includes(AMPM);
  const isPM = ["下午", "PM", "pm", "Pm", "pM"].includes(AMPM);

  if (isAM && hour === "12") {
    hour = "00";
  }

  if (isPM) {
    hour = (+hour + 12).toString();
  }
  messageTime = `${hour}:${minute}`;
  return messageTime;
}

/**
 * 日期時間處理
 */
function datetimeProcessor(messageDate: string, messageTime: string) {
  const datetime = new Date([messageDate, messageTime].join(" "));
  const messageDatetime = moment(datetime).format("YYYY-MM-DD HH:mm");
  return { messageDatetime };
}

/**
 * 發話者資訊
 */
function userDataProcessor(message: string, userLists: string[]) {
  const userString = message
    .split(/(\s+)/)[2]
    .replaceAll(
      /[\u0000-\u001F\u007F-\u009F\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g,
      ""
    );
  // @ts-ignore
  const userName = userString
    .match(/^([^已]*)(已[^已]*)*$/)[1]
    .match(/^([^加]*)(加[^加]*)*$/)[1];

  // const userName = userLists.includes(userString) ? userString : ""; // 訊息與標題的userName可能不同
  return { userName };
}

/**
 * 跨行對話
 */
function isCrossLineMessage(message: string, isCrossLine: any) {
  const isStart = /[ \t]"/.test(message);
  const isEnd = /"$/.test(message);

  if (isStart && isEnd) {
    return "start";
  } else if (isStart) {
    return "start";
  } else if (isEnd) {
    return "end";
  } else if (["start", "continued"].includes(isCrossLine)) {
    return "continued";
  } else return "";
}

/**
 * 一般訊息處理（文字、網址、照片、影片、貼圖、emoji、表情貼）
 */
function messageProcessor(messsage: string) {
  // 若跨行時，不進行文字解析，先將文字合併，直到結束跨行時才解析
  // 上述判斷及合併寫在function外，需建立isCross和crossMessage兩個變數
  let callMins;
  let callSeconds;
  let callHours;
  const isCall = messsage.includes("通話時間");
  if (isCall) {
    [callSeconds, callMins = 0, callHours = 0] = messsage
      .substring(messsage.indexOf("通話時間") + 4, messsage.length)
      .split(":")
      .reverse();
  } else {
    [callSeconds, callMins, callHours] = [0, 0, 0];
  }

  const isSticker = messsage.includes("[貼圖]");
  const emojiCount =
    (messsage.match(/emoji/g) || []).length + // OS Emoji
    (messsage.match(/\((?!null|emoji).+?\)/g) || []).length; // Line Emoji
  const withEmoji = emojiCount > 0;

  const httpReg =
    /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/;
  const url = messsage.match(httpReg) ?? "";
  const withUrl = url.length > 0;

  return {
    isCall,
    callHours,
    callMins,
    callSeconds,
    isSticker,
    withEmoji,
    emojiCount,
    withUrl,
    url,
  };
}

/**
 * 標籤對象處理
 */
function tagProcessor(message: string, userLists: [] = []): any {
  const tagUsers = message.match(/\s@(\w+|\W+)\s/g);
  if (!tagUsers) return "";

  for (var i = 0; i < tagUsers.length; i++) {
    tagUsers[i] = tagUsers[i].replace(/@/g, "").replaceAll(/(\t|\s)/g, "");
  }
  // const confirmTagUsers = tagUsers.filter((tagUser) =>
  //   userLists.includes(tagUser)
  // ); // 確認標記對象存在目前群組user清單中

  // FIXME 「Chang X X」只會回傳「Chang」
  return tagUsers;
}

/**
 * 時間差距（分）
 */
function timeGapCalculator(currentTime: string, previousTime: string): number {
  return moment(currentTime).diff(moment(previousTime), "minutes");
}

/**
 * 網址處理
 */
function replaceURLsWithAtSymbol(input: string) {
  const urlReg = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );

  return input.replace(urlReg, "@"); // 網址取代為指定符號，使計算長度為1
}

/**
 * 系統訊息處理
 */
function sysMessageProcessor() {}

/**
 * 聊天內容解析
 */
export function chatProcessor(content: string) {
  if (!content) return;
  const messages = [];
  const dateLists: string[] = [];
  const contentUserLists: string[] = [];
  let singleLine;
  let messageDate = "";
  let isCrossLine;
  let crossMessage = "";
  let preMessage = {} as any;
  let setId = 0;
  let collectionId = 0;
  let diffMinsFromPreSet = 0;
  let diffMinsFromPreCollection = 0;

  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const { title, titleUserLists } = basicInfoProcessor(lines[0]);

  for (let i = 0; i < lines.length; i++) {
    singleLine = lines[i];
    isCrossLine = isCrossLineMessage(singleLine, isCrossLine);

    const { isMedia, isSystem, isText, isMessage, note } =
      messageTypeParser(singleLine);
    const { isDate, date } = dateProcessor(singleLine);

    if (isDate) {
      messageDate = date;
      dateLists.push(messageDate);
    }

    if (isCrossLine) {
      crossMessage += `${singleLine} `;

      if (isCrossLine === "end") {
        singleLine = crossMessage;
        crossMessage = "";
      }
    }
    if ((isMessage && !isCrossLine) || isCrossLine === "end") {
      // 單行對話 或 跨行對話最後一行時，進行訊息處理
      let currentMessage = {};

      const messageTime = timeProcessor(singleLine);
      const { messageDatetime } = datetimeProcessor(messageDate, messageTime);
      const { userName } = userDataProcessor(singleLine, titleUserLists);
      const {
        isCall,
        callHours,
        callMins,
        callSeconds,
        isSticker,
        withEmoji,
        emojiCount,
        withUrl,
        url,
      } = messageProcessor(singleLine);
      const tagUsers = tagProcessor(singleLine);
      const diffMinsFromPre = timeGapCalculator(
        messageDatetime,
        preMessage?.datetime
      );
      const sameUserFromPre = userName === preMessage?.userName;

      // 收錄使用者名單
      if (!isSystem && !contentUserLists.includes(userName)) {
        contentUserLists.push(userName);
      }

      // 新一次訊息傳送（間隔時間較短，相同使用者，與前一筆訊息相鄰10分鐘內之集合）
      if (isMessage && !(diffMinsFromPre < 10 && sameUserFromPre)) {
        diffMinsFromPreSet = diffMinsFromPre;
        setId += 1;
      }

      // 新一輪對話（間隔時間較長，不論使用者，與前一筆訊息相鄰3小時內之集合）
      if (isMessage && !(diffMinsFromPre < 180)) {
        diffMinsFromPreCollection = diffMinsFromPre;
        collectionId += 1;
      }

      currentMessage = {
        id: i,
        isMedia,
        isSystem,
        isText,
        isMessage: isMessage || isCrossLine === "end" ? true : false,
        note,
        date: messageDate,
        time: messageTime,
        datetime: messageDatetime,
        period: periodOfTimeGrouper(messageDatetime),
        userName: isSystem ? "SYS" : userName,
        isCrossLine: isCrossLine === "end" ? true : false,
        isCall,
        callHours,
        callMins,
        callSeconds,
        callDuration: Math.floor(
          +callHours * 60 + +callMins + +callSeconds / 60
        ),
        isSticker,
        withEmoji,
        emojiCount,
        withUrl,
        url,
        tagUsers,
        message: isSystem
          ? singleLine.split(/(\s+)/).slice(2).join("")
          : singleLine.split(/(\s+)/).slice(4).join(""),
        messageLength: replaceURLsWithAtSymbol(lines[i])
          .split(/(\s+)/)
          .slice(4)
          .join("").length,
        setId: setId,
        collectionId: collectionId,
        diffMinsFromPreMessage: diffMinsFromPre,
        diffMinsFromPreSet,
        diffMinsFromPreCollection,
        // fullContent: singleLine,
      };

      messages.push(currentMessage);
      preMessage = currentMessage;
    }
  }
  const chat = {
    title: title,
    titleUserLists: titleUserLists,
    userLists: contentUserLists,
    minDate: dateLists[0],
    maxDate: dateLists[dateLists.length - 1],
    messages: messages,
  };
  if (window.location.hostname === "localhost") {
    console.log("chat :>> ", chat);
  }
  return chat;
}
