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

  var adminView = {
    init: function() {
      this.admin = document.getElementById('admin');
      this.adminContainer = document.getElementById('admin-container');
      this.catName = document.getElementById('input-cat-name');
      this.catUrl = document.getElementById('input-cat-url');
      this.clickNum = document.getElementById('input-click-number');
      this.cancel = document.getElementById('cancel');
      this.save = document.getElementById('save');

      this.admin.addEventListener('click', function() {
        octupus.showAdmin();
      });

      this.save.addEventListener('click', function() {
        octupus.hideAdmin();
        var cat = {};
        octupus.saveCatInfo();
      });

      this.cancel.addEventListener('click', function() {
        octupus.hideAdmin();
      })
    },

    renderAdmin: function(isShow) {
      if (isShow) {
        this.adminContainer.classList.remove('hidden');
      } else {
        this.adminContainer.classList.add('hidden');
      }
    },

    renderInput: function(catInfo) {
      this.catName.value = catInfo.catName;
      this.catUrl.value = catInfo.catImg;
      this.clickNum.value = catInfo.catClickNumber;
    },

    getInputInfo: function() {
      var cat = {};
      cat.catName = this.catName.value;
      cat.catImg = this.catUrl.value;
      cat.catClickNumber = this.clickNum.value;
      return cat;
    }
  };

  var octupus = {
    init: function() {
      data.init();
      catView.init();
      buttonView.init();
      adminView.init();
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
    },

    showAdmin: function() {
      if (data.getCurrentCat() === null) {
        return;
      }
      data.adminShow = true;
      adminView.renderAdmin(true);
      adminView.renderInput(data.getCurrentCat());
    },

    hideAdmin: function() {
      adminView.renderAdmin(false);
    },

    saveCatInfo: function() {
      data.saveCatInfo(adminView.getInputInfo());
      octupus.renderAll();
    }
  };

  var data = {
    catsList: [],
    currentCat: -1,
    adminShow: false,

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
      if (this.currentCat === -1) {
        alert('please select a cat!');
        return null;
      }
      return this.catsList[this.currentCat];
    },

    setCurrentCat: function(index) {
      this.currentCat = index;
    },

    saveCatInfo: function(cat) {
      this.catsList[this.currentCat].catName = cat.catName;
      this.catsList[this.currentCat].catImg = cat.catImg;
      this.catsList[this.currentCat].catClickNumber = cat.catClickNumber;
    }
  };

  octupus.init();
}
