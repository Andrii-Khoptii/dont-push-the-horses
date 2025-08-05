import { createMockProgram } from '@test/utils';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useStore } from 'vuex';
import GameHorseList from '../components/horseList/GameHorseList.vue';
import GameProgram from '../components/program/GameProgram.vue';
import GameTrack from '../components/track/GameTrack.vue';
import GamePage from '../GamePage.vue';

vi.mock('../components/horseList/GameHorseList.vue', () => ({
  default: {
    name: 'GameHorseList',
    template: '<div class="mock-horse-list">Horse List</div>',
  },
}));

vi.mock('../components/program/GameProgram.vue', () => ({
  default: {
    name: 'GameProgram',
    template: '<div class="mock-game-program">Game Program</div>',
  },
}));

vi.mock('../components/track/GameTrack.vue', () => ({
  default: {
    name: 'GameTrack',
    template: '<div class="mock-game-track">Game Track</div>',
  },
}));

vi.mock('@ui', () => ({
  UIButton: {
    name: 'UIButton',
    props: ['variant', 'disabled'],
    template: '<button class="mock-ui-button"><slot></slot></button>',
  },
}));

vi.mock('@utils/constants', () => ({
  TRACK_LINES: 5,
}));

describe('feature GamePage', () => {
  let mockStore;
  let wrapper;

  const createMockStore = (overrides = {}) => {
    return {
      state: {
        gameStore: {
          currentProgram: null,
          raceInterval: null,
          ...overrides,
        },
      },
      dispatch: vi.fn(),
    };
  };

  const mockCurrentProgram = createMockProgram();

  beforeEach(() => {
    vi.clearAllMocks();
    mockStore = createMockStore();
    vi.mocked(useStore).mockReturnValue(mockStore);
  });

  describe('rendering', () => {
    it('should render the component with correct structure', () => {
      wrapper = mount(GamePage);

      expect(wrapper.find('[data-testid="game-page-container"]').exists()).toBe(true);
    });

    it('should render GameHorseList component', () => {
      wrapper = mount(GamePage);

      const horseList = wrapper.findComponent(GameHorseList);
      expect(horseList.exists()).toBe(true);
    });

    it('should render GameTrack component', () => {
      wrapper = mount(GamePage);

      const gameTrack = wrapper.findComponent(GameTrack);
      expect(gameTrack.exists()).toBe(true);
    });

    it('should render GameProgram component', () => {
      wrapper = mount(GamePage);

      const gameProgram = wrapper.findComponent(GameProgram);
      expect(gameProgram.exists()).toBe(true);
    });

    it('should render action buttons when currentProgram exists', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      wrapper = mount(GamePage);

      const buttons = wrapper.findAll('.mock-ui-button');
      expect(buttons).toHaveLength(2);
    });

    it('should not render action buttons when currentProgram is null', () => {
      mockStore.state.gameStore.currentProgram = null;
      wrapper = mount(GamePage);

      const buttons = wrapper.findAll('.mock-ui-button');
      expect(buttons).toHaveLength(0);
    });

    it('should display correct button text when race is not running', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      mockStore.state.gameStore.raceInterval = null;
      wrapper = mount(GamePage);

      const startButton = wrapper.findAll('.mock-ui-button')[1];
      expect(startButton.text()).toBe('Start');
    });

    it('should display correct button text when race is running', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      mockStore.state.gameStore.raceInterval = 'interval-id';
      wrapper = mount(GamePage);

      const pauseButton = wrapper.findAll('.mock-ui-button')[1];
      expect(pauseButton.text()).toBe('Pause');
    });

    it('should display "Generate Program" button', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      wrapper = mount(GamePage);

      const generateButton = wrapper.findAll('.mock-ui-button')[0];
      expect(generateButton.text()).toBe('Generate Program');
    });
  });

  describe('computed Properties', () => {
    describe('trackHeight', () => {
      it('should calculate track height correctly', () => {
        wrapper = mount(GamePage);

        // TRACK_LINES = 5, so calculation should be:
        // paddingY (32) + header (48) + (trackline * 5) + (tracklineGap * 4)
        // 32 + 48 + (48 * 5) + (16 * 4) = 32 + 48 + 240 + 64 = 384
        expect(wrapper.vm.trackHeight).toBe(384);
      });

      it('should be a computed property', () => {
        wrapper = mount(GamePage);

        expect(typeof wrapper.vm.trackHeight).toBe('number');
        expect(wrapper.vm.trackHeight).toBeGreaterThan(0);
      });
    });

    describe('currentProgram', () => {
      it('should return current program from store', () => {
        mockStore.state.gameStore.currentProgram = mockCurrentProgram;
        wrapper = mount(GamePage);

        expect(wrapper.vm.currentProgram).toEqual(mockCurrentProgram);
      });

      it('should return null when no current program', () => {
        mockStore.state.gameStore.currentProgram = null;
        wrapper = mount(GamePage);

        expect(wrapper.vm.currentProgram).toBeNull();
      });
    });

    describe('isProgramRunning', () => {
      it('should return true when race interval exists', () => {
        mockStore.state.gameStore.raceInterval = 'interval-id';
        wrapper = mount(GamePage);

        expect(wrapper.vm.isProgramRunning).toBe(true);
      });

      it('should return false when race interval is null', () => {
        mockStore.state.gameStore.raceInterval = null;
        wrapper = mount(GamePage);

        expect(wrapper.vm.isProgramRunning).toBe(false);
      });

      it('should return false when race interval is undefined', () => {
        mockStore.state.gameStore.raceInterval = undefined;
        wrapper = mount(GamePage);

        expect(wrapper.vm.isProgramRunning).toBe(false);
      });
    });
  });

  describe('lifecycle Hooks', () => {
    it('should dispatch fetchHorses on beforeMount', () => {
      wrapper = mount(GamePage);

      expect(mockStore.dispatch).toHaveBeenCalledWith('fetchHorses');
    });

    it('should dispatch generateProgramList on beforeMount', () => {
      wrapper = mount(GamePage);

      expect(mockStore.dispatch).toHaveBeenCalledWith('generateProgramList');
    });

    it('should call both store actions on mount', () => {
      wrapper = mount(GamePage);

      expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
      expect(mockStore.dispatch).toHaveBeenCalledWith('fetchHorses');
      expect(mockStore.dispatch).toHaveBeenCalledWith('generateProgramList');
    });
  });

  describe('event Handlers', () => {
    describe('handleRaceAction', () => {
      it('should dispatch startRace when race is not running', () => {
        mockStore.state.gameStore.raceInterval = null;
        wrapper = mount(GamePage);

        wrapper.vm.handleRaceAction();

        expect(mockStore.dispatch).toHaveBeenCalledWith('startRace');
      });

      it('should dispatch pauseRace when race is running', () => {
        mockStore.state.gameStore.raceInterval = 'interval-id';
        wrapper = mount(GamePage);

        wrapper.vm.handleRaceAction();

        expect(mockStore.dispatch).toHaveBeenCalledWith('pauseRace');
      });

      it('should return the dispatch result', () => {
        mockStore.dispatch.mockReturnValue('result');
        mockStore.state.gameStore.raceInterval = null;
        wrapper = mount(GamePage);

        const result = wrapper.vm.handleRaceAction();

        expect(result).toBe('result');
      });
    });

    describe('button click handlers', () => {
      it('should call handleRaceAction when start/pause button is clicked', async () => {
        mockStore.state.gameStore.currentProgram = mockCurrentProgram;
        mockStore.state.gameStore.raceInterval = null;
        wrapper = mount(GamePage);

        const startButton = wrapper.findAll('.mock-ui-button')[1];
        await startButton.trigger('click');

        expect(mockStore.dispatch).toHaveBeenCalledWith('startRace');
      });

      it('should dispatch generateProgramList when generate button is clicked', async () => {
        mockStore.state.gameStore.currentProgram = mockCurrentProgram;
        wrapper = mount(GamePage);

        const generateButton = wrapper.findAll('.mock-ui-button')[0];
        await generateButton.trigger('click');

        expect(mockStore.dispatch).toHaveBeenCalledWith('generateProgramList');
      });
    });
  });

  describe('conditional Rendering', () => {
    it('should show action buttons when currentProgram exists', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      wrapper = mount(GamePage);

      const actionButtons = wrapper.find('[data-testid="game-action-btns"]');
      expect(actionButtons.exists()).toBe(true);
    });

    it('should hide action buttons when currentProgram is null', () => {
      mockStore.state.gameStore.currentProgram = null;
      wrapper = mount(GamePage);

      const actionButtons = wrapper.find('[data-testid="game-action-btns"]');
      expect(actionButtons.exists()).toBe(false);
    });

    it('should render generate button when race is running', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      mockStore.state.gameStore.raceInterval = 'interval-id';
      wrapper = mount(GamePage);

      const generateButton = wrapper.findAll('.mock-ui-button')[0];
      expect(generateButton.exists()).toBe(true);
    });

    it('should render generate button when race is not running', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      mockStore.state.gameStore.raceInterval = null;
      wrapper = mount(GamePage);

      const generateButton = wrapper.findAll('.mock-ui-button')[0];
      expect(generateButton.exists()).toBe(true);
    });
  });

  describe('layout and Styling', () => {
    it('should have correct container classes', () => {
      wrapper = mount(GamePage);

      const container = wrapper.find('[data-testid="game-page-container"]');
      expect(container.classes()).toContain('container');
      expect(container.classes()).toContain('h-full');
      expect(container.classes()).toContain('mx-auto');
      expect(container.classes()).toContain('px-4');
      expect(container.classes()).toContain('py-6');
      expect(container.classes()).toContain('flex');
      expect(container.classes()).toContain('flex-col');
      expect(container.classes()).toContain('gap-4');
    });

    it('should have correct grid layout classes', () => {
      wrapper = mount(GamePage);

      const grid = wrapper.find('[data-testid="game-grid"]');
      expect(grid.classes()).toContain('grid');
      expect(grid.classes()).toContain('grid-cols-1');
      expect(grid.classes()).toContain('lg:grid-cols-3');
      expect(grid.classes()).toContain('gap-4');
    });

    it('should apply correct styles to GameHorseList', () => {
      wrapper = mount(GamePage);

      const horseList = wrapper.findComponent(GameHorseList);
      expect(horseList.classes()).toContain('max-w-full');
    });

    it('should apply correct styles to GameTrack', () => {
      wrapper = mount(GamePage);

      const gameTrack = wrapper.findComponent(GameTrack);
      expect(gameTrack.classes()).toContain('lg:col-span-2');
    });

    it('should apply max-height style to components', () => {
      wrapper = mount(GamePage);

      const horseList = wrapper.findComponent(GameHorseList);
      const gameTrack = wrapper.findComponent(GameTrack);

      expect(horseList.attributes('style')).toContain('max-height: 384px');
      expect(gameTrack.attributes('style')).toContain('max-height: 384px');
    });
  });

  describe('component Integration', () => {
    it('should integrate all child components correctly', () => {
      wrapper = mount(GamePage);

      const horseList = wrapper.findComponent(GameHorseList);
      const gameTrack = wrapper.findComponent(GameTrack);
      const gameProgram = wrapper.findComponent(GameProgram);

      expect(horseList.exists()).toBe(true);
      expect(gameTrack.exists()).toBe(true);
      expect(gameProgram.exists()).toBe(true);
    });

    it('should maintain proper component hierarchy', () => {
      wrapper = mount(GamePage);

      const container = wrapper.find('[data-testid="game-page-container"]');
      const grid = wrapper.find('[data-testid="game-grid"]');
      const horseList = wrapper.findComponent(GameHorseList);
      const gameTrack = wrapper.findComponent(GameTrack);
      const gameProgram = wrapper.findComponent(GameProgram);

      expect(container.exists()).toBe(true);
      expect(grid.exists()).toBe(true);
      expect(horseList.exists()).toBe(true);
      expect(gameTrack.exists()).toBe(true);
      expect(gameProgram.exists()).toBe(true);
    });

    it('should render all game components', () => {
      wrapper = mount(GamePage);

      const horseList = wrapper.findComponent(GameHorseList);
      const gameTrack = wrapper.findComponent(GameTrack);
      const gameProgram = wrapper.findComponent(GameProgram);

      expect(horseList.exists()).toBe(true);
      expect(gameTrack.exists()).toBe(true);
      expect(gameProgram.exists()).toBe(true);
    });
  });

  describe('store Integration', () => {
    it('should use store correctly', () => {
      wrapper = mount(GamePage);

      expect(useStore).toHaveBeenCalled();
    });

    it('should dispatch actions on mount', () => {
      wrapper = mount(GamePage);

      expect(mockStore.dispatch).toHaveBeenCalledWith('fetchHorses');
      expect(mockStore.dispatch).toHaveBeenCalledWith('generateProgramList');
    });

    it('should have currentProgram computed property', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      wrapper = mount(GamePage);

      expect(wrapper.vm.currentProgram).toEqual(mockCurrentProgram);
    });
  });

  describe('edge Cases', () => {
    it('should handle missing store properties', () => {
      mockStore.state.gameStore = {};
      wrapper = mount(GamePage);

      expect(wrapper.vm.currentProgram).toBeUndefined();
      expect(wrapper.vm.isProgramRunning).toBe(false);
    });

    it('should handle empty store state', () => {
      mockStore.state.gameStore = {
        currentProgram: null,
        raceInterval: null,
      };
      wrapper = mount(GamePage);

      expect(wrapper.vm.currentProgram).toBeNull();
      expect(wrapper.vm.isProgramRunning).toBe(false);
    });
  });
});
