var _map = null;
var areaTable = null;
var vtpTable = null;
var pziphonecount = 1;
var centermap_x = 114.29901;//120.15625;
var centermap_y = 30.6;//30.30859;
var map_level = 13;
var yyy;
var rightSlip;
var areaarr1= new Array();
var areaarr2= new Array();
var zoomchange;
var panend;
var pan;
var mouseup;
var gridnum = 5;
var divwidth;
var divheight;
var isclick = false;
var crashdayinfo;
var timecrashdata;
var crashHeight;//存储变化后的碰撞卡片高度
var map;

$(function(){

	map = initMap();
	$('.clearArea').click(function(e){
		var tmparea =areaarr1.pop();	
		_map.uEzMap.removeOverlay(areaarr2.pop());
	});

})


/**
 * 清除
 */
function clean() {
	$('#echart_wrap').hide()
	_map.uEzMap.clear();
	
	//rightSlip.slipIn();
	
	//清除地图叠加对象
	_map.uEzMap.clearOverlays(true);
	
	//清空地图查询结果集
	_map.uEzMap.clearLayers();
	
	//滑窗清空
	//rightSlip.msg.innerHTML = "";
	
	//判断是否为动态轨迹
	_map.trackStop();
	//cleanTrack();//track_search.js方法,清楚轨迹线
	//清除地图绑定事件
	if(mouseup){
		_map.uEzMap.removeMapEventListener(mouseup);
	}
	//解除网格绑定事件
	if(zoomchange&&pan&&panend){
		_map.uEzMap.removeMapEventListener(zoomchange);
	    _map.uEzMap.removeMapEventListener(pan);
		_map.uEzMap.removeMapEventListener(panend);	 
	}
	//解除聚合绑定事件
//	if(clusterpanend&&clusterzoomend){
//		_map.uEzMap.removeMapEventListener(clusterpanend);
//	    _map.uEzMap.removeMapEventListener(clusterzoomend);
//	}
	hideAddImportantArea("#toShowGridDiv1");	
	isclick = false;
	//清除碰撞表单数据
	//$("#savemutilAreaForm > input:hidden").attr("value","");
	$("#savemutilAreaForm > input").each(function() {
		$(this).attr("value","");
	});
	$("#saveAreaForm > input").each(function(){
		$(this).attr("value","");
	});
	$("#timeCrashCellForm > input").each(function() {
		$(this).attr("value","");
	});
	
	
	var addAreaHtmla = '<a class="left addArea hide" href="#"></a>' +
		  '<span class="left areaResult crashCaption">在地图中设置碰撞区</span>' +
          '<span class="rightArrow left" id="rightArrow_span"></span>';
	//重置区域碰撞查询信息 hzq add 730
	//没有待选的区域
	if ($("#cashchoosea > li[class='areaItem clearfix']").length >=5) {
		$("#cashchoosea > li[class='areaItem clearfix']").remove();
		var beforeAddAreaHtmlo = '<li id="areaItem" class="areaItem beforeAreaAdd clearfix">'
			+ '<a href="#" class="left addArea"></a>'
			+ '<span class="left areaResult crashCaption">创建一个碰撞区域</span>'
			+ '</li>';
		$("#cashchoosea > li:first").before(beforeAddAreaHtmlo);
		$("#cashchoosea > li:first").bind('click', function() {
			$(this).removeClass('beforeAreaAdd').addClass('areaAdding').html(addAreaHtmla);
			$(this).unbind('click');
			// 调用区域的选择操作
			mupliAreaChoose();
		});
	} else {
		$("#cashchoosea > li[class='areaItem clearfix']").remove();
	}
	//重置时间碰撞查询信息
	if ($("#cashchooseb > li:first").attr("class") == "clearfix") {
		var beforeAddAreaHtmla = '<li id="timeAreaItem" class="beforeAreaAdd clearfix">'
			+ '<a href="#" class="left addArea"></a>'
			+ '<span class="left areaResult crashCaption">创建一个碰撞区域</span>'
			+ '</li>';
		$("#cashchooseb > li:first").remove();
		$("#cashchooseb > li:first").before(beforeAddAreaHtmla);
		$("#cashchooseb > li:first").bind('click', function() {
		
			$(this).removeClass('beforeAreaAdd').addClass('areaAdding').html(addAreaHtmla);
			$(this).unbind('click');
			// 调用区域的选择操作
			mupliAreaChoose();
		});
	}
	//清除查询结果 hzq add 720
	$('#crashCards , #trailCards , #pointCards , .active').html("");
}



/**
 * 方便其他界面得打map对象
 * @param map
 * @return
 */
