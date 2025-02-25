const urlAPI = "https://movetrack.develotion.com/";

export const loginFetch = async (usuario, password) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify({
    usuario: usuario,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: body,
  };

  return fetch(`${urlAPI}login.php`, requestOptions)
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      return data;
    })

    .catch((error) => {
      console.log("Error: " + error);
      throw new Error(error.mensaje ? error.mensaje : "Hubo un error");
    });
};
