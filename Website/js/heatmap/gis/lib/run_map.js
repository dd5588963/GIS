/**
 * 基础地图模块代码
//-35.820934082031,56.334100341795,-35.586101318359,56.412377929686
 */
var hexarray= new Array(256);
hexarray[0]="00"; hexarray[1]="01"; hexarray[2]="02";
hexarray[3]="03"; hexarray[4]="04"; hexarray[5]="05";
hexarray[6]="06"; hexarray[7]="07"; hexarray[8]="08";
hexarray[9]="09"; hexarray[10]="0A"; hexarray[11]="0B"; 
hexarray[12]="0C"; hexarray[13]="0D"; hexarray[14]="0E";
hexarray[15]="0F"; hexarray[16]="10"; hexarray[17]="11";
hexarray[18]="12"; hexarray[19]="13"; hexarray[20]="14";
hexarray[21]="15"; hexarray[22]="16"; hexarray[23]="17";
hexarray[24]="18"; hexarray[25]="19"; hexarray[26]="1A";
hexarray[27]="1B"; hexarray[28]="1C"; hexarray[29]="1D";
hexarray[30]="1E"; hexarray[31]="1F"; hexarray[32]="20";
hexarray[33]="21"; hexarray[34]="22"; hexarray[35]="23";
hexarray[36]="24"; hexarray[37]="25"; hexarray[38]="26";
hexarray[39]="27"; hexarray[40]="28"; hexarray[41]="29"; 
hexarray[42]="2A"; hexarray[43]="2B"; hexarray[44]="2C";
hexarray[45]="2D"; hexarray[46]="2E"; hexarray[47]="2F";
hexarray[48]="30"; hexarray[49]="31"; hexarray[50]="32";
hexarray[51]="33"; hexarray[52]="34"; hexarray[53]="35";
hexarray[54]="36"; hexarray[55]="37"; hexarray[56]="38";
hexarray[57]="39"; hexarray[58]="3A"; hexarray[59]="3B";
hexarray[60]="3C"; hexarray[61]="3D"; hexarray[62]="3E";
hexarray[63]="3F"; hexarray[64]="40"; hexarray[65]="41";
hexarray[66]="42"; hexarray[67]="43"; hexarray[68]="44";
hexarray[69]="45"; hexarray[70]="46"; hexarray[71]="47";
hexarray[72]="48"; hexarray[73]="49"; hexarray[74]="4A";
hexarray[75]="4B"; hexarray[76]="4C"; hexarray[77]="4D";
hexarray[78]="4E"; hexarray[79]="4F"; hexarray[80]="50";
hexarray[81]="51"; hexarray[82]="52"; hexarray[83]="53";
hexarray[84]="54"; hexarray[85]="55"; hexarray[86]="56";
hexarray[87]="57"; hexarray[88]="58"; hexarray[89]="59";
hexarray[90]="5A"; hexarray[91]="5B"; hexarray[92]="5C";
hexarray[93]="5D"; hexarray[94]="5E"; hexarray[95]="6F";
hexarray[96]="60"; hexarray[97]="61"; hexarray[98]="62";
hexarray[99]="63"; hexarray[100]="64"; hexarray[101]="65";
hexarray[102]="66"; hexarray[103]="67"; hexarray[104]="68";
hexarray[105]="69"; hexarray[106]="6A"; hexarray[107]="6B";
hexarray[108]="6C"; hexarray[109]="6D"; hexarray[110]="6E";
hexarray[111]="6F"; hexarray[112]="70"; hexarray[113]="71";
hexarray[114]="72"; hexarray[115]="73"; hexarray[116]="74";
hexarray[117]="75"; hexarray[118]="76"; hexarray[119]="77";
hexarray[120]="78"; hexarray[121]="79"; hexarray[122]="7A";
hexarray[123]="7B"; hexarray[124]="7C"; hexarray[125]="7D";
hexarray[126]="7E"; hexarray[127]="7F"; hexarray[128]="80";
hexarray[129]="81"; hexarray[130]="82"; hexarray[131]="83";
hexarray[132]="84"; hexarray[133]="85"; hexarray[134]="86";
hexarray[135]="87"; hexarray[136]="88"; hexarray[137]="89";
hexarray[138]="8A"; hexarray[139]="8B"; hexarray[140]="8C";
hexarray[141]="8D"; hexarray[142]="8E"; hexarray[143]="8F";
hexarray[144]="90"; hexarray[145]="91"; hexarray[146]="92"; 
hexarray[147]="93"; hexarray[148]="94"; hexarray[149]="95";
hexarray[150]="96"; hexarray[151]="97"; hexarray[152]="98";
hexarray[153]="99"; hexarray[154]="9A"; hexarray[155]="9B";
hexarray[156]="9C"; hexarray[157]="9D"; hexarray[158]="9E";
hexarray[159]="9F"; hexarray[160]="A0"; hexarray[161]="A1";
hexarray[162]="A2"; hexarray[163]="A3"; hexarray[164]="A4";
hexarray[165]="A5"; hexarray[166]="A6"; hexarray[167]="A7";
hexarray[168]="A8"; hexarray[169]="A9"; hexarray[170]="AA";
hexarray[171]="AB"; hexarray[172]="AC"; hexarray[173]="AD";
hexarray[174]="AE"; hexarray[175]="AF"; hexarray[176]="B0";
hexarray[177]="B1"; hexarray[178]="B2"; hexarray[179]="B3";
hexarray[180]="B4"; hexarray[181]="B5"; hexarray[182]="B6";
hexarray[183]="B7"; hexarray[184]="B8"; hexarray[185]="B9";
hexarray[186]="BA"; hexarray[187]="BB"; hexarray[188]="BC";
hexarray[189]="BD"; hexarray[190]="BE"; hexarray[191]="BF";
hexarray[192]="C0"; hexarray[193]="C1"; hexarray[194]="C2";
hexarray[195]="C3"; hexarray[196]="C4"; hexarray[197]="C5";
hexarray[198]="C6"; hexarray[199]="C7"; hexarray[200]="C8";
hexarray[201]="C9"; hexarray[202]="CA"; hexarray[203]="CB";
hexarray[204]="CC"; hexarray[205]="CD"; hexarray[206]="CE";
hexarray[207]="CF"; hexarray[208]="D0"; hexarray[209]="D1";
hexarray[210]="D2"; hexarray[211]="D3"; hexarray[212]="D4";
hexarray[213]="D5"; hexarray[214]="D6"; hexarray[215]="D7";
hexarray[216]="D8"; hexarray[217]="D9"; hexarray[218]="DA";
hexarray[219]="DB"; hexarray[220]="DC"; hexarray[221]="DD";
hexarray[222]="DE"; hexarray[223]="DF"; hexarray[224]="E0";
hexarray[225]="E1"; hexarray[226]="E2"; hexarray[227]="E3";
hexarray[228]="E4"; hexarray[229]="E5"; hexarray[230]="E6";
hexarray[231]="E7"; hexarray[232]="E8"; hexarray[233]="E9";
hexarray[234]="EA"; hexarray[235]="EB"; hexarray[236]="EC";
hexarray[237]="ED"; hexarray[238]="EE"; hexarray[239]="EF";
hexarray[240]="F0"; hexarray[241]="F1"; hexarray[242]="F2";
hexarray[243]="F3"; hexarray[244]="F4"; hexarray[245]="F5";
hexarray[246]="F6"; hexarray[247]="F7"; hexarray[248]="F8";
hexarray[249]="F9"; hexarray[250]="FA"; hexarray[251]="FB";
hexarray[252]="FC"; hexarray[253]="FD"; hexarray[254]="FE"; 
hexarray[255]="FF";

