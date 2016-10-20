


//绘画、线初始化，初始化后左上角现在绘画方式自己出来
var drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,

        drawingModes: [
            google.maps.drawing.OverlayType.MARKER,

            google.maps.drawing.OverlayType.POLYLINE

        ]
    },
    //注意先后，不能放在 drawingModes之前
    markerOptions: {
        icon: '../../GoogleMapsAPIv3/mapfiles/spotlight-poi.png'
    },
    //设置图形显示样式
    circleOptions: style,
    //多边形
    polygonOptions: style,
    //矩形
    rectangleOptions: style,
    //线
    polylineOptions: style
});
drawingManager.setMap(map);

//这个事件触发,当用户完成一个标记
google.maps.event.addListener(drawingManager, 'markercomplete', function (event) {
    // alert("这个事件触发,当用户完成一个标记")
    // alert(event.position)
    //点击标记
    // addListenerOnce这个是只能点击一次
    google.maps.event.addListener(event, "click", function () {
        if (infowindow) { infowindow.close() };
        // alert("你点击了标记")
        // alert(event.position);
        // event.setMap(null)//删除当前标记
        infowindow.setContent('测试点击标记!!!!!!' + event.position);//设置提示框内容

        infowindow.open(map, event);//地图上展现

    });

    google.maps.event.addListener(event, "rightclick", function () {
        alert("右键事件")

    });

});

//这个事件触发,当用户完成绘制折线
google.maps.event.addListener(drawingManager, 'polylinecomplete', function (event) {
    // alert("这个事件触发,当用户完成绘制折线")
    //这里是线,和多边形
    var tangle_data = [];
    var strJson = '';
    strJson += '['
    for (var i = 0; i < event.getPath().length; i++) {
        tangle_data.push([event.getPath().b[i].lng(), event.getPath().b[i].lat(), event.fillColor, event.strokeColor, event.strokeWeight, event.fillOpacity, event.strokeOpacity]);
        strJson += '{lng:' + event.getPath().b[i].lng() + ',lat:' + event.getPath().b[i].lat() + ',color:' + event.fillColor + '},';
    };
    strJson = strJson.substring(0, strJson.length - 1);
    strJson += ']'
    var dd = event.getPath()
    google.maps.event.addListener(event, "rightclick", function () {
        alert("右键事件")

    });

});