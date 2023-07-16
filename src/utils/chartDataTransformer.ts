let globalStrokeStatus: "lg" | "sm" = "lg";
const dataLengthThreshold = 5;
const extendStrokeLists = [
  "#012a4a",
  "#013a63",
  "#01497C",
  "#014F86",
  "#2A6F97",
  "#2C7DA0",
  "#468FAF",
  "#61A5C2",
  "#89C2D9",
  "#b3dee2",
];
const extendStrokeLists2 = [
  "#583101",
  "#603808",
  "#6F4518",
  "#8B5E34",
  "#A47148",
  "#BC8A5F",
  "#D4A276",
  "#E7BC91",
  "#F3D5B5",
  "#FFEDD8",
];

const extendStrokeLists3 = [
  "#91B5A9",
  "#DB8381",
  "#E9BAAA",
  "#EECA80",
  "#F4F4F4",
  "#c8dad4",
  "#edc1c0",
  "#f7e5bf",
  "#f4ddd5",
];

const sum = (array: [], key: string) =>
  array.reduce((acc: any, cur: any) => {
    return acc + cur[key];
  }, 0);

const axisSetting = {
  xaxis: { dataKey: "date" },
  yaxis: [
    {
      yaxisId: "left",
      hide: true,
    },
    {
      yaxisId: "right",
      hide: true,
    },
  ],
};

const observer = new ResizeObserver(function (entries) {
  const width = entries[0].contentRect.width;
  if (width < 800) {
    globalStrokeStatus = "sm";
  } else {
    globalStrokeStatus = "lg";
  }
});

const body = document.querySelector("body");
observer.observe(body as HTMLBodyElement, {
  box: "border-box",
});

function legendGenerator(variableName: string) {
  // 相關的func移到setting.ts
  const lowerVariable = variableName.toLowerCase();

  switch (lowerVariable) {
    case "messageLength":
      return "當日字數";
    default:
      return "null";
  }
}

// function autoGenerateTitle(variableName: string) {
//   const lowerVariable = variableName.toLowerCase();
//   let title = "";
//   if (lowerVariable.includes("max")) {
//     title += "最多";
//   }
//   if (lowerVariable.includes("message")) {
//     title += "訊息";
//   }
//   if (lowerVariable.includes("call")) {
//     title += "通話";
//   }
//   if (lowerVariable.includes("sticker")) {
//     title += "貼圖";
//   }
//   if (lowerVariable.includes("emoji")) {
//     title += "表情";
//   }
//   if (lowerVariable.includes("count")) {
//     title += "次數";
//   }
//   if (lowerVariable.includes("length")) {
//     title += "字數";
//   }
//   if (lowerVariable.includes("duration")) {
//     title += "時間";
//   }
//   return title;
// }

function commonLabelGenerator(type: string) {
  switch (type) {
    case "message":
      return {
        color: "",
        unit: "",
      };
  }
}

/**
 * 圖表資料製作：整體圖磚
 */
export function summaryBlocksTransformer(summaryStats: any) {
  return [
    {
      type: "message",
      title: "訊息",
      value: summaryStats.messageCount,
      unit: "則",
      color: "#91B5A9",
    },
    {
      type: "call",
      title: "通話",
      value: summaryStats.callCount,
      unit: "通",
      color: "#DB8381",
    },
    {
      type: "sticker",
      title: "貼圖",
      value: summaryStats.stickerCount,
      unit: "個",
      color: "#E9BAAA",
    },
    {
      type: "emoji",
      title: "表情",
      value: summaryStats.emojiCount,
      unit: "個",
      color: "#EECA80",
    },
  ];
}

/**
 * 圖表資料製作：最高紀錄
 */
export function recordTransformer(maxValueLists: any) {
  return [
    {
      type: "message",
      title: "最多訊息",
      // unit: "則",
      color: "#91B5A9",
      ...maxValueLists.maxMessageCount,
      key: "maxMessageCount",
    },
    {
      type: "message",
      title: "最多字數的訊息",
      // unit: "字",
      color: "#91B5A9",
      ...maxValueLists.maxMessageLength,
      key: "maxMessageLength",
    },
    {
      type: "call",
      title: "時間最久的通話",
      // unit: "分",
      color: "#DB8381",
      ...maxValueLists.maxCallDuration,
      key: "maxCallDuration",
    },
    {
      type: "call",
      title: "最多通話次數",
      // unit: "通",
      color: "#DB8381",
      ...maxValueLists.maxCallCount,
      key: "maxCallCount",
    },
    {
      type: "sticker",
      title: "最多貼圖",
      // unit: "個",
      color: "#E9BAAA",
      ...maxValueLists.maxStickerCount,
      key: "maxStickerCount",
    },
    {
      type: "emoji",
      title: "最多表情",
      // unit: "個",
      color: "#EECA80",
      ...maxValueLists.maxEmojiCount,
      key: "maxEmojiCount",
    },
  ];
}

