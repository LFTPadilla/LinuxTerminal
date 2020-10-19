/*
 description Emulador de una terminal y varias máquinas en red usando Javascript
 author Julián Esteban Gutiérrez Posada y Carlos Eduardo Gomez Montoya
 email jugutier@uniquindio.edu.co carloseg@uniquindio.edu.co
 licence GNU General Public License  Ver. 4.0 (GNU GPL v4)
 date Septiembre 2020
 version 1.0
*/
var maquinas = [
    { Name: 'LinuxMint', Disk: '/mach0', IPNumber: '186.83.110.98', myUsers: [
            { Name: 'Luis', Login: 'luis', groups: [], Passwd: '123' },
            { Name: 'Alvaro', Login: 'alv', groups: [], Passwd: null },
            { Name: 'Felipe', Login: 'pipe', groups: [], Passwd: null },
            { Name: 'Sebastian', Login: 'sebas', groups: [], Passwd: null },
        ], myGroups: [
            { Name: 'luis' },
            { Name: 'alv' },
            { Name: 'pipe' },
            { Name: 'sebas' }
        ], myFiles: [{ Name: 'linuxMint.iso', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '14/11/2020' }, { Name: 'leeme.txt', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '20/12/2019' }, { Name: 'fotoPajaro.jpg', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '14/10/2020' }, { Name: 'compri2.zip', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '31/05/2019' }] },
    { Name: 'Majaro', Disk: '/mach1', IPNumber: '176.36.84.94', myUsers: [
            { Name: 'Luis', Login: 'luis', groups: [], Passwd: '123' },
            { Name: 'Alvaro', Login: 'alv', groups: [], Passwd: null },
            { Name: 'Felipe', Login: 'pipe', groups: [], Passwd: null },
            { Name: 'Sebastian', Login: 'sebas', groups: [], Passwd: null },
        ], myGroups: [
            { Name: 'luis' },
            { Name: 'alv' },
            { Name: 'pipe' },
            { Name: 'sebas' }
        ], myFiles: [{ Name: 'Majaro.iso', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '01/09/2020' }, { Name: 'leeme.txt', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '02/12/2020' }, { Name: 'foto.jpg', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '3/02/2019' }, { Name: 'compri.zip', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '04/06/2018' }] },
    { Name: 'Ubuntu', Disk: '/mach2', IPNumber: '160.83.18.19', myUsers: [
            { Name: 'Luis', Login: 'luis', groups: [], Passwd: '123' },
            { Name: 'Alvaro', Login: 'alv', groups: [], Passwd: null },
            { Name: 'Felipe', Login: 'pipe', groups: [], Passwd: null },
            { Name: 'Sebastian', Login: 'sebas', groups: [], Passwd: null },
        ], myGroups: [
            { Name: 'luis' },
            { Name: 'alv' },
            { Name: 'pipe' },
            { Name: 'sebas' }
        ], myFiles: [{ Name: 'Ubuntu.iso', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '05/09/2020' }, { Name: 'leeme.txt', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '06/12/2020' }, { Name: 'amazon.jpg', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '07/02/2019' }, { Name: 'video.zip', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '08/06/2018' }] },
    { Name: 'Fedora', Disk: '/mach3', IPNumber: '198.38.148.20', myUsers: [
            { Name: 'Luis', Login: 'luis', groups: [], Passwd: '123' },
            { Name: 'Alvaro', Login: 'alv', groups: [], Passwd: null },
            { Name: 'Felipe', Login: 'pipe', groups: [], Passwd: null },
            { Name: 'Sebastian', Login: 'sebas', groups: [], Passwd: null },
        ], myGroups: [
            { Name: 'luis' },
            { Name: 'alv' },
            { Name: 'pipe' },
            { Name: 'sebas' }
        ], myFiles: [{ Name: 'Fedora.iso', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '07/09/2020' }, { Name: 'leeme.txt', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '08/12/2020' }, { Name: 'logo.jpg', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '24/02/2019' }, { Name: 'archivito.zip', Owner: 'pipe', Group: 'pipe', permissions: '664', Date: '28/06/2018' }] }
];
IniciarConsola();
var machineSelected = 0;
var userLoging = null;
function IniciarConsola() {
    addConsola('Bienvenido');
    setTimeout(function () {
        addConsola('Iniciando consola en maquina ' + maquinas[machineSelected].Name);
        document.getElementById("machine").innerHTML = maquinas[machineSelected].Name;
        setTimeout(function () {
            var _a;
            addConsola('Por favor ingrese su usuario.');
            var u = new User('Sebastian', 'sebas', null, []);
            userLoging = u;
            limpiarConsola();
            (_a = document.getElementById("userLogued")) === null || _a === void 0 ? void 0 : _a.innerHTML = u.Login;
        }, 0);
    }, 0);
}
/**
 * Borra (limpia) todo el contenido de la consola (ver HTML)
 */
