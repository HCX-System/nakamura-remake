
var first = false;
var second = false;
var third = false;
var currentTime = 0;
var rate = 1.0;
var duration = 0;
var pauseCount = 0;
var seekCount = 0;
var content_id = "";
var user_id = "";
var customer_id = "";
var seek_form =0;
var seek_to = 0;
var percentile = "firstplay";
var sessionToken = "";
var security_token = "";

function reset(e) {
    first = false;
    second = false;
    third = false;
    duration = 0;
    currentTime = 0
    pauseCount = 0;
    seekCount = 0;
    rate = 1.0;
 };


function setContentData(id,user,customer,token) {
    
    content_id = id;
    user_id = user;
    customer_id = customer;
    sessionToken = token;
  
  };




function setDuration(durationtime) {
    
    duration = durationtime;
    console.log("duration"+duration);
    
  };


function getDuration() {

    
    if (duration > 0) {
        
      var quarter = (duration / 4).toFixed(0);

      first = +quarter;
      second = +quarter * 2;
      third = +quarter * 3;
    }
    
  };





function linkClick(id) {

   sendDownloadData(id);

 };


function PlayTracking(curTime,rate) {
    
    currentTime = curTime;
    
    var action = "";
    
    if(currentTime==0){
       
        action = "firstPlay";
       
       }else if(currentTime>0){
        
        action = "play";
    }
    
   var data = {
      seekCount: seekCount,
      pauseCount: pauseCount,
      currentTime: currentTime,
      rate:rate,
      duration: duration,
      action: action
    };
    
    sendLogdata(data);
    
    
}



function PauseTracking(curTime,rate) {
 
    pauseCount++;
     currentTime = curTime;
    
    var data = {
      seekCount: seekCount,
      pauseCount: pauseCount,
      currentTime: currentTime,
      duration: duration,
      rate:rate,
      action:"pause"
    };
    
    sendLogdata(data);
    
};


function SeekTracking(from,to) {
  
     seekCount++;
     seek_form = from;
     seek_to = to;
     var data = {
      seekCount: seekCount,
      pauseCount: pauseCount,
      currentTime: to,
      duration: duration,
      action:"seek"
    };
    
    sendLogdata(data);
    
};



function endTracking(curTime) {
  
    percentile = 'fourth-quarter';
    currentTime = curTime; 
    
    var data = {
      seekCount: seekCount,
      pauseCount: pauseCount,
      currentTime: currentTime,
      duration: duration,
      action:"completion"
    };

    sendLogdata(data);

};


function PercentileTracking(curTime) {
    
    if (duration === null) {
      getDuration();
    }
    currentTime = curTime; 
    var data = {
      seekCount: seekCount,
      pauseCount: pauseCount,
      currentTime: currentTime,
      duration: duration,
      action:"completion"
    };
    
     switch (curTime) {
      case first:
        first = false;
        percentile = "first-quarter";
        sendLogdata(data);     
        break;
      case second:
        second = false;
        percentile = "second-quarte";
        sendLogdata(data);      
        break;
      case third:
        third = false;
        percentile = "third-quarte";
        sendLogdata(data);      
        break;
    }
    
    
}


function sendLogdata(data) {
  
  console.log(content_id);
  console.log(user_id);
   console.log(customer_id);

  var xhr = new XMLHttpRequest();
	xhr.open('POST', '../class/Writelog.php', true);
	xhr.responseType = 'json'; 
	xhr.addEventListener('load', function(event) {
		console.log(xhr.response);
    console.log("fffffffffffffffff");
	});

    var fd = new FormData();

    fd.append("content_id",content_id);
    fd.append("action",data.action);
    fd.append("currentTime",data.currentTime);
    fd.append("playbackRate",data.rate);
    fd.append("duration",data.duration);
    fd.append("pauseCount",data.pauseCount);
    fd.append("seekCount",data.seekCount);
    fd.append("from",seek_form);
    fd.append("to",seek_to);
    fd.append("percentile",percentile);
    fd.append("user_id",user_id);
    fd.append("customer_id",customer_id);
    fd.append("sessionToken",sessionToken);
    xhr.send(fd);

}

