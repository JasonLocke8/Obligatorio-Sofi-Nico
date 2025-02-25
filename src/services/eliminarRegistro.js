const urlAPI = "https://movetrack.develotion.com/";

export const eliminarRegistro = async (idRegistro, apikey, iduser) => {
  return fetch(`${urlAPI}registros.php?idRegistro=${idRegistro}`, {
    method: "DELETE",
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
      return data;
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
};
