let menuData = [];

async function getMenu() {
  try {
    const response = await fetch(
      "https://storage.googleapis.com/acciojob-open-file-collections/appsmith-uploads/bb3807e9b0bc49958d39563eb1759406.json"
    );

    const data = await response.json();
    menuData = data;
    renderMenu(menuData);
  } catch (error) {
    console.error("Error fetching menu:", error);
  }
}

function renderMenu(items) {
  const menuGrid = document.querySelector(".menu-grid");
  menuGrid.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "food-card";

    const img = document.createElement("img");
    img.src = item.imgSrc;
    img.alt = item.name;

    const name = document.createElement("h3");
    name.textContent = item.name;

    const price = document.createElement("p");
    price.textContent = `$${item.price}`;

    card.append(img, name, price);
    menuGrid.appendChild(card);
  });
}

function TakeOrder() {
  return new Promise((resolve, reject) => {
    if (menuData.length === 0) {
      reject("Menu not loaded yet");
      return;
    }

    setTimeout(() => {
      const shuffled = [...menuData].sort(() => 0.5 - Math.random());
      const selectedItems = shuffled.slice(0, 3);

      resolve({
        items: selectedItems
      });
    }, 2500);
  });
}

getMenu();

const placeOrderBtn = document.getElementById("place-order-btn");

placeOrderBtn.addEventListener("click", () => {
  TakeOrder()
    .then(order => {
      console.log("Order received:", order);
    })
    .catch(err => {
      console.error(err);
    });
});
