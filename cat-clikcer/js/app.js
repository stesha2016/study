window.onload = function() {
  const CAT_NUMBER = 5;
  var buttonView = {
    init: function() {
      var buttonContainer = document.getElementById('button-container');
      var catsList = octupus.getAllCats();
      for (var i = 0; i < catsList.length; i++) {
        var button = document.createElement('button');
        button.id = 'button' + i;
        button.textContent = catsList[i].catName;
        button.addEventListener('click', function(i) {
          return function() {
            octupus.setCurrentCat(i);
            octupus.renderAll();
          }
        }(i));
        buttonContainer.appendChild(button);
      }
    }
  };

  var catView = {
    catViewEle: null,
    clickNumEle: null,
    catName: null,
    init: function() {
      this.clickNumEle = document.getElementById('click-num');
      this.catName = document.getElementById('cat-name');
      this.catViewEle = document.getElementById('cat-container');
      this.catViewEle.addEventListener('click', function() {
        octupus.addClickNum();
        octupus.renderClickNum();
      })
    },

    renderImg: function(catInfo) {
      this.catViewEle.setAttribute('src', catInfo.catImg);
      this.catName.textContent = catInfo.catName;
    },

    renderClickNum: function(catInfo) {
      this.clickNumEle.textContent = 'Click' + catInfo.catClickNumber;
    }
  };

  var octupus = {
    init: function() {
      data.init();
      catView.init();
      buttonView.init();
    },

    renderAll: function() {
      var catInfo = data.getCurrentCat();
      catView.renderImg(catInfo);
      catView.renderClickNum(catInfo);
    },

    setCurrentCat: function(index) {
      data.setCurrentCat(index);
    },

    renderClickNum: function() {
      var catInfo = data.getCurrentCat();
      catView.renderClickNum(catInfo);
    },

    addClickNum: function() {
      var catInfo = data.getCurrentCat();
      catInfo.catClickNumber++;
    },

    getAllCats: function() {
      return data.catsList;
    }
  };

  var data = {
    catsList: [],
    currentCat: 0,

    init: function() {
      for (var i = 0; i < CAT_NUMBER; i++) {
        var catInfo = {
          catName: 'cat' + (i + 1),
          catImg: 'img/cat' + (i + 1) + '.jpeg',
          catClickNumber: 0
        }
        this.catsList.push(catInfo);
      }
    },

    getCurrentCat: function() {
      return this.catsList[this.currentCat];
    },

    setCurrentCat: function(index) {
      this.currentCat = index;
    }
  };

  octupus.init();
}
