// setAdminRole.js
const admin = require("firebase-admin");

// Replace with the path to your service account key JSON
const serviceAccount = require("./path-to-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const email = "your-email@example.com"; // Your Firebase-authenticated email

admin
  .auth()
  .getUserByEmail(email)
  .then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, { admin: true });
  })
  .then(() => {
    console.log(`✅ Admin role assigned to ${email}`);
    process.exit();
  })
  .catch((error) => {
    console.error("❌ Error setting admin role:", error);
    process.exit(1);
  });