//var lon = 108.32,lat = 22.82;//初始化地图中心点坐标
var lon =108.35425881284/1,lat =22.827408471049/1;
//var zoom = 10;//初始化地图级别
var zoom = 5;
var chinaLayer,shenghuiLayer,gongluLayer,xianchengLayer,bsidLayer;//图层
var map;//初始化地图
var geoUrl="http://192.168.1.30:8080";//访问矢量图层地址http://192.168.19.11:8081  http://192.168.40.13:8081
var cacheUrl="http://192.168.1.30:8080";//访问瓦片图层地址
var vectors;//声明矢量图层
var navHistory;//导航操作日志
var featurePopup = null;//弹出题注框
var jsonData=null;
var currentFeature;
function initMap(){
	//OpenLayers.ProxyHost = "/gispt/cgi/proxy.cgi?url=";
	//china layer
	//alert(3333);
	chinaLayer = new OpenLayers.Layer.WMS(
			 "中国",
			 cacheUrl+"/RGIS_Server/service/wms",
			 {
	            layers: 'GXSL',
	            isBaseLayer: true,
	            format: 'image/png',
	            tiled: 'true',
	            buffer: 4
	         },{displayInLayerSwitcher:false}
		);
	//province layer
	shenghuiLayer = new OpenLayers.Layer.WMS(
			"省会",
			geoUrl+"/geoserver/gispt/wms",
            {
               layers: 'gispt:shenghui_point',
               isBaseLayer: false,
               transparent: "true",
               format: 'image/png'
            }
		);
	shenghuiLayer.setVisibility(false);
	//road layer
	gongluLayer = new OpenLayers.Layer.WMS(
			"公路",
			geoUrl+"/geoserver/gispt/wms",
            {
               layers: 'gispt:gonglu_line',
               isBaseLayer: false,
               transparent: "true",
               format: 'image/png'
            }
		);
	gongluLayer.setVisibility(false);
	//country layer
	xianchengLayer = new OpenLayers.Layer.WMS(
			"县城",
			geoUrl+"/geoserver/gispt/wms",
            {
               layers: 'gispt:xiancheng_point',
               isBaseLayer: false,
               transparent: "true",
               format: 'image/png'
            }
		);
	xianchengLayer.setVisibility(false);
	//bsid layer
	bsidLayer = new OpenLayers.Layer.WMS(
			"基站",
			geoUrl+"/geoserver/gwc/service/wms",
            {
               layers: 'gispt:bsid_point',
               isBaseLayer: false,
               transparent: "true",
               format: 'image/png'
            }
		);
	bsidLayer.setVisibility(false);
	
	// create map
    map = new OpenLayers.Map({
    			div:"mymap",
    			controls: [
    			           new OpenLayers.Control.Navigation(),
    			           new OpenLayers.Control.PanZoomBar(),
    			           new OpenLayers.Control.MousePosition(),
    			           new OpenLayers.Control.SelectFeature(vectors,{
    			        	   hover:false,
    			        	   onUnselect:onFeatureUnselect
    			           }),
//    			           new OpenLayers.Control.OverviewMap(),
//    			           new OpenLayers.Control.LayerSwitcher(),
    			           new OpenLayers.Control.KeyboardDefaults()
    			           ],
    			numZoomLevels: 15,
    			MaxExtent:"4",
    			//resolutions:[0.703125,0.3515625,0.17578125,0.087890625,0.0439453125,0.02197265625,0.010986328125,0.0054931640625,0.00274658203125],
    			resolutions:[1.40625,0.703125,0.3515625,0.17578125,0.087890625,0.0439453125,0.02197265625,0.010986328125,0.0054931640625,0.00274658203125,0.001373291015625,0.0006866455078125,3.4332275390625e-4,1.71661376953125e-4,8.58306884765625e-5,4.291534423828125e-5],
    
    			projection:"EPSG:4326"
    		});
    //获取鼠标当前标
    map.addControl(
            new OpenLayers.Control.MousePosition({
                prefix: 'WGS84 coordinates:',
                separator: ' | ',
                numDigits: 5,
                emptyString: ''
            })
        );
    
    //获取当前图层比例尺
    map.events.register("moveend", null, displayZoom);
    
    //编辑图层
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;

    vectors = new OpenLayers.Layer.Vector("临时", {
        renderers: renderer
    });
    controls = {
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
        	var bounds = feature.geometry.getBounds();
        	document.getElementById("jxqy_val").value=bounds.toString();
//        	map.zoomToExent(new OpenLayers.Bounds(bounds));
        };
    }
    
    //选择高亮
    var sf = new OpenLayers.Control.SelectFeature(vectors);
    map.addControl(sf);
    sf.activate();
    
    //register the event to control the map
	map.events.register("zoomend", null, zoomChanged);
    
  //point history back
	navHistory = new OpenLayers.Control.NavigationHistory();
    map.addControl(navHistory);
   
    
    
    
    //map.addLayers([chinaLayer,shenghuiLayer,gongluLayer,xianchengLayer,bsidLayer,vectors,heatmap]);
    map.addLayers([chinaLayer,shenghuiLayer,gongluLayer,xianchengLayer,bsidLayer,vectors]);
    //map.addLayers([chinaLayer]);
    map.setCenter(new OpenLayers.LonLat(lon, lat), zoom);
    
    /*var layer = new OpenLayers.Layer.OSM();
    console.log(layer);*/
