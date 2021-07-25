/* First 4 variables extracted from conf.xml file */
/**-------new------**/
/* Tile layers & map MUST have same projection */
var proj = 'EPSG:4326';

/* Layer can also accept serverResolutions array
 * to deal with situation in which layer resolution array & map resolution
 * array are out of sync*/
var mapResolutions = [ 1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625,
		0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625,
		0.00274658203125, 0.001373291015625, 0.0006866455078125,
		0.00034332275390625, 0.000171661376953125, 0.0000858306884765625,
		0.00004291534423828125, 0.00002145767211914063, 0.00001072883605957031,
		0.0000005364418029785156 ];//

/* For this example this next line is not really needed, 256x256 is default.
 * However, you would need to change this if your layer had different tile sizes */
var tileSize = new OpenLayers.Size(256, 256);

/* Tile Origin is required unless it is the same as the implicit map origin
 * which can be affected by several variables including maxExtent for map or base layer */
var agsTileOrigin = new OpenLayers.LonLat(-180, 90);

/* This can really be any valid bounds that the map would reasonably be within */
var mapExtent = new OpenLayers.Bounds(72.421875, 17.9296875, 135.703125,
		54.4921875);
var restrictExtent = new OpenLayers.Bounds(70.31265, 1.40003, 137.81815,
		46.24927);
var mapUrl = 'http://192.168.1.244:8585/map/TDTSL/_alllayers';
/**-------new------**/
/**-------old------**/
  //var lon = 108.32,lat = 22.82;//初始化地图中心点坐标
var lon =103.94180344531256/1,lat =36.07288198489416/1;
//var lon =103.94180344531256/1,lat =100000.07288198489416/1;
var zoom = 8;//初始化地图级别
var vectors;//声明矢量图层
var navHistory;//导航操作日志
var featurePopup = null;//弹出题注框
var jsonData=null;
var currentFeature;
 /** --------old------**/
var markers;
var map;
var vectorshj;
function init() {
	map = new OpenLayers.Map('mymap', {
		maxExtent : mapExtent,
		restrictedExtent:restrictExtent,
		controls : [ new OpenLayers.Control.Navigation(),
				new OpenLayers.Control.PanZoomBar(),
				new OpenLayers.Control.MousePosition() ]
	});

	var baseLayer = new OpenLayers.Layer.ArcGISCache('tdt', mapUrl, {
		tileOrigin : agsTileOrigin,
		resolutions : mapResolutions,
		sphericalMercator : true,
		maxExtent : mapExtent,
		useArcGISServer : false,
		isBaseLayer : true,
		type : 'png',
		projection : proj
	});

	 //获取鼠标当前标
    /*map.addControl(
            new OpenLayers.Control.MousePosition({
                prefix: 'WGS84 coordinates:',
                separator: ' | ',
                numDigits: 5,
                emptyString: ''
            })
        );*/
    
    //获取当前图层比例尺
    //map.events.register("moveend", null, displayZoom);
	
	map.addLayers([ baseLayer ]);

	/*map.zoomToExtent(new OpenLayers.Bounds(72.421875, 17.9296875, 135.703125,
			54.4921875));*/
	map.setCenter(new OpenLayers.LonLat(lon, lat), zoom);

	//编辑图层
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;

    vectors = new OpenLayers.Layer.Vector("gjline", {
        renderers: renderer
    });
    
    
    markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);
    
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
	renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
	//console.log("renderer:"+renderer);
	vectorshj = new OpenLayers.Layer.Vector("hjdrawLine", {
		renderers: renderer
	});
    
	map.addLayers([vectorshj,vectors]);
	
    /*controls = {
            point: new OpenLayers.Control.DrawFeature(vectors,
                      OpenLayers.Handler.Point),
            line: new OpenLayers.Control.DrawFeature(vectors,
                        OpenLayers.Handler.Path),
            polygon: new OpenLayers.Control.DrawFeature(vectors,
                        OpenLayers.Handler.Polygon),
            box: new OpenLayers.Control.DrawFeature(vectors,
            		OpenLayers.Handler.RegularPolygon,{handlerOptions:{sides:4,irregular:true}}),
            zoomOutBox: new OpenLayers.Control.ZoomBox()
        };
    for(var key in controls) {
        map.addControl(controls[key]);
        controls[key].featureAdded=function(feature){
        	currentFeature=feature;
        	var bounds = feature.geometry.getBounds();
        	document.getElementById("jxqy_val").value=bounds.toString();
//        	map.zoomToExent(new OpenLayers.Bounds(bounds));
        };
    }
    
    //选择高亮
    var sf = new OpenLayers.Control.SelectFeature(vectors);
    map.addControl(sf);
    sf.activate();
    
	navHistory = new OpenLayers.Control.NavigationHistory();
    map.addControl(navHistory);
    
    vectors.events.register("beforefeatureadded","临时",delFeature);
	disMeasure();*/
}

