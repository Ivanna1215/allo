import mainPage from "../support/page-objects/main-page";

describe('Test task for Allo', function () {

  beforeEach(() => {
    cy.visit('/');
  })

  it('Verify if the price filter working correctly for the folloving marketplaces', () => {
    mainPage
      .verifyPageIsOpened('https://allo.ua/')
      .selectMarketplace('Каталог')
      .selectCategory('Ноутбуки, ПК та планшети')
      .selectSubcategory('Ноутбуки')
      .filterByBrand('Lenovo')
      .searchResults('Lenovo')
      .filterByPriceRange(15000, 30000)
      .filterByScreenSize('15.9')
      .verifyPriceRangeFilter(15000, 30000)
  })

  it('Add items to the basket', () => {
    mainPage
      .verifyPageIsOpened('https://allo.ua/')
      .selectMarketplace('Каталог')
      .selectCategory('Смартфони та телефони')
      .selectSubcategory('Смартфони і мобільні телефони')
      .addItemsToTheBasket()
      .closeCheckout()
      .selectMarketplace('Каталог')
      .selectCategory('Телевізори та мультимедіа')
      .selectSubcategory('Телевізори')
      .addItemsToTheBasket()
      .verifyTotalPrice()
      .verifyDeleteButtonClickable()
      .verifyBasketEmpty('Ваш кошик порожній.')
      .closeModal()
  })

  it('Search the item', () => {
    const searchItem = 'Apple iPhone'
    mainPage
      .verifyPageIsOpened('https://allo.ua/')
      .searchItem(searchItem)
      .searchResults(searchItem)
  })

  it('Should successfully sign in to Allo', () => {
    mainPage
      .verifyPageIsOpened('https://allo.ua/')
      .signIn()
      .login()
      .verifyMyAccount()

  })
})
