const button = document.getElementById("randomBtn");
const charName = document.getElementById("name");
const charImage = document.getElementById("image");
const charTypes = document.getElementById("types");
const charAbilities = document.getElementById("abilities");
const cryBtn = document.getElementById("cryBtn");
const card = document.getElementById("card");
const loadingEl = document.getElementById("loading");
const page = document.getElementById("page");

let cryAudio = null;

button.addEventListener("click", getRandomPokemon);
cryBtn.addEventListener("click", () => cryAudio && cryAudio.play());

getRandomPokemon();

const typeColors = {
    normal:"#919ba3",
    fire:"#ff9741",
    water:"#3592dc",
    electric:"#fbd100",
    grass:"#38bf4b",
    ice:"#4dd1c0",
    fighting:"#e0306a",
    poison:"#b667cf",
    ground:"#e87236",
    flying:"#89aae3",
    psychic:"#fe6675",
    bug:"#83c300",
    rock:"#c7b685",
    ghost:"#4c69b1",
    dragon:"#016fc9",
    dark:"#5c5467",
    steel:"#5b8ea4",
    fairy:"#fb8aeb"
}

async function getRandomPokemon() {
    const randomID = Math.floor(Math.random() * 1025) + 1;
    loadingEl.classList.remove("d-none");
    charImage.classList.add("d-none");
    charTypes.innerHTML = "";
    charAbilities.innerHTML = "";

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}`);
        const data = await response.json();

        charName.textContent = data.name;
        charImage.src = data.sprites.other["official-artwork"].front_default;
        charImage.classList.remove("d-none");

        data.types.forEach(t => {
            const typeName = t.type.name;
            const badge = document.createElement("span");
            badge.className = "badge";
            badge.style.backgroundColor = typeColors[typeName];
            badge.textContent = typeName.toUpperCase();
            charTypes.appendChild(badge);
        })

        data.abilities.forEach(t => {
            const abilityName = t.ability.name;
            charAbilities.textContent += abilityName + " ";
        })

        const types = data.types.map(t => t.type.name);

        if (types.length === 1) {
            page.style.background = `linear-gradient(135deg, ${typeColors[types]}, #ffffff)`;
        } else {
            page.style.background = `linear-gradient(135deg, ${typeColors[types[0]]}, ${typeColors[types[1]]}`;
        }

        if(data.cries && data.cries.latest) {
            cryAudio = new Audio(data.cries.latest);
            cryBtn.classList.remove("d-none");
        }

    }catch (error) {
        charName.textContent = "Failed to load Pokémon"
        console.error(error)

    }finally {
        loadingEl.classList.add("d-none");
    }
}