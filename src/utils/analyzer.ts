import moment from "moment";
import _ from "lodash";

/**
 * 以使用者和日期為單位計算聊天數據
 */
export function userDailyStatsCalculator(
  parseChat: IChat,
  isFullChat: boolean = false
): IUserDailyStats[] {
  var result: any = {};
  var startDate = new Date(parseChat.minDate);
  var endDate = new Date(parseChat.maxDate);
  let preSetId: number = 0;
  let preCollectionId: number = 0;

  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    result[moment(date).format("YYYY-MM-DD")] = {
      date: moment(date).format("YYYY-MM-DD"),
      hasData: false,
      callCount: 0,
      callDuration: 0,
      messageCount: 0,
      messageLength: 0,
      stickerCount: 0,
      emojiCount: 0,
      mediaCount: 0,
      setCount: 0,
      collectionCount: 0,
      user: [],
    };
    parseChat.userLists.forEach((user: any) => {
      result[moment(date).format("YYYY-MM-DD")]["user"][user] = {
        date: moment(date).format("YYYY-MM-DD"),
        messageCount: 0,
        messageLength: 0,
        callCount: 0,
        callDuration: 0,
        stickerCount: 0,
        emojiCount: 0,
        mediaCount: 0,
        setCount: 0,
        collectionCount: 0,
      };
    });
  }
  parseChat?.messages.forEach(
    ({
      userName,
      date,
      isMedia,
      isMessage,
      messageLength,
      isCall,
      callDuration,
      isSticker,
      withEmoji,
      emojiCount,
      setId,
      collectionId,
    }: any) => {
      if (userName === "SYS") return;
      if (!result[date]) return;

      result[date].hasData = true;
      result[date].callCount += isCall ? 1 : 0;
      result[date].callDuration += callDuration || 0;
      result[date].callCount += isCall ? 1 : 0;
      result[date].callDuration += callDuration || 0;
      result[date].messageCount += isMessage ? 1 : 0;
      result[date].messageLength += messageLength || 0;
      result[date].stickerCount += isSticker ? 1 : 0;
      result[date].emojiCount += withEmoji ? emojiCount : 0;
      result[date].mediaCount += isMedia ? 1 : 0;
      result[date].setCount += setId !== preSetId ? 1 : 0;
      result[date].collectionCount += collectionId !== preCollectionId ? 1 : 0;

      result[date]["user"][userName].callCount += isCall ? 1 : 0;
      result[date]["user"][userName].callDuration += callDuration || 0;
      result[date]["user"][userName].messageCount += isMessage ? 1 : 0;
      result[date]["user"][userName].messageLength += messageLength || 0;
      result[date]["user"][userName].stickerCount += isSticker ? 1 : 0;
      result[date]["user"][userName].emojiCount += withEmoji ? emojiCount : 0;
      result[date]["user"][userName].mediaCount += isMedia ? 1 : 0;
      result[date]["user"][userName].setCount += setId !== preSetId ? 1 : 0;
      result[date]["user"][userName].collectionCount +=
        collectionId !== preCollectionId ? 1 : 0;

      preSetId = setId;
      preCollectionId = collectionId;
    }
  );

  if (isFullChat) {
    return Object.values(result);
  } else {
    return Object.values(result).filter(
      (i: any) => i.hasData
    ) as IUserDailyStats[];
  }
}

/**
 * 以日期為單位計算聊天數據
 */