/**
 * 显示地图比例尺
 * @param ioo
 * @returns {Boolean}
 */
function displayZoom() {
   // document.getElementById("zoom").innerHTML = map.zoom.toFixed(4);
}
/**
 * 放大，缩小
 * @param ioo
 * @returns {Boolean}
 */
function inOrOut(ioo){
	switch (ioo){
		case 'in':
			map.zoomIn();
			break;
		case 'out':
			map.zoomOut();
			break;
		default:
			return false;
	}
}

/**
 * 清空所有图层
 * @param ioo
 * @returns {Boolean}
 */
function removeAllVector(){
	
	if (vectors != null) {
		vectors.removeAllFeatures();
	}
	//轨迹数据清除
	if(jsonData!=null){
	  for ( var j = 0; j < jsonData.result.length; j++) {
		deleteTempLayer("point"+jsonData.result[j].phone);
		deleteTempLayer("line"+jsonData.result[j].phone);
		deleteTempLayer("arrow"+jsonData.result[j].phone);
	  }
	  pointXY = [];//轨迹数据为空
	}
	
	
	deleteTempLayer("轨迹点");
	deleteTempLayer("轨迹线");
	deleteTempLayer("轨迹箭头");
	deleteTempLayer("轨迹回放线");
	pointXY = [];//轨迹数据为空
	
	deleteTempLayer("碰撞");
	deleteTempLayer("查询结果图层");
	deleteTempLayer("marker");
	
	deleteTempLayer("findMarker");
	
	//删除伴随分析结果轨迹
	deleteTempLayer("bsfx_point");
	deleteTempLayer("bsfx_line");
	deleteTempLayer("bsfx_arrow");
	
	deleteTempLayer("crashMarker");
	deleteTempLayer("crashCircle");
	
	//删除点位
	deleteTempLayer("cluster");
	
}

/**
 * 显示图层控制
 * @param ioo
 * @returns {Boolean}
 */
function onDisplayLayer(onLayerName){
	switch(onLayerName){
		case'onChinaLayer':
			if($("#onChinaLayer").attr("checked")=='checked'){
				chinaLayer.setVisibility(true);
			}else{
				chinaLayer.setVisibility(false);
			}
			break;
		case'onShenghuiLayer':
			if($("#onShenghuiLayer").attr("checked")=='checked'){
				shenghuiLayer.setVisibility(true);
			}else{
				shenghuiLayer.setVisibility(false);
			}
			break;
		case'onGongluLayer':
			if($("#onGongluLayer").attr("checked")=='checked' && map.getZoom()>3){
				gongluLayer.setVisibility(true);
			}else{
				gongluLayer.setVisibility(false);
			}
			break;
		case'onXianchengLayer':
			if($("#onXianchengLayer").attr("checked")=='checked' && map.getZoom()>5){
				xianchengLayer.setVisibility(true);
			}else{
				xianchengLayer.setVisibility(false);
			}
			break;
		case'onBsidLayer':
			if($("#onBsidLayer").attr("checked")=='checked'){
				bsidLayer.setVisibility(true);
			}else{
				bsidLayer.setVisibility(false);
			}
			break;
		case'onVectorLayer':
			if($("#onVectorLayer").attr("checked")=='checked'){
				/**
				 * 画气象点
				 */
				vectorLayer = new OpenLayers.Layer.Vector("气象");
				var feature = new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.Point(110,31),
				 {some:'data'},
				 {externalGraphic: 'gis/img/marker.png', graphicHeight: 21, graphicWidth: 16});
				vectorLayer.addFeatures(feature);
				map.addLayers([vectorLayer]);
			}else{
				//vectorLayer.display(false);
				vectorLayer.destroy();
			}
			break;
		default:
			return false;
	}
}
/**
 * 地图归心
 * @param ioo
 * @returns {Boolean}
 */
function mapRestore(){
	map.zoomToMaxExtent();
}
/**
 * 地图前进，后退
 * @param ioo
 * @returns {Boolean}
 */
function mapHistoryBack(navValue){
	if(navValue=="previous"){
		navHistory.previous.trigger();
	}else if(navValue=="next"){
		navHistory.next.trigger();
	}
}
/**
 * 根据比例尺动态显隐控制图层
 * @param ioo
 * @returns {Boolean}
 */
function zoomChanged() {
	zoom = map.getZoom();
	if($("#onShenghuiLayer").attr("checked")=='checked'){
		if (zoom > 2) {
			shenghuiLayer.setVisibility(true);
		}else{
			shenghuiLayer.setVisibility(false);
		}
	}else{
		shenghuiLayer.setVisibility(false);
	}
	
	if($("#onGongluLayer").attr("checked")=='checked'){
		if (zoom > 3) {
			gongluLayer.setVisibility(true);
		}else{
			gongluLayer.setVisibility(false);
		}
	}else{
		gongluLayer.setVisibility(false);
	}
	
	if($("#onXianchengLayer").attr("checked")=='checked'){
		if (zoom > 5) {
			xianchengLayer.setVisibility(true);
		}else{
			xianchengLayer.setVisibility(false);
		}
	}else{
		xianchengLayer.setVisibility(false);
	}	
	
}

