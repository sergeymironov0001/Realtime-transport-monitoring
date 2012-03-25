/**
 * 
 */
function AjaxRequester(processingReceivedDataFunc, outputErrorFunc) {
	this.http_request = false;
	this.processingReceivedData = processingReceivedDataFunc;
	this.outputError = outputErrorFunc;

	this.processingServerResponse = function() {
		if (this.readyState == 4)
		{
			if (this.status == 200) {
				processingReceivedDataFunc(this);
			} else {
				outputErrorFunc('There was a problem with the request. Request status: '
						+ this.status);
			}
		}
	}
}

/**
 * ������� ����������� GET ������ �� ��������� url
 */
AjaxRequester.prototype.makeGetRequest = function(url) {
	this.http_request = false;
	if (window.XMLHttpRequest) {
		this.http_request = new XMLHttpRequest();
		if (this.http_request.overrideMimeType) {
			this.http_request.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) {
		try {
			this.http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				this.http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
			}
		}
	}

	if (!this.http_request) {
		this.outputError('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	this.http_request.onreadystatechange = this.processingServerResponse;
	this.http_request.open('GET', url, true);
	this.http_request.send(null);
}