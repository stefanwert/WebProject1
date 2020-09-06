//
//setPinOnMap: function(evt){
//            var self = this;
//
//            var latLong = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
//            var lat     = latLong[1];
//            var long    = latLong[0];
//
//            self.params.options.mapClick({lat: lat, long: long});
//
//            if(self.dinamicPinLayer !== undefined){
//                console.log("moove")
//                self.iconGeometry.setCoordinates(evt.coordinate);
//                  //or create another pin  
//            } else {
//                self.iconGeometry = new ol.geom.Point(evt.coordinate);
//                var iconFeature = new ol.Feature({
//                    geometry: self.iconGeometry,
//                    name: 'Null Island',
//                    population: 4000,
//                    rainfall: 500
//                });
//                var iconStyle = new ol.style.Style({
//                    image: new ol.style.Icon(({
//                        anchor: [0.5, 46],
//                        anchorXUnits: 'fraction',
//                        anchorYUnits: 'pixels',
//                        size: [48, 48],
//                        opacity: 1,
//                        src: '/resources/cloud/controls/cloudMap/img/redmarker_small.png'
//                    }))
//                });
//
//                iconFeature.setStyle(iconStyle);
//
//                var vectorSource = new ol.source.Vector({
//                    features: [iconFeature]
//                });
//                self.dinamicPinLayer = new ol.layer.Vector({
//                    source: vectorSource
//                });
//                self.map.addLayer(self.dinamicPinLayer); 
//            }
//
//
//        },