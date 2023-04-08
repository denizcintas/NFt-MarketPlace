const COLLECTIONS_DUMP = COLLECTIONS;
const createCatagories = () => {
  const filterCategoriEl = document.querySelector(".filter_catagories");

  let categories = ["all"];
  COLLECTIONS.forEach((item) => {
    if (categories.findIndex((c) => c == item.category) == -1)
      categories.push(
        item.category
      ); /* sadece bu şekilde itemları pushlarsak aynı olan katagorilerde gelir bu yüzden if ile bunları tekrar etmeyen şekilde pushlicam*/
  });

  const categorSwitcher = {
    /*Asagıda kullandıgım  categorSwitcher[category] anlamı katogirdn gelen deger all ilse bunu All olarak gonder demek istedik*/
    all: "ALL",
    sport: "Sport",
    collectibles: "Collectibles",
    art: "Art",
    photography: "Photography",
    music: "Music",
  };

  categories.forEach((category) => {
    let categoryHTML = `<li class="${
      category == "all" ? "active" : ""
    } " onclick="filterCategories(this)" data-category= "${category}"  >${
      categorSwitcher[category]
    }</li>`;
    filterCategoriEl.insertAdjacentHTML("beforeend", categoryHTML);
  });
};

const filterCategories = (categoryEl) => {
  const lastActiveEl = document.querySelector("li.active");
  lastActiveEl.classList.remove("active");

  categoryEl.classList.add("active");
  if (categoryEl.dataset.category == "all") {
    COLLECTIONS = COLLECTIONS_DUMP;
  } else {
    COLLECTIONS = COLLECTIONS_DUMP.filter(
      (collection) => collection.category == categoryEl.dataset.category
    );
  }
  listCollections();
};
const listCollections = () => {
  /*lİSTELEME İŞLEMİ*/
  const collectionEl = document.querySelector(".collections");
  collectionEl.innerHTML = "";
  COLLECTIONS.forEach((collection) => {
    let collectionsItemHTML = `<div class="collections_item">
    <a class="collection_container" href="${collection.link}">
      <img class="collection_img" src="${collection.img}"" />
      <div class="collection_info">
        <strong class="collections_title">${collection.name}</strong> <br />
        <span>${collection.author}</span>
      </div>
      <div class="collection_price">
        <strong>${collection.price}</strong>
        <img
          src="images/ethereum-logo.png"
          alt=""
          width="24"
          height="24"
        />
      </div>
      <button href="${collection.link}">Show detail </button> 
    </a>
  </div>`;
    collectionEl.insertAdjacentHTML("beforeend", collectionsItemHTML);
  });
};

const searchCollections = (searchKey) => {
  if (searchKey.length > 1) {
    COLLECTIONS = COLLECTIONS_DUMP.filter((c) =>
      c.name.toLowerCase().includes(searchKey.toLowerCase())
    );
  } else {
    COLLECTIONS = COLLECTIONS_DUMP;
  }
  listCollections();
};
createCatagories();
listCollections();
