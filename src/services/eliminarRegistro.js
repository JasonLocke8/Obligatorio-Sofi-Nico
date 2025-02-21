const urlAPI = "https://movetrack.develotion.com/";
// const apikey = localStorage.getItem('apiKey'); 
// const iduser = localStorage.getItem('id'); 

export const eliminarRegistro = async(idRegistro, apikey, iduser) => {
    return fetch(`${urlAPI}registros.php?idRegistro=${idRegistro}`, {
        method: 'DELETE',
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
        return data; // CAPAZ HAY QUE PONER data.nombre o algo asi
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        //alert('Error en la solicitud');
    });
}
