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
import contactPeriodPieChart from "../slices/chart/contactPeriodPieChart";
import messageRatioPieChart from "../slices/chart/messageRatioPieChart";
import summaryBlocks from "../slices/chart/summaryBlocks";
import recordBlocks from "../slices/chart/recordBlocks";
import chatDensityChart from "../slices/chart/chatDensityLineChart";
import context from "../slices/context";
import file from "../slices/file";
import messages from "../slices/stats/messages";

const rootReducers = combineReducers({
  content,
  messages,
  userDailyStats,
  dailyStats,
  summaryStats,
  recordStats,
  overallLineChart,
  msgCallChart,
  stickerEmojiChart,
  chatPowerChart,
  mediaPowerChart,
  contactPeriodPieChart,
  messageRatioPieChart,
  summaryBlocks,
  recordBlocks,
  chatDensityChart,
  context,
  file,
});

export default rootReducers;
