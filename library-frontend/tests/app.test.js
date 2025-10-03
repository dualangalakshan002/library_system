const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { ServiceBuilder } = require('selenium-webdriver/chrome');
const fetch = require('node-fetch');

const chromeDriverPath = './chromedriver.exe';
const serviceBuilder = new ServiceBuilder(chromeDriverPath);

jest.setTimeout(60000);

let options = new chrome.Options();
// options.addArguments('--headless');
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');

describe('Library Management System UI Tests', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeService(serviceBuilder)
            .setChromeOptions(options)
            .build();
    });

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    test('Scenario 1: User Login and Logout', async () => {
        const uniqueEmail = `testuser_${Date.now()}@example.com`;
        await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: uniqueEmail, password: 'password123' })
        });

        await driver.get('http://localhost:3000/login');

        await driver.findElement(By.css('input[type="email"]')).sendKeys(uniqueEmail);
        await driver.findElement(By.css('input[type="password"]')).sendKeys('password123');
        await driver.findElement(By.css('button[type="submit"]')).click();

        // --- THIS IS THE FIX ---
        // Wait for the book collection header to be located before checking if it's displayed
        const header = await driver.wait(until.elementLocated(By.xpath("//h2[text()='Your Book Collection']")), 10000);
        expect(await header.isDisplayed()).toBe(true);

        // Test logout
        await driver.findElement(By.className('logout-button')).click();

        // Wait for the login header to be visible before trying to assert it exists
        const loginHeader = await driver.wait(until.elementLocated(By.xpath("//h2[text()='Login']")), 10000);
        expect(await loginHeader.isDisplayed()).toBe(true);
    });

    test('Scenario 2: Add a new book', async () => {
        await driver.get('http://localhost:3000/login');
        const email = `bookadder_${Date.now()}@example.com`;
        await fetch('http://localhost:8080/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: 'password123' }) });
        await driver.findElement(By.css('input[type="email"]')).sendKeys(email);
        await driver.findElement(By.css('input[type="password"]')).sendKeys('password123');
        await driver.findElement(By.css('button[type="submit"]')).click();
        await driver.wait(until.urlIs('http://localhost:3000/books'), 10000);

        await driver.findElement(By.className('add-button')).click();

        await driver.wait(until.elementLocated(By.css('.modal-content')), 5000);
        await driver.findElement(By.css('input[name="title"]')).sendKeys('A New Selenium Book');
        await driver.findElement(By.css('input[name="author"]')).sendKeys('Test Author');
        await driver.findElement(By.className('save-button')).click();

        const newBookCard = await driver.wait(until.elementLocated(By.xpath("//h3[text()='A New Selenium Book']")), 10000);
        expect(await newBookCard.isDisplayed()).toBe(true);
    });
});