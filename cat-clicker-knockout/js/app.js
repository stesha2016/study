const initialCats = [
  {
    name: 'Tobby',
    number: 0,
    src: 'img/cat1.jpeg',
    nick: 'To'
  },
  {
    name: 'Teady',
    number: 0,
    src: 'img/cat2.jpeg',
    nick: 'Ti'
  },
  {
    name: 'Python',
    number: 0,
    src: 'img/cat3.jpeg',
    nick: 'Pi'
  },
  {
    name: 'Kitty',
    number: 0,
    src: 'img/cat4.jpeg',
    nick: 'ki'
  }
];
var Cat = function(data) {
  this.catName = ko.observable(data.name);
  this.clickNum = ko.observable(data.number);
  this.catSrc = ko.observable(data.src);
  this.nickNames = ko.observable(data.nick);
  this.incrementClick = function() {
    this.clickNum(this.clickNum() + 1);
  };
}
var ViewModel = function() {
  var self = this;
  this.catList = ko.observableArray([]);
  initialCats.forEach(function(catItem) {
    self.catList.push(new Cat(catItem));
  });
  this.currentCat = ko.observable(this.catList()[0]);
  this.changeCurrentCat = function(catItem) {
    self.currentCat(catItem);
  };
};

ko.applyBindings(new ViewModel());
