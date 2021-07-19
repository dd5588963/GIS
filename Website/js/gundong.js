//消息内容，可以任意长度
let arr = ["消息1 : 2006年1月John Resig等人创建了jQuery", "消息2 : 2007年7月，jQuery 1.1.3版发布", "消息3 : 2008年5月，jQuery 1.2.6版发布", "消息4 : 2010年1月，也是jQuery的四周年生日"];

var settings = {
  speeds: 50, //滚动的速度,单位ms
  isPause: true, //滚动后每个消息是否需要暂停，true和false,
  isHover:true, //鼠标悬停是否需要暂停
};

var ul = document.querySelector("ul");
//渲染数据
arr.forEach((item) => {
  var li = document.createElement("li");
  li.innerHTML = item;
  ul.appendChild(li);
});
//获取当前滚动的高度，支持ie请自行使用currentStyle
var currentTop = parseInt(window.getComputedStyle(ul).top);

//滚动函数
function run() {
  currentTop--;
  ul.style.top = currentTop + "px";
  
  //当页面滚动最后一个时，把第一个复制push到尾部
  if (currentTop == (arr.length - 1) * -50) {
    let li = document.createElement("li");
    li.innerHTML = arr[0];
    ul.appendChild(li);
  }

  //无缝替换
  if (currentTop == arr.length * -50) {
    currentTop = 0;
    ul.style.top = currentTop + "px";
    var li = document.querySelectorAll("li");
    ul.removeChild(li[li.length - 1]);
  }

  //滚动后每个消息是否需要暂停
  if (settings.isPause) {
    if (currentTop % 50 == 0) {
      clearInterval(timer);
      setTimeout(function () {
        timer = setInterval(run, settings.speeds);
      }, 3000);
    }
  }
}
var timer = setInterval(run, settings.speeds);

//鼠标悬停是否需要暂停
ul.onmouseover = function () {
    if(settings.isHover){
        clearInterval(timer);
    }
};
ul.onmouseleave = function () {
    if(settings.isHover){
        timer = setInterval(run, settings.speeds);
    }
};
