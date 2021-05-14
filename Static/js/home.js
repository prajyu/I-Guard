const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d')
const btn = document.getElementById('start-record')
var form = document.getElementById('control')
var recorder = RecordRTC(canvasElement, {
    type: 'canvas',
});

/* You can enable console debugging using logger.enableLogger() and disable using logger.disableLogger() */
var logger = function(){
    var oldConsoleLog = null;
    var pub = {};
    pub.enableLogger =  function enableLogger() 
                        {
                            if(oldConsoleLog == null)    return;
                        window['console']['log'] = oldConsoleLog;
                        };

    pub.disableLogger = function disableLogger()
                        {
                            oldConsoleLog = console.log;        window['console']['log'] = function() {};
                        };
    return pub;
}();
  
logger.disableLogger()

function onResults(results) {
  // Draw the overlays.
  canvasCtx.save()
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
      console.log(results.detections)
  if (results.detections.length > 0) {
    btn.click()
  }
  canvasCtx.restore();
}

const faceDetection = new FaceDetection({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.0/${file}`;
}});
faceDetection.setOptions({
  selfieMode : true,
  minDetectionConfidence: 0.5,
});
faceDetection.onResults(onResults);

form.addEventListener('submit',e=>{
  e.preventDefault()
  facingDir()
})

btn.addEventListener('click',()=>{
  btn.disabled = true;
  recorder.startRecording();
  var link = document.createElement("a");
  link.download = new Date()+'.png';
  link.href = canvasElement.toDataURL("image/png");
  link.click();
  delete link;
  canvasElement.toBlob(blob=>{
    submitForm(blob,"images")
  })
     
setTimeout(function() {
     recorder.stopRecording(function() {
      var blob = recorder.getBlob();
      submitForm(blob,"videos")
      var a = document.createElement('a');
      var url = URL.createObjectURL(blob);
      a.style.display = 'none';
      a.href = url;
      a.download = new Date()+'.webm';
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);}
        , 100);
      btn.disabled = false;
    })
    },60000)
  
})

var today = ()=>{
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  today = dd + '-' + mm + '-' + yyyy;
  return today
}

function submitForm(blob,type) {
    const formData = new FormData();
    formData.append("name", today());
    formData.append("type", type);
    formData.append("image", blob);
    fetch("detection", {
        method: 'post',
        body: formData
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));
}



var facingDir = () =>{ 
    var ele = document.getElementsByName('select');
    var mode = ''
    for(i = 0; i < ele.length; i++) { 
      if(ele[i].checked) 
         mode = ele[i].value
    }
    if(mode == ''){
      return alert('select one value')
    }
    var camera = new Camera(videoElement, {
      onFrame: async () => {
        await faceDetection.send({image: videoElement});
      },
      width: 1280,
      height: 720,
      facingMode: mode
    });
    camera.start();
}
