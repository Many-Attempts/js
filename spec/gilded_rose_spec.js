describe("Gilded Rose", function() {
  
  beforeEach(function() {
    items = []; // Reset items array before each test
  });
  it("should foo", function() {
    items = [ new Item("foo", 0, 0) ];
    update_quality();
    expect(items[0].name).toEqual("foo");
  });

  describe("Normal Items", function() {
    
    it("should decrease quality and sell_in by 1 for normal items", function() {
      items = [new Item("Normal Item", 5, 10)];
      update_quality();
      expect(items[0].sell_in).toEqual(4);
      expect(items[0].quality).toEqual(9);
    });

    it("should decrease quality by 2 when sell_in date has passed", function() {
      items = [new Item("Normal Item", 0, 10)];
      update_quality();
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(8);
    });

    it("should never have negative quality", function() {
      items = [new Item("Normal Item", 5, 0)];
      update_quality();
      expect(items[0].quality).toEqual(0);
    });

    it("should never have negative quality even when sell_in has passed", function() {
      items = [new Item("Normal Item", -1, 1)];
      update_quality();
      expect(items[0].quality).toEqual(0);
    });
  });

  describe("Aged Brie", function() {
    
    it("should increase quality as it ages", function() {
      items = [new Item("Aged Brie", 5, 10)];
      update_quality();
      expect(items[0].sell_in).toEqual(4);
      expect(items[0].quality).toEqual(11);
    });

    it("should increase quality by 2 when sell_in date has passed", function() {
      items = [new Item("Aged Brie", 0, 10)];
      update_quality();
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(12);
    });

    it("should never have quality greater than 50", function() {
      items = [new Item("Aged Brie", 5, 50)];
      update_quality();
      expect(items[0].quality).toEqual(50);
    });

    it("should never have quality greater than 50 even when sell_in has passed", function() {
      items = [new Item("Aged Brie", -1, 49)];
      update_quality();
      expect(items[0].quality).toEqual(50);
    });
  });
  describe("Sulfuras", function() {
      
    it("should never change quality or sell_in", function() {
      items = [new Item("Sulfuras, Hand of Ragnaros", 5, 80)];
      update_quality();
      expect(items[0].sell_in).toEqual(5);
      expect(items[0].quality).toEqual(80);
    });

    it("should never change quality or sell_in even when sell_in is 0", function() {
      items = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
      update_quality();
      expect(items[0].sell_in).toEqual(0);
      expect(items[0].quality).toEqual(80);
    });

    it("should never change quality or sell_in even when sell_in is negative", function() {
      items = [new Item("Sulfuras, Hand of Ragnaros", -1, 80)];
      update_quality();
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(80);
    });
  });
  
  describe("Backstage Passes", function() {
    
    it("should increase quality by 1 when sell_in is more than 10", function() {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)];
      update_quality();
      expect(items[0].sell_in).toEqual(14);
      expect(items[0].quality).toEqual(21);
    });

    it("should increase quality by 1 when sell_in is exactly 11", function() {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)];
      update_quality();
      expect(items[0].sell_in).toEqual(10);
      expect(items[0].quality).toEqual(21);
    });

    it("should increase quality by 2 when sell_in is 10", function() {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)];
      update_quality();
      expect(items[0].sell_in).toEqual(9);
      expect(items[0].quality).toEqual(22);
    });

    it("should increase quality by 2 when sell_in is between 6 and 10", function() {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 8, 20)];
      update_quality();
      expect(items[0].sell_in).toEqual(7);
      expect(items[0].quality).toEqual(22);
    });

    it("should increase quality by 2 when sell_in is exactly 6", function() {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 20)];
      update_quality();
      expect(items[0].sell_in).toEqual(5);
      expect(items[0].quality).toEqual(22);
    });

    it("should increase quality by 3 when sell_in is 5", function() {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)];
      update_quality();
      expect(items[0].sell_in).toEqual(4);
      expect(items[0].quality).toEqual(23);
    });

    it("should increase quality by 3 when sell_in is between 1 and 5", function() {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 3, 20)];
      update_quality();
      expect(items[0].sell_in).toEqual(2);
      expect(items[0].quality).toEqual(23);
    });

    it("should increase quality by 3 when sell_in is exactly 1", function() {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 20)];
      update_quality();
      expect(items[0].sell_in).toEqual(0);
      expect(items[0].quality).toEqual(23);
    });

    it("should drop quality to 0 after the concert", function() {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)];
      update_quality();
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });

    it("should never have quality greater than 50", function() {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)];
      update_quality();
      expect(items[0].quality).toEqual(50);
    });

    it("should handle quality cap when increasing by 2", function() {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)];
      update_quality();
      expect(items[0].quality).toEqual(50);
    });
  });
  describe("Conjured Items", function() {
    
    
    it("should decrease quality by 2 for conjured items (twice as fast as normal)", function() {
      items = [new Item("Conjured Mana Cake", 5, 10)];
      update_quality();
      expect(items[0].sell_in).toEqual(4);
      expect(items[0].quality).toEqual(8);
    });

    it("should decrease quality by 4 when sell_in date has passed (twice as fast as normal)", function() {
      items = [new Item("Conjured Mana Cake", 0, 10)];
      update_quality();
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(6);
    });

    it("should never have negative quality", function() {
      items = [new Item("Conjured Mana Cake", 5, 1)];
      update_quality();
      expect(items[0].quality).toEqual(0);
    });

    it("should never have negative quality even when sell_in has passed", function() {
      items = [new Item("Conjured Mana Cake", -1, 3)];
      update_quality();
      expect(items[0].quality).toEqual(0);
    });

    it("should work with any item name starting with 'Conjured'", function() {
      items = [new Item("Conjured Healing Potion", 5, 10)];
      update_quality();
      expect(items[0].sell_in).toEqual(4);
      expect(items[0].quality).toEqual(8);
    });
  });
  
});