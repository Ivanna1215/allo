import selectors from '../selectors.js';

class AlloPage {

    visitURL(url) {
        cy.visit(url);
        return this;
    }

    verifyPageIsOpened(url) {
        cy.wait(1500).url().should('include', url);
        return this;
    }

    selectMarketplace(marketplace) {
        cy.wait(2000).get(selectors.buttonSelector).contains(marketplace).click();
        return this;
    }

    selectCategory(category) {
        cy.get(selectors.list).contains(category).trigger('mouseover').click({ force: true });
        cy.get(selectors.portalCategoryList).should('be.visible');
        return this;
    }

    selectSubcategory(subcategory) {
        cy.get(selectors.portalCategoryItem)
            .contains(subcategory).click();
        return this;
    }

    filterByPriceRange(from, to) {
        cy.get(selectors.formInputFirst).clear().type(from);
        cy.get(selectors.formInputLast).clear().type(to);
        this.showResults();
        return this;
    }

    filterByBrand(brand) {
        this.openFilterCategory('brand');
        this.searchInCategory('brand', brand);
        this.chooseOptionFromCategory('brand', brand);
        this.showResults();
        return this;
    }

    filterByScreenSize(screenSize) {
        this.chooseOptionFromCategory('diapazon_displeya', screenSize);
        this.showResults();
        return this;
    }

    verifyPriceRangeFilter(from, to) {
        cy.get(selectors.sum).each((item) => {
            const price = parseInt(item.text().replace(/[^0-9.-]+/g, ''));
            expect(price).to.be.within(from, to);
            return this;
        })
    }

    openFilterCategory(categoryId) {
        cy.get(`.accordion:has([data-id="${categoryId}"])`).then(($category) => {
            if (!$category.hasClass('active')) {
                cy.wrap($category).click();
            }
        })
        return this;
    }

    chooseOptionFromCategory(categoryId, option) {
        cy.get(`.accordion:has([data-id="${categoryId}"])`).contains(option).click();
        return this;
    }

    searchInCategory(categoryId, input) {
        cy.get(`.accordion:has([data-id="${categoryId}"]) [class="v-search-input"] input`)
            .click()
            .clear()
            .type(input);
        return this;
    }

    addItemsToTheBasket() {
        cy.get(selectors.productCard).first().then(($card) => {
            let name = $card.find(selectors.productCardTitle).text();
            cy.wrap(name).as('ProductName');

            cy.wrap($card).find(selectors.btnCart).trigger('mouseover').wait(1000).click();
        })

        cy.get(selectors.checkoutModal).then($modal => {
            cy.get('@ProductName').then(name => {
                cy.wrap($modal).should('contain', name);
            });
        })
        return this;
    }

    closeCheckout() {
        cy.get(selectors.checkoutModal).then($modal => {
            if ($modal.is(':visible')) {
                cy.wrap($modal).find(selectors.comebacK).click();
            }
        })
        return this;
    }

    verifyTotalPrice() {
        let sum = 0;
        cy.get(selectors.priceBox).each((price) => {
            const text = price.text();
            const number = parseInt(text.replace(/[^0-9.-]+/g, ''));
            sum += number;
        }).then(() => {
            cy.get(selectors.totalBoxPrice).then((total) => {
                const totalText = total.text();
                const totalPrice = parseInt(totalText.replace(/[^0-9.-]+/g, ''));
                expect(totalPrice).to.eq(sum);
            })
        })
        return this;
    }

    verifyDeleteButtonClickable() {
        cy.get(selectors.closeRemove).each(($el) => {
            cy.wrap($el).first().click();
        })
        return this;
    }

    verifyBasketEmpty(text) {
        cy.get(selectors.cartPopupEmpty).should('contain', text);
        return this;
    }

    closeModal() {
        cy.get(selectors.closeBtn).click();
        return this;
    }

    searchItem(itemName) {
        cy.get(selectors.searchFormInput).type(itemName);
        cy.get(selectors.searchFormSubmitButton).click();
        return this;
    }

    searchResults(searchItem) {
        cy.waitUntilSpinnerExist();
        cy.get(selectors.productCard).wait(1000).should('have.length.gt', 0);
        cy.get(selectors.productCard).each((item) => {
            cy.waitUntilSpinnerExist();
            cy.get(item)
                .find(selectors.productCardTitle)
                .should('contain', searchItem);
        })
        return this;
    }

    signIn() {
        cy.get(selectors.profile).click();
        return this;
    }

    login(number, password) {
        cy.get(selectors.profile).click();
        cy.get(selectors.authWithPassButton).click();
        cy.get(selectors.authLogin).type(number);
        cy.get(selectors.authPassword).type(password);
        cy.get(selectors.loginButton).click();
        return this;
    }

    verifyError(text){
        cy.get('[class="auth__text auth__text--full-width"]').should('have.text', text);
        return this;
    }

    verifyMyAccount() {
        cy.url().should('include', '/my-account');
        cy.contains('My Account');
        return this;
    }

    showResults() {
        cy.get(selectors.btnMessage).click().wait(2000);
        return this;
    }
}
export default new AlloPage();
