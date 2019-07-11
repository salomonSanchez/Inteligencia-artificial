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

- function CheckRow(x, value){
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


//comprobar si se forma una linea, la funcion CheckLine() es la encragada de verificar si la posicion en la que se encutra una de las fichas de juego forma una sesecion de de tres fichas consecutivas, de ser asi se dice que el juego a terminado.

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


//contador de fichas,  esta funcion debe encargarse de llevar un conteo de las veces en que la ficha se a jugado y retornar ese valor.

function CheckTurn_Count(turn_value){
	Turn_count = 0;
	for (i=0; i<3; i++){
		for (j=0; j<3; j++){
			if (board[i][j] == turn_value) Turn_count++;
		}
	}
	return Turn_count;
}

//identificcador de movimientos diferentes, esta funcion nos sirve para poder identificar que los turnos del juego. si ya se jugó cruces, le pasa el turno a las bolas.

function DifMov(x, y){
	diferent = false;
	if (turn == "cross"){
		if ( x != Cross_Sellected_x ) diferent = true;
		if ( y != Cross_Sellected_y ) diferent = true;
	}
	else{
		if ( x != Ball_Sellected_x ) diferent = true;
		if ( y != Ball_Sellected_y ) diferent = true;
	}
	return diferent;
}

//bloquear una fila o una columna, esta es una las funciones mas importantes para darle vida a la inteligencia artificial, en esta funcion al encontra dos fichas consecusitas del jugador la maquina debe bloquear la tercera casilla para evitar que el juego se termine.

function CheckBlock(x,y){
	//si hay 2 fichas del jugador y una de la maquina
	if (CheckRow(y, 1) == 1 && CheckRow(y,2) == 2) return true;
	if (CheckColumn(x, 1) == 1 && CheckColumn(x,2) == 2) return true;
	if ( (x==0 && y==2) || (x==1 && y==1) || (x==2 && y==0)){
		if (CheckDiag(1,1) == 1 && CheckDiag(1, 2) == 2) return true
	}
	if ( (x==0 && y==0) || (x==1 && y==1) || (x==2 && y==2)){
		if (CheckDiag(-1,1) == 1 && CheckDiag(-1, 2) == 2) return true
	}
	return false;
}

# otras funciones necesarias para iniciar el juego
ClearCell (x, y), funcion que se encrarga de limpiar las posiciones de la mtriz antes de iniciar cada juego. 

function ClearCell (x, y){
	board[x][y] = 0;
	cell = document.getElementById("c" + x + y);
	cell.innerHTML = "";
}

PaintCell (x, y), funcion encargada de asignar la ficha al juego. 

function PaintCell (x, y){
	cell = document.getElementById("c"+ x + y);
	cell.innerHTML = "<img src= ./images/" + turn + ".gif></img>";

	if (turn == "ball"){
		board[x][y] = 1;
		Ball_Sellected_x = x;
		Ball_Sellected_y = y;
	}
	else{
		board[x][y] = 2;
		Cross_Sellected_x = x;
		Cross_Sellected_y = y;
	}

	CheckLine();

	if (turn == "ball") turn = "cross";
	else turn = "ball";

}