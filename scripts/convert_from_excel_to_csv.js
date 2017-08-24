const xlsx = require('node-xlsx').default;
const flags = require('args')
  .option('file', 'xlsx file to read from', 'swiss_food_comp_data.xlsx')
  .option('type', 'which sheet to import (generic|branded)', 'generic')
  .parse(process.argv);

let fieldMapping = {
  "ID": "id",
  "ID V 4.0": "id_v4",
  "name D": "name_de",
  "synonyms D": "alias_de",
  "category D": "category_de",
  "name E": "name_en",
  "synonyms E": "alias_en",
  "category E": "category_en",
  "matrix unit": "matrix_unit",
  "specific gravity": "specific_gravity",
  "energy kcal": "energy[kcal]",
  "protein": "protein[g]",
  "alcohol": "alcohol[g]",
  "water": "water[g]",
  "carbohydrates, available": "carbohydrates[g]",
  "starch": "starch[g]",
  "sugars": "sugars[g]",
  "dietary fibres": "dietary_fibres[g]",
  "fat, total": "fat_total[g]",
  "cholesterol": "cholesterol[mg]",
  "fatty acids, monounsaturated": "fatty_acids_monounsaturated[g]",
  "fatty acids, saturated": "fatty_acids_saturated[g]",
  "fatty acids, polyunsaturated": "fatty_acids_polyunsaturated[g]",
  "vitamin A activity": "vitamin-a[rae]",
  "all-trans retinol equivalents": "all-trans_retinol_equivalents[rae]",
  "beta-carotene activity": "beta-carotene_activity[rae]",
  "beta-carotene": "beta-carotene[μg]",
  "vitamin B1 (thiamine)": "vitamin-b1_thiamine[μg]",
  "vitamin B2 (riboflavin)": "vitamin-b2_riboflavin[μg]",
  "vitamin B6 (pyridoxine)": "vitamin-b6_pyridoxine[μg]",
  "vitamin B12 (cobalamin)": "vitamin-b12_cobalamin[μg]",
  "niacin": "niacin[mg]",
  "folate": "folate[μg]",
  "pantothenic acid": "pantothenic_acid[mg]",
  "vitamin C (ascorbic acid)": "vitamin-c_ascorbic_acid[mg]",
  "vitamin D (calciferol)": "vitamin-d_calciferol[μg]",
  "vitamin E activity": "vitamin-e_activity[alpha-te]",
  "sodium (Na)": "sodium_na[mg]",
  "potassium (K)": "potassium[mg]",
  "chloride (Cl)": "chloride[mg]",
  "calcium (Ca)": "calcium[mg]",
  "magnesium (Mg)": "magnesium[mg]",
  "phosphorus (P)": "phosphorus[mg]",
  "iron": "iron[mg]",
  "iodide": "iodide[mg]",
  "zinc": "zinc[mg]",
}


const workSheets = xlsx.parse(flags.file);
const foods = flags.type === 'branded' ? workSheets[1] : workSheets[0];
const fields = foods.data[2];
const csvFields = Object.keys(fieldMapping).map(key => fieldMapping[key]);
const csvStringify = require('csv-stringify');

const rows = foods.data.slice(3).map((row) => {
  if (!row[0] && !row[1]) {
    // empty row
    return;
  }
  let data = {};
  Object.keys(fieldMapping).forEach((fieldName) => {
    let columnIndex = fields.indexOf(fieldName);
    if (columnIndex >= 0) {
        data[fieldMapping[fieldName]] = row[columnIndex];
    }
  });
  return data;
});

// write to stdout
csvStringify(rows, { header: true }, function(err, csvString){
  console.log(csvString);
});
