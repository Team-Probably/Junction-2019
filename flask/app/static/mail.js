
$(document).on('click', '.star', function (e) {
    // console.log(this);
    if ($(this).children().html() == 'star') {
        $(this).children().html('star_border');
    } else {
        $(this).children().html('star');
    }
    update_mail($(this).parent().parent());
});

$(document).on('click', '.mail-header', function (e) {
    // console.log(this)
    $(this).next().toggleClass('hide');
    $(this).addClass('read').removeClass('unread');
    update_mail($(this).parent());
});

function update_mail(mail) {
    conns = parseInt($('.server-info').find('.active-conns').text());
    r = parseInt((Math.random() - 0.5) * 100);
    // console.log(conns, r);
    $('.server-info').find('.active-conns').text(Math.max(conns + r, 10));

    data = {
        id: mail.attr('id'),
        starred: $(mail).find('.star').text(),
        read_status: 'read',
        attack: $(mail).find('.mail-attack').text(),
        fazer: parseInt($('.skill2').find('.progress-bar').text()),
        skills: parseInt($('.skill1').find('.progress-bar').text()),
    }
    $.post('/update_mail', data, function(res){
        mail_html = document.createElement('div');
        mail_html.setAttribute('class', "mail");
        mail_html.setAttribute('id', res.id);
        mail_html.innerHTML = `
        <div class="mail-header  ${res.read_status}">
          <div class="mail-attack hide">${res.attack}</div>
          <div class="star"><i class="material-icons">
              star_border
            </i>
          </div>
          <div class="sender">${res.sender}</div>
          <div class="mail-subject">${res.subject}</div>
          <div class="mail-time">${res.time}</div>
        </div>
        <div class="mail-content hide">
          <div class="mail-info">From ${res.sender} &lt;${res.email}&gt; to you at ${res.time}</div>
          <div class="mail-body">
            ${res.content}
          </div>
          <div class="action-buttons">
            <i class="material-icons action1" onclick="hint(${res.id})"
            data-toggle="tooltip" title="Investigate">
              account_tree
            </i>
            <i class="material-icons action2" onclick="cancel(${res.id})"
            data-toggle="tooltip" title="Ignore Mail">
              cancel
            </i>
            <i class="material-icons action3" onclick="defend(${res.id})"
            data-toggle="tooltip" title="Take Suggested Actions">
              adb
            </i>
          </div>
        </div>
      </div>`;
        console.log(res);
        mails_div = document.getElementsByClassName('mails')[0];
        if (res != 'false') {
            mails_div.appendChild(mail_html);
            showToast('New Mail Arrived!!');
        }
    });
}


function showToast(text)
{

        // Get the snackbar DIV
        var x = document.getElementById("snackbar");

        x.innerHTML = text;

        // Add the "show" class to DIV
        x.className = "show";
        console.log(text);
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

}

function increaseScore() {
    skills = parseInt($('.skill1').find('.progress-bar').text());
    fazer = parseInt($('.skill2').find('.progress-bar').text());
    skills += 5;
    fazer += 10;
    if (skills >= 100) {
        skills = 100
        showToast("Yayayay! You have completed the level");
    }

    $('.skill1').find('.progress-bar').text(skills);
    $('.skill1').find('.progress-bar').css('width', skills + '%')
    $('.skill2').find('.progress-bar').text(fazer);
    $('.skill2').find('.progress-bar').css('width', fazer + '%')
}

function decreaseScore() {
    skills = parseInt($('.skill1').find('.progress-bar').text());
    fazer = parseInt($('.skill2').find('.progress-bar').text());
    skills -= 5;
    fazer -= 10;
    if (skills <= 0) {
        skills = 0
        showToast("The game will be restarted");
    }
    $('.skill1').find('.progress-bar').text(skills);
    $('.skill1').find('.progress-bar').css('width', skills + '%')
    $('.skill2').find('.progress-bar').text(fazer);
    $('.skill2').find('.progress-bar').css('width', fazer + '%')
}

function cancel(mail_id) {
    type = document.getElementById(mail_id).children[0].children[0].innerHTML;
    console.log(type)
    if (type=='False' || type=='false') {
        showToast('Oh ho! That was a legit mail, the client is not happy.');
        decreaseScore();
    } else if (type=='True' || type=='true'){
        showToast('Great! you just avoided a malicious attack!');
        increaseScore();
    } else {
        showToast('Action for this mail has been already taken');
        return
    }
    $(`#${mail_id}`).find('.mail-attack').text('done');
    update_mail($(`#${mail_id}`));
}

function defend(mail_id) {
    type = document.getElementById(mail_id).children[0].children[0].innerHTML;
    if (type == 'True' || type =='true') {
        showToast('Sad! you just falled for a malicious mail');
        decreaseScore();
    } else if (type == 'False' || type =='false'){
        showToast('Cool! You took action on user request');
        increaseScore();
    } else {
        showToast('Action for this mail has been already taken');
        return
    }
    $(`#${mail_id}`).find('.mail-attack').text('done');
    update_mail($(`#${mail_id}`));


}

function hint(mail_id) {
    type = document.getElementById(mail_id).children[0].children[0].innerHTML;
    showToast('More Information regarding such attacks can be found at: ');
    decreaseScore();
    update_mail($(`#${mail_id}`));
}



(function(b){b.toast=function(a,h,g,l,k){b("#toast-container").length||(b("body").prepend('<div id="toast-container" aria-live="polite" aria-atomic="true"></div>'),b("#toast-container").append('<div id="toast-wrapper"></div>'));var c="",d="",e="text-muted",f="",m="object"===typeof a?a.title||"":a||"Notice!";h="object"===typeof a?a.subtitle||"":h||"";g="object"===typeof a?a.content||"":g||"";k="object"===typeof a?a.delay||3E3:k||3E3;switch("object"===typeof a?a.type||"":l||"info"){case "info":c="bg-info";
f=e=d="text-white";break;case "success":c="bg-success";f=e=d="text-white";break;case "warning":case "warn":c="bg-warning";f=e=d="text-white";break;case "error":case "danger":c="bg-danger",f=e=d="text-white"}a='<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="'+k+'">'+('<div class="toast-header '+c+" "+d+'">')+('<strong class="mr-auto">'+m+"</strong>");a+='<small class="'+e+'">'+h+"</small>";a+='<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">';
a+='<span aria-hidden="true" class="'+f+'">&times;</span>';a+="</button>";a+="</div>";""!==g&&(a+='<div class="toast-body">',a+=g,a+="</div>");a+="</div>";b("#toast-wrapper").append(a);b("#toast-wrapper .toast:last").toast("show")}})(jQuery);


const TYPES = ['info', 'warning', 'success', 'error'],
      TITLES = {
        'info': 'Notice!',
        'success': 'Awesome!',
        'warning': 'Watch Out!',
        'error': 'Doh!'
      },
      CONTENT = {
        'info': 'Hello, world! This is a toast message.',
        'success': 'The action has been completed.',
        'warning': 'It\'s all about to go wrong',
        'error': 'It all went wrong.'
      };

function show_random_snack()
{
  let type = TYPES[Math.floor(Math.random() * TYPES.length)],
      content = CONTENT[type].replace('toast', 'snack');

  $.toast({
    title: content,
    type: type,
    delay: 5000
  });
}