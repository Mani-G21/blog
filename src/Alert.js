export function Alert(type, message){
    const divElement = document.createElement('div');
    divElement.className = `alert alert-${type}`;
    divElement.innerHTML = message;
    return(divElement);
}