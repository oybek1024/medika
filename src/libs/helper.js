// this function work only for front-end
const checkDate = (dateStr /*dd/mm/yyyy*/) => {
    let arr = dateStr.split('/');
    let date = new Date(`${arr[1]}/${arr[0]}/${arr[2]}`); // mm/dd/yy
    let currentDate = Date.now();
    return arr && 
        arr.length == 3 && 
        arr[0].length == 2 && 
        arr[1].length == 2 && 
        arr[2].length == 4 &&
        date.getTime() && 
        (date.getTime() < currentDate)
}
const checkDateRDV = (dateStr /*dd/mm/yyyy*/) => {
    let arr = dateStr.split('/');
    let date = new Date(`${arr[1]}/${arr[0]}/${arr[2]}`); // mm/dd/yy
    return arr && 
        arr.length == 3 && 
        arr[0].length == 2 && 
        arr[1].length == 2 && 
        arr[2].length == 4 &&
        date.getTime()
}
// validate email, this is to avoid using external lib
const validEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// get absolute file path to view pdf on front-end
const getFileLink = (filename) => {
    return  process.env.VUE_APP_FILE_PREFIX + filename;
}


//  show date Rdv in format of: 5h30 Mercredi le 22/02/2020
const getRdv = (dateRDV /*yyyy/mm/dd:hh:mn*/) => {
    let dArr = dateRDV.split(':')[0].split('/');
    let yyyy = dArr[0];
    let mm = dArr[1];
    let dd = dArr[2];
    let hh = dateRDV.split(':')[1];
    let mn = dateRDV.split(':')[2];
    let dateObj = new Date(yyyy, mm-1, dd, hh, mn, 0);
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return  `${hh}h${mn} ${days[dateObj.getDay()]} ${dd}/${mm}/${yyyy}`;
};

//  show date Rdv in format of: Mercredi le 22/02/2020  à 5h30
const getRdvDossier = (dateRDV/*yyyy/mm/dd:hh:mn*/) => {
    let dArr = dateRDV.split(':')[0].split('/');
    let yyyy = dArr[0];
    let mm = dArr[1];
    let dd = dArr[2];
    let hh = dateRDV.split(':')[1];
    let mn = dateRDV.split(':')[2];
    let dateObj = new Date(yyyy, mm-1, dd, hh, mn, 0);
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return `${days[dateObj.getDay()]} ${dd}/${mm}/${yyyy} à ${hh}h${mn} `;
}

export {
    checkDate,
    checkDateRDV,
    validEmail,
    getFileLink,
    getRdv,
    getRdvDossier
}