/* eslint-disable no-unused-vars */
const urlAPI = "https://movetrack.develotion.com/";

export const obtenerRegistros = async () => {
  const apikey = localStorage.getItem("apiKey");
  const iduser = localStorage.getItem("id");
  //   console.log(iduser);
  //   console.log(apikey);

  return fetch(`${urlAPI}registros.php?idUsuario=${iduser}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: apikey,
      iduser: iduser,
    },
  })
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data.registros;
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
      //alert('Error en la solicitud');
    });
};