/**
 * 圖表資料製作：整體訊息趨勢折線圖
 */
export function overallLineTransformer(dailyStats: any) {
  const hasData =
    dailyStats.filter(
      (item: any) => item.messageCount > 0 || item.callCount > 0
    ).length >= dataLengthThreshold;

  const data = dailyStats.map((item: any) => ({
    date: item.date,
    messageCount: item.messageCount,
    callCount: item.callCount,
  }));

  const commonStyle = { strokeWidth: globalStrokeStatus === "lg" ? 8 : 3 };
  const style = [
    {
      name: "訊息數",
      dataKey: "messageCount",
      hide: !sum(data, "messageCount"),
      stroke: "#91B5A9",
      yaxisId: "left",
      ...commonStyle,
    },
    {
      name: "通話數",
      dataKey: "callCount",
      hide: !sum(data, "callCount"),
      stroke: "#DB8381",
      yaxisId: "right",
      ...commonStyle,
    },
  ];

  return { hasData, data, style, ...axisSetting, legend: false };
}

/**
 * 圖表資料製作：訊息與通話折線圖
 */
export function messageAndCallLineTransformer(
  userLists: any[],
  userDailyStats: any
) {
  const hasData =
    userDailyStats.filter(
      (item: any) => item.messageCount > 0 || item.messageCount > 0
    ).length >= dataLengthThreshold;
  const data = userDailyStats.map((item: any) => {
    let result: any;
    result = {
      date: item.date,
      messageCount: item.messageCount,
      callDuration: item.callDuration,
    };

    Object.entries(item.user).forEach(([key, value]: any[]) => {
      result[`user${userLists.indexOf(key)}_messageCount`] = value.messageCount;
    });

    return result;
  });
  const commonStyle = { strokeWidth: globalStrokeStatus === "lg" ? 5 : 3 };
  const strokeLists = ["#91B5A9", "#c8dad4", ...extendStrokeLists];
  const fixedStyle = {
    name: "通話分鐘數",
    dataKey: "callDuration",
    hide: !sum(data, "callDuration"),
    stroke: "#DB8381",
    yaxisId: "right",
    ...commonStyle,
  };
  const dynamicStyle = userLists?.map((user, index) => {
    const key = `user${index}_messageCount`;
    return {
      name: `${user}的訊息數`,
      dataKey: key,
      hide: !sum(data, key),
      stroke: strokeLists[index],
      yaxisId: "left",
      ...commonStyle,
    };
  });

  const style = [...dynamicStyle, fixedStyle];
  return { hasData, data, style, ...axisSetting, legend: true };
}

/**
 * 圖表資料製作：貼圖與表情折線圖
 */
export function stickerAndEmojiLineTransformer(
  userLists: any[],
  userDailyStats: any
) {
  const hasData =
    userDailyStats.filter(
      (item: any) => item.stickerCount > 0 || item.emojiCount > 0
    ).length >= dataLengthThreshold;
  const data = userDailyStats.map((item: any) => {
    let result: any;
    result = {
      date: item.date,
      stickerCount: item.stickerCount,
      emojiCount: item.emojiCount,
    };

    Object.entries(item.user).forEach(([key, value]: any[]) => {
      result[`user${userLists.indexOf(key)}_stickerEmojiCount`] =
        value.stickerCount + value.emojiCount;
    });

    return result;
  });
  const commonStyle = { strokeWidth: globalStrokeStatus === "lg" ? 5 : 3 };
  const stickerEmojiStrokeLists = ["#c7942c", "#EECA80", ...extendStrokeLists];
  const stickerEmojiStyle = userLists?.map((user, index) => {
    const key = `user${index}_stickerEmojiCount`;
    return {
      name: `${user}的貼圖/表情數`,
      dataKey: key,
      hide: !sum(data, key),
      stroke: stickerEmojiStrokeLists[index],
      yaxisId: "left",
      ...commonStyle,
    };
  });
  const style = [...stickerEmojiStyle];

  return { hasData, data, style, ...axisSetting, legend: true };
}

/**
 * 圖表資料製作：訊息比例
 */
