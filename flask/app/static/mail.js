$(document).ready(function () {
    $('.star').click(function () {
        // console.log(this);
        if ($(this).children().html() == 'star') {
            $(this).children().html('star_border');
        } else {
            $(this).children().html('star');
        }
        update_mail($(this).parent().parent().attr("id"));
    });

    $('.mail-header').click(function () {
        // console.log(this)
        $(this).next().toggleClass('hide');
        $(this).addClass('read').removeClass('unread');
        update_mail($(this).parent());
    });
});

function update_mail(mail) {
    console.log(mail.attr('id'));
    $.post('/update_mail', {
        id: mail.attr('id'),
        starred: $(mail).find('.star').text(),
        read_status: 'read',
    }, function(){console.log("request successful")});
}

function showToast(text)
{

        // Get the snackbar DIV
        var x = document.getElementById("snackbar");

        x.innerHTML = text;

        // Add the "show" class to DIV
        x.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

}