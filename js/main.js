$(function(){
    $(".nav-panel:has(.active)").addClass("")

    //menu
    $("#nav-toggle").on("click", function(event) {
        event.preventDefault();
        console.log('here');
        $("#nav-panel").toggleClass("active");
    });
});