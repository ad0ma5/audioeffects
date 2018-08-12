class Visuals{
	constructor(params = {}){
	    this.shape = params.shape;
		this.width = Math.min(window.innerHeight, window.innerWidth)
		this.height = this.width
		this.numberOfPoints = this.width
		this.radius = 15
        this.analyser
        this.radiusScale
        this.colorScale
        this.displayData
        this.sound = params.sound
        this.displayVisuals = params.displayVisuals
        //if(this.displayVisuals)
			//this.doTheStuff()

	}

	setupAnalyser(sound) {
		this.analyser = Pz.context.createAnalyser()
		this.analyser.fftSize = this.nextPowerOf2(this.numberOfPoints) * 4
		this.displayData = new Uint8Array(this.analyser.frequencyBinCount)

		sound.connect(this.analyser)
	}

	setupVisualization() {
		if(this.displayVisuals){
			if (this.shape === "circle"){
				this.drawCircle()
			}
			else if (this.shape === "rect") {
				this.drawRect()
			}
		}

	}
	cleanVisualisation(){
		const svg = d3.select('svg')
		console.log(svg)
		const g = svg.select('g')
		g.remove()
	}
		
    drawRect() {
            const svg = d3.select('svg')
                .attr('width', this.width)
                .attr('height', this.height)

            const points = d3.range(this.numberOfPoints).map(this.phyllotaxis(this.radius))

            svg.append('g').selectAll(this.shape)
                .data(points)
                .enter()
                .append('rect')
                .attr('x', d => d.x)
                .attr('y', d => d.y)
                .attr('widh', this.radius)
                .attr('height', this.radius)

    }

    drawCircle() {
            const svg = d3.select('svg')
                  .attr('width', this.width)
                  .attr('height', this.height)

            const points = d3.range(this.numberOfPoints).map(this.phyllotaxis(this.radius))

            svg.append('g').selectAll(this.shape)
                .data(points)
                .enter()
                .append('circle')
                //.append(this.shape)
                .attr('cx', d => d.x)
                .attr('cy', d => d.y)
                .attr('r', 1)
    }

	setupScale() {
			//this.radiusScale = d3.scaleSqrt().domain([0, 255]).range([1, 32])
			this.radiusScale = d3.scaleSqrt().domain([0, 64,128, 192, 255]).range([1,8,16, 32, 64])
			//this.radiusScale = d3.scaleSqrt().domain([0, 255]).range([1, 16])
			this.colorScale = d3.scaleSqrt().domain([0, 64,128, 192, 255]).range(['#673ab7', '#e91e63','#0101DF','#9AFE2E','#F4FA58'])
			//this.colorScale = d3.scaleSqrt().domain([0, 255]).range(['#555555', '#aaaaaa'])
	}

	draw() {
		if(this.displayVisuals){
			this.analyser.getByteFrequencyData(this.displayData)
			const lowerCut = 0.15
			const upperCut = 0.1

			let data = this.displayData.slice(this.displayData.length * lowerCut, this.displayData.length - this.displayData.length * upperCut)

			if (this.shape === "rect") {
			    this.updateRect(data)
			}
			else if (this.shape === "circle"){
                this.updateCircle(data)
			}

			
		}
		
		window.requestAnimationFrame(() => this.draw())
	}

	updateRect(data) {
        d3.select('svg > g').selectAll(this.shape)
            .data(data)
            .attr('width', d => this.radiusScale(d))
            .attr('height', d => this.radiusScale(d))
            .attr('fill', d => this.colorScale(d))

	}

	updateCircle(data) {
        d3.select('svg > g').selectAll(this.shape)
            .data(data)
            .attr('r', d => this.radiusScale(d))
            .attr('fill', d => this.colorScale(d))
	}

	phyllotaxis(radius) {
			const theta = Math.PI * (3 - Math.sqrt(5))

			return i => {
			    let r = radius * Math.sqrt(i)
				let a = theta * i
				return {
					x: this.shapeLotterX(r,a),
					//x: this.width / 2 + r * Math.PI * Math.cos(a),
					//x: this.width / 2 + r * Math.PI * Math.cos(a)/Math.tan(a),
					//x: this.width / (2 + r * a/a*a/r),
					y: this.shapeLotterY(r, a)
					//y: height / 2 + r * Math.sin(a)/Math.tan(a)
					//y: this.height / (2 + r*r* a/r*a)
				}
			}
	}

	shapeLotterX(r, a) {
	        return this.width / 2 + r * Math.cos(a)

	}

	shapeLotterY(r, a) {
            return this.height / 2 + r * Math.sin(a)

    }



	nextPowerOf2(number){
			return Math.pow(2, Math.ceil(Math.log(number) / Math.log( 2 )))
	}
	changeVisual(checked){
		this.displayVisuals = checked
		this.cleanVisualisation()
		this.setupVisualization()
	}
	changeShape(shape){
		this.shape = shape
		this.cleanVisualisation()
		this.setupVisualization()
	}
	doTheStuff(sound){
		this.sound = sound
		console.log("doTheStuff started")
	////////////////////
		this.setupAnalyser(this.sound)
		this.setupVisualization()
		this.setupScale()
		window.requestAnimationFrame(() => this.draw())
		
	////////////////////
	}
	getElement(selector){
		return d3.select(selector)
	}
	addElement(selector,element){
		const selected = d3.select(selector)
		//console.log(selected)
		let newElement = selected.append(element.element)
		if(element.id !== undefined) newElement.attr('id',element.id)
		if(element.onChange !== undefined) newElement.attr('onChange',element.onChange)
		if(element.onClick !== undefined) newElement.attr('onClick',element.onClick)
		if(element.class !== undefined) newElement.attr('class',element.class)
		if(element.value !== undefined) newElement.attr('value',element.value)
		if(element.type !== undefined) newElement.attr('type',element.type)
		if(element.min !== undefined) newElement.attr('min',element.min)
		if(element.max !== undefined) newElement.attr('max',element.max)
		if(element.text !== undefined) newElement.text(element.text)
		//g.remove()
		//<input onChange="sliderChange(this.value,'feedback')" id="feedback" type="range" min="1" max="100" value="50">
	}
	removeElement(selector){
		console.log('remove',selector,this.getElement(selector))
		if(d3.select(selector)){
		//while(d3.select(selector) !== null){
			var selected = d3.select(selector)
			selected.remove()
		}
	}
	removeAllElements(selector){
		console.log('removeAllElements',selector,this.getElement(selector))
		if(d3.selectAll(selector)){
		//while(d3.select(selector) !== null){
			var selected = d3.selectAll(selector)
			selected.each().remove()
		}
	}
}