/**
 * 空间查询
 * @param null
 * @returns null
 */
function onBsidMapClick(e){
	if($("#onBsidLayer").attr("checked")=='checked'){
		
	}else{
    	return false;
	}
	var wms_url=geoUrl+"/geoserver/gispt/wms?";
	var wms_layer = "gispt:bsid_point";
    var params = {
    		REQUEST:"GetFeatureInfo",// WMS GetFeatureInfo
    		BBOX:map.getExtent().toBBOX(),// 地图的地图范围
    		WIDTH:map.size.w,// 地图的宽度
    		HEIGHT:map.size.h,// 地图高度
    		X:e.xy.x,// 屏幕坐标X
    		Y:e.xy.y,// 屏幕坐标X
    		QUERY_LAYERS:map.layers[4].params.LAYERS,// 定义要查询的图层
    		INFO_FORMAT:"application/json",// GetFeatureInfo返回格式application/json(json)  text/html(html)
    		FEATURE_COUNT:1,// 最大返回的Feature个数
    		Layers:wms_layer,// WMS 图层列表
    		Styles:"",// 图层样式
    		format:"image/png",// 地图格式
    		EXCEPTIONS:"application/vnd.ogc.se_xml"// Exception 类型
    };
    document.getElementById('click_response').innerHTML="正在进行空间查询,请耐心等待.....";
    OpenLayers.loadURL(wms_url,params,this,onComplete,onFailure);
    OpenLayers.Event.stop(e);
}
function onComplete(response)
{
	var features = $.parseJSON(response.responseText);
	var textValue="";
	if (features.features.length != 0) {
		var address = features.features[0].properties.address;
		var longnum = features.features[0].properties.longnum;
		var lat = features.features[0].properties.lat;
		textValue = "经度:"+longnum+" 纬度:"+lat+" 地址:"+address;
	}
	document.getElementById('click_response').innerHTML = textValue;
}
function onFailure(response)
{
	document.getElementById('click_response').innerHTML = "查询失败";
}

/**
 * 删除图层
 * @param null
 * @returns null
 */
function deleteTempLayer(tempName){
	var layerLength = map.getLayersByName(tempName).length;
	for ( var i = 0; i < layerLength; i++) {
		var tempLayer = map.getLayersByName(tempName)[0];
		if(tempLayer != null && tempLayer != undefined){
			map.removeLayer(tempLayer);
		}
	}
}
/**
 * 地图全屏
 * @param null
 * @returns null
 */
function maxExtent(){
//	$("#map").css({
//		"margin":0,
//		"width":$(document).height(),
//		"height":$(document).width()
//	});
}

/**
 *  地图清除
 */
function clean() {
	//清除地图气泡框singlepopup
	if(popup){
		map.removePopup(popup);
		
	}
	if(singlepopup){
		map.removePopup(singlepopup);		
	}
	//清除地图工具栏
	 for(key in measureControls) {
	        var control = measureControls[key];	      
	            control.deactivate();       
	}
	//清除网格
	if (window.grid) {
		window.grid.deactivate();
	}
	
	//window.grid.destroy();
	$('#echart_wrap').hide();
	
	//清除碰撞表单数据
	$("#savemutilAreaForm > input").each(function() {
		$(this).attr("value","");
	});
	$("#saveAreaForm > input").each(function(){
		$(this).attr("value","");
	});
	$("#pointcrashForm > input").each(function() {
		$(this).attr("value","");
	});
	
	//清除查询结果
	$('#crashCards , #trailCards , #pointCards , .active').html("");
	
	removeAllVector();
}
/**
 * @author rongrong
 * @param type 类型
 * @returns String 点位类型
 */
function getPointType(type){
	var pointtype = "";
	if(type.split(",")[0] == "bsid"){
		pointtype = "BSID";
	}else if(type.split(",")[0] == "lbs"){
		pointtype = "服务场所编码";
	}else if(type.split(",")[0] == "app"){
		pointtype = "APP";
	}else if(type.split(",")[0] == "ad"){
		pointtype = "ADSL宽带账号";
	}else if(type.split(",")[0] == "bar"){
		pointtype = "服务场所编码";
	}else if(type.split(",")[0] == "卡口"){
		pointtype = "卡口编号";
	}else if(type.split(",")[0] == "wifi"){
		pointtype = "服务场所编码";
	}
	return pointtype;
}
/**
 * 点击标注弹出框
 * @param evt 点击消息事件
 * @returns {}
 */
