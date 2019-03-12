"use strict";

$(function () {
  /**
   * 业务: 
   *     1.轮播图
   *     2.数据渲染
   *     3,滚动事件
   *     4.点击事件
   *     5.左右结构获取事件
   *     6.缓存数据
   */
  var categoryData;
  init();

  function init() {
    // 获取分类页数据列表
    renderDatas(); // 一堆事件

    eventList();
  }

  function eventList() {
    // 左侧菜单的点击事件  委托 委派
    $(".left_menu").on("click", "li", function () {
      $(this).addClass("active").siblings().removeClass("active"); // 获取 被点击的li标签的索引 

      var index = $(this).index();
      rightData(index);
    });
  } // 缓存数据


  function renderDatas() {
    // 先获取会话存储中的数据  null  有数据的时候 字符串类型
    var sessStr = sessionStorage.getItem("cates");

    if (!sessStr) {
      // 没有数据  发送请求来获取新数据
      categories();
    } else {
      // 把缓存数据 重新解析成 对象格式
      var sessObj = JSON.parse(sessStr); // console.log(Date.now() - sessObj.time);

      if (Date.now() - sessObj.time > 5000) {
        console.log("数据过期了 需要重新发送请求获取数据");
        categories();
      } else {
        console.log("数据未过期 可以使用 渲染数据"); // 获取旧的要渲染的数据

        categoryData = sessObj.data; // 分类页左边数据

        leftData(); // 分类页右边数据

        rightData(0);
      }
    }
  }

  function categories() {
    // console.log(123);
    $.get("http://api.pyg.ak48.xyz/api/public/v1/categories", function (res) {
      // console.log(res)
      if (res.meta.status) {
        categoryData = res.data; // console.log(data);
        // 存入 接口的数据  CateDatas=[]   {data:CateDatas,time:当前的时间} 
        //  把对象先转成  json 对象

        var sessionObj = {
          data: categoryData,
          time: Date.now()
        };
        sessionStorage.setItem("cates", JSON.stringify(sessionObj)); // 分类页左边数据

        leftData(); // 分类页右边数据

        rightData(0);
      }
    });
  } // 获取分类页左边数据


  function leftData() {
    var html = "";

    for (var i = 0; i < categoryData.length; i++) {
      var tmpHtml = "\n   <li class=\"".concat(i == 0 ? ' active' : '', "\">").concat(categoryData[i].cat_name, "</li>\n  ");
      html += tmpHtml;
    }

    $(".left_menu").html(html);
    var leftScroll = new IScroll('#wrapper');
  } // 获取分类页右边数据


  function rightData(index) {
    var data = categoryData[index].children;
    var html = template("leftdata", {
      arr: data
    });
    $(".right").html(html); // 获取要动态渲染的图片的长度

    var imgLength = $(".right img").length;
    $('.right img').on('load', function () {
      imgLength--;
      var rightScroll = new IScroll('.right');
    });
  }
});
//# sourceMappingURL=category.js.map
