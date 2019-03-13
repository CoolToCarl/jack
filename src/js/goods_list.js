$(function () {
 // 获取url上的参数 的值
 function getUrl(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
 }


 // 1 发送请求需要的参数对象 全局变量 方便修改
 let QueryObj = {
  // 查询的关键字 可以为空  根据 小米  华为 。。。。
  query: "",
  // 分类页面中的每一个小商品的分类id
  // 获取 url上的参数 cid的值
  cid: getUrl("cid"),
  // 页码
  pagenum: 1,
  // 页容量  一页可以存放几条数据
  pagesize: 10
 }

 // 2 总页码 是在发送请求成功了 才能 正确的赋值
 let TotalPage = 1;

 init();

 function init() {
  // eventList();
  goodsSearch();

 }

 function eventList() {
  $('.list').on("tap", "a", function () {
   let href = this.href;
   location.href = href;
  })
 }


 // 获取商品列表页的数据
 function goodsSearch() {
  // console.log(123);
  $.get("http://api.pyg.ak48.xyz/api/public/v1/goods/search", QueryObj, function (result) {
   if (result.meta.status == 200) {
    console.log(result);
    var html = template('mainTpl', {
     arr: result.data.goods
    })
    // console.log(html);
    $('.goods_list').html(html)

   }

  })




 }



















})