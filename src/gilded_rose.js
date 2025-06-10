function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    
    if (item.name === 'Sulfuras, Hand of Ragnaros') {
      continue;
    }
    
    if (item.name === 'Aged Brie') {
      updateAgedBrie(item);
    } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      updateBackstagePasses(item);
    } else if (isConjured(item)) {
      updateConjuredItem(item);
    } else {
      updateNormalItem(item);
    }
    
    item.sell_in = item.sell_in - 1;
  }
}

function isConjured(item) {
  return item.name.indexOf('Conjured') === 0;
}

function increaseQuality(item, amount) {
  item.quality = Math.min(50, item.quality + amount);
}

function decreaseQuality(item, amount) {
  item.quality = Math.max(0, item.quality - amount);
}

function updateAgedBrie(item) {
  if (item.sell_in > 0) {
    increaseQuality(item, 1);
  } else {
    increaseQuality(item, 2);
  }
}

function updateBackstagePasses(item) {
  if (item.sell_in <= 0) {
    item.quality = 0;
  } else if (item.sell_in <= 5) {
    increaseQuality(item, 3);
  } else if (item.sell_in <= 10) {
    increaseQuality(item, 2);
  } else {
    increaseQuality(item, 1);
  }
}

function updateNormalItem(item) {
  if (item.sell_in > 0) {
    decreaseQuality(item, 1);
  } else {
    decreaseQuality(item, 2);
  }
}

function updateConjuredItem(item) {
  if (item.sell_in > 0) {
    decreaseQuality(item, 2);
  } else {
    decreaseQuality(item, 4);
  }
}