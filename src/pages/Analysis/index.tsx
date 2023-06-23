import { useEffect, useState } from "react";

import demo from "../../utils/demo.txt";
import ChartContainer from "../../components/Recharts/ChartContainer";
import Line from "../../components/Recharts/Line";
import Pie from "../../components/Recharts/Pie";
import Legend from "../../components/Legend";
import Record from "../../components/Record";
import Banner from "../../components/Banner";

import { parseFile } from "../../redux/slices/content";
import {
  analyzeUserDailyStats,
  filterUserDailyStats,
} from "../../redux/slices/stats/userDailyStats";
import {
  analyzeDailyStats,
  filterDailyStats,
} from "../../redux/slices/stats/dailyStats";
import { analyzeSummaryStats } from "../../redux/slices/stats/summaryStats";
import { analyzeRecordStats } from "../../redux/slices/stats/recordStats";

import { transformOverallLineChart } from "../../redux/slices/chart/overallLineChart";
import { transformMsgCallChart } from "../../redux/slices/chart/msgCallChart";
import { transformStickerEmojiChart } from "../../redux/slices/chart/stickerEmojiChart";
import { transformChatPowerChart } from "../../redux/slices/chart/chatPowerChart";
import { transformMediaPowerChart } from "../../redux/slices/chart/mediaPowerChart";
import { transformChatDensityChart } from "../../redux/slices/chart/chatDensityLineChart";
import { transformContactPeriodPieChart } from "../../redux/slices/chart/contactPeriodPieChart";
import { transformSummaryBlocks } from "../../redux/slices/chart/summaryBlocks";
import { transformRecordBlocks } from "../../redux/slices/chart/recordBlocks";

import { dateRangeSetter } from "../../utils";
import { useAppSelector, useAppDispatch } from "../../hook";
import { filterMessages, setMessages } from "../../redux/slices/stats/messages";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Step } from "../../components/Step";

