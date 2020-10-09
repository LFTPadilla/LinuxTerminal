/*
 description Emulador de una terminal y varias máquinas en red usando Javascript
 author Julián Esteban Gutiérrez Posada y Carlos Eduardo Gomez Montoya
 email jugutier@uniquindio.edu.co carloseg@uniquindio.edu.co
 licence GNU General Public License  Ver. 4.0 (GNU GPL v4)
 date Septiembre 2020
 version 1.0
*/

/**
 * Borra (limpia) todo el contenido de la consola (ver HTML)
 */
function limpiarConsola() 
{
  document.getElementById( "textoImprimir" ).innerHTML = ""
  document.getElementById( "entrada" ).value           = "";
}

/**
 * Adiciona una texto a la consola de la GUI (Ver HTML)
 * @param texto Texto que se desea adicionar al final de la consola.
*/
function addConsola ( texto: string )
{
  document?.getElementById( "textoImprimir" )?.innerHTML += texto;
  var consola = document.getElementById( "consola" );
  consola.scrollTop = consola.scrollHeight;
}


function procesarEntrada( e )
{
	if (e.keyCode == 13) {

		procesarComando ( document.getElementById( "entrada" ) );
	}
	
}

function procesarComando ( comando: any )
{
	var comandoParametros = comando.value.split(" ");

	addConsola ( "Ejecutando : " + comandoParametros[0] + "<br>" );

	for (var i =1 ; i<comandoParametros.length ; i++ )
	{
		addConsola ( "Parametro "+ i + ": " + comandoParametros[i] + "<br>" );
	}

	addConsola ( "<p>" );
		
	if ( comandoParametros[0] == "clear" ) 
	{
		limpiarConsola(); 
	}
	else
	{
		document.getElementById( "entrada" ).value = ""
	}
}
