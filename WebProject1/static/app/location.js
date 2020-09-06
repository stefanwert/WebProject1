Vue.component("location", {
	data: function () {
		    return {
		      sc: null,
		      selectedHost: {}
		    }
	},
	template: ` 
		<div>
			<h2>My map</h2>
			<div onclick="setPinOnMap()" id="map" class="map"></div>
		</div>
`
	, 
	methods : {
		
    },
    mounted() {
    	var map = new ol.Map({
            target: 'map',
            layers: [
              new ol.layer.Tile({
                source: new ol.source.OSM()
              })
            ],
            view: new ol.View({
              center: ol.proj.fromLonLat([37.41, 8.82]),
              zoom: 4
            })
          });
    }
});