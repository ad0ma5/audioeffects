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
	
function stopApp(){
	if(app !== null)
		app.stopApp()
}
function endApp(){
	if(app !== null)
		app.endApp()
}
	
function addEffects(){
	if(app !== null)
		app.addEffects()
}
	
	
function addEffect(effect){
	if(app !== null)
		app.addEffect(effect)
}
	
function removeEffects(){
	if(app !== null)
		app.removeEffects()
}

function changeShape(shape){
    if(app !== null)
        app.changeShape(shape)


}

function sliderChange(value, key){
	if(app !== null)
		app.changeEffect(value, key)
		console.log('slider',value,key)
}
function changeVisual(checked){
	console.log(checked)
	if(app !== null)
		app.changeVisual(checked)
}
const path = 'https://alemangui.github.io/audio/piano-electro.mp3'
/*
const sound = new Pz.Sound({ 
   source: 'file', 
   options:{ path: path, loop:true }
}, () => onSoundLoaded())
*/
//var voice = new Pizzicato.Sound({ source: 'input' });





