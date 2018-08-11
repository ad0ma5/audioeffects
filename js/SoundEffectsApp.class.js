
class SoundEffectsApp{

	constructor(params = {}){
		//this.sound = undefined
		//this.visual 
		this.displayVisuals = true
		this.shape = "circle"
		this.effectList = []
		if(_effectList !== undefined)
			this.effectList  = _effectList
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
	//effect sliders
	addSlider(found,slider){
		console.log('addSlider',found,slider)
		this.visual.addElement(
			'#effect_sliders',
			{element:'div',id:found.id+"_"+slider.key+"_inner",value:found.value}
		)
        this.visual.addElement(
			'#'+found.id+"_"+slider.key+"_inner",
			{
				element:'label',
				//type:"range",
				//min:"1",max:"100",text:'',
				id:'l_'+found.id+"_"+slider.key+"",
				//onChange:"sliderChange('"+found.id+"',this.value,'"+slider.key+"')",
				//value:slider.val*100
				//text:found.text+" "+slider.key
				text:slider.key
			}
		)
		var sliderVal = slider.val*100
		if(found.config_range !== undefined){
			sliderVal = (slider.val - found.config_range.min) / (found.config_range.max - found.config_range.min) * 100
			
		}
        this.visual.addElement(
			'#'+found.id+"_"+slider.key+"_inner",
			{
				element:'input',
				type:"range",
				min:"1",max:"100",text:'',
				id:'i_'+found.id+"_"+slider.key+"",
				onChange:"sliderChange('"+found.id+"',this.value,'"+slider.key+"')",
				value:sliderVal
			}
		)
        
        
        //<p><label>feedback</label></p>
		//<input onChange="sliderChange(this.value,'feedback')" id="feedback" type="range" min="1" max="100" value="50">
	  
	}
	removeSliders(){
		//this.visual.removeAllElements(".slidecontainer div#effect_sliders")
		this.visual.removeElement("div#effect_sliders")
	}
	//effects
	initEffects(){
		for(var i = 0; i < this.effectList.length; i++){
			var effect = this.effectList[i]
			this.visual.addElement('#effectList',{element:"option",text:effect.text,id:effect.id+'_option',onClick:"",value:effect.value})
		}
	}
	addEffect(effectid){
		if(effectid === "-") return false
        console.log(effectid)
        var found = this.effectList.find( effect => { return effect.id === effectid} )
        //console.log(found)
        //add actuall effect to sound
        this.activeEffectList[effectid] = new Pizzicato.Effects[found.id](found.config)
        this.sound.addEffect(this.activeEffectList[effectid]);
        //resolve visulas (move to visual class?)
        this.visual.getElement('#'+found.id+'_option').attr('disabled','disabled')
        this.visual.addElement('.effectcontainer',{element:'div',text:found.text,id:found.id,onClick:found.onClick,value:found.value})
        //console.log('aa',found.id,'#'+found.id)
        this.visual.addElement('#'+found.id,{element:'i',class:"fas fa-times-circle",text:'',id:'x'+found.id,onClick:"removeEffect('"+found.id+"')"})
        this.visual.addElement('#'+found.id,{element:'i',class:"fas fa-edit ",text:'',id:'e'+found.id,onClick:"editEffect('"+found.id+"')"})
		
		//this.visual.getElement('#effectList').selectedIndex = 0
		this.removeSliders()
	}	
	editEffect(effectid){
		this.removeSliders()
		console.log(effectid)
        var found = this.effectList.find( effect => { return effect.id === effectid} )
        console.log(found)
        
        var keys = Object.keys(found.config);
        
        this.visual.addElement(
			'.slidecontainer',
			{element:'div',id:"effect_sliders"}
		)
        for(var c = 0;c < keys.length; c++){
			this.addSlider(found,{key:keys[c],val:found.config[keys[c]]})
		}
        //        
	}
	changeEffect(effectid, value, key){	
		var effect = this.activeEffectList[effectid]	
		var found = this.effectList.find( effect => { return effect.id === effectid} )
		console.log('changeEffect',effectid, value, key)
		if(typeof found.config[key] === Boolean){
			console.log('boolean')
			if(value < 50){
				effect[key] = false
				found.config[key] = false
			}else{
				effect[key] = true
				found.config[key] = true	
			} 
			
		}else
			if(found.config_range !== undefined && found.config_range[key] !== undefined){
				
				effect[key] = found.config[key]  = found.config_range.min + (
					(found.config_range.max - found.config_range.min) / 100 * value
				)
			}else{
				console.log('trololo 100',found)
				effect[key] = value/100
				found.config[key] = value/100
			
			}
		console.log(effect,effect[key] )
	}
	removeEffect(effectid){
		console.log(this)
		this.sound.removeEffect(this.activeEffectList[effectid]);
		
		this.visual.removeElement('#'+effectid)
		
		this.visual.getElement('#'+effectid+'_option').attr('disabled',null)//.removeAttribute('disabled')
        this.removeSliders()
	}
	elementHide(selector){
		this.visual.getElement(selector).attr('class','hidden')
	}
	elementShow(selector){
		this.visual.getElement(selector).attr('class','')
	}
	//old
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
	
	
	onSoundLoaded() {
		this.visual.doTheStuff(this.sound)
		this.sound.play()
	}
}
