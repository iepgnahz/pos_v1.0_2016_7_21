'use strict';
describe("formatTags",function(){
  it("should return a barcodes",function(){
    let tag= [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    let a = loadAllItems()
    let result = formatTags(tag)
    let expectResult =[
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000003',
        amount:2.5
      },
      {
        barcode:'ITEM000005',
        amount:1
      },
      {
        barcode:'ITEM000005',
        amount:2
      }

    ]
    expect(result).toEqual(expectResult)
  })
})
describe("mergedBarcodes",function(){
  it("should return a mergedItems",function(){
    let barcodes = [
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000003',
        amount:2.5
      },
      {
        barcode:'ITEM000005',
        amount:1
      },
      {
        barcode:'ITEM000005',
        amount:2
      }

    ]
    let result = mergeBarcodes(barcodes)
    let expectResult = [
      {
        barcode:'ITEM000001',
        amount: 5
      },
      {
        barcode:'ITEM000003',
        amount: 2.5
      },
      {
        barcode:'ITEM000005',
        amount: 3
      },
    ]
    expect(result).toEqual(expectResult)
  })
})
describe("getCartItems",function(){
  it("should return a cartItems",function(){
    let mergedItems = [
      {
        barcode:'ITEM000001',
        amount: 5
      },
      {
        barcode:'ITEM000003',
        amount: 2.5
      },
      {
        barcode:'ITEM000005',
        amount: 3
      },
    ]
    let items = [
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
    let result = getCartItems(mergedItems,items)
    let expectResult = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        amount: 5
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        amount: 2.5
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        amount: 3
      }
    ]
    expect(result).toEqual(expectResult)
  })
})
describe("getSubTotalItems",function(){
  it("should return a subTotalItems",function(){
    let cartItems = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        amount: 5
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        amount: 2.5
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        amount: 3
      }
    ]
    let result = getSubTotalItems(cartItems)
    let expectResult = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        amount: 5,
        subTotal: 15
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        amount: 2.5,
        subTotal: 37.5
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        amount: 3,
        subTotal: 13.5
      }
    ]
    expect(result).toEqual(expectResult)
  })
})
describe("calculateTotal",function(){
  it("should return a total",function(){
    let subTotalItems = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        amount: 5,
        subTotal: 15
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        amount: 2.5,
        subTotal: 37.5
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        amount: 3,
        subTotal: 13.5
      }
    ]
    let result = calculateTotal(subTotalItems)
    let expectResult = 66
    expect(result).toEqual(expectResult)

  })
})
describe("getPromotionSubTotalItems",function(){
  it("should return a promotionsSubTotalItems",function(){
    let subTotalItems = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        amount: 5,
        subTotal: 15
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        amount: 2.5,
        subTotal: 37.5
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        amount: 3,
        subTotal: 13.5
      }
    ]
    let promotionsItems = [
      {
        type: 'BUY_TWO_GET_ONE_FREE',
        barcodes: [
          'ITEM000000',
          'ITEM000001',
          'ITEM000005'
        ]
      }
    ];
    let result = getPromotionSubTotalItems(promotionsItems,subTotalItems)
    let expectResult= [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        amount: 5,
        subTotal: 15,
        subPromotionsTotal: 12
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        amount: 2.5,
        subTotal: 37.5,
        subPromotionsTotal: 37.5
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        amount: 3,
        subTotal: 13.5,
        subPromotionsTotal: 9
      }

    ]
    expect(result).toEqual(expectResult)
  })
})
describe("calculatePromotionsTotal",function(){
  it("should return a promotionsSubTotal",function(){
    let promotionsSubTotalItems = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        amount: 5,
        subTotal: 15,
        subPromotionsTotal: 12
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        amount: 2.5,
        subTotal: 37.5,
        subPromotionsTotal: 37.5
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        amount: 3,
        subTotal: 13.5,
        subPromotionsTotal: 9
      }

    ]
    let result = calculatePromotionsTotal(promotionsSubTotalItems)
    let expectResult = 58.5
    expect(result).toEqual(expectResult)
  })
})
describe("calculateSaving",function(){
  it("should return a saving ",function(){
    let total = 66
    let promotionsTotal = 58.5
    let result = calculateSaving(promotionsTotal,total)
    let expectResult = 7.5
    expect(result).toEqual(expectResult)
  })
})
describe("print",function(){
  it("should print an answer",function(){
    let promotionsSubTotalItems = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        amount: 5,
        subTotal: 15,
        subPromotionsTotal: 12
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        amount: 2.5,
        subTotal: 37.5,
        subPromotionsTotal: 37.5
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        amount: 3,
        subTotal: 13.5,
        subPromotionsTotal: 9
      }

    ]
    let saving = 7.5
    let promotionsTotal = 58.5
    let str =  "***<没钱赚商店>收据***\n名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)\n"+
"名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n----------------------\n总计：58.50(元)\n节省：7.50(元)\n**********************";
    spyOn(console,"log")
    print(promotionsSubTotalItems,saving,promotionsTotal)
    expect(console.log).toHaveBeenCalledWith(str)
  })
})
describe("printReceipt",function(){
  it("should print result",function(){
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
    spyOn(console,"log")
    printReceipt(tag)
    let str = "***<没钱赚商店>收据***\n名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)\n"+
"名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n----------------------\n总计：58.50(元)\n节省：7.50(元)\n**********************";
    expect(console.log).toHaveBeenCalledWith(str)
  })
})
