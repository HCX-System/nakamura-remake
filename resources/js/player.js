import './vendor/video.js/dist/video-js-svpcloud.css'; 
import './vendor/video.js/dist/skins/skin.css';

import videojs from './vendor/video.js/dist/video.js';


export default {

    setTag() {
        
        var videohtml ='<video-js id="video_player" class="vjs-big-play-centered vjs-16-9" controls playsinline disablePictureInPicture controlsList="nodownload" preload="auto"></video-js>';
        document.getElementById('video-js-box').innerHTML = videohtml;

    },
    

    init(videoURL,videoImagURL,user_id,contents_id,session_token,apiURL) {

        var previousTime = 0;
        var currentTime = 0;
        var seekStart = null;
        var rate = 1.0;
        var contentId = contents_id;
        var player;

        var tag;
        var first;
        var progresspanel;
        var duration;
        var playbackrate;
        var switcher;
        var timeduration;
        var playbackrate;
        var playbackrateBt;
        var rateMenu;
        var playbackrateMenu;
        var switcherMenu;
        var bigPlay;
        var bigPlayBt;
        var second;
        var third;
        var pauseCount;
        var seekCount;
        var sessionToken = session_token;
        var seek_form = 0;
        var seek_to = 0;
        var percentile = "first-quarter";
        var durationTime = "";
        var userId = user_id;
        var postURL = apiURL;


        var checkObjectTimer  = setInterval(function(){
      
        var getObject=checkObject();

            if(getObject){
            clearInterval(checkObjectTimer);
                setElement();		
                }

            }, 1000);


            function checkObject(){
                
            duration = document.getElementsByClassName("vjs-duration");
            playbackrate = document.getElementsByClassName("vjs-playback-rate");

                if((duration != undefined && duration != null)&&(playbackrate != undefined && playbackrate != null)){
                    
                    return true;
                    
                }else{
                    
                    return false;
                }    
                
            }


            function setElement() {
                        
                    tag = document.getElementById('vjs-control-bar');
                    progresspanel = document.getElementById('vjs-progress-control');

                    duration = document.getElementsByClassName("vjs-duration");
                    duration[0].setAttribute("id", "timeduration");
                    timeduration = document.getElementById('timeduration');
                    
                    tag.insertBefore(progresspanel, timeduration);
                        
                    playbackrate = document.getElementsByClassName("vjs-playback-rate");
                    playbackrate[0].setAttribute("id", "playbackrate");
                    playbackrateBt = document.getElementById('playbackrate');
                        
                    playbackrateBt.setAttribute("title", "再生速度");
                    playbackrateBt.setAttribute("aria-haspopup", "true");
                    playbackrateBt.setAttribute("aria-expanded", "false");
                    playbackrateBt.setAttribute("aria-disabled", "false");
                    playbackrateBt.querySelector('button').remove();
                        
                    rateMenu = playbackrateBt.getElementsByClassName('vjs-menu');
                    rateMenu[0].setAttribute("id", "playbackrateMenu");
                    playbackrateMenu = document.getElementById('playbackrateMenu');

                    playbackrateBt.onclick = function () {
                        
                        if (playbackrateBt.getAttribute('aria-expanded') === 'false') {
                                    
                        playbackrateMenu.classList.remove('vjs-hidden');
                        playbackrateMenu.classList.add('vjs-lock-showing');
                        playbackrateBt.setAttribute('aria-expanded', 'true');

                        } else {
                                    
                        playbackrateMenu.classList.remove('vjs-lock-showing');
                        playbackrateMenu.classList.add('vjs-hidden');
                        playbackrateBt.setAttribute('aria-expanded', 'false');

                        }

                    }

                    var li = playbackrateMenu.getElementsByTagName('li');
                    for (var i=0; i < li.length; i++) {
                        li[i].addEventListener('click', function() {
                                
                        playbackrateMenu.classList.remove('vjs-lock-showing');
                        playbackrateBt.setAttribute('aria-expanded', 'false');

                        });
                    };
                
            }


            player = videojs('video_player',{ 
                playbackRates: [0.5, 1, 1.5, 2],
                poster:videoImagURL,
            }, function(){
    
            
            
            });
        
        player.src({ type: 'video/mp4', src: videoURL });

        player.on('loadedmetadata', function() {
            if(player.duration().toFixed(0)>0){
                setDuration(player.duration().toFixed(0));
            }else{
                setDuration(0);
            }
        });

        player.on('loadstart', function() {
            reset();
        });
     
         player.on('dispose', function() {
            reset();
         });
        
         player.on('timeupdate', function() {
            previousTime = currentTime;
            currentTime = player.currentTime().toFixed(0);
            PercentileTracking(currentTime);
         });
        
         player.on("play", function (e) {

            PlayTracking(currentTime,rate);
        });

        player.on("pause", function (e) {
    
            PauseTracking(currentTime,rate);
        });

        player.on("seeking", function (e) {
             if(seekStart === null) {
                seekStart = previousTime;
              }
        });

        player.on("seeked", function (e) {

           SeekTracking(seekStart,currentTime);
           seekStart = null;
        });

        player.on("ended", function (e) {
            endTracking(currentTime);
        });
     
        player.on('suspend', function() {

              console.log("suspend");
        });

         player.on('abort', function() {

            console.log("abort");
        });
     
       player.on('ratechange', function(e) {

     
           var isPaused = player.paused();
           player.pause();
            rate = player.playbackRate();
            if(!isPaused){
                    player.play();
                   
            }
          
        });

     
       player.on('error', function() {

            console.log("error");
            PauseTracking(currentTime);
       });
        
        function setContentData(id,user,customer,token,se_token) {
    
            content_id = id;
            user_id = user;
            customer_id = customer;
            sessionToken = token;
            security_token = se_token;
        };

        
        function setDuration(durationtime) {
            
            durationTime = durationtime;
            console.log("duration"+durationTime);
            
        };

        function reset(e) {
            first = false;
            second = false;
            third = false;
            durationTime = 0;
            currentTime = 0
            pauseCount = 0;
            seekCount = 0;
        };

        function setDuration(durationtime) {
    
            durationTime = durationtime;
            console.log("duration"+durationTime);
            
        };

        function getDuration() {
            
            if (durationTime > 0) {

            var quarter = (durationTime / 4).toFixed(0);

            first = +quarter;
            second = +quarter * 2;
            third = +quarter * 3;
            }
            
        };

        function PercentileTracking(curTime) {
    
            if (durationTime === null) {
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
                duration: durationTime,
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
                duration: durationTime,
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
                duration: durationTime,
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
                duration: durationTime,
                action:"completion"
                };

                sendLogdata(data);

            };


        function sendLogdata(data) {
            
            console.log(data);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', postURL, true);
            xhr.responseType = 'json'; 
            // console.log('postURL',postURL)

            // ヘッダーの設定
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
            
            xhr.addEventListener('load', function(event) {
            console.log(xhr.response);
            });

            
            var fd = new FormData();

            fd.append("contents_id",contentId);
            fd.append("action",data.action);
            fd.append("currentTime",data.currentTime);
            fd.append("playbackRate",data.rate);
            fd.append("duration",data.duration);
            fd.append("pauseCount",data.pauseCount);
            fd.append("seekCount",data.seekCount);
            fd.append("from",seek_form);
            fd.append("to",seek_to);
            fd.append("percentile",percentile);
            fd.append("user_id",userId);
            fd.append("sessionToken",sessionToken);
            xhr.send(fd); 
            
            // FormDataの内容を確認
            // fd.forEach((value, key) => {
            //     console.log(`${key}: ${value}`);
            // });
        }

    },
    
    dispose() {


        var isPaused = videojs('video_player').paused();
                 if(!isPaused){
                        videojs('video_player').pause();
                        
                }
        
        videojs('video_player').dispose();
      
    }

}