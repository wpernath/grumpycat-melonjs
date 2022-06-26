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
		name: "terrain",
		type: "tsx",
		src: "./data/map/Terrain.json",
	},

	{
		name: "level1",
		type: "tmx",
		src: "./data/map/Level1.json",
	},
];

export default DataManifest;
