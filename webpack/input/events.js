export default {
    //Establece el evento a un único nodo, recibe el evento, un objeto de tipo nodo y un callback - RetaxMaster
    eventOne : (event, element, callback, getThis = false) => {
        if (getThis) {
            element.addEventListener(event, () => {
                callback(element);
            });
        }
        else {
            element.addEventListener(event, callback);
        }
    },
    
    //Establece un evento a todos los elementos que sean pasados mediante el selector CSS, recibe el evento, el selector (O también puede ser un objeto de tipo nodo) y un callback - RetaxMaster
    event : (event, elements, callback, getThis = false) => {
        if ((typeof elements == "string")) {
            elements = document.querySelectorAll(elements);
            elements.forEach(element => {
                eventOne(event, element, callback, getThis);
            });
        }
        else {
            eventOne(event, elements, callback, getThis);
        }
    },
    
    //Establece un evento a todos los elementos del padre que sean pasados mendiante el selector CSS, esta función se puede usar para darle eventos a los items añadidos dinamicamente con JavaScript, recibe el evento, el elemento padre en el cual se buscará el hijo, el elemento hijo el cual tendrá el evento y un callback - RetaxMaster
    //.test .me
    eventAll : (event, parentElement, element, callback) => {
        const addEventToChildrens = parent => {
            parent.addEventListener(event, e => {;
                const availableElements = Array.from(parent.querySelectorAll(element));
                e.path.every(children => {
                    if (availableElements.includes(children)) {
                        callback(children);
                        return false;
                    }
                    return true;
                });
            });
        }
    
        if (typeof parentElement == "string") {
            parentElement = document.querySelectorAll(parentElement);
            parentElement.forEach(parent => {
                addEventToChildrens(parent);
            });
        }
        else{
            addEventToChildrens(parentElement);
        } 
    }
}

