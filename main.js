const openMenuButton = document.getElementById("openBurgerMenuDialog");
const closeMenuButton = document.querySelector(".close-menu__button");
const dialog = document.querySelector(".burger-menu--open");
const lightboxBigImage = document.querySelector(".lightbox__big-image");
const modalDialog = document.querySelector(".modal__dialog");
const closeModalButton = document.querySelector(".modal__close");
const checkOut = document.querySelector(".cart__checkout");
const headerCart = document.querySelector(".header__cart");
const mainImage = document.querySelector(".lightbox__big-image");
const thumbnails = document.querySelectorAll(".thumbnail--focus");
const previusImageBtn = document.querySelector(".lightbox__icon--prev");
const nextImageBtn = document.querySelector(".lightbox__icon--next");
const modalMainImage = document.querySelector(".modal__image--main");
const modalPrevBtn = document.querySelector(".modal__icon--prev");
const modalNextBtn = document.querySelector(".modal__icon--next");
const modalThumbnails = document.querySelectorAll(".modal__thumbnail");
const cartMinusBtn = document.querySelector(".product-quantity__minus");
const cartPlusBtn = document.querySelector(".product-quantity__plus");
const cartQuantity = document.querySelector(".product-quantity__value");
const cartCheckoutQuantity = document.querySelector(".data-quantity");
const cartCheckoutTotal = document.querySelector(".total-price");
const cartCheckoutEmpty = document.querySelector(".cart__checkout__empty");
const cartCheckoutFill = document.querySelector(".cart__checkout__fill");
const checkOutBtn = document.querySelector(".Checkout__button");
const addToCartBtn = document.querySelector(".product__add-to-cart");

// // BURGER MENU
openMenuButton.addEventListener("click", () => {
  dialog.showModal();
  openMenuButton.setAttribute("aria-expanded", "true");
});

closeMenuButton.addEventListener("click", () => {
  dialog.close();
  openMenuButton.setAttribute("aria-expanded", "false");
});

// LIGHTBOX MODAL
lightboxBigImage.addEventListener("click", () => {
  console.log("click");
  if (!modalDialog.open) {
    // Vérifie si le dialog est fermé
    modalDialog.showModal();
  }
});

closeModalButton.addEventListener("click", () => {
  if (modalDialog.open) {
    // Vérifie si le dialog est ouvert
    modalDialog.close();
  }
});

// CART CHECKOUT HEADER
headerCart.addEventListener("click", () => {
  checkOut.classList.toggle("hidden");
  if (checkOut.classList.contains("hidden")) {
    checkOut.setAttribute("aria-hidden", "true");
  } else {
    checkOut.setAttribute("aria-hidden", "false");
  }
});

// Handle the focussability of the modal under width: 47.75em
const mediaQuery = window.matchMedia("(max-width: 47.75rem)");
function handleModalVisibility() {
  if (mediaQuery.matches) {
    lightboxBigImage.style.pointerEvents = "none";
    modalDialog.style.visibility = "hidden";
    modalDialog.setAttribute("tabindex", "-1");
    modalDialog.style.pointerEvents = "none";
    modalDialog.close();
  } else {
    dialog.close();
    modalDialog.style.visibility = "visible";
    modalDialog.setAttribute("tabindex", "0");
    modalDialog.style.pointerEvents = "auto";
    lightboxBigImage.style.pointerEvents = "auto";
  }
}

mediaQuery.addEventListener("change", handleModalVisibility);
handleModalVisibility();

// Fonction to change big image when you click on mini gallery
// Tableau d'objets pour les images
const images = [
  { src: "./images/image-product-1.jpg", alt: "Main Image 1" },
  { src: "./images/image-product-2.jpg", alt: "Main Image 2" },
  { src: "./images/image-product-3.jpg", alt: "Main Image 3" },
  { src: "./images/image-product-4.jpg", alt: "Main Image 4" },
];

