(function () {
    $(document).foundation();
})();

var timer = 0;
var timerID;

var imgAPIKey = "2zqKv7MR9dtqHfMPElu8Aw9R1CLfsfDYFTgvLB9itQQ";
var soundClientID = "wtFklhDugFYXRwpVpPlW";
var soundAPISecretKey = "VuSbiwN9SeJuIb5CJoCyDwHodnh6JUKojf3Vk6kD";
var soundURL = "https://freesound.org/apiv2/search/text/?query=piano&token=YOUR_API_KEY";
var audio;

var themes = ["desert", "ocean", "forest", "mountain", "sky"];
var affirmations = {
    "love": [
        "I am full of unconditional love.",
        "I am surrounded by people who love me unconditionally.",
        "I connect with others easily.",
        "I open my heart to love and know that I deserve it.",
        "Love surrounds me and everyone around me."],
    "abundance": [
        "Money comes to me easily.",
        "I naturally attract good fortune.",
        "I am open and receptive to all the wealth life offers me.",
        "Wealth constantly flows into my life.",
        "I am worthy of making more money."],
    "success": [
        "I am the best.",
        "Everyday in every way I’m getting better and better.",
        "I am a success magnet.",
        "I have the knowledge to make smart decisions for myself.",
        "I let go of any negative feelings about myself or my life, and accept all that is good."],
    "health": [
        "I am healthy, happy and radiant.",
        "I appreciate and love my body.",
        "I love feeling fit and strong.",
        "I radiate good health.",
        "I am calm and at peace.",
        "I am focused and motivated.",
        "My sleep is relaxed and refreshing."],
    "happiness": [
        "I am willing to be happy now.",
        "I accept that happiness is my true nature.",
        "I am worthy of feeling happy.",
        "My happiness comes from within me.",
        "I create my happiness by accepting every part of myself with unconditional love."
    ],
}

$("#generatedContent").hide();

function transitionPages() {
    if ($("#generatedContent").is(":visible")){
        $("#minutes, #noAudio, #startMenu, #themeAndAffirmationSelect").show();
        $("#generatedContent").hide();
        $(document.body).css("background-image", "url(#)");
        audio.pause();
    } else {
        $("#minutes, #noAudio, #startMenu, #themeAndAffirmationSelect").hide();
        $("#generatedContent").show();
    }
}

$("#getStarted").click(function () {
    themeToken = $("#themeSelect").val();
    affirmationToken = $("#affirmationSelect").val();
    transitionPages();
    $("#affirmation").text("");
    $("#affirmation").append(getAffirmation(affirmationToken));
    $("#pauseBtn").addClass("fas fa-pause");
    getImage(themeToken);
    if (!($("#audioCheck").is(":checked"))){
        getAudio(themeToken);
    }
    var userLength = $("#userLength").val();
    timer = 120;
    if (!(isNaN(parseInt(userLength)) || parseInt(userLength) <= 0)) {
        //this should probably throw an error instead of defaulting to 2min
        timer = (parseInt(userLength) * 60);
    }
    startTimer();
});

var count = 0;
$("#pauseBtn").click(function (event) {
    event.stopPropagation();
    if (count % 2 == 0) {
        stopTimer();
        count++;
        $("#pauseBtn").removeClass("fas fa-pause").addClass("fas fa-play");
    } else {
        startTimer();
        count++;
        $("#pauseBtn").removeClass("fas fa-play").addClass("fas fa-pause");
    }
});

$("#stopBtn").click(function (event) {
    event.stopPropagation();
    stopTimer();
    transitionPages();
});

function startTimer() {
    if (timer > 0) {
        timerID = setInterval(timerCountdown, 1000);
        timerDisplay();
    }
}

function stopTimer() {
    if (timerID) {
        clearInterval(timerID);
        timerID = null;
    }
}

//counts down timer
function timerCountdown() {
    if (timer > 0) {
        timer--;
    } else {
        stopTimer();
        transitionPages();
    }
    timerDisplay();
}

//displays time
function timerDisplay() {
    var display = document.querySelector('#time');
    var minutes = parseInt(timer / 60, 10);
    var seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
}

function getAffirmation(subject) {
    var subjectSelections = affirmations[subject.toLowerCase().trim()];
    return subjectSelections[Math.floor(Math.random() * subjectSelections.length)];
}

function getAudio(themeToken) {
    //some of the sounds by default are not at all relaxing, so change the search token if that's the case
    if (themeToken == "desert" || themeToken == "mountain" || themeToken == "sky") {
        themeToken = "sahara";
        //themeToken = "CAM120118T017";
    }
    queryURL = "https://freesound.org/apiv2/search/text/?format=json&query=" + themeToken + "&token=VuSbiwN9SeJuIb5CJoCyDwHodnh6JUKojf3Vk6kD"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var searchToken = response.results[0].id;
        queryURL = "https://freesound.org/apiv2/sounds/" + searchToken + "/?format=json&token=VuSbiwN9SeJuIb5CJoCyDwHodnh6JUKojf3Vk6kD";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            audio = document.createElement("AUDIO");
            audio.setAttribute("src", response.previews["preview-lq-mp3"]);
            audio.play();
        });
    })
}

function getImage(searchToken) {
    queryURL = "https://api.unsplash.com/photos/random?query=";
    queryURL = queryURL + searchToken + "&orientation=portrait&client_id=2zqKv7MR9dtqHfMPElu8Aw9R1CLfsfDYFTgvLB9itQQ&count=1";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var url = response[0].urls.regular;
        $(document.body).css("background-image", "url(" + url + ")");
        $(document.body).css({ "height": "100vh", "background-position": "center", "background-repeat": "no-repeat", "background-size": "cover" });
    });
}
