class IconFactory {
    constructor() {
        this.icons = {};
    }

    getIcon(type) {
        if (!this.icons[type]) {
            let img = document.createElement("img");
            img.src = this.getPath(type);
            img.classList.add("icon");
            this.icons[type] = img;
        }
        return this.icons[type];
    }

    getPath(type) {
        if (type === "star")
            return "https://cdn-icons-png.flaticon.com/512/1828/1828884.png";
        if (type === "heart")
            return "https://cdn-icons-png.flaticon.com/512/833/833472.png";
    }
}

const factory = new IconFactory();
let allIcons = [];

function loadIcons() {
    const container = document.getElementById("iconContainer");
    container.innerHTML = "";
    allIcons = [];

    let types = ["star", "heart"];

    for (let i = 0; i < 1000; i++) {
        let type = types[Math.floor(Math.random() * types.length)];

        let icon = factory.getIcon(type);
        let clone = icon.cloneNode(true);

        let card = document.createElement("div");
        card.classList.add("icon-card");
        card.setAttribute("data-type", type);

        card.appendChild(clone);
        container.appendChild(card);

        allIcons.push(card);
    }

    updateCount();
}

function filterIcons() {
    let search = document.getElementById("search").value.toLowerCase();
    let filter = document.getElementById("filter").value;

    let visible = 0;

    allIcons.forEach(card => {
        let type = card.getAttribute("data-type");

        let matchSearch = type.includes(search);
        let matchFilter = (filter === "all" || type === filter);

        if (matchSearch && matchFilter) {
            card.style.display = "block";
            visible++;
        } else {
            card.style.display = "none";
        }
    });

    document.getElementById("count").innerText = "Icons: " + visible;
}

function updateCount() {
    document.getElementById("count").innerText = "Icons: " + allIcons.length;
}