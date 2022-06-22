describe("automacao iSystems", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });

  it("Login foi realizado", () => {
    cy.login("standard_user", "secret_sauce");

    cy.location("pathname").should("eq", "/inventory.html");
    cy.contains(".title", "Products").should("be.visible");
  });

  it("Produto deve estar incluso no carrinho", () => {
    cy.login("standard_user", "secret_sauce");
    cy.get(
      '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]'
    ).click();

    cy.contains(".shopping_cart_badge", 1).should("be.visible");

    cy.get(".shopping_cart_link").click();

    cy.location("pathname").should("eq", "/cart.html");
    cy.contains(
      ".inventory_item_name",
      "Test.allTheThings() T-Shirt (Red)"
    ).should("be.visible");
  });

  it("Logout foi realizado", () => {
    cy.login("standard_user", "secret_sauce");
    cy.get("#react-burger-menu-btn").click();
    cy.get("#logout_sidebar_link").click();

    cy.contains('[data-test="login-button"]', "Login").should("be.visible");
    cy.location("pathname").should("eq", "/");
  });
});
