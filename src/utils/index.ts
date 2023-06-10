import moment from "moment";

export const dateRangeSetter = (parseChat: any) => {
  return [
    {
      key: "nearlyYear",
      label: "近一年",
      checked: false,
      startDate: moment().subtract(1, "years").format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    },
    {
      key: "thisYear",
      label: "今年",
      checked: false,
      startDate: moment().startOf("year").format("YYYY-MM-DD"),
      endDate: moment().endOf("year").format("YYYY-MM-DD"),
    },
    {
      key: "lastYear",
      label: "去年",
      checked: false,
      startDate: moment()
        .subtract(1, "years")
        .startOf("year")
        .format("YYYY-MM-DD"),
      endDate: moment().subtract(1, "years").endOf("year").format("YYYY-MM-DD"),
    },
    {
      key: "all",
      label: "全部",
      checked: true,
      startDate: moment(parseChat.minDate).format("YYYY-MM-DD"),
      endDate: moment(parseChat.maxDate).format("YYYY-MM-DD"),
    },
  ];
};
