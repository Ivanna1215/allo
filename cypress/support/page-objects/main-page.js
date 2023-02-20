class MainPage {

    visitURL(url) {
        cy.visit(url);
        return this;
    }

    verifyPageIsOpened(url) {
        cy.wait(1500).url().should('include', url);
        return this;
    }

    selectMarketplace(marketplace) {
        cy.wait(2000).get('[class="mh-catalog-btn"]').contains(marketplace).click();
        return this;
    }

    selectCategory(category) {
        cy.get('.mm__list').contains(category).trigger('mouseover').click({ force: true });
        cy.get('.portal-category__list').should('be.visible');
        return this;
    }

    selectSubcategory(subcategory) {
        cy.get('li[class="portal-category__item"] a[class="portal-category__item-link"]')
            .contains(subcategory).click();
        return this;
    }

    filterByPriceRange(from, to) {
        cy.get('.f-range__values .f-range__form-input:first').clear().type(from);
        cy.get('.f-range__values .f-range__form-input:last').clear().type(to);
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
        cy.get('.v-pb__cur .sum').each((item) => {
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
        cy.get('div[class="product-card"]').first().then(($card) => {
            let name = $card.find('.product-card__title').text();
            cy.wrap(name).as('ProductName');

            cy.wrap($card).find('.v-btn--cart').trigger('mouseover').wait(1000).click();
        })

        cy.get('.checkout_modal').then($modal => {
            cy.get('@ProductName').then(name => {
                cy.wrap($modal).should('contain', name);
            });
        })
        return this;
    }

    closeCheckout() {
        cy.get('.checkout_modal').then($modal => {
            if ($modal.is(':visible')) {
                cy.wrap($modal).find('[class="comeback"]').click();
            }
        })
        return this;
    }

    verifyTotalPrice() {
        let sum = 0;
        cy.get('div[class="price-box__cur"]').each((price) => {
            const text = price.text();
            const number = parseInt(text.replace(/[^0-9.-]+/g, ''));
            sum += number;
        }).then(() => {
            cy.get('.total-box__price').then((total) => {
                const totalText = total.text();
                const totalPrice = parseInt(totalText.replace(/[^0-9.-]+/g, ''));
                expect(totalPrice).to.eq(sum);
            })
        })
        return this;
    }

    verifyDeleteButtonClickable() {
        cy.get('.vi__close.remove').each(($el) => {
            cy.wrap($el).first().click();
        })
        return this;
    }

    verifyBasketEmpty(text) {
        cy.get('.cart-popup_empty').should('contain', text);
        return this;
    }

    closeModal() {
        cy.get('.v-modal__close-btn').click();
        return this;
    }

    searchItem(itemName) {
        cy.get('#search-form__input').type(itemName);
        cy.get('.search-form__submit-button').click();
        return this;
    }

    searchResults(searchItem) {
        cy.get('.product-card').wait(1000).should('have.length.gt', 0);
        cy.get('.product-card').each((item) => {
            cy.wrap(item)
                .find('.product-card__title')
                .should('contain', searchItem);
        })

        return this;
    }

    signIn() {
        cy.get('.mh-profile').click();
        return this;
    }

    login(number,password) {
        cy.get('#auth').type(number);
        cy.get('#v-login-password').type(password);
        cy.get('.modal-submit-button').click();
        return this;
    }

    verifyMyAccount() {
        cy.url().should('include', '/my-account');
        cy.contains('My Account');
        return this;
    }

    showResults() {
        cy.get('span.f-popup__btn-message').click().wait(2000);
        return this;
    }
}
export default new MainPage();
