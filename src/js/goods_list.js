$(function () {



     // 1 发送请求需要的参数对象 全局变量 方便修改
     let QueryObj = {
          // 查询的关键字 可以为空  根据 小米  华为 。。。。
          query: "",
          // 分类页面中的每一个小商品的分类id
          // 获取 url上的参数 cid的值
          cid: getUrl('cid'),
          // 页码
          pagenum: 1,
          // 页容量  一页可以存放几条数据
          pagesize: 10
     }

     // 2 总页码 是在发送请求成功了 才能 正确的赋值
     let TotalPage = 1;

     init();

     function init() {
          mui.init({
               pullRefresh: {
                    container: ".pyg_view",
                    down: {
                         auto: true,
                         //  触发下拉刷新时自动触发
                         callback: function () {
                              let cb = function (data) {
                                   var html = template("mainTpl", {
                                        arr: data
                                   });
                                   $('.goods_list').html(html);
                                   // 结束下拉刷新
                                   mui('.pyg_view').pullRefresh().endPulldownToRefresh();
                              }
                              // 重置页码,变成第一页
                              QueryObj.pagenum = 1;
                              // 重置 上拉组件
                              mui('.pyg_view').pullRefresh().refresh(true);
                              goodsSearch(cb)

                         }
                    },
                    up: {
                         //  触发上拉刷新时自动触发
                         callback: function () {
                              if (QueryObj.pagenum >= TotalPage) {
                                   console.log("没有数据了");
                                   mui('.pyg_view').pullRefresh().endPullupToRefresh(true);
                              } else {
                                   console.log("还有数据哦");
                                   QueryObj.pagenum++;
                                   let cb = function (data) {
                                        var html = template("mainTpl", {
                                             arr: data
                                        });
                                        $('.goods_list').append(html);
                                        // 结束上拉刷新
                                        mui('.pyg_view').pullRefresh().endPullupToRefresh(false);
                                   }

                                   goodsSearch(cb);
                              }
                         }
                    }
               }
          });


     }

     // function eventList() {
     //  $('.list').on("tap", "a", function () {
     //   let href = this.href;
     //   location.href = href;
     //  })
     // }


     // 获取商品列表页的数据
     function goodsSearch(func) {
          // console.log(123);
          $.get("http://api.pyg.ak48.xyz/api/public/v1/goods/search", QueryObj, function (result) {
               if (result.meta.status == 200) {
                    console.log(result);

                    var data = result.data.goods
                    // 计算总条数
                    TotalPage = Math.ceil(result.data.total / QueryObj.pagesize)
                    console.log(TotalPage);

                    func(data)
                    // var html = template("mainTpl", {arr: data});
                    // $('.goods_list').html(html);
                    // // 结束下拉刷新
                    // mui('.pyg_view').pullRefresh().endPulldownToRefresh();
               }

          })
     }











     // 获取url上的参数 的值
     function getUrl(name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
          var r = window.location.search.substr(1).match(reg);
          if (r != null) return decodeURI(r[2]);
          return null;
     }
})