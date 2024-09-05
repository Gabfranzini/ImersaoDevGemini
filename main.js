const lupa = document.querySelector(".header-search__lupa");
const searchInput = document.querySelector("#searchInput");
let isInputVisible = false;

lupa.addEventListener("click", () => {
  if (!isInputVisible) {
    searchInput.classList.add("active");
    isInputVisible = true;
    searchInput.focus();
  } else {
    const search = searchInput.value.trim();
    if (search) {
      window.location.href = `resultado.html?search=${encodeURIComponent(
        search
      )}`;
      fetchSearch(search);
    }
  }
});

function createCard(item) {
  const card = document.createElement("div");
  card.className = "filmes-cards__card";

  const img = document.createElement("img");
  img.setAttribute("src", item.imgUrl);
  img.setAttribute("alt", item.title);
  img.className = "responsive-img";

  const card_content = document.createElement("div");
  card_content.className = "filmes-cards__card-content";

  const type = document.createElement("span");
  type.textContent = item.type;

  const h3 = document.createElement("h3");
  h3.textContent = item.title + " (" + item.releaseYear + ")";

  const p = document.createElement("p");
  p.textContent = item.description;

  card_content.appendChild(type);
  card_content.appendChild(h3);
  card_content.appendChild(p);

  card.appendChild(img);
  card.appendChild(card_content);

  return card;
}

function fetchSearch(title) {
  const container = document.querySelector(".filmes-cards");
  container.innerHTML = "";

  function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const normalizedSearch = removeAccents(title.toLowerCase());

  const items = data.filter((item) => {
    const normalizedTitle = removeAccents(item.title.toLowerCase());
    return normalizedTitle.includes(normalizedSearch);
  });

  if (items.length > 0) {
    items.forEach((item) => {
      const card = createCard(item);
      container.appendChild(card);
    });
  } else {
    container.innerHTML =
      "<h2 class='none-found'>Nenhum título encontrado...</h2>";
  }
}