function initMap(){
	
	if(_map==null){
	//	alert('initMap');
		//地图相关
		//1、加载地图
		var map = new EzSecurity(document.getElementById("mymap"));
		//2、设置中心点。因为使用的是google地图，所以需要从经纬度坐标转换到米（该处的经纬度坐标应该是pgis的经纬度坐标）
		//var center = map.pgis2GoogleMeter(new Point(80.1119,32.507586));
		//3、地图根据指定的点和级别进行对中101.53416,25.87732 ,昆明市102.8306,24.88369
		map.uEzMap.centerAndZoom(new Point(centermap_x,centermap_y),map_level);
		/**---------截止到此处，可以将地图展示在页面-------------*/
		//  设置鹰眼
		map.addOverview(200,200);
		//用来表示是否是google地图
		var bMapIsGoogle = true;
		
		
		
		//4、 添加地图事件处理函数
		map.uEzMap.addMapEventListener(EzEvent.MAP_MOUSEMOVE, function(e){
			//var google = new Google();
			//@FIXME 把Google墨卡托投影的米坐标转换成WGS84的经纬的坐标
			//var googlePoint = google.meterTolatlon(e.mapPoint.x,e.mapPoint.y)
			$("#coordiateNew").html("x="+e.mapPoint.x+","+"y="+e.mapPoint.y);
		});
		//圆形
		var circle = 'circle';
		//方形
		var square = 'square';
		//多边形
		var polygon = 'polygon';
		
		
		
//		//设置查询控件库操作
//		var CQLayerConfig = [];
//		if(ezMapData.length > 0){
//			var i=0;
//			$(ezMapData).each(function(){
//				CQLayerConfig[i] = {serverUrl:this['serverUrl'],
//				                   layer:this['layer'],
//				                   fields:this['fields'],
//				                   searchField:this['searchField'],
//				                   label:this['label']};
//				i++;
//			});
//		}
		//alert(CQLayerConfig[0].layer);
		//var CQLayerConfig = [{
		//    					serverUrl:ezMapServiceUrl,
		//    					layer : "DBO.XINZANG_POI",  layer:this['layer'],"DBO.BSIDPOOL_1_600W",
		//    					fields : "OBJECTID:标识;X_COORD:x;Y_COORD:y;NAME_CHN:name",
		//    					searchField : "NAME_CHN",
		//    					label : "西藏POI"
		//    				}];
		//设置代理
		map.uEzMap.registerProx(ezServerProxyUrl);
		//设这layerQuery对象
		//rightSlip = new ezwidget.SlipWin(1,215,1, "#EEF8FD", document.getElementById("mapBox")); // 创建左侧滑动窗口
		//rightSlip.msg.style.filter = "alpha(opacity=90)";// 设置透明度
		//map.setLayerQuery(map.uEzMap,CQLayerConfig,rightSlip);
		//map.setLayerQuery(map.uEzMap,CQLayerConfig,"");
		//方形图形

		$("#drawSquare11").click(function(){
			map.drawQuery("rect",function(e){
				//var google = new Google();
				//@FIXME 把Google墨卡托投影的米坐标转换成WGS84的经纬的坐标
				//var googlePointLeft = google.meterTolatlon(e.split(',')[0],e.split(',')[1]);
				//var googlePointRight = google.meterTolatlon(e.split(',')[2],e.split(',')[3]);
				
				//var longitudes = googlePointLeft.x+','+googlePointRight.x;
				//var latitudes =  googlePointLeft.y+','+googlePointRight.y;
				
				var longitudes = e.split(',')[0]+','+e.split(',')[2];
				var latitudes  = e.split(',')[1]+','+e.split(',')[3];
				//将坐标半径等信息保存到jsp中,图形信息
				$("#longitudes").val(longitudes);
				$("#latitudes").val(latitudes);
				$("#radius").val(0);
				$("#shapeId").val(square);
				$('#addAreaTab').html('添加重点区域');
				$('#areaId').val('');
				//查询空间数据库获取网吧,宾馆,基站等信息
				var tableArray = new Array('extendinfosid');
				map.spatialQueryForImportantArea(2,e,tableArray,1000,5000);
				showAddImportantArea('#addImportantArea');
			});
		});
		//圆形图形
		$("#drawRound11").click(function(){
			map.drawQuery("circle",function(e){
				//var google = new Google();
				//@FIXME 把Google墨卡托投影的米坐标转换成WGS84的经纬的坐标
				//var googlePoint = google.meterTolatlon(e.split(',')[0],e.split(',')[1]);
				
				//将坐标半径等信息保存到jsp中,图形信息
				$("#longitudes").val(e.split(',')[0]);
				$("#latitudes").val(e.split(',')[1]);
				var meters = _map.uEzMap.getMeter(new Point(parseFloat(e.split(',')[0]),parseFloat(e.split(',')[1])), parseFloat(e.split(',')[2]));
				$("#radius").val(meters);
				$("#shapeId").val(circle);
				$('#addAreaTab').html('添加重点区域');
				$('#areaId').val('');
				
				//查询空间数据库获取网吧,宾馆,基站等信息
				var tableArray = new Array('extendinfosid');
				map.spatialQueryForImportantArea(3,e,tableArray,1000,5000);
				showAddImportantArea('#addImportantArea');
			});
		});

		//点位反查_LK
		$("#toolPosition").click(function(){
			  //alert("test");
				var $popupSetRadius = $('#popupSetRadius1');
				//暂时定位经纬度设置窗口
				$popupSetRadius.css('left',200 + 'px');
				$popupSetRadius.css('top',200 + 'px');
				$('#popupSetRadius1').removeClass('hide');
			});
		//选择圆形图形-圈选 modify by hzq 716
		$("#toolCycle11").click(function(){
			map.drawQuery("circle",function(e){
				var meters = map.uEzMap.getMeter(new Point(e.split(',')[0],e.split(',')[1]),parseFloat(e.split(',')[2]));
				if(meters>500){
					alert("圈取的半径为"+meters+"米，超出了限制的最大范围:500m，请重新圈取！");
					return ;
				}
				var yyy = map.uEzMap.map.vmlDraw;//获取画完的图层对象
				areaarr1.push(yyy);
				$("#setRadiusCenterLongDiv").val(e.split(',')[0]);
				$("#centerLongInput").val(e.split(',')[0]);
				$("#setRadiusCenterLatDiv").val(e.split(',')[1]);
				$("#centerLatInput").val(e.split(',')[1]);
				$("#radiusInput").val(meters);
				//显示径度 半径窗口
				var point =new Point(e.split(',')[0],e.split(',')[1]);
				var point1=map.uEzMap.mapCoord2Container(point);
				var x = point1.x;
				var y = point1.y>=25?(($('#rightSideMap1').height()-point1.y)<=223?($('#rightSideMap1').height()-223):point1.y):25;
				var $popupSetRadius = $('#popupSetRadius');
				if(x > $('#rightSideMap1').width()-515){
					//定位经度半径设置窗口
					$popupSetRadius.css('right',($('#rightSideMap1').width()-x) + 'px');
					$popupSetRadius.css('left','auto');
					$popupSetRadius.css('top',(y-7) + 'px');
				}else{
					$popupSetRadius.css('left',(x+23) + 'px');
					$popupSetRadius.css('top',(y-7) + 'px');
				}
				$('#popupSetRadius').removeClass('hide');
				//把左侧菜单设置到碰撞查询
				var liid = $("#menuCrashLink").parent().attr('id');
				//如果已经是碰撞查询则不用切换
				if ("navCurr1" != liid) {
					changeSearch($("#menuCrashLink"),"crashDiv");
				}
			});
		});
		//选择圆形图形-点选 绑定定点点击事件 74 hzq add selectdrawRoundByPoint --> toolLocation
         $("#toolLocation11").click(function(){
			map.drawQuery("point",function(e){
				$("#setRadiusCenterLongDiv").val(e.split(',')[0]);
				$("#centerLongInput").val(e.split(',')[0]);
				$("#setRadiusCenterLatDiv").val(e.split(',')[1]);
				$("#centerLatInput").val(e.split(',')[1]);
				var yyy = map.uEzMap.map.vmlDraw;
				areaarr1.push(yyy);
				//显示径度 半径窗口 74 hzq
				var point =new Point(e.split(',')[0],e.split(',')[1]);
				var point1=map.uEzMap.mapCoord2Container(point);
				var x = point1.x;
				var y = point1.y>=25?(($('#rightSideMap1').height()-point1.y)<=223?($('#rightSideMap1').height()-223):point1.y):25;
				var $popupSetRadius = $('#popupSetRadius');
				//var $crashCardsTime = $('#crashCardsTime');
				//alert(x);
				//alert(y);
				if(x > $('#rightSideMap1').width()-515){
					//定位经度半径设置窗口
					$popupSetRadius.css('right',($('#rightSideMap1').width()-x) + 'px');
					$popupSetRadius.css('left','auto');
					$popupSetRadius.css('top',(y-7) + 'px');			
				}else{
					//定位经度半径设置窗口
					$popupSetRadius.css('left',(x+23) + 'px');
					$popupSetRadius.css('top',(y-7) + 'px');
				}
				$('#popupSetRadius').removeClass('hide');
				//把左侧菜单设置到碰撞查询 74 hzq
				var liid = $("#menuCrashLink").parent().attr('id');
				//如果已经是碰撞查询则不用切换 75 hzq
				if ("navCurr1" != liid) {
					changeSearch($("#menuCrashLink"),"crashDiv");
				}
			});
		});
         
		//多边形
		$("#toolPolygon11").click(function(){
			map.drawQuery("polygon",function(e){
				removeToolSelt();
			});			
		});
//		$("#toolPolygon").click(function(e){
//			_map.uEzMap.measureArea(function(len){
//				$('.gridDiv').css({'width':'20px','height':'20px'}).show();
//			});			
//		});
         /*
          * 显示网格
          */
		$("#toolGrid").click(function(){
	    	clean();
			isclick =true;			
			divwidth = $("#mapBox").width()/gridnum;
		    divheight= $("#mapBox").height()/gridnum;	
			$("#toShowGridDiv1").width(divwidth);
			$("#toShowGridDiv1").height(divheight);
		     map.hideOverView();			
			 addPolygon(_map.uEzMap);	
		zoomchange = _map.uEzMap.addMapEventListener(EzEvent.MAP_ZOOMCHANGE,function(e){
			 hideAddImportantArea("#toShowGridDiv1");
			 _map.uEzMap.clear();
			 _map.uEzMap.clearOverlays(true);		 		  
		     addPolygon(_map.uEzMap);	   
     	});	
		pan = _map.uEzMap.addMapEventListener(EzEvent.MAP_PAN,function(e){
			 hideAddImportantArea("#toShowGridDiv1");
			 _map.uEzMap.clear();
			 _map.uEzMap.clearOverlays(true);		      
     	});	
		panend = _map.uEzMap.addMapEventListener(EzEvent.MAP_PANEND,function(e){
			 hideAddImportantArea("#toShowGridDiv1");
			 _map.uEzMap.clear();
			 _map.uEzMap.clearOverlays(true);
			 addPolygon(_map.uEzMap);		      
     	});

    });	
		
			
		/**
		 * 全屏
		 */
		var type = '-';
		var mapBoxWidth= null;
		var mapBoxHeight=null;
		$("#toolFullScreen111").click(function(){
			mapBoxWidth=$('#mapBox').width();
			mapBoxHeight=$('#mapBox').height();
			var centerContentWidth = 0 , rightContentWidth = $("#rightSideMap1").width()+$('#Center').width()+55 , leftMenuWidth = 0;
			var headHeight = 0 , headHeight1 = $("#rightSideMap1").height()+67 , paddingTop = 0 , opacity = 'hide' , leftMenuOpacity = 'hide';
			// 设置一些css属性变量值
			if(type!='-'){
				big = false;
				if($('#foldDiv').hasClass('foldLeft')){
					centerContentWidth = 325;
				}
				rightContentWidth = ($("#rightSideMap1").width()-centerContentWidth-55);
				leftMenuWidth = 55;
				headHeight = 0;
				headHeight1 = $("#rightSideMap1").height()-67;
				paddingTop = 64;
				opacity = 'show';
				leftMenuOpacity = "show";
				type = "-";
				// 替换图标样式
				$('#toolFullScreen').removeClass('toolFullScreen1').addClass('toolFullScreen');
				$('#foldDiv').show();
				//$("#mapBox").css({width:mapBoxWight,height:	mapBoxHight});	
			}else{
				
				big = true;
				$('#toolFullScreen').removeClass('toolFullScreen').addClass('toolFullScreen1');
				type = "+";
				$('#foldDiv').hide();
			}
			// 收起头部信息，并隐藏logo
			$("#head").animate({height:headHeight+'px',opacity:opacity},0);
			// 收起左侧数据信息
			$("#Center").animate({width:centerContentWidth+'px'},0);
			// 增加宽度和高度，让地图变为全屏展示
			$('#Content').animate({paddingTop:paddingTop+'px'},0,function(){
				$('#leftMenu').animate({width:leftMenuWidth+'px',opacity:leftMenuOpacity},0);
			});
			$("#rightSideMap1 , #rightSideMap1 >img").animate({width:rightContentWidth+'px',height:headHeight1+'px'},0);
			//由于加载有先后顺寻，所以再次加载网格
			hideAddImportantArea("#toShowGridDiv1");
		    //判断全屏的时候是否需要显示网格	
			if(isclick){					
				_map.uEzMap.clear();
				divwidth = $("#mapBox").width()/gridnum;
				divheight= $("#mapBox").height()/gridnum;				
				$("#toShowGridDiv1").width(divwidth);
				$("#toShowGridDiv1").height(divheight);				
			 	addPolygon(_map.uEzMap);			 	
		    }	
		});
		
		//添加标记
		$("#drawMark").click(function(){
			map.drawQuery("circle",function(e){
				var temp = e.split(',');
				$('#vitsitelongitude').val(temp[0]);
				$('#vitsitelatitude').val(temp[1]);
				var icon = map.setIcon(basePath + "webui/common/images/a11.png",32,32,-16,16);
				var title = map.setTitle("添加标记");
				var point = new Point(temp[0],temp[1]);
				map.addMark(point,icon,title);
				showMark();
			});
		});
		//$("#toolClean").click(clean);
		//$("#toolRanging").click(measureLine);		
		
		_map = map;
		_map.uEzMap.isShowTitle = true;	
	}
    
	return map;
}	
var big=false;
var w = 0;
var h =0;

