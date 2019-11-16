$('#next').on('click', function () {
    $('.current')
        .toggleClass('current')
        .toggleClass('hide')
        .next()
        .toggleClass('current')
        .toggleClass('hide');

})

$('#prev').on('click', function () {
    $('.current')
        .toggleClass('current')
        .toggleClass('hide')
        .prev()
        .toggleClass('current')
        .toggleClass('hide');

})