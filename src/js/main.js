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

// 음료 버튼 template 기능으로 구현
for (var i = 0; i < drinks.length; i++) {
  var content = document.querySelector('template').content
  var btn = content.getElementById('btn')
  
  btn.innerHTML = drinks[i].name + '<br/>' + drinks[i].price +'원'
  
  list.appendChild(document.importNode(content, true))
}

// template을 사용하면 4{포도주스}만 return 되는 오류로 list를 만들어 idx를 만들어내어 calcMoney에 넘겨줌
var drinkList = document.querySelectorAll('.vendingMachine__button')

for (var j = 0; j < drinkList.length; j++) {
  drinkList[j].idx = j
  drinkList[j].addEventListener('click', function() {
    func.calcMoney(this.idx)
  })
}

var func = {
  userMoney : 10000,
  money : 0,
  // 돈 반환
  returnMoney : function() {
    this.userMoney += this.money
    this.money = 0
    this.refresh()
  },
  // 돈 넣기
  insertMoney : function(value) {
    if (this.userMoney >= value) {
      this.money += value
      this.userMoney -= value
      this.refresh()
    } else {
      console.log('돈이 없습니다')
      return false
    }
  },
  // 연산
  calcMoney : function(drinkIdx) {
    if (drinks[drinkIdx].price > this.money) {
      console.log('돈을 넣어주세요')
      return false
    }
    if (this.money >= drinks[drinkIdx].price) {
      console.log(drinks[drinkIdx].name)
      this.money -= drinks[drinkIdx].price
      drinks[drinkIdx].quantity -= 1
      
      if (drinks[drinkIdx].quantity === 0) {
        drinkList[drinkIdx].disabled = true
      }
      this.refresh()
    }
  },
  // 돈 리프레시
  refresh : function() {
    document.getElementById('money').innerHTML = this.userMoney
    document.getElementById('changeMoney').innerHTML = this.money
  }
}
// 리프레시
func.refresh()

// 돈 넣기 버튼
var insertMoneyBtn = document.querySelectorAll('.insertMoneyBtn')

for (var k = 0; k < insertMoneyBtn.length; k++) {
  insertMoneyBtn[k].addEventListener('click', function() {
    var insertvalue = parseInt(this.innerHTML)
    func.insertMoney(insertvalue)
  })
}

// 반환 버튼
document.getElementById('returnMoney').addEventListener('click', function() {
  func.returnMoney()
})