/*
 * 添加覆盖矩形
 * 
 */
 function addPolygon(obj){	
  	 var mbr =null;
	 /**解决火狐浏览器全屏之后无法通过getBoundsLatLng()方法获得变化后的外包矩形
	  * @author tianmei 
	  * @date 2015-09-19
	  * */
  	 var minPt=null;
  	 var maxpt=null;	
     var minPt = new Point(0,$('#mapBox').height());
     var minPt = obj.containerCoord2Map(minPt)
     var maxpt=  new Point($('#mapBox').width(),0);
     var maxpt = obj.containerCoord2Map(maxpt);
     var mbr = new MBR(minPt.x,minPt.y,maxpt.x,maxpt.y);
     
	var points = [];
	var poinsX = [];
	var poinsY = [];
	var polygons = [];
	var coordX = [];
	var coordY = [];
	
	sizeX = (mbr.maxX - mbr.minX)/gridnum;
	sizeY = (mbr.maxY - mbr.minY)/gridnum;
	
	for(i=0;i<=gridnum;i++){		
		coordX.push(mbr.minX+sizeX*i);
		coordY.push(mbr.minY+sizeY*i);
	}
	//获取方格内的所有交点坐标
	for(i=0;i<coordY.length-1;i++){
		
		for(j=0;j<coordX.length-1;j++){
			var points = [];
			points.push(new Point(coordX[j],coordY[i]));
			points.push(new Point(coordX[j+1],coordY[i]));
			points.push(new Point(coordX[j+1],coordY[i+1]));
			points.push(new Point(coordX[j],coordY[i+1]));
			var polygon = new Polygon(points,"green", 1, 1, "green");
			polygon.setFillOpacity(0);
			addClickEvent(polygon,obj);		
			obj.addOverlay(polygon); 											  		
			polygons.push(polygon);	
			//polygon="";		
	    }				
	}	
      return polygons;		  			
  }
  /*
   * 添加点击事件
   */
  function addClickEvent(obj,mapobj){ 
 	obj.addListener("click", function() {
		var tmpmbr = obj.getMBR();
		var tmpheight = divheight/gridnum;		
	    //var pt = mapobj.mapCoord2Container(tmpmbr.centerPoint());	
		hideAddImportantArea("#toShowGridDiv1");
		$("#toShowGridDiv1").html("信息正在查询中...")		
		$("#toShowGridDiv1").css({"text-align":"center","line-height":"24px","font-size":"15px","color":"#F00"});
		showGridClickDiv("#toShowGridDiv1");
		searchPOIAndADAndBSID(tmpmbr);
		return false;
 	});	
 }
 
 /**
 * 显示点击弹出区域
 * divName 区域div的id
 * e  经纬度
 */ 
function showGridClickDiv(divName){
	//var container = map.uEzMap.getMapContainer();
	var e = arguments.callee.caller.arguments[0] || window.event;
	var tag = e.target || e.srcElement;
	var currentTarget = e.currentTarget?e.currentTarget:tag.parentNode;
	var top=0;
	var left=0;
	if(window.event==undefined){		
		 top = $(currentTarget).offset().top-17;
		left = $(currentTarget).offset().left+3;
	}else{
		 top = $(currentTarget).offset().top-21;
		 left = $(currentTarget).offset().left;
		
	}
	var scrollTop = $(document).scrollTop();
	var scrollLeft = $(document).scrollLeft(); 
	if(big){
		$(divName).css( { position : 'absolute',top : top+23, left : left} ).show();
	}else{
		var toph = $("#head").height();
		var contentw = $("#leftMenu").width()+$("#centerContent").width();
		$(divName).css( { position : 'absolute',top : top-toph+25, left : left-contentw} ).show();
	}
	

	
	//$(divName).css( { position : 'absolute', 'top' : '90px', left : '60px',width:'60px',height:'90px', } ).show();
}
/**
 * 清除区域碰撞和时间碰撞表单信息
 * hzq add 716
 */
