window.onload = function() {
  var linkContainer = document.getElementById('link-container');
  var catContainer = document.getElementById('cat-container');
  var Cat = function(name, src) {
    this.name = name;
    this.number = 0;
    this.src = src;
    this.init();
  }
  Cat.prototype.init = function() {
    var li = document.createElement('li');

    var linka = document.createElement('a');
    linka.textContent = this.name;
    linka.setAttribute('name', this.name);
    var divName = document.createElement('div');
    divName.appendChild(linka);
    li.appendChild(divName);

    var img = document.createElement('img');
    img.src = this.src;
    img.addEventListener('click', function() {
      this.number++;
      divNum.textContent = 'Click ' + this.number + ' times!';
    }.bind(this));
    li.appendChild(img);

    var divNum = document.createElement('div');
    divNum.textContent = 'Click ' + this.number + ' times!';
    li.appendChild(divNum);

    catContainer.appendChild(li);

    var p = document.createElement('p');
    var a = document.createElement('a');
    a.textContent = this.name;
    a.setAttribute('href', '#' + this.name);
    p.appendChild(a);
    linkContainer.appendChild(p);
  }

  var cat1 = new Cat('first cat', 'img/cat.jpg');
  var cat2 = new Cat('second cat', 'img/cat.jpg');
}