function limpiarConsola() {
    document.getElementById("textoImprimir").innerHTML = "";
}
/**
 * Adiciona una texto a la consola de la GUI (Ver HTML)
 * @param texto Texto que se desea adicionar al final de la consola.
*/
function addConsola(texto) {
    document.getElementById("textoImprimir").innerHTML += texto + '<br>';
    var consola = document.getElementById("consola");
    consola['scrollTop'] = consola === null || consola === void 0 ? void 0 : consola.scrollHeight;
}
function procesarEntrada(e) {
    if (e.keyCode == 13) {
        procesarComando(document.getElementById("entrada"));
        document.getElementById("entrada").value = '';
    }
}
function procesarComando(comando) {
    var _a;
    var comandoParametros = comando.value.split(" ");
    if (comandoParametros[0] == 'clear') {
        limpiarConsola();
        return;
    }
    if (!userLoging) {
        if (comandoParametros[0] == 'Login:') {
            maquinas[machineSelected].myUsers.forEach(function (user) {
                var _a;
                if (user.Login == comandoParametros[1]) {
                    if (user.Passwd) {
                        if (user.Passwd == comandoParametros[1]) {
                        }
                    }
                    else {
                        userLoging = user;
                        limpiarConsola();
                        (_a = document.getElementById("userLogued")) === null || _a === void 0 ? void 0 : _a.innerHTML = user.Login;
                    }
                }
            });
            if (!userLoging) {
                limpiarConsola();
                addConsola("El usuario no existe, vuelva a intentarlo.");
            }
        }
        else {
            addConsola("Primero debe Loguear un usuario (Login: usuario)");
            return;
        }
    }
    addConsola((userLoging === null || userLoging === void 0 ? void 0 : userLoging.Login) + "@" + maquinas[machineSelected].Name + "$ " + comando.value + "<br>");
    switch (comandoParametros[0]) {
        case "logout":
            userLoging = null;
            (_a = document.getElementById("userLogued")) === null || _a === void 0 ? void 0 : _a.innerHTML = '';
            break;
        case "touch":
            commandTouch(comandoParametros[1] ? comandoParametros[1] : '');
            break;
        case "sudo":
            sudo(comandoParametros);
            break;
        case "chown":
            addConsola('chown: permiso denegado');
            break;
        case "chmod":
            chmod(comandoParametros);
            break;
        case "ls":
            commandLs(comandoParametros[1] ? comandoParametros[1] == '-l' : false);
            break;
        case "cat":
            cat(comandoParametros);
            break;
        case "":
            break;
        case "":
            break;
        case "":
            break;
        case "":
            break;
        case "":
            break;
        default:
            console.log("No such day exists!");
            break;
    }
}
function commandLs(parametro) {
    if (parametro) {
        maquinas[machineSelected].myFiles.forEach(function (element) {
            var permInOctal = convertFormatPermissions(element.permissions);
            addConsola(permInOctal + " " + element.Owner + " " + element.Group + " " + element.Date + " " + element.Name);
        });
    }
    else {
        maquinas[machineSelected].myFiles.forEach(function (element) {
            addConsola(element.Name);
        });
    }
}
function commandTouch(nombre) {
    if (nombre == '') {
        addConsola('Por favor ingrese un nombre del archivo: touch nombre');
        return;
    }
    var exist = false;
    maquinas[machineSelected].myFiles.forEach(function (element) {
        if (element.Name == nombre) {
            exist = true;
            if (canWrite(userLoging, element)) {
                element.Date = new Date() + '';
            }
            else {
                addConsola('touch: no se puede efectuar ´touch´ sobre ´' + nombre + '´: Permiso denegado');
            }
        }
    });
    if (!exist) {
        var log = userLoging != undefined ? userLoging.Login : null;
        var newFile = new FileMachine(nombre, log, log, new Date() + '', '664');
        maquinas[machineSelected].myFiles.push(newFile);
    }
}
function sudo(parametros) {
    if (parametros.length > 1) {
        var comando = parametros[1];
        if (comando == "chown") {
            chown(parametros);
        }
    }
    else {
        addConsola('sudo: se esperaba un comando.');
    }
}
function chown(parameters) {
    if (parameters.length > 2) {
        var text = parameters[2].split(":");
        var owner = searchUser(text[0]);
        var group = searchGroup(text[1]);
        var file = searchFile(parameters[3]);
        if (file != null) {
            if (owner != null) {
                file.Owner = owner.Login;
            }
            else {
                addConsola('chown: Usuario inexistente: ' + text[0]);
            }
            if (group != null) {
                file.Group = group.Name;
            }
            else {
                addConsola('chown: grupo inexistente: ' + text[1]);
            }
        }
        else {
            addConsola('chown: no se puede acceder a ' + parameters[3] + ': No existe el fichero.');
        }
    }
}
function chmod(parameters) {
    if (parameters.length > 1) {
        var file = searchFile(parameters[2]);
        if (file != null) {
            if (canWrite(userLoging, file)) {
                if (parameters.length > 2) {
                    file.permissions = parameters[1];
                }
                else {
                    addConsola('chmod: se esperaban un archivo después de ' + parameters[1]);
                }
            }
            else {
                addConsola('chmod: no se puede modificar el fichero ' + file.Name + ': el usuario no tiene permiso de escritura.');
            }
        }
        else {
            addConsola('chmod: no se puede acceder a ' + parameters[2] + ': No existe el fichero.');
        }
    }
    else {
        addConsola('chmod: se esperaban más parametros');
    }
}
function cat(parameters) {
}
function searchUser(name) {
    var user;
    maquinas[machineSelected].myUsers.forEach(function (element) {
        if (element.Login == name) {
            user = element;
        }
    });
    return user;
}
function searchGroup(name) {
    var group;
    maquinas[machineSelected].myGroups.forEach(function (element) {
        if (element.Name == name) {
            group = element;
        }
    });
    return group;
}
function searchFile(name) {
    var file;
    maquinas[machineSelected].myFiles.forEach(function (element) {
        if (element.Name == name) {
            file = element;
        }
    });
    return file;
}
function convertFormatPermissions(permisos) {
    var aux = "-";
    if (permisos.length > 3) {
        return null;
    }
    for (var i = 0; i < 3; i++) {
        var valor = parseInt(permisos[i]);
        if (valor > 7) {
            return null;
        }
        if (valor >= 4) {
            aux += "r";
            valor -= 4;
        }
        else {
            aux += "-";
        }
        if (valor >= 2) {
            aux += "w";
            valor -= 2;
        }
        else {
            aux += "-";
        }
        if (valor >= 1) {
            aux += "x";
            valor -= 1;
        }
        else {
            aux += "-";
        }
    }
    return aux;
}
function canRead(user, archive) {
    if (archive.Owner === (user === null || user === void 0 ? void 0 : user.Login)) {
        //es el dueño
        return Number(archive.permissions.charAt(0)) >= 4;
    }
    else {
        //no es el dueño
        if (user === null || user === void 0 ? void 0 : user.groups.includes(archive.Owner + '')) {
            //Está en el grupo
            return Number(archive.permissions.charAt(1)) >= 4;
        }
        else {
            //No está en el grupo
            return Number(archive.permissions.charAt(2)) >= 4;
        }
    }
}
function canWrite(user, archive) {
    if (archive.Owner === (user === null || user === void 0 ? void 0 : user.Login)) {
        //es el dueño
        var x = Number(archive.permissions.charAt(0));
        return x == 2 || x == 3 || x == 6 || x == 7;
    }
    else {
        //no es el dueño
        if (user === null || user === void 0 ? void 0 : user.groups.includes(archive.Group + '')) {
            //Está en el grupo
            var x = Number(archive.permissions.charAt(1));
            return x == 2 || x == 3 || x == 6 || x == 7;
        }
        else {
            //No está en el grupo
            var x = Number(archive.permissions.charAt(2));
            return x == 2 || x == 3 || x == 6 || x == 7;
        }
    }
}
function canExecute(user, archive) {
    if (archive.Owner === (user === null || user === void 0 ? void 0 : user.Login)) {
        //es el dueño
        var x = Number(archive.permissions.charAt(0));
        return x % 2;
    }
    else {
        //no es el dueño
        if (user === null || user === void 0 ? void 0 : user.groups.includes(archive.Group + '')) {
            //Está en el grupo
            var x = Number(archive.permissions.charAt(1));
            return x % 2;
        }
        else {
            //No está en el grupo
            var x = Number(archive.permissions.charAt(2));
            return x % 2;
        }
    }
}
var Machine = /** @class */ (function () {
    //public userRoot: User|null = ;
    function Machine(Name, IPNumber, Disk) {
        this.Name = Name;
        this.IPNumber = IPNumber;
        this.Disk = Disk;
        this.myFiles = [];
        this.myUsers = [];
        this.myGroups = [];
        //this.userRoot = new User('Administrador',"root", null );
    }
    return Machine;
}());
var FileMachine = /** @class */ (function () {
    function FileMachine(Name, Owner, Group, Date, permissions) {
        this.Name = Name;
        this.Owner = Owner;
        this.Group = Group;
        this.Date = Date;
        this.permissions = permissions;
    }
    return FileMachine;
}());
var User = /** @class */ (function () {
    function User(Name, Login, Passwd, groups) {
        if (groups === void 0) { groups = []; }
        this.Name = Name;
        this.Login = Login;
        this.Passwd = Passwd;
        this.groups = groups;
        this.groups.push(Name);
    }
    return User;
}());
var Group = /** @class */ (function () {
    function Group(Name) {
        this.Name = Name;
    }
    return Group;
}());