function onFeatureSelect(evt) {
	featurePopup = evt.feature;
	var pointtype = getPointType(featurePopup.attributes.type.split(",")[0]); //获取点位类型,基站，LBS,APP，ad,网吧,wifi
    var popup = new OpenLayers.Popup.FramedCloud(featurePopup.attributes.id,
            new OpenLayers.LonLat(featurePopup.geometry.x,featurePopup.geometry.y),
            new OpenLayers.Size(200,200),
            pointtype+"："+featurePopup.attributes.type.split(",")[1]+"<br>名称："+featurePopup.attributes.address+"<br>地址："+featurePopup.attributes.address+"<br>经度："+featurePopup.geometry.x+"<br>纬度："+featurePopup.geometry.y,
            null,
            true,
            function(){
    			map.removePopup(this);
    		    this.destroy();
    		});
    featurePopup.popup = popup;
    map.addPopup(popup,true);
}
/**
 * 释放标注内存
 * @param evt 获取消息事件
 * @returns {}
 */
function onFeatureUnselect(evt) {
	featurePopup = evt.feature;
	if(featurePopup != null){
		map.removePopup(featurePopup.popup);
	    featurePopup.popup.destroy();
	    featurePopup.popup = null;
	    featurePopup = null;
	}
}
/**
 * 清除弹出题注框
 * @param null
 * @returns null
 */
function clearOneMarker(){
	if(featurePopup != null){
		 map.removePopup(featurePopup.popup);
		 featurePopup.popup.destroy();
		 featurePopup.popup = null;
		 featurePopup = null;
	}
}
/**
 * 动态画点线面
 * @param element
 */
function toggleControl(element) {
    for(key in controls) {
        var control = controls[key];
        if(element == key) {
            control.activate();
        } else {
            control.deactivate();
        }
    }
}
/**
 * 测距
 * @param element
 */
function toggleMeasureControl(element) {
    for(key in measureControls) {
        var control = measureControls[key];
        if(element == key) {
            control.activate();
        } else {
            control.deactivate();
        }
    }
}
/**
 * 初始化测距、面积
 * @param null
 * @returns null
 */
function disMeasure(){
    var sketchSymbolizers = {  
        "Point": {  
        pointRadius: 4,  
            graphicName: "square",  
            fillColor: "white",  
            fillOpacity: 1,  
            strokeWidth: 1,  
            strokeOpacity: 1,  
            strokeColor: "#333333"  
        },  
        "Line": {  
            strokeWidth: 2,  
            strokeOpacity: 1,  
            strokeColor: "#0383fb"  
           // strokeDashstyle: "dash"
        },  
        "Polygon": {  
            strokeWidth: 2,  
            strokeOpacity: 0.5,  
            strokeColor: "#0383fb",  
            fillColor: "#d0e5e7",  
            fillOpacity: 0.3  
        }  
    };  
    var style = new OpenLayers.Style();  
    style.addRules([  
        new OpenLayers.Rule({symbolizer: sketchSymbolizers})  
    ]);  
    var styleMap = new OpenLayers.StyleMap({"default": style});   
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;  
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;  

    measureControls = {  
        line: new OpenLayers.Control.Measure(  
            OpenLayers.Handler.Path, {  
                persist: true,  
                handlerOptions: {  
                    layerOptions: {  
                        renderers: renderer,  
                        styleMap: styleMap  
                    }  
                }  
            }  
        ),  
        polygon: new OpenLayers.Control.Measure(  
            OpenLayers.Handler.Polygon, {  
                persist: true,  
                handlerOptions: {  
                    layerOptions: {  
                        renderers: renderer,  
                        styleMap: styleMap  
                    }  
                }  
            }  
        )  
    };
    for(var key in measureControls){
       var control = measureControls[key];  
        control.events.on({  
            "measure": handleMeasureEnd,  
            "measurepartial": handleMeasureMiddle  
        });
        map.addControl(control);
    }
}
/**
 * 最后双击测距、面积完成 
 * @param null
 * @returns null
 */
var popup;//全局测距或测面标注栏
function handleMeasureEnd(event) {
	if (popup != null) {
		popup.destroy(); 
		popup=null;
	}
   	var geometry = event.geometry;
    var units = event.units;
    var order = event.order;
   	var measure = event.measure;
    var out = "";
    if(order == 1) {  
        out = "距离: " + measure.toFixed(3) + " " + units;  
    } else {  
        out = "面积: " + measure.toFixed(3) + " " + units;  
    }  
    if(event.geometry.components.length == 0){
    	return false;
    }
    var point = event.geometry.components[event.geometry.components.length-1];      
    //画多边形侧面积时候最后一个点坐标取值方法与测距不一样
    if(event.geometry.CLASS_NAME.indexOf('LineString')==-1){
    	point=event.geometry.components[0].components[event.geometry.components[0].components.length-1];
    }
    popup = new OpenLayers.Popup("popup",  
            new OpenLayers.LonLat(point.x,point.y),  
            new OpenLayers.Size(100,40),  
            out,  
            false);  
    popup.setBackgroundColor("#ffffff");  
    popup.setOpacity(1);  
    popup.setBorder("1px solid #d91f12");  
	map.addPopup(popup);
}
/**
 * 单击地图测距、面积 
 * @param null
 * @returns null
 */
