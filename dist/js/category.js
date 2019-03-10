"use strict";

$(function () {
  var categoryData;
  init();

  function init() {
    // 获取分类页数据列表
    categories(); // 一堆事件

    eventList();
  }

  function eventList() {
    // 左侧菜单的点击事件  委托 委派
    $(".left_menu").on("click", "li", function () {
      $(this).addClass("active").siblings().removeClass("active"); // 获取 被点击的li标签的索引 

      var index = $(this).index();
      rightData(index);
    });
  }

  function categories() {
    // console.log(123);
    $.get("http://api.pyg.ak48.xyz/api/public/v1/categories", function (res) {
      // console.log(res)
      if (res.meta.status) {
        categoryData = res.data; // console.log(data);
        // 分类页左边数据

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
  } // 获取分类页右边数据


  function rightData(index) {
    var data = categoryData[index].children;
    var html = template("leftdata", {
      arr: data
    });
    $(".right").html(html);
  }
});
//# sourceMappingURL=category.js.map
