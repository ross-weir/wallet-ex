Feature: Create new wallet

    Scenario: As a user I am able to create a new wallet by completing the create wallet form
        Given I am on the "Create Wallet" page
        When I create wallet with name "<name>" and password "<password>" and mnemonic passphrase "<mnemonicPass>"
        Then I should be on the wallet detail page

        Examples:
            | name              | password      | mnemonicPass  |
            | Testing Wallet    | testing1188   | ''            |
            | Secret Wallet     | testerrxx11   | reallysecret  |