function handleMeasureMiddle(event) {
	if (popup != null) {
		popup.destroy(); 
		popup=null;
	}
}

function deleteFeature() {
	//删除之前的画图
	vectors.removeAllFeatures();
	//清空画的图层信息
	document.getElementById('jxqy_val').value="";
}

function line222(data) {
	vectors.removeAllFeatures();
	var ls = map.getLayersByName("Markers");
	if (ls.length>0) {
		map.removeLayer(ls[0]);
	}
	var color =OpenLayers.Feature.Vector.style = {
		'ONE': {
			strokeColor: "#FF0000",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		},  
		'TWO': {  
			strokeColor: "#EE11C2",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		},
		'THREE': {
			strokeColor: "#448CBB",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		},
		'FOUR': {
			strokeColor: "#11EE3D",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		},
		'FIVE': {
			strokeColor: "#09F7F7",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		},
		'SIX': {
			strokeColor: "#A913A9",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		}
	};
	
	var len = data.length;
	var result;
	var personId = "";
	for (var i = 0; i < len; i++) {
		var cc;
		switch (i) {
		case 0:
			cc = color.ONE;
			break;
		case 1:
			cc = color.TWO;
			break;
		case 2:
			cc = color.THREE;
			break;
		case 3:
			cc = color.FOUR;
			break;
		case 4:
			cc = color.FIVE;
			break;
		case 5:
			cc = color.SIX;
			break;
		default:
			cc = color.SEVEN;
		}
		
		var pointList=[];
		var lineFeature;
		var lonlat = data[i].pnts;
		var lonlatarray = lonlat.split(',');
		if (lonlatarray.length == 1 && lonlatarray[0] == "") {
			personId += data[i].personId.replace("person", "人员") + "、";
		} else {
			for(var j = 0;j<lonlatarray.length;j+=2) {
				result=lonlatarray.slice(j,j+2);
				var temp =new OpenLayers.Geometry.Point(result[0],result[1]);
				pointList.push(temp);
			}
		}
		
		lineFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(pointList),null,cc);
		vectors.addFeatures(lineFeature);
		map.addLayers([vectors]);
		map.setCenter(new OpenLayers.LonLat(lonlatarray.toString().split(',')[0]/1,lonlatarray.toString().split(',')[1]/1), 9);
	}
	if ("" != personId) {
		$("#cnt_alarm").html(personId.substring(0, personId.length-1) + " 无轨迹数据！");
	}
}

function lineNavigateArr(data) {
	vectors.removeAllFeatures();
	var ls = map.getLayersByName("Markers");
	if (ls.length>0) {
		map.removeLayer(ls[0]);
	}
	var color =OpenLayers.Feature.Vector.style = {
		'ONE': {
			strokeColor: "#FF0000",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		},
		'TWO': {
			strokeColor: "#EE11C2",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		},
		'THREE': {
			strokeColor: "#448CBB",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		},
		'FOUR': {
			strokeColor: "#11EE3D",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		},
		'FIVE': {
			strokeColor: "#09F7F7",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		},
		'SIX': {
			strokeColor: "#A913A9",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		}
	};
	var markers = new OpenLayers.Layer.Markers("Markers");
	map.addLayer(markers);
	var len = data.length;
	var pnts;
	var personId = "";
	for (var i = 0; i < len; i++) {
		var c;
		switch (i+1) {
			case 1:
				c=color.ONE;
				break;
			case 2:
				c=color.TWO;
				break;
			case 3:
				c=color.THREE;
				break;
			case 4:
				c=color.FOUR;
				break;
			case 5:
				c=color.FIVE;
				break;
			case 6:
				c=color.SIX;
				break;
		}
		var lineFeature;
		var nagivateArr = data[i].nagivateArr;
		var result;
		if (0 < nagivateArr.length) {
			for (var j=0; j<nagivateArr.length; j++) {
				pnts = nagivateArr[j].pnts;
				var pntsarray = pnts.split(',');
				var pointList=[];
				var pot=[];
				for(var jm = 0; jm < pntsarray.length; jm+=2) {
					result=pntsarray.slice(jm,jm+2);
					var temp =new OpenLayers.Geometry.Point(result[0],result[1]);
					pointList.push(temp);
					pot.push(result[0]);
					pot.push(result[1]);
				}
				lineFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(pointList),null,c);
					
				var size = new OpenLayers.Size(21,25);
				var offset = new OpenLayers.Pixel(-(size.w/2),-size.h);
				var starticon = new OpenLayers.Icon('../img/marker.png',size,offset);
				var endticon = new OpenLayers.Icon('../img/capture.png',size,offset);
				markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(pot[0],pot[1]),starticon));
				markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(pot[2],pot[3]),endticon));
				
				vectors.addFeatures(lineFeature);
				if (j == nagivateArr.length-1) {
					var valArr = pnts.split(",");
					var lastPoint = valArr[valArr.length-2] + "," + valArr[valArr.length-1];
					map.setCenter(new OpenLayers.LonLat(lastPoint.split(',')[0]/1,lastPoint.split(',')[1]/1), 9);
				}
			}
		} else {
			personId += data[i].personId.replace("person", "人员") + "、";
		}
	}
	if ("" != personId) {
		$("#cnt_alarm").html(personId.substring(0, personId.length - 1) + " 无痕迹数据！");
	}
}


