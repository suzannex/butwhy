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
			context : {
                subject_location: {
                    latitude: GEORGE_LAT,
                    longitude: GEORGE_LNG
                }
            },
            label_text: '',
			captionFn : function(alc) {return "Get CRUNK.... order " + alc + " on Drizly!";}
		},
		jet : {
			id : 'jet-button',
            btn_id : 'btn-1022822d571cf465',
			context : {
                item: {
                    identifiers: {
                        jet: ''
                    }
                }
            },
            label_text: '',
			captionFn : function(txt) {return "Use Jet to get " + txt + "!";}
		},
		delivery : {
			id : 'deliverycom-button',
            btn_id : 'btn-4029504a709ce5df',
			context : {
                subject_location: {
                    city: "Boston",
                    identifiers: {
                        deliverydotcom: 0
                    }
                },
                user_location: {
                    latitude: GEORGE_LAT,
                    longitude: GEORGE_LNG
                }
            },
            label_text: '',
			captionFn : function(item) {return "Get " + item + " delivered with Delivery!";}
		},
		itunes : {
			id : 'itunes-button',
            btn_id : 'btn-5de6d93abecc3fc3',
			context : {
                artist: {
                    identifiers: {
                        itunes: ''
                    }
                }
            },
            label_text: '',
			captionFn : function(music) {return "Check out " + music + " on iTunes!!";}
		},
        ticketmaster : {
            id : 'ticketmaster-button',
            btn_id : 'btn-4e3bbaaa65fb4072',
            context : {
                subject_location: {
                    identifiers: {
                        ticketmaster: ''
                    }
                }
            },
            label_text: '',
            captionFn : function(music) {return "Buy tickets for " + music + "!!";}
        }
	}

	$(document).ready(function() {
        documentIsReady = true;
        initializeMapIfReady();

        for (var key in buttons) {
            var currentButton = buttons[key];
            $('#' + currentButton.id).attr('data-bttnio-context', JSON.stringify(currentButton.context));
            bttnio('refresh');
        }

		textInput = $('#inspiration-input');
		//console.log('doc ready');
	    $('#inspiration-form').on('submit', function(e) {
	    	// prevent page reload
	        e.preventDefault();

	        var inputText = textInput.val();
            if (!inputText) return;
	        //console.log(inputText);
	        updateButtons(inputText);

	        // clear the text field
	        textInput.val("");
	    })
	});

	function updateButtons(searchText) {
	    googleMapsSearch(searchText); // handle map stuff
        itunesSearch(searchText);

        jetSearch(searchText);

	    // other actions to come
        
        buttons.delivery.context.subject_location.identifiers.deliverydotcom = Math.floor(Math.random() * 100000);
        $('#deliverycom-button').attr('data-bttnio-context', JSON.stringify(buttons.delivery.context));

        buttons.ticketmaster.context.subject_location.identifiers.ticketmaster = Math.floor(Math.random() * 10000);
        $('#ticketmaster-button').attr('data-bttnio-context', JSON.stringify(buttons.ticketmaster.context));

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
	  		updateMapContexts(mapSearchResult.geometry.location.lat(), 
	  						 mapSearchResult.geometry.location.lng(),
	  						 mapSearchResult.name);
	  	}
	  	var toLog = results.length >= 0 ? results[0] : results.length;
	    console.log(toLog);

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
                        }
                    }
                })
            } else {
                console.log("Failed to refresh");
            }
        }); 

	  }
	}

	function updateMapContexts(latitude, longitude, placeName) {
        //Uber
		buttons.uber.context.subject_location.latitude = latitude;
		buttons.uber.context.subject_location.longitude = longitude;
        buttons.uber.label_text = placeName;
        $('#uber-button').attr('data-bttnio-context', JSON.stringify(buttons.uber.context));

        //Delivery.com
        buttons.delivery.context.user_location.latitude = latitude;
        buttons.delivery.context.user_location.longitude = longitude;
        buttons.delivery.context.user_location.name = placeName;
        buttons.delivery.label_text = placeName;
        $('#deliverycom-button').attr('data-bttnio-context', JSON.stringify(buttons.delivery.context));

        //Drizly
        buttons.drizly.context.subject_location.latitude = latitude;
        buttons.drizly.context.subject_location.longitude = longitude;
        buttons.uber.label_text = placeName;
        $('#drizly-button').attr('data-bttnio-context', JSON.stringify(buttons.drizly.context));
	}

    // --------------------iTunes : get artist ID ----------------------------

    function itunesSearch(searchText) {
        addScript('https://itunes.apple.com/search?term=' 
            + searchText 
            + '&media=music&entity=musicArtist&limit=1&callback=updateItunesButton', 
            updateItunesButton);
    }

    window.updateItunesButton = function(result) {
        var artistName, artistId;
        artistName = result.results[0].artistName;
        artistId = result.results[0].artistId;
        console.log(artistName);

        buttons.itunes.context.artist.identifiers.itunes = artistId;
        buttons.itunes.label_text = artistName;
        $('#itunes-button').attr('data-bttnio-context', JSON.stringify(buttons.itunes.context));
        bttnio('refresh', function(success, actions) {
            if (success) {
                $('#itunes-button .bttnio-cell span').text(buttons.itunes.captionFn(buttons.itunes.label_text));
            }
        })
    }

    function addScript(src, callback) {
        var s = document.createElement( 'script' );
        s.setAttribute( 'src', src );
        document.body.appendChild( s );
    }

    function jetSearch(searchText) {
        $.get('/searchJet/', searchText, function(productId, status) {
            console.log(status)
            if (status === 'ok') {
                console.log(productId)
                buttons.jet.context.item.identifiers.jet = productId;
                buttons.jet.label_text = productId;
                $('#jet-button').attr('data-bttnio-context', JSON.stringify(buttons.jet.context));
                bttnio('refresh', function(success, actions) {
                    if (success) {
                        $('#jet-button .bttnio-cell span').text(buttons.jet.captionFn(buttons.jet.label_text));
                    }
                });
            }
        })


        /*$.ajax({
            type: 'GET',
            url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22https%3A%2F%2Fjet.com%2Fsearch%3Fterm%3Dcoffee%22&format=json",
            //url: "https://jet.com/search?term=" + searchText,
            dataType: 'text',
            success: function(data) {
                console.log(data)
                var elements = $(data).find('.list-products li');
                var firstProduct = elements.first().find('.product-tiles');
                var productId = firstProduct.attr('data-sku');
                console.log("id: " + productId)

                buttons.jet.context.item.identifiers.jet = productId;
                buttons.jet.label_text = productId;
                $('#jet-button').attr('data-bttnio-context', JSON.stringify(buttons.jet.context));
                bttnio('refresh', function(success, actions) {
                    if (success) {
                        $('#jet-button .bttnio-cell span').text(buttons.jet.captionFn(buttons.jet.label_text));
                    }
                });
            }
        });*/
    }
})();