function cleanForminfo() {
	//alert("清除信息");
	$("#savemutilAreaForm > input").each(function() {
		$(this).attr("value","");
	});
	$("#saveAreaForm > input").each(function(){
		$(this).attr("value","");
	});
	$("#timeCrashCellForm > input").each(function() {
		$(this).attr("value","");
	});
	clean();
	//工具栏去掉点选圈选选中状态
	$("#toolLocation").removeClass("selt");
	$("#toolCycle").removeClass("selt");
}
/**
 * 区域碰撞左侧按钮点选操作
 * hzq modify 75  
 */
function mupliAreaChoose() {
	if($("#toolLocation").hasClass("selt")) {
		$("#toolCycle").removeClass("selt");
	}
	if($("#toolCycle").hasClass("selt")) {
		$("#toolLocation").removeClass("selt");
	}
	if (!$("#toolCycle").hasClass("selt") && !$("#toolLocation").hasClass("selt")) {
		$("#toolLocation").addClass("selt");
	}
	$("#toolPolygon,#toolGrid,#toolFullScreen,#toolClean,#toolRanging").removeClass("selt");
	if($("#toolLocation").hasClass("selt")) {
		
		_map.drawQuery("point",function(e){
			$("#setRadiusCenterLongDiv").val(e.split(',')[0]);
			$("#centerLongInput").val(e.split(',')[0]);
			$("#setRadiusCenterLatDiv").val(e.split(',')[1]);
			$("#centerLatInput").val(e.split(',')[1]);
			var yyy = _map.uEzMap.map.vmlDraw;
			areaarr1.push(yyy);
			//显示径度 半径窗口 74 hzq
			var point =new Point(e.split(',')[0],e.split(',')[1]);
			var point1=_map.uEzMap.mapCoord2Container(point);
			var x = point1.x;
			var y = point1.y>=25?(($('#rightSideMap1').height()-point1.y)<=223?($('#rightSideMap1').height()-223):point1.y):25;
			var $popupSetRadius = $('#popupSetRadius');
			if(x > $('#rightSideMap1').width()-515){
				//定位经度半径设置窗口
				$popupSetRadius.css('right',($('#rightSideMap1').width()-x) + 'px');
				$popupSetRadius.css('left','auto');
				$popupSetRadius.css('top',(y-7) + 'px');
			}else{
				$popupSetRadius.css('left',(x+23) + 'px');
				$popupSetRadius.css('top',(y-7) + 'px');
			}
			$('#popupSetRadius').removeClass('hide');
		});
	}
	if($("#toolCycle").hasClass("selt")) {
		_map.drawQuery("circle",function(e){
			var meters = _map.uEzMap.getMeter(new Point(e.split(',')[0],e.split(',')[1]),parseFloat(e.split(',')[2]));
			if(meters>500){
				alert("圈取的半径为"+meters+"米，超出了限制的最大范围:500m，请重新圈取！");
				return;
			}
			var yyy = _map.uEzMap.map.vmlDraw;//获取画完的图层对象
			areaarr1.push(yyy);
			$("#setRadiusCenterLongDiv").val(e.split(',')[0]);
			$("#centerLongInput").val(e.split(',')[0]);
			$("#setRadiusCenterLatDiv").val(e.split(',')[1]);
			$("#centerLatInput").val(e.split(',')[1]);
			$("#radiusInput").val(meters);
			//显示径度 半径窗口
			var point =new Point(e.split(',')[0],e.split(',')[1]);
			var point1=_map.uEzMap.mapCoord2Container(point);
			var x = point1.x;
			var y = point1.y>=25?(($('#rightSideMap1').height()-point1.y)<=223?($('#rightSideMap1').height()-223):point1.y):25;
			var $popupSetRadius = $('#popupSetRadius');
			if(x > $('#rightSideMap1').width()-515){
				//定位经度半径设置窗口
				$popupSetRadius.css('right',($('#rightSideMap1').width()-x) + 'px');
				$popupSetRadius.css('left','auto');
				$popupSetRadius.css('top',(y-7) + 'px');
			}else{
				$popupSetRadius.css('left',(x+23) + 'px');
				$popupSetRadius.css('top',(y-7) + 'px');
			}
			$('#popupSetRadius').removeClass('hide');
		});
	}
}
/**
 * 区域碰撞区域选择完成后显示日期输入框点击确定调用方法
 * hzq add 715
 */	
function mupliCrashInfoSave() {	
	var areaid = $("#muplicrashquinfo").attr("value");
	//alert("areaid:>>>"+areaid);
	var jzinfo = $("#mextendinfos").attr("value");
	//alert("区域碰撞-基站："+jzinfo);
	var crashStartTime = $("#crashStartTime").val();
	var crashEndTime = $("#crashEndTime").val();
	 if(isEmpty(crashStartTime)|| crashStartTime.indexOf("起点")!= -1){
		  alert("请设置时间起点！");
		  return;
	  }
	  if(isEmpty(crashEndTime) || crashEndTime.indexOf("终点")!= -1 ){
		  alert("请设置时间终点！");
		  return;
	  }
	  if(crashStartTime.length<19){
		  crashStartTime += ":00";
	  }
	  if(crashEndTime.length<19){
		  crashEndTime += ":00";
	  }
	var arearesult = "";
	var re = /area/g;
	var beforeAddAreaHtmlinfo = '<li id="areaItem" class="areaItem beforeAreaAdd clearfix">' +
    '<a href="#" class="left addArea"></a>' +
    '<span class="left areaResult crashCaption">创建一个碰撞区域</span>' +
    '</li>';
	$("#savemutilAreaForm > input").each(function(){
		if($(this).attr("value")!=null && $(this).attr("value")!="" && $(this).attr("value").indexOf(areaid)!= -1 ) {
			//alert("获得表单上的值:"+$(this).attr("name")+"-"+$(this).attr("value"));
			//var valueinfo = "area"+areaCount+"|"+longitude+"|"+latitude+"|"+degreeRadius+"|circle|"+radius;
			var values = $(this).attr("value").split("|");
			//"["+longitude + "°,"+latitude+"°] "+"半径:"+radius+"米";
			arearesult = values[0].replace(re,"区域")+":("+values[1]+"°,"+values[2]+"°,"+values[5]+"m)";
			var longitude = values[1];
			var latitude  = values[2];
			var allvalues = $(this).attr("value")+"|"+crashStartTime+"|"+crashEndTime+"|"+jzinfo;
			//alert("最后的form value:"+allvalues);
			$(this).attr("value",allvalues);
			//设置当前选中的区域信息 area1... hzq add 728 
			$("#curarea").attr("value",values[0]);
			//找待选区域
			$("#cashchoosea > li").each(function(){
				if($(this).hasClass("areaAdding")) { //如果是待选定区域
					var resuhtml = '<a class="left addArea" href="#"></a>' +
					 			   '<span class="left areaResult crashCaption">'+arearesult+'</span>' ;
					               //+'<a class="right repealBtn" href="#"></a>';
					$(this).removeClass('areaAdding').html(resuhtml);
					//最多5个区域
					if($(this).siblings('.areaItem ').size() < 4 && $(this).parents('.timeSift').size() == 0){
						//alert("size:>>"+$(this).parents('.timeSift').size());
						$('#areaItem').removeAttr('id');
						$('#areaSiftHandle').before(beforeAddAreaHtmlinfo);
						var height = $(window).height() - $(this).parents('.contentTop').height() -64;
						crashHeight = height;//修改为用自定义全局变量存储点选之后的高度
						$('#crashCards').css('height',height+'px');
						addbeforeAreaClick();
					}
					return false;
				}
			});
			return false;
		}
	});
	//alert(longitude+","+latitude);
	//显示某个区域的手机号信息 hzq add 729
	/**
	if (longitude != null && latitude!=null) {
		$('#phoneInfo').cards({
		    url:basePath +"crashAnalyseController/getOneAreaA111Info",
		    dataParam:$('#savemutilAreaForm').serialize(),
		    method: 'POST',
			dataType:'json',
			usepager: false,
			onSuccess:function(p,data){
				jsScroll(document.getElementById('crashDetailsPhonePopup'),10,'divScrollBar');
			}
	    });
		//定位手机列表窗口位置 hzq add 729
		var point =new Point(longitude,latitude);
		var point1=_map.uEzMap.mapCoord2Container(point);
		var x = point1.x;
		var y = point1.y>=25?(($('.rightContent').height()-point1.y)<=223?($('.rightContent').height()-223):point1.y):25;
		var $crashDetailsPhonePopup = $('#crashDetailsPhonePopup');
		$crashDetailsPhonePopup.css('left',(x+23) + 'px');
		$crashDetailsPhonePopup.css('top',(y-7) + 'px');
		$crashDetailsPhonePopup.removeClass("hide");
	}
	*/
	$('#crashCardsTime').addClass("hide");
}
//区域碰撞筛选区"创建一个碰撞区域"绑定Click事件
function addbeforeAreaClick11() {
	var addAreaHtml = '<a class="left addArea hide" href="#"></a>' +
	  '<span class="left areaResult crashCaption">在地图中设置碰撞区</span>' +
	  '<span class="rightArrow left" id="rightArrow_span"></span>';
	
		$('#areaItem,#timeAreaItem').bind('click',function(){
			$(this).removeClass('beforeAreaAdd').addClass('areaAdding').html(addAreaHtml);
			$(this).unbind('click');
			//调用点选的操作
			mupliAreaChoose();		
	});
}
/**
 * 设置半径后查询半径区域内的基站
 * hzq modify 75  
 */
