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

app.get('/searchJet', function(req, res) {
    var scraperjs = require('scraperjs');
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
            })
})