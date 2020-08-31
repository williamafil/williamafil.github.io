// 轉換 ISO 格式 ＋ 修正 TimezoneOffset 時區偏移
function toISOLocal(d) {
  var z  = n =>  ('0' + n).slice(-2);
  var zz = n => ('00' + n).slice(-3);
  var off = d.getTimezoneOffset();
  var sign = off < 0? '+' : '-';
  off = Math.abs(off);

  return d.getFullYear() + '-'
    + z(d.getMonth()+1) + '-' +
    z(d.getDate()) + 'T' +
    z(d.getHours()) + ':'  + 
    z(d.getMinutes()) + ':' +
    z(d.getSeconds()) + '.' +
    zz(d.getMilliseconds()) +
    sign + z(off/60|0) + ':' + z(off%60); 
}

function dataSetFormat(d) {
  let year = d.getFullYear();
  let month = d.getMonth()+1;
  let day = d.getDate();

  if (day < 10) {
    day = `0${day}`;
  }

  if (month < 10){
    month = `0${month}`;
  }

  return [year, month, day].join("-");
}

function formatDate(d) {
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();

  if (day < 10) {
    day = `0${day}`;
  }

  if (month < 10){
    month = `0${month}`;
  }
  return `${year}-${month}-${day}`;
}

  // 取下一個日期
  const addDays = (date, days = 1) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  
  // recursive fuction: put date range into array
  const dateRange = (start, end, range = []) => {
    if (start > end) return range;
    const next = addDays(start, 1);
    return dateRange(next, end, [...range, start]);
  };