function searchAreaInfo(){
	//验证输入的半径值
	var longitude = $("#centerLongInput").val();
	var latitude = $("#centerLatInput").val();
	var radius = $("#radiusInput").val();
	var addAreaHtml = '<a class="left addArea hide" href="#"></a>' +
	  '<span class="left areaResult crashCaption">在地图中设置碰撞区</span>' +
	  '<span class="rightArrow left" id="rightArrow_span"></span>';
	if(parseFloat(radius)>500){
		alert("半径不得超过500m，请重新输入！");
		$("#radiusInput").val("");
		return;
	}else if(parseFloat(radius)<0){
		alert("半径不能为负数，请重新输入！");
		$("#radiusInput").val("");		
		return;
	}else if(isNaN(radius)||parseFloat(radius)==0||radius == ""){
		
		alert("输入半径不合法，请重新输入！");
		$("#radiusInput").val("");
		return;
	}
	//确认框隐藏 去除水印
	$("#enterBtndx").parents('.popupWrap').addClass('hide');
	if($("#enterBtndx").parents('#clearAlert').size() != 0){
		//alert("水印");
		watermark();
	}
	var degreeRadius = _map.uEzMap.getDegree(new Point(longitude,latitude), radius);
	//如果是区域碰撞 hzq add 715
	if ( "crasha" == $("#sortCurr").attr("name") ) { 
		//如果没有一个区域是待选状态
		if ($("#cashchoosea").children(".areaAdding").size() == 0) {
			//alert("没有待选区域");
			//增加一个待选区域
			$("#cashchoosea").children('.beforeAreaAdd').removeClass('beforeAreaAdd')
			.addClass('areaAdding').html(addAreaHtml).unbind('click');
		}
		$("#cashchoosea > li").each(function(){
			//alert("class:>>"+$(this).attr("class"));
			if($(this).hasClass("areaAdding")) { //如果是待选定区域
				$("#savemutilAreaForm > input").each(function(){
					if($(this).attr("value")==null || $(this).attr("value")=="") {
						//alert($(this).attr("name"));
						//表单设值
						var valueinfo = "area"+areaCount+"|"+longitude+"|"+latitude+"|"+degreeRadius+"|circle|"+radius;
						$(this).attr("value",valueinfo);
						//时间框设值 哪个区域
						$("#muplicrashquinfo").attr("value","area"+areaCount);
						var tableArray = new Array('mextendinfos');
						_map.spatialQueryForImportantArea(3,longitude+","+latitude+","+degreeRadius,tableArray,1000,5000);
						onshowAddedAreaMapMupliCash(areaCount,'circle',longitude,latitude,degreeRadius,radius);
						//定位时间设置窗口 hzq add 728
						var point =new Point(longitude,latitude);
						var point1=_map.uEzMap.mapCoord2Container(point);
						var x = point1.x;
						var y = point1.y>=25?(($('#rightSideMap1').height()-point1.y)<=223?($('#rightSideMap1').height()-223):point1.y):25;
						var $crashCardsTime = $('#crashCardsTime');
						if(x > $('#rightSideMap1').width()-515) {
							$crashCardsTime.css('right',($('#rightSideMap1').width()-x) + 'px');
							$crashCardsTime.css('left','auto');
							$crashCardsTime.css('top',(y-7) + 'px');
						} else {
							$crashCardsTime.css('left',(x+23) + 'px');
							$crashCardsTime.css('top',(y-7) + 'px');
						}
						$("#crashCardsTime").removeClass("hide");
						return false;
					}
				});
				return false;
			}
		});
	}
	//如果是时间碰撞 hzq add 710
	if ( "crashb" == $("#sortCurr").attr("name") ) { 
		//如果是待选区域
		if ($("#cashchooseb > li:first").attr("class") == "beforeAreaAdd clearfix") {
			//增加一个待选中区域
			$("#cashchooseb").children('.beforeAreaAdd').removeClass('beforeAreaAdd')
			.addClass('areaAdding').html(addAreaHtml).unbind('click');
		}
		//已经有待选的区域
		if ($("#cashchooseb > li:first").attr("class") == "clearfix") {
			alert("已经有创建的区域。");
			return;
		}
		//设置saveAreaForm表单里隐藏的经度 半径值 hzq 76 
		$("#longitudes").val(longitude);
		$("#latitudes").val(latitude);
		$("#radius").val(degreeRadius);
		$("#shapeId").val("circle");
		$('#areaId').val('');
		//时间碰撞 位置半径设值
		$("#centerLongDiv").html(longitude);
		$("#centerLatDiv").html(latitude);
		$("#radiusDiv").html(radius+"米");
		//716 modify by hzq
		var dxresult = ":("+longitude + "°,"+latitude+"°,"+radius+"m)";
		//alert("yes:>>>"+$("#ccc > li:first").children("span").html());
		//$("#cashchooseb > li:first").children("span").html(dxresult);
		$("#cashchooseb > li").each(function(){
			if($(this).hasClass("areaAdding")) { //如果是待选定时间碰撞区域
				var resuhtml = '<a class="left addArea" href="#"></a>' +
	 			   '<span class="left areaResult crashCaption">'+"区域"+areaCount+dxresult+'</span>' ;
	               //+'<a class="right repealBtn" href="#"></a>';
				$(this).removeClass('areaAdding').html(resuhtml);
			}
		});
		
		$("#timeCAlert").addClass("hide");
		//clean();
		var tableArray = new Array('extendinfosida');
		_map.spatialQueryForImportantArea(3,longitude+","+latitude+","+degreeRadius,tableArray,1000,5000);
		onshowAddedAreaMapYN(areaCount);
	}

}



/**
 * 修改点选或者圈选之后无法.addarea无法恢复的问题
 *  author  ytm
 */
