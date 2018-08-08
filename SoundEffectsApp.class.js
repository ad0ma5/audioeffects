
class SoundEffectsApp{

	constructor(params = {}){
		//this.sound = undefined
		this.displayVisuals = true
	}
	startApp(params = {}){
		
		//const sound = new Pizzicato.Sound({ source: 'input' }, () => onSoundLoaded());
		
		if(this.sound === undefined){
			if(!this.displayVisuals){
				this.sound = new Pizzicato.Sound({ source: 'input' }, this.onSoundLoadedNoVisuals.bind(this));
			
			}else{
				this.sound = new Pizzicato.Sound({ source: 'input' }, this.onSoundLoaded.bind(this));
			}
		}else{
			this.sound.play()
		}
	}
	restartApp(params = {}){
	
	}
	stopApp(params = {}){
		console.log('stopApp')
		this.sound.stop()
	}
	
	endApp(params = {}){
		console.log('endApp')
		this.sound.pause()
	}
	changeVisual(checked){
		this.displayVisuals = checked
	}
	addEffect(){
	}	
	addEffects(){
		
		this.delay = new Pizzicato.Effects.Delay({
			feedback: 0.9,
			time: 0.8,
			mix: 0.8
		});
		this.pingPongDelay = new Pizzicato.Effects.PingPongDelay({
			feedback: 0.5,
			time: 0.65,
			mix: 0.4
		});
		this.dubDelay = new Pizzicato.Effects.DubDelay({
			feedback: 0.1,
			time: 0.9,
			mix: 0.8,
			cutoff: 2000
		});
		this.reverb = new Pizzicato.Effects.Reverb({
			time: 0.06,
			decay: 0.09,
			reverse: false,
			mix: 0.5
		});

		this.sound.addEffect(this.reverb);
		//this.sound.addEffect(this.dubDelay);
		//this.sound.addEffect(this.pingPongDelay);
		this.sound.addEffect(this.delay);
	}
	removeEffects(){
		//this.sound.removeEffect(this.dubDelay);
		//this.sound.removeEffect(this.pingPongDelay);
		this.sound.removeEffect(this.reverb);
		this.sound.removeEffect(this.delay);
	}
	changeEffect(value, key){
		
		console.log(this.delay)
		this.delay[key] = value/100
	}
	onSoundLoadedNoVisuals() {
		this.sound.play()
	}
	onSoundLoaded() {
		if(typeof Visuals !== undefined){
				const visual = new Visuals(this)
				console.log("Visuals started")
		}
	}
}
