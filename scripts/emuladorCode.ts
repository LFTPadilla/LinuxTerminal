/*
 description Emulador de una terminal y varias máquinas en red usando Javascript
 author Álvaro Sebastián Tabares Gaviria y Luis Felipe Tejada Padilla
 email astabaresg@uqvirtual.edu.co lftejadap@uqvirtual.edu.co
 licence GNU General Public License  Ver. 4.0 (GNU GPL v4)
 date octubre 2020
 version 2.0
*/

let maquinas: Machine[] = [
	{Name: 'LinuxMint', Disk:'/mach0', IPNumber:'186.83.110.98', myUsers: [ 
	{Name:'Luis',Login:'luis',groups:[],Passwd:'123'},
	{Name:'Alvaro',Login:'alv',groups:[],Passwd: null},
	{Name:'Felipe',Login:'pipe',groups:[],Passwd:null},
	{Name:'Sebastian',Login:'sebas',groups:[],Passwd:null},
] , myGroups: [ 
	{Name:'luis'},
	{Name:'alv'},
	{Name:'pipe'},
	{Name:'sebas'}
] ,myFiles: [{Name:'linuxMint.iso', Owner:'sebas', Group:'sebas',permissions:'664', Date:'14/11/2020'},{Name:'leeme.txt', Owner:'pipe', Group:'pipe',permissions:'664', Date:'20/12/2019'},{Name:'fotoPajaro.jpg', Owner:'pipe', Group:'pipe',permissions:'664', Date:'14/10/2020'},{Name:'compri2.zip', Owner:'luis', Group:'luis',permissions:'664', Date:'31/05/2019'}]},
	{Name: 'Majaro', Disk:'/mach1', IPNumber:'176.36.84.94', myUsers: [ 
	{Name:'Luis',Login:'luis',groups:[],Passwd:'123'},
	{Name:'Tabares',Login:'taba',groups:[],Passwd: null},
	{Name:'Carlos',Login:'carlos',groups:[],Passwd:null},
	{Name:'Julian',Login:'julian',groups:[],Passwd:null},
] , myGroups: [ 
	{Name:'luis'},
	{Name:'taba'},
	{Name:'carlos'},
	{Name:'julian'}
] ,myFiles: [{Name:'Manjaro.iso', Owner:'luis', Group:'luis',permissions:'664', Date:'01/09/2020'},{Name:'about.txt', Owner:'taba', Group:'taba',permissions:'664', Date:'02/12/2020'},{Name:'foto.jpg', Owner:'taba', Group:'taba',permissions:'664', Date:'3/02/2019'},{Name:'compri.zip', Owner:'carlos', Group:'carlos',permissions:'664', Date:'04/06/2018'}]},
	{Name: 'Ubuntu', Disk:'/mach2', IPNumber:'160.83.18.19', myUsers: [ 
	{Name:'Luisa',Login:'lu',groups:[],Passwd:'123'},
	{Name:'Gaviria',Login:'gaviria',groups:[],Passwd: null},
	{Name:'Felipe',Login:'pipe',groups:[],Passwd:null},
	{Name:'Sebastian',Login:'sebas',groups:[],Passwd:null},
] , myGroups: [ 
	{Name:'lu'},
	{Name:'gaviria'},
	{Name:'pipe'},
	{Name:'sebas'}
] ,myFiles: [{Name:'Ubuntu.iso', Owner:'pipe', Group:'pipe',permissions:'664', Date:'05/09/2020'},{Name:'miTexto.txt', Owner:'lu', Group:'lu',permissions:'664', Date:'06/12/2020'},{Name:'amazon.jpg', Owner:'pipe', Group:'pipe',permissions:'664', Date:'07/02/2019'},{Name:'video.zip', Owner:'lu', Group:'lu',permissions:'664', Date:'08/06/2018'}]},
	{Name: 'Fedora', Disk:'/mach3', IPNumber:'198.38.148.20', myUsers: [ 
	{Name:'Maria',Login:'maria',groups:[],Passwd:'123'},
	{Name:'Andres',Login:'andres',groups:[],Passwd: null},
	{Name:'Daniel',Login:'daniel',groups:[],Passwd:null},
	{Name:'Miguel',Login:'miguel',groups:[],Passwd:null},
] , myGroups: [ 
	{Name:'maria'},
	{Name:'andres'},
	{Name:'daniel'},
	{Name:'miguel'}
] ,myFiles: [{Name:'Fedora.iso', Owner:'andres', Group:'andres',permissions:'664', Date:'07/09/2020'},{Name:'leeme.txt', Owner:'daniel', Group:'daniel',permissions:'664', Date:'08/12/2020'},{Name:'logo.jpg', Owner:'miguel', Group:'miguel',permissions:'664', Date:'24/02/2019'},{Name:'archivito.zip', Owner:'maria', Group:'maria',permissions:'664', Date:'28/06/2018'}]}
]; 

