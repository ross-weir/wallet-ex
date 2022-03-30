Feature: Create new account

    Scenario: As a user I am able to create a new account by completing the create account form
        Given I am logged in to wallet "Testing Wallet"
        When I create an account called "My Account1" on blockchain "Ergo Mainnet"
        Then I should see the account "My Account1"
