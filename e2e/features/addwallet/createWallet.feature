Feature: Create new wallet

    Scenario: As a user I am able to create a new wallet by completing the setup form

        Given I am on the "Create Wallet" page
        When I enter wallet name "Testing wallet" and password "testing123"
