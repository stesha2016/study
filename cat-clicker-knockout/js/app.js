var Cat = function() {
  this.catName = ko.observable('Tobby');
  this.clickNum = ko.observable(0);
  this.catSrc = ko.observable('img/cat1.jpeg');
  this.nickNames = ko.observableArray([
    {nickName: 'kitty'},
    {nickName: 'honey'},
    {nickName: 'sweety'}
  ]);
}
var ViewModel = function() {
  this.currentCat = ko.observable(new Cat());

  this.incrementClick = function() {
    this.clickNum(this.clickNum() + 1);
  };
};

ko.applyBindings(new ViewModel());