export function dailyStatsCalculator(
  parseChat: IChat,
  isFullChat: boolean = false
): IDailyStats[] {
  var result: any = {};
  var startDate = new Date(parseChat.minDate);
  var endDate = new Date(parseChat.maxDate);

  // TODO 當日期非順向時，會少算小於起始日的資料
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    result[moment(date).format("YYYY-MM-DD")] = {
      date: moment(date).format("YYYY-MM-DD"),
      hasData: false,
      userCount: 0,
      callCount: 0,
      callDuration: 0,
      messageCount: 0,
      messageLength: 0,
      stickerCount: 0,
      emojiCount: 0,
      mediaCount: 0,
      setCount: 0,
      collectionCount: 0,
      periodCount: {},
    };
  }

  parseChat.messages.forEach(
    ({
      userName,
      date,
      isMessage,
      isMedia,
      messageLength,
      isCall,
      callDuration,
      isSticker,
      withEmoji,
      emojiCount,
      period,
    }: any) => {
      if (userName === "SYS") return;
      if (!result[date]) return;

      result[date].hasData = true;
      result[date].callCount += isCall ? 1 : 0;
      result[date].callDuration += callDuration || 0;
      result[date].messageCount += isMessage ? 1 : 0;
      result[date].messageLength += messageLength || 0;
      result[date].stickerCount += isSticker ? 1 : 0;
      result[date].emojiCount += withEmoji ? emojiCount : 0;
      result[date].mediaCount += isMedia ? 1 : 0;

      result[date].periodCount[period.label] =
        (result[date].periodCount[period.label] ?? 0) + 1;
    }
  );

  if (isFullChat) {
    return Object.values(result);
  } else {
    return Object.values(result).filter((i: any) => i.hasData) as IDailyStats[];
  }
}

/**
 * 計算個別使用者整體聊天數據
 */
export function summaryStatsByUserCalculator(
  chat: IChat,
  dailyStats: IDailyStats[]
): any {
  const sum = (array: any[], key: string) =>
    array.reduce((acc: any, cur: any) => {
      return acc + cur[key];
    }, 0);

  const periodFlat = chat.messages.map((i) => i.period);
  const periodCount = _.countBy(periodFlat, "label");
  let periodCountByUser: any[] = [];

  chat.userLists.forEach((user: any) => {
    const periodFlat = chat.messages
      .filter((i) => i.userName === user)
      .map((i) => i.period);
    const periodCount = _.countBy(periodFlat, "label");
    periodCountByUser.push({ user, periodCount });
  });

  return {
    dateCount: dailyStats.length,
    messageCount: sum(dailyStats, "messageCount"),
    messageLength: sum(dailyStats, "messageLength"),
    callCount: sum(dailyStats, "callCount"),
    callDuration: sum(dailyStats, "callDuration"),
    stickerCount: sum(dailyStats, "stickerCount"),
    emojiCount: sum(dailyStats, "emojiCount"),
    setCount: sum(dailyStats, "setCount"),
    collectionCount: sum(dailyStats, "collectionCount"),
    periodCount: periodCount,
    periodCountByUser: periodCountByUser as [],
  };
}

/**
 * 計算整體聊天數據
 */
export function summaryStatsCalculator(
  chat: IChat,
  dailyStats: IDailyStats[]
): ISummaryStats {
  const sum = (array: any[], key: string) =>
    array.reduce((acc: any, cur: any) => {
      return acc + cur[key];
    }, 0);

  const periodFlat = chat.messages.map((i) => i.period);
  const periodCount = _.countBy(periodFlat, "label");
  let periodCountByUser: any[] = [];

  chat.userLists.forEach((user: any) => {
    const periodFlat = chat.messages
      .filter((i) => i.userName === user)
      .map((i) => i.period);
    const periodCount = _.countBy(periodFlat, "label");
    periodCountByUser.push({ user, periodCount });
  });

  const userMessageCount = chat.messages.reduce(function (acc, cur) {
    const index = acc.findIndex((item: any) => item.name === cur.userName);
    if (index !== -1) {
      acc[index].value++;
    } else {
      acc.push({ name: cur.userName, value: 1 });
    }
    return acc;
  }, []);

  return {
    dateCount: dailyStats.length,
    messageCount: sum(dailyStats, "messageCount"),
    messageLength: sum(dailyStats, "messageLength"),
    callCount: sum(dailyStats, "callCount"),
    callDuration: sum(dailyStats, "callDuration"),
    stickerCount: sum(dailyStats, "stickerCount"),
    emojiCount: sum(dailyStats, "emojiCount"),
    setCount: sum(dailyStats, "setCount"),
    collectionCount: sum(dailyStats, "collectionCount"),
    periodCount: periodCount,
    periodCountByUser: periodCountByUser as [],
    score:
      +lastHalfYearTouch(chat.messages) +
      +frequentChatRecord(chat.messages) +
      +isFrequentlyRespond(chat.messages, "diffMinsFromPreMessage", 5) +
      +isFrequentlyRespond(chat.messages, "diffMinsFromPreSet", 60) +
      +isFrequentlyRespond(chat.messages, "diffMinsFromPreCollection", 1440),
    userMessageCount,
  };
}

