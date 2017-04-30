(function() {
	var textInput, mapsSearchResult, service, map;

	var buttons = {
		uber : {
			id : 'uber',
			context : {},
			captionFn : function(loc) {return "Uber to " + loc + "! Good luck getting back!";}
		},
		drizly : {
			id : 'drizly',
			context : {},
			captionFn : function(alc) {return "Get CRUNK.... order " + alc + " on Drizly!";}
		},
		jet : {
			id : 'jet',
			context : {},
			captionFn : function(txt) {return "Use Jet to get " + txt + "!";}
		},
		delivery : {
			id : 'delivery',
			context : {},
			captionFn : function(item) {return "Get " + item + " delivered with Delivery!";}
		},
		itunes : {
			id : 'itunes',
			context : {},
			captionFn : function(music) {return "Check out " + music + " on iTunes!!";}
		},
	};

	$(document).ready(function() {
		textInput = $('#inspiration-input');
		//console.log('doc ready');
	    $('#inspiration-form').on('submit', function(e) {
	    	// prevent page reload
	        e.preventDefault();

	        var inputText = textInput.val();
	        //console.log(inputText);
	        updateButtons(inputText);

	        // clear the text field
	        textInput.val("");
	    })
	});

	function updateButtons(searchText) {
	    googleMapsSearch(searchText); // handle uber
	    // other actions to come

	    // once all the requests have come in, update all the button contexts

	}

	// ---------Google Maps / Uber related (get nearby location) ---------------------

	window.initMap = function() {
		//console.log('initMap ready');
		//console.log(google);

		var george = new google.maps.LatLng(42.3509178,-71.111145); // current location

		map = new google.maps.Map(document.getElementById('map'), {
	    	center: george,
	      	zoom: 15
	    });

		service = new google.maps.places.PlacesService(map);
		//service.textSearch(createRequest('coffee'), callback);
	};

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
	  		updateUberContext(mapSearchResult.geometry.location.lat, 
	  						 mapSearchResult.geometry.location.lng,
	  						 mapSearchResult.name);
	  	}
	  	var toLog = results.length >= 0 ? results[0] : results.length;
	    console.log(toLog);
	  }
	}

	function updateUberContext(latitude, longitude, placeName) {
		buttons.uber.context.latitude = latitude;
		buttons.uber.context.longitude = longitude;
		//textInput.val(buttons.uber.captionFn(placeName));
	}


})();





