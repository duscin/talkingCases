//
//
//
var mapObj;
function mapInit() {
    //构造地图类,第一个参数为加载地图的容器，例如div的id
    mapObj = new Z.Map("container",{
        center:     new Z.Coordinate(118.80143395169193,32.03111369340704),
        //center: new Z.Coordinate(93.291,30.061),
        zoomLevel:  6,
        enablePopTip:   true,
        enableMoveSilde:true
    }); 
    //添加mapabc瓦片图层
    /*mapObj.setBaseTileLayer(new Z.TileLayer("tile",{
        crs:"crs3857",
        urlTemplate:"http://localhost:8090/tileservice/tile?x={x}&y={y}&z={z}&n=nanjing"        
        // urlTemplate:"https://b.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q"
        
    }));*/

    mapObj.setBaseTileLayer(new Z.TileLayer("tile",{
        crs:"BAIDU",
        urlTemplate:"http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl",
        subdomains:[0,1,2,3,4]
    }));
    mapObj.Load();    
}


$(document).ready(function(){

    before('prepare map',function() {
        mapInit();
    });

    describe('测试地图底图',function() {
        it('测试百度底图',function() {
            
        });
        it('测试高德底图',function() {
            
        });
    });

    describe('测试地图API',function() {
        it('测试setCenter',function() {
            
        });
    });

    run();
});
