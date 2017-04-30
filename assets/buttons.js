function initMap() {
	service = new google.maps.places.PlacesService(map);
	service.textSearch(createRequest('coffee'), callback);
}

var george = new google.maps.LatLng(42.3509178,-71.111145);

$(document).ready(function() {
    $('#inspiration-form').on('submit', function(e) {
        e.preventDefault();
        var inputText = $('#inspiration-input').val();
        console.log(inputText);
        var result = doSearch('coffee');
        $(#textfield).val(result);
    })
});

function doSearch(searchText) {
	service = new google.maps.places.PlacesService(map);
	service.textSearch(createRequest(searchText), callback);
}

function createRequest(searchText) {
	return {
		query: searchText,
		location: new google.maps.LatLng(42.3509178,-71.111145),
		//location: george,
		radius: 1000
	};
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
  	var toLog = results.length >= 0 ? results[0] : results.length;
    console.log(toLog);
    alert(toLog);
    return toLog;
  }
}
