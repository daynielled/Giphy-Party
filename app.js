let APIKEY = "MLeYZV5YaF5bqJhC9QNVdQbFKZeGbnQj";

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchbtn");
    const deleteButton = document.getElementById("deleteBtn");
    const gifContainer = document.querySelector(".gif-container");

    searchButton.addEventListener("click", async ev => {
        ev.preventDefault();

        const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;
        const searchInput = document.getElementById("search").value.trim();

        try {
            const response = await fetch(url + searchInput);
            const content = await response.json();

            const fig = document.createElement("figure");
            const img = document.createElement("img");
            const fc = document.createElement("figcaption");
            const deleteBtn = document.createElement("button");

            img.src = content.data[0].images.downsized.url;
            img.alt = content.data[0].title;
            fc.textContent = content.data[0].title;
            deleteBtn.textContent = "x";
            deleteBtn.classList.add("delete-btn");

            fig.appendChild(img);
            fig.appendChild(fc);
            fig.appendChild(deleteBtn);
            gifContainer.insertAdjacentElement("afterbegin", fig);
            document.querySelector("#search").value = "";

            deleteBtn.addEventListener("click", () => {
                gifContainer.removeChild(fig);
            });
        } catch (error) {
            console.error(error);
        }
    });

    deleteButton.addEventListener("click", () => {
        gifContainer.innerHTML = "";
    });
});
