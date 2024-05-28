const socket = io();

const chatbox = document.querySelector("#chatbox");
const messagesLog = document.querySelector("#messages");

const loadChat = (chats) => {
  messagesLog.innerHTML = "";

  chats.forEach((chat) => {
    const item = document.createElement("li");
    item.textContent = `${chat.user} dice: ${chat.message}`;
    messagesLog.appendChild(item);
  });
};

// Cuando todo se carga, ejecuto este codigo
document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/chats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      socket.emit("initChat", data);
    })
    .catch((error) => {
      console.error("Error al cargar el listado:", error);
    });
});

const getUserName = async () => {
  try {
    const user = await Swal.fire({
      title: "Bienvenidos al Chat!",
      text: "Ingresa tu usuario para identificarte",
      input: "email",
      icon: "success",
      allowEscapeKey: false,
      allowOutsideClick: false,
    });

    socket.emit("newUser", { user: user.value });

    socket.on("userConnected", (user) => {
      Swal.fire({
        text: `Se acaba de conectar ${user.user}`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
      });
    });

    chatbox.addEventListener("keyup", (e) => {
      e.preventDefault();
      if (e.key === "Enter" && chatbox.value) {
        const data = {
          user: user.value,
          message: chatbox.value,
        };

        chatbox.value = "";

        // Guardo el mensaje en la DB
        fetch("/api/chats/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.status !== 200) {
              Swal.fire({
                text: `Sólo pueden enviar mensajes usuarios registrados y autorizados.`,
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "error",
              });
            } else {
              socket.emit("message", data);
            }
          })
          .catch((error) => console.log(error));
      }
    });
  } catch (error) {
    console.log(error);
  }
};

getUserName();

socket.on("messageLogs", function (chats) {
  loadChat(chats);
});
