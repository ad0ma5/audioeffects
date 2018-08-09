
class SoundEffectsApp{

	constructor(params = {}){
		//this.sound = undefined
		this.displayVisuals = true
		this.shape = "circle"
	}
	startApp(params = {}){
		
		//const sound = new Pizzicato.Sound({ source: 'input' }, () => onSoundLoaded());
		
		if(this.sound === undefined){
		//if(true){
			if(!this.displayVisuals){
				this.sound = new Pizzicato.Sound({ source: 'input' }, this.onSoundLoadedNoVisuals.bind(this));
				this.sound.volume = 0.5;
				this.sound.attack  = 0.5;
				this.sound.release = 0.5;
				this.sound.frequency = 880; // a5
			
			}else{
				this.sound = new Pizzicato.Sound({ source: 'input' }, this.onSoundLoaded.bind(this));
				this.sound.frequency = 880; // a5
			}
			
		}else{
			if(!this.displayVisuals){
				this.onSoundLoadedNoVisuals()
			
			}else{
				this.onSoundLoaded()
			}
			//this.sound.play()
		}
	}
	restartApp(params = {}){
	
	}
	stopApp(params = {}){
		console.log('stopApp')
		this.sound.stop()
	}
	
	pauseApp(params = {}){
		console.log('endApp')
		this.sound.pause()
	}
	changeVisual(checked){
		this.displayVisuals = checked
	}

	changeShape(shape) {
	    this.shape = shape
	    console.log(shape)

	}
	addEffect(efect){
        console.log(efect)
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
				if(this.visual) delete this.visual
				this.visual = new Visuals(this)
				console.log("Visuals started")
		}else{
				alert('no visuals')
		}
	}
}
