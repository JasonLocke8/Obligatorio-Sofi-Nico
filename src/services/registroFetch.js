const urlAPI = "https://movetrack.develotion.com/";

export const registroFetch = async (usuario, password, idPais) => {
  return fetch(`${urlAPI}usuarios.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario: usuario,
      password: password,
      idPais: idPais,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
      return error;
    });
};