// Suivi de l'index de l'image actuellement affichée
let currentIndex = 0;

// Fonction pour mettre à jour l'image principale
function updateMainImage(index) {
  mainImage.src = images[index].src;
  mainImage.alt = images[index].alt;
}

// Ajout des écouteurs de clic pour les miniatures
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    currentIndex = index;
    updateMainImage(currentIndex);
  });
});

// Fonction pour naviguer vers l'image précédente
previusImageBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateMainImage(currentIndex);
});

// Fonction pour naviguer vers l'image suivante
nextImageBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateMainImage(currentIndex);
});

// Modal Gallery fonction click listener
function updateModalMainImage(index) {
  modalMainImage.src = images[index].src;
  modalMainImage.alt = images[index].alt;
}

// Ajout des écouteurs de clic pour les miniatures
modalThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    currentIndex = index;
    updateModalMainImage(currentIndex);
  });
});

// Fonction pour naviguer vers l'image précédente
modalPrevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateModalMainImage(currentIndex);
});

// Fonction pour naviguer vers l'image suivante
modalNextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateModalMainImage(currentIndex);
});

// ----------------SHOPPING PART ------------------------

let headerCartIndex = 0;
let cartIndex = 0;
emptyCart();
updateHeaderCartIndex(headerCartIndex);

// fonction de mise a jour de la quantité à ajouter dans le panier
function updateCartQuantity(value) {
  cartQuantity.textContent = value;
}

//Fonction d'écoute des boutons + -
cartMinusBtn.addEventListener("click", () => {
  if (cartIndex > 0) {
    cartIndex = cartIndex - 1;
    updateCartQuantity(cartIndex);
  }
});

cartPlusBtn.addEventListener("click", () => {
  cartIndex = cartIndex + 1;
  updateCartQuantity(cartIndex);
});

// fonction de mise a jour de la quantité du produit dans le panier du header
function updateHeaderCheckoutQuantity(value) {
  cartCheckoutQuantity.textContent = value;
}

// fonction de mise a jour du prix total
function checkoutTotal() {
  cartCheckoutTotal.textContent = "$" + (headerCartIndex * 125).toFixed(2);
}

// fonction de mise a jour de l'index du header
function updateHeaderCartIndex() {
  headerCartIndex = cartIndex;
}

// fonction de mise a jour de l'indicateur de produits dans le panier
function updateHeaderCartQuantity(value) {
  headerCart.dataset.quantity = value;
}

// fonction de mise à jour de la quantité dans le panier dans le header
function updateHeaderCartIconQuantity(headerCartIndex) {
  if (headerCartIndex === 0) {
    headerCart.classList.add("tohide");
  } else {
    headerCart.classList.remove("tohide");
  }
  updateHeaderCartQuantity(headerCartIndex);
}

// fonction pour écouter le bouton ajouter au panier
addToCartBtn.addEventListener("click", () => {
  updateHeaderCartIndex();
  updateHeaderCartIconQuantity(headerCartIndex);
  updateHeaderCheckoutQuantity(headerCartIndex);
  checkoutTotal();
  emptyCart();
});

// fonction pour cacher le cartCheckout si l'index est égale à 0 ;
function emptyCart() {
  if (headerCartIndex === 0) {
    cartCheckoutEmpty.classList.remove("hidden");
    cartCheckoutFill.classList.add("hidden");
  } else {
    cartCheckoutEmpty.classList.add("hidden");
    cartCheckoutFill.classList.remove("hidden");
  }
}

// fonction de reset quand checkout bouton est clické
checkOutBtn.addEventListener("click", () => {
  headerCartIndex = 0;
  cartIndex = 0;
  updateHeaderCartIndex(headerCartIndex);
  emptyCart(cartIndex);
  updateHeaderCartIconQuantity(headerCartIndex);
  updateHeaderCartQuantity(headerCartIndex);
  updateCartQuantity(cartIndex);
  console.log("ça clique");
});
