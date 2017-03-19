var list = document.getElementById('list')

var drinks = [
  {'name' : '콜라', 'price' : 1200, 'quantity' : 2},
  {'name' : '사이다', 'price' : 1100, 'quantity' : 2},
  {'name' : '환타', 'price': 1000, 'quantity' : 2},
  {'name' : '오렌지주스', 'price': 600, 'quantity' : 2},
  {'name' : '포도주스', 'price': 500, 'quantity' : 2},
  {'name' : '레몬에이드', 'price': 1300, 'quantity' : 2},
  {'name' : '게토레이', 'price': 700, 'quantity' : 2},
  {'name' : '이프로', 'price': 800, 'quantity' : 2},
  {'name' : '파워에이드', 'price': 900, 'quantity' : 2}
]

for (var i = 0; i < drinks.length; i++) {
  var content = document.querySelector('template').content
  var btn = content.getElementById('btn')
  
  btn.innerHTML = drinks[i].name + '<br/>' + drinks[i].price
  
  list.appendChild(document.importNode(content, true))
}

var drinkList = document.querySelectorAll('.vendingMachine__item')

for (var j = 0; j < drinkList.length; j++) {
  drinkList[j].idx = j
  drinkList[j].addEventListener('click', function() {
    func.calcMoney([this.idx])
  })
}

var func = {
  userMoney : 10000,
  money : 0,
  returnMoney : function() {
    this.userMoney += this.money
    this.money = 0
    this.refresh()
  },
  insertMoney : function(value) {
    if (this.userMoney >= value) {
      this.money += value
      this.userMoney -= value
      this.refresh()
    } else {
      console.log('노머니')
      return false
    }
  },
  calcMoney : function(drinkIdx) {
    if (drinks[drinkIdx].quantity == 0) {
      console.log('노재고')
      return false;
    }
    if (this.money >= drinks[drinkIdx].price) {
      console.log(drinks[drinkIdx].name)
      this.money -= drinks[drinkIdx].price
      drinks[drinkIdx].quantity -= 1
      this.refresh()
    }
  },
  refresh : function() {
    document.getElementById('money').innerHTML = this.userMoney
    document.getElementById('changeMoney').innerHTML = this.money
  }
}

func.refresh()

var insertMoneyBtn = document.querySelectorAll('.insertMoneyBtn')

for (var k = 0; k < insertMoneyBtn.length; k++) {
  insertMoneyBtn[k].addEventListener('click', function() {
    var insertvalue = parseInt(this.innerHTML)
    func.insertMoney(insertvalue)
  })
}

document.getElementById('returnMoney').addEventListener('click', function() {
  func.returnMoney()
})