function  clearAreaInfo(){
	$("#cashchooseb > li").each(function(){
		if($(this).hasClass("areaAdding")) { //如果是待选定时间碰撞区域	
			var beforeAddAreaHtmlinfo = '<li id="timeAreaItem" class="areaItem beforeAreaAdd clearfix">' +
		    '<a href="#" class="left addArea"></a>' +
		    '<span class="left areaResult crashCaption">创建一个碰撞区域</span>' +
		    '</li>';
			$(this).replaceWith(beforeAddAreaHtmlinfo);
			//$(this).removeClass('areaAdding').parent().remove(this).append.html(beforeAddAreaHtmlinfo);
			addbeforeAreaClick();
		}
	});
	
	$("#cashchoosea > li").each(function(){
		if($(this).hasClass("areaAdding")) { //如果是待选定时间碰撞区域	
			var beforeAddAreaHtmlinfo = '<li id="areaItem" class="areaItem beforeAreaAdd clearfix">' +
		    '<a href="#" class="left addArea"></a>' +
		    '<span class="left areaResult crashCaption">创建一个碰撞区域</span>' +
		    '</li>';
			$(this).replaceWith(beforeAddAreaHtmlinfo);
			//$(this).removeClass('areaAdding').html(beforeAddAreaHtmlinfo);
			addbeforeAreaClick();
		}
	});	
	if($('#toolLocation').hasClass('selt')){
		$('#toolLocation').click();
	}
	if($('#toolCycle').hasClass('selt')){
		$('#toolCycle').click();
	}
}

/**
 * 测距
 */
function measureLine(){
	
	  _map.measure(1,null,function(){
		 if($('#toolRanging').hasClass('selt')){
			 $('#toolRanging').removeClass('selt');
		 }
		  
	  });
	//_map.measure(1,null,function(){if($('#toolRanging').hasClass('selt')){$('#toolRanging').removeClass('selt');}});
}

 /**
  * 在地图上显示刚添加的Area
  * @return
  */
function onshowAddedAreaMap(){
	var map = _map;
	//图形形状(方形/圆形)区域形状；circle：圆形；square：方形
	var shape = $("#shapeId").val(); 
	//经度
	var longitudes = $("#longitudes").val();
	//纬度
	var latitudes = $("#latitudes").val();
	//半径(圆形情况下)
	var radius = $("#radius").val();
	
	var areaName = $('#addAreaname').val();
	var addRemark = $('#addRemark').val();
	//圆形
	if(shape == 'circle'){
		//在地图上显示区域图形
		var pPoints = longitudes+","+latitudes+","+radius;
		var pCircle = new Circle(pPoints,"#FF0000",2,0.5,"#66B3FF");
		pCircle.addListener("click",function(){pCircle.openInfoWindowHtml("<span>区域名称：</span>"+areaName+"<span></span><br><span>描述：</span><span>"+addRemark+"</span>");});// 添加点击事件的响应
		map.uEzMap.addOverlay(pCircle);
	}
	//方形
	if(shape == 'square'){
		//在地图上显示区域图形
		var pPoints = longitudes.split(',')[0]+","+latitudes.split(',')[0]+","+longitudes.split(',')[1]+","+latitudes.split(',')[1];
		var pRectangle = new Rectangle(pPoints,"#FF0000",2,0.5,"#66B3FF");
		pRectangle.addListener("click",function(){pRectangle.openInfoWindowHtml("<span>区域名称：</span>"+areaName+"<span></span><br><span>描述：</span><span>"+addRemark+"</span>");});// 添加点击事件的响应
		map.uEzMap.addOverlay(pRectangle);
	}
}
/**
 * 显示新增区域
 * divName 区域div的id
 * e  经纬度
 */ 
function showAddImportantArea(divName){
	var top = ($(window).height() - $(divName).height())/2; 
	var left = ($(window).width() - $(divName).width())/2;		
	var scrollTop = $(document).scrollTop(); 
	var scrollLeft = $(document).scrollLeft(); 
	$(divName).css( { position : 'absolute', 'top' : top + scrollTop, left : left + scrollLeft} ).show();
}
/**
 * 隐藏新增区域
 * divName 区域div的id
 */
function hideAddImportantArea(divName){
	$(divName).hide();
}
/**
 * 格式化时间
 */
function formatDate(endtime){
	var y = endtime.getFullYear();
	var m = endtime.getMonth()+1;//获取当前月份的日期
	var d = endtime.getDate();
	if((""+m).length == 1 && (""+d).length == 1)  endtime = y+"-0"+m+"-0"+d;
	if((""+m).length == 1) return y+"-0"+m+"-"+d;
	if((""+d).length == 1) return y+"-"+m+"-0"+d;
	return y+"-"+m+"-"+d;
}
 /**
  * 当长期有效被选中时,屏蔽时间选择
  * @return
  */
function canelTime(){
	var isalwaysopenStr = $('input[name="isalwaysopenStr"]:checked');
	if(isalwaysopenStr.size()>0){
		$("#addbeginTime").attr("disabled","disabled");
		$("#addendTime").attr("disabled","disabled");
	}else{
		$("#addbeginTime").removeAttr("disabled");
		$("#addendTime").removeAttr("disabled");
	}
}
function initmaparea(){
	areaTable = new AreaTable(1,'mapareatrclass','mapareatableid','mapareapageid','loadSelectArea');
}
function AreaTable(_page_now,_trclass,_tableid,_pageid,_method){
	this.page_now = _page_now;
	this.trclass  = _trclass;
	this.tableid  = _tableid; 
	this.pageid   = _pageid;
	this.method   = _method;
}
/**
 * 地图上添加标记
 * @param map 地图
 * @param x 经度
 * @param y 纬度
 * @param title 标题
 * @param imgUrl 图片地址
 * @param info  信息
 * @return
 */
