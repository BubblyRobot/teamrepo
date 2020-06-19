$("#start").click(function (){
    storeSettings();
    window.location.replace("../../generated.html");
});

function storeSettings(){
    localStorage.setItem("selectedTheme", $("#theme-selection").val());
    localStorage.setItem("selectedTimeInSeconds", parseInt($("#time-selection").val()) * 60);
    localStorage.setItem("selectedAffirmation", $("#affirmation-selection").val());
}

function loadLastSettingsOrDefault(){
    $("#theme-selection").val(localStorage.getItem("selectedTheme") || "Ocean");
    $("#time-selection").val(localStorage.getItem("selectedTimeInSeconds") || (5 * 60));
    $("#affirmation-selection").val(localStorage.getItem("selectedAffirmation") || "Health");
}

loadLastSettingsOrDefault();