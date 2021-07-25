var dataId;//数据id值
var jsonData;//后台全局变量
var trackBackLayer;//轨迹回放图层
var lineFeature;//轨迹回放线点
var x = 0;//定时循环遍历轨迹点
var trackFlag = false;//轨迹回放标识
var pointXY = new Array();//回放数据集
/**
 * 读取数据集
 * @param null
 * @returns null
 */
$(function(){
	initMap();//初始化地图	
	//ued控件开始
	clearScroll(1);
	$('#bsfxCards').cards({
		url: basePath + "MapService/getTrackList?dataId="+dataId, // 提交的页面
		dataType:'json',
		type:"trail",
		height:cardsHeight.trailCardsHeight,
		width:"auto",
		usepager:false,
		onSuccess:function(p){
			jsScroll(document.getElementById('bsfxCards'),10,'divScrollBar');
			jsonData = p.data;
			initSearchPage();//页面查询框的显隐控制
			initTrack();//初始化轨迹
		}
	});
	$('.playWrap').show();
	//ued控件结束
});

/**
 * 页面查询框的显隐控制
 * @returns
 */
function initSearchPage(){
	if (jsonData.url.showFlag == "false") {
		$('#searchId').addClass('hide');//隐藏对象查询框
		//$('#titleId').addClass('hide');//隐藏保存界面
	}
}

/**
 * 初始化显示后台所有轨迹
 * @returns
 */
function initTrack(){
	 for(var i=0;i<jsonData.result.length;i++){
		var trackGeoJSON = getTrackGeoJSON(jsonData.result[i]);//geoJSON格式转换
		var searchContent = jsonData.result[i].phone;
		//判断轨迹是否显示
		if(jsonData.result[i].showFlag=='true'){
			trackPoint(trackGeoJSON,searchContent,i);
		}else{
			var phone = jsonData.result[i].phone;
			$('.trail_eye_open').each(function(e){
				if($(this).attr('vals') == phone){
					$(this).addClass('trail_eye_close');
				}
			});
		}
	 }
}
/**
 * 根据后端传来的json数据 来进行geoJson的转化
 * @param points   同pointList即一条轨迹上的所有点
 * @returns trackGeoJSON 轨迹数据的geoJson
 */
function getTrackGeoJSON(points){
    //trackGeoJSON 特定的格式与myGeoJSON一样，读取json中的部分数据然后重新生成新的 。即trackGeoJSON
	var trackGeoJSON  = { "type": "FeatureCollection",
        "features": []
    };

    //对单条轨迹中的点位进行遍历
	alert(points.length);
    for(var j=0;j<points.length;j++){
       //判断是否显示点位
       if(points.children_result[j].showFlag=='true'){
    	   var properties = {"properties":{"id":j+1,"BSID":points.children_result[j].val,"address":points.children_result[j].address}, "geometry":{"type":"Point", "coordinates":[points.children_result[j].longitudes, points.children_result[j].latitudes]}} ;	 
    	   trackGeoJSON.features.push(properties);
       }
    }
    return trackGeoJSON;
}
/**
 * 轨迹点
 * @param myGeoJSON 轨迹信息的json数据
 * @param searchContent 查询条件
 * @param trackLength 轨迹编号
 * @returns null
 */
function trackPoint(myGeoJSON,searchContent,trackLength){
	var trackPointLayer = new OpenLayers.Layer.Vector("point"+searchContent,{styleMap:stylePoint});
    var geojson_format = new OpenLayers.Format.GeoJSON({
        'internalProjection': map.baseLayer.projection,
        'externalProjection': new OpenLayers.Projection("EPSG:4326")
    });
	map.addLayer(trackPointLayer);
	trackPointLayer.addFeatures(geojson_format.read(myGeoJSON));
	
	//选择高亮
	var tracksf = new OpenLayers.Control.SelectFeature(trackPointLayer);
	map.addControl(tracksf);
	tracksf.activate();
	trackPointLayer.events.on({
	        'featureselected': onFeatureSelect,
	        'featureunselected': onFeatureUnselect
	});
	if (trackLength == jsonData.result.length-1) {//判断是否是最后一条轨迹
		var bounds = trackPointLayer.getDataExtent();//界面显示最后一条轨迹
		if (bounds != null) {//判断是否有图层
			map.zoomToExtent(bounds,true);
		}
	}
	trackLine(trackPointLayer.features,searchContent);
}
/**
 * 轨迹线
 * @param null
 * @returns null
 */