IniciarConsola();
let machineSelected = 0;
let userLoging: User|null = null;

function IniciarConsola(){
	addConsola('Bienvenido');
	setTimeout(()=>{
		addConsola('Iniciando consola en maquina '+maquinas[machineSelected].Name);
		document.getElementById( "machine" ).innerHTML = maquinas[machineSelected].Name
		setTimeout(()=>{
			addConsola('Por favor ingrese su usuario.');
			let u = new User('Sebastian','sebas',null,[]);
			userLoging = u;
			limpiarConsola();
			document.getElementById( "userLogued" )?.innerHTML = u.Login;
		},0);
	}, 0);
	
}

/**
 * Borra (limpia) todo el contenido de la consola (ver HTML)
 */
function limpiarConsola(){
	document.getElementById( "textoImprimir" ).innerHTML = ""
}

/**
 * Adiciona una texto a la consola de la GUI (Ver HTML)
 * @param texto Texto que se desea adicionar al final de la consola.
*/
function addConsola ( texto: string )
{
	document.getElementById( "textoImprimir" ).innerHTML +=  texto + '<br>' ;
	var consola: any  = document.getElementById( "consola" );
	consola['scrollTop'] = consola?.scrollHeight;
	
}


function procesarEntrada( e: any )
{
	if (e.keyCode == 13) {
		procesarComando ( document.getElementById( "entrada" ) );
		document.getElementById( "entrada" ).value = '';
	}
	
}

function procesarComando ( comando: any )
{
	var comandoParametros = comando.value.split(" ");

	if(comandoParametros[0] == 'clear'){
		limpiarConsola();
		return;
	}

	if(!userLoging) {
		if(comandoParametros[0] == 'Login:'){
			
			maquinas[machineSelected].myUsers.forEach(user => {
				if(user.Login == comandoParametros[1]){
					if(user.Passwd){
						if(user.Passwd == comandoParametros[1]){
						}
					}else{
						limpiarConsola();
						userLoging=user;
						document.getElementById( "userLogued" )?.innerHTML = user.Login;
						
					}
				}
			});
			if(!userLoging){
				limpiarConsola();
				addConsola ( "El usuario no existe, vuelva a intentarlo." );	
			}
		}else{
			addConsola ( "Primero debe Loguear un usuario (Login: usuario)" );
			return;
		}
	} 

	addConsola ( userLoging?.Login+"@"+maquinas[machineSelected].Name+"$ " +  comando.value + "<br>" );

	switch (comandoParametros[0]) {
		case "logout":
			userLoging=null
			document.getElementById( "userLogued" )?.innerHTML = ''
			break;
		case "touch":
			commandTouch(comandoParametros[1]?comandoParametros[1]:'' )
			break;
		case "sudo":
			sudo(comandoParametros);
			break;
		case "chown":
			addConsola('chown: permiso denegado');
			break;
		case "chmod":
			chmod(comandoParametros)
			break;
		case "ls":
			commandLs(comandoParametros[1]?comandoParametros[1]=='-l':false)
			break;
		case "cat":
			cat(comandoParametros[1])
			break;
		case "nano":
			nano(comandoParametros[1])
			break;
		case "rm":
			rm(comandoParametros[1])
			break;
		case "ssh":
			commandSsh( comandoParametros[1]?comandoParametros[1]:'' );
			break;
		case "scp":
			commandSCP( comandoParametros );
			break;
		default:
			if(comando.value[0] == '.'){
				execute(comando)
			}else{
			addConsola('bash: comando desconocido')
			break;
		}
	}	
}

function commandSCP(parametros:any){
  
}

function commandSsh(destino: string){
	let dest = destino.split('@');
	if(destino=='' || dest.length==1){
		addConsola('Por favor ingrese el usuario y la ip de la maquina destino: ssh usuario@ip');
		return;
	}
	let existMachine = false;
	let existUser = false;
	maquinas.forEach((machine,iMach) => {
		if (machine.IPNumber === dest[1]) {
			existMachine = true;
			machine.myUsers.forEach(user => {
				if(user.Login == dest[0]){
					existUser = true;
					machineSelected = iMach;
					userLoging = user
					document.getElementById( "machine" ).innerHTML = maquinas[machineSelected].Name
					document.getElementById( "userLogued" )?.innerHTML = userLoging.Login;
				}
			});
		}
	});
	if(!existMachine){
		addConsola('No existe la maquina con dirección ip '+dest[1]);
	}
	if(!existUser && existMachine){
		addConsola('No existe el usuario '+dest[0]+' en la maquina '+dest[1]);
	}
}


