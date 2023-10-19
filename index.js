const {parse} = require('csv-parse');
const fs = require('fs');
const habitablePlanets = [];

const upperLimit = 1.11;
const lowerLimit = 0.66;

let isHabitable = (obj) =>{
    return obj['koi_disposition'] === 'CONFIRMED'
        && obj['koi_insol'] > 0.36 && obj['koi_insol'] < 1.11
        && obj['koi_prad'] < 1.6;
}

fs.createReadStream("./003 kepler-data.csv")
.pipe(parse({
    comment: "#",
    columns: true
}))
.on('data', (data) =>{
    if(isHabitable(data)){
        habitablePlanets.push(data) 
    }
    
})
.on('error', (error) => console.log(error))
.on('end', () =>{
    console.log(habitablePlanets.map((x,y) =>{
        return x['kepler_name'];
    }))
    console.log(`${habitablePlanets.length} is the number of habitable planets`)
})
// parse()