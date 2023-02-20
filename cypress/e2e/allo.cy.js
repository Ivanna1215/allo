import testData from "../fixtures/test-data";
import mainPage from "../support/page-objects/main-page";

describe('Test task for Allo', function () {

  beforeEach(() => {
    cy.visit('/');
  })

  it('Verify if the price filter working correctly for the folloving marketplaces', () => {
    mainPage
      .verifyPageIsOpened(testData.url)
      .selectMarketplace(testData.marketplace)
      .selectCategory(testData.categoryComputers)
      .selectSubcategory(testData.subcategoryLaptop)
      .filterByBrand(testData.brandLaptop)
      .searchResults(testData.brandLaptop)
      .filterByPriceRange(15000, 30000)
      .filterByScreenSize(testData.screenSize)
      .verifyPriceRangeFilter(15000, 30000)
  })

  it('Add items to the basket', () => {
    mainPage
      .verifyPageIsOpened(testData.url)
      .selectMarketplace(testData.marketplace)
      .selectCategory(testData.categoryConnection)
      .selectSubcategory(testData.subcategoryPhones)
      .addItemsToTheBasket()
      .closeCheckout()
      .selectMarketplace(testData.marketplace)
      .selectCategory(testData.categoryMultimedia)
      .selectSubcategory(testData.subcategoryTV)
      .addItemsToTheBasket()
      .verifyTotalPrice()
      .verifyDeleteButtonClickable()
      .verifyBasketEmpty(testData.verifyMessageAboutBasketEmpty)
      .closeModal()
  })

  it('Search the item', () => {
    mainPage
      .verifyPageIsOpened(testData.url)
      .searchItem(testData.searchItem)
      .searchResults(testData.searchItem)
  })

  it('Should successfully sign in to Allo', () => {
    mainPage
      .verifyPageIsOpened(testData.url)
      .signIn()
      .login(testData.number,testData.password)
      .verifyMyAccount()

  })
})
