const _effectList = [
	{
		element:'option',
		text:'Delay',
		id:'Delay',
		onClick:"",
		value:'Delay',
		config:{
			feedback: 0.5,
			time: 0.5,
			mix: 0.5
		}
	},
	{
		element:'option',
		text:'PingPongDelay',
		id:'PingPongDelay',
		onClick:"",
		value:'PingPongDelay',
		config:{
			feedback: 0.5,
			time: 0.5,
			mix: 0.5
		}
	},
	{
		element:'option',
		text:'DubDelay',
		id:'DubDelay',
		onClick:"",
		value:'DubDelay',
		config:{
			feedback: 0.5,
			time: 0.5,
			mix: 0.5,
			cutoff: 2000,
			
		},
		config_range:{
			cutoff:{
				min:0,
				max:4000
			}
		}
	},
	{
		element:'option',
		text:'Distortion',
		id:'Distortion',
		onClick:"",
		value:'Distortion',
		config:{
			gain: 0.5
		}
	},
	{
		element:'option',
		text:'Quadrafuzz',
		id:'Quadrafuzz',
		onClick:"",
		value:'Quadrafuzz',
		config:{
			lowGain: 0.5,
			midLowGain: 0.5,
			midHighGain: 0.5,
			highGain: 0.5,
		}
	},
	{
		element:'option',
		text:'Flanger',
		id:'Flanger',
		onClick:"",
		value:'Flanger',
		config:{
			time: 0.5,
			speed: 0.5,
			depth: 0.5,
			feedback: 0.5,
			mix: 0.5
		}
	},
	{
		element:'option',
		text:'Compressor',
		id:'Compressor',
		onClick:"",
		value:'Compressor',
		config:{ 
			threshold: -20, 
			knee: 22, 
			attack: 0.05, 
			release: 0.05, 
			ratio: 18,
		},
		config_range:{
			threshold:{
				min:-100,
				max:0
			},
			knee:{
				min:0,
				max:40
			},
			ratio:{
				min:0,
				max:10
			}
		}
	},
	{
		element:'option',
		text:'LowPassFilter',
		id:'LowPassFilter',
		onClick:"",
		value:'LowPassFilter',
		config:{
			frequency: 11025,
			peak: 10,
			
		},
		config_range:{
			frequency:{min: 10, max: 22050},
			peak:{min: 0.0001, max: 1000}
		}
	},
	{
		element:'option',
		text:'HighPassFilter',
		id:'HighPassFilter',
		onClick:"",
		value:'HighPassFilter',
		config:{
			frequency: 11025,
			peak: 10,
			
		},
		config_range:{
			frequency:{min: 10, max: 22050},
			peak:{min: 0.0001, max: 1000}
		
		}
	},
	{
		element:'option',
		text:'StereoPanner',
		id:'StereoPanner',
		onClick:"",
		value:'StereoPanner',
		config:{
			pan: 0.5,
			
		},
		config_range:{
			pan:{min:-1, max:1}
		}
	},
	{
		element:'option',
		text:'Convolver',
		id:'Convolver',
		onClick:"",
		value:'Convolver',
		config:{
			impulse: './path/to/your/impulse.wav',
			mix: 0.5
		}
	},
	{
		element:'option',
		text:'Reverb',
		id:'Reverb',
		onClick:"",
		value:'Reverb',
		config:{
			time: 1.5,
			decay: 1.5,
			reverse: false,//do smthng aboutit
			mix: 0.5
		},
		config_range:{
			decay:{min: 0, max: 10},
			time:{min: 0.0001, max: 10},
			
		}
	},
	{
		element:'option',
		text:'RingModulator',
		id:'RingModulator',
		onClick:"",
		value:'RingModulator',
		config:{
			speed: 1000,
			distortion: 25,
			mix: 0.5
		},
		config_range:{
			speed:{min: 0, max: 2000},
			distortion:{min: 0.2, max: 50}
		}
	},	
	{
		element:'option',
		text:'Tremolo',
		id:'Tremolo',
		onClick:"",
		value:'Tremolo',
		config:{
			speed: 10,
			depth: 0.5,
			mix: 0.5
		},
		config_range:{
			speed:{min: 0, max: 20},
			
		}
	},
	
	
]
