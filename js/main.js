let app = null

if(typeof SoundEffectsApp !== undefined && typeof Pizzicato !== undefined ){
		app = new SoundEffectsApp()
		//app.startApp()
		
	}else{
		alert("missing class SoundEffectsApp")
	}

function startApp(){
	if(app !== null)
		app.startApp()
}
	

function startFile(file){
	var userFile = file //document.getElementById('file');
	userFile.src = URL.createObjectURL(file.files[0]);
	var data = userFile.src;
  
	if(app !== null)
		app.startFile(data)
}
	
function stopApp(){
	if(app !== null)
		app.stopApp()
}
function pauseApp(){
	if(app !== null)
		app.pauseApp()
}
function editApp(){
	if(app !== null)
		app.editApp()
}
//effect list
function addEffect(effect){
	if(app !== null)
		app.addEffect(effect)
}
function editEffect(effect){
	if(app !== null)
		app.editEffect(effect)
}
function removeEffect(effect){
	if(app !== null)
		app.removeEffect(effect)
}
// deprecated buttons
function addEffects(){
	if(app !== null)
		app.addEffects()
}

function removeEffects(){
	if(app !== null)
		app.removeEffects()
}
//visual shape
function changeShape(shape){
    if(app !== null)
        app.changeShape(shape)


}
//change any slider function
function sliderChange(effectid, value, key){
	if(app !== null)
		app.changeEffect(effectid, value, key)
		console.log('slider',effectid, value,key)
}
function changeVisual(checked){
	console.log(checked)
	if(app !== null)
		app.changeVisual(checked)
}
//const path = 'https://alemangui.github.io/audio/piano-electro.mp3'
/*
const sound = new Pz.Sound({ 
   source: 'file', 
   options:{ path: path, loop:true }
}, () => onSoundLoaded())
*/
//var voice = new Pizzicato.Sound({ source: 'input' });





