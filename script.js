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
        const icons = {
            star: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
            heart: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
            bell: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
            user: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
            search: "https://cdn-icons-png.flaticon.com/512/622/622669.png",
            settings: "https://cdn-icons-png.flaticon.com/512/2099/2099058.png"
        };
        return icons[type];
    }
}

const factory = new IconFactory();
let allIcons = [];
let chartInstance = null;

function loadIcons() {
    const container = document.getElementById("iconContainer");
    container.innerHTML = "";
    allIcons = [];

    let types = ["star", "heart", "bell", "user", "search", "settings"];

    for (let i = 0; i < 1000; i++) {
        let type = types[Math.floor(Math.random() * types.length)];

        let icon = factory.getIcon(type);
        let clone = icon.cloneNode(true);

        let card = document.createElement("div");
        card.classList.add("icon-card");
        card.setAttribute("data-type", type);

        card.onclick = () => showPopup(type, clone.src);

        card.appendChild(clone);
        container.appendChild(card);

        allIcons.push(card);
    }

    updateCount();
    drawChart();
}

function filterIcons() {
    let search = document.getElementById("search").value.toLowerCase();
    let filter = document.getElementById("filter").value;

    let visible = 0;

    allIcons.forEach(card => {
        let type = card.getAttribute("data-type");

        if ((filter === "all" || type === filter) && type.includes(search)) {
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

/* Popup */
function showPopup(type, src) {
    document.getElementById("popup").style.display = "block";
    document.getElementById("popupImg").src = src;
    document.getElementById("popupText").innerText = "Icon Type: " + type;
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

/* Dark Mode */
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

/* Chart */
function drawChart() {
    if (chartInstance) {
        chartInstance.destroy();
    }

    const ctx = document.getElementById("memoryChart");

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Without Flyweight", "With Flyweight"],
            datasets: [{
                label: "Number of Objects",
                data: [1000, Object.keys(factory.icons).length]
            }]
        }
    });
}