/*
 * 
 * 
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package com.productprint.pp.web;

import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Validator for login.
 */
public class LoginValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return LoginCommand.class.isAssignableFrom(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
	     validateLoginCredentials(errors, "username", "error.username.empty", "Please specify a username.");
	     validateLoginCredentials(errors, "password", "error.password.empty", "Please specify a password.");
	}
	
	/**
	 * Copied from org.springframework.validation.ValidationUtils.rejectIfEmptyOrWhitespace method 
	 * to fix recursive rejectIfEmptyOrWhitespace method calling
	 */
	private void validateLoginCredentials(Errors errors, String field, String errorCode, String defaultMessage) {
		Assert.notNull(errors, "Errors object must not be null");
		Object value = errors.getFieldValue(field);
		if (value == null ||!StringUtils.hasText(value.toString())) {
			errors.rejectValue(field, errorCode, null, defaultMessage);
		}
	}

}