const urlAPI = "https://movetrack.develotion.com/";

export const obtenerRegistros = async () => {
  const apikey = localStorage.getItem("apiKey");
  const iduser = localStorage.getItem("id");

  return fetch(`${urlAPI}registros.php?idUsuario=${iduser}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: apikey,
      iduser: iduser,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.registros;
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
};
