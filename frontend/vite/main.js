import "./style.css";

document.getElementById("fetch-user").addEventListener("click", () => {
    fetch("http://localhost:8000/api/user_list")
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("result").textContent = JSON.stringify(
                data,
                null,
                2
            );
        })
        .catch((error) => {
            console.error("Error fetching user:", error);
        });
});
