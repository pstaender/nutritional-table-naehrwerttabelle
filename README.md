# Nutritional Table as CSV (en) / Nährwerttabelle als CSV (de)

  * [Generic foods / Allgemeine Lebensmittel](nutritions_generic_foods.csv)
  * [Branded foods / Industrielle Lebensmittel](nutritions_branded_foods.csv)

## Convert

Available languages are english and german, but french and italian can also be extracted (you need to edit the import script for that).

If you want to convert the data by yourself, follow this steps.

Install nodejs and all required npm modules, download the `xlsx` file from `Schweizer Bundesamt für Lebensmittelsicherheit und Veterinärwesen` and convert both tables to seperate csv files:

```sh
  $ npm install .
  $ curl http://www.naehrwertdaten.ch/Swiss%20Food%20Comp%20Data%20V5.3.xlsx > swiss_food_comp_data.xlsx
  $ node scripts/convert_from_excel_to_csv.js > nutritions_generic_foods.csv
  $ node scripts/convert_from_excel_to_csv.js --type branded > nutritions_branded_foods.csv
```

## Source

  * [Excel file](http://www.naehrwertdaten.ch/request?xml=MessageData&xml=MetaData&xsl=Download&lan=de&pageKey=Start)

## Copyright and rights of use

All data is by [Schweizer Bundesamt für Lebensmittelsicherheit und Veterinärwesen](https://www.blv.admin.ch/blv/de/home.html).

As stated on their homepage, the usage depends on the following conditions (translated to english via google translate):

  The download is free of charge and the data may also be used for commercial purposes (for example, inclusion in nutritional calculation software or nutritional diary app) and scientific purposes, stating a source note.

  Das Herunterladen ist kostenlos und die Daten dürfen unter Angabe eines Quellenvermerks auch für kommerzielle (z.B. Einbindung in Nährwertberechnungssoftware oder Ernährungstagebuch-App) und wissenschaftliche Zwecke verwendet werden.
