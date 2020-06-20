$("#getStarted").click(function (){
    localStorage.setItem("selectedTimeInSeconds", parseInt($("#time-selection").val()) * 60);
    window.location.replace("../../generated.html");
});

$("#theme-selection").click(function(event){
    event.stopPropagation();
    localStorage.setItem("selectedTheme", event.target.getAttribute('theme'));
});

$("#affirmation-selection").click(function(event){
    event.stopPropagation();
    localStorage.setItem("selectedAffirmation", event.target.getAttribute('affirmation'));
});

function loadLastSettingsOrDefault(){
    $("#theme-selection").val(localStorage.getItem("selectedTheme") || "Ocean");
    $("#time-selection").val(localStorage.getItem("selectedTimeInSeconds") || (5 * 60));
    $("#affirmation-selection").val(localStorage.getItem("selectedAffirmation") || "Health");
}

loadLastSettingsOrDefault();