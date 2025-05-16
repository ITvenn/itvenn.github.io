<!-- SDK EmailJS -->
<script src="https://cdn.emailjs.com/dist/email.min.js"></script>
<script>
  (function () {
    emailjs.init("xkV_j7aevb_AkEj5p"); // Remplacez par votre ID utilisateur EmailJS
  })();

  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_3hfkd24", "template_n4teg6d", this)
      .then(function () {
        alert("Message envoyé !");
      }, function (error) {
        alert("Erreur lors de l'envoi : " + JSON.stringify(error));
      });
  });
</script>
