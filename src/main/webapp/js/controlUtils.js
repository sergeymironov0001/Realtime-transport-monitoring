function createOneClickControl(handler) {
		OpenLayers.Control.Click = OpenLayers.Class(
						OpenLayers.Control,
						{
							defaultHandlerOptions : {
								'single' : true,
								'double' : false,
								'pixelTolerance' : 0,
								'stopSingle' : false,
								'stopDouble' : false
							},

							initialize : function(options) {
								this.handlerOptions = OpenLayers.Util.extend(
										{}, this.defaultHandlerOptions);
								OpenLayers.Control.prototype.initialize.apply(
										this, arguments);
								this.handler = new OpenLayers.Handler.Click(
										this, {
											'click' : this.onClick
										}, this.handlerOptions);
							},

							onClick : function(evt) {
								handler(this, evt);
							}

					});
	return new OpenLayers.Control.Click();
}

/**
 * ????????? ??????????? ??????? ????
 */
function createShowClickCoordinatesControl(outputMessageFunc) {
	var handler = function(control, evt){
		var point = convertViewPortPositionToMapPosition(evt.xy)
		outputMessageFunc("You clicked near " + +point.lon + " E, "
					+ point.lat + " N");
	}
	return createOneClickControl(handler);	 
}
	
