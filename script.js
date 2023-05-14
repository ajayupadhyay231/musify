console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "AAGE CHAL- RAFTAAR", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "SHOORVEER 3", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "KHWAHISH - MUNAWAR FARUQUI", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "AZADI- GULLY BOY", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "DANVEER KARAN THE - ABBY VIRAL", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "BIJLEE BIJLEE - HARRDY SANDHU ", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "KINNA SONA - JUBIN NAUTIYAL ", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "BELIEVER - IMAGINE DRAGONS ", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "FADED - ALAN WALKER", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "FARAK - DIVINE", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]


songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 
// Add a click event listener to the "About" button
document.getElementById('about-button').addEventListener('click', function() {
    // Toggle the visibility of the about section
    var aboutSection = document.getElementById('about-section');
    if (aboutSection.style.display === 'block') {
      aboutSection.style.display = 'none';
    } else {
      aboutSection.style.display = 'block';
    }
  });
  
// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        console.log(songIndex);
        let e = document.getElementById(`${songIndex}`);
        e.classList.remove('fa-play-circle');
        e.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        let e = document.getElementById(`${songIndex}`);
        e.classList.remove('fa-pause-circle');
        e.classList.add('fa-play-circle');
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        if(audioElement.paused || audioElement.currentTime<=0){
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
      }else{
        makeAllPlays();
        songIndexPrevious = songIndex;
        songIndex = parseInt(e.target.id);
        console.log(songIndex);
        console.log(songIndexPrevious);
        if(songIndex == songIndexPrevious){
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
       }else{
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
       }
      }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAllPlays();
    let e = document.getElementById(`${songIndex}`);
    e.classList.remove('fa-play-circle');
    e.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAllPlays();
    let e = document.getElementById(`${songIndex}`);
    e.classList.remove('fa-play-circle');
    e.classList.add('fa-pause-circle');

})