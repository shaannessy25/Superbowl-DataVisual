
var pack = d3.pack()
    .size([500, 500 - 50]) // <- size

d3.json('../data/superbowl.json').then((data) => {
    const width = 950
    const height = 800
    const margin = 60
    const points = data.map((d) => d['Winner Pts'])
    const teamNames = data.map((d) => d.Winner)

    let uniq = [...new Set(teamNames)]
    console.log(uniq)

    const svg = d3.select('body')
                .append('svg')
                .attr('width', width)
                .attr('height', height)



    const xScale = d3.scaleBand()
                      .domain([uniq])
                      .range([0, width - 100])
                      xScale.domain(uniq)
                
    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(points)])
                     .range([height/2, 0])




    const xAxis = d3.axisBottom(d3.scalePoint().domain([uniq]))
                    .scale(xScale)
                    .tickSizeOuter(0)


    const yAxis = d3.axisLeft()
                    .scale(yScale)
                    .tickSize(-width, 0, 0)


    const xAxisTranslate = height/ 2 + 10
    svg.append('g')
        .attr("transform", `translate(50, ${xAxisTranslate})`)
        .attr('x', width)
        .attr('y', 90)
        .style('font-size', '6pt')
        .call(xAxis)

    svg.append('g')
        .call(yAxis)
        .attr("transform", "translate(50, 10)")

    svg.selectAll()
       .data(data)
       .enter()
       .append('rect')
       .attr('x', (d) => xScale(d.Winner))
       .attr('y', (d) => yScale(d["Winner Pts"]))
       .attr('height', (d) => height/2 - yScale(d["Winner Pts"]))
       .attr('width', xScale.bandwidth())
       .attr("transform", "translate(50, 10)")
       .attr('fill', 'steelblue')
       .attr('opacity', 0.6)
       .style('stroke', 'white')

    svg.append('text')
        .attr('opacity', 0.6)
        .attr('y', 1000)
        .attr('text-anchor', 'middle')
        .text("NFL Teams")
})







