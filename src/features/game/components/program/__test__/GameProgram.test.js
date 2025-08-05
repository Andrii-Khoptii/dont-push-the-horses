import { createMockProgram } from '@test/utils';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useStore } from 'vuex';
import GameProgram from '../GameProgram.vue';
import GameProgramTable from '../table/GameProgramTable.vue';

vi.mock('../table/GameProgramTable.vue', () => ({
  default: {
    name: 'GameProgramTable',
    props: ['program'],
    template: '<div class="mock-program-table">{{ program.lap }} - {{ program.distance }}m</div>',
  },
}));

vi.mock('@ui', () => ({
  UICard: {
    name: 'UICard',
    props: ['padding'],
    template: '<div class="mock-ui-card"><slot name="header"></slot><slot></slot></div>',
  },
}));

describe('feature GameProgram', () => {
  let mockStore;
  let wrapper;

  const createMockStore = (programList = []) => {
    return {
      state: {
        gameStore: {
          programList,
        },
      },
      getters: {},
      mutations: {},
      actions: {},
    };
  };

  const mockProgramList = [
    createMockProgram({ lap: 1, distance: 1000 }),
    createMockProgram({ lap: 2, distance: 1200 }),
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockStore = createMockStore();
    vi.mocked(useStore).mockReturnValue(mockStore);
  });

  describe('rendering', () => {
    it('should render the component with correct structure', () => {
      mockStore.state.gameStore.programList = mockProgramList;
      wrapper = mount(GameProgram);

      expect(wrapper.find('.mock-ui-card').exists()).toBe(true);
      expect(wrapper.find('.grid.grid-cols-1.lg\\:grid-cols-2.gap-4').exists()).toBe(true);
    });

    it('should display "Race Program" header', () => {
      mockStore.state.gameStore.programList = mockProgramList;
      wrapper = mount(GameProgram);

      expect(wrapper.text()).toContain('Race Program');
    });

    it('should render GameProgramTable components for each program', () => {
      mockStore.state.gameStore.programList = mockProgramList;
      wrapper = mount(GameProgram);

      const programTables = wrapper.findAllComponents(GameProgramTable);
      expect(programTables).toHaveLength(2);
    });

    it('should pass correct props to GameProgramTable components', () => {
      mockStore.state.gameStore.programList = mockProgramList;
      wrapper = mount(GameProgram);

      const programTables = wrapper.findAllComponents(GameProgramTable);

      expect(programTables[0].props('program')).toEqual(mockProgramList[0]);
      expect(programTables[1].props('program')).toEqual(mockProgramList[1]);
    });

    it('should display program information correctly', () => {
      mockStore.state.gameStore.programList = mockProgramList;
      wrapper = mount(GameProgram);

      const programInfo = wrapper.findAll('.bg-primary.text-primary-foreground');
      expect(programInfo).toHaveLength(2);
      expect(programInfo[0].text()).toContain('1st Lap 1000m');
      expect(programInfo[1].text()).toContain('2st Lap 1200m');
    });

    it('should not render program tables when programList is empty', () => {
      mockStore.state.gameStore.programList = [];
      wrapper = mount(GameProgram);

      const programTables = wrapper.findAllComponents(GameProgramTable);
      expect(programTables).toHaveLength(0);
    });

    it('should not render program info when programList is empty', () => {
      mockStore.state.gameStore.programList = [];
      wrapper = mount(GameProgram);

      const programInfo = wrapper.findAll('.bg-primary.text-primary-foreground');
      expect(programInfo).toHaveLength(0);
    });
  });

  describe('computed Properties', () => {
    it('should compute programList from store state', () => {
      mockStore.state.gameStore.programList = mockProgramList;
      wrapper = mount(GameProgram);

      expect(wrapper.vm.programList).toEqual(mockProgramList);
    });

    it('should compute programList correctly when empty', () => {
      mockStore.state.gameStore.programList = [];
      wrapper = mount(GameProgram);

      expect(wrapper.vm.programList).toEqual([]);
    });
  });

  describe('template Structure', () => {
    it('should have correct grid layout classes', () => {
      mockStore.state.gameStore.programList = mockProgramList;
      wrapper = mount(GameProgram);

      const grid = wrapper.find('.grid.grid-cols-1.lg\\:grid-cols-2.gap-4');
      expect(grid.classes()).toContain('grid');
      expect(grid.classes()).toContain('grid-cols-1');
      expect(grid.classes()).toContain('lg:grid-cols-2');
      expect(grid.classes()).toContain('gap-4');
    });

    it('should have correct program container styling', () => {
      mockStore.state.gameStore.programList = mockProgramList;
      wrapper = mount(GameProgram);

      const programContainers = wrapper.findAll('.flex.flex-col.border');
      expect(programContainers).toHaveLength(2);
    });

    it('should have correct program info styling', () => {
      mockStore.state.gameStore.programList = mockProgramList;
      wrapper = mount(GameProgram);

      const programInfo = wrapper.findAll('.bg-primary.text-primary-foreground.px-3.py-1');
      expect(programInfo).toHaveLength(2);
    });

    it('should have correct overflow container styling', () => {
      mockStore.state.gameStore.programList = mockProgramList;
      wrapper = mount(GameProgram);

      const overflowContainers = wrapper.findAll('.overflow-auto');
      expect(overflowContainers).toHaveLength(2);
    });
  });

  describe('edge Cases', () => {
    it('should handle program without lap or distance', () => {
      const incompleteProgram = {
        horses: mockProgramList[0].horses,
      };

      mockStore.state.gameStore.programList = [incompleteProgram];
      wrapper = mount(GameProgram);

      const programInfo = wrapper.find('.bg-primary.text-primary-foreground');
      expect(programInfo.text()).toContain('st Lap m');
    });

    it('should handle null programList', () => {
      mockStore.state.gameStore.programList = null;
      wrapper = mount(GameProgram);

      const programTables = wrapper.findAllComponents(GameProgramTable);
      expect(programTables).toHaveLength(0);
    });

    it('should handle undefined programList', () => {
      mockStore.state.gameStore.programList = undefined;
      wrapper = mount(GameProgram);

      const programTables = wrapper.findAllComponents(GameProgramTable);
      expect(programTables).toHaveLength(0);
    });
  });
});
