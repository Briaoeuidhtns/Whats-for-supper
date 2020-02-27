import { Recipe } from 'features/recipes/recipeSlice'

const recipes: Recipe[] = [
  {
    title: 'Arroz con Pollo',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Arroz_con_Pollo)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/3/39/Arroz-con-Pollo.jpg/300px-Arroz-con-Pollo.jpg',
    tags: ['Chicken', 'Spanish'],
  },
  {
    title: 'Arroz Negro',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Arroz_Negro)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Arroz_negro_02.JPG/350px-Arroz_negro_02.JPG',
    tags: ['Squid', 'Spanish'],
  },
  {
    title: 'Bangers & Mash',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Bangers_%26_Mash)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/6/68/Bangers_and_mash_1.jpg/250px-Bangers_and_mash_1.jpg',
    tags: ['Pork', 'British'],
  },
  {
    title: 'Barbecued Spare Ribs',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Barbecued_Spare_Ribs)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/1/15/Spare_ribs_with_Chinese_barbecue_sauce_cropped.jpg/300px-Spare_ribs_with_Chinese_barbecue_sauce_cropped.jpg',
    tags: ['Beef', 'Barbeque'],
  },
  {
    title: 'Boeuf Bourguignon',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Boeuf_Bourguignon)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/5/53/Boeuf_bourguignon_servi_avec_des_p%C3%A2tes.jpg/290px-Boeuf_bourguignon_servi_avec_des_p%C3%A2tes.jpg',
    tags: ['Beef', 'French'],
  },
  {
    title: 'Bulgogi',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Bulgogi)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Korean.food-Bulgogi-01.jpg/300px-Korean.food-Bulgogi-01.jpg',
    tags: ['Beef', 'Korean'],
  },
  {
    title: 'Calzone',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Calzone)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/6/6d/20000227--calzone.jpg/300px-20000227--calzone.jpg',
    tags: ['Pork', 'Beef', 'Italian'],
  },
  {
    title: 'Chicken Biryani',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Chicken_Biryani)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/0/0c/BurmeseBiryani.jpg/300px-BurmeseBiryani.jpg',
    tags: ['Chicken', 'Italian'],
  },
  {
    title: 'Chicken Curry',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Chicken_Curry)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Chicken_Karaage_Curry%2C_Y.Izakaya%2C_Paris_001.jpg/250px-Chicken_Karaage_Curry%2C_Y.Izakaya%2C_Paris_001.jpg',
    tags: ['Chicken', 'Indian'],
  },
  {
    title: 'Chicken Tikka Masala',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Chicken_Tikka_Masala)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/1/13/Chicken_Tikka_Masala_Curry.png/250px-Chicken_Tikka_Masala_Curry.png',
    tags: ['Chicken', 'Asian'],
  },
  {
    title: 'Chicken Vindaloo',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Chicken_Vindaloo)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Chicken_Vindaloo.jpeg/300px-Chicken_Vindaloo.jpeg',
    tags: ['Chicken', 'Indian'],
  },
  {
    title: 'Chow Mein',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Chow_Mein)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Chow_mein_1_by_yuen.jpg/300px-Chow_mein_1_by_yuen.jpg',
    tags: ['Egg', 'Chinese'],
  },
  {
    title: 'Com Chien',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Com_Chien)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Com_chien.jpg/300px-Com_chien.jpg',
    tags: ['Egg', 'Chinese'],
  },
  {
    title: 'Coronation Chicken',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Coronation_Chicken)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/2/20/Coronation_Chicken.jpg/250px-Coronation_Chicken.jpg',
    tags: ['Chicken', 'British'],
  },
  {
    title: 'Crispy Chicken',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Crispy_Chicken)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Burger_King_Chicken_Nuggets_%2815423233415%29.jpg/250px-Burger_King_Chicken_Nuggets_%2815423233415%29.jpg',
    tags: ['Chicken', 'American'],
  },
  {
    title: 'Curry Chicken',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Curry_Chicken)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Indian_Curry_Chicken.jpg/250px-Indian_Curry_Chicken.jpg',
    tags: ['Chicken', 'Indian'],
  },
  {
    title: 'Deep Dish Pizza',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Deep_Dish_Pizza)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Pepperoni_pizza.jpg/300px-Pepperoni_pizza.jpg',
    tags: ['Pork', 'Beef', 'American'],
  },
  {
    title: 'Fleischkrapfen',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Fleischkrapfen)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/2/24/Fleischkrapfen_on_plate.jpg/250px-Fleischkrapfen_on_plate.jpg',
    tags: ['Pork', 'Austrian'],
  },
  {
    title: 'Frikadeller',
    description:
      '[Wikibook Cookbook link](https://en.wikibooks.org/wiki/Cookbook:Frikadeller)',
    image:
      '//upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Frikadeller.jpg/300px-Frikadeller.jpg',
    tags: ['Pork', 'Beef', 'German'],
  },
]
export default recipes