function commandLs(parametro: boolean){

	if(parametro){
		maquinas[machineSelected].myFiles.forEach(element => {
			let permInOctal = convertFormatPermissions(element.permissions);
			addConsola(permInOctal+" "+element.Owner+" "+element.Group+" "+element.Date+" "+element.Name);
		});
	}else{
		maquinas[machineSelected].myFiles.forEach(element => {
			addConsola(element.Name);
		});
	}

}

function commandTouch(nombre: string){
	if(nombre==''){
		addConsola('Por favor ingrese un nombre del archivo: touch nombre');
		return;
	}
	let exist = false;
	
	maquinas[machineSelected].myFiles.forEach(element=>{
		if(element.Name == nombre){
			exist = true;
			if (canWrite(userLoging, element)) {
				element.Date = new Date()+'';
			}else{
				addConsola('touch: no se puede efectuar ´touch´ sobre ´'+nombre+ '´: Permiso denegado');
			}		
		}
	});

	if(!exist){
		let log = userLoging!=undefined?userLoging.Login:null;
		let newFile: FileMachine = new FileMachine(nombre, log,log, new Date()+'', '664');
		maquinas[machineSelected].myFiles.push(newFile);
	}
}

function sudo(parametros: any){
	if(parametros.length > 1){
		let comando = parametros[1]
		if(comando == "chown"){
			chown(parametros)
		}
	}else{
		addConsola('sudo: se esperaba un comando.')
	}
}

function chown(parameters:any){

	if(parameters.length > 2){
		let text = parameters[2].split(":")
		let owner = searchUser(text[0])
		let group = searchGroup(text[1])
		let file = searchFile(parameters[3])

		if(file != null){
			if(owner != null){
				file.Owner = owner.Login
			}else{
				addConsola('chown: Usuario inexistente: ' + text[0])
			}
			if(group != null){
				file.Group = group.Name
			}else{
				addConsola('chown: grupo inexistente: ' + text[1])
			}
					
		}else{
			addConsola('chown: no se puede acceder a ' + parameters[3] + ': No existe el fichero.')
		}
	}
}

function chmod(parameters:any){
	if(parameters.length > 1 ){
		let file = searchFile(parameters[2])
		if(file != null){
			if(canWrite(userLoging, file)){
				if(parameters.length > 2){
					file.permissions = parameters[1]
				}else{
					addConsola('chmod: se esperaban un archivo después de ' + parameters[1])
				}
			
			}else{
				addConsola('chmod: no se puede modificar el fichero ' + file.Name + ': el usuario no tiene permiso de escritura.')
			}
		}else{
			addConsola('chmod: no se puede acceder a ' + parameters[2] + ': No existe el fichero.')
		}
	}else{
		addConsola('chmod: se esperaban más parametros')
	}
}

function cat(fileName:string){
	if(fileName != ''){
		let file = searchFile(fileName)
		if(file != null){
			if(canRead(userLoging, file)){
				addConsola('cat: leyendo el contenido del archivo...')
			}else{
				addConsola('cat: no se puede leer el fichero ' + file.Name + ': el usuario no tiene permiso de lectura.')
			}
		}else{
			addConsola('cat: no se puede acceder a ' + fileName + ': No existe el fichero.')
		}
	}else{
		addConsola('cat: se esperaban más parametros')
	}
}

