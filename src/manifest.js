// a melonJS data manifest
// note : this is not a webpack manifest
const DataManifest = [
	// screen controls texture map
	{
		name: "screen-controls",
		type: "image",
		src: "./data/img/screen-controls.png",
	},
	{
		name: "screen-controls",
		type: "json",
		src: "./data/img/screen-controls.json",
	},

	/* Bitmap Text */
	{
		name: "PressStart2P",
		type: "image",
		src: "./data/fnt/PressStart2P.png",
	},
	{
		name: "PressStart2P",
		type: "binary",
		src: "./data/fnt/PressStart2P.fnt",
	},

	/* Bitmap Text */
	{
		name: "ArialFancy",
		type: "image",
		src: "./data/fnt/arialfancy.png",
	},
	{
		name: "ArialFancy",
		type: "binary",
		src: "./data/fnt/arialfancy.fnt",
	},

	{
		name: "grumpy_cat_left",
		type: "image",
		src: "./data/img/grumpy_cat_left.png",
	},

	{
		name: "grumpy_cat_right",
		type: "image",
		src: "./data/img/grumpy_cat_right.png",
	},

	{
		name: "bombs",
		type: "image",
		src: "./data/img/BombExploding.png",
	},
	{
		name: "explosion",
		type: "image",
		src: "./data/img/explosion4.png",
	},
	{
		name: "spider-red",
		type: "image",
		src: "./data/img/spider-red.png",
	},

	{
		name: "terrain",
		type: "image",
		src: "./data/img/terrain.png",
	},
	{
		name: "BombExploding",
		type: "image",
		src: "./data/img/BombExploding.png",
	},
	{
		name: "sensa_jaa",
		type: "image",
		src: "./data/img/sensa_jaa.png",
	},
	{
		name: "sensa_nee",
		type: "image",
		src: "./data/img/sensa_nee.png",
	},

	{
		name: "sensa_grass",
		type: "image",
		src: "./data/img/sensa_grass.jpeg",
	},

	{
		name: "player",
		type: "image",
		src: "./data/img/player.png",
	},

	{
		name: "cat_left",
		type: "image",
		src: "./data/img/cat_left.png",
	},
	{
		name: "cat_right",
		type: "image",
		src: "./data/img/cat_right.png",
	},
	{
		name: "Terrain",
		type: "tsx",
		src: "./data/map/Terrain.json",
	},

	{
		name: "level1",
		type: "tmx",
		//src: "./data/map/Level1.json",
		src: "maps/0.json",
	},

	{
		name: "level2",
		type: "tmx",
		//src: "./data/map/Level2.json",
		src: "maps/1.json",
	},

	{
		name: "level3",
		type: "tmx",
		//src: "./data/map/Level3.json",
		src: "maps/2.json",
	},
	{
		name: "level4",
		type: "tmx",
		//src: "./data/map/Level4.json",
		src: "maps/3.json",
	},

	{
		name: "level5",
		type: "tmx",
		//src: "./data/map/Level5.json",
		src: "maps/4.json",
	},
];

export default DataManifest;
