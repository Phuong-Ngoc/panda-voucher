import { loginPage } from "../../pageObject/loginPage";
import { adminLoginPage } from "../../pageObject/admin/adminLoginPage";
import { common } from "../../pageObject/admin/common";
require("cypress-xpath");

describe("Login with created account", () => {
  beforeEach(() => {
    cy.fixture("user.json").as("user");

    cy.visit(Cypress.env("login"));
    cy.wait(3000);
  });

  it("Should redirect to main page when login successfully", () => {
    loginPage
      .typeUsername(Cypress.env("user_customer"))
      .typePassword(Cypress.env("pass_customer"))
      .clickLogin();
  });

  it("Should show error message when missing username", () => {
    cy.get("@user").then((user) => {
      loginPage
        .typePassword(user.login[0].password)
        .clickLogin()
        .shouldShowErrorMessage("Vui lòng nhập username");
    });
  });

  it("Should show error message when missing password", () => {
    cy.get("@user").then((user) => {
      loginPage
        .typeUsername(user.login[1].username)
        .clickLogin()
        .shouldShowErrorMessage("Vui lòng nhập mật khẩu");
    });
  });

  it("Should show error message when missing username and password", () => {
    loginPage.clickLogin().shouldShowErrorMessage("Vui lòng nhập username");
  });

  it("Should show error message when invalid username", () => {
    cy.get("@user").then((user) => {
      loginPage
        .typeUsername(user.login[3].username)
        .typePassword(user.login[3].password)
        .clickLogin()
        .shouldShowErrorMessage(
          "Username hoặc password sai, vui lòng nhập lại"
        );
    });
  });

  it("Should show error message when invalid password", () => {
    cy.get("@user").then((user) => {
      loginPage
        .typeUsername(user.login[4].username)
        .typePassword(user.login[4].password)
        .clickLogin()
        .shouldShowErrorMessage(
          "Username hoặc password sai, vui lòng nhập lại"
        );
    });
  });

  it("Should show error message when invalid username and password", () => {
    cy.get("@user").then((user) => {
      loginPage
        .typeUsername(user.login[5].username)
        .typePassword(user.login[5].password)
        .clickLogin()
        .shouldShowErrorMessage(
          "Username hoặc password sai, vui lòng nhập lại"
        );
    });
  });
});

describe("Admin - Authentication", () => {
  beforeEach(() => {
    cy.fixture("user.json").as("user");
  });

  it("Verify that Admin (full-control) user logins successfully when entering the correct Username and Password", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(
        500
      );
      cy.url().should("include", "/admin/dashboard");

      cy.visit(common.LNK_EDIT_USER).wait(200);
      cy.contains("Đinh Thức").should("be.visible");
      // .visit(common.LNK_AUTHORIZATION)
      // .shouldShow("Phân quyền nhân viên")
      // .visit(common.LNK_STAFF)
      // .shouldShow("Thông tin cơ bản của nhân viên")
      // .visit(common.LNK_CUSTOMER)
      // .shouldShow("Danh sách tài khoản khách hàng")
      // .visit(common.LNK_ORDER)
      // .url()
      // .should("include", common.LNK_ORDER)
      // .visit(common.LNK_VOUCHER)
      // .url()
      // .should("include", common.LNK_VOUCHER)
      // .visit(common.LNK_SUPPORT)
      // .shouldShow("Thông tin cơ bản, hỏi đáp của khách hàng")
      // .visit(common.LNK_REVIEWS)
      // .shouldShow("Danh sách đánh giá của khách hàng")
      // .visit(common.LNK_ADD_STAFF)
      // .shouldShow("Thêm nhân viên mới")
      // .visit(common.LNK_ADD_CATEGORY)
      // .shouldShow("Thêm các danh mục mới của sản phẩm")
      // .visit(common.LNK_ADD_BRAND)
      // .shouldShow("Thêm thương hiệu của sản phẩm")
      // .visit(common.LNK_CHANGE_PASSWORD)
      // .shouldShow("Thay đổi mật khẩu người dùng");
    });
  });

  it("Verify that Admin (manage staff-client) user logins successfully when entering the correct Username and Password", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[0].username,
        user.authentication[0].password
      ).wait(500);
      cy.url().should("include", "/admin/user");

      cy.visit(common.LNK_EDIT_USER).wait(200);
      cy.contains(user.authentication[0].name).should("be.visible");
    });
  });

  it("Verify that Admin (manage voucher) user logins successfully when entering the correct Username and Password", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[1].username,
        user.authentication[1].password
      ).wait(500);
      cy.url().should("include", "/admin/user");

      cy.visit(common.LNK_EDIT_USER).wait(200);
      cy.contains(user.authentication[1].name).should("be.visible");
    });
  });

  it("Verify that Seller user logins successfully when entering the correct Username and Password", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[2].username,
        user.authentication[2].password
      ).wait(500);
      cy.url().should("include", "/admin/dashboard");

      cy.visit(common.LNK_EDIT_USER).wait(200);
      cy.contains(user.authentication[2].name).should("be.visible");
    });
  });

  it("Verify that Admin (manage orders) user logins successfully when entering the correct Username and Password", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[3].username,
        user.authentication[3].password
      ).wait(500);
      cy.url().should("include", "/admin/dashboard");

      cy.visit(common.LNK_EDIT_USER).wait(200);
      cy.contains(user.authentication[3].name).should("be.visible");
    });
  });

  it("Verify that Agent user logins successfully when entering the correct Username and Password", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[4].username,
        user.authentication[4].password
      ).wait(500);
      cy.url().should("include", "/admin/user");

      cy.visit(common.LNK_EDIT_USER).wait(200);
      cy.contains(user.authentication[4].name).should("be.visible");
    });
  });

  it("Verify that Admin (full-control) user logout successfully when clicking logout", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(Cypress.env("user_admin"), Cypress.env("pass_admin")).wait(
        500
      );
      common.clickProfile().clickLogout();

      cy.url().should("include", "/login");
      cy.contains("Đăng nhập").should("be.visible");
    });
  });

  it("Verify that Admin (manage staff-client) user logout successfully when clicking logout", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[0].username,
        user.authentication[0].password
      ).wait(500);
      common.clickProfile().clickLogout();

      cy.url().should("include", "/login");
      cy.contains("Đăng nhập").should("be.visible");
    });
  });

  it("Verify that Admin (manage voucher) user logout successfully when clicking logout", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[1].username,
        user.authentication[1].password
      ).wait(500);
      common.clickProfile().clickLogout();

      cy.url().should("include", "/login");
      cy.contains("Đăng nhập").should("be.visible");
    });
  });

  it("Verify that Seller user logout successfully when clicking logout", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[2].username,
        user.authentication[2].password
      ).wait(500);
      common.clickProfile().clickLogout();

      cy.url().should("include", "/login");
      cy.contains("Đăng nhập").should("be.visible");
    });
  });

  it("Verify that Admin (manage orders) user logout successfully when clicking logout", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[3].username,
        user.authentication[3].password
      ).wait(500);
      common.clickProfile().clickLogout();

      cy.url().should("include", "/login");
      cy.contains("Đăng nhập").should("be.visible");
    });
  });

  it("Verify that Agent user logout successfully when clicking logout", () => {
    cy.get("@user").then((user) => {
      cy.adminLogin(
        user.authentication[4].username,
        user.authentication[4].password
      ).wait(500);
      common.clickProfile().clickLogout();

      cy.url().should("include", "/login");
      cy.contains("Đăng nhập").should("be.visible");
    });
  });

  // it("Verify that it redirects to use's info page when clicking Information at top left dropdown list", () => {

  // });
});
