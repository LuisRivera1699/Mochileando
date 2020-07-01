var admin = require("firebase-admin");

var serviceAccount = require("C:\Users\Carla Rucoba\Desktop\react\prueba git\Mochileando\mochileando-621d2-firebase-adminsdk-44jd2-7886fd2183.json");

const adm = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mochileando-621d2.firebaseio.com"
  });

export { adm };