<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Formulaire de contact</title>
</head>
<body>
  <form id="contact-form">
    <label for="name">Nom :</label>
    <input type="text" name="name" id="name" required><br>

    <label for="email">Email :</label>
    <input type="email" name="email" id="email" required><br>

    <label for="phone">Téléphone :</label>
    <input type="text" name="phone" id="phone" required><br>

    <label for="message">Message :</label>
    <textarea name="message" id="message" required></textarea><br>

    <button type="submit">Send</button>
  </form>

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
</body>
</html>
