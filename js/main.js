$(function(){
    //TODO: переписать на чистый js
    //menu
    $("#nav-toggle").on("click", function(event) {
        event.preventDefault();
        console.log('here');
        $("#nav-panel").toggleClass("active");
        $(".nav-toggle-item").toggleClass("active");
    });
});