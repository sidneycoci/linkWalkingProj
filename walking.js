var Link = document.getElementById("link");
var currentKeys = [];//get an array ready to record currently pressed keys
var UP = 'w';
var LEFT = 'a';
var DOWN = 's';
var RIGHT = 'd';

var canmoveleft=true; 
// you'll be free to move left if no collisions are happening on your left, etc





function gameLoop(){//for each frame of animation...

	var leftpos = parseInt(Link.style.left);
	//prepare to change Link's inline CSS positioning

	var toppos = parseInt(Link.style.top);
	
	if (currentKeys[LEFT] && leftpos - 3 >= 0) Link.style.left = leftpos - 3 + 'px';
	//if one of the key codes in the 'currentKeys' array is the key code for 'LEFT', set Link's left position to his current left position - 3 pixels (for every frame)

	if (currentKeys[RIGHT] && leftpos + Link.offsetWidth + 3 <= window.innerWidth) Link.style.left = leftpos + 3 + 'px';
	//3 pixels per frame seemed like a good speed

	if(currentKeys[UP]) Link.style.top = toppos - 3 + 'px';

	if(currentKeys[DOWN]) Link.style.top = toppos + 3 + 'px';
	//the logic of your code is important: by not using "else if" with these ifs, you can have multiple keys working at the same time, which lets Link move both down and left, etc.
	
	window.requestAnimationFrame(gameLoop);
	//and now run this game loop again, and keep running it at as fast a rate as javascript can conveniently fit it in

}

document.body.addEventListener(
	"keydown", 
	function(infoAboutTheKey){
		currentKeys[infoAboutTheKey.key] = true;
		//add the key's name to the array of currently pressed keys
		Link.setAttribute('data-key-'+infoAboutTheKey.key, true);
		//point him in the direction he's walking with Data Attributes & the CSS
});

document.body.addEventListener(
	"keyup",
	function(infoAboutTheKey){
		currentKeys[infoAboutTheKey.key] = false; 
		Link.setAttribute('data-key-'+infoAboutTheKey.key, ''); 
		//blank out this key's data-key attribute, stop pointing him in the direction he's no longer walking in
});

window.addEventListener(
	"load", 
	function(){
		gameLoop();
});