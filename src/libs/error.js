const upload_fail = () => {
    return `Soumission de document n'a pas réussi`;
}
const is_empty = (name) => {
    return `${name} manquant`;
}
const max_length = (nb) => {
    return `doit être mois de ${nb} caractère`;
}
const wrong_format = (name) => {
    return `${name} n'est pas en bon format`;
}

const wrong_date_format = (name) => {
    return `${name} n'est pas en bon format jj/mm/aaaa`;
}

const auth_fail = () => "Echec d'identification, vérifiez votre information";
const update_fail = () => "Echec de mis a jour, vérifiez votre information";


export default { 
    upload_fail,
    is_empty,
    max_length,
    wrong_format,
    wrong_date_format,
    auth_fail,
    update_fail
}