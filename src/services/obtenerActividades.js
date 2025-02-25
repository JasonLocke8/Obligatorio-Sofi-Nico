const urlAPI = "https://movetrack.develotion.com/";

export const obtenerActividades = async () => {
  const apiKey = localStorage.getItem("apiKey");
  const iduser = localStorage.getItem("id");

  if (!apiKey || !iduser) {
    console.error("No se ha iniciado sesión");
    return;
  }

  try {
    const response = await fetch(`${urlAPI}actividades.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        iduser: iduser,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.codigo === 200) {
      return data.actividades;
    } else {
      console.error("Error en la respuesta de la API:", data);
      return data;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};
