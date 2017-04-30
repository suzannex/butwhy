(function() {
	var textInput, mapsSearchResult, service, map;
    var documentIsReady = false,
        googleIsReady = false;

    var GEORGE_LAT = 42.3509178,
        GEORGE_LNG = -71.111145;

    // default context values
	var buttons = {
		uber : {
			id : 'uber-button',
            btn_id : 'btn-2be3b964e4ec877f',
			context : {
                user_location: {
                    latitude: GEORGE_LAT,
                    longitude: GEORGE_LNG
                },
                subject_location: {}
            },
            label_text: '',
			captionFn : function(loc) {return "Uber to " + loc + "! Good luck getting back!";}
		},
		drizly : {
			id : 'drizly-button',
            btn_id : 'btn-4bd35bca12181d57',
			context : {},
            label_text: '',
			captionFn : function(alc) {return "Get CRUNK.... order " + alc + " on Drizly!";}
		},
		jet : {
			id : 'jet-button',
            btn_id : 'btn-1022822d571cf465',
			context : {},
            label_text: '',
			captionFn : function(txt) {return "Use Jet to get " + txt + "!";}
		},
		delivery : {
			id : 'deliverycom-button',
            btn_id : 'btn-4029504a709ce5df',
			context : {},
            label_text: '',
			captionFn : function(item) {return "Get " + item + " delivered with Delivery!";}
		},
		itunes : {
			id : 'itunes-button',
            btn_id : 'btn-5de6d93abecc3fc3',
			context : {},
            label_text: '',
			captionFn : function(music) {return "Check out " + music + " on iTunes!!";}
		},
	};

	$(document).ready(function() {
        documentIsReady = true;
        initializeMapIfReady();

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
        googleIsReady = true;
		//console.log('initMap ready');
		//console.log(google);
        initializeMapIfReady();
		//service.textSearch(createRequest('coffee'), callback);
        //
	};

    function initializeMapIfReady() {
        if (googleIsReady && documentIsReady) {
            var george = new google.maps.LatLng(GEORGE_LAT,GEORGE_LNG); // current location 

            var map = new google.maps.Map(document.getElementById('map'), {
                center: george,
                zoom: 15
            });

            service = new google.maps.places.PlacesService(map);
        }
    }

	function googleMapsSearch(searchText) {
		//service = new google.maps.places.PlacesService(map);
		service.textSearch(createRequest(searchText), updateContextAfterMapSearch);
	}

	function createRequest(searchText) {
		return {
			query: searchText,
			location: new google.maps.LatLng(42.3509178,-71.111145),
			//location: george,
			radius: 100
		};
	}

	function updateContextAfterMapSearch(results, status) {
	  if (status == google.maps.places.PlacesServiceStatus.OK) {
	  	if(results.length >= 0) {
	  		mapSearchResult = results[0];
	  		updateUberContext(mapSearchResult.geometry.location.lat(), 
	  						 mapSearchResult.geometry.location.lng(),
	  						 mapSearchResult.name);
	  	}
	  	var toLog = results.length >= 0 ? results[0] : results.length;
	    console.log(toLog);

        $('#uber-button').attr('data-bttnio-context', JSON.stringify(buttons.uber.context)); 
        bttnio('refresh', function(success, actions) {
            if (success) {
                console.log(actions);
                $.each(actions, function(index, button) {
                    for (var key in buttons) {
                        var currentButton = buttons[key];
                        if (button.id === currentButton.btn_id) {
                            console.log($('#' + currentButton.id + ' .bttnio-cell span'))
                            $('#' + currentButton.id + ' .bttnio-cell span').text(currentButton.captionFn(currentButton.label_text));
                            console.log(currentButton.captionFn(currentButton.label_text))
                            //button.button.preview.label_text = currentButton.captionFn(currentButton.label_text);
                        }
                    }
                })
            } else {
                console.log("Failed to refresh");
            }
        }) 

	  }
	}

	function updateUberContext(latitude, longitude, placeName) {
		buttons.uber.context.subject_location.latitude = latitude;
		buttons.uber.context.subject_location.longitude = longitude;
        buttons.uber.label_text = placeName;
		//textInput.val(buttons.uber.captionFn(placeName));
	}

	// 
})();





