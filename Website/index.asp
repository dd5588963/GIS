<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta name="viewport"
          content="width=device-width,
          initial-scale=1.0, minimum-scale=1.0,
          maximum-scale=1.0, user-scalable=no" />
    <title>红旅寻踪地图系统</title>
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <link rel="stylesheet" href="../src/css/layui.css" media="all" />
    <script src="https://cdn.bootcss.com/FileSaver.js/2014-11-29/FileSaver.js"></script>
    <!-- 注意：如果你直接复制所有代码到本地，上述css路径需要改成你本地的 -->
    <link href="../../libs/ol5/ol.css" rel="stylesheet" type="text/css" />
    <script src="../../libs/ol5/MapGis_ol_product.js" type="text/javascript"></script>
    <script src="../src/jquery-1.11.1.min.js"></script>
    <script src="https://webapi.amap.com/maps?v=1.4.15&key=a53de78d2b410e895f3e4a26a949d18e"></script>

    <style type="text/css">
        #mapCon {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: -1;
        }
        /* 鼠标位置控件层样式设置 */
        #mouse-position {
            position: absolute;
            bottom: 50px;
            right:50px;
            width: 200px;
            height: 20px;
            /*在地图容器中的层，要设置z-index的值让其显示在地图上层*/
            z-index: 9999;
        }
        /* 鼠标位置信息自定义样式设置 */
        .custom-mouse-position {
            color: rgb(0,0,0);
            font-size: 16px;
            font-family: "微软雅黑";
        
        }
        
        
        
    </style>
