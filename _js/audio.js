var canvas;
var width;
var height;
var canvasContext;
var audioContext;
var analyser;
var bufferLength;
var dataArray;

var context = AudioContext || webkitAudioContext;
audioContext = new context();

var player = document.querySelector("#player");
var gainSlider = document.querySelector("#vol");
var pannerSlider = document.querySelector("#balance");

var media = audioContext.createMediaElementSource(player);

var gainNode = audioContext.createGain();
gainSlider.oninput = function () {
  gainNode.gain.setValueAtTime(gainSlider.value, audioContext.currentTime);
}

var pannerNode = audioContext.createStereoPanner();
pannerSlider.oninput = function () {
  pannerNode.pan.setValueAtTime(pannerSlider.value, audioContext.currentTime);
}

canvas = document.querySelector("#myCanvas");
canvasContext = canvas.getContext("2d");

width = canvas.width;
height = canvas.height;

analyser = audioContext.createAnalyser();
analyser.fftSize = 1024;
bufferLength = analyser.frequencyBinCount;
dataArray = new Uint8Array(bufferLength);
media.connect(gainNode);
gainNode.connect(pannerNode);
pannerNode.connect(analyser);
analyser.connect(audioContext.destination);

requestAnimationFrame(visualize);

function visualize() {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, width, height);

    analyser.getByteTimeDomainData(dataArray);

    canvasContext.lineWidth = 1;
    canvasContext.strokeStyle = "lightBlue";

    canvasContext.beginPath();

    var sliceWidth = width / bufferLength;
    var x = 0;
    for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 255;
        var y = v * height;
        if (i === 0) {
            canvasContext.moveTo(x, y);
        }
        else {
            canvasContext.lineTo(x, y);
        }
        x += sliceWidth;
    }
    canvasContext.stroke();
    requestAnimationFrame(visualize);
}