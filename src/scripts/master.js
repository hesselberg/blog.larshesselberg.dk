function onSubmit() {
    $('#mailchimp-signup').submit(function() {
        var action = $(this).attr('action');

        if ($('#email').val() !== "") {
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    email: $('#email').val()
                },
                complete: function(){
                    $('.form-inner').html("<p>High five, you rock! You'll now recieve a mail whenever there's a new post.</p>");
                }
            });
        }

        return false;
  });
}

// Doc ready
$(function(){
    onSubmit();
});

// Windows 7/8 IE fix
if (navigator.userAgent.match(/Windows NT 6.2; ARM(.+)Touch/)) {
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(
        document.createTextNode(
            "@-ms-viewport{width:device-width}"
        )
    );
    document.getElementsByTagName("head")[0].
        appendChild(msViewportStyle);
}