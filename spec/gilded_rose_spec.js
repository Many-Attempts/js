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


});