function Analysis() {
  const [searchParams] = useSearchParams();
  const file = useAppSelector((state) => state.file);
  const content = useAppSelector((state) => state.content);
  const messages = useAppSelector((state) => state.messages);
  const userDailyStats = useAppSelector((state) => state.userDailyStats);
  const dailyStats = useAppSelector((state) => state.dailyStats);
  const summaryStats = useAppSelector((state) => state.summaryStats);
  const maxStats = useAppSelector((state) => state.recordStats);
  const overallLineChart = useAppSelector((state) => state.overallLineChart);
  const msgCallChart = useAppSelector((state) => state.msgCallChart);
  const stickerEmojiChartState = useAppSelector(
    (state) => state.stickerEmojiChart
  );
  const chatPowerChart = useAppSelector((state) => state.chatPowerChart);
  const mediaPowerChart = useAppSelector((state) => state.mediaPowerChart);
  const chatDensityChart = useAppSelector((state) => state.chatDensityChart);
  const contactPeriodPieChart = useAppSelector(
    (state) => state.contactPeriodPieChart
  );
  const summaryBlocks = useAppSelector((state) => state.summaryBlocks);
  const recordBlocks = useAppSelector((state) => state.recordBlocks);

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [isFullChat, setIsFullChat] = useState<boolean>(false);
  const [dateRangeLists, setDateRangeLists] = useState<any>([]);
  const [dateRange, setDateRange] = useState<any>({});
  const navigate = useNavigate();

  async function loadFile() {
    const response = await fetch(demo);
    const content = await response.text();
    dispatch(parseFile(content));
  }

  useEffect(() => {
    if (Object.keys(file).length !== 0) return;
    if (Object.keys(demo).length === 0) return;
    if (!searchParams.get("isDemo")) {
      navigate("/");
      return;
    }
    loadFile();
  }, [demo]);

  useEffect(() => {
    if (Object.keys(file).length === 0) return;
    if (searchParams.get("isDemo")) {
      loadFile();
      return;
    }
    dispatch(parseFile(file));
  }, [file]);

  useEffect(() => {
    if (Object.keys(content).length === 0) return;

    dispatch(setMessages({ content }));
    dispatch(analyzeUserDailyStats({ content }));
    dispatch(analyzeDailyStats({ content }));

    const dateRangeLists = dateRangeSetter(content);
    setDateRangeLists(dateRangeLists);
    setDateRange(dateRangeLists.find((i) => i.checked));
  }, [content]);

  useEffect(() => {
    if (Object.keys(content).length === 0) return;

    const userLists = content.userLists;
    const dailyLists = dailyStats.Lists;
    const userDailyLists = userDailyStats.Lists;
    dispatch(analyzeSummaryStats({ content, dailyLists }));
    dispatch(analyzeRecordStats({ content, dailyLists }));
    dispatch(transformOverallLineChart({ dailyLists }));
    dispatch(transformMsgCallChart({ userLists, userDailyLists }));
    dispatch(transformStickerEmojiChart({ userLists, userDailyLists }));
    dispatch(transformChatPowerChart({ userLists, userDailyLists }));
    dispatch(transformMediaPowerChart({ userLists, userDailyLists }));
    dispatch(transformChatDensityChart({ userLists, userDailyLists }));
  }, [dailyStats, userDailyStats]);

  useEffect(() => {
    if (Object.keys(content).length === 0) return;

    dispatch(transformSummaryBlocks({ summaryStats }));
    dispatch(transformContactPeriodPieChart({ summaryStats }));
    dispatch(transformRecordBlocks({ maxStats }));
  }, [summaryStats, maxStats]);

  useEffect(() => {
    if (Object.keys(content).length === 0) return;

    dispatch(filterMessages({ content, dateRange }));
    dispatch(filterUserDailyStats({ content, isFullChat, dateRange }));
    dispatch(filterDailyStats({ content, isFullChat, dateRange }));
  }, [dateRange]);

  useEffect(() => {
    if (Object.keys(content).length === 0) return;

    dispatch(filterUserDailyStats({ content, isFullChat, dateRange }));
    dispatch(filterDailyStats({ content, isFullChat, dateRange }));
  }, [isFullChat]);

  function expensiveHandler() {
    if (isFullChat) return;

    setLoading(true);
    setTimeout(() => {
      if (!isFullChat) {
        setLoading(false);
      }
    }, 3000);
  }

  const dateRangeHandler = (key: string) => {
    const newDateRangeLists = dateRangeLists.map((el: any) => ({
      ...el,
      checked: el.key === key ? true : false,
    }));
    setDateRangeLists(newDateRangeLists);
    const newDateRange = newDateRangeLists.find((el: any) => el.checked);
    setDateRange(newDateRange);
  };

  return (
    <div className="w-10/12 h-full mb-4 mx-auto py-10">
      {window.screen.width < 500 && (
        <p className="text-text text-center">※ 手機版建議使用橫向觀看</p>
      )}
      <div>
        <Banner
          title={
            content.title
              ? `${content.title}${
                  Object.keys(file).length === 0 ? "（範例）" : ""
                }`
              : "載入中"
          }
          type="strong"
        >
          {/* <p className="absolute right-0 mr-5">
            <Link to="/process/upload">
              <GrRefresh
                className="[&>path]:stroke-text hover:scale-110 duration-300"
                size="1.5rem"
              />
            </Link>
          </p> */}
        </Banner>
      </div>
      <div className="tools h-min-12 bg-light-500 dark:bg-dark-700 my-4 flex flex-wrap items-center justify-start md:justify-center rounded-lg">
        <div className="p-2 dark:text-text">
          <strong className="text-text block mb-2 md:inline">時間範圍：</strong>
          <span className="py-2">
            {dateRangeLists.map((item: any) => (
              <button
                key={item.key}
                className={`${
                  item["checked"]
                    ? "bg-gray-800 dark:bg-dark-400"
                    : "bg-gray-300 dark:bg-dark-900"
                } w-fit h-fit px-4 mx-1 md:mx-2 rounded-lg text-white hover:shadow duration-300`}
                onClick={() => {
                  dateRangeHandler(item.key);
                }}
              >
                {item.label}
              </button>
            ))}
          </span>
        </div>
        <div className="w-3/12 basis-[300px] text-right p-2 flex justify-start items-center gap-2">
          <input
            type="checkbox"
            className="checkbox border-gray-400"
            checked={isFullChat}
            onChange={(_) => {
              expensiveHandler();
              setIsFullChat((isFullChat) => !isFullChat);
            }}
          />
          {!isFullChat && <p className="text-[#A3A3A3]">趨勢不含未聊天日期</p>}
          {isFullChat && (
            <p className="text-[#A3A3A3]">
              趨勢<strong>包含</strong>未聊天日期
            </p>
          )}
        </div>
      </div>
      {/* <Step phase={summaryStats.score} /> */}
      <div className="stats w-full bg-background text-text text-center mb-10">
        <div className="stat">
          <div className="stat-title mb-2">總計分數</div>
          <div className="stat-value mb-2">
            {summaryStats.score}
            <span className="text-sm">/5</span>
          </div>
          <div className="stat-desc">
            依據訊息持續性與回覆時間間隔進行簡易判斷
          </div>
        </div>
      </div>
      <section className="legend grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
        {summaryBlocks?.Lists.map((item: any) => (
          <Legend key={item.type} data={item} />
        ))}
      </section>
      <section className="basic w-full mb-10">
        <Banner title="Basic" type="medium" />
        {overallLineChart && (
          <ChartContainer title="整體趨勢" loading={loading}>
            <Line data={overallLineChart} />
          </ChartContainer>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recordBlocks.Lists.map((recordBlock: any) => (
            <Record
              key={recordBlock.key}
              data={recordBlock}
              loading={loading}
            />
          ))}
        </div>
        {msgCallChart && (
          <ChartContainer title="互動強度" loading={loading}>
            <Line data={msgCallChart} />
          </ChartContainer>
        )}
        {stickerEmojiChartState && (
          <div className="text-text">
            <ChartContainer title="敷衍程度" loading={loading}>
              <Line data={stickerEmojiChartState} />
            </ChartContainer>
            <p>※ 僅供參考，也是有人很認真挑選貼圖代替文字意義</p>
          </div>
        )}
      </section>
      <section className="advanced w-full mb-10">
        <Banner title="Advanced" type="medium" />
        {chatPowerChart && (
          <ChartContainer title="說話強度" loading={loading}>
            <Line data={chatPowerChart} />
          </ChartContainer>
        )}
        {mediaPowerChart && (
          <ChartContainer title="媒體強度" loading={loading}>
            <Line data={mediaPowerChart} />
          </ChartContainer>
        )}
        {chatDensityChart && (
          <div>
            <ChartContainer title="對話密度" loading={loading}>
              <Line data={chatDensityChart} />
            </ChartContainer>
            <div className="text-text">
              <p>
                <span className="text-message-500">對話組數</span>
                ：連續性對話計算單位，定義為「相同使用者，與前一筆訊息相鄰10分鐘內之集合」
              </p>
              <p>
                <span className="text-call-500">對話回合數</span>
                ：沒有長時間離開或閒置的對話計算單位，定義為「不論使用者，與前一筆訊息相鄰3小時內之集合」
              </p>
              <p>
                ※ 當<span className="text-call-500">對話回合數</span>
                明顯大於<span className="text-message-500">對話組數</span>
                ，表示每次都只傳送少許訊息
              </p>
            </div>
          </div>
        )}
        {contactPeriodPieChart && (
          <ChartContainer title="訊息時段" loading={loading} center={true}>
            <Pie data={contactPeriodPieChart} />
          </ChartContainer>
        )}
      </section>
    </div>
  );
}

export default Analysis;