function delFeature()
{
	if(currentFeature!=undefined)
	{
		vectors.removeFeatures(currentFeature);
	}
}


function addMarkf(lon,lat)
{
	var markers = new OpenLayers.Layer.Markers( "Markers" );
	map.addLayer(markers);
	var size = new OpenLayers.Size(20,20);
	var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
	var icon = new OpenLayers.Icon('../../img/position.png', size, offset);
	markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(lon,lat),icon));
	markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(lon,lat),icon.clone()));
}
function addPopupf(lon,lat,width,lenght,content)
{
	var popup = new OpenLayers.Popup(lon+lat,
            new OpenLayers.LonLat(lon,lat),
            new OpenLayers.Size(width,lenght),
            "<p style='color:red;font-size:4px;'>"+content.substring(5,16)+"</p>",
            true);
	map.addPopup(popup);
}

function clear()
{
	var laye = map.getLayersByName("Markers");
	var popups = map.popups;
	if(laye.length>0)
	{
		for(var i =0;i<laye.length;i++)
		{
			map.removeLayer(laye[i]);
		}
	}
	if(popups.length>0)
	{
		for(var j=0;j<popups.length;j++)
		{
			map.removePopup(popups[j]);
		}
	}
	vectors.removeAllFeatures();
}

var monitorFeature;
var buttonId;
function monitorPolgyon(id)
{
	if(id==undefined||id==null||id=="")
	{
		return false;
	}
	
	buttonId = id;
	var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
	
	var vlayer = new OpenLayers.Layer.Vector("drawPolygon", {
		renderers: renderer});
	
	if(monitorFeature!=undefined)
	{
		vectors.removeFeatures(monitorFeature);
		document.getElementById('jxqy_val').value="";
	}
	
	var style = {
			fillColor:"#FFD308",
			fillOpacity: 0.3,
			strokeColor:"#FFD308",
			strokeOpacity: 1,
			strokeWidth: 1,
			strokeDashstyle: "solid"
		};
	vlayer.styleMap.styles.default.defaultStyle = style;
	
	vlayer.events.register("beforefeatureadded",null,function delLayer(){
		if(buttonId=="hzjxqy"&&monitorFeature!=undefined)
		{
			vlayer.removeFeatures(monitorFeature);
		}
	});
	
	var polgyonControl = new OpenLayers.Control.DrawFeature(vlayer,OpenLayers.Handler.RegularPolygon,{handlerOptions:{sides:4,irregular:true}});
	
	
	if(id=="hzjxqy")
	{
		polgyonControl.featureAdded= function(feature){
			monitorFeature = feature;
			var bounds = feature.geometry.getBounds();
        	document.getElementById("jxqy_val").value=bounds.toString();
		};
	}
	
    map.addLayers([vlayer]);
    
	map.addControl(polgyonControl);
	
	polgyonControl.activate();
}

/**
 * 画线
 */
