$(document).ready(function () {
    $('.star').click(function () {
        // console.log(this);
        if ($(this).children().html() == 'star') {
            $(this).children().html('star_border');
        } else {
            $(this).children().html('star');
        }
        update_mail($(this).parent().parent());
    });

    $('.mail-header').click(function () {
        // console.log(this)
        $(this).next().toggleClass('hide');
        $(this).addClass('read').removeClass('unread');
        update_mail($(this).parent());
    });
});


function update_mail(mail) {
    // console.log(mail);
    // console.log(mail.attr('id'));
    // console.log(parseInt($('.skill1').find('.progress-bar').text()));
    $.post('/update_mail', {
        id: mail.attr('id'),
        starred: $(mail).find('.star').text(),
        read_status: 'read',
        attack: $(mail).find('.mail-attack').text(),
        fazer: parseInt($('.skill2').find('.progress-bar').text()),
        skills: parseInt($('.skill1').find('.progress-bar').text()),
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

function increaseScore() {
    skills = parseInt($('.skill1').find('.progress-bar').text());
    fazer = parseInt($('.skill2').find('.progress-bar').text());
    skills += 1;
    fazer += 10;
    $('.skill1').find('.progress-bar').text(skills);
    $('.skill1').find('.progress-bar').css('width', skills + '%')
    $('.skill2').find('.progress-bar').text(fazer);
    $('.skill2').find('.progress-bar').css('width', fazer + '%')
}

function decreaseScore() {
    skills = parseInt($('.skill1').find('.progress-bar').text());
    fazer = parseInt($('.skill2').find('.progress-bar').text());
    skills -= 1;
    fazer -= 10;
    $('.skill1').find('.progress-bar').text(skills);
    $('.skill1').find('.progress-bar').css('width', skills + '%')
    $('.skill2').find('.progress-bar').text(fazer);
    $('.skill2').find('.progress-bar').css('width', fazer + '%')
}

function cancel(mail_id) {
    type = document.getElementById(mail_id).children[0].children[0].innerHTML;
    if (type=='False') {
        increaseScore();
    } else if (type=='True'){
        decreaseScore();
    } else
        return
    $(`#${mail_id}`).find('.mail-attack').text('done');
    update_mail($(`#${mail_id}`));
}

function defend(mail_id) {
    type = document.getElementById(mail_id).children[0].children[0].innerHTML;
    if (type=='True') {
        increaseScore();
    } else if (type=='True'){
        decreaseScore();
    } else
        return
    $(`#${mail_id}`).find('.mail-attack').text('done');
    update_mail($(`#${mail_id}`));
}

function hint(mail_id) {
    type = document.getElementById(mail_id).children[0].children[0].innerHTML;
    if (type=='False') {
        increaseScore();
    } else if (type=='True'){
        decreaseScore();
    } else
        return
    $(`#${mail_id}`).find('.mail-attack').text('done');
    update_mail($(`#${mail_id}`));
}