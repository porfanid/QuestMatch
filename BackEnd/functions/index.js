const admin = require("firebase-admin");
admin.initializeApp();

/**
 * Deletes unverified users who registered more than a week ago.
 * @return {Promise<void>} A promise that resolves when the users are deleted.
 */
async function del() {
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
}

// Call the function to run the logic.
del()
  .then(() => {
    console.log("Script execution completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Script execution failed:", error);
    process.exit(1);
  });

