const admin = require("firebase-admin");
admin.initializeApp();

exports.deleteUnverifiedUsers = functions.pubsub
  .schedule("every 24 hours") // Run the function daily
  .timeZone("your-time-zone")
  .onRun(async (context) => {
    const currentTime = Date.now();
    const oneWeekAgo = currentTime - 7 * 24 * 60 * 60 * 1000;

    try {
      const listUsersResult = await admin.auth().listUsers();
      const unverifiedUsers = listUsersResult.users.filter(
        (user) => !user.emailVerified && user.metadata.creationTime < oneWeekAgo
      );

      console.log(`Deleting ${unverifiedUsers.length} unverified user(s).`);

      // Delete the unverified users.
      const deletePromises = unverifiedUsers.map((user) =>
        admin.auth().deleteUser(user.uid)
      );
      await Promise.all(deletePromises);

      console.log("Unverified users deleted successfully.");
    } catch (error) {
      console.error("Error deleting unverified users:", error);
    }
  });
