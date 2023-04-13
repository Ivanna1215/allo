import testData from "../fixtures/test-data";
import alloPage from "../support/page-objects/allo-page";

describe('Test task for Allo', function () {

  beforeEach(() => {
    cy.visit('/');
    alloPage.verifyPageIsOpened(testData.url)
  })

  it('Verify if the price filter working correctly for the folloving marketplaces', () => {
    alloPage
      .selectMarketplace(testData.marketplace)
      .selectCategory(testData.categoryComputers)
      .selectSubcategory(testData.subcategoryLaptop)
      .filterByBrand(testData.brandLaptop)
      .searchResults(testData.brandLaptop)
      .filterByPriceRange(testData.startPrice, testData.finishPrice)
      .filterByScreenSize(testData.screenSize)
      .verifyPriceRangeFilter(testData.startPrice, testData.finishPrice)
  })

  it('Add items to the basket', () => {
    alloPage
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
    alloPage
      .searchItem(testData.searchItem)
      .searchResults(testData.searchItem)
  })

  it('Authorization with Invalid Credentials', () => {
    alloPage
      .signIn()
      .login(testData.number, testData.password)
      .verifyMyAccount();
  })
})
