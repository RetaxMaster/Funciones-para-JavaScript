/*

Clase creada por RetaxMaster, esta clase maneja el DOM

*/

class FamilyJewels {

    constructor(elements) {
        this.elements = Array.from(elements).unique();
    }

    // Accede a un elemento padre - RetaxMaster
    parent() {
        const allParents = [];
        this.elements.forEach(element => {
            allParents.push(element.parentNode);
        });
        return new FamilyJewels(allParents);
    }

    //Accede a un elementro hijo, recibe un selector y se indica si se desea buscar en todos los niveles de hijos o solo en uno - RetaxMaster
    children(selector = "", searchInAllLevels = false) {
        const elements = Array.from(this.elements);
        const allChildrens = [];
        //Se recorre cada padre
        elements.forEach(element => {
            if (searchInAllLevels) {
                //Si pidio buscar en todos los niveles entonces buscamos y recorremos cada children
                element.querySelectorAll(selector).forEach(element => {
                    allChildrens.push(element);
                });
            }
            else {
                //Si no pidio buscar en todos los niveles entonces buscamos en cada hijo de este padre
                const availableElements = Array.from(element.querySelectorAll(selector));

                Array.from(element.children).forEach(child => {
                    let canPush = (selector != "") ? false : true;

                    //Esto significa que si hay un selector, por lo que debemos validar para ver si coincide con el criterio de búsqueda
                    if (!canPush) canPush = availableElements.includes(child)

                    if (canPush) allChildrens.push(child);
                });
            }
        });
        return new FamilyJewels(allChildrens);
    }

    //Accede al siguiente elemento - RetaxMaster
    next() {
        const allNextElements = [];
        
        this.elements.forEach(element => {
            const parentOfThisElement = element.parentNode;
            const indexOfThisElement = Array.from(parentOfThisElement.children).indexOf(element);
            allNextElements.push(parentOfThisElement.children[indexOfThisElement + 1]);
        });
        return new FamilyJewels(allNextElements);
    }

    //Accede al elemento anterior - RetaxMaster
    prev() {
        const allNextElements = [];

        this.elements.forEach(element => {
            const parentOfThisElement = element.parentNode;
            const indexOfThisElement = Array.from(parentOfThisElement.children).indexOf(element);
            allNextElements.push(parentOfThisElement.children[indexOfThisElement - 1]);
        });
        return new FamilyJewels(allNextElements);
    }

    //Itera en cada elemento - RetaxMaster
    each(callback) {
        this.elements.forEach(element => {
            callback(element);
        });
    }

    //Inserta un nodo - RetaxMaster
    push(nodo) {
        this.elements.push(nodo);
        return new FamilyJewels(this.elements);
    }

    //Retorna el elemento como tal - RetaxMaster
    get(index) {
        return this.elements[index];
    }
}

export default function(selector) {
    const object = (typeof selector == "string") ? document.querySelectorAll(selector) : selector;
    return new FamilyJewels(object);
}