function line(dt){
	console.log(dt)
	console.log(dt.result)
	var data = dt.result
	var len = data.length;
	var personId = "";
	var color =OpenLayers.Feature.Vector.style = {
			'ONE': {
				strokeColor: "#FF0000",
				strokeOpacity: 1,
				strokeLinecap: "round",
				strokeWidth: 2,
				strokeDashstyle: "solid",
				labelOutlineWidth: 3
			},  
			'TWO': {  
				strokeColor: "#EE11C2",
				strokeOpacity: 1,
				strokeLinecap: "round",
				strokeWidth: 2,
				strokeDashstyle: "solid",
				labelOutlineWidth: 3
			},
			'THREE': {
				strokeColor: "#448CBB",
				strokeOpacity: 1,
				strokeLinecap: "round",
				strokeWidth: 2,
				strokeDashstyle: "solid",
				labelOutlineWidth: 3
			},
			'FOUR': {
				strokeColor: "#11EE3D",
				strokeOpacity: 1,
				strokeLinecap: "round",
				strokeWidth: 2,
				strokeDashstyle: "solid",
				labelOutlineWidth: 3
			},
			'FIVE': {
				strokeColor: "#09F7F7",
				strokeOpacity: 1,
				strokeLinecap: "round",
				strokeWidth: 2,
				strokeDashstyle: "solid",
				labelOutlineWidth: 3
			},
			'SIX': {
				strokeColor: "#A913A9",
				strokeOpacity: 1,
				strokeLinecap: "round",
				strokeWidth: 2,
				strokeDashstyle: "solid",
				labelOutlineWidth: 3
			}
		};
	for (var i = 0; i < len; i++) {
		var cc;
		switch (i) {
		case 0:
			cc = color.ONE;
			break;
		case 1:
			cc = color.TWO;
			break;
		case 2:
			cc = color.THREE;
			break;
		case 3:
			cc = color.FOUR;
			break;
		case 4:
			cc = color.FIVE;
			break;
		case 5:
			cc = color.SIX;
			break;
		default:
			cc = color.SEVEN;
		}
		var pointList=[];
		var lineFeature;
		var lonlat = data[i].pnts;
		var lonlatarray = lonlat.split(',');
		if (lonlatarray.length == 1 && lonlatarray[0] == "") {
			personId += data[i].personId.replace("person", "人员") + "、";
		} else {
			for(var j = 0;j<lonlatarray.length;j+=2) {
				result=lonlatarray.slice(j,j+2);
				var temp =new OpenLayers.Geometry.Point(result[0],result[1]);
				pointList.push(temp);
			}
		}
		var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
		renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
		//console.log("renderer:"+renderer);
		var vectors = new OpenLayers.Layer.Vector("drawLine", {
			renderers: renderer
		});
		lineFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(pointList),null,cc);
		console.log(lineFeature);
		vectors.addFeatures([lineFeature]);
		map.addLayers([vectors]);
	}
}

function drawPolygon(){
				var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
				var vlayer = new OpenLayers.Layer.Vector("drawPolygon", {
					renderers: renderer});
				var style = {
					fillColor:"green",
					fillOpacity: 0.3,
					strokeColor:"green",
					strokeOpacity: 1,
					strokeWidth: 1,
					strokeDashstyle: "solid"
				};
				vlayer.styleMap.styles.default.defaultStyle = style;
				polgyonControl = new OpenLayers.Control.DrawFeature(vlayer,OpenLayers.Handler.RegularPolygon,{handlerOptions:{sides:4,irregular:true}});
				
				map.addLayers([vlayer]);
    
				map.addControl(polgyonControl);
	
				polgyonControl.activate();
				
			}
	function myclearLayer(){
		vectors.removeAllFeatures();
		vectorshj.removeAllFeatures();
		markers.clearMarkers();
	}


function gjline(dt,objcnt_alarm){
	myclearLayer();
	var data = dt.result
	var len = data.length;
	var personId = "";
	var color =OpenLayers.Feature.Vector.style = {
			'ONE': {
				strokeColor: "#FF0000",
				strokeOpacity: 1,
				strokeLinecap: "round",
				strokeWidth: 2,
				strokeDashstyle: "solid",
				labelOutlineWidth: 3
			},  
			'TWO': {  
				strokeColor: "#EE11C2",
				strokeOpacity: 1,
				strokeLinecap: "round",
				strokeWidth: 2,
				strokeDashstyle: "solid",
				labelOutlineWidth: 3
			},
			'THREE': {
				strokeColor: "#448CBB",
				strokeOpacity: 1,
				strokeLinecap: "round",
				strokeWidth: 2,
				strokeDashstyle: "solid",
				labelOutlineWidth: 3
			},
			'FOUR': {
				strokeColor: "#11EE3D",
				strokeOpacity: 1,
				strokeLinecap: "round",
				strokeWidth: 2,
				strokeDashstyle: "solid",
				labelOutlineWidth: 3
			},
			'FIVE': {
				strokeColor: "#09F7F7",
				strokeOpacity: 1,
				strokeLinecap: "round",
				strokeWidth: 2,
				strokeDashstyle: "solid",
				labelOutlineWidth: 3
			},
			'SIX': {
				strokeColor: "#A913A9",
				strokeOpacity: 1,
				strokeLinecap: "round",
				strokeWidth: 2,
				strokeDashstyle: "solid",
				labelOutlineWidth: 3
			}
		};
	for (var i = 0; i < len; i++) {
		var cc;
		switch (i) {
		case 0:
			cc = color.ONE;
			break;
		case 1:
			cc = color.TWO;
			break;
		case 2:
			cc = color.THREE;
			break;
		case 3:
			cc = color.FOUR;
			break;
		case 4:
			cc = color.FIVE;
			break;
		case 5:
			cc = color.SIX;
			break;
		default:
			cc = color.SEVEN;
		}
		var pointList=[];
		var lineFeature;
		var lonlat = data[i].pnts;
		var lonlatarray = lonlat.split(',');
		if (lonlatarray.length == 1 && lonlatarray[0] == "") {
			personId += data[i].personId.replace("person", "人员") + "、";
		} else {
			for(var j = 0;j<lonlatarray.length;j+=2) {
				result=lonlatarray.slice(j,j+2);
				var temp =new OpenLayers.Geometry.Point(result[0],result[1]);
				var size = new OpenLayers.Size(21,25);
				var offset = new OpenLayers.Pixel(-(size.w/2),-size.h);
				
				var icon;
				if(j == 0){
					icontmp = '../img/marker.png';
					//icon = new OpenLayers.Icon('../img/marker.png',size,offset);
				}else if(j == (lonlatarray.length - 2)){
					icontmp = '../img/marker-blue.png';
					//icon = new OpenLayers.Icon('../img/capture.png',size,offset);
				}else{
					icontmp = '';
				}
				
				if(icontmp != ''){
					var icon = new OpenLayers.Icon(icontmp,size,offset);
					markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(result[0],result[1]),icon));
				}
				pointList.push(temp);
			}
		}
		lineFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(pointList),null,cc);
		/*var size = new OpenLayers.Size(21,25);
		var offset = new OpenLayers.Pixel(-(size.w/2),-size.h);
		var starticon = new OpenLayers.Icon('../img/marker.png',size,offset);
		var endticon = new OpenLayers.Icon('../img/capture.png',size,offset);
		markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(pot[0],pot[1]),starticon));
		markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(pot[2],pot[3]),endticon));*/
		console.log(lineFeature);
		vectors.addFeatures([lineFeature]);
		//map.addLayers([vectors]);
		map.setCenter(new OpenLayers.LonLat(lonlatarray.toString().split(',')[0]/1,lonlatarray.toString().split(',')[1]/1), 9);
	}
	if ("" != personId) {
		//alert($(objcnt_alarm))
		objcnt_alarm.html(personId.substring(0, personId.length-1) + " 无轨迹数据！");
	}
}




