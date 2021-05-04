// 自定义版权信息（简单的html字符串）
var mapAttr =
'All Rights Reserved © 2021 by <a href="https://agou-ops.top">AGou-ops</a> | ' +
  'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

var mapboxUrl =
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VvZmVpeWEiLCJhIjoiY2tuazdjaGIyMDUwajJwbjAxNmFtcTRheiJ9.75l1Jw5Ux76FN8uOPAoGpA';
// 高德矢量底图url
var gaodeUrl= 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}';
// 定义两个图层，影像图层和街道图层（这里是有了mapbox地图服务）
var satellite = L.tileLayer(mapboxUrl, {
     id: 'mapbox/satellite-v8',
        attribution: mapAttr
      }),
      streets = L.tileLayer(mapboxUrl, {
    id: 'mapbox/streets-v11',

        attribution: mapAttr
    }),
    gaode = L.tileLayer(gaodeUrl, {
  subdomains: ['1', '2', '3', '4'],
      minZoom: 1,
      maxZoom: 19
    })
    ;
// 创建地图实例
var map = L.map('map', {
  center: [27.7, 125.3],
  zoom: 15,
  // 展示两个图层
  layers: [satellite, streets, gaode]
});

// 通过layer control来实现图层切换UI
// https://leafletjs.com/examples/layers-control/
var baseLayers = {
  '影像图': satellite,
    '街道图': streets,
    '高德': gaode
};
L.control.layers(baseLayers).addTo(map);

//  数据转换
var allpoints = dataHandler();
// 根据坐标点数组polylinePoints通过 L.polyline 方法 绘制折线，颜色为蓝色blue
polyline = L.polyline(allpoints, { color: 'red' }).addTo(map);
// 这里注意，如果地图中心地位位置不对，可能绘制了折线看不到，所以这里获取折线的最外层矩形区域，进行缩放到折线范围
map.fitBounds(polyline.getBounds());
// polyline.snakeIn();
map.removeLayer(polyline);
animateDrawLine();

/* 数据转换 & 绘制折线图 */
// typhoonTestData变量是全局的台风数据对象，详细见./data.js文件
function dataHandler() {
  // 获取台风坐标点数据对象
  var forecast = typhoonTestData[0]['points'];
  // 定义折线点数据
  var polylinePoints = [];
  // 循环拼接数据[[经度，纬度],[经度,纬度]] 的格式
  for (var i = 0; i < forecast.length; i++) {
    var p = forecast[i];
    polylinePoints.push([Number(p['lat']), Number(p['lng'])]);
  }

  return polylinePoints;
}

// line
var lineLayer;
// Marker
var marker;
// icon
var typhoonIcon = L.icon({
  iconUrl: './typhoon.png',
  iconSize: [28, 28],
  iconAnchor: [10, 10]
});

// 获取台风信息，详细见./data.js文件数据
var land = typhoonTestData[0]['land'][0];

/* 动态绘制折线 */
function animateDrawLine() {
  // allpoints 是上边介绍的数据转换的结果
  var length = allpoints.length;
  // 定义用来存放递增元素的经纬度数据
  var drawPoints = [];
  var count = 0;
  // 定时器100ms，动态的塞入坐标数据
  var timer = setInterval(function() {
    if (count < length) {
      drawPoints.push(allpoints[count]);
      count++;
      // 清除之前绘制的折线图层
      if (lineLayer && count !== length) {
        map.removeLayer(lineLayer);
        lineLayer = null;
      }
      // 清除marker图层
      if (marker && count !== length) {
        map.removeLayer(marker);
        marker = null;
      }

      // 最新数据点drawPoints绘制折线
      lineLayer = L.polyline(drawPoints, { color: 'red' }).addTo(map);

      // 根据最新数组最后一个点绘制marker
      if (count === length) {
        map.removeLayer(marker);
        // 如果是台风最后一个点，则自动popup弹窗
        marker = L.marker(drawPoints[length - 1], { icon: typhoonIcon })
          .addTo(map)
          .bindPopup(
            '<p style="font-family:verdana;font-size:150%;font-weight:bold;color:black;text-align:center;">' +
              typhoonTestData[0]['name'] +
              '</p>' +
              land['info'] +
              '<br>' +
              land['landtime'] +
              '<br>经度：' +
              land['lng'] +
              '<br>纬度：' +
              land['lat'] +
              '<br>强度：' +
              land['strong'] +
                '<br><br><b>Author: <a href="https://agou-ops.top">AGou-ops</a><b>'
          )
          .openPopup();
      } else {
        marker = L.marker(drawPoints[count - 1], { icon: typhoonIcon }).addTo(
          map
        );
      }
    } else {
      // 取完数据后清楚定时器
      clearInterval(timer);
    }
  }, 100);
}
