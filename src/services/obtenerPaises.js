const urlAPI = "https://movetrack.develotion.com/";

export const obtenerPaises = async () => {
    return fetch(`${urlAPI}paises.php`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( response => {
        return response.json();
    })
    .then(data => {
        return data.paises; 
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        //alert('Error en la solicitud');
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        //alert('Error en la solicitud');
    });
    
}