"use strict";

$(function () {
  init();

  function init() {
    // 获取分类页数据列表
    categories();
  }

  function categories() {
    // console.log(123);
    $.get("http://api.pyg.ak48.xyz/api/public/v1/categories", function (res) {
      // console.log(res)
      if (res.meta.status) {
        console.log(res.data);
      }
    });
  }
});
//# sourceMappingURL=category.js.map
