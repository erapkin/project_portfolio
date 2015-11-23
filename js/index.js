// set global variable if pulsate should continue
// set button
var pulsate = true,
    button = jQuery("#customBtn");


// init function returns pulsing again and again
function initPulsing() {
    if (pulsate) {
        var pulseTime = 2500;

        // start pulsing for some seconds
        button.effect("pulsate", {times:5}, pulseTime);

        // restart pulsing if time is up
        setTimeout(function(){ 
            initPulsing(); 
        }, pulseTime);        
    }
}

// stops pulsing immediately
function stopPulsing() {
    button.stop(true).css('opacity', 1);
    pulsate = false;
}


$(document).ready(function(){
    console.log("initP")
    // start pulsing
    initPulsing();

    // stop pulsing on click
    button.click(function(){
        stopPulsing();
    });
});