document.getElementById("userForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    const formData = new FormData(this); // Get form data

    const responseMessage = document.getElementById("responseMessage");

    try {
        const response = await fetch("/submit", {
            method: "POST",
            body: formData, // Send form data to Express.js backend
        });

        const result = await response.json();

        if (response.ok) {
            responseMessage.textContent = result.message;
            responseMessage.style.color = "green";
            this.reset(); // Reset form after successful submission
        } else {
            responseMessage.textContent = "Error: " + result.error;
            responseMessage.style.color = "red";
        }

    } catch (error) {
        responseMessage.textContent = "Error submitting form.";
        responseMessage.style.color = "red";
    }
});
