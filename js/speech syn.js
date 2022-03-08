var synth = window.speechSynthesis;
var voices = [];
voices = synth.getVoices();

var all_elements = null;
var current_index = 0;
var current_state = "PAUSED"; // READING, READINGBACKWARD, READINGFORWARD, 
var readables = ["H1", "H2", "H3", "P", "A", "TH", "TD"];
var readable_elements = [];

// DOM content loaded
$(document).ready(function() {
    all_elements = $("*");
    for (i in all_elements) {
        var tag = all_elements[i].tagName;
        for (j in readables) {
            if (readables[j] == tag) {
                readable_elements.push(all_elements[i]);
                all_elements[i].addEventListener("dblclick", getElem);
                all_elements[i].setAttribute('id', current_index);
                current_index++;
            }
        }
    }
    current_index = 0;
});

// Read from begaining
function readFromBegining() {
    var current_element = readable_elements[current_index];
    readText(current_element);
}

// Play pause
function playPause() {
    if (current_state == "READING") {
        current_state = "PAUSED";
        $(".border").removeClass("border");
        $(".fa-circle-pause").addClass("fa-circle-play");
        $(".fa-circle-pause").removeClass("fa-circle-pause");
        synth.cancel();
    } else {
        current_state = "READING";
        $(".fa-circle-play").addClass("fa-circle-pause");
        $(".fa-circle-play").removeClass("fa-circle-play");
        readFromBegining();
    }
}

// Play Next
function playNext() {
    synth.cancel();
    current_index += 1;
    current_element = readable_elements[current_index];
    current_state = "READING";
    $(".fa-circle-play").addClass("fa-circle-pause");
    $(".fa-circle-play").removeClass("fa-circle-play");
    readText(current_element);

}

//Play previous
function playPrev() {
    synth.cancel();
    current_index -= 1;
    current_element = readable_elements[current_index];
    current_state = "READING";
    $(".fa-circle-play").addClass("fa-circle-pause");
    $(".fa-circle-play").removeClass("fa-circle-play");
    readText(current_element);

}

// on Double click function
function getElem() {
    synth.cancel();
    current_index = this.id;
    current_element = readable_elements[current_index];
    current_state = "READING";
    $(".fa-circle-play").addClass("fa-circle-pause");
    $(".fa-circle-play").removeClass("fa-circle-play");
    readText(current_element);
}

// Find next read able element
function getNext() {
    current_index++;
    if (current_index < readable_elements.length) {
        var current_element = readable_elements[current_index];
        readText(current_element);
    } else {
        synth.cancel();
        current_index = 0;
        $(".fa-circle-pause").addClass("fa-circle-play");
        $(".fa-circle-pause").removeClass("fa-circle-pause");

    }
}

// Read Text function
function readText(elem) {
    var u = new SpeechSynthesisUtterance($(elem).text());
    u.voice = voices[5];
    u.pitch = 1;
    u.rate = 1;

    u.onend = function(event) {
        if (current_state == "READING") {
            $(".border").removeClass("border");
            getNext();
        }
    }
    $(".border").removeClass("border");
    $(elem).addClass("border");
    synth.speak(u);
}