
const functions = {
    //Crea un Nodo HTML a partir de un string - RetaxMaster
    createHTMLNode : html => {
        return document.createRange().createContextualFragment(html);
    },
    
    //Realiza una petición Ajax, recibe la url y el tipo de petición, opcionalmente recibe los datos a enviar  y el tipo de respuesta, por defecto está en text, puede recibir text o json - RetaxMaster
    ajax : (url, method, data = null, responseType = "text") => {
        return new Promise(async (resolve, reject) => {
            const params = (method.toUpperCase() == "GET") ? {} : {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                method: method.toUpperCase(),
                body: JSON.stringify(data)
            };
            
            try {
                let res = await fetch(url, params);
                res = await res.text();
        
                if (responseType == "text") {
                    resolve(res);
                }
                else {
                    resolve(JSON.parse(res));
                }
            } catch(e) {
                console.error(e);
                reject("Request failed.");
            }
        });
    },
    
    //Quita un elemento del DOM - RetaxMaster
    remove : selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.parentNode.removeChild(element);
        });
    },
    
    //Obtiene una cadena aleatoria - RetaxMaster
    getRandomString : length => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    },
    
    //Sanea un string - RetaxMaster
    filterString : (string, type) => {
        let sanitized;
        switch (type) {
            case 'string':
                sanitized = string.replace(/[^a-zA-Z0-9á-ú-A-Ú., \\W]/igm, "");
                break;
    
            case 'keep_html_characters':
                sanitized = string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                break;
    
            case 'remove_special_chars_low':
                sanitized = string.replace(/[^A-Za-z0-9á-úÁ-Ú., ?¿¡!.:;]/igm, "");
                break;
    
            case 'remove_special_chars_medium':
                sanitized = string.replace(/[^A-Za-z0-9á-úÁ-Ú., ?¿¡!]/igm, "");
                break;
    
            case 'remove_special_chars_high':
                sanitized = string.replace(/[^A-Za-z0-9á-úÁ-Ú ]|¿/igm, "");
                break;
    
            case 'keep_only_words':
                sanitized = string.replace(/\d/igm, "");
                break;
    
            case 'keep_only_numbers':
                sanitized = string.replace(/\D/igm, "");
                break;
    
            case 'email':
                sanitized = string.replace(/[^A-Za-z0-9á-úÁ-Ú@._\-]/igm, "");
                break;
    
            default:
                sanitized = string.trim();
                break;
        }
        return sanitized;
    },
    
    //Valida cualquier string - RetaxMaster
    validateString : (string, type) => {
        let validated;
        switch (type) {
            case 'email':
                validated = /^[A-Za-z0-9á-úÁ-Ú_\-]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/ig.test(string);
                break;
    
            case 'float':
                validated = /^\d+\.\d+$/.test(string);
                break;
    
            case 'int':
                validated = /^\d+$/.test(string);
                break;
    
            case 'ip':
                validated = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,4})?$/.test(string);
                break;
    
            case 'friendlyUrl':
                validated = /^(https?:\/\/)?[a-z]([a-z0-9\-]+[a-z0-9])?\.[a-z]([a-z0-9\-]+[a-z0-9])?\.[a-z]+(.[a-z]+)?\/?(\/[a-z]([a-z0-9\-]+[a-z])?\/?)+?$/.test(string);
                break;
    
            case 'url':
                const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
                validated = !!pattern.test(string);
                break;
    
            default:
                validated = false;
                break;
        }
        return validated;
    },
    
    //Quita acentos - RetaxMaster
    removeAccent : texto => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    },
    
    //Convierte un número en formato de moneda - RetaxMaster
    parseMoney : money => {
        return `$${money.toFixed(2)}`;
    },
    
    //Añade ceros a la izquierda - RetaxMaster
    addLeftZeros : (text, quantity) => {
        return text.padStart(quantity, "0");
    },
    
    //Quita los ceros a la izquierda - RetaxMaster
    removeLeftZeros : text => {
        return text.replace(/^0+/, "");
    },
    
    //Convierte un string a formato URL Amigable - RetaxMaster
    convertStringToUrl : word => {
        let wordCleaned;
        wordCleaned = functions.filterString(word, "remove_special_chars_high");
        wordCleaned = functions.filterString(wordCleaned, "string").split(" ").join("-");
        wordCleaned = functions.removeAccent(wordCleaned);
        wordCleaned = wordCleaned.toLowerCase();
        return wordCleaned;
    },
    
    //Simplifica un objeto en base a un índice dado (Puede ser un objeto de objetos) - RetaxMaster
    simplifyObject : (object, index) => {
        const newObject = {};
        let i = 0;
        for (const key in object) {
            newObject[i] = object[key][index];
            i++;
        }
        return newObject;
    },
    
    //Simplifica un array en base a un índice dado (Puede ser un array de arrays) - RetaxMaster
    simplifyArray : (array, index) => {
        const newArray = [];
        array.forEach(item => {
            newArray.push(item[index]);
        });
        return newArray;
    },

    //Convierte una array a fomrato URL amigable - RetaxMaster
    filterArrayUrl: (array) => {
        let newArray = [];
        array.forEach(item => {
            newArray.push(functions.convertStringToUrl(item));
        });
        return newArray;
    },
    
    //Restaura las palabras de la URL, recibe un arreglo a comparar como parámetro opcional, esto en en el caso de que, existan elementos en la URL que sea dificil restaurar, por ejemplo, las palabras con acentos, si se tiene una base, se puede comparar la palabra sin acento con alguna de las palabras con acento aplicando un poco de ingenieria inversa, devuelve una cadena vacía si no lo encuentra - RetaxMaster
    restoreUrlValue : (word, arrayToCompare = []) => {
        //Si envió un arreglo para hacer la comparación...
        if (arrayToCompare.length > 0) {
            //Primero creo un arreglo de todas las posibles palabras que puede contener (Al enviar el arreglo, se da por hecho de que la palabra si existe, solo hay que encontrarla) Por ello es que se transforma a cómo se vería en la URL
            
            const posibleWords = functions.filterArrayUrl(arrayToCompare);
    
            //En este punto, la posible palabra está dentro del arreglo $posibleWords, así que toca buscar su índice
            
            const index = posibleWords.indexOf(word);
    
            //En este punto ya encontré la palabra, así que solo queda retornar la palabra traducida de la siguiente forma:
            
            word = (index != -1) ? arrayToCompare[index] : "";
    
        } else {
            word = word.split("-").join(" ").capitalize();
        }
        return word;
    },
    
    //Añade los espacios de la URL(%20) - RetaxMaster
    addUrlSpaces : text => {
        return text.split(" ").join("%20");
    }
}

export default functions;