function trackLine(features,searchContent){
	var pointList = new Array();
	for ( var i = 0; i < features.length; i++) {
		pointList[i]=new Array();
		pointList[i][0]=features[i].geometry.x;
		pointList[i][1]=features[i].geometry.y;
	}
	if (pointList.length>=2) {//判断是否多点，多点可以画箭头
    	var arrowLayer = new OpenLayers.Layer.Vector("arrow"+searchContent);
    	var arrowFeature = new OpenLayers.Feature.Vector(
    			//getEndPoint(pointList),//计算偏移值
    			new OpenLayers.Geometry.Point(pointList[pointList.length-1][0],pointList[pointList.length-1][1]),
    			{some:'data'},
    			{externalGraphic: '../gis/img/arrow.png', graphicHeight: 50, graphicWidth: 40,rotation:getAngle(pointList),fillOpacity:"1",labelOutlineWidth:null}
    		);
    	arrowLayer.addFeatures(arrowFeature);
    	map.addLayer(arrowLayer);
	}
	
	var trackLineStyle={fill:true,fillColor:"#ff0000",strokeColor: "#339933",strokeOpacity: 1,strokeWidth: 4};
	var trackLineLayer = new OpenLayers.Layer.Vector("line"+searchContent,{style:trackLineStyle});
    var myGeoJSON = { "type": "FeatureCollection",
        "features": 
        [
            { "type": "Feature", "properties": { "name": "shierwin"}, "geometry": { "type": "LineString", "coordinates": pointList}}
        ]
    };
    var geojson_format = new OpenLayers.Format.GeoJSON({
        'internalProjection': map.baseLayer.projection,
        'externalProjection': new OpenLayers.Projection("EPSG:4326")
    });
    map.addLayer(trackLineLayer);
    trackLineLayer.addFeatures(geojson_format.read(myGeoJSON));
}
/**
 * 轨迹回放
 * @param null
 * @returns null
 */
function startTrack(searchContent){
	if(trackFlag){
		alert("正在回放");
		return false;
	}
	var style_green = {//marker样式
			fill:true,
			fillColor:"#ff0000",
		    strokeColor: "#339933",
		    strokeOpacity: 1,
		    strokeWidth: 5,
		    strokeDashstyle:"dash"
	};
	
	deleteTempLayer("line"+searchContent);//删除已有的轨迹线图层
	deleteTempLayer("arrow"+searchContent);//删除已有的轨迹箭头图层
	if(map.getLayersByName("point"+searchContent).length == 0){
		alert("无回放数据");
		return false;
	}
	var tempLayer = map.getLayersByName("point"+searchContent)[0];
	pointXY = new Array();
	for ( var i = 0; i < tempLayer.features.length; i++) {
		pointXY[i]=new Array();
		pointXY[i][0]=tempLayer.features[i].geometry.x;
		pointXY[i][1]=tempLayer.features[i].geometry.y;
	}
	
    trackBackLayer = new OpenLayers.Layer.Vector("back"+searchContent);
    map.addLayer(trackBackLayer);
    
    var lonlat = new OpenLayers.LonLat(pointXY[0][0],pointXY[0][1]);
    if (lineFeature != null){
    	lineFeature = null;
    }
    lineFeature = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.LineString(lonlat.lon, lonlat.lat), null, style_green);
    trackBackLayer.addFeatures([lineFeature]);
    trackBack(searchContent);
}
/**
 * 轨迹定时回放
 * @param null
 * @returns null
 */