function addMark(map,x,y,title,imgUrl,info){
	//创建点
	var rpoint = new Point(x,y);
	//创建图片
	var pIcon = new Icon(); 
	pIcon.image = imgUrl;
	pIcon.height = 40;
	pIcon.width = 40;
	pIcon.topOffset = 0;
	pIcon.leftOffset = 0;
	//创建标记
	var marker = new Marker(rpoint, pIcon, new Title(title, 14, 2, "宋体", "#000000", "#80ffff", "#5555ff", "2"));
	$(marker.titleDiv).attr("name","pointMarkerTitle");
	if(!_map.uEzMap.isShowTitle){
		$(marker.titleDiv).css("display","none");
	}
	var msg = '名称:'+title+'<br>'+'x:'+x+'<br>y:'+y;
	if(info!=null && info!=''){
		msg += '<br>轨迹信息:'+info;
	}
	//添加click监听事件
	addOpenInfoWin(marker,msg);
	//添加标记到地图
	if(map==null){
		map=_map;
	}
	map.uEzMap.addOverlay(marker);
}
 /**
  * 添加onclick监听
  * @param obj
  * @param msg
  * @return
  */
 function addOpenInfoWin(obj, msg){
 	obj.addListener("click", function() {
 		obj.openInfoWindowHtml(msg);
 		obj.flash();
 	});
 }
 /**
  * 显示标记地址
  * @return
  */
 function showMark(){
	 $('#markdiv').show();$('#areaalarmdiv').hide();$('#comparediv').hide();
 }
 /**
  * 初始化标记
  * @return
  */
 function initVitSite(){
	 areaTable = new AreaTable(1,'vitsitetrclass','vitsitetableid','vitsitepageid','loadVitSiteSelectVtp');
 }
 
  
  var areaCountDel = 0;  
  var areaCount = 1;  
  var phoneCount = 0;
  
  var firstBeginTime;//所有区域的最早时间点
  var lastEndTime;//所有区域的最晚时间点
  
  var ynaddbeginTime;//当前区域的开始时间
  var ynaddendTime;//当前区域的结束时间
 
  //hzq 715 add 区域碰撞提交数据
  function mupliCrashSaveArea() {
	  var pzcount = 0;
	  $("#cashchoosea > li").each(function(){
		 //如果是已选区域
		  if ($(this).attr("class") == "areaItem clearfix") {
			  pzcount = pzcount + 1;
		  }
	  });
	  if (pzcount < 2) {
		  alert("至少选择两个区域！");
		  return;
	  }
	  
	  var dxarea = 0;
	  $("#cashchoosea > li").each(function(){
			if($(this).hasClass("areaAdding")) {
				alert("还有待选的区域！");
				dxarea++;
				return false;
			}
	  });
	  if (dxarea > 0) {
		  return;
	  }
	  $('#crashCards').cards({
			url:basePath +"crashAnalyseController/getA111Muplicrash",
			dataParam:$('#savemutilAreaForm').serialize(),
			method: 'POST',
			procmsg: '正在查询区域内的信息，请稍后...',
			nomsg: '没有符合查询条件的数据。',
			errormsg: '出错了，请刷新页面重新操作！',
			dataType:'json',
			height:crashHeight,//存储区域选完之后 crashCards的高度
			width:"auto",
			usepager: false,
			onOtherClick:pupupHandlerByMupliCrash,
			//设置表单提交完成使用方法
			onSuccess: function(p,data) {    
				timecrashdata = data;
	        },
	        linkhandler:[{name:'清除',bclass:'clearBtn',handler:clearHandler}]
		});
	  //add by tianmei 2015-09-19
	 
  }
  
  //hzq 75 modify 时间碰撞处理方法
  function ynsaveArea() {
	  ynaddbeginTime = $("#ynaddbeginTimeNew").val();
	  ynaddendTime = $("#ynaddendTimeNew").val();
	  var ynaddbeginTimeHH = $("#ynaddbeginTimeNewHH").val();
	  var ynaddendTimeHH = $("#ynaddendTimeNewHH").val();
	  //alert("基站info:>>>"+$("#extendinfosida").val());
	  //判断是否设置了区域信息
	  //var qxinfo = $("#ccc > li:first").children("span").html();
	  //if (qxinfo != null  && qxinfo.indexOf("创建一个碰撞区域") != -1) {
		  //alert("请创建一个碰撞区域！");
		//  $("#timeCAlert").removeClass("hide");
		  //return;
	  //}
	  //if (qxinfo != null  && qxinfo.indexOf("创建一个碰撞区域") == -1) {
		//  $("#timeCAlert").addClass("hide");
	  //}
	  var dxarea = 0;
	  $("#cashchooseb > li").each(function(){
			if($(this).hasClass("areaAdding")) {
				alert("请创建一个碰撞区域！");
				dxarea++;
				return false;
			}
	  });
	  if (dxarea > 0) {
		  return;
	  }
	  
	  if(isEmpty(ynaddbeginTime)|| ynaddbeginTime.indexOf("起点")!= -1){
		  alert("请设置天数起点！");
		  return;
	  }
	  if(isEmpty(ynaddendTime) || ynaddendTime.indexOf("终点")!= -1 ){
		  alert("请设置天数终点！");
		  return;
	  }
	  if(isEmpty(ynaddbeginTimeHH)|| ynaddbeginTimeHH.indexOf("起点")!= -1){
		  alert("请设置起点(HH:mm)！");
		  return;
	  }
	  if(isEmpty(ynaddendTimeHH) || ynaddendTimeHH.indexOf("终点")!= -1 ){
		  alert("请设置终点(HH:mm)！");
		  return;
	  }
	  //设置表单开始时间值
	  $("#yndate1sform").val(ynaddbeginTime);
	  $("#yndate1eform").val(ynaddendTime);
	  $("#timestartpartform").val(ynaddbeginTimeHH);
	  $("#timesendpartform").val(ynaddendTimeHH);
	  /**
	  var beginD = convertToDateTime(ynaddbeginTime);
	  var endD = convertToDateTime(ynaddendTime);
	  if((endD.getTime()-beginD.getTime())>1000*3600*2){
		  alert("时间跨度不得超过2小时！");
		  return;
	  }
	  */
		$('#crashCards').cards({
			url:basePath +"crashAnalyseController/getA111Timecrash",
			dataParam:$('#saveAreaForm').serialize(),
			method: 'POST',
			procmsg: '正在查询区域内的信息，请稍后...',
			nomsg: '没有符合查询条件的数据。',
			errormsg: 'session超时，请刷新页面重新操作！',
			dataType:'json',
			height:cardsHeight.crashCardsHeight,
			width:"auto",
			usepager: false,
			onOtherClick:pupupHandlerByTimeCrash,
			onSuccess: function(p,data) {    // 设置表单提交完成使用方法
				//alert("data:>>"+data.time);
				crashdayinfo = data.time;//具体日期数据
				timecrashdata = data;
				//alert("data.time:>>"+data.time);
	        },
	        linkhandler:[{name:'清除',bclass:'clearBtn',handler:clearHandler}]
		});
  }
  
  function deleteArea(i) {
  	$("#qu"+i).remove();
  	
  	if(areaarr1[i-1] && areaarr1[i-1] != null) {
  		_map.uEzMap.removeOverlay(areaarr1[i-1]);
  	}
  	if(areaarr2[i-1] && areaarr2[i-1] != null) {
  		_map.uEzMap.removeOverlay(areaarr2[i-1]);
  	}
  	
  	areaCountDel++;
	if((areaCount - areaCountDel - 1)>=2){
		  $("#crashNum").html("");
		  var chtml = "";
		  for(var crashIndex=(i-areaCountDel);crashIndex>1;crashIndex--){
			  chtml += "<option value='"+crashIndex+"'>"+crashIndex+"</option>";
		  }
		  $("#crashNum").html(chtml);
		  $('#ynbuttonliid').show(); 
	}
	else {
		$('#ynbuttonliid').hide(); 
	}
  }
  //显示碰撞结果 hzq modify 76 
  function showYn(i,data){
	  var j=1;
	  var htmlStr = "";
	  //每个区域的id为 qu1 2 3 ...
	  htmlStr += "<dl class='compareList' style='display: black' id='qu"+i+"'> ";
	  htmlStr += "	<dd class='clearfix'><div style='float:left;background-color:white;'><label class='left'>区域"+i+"</label></div><div>&nbsp;&nbsp;&nbsp;&nbsp;<span style='background-color:#"+colorArr[i]+";width:20px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;"+$(data).length+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' onclick=deleteArea(" + i + ")>删除</a></div></dd>";
	  htmlStr += "	<dd class='clearfix'><div style='float:left;background-color:white;'><label class='left'>"+ynaddbeginTime+"至"+ynaddendTime+"</label></div></dd>";
	  htmlStr += "	<dt class='clearfix' style='overflow-y:auto;height:100px;'> ";
	  htmlStr += "	<table>  ";
	  
	  var msgs = "";
	  
	  $(data).each(function(){
		  msgs += this["grekey"]+"@@区域"+i+"@@"+this["count"]+"@@"+this["vitalpersoninfoid"]+";,;"; //vitalpersoninfoid ：重点人id
		  
		  var imgsrc = "";
		  var imgisshow = "none";
		  if(this['vitalpersoninfoid']!=0){
			  imgsrc = basePath+'webui/common/images/u66_normal.png';
			  imgisshow = "black";
		  }
		  htmlStr += "		<tr> ";
		  //每个手机号的id 为 区域id qu1 + 顺序id = qu11 qu12
		  htmlStr += "			<td><p class='blue' id='qu"+i+j+"'>"+this["a111Info"]+"</p></td><td>&nbsp;&nbsp;&nbsp;</td><td><a><img style='display: "+imgisshow+"' src='"+imgsrc+"' id='img"+i+j+"'/></a></td> ";
		  htmlStr += "		</tr>  ";
		  phoneCount ++;
		  j++;
	  });
	  if(isNotEmpty(msgs)){
		  msgs = msgs.substring(0, msgs.length-3);
	  }
	  htmlStr += "          <input type='hidden' name='msgsList["+(i-1)+"]' value='"+msgs+"' />";
	  htmlStr += "	</table>  ";
	  htmlStr += "	</dt>  ";
	  
	  htmlStr += "</dl>   ";
	  $("#yncrashdivid").append(htmlStr);
	  $("#areaCount").val(i);
	  if((i-areaCountDel)>=2){
		  $("#crashNum").html("");
		  var chtml = "";
		  for(var crashIndex=(i-areaCountDel);crashIndex>1;crashIndex--){
			  chtml += "<option value='"+crashIndex+"'>"+crashIndex+"</option>";
		  }
		  $("#crashNum").html(chtml);
		  $('#ynbuttonliid').show(); 
	  }
	  
  }
  //区域碰撞显示
  function onshowAddedAreaMapMupliCash(colorFlag,shapeid,longitudes,latitudes,radius,radiusa){
	    var color1 = "FF0000";
	    var color2 = colorArr[colorFlag];
	    var areaName = "区域"+colorFlag+"-["+longitudes+"°,"+latitudes+"],半径:"+radiusa+"米。";
		//var map = _map;
		
		//圆形
		if(shapeid == 'circle'){
			//在地图上显示区域图形
			//alert("画图:>>>"+colorFlag+","+shapeid+","+longitudes+","+latitudes+","+radius);
			var pPoints = longitudes+","+latitudes+","+radius;
			var pCircle = new Circle(pPoints,color1,5,0.3,color2);
			pCircle.addListener("click",function(){pCircle.openInfoWindowHtml("<span>区域碰撞:</span>"+areaName);});// 添加点击事件的响应
			_map.uEzMap.addOverlay(pCircle);
			areaarr2.push(pCircle);
		}
		//方形
		if(shapeid == 'square'){
			//在地图上显示区域图形
			var pPoints = longitudes.split(',')[0]+","+latitudes.split(',')[0]+","+longitudes.split(',')[1]+","+latitudes.split(',')[1];
			var pRectangle = new Rectangle(pPoints,color1,5,0.3,color2);
			pRectangle.addListener("click",function(){pRectangle.openInfoWindowHtml("<span>区域名称：</span>"+areaName);});// 添加点击事件的响应
			map.uEzMap.addOverlay(pRectangle);
		}
		areaCount++;
	}
  
  //时间碰撞
  function onshowAddedAreaMapYN(colorFlag){
	    var color1 = "FF0000";
	    var color2 = colorArr[colorFlag];
	    var areaName = "时间碰撞-区域"+colorFlag;
	  	
		var map = _map;
		//图形形状(方形/圆形)区域形状；circle：圆形；square：方形
		var shape = $("#shapeId").val(); 
		//经度
		var longitudes = $("#longitudes").val();
		//纬度
		var latitudes = $("#latitudes").val();
		//半径(圆形情况下)
		var radius = $("#radius").val();
		
		//圆形
		if(shape == 'circle'){
			//在地图上显示区域图形
			var pPoints = longitudes+","+latitudes+","+radius;
			var pCircle = new Circle(pPoints,color1,5,0.3,color2);
			pCircle.addListener("click",function(){pCircle.openInfoWindowHtml("<span>区域名称：</span>"+areaName);});// 添加点击事件的响应
			map.uEzMap.addOverlay(pCircle);
			areaarr2.push(pCircle);
		}
		//方形
		if(shape == 'square'){
			//在地图上显示区域图形
			var pPoints = longitudes.split(',')[0]+","+latitudes.split(',')[0]+","+longitudes.split(',')[1]+","+latitudes.split(',')[1];
			var pRectangle = new Rectangle(pPoints,color1,5,0.3,color2);
			pRectangle.addListener("click",function(){pRectangle.openInfoWindowHtml("<span>区域名称：</span>"+areaName);});// 添加点击事件的响应
			map.uEzMap.addOverlay(pRectangle);
		}
		areaCount++;
	}
  
  
  
