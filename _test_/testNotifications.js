// Simple manual test script to verify notification system
import {
  addNotification,
  NOTIFICATION_TYPES,
} from "../src/store/slices/notificationSlice";

console.log("Testing notification system...");

// Test 1: Create warning notification (weight limit)
console.log("✓ Notification slice imported successfully");
console.log(
  "✓ NOTIFICATION_TYPES constants available:",
  Object.keys(NOTIFICATION_TYPES),
);

// Test 2: Create different notification types
const testNotification = addNotification(
  "Test weight warning",
  NOTIFICATION_TYPES.WARNING,
);
console.log("✓ Weight warning notification created:", testNotification.payload);

const testNotification2 = addNotification(
  "Test inventory full",
  NOTIFICATION_TYPES.ERROR,
);
console.log("✓ Error notification created:", testNotification2.payload);

console.log("🎉 Notification system appears to be working correctly!");
console.log(
  "📝 Note: Full visual testing requires running the app and triggering weight/inventory limits",
);