//    map.addeventListeners("click",function(){ alert(1);});
    //空间查询基站
    // map.events.register("click", 'mymap', del);
	disMeasure();
	
	
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
        	currentFeature=control;
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

function deleteFeature()
{
	//删除之前的画图
	vectors.removeAllFeatures();
	//清空画的图层信息
	document.getElementById('jxqy_val').value="";
}

function line()
{
	//-38.65266015625,57.4505859375,-36.69709375,59.75771484375
	var color =OpenLayers.Feature.Vector.style = {  
		    'default': {  
		        fillColor: "#ee9900",  
		        fillOpacity: 0.4,   
		        hoverFillColor: "white",  
		        hoverFillOpacity: 0.8,  
		        strokeColor: "#ee9900",  
		        strokeOpacity: 1,  
		       strokeWidth: 1,  
		        strokeLinecap: "round",  
		        strokeDashstyle: "solid",  
		        hoverStrokeColor: "red",  
		        hoverStrokeOpacity: 1,  
		        hoverStrokeWidth: 0.2,  
		        pointRadius: 6,  
		        hoverPointRadius: 1,  
		        hoverPointUnit: "%",  
		        pointerEvents: "visiblePainted",  
		        cursor: "inherit",  
		        fontColor: "#000000",  
		        labelAlign: "cm",  
		        labelOutlineColor: "white",  
		        labelOutlineWidth: 3  
		    },  
		    'select': {  
		        fillColor: "blue",  
		        fillOpacity: 0.4,   
		        hoverFillColor: "white",  
		        hoverFillOpacity: 0.8,  
		        strokeColor: "blue",  
		        strokeOpacity: 1,  
		        strokeWidth: 2,  
		        strokeLinecap: "round",  
		        strokeDashstyle: "solid",  
		        hoverStrokeColor: "red",  
		        hoverStrokeOpacity: 1,  
		        hoverStrokeWidth: 0.2,  
		        pointRadius: 6,  
		        hoverPointRadius: 1,  
		        hoverPointUnit: "%",  
		        pointerEvents: "visiblePainted",  
		        cursor: "pointer",  
		        fontColor: "#000000",  
		        labelAlign: "cm",  
		        labelOutlineColor: "white",  
		        labelOutlineWidth: 3  
		  
		    },  
		    'temporary': {  
		        fillColor: "#66cccc",  
		        fillOpacity: 0.2,   
		        hoverFillColor: "white",  
		        hoverFillOpacity: 0.8,  
		        strokeColor: "#66cccc",  
		        strokeOpacity: 1,  
		        strokeLinecap: "round",  
		        strokeWidth: 2,  
		        strokeDashstyle: "solid",  
		        hoverStrokeColor: "red",  
		        hoverStrokeOpacity: 1,  
		        hoverStrokeWidth: 0.2,  
		        pointRadius: 6,  
		        hoverPointRadius: 1,  
		        hoverPointUnit: "%",  
		        pointerEvents: "visiblePainted",  
		        cursor: "inherit",  
		        fontColor: "#000000",  
		        labelAlign: "cm",  
		        labelOutlineColor: "white",  
		        labelOutlineWidth: 3  
		  
		    },  
		    'delete': {  
		        display: "none"  
		    }  
		}  ;
	//-35.554515625,60.30703125,-32.85187890625,62.152734375
	var pointList=[];
	var lineFeature;
	var newPoint1 =new OpenLayers.Geometry.Point('108.15581826107','22.694199242532');
	var newPoint2 =new OpenLayers.Geometry.Point('108.15581826107','22.887833275736');
	var newPoint3 =new OpenLayers.Geometry.Point('108.35837868588','22.887833275736');
	var newPoint4 =new OpenLayers.Geometry.Point('108.35837868588','22.694199242532');
	pointList.push(newPoint1);
	pointList.push(newPoint2);
	pointList.push(newPoint3);
	pointList.push(newPoint4);
	lineFeature = new OpenLayers.Feature.Vector(newPoint2,null,color.temporary);
	vectors.addFeatures(lineFeature);
}
var feature1;
var feature2;
var feature3;
var buttonId;
function drawPolgyon(id)
{
	var color;
	if(id==undefined||id==null||id=="")
	{
		return false;
	}else
	{
		if(id=="hzjxqy1")
		{
			color="#00AA00";
		}
		else if(id=="hzjxqy2")
		{
			color="#BBBB00";
		}
		else{
			color="#C63300";
		}
	}
	buttonId = id;
	var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
	
	var vlayer = new OpenLayers.Layer.Vector("碰撞区域", {
		renderers: renderer});
	
	vlayer.events.register("beforefeatureadded",null,function delLayer(){
		if(buttonId=="hzjxqy1"&&feature1!=undefined)
		{
			vlayer.removeFeatures(feature1);
		}else if(buttonId=="hzjxqy2"&&feature2!=undefined)
		{
			vlayer.removeFeatures(feature2);
		}else
		{
			if(feature3!=undefined)
			{
				vlayer.removeFeatures(feature3);
			}
		}
	});
	
	var polgyonControl = new OpenLayers.Control.DrawFeature(vlayer,OpenLayers.Handler.RegularPolygon,{handlerOptions:{sides:4,irregular:true}});
	
	if(id=="hzjxqy1")
	{
		polgyonControl.featureAdded= function(feature){
			feature1 = feature;
			var bounds = feature.geometry.getBounds();
        	document.getElementById("jxqy_val1").value=bounds.toString();
		};
	}else if(id=="hzjxqy2")
	{
		polgyonControl.featureAdded= function(feature){
			feature2 = feature;
			var bounds = feature.geometry.getBounds();
        	document.getElementById("jxqy_val2").value=bounds.toString();
		};
	}else
	{
		polgyonControl.featureAdded= function(feature){
			feature3 = feature;
			var bounds = feature.geometry.getBounds();
        	document.getElementById("jxqy_val3").value=bounds.toString();
		};
	}
	
	
    map.addLayers([vlayer]);
    
	map.addControl(polgyonControl);
	
	polgyonControl.activate();
}

