import Level from './Level.js';
import SpriteSheet from './SpriteSheet.js'
import {createBackgroundLayer} from './layers.js';

export function loadImage(url){

    return new Promise(resolve => {
    	const image = new Image();
    	image.addEventListener('load', () => {
    		resolve(image)
    	});
    	image.src = url;
    });
}

function loadJSON(url){
	return fetch(url).then(response => response.json()); //Si la promesa se realiza con éxito se parsea a JSON
}

function createTiles(level, backgrounds){

	for (const i in backgrounds){ //Objektu bat ateratzeko
		var objektua = backgrounds[i];
		var tile = objektua["tile"];
		var zerLista = objektua['ranges'];

		//console.log(objektua)
		//console.log(tile)
		//console.log(zerLista)
		for (var j in zerLista){ //Objektuak dituen zerrenda ateratzeko
			var lista = zerLista[j]
			//console.log(lista)
			var xPos = lista[0]
			var yPos = lista[2]
			var xMax = lista[1]
			var yMax = lista[3]

			console.log(xPos,yPos,xMax,yMax)

			for(var u = xPos ; u < xMax ; u++){
				//console.log(u,tile)

				for(var w = yPos ; w < yMax ; w++){
					//console.log(u,w,tile)
					level.tiles.set(u,w,tile)
				}
			}
		}

		
	}
}


function loadSpriteSheet(){
        return loadJSON('/sprites/sprites.json')
        	.then(sheetSpec => Promise.all([
        		sheetSpec, 
        		loadImage(sheetSpec['imageURL']), // cargar imágenes de un spritesheet como sprites 
      		]))
        	.then(([sheetSpec,image]) => {
        		const sprites = new SpriteSheet(image,sheetSpec['tileW'],sheetSpec['tileH']);
        		for(var i = 0; i < 2; i++){
        			sprites.defineTile(sheetSpec['tiles'][i]['name'],sheetSpec['tiles'][i]['index'][0],sheetSpec['tiles'][0]['index'][1]);
        		}
        	})
        	return sprites;
}


export function loadLevel(){
    return loadJSON('/levels/level.json') // qué tiles hay que poner y dónde dentro de este nivel
    .then(levelSpec => Promise.all([
        levelSpec, 
        loadSpriteSheet(), // cargar imágenes de un spritesheet como sprites 
      ]))
        .then(([levelSpec, backgroundSprites]) => {
            const level = new Level();
            createTiles(level, levelSpec.backgrounds); // desplegar tiles en la estrucura Matrix

            const backgroundLayer = createBackgroundLayer(level, backgroundSprites); // cargar canvas
            level.background = backgroundLayer; // canvas buffer 

            return level;
    });
    
}

