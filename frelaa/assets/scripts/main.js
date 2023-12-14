let walletAmount = 0; //Valor inicial do prêmio
let currentVideoIndex = 1; //índice do vídeo atual (valor de referência)
const numberOfVideos = 3; //quantidade de vídeos, mudar esse valor se adicionar/remover vídeos

const prizeArray = (dados) => {
  // Verifica se a entrada é um array
  if (!Array.isArray(dados)) {
    throw new Error("Os dados devem ser um array de objetos.");
  }

  // Mapeia o array de objetos para extrair os valores da propriedade "valor_premio"
  const valoresPremio = dados.map((objeto) => {
    if (objeto.hasOwnProperty("valor_premio")) {
      return objeto.valor_premio;
    } else {
      throw new Error('Os objetos devem ter a propriedade "valor_premio".');
    }
  });

  return valoresPremio;
};

// Exemplo de uso da função
const prizeValues = prizeArray(dados);

function showReward() {
  // Tocando o som de dinheiro

  // Atualizando o saldo na "carteira"
  if (currentVideoIndex > 0 && currentVideoIndex <= numberOfVideos) {
    const rewardElement = document.querySelector(".reward");
    console.log(currentVideoIndex);

    walletAmount += prizeValues[currentVideoIndex - 1];
    rewardElement.classList.add("animated");
    document.getElementById("moneySound").play();

    console.log(walletAmount);

    rewardElement.innerText = `R$${prizeValues[currentVideoIndex - 1]
      .toFixed(2)
      .replace(".", ",")}`;

    document.getElementById("walletAmount").innerText = walletAmount
      .toFixed(2)
      .replace(".", ",");
    setTimeout(() => {
      rewardElement.innerText = ""; // Limpar a mensagem após 2 segundos
      rewardElement.classList.remove("animated"); // Remover a classe de animação
    }, 2000); // A mensagem desaparecerá após 2 segundos

    setTimeout(() => {
      nextVideo();
    }, 2000); //delay de 2s para animaçao ser exibida antes do proximo video
  }

  // Adicionando classe para animar o texto
}

function mostrarAlerta(texto) {
  document.querySelector(".like-button").focus();
  document.querySelector(".like-button").style.backgroundColor = "green";

  var feedback = document.getElementById("likeFeedback");
  feedback.style.display = "block"; // Torna o feedback visível

  setTimeout(function () {
    feedback.style.display = "none";
    document.querySelector(".like-button").style.backgroundColor = "#ff6600";
  }, 2000);
}

function showVideo(videoIndex, direction) {
  const videos = document.querySelectorAll(".video");
  renderVideoDivs(videoIndex);
  videos.forEach((video, index) => {
    if (direction === "next") {
      video.style.transformOrigin = "left";
    } else if (direction === "prev") {
      video.style.transformOrigin = "right";
    }

    if (index === videoIndex - 1) {
      /*     window.setTimeout(function () {
      video.style.display = "block";
    }, 300); // timed to match animation-duration */
      window.setTimeout(function () {
        video.style.display = "block";
      }, 300); // timed to match animation-duration

      video.style.transform = "scaleX(1)";
    } else {
      video.style.transform = "scaleX(0)";
      video.style.display = "block";

      window.setTimeout(function () {
        video.style.display = "none";
      }, 300); // timed to match animation-duration
    }
  });
  currentVideoIndex = videoIndex;
}
/* videos.forEach((video, index) => {
  if (index === videoIndex - 1) {
    video.style.transform = "scale(1)";
    video.style.transition = "all .3s ease";
  } else {
    video.style.transform = "scale(0)";
  }
});
currentVideoIndex = videoIndex;
 */
function prevVideo() {
  if (currentVideoIndex > 1) {
    showVideo(currentVideoIndex - 1, "prev");
  }
}

function nextVideo() {
  if (currentVideoIndex < numberOfVideos) {
    showVideo(currentVideoIndex + 1, "next");
  }
}

showVideo(currentVideoIndex);

const openPopupBtn = document.getElementById("openPopupBtn");

const popup = document.getElementById("popup");

const sacarBtn = document.getElementById("sacarBtn");
const chavePixInput = document.getElementById("chavePixInput");
const valorSaqueInput = document.getElementById("valorSaqueInput");
const cards = document.querySelectorAll(".card");

openPopupBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
  });
});

