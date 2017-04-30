var textInput, mapsSearchResult, service, map;

window.initMap = function() {
	console.log('initMap ready');
	console.log(google);

	var george = new google.maps.LatLng(42.3509178,-71.111145); // current location

	map = new google.maps.Map(document.getElementById('map'), {
    	center: george,
      	zoom: 15
    });

	service = new google.maps.places.PlacesService(map);
	//service.textSearch(createRequest('coffee'), callback);
};

$(document).ready(function() {
	textInput = $('#inspiration-input');
	console.log('doc ready');
    $('#inspiration-form').on('submit', function(e) {
    	// prevent page reload
        e.preventDefault();

        var inputText = textInput.val();
        console.log(inputText);
        updateButtons(inputText);

        // clear the text field
        textInput.val("");
    })
});

function updateButtons(searchText) {
    googleMapsSearch(searchText);
}

function googleMapsSearch(searchText) {
	//service = new google.maps.places.PlacesService(map);
	service.textSearch(createRequest(searchText), callback);
}

function createRequest(searchText) {
	return {
		query: searchText,
		location: new google.maps.LatLng(42.3509178,-71.111145),
		//location: george,
		radius: 100
	};
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
  	if(results.length >= 0) {
  		mapSearchResult = results[0];
  	}
  	var toLog = results.length >= 0 ? results[0] : results.length;
    console.log(toLog);
  }
}





