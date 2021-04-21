import CharCatagorizerTokenizer from "./CharCatagorizerTokenizer";

export default class SimpleTokenizer extends CharCatagorizerTokenizer {
    constructor() {
        super();
        this.addCharacterClass('0123456789', 'number');
        this.addCharacterClass('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789', 'string');
        this.addCharacterClass('.:;\'"`!@#$%^&*()+-=[]{}\\~/?<>,', 'op', true);
    }
}