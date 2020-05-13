$(document).on('click','.accept', function(e){
    $(".modal-fade").modal("hide");
});

$(document).on("keydown", function (e) {
    if (e.key == "F5" || e.key == "F11") {
               e.preventDefault();
    }
});

document.addEventListener('contextmenu', event => event.preventDefault());