/*
  Speisekarte Bombay Freising
  Eintrag: [Nr, Name, Beschreibung, Preis, Tags]
  Tags: v = vegetarisch, n = vegan erhältlich, s = scharf, S = sehr scharf,
        t = beliebt, a = alkoholhaltig (ab 18)
  Preise einfach hier ändern – die Seite zieht sich alles automatisch von hier.
*/
const MENU = [
  { id: 'warme-vorspeisen', name: 'Warme Vorspeisen',
    note: 'Alle warmen Vorspeisen werden mit 3 verschiedenen Dips serviert. Alle Pakoras werden in Kichererbsenmehl gewendet und frittiert.',
    items: [
      [15, 'Vegetable Pakora', 'Frisches, gemischtes Gemüse', '5,90', 'v'],
      [16, 'Onions Bhaji', 'Zwiebelringe, kräftig gewürzt und frittiert', '5,90', 'v'],
      [17, 'Paneer Pakora', 'Frischer hausgemachter Käse', '5,90', 'v'],
      [18, 'Fish Pakora', 'Zartes Seelachsfilet', '5,90', ''],
      [19, 'Chicken Pakora', 'Zartes Hühnerfleisch', '5,90', ''],
      [20, 'Jheenga Pakora', 'Marinierte Riesengarnelen ohne Schale', '8,90', ''],
      [21, 'Vegetable Samosa', '2 kleine Pasteten mit frischem Gemüse gefüllt', '5,90', 'v'],
      [22, 'Mixed Starter Dish', 'Gemischter Vorspeisenteller für 2 Personen', '13,50', '']
    ] },
  { id: 'kalte-vorspeisen', name: 'Kalte Vorspeisen', note: '',
    items: [
      [10, 'Chicken-Chana-Chat Delhi', 'Indischer Hühnerfleisch- und Kichererbsen-Salat', '5,50', '']
    ] },
  { id: 'suppen', name: 'Suppen', note: '',
    items: [
      [1, 'Daal-Shorba', 'Linsensuppe', '4,90', ''],
      [2, 'Sabzi-Shorba', 'Gemüsesuppe', '4,90', ''],
      [3, 'Bohnensuppe', 'Bohnensuppe', '4,90', ''],
      [4, 'Chicken-Shorba', 'Hühnerfleischsuppe', '4,90', ''],
      [5, 'Tomatensuppe', 'Tomatensuppe', '4,90', '']
    ] },
  { id: 'salate', name: 'Salate', note: '',
    items: [
      [28, 'Salat Saison', 'Gemischter Salat mit French Dressing oder Essig und Öl', '5,90', 'v'],
      [29, 'Tomatensalat', 'Mit Zwiebeln, Essig und Öl', '5,90', 'v'],
      [30, 'Salat Bombay', 'Gemischter Salat mit Kichererbsen, Ananas, Käse und Mais', '9,50', 'v'],
      [31, 'Indien Salat', 'Mit gebratenen Hühnerbrustfiletstreifen, frischen Champignons, Mais und Zwiebeln', '9,50', '']
    ] },
  { id: 'fisch', name: 'Fisch-Spezialitäten', note: 'Mit ofenfrischem Naan, Reis und Soßen serviert.',
    items: [
      [89, 'Fisch Curry', 'Fischfilet in Currysoße', '14,90', 'S'],
      [90, 'Fisch Chili', 'Fischfilet in Chilisoße', '14,90', 'S'],
      [91, 'Fisch Masala', 'Fischfilet nach ostindischer Art zubereitet', '14,90', ''],
      [92, 'Jheenga Curry', 'Riesengarnelen ohne Schale in Currysoße mit feinen Gewürzen', '17,90', ''],
      [93, 'Jheenga Masala', 'Riesengarnelen ohne Schale in kräftiger Masala-Soße', '17,90', ''],
      [94, 'Jheenga Khumb Wala', 'Riesengarnelen ohne Schale mit frischen Pfifferlingen, Knoblauch und Ingwer in Mandel-Safransoße', '17,90', ''],
      [95, 'Jheenga Goa', 'Riesengarnelen ohne Schale in Kokosnusssoße mit ausgewählten Gewürzen nach Goa-Art', '17,90', 'S'],
      [96, 'Jheenga Mango', 'Riesengarnelen ohne Schale in frischer Mango-Safran-Cashewnusssoße, fein gewürzt', '17,90', '']
    ] },
  { id: 'ente', name: 'Enten-Spezialitäten', note: 'Mit ofenfrischem Naan, Reis und Soßen serviert.',
    items: [
      [81, 'Duck Curry', 'Entenbrustfilet in Currysoße mit feinen Gewürzen', '16,50', ''],
      [82, 'Duck Khumb Wala', 'Entenbrustfilet mit frischen Champignons, Knoblauch und Ingwer in Mandel-Safransoße', '16,50', ''],
      [83, 'Duck Jalfrezi', 'Entenbrustfilet mit Paprika, Zwiebeln, Tomaten, grünem Chili und frischem Gemüse', '16,50', 's'],
      [84, 'Duck Bombay', 'Entenbrustfilet in Masala-Soße', '16,50', ''],
      [85, 'Duck Mango', 'Entenbrustfilet in Mango-Safran-Cashewnusssoße, fein gewürzt', '16,50', ''],
      [86, 'Duck Korma', 'Entenbrustfilet in Kokosnusssoße, fein gewürzt', '16,50', ''],
      [87, 'Duck Palak', 'Entenbrustfilet mit Spinat', '16,50', ''],
      [88, 'Duck Vindaloo', 'Entenbrustfilet mit Spezialgewürzen aus Goa', '16,50', 'S']
    ] },
  { id: 'huhn', name: 'Hühnerfleisch-Spezialitäten', note: 'Mit ofenfrischem Naan, Reis und Soßen serviert.',
    items: [
      [51, 'Chicken Curry', 'Zartes Hühnerfleisch in Currysoße mit feinen Gewürzen', '14,90', 't'],
      [52, 'Chicken Badam Pasanda', 'Zartes Hühnerfleisch in Nusssoße mit Kokosnussflocken und gemahlenen Mandeln', '14,90', ''],
      [53, 'Chicken Sabzi', 'Zartes Hühnerfleisch mit verschiedenem frischem Gemüse', '14,90', ''],
      [54, 'Karahi Chicken', 'Gebratenes Hühnerfleisch in Currysoße, in der Pfanne serviert', '14,90', ''],
      [55, 'Chicken Jalfrezi', 'Hühnerfleisch ohne Knochen, mit Paprika, Zwiebeln, Tomaten und grünem Chili', '14,90', 's'],
      [56, 'Chicken Vindaloo', 'Hühnerfleisch mit Spezialgewürzen aus Goa', '14,90', 'S'],
      [57, 'Butter Chicken', 'Zartes Hühnerfleisch in Butter-Tomaten-Soße', '14,90', 't'],
      [58, 'Chicken Tikka Masala', 'Zartes Hühnerfleisch in Masalasoße', '14,90', 't'],
      [60, 'Chicken Palak', 'Zartes Hühnerfleisch mit Spinat, nach berühmter nordindischer Art', '14,90', ''],
      [61, 'Mango Chicken', 'Hühnerfleisch in frischer Mango-Safran-Cashewnusssoße', '14,90', ''],
      [62, 'Chicken Korma', 'Hühnerfleisch in frischer Kokosnusssoße', '14,90', ''],
      [63, 'Chicken Ananas', 'Zartes Hühnerfleisch mit Ananas', '14,90', ''],
      [64, 'Chicken Dal', 'Zartes Hühnerfleisch mit gelben indischen Linsen gegart', '14,90', ''],
      [65, 'Chili Chicken', 'Zartes Hühnerbrustfilet, gebraten mit grünem Chili', '14,90', '']
    ] },
  { id: 'lamm', name: 'Lamm-Spezialitäten', note: 'Mit ofenfrischem Naan, Reis und Soßen serviert.',
    items: [
      [66, 'Lamm Curry', 'Zartes Lammfleisch in Currysoße', '15,90', ''],
      [67, 'Rogan Josh', 'Zartes Lammfleisch in Rogan-Currysoße', '15,90', ''],
      [68, 'Mughlai Meat', 'Zartes Lammfleisch in Mandel-Safran-Sahnesoße', '15,90', ''],
      [69, 'Bhunna Ghosht', 'Gebratenes Lammfleisch mit Tomaten und Röstzwiebeln in kräftiger Soße', '15,90', ''],
      [70, 'Ghosht Palak', 'Gebratenes Lammfleisch mit Spinat nach berühmter nordindischer Art', '15,90', ''],
      [71, 'Mutton Khumb Wala', 'Zartes Lammfleisch mit frischen Champignons, Knoblauch und Ingwer in Mandel-Safransoße', '15,90', ''],
      [72, 'Mutton Vindaloo', 'Zartes Lammfleisch mit Spezialgewürzen aus Goa', '15,90', 'S'],
      [73, 'Karahi Ghosht', 'Gebratenes Lammfleisch in Currysoße, in der Pfanne serviert', '15,90', ''],
      [74, 'Dal Gosht', 'Zartes Lammfleisch mit Korianderblättern und gelben Linsen', '15,90', ''],
      [75, 'Data Ghosht', 'Zartes Lammfleisch in Curry-Joghurt-Mandel-Soße', '15,90', ''],
      [76, 'Bhindi Ghosht', 'Zartes Lammfleisch mit Okragemüse', '15,90', ''],
      [77, 'Mango Lamb', 'Zartes Lammfleisch in frischer Mango-Safran-Cashewnusssoße', '15,90', ''],
      [78, 'Lamm Korma', 'Zartes Lammfleisch in Kokosnusssoße', '15,90', ''],
      [79, 'Lamm Tikka Masala', 'Zartes Lammfleisch in Masalasoße', '15,90', '']
    ] },
  { id: 'vegetarisch', name: 'Vegetarische Spezialitäten', note: 'Mit ofenfrischem Naan, Reis und Soßen serviert.',
    items: [
      [101, 'Malai Kofta', '2 Klößchen aus hausgemachtem Käse mit Kartoffeln und Nüssen', '12,90', 'v'],
      [102, 'Navratan Korma', 'Gemischtes Gemüse mit verschiedenen Zutaten, nach Mughlai-Art', '12,90', 'v'],
      [103, 'Shahi Paneer', 'Hausgemachter Käse in Butter-Tomaten-Sahne-Soße, fein gewürzt', '12,90', 'vt'],
      [104, 'Palak Paneer', 'Kräftiger Spinat mit hausgemachtem Käse, ayurvedische Art', '12,90', 'vt'],
      [105, 'Shahi Baingan', 'Auberginen mit hausgemachtem Käse und Ingwer in Mandelsoße, fein gewürzt', '12,90', 'vt'],
      [106, 'Sabzi Kofta', 'Gemüseklößchen in würziger Currysoße', '12,90', 'v'],
      [107, 'Chana Masala', 'Kichererbsen in Curry mit frischen Tomaten und Ingwer', '12,90', 'vnt'],
      [108, 'Dal Makhni', 'Indisches Nationalgericht: schwarze Linsen mit Butter zubereitet, ayurvedische Art', '12,90', 'vn'],
      [109, 'Karahi Paneer', 'Frischer, gebratener, hausgemachter Käse in Currysoße, in der Pfanne serviert', '12,90', 'v'],
      [110, 'Bhindi Masala', 'Frisches indisches Okragemüse in kräftiger Soße', '12,90', 'vnt'],
      [111, 'Mixed Vegetables', 'Gemischtes frisches Gemüse, pikant gewürzt', '12,90', 'vn'],
      [112, 'Baingan Ka Bharta', 'Frische Auberginen, püriert mit Zwiebeln und Tomaten, kräftig gewürzt', '12,90', 'vn'],
      [113, 'Aloo Tomaten Curry', 'Kartoffeln mit frischen Tomaten in Currysoße', '12,90', 'v'],
      [114, 'Aloo Baingan', 'Kartoffeln mit Auberginen in Masalasoße', '12,90', 'v'],
      [115, 'Dal Tarka', 'Gelbe indische Linsen', '12,90', 'v'],
      [116, 'Paneer Butter Masala', 'Käse in Masalasoße', '12,90', 'vt'],
      [117, 'Mushroom Paneer', 'Käse mit Champignons', '12,90', 'v'],
      [97, 'Aloo Palak', 'Kartoffeln mit Spinat', '12,90', 'v'],
      [98, 'Mushroom Bhaji', 'Champignons mit Zwiebeln in würziger Soße', '12,90', 'v'],
      [99, 'Jeera Aloo', 'Kartoffeln mit Kreuzkümmel', '12,90', 'v']
    ] },
  { id: 'reis', name: 'Reis-Spezialitäten', note: 'Zubereitet mit Basmati-Reis aus Nordindien.',
    items: [
      [118, 'Vegetable Biryani', 'Frisches, gemischtes Gemüse mit Mandeln und Rosinen', '13,90', 'v'],
      [119, 'Chicken Biryani', 'Hühnerfleisch mit Mandeln und Rosinen', '14,90', ''],
      [120, 'Mutton Biryani', 'Lammfleisch mit Mandeln und Rosinen', '15,90', ''],
      [121, 'Bombay Biryani', 'Mit Hühnerbrust- und Lammstreifen, Shrimps und Nüssen', '16,90', ''],
      [122, 'Jheenga Biryani', 'Riesengarnelen mit Mandeln und Rosinen', '19,90', ''],
      [123, 'Fisch Biryani', 'Fischfilet mit Mandeln und Rosinen', '17,90', '']
    ] },
  { id: 'tandoori', name: 'Tandoori – Khajana', note: 'Aus dem Holzkohlelehmofen. Mit ofenfrischem Naan, Reis und Soßen serviert.',
    items: [
      [37, 'Tandoori Chicken', 'Hähnchen, mariniert nach einem berühmten nordindischen Rezept (mit Knochen)', '16,90', ''],
      [38, 'Chicken Chili Tikka', 'Zartes, mariniertes Hühnerfleisch, gegrillt – Bengali-Art', '16,90', 'S'],
      [39, 'Chicken Tikka', 'Zarte marinierte Hühnerfleischstücke, gegrillt', '16,90', ''],
      [41, 'Haryali Malai Kebab', 'Zartes Hühnerfleisch in Joghurt mit Spinat-, Minze- und Koriandersoße mariniert, mit Beilage', '16,90', ''],
      [43, 'Vegetable Tandoori', 'Hausgemachter Käse, Blumenkohl, Tomaten, Zwiebeln, Zucchini, Auberginen und Paprika, in Joghurt und Gewürzen eingelegt, am Spieß gegrillt', '16,90', 'v'],
      [44, 'Fish Tikka', 'Frisches Seelachsfilet, in Joghurt und Gewürzen mariniert, knusprig gegrillt', '16,90', ''],
      [45, 'Jheenga Tandoori', 'Riesengarnelen ohne Schale, in Joghurt und Gewürzen mariniert, knusprig gegrillt', '19,90', ''],
      [46, 'Mixed-Grill-Platte', 'Etwas von allen Tandoori-Köstlichkeiten mit einem Stück Seelachs und einer Garnele', '19,90', ''],
      [47, 'Bombay Teller', 'Gebratenes Hühner- und Lammfleisch mit frischem Gemüse, Reis und Naan', '16,90', ''],
      [48, 'Garlic Chicken Tikka', 'Mariniertes Hühnerbrustfilet in Knoblauch-Joghurt-Soße', '16,90', '']
    ] },
  { id: 'brot', name: 'Tandoori-Brot', note: 'Frisch gebackenes Fladenbrot aus dem Holzkohlelehmofen.',
    items: [
      [157, 'Naan', 'Ovales Brot aus Hefeteig', '2,50', ''],
      [158, 'Butter Naan', 'Ovales Brot aus Hefeteig mit Butter', '2,90', ''],
      [159, 'Garlic Naan', 'Ovales Brot aus Hefeteig mit Knoblauch', '3,50', 't'],
      [160, 'Keema Naan', 'Ovales Brot aus Hefeteig, gefüllt mit Hühnerfleisch', '4,90', ''],
      [161, 'Pashawari Naan', 'Ovales süßes Brot aus Hefeteig, gefüllt mit hausgemachtem Käse, Cashewnüssen und Hühnerfleisch', '4,90', ''],
      [162, 'Roti', 'Flaches Vollkornfladenbrot', '2,50', ''],
      [163, 'Batura', 'Ovales Brot aus Hefeteig, frittiert', '3,00', ''],
      [164, 'Vegetable Paratha', 'Brot, gefüllt mit frischem Gemüse', '4,90', ''],
      [165, 'Paneer Kulcha', 'Hefeteigbrot, gefüllt mit hausgemachtem Käse', '4,90', ''],
      [166, 'Pappad', 'Linsenwaffeln mit 3 verschiedenen Soßen', '2,50', ''],
      [167, 'Aloo Paratha', '', '4,90', '']
    ] },
  { id: 'thali', name: 'Thalis', note: 'Verschiedene Gerichte auf einem Teller, serviert auf original indischen Platten. Eine Spezialität unseres Chefkochs – lassen Sie sich überraschen.',
    items: [
      [127, 'Vegetable Thali', '3 verschiedene Gemüsegerichte, Raita, Salat, Pappad und Basmati-Reis', '15,90', 'v'],
      [128, 'Bombay Thali', '1 Lamm-, 1 Hühnchen-, 1 Entengericht, Raita, Salat, Pappad, Naan und Basmati-Reis', '16,90', ''],
      [129, 'Fish Thali', '3 verschiedene Fischgerichte, Raita, Salat, Pappad und Basmati-Reis', '18,90', ''],
      [130, 'Vegetable Thali Grand (für 2 Personen)', 'Verschiedene Gemüsegerichte, Raita, Salat, Pappad und Basmati-Reis', '29,90', 'v'],
      [131, 'Bombay Thali Grand (für 2 Personen)', 'Lamm-, Hühnchen- und Entengericht, Raita, Salat, Pappad, Naan und Basmati-Reis', '32,90', '']
    ] },
  { id: 'beilagen', name: 'Beilagen', note: 'Zu allen Speisen zu empfehlen.',
    items: [
      [137, 'Plain Dahi', 'Einfacher Joghurt', '2,20', 'v'],
      [138, 'Kheera Ka Raita', 'Gurken-Joghurt', '2,90', 'v'],
      [139, 'Mixed Raita', 'Joghurt mit Gurken, Zwiebeln, Tomaten und Koriander', '3,50', 'v'],
      [144, 'Basmati-Reis', 'Einfacher Basmati-Reis', '4,50', ''],
      [145, 'Mixed Pickles', '', '2,50', ''],
      [146, 'Extra Soße', '', '2,50', '']
    ] },
  { id: 'nachspeisen', name: 'Nachspeisen', note: '',
    items: [
      [177, 'Gulab Jamun', 'Bällchen aus Milch und Quark, in Honig gebacken', '4,90', 'v'],
      [178, 'Halwa', 'Gekochter Grieß mit gemahlenen Kokosflocken und Rosinen in Milch und Kokosmilch', '5,20', 'v'],
      [179, 'Mango Creme', 'Hausgemachte Creme aus Mango, Cashewnüssen, Mandeln und Kokosnuss', '4,90', 'v']
    ] },
  { id: 'getraenke', name: 'Getränke', note: 'Alkoholische Getränke nur an Personen ab 18 Jahren.',
    items: [
      [null, 'Coca-Cola', '', '3,50', ''],
      [null, 'Coca-Cola Zero', '', '3,50', ''],
      [null, 'Fanta', '', '3,50', ''],
      [null, 'Spezi', '', '3,50', ''],
      [null, 'Sprite', '', '3,50', ''],
      [null, 'Wasser', '', '3,50', ''],
      [null, 'Mangosaft', '', '4,00', ''],
      [null, 'Lycheesaft', '', '4,00', ''],
      [null, 'Guavasaft', '', '4,00', ''],
      [null, 'Maracujasaft', '', '4,00', ''],
      [null, 'Mango Lassi', '', '7,50', ''],
      [null, 'Helles', '', '3,50', 'a'],
      [null, 'Weißbier', '', '3,50', 'a'],
      [null, 'Dunkelbier', '', '3,50', 'a'],
      [null, 'Weißbier alkoholfrei', '', '3,50', ''],
      [null, 'Leichtes Weißbier alkoholfrei', '', '3,50', '']
    ] },
  { id: 'wein', name: 'Wein', note: 'Nur an Personen ab 18 Jahren.',
    items: [
      [null, 'Weißwein 0,75 l', '', '12,90', 'a'],
      [null, 'Rotwein 0,75 l', '', '12,90', 'a']
    ] }
];
