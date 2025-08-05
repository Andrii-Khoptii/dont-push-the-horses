import { createMockProgram } from '@test/utils';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useStore } from 'vuex';
import GameTrack from '../GameTrack.vue';
import GameTrackLap from '../GameTrackLap.vue';

vi.mock('../GameTrackLap.vue', () => ({
  default: {
    name: 'GameTrackLap',
    props: ['horse', 'distance'],
    template: '<div class="mock-track-lap">{{ horse.id }} - {{ distance }}m</div>',
  },
}));

describe('feature GameTrack', () => {
  let mockStore;
  let wrapper;

  const createMockStore = (currentProgram = null) => {
    return {
      state: {
        gameStore: {
          currentProgram,
        },
      },
      getters: {},
      mutations: {},
      actions: {},
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
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      wrapper = mount(GameTrack);

      expect(wrapper.find('.relative').exists()).toBe(true);
      expect(wrapper.find('.bg-gradient-to-r').exists()).toBe(true);
      expect(wrapper.find('.rounded-lg').exists()).toBe(true);
    });

    it('should display current program information when available', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      wrapper = mount(GameTrack);

      const programInfo = wrapper.find('.bg-primary');
      expect(programInfo.exists()).toBe(true);
      expect(programInfo.text()).toContain('1st Lap 1000m');
    });

    it('should render GameTrackLap components for each horse', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      wrapper = mount(GameTrack);

      const trackLaps = wrapper.findAllComponents(GameTrackLap);
      expect(trackLaps).toHaveLength(2);
    });

    it('should pass correct props to GameTrackLap components', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      wrapper = mount(GameTrack);

      const trackLaps = wrapper.findAllComponents(GameTrackLap);

      expect(trackLaps[0].props('horse')).toEqual(mockCurrentProgram.horses[0]);
      expect(trackLaps[0].props('distance')).toBe(1000);

      expect(trackLaps[1].props('horse')).toEqual(mockCurrentProgram.horses[1]);
      expect(trackLaps[1].props('distance')).toBe(1000);
    });

    it('should not render program info when currentProgram is null', () => {
      mockStore.state.gameStore.currentProgram = null;
      wrapper = mount(GameTrack);

      const programInfo = wrapper.find('.bg-primary');
      expect(programInfo.exists()).toBe(false);
    });

    it('should not render GameTrackLap components when currentProgram is null', () => {
      mockStore.state.gameStore.currentProgram = null;
      wrapper = mount(GameTrack);

      const trackLaps = wrapper.findAllComponents(GameTrackLap);
      expect(trackLaps).toHaveLength(0);
    });
  });

  describe('computed Properties', () => {
    it('should compute currentProgram from store state', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      wrapper = mount(GameTrack);

      expect(wrapper.vm.currentProgram).toEqual(mockCurrentProgram);
    });

    it('should compute currentProgram from store state correctly', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      wrapper = mount(GameTrack);

      expect(wrapper.vm.currentProgram).toEqual(mockCurrentProgram);
    });
  });

  describe('template Structure', () => {
    it('should have correct CSS classes for styling', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      wrapper = mount(GameTrack);

      const container = wrapper.find('.relative');
      expect(container.classes()).toContain('bg-gradient-to-r');
      expect(container.classes()).toContain('from-primary/20');
      expect(container.classes()).toContain('to-accent/20');
      expect(container.classes()).toContain('rounded-lg');
      expect(container.classes()).toContain('p-4');
      expect(container.classes()).toContain('shadow-sm');
      expect(container.classes()).toContain('border');
    });

    it('should have correct program info styling', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      wrapper = mount(GameTrack);

      const programInfo = wrapper.find('.bg-primary');
      expect(programInfo.classes()).toContain('text-primary-foreground');
      expect(programInfo.classes()).toContain('px-3');
      expect(programInfo.classes()).toContain('py-1');
      expect(programInfo.classes()).toContain('rounded');
      expect(programInfo.classes()).toContain('mb-4');
    });

    it('should have correct track laps container styling', () => {
      mockStore.state.gameStore.currentProgram = mockCurrentProgram;
      wrapper = mount(GameTrack);

      const lapsContainer = wrapper.find('.flex.flex-col.gap-4');
      expect(lapsContainer.exists()).toBe(true);
    });
  });

  describe('edge Cases', () => {
    it('should handle empty horses array', () => {
      const emptyProgram = {
        ...mockCurrentProgram,
        horses: [],
      };

      mockStore.state.gameStore.currentProgram = emptyProgram;
      wrapper = mount(GameTrack);

      const trackLaps = wrapper.findAllComponents(GameTrackLap);
      expect(trackLaps).toHaveLength(0);
    });

    it('should handle program without lap or distance', () => {
      const incompleteProgram = {
        horses: mockCurrentProgram.horses,
      };

      mockStore.state.gameStore.currentProgram = incompleteProgram;
      wrapper = mount(GameTrack);

      const programInfo = wrapper.find('.bg-primary');
      expect(programInfo.text()).toContain('st Lap m');
    });
  });
});
