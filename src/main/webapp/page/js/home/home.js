(function(home){
	
	var _this = null;
	/*菜单导航栏模块*/
	var treeNav = function(id){
		this.id = id;
		_this  = this;
	}
	
	treeNav.prototype = {
		//初始化
		init:function(data){
			//数据形成树型结构
			var tree_data = generateTree(data);
			//生成HTML文本
			var $ul = generateHtml(tree_data);
			//最后追加到初始化的id节点上
			$ul.appendTo($('#'+_this.id));
		}
	}
	
	/*根据树形数据生成HTML文本*/
	function generateHtml(data){
		//构造ul作为div的子元素
		var $ul = $("<ul id='nav'></ul>");
		var that = this;
		//循环遍历树形数组
		for(var i=0;i<data.length;i++){
			//构造li
			var $li = $("<li><a href=\"javascript:;\" data-id="+data[i].id+"><i class=\"iconfont\">&#xe6b8;</i><cite>"+data[i].name+"</cite><i class=\"iconfont nav_right\">&#xe697;</i></a></li>");
			$li.click(function(e){navClickEvent($(this),e);});
			//如果还有子元素，构造新的子节点
			if(typeof data[i].children != 'undefined' &&data[i].children.length>0){
				var li = createNodes($li,data[i].children);
				//将li追加到ul集合里
				$ul.append(li);
			}
		}
		return $ul;
	}
	
	/*构造新的子节点*/
	function createNodes(li,data){
		//构造li下面的ul
		var $ul = $("<ul class=\"sub-menu\"></ul>");
		//遍历data，构造li,追加到ul集合
		for(var i=0;i<data.length;i++){
			//构造li,判断是否是叶子节点，如果是叶子节点，则加上href
			//不是叶子节点，则不打开页面
			if(typeof data[i].children != 'undefined' &&data[i].children.length>0){
				var $li = $("<li><a href=\"javascript:;\" data-id="+data[i].id+"><i class=\"iconfont\">&#xe70b;</i><cite>"+data[i].name+"</cite><i class=\"iconfont nav_right\">&#xe697;</i></a></li>");
				$li.click(function(e){navClickEvent($(this),e);});
				//递归子节点
				createNodes($li,data[i].children);
			}else{
				var $li = $("<li><a _href='"+data[i].url+"' data-id="+data[i].id+"><i class=\"iconfont\">&#xe6a7;</i><cite>"+data[i].name+"</cite></a></li >");
				$li.click(function(e){navClickEvent($(this),e);});
			}	
			//追加到ul
			$ul.append($li);
		}
		//最后将构造好的子节点ul追加到上一级li
		li.append($ul);
		return li;
	}
	
	
	/*将初始化数据生成树形结构,返回值为数组格式*/
	function generateTree(data){
		var ptree = [];
	    /*var tree = [];*/
	    for (var i = 0; i < data.length; i++) {
	        if (data[i].pid === "0" ||data[i].pid === 0) {//获取父元素
	            let o = sonsTree(data[i], data);
	            ptree.push(o);
	        }
	    }
	    /*console.info(ptree);*/
	    return ptree;
	}
	
	/*子元素递归*/
	function sonsTree(obj, arr) {
	    var children = new Array();
	    for (var i = 0; i < arr.length; i++) {
	        if (arr[i].pid === obj.id) {  //pid等于加入数组
	            sonsTree(arr[i], arr);//递归出子元素
	            arr[i].pname=obj.name;
	            children.push(arr[i]);
	        }
	    }
	    if (children.length > 0) {
	        obj.children = children;
	    }
	    return obj;
	}
	
	home.treeNav = treeNav;
	/*侧边导航栏模块结束*/
	
	/*头部模块*/
	var top_id = null;
	function homeTop(id){
		top_id = id;
	}
	homeTop.prototype = {
		/*初始化左边*/
		initLeft : function (data){
			//将数据形成树型结构
			var tree_data = generateTree(data);
			//构造ul
			var $ul = $("<ul class=\"layui-nav left fast-add\" ></ul>");
			$ul = initTopMenu($ul,tree_data);
			//追加到大容器的后面
			$ul.appendTo($("#"+top_id));
		},
		/*初始化右边*/
		initRight : function (data){
			var tree_data = generateTree(data);
			//构造ul
			var $ul = $("<ul class=\"layui-nav right\" ></ul>");
			$ul = initTopMenu($ul,tree_data);
			//追加到大容器的后面
			$ul.appendTo($("#"+top_id));
		}
	}
	
	/*初始化左边*/
	function initTopMenu(ul,data){
		//循环遍历数据
		for(var i=0;i<data.length;i++){
			/*构造li*/
			 var $li = $("<li class=\"layui-nav-item\"><a href=\"javascript:;\">"+data[i].name+"</a></li>");
			 //如果有子元素，进行拼接
			 if(typeof data[i].children != 'undefined' &&data[i].children.length>0){
			 	var $dl = initSubitem(data[i].children);
			 	$li.append($dl);
			 }
			 ul.append($li);
		}
		return ul;		
	}
	
	
	/*构造二级菜单*/
	function initSubitem(data){
		/*构造dl标签,用来包裹二级菜单*/
		var $dl = $("<dl class=\"layui-nav-child\">");
		for(var i=0;i<data.length;i++){
			/*如果数据有图标*/
			if(typeof data[i].icon !='undefined'){
				var icon = data[i].icon;
			}else{
				var icon = "";
			}
			/*构造dd标签，用来展示二级菜单*/
			$("<dd><a onclick=\"x_admin_show('"+data[i].name+"','"+data[i].url+"')\"><i class=\"iconfont\">"+icon+"</i>"+data[i].name+"</a></dd>").appendTo($dl);
		}
		return $dl;
	}
	home.homeTop = homeTop;
	/*头部菜单模块结束*/
	
	/*事件模块（从上到下）*/
	/*隐藏侧边导航栏事件*/
	$('.container .left_open i').click(function(event) {
		//如果侧导航栏显示，以动画的方式隐藏
        if($('.left-nav').css('left')=='0px'){
        	//侧导航栏以100毫秒的时间以动画的方式从原来的位置移动到left：-221px的位置上
            $('.left-nav').animate({left: '-221px'}, 100);
            //页面内容则以100毫秒的时间以动画的方式从原来的位置移动到left：0px的位置上
            $('.page-content').animate({left: '0px'}, 100);
            $('.page-content-bg').hide();
        //如果导航栏隐藏了，则以动画的方式展开
        }else{
            $('.left-nav').animate({left: '0px'}, 100);
            $('.page-content').animate({left: '221px'}, 100);
            if($(window).width()<768){
                $('.page-content-bg').show();
            }
        }
    });
    
   	 /*侧边导航栏点击事件*/
   	function navClickEvent(obj,event){
   		//收起最外面不是该元素的祖先元素，保证打开的只有一个祖先元素下的菜单
   		//如果当前点击的不是祖先元素，则收起祖先的兄弟元素
   		if(obj.parents(".left-nav #nav>li").length>0){		
   			obj.parents(".left-nav #nav>li").siblings().removeClass("open").children('.sub-menu').stop().slideUp();
   		//如果是点击的是祖先元素，则将该元素的兄弟元素收起即可。
   		}else{
   			obj.siblings().removeClass("open").children('.sub-menu').stop().slideUp();
   		}
   		
   		//判断是否含有子菜单，如果有，则展开，没有则，打开该页面，同时选项卡打开
   		if(obj.children('.sub-menu').length>0){
   			//判断子菜单是否已经展开，如果已经展开，再点击，则收起
   			if(obj.hasClass('open')){
   				obj.removeClass("open");
   				//改变展开收起图标
   				obj.find('.nav_right').html('&#xe697;');
   				//子菜单收起
   				obj.children('.sub-menu').stop().slideUp();	
   			}else{
   				obj.addClass('open');
   				obj.children('a').find("nav_right").html('&#xe6a6;');
   				//展开
   				obj.children('.sub-menu').stop().slideDown();
   			}
   		//如果没有子菜单，则是叶子菜单，打开该页面，同时选项卡打开
   		}else{
   			//获取要转到页面URL
   			var _url = obj.children("a").attr("_href");
   			//获取选项卡的标题
   			var _title = obj.find("cite").html();
   			//获取当前菜单在.left-nav #nav li集合中的索引
   			var index  = $('.left-nav #nav li').index(obj);
			//遍历已经打开的选项卡页面，
            for (var i = 0; i <$('.x-iframe').length; i++) {
            	//如果存在选项卡页面的tab-id等于索引值index
                if($('.x-iframe').eq(i).attr('tab-id')==index+1){
                	//则跳到相应的选项开页面
                    tab.tabChange(index+1);
                    event.stopPropagation();
                    return;
                }
            };
            //如果不存在选项卡页面的tab-id等于索引值index，则在tab栏新添加有个选项卡，并打开对应的页面
            tab.tabAdd(_title,_url,index+1);
            //聚焦相应的选项卡
            tab.tabChange(index+1);
   		}
   		//阻止事件冒泡
   		event.stopPropagation();
   	}
   	
   	/*$(".left-nav #nav li").live('click',function(event){
   		//判断是否含有子菜单，如果有，则展开，没有则，打开该页面，同时选项卡打开
   		if($(this).children('.sub-menu')){
   			//判断子菜单是否已经展开，如果已经展开，再点击，则收起
   			if($(this).hasClass('open')){
   				$(this).removeClass("open");
   				//改变展开收起图标
   				$(this).find('.nav_right').html('&#xe697;');
   				//子菜单收起
   				$(this).children('.sub-menu').stop().slideUp();	
   			}else{
   				$(this).addClass('open');
   				$(this).children('a').find("nav_right").html('&#xe6a6;');
   				//展开
   				$(this).children('.sub-menu').stop().slideDown();
   			}
   		//如果没有子菜单，则是叶子菜单，打开该页面，同时选项卡打开
   		}else{
   			//获取要转到页面URL
   			var _url = $(this).children("a").attr("_href");
   			//获取选项卡的标题
   			var _title = $(this).find("cite").html();
   			var _id = $(this).attr("data-id");
   			//调用打开选项卡方法
   			layuiModule.tab.tabAdd(_title,_url,_id);
   		}
   	});*/
	
	
	//加载弹出层
    layui.use(['form','element'],
    function() {
        layer = layui.layer;
        element = layui.element;
    });

    //触发事件
	  var tab = {
	        tabAdd: function(title,url,id){
	          //新增一个Tab项
	          element.tabAdd('xbs_tab', {
	            title: title 
	            ,content: '<iframe tab-id="'+id+'" frameborder="0" src="'+url+'" scrolling="yes" class="x-iframe"></iframe>'
	            ,id: id
	          })
	        }
	        ,tabDelete: function(othis){
	          //删除指定Tab项
	          element.tabDelete('xbs_tab', '44'); //删除：“商品管理”
	          
	          
	          othis.addClass('layui-btn-disabled');
	        }
	        ,tabChange: function(id){
	          //切换到指定Tab项
	          element.tabChange('xbs_tab', id); //切换到：用户管理
	        }
	   };
	
	
	
})(this)
