var bg = document.querySelectorAll(".card");
var image = '';
var index = 15;

function changeTheme() {
    image = "url(../background/image_" + index + ".jpg)";
    for (var i = 0; i < bg.length; i++) {
        bg[i].style.backgroundImage = image;

    }
    index++;
    if (index == 52) {
        index = 15;
    }
}