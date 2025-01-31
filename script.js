// Initialize Firebase (Replace with your Firebase config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase App
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Add item to Firestore
document.getElementById('addItemForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const itemName = document.getElementById('itemName').value;
  const itemPrice = parseFloat(document.getElementById('itemPrice').value);

  await db.collection("items").add({
    name: itemName,
    price: itemPrice,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  alert('Item added successfully!');
  document.getElementById('addItemForm').reset();
  fetchItems(); // Refresh the list
});

// Fetch items from Firestore
async function fetchItems() {
  const itemList = document.getElementById('itemList');
  itemList.innerHTML = ''; // Clear previous items

  const querySnapshot = await db.collection("items").orderBy("timestamp", "desc").get();
  querySnapshot.forEach((doc) => {
    const item = doc.data();
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `<strong>${item.name}</strong>: $${item.price.toFixed(2)}`;
    itemList.appendChild(itemDiv);
  });
}

// Load items when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchItems();
});
