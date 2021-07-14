// window.onload = function () {
//   banner();
//  }
  
 //轮播图
 export function banner(){
  /*1.设置修改轮播图的页面结构
  * a.在开始位置添加原始的最后一张图片
  * b.在结束位置添加原始的第一张图片*/
  /*1.1.获取轮播图结构*/
  var banner=document.querySelector(".jd_banner");
  /*1.2.获取图片容器*/
  var imgBox=banner.querySelector("ul:first-of-type");
  //1.3 获取第一张图片
  var first=imgBox.querySelector("li:first-of-type");
  //1.4获取最后一张图
  var last=imgBox.querySelector("li:last-of-type");
  // console.log(first);
  // console.log(last);
  //克隆添加图片
  /*1.5.在首尾插入两张图片 cloneNode:复制一个dom元素*/
  imgBox.appendChild(first.cloneNode(true));
  /*1.6insertBefore(需要插入的dom元素，位置)*/
  imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);
  //获取对应的样式
  //2.1获取li的位置
  var lis=imgBox.querySelectorAll("li");
  /*2.2 获取li元素的数量*/
  var count=lis.length;
  /*2.3.获取banner的宽度*/
  var bannerWidth=banner.offsetWidth;
  /*2.4 设置图片盒子的宽度*/
  imgBox.style.width=count*bannerWidth+"px";
  /*2.5 设置每一个li(图片)元素的宽度*/
  for(var i=0; i < lis.length;i++){
  lis[i].style.width=bannerWidth+"px";
  }
  /*定义图片索引:图片已经有一个宽度的默认偏移*/
  var index=1;
  /*3.设置默认的偏移*/
  imgBox.style.left=-bannerWidth+"px";
  /*4.当屏幕变化的时候，重新计算宽度*/
  window.onresize=function(){
   bannerWidth=banner.offsetWidth+"px";
   imgBox.style.width=count*bannerWidth+"px";
   for(var i = 0; i < lis.length;i++){
   lis[i].style.width=bannerWidth+"px";
   }
   imgBox.style.left=-index*bannerWidth+"px";
  }
  //自动轮播
  var timerId;
  var strtime=function(){
   timerId=setInterval(function(){
   index++;
   //添加过度效果
   imgBox.style.transition="left 0.5s ease-in-out"
   //设置偏移量
   imgBox.style.left=(-index*bannerWidth)+"px";
   setTimeout(function(){
   //当走到最后一张时候,我就让他等于最后一张
   if(index==count-1){
    index=1;
    // 清除过度效果
    imgBox.style.transition="none";
    /*偏移到指定的位置*/
    imgBox.style.left=(-index*bannerWidth)+"px";
   }
   },500)
   },1500)
  }
  //自动播放调用
  strtime();
  //实现手动轮播
  var startX,moveX,distanceX;
  /*为图片添加触摸事件--触摸开始*/
  var isEnd = true; 
  imgBox.addEventListener("touchstart",function(e){
   //停止定时器
  clearInterval(timerId);
  //console.log(e);
  startX=e.targetTouches[0].clientX; 
  });
  //为图片添加触摸过程,滑动图片
  imgBox.addEventListener("touchmove",function(e){
  if(isEnd==true){
   //console.log(123);
    
   /*记录手指在滑动过程中的位置*/
  moveX=e.targetTouches[0].clientX;
  /*计算坐标的差异*/
  distanceX=moveX-startX;
  //清除过度效果
  imgBox.style.transition="none";
  //基于之前轮播图偏移的位置
  imgBox.style.left=(-index*bannerWidth + distanceX)+"px";
  }
  })
  /*添加触摸结束事件*/
  imgBox.addEventListener("touchend",function(e){
   //获取滑动距离,判断是否超过100px
   isEnd=false;
   if(Math.abs(distanceX) > 50){
   //判断滑动方向
   if(distanceX > 0){//上一张
   index--;
   }else{//下一张
    index++;
   }
   //过度效果
   imgBox.style.transition="left 0.5s ease-in-out";
   //偏移位置
   imgBox.style.left=-index*bannerWidth+"px";
   }else if(Math.abs(distanceX) > 0){//回弹效果
   //过度效果
   imgBox.style.transition="left 0.5s ease-in-out";
   //偏移位置
   imgBox.style.left=-index*bannerWidth+"px";
   }
   /*将上一次move所产生的数据重置为0*/
  startX=0;
  moveX=0;
  distanceX=0;
   
  });
  /*webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕的时候，会触发这个事件*/
  imgBox.addEventListener("webkitTransitionEnd",function(){
  //  console.log(index,33333);
    
  /*如果到了最后一张(count-1)，回到索引1*/
  /*如果到了第一张(0)，回到索引count-2*/
  if(index==count-1){
   index=1;
   imgBox.style.transition="none";
   imgBox.style.left=-index*bannerWidth+"px";
  }else if(index==0){
   index=count-2;
   imgBox.style.transition="none";
   imgBox.style.left=-index*bannerWidth+"px";
  }
  yuandian(index);
  setTimeout(function () {
   isEnd=true;
   clearInterval(timerId);
   strtime();
   },100)
  });
  
  // //圆点排他
  var yuandian=function (index) {
  //先找到所有的li 进行遍历移除所有样式,为自己加上样式
  var lis=banner.querySelector("ul:last-of-type").querySelectorAll("li");
  for(var i = 0; i < lis.length; i++){
   lis[i].classList.remove("active");
  }
  lis[index-1].classList.add("active");
  }
   
  
 }