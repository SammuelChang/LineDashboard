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
    };
    parseChat.userLists.forEach((user: any) => {
      result[moment(date).format("YYYY-MM-DD")][user] = {
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

      result[date][userName].callCount += isCall ? 1 : 0;
      result[date][userName].callDuration += callDuration || 0;
      result[date][userName].messageCount += isMessage ? 1 : 0;
      result[date][userName].messageLength += messageLength || 0;
      result[date][userName].stickerCount += isSticker ? 1 : 0;
      result[date][userName].emojiCount += withEmoji ? emojiCount : 0;
      result[date][userName].mediaCount += isMedia ? 1 : 0;
      result[date][userName].setCount += setId !== preSetId ? 1 : 0;
      result[date][userName].collectionCount +=
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
      value: result[key],
      unit: unit,
    };
  };

  return {
    maxMessageLength: lodashTransformer(chat.messages, "messageLength", "字"),
    maxCallDuration: lodashTransformer(chat.messages, "callDuration", "分"),
    maxMessageCount: lodashTransformer(dailyStats, "messageCount", "個"),
    maxCallCount: lodashTransformer(dailyStats, "callCount", "通"),
    maxStickerCount: lodashTransformer(dailyStats, "stickerCount", "個"),
    maxEmojiCount: lodashTransformer(dailyStats, "emojiCount", "個"),
  };
}
