var camera = document.getElementById("camera");
function take_snapshot() {
    speak();
}

function speak(){
    var synth = window.speechSynthesis;

    var speak_data = "Taking you Selfie in 10 seconds. ten. nine. eight. seven. six. five. four. three. two. one";

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    Webcam.attach(camera);

    setTimeout(function()
    { 
        take_selfie(); 
        save();
    }, 15000);
}


Webcam.set({
    width : 350,
    height : 350,
    img_format : "png",
    png_quality : 100 
});

function take_selfie() {
    Webcam.snap(function(data) {
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data+'"/>';
    });
}

function save() {
    var link = document.getElementById("link");
    var image = document.getElementById("selfie_image").src ;
    link.href = image;
    link.click();
}

console.log("ml5 version : " + ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/hQrnH7hsu/model.json" , modeLoaded);

function modeLoaded() {
    console.log("Model loaded!");
}

function check() {
    var img = document.getElementById("selfie_image");
    classifier.classify(img , gotResult);
}

function gotResult(error,results) {
    if(error) {
        console.error("Error🚷🚷🚷");
        console.log("Error🚷🚷🚷");
    }
    
    else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(2);
    }
}