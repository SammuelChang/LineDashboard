interface IChat {
  title: string;
  titleUserLists: string[];
  userLists: string[];
  minDate: string;
  maxDate: string;
  messages: Message[];
}

interface IMessage {
  id: number;
  isMedia: boolean;
  isSystem: boolean;
  isText: boolean;
  isMessage: boolean;
  note: string;
  date: string;
  time: string;
  datetime: string;
  period: [];
  userName: string;
  isCrossLine: boolean;
  isCall: boolean;
  callMins: number;
  callSeconds: number;
  callDuration: number;
  isSticker: boolean;
  withEmoji: boolean;
  emojiCount: number;
  tagUsers: string[];
  message: string;
  messageLength: number;
  setId: number;
  collectionId: number;
}

interface IUserDailyStats {
  date: string;
  callCount: number;
  callDuration: number;
  messageCount: number;
  messageLength: number;
  stickerCount: number;
  emojiCount: number;
  setCount: number;
  collectionCount: number;
  [key: string]: {
    date: string;
    messageCount: number;
    messageLength: number;
    callCount: number;
    callDuration: number;
    stickerCount: number;
    emojiCount: number;
    setCount: number;
    collectionCount: number;
  };
}

interface IDailyStats {
  date: string;
  userCount: number;
  messageCount: number;
  callCount: number;
  callDuration: number;
  messageLength: number;
  stickerCount: number;
  emojiCount: number;
  setCount: number;
  collectionCount: number;
}

interface ISummaryStats {
  dateCount: number;
  messageLength: number;
  messageCount: number;
  callDuration: number;
  callCount: number;
  stickerCount: number;
  emojiCount: number;
  setCount: number;
  collectionCount: number;
  periodCount: {};
  periodCountByUser: [];
  score: number;
}

interface IRecordValue {
  id?: number;
  date: string;
  value: number;
}

interface IRecordValueList {
  maxMessageLength: MaxValue;
  maxCallDuration: MaxValue;
  maxMessageCount: MaxValue;
  maxCallCount: MaxValue;
  maxStickerCount: MaxValue;
  maxEmojiCount: MaxValue;
}

interface ILegendBlocks {
  type: string;
  title: string;
  value: number;
  unit: string;
  color: string;
  icon: string;
}