//add by yangxuanbo
function addRow() {
	var uis = document.getElementById("uiId");
	var liSize=uis.children.length;
		var li= document.createElement("li");
		li.className = "clearfix";
		//li.id = "liId" + liSize;
		li.innerHTML='<label class="left">起始时间</label> ' 
								+ '<div class="left calanderBar divMar"> '
								+ '	<input type="text" class="left" id="ynaddbeginTime' + liSize + '" name="starttimeStr' + liSize + '" value="" onclick="WdatePicker({skin:\'whyGreen\',dateFmt:\'yyyy-MM-dd HH:mm:ss\'})"  /> '
								+ ' </div> '
								+ ' <div class="left calanderBar"> '
								+ '	<input type="text" class="left" id="ynaddendTime' + liSize + '" name="endtimeStr' + liSize + '" value="" onclick="WdatePicker({skin:\'whyGreen\',dateFmt:\'yyyy-MM-dd HH:mm:ss\'})" /> '
								+ ' </div>'
								+ ' <div><a href="javascript:;" class="left areaTabCenter" onclick="deleteRow(this)">删除</a></div>';
	uis.appendChild(li);
}
//add by yangxuanbo
function deleteRow(obj) {
	obj.parentElement.parentElement.remove();
}
//add by yangxuanbo
/**
 * 查询碰撞数据
 */
function ynAreapzByTime(){
	var uis = document.getElementById("uiId");
	var liSize=uis.children.length;
	if(liSize<2) {
		alert("请选择两个以上时间段进行碰撞查询!");
		return;	
	}
	
	var url = basePath +"crashAnalyseController/getpzA111ByTime?time=";
	var app = "";
	for(var i = 0; i<liSize; i++) {
		var start = $("#ynaddbeginTime"+i).val();
		var end = $("#ynaddendTime"+i).val();
		if(i != 0) {
			app += ",";
		}
		if(start && end && start.trim()!="" && end.trim()!="") {
			app = app + start + "," + end;
		} else {
			alert("起始时间不能为空！");
			return;
		}
	}
	url = url + app;
	$.ajax({
		url: url,                        // 提交的页面
       	data: $('#saveAreaForm').serialize(), // 从表单中获取数据
       	type: "POST",                         // 设置请求类型为"POST"，默认为"GET"
       	error: function(request) {            // 设置表单提交出错
        	//alert("表单提交出错，请稍候再试");
        	alert("session超时，请刷新页面重新操作！");
       	},
       	dataType : "json",
       	success: function(data) {             // 设置表单提交完成使用方法
			$("#ynaddImportantArea0").css("display","none");
			pzshowquery0(pziphonecount,data);
        	$('#jcpzjgdiv').show();
       }
   });
}
//add by yangxuanbo
function pzshowquery0(i,data){
	var j = 1;
	$(data).each(function(){
		var iphone = this["iphone"].split(',')[0];
		var vtpid = this["iphone"].split(',')[1];
		$('#pzphone'+j).html('手机号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+iphone+'&nbsp;&nbsp;&nbsp;');
		if(vtpid!=0){
			$('#pzimg'+j).attr('src',basePath+'webui/common/images/u66_normal.png');
			$('#pzimg'+j).show();
		}
		var detailInfo = this['am'];
		var n = 1;
		$(detailInfo).each(function(){
			var c = 0;
			if(n==1){
				c = 0;
			}
			if(n==2){
				c = 2;
			}
			if(n==3){
				c = 4;
			}
			$('#pzqu'+j+n).html(this['name']);
			$('#pzimg'+j+n).attr('src',basePath+'webui/common/images/u6'+c+'_normal.png');
			$('#pzimg'+j+n).show();
			$('#pzjz'+j+n).html('基站 '+this['jzcount']);
			
			n++;
		});
		$('#pzqu'+j).show();
		j++;
	});
	$('#ynjglb').html("时间交叉碰撞结果");

	pziphonecount++;
}

String.prototype.trim = function ()  
{  
    return this.replace(/(^\s*)|(\s*$)/g, "");  
}
