// Flyweight Factory
class IconFactory {
    constructor() {
        this.icons = {};
    }

    getIcon(type) {
        if (!this.icons[type]) {
            let img = document.createElement("img");
            img.src = this.getIconPath(type);
            this.icons[type] = img;
        }
        return this.icons[type];
    }

    getIconPath(type) {
        switch(type) {
            case "star": return "https://cdn-icons-png.flaticon.com/512/1828/1828884.png";
            case "heart": return "https://cdn-icons-png.flaticon.com/512/833/833472.png";
            default: return "https://cdn-icons-png.flaticon.com/512/1828/1828884.png";
        }
    }
}

const factory = new IconFactory();

function loadIcons() {
    const container = document.getElementById("iconContainer");
    container.innerHTML = "";

    let types = ["star", "heart"];

    for (let i = 0; i < 1000; i++) {
        let type = types[Math.floor(Math.random() * types.length)];

        // Get shared icon (Flyweight)
        let icon = factory.getIcon(type);

        // Clone for display (lightweight)
        let clone = icon.cloneNode(true);
        clone.classList.add("icon");

        container.appendChild(clone);
    }
}