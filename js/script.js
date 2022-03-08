// Collaps list
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

// Show and Hide Nav

function showNav() {
    document.querySelector(".navigation").style.display = "block";
    if (window.innerWidth < 769) {
        document.querySelector(".main").style.display = "none";
    }
}

function hideNav() {
    document.querySelector(".navigation").style.display = "none";
    if (window.innerWidth < 769) {
        document.querySelector(".main").style.display = "block";
    }
}