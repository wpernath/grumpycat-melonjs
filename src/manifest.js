// a melonJS data manifest
// note : this is not a webpack manifest
const DataManifest = [
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
	{
		name: "bombs",
		type: "image",
		src: "./data/img/BombExploding.png",
	},
	{
		name: "terrain",
		type: "image",
		src: "./data/img/terrain.png",
	},
	{
		name: "sensa_jaa",
		type: "image",
		src: "./data/img/sensa_jaa.png",
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
		src: "./data/map/Level1.json",
		//src: "maps/0"
	},

	{
		name: "level2",
		type: "tmx",
		src: "./data/map/Level2.json",
		//src: "maps/0"
	},

	{
		name: "level3",
		type: "tmx",
		src: "./data/map/Level3.json",
		//src: "maps/0"
	},
	{
		name: "level4",
		type: "tmx",
		src: "./data/map/Level4.json",
		//src: "maps/0"
	},

	{
		name: "level5",
		type: "tmx",
		src: "./data/map/Level5.json",
		//src: "maps/0"
	},
];

export default DataManifest;