function nano(fileName:string){
	if(fileName != ''){
		let file = searchFile(fileName)
		if(file != null){
			if(canWrite(userLoging, file)){
				addConsola('nano: escribiendo en el archivo...')
			}else{
				addConsola('nano: no se puede escribir sobre el fichero ' + file.Name + ': el usuario no tiene permiso de escritura.')
			}
		}else{
			addConsola('nano: no se puede acceder a ' + fileName + ': No existe el fichero.')
		}
	}else{
		addConsola('nano: se esperaban más parametros')
	}
}
function rm (toDelete:string){
	if(toDelete != ''){
		let file = searchFile(toDelete)
		if(file != null){
			if(canWrite(userLoging, file)){
				  let pos = maquinas[machineSelected].myFiles.indexOf(file)
				  maquinas[machineSelected].myFiles.splice(pos,1)
			}else{
				addConsola('rm: no se puede eliminar el fichero ' + file.Name + ': el usuario no tiene permiso de escritura.')
			}
		}else{
			addConsola('rm: no se puede acceder a ' + toDelete + ': No existe el fichero.')
		}
	}else{
		addConsola('rm: se esperaban más parametros')
	}
}
function execute(toExecute:any){

		let parameters = toExecute.value.split('/')
		let fileName = parameters[1]
		if(fileName != ''){
			let file = searchFile(fileName)
			if(file != null){
				if(canExecute(userLoging,file)){
					addConsola('bash: ejecutando el archivo...')
				}else{
					addConsola('bash: no se puede ejecutar el fichero ' + file.Name + ': el usuario no tiene permiso de ejecución.')
				}
			}else{
				addConsola('bash: no se puede acceder a ' + fileName + ': No existe el fichero.')
			}
		}else{
			addConsola('bash: se esperaban más parametros')
		}
}


function searchUser(name:string){

	let user:User | undefined

	maquinas[machineSelected].myUsers.forEach(element => {
		if(element.Login == name){
			user = element
		}
	});

	return user
}

function searchGroup(name:string){
	let group:Group | undefined
	maquinas[machineSelected].myGroups.forEach(element => {
		if(element.Name == name){
			group = element
		}
	});
	return group
}

function searchFile(name:string){
	let file: FileMachine | undefined
	maquinas[machineSelected].myFiles.forEach(element => {
		if(element.Name == name){
			file = element
		}
	});
	return file
}
function convertFormatPermissions(permisos: string){
	var aux = "-";
    if (permisos.length > 3) {
        return null
    }
    for (let i = 0; i < 3; i++) {
        var valor = parseInt(permisos[i])
        if (valor > 7) {
            return null
        }
        if (valor >= 4) {
            aux += "r"
            valor -= 4
        } else { aux += "-" }

        if (valor >= 2) {
            aux += "w"
            valor -= 2
        } else { aux += "-" }
		if (valor >= 1) {
			aux += "x"
			valor -= 1
		} else { aux += "-" }
	}
	
	return aux;
}
function canRead(user: User|null, archive:FileMachine) {
	if (archive.Owner === user?.Login) {
	  //es el dueño
	  return Number(archive.permissions.charAt(0)) >= 4;
	} else {
	  //no es el dueño
	  if (user?.groups.includes(archive.Owner+'')) {
		//Está en el grupo
		return Number(archive.permissions.charAt(1)) >= 4;
	  } else {
		//No está en el grupo
		return Number(archive.permissions.charAt(2)) >= 4;
	  }
	}
}

function canWrite(user: User|null, archive:FileMachine) {
	if (archive.Owner === user?.Login) {
		//es el dueño
		let x = Number(archive.permissions.charAt(0));
		return x == 2 || x == 3 || x == 6 || x == 7;
	} else {
		//no es el dueño
		if (user?.groups.includes(archive.Group+'')) {
		//Está en el grupo
		let x = Number(archive.permissions.charAt(1));
		return x == 2 || x == 3 || x == 6 || x == 7;
		} else {
		//No está en el grupo
		let x = Number(archive.permissions.charAt(2));
		return x == 2 || x == 3 || x == 6 || x == 7;
		}
	}
}

function canExecute(user: User|null, archive:FileMachine) {
	if (archive.Owner === user?.Login) {
		//es el dueño
		let x = Number(archive.permissions.charAt(0));
		return x % 2;
	} else {
		//no es el dueño
		if (user?.groups.includes(archive.Group+'')) {
		//Está en el grupo
		let x = Number(archive.permissions.charAt(1));
		return x % 2;
		} else {
		//No está en el grupo
		let x = Number(archive.permissions.charAt(2));
		return x % 2;
		}
	}
}



class Machine{
	public myFiles:FileMachine[]=[];
	public myUsers:User[]=[];
	public myGroups:Group[]=[];
    //public userRoot: User|null = ;
    
    constructor(public Name: string, public IPNumber: string, public Disk: string){
        //this.userRoot = new User('Administrador',"root", null );
    }
}

class FileMachine{
    constructor(public Name: string,public Owner: string | null,public Group: string | null, public Date: String, public permissions: string){
    }
}

class User{
    constructor(public Name: string, public Login: string |null, public Passwd: string | null,public groups: string[] = []){
		this.groups.push(Name);
    }
}


class Group{
    constructor(public Name: string){
    }
}