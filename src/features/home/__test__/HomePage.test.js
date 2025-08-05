import { ROUTE_NAMES } from '@utils/constants';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useStore } from 'vuex';
import { createTestStore, mockRouter, resetMocks } from '@/test/utils';
import HomePage from '../HomePage.vue';

describe('feature HomePage', () => {
  let wrapper;
  let mockInitPlayer;
  let mockPush;

  const createWrapper = () => {
    const testStoreConfig = createTestStore({ initPlayer: vi.fn() });
    mockInitPlayer = testStoreConfig.actions.initPlayer;

    const mockStore = {
      ...testStoreConfig,
      dispatch: vi.fn((actionName, payload) => {
        if (testStoreConfig.actions[actionName]) {
          return testStoreConfig.actions[actionName](mockStore, payload);
        }
        return Promise.resolve();
      }),
    };

    vi.mocked(useStore).mockReturnValue(mockStore);

    return mount(HomePage, {
      global: {
        stubs: {
          'router-link': true,
          'router-view': true,
        },
        directives: {
          tooltip: {},
        },
      },
    });
  };

  beforeEach(() => {
    resetMocks();
    const routerMock = mockRouter();
    mockPush = routerMock.push;
    wrapper = createWrapper();
  });

  describe('rendering', () => {
    it('renders main content', () => {
      expect(wrapper.text()).toContain('Don\'t Push the Horses');
      expect(wrapper.text()).toContain('Experience the thrill of the track with our horse racing simulation');
    });

    it('renders form elements', () => {
      const input = wrapper.findComponent({ name: 'UIInput' });
      const startButton = wrapper.findAllComponents({ name: 'UIButton' })[0];
      const settingsButton = wrapper.findAllComponents({ name: 'UIButton' })[1];

      expect(input.exists()).toBe(true);
      expect(input.props('placeholder')).toBe('Enter your name');
      expect(startButton.exists()).toBe(true);
      expect(startButton.text()).toContain('Start');
      expect(settingsButton.exists()).toBe(true);
      expect(settingsButton.text()).toContain('Settings');
    });

    it('renders card wrapper', () => {
      const card = wrapper.findComponent({ name: 'UICard' });
      expect(card.exists()).toBe(true);
    });
  });

  describe('player name input', () => {
    it('has empty initial value', () => {
      const input = wrapper.findComponent({ name: 'UIInput' });
      expect(input.props('modelValue')).toBe('');
    });

    it('updates player name when input changes', async () => {
      const input = wrapper.findComponent({ name: 'UIInput' });
      const testName = 'John Doe';

      await input.setValue(testName);
      expect(wrapper.vm.playerName).toBe(testName);
    });
  });

  describe('button behavior', () => {
    it('start button is disabled when player name is empty', () => {
      const startButton = wrapper.findAllComponents({ name: 'UIButton' })[0];
      expect(startButton.props('disabled')).toBe(true);
      expect(startButton.props('variant')).toBe('primary');
    });

    it('start button is enabled when player name is not empty', async () => {
      const input = wrapper.findComponent({ name: 'UIInput' });
      await input.setValue('John Doe');

      const startButton = wrapper.findAllComponents({ name: 'UIButton' })[0];
      expect(startButton.props('disabled')).toBe(false);
    });

    it('settings button is always disabled', () => {
      const settingsButton = wrapper.findAllComponents({ name: 'UIButton' })[1];
      expect(settingsButton.props('disabled')).toBe(true);
      expect(settingsButton.props('variant')).toBe('foreground');
    });
  });

  describe('startGame function', () => {
    const setupGameStart = async () => {
      const input = wrapper.findComponent({ name: 'UIInput' });
      const startButton = wrapper.findAllComponents({ name: 'UIButton' })[0];
      await input.setValue('John Doe');
      return { input, startButton };
    };

    it('dispatches initPlayer action and navigates to game route', async () => {
      const { startButton } = await setupGameStart();
      await startButton.trigger('click');

      expect(mockInitPlayer).toHaveBeenCalledWith(expect.any(Object), 'John Doe');
      expect(mockPush).toHaveBeenCalledWith({ name: ROUTE_NAMES.GAME });
    });

    it('does not start game when player name is empty', async () => {
      const startButton = wrapper.findAllComponents({ name: 'UIButton' })[0];
      await startButton.trigger('click');

      expect(mockInitPlayer).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('css classes', () => {
    it('applies correct classes to main elements', () => {
      const card = wrapper.findComponent({ name: 'UICard' });
      const title = wrapper.find('[data-testid="home-page-title"]');
      const description = wrapper.find('[data-testid="home-page-description"]');
      const input = wrapper.findComponent({ name: 'UIInput' });
      const buttonContainer = wrapper.find('[data-testid="home-page-button-container"]');

      expect(card.classes()).toContain('mt-32');
      expect(card.classes()).toContain('max-w-[90%]');
      expect(card.classes()).toContain('md:max-w-2xl');

      expect(title.classes()).toContain('text-2xl');
      expect(title.classes()).toContain('md:text-4xl');
      expect(title.classes()).toContain('font-bold');

      expect(description.classes()).toContain('text-md');
      expect(description.classes()).toContain('md:text-xl');
      expect(description.classes()).toContain('text-muted-foreground');

      expect(input.classes()).toContain('w-[200px]');
      expect(input.classes()).toContain('md:w-sm');
      expect(input.classes()).toContain('mx-auto');

      expect(buttonContainer.classes()).toContain('flex');
      expect(buttonContainer.classes()).toContain('w-[200px]');
      expect(buttonContainer.classes()).toContain('md:w-sm');
      expect(buttonContainer.classes()).toContain('mx-auto');
    });
  });

  describe('component integration', () => {
    it('maintains reactive state between input and button', async () => {
      const input = wrapper.findComponent({ name: 'UIInput' });
      const startButton = wrapper.findAllComponents({ name: 'UIButton' })[0];

      expect(startButton.props('disabled')).toBe(true);

      await input.setValue('John Doe');
      expect(startButton.props('disabled')).toBe(false);

      await input.setValue('');
      expect(startButton.props('disabled')).toBe(true);
    });
  });

  describe('accessibility', () => {
    it('has proper semantic structure', () => {
      const title = wrapper.find('[data-testid="home-page-title"]');
      const description = wrapper.find('[data-testid="home-page-description"]');
      const input = wrapper.findComponent({ name: 'UIInput' });
      const buttons = wrapper.findAllComponents({ name: 'UIButton' });

      expect(title.exists()).toBe(true);
      expect(description.exists()).toBe(true);
      expect(input.exists()).toBe(true);
      expect(buttons).toHaveLength(2);
    });
  });
});
