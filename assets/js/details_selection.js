$("#start").click(function (){
    storeSettings();
});

function storeSettings(){
    localStorage.setItem("selectedTheme", $("#theme-selection").val());
    localStorage.setItem("selectedTimeInSeconds", parseInt($("#time-selection").val()) * 60);
    localStorage.setItem("selectedAffirmation", $("#affirmation-selection").val());
}