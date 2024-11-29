var tag;
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


$(window).on( "load", function() {

    var checkObjectTimer  = setInterval(function(){
        
            var getObject=checkObject();
        
			if(getObject){　
			 clearInterval(checkObjectTimer);
             setElement();		
            }
        
        }, 1000);

});



function checkObject(){
    
   duration = document.getElementsByClassName("vjs-duration");
   playbackrate = document.getElementsByClassName("vjs-playback-rate");
  // switcher = document.getElementById('switcher');
    
    /*console.log("duration"+duration);
    console.log("playbackrate"+playbackrate);
    console.log("switcher"+switcher);*/
    
  //if((duration != undefined && duration != null)&&(playbackrate != undefined && playbackrate != null)&&(switcher != undefined && switcher != null)){
  if((duration != undefined && duration != null)&&(playbackrate != undefined && playbackrate != null)){    
      return true;
      
  }else{
      
       return false;
  }    
    
}


function setElement(){
    
    tag = document.getElementById('vjs-control-bar');
    progresspanel = document.getElementById('vjs-progress-control');

    duration = document.getElementsByClassName("vjs-duration");
    duration[0].setAttribute("id","timeduration");
    timeduration = document.getElementById('timeduration');
 
    tag.insertBefore(progresspanel, timeduration);
    
    
    playbackrate = document.getElementsByClassName("vjs-playback-rate");
    playbackrate[0].setAttribute("id","playbackrate");
    playbackrateBt = document.getElementById('playbackrate');
     
    playbackrateBt.setAttribute("title","再生速度");
    playbackrateBt.setAttribute("aria-haspopup","true");
    playbackrateBt.setAttribute("aria-expanded","false");
    playbackrateBt.setAttribute("aria-disabled","false");
    playbackrateBt.querySelector('button').remove();
    
    
    rateMenu =  playbackrateBt.getElementsByClassName('vjs-menu');
    rateMenu[0].setAttribute("id","playbackrateMenu");
    playbackrateMenu = document.getElementById('playbackrateMenu');
        
     $('#playbackrate').on('click', function() {
            
            if(playbackrateBt.getAttribute('aria-expanded') === 'false'){
                
                playbackrateMenu.classList.remove('vjs-hidden');
                playbackrateMenu.classList.add('vjs-lock-showing');
                playbackrateBt.setAttribute('aria-expanded', 'true');
                
                   /*  if(switcher.getAttribute('aria-expanded') === 'true'){
                                                
                        switcherMenu.classList.remove('vjs-lock-showing');
                         switcherMenu.classList.add('vjs-hidden'); 
                         switcher.setAttribute('aria-expanded', 'false');
                    } */

               }else{
                   
                 playbackrateMenu.classList.remove('vjs-lock-showing');
                 playbackrateMenu.classList.add('vjs-hidden'); 
                 playbackrateBt.setAttribute('aria-expanded', 'false');

               }
    
        });
        
        $('#playbackrateMenu li').click(function(){
            
            playbackrateMenu.classList.remove('vjs-lock-showing');
            playbackrateBt.setAttribute('aria-expanded', 'false');
            
        });
    
    
        /* switcher = document.getElementById('switcher');
            var switcherMenu = document.getElementById('switcherMenu');
            switcher.querySelector('button').remove();
            
            $('#switcher').on('click', function() {
  
            if(switcher.getAttribute('aria-expanded') === 'false'){
                
                switcherMenu.classList.remove('vjs-hidden');
                switcherMenu.classList.add('vjs-lock-showing');
                switcher.setAttribute('aria-expanded', 'true');
                
                    if(playbackrateBt.getAttribute('aria-expanded') === 'true'){

                         playbackrateMenu.classList.remove('vjs-lock-showing');
                         playbackrateMenu.classList.add('vjs-hidden'); 
                         playbackrateBt.setAttribute('aria-expanded', 'false');

                    }
               
               }else{
                   
                 switcherMenu.classList.remove('vjs-lock-showing');
                 switcherMenu.classList.add('vjs-hidden'); 
                 switcher.setAttribute('aria-expanded', 'false');

               }
    
                });

              $('#switcherMenu li').click(function(){

                switcherMenu.classList.remove('vjs-lock-showing');
                switcher.setAttribute('aria-expanded', 'false');

            }); */

}















