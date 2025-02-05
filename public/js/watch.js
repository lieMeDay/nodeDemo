$(function(){
  var week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  var timerID = setInterval(updateTime, 1000);
  updateTime();
  function updateTime() {
      var cd = new Date();
      var time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
      var date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
      $('.date').html(date)
      $('.time').html(time)
    };

  function zeroPadding(num, digit) {
      var zero = '';
      for (var i = 0; i < digit; i++) {
          zero += '0';
      }
      return (zero + num).slice(-digit);
  }
})