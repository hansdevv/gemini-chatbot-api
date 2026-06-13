// Ini akan menyimpan riwayat dalam array [{role, text}, {role, text}]
let chatHistory = [];

const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");

// Konfigurasi marked.js untuk keamanan (mencegah HTML berbahaya diinject)
marked.setOptions({
  headerIds: false,
  mangle: false,
  sanitize: true, // Sanitasi input Markdown
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("user", userMessage);
  input.value = "";
  sendBtn.disabled = true; // Nonaktifkan tombol saat loading

  chatHistory.push({ role: "user", text: userMessage });

  const botMessageWrapper = document.createElement("div");
  botMessageWrapper.classList.add("message-wrapper", "bot");

  const botMessageElement = document.createElement("div");
  botMessageElement.classList.add("message", "bot", "thinking");
  const botAvatarHtml = '<span class="bubble-bot-avatar">🤖</span>';
  botMessageElement.innerHTML = `${botAvatarHtml}`;
  botMessageWrapper.appendChild(botMessageElement);
  chatBox.appendChild(botMessageWrapper);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation: chatHistory, // Kirim seluruh array riwayat
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error || response.statusText;
      throw new Error(`Server error: ${errorMessage}`);
    }

    const data = await response.json();

    // Hapus status 'thinking'
    botMessageElement.classList.remove("thinking");
    botMessageElement.innerHTML = botAvatarHtml;

    if (data && data.result) {
      const formattedHtml = marked.parse(data.result);
      botMessageElement.innerHTML = `<span class="bubble-bot-avatar">🤖</span><div class="bot-response">${formattedHtml}</div>`;

      chatHistory.push({ role: "bot", text: data.result });
    } else {
      botMessageElement.textContent = "Sorry, no response received";
    }
  } catch (error) {
    console.error("Error fetching response: ", error);
    botMessageElement.classList.remove("thinking");
    botMessageElement.textContent = `Failed to get response: ${error.message}`;
  } finally {
    sendBtn.disabled = false; // Aktifkan kembali tombol
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});

function appendMessage(sender, text) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("message-wrapper", sender);

  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  wrapper.appendChild(msg);
  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}