</head>
<body>
    <p><!--#include file="checkCookie.asp"--></p> 
    <div id="mapCon">
    </div>

    <div id="inputBox">
        <div class="layui-form-item" style="position:absolute;right:330px;top:350px;">
            <label class="layui-form-label" style="color:black;font-size:large">信息</label>
            <div class="layui-input-block" width="200px">
                <input type="text" id="address_input" placeholder="请输入信息" class="layui-input" />
            </div>
        </div>
        <div class="layui-form-item" style="position:absolute;right:30px;top:350px">
            <label class="layui-form-label" style="color:black;font-size:large">名称</label>
            <div class="layui-input-block" width="200px">
                <input type="text" id="name_input" placeholder="请输入名称" class="layui-input" />
            </div>
        </div>
        <div class="layui-form-item" style="position:absolute;right:330px;top:400px">
            <label class="layui-form-label" style="color:black;font-size:large">经度</label>
            <div class="layui-input-block">
                <input type="text" id="lon_input" placeholder="请输入经度" class="layui-input" />
            </div>
        </div>
        <div class="layui-form-item" style="position:absolute;right:30px;top:400px">
            <label class="layui-form-label" style="color:black;font-size:large">纬度</label>
            <div class="layui-input-block">
                <input type="text" id="lat_input" placeholder="请输入纬度" class="layui-input" />
            </div>
        </div>

    </div>
    <div id="mouse-position">
    </div>
    <div style="margin-bottom: 5px;">

        <ins class="adsbygoogle" style="display:inline-block;width:970px;height:90px" data-ad-client="ca-pub-6111334333458862" data-ad-slot="3820120620"></ins>

    </div>

    <div id="table">
        <div style="position:absolute;right:0px;top:40px;z-index:9999">
            <table id="dataTable" class="layui-table" lay-filter="test"></table>
        </div>
    </div>
    
    <p style="position:absolute;right:10px;top:0px;z-index:9999;color:crimson;font-style:oblique">
        登出
        <a href="login.asp">
            <img border="0" src="src/images/denglu_1.png" width="50" height="50"/>
        </a>
    </p>

    <script type="text/javascript">
        //实例化鼠标位置控件
        var mousePositionControl = new ol.control.MousePosition({
            //坐标格式
            coordinateFormat: ol.coordinate.createStringXY(4),
            //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
            projection: 'EPSG:4326',
            //坐标信息显示样式，默认是'ol-mouse-position'
            className: 'custom-mouse-position',
            //显示鼠标位置信息的目标容器
            target: document.getElementById('mouse-position'),
            //未定义坐标的标记
            undefinedHTML: '&nbsp;'
        });


        //加载高德地图
        var gaodeMapLayer = new ol.layer.Tile({
            title: "高德地图",
            source: new ol.source.XYZ({
                url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
                wrapX: false ,
                crossOrigin: 'anonymous'
            }),
        });

        var map = new ol.Map({
            layers: [gaodeMapLayer],
            view: new ol.View({
                center: [12730752, 3580052],
                projection: 'EPSG:3857',
                zoom: 6,
                minZoom: 1
            }),
            target: 'mapCon',

        //var layer1 = new ol.layer.Tile({
        //    title: "天地图矢量图层",
        //    source: new ol.source.XYZ({
        //        url: "http://t0.tianditu.com/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=" + "b66ca40c27956bec0f3ce4dd2e94235b",//parent.TiandituKey()为天地图密钥,
        //        projection: ol.proj.get('EPSG:4326'),
        //        wrapX: false
        //    })
        //});
        //var layer2 = new ol.layer.Tile({
        //    title: "天地图矢量注记图层",
        //    source: new ol.source.XYZ({
        //        url: "http://t0.tianditu.com/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=" + "b66ca40c27956bec0f3ce4dd2e94235b",//parent.TiandituKey()为天地图密钥
        //        projection: ol.proj.get('EPSG:4326')
        //    })
        //});
        ////初始化地图容器
        //map = new ol.Map({
        //    target: 'mapCon',
        //    layers: [layer1, layer2],
        //    view: new ol.View({
        //        center: [114, 30],
        //        zoom: 7,
        //        projection: "EPSG:4326",
        //        crossOrigin: 'anonymous'
        //    }),
            controls: ol.control.defaults().extend([
                new ol.control.FullScreen(),
                new ol.control.ScaleLine(),
                new ol.control.MousePosition(),
                new ol.control.OverviewMap({        // 实例化一个OverviewMap类的对象，并加入到地图中
                    collapsed: false
                }),
                new ol.control.ZoomSlider(),            // 滑块缩放控件
                // 新增代码
                new ol.control.ZoomToExtent({           // 缩放至特定位置控件
                    extent: [
                        //12757813, 3562826,
                        //12759092, 3563187
                        12759193, 3562468,
                        12759836, 3563152
                    ]
                })
            ])


        });



    </script>


    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查找</a>
        <a class="layui-btn layui-btn-xs" lay-event="edit">修改</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>

    <script src="../src/layui.js" charset="utf-8"></script>
    <!-- 注意：如果你直接复制所有代码到本地，上述js路径需要改成你本地的 -->
    <script>


        json = null; //json里面的数据
        //读取Json文件
        var url = "../json/table/temp2.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        var request = new XMLHttpRequest();
        request.open("get", url);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
            if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                window.json = JSON.parse(request.responseText);
                var json = window.json;
                for (var i = 0; i < json["data"].length; i++) {
                    console.log("name" + json["data"][i].name);
                    var lon = parseFloat(json["data"][i].longitude); //string -> float
                    var lat = parseFloat(json["data"][i].latitude);  //string -> float

                    //将json中每个点标注出来
                    var poiLoc = ol.proj.fromLonLat([lon, lat]);

                    //实例化Vector要素，通过矢量图层添加到地图容器中
                    var iconFeature = new ol.Feature({
                        geometry: new ol.geom.Point(poiLoc)
                    });
                    iconFeature.setStyle(createLabelStyle(iconFeature));
                    //矢量标注的数据源
                    var vectorSource = new ol.source.Vector({
                        features: [iconFeature]
                    });
                    //矢量标注图层
                    var vectorLayer = new ol.layer.Vector({
                        source: vectorSource
                    });
                    vectorLayer.visible = false;
                    map.addLayer(vectorLayer);

                }
                //console.log(json.length);
                console.log(json);
                //console.log("hello");
            }
            var content = JSON.stringify(json);
            var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
            //saveAs(blob, "json/table/demo.json");
        };

        window.viewObj = {
            tbData: [{
                id: "13",
                name: "名称",
                longitude: '经度',
                latitude: "纬度",
                address: "信息"
            }]
        }

        window.onload = function () {
            //地图视图的初始参数
            var view = map.getView();
            var total_layer = map.getLayers();
            var zoom = view.getZoom();
            var center = view.getCenter();


            layui.use('table', function () {
                var table = layui.table;
                //执行一个 table 实例
                var tableIns = table.render({
                    elem: '#dataTable'
                    , width: 600
                    , height: 300
                    , url: '../json/table/temp2.json'
                    , title: '长征沿途主要城市'
                    , data: viewObj.tbData  //数据类
                    , page: false //开启分页
                    , limit: 10
                    , toolbar: 'default' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
                    , totalRow: true //开启合计行
                    , cols: [[ //表头
                        { id: 'id', field: 'id', title: 'ID', width: 30, fixed: true }
                        , { field: 'name', title: '名称', width: 130 }
                        , { field: 'longitude', title: '经度', width: 70 }
                        , { field: 'latitude', title: '纬度', width: 70 }
                        , { field: 'address', title: '信息', width: 100 }
                        , { fixed: 'right', width: 170, align: 'center', toolbar: '#barDemo' }
                    ]]
                });


                //监听头工具栏事件
                table.on('toolbar(test)', function (obj) {
                    var checkStatus = table.checkStatus(obj.config.id)
                        , data = checkStatus.data; //获取选中的数据
                    switch (obj.event) {
                        case 'add':
                            layer.msg('添加成功');
                            infoSubmit();


                            /*console.log("有没有得到table");
                            console.log(table);
                            var get_address = document.getElementById("address_input").value;
                            var get_name = document.getElementById("name_input").value;
                            var get_lon = document.getElementById("lon_input").value;
                            var get_lat = document.getElementById("lat_input").value;
                            var oldData = table.cache["dataTable"];
                            console.log(oldData);
                            //var newData = oldData[1];
                            var newRow = {id: "13", name: get_name, longitude: get_lon, latitude: get_lat, address: get_address };
                            //console.log(newData);

                            oldData.push(newRow);
                            console.log(oldData);
                            /*tableIns.reload({
                                data: oldData
                            });
                            tableIns = table.reload("dataTable", { data: $.extend(true, [], oldData) });*/
                            break;
                        case 'update':
                            if (data.length === 0) {
                                layer.msg('请在表格下方填入信息后，再点表格“编辑”按钮进行修改');
                            } else if (data.length > 1) {
                                layer.msg('只能同时编辑一个');
                            } else {
                                layer.alert('编辑 [id]：' + checkStatus.data[0].id);
                            }
                            break;
                        case 'delete':
                            if (data.length === 0) {
                                layer.msg('在表格中需要删除的数据处点击“删除”按钮');
                            } else {
                                layer.msg('删除');
                            }
                            break;
                    };
                });



                //监听工具条
                table.on('tool(test)', function (obj, json) {
                    var data = obj.data;
                    console.log(json);
                    console.log(obj.data);
                    var json0 = json;
                    if (obj.event === 'detail') {
                        console.log(json0);
                        //layer.msg('ID：' + data.id + ' 的查看操作');
                        layer.msg(data.address + " " + data.name + "         \r\n经度:" + data.longitude + "， 纬度:" + data.latitude);
                        var X = parseFloat(data.longitude); //float型
                        var Y = parseFloat(data.latitude);  //float型
                        var centerLocation = ol.proj.fromLonLat([X, Y]);
                        console.log(centerLocation);
                        var center = view.getCenter();
                        view.animate(
                            //第一个过程
                            {
                                center: centerLocation
                            });

                        //添加不一样的marker点
                        //将json中每个点标注出来
                        var poiLoc = ol.proj.fromLonLat([X, Y]);

                        //实例化Vector要素，通过矢量图层添加到地图容器中
                        var iconFeature = new ol.Feature({
                            geometry: new ol.geom.Point(poiLoc)
                        });
                        iconFeature.setStyle(createLabelStyle_target(iconFeature));
                        //矢量标注的数据源
                        var vectorSource = new ol.source.Vector({
                            features: [iconFeature]
                        });
                        //矢量标注图层
                        var vectorLayer = new ol.layer.Vector({
                            source: vectorSource
                        });
                        console.log(total_layer.array_);
                        total_layer.array_[data.id] = vectorLayer;
                    } else if (obj.event === 'del') {
                        layer.confirm('真的删除此POI吗？', function (index) {
                            obj.del();
                            layer.close(index);

                            var X = parseFloat(data.longitude); //float型
                            var Y = parseFloat(data.latitude);  //float型

                            //添加不一样的marker点
                            var poiLoc = ol.proj.fromLonLat([X, Y]);

                            //实例化Vector要素，通过矢量图层添加到地图容器中
                            var iconFeature = new ol.Feature({
                                geometry: new ol.geom.Point(poiLoc)
                            });
                            iconFeature.setStyle(createLabelStyle_delete(iconFeature));
                            //矢量标注的数据源
                            var vectorSource = new ol.source.Vector({
                                features: [iconFeature]
                            });
                            //矢量标注图层
                            var vectorLayer = new ol.layer.Vector({
                                source: vectorSource
                            });
                            //console.log(total_layer.array_);
                            total_layer.array_[data.id] = vectorLayer;
                            //vectorLayer.changed();
                            total_layer.array_[data.id].changed()
                            /* var data = obj.data;
                             total_layer.array_[data.id].setVisible = false;*/
                            //map.removeLayer(total_layer.array_[data.id]);
                            //console.log(total_layer);

                        });
                    } else if (obj.event === 'edit') {

                        var get_address = document.getElementById("address_input").value;
                        var get_name = document.getElementById("name_input").value;
                        var get_lon = document.getElementById("lon_input").value;
                        var get_lat = document.getElementById("lat_input").value;
                        //表格数据的更改
                        obj.update({
                            address: get_address
                            , name: get_name
                            , longitude: get_lon
                            , latitude: get_lat
                        });

                        //图层数据的修改
                        var X = parseFloat(parseFloat(get_lon)); //float型
                        var Y = parseFloat(parseFloat(get_lat));  //float型

                        //添加不一样的marker点
                        //将json中每个点标注出来
                        var poiLoc = ol.proj.fromLonLat([X, Y]);

                        //实例化Vector要素，通过矢量图层添加到地图容器中
                        var iconFeature = new ol.Feature({
                            geometry: new ol.geom.Point(poiLoc)
                        });
                        iconFeature.setStyle(createLabelStyle_target(iconFeature));
                        //矢量标注的数据源
                        var vectorSource = new ol.source.Vector({
                            features: [iconFeature]
                        });
                        //矢量标注图层
                        var vectorLayer = new ol.layer.Vector({
                            source: vectorSource
                        });
                        //console.log(total_layer.array_);
                        total_layer.array_[data.id] = vectorLayer;
                        //移动到更改之后的地址处
                        view.animate(
                            //第一个过程
                            {
                                center: poiLoc
                            });
                    }
                });



            });
            /*//定义事件集合
            var active = {
                addRow: function () {	//添加一行
                    var oldData = table.cache[layTableId];yhy
                    console.log(oldData);
                    var newRow = { tempId: new Date().valueOf(), type: null, name: '请填写名称', state: 0 };
                    oldData.push(newRow);
                    tableIns.reload({
                        data: oldData
                    });
                }
            }*/
        };

        function infoSubmit() { //新增一个点

            console.log(layui.table);
            var userData = layui.table.cache['dataTable'];//取得表中的数据
            console.log("user data");
            console.log(userData);
            var newData = new Array();//接收表中的数据
            for (var i = 0; i < userData.length; i++) {
                newData[i] = userData[i];
                console.log(i);
            }
            var newRow = {};//新建一行空数据
            var get_address = document.getElementById("address_input").value;
            var get_name = document.getElementById("name_input").value;
            var get_lon = document.getElementById("lon_input").value;
            var get_lat = document.getElementById("lat_input").value;
            newRow["id"] = "" + (userData.length + 1);
            newRow["name"] = get_name;
            newRow["longitude"] = get_lon;
            newRow["latitude"] = get_lat;
            newRow["address"] = get_address;
            newRow["LAY_TABLE_INDEX"] = userData.length;
            //*********************************回来把分页实现了应该就可以往下显示数据了**********************
            newData[userData.length] = newRow;//原有数据的最后添加新增加的一行数据
            console.log("newData");
            console.log(newData);
            /*layui.table.reload("dataTable", {
                data: newData
            });*/
            layui.table.render({//重新渲染表格
                elem: '#dataTable'
                , width: 600
                , height: 300
                , title: '长征沿途重要城市'
                , page: { limit: newData.length } //开启分页
                , toolbar: 'default' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
                , totalRow: true //开启合计行
                , data: newData
                , cols: [[ //表头
                    { field: 'id', title: 'ID', width: 30, fixed: true }
                    , { field: 'name', title: '名称', width: 80 }
                    , { field: 'longitude', title: '经度', width: 70 }
                    , { field: 'latitude', title: '纬度', width: 70 }
                    , { field: 'address', title: '信息', width: 150 }
                    , { fixed: 'right', width: 170, align: 'center', toolbar: '#barDemo' }
                ]]
            });

            //新增一个点
            var lon = parseFloat(get_lon); //string -> float
            var lat = parseFloat(get_lat);  //string -> float

            //通过投影变换转换为ol形式的点
            var poiLoc = ol.proj.fromLonLat([lon, lat]);

            //实例化Vector要素，通过矢量图层添加到地图容器中
            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(poiLoc)
            });
            iconFeature.setStyle(createLabelStyle_target(iconFeature));
            //矢量标注的数据源
            var vectorSource = new ol.source.Vector({
                features: [iconFeature]
            });
            //矢量标注图层
            var vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });
            //vectorLayer.visible = false;
            map.addLayer(vectorLayer);

            //移动到新增的点
            var view = map.getView();
            var centerLocation = ol.proj.fromLonLat([lon, lat]);
            console.log(centerLocation);
            var center = view.getCenter();
            view.animate(
                //第一个过程
                {
                    center: centerLocation
                });
        }

    </script>

    <script>

        /**
* 创建矢量标注样式函数,设置image为图标ol.style.Icon
* @param {ol.Feature} feature 要素
*/
        var createLabelStyle = function (feature) {
            return new ol.style.Style({
                /**{olx.style.IconOptions}类型*/
                image: new ol.style.Icon(
                    ({
                        anchor: [0.5, 60],
                        anchorOrigin: 'top-right',
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        offsetOrigin: 'top-right',
                        // offset:[0,10],
                        //图标缩放比例
                        // scale:0.5,
                        //透明度
                        opacity: 0.75,
                        //图标的url
                        src: 'src/images/daxue.jpg'
                    })
                )
            });
        }

        var createLabelStyle_target = function (feature) {  //定位对应的marker用另外的icon显示
            return new ol.style.Style({
                /**{olx.style.IconOptions}类型*/
                image: new ol.style.Icon(
                    ({
                        anchor: [0.5, 60],
                        anchorOrigin: 'top-right',
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        offsetOrigin: 'top-right',
                        // offset:[0,10],
                        //图标缩放比例
                        // scale:0.5,
                        //透明度
                        opacity: 1,
                        //图标的url
                        src: 'src/images/blueIcon.png'
                    })
                )
            });
        }

        var createLabelStyle_delete = function (feature) {   //删除之后，marker不再显示（透明度设置为0）
            return new ol.style.Style({
                /**{olx.style.IconOptions}类型*/
                image: new ol.style.Icon(
                    ({
                        anchor: [0.5, 60],
                        anchorOrigin: 'top-right',
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        offsetOrigin: 'top-right',
                        // offset:[0,10],
                        //图标缩放比例
                        // scale:0.5,
                        //透明度
                        opacity: 0,
                        //图标的url
                        src: 'src/images/blueIcon.png'
                    })
                )
            });
        }


    </script>


    <div class="layui-btn-container">

        <button id="showBox" type="button" class="layui-btn" style="position: absolute; top: 10px; left: 1200px;z-index:9999"><i class="layui-icon"></i></button>
        <button id="hideBox" type="button" class="layui-btn" style="position: absolute; top: 10px; left: 1300px;z-index:9999"><i class="layui-icon"></i></button>

    </div>

    <script>

        /*表格的显示与隐藏
        function showOrHide() {
            var div = $("#dataTable").get(0);
            if (div.style.display == "") {
                div.style.display = "none";
            } else {
                div.style.display = ""; }*/
        var hButton = document.getElementById("hideBox");
        var box = document.getElementById("inputBox");
        //var table = $("#dataTable").get(0);
        var table = document.getElementById("table");
        var sButton = document.getElementById("showBox");
        hButton.onclick = function () {
            if (box.style.visibility = "visible") {
                //table.display = "none"
                table.style.visibility = "hidden"
                box.style.visibility="hidden"
                alert("隐藏表单")

            }
            else {
                //table.style.display = "block"
            }
        }
        sButton.onclick = function () {
            if (box.style.visibility = "hidden") {
                //table.display = "none"
                table.style.visibility="visible"
                box.style.visibility="visible"
                alert("显示表单")

            }
            else {
                //table.style.display = "block"
            }
        }
      
    </script> 



    <!--导航测试-->

    <ul class="layui-nav" style="margin-top: -100px;z-index:9998">
        <li class="layui-nav-item layui-this"><a href="">首页</a></li>
        <li class="layui-nav-item">
            <a href="xinwen.html">长征故事</a>
        </li>
        <li class="layui-nav-item"><a href="javascript:;">日新月异</a>
            <dl class="layui-nav-child" style="z-index:9999">
                <dd><a href="earth.html">大国外交</a></dd>
                <dd><a href="jingji.html">经济建设</a></dd>
                <dd><a href="people.html">人口变化</a></dd>
            </dl>
        </li>
        <li class="layui-nav-item">
            <a href="javascript:;">漫漫长征</a>
            <dl class="layui-nav-child">
                <dd><a href="donghua.html">长征动画</a></dd>
                <dd><a href="shijianzhou.html">长征时间轴</a></dd>
                <dd><a href="junbiao.html">长征军标绘制</a></dd>
            </dl>
        </li>
        <li class="layui-nav-item">
            <a href="javascript:;">长征区位因素分析（开发中）</a>
            <dl class="layui-nav-child">
                <dd><a href="jihe.html">几何分析</a></dd>
                <dd><a href="kongjian.html">空间分析</a></dd>
                <dd><a href="wangluo.html">网络分析</a></dd>
                <dd><a href="requ.html">地图热区</a></dd>
            </dl>
        </li>
        <li class="layui-nav-item"><a href="bangzhu.html">帮助</a></li>
    </ul>


    <ul class="layui-nav layui-nav-tree layui-inline" lay-filter="demo" style="margin-right: 0px;z-index:9997">
        <li class="layui-nav-item ">
            <a href="javascript:;">长征重要位置标注</a>
            <dl class="layui-nav-child">
                <dd><a href="javascript:addpoint();">添加点</a></dd>
                <dd><a href="javascript:addLine();">添加线</a></dd>
                <dd><a href="javascript:addshape();">添加图形</a>
                    <select id="type">
                        <option value="None">无</option>
                        <option value="LineString" selected="selected">自由线</option>
                        <option value="Polygon">多边形</option>
                        <option value="Circle">圆</option>
                    </select>
                </dd>
                <dd><a href="javascript:deleteDraw();">清空所有绘制图形</a></dd>
            </dl>
        </li>
        <li class="layui-nav-item">
            <a href="ceju.html">长征测量</a>
            
        </li>
        <li class="layui-nav-item"><a href="javascript:export_map()">地图导出</a></li>
        <li class="layui-nav-item"><a href="dizhi.html">红旅查询</a></li>
    </ul>

   
    


    <script src="//res.layui.com/layui/dist/layui.js" charset="utf-8"></script>
    <!-- 注意：如果你直接复制所有代码到本地，上述 JS 路径需要改成你本地的 -->
    <script>
        layui.use('element', function () {
            var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块

            //监听导航点击
            element.on('nav(demo)', function (elem) {
                //console.log(elem)
                layer.msg(elem.text());
            });
        });
        
    </script>

    <script>
         function export_map() {
            map.once('postcompose', function (event) {
                var canvas = event.context.canvas;
               
                if (navigator.msSaveBlob) {
                    navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
                } else {
                    canvas.toBlob(function (blob) {
                        saveAs(blob, 'map.png');
                    });
                }
            });
            map.renderSync();
        };
    </script>    

    <script>
        var typeSelect = document.getElementById('type');
        var draw;
        var source = new ol.source.Vector({ wrapX: false });
        var vector = new ol.layer.Vector({
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(0,0,0, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#000000',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#000000'
                    })
                })
            })
        });
        map.addLayer(vector);
        function addInteraction(_type) {
            if (source == null) {
                source = new ol.source.Vector({ wrapX: false });
                //添加绘制层数据源
                vector.setSource(source);
            }
            draw = new ol.interaction.Draw({
                //绘制层数据源
                source: source,
                /** @type {ol.geom.GeometryType}几何图形类型 */
                type: _type,

            });
            map.addInteraction(draw);
        }

        function addpoint() {
            map.removeInteraction(draw);
            addInteraction('Point');
        }
        function addLine() {
            map.removeInteraction(draw);
            addInteraction('LineString');
        }
       
        function addshape() {
            map.removeInteraction(draw);
            if (source == null) {
                source = new ol.source.Vector({ wrapX: false });
                //添加绘制层数据源
                vector.setSource(source);
            }
            draw = new ol.interaction.Draw({
                source: source,
                /** @type {ol.geom.GeometryType}几何图形类型 */
                type: (typeSelect.value),
                freehand: true
            });
            map.addInteraction(draw);
        }

        function deleteDraw() {
            source = null;
            map.removeInteraction(draw);
            //清空绘制图形
            vector.setSource(source);
        }
        

    </script>

    

</body>
</html>