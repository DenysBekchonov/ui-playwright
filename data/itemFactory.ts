import { faker } from '@faker-js/faker';

export default class Data {

    emailLogin: string
    passwordLogin: string
    fullNameLogin: string
    welcomeLogginText: string
    emailRegistration: string
    passwordRegistration: string
    firstNameRegistration: string
    lastNameRegisatrtion: string
    companyNameShipping: string
    streetAddressShipping1: string
    streetAddressShipping2: string
    streetAddressShipping3: string
    cityNameShipping: string
    regionNumberShipping: string
    zipCodeShipping: string
    phoneNumber: string

    constructor() {
        //existUser
        this.emailLogin = 'qwerty1@test.com';
        this.passwordLogin = 'qwerty321y@';
        this.fullNameLogin = 'testFirstName testLastName';
        this.welcomeLogginText = 'Welcome, ' + this.fullNameLogin + '!';

        //dataFactory
        this.emailRegistration = faker.internet.email();
        this.passwordRegistration = faker.internet.password({ length: 8} + '@');
        this.firstNameRegistration = faker.person.firstName();
        this.lastNameRegisatrtion = faker.person.lastName();
        this.companyNameShipping = faker.company.name();
        this.streetAddressShipping1 = faker.location.streetAddress();
        this.streetAddressShipping2 = faker.location.streetAddress();
        this.streetAddressShipping3 = faker.location.streetAddress();
        this.cityNameShipping = faker.location.city();
        this.regionNumberShipping = faker.string.numeric({ length: 1, exclude: ['0'] });
        this.zipCodeShipping = faker.location.zipCode('#####');
        this.phoneNumber = faker.phone.number({ style: 'international' });
    }
}