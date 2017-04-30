$(document).ready(function() {
    $('#inspiration-form').on('submit', function(e) {
        e.preventDefault();
        var inputText = $('#inspiration-input').val();
        console.log(inputText);
    })
});