function trackBack(searchContent) {
    if (x < pointXY.length) {
        var lonlat = new OpenLayers.LonLat(pointXY[x][0], pointXY[x][1]);
        var newPoint = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
        lineFeature.geometry.addPoint(newPoint);
        trackBackLayer.drawFeature(lineFeature);
        x++;
        setTimeout("trackBack("+searchContent+")", 1000);
        trackFlag = true;//正在回放
    }else{
    	x=0;
    	deleteTempLayer("back"+searchContent);//回放完成，删除轨迹回放线图层
    	var tempLayer = map.getLayersByName("point"+searchContent)[0];
    	trackLine(tempLayer.features,searchContent);//回放完成显示实体轨迹线
    	trackFlag = false;//回放结束
    	pointXY=[];
    	$('.trail_animate_stop').removeClass('trail_animate_stop');
    }
}
/**
 * 删除轨迹
 * @param null
 * @returns null
 */
function deleteTrack(searchContent,obj){
	if(trackFlag){
		alert("轨迹正在回放，不能删除");
		return false;
	}
	if (confirm('你确定要删除？')) {//删除图层
		$(obj).parents('li').next().remove();
		$(obj).parents('li').remove();
		deleteTempLayer("point"+searchContent);
		deleteTempLayer("line"+searchContent);
		deleteTempLayer("arrow"+searchContent);
		
		clearOneMarker();//清除弹出题注框
		
		for ( var i = 0; i < jsonData.result.length; i++) {//删除轨迹数据
			if (jsonData.result[i].phone == searchContent) {
				jsonData.result.splice(i,1);
			}
		}
	}
	
}
/**
 * 隐藏轨迹
 * @param null
 * @returns null
 */
function hideTrack(searchContent){
	if(trackFlag){
		$('.trail_eye_close').removeClass('trail_eye_close');
		alert("轨迹正在回放，不能做此操作");
		return false;
	}
	clearOneMarker();//清除弹出题注框
	deleteTempLayer("point"+searchContent);
	deleteTempLayer("line"+searchContent);
	deleteTempLayer("arrow"+searchContent);
	for ( var i = 0; i < jsonData.result.length; i++) {//删除轨迹数据
		if (jsonData.result[i].phone == searchContent) {
			jsonData.result[i].showFlag = 'false';
		}
	}
}
/**
 * 显示轨迹
 * @param null
 * @returns null
 */
function showTrack(searchContent){
	if(trackFlag){
		alert("轨迹正在回放，不能做此操作");
		return false;
	}
	//根据searchContent 遍历jsonData数据，得出对应的json轨迹集中的i，得出单条轨迹json数据
	for(var i=0;i<jsonData.result.length;i++){
		if(jsonData.result[i].phone==searchContent){
			jsonData.result[i].showFlag = 'true';
			var trackGeoJSON = getTrackGeoJSON(jsonData.result[i]);//geoJSON格式转换
			//显示轨迹
			trackPoint(trackGeoJSON,searchContent,i);
		}
	}
}

function showTrackmy(searchContent){
	if(trackFlag){
		alert("轨迹正在回放，不能做此操作");
		return false;
	}
	//根据searchContent 遍历jsonData数据，得出对应的json轨迹集中的i，得出单条轨迹json数据
	for(var i=0;i<searchContent.result.length;i++){
			var trackGeoJSON = getTrackGeoJSON(searchContent.result[i]);//geoJSON格式转换
			//显示轨迹
			trackPoint(trackGeoJSON,"phone",i);
	}
}
/**
 * 隐藏轨迹点
 * @param null
 * @returns null
 */
