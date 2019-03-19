<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>主页面</title>
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/page/css/font.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/page/css/xadmin.css">
	    <script type="text/javascript" src="${pageContext.request.contextPath}/page/js/jquery-1.12.4.js" ></script>
	    <script src="${pageContext.request.contextPath}/page/lib/layui/layui.js" charset="utf-8"></script>
	    <script type="text/javascript" src="${pageContext.request.contextPath}/page/js/xadmin.js"></script>
</head>
<body>
<!-- 顶部开始 -->
 <div id='top' class="container">
     <div class="logo"><a href="./index.html">个人后台管理 v1.0</a></div>
     <div class="left_open">
         <i title="展开左侧栏" class="iconfont">&#xe699;</i>
     </div>
 </div>
 <!-- 顶部结束 -->
 <!-- 中部开始 -->
  <!-- 左侧菜单开始 -->
 <div class="left-nav">
   <div id="side-nav"></div>
 </div>
 <!-- <div class="x-slide_left"></div> -->
 <!-- 左侧菜单结束 -->
 <!-- 右侧主体开始 -->
 <div class="page-content">
     <div class="layui-tab tab" lay-filter="xbs_tab" lay-allowclose="false">
       <ul class="layui-tab-title">
         <li class="home"><i class="layui-icon">&#xe68e;</i>我的桌面</li>
       </ul>
       <div class="layui-tab-content">
         <div class="layui-tab-item layui-show">
             <iframe src='' frameborder="0" scrolling="yes" class="x-iframe"></iframe>
         </div>
       </div>
     </div>
 </div>
 <div class="page-content-bg"></div>
 <!-- 右侧主体结束 -->
 <!-- 中部结束 -->
 <!-- 底部开始 -->
 <div class="footer">
     <div class="copyright">Copyright ©2019 JiangC v1.0 All Rights Reserved</div>  
 </div>
 <!-- 底部结束 -->
 <script type="text/javascript" src="${pageContext.request.contextPath}/page/js/home/home.js" ></script>
 <script>
 $.ajax({
	    url:"${pageContext.request.contextPath}/main.do",    //请求的url地址
	    /* dataType:"json",   //返回格式为json */
	    async:false,//请求是否异步，默认为异步，这也是ajax重要特性
	   /*  data:{"id":"value"},    //参数值 */
	    type:"GET",   //请求方式
	    beforeSend:function(){
	        //请求前的处理
	    },
	    success:function(req){
	    	
	    	var nav = new treeNav('side-nav');
	    	nav.init(JSON.parse(req));
	    },
	    complete:function(){
	        //请求完成的处理
	    },
	    error:function(){
	        //请求出错处理
	    }
	});
 	
 </script>
</body>
</html>