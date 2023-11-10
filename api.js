document.addEventListener("DOMContentLoaded", function () {
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => response.json())
    .then((data) => {
      const apiDataContainer = document.getElementById("api-data");

      data.forEach((userdata) => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";

        const cardBody = `
                    <div class="card border border-dark text-center">
                        <div class="card-body">
                            <h2 class="card-title fs-2 fw-bolder text-truncate">${userdata.name}</h2>
                            <p class="card-text">${userdata.body}</p>
                            <p class="card-text"><small class="text-muted">${userdata.email}</small></p>
                        </div>
                    </div>
                `;

        card.innerHTML = cardBody;
        apiDataContainer.appendChild(card);
      });
    })
    .catch((error) => {
      const errorMessageContainer = document.getElementById("error-message");
      errorMessageContainer.style.display = "block";
      errorMessageContainer.textContent = `Error: ${error.message}`;
    });
});
