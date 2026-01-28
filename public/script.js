const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("user", userMessage);
  input.value = "";

  const botMessageElement = document.createElement("div");
  botMessageElement.classList.add("message", "bot");
  botMessageElement.textContent = "Gemini is Thinking...";
  chatBox.appendChild(botMessageElement);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation: [{ role: "user", text: userMessage }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error || response.statusText;
      throw new Error(`Server error: ${errorMessage}`);
    }

    const data = await response.json();

    if (data && data.result) {
      botMessageElement.textContent = data.result;
    } else {
      botMessageElement.textContent = "Sorry, no response received";
    }
  } catch (error) {
    console.error("Error fetching response: ", error);
    botMessageElement.textContent = "Failed to get response from server.";
  } finally {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
