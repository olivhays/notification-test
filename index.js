const express = require("express");
const Expo = require("expo-server-sdk").default;
const cors = require("cors");

const expo = new Expo();
const expressServer = express();

expressServer.use(cors());
expressServer.listen(process.env.PORT, () => {
  console.log("Serveur écoute sur " + process.env.PORT);
});
//url/?token=ececercnri
expressServer.get("/", function(req, res) {
  const token = req.query.token;
  if (!Expo.isExpoPushToken(token)) {
    console.log("Token invalide");
    res.send({ err: "Token invalide" });
  } else {
    let messages = [
      {
        to: token,
        sound: "default",
        body: "Notification test",
        data: { test: "eeoeoeoeo" }
      }
    ];
    expo
      .sendPushNotificationsAsync(messages)
      .then(ticket => {
        res.send({ ticket: ticket });
      })
      .catch(err => {
        console.log("Erreur d'envoi");
        res.send({ err: "Erreur d'envoi" });
      });
  }
});