sacarBtn.addEventListener("click", () => {
  const selectedCard = document.querySelector(".card.selected");
  const chavePix = chavePixInput.value;
  const valorSaque = valorSaqueInput.value;

  if (selectedCard && chavePix && valorSaque) {
    const selectedCardText = selectedCard.textContent.trim();

    walletAmount -= parseFloat(valorSaque);
    document.getElementById("walletAmount").textContent = "0";

    showSuccessNotification(selectedCardText, chavePix, valorSaque);
    popup.style.display = "none";

    setTimeout(() => {
      showPixReceivedNotification(selectedCardText, chavePix, valorSaque);
    }, 3000);
  }
});

function closePopup() {
  popup.style.display = "none";
}

function showSuccessNotification() {
  Swal.fire({
    title: "Saque realizado com sucesso!",
    text: `O valor está sendo processado.`,
    icon: "success",
    confirmButtonText: "OK",
  });
}
function showPixReceivedNotification(selectedCard, chavePix, valorSaque) {
  const pixAmount = document.getElementById("pixAmount");
  pixAmount.innerText = valorSaque;

  // Reproduz o som de notificação
  const notificationSound = document.getElementById("notificationSound");
  notificationSound.play();

  const pixNotification = document.getElementById("pixNotification");
  pixNotification.style.display = "flex"; // Mostra a notificação

  setTimeout(() => {
    pixNotification.style.display = "none"; // Oculta a notificação após 5 segundos
  }, 5000); // A notificação será ocultada após 5 segundos (5000 milissegundos)
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearForm(elements) {
  for (let i = 0; i < elements.length; i++) {
    if (!elements[i].classList.contains("hidden")) {
      elements[i].classList.add("hidden");
    }
    if (elements[i].childNodes[3].childNodes[1]?.value) {
      elements[i].childNodes[3].childNodes[1].value = "";
    }
  }
}

async function showElementWithDelay(element, delayTime) {
  document.getElementById("loading").classList.remove("hidden");
  await delay(delayTime);
  document.getElementById("loading").classList.add("hidden");
  element.classList.remove("hidden");
}

async function startForm() {
  await showElementWithDelay(document.getElementById("titulo"), 2000);

  document.getElementById("pergunta1").innerText =
    dados[currentVideoIndex - 1].pergunta1;

  document.getElementById("pergunta2").innerText =
    dados[currentVideoIndex - 1].pergunta2;

  document.getElementById("pergunta3").innerText =
    dados[currentVideoIndex - 1].pergunta3;

  const inputs = [
    document.getElementById("input1"),
    document.getElementById("input2"),
  ];
  const prompt = document.getElementById("prompt");
  const msg = document.getElementById("mensagem");
  clearForm([...inputs, prompt, msg]);
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    await showElementWithDelay(input, 2000);
    await new Promise((resolve) => {
      input.addEventListener("focusout", function handler() {
        if (input.childNodes[3].childNodes[1].value.trim() !== "") {
          input.removeEventListener("focusout", handler);
          resolve();
        }
      });
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          // A tecla Enter foi pressionada

          if (input.childNodes[3].childNodes[1].value.trim() !== "") {
            resolve();
          } else {
            Swal.fire({
              icon: "error",
              title: "Atenção!",
              text: "Digite algo para continuar!",
            });
          }
        }
      });
    });
  }

  await showElementWithDelay(prompt, 2000);

  const simBtn = document.getElementById("simBtn");
  const naoBtn = document.getElementById("naoBtn");

  const buttonsHandler = async () => {
    prompt.removeEventListener("blur", buttonsHandler);

    await showElementWithDelay(msg, 2000);
    setTimeout(() => {
      clearForm([...inputs, prompt, msg]);
      closeSurvey();
      showReward();
    }, 2000);
  };

  simBtn.addEventListener("click", buttonsHandler);
  naoBtn.addEventListener("click", buttonsHandler);
}

//  document.addEventListener('DOMContentLoaded', startForm);

function renderVideoDivs(videoIndex) {
  let html = "";

  html += `
  <div class="video ${videoIndex}">
  <video
    muted
    autoplay
    playsinline
    loop
    controls
    src="assets/media/videos/${dados[videoIndex - 1].video}"
  ></video>
  </div> 
`;

  console.log(html);
  document.getElementById("video-container").innerHTML = html;
}
