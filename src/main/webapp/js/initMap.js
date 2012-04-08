var objectsPositionAjaxRequester = null;
//Map
var map;
var markers;
//Projections
var MAP_PORJECTION = new OpenLayers.Projection("EPSG:900913");
var MAP_DISPLAY_PROJECTION = new OpenLayers.Projection("EPSG:4326");
//Routing api
var ROUTING_API_BASE_URL = "http://www.yournavigation.org/api/1.0/gosmore.php?";
//Bounds
var restrictedAreaBounds = {
	left : 3974190.41092,
	bottom : 7715591.85224,
	right : 4015619.28024,
	top : 7747848.27817
};

function initOSMMap() {
	var extent = new OpenLayers.Bounds(restrictedAreaBounds.left,
			restrictedAreaBounds.bottom, restrictedAreaBounds.right,
			restrictedAreaBounds.top);

	map = new OpenLayers.Map("map", {
		controls : [ new OpenLayers.Control.Navigation(),
				new OpenLayers.Control.PanZoomBar(),
				new OpenLayers.Control.MousePosition(),
				new OpenLayers.Control.LayerSwitcher(),
				new OpenLayers.Control.Attribution(),
				new OpenLayers.Control.OverviewMap(), ],
		numZoomLevels : 25,
		maxExtent : extent,
		restrictedExtent : new OpenLayers.Bounds(restrictedAreaBounds.left,
				restrictedAreaBounds.bottom, restrictedAreaBounds.right,
				restrictedAreaBounds.top),
		projection : MAP_PORJECTION,
		displayProjection : MAP_DISPLAY_PROJECTION
	});

	map.addLayer(new OpenLayers.Layer.OSM());
	map.zoomToExtent(extent);

	// ������������� �������� �� �����
	markers = new OpenLayers.Layer.Markers("Markers");
	map.addLayer(markers);
}
