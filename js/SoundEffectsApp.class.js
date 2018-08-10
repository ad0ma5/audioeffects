
class SoundEffectsApp{

	constructor(params = {}){
		//this.sound = undefined
		//this.visual 
		this.displayVisuals = true
		this.shape = "circle"
		this.effectList = [
			{
				element:'option',
				text:'Delay',
				id:'Delay',
				onClick:"",
				value:'Delay',
				config:{
					feedback: 0.9,
					time: 0.8,
					mix: 0.8
				}
			},
			{
				element:'option',
				text:'PingPongDelay',
				id:'PingPongDelay',
				onClick:"",
				value:'PingPongDelay',
				config:{
					feedback: 0.9,
					time: 0.8,
					mix: 0.8
				}
			},
			{
				element:'option',
				text:'DubDelay',
				id:'DubDelay',
				onClick:"",
				value:'DubDelay',
				config:{
					feedback: 0.1,
					time: 0.9,
					mix: 0.8,
					cutoff: 2000
				}
			},
			{
				element:'option',
				text:'Reverb',
				id:'Reverb',
				onClick:"",
				value:'Reverb',
				config:{
					time: 0.06,
					decay: 0.9,
					reverse: false,
					mix: 0.5
				}
			},
		]
		this.activeEffectList = {}
		if(typeof Visuals !== undefined){
				if(this.visual) delete this.visual
				this.visual = new Visuals(this)
				console.log("Visuals started")
				this.initEffects()
		}else{
				alert('no visuals')
		}
	}
	startApp(params = {}){
		
		//const sound = new Pizzicato.Sound({ source: 'input' }, () => onSoundLoaded());
		
		if(this.sound === undefined){
			this.sound = new Pizzicato.Sound({ source: 'input' }, this.onSoundLoaded.bind(this));
			//if(true){
			//if(!this.displayVisuals){
				//this.sound = new Pizzicato.Sound({ source: 'input' }, this.onSoundLoadedNoVisuals.bind(this));
				//this.sound.volume = 0.5;
				//this.sound.attack  = 0.5;
				//this.sound.release = 0.5;
				//this.sound.frequency = 880; // a5
			
			//}else{
				//this.sound = new Pizzicato.Sound({ source: 'input' }, this.onSoundLoaded.bind(this));
				//this.sound.frequency = 880; // a5
			//}
			
		}else{
			this.sound.play()
		}
		this.elementHide('#startApp')
		this.elementShow('#stopApp')
	}
	restartApp(params = {}){
	
	}
	stopApp(params = {}){
		console.log('stopApp')
		this.sound.stop()
		this.elementShow('#startApp')
		this.elementHide('#stopApp')
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
	    this.visual.changeShape(shape)
	    console.log(shape)

	}
	initEffects(){
		for(var i = 0; i < this.effectList.length; i++){
			var effect = this.effectList[i]
			this.visual.addElement('#effectList',{element:"option",text:effect.text,id:effect.id+'_option',onClick:"",value:effect.value})
		}
	}
	addEffect(effectid){
        console.log(effectid)
        var found = this.effectList.find( effect => { return effect.id === effectid} )
        console.log(found)
        //add actuall effect to sound
        this.activeEffectList[effectid] = new Pizzicato.Effects[found.id](found.config)
        this.sound.addEffect(this.activeEffectList[effectid]);
        //resolve visulas (move to visual class?)
        this.visual.getElement('#'+found.id+'_option').attr('disabled','disabled')
        this.visual.addElement('.effectcontainer',{element:'div',text:found.text,id:found.id,onClick:found.onClick,value:found.value})
        //console.log('aa',found.id,'#'+found.id)
        this.visual.addElement('#'+found.id,{element:'i',class:"fas fa-times-circle",text:'',id:'x'+found.id,onClick:"removeEffect('"+found.id+"')",value:null})
        this.visual.addElement('#'+found.id,{element:'i',class:"fas fa-edit ",text:'',id:'e'+found.id,onClick:"editEffect('"+found.id+"')",value:null})
	}	
	removeEffect(effectid){
		console.log(this)
		this.sound.removeEffect(this.activeEffectList[effectid]);
		
		this.visual.removeElement('#'+effectid)
		
		this.visual.getElement('#'+effectid+'_option').attr('disabled',null)//.removeAttribute('disabled')
        
	}
	elementHide(selector){
		this.visual.getElement(selector).attr('class','hidden')
	}
	elementShow(selector){
		this.visual.getElement(selector).attr('class','')
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
			decay: 0.9,
			reverse: false,
			mix: 0.5
		});
		//console.log(this)
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
	
	onSoundLoaded() {
		this.visual.doTheStuff(this.sound)
		this.sound.play()
	}
}
