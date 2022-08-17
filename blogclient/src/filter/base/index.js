/**
 *
 * @param {String} value
 */
function videoTime(value) {
  let result = "";
  let hour = parseInt(value / 3600);
  let minute = parseInt((value % 3600) / 60);
  let second = Math.ceil(value % 60);
  if (hour > 0) {
    result += `${hour}:`;
  }
  if (minute > 0) {
    result += `${minute}:`;
  }
  result += `${second}`;
  return result;
}
/**
 *
 * @param {String} value
 */
function timeFitter(value) {
  let json_date = new Date(value).toJSON();
  let result;
  result = new Date(new Date(json_date) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");
  let now = new Date().getTime();
  let needDeal = new Date(value).getTime();
  if (now - needDeal < 1000 * 60) {
    return "1分钟内";
  }
  if (now - needDeal < 1000 * 60 * 5) {
    return "5分钟内";
  }
  if (now - needDeal < 1000 * 60 * 30) {
    return "30分钟内";
  }
  if (now - needDeal < 1000 * 60 * 60) {
    return "1小时内";
  }
  if (now - needDeal < 1000 * 60 * 60 * 3) {
    return "3小时内";
  }
  if (now - needDeal < 1000 * 60 * 60 * 12) {
    return "1天内";
  }
  if (now - needDeal < 1000 * 60 * 60 * 12 * 2) {
    return "2天内";
  }
  if (now - needDeal < 1000 * 60 * 60 * 12 * 3) {
    return "3天内";
  }
  if (now - needDeal < 1000 * 60 * 60 * 12 * 7) {
    return "1周内";
  }
  return result
}
const filters = [
  {
    name: "videoTime",
    fun: videoTime
  },
  {
    name: "timeFitter",
    fun: timeFitter
  }
];
export { filters };
