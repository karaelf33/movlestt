// JQUERY
$(function() {


    $('.searchBtn').click(function() {
        $('.searchContainer').toggleClass('show');
        $('.meContainer, .meOverlay').removeClass('show');
        $('.searchOverlay').toggleClass('show');
    });
    $('.you').click(function() {
        $('.meContainer').toggleClass('show');
        $('.searchContainer, .searchOverlay').removeClass('show');
        $('.meOverlay').toggleClass('show');
    });
    $('.meOverlay, .searchOverlay').click(function(){
        $('.searchContainer, .meContainer').removeClass('show');
        $('.meOverlay, .searchOverlay').removeClass('show');
    });

    $('.newTweet, .closeNewTweet').click(function() {
        $('.newTweetContainer').toggleClass('show');
    });
    $('.newTweetDarken').click(function() {
        $('.newTweetContainer').removeClass('show');
    });

    $('.textarea textarea').focusin(function() {
        $(this).addClass('focus');
        $('.addTweet').addClass('change');
    });
    $('.closeTweet').click(function() {
        $('.textarea textarea').removeClass('focus');
        $('.addTweet').removeClass('change');
    });






    // NIGHT MODE
    $('.NightMode').click(function() {
        $('nav, body, .meContainer, .searchContainer, .timeline, .textarea, .loadMore, .module, .newTweetContainer').toggleClass('night');
    });





});