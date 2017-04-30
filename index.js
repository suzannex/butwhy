var path = require('path')
var express = require('express')
var app = express()
var port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('/assets/', express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
  //res.sendFile(path.join(__dirname, 'views', 'index.html'));
  res.render('index');

})
app.listen(port, function() {
  console.log('Listening on port: ' + port)
})

/*app.get('/searchJet', function(req, res) {
    var needle = require('needle');
    console.log("req")
    console.log(req)
    var queryTerm = req.query;
    var productId = null;
    needle.get('https://www.google.com/search?q=site%3Ajet.com+'+queryTerm, function(err, resp, body) {
        console.log(resp)
        productId = 500;
    });
    res.send(productId);*/

    /*var phantom = require('phantom');
    console.log('Hello')
    phantom.create(function(ph) {
        console.log('create phantom')
      return ph.createPage(function(page) {
        console.log("createPage")
        return page.open("https://jet.com/search?term=coffee", function(status) {
          console.log("opened site? ", status);         
     
                page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
                    //jQuery Loaded.
                    //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
                    setTimeout(function() {
                        return page.evaluate(function() {
                            console.log($(this))
                            var elements = $('.list-products li');
                            var firstProduct = elements.first().find('.product-tiles');
                            var productId = firstProduct.attr('data-sku');
                            return productId;
     
                            //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
                        }, function(result) {
                            console.log(result);
                            ph.exit();
                        });
                    }, 5000);
     
                });
        });
        });
    });*/


    /*console.log("please ")
    var scraperjs = require('scraperjs');
    scraperjs.DynamicScraper.create('https://news.ycombinator.com/')
        .scrape(function($) {
            console.log("Scraping")
            return $(".title a").map(function() {
                console.log("in map")
                return $(this).text();
            }).get();
        })
        .then(function(news) {
            console.log(news);
        })*/
    /*var scraperjs = require('scraperjs');
        scraperjs.DynamicScraper.create('https://jet.com/search?term=coffee')
            .scrape(function($) {
                var elements = $(data).find('.list-products li');
                var firstProduct = elements.first().find('.product-tiles');
                var productId = firstProduct.attr('data-sku');
                return productId;
            })
            .then(function(product) {
                console.log("id: " + product);

                buttons.jet.context.item.identifiers.jet = productId;
                buttons.jet.label_text = productId;
                $('#jet-button').attr('data-bttnio-context', JSON.stringify(buttons.jet.context));
                bttnio('refresh', function(success, actions) {
                    if (success) {
                        $('#jet-button .bttnio-cell span').text(buttons.jet.captionFn(buttons.jet.label_text));
                    }
                });
            })*/
//})