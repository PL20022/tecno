const survey = document.getElementById("popup2");
const rewardBtn = document.getElementById("reward-icon");

rewardBtn.addEventListener("click", (e) => {
  e.stopPropagation? e.stopPropagation() : e.cancelBubble = true;
  e.preventDefault();
  survey.style.display = "flex";

  startForm()

});




function closeSurvey() {
  survey.style.display = "none";
  showReward()

}

function showSuccessNotification() {
  Swal.fire({
    title: "Saque realizado com sucesso!",
    text: `O valor está sendo processado.`,
    icon: "success",
    confirmButtonText: "OK",
  });
}
