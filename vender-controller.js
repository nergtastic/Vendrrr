function VenderController(){
  //private parts
  let venderService = new VenderService()

  //items is an array we need to get from the service and give to drawItems
  // function drawItems(items){
  //   //we will take in a paramter(items) and iterate over it to build
  //   //a template to draw to the screen.
  //     let machineElem = document.getElementById('items')
  //     let template = ""
  //     console.log(items.length)
  //     for(let i = 0; i < items.length; i++){
  //       let item = items[i]
  //       console.log(item)
  //       console.log(item.name)
  //       console.log(item.description)
  //       console.log(item.price)
  //       template += `
  //       <div class='item-container'>
  //       <h3>${item.name}</h3>
  //       <h5>${item.description}</h5>
  //       <h5>${item.price}</h5>
  //       </div>
  //       `
  //     }
  //     machineElem.innerHTML = template   
  // }

//   function drawMoney(){
//     let machineElem = document.getElementById('moneyButton')
//     let template = 
//     `
//     <button onclick='venderService.addMoney()'>Add Quarter</button>
//     `
// }

function drawItems(items){
  let money = venderService.getMoney()
  let template = ""
  for(index = 0; index < items.length; index++){
    const item = items[index];

    if(money < item.price){
      template += `
      <div style="outline: 1px solid red; border-radius: 5px; padding: 25px; margin: 25px;" class="col-3">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>$ ${item.price}</p>
      <p>Qty: ${item.amount}</p>
      <button disabled onclick="app.controllers.venderController.purchase(${index})">Purchase</button>
      </div>
      `
    } else {
      template += `
      <div style="outline: 1px solid red; border-radius: 5px; padding: 25px; margin: 25px;" class="col-3">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>$ ${item.price}</p>
      <p>Qty: ${item.amount}</p>
      <button onclick="app.controllers.venderController.purchase(${index})">Purchase</button>
      </div>
      `
    }
      document.getElementById('items').innerHTML = template 
      document.getElementById('money').innerHTML = money
  }
}

function drawMoney(){
  document.getElementById('money').innerText = venderService.getMoney()
}

function drawPurchased(item){
  let template = `
  <h3 style="margin-top: 50px;">Last Purchased Item:</h3>
  <h3>${item.name}</h3>
  <p>${item.description}</p>
  <p>$ ${item.price}</p>
  `
  document.getElementById('purchased').innerHTML = template
}

  //public parts

this.purchase = function(index){
  // venderService.purchase(index)
  // drawMoney()
  let item = venderService.purchase(index)
  drawItems(venderService.getItems())
  if (item){
    drawPurchased(item)
  }
}

this.addMoney = function(){
  venderService.addMoney()
  drawItems(venderService.getItems())
}


  
  //we need a function to take money from our "view" and pass it to our service
drawMoney()
drawItems(venderService.getItems())


}