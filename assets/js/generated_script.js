var timer = 0;
    var timerID;
    var length = localStorage.getItem("selectedTimeInSeconds") || 120; //one second timer, so 60 is 60 seconds
    startTimer(length);

    //affirmation display
    var themes = ["desert", "ocean", "forest", "mountain", "sky"];
    var affirmations = {
        "love": ["I am worthy of love."],
        "abundance": ["Money comes to me easily."],
        "success": [
            "I am the best.",
            "Everyday in every way I’m getting better and better.",
            "I am a success magnet."],
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

    $("#affirmation").append(getAffirmation());

    var imgAPIKey = "2zqKv7MR9dtqHfMPElu8Aw9R1CLfsfDYFTgvLB9itQQ";
    var soundClientID = "wtFklhDugFYXRwpVpPlW";
    var soundAPISecretKey = "VuSbiwN9SeJuIb5CJoCyDwHodnh6JUKojf3Vk6kD";
    var soundURL = "https://freesound.org/apiv2/search/text/?query=piano&token=YOUR_API_KEY";


    var count = 0;
    $("#pauseBtn").click(function () {
        if (count % 2 == 0) {
            stopTimer();
            count++;
        } else {
            startTimer(timer);
            count++;
        }
    });

    function startTimer(duration) {
        if (duration <= 0) {
            timer = 0;
            stopTimer();
        } else {
            timer = duration;
            timerID = setInterval(timerCountdown, 1000);
            timerDisplay();
        }
    }

    function stopTimer() {
        if (timerID) {
            clearInterval(timerID);
            timerID = null;
        }
        timerDisplay();
    }

    //counts down timer
    function timerCountdown() {
        if (timer > 0) {
            timer--;
        } else {
            stopTimer();
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

    function getAffirmation() {
        var subject = localStorage.getItem('selectedAffirmation');
        if (subject == undefined || affirmations[subject.toLowerCase().trim()] == undefined) {
            subject = "Abundance";
        }
        var subjectSelections = affirmations[subject.toLowerCase().trim()];
        return subjectSelections[Math.floor(Math.random() * subjectSelections.length)];
    }

    function getAudio() {
        var theme = getTheme();
        var themeToken = "ocean";
        queryURL = "https://freesound.org/apiv2/search/text/?format=json&query=ocean&token=VuSbiwN9SeJuIb5CJoCyDwHodnh6JUKojf3Vk6kD"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var searchToken = response.results[0].id;
            console.log(searchToken);
            queryURL = "https://freesound.org/apiv2/sounds/" + searchToken + "/?format=json&token=VuSbiwN9SeJuIb5CJoCyDwHodnh6JUKojf3Vk6kD";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                audioSource = response.previews["preview-lq-mp3"];
                console.log(audioSource);
                var audio = new Audio(audioSource);
                var playPromise = audio.play();
                playPromise.then(res=>{
                    console.log("AUDIO SHOULD PLAY", res);
                });
            });
        })
    }
    getAudio();


    function playAudio() {
        var x = document.getElementById("audio");
        x.play();
    }
    $(document).click(playAudio());

    function getImage() {
        var theme = getTheme();
        var searchToken = "ocean";
        queryURL = "https://api.unsplash.com/photos/random?query=";
        queryURL = queryURL + searchToken + "&client_id=2zqKv7MR9dtqHfMPElu8Aw9R1CLfsfDYFTgvLB9itQQ&count=1";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var url = response[0].urls.regular;
            console.log(url)
            $(document.body).css("background-image", "url(" + url + ")");
            $(document.body).css({"height":"400px","background-position": "center","background-repeat":"no-repeat","background-size": "cover"});
        });
    }

    getImage();

    function getTheme() {
        var theme = localStorage.getItem('selectedTheme');
        if (theme == undefined || themes.indexOf(theme) == -1) {
            theme = "Ocean";
        }
    }