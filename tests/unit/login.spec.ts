
import { expect, test } from 'vitest'
import LoginPage from '../../src/views/PageLogin.vue';
import { mount } from '@vue/test-utils';

test('renders correctly', () => {
    const wrapper = mount(LoginPage);
    expect(wrapper.exists()).toBe(true);
  });
