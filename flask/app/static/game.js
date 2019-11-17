$(".dropdown-menu li a").click(function () {

    $(".server" + $('.selection').text()).css("display", "none");
    $(this).parents(".btn-group").find('.selection').text($(this).text());
    $(this).parents(".btn-group").find('.selection').val($(this).text());
    $(".server" + $(this).text()).css("display", "block");
});

$(".server" + $('.selection').text()).css("display", "block");;

