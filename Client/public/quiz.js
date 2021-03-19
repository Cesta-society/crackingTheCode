$(document).on('click','.accept', function(e){
    $(".modal-fade").modal("hide");
});

$(document).on("keydown", function (e) {
    if (e.key == "F5" || e.key == "F11") {
               e.preventDefault();
    }
});

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

document.oncontextmenu=RightMouseDown;
document.onmousedown = mouseDown; 

function mouseDown(e) {
    if (e.which==3) {
        alert("Right Click is disabled for this competition");
    }
}
function RightMouseDown() { return false;}