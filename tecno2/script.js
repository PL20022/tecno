let walletAmount = 0;
let likeCount = 0;
const valoresVideos = [34, 37, 43]; // Array com os valores dos vídeos



function showReward() {
    // Atualizando o saldo na "carteira" com base no vídeo atual
    walletAmount += valoresVideos[currentVideoIndex - 1];
    document.getElementById('walletAmount').textContent = walletAmount;

    const rewardElement = document.querySelector('.reward');
    rewardElement.textContent = `+R$ ${valoresVideos[currentVideoIndex - 1].toFixed(2)}`;

    // Adicionando classe para animar o texto
    rewardElement.classList.add('animated'); // 'animated' é o nome da classe no CSS

    console.log("teste 1");
    setTimeout(() => {
        rewardElement.textContent = "";
        rewardElement.classList.remove('animated');
    }, 1000);

    likeCount++;
    updateLikeCount();


    setTimeout(() => {
        nextVideo();
    }, 1200);


}

function showMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.display = 'block';

    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.style.display = 'none';
    }, 2000); // A mensagem será exibida por 2 segundos (2000 milissegundos)
}



function updateLikeCount() {
    const likeCountElement = document.querySelector('.like-count');
    //likeCountElement.textContent = `Likes: ${likeCount}`;
}

let currentVideoIndex = 1;

function showVideo(videoIndex) {
    const videos = document.querySelectorAll('.video');
    videos.forEach((video, index) => {
        if (index === videoIndex - 1) {
            video.style.display = 'block';
        } else {
            video.style.display = 'none';
        }
    });
    currentVideoIndex = videoIndex;
}

function prevVideo() {
    if (currentVideoIndex > 1) {
        showVideo(currentVideoIndex - 1);
    }
}

function nextVideo() {
    if (currentVideoIndex < 3) {
        showVideo(currentVideoIndex + 1);
        showMessage('Por favor, dê sua recomendação para prosseguir...');
    } else if (currentVideoIndex === 3) {

        window.location.href = "pagina_principal.html";
    }
}


showVideo(currentVideoIndex);