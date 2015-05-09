var expect = require("chai").expect;
var Class = require("../");

describe("Implement Class Constructor",function() {
  var constructor = function(a,b) {
    this.a = a;
    this.b = b;
  };

  var Foo = Class({initialize: constructor});

  it("should return a class constructor function",function() {
    expect(Foo).to.be.a("function");
  });

  it("should be able define a class",function() {
    obj = new Foo(1,2);
    expect(obj.constructor).to.eq(Foo);
    expect(obj.a).to.eql(1);
    expect(obj.b).to.eql(2);

    obj2 = new Foo(3,4);
    expect(obj2.a).to.eql(3);
    expect(obj2.b).to.eql(4);
  });

  it("should be able define a class without constructor",function() {
    klass = Class({});
    obj = new klass()
    expect(obj.constructor).to.eq(klass);
  });
});

describe("Implement Instance Methods",function() {
  var Foo = Class({
    initialize: function(a,b) {
      this.a = a;
      this.b = b;
    },

    getA: function() {
      return this.a;
    },

    getB: function() {
      return this.b;
    }
  });

  var foo = new Foo(1,2);

  it("should be able to define methods",function() {
    expect(foo.getA).to.be.a("function");
    expect(foo.getB).to.be.a("function");

    expect(foo.getA()).to.eq(1);
    expect(foo.getB()).to.eq(2);
  });

  it("should not define `initialize` as a method",function() {
    expect(foo.initialize).to.be.undefined;
  });
});

describe("Implement Class __super__",function() {
  var A = Class({
    a: function() {
      return 1;
    }
  });

  var B = Class({
    b: function() {
      return 2;
    }
  },A);

  it("should set the __super__ class property to the parent class",function() {
    expect(B.__super__).to.eq(A);
  });

  it("should set Object as the default __super__ class",function() {
    expect(A.__super__).to.eq(Object);
  });
});

describe("Implement Methods Inheritance", function() {
  var A = Class({
    a: function() {
      return 1;
    }
  });

  var B = Class({
    b: function() {
      return 2;
    }
  },A);

  var b = new B();

  describe("b",function() {
    it("should be an instance of B",function() {
      expect(b.constructor).to.eq(B);
    });

    it("should be able to call method `a` through inheritance",function() {
      expect(b.a).to.be.a("function");
      expect(b.a()).to.be.eq(1);
    });

    it("should not have method `a` defined directly on the object",function() {
      expect(b.hasOwnProperty("a")).to.be.false;
    });

    it("should not have method `a` defined directly on the prototype of B",function() {
      expect(B.constructor.hasOwnProperty("a")).to.be.false;
    });
  });
});

describe("Implement Super call",function() {
  var A = Class({
    foo: function(a,b) {
      return [this.n,a,b];
    },

    bar: function() {
      return 1;
    },

    self: function() {
      return this;
    }
  });

  var B = Class({
    foo: function(a,b) {
      return this.super("foo",a*10,b*100);
    },

    bar: function() {
      return 20 + this.super("bar");
    },

    self: function() {
      return this.super("self");
    }
  },A);

  var C = Class({
    foo: function(a,b) {
      return this.super("foo",a*10,b*100);
    }
  },B);

  var b = new B();
  b.n = 1;

  it("should define the `super` method", function() {
    expect(b.super).to.be.a("function");
  });

  it("should be able to call super method without arguments",function() {
    expect(b.bar()).to.equal(21);
  });

  it("should call super method with the correct `this` context", function() {
    expect(b.self()).to.equal(b);
  });

  it("should be able to call super method with multiple arguments", function() {
    expect(b.foo(2,3)).to.deep.equal([1,20,300]);
  });

});

describe("Implement Super's Super",function() {
  var A, B, C, c;
  beforeEach(function() {
    A = Class({
      foo: function(a,b) {
        return [a,b];
      }
    });

    B = Class({
      foo: function(a,b) {
        return this.super("foo",a*10,b*100);
      }
    },A);

    C = Class({
      foo: function(a,b) {
        return this.super("foo",a*10,b*100);
      }
    },B);

    c = new C();
  });

  it("should be able to call super's super",function() {
    expect(c.foo(1,2)).to.deep.equal([100,20000]);
  });
});
