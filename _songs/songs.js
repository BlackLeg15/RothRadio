const songs = {
    0: {
        'name': 'Banco',
        'author': 'Matuê',
        'img': 'https://i.ytimg.com/vi/60o1g1E2GBs/maxresdefault.jpg',
        'link': 'https://cors-anywhere.herokuapp.com/https://media.vocaroo.com/mp3/nMBizOBDebZ',
    },
    1: {
        'name': 'De Peça em Peça',
        'author': 'Matuê',
        'img': 'https://i.ytimg.com/vi/hCDBXdzI20I/maxresdefault.jpg',
        'link': 'https://cors-anywhere.herokuapp.com/https://s0.vocaroo.com/media/download_temp/Vocaroo_s01hfR3YFXVX.mp3',
    },
    2: {
        'name': 'Kenny G',
        'author': 'Matuê',
        'img': 'https://images.suamusica.com.br/18pe40hFg4ql-z6h6ZL9atWaHmQ=/500x500/17903959/2560482/cd_cover.png',
        'link': 'https://cors-anywhere.herokuapp.com/https://media.vocaroo.com/mp3/m6vIzTfH9ry',
    },
    3: {
        'name': 'Morte do Autotune',
        'author': 'Matuê',
        'img': 'https://i1.sndcdn.com/artworks-q8ZbhR2tsy8s-0-t500x500.jpg',
        'link': 'https://cors-anywhere.herokuapp.com/https://s0.vocaroo.com/media/download_temp/Vocaroo_s0q7Fx1Br0ll.mp3',
    }
}

var context = AudioContext || webkitAudioContext;
audioContext = new context();

var button = document.querySelectorAll('.btn-primary');
var audio = document.querySelector("#player");
var img = document.querySelector('#img');

button.forEach((btn, index) => {
    btn.textContent = songs[index].name;
    btn.addEventListener('click', e => {
        img.src = songs[index].img;
        audio.src = songs[index].link;
    });
    btn.addEventListener('dblclick', e => {
        img.src = songs[index].img;
        audio.src = songs[index].link;
        audio.play();
    })
    audio.addEventListener('ended', e => {
        audio.src = songs[index + 1].link || songs[0].link;
    });
});

