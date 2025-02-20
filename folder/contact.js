function addClass() {
  document.body.classList.add("sent");
}

document.getElementById("sendLetter").addEventListener("click", addClass);
function sendmail() {
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("Email").value,
    message: document.getElementById("message").value,
  }
    emailjs.send("service_0jgffj7", "template_89vfg5n", params).then(alert("success"));
  }
