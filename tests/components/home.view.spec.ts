import { mount } from '@vue/test-utils';
import HomeView from '@views/home/HomeView.vue';

describe('HomeView.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(HomeView);
    expect(wrapper.text()).toContain('Welcome');
  });
});
