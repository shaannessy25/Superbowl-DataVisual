// var width = 400, height = 300;

// var data = [10, 15, 20, 25, 30];
// var svg = d3.select("body")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);

// var xscale = d3.scaleLinear()
//     .domain([0, d3.max(data)])
//     .range([0, width - 100]);

// var yscale = d3.scaleLinear()
//         .domain([10, d3.max(data)])
//         .range([height/2, 0]);

// var x_axis = d3.axisBottom().scale(xscale);

// var y_axis = d3.axisLeft().scale(yscale);

//     svg.append("g")
//        .attr("transform", "translate(50, 10)")
//        .call(y_axis);

// var xAxisTranslate = height/2 + 10;

//     svg.append("g")
//             .attr("transform", "translate(50, " + xAxisTranslate  +")")
//             .call(x_axis)




var pack = d3.pack()
    .size([500, 500 - 50]) // <- size

d3.json('../data/superbowl.json').then((data) => {
    const width = 1000
    const height = 500

    const points = data.map((d) => d['Winner Pts'])
    const teamNames = data.map((d) => d.Winner)

    let uniq = [...new Set(teamNames)]
    const teams = uniq.join(" ")
    console.log(teams)

    const svg = d3.select('body')
                .append('svg')
                .attr('width', width)
                .attr('height', height)


    
    const xScale = d3.scaleOrdinal()
                    .domain([teams])
                    .range([0, width - 100])
                
    const yScale = d3.scaleLinear()
                     .domain([d3.min(points), d3.max(points)])
                     .range([height/2, 0])

    const xAxis = d3.axisBottom()
                    .scale(xScale)
                    // .tickSize([0, 22])

    const yAxis = d3.axisLeft()
                    .scale(yScale)


    const xAxisTranslate = height/ 2 + 10
    svg.append('g')
        .attr("transform", `translate(50, ${xAxisTranslate})`)
        .style('font-size', '6pt')
        .call(xAxis)

    svg.append('g')
        .call(yAxis)
        .attr("transform", "translate(50, 10)")



})






