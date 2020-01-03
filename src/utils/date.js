import moment from 'moment';

export const getDate = () => {
    // return moment().format('dd M[/]D[/]YY');
    return Date.now();
}

export const formatDate = (dateNum) => {
    return moment(dateNum).format('dd M[/]D[/]YY');
}