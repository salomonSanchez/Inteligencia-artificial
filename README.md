# Inteligencia-artificial
creación de videojuego con inteligencia artificial y patrones de arquitectura.

#install
npm i microkernel-artificial-inteligency

# variables glovales a impelemntar para usar la inteligencia artificial
 - board = Array(3); se debe crear una variable de tipo array de 3
 - turn; una viarible de turno que indicará si juegan las cruces o las bolas en el juego.
- Cross_Sellected_x; indicara la posicion x en la que se encuentra la cruz
- Cross_Sellected_y; indicara la posicion y en la que se encuentra la cruz

- Ball_Sellected_x; indicara la posicion x en la que se encuentra la bola
- Ball_Sellected_y; indicara la posicion x en la que se encuentra la bola

# implementar las funciones de control de la inteligencia artificial
 //verificar fila, se de debe implentar la funcion "CheckRow(x, value)" la cual recibira dos parmetros de control, la x indica la posicion y el valor indica el turno de juego (0 para la maquina, 1 para el humano.).la funcion recorrera la matriz y retornará el numero total de fichas que se encuentren en la fila de la matriz. 

* function CheckRow(x, value){
	count_value = 0;
	for (i=0; i<3; i++){
		if (board[i][x] == value) count_value++;
	}
	return count_value;
}

//verficar columna, la funcion "CheckColumn(y, value)" recibe de igual forma los mismos parametros de control que al funcion anterior a diferencia de que esta se encrgará de recorrer las columnas para retornar el numero de total de fichas que se encuentren en la columna. 

function CheckColumn(y, value){
	count_value = 0;
	for (i=0; i<3; i++){
		if (board[y][i] == value) count_value++;
	}
	return count_value;
}

//verificacion de diagonales, la funcion "CheckDiag(d, value)" se encrgará de recorrer las diagonalez para retornar el numero de total de fichas que se encuentren en la diagonal. las diagonales estan formadas de la siguiente manera segun la matriz

************************************
*	 c02	*	 c12	*	 c22	*
*************************************
*	 c01	*	 c11	*	 c21	*
*************************************
*	 c00	*	 c10	*	 c20	*
************************************
	/   \
	00	20
	11	11
	22	02

por lo tanto para poder acceder a dichas posisciones usaremos la formula
 "[(1+d)][0] == value" y "[(1-d)][2] == value", donde "d" recibira valores entre (1 y -1) desde las funciones de inteligencia artificial para poder acceder a todas las diagones. (1+1)[0] = 20 , indicaría la diagonal derecha. etc. 

function CheckDiag(d, value){
	count_value = 0;
	if (board[(1+d)][0] == value) count_value++;
	if (board[1][1] == value) count_value++;
	if (board[(1-d)][2] == value) count_value++;
	return count_value;
}


//comprobar si se forma una linea, la funcion CheckLine()
function CheckLine(){
	if ( turn == "ball") value = 1;
	else value = 2;
	Line = false;

	if (CheckRow(0, value) == 3) Line = true;
	if (CheckRow(1, value) == 3) Line = true;
	if (CheckRow(2, value) == 3) Line = true;
	if (CheckColumn(0, value) == 3) Line = true;
	if (CheckColumn(1, value) == 3) Line = true;
	if (CheckColumn(2, value) == 3) Line = true;
	if (CheckDiag(1, value) == 3) Line = true;
	if (CheckDiag(-1, value) == 3) Line = true;

	if (Line == true) ShowMessage(value);
}