function hjlineNavigateArr(data,objcnt_alarm) {
	myclearLayer();
	/*var ls = map.getLayersByName("Markers");
	if (ls.length>0) {
		map.removeLayer(ls[0]);
	}*/
	var color =OpenLayers.Feature.Vector.style = {
		'ONE': {
			strokeColor: "#FF0000",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		},
		'TWO': {
			strokeColor: "#EE11C2",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		},
		'THREE': {
			strokeColor: "#448CBB",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		},
		'FOUR': {
			strokeColor: "#11EE3D",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		},
		'FIVE': {
			strokeColor: "#09F7F7",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		},
		'SIX': {
			strokeColor: "#A913A9",
			strokeOpacity: 1,
			strokeLinecap: "round",
			strokeWidth: 2,
			strokeDashstyle: "solid",
			labelOutlineWidth: 3
		}
	};
	
	var len = data.length;
	var pnts;
	var personId = "";
	for (var i = 0; i < len; i++) {
		var c;
		switch (i+1) {
			case 1:
				c=color.ONE;
				break;
			case 2:
				c=color.TWO;
				break;
			case 3:
				c=color.THREE;
				break;
			case 4:
				c=color.FOUR;
				break;
			case 5:
				c=color.FIVE;
				break;
			case 6:
				c=color.SIX;
				break;
		}
		var lineFeature;
		var nagivateArr = data[i].nagivateArr;
		var result;
		if (0 < nagivateArr.length) {
			for (var j=0; j<nagivateArr.length; j++) {
				pnts = nagivateArr[j].pnts;
				var pntsarray = pnts.split(',');
				var pointList=[];
				var pot=[];
				for(var jm = 0; jm < pntsarray.length; jm+=2) {
					result=pntsarray.slice(jm,jm+2);
					var temp =new OpenLayers.Geometry.Point(result[0],result[1]);
					pointList.push(temp);
					pot.push(result[0]);
					pot.push(result[1]);
				}
				lineFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(pointList),null,c);
					
				var size = new OpenLayers.Size(21,25);
				var offset = new OpenLayers.Pixel(-(size.w/2),-size.h);
				var starticon = new OpenLayers.Icon('../img/marker.png',size,offset);
				var endticon = new OpenLayers.Icon('../img/marker-blue.png',size,offset);
				markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(pot[0],pot[1]),starticon));
				markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(pot[2],pot[3]),endticon));
				
				vectorshj.addFeatures([lineFeature]);
				//map.addLayers([vectorshj])
				if (j == nagivateArr.length-1) {
					var valArr = pnts.split(",");
					var lastPoint = valArr[valArr.length-2] + "," + valArr[valArr.length-1];
					map.setCenter(new OpenLayers.LonLat(lastPoint.split(',')[0]/1,lastPoint.split(',')[1]/1), 9);
				}
			}
		} else {
			personId += data[i].personId.replace("person", "人员") + "、";
		}
	}
	if ("" != personId) {
		objcnt_alarm.html(personId.substring(0, personId.length - 1) + " 无痕迹数据！");
	}
}
