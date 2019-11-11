
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

var gainExample = document.querySelector("#player");
var gainSlider = document.querySelector("#vol");
var pannerSlider = document.querySelector("#balance");

var media = audioContext.createMediaElementSource(gainExample);

canvas = document.querySelector("#myCanvasTime");
canvasContext = canvas.getContext("2d");
canvas2 = document.querySelector("#myCanvasFreq");
canvasContext2 = canvas2.getContext("2d");

width = canvas.width;
height = canvas.height;

analyser = audioContext.createAnalyser();
analyser2 = audioContext.createAnalyser();
analyser.fftSize = 1024;
analyser2.fftSize = 64;
bufferLength = analyser.frequencyBinCount;
bufferLength2 = analyser2.frequencyBinCount;
dataArray = new Uint8Array(bufferLength);
dataArray2 = new Uint8Array(bufferLength2);
requestAnimationFrame(visualize);
requestAnimationFrame(visualize2);

var gainNode = audioContext.createGain();
var pannerNode = audioContext.createStereoPanner();

media.connect(gainNode);
media.connect(pannerNode);
media.connect(analyser);
media.connect(analyser2);
gainNode.connect(audioContext.destination);
pannerNode.connect(audioContext.destination);
analyser.connect(audioContext.destination);
analyser2.connect(audioContext.destination);

gainSlider.oninput = function (evt) {
  gainNode.gain.value = evt.target.value;
}

pannerSlider.oninput = function (evt) {
  pannerNode.pan.value = evt.target.value;
}

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
  requestAnimationFrame(visualize)
}

function visualize2() {
  canvasContext2.fillStyle = "black";
  var width2 = canvas2.width;
  var height2 = canvas2.height;
  canvasContext2.fillRect(0, 0, width2, height2);

  analyser2.getByteFrequencyData(dataArray2);
  var x = 0;
  var barWidth = width2 / bufferLength2;

  for (var i = 0; i < bufferLength2; i++) {
    var v = dataArray2[i] / 255;
    var y = v * (height2 / 1.2);
    canvasContext2.fillStyle = 'rgb(' + (y + 100) + ',50,50)';
    canvasContext2.fillRect(x, height2 - y, barWidth, y);
    x += barWidth + 1;
  }
  requestAnimationFrame(visualize2);

}
