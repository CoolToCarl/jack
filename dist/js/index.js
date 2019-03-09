"use strict";

$(function () {
  // 获取首页轮播图的数据
  swiperdata(); // 获取分页导航数据

  catitems();
});

function init() {
  // 初始化轮播图
  var gallery = mui(".mui-slider");
  gallery.slider({
    interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；

  });
} // 获取首页轮播图的数据


function swiperdata() {
  $.ajax({
    url: "http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata",
    type: "get",
    success: function success(result) {
      //  判断请求是否成功
      if (result.meta.status === 200) {
        // 获取要渲染的数据 data=[]
        var data = result.data; // 生成要渲染的html标签

        var html = template("swiperTpl", {
          arr: data
        }); // console.log(html);
        // 把标签插入到 轮播图的 div中

        $(".pyg_slide").html(html); // 初始化轮播图

        init();
      } else {
        console.log("请求失败", result);
      }
    }
  });
}

function catitems() {
  $.get("http://api.pyg.ak48.xyz/api/public/v1/home/catitems", function (result) {
    if (result.meta.status == 200) {
      var data = result.data;
      var html = "";

      for (var i = 0; i < data.length; i++) {
        // console.log(data[i]);
        var tmpHtml = "\n        <a href=\"javascript:;\"><img src=\"".concat(data[i].image_src, "\" alt=\"\"/></a>\n        ");
        html += tmpHtml;
      } // console.log(html);
      // 把分类的标签 插入到  容器中


      $(".pyg_cates").html(html);
    } else {
      console.log("请求失败", result);
    }
  });
}
//# sourceMappingURL=index.js.map
