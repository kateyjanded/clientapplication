
export function ParseIPRTable(payload) {
    let lines = payload.split('\n')
    lines = SqueezeOutNonEssentials(lines)
    console.log(lines)
    var rates = []
    var pressures = []
    var npoints = parseInt(lines[pointers["Number of Rates"]]);
    var QPStartIndex = pointers["Table of Rates Pwf Twf"];
    var onePastEnd = npoints + QPStartIndex;  
    for(var i = 3; i < onePastEnd; ++i)
    {
        var line = lines[i];
        var lineSplit = line.split('\t');
        rates.push(parseFloat(lineSplit[0]));
        pressures.push(parseFloat(lineSplit[1]));
    }
    var AOFOffset = 0;
    var TotalGOROffset = pointers["Total GOR"];
    var WaterCutOffset = pointers["Water Cut"];
    var ReservoirPressureOffset = pointers["Reservoir Pressure"];
    var ReservoirTemperatureOffset = pointers["Reservoir Temperature"];
    var WaterGasRatioOffset = pointers["Water Gas Ratio"];
    var CondensateGasRatioOffset = pointers["Condensate Gas Ratio"];
    var AOFIndex = onePastEnd + AOFOffset;
    var TotalGORIndex = onePastEnd + TotalGOROffset;
    var WaterCutIndex = onePastEnd + WaterCutOffset;
    var ReservoirPressureIndex = onePastEnd + ReservoirPressureOffset;
    var ReservoirTemperatureIndex = onePastEnd + ReservoirTemperatureOffset;
    var WaterGasRatioIndex = onePastEnd + WaterGasRatioOffset;
    var CondensateGasRatioIndex = onePastEnd + CondensateGasRatioOffset;
    
    var result = 
    {
        Rates: rates,
        Pressures: pressures,
        AOF: parseFloat(lines[AOFIndex]),
        TotalGOR: parseFloat(lines[TotalGORIndex]),
        WaterCut : parseFloat(lines[WaterCutIndex]),
        WaterGasRatio: parseFloat(lines[WaterGasRatioIndex]),
        CondensateGasRatio: parseFloat(lines[CondensateGasRatioIndex]),
        ReservoirPressure: parseFloat(lines[ReservoirPressureIndex]),
        ReservoirTemperature: parseFloat(lines[ReservoirTemperatureIndex])
    };

    return result;
}
function SqueezeOutNonEssentials(payload) {
    var listOfLines = []
    payload.forEach(element => {
        if (StartsWithANumber(element)) {
            listOfLines.push(element.trim())
        }
    });
    return listOfLines
}
function StartsWithANumber(payload)
{
    var pattern = /^\s*\d+/;

    var re = new RegExp(pattern);

    return re.test(payload);
}
const pointers = 
{
    "Well Fluid Type": 0 ,        
    "Well Type": 1,                
    "Number of Rates" : 2,
    "Table of Rates Pwf Twf": 3,
    "AOF": 0,
    "Reservoir Pressure": 1,
    "Reservoir Temperature": 2,
    "Water Cut": 3,
    "Water Gas Ratio": 4,
    "Total GOR": 5,
    "Condensate Gas Ratio": 6 ,
    "Oil Gravity": 7,
    "Gas Gravity": 8,
    "Water Salinity": 9,
    "H2S Mole Percent": 10 ,
    "CO2 Mole Percent": 11,
    "N2 Mole Percent": 12 ,
    "Relative Permeability Flag": 13 ,
    "Residual Water Saturation": 14 ,
    "Residual Oil Saturation": 15,
    "Water EndPoint": 16,
    "Oil EndPoint": 17,
    "Water Exponent": 18,
    "Oil Exponent": 19,
    "Water Cut During Test":20,
    "Compaction Permeability Reduction Model": 21, 
    "Vogel Correction Flag Flag": 22          
};
  