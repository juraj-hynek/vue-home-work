import { expect, test } from "vitest";
import LoginPage from "../../src/views/PageLogin.vue";
import { mount } from "@vue/test-utils";

test("renders correctly", () => {
  const wrapper = mount(LoginPage);
  expect(wrapper.exists()).toBe(true);
});

test('renders inputs and button', () => {
  const wrapper = mount(LoginPage);
  
  // Check if username input exists
  const usernameInput = wrapper.find('#username');
  expect(usernameInput.exists()).toBe(true);
  
  // Check if password input exists
  const passwordInput = wrapper.find('#password');
  expect(passwordInput.exists()).toBe(true);

  // Check if login button exists
  const loginButton = wrapper.find('ion-button');
  expect(loginButton.exists()).toBe(true);
});
