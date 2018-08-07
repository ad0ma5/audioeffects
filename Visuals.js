class Visuals{
	construct(params = {}){
		this.sound = params.sound
		this.doTheStuff()
	}
	doTheStuff(){
	////////////////////
	const shape = "circle";
		const width = Math.min(window.innerHeight, window.innerWidth)
		const height = width
		const numberOfPoints = width
		const radius = 10
		
		let analyser
	  let radiusScale
	  let colorScale
	  let displayData
		
		setupAnalyser(this.sound)
		setupVisualization()
		setupScale()
		
		
		window.requestAnimationFrame(() => draw())
		
	
		this.sound.play()
		
	  function setupAnalyser(sound) {
		analyser = Pz.context.createAnalyser()
		analyser.fftSize = nextPowerOf2(numberOfPoints) * 4
		displayData = new Uint8Array(analyser.frequencyBinCount)
		
		sound.connect(analyser)
	  }
		
	  function setupVisualization() {
		
		const svg = d3.select('svg')
		  .attr('width', width)
		  .attr('height', height)
			
			const points = d3.range(numberOfPoints).map(phyllotaxis(radius))
			
			svg.append('g').selectAll(shape)
				.data(points)
				.enter()
					//.append('circle')
					.append(shape)
					.attr('cx', d => d.x)
					.attr('x', d => d.x)
					.attr('cy', d => d.y)
					.attr('y', d => d.y)
					.attr('widh', radius)
					.attr('height', radius)
					.attr('r', 1)
		}
		
		function setupScale() {
			//radiusScale = d3.scaleSqrt().domain([0, 255]).range([1, 32])
			radiusScale = d3.scaleSqrt().domain([0, 255]).range([1, 16])
			colorScale = d3.scaleSqrt().domain([0, 64,128, 192, 255]).range(['#673ab7', '#e91e63','#0101DF','#9AFE2E','#F4FA58'])
			//colorScale = d3.scaleSqrt().domain([0, 255]).range(['#555555', '#aaaaaa'])
		}
		
		function draw() {    
			analyser.getByteFrequencyData(displayData)
			const lowerCut = 0.15
			const upperCut = 0.1
			
			let data = displayData.slice(displayData.length * lowerCut, displayData.length - displayData.length * upperCut)

			d3.select('svg > g').selectAll(shape)
				.data(data)
				.attr('width', d => radiusScale(d))
				.attr('height', d => radiusScale(d))
				.attr('r', d => radiusScale(d))
				.attr('fill', d => colorScale(d))
			
			window.requestAnimationFrame(() => draw())
		}
		
		function phyllotaxis(radius) {
			const theta = Math.PI * (3 - Math.sqrt(5))
			
			return i => {
				let r = radius * Math.sqrt(i) 
				let a = theta * i
				return {
					x: width / 2 + r * Math.cos(a),
					//x: width / 2 + r * Math.PI * Math.cos(a),
					//x: width / 2 + r * Math.PI * Math.cos(a)/Math.tan(a),
					//x: width / (2 + r * a/a*a/r),
					y: height / 2 + r * Math.sin(a)
					//y: height / 2 + r * Math.sin(a)/Math.tan(a)
					//y: height / (2 + r*r* a/r*a)
				}
			}
		}
		
		function nextPowerOf2(number){
			return Math.pow(2, Math.ceil(Math.log(number) / Math.log( 2 ))) 
		}
	////////////////////	
	}
}
