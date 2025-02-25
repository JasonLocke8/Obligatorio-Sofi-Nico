const urlAPI = "https://movetrack.develotion.com/";

export const registroActividad = async (idActividad, tiempo, fecha) => {
  const apikey = localStorage.getItem("apiKey");
  const iduser = localStorage.getItem("id");

  return fetch(`${urlAPI}registros.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: apikey,
      iduser: iduser,
    },
    body: JSON.stringify({
      idActividad: idActividad,
      idUsuario: iduser,
      tiempo: tiempo,
      fecha: fecha,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.codigo === 200) {
        console.log("Actividad registrada con éxito:", data);
        return data;
      } else {
        console.error("Error al registrar actividad:", data);
      }
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
};