/**
 * 計算最高紀錄數據
 */
export function recordCalculator(
  chat: IChat,
  dailyStats: IDailyStats[]
): IRecordValueList {
  const lodashTransformer = (rawData: any, key: string, unit: string) => {
    const result: any = _.maxBy(rawData, key);
    return {
      data: result,
      date: rawData.length > 0 ? result.date : "",
      value: rawData.length > 0 ? result[key] : 0,
      unit: unit,
    };
  };

  return {
    // FIXME chat不會被篩選，所以不會因為資料不足而消失
    maxMessageLength: lodashTransformer(chat.messages, "messageLength", "字"),
    maxCallDuration: lodashTransformer(chat.messages, "callDuration", "分"),
    maxMessageCount: lodashTransformer(dailyStats, "messageCount", "則"),
    maxCallCount: lodashTransformer(dailyStats, "callCount", "通"),
    maxStickerCount: lodashTransformer(dailyStats, "stickerCount", "個"),
    maxEmojiCount: lodashTransformer(dailyStats, "emojiCount", "個"),
  };
}

/**
 * 計算日期差距天數
 * @param date1
 * @param date2
 * @returns
 */
function dateDiff(date1: string, date2: string) {
  const eventStartTime = new Date(date1);
  const eventEndTime = new Date(date2);
  const diffTime = Math.abs(eventEndTime.valueOf() - eventStartTime.valueOf());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 指定日期座落半年內
 * @param date
 * @returns
 */
function isInHalfYear(date: string) {
  const targetDate = new Date(date);
  const current = new Date();
  const sixMonthAgo = new Date(current.setMonth(current.getMonth() - 6));
  return targetDate > sixMonthAgo;
}

/**
 * 近半年保持一定聊天頻率
 * @param messages
 * @returns
 */
function lastHalfYearTouch(messages: any) {
  const chatDate = messages
    .filter((message: any) => isInHalfYear(message.date))
    .map((message: any) => message.date);
  const chatDateCount = new Set(chatDate).size;
  return chatDateCount / 180 > 0.4;
}

/**
 * 對話歷史上經常聊天
 * @param messages
 * @returns
 */
function frequentChatRecord(messages: any) {
  const chatDate = messages.map((message: any) => message.date);
  const chatDateCount = new Set(chatDate).size;

  const firstMessageDate = messages[0].date;
  const currentDate = messages[messages.length - 1].date;
  const actualDateCount = dateDiff(firstMessageDate, currentDate);
  return chatDateCount / actualDateCount > 0.4;
}

/**
 * 是否經常快速回覆
 * @param messages
 * @param diffType
 * @param diffThreshold
 * @returns
 */
function isFrequentlyRespond(
  messages: any,
  diffType: string,
  diffThreshold: number
) {
  const copyMessages = messages.map((message: any) => message[diffType]);
  copyMessages.sort();

  const halfIndex = Math.floor(copyMessages.length / 2);
  const median =
    copyMessages.length % 2
      ? copyMessages[halfIndex]
      : (copyMessages[halfIndex - 1] + copyMessages[halfIndex]) / 2;
  return median < diffThreshold;
}
