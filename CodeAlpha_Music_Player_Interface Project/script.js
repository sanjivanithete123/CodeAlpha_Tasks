const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

const songs = [
    {
        name: "song1.mp3",
        title: "Dreams",
        artist: "Artist One"
    },
    {
        name: "song2.mp3",
        title: "Waves",
        artist: "Artist Two"
    },
    {
        name: "song3.mp3",
        title: "Night Sky",
        artist: "Artist Three"
    }
];

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.name;
    updatePlaylist();
}

function playPause() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    isPlaying = true;
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    isPlaying = true;
}

audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    currentTimeEl.innerText = formatTime(currentTime);
    durationEl.innerText = formatTime(duration);
});

progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

audio.addEventListener("ended", nextSong); // autoplay

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

function updatePlaylist() {
    playlistEl.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.innerText = `${song.title} - ${song.artist}`;
        if (index === songIndex) li.classList.add("active");
        li.onclick = () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            audio.play();
            isPlaying = true;
        };
        playlistEl.appendChild(li);
    });
}

loadSong(songs[songIndex]);
