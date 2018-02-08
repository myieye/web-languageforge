'use strict';

function LexModals() {
  this.modalBodyDiv = element(by.className('modal-body'));
  this.modalFooterDiv = element(by.className('modal-footer'));

  // select language modal
  this.selectLanguage = {
    searchLanguageInput: this.modalBodyDiv.element(by.model('searchText')),
    languageRows: this.modalBodyDiv.all(by.repeater('language in languages')),
    firstLanguageName: this.modalBodyDiv
      .all(by.repeater('language in languages').column('name')).first(),
    lastLanguageName: this.modalBodyDiv
      .all(by.repeater('language in languages').column('name')).last(),
    clearSearchButton: this.modalBodyDiv.element(by.id('clearSearch')),
    addButton: this.modalFooterDiv.element(by.partialButtonText('Add'))
  };
  this.selectLanguage.firstLanguageRow = this.selectLanguage.languageRows.first();
  this.selectLanguage.lastLanguageRow = this.selectLanguage.languageRows.last();

  // custom field modal
  this.customField = {
    displayNameInput: element(by.id('name')),
    fieldCodeExists: element(by.id('fieldCodeExists')),
    levelDropdown: element(by.id('level')),
    typeDropdown: element(by.id('type')),
    listCodeDropdown: element(by.id('optionListCode')),
    addButton: element(by.css('.modal-footer')).element(by.partialButtonText('Add'))
  };

}

module.exports = new LexModals();
