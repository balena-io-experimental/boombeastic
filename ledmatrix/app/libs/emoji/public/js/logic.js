jQuery('document').ready(function($) {
    var cw = $('.emojiGrid td').width();
    $('.emojiGrid td').css({
        'height': cw + 'px'
    });
    $("td").bind("click", function() {
      var indRw = $(this).attr('data-index');
      var indPd = parseInt(indRw);
      console.log(indPd);
      image[indPd] = 1
    });
    $("#send_image").bind("click", function() {
        var imageString = image.join();
        $.ajax({
            type: "POST",
            url: "/v1/draw/" + imageString,
            crossDomain: true,
            success: function(responseData, status, xhr) {

            },
            error: function(request, status, error) {
                console.log(request.responseText);
            }
        });
        console.log(image);
    });
    $("#reset_image").bind("click", function() {
        $.ajax({
            type: "PUT",
            url: "/v1/draw",
            crossDomain: true,
            success: function(responseData, status, xhr) {

            },
            error: function(request, status, error) {
                console.log(request.responseText);
            }
        });
    });
    $("#clear_image").bind("click", function() {
        $.ajax({
            type: "DELETE",
            url: "/v1/draw/",
            crossDomain: true,
            success: function(responseData, status, xhr) {
                image = [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0
                ];
                $('td').removeClass('clicked');
            },
            error: function(request, status, error) {
                console.log(request.responseText);
            }
        });

    });
});
