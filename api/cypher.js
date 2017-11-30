const descifrar = (mensaje, clave) => {
	let S = [];
	let T = [];
	for (x = 0; x <= 255; x++) {
		S[x] = x;
	}

	let claveArreglo = clave.split('');

	for (x = 0; x < 255;) {
		for (y = 0; y < claveArreglo.length; y++)
		{
			T[x] = claveArreglo[y];
			x++;
		}
	}

	let i, j = 0;
	let temp;
	for (i = 0; i <= 255; i++) {
		j = (j + claveArreglo.length) % 256;
		//Intercambio S[i] y S[j]
		temp = S[i];
		S[i] = S[j];
		S[j] = temp;
	}

	//Algoritmo PRGA Inverso(Pseudo-Random Generation Algorithm)

	let KeyStream = [];

	i = j = 0; //Inicializar variables i, j en 0.

	let l = 0;

	for (k = 0; k < mensaje.length; k++)
	{
		i = (i + 1) % 256;
		j = (j + S[i]) % 256;

		//Intercambiar S[i] y S[j]
		temp = S[i];
		S[i] = S[j];
		S[j] = temp;

		l = (S[i] + S[j]) % 256;
		KeyStream[k] = S[l];
	}

	//Realizar XOR KeyStream y mensaje cifrado
	let mensajeDesifrado = [];
	for (k = 0; k < KeyStream.length; k++)
	{
		mensajeDesifrado[k] = KeyStream[k] ^ mensaje[k];
		mensajeDesifrado[k] = String.fromCharCode(mensajeDesifrado[k]);
	}
	return mensajeDesifrado;
};


module.exports = {
	encode: (req, res) => {
		const claveCifrado = process.env.CLAVE_CIFRADO;
	},
	decode: (req, res) => {
		const claveCifrado = process.env.CLAVE_CIFRADO;
		let mensajeCifrado = req.body.mensaje;
		if (mensajeCifrado) mensajeCifrado = mensajeCifrado.split(',');
		console.log(mensajeCifrado, claveCifrado);
		const mensajeDesifrado = descifrar(mensajeCifrado, claveCifrado);
		console.log('Mensaje Descifrado!', mensajeDesifrado);
		return res.status(200).send({mensaje: mensajeDesifrado.join('')});
	}
};

