var audio , playbtn , seekslider , seeking = false , volumeslider , seekto , repeat , random , mutebtn , title , poster , artists , playlist ,ext , agent , dir , playlist_artist , playlist_status,curtimetext,durtimetext;

// Initializing an array of Playlist , Title , poster , Artist 
dir="music/";
playlist=["Master-the-Blaster","Kutti Story","Andha Kanna Paathaakaa"];
poster=["images/Vijay master.jpg","images/Kutty story vijay.jpg","images/Master melody.jpg"];
title =["Master the Blaster" , "Kutty Story", "Andha kanna paathaka"];
artists=["Anirudh Ravichandran", "Anirudh Ravichandran","Anirudh Ravichandran"];
playlist_index=0

// To make it run on every browser
ext = ".mp3";
	agent = navigator.userAgent.toLowerCase();
	if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1) {
    ext = ".ogg";
    }

//set object reference 
playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumeslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimetext");
playlist_status = document.getElementById("playlist_status");
playlist_artist = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");

// audio object

audio = new Audio();
audio.src=dir+playlist[0]+ext;
audio.loop="false";

// Song name and playlist

playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index];

playbtn.addEventListener("click",playPause);
nextbtn.addEventListener("click",nextSong);
prevbtn.addEventListener("click",prevSong);
mutebtn.addEventListener("click", mute);
seekslider.addEventListener("mousedown", function(event){ seeking=true; seek(event); });
seekslider.addEventListener("mousemove", function(event){ seek(event); });
seekslider.addEventListener("mouseup",function(){ seeking=false; });
volumeslider.addEventListener("mousemove", setvolume);
audio.addEventListener("timeupdate", function(){ seektimeupdate(); });
audio.addEventListener("ended", function(){ switchTrack(); });
repeat.addEventListener("click",loop);
randomSong.addEventListener("click",random);

function fetchmusicdetail(){
	$("#playpausebtn img").attr("src","images/pause-red.png");
	$("#bgImage img").attr("src",poster[playlist_index]);
	$("#image").attr("src",poster[playlist_index]);

	playlist_status.innerHTML=title[playlist_index];
	playlist_artist.innerHTML=artists[playlist_index];

	audio.src=dir+playlist[playlist_index]+ext;
	audio.play()
}

function getRandomNumber(min,max){
	let step1 = max - min + 1;
	let step2 = Math.random() * step1;
	let result = Math.floor(step2) + min;
	return result;
}

function random(){
	let randomIndex = getRandomNumber(0,playlist.length-1);
	playlist_index = randomIndex;
	fetchMusicDetail();
}
function loop(){
	if(audio.loop){
		audio.loop=false;
		$("#repeat img").attr("src","images/rep1.png");

	}
	else{
		audio.loop=true;
		$("#repeat img").attr("src","images/rep1.png");
	}
}
function nextSong(){
	playlist_index++;
	if(playlist_index>playlist.length-1){
		playlist_index=0;
	}
	fetchmusicdetail();
}
function prevSong(){
	playlist_index--;
	if(playlist_index<0){
		playlist_index=playlist.length-1;
	}
	fetchmusicdetail();

}
function switchTrack(){
	if(playlist_index==playlist.length-1){
		playlist_index=0;
	}
	else{
		playlist_index++;
	}

}
function playPause(){
	if(audio.paused){
		audio.play();
		$("#playpausebtn img").attr("src","images/pause-red.png");
	}
	else{
		audio.pause();
		$("#playpausebtn img").attr("src","images/play-red.png");  
	}
}

function mute(){
	if(audio.muted){
		audio.muted = false;
		$("#mutebtn img").attr("src","images/speaker.png");
	}else{
		audio.muted = true;
		$("#mutebtn img").attr("src","images/mute.png");
	}
}

function seek(event){
	if(audio.duration == 0){
		null
	}else{
		if(seeking){
			seekslider.value = event.clientX - seekslider.offsetLeft;
			seekto = audio.duration * (seekslider.value / 100);
			audio.currentTime = seekto;
		}
	} 
}

function setvolume(){
	audio.volume=volumeslider.value/100;
}
function seektimeupdate(){
	if(audio.duration){
		var nt = audio.currentTime * (100 / audio.duration);
		seekslider.value = nt;
		var curmins = Math.floor(audio.currentTime / 60);
		var cursecs = Math.floor(audio.currentTime - curmins * 60);
		var durmins = Math.floor(audio.duration / 60);
		var dursecs = Math.floor(audio.duration - durmins * 60);
		if(cursecs < 10){ cursecs = "0"+cursecs; }
		if(dursecs < 10){ dursecs = "0"+dursecs; }
		if(curmins < 10){ curmins = "0"+curmins; }
		if(durmins < 10){ durmins = "0"+durmins; }
		curtimetext.innerHTML = curmins+":"+cursecs;
		durtimetext.innerHTML = durmins+":"+dursecs;
	}
	else{
		curtimetext.innerHTML = "00"+":"+"00";
		durtimetext.innerHTML = "00"+":"+"00";
	}
	
}