function showPengZhuangResult(jobArea)
{
	var colorArray = ["#00AA00", "#BBBB00", "#C63300"];
	var areaArray = jobArea.split(";");
	var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
	var vlayerresult = new OpenLayers.Layer.Vector("碰撞区域结果", {
		renderers: renderer});
	for (var i = 0; i < areaArray.length; i++) {
		var polygonObj;
		var lineList=[];
		//点坐标集合
		var pntsarray = areaArray[i].split(",");
		var pointList=[];
		for(var j = 0;j<pntsarray.length;j+=2)
		{
			var result=pntsarray.slice(j,j+2);
			for(var m =0;m<result.length;m++)
			{
				//点
				var temp =new OpenLayers.Geometry.Point(result[0],result[1]);
				pointList.push(temp);
			}
			var lineFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LinearRing(pointList),null,colorArray[i]);
			lineList.push(lineFeature);
		}
		vlayerresult.addFeatures(polygonObj);
	}
	map.addLayers([vlayerresult]);
	 
	var lastArea = areaArray[areaArray.length-1];
	map.setCenter(new OpenLayers.LonLat(lastArea.split(",")[0], lastArea.split(",")[1]), 8);
}

function showRectangle(jobArea)
{
	this.styles = {  
	           "one": new OpenLayers.Style(  
	               OpenLayers.Feature.Vector.style["one"]),  
	           "two": new OpenLayers.Style(  
	               OpenLayers.Feature.Vector.style["two"]),  
	           "three": new OpenLayers.Style(  
	               OpenLayers.Feature.Vector.style["three"]),  
	           "four": new OpenLayers.Style(  
	               OpenLayers.Feature.Vector.style["four"])  
	       }; 
	var areaArray = jobArea.split(";");
	var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
	var vlayerresult = new OpenLayers.Layer.Vector("碰撞区域结果", {
		renderers: renderer});
	for (var i = 0; i < areaArray.length; i++) {
		//点坐标集合
		var pntsarray = areaArray[i].split(",");
		var wkt ="POLYGON(("+pntsarray[0]+" "+pntsarray[1]+","+pntsarray[0]+" "+pntsarray[3]+","+pntsarray[2]+" "+pntsarray[3]+","+pntsarray[2]+" "+pntsarray[1]+","+pntsarray[0]+" "+pntsarray[1]+","+"))";
		var wkt_c = new OpenLayers.Format.WKT();
		var geometry = wkt_c.read(wkt);
		vlayerresult.addFeatures(geometry);
	}
	map.addLayers([vlayerresult]);
	 
	var lastArea = areaArray[areaArray.length-1];
	map.setCenter(new OpenLayers.LonLat(lastArea.split(",")[0], lastArea.split(",")[1]), 16);
}

