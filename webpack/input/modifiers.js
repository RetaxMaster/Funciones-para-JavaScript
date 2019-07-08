//Establece en mayúscula la primera letra de un string - RetaxMaster
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

//Encripta una cadena de texto - RetaxMaster
String.prototype.encrypt = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

//Retorna si una cadena está vacia - RetaxMaster
String.prototype.empty = function() {
  return this == "";
};

//Quita todos los espacios de una cadena - RetaxMaster
String.prototype.removeSpaces = function() {
    return this.trim().split(" ").join("");
}

//Elimina elementos duplicados de un array - RetaxMaster
Array.prototype.unique = function () {
    return this.filter(function (a, b, c) { return c.indexOf(a, b + 1) < 0 })
};

//Quita ceros o valores vacios de un array - RetaxMaster
Array.prototype.removeEmptyValues = function () {
    return this.filter(function(item) {
        return item != 0 || item != "";
    });
}