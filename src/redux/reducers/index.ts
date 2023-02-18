import { combineReducers } from "redux";
import content from "../slices/content";
import userDailyStats from "../slices/stats/userDailyStats";
import dailyStats from "../slices/stats/dailyStats";
import summaryStats from "../slices/stats/summaryStats";
import recordStats from "../slices/stats/recordStats";
import overallLineChart from "../slices/chart/overallLineChart";
import msgCallChart from "../slices/chart/msgCallChart";
import stickerEmojiChart from "../slices/chart/stickerEmojiChart";
import chatPowerChart from "../slices/chart/chatPowerChart";
import mediaPowerChart from "../slices/chart/mediaPowerChart";
import summaryBlocks from "../slices/chart/summaryBlocks";
import recordBlocks from "../slices/chart/recordBlocks";
import chatDensityChart from "../slices/chart/chatDensityLineChart";
import context from "../slices/context";
import file from "../slices/file";

const rootReducers = combineReducers({
  content,
  userDailyStats,
  dailyStats,
  summaryStats,
  recordStats,
  overallLineChart,
  msgCallChart,
  stickerEmojiChart,
  chatPowerChart,
  mediaPowerChart,
  summaryBlocks,
  recordBlocks,
  chatDensityChart,
  context,
  file,
});

export default rootReducers;
