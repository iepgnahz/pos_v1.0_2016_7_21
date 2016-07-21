'use strict';
let tag = [
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2.5',
  'ITEM000005',
  'ITEM000005-2',
];
function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}
function formatTags(tag){
  return tag.map((item)=>{
    let div = item.split("-");
    return {
      barcode:div[0],
      amount: parseFloat(div[1])||1
    }
  })
}
function mergeBarcodes(barcodes){
  let mergedItems = []
  for(let i=0;i<barcodes.length;i++){
    let existItem = mergedItems.find((item)=>{
      return item.barcode === barcodes[i].barcode
    })
    if(existItem){
      existItem.amount += barcodes[i].amount;
    }
    else {
      mergedItems.push(barcodes[i])
    }
  }
  return mergedItems;
}
function getCartItems(mergedItems,items){
  let cartItems = []
  for(let i=0;i<mergedItems.length;i++){
    let existItem = items.find((item)=>{
      return item.barcode === mergedItems[i].barcode
    })
    cartItems.push(Object.assign({},mergedItems[i],existItem))
  }
  return cartItems
}
function getSubTotalItems(cartItems){
  let subTotalItems = []
  for(let i=0;i<cartItems.length;i++){
    let subTotal = cartItems[i].price * cartItems[i].amount
    subTotalItems.push(Object.assign({},cartItems[i],{subTotal: subTotal}))
  }
  return subTotalItems
}
function calculateTotal(subTotalItems){
  let total = 0;
  for(let i=0;i<subTotalItems.length;i++){
    total += subTotalItems[i].subTotal
  }
  return total
}
function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}
function getPromotionSubTotalItems(promotionsItems,subTotalItems){
  let promotionsSubTotalItems = []
  for(let i=0;i<subTotalItems.length;i++){
    let flag = false
    let type = ""
    let subPromotionsTotal = 0
    for(let j=0;j<promotionsItems.length;j++){
      for(let z=0;z<promotionsItems[j].barcodes.length;z++){
      if(subTotalItems[i].barcode === promotionsItems[j].barcodes[z]){
        flag = true
        type = promotionsItems[j].type
        if(type==="BUY_TWO_GET_ONE_FREE"){
        subPromotionsTotal = subTotalItems[i].subTotal - (parseInt(subTotalItems[i].amount/3) * subTotalItems[i].price)
      }
      }
    }
  }
    if(!flag){
      subPromotionsTotal = subTotalItems[i].subTotal
    }
    promotionsSubTotalItems.push(Object.assign({},subTotalItems[i],{subPromotionsTotal:subPromotionsTotal}))
  }
  return promotionsSubTotalItems
}
function calculatePromotionsTotal(promotionsSubTotalItems){
  let promotionsTotal = 0;
  for(let i=0;i<promotionsSubTotalItems.length;i++){
    promotionsTotal += promotionsSubTotalItems[i].subPromotionsTotal
  }
  return promotionsTotal
}
function calculateSaving(promotionsTotal,total){
  return total - promotionsTotal
}
function print(promotionsSubTotalItems,saving,promotionsTotal){
  let str = "***<没钱赚商店>收据***\n"
  for(let i=0;i<promotionsSubTotalItems.length;i++){
    str += "名称："+promotionsSubTotalItems[i].name +
    "，数量："+promotionsSubTotalItems[i].amount +promotionsSubTotalItems[i].unit+
    "，单价："+promotionsSubTotalItems[i].price.toFixed(2) +"(元)，小计："+promotionsSubTotalItems[i].subPromotionsTotal.toFixed(2)+"(元)\n"
  }
  str += "----------------------\n" + "总计："+promotionsTotal.toFixed(2) +"(元)\n节省："+saving.toFixed(2)+"(元)\n**********************"
  console.log(str)

}
function printReceipt(){
  let items = loadAllItems()
  let barcodes = formatTags(tag)
  let mergedItems = mergeBarcodes(barcodes)
  let cartItems = getCartItems(mergedItems,items)
  let subTotalItems = getSubTotalItems(cartItems)
  let total = calculateTotal(subTotalItems)
  let promotionsItems = loadPromotions()
  let promotionsSubTotalItems = getPromotionSubTotalItems(promotionsItems,subTotalItems)
  let promotionsTotal = calculatePromotionsTotal(promotionsSubTotalItems)
  let saving = calculateSaving(promotionsTotal,total)
  print(promotionsSubTotalItems,saving,promotionsTotal)
}