var monitorFeature;
function monitorPolgyon(id)
{
	var color;
	if(id==undefined||id==null||id=="")
	{
		return false;
	}
	buttonId = id;
	var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
	
	var vlayer = new OpenLayers.Layer.Vector("monitor", {
		renderers: renderer});
	
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
        	parent.jxqyval2 = bounds.toString();
        	parent.getjxqyval();
		};
	}
	
    map.addLayers([vlayer]);
    
	map.addControl(polgyonControl);
	
	polgyonControl.activate();
}


function demo()
{
	var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
	var vlayerresult = new OpenLayers.Layer.Vector("碰撞区域结果", {
		renderers: renderer});
	var wkt  = "POLYGON((108.15581826107 22.694199242532,108.15581826107 22.887833275736,108.35837868588 22.887833275736,108.35837868588 22.694199242532,108.15581826107 22.694199242532))";
	var wkt_c = new OpenLayers.Format.WKT();
	var geometry = wkt_c.read(wkt);
	vlayerresult.addFeatures(geometry);
	map.addLayers([vlayerresult]);
}

function userTravel(res)
{
	delJizhanPopup();
	var color =OpenLayers.Feature.Vector.style = {  
		    'six': {  
		        fillColor: "#ee0000",  
		        fillOpacity: 0.2,   
		        hoverFillColor: "white",  
		        hoverFillOpacity: 0.8,  
		        strokeColor: "#ee0000",  
		        strokeOpacity: 1,  
		        strokeLinecap: "round",  
		        strokeWidth: 2,  
		        strokeDashstyle: "solid",  
		        hoverStrokeColor: "red",  
		        hoverStrokeOpacity: 1,  
		        hoverStrokeWidth: 0.2,  
		        pointRadius: 6,  
		        hoverPointRadius: 1,  
		        hoverPointUnit: "%",  
		        pointerEvents: "visiblePainted",  
		        cursor: "inherit",  
		        fontColor: "#000000",  
		        labelAlign: "cm",  
		        labelOutlineColor: "white",  
		        labelOutlineWidth: 3  
		  
		    } 
		}  ;
	var tempVectors = map.getLayersByName("人潮波动");
	var tempvt;
	var vlayerresult;
	if(tempVectors!=null&&tempVectors!=undefined&&tempVectors.length>0)
	{
		vlayerresult=tempVectors[0];
		vlayerresult.removeAllFeatures();
	}else
	{
		var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
		vlayerresult = new OpenLayers.Layer.Vector("人潮波动", {
			renderers: renderer});
	}
	var pointList=[];
	console.log("=======res.length:" + res.length)
	for(var i =0;i<res.length;i++)
	{
		var point =new OpenLayers.Geometry.Point(res[i][0],res[i][1]);
		var popup = new OpenLayers.Popup("jizhan"+i,new OpenLayers.LonLat(res[i][0],res[i][1]),new OpenLayers.Size(100,25),res[i][3],false);
		var num = res[i][2]+'';
		if(num.length<10)
		{
			console.log("========num.length:" + num.length)
			var n = 9-num.length;
			for(var j =0;j<n;j++)
			{
				num ='0'+num;
			}
		}
		var red = parseInt(num.substring(0,3));
		var green = parseInt(num.substring(3,6));
		var blue = parseInt(num.substring(6,9));
		var hexcode = "'#" + hexarray[red] + hexarray[green] + hexarray[blue]+"'";
		var cc = color.six;
		cc.fillColor=hexcode;
		cc.strokeColor=hexcode;
		vlayerresult.addFeatures(new OpenLayers.Feature.Vector(point,null,cc));
		popup.closeOnMove=true;
		popup.autoSize = true;
		map.addPopup(popup);
		
	}
	map.addLayers([vlayerresult]);
}

function delJizhanPopup()
{
	var pps = map.popups;
	if(pps.length>0)
	{
		var len = pps.length;
		while(len>0)
		{
			map.removePopup(pps[0]);
		}
	}
}
function hzjxqyClick(id){
  //$("#jxqy_val").val("");
   document.getElementById("jxqy_val").value="";
   console.log("dddd");
   //console.log(parent.ddd)
   monitorPolgyon(id);
   
   return;
}