function hideTrackPoint(vals){
	if(trackFlag){
		alert("轨迹正在回放，不能做此操作");
		return false;
	}
	clearOneMarker();//清除弹出题注框
	var searchContent = vals.split(',')[0];//查询对象
	var serial = vals.split(',')[1];//序号
	var bsid = vals.split(',')[2];//基站号
	var id = vals.split(',')[3];//id号
	//删除当前轨迹点、线、箭头
	deleteTempLayer("point"+searchContent);
	deleteTempLayer("line"+searchContent);
	deleteTempLayer("arrow"+searchContent);
	//遍历获取当前的jsonData中的点位的showFlag，并更改为false
	for(var i=0;i<jsonData.result.length;i++){
		if(jsonData.result[i].phone==searchContent){
			jsonData.result[i].children_result[serial-1].showFlag = 'false';//设置显示属性为false
			var trackGeoJSON = getTrackGeoJSON(jsonData.result[i]);//geoJSON格式转换
			//判断轨迹是否显示
			if(jsonData.result[i].showFlag=='true'){
				trackPoint(trackGeoJSON,searchContent,i);
			}
		}
	}
}
/**
 * 显示轨迹点
 * @param null
 * @returns null
 */
function showTrackPoint(vals){
	if(trackFlag){
		alert("轨迹正在回放，不能做此操作");
		return false;
	}
	var searchContent = vals.split(',')[0];//查询对象
	var serial = vals.split(',')[1];//序号
	var bsid = vals.split(',')[2];//基站号
	//删除当前轨迹点、线、箭头
	deleteTempLayer("point"+searchContent);
	deleteTempLayer("line"+searchContent);
	deleteTempLayer("arrow"+searchContent);
	//遍历获取当前的jsonData中的点位的showFlag，并更改为false
	for(var i=0;i<jsonData.result.length;i++){
		if(jsonData.result[i].phone==searchContent){
			jsonData.result[i].children_result[serial-1].showFlag = 'true';//设置显示属性为false
			var trackGeoJSON = getTrackGeoJSON(jsonData.result[i]);//geoJSON格式转换
			//判断轨迹是否显示
			if(jsonData.result[i].showFlag=='true'){
				trackPoint(trackGeoJSON,searchContent,i);
			}
		}
	}
}
/**
 * 保存轨迹数据
 * @returns
 */
function saveTrack(){
	if (jsonData.result.length == 0) {
		alert("无轨迹数据，不能保存");
		return false;
	}
	var track = JSON.stringify(jsonData);
	var oTrack = JSON.parse(track);
	eval("var track='"+JSON.stringify(oTrack)+"';");//解决乱码问题

	$.ajax({
    	url: basePath + "MapService/saveTrack?dataId="+dataId,// 提交的页面      
        type: "POST", // 设置请求类型为"POST"，默认为"GET"
        data:"track="+track,
        error: function(request){ // 设置表单提交出错
            alert("请重新提交");
        },
        dataType: "text",
        success: function(data){ // 设置表单提交完成使用方法
        	if (data=="success") {
        		alert("保存成功！");
			}
        }
    });
}
/**
 * 计算两点连接线的夹角
 * @param 两点坐标
 * @returns 夹角
 */
function getAngle(pointList){
	var aPointLong = pointList[pointList.length-1][0];
    var aPointLat = pointList[pointList.length-1][1];
    
    var bPointLong = pointList[pointList.length-2][0];
    var bPointLat = pointList[pointList.length-2][1];
    
    var kRadius = 6378137;//地球半径
    var dx = (aPointLong*Math.PI/180  - bPointLong * Math.PI/180)*(kRadius*Math.cos(bPointLat*Math.PI/180));
    var dy = (aPointLat*Math.PI/180 - bPointLat * Math.PI/180)*kRadius;
    
    var angle = Math.atan2(dx, dy)*180.0/Math.PI;
    return angle;
}
/**
 * 点样式
 */
var stylePoint = new OpenLayers.StyleMap({
    "default": new OpenLayers.Style({
    	graphicHeight: 32, 
        graphicWidth: 23,
        externalGraphic: '../gis/img/point_pink.png',
        //label: '${id}',
        //labelXOffset : "0",
        //labelYOffset : "20",
        cursor: "pointer"
    }),
    "select": new OpenLayers.Style({
    	graphicHeight: 32, 
        graphicWidth: 23,
        externalGraphic: '../gis/img/point_pink.png',
        //label: '${id}',
        //labelXOffset : "0",
        //labelYOffset : "20",
        cursor: "pointer"
    })
});
