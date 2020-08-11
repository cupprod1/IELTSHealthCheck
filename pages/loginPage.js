module.exports = {
	elements: {
		username: {
			selector: '//form[contains(@id, "gigya-login-form")]//input[@name="username"]',
			locateStrategy: 'xpath'
		},

		password: {
			selector: '//form[contains(@id, "gigya-login-form")]//input[@name="password"]',
			locateStrategy: 'xpath'
		},

		submitButton: {
			selector: '//form[contains(@id, "gigya-login-form")]//input[@type="submit"]',
			locateStrategy: 'xpath'
		}
	}
}