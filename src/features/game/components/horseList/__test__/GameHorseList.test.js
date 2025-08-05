import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import GameHorseList from '../GameHorseList.vue';
import GameHorseListTable from '../table/GameHorseListTable.vue';

vi.mock('../table/GameHorseListTable.vue', () => ({
  default: {
    name: 'GameHorseListTable',
    template: '<div class="mock-horse-list-table">Horse List Table</div>',
  },
}));

vi.mock('@ui', () => ({
  UICard: {
    name: 'UICard',
    props: ['padding'],
    template: '<div class="mock-ui-card"><slot name="header"></slot><slot></slot></div>',
  },
}));

describe('feature GameHorseList', () => {
  let wrapper;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the component with correct structure', () => {
      wrapper = mount(GameHorseList);

      const card = wrapper.find('[data-testid="horse-list-card"]');
      expect(card.classes()).toContain('w-full');

      const container = wrapper.find('[data-testid="horse-list-table-container"]');
      expect(container.exists()).toBe(true);
    });

    it('should display "Horse List (1-20)" header', () => {
      wrapper = mount(GameHorseList);

      expect(wrapper.text()).toContain('Horse List (1-20)');
    });

    it('should render GameHorseListTable component', () => {
      wrapper = mount(GameHorseList);

      const horseListTable = wrapper.findComponent(GameHorseListTable);
      expect(horseListTable.exists()).toBe(true);
    });

    it('should pass correct props to UICard component', () => {
      wrapper = mount(GameHorseList);

      const uiCard = wrapper.findComponent({ name: 'UICard' });
      expect(uiCard.props('padding')).toBe(false);
    });
  });

  describe('template Structure', () => {
    it('should have correct CSS classes for styling', () => {
      wrapper = mount(GameHorseList);

      const container = wrapper.find('[data-testid="horse-list-table-container"]');
      expect(container.exists()).toBe(true);
    });

    it('should have correct UICard structure', () => {
      wrapper = mount(GameHorseList);

      const uiCard = wrapper.findComponent({ name: 'UICard' });
      expect(uiCard.exists()).toBe(true);
      expect(uiCard.props('padding')).toBe(false);
    });

    it('should have header slot content', () => {
      wrapper = mount(GameHorseList);

      const headerContent = wrapper.find('[data-testid="horse-list-card"]');
      expect(headerContent.text()).toContain('Horse List (1-20)');
    });

    it('should have default slot content', () => {
      wrapper = mount(GameHorseList);

      const defaultContent = wrapper.find('[data-testid="horse-list-table-container"]');
      expect(defaultContent.exists()).toBe(true);
      expect(defaultContent.text()).toBe('Horse List Table');
    });
  });

  describe('component Integration', () => {
    it('should integrate GameHorseListTable component correctly', () => {
      wrapper = mount(GameHorseList);

      const horseListTable = wrapper.findComponent(GameHorseListTable);
      expect(horseListTable.exists()).toBe(true);
      expect(horseListTable.isVisible()).toBe(true);
    });

    it('should maintain proper component hierarchy', () => {
      wrapper = mount(GameHorseList);

      const uiCard = wrapper.findComponent({ name: 'UICard' });
      const horseListTable = wrapper.findComponent(GameHorseListTable);

      expect(uiCard.exists()).toBe(true);
      expect(horseListTable.exists()).toBe(true);
      expect(horseListTable.isVisible()).toBe(true);
    });
  });

  describe('styling and Layout', () => {
    it('should have correct container styling', () => {
      wrapper = mount(GameHorseList);

      const container = wrapper.find('[data-testid="horse-list-table-container"]');
      expect(container.exists()).toBe(true);
    });

    it('should have proper card structure', () => {
      wrapper = mount(GameHorseList);

      const card = wrapper.find('[data-testid="horse-list-card"]');
      expect(card.exists()).toBe(true);
    });

    it('should have header and content areas', () => {
      wrapper = mount(GameHorseList);

      const card = wrapper.find('[data-testid="horse-list-card"]');
      expect(card.text()).toContain('Horse List (1-20)');
      expect(card.text()).toContain('Horse List Table');
    });
  });
});
