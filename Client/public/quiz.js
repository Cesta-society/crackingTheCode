$(document).on('click','.accept', function(e){
    $(".modal-fade").modal("hide");
});

$(document).on("keydown", function (e) {
    if (e.key == "F5" || e.key == "F11") {
               e.preventDefault();
    }
});

document.addEventListener('contextmenu', event => event.preventDefault());

/*
function disableselect(e) {
    return false;
}

function reEnable() {
    return true;
}

document.onselectstart = new Function("return false");

if (window.sidebar) {
    document.onmousedown = disableselect;
    document.onclick = reEnable;
}

*/