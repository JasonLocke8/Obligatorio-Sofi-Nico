const urlAPI = "https://movetrack.develotion.com/";
const apikey = localStorage.getItem('apiKey'); 
const iduser = localStorage.getItem('id'); 

export const obtenerUsuariosPorPais = async () => {
    return fetch(`${urlAPI}usuariosPorPais.php`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey' : apikey, 
            'iduser' : iduser
        }
    })
    .then( response => {
        return response.json();
    })
    .then(data => {
        return data; // CAPAZ HAY QUE PONER algo mas
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        //alert('Error en la solicitud');
    });

}