export function contactPeriodPieTransformer(summaryStats: ISummaryStats) {
  const periodCountArr = Object.entries(summaryStats.periodCount);
  const periodCountRes = periodCountArr.map(([key, value]) => ({
    name: key,
    value,
  }));
  return periodCountRes;
}

/**
 * 圖表資料製作：對話比例儀表板
 */
export function messageRatioTransformer(summaryStats: ISummaryStats) {
  return summaryStats.userMessageCount;
}

/**
 * 圖表資料製作：常見詞彙文字雲
 */
export function commonWordCloudTransformer(data: any) {}

/**
 * 圖表資料製作：說話強度折線圖
 */
export function chatPowerLineTransformer(
  userLists: any[],
  userDailyStats: any
) {
  // TODO 都改成TARGET, TARGET1, TARGET2
  const TARGET = "messageLength";
  const hasData =
    userDailyStats.filter((item: any) => item[TARGET] > 0).length >=
    dataLengthThreshold;
  const data = userDailyStats.map((item: any) => {
    let result: any;
    result = {
      date: item.date,
      [TARGET]: item[TARGET],
    };

    Object.entries(item.user).forEach(([key, value]: any[]) => {
      result[`user${userLists.indexOf(key)}_${TARGET}`] = value[TARGET];
    });

    return result;
  });
  const commonStyle = { strokeWidth: globalStrokeStatus === "lg" ? 5 : 3 };
  const strokeLists = ["#91B5A9", "#c8dad4", ...extendStrokeLists3];
  const style = userLists?.map((user, index) => {
    const key = `user${index}_messageLength`;
    return {
      name: `${user}的當日字數`,
      dataKey: key,
      hide: !sum(data, key),
      stroke: strokeLists[index],
      yaxisId: "left",
      ...commonStyle,
    };
  });

  return { hasData, data, style, ...axisSetting, legend: true };
}

/**
 * 圖表資料製作：媒體強度折線圖
 */
export function mediaPowerLineTransformer(
  userLists: any[],
  userDailyStats: any
) {
  const TARGET = "mediaCount";
  const hasData =
    userDailyStats.filter((item: any) => item[TARGET] > 0).length >=
    dataLengthThreshold;
  const data = userDailyStats.map((item: any) => {
    let result: any;
    result = {
      date: item.date,
      [TARGET]: item[TARGET],
    };

    Object.entries(item.user).forEach(([key, value]: any[]) => {
      result[`user${userLists.indexOf(key)}_${TARGET}`] = value[TARGET];
    });

    return result;
  });
  const commonStyle = { strokeWidth: globalStrokeStatus === "lg" ? 5 : 3 };
  const strokeLists = ["#c7942c", "#EECA80", ...extendStrokeLists3];
  const style = userLists?.map((user, index) => {
    const key = `user${index}_${TARGET}`;
    return {
      name: `${user}的照片影片數`,
      dataKey: key,
      hide: !sum(data, key),
      stroke: strokeLists[index],
      yaxisId: "left",
      ...commonStyle,
    };
  });

  return { hasData, data, style, ...axisSetting, legend: true };
}

/**
 * 圖表資料製作：對話密度折線圖
 */
export function chatDensityLineTransformer(
  userLists: any[],
  userDailyStats: any
) {
  const hasData =
    userDailyStats.filter(
      (item: any) => item.setCount > 0 || item.collectionCount > 0
    ).length >= dataLengthThreshold;
  const data = userDailyStats.map((item: any) => {
    let result: any;
    result = {
      date: item.date,
      setCount: item.setCount,
      collectionCount: item.collectionCount,
    };
    Object.entries(item.user).forEach(([key, value]: any[]) => {
      result[`user${userLists.indexOf(key)}_setCount`] = value.setCount;
    });

    return result;
  });
  const commonStyle = { strokeWidth: globalStrokeStatus === "lg" ? 5 : 3 };
  const strokeLists = ["#91B5A9", "#c8dad4", ...extendStrokeLists];
  const fixedStyle = {
    name: "對話回合數",
    dataKey: "collectionCount",
    hide: !sum(data, "collectionCount"),
    stroke: "#DB8381",
    yaxisId: "left",
    ...commonStyle,
  };
  const dynamicStyle = userLists?.map((user, index) => {
    const key = `user${index}_setCount`;
    return {
      name: `${user}的對話組數`,
      dataKey: key,
      hide: !sum(data, key),
      stroke: strokeLists[index],
      yaxisId: "left",
      ...commonStyle,
    };
  });

  const style = [...dynamicStyle, fixedStyle];
  return { hasData, data, style, ...axisSetting, legend: true };
}
