import { createMockHorse } from '@test/utils';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import GameTrackLap from '../GameTrackLap.vue';

vi.mock('@shared/assets/images/horse-run.gif', () => ({
  default: 'horse-run.gif',
}));
vi.mock('@shared/assets/images/horse.png', () => ({
  default: 'horse.png',
}));

describe('feature gameTrackLap', () => {
  let wrapper;

  const defaultProps = {
    horse: createMockHorse(),
    distance: 1000,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('props Validation', () => {
    it('should accept valid props', () => {
      wrapper = mount(GameTrackLap, {
        props: defaultProps,
      });

      expect(wrapper.props('horse')).toEqual(defaultProps.horse);
      expect(wrapper.props('distance')).toBe(defaultProps.distance);
    });
  });

  describe('rendering', () => {
    it('should render the component with correct structure', () => {
      wrapper = mount(GameTrackLap, {
        props: defaultProps,
      });

      expect(wrapper.find('.flex.items-center.h-12').exists()).toBe(true);
      expect(wrapper.find('.border-b.border-dashed').exists()).toBe(true);
      expect(wrapper.find('[class*="border-muted-foreground"]').exists()).toBe(true);
    });

    it('should display horse ID in the colored circle', () => {
      wrapper = mount(GameTrackLap, {
        props: defaultProps,
      });

      const horseIdCircle = wrapper.find('.w-8.h-8.text-primary-foreground.rounded-full');
      expect(horseIdCircle.exists()).toBe(true);
      expect(horseIdCircle.text()).toBe('1');
    });

    it('should apply horse color to the ID circle', () => {
      wrapper = mount(GameTrackLap, {
        props: defaultProps,
      });

      const horseIdCircle = wrapper.find('.w-8.h-8.text-primary-foreground.rounded-full');
      expect(horseIdCircle.attributes('style')).toContain('background: rgb(255, 0, 0)');
    });

    it('should render the track progress bar', () => {
      wrapper = mount(GameTrackLap, {
        props: defaultProps,
      });

      const progressBar = wrapper.find('.flex-1.relative.rounded-full.h-2');
      expect(progressBar.exists()).toBe(true);
      expect(progressBar.attributes('style')).toContain('background: rgb(255, 0, 0)');
    });

    it('should render the finish line emoji', () => {
      wrapper = mount(GameTrackLap, {
        props: defaultProps,
      });

      const finishLine = wrapper.find('[class*="-right-3"]');
      expect(finishLine.exists()).toBe(true);
      expect(finishLine.text()).toBe('🏁');
    });
  });

  describe('computed Properties', () => {
    describe('horseImage', () => {
      it('should return running gif when horse is moving and not placed', () => {
        wrapper = mount(GameTrackLap, {
          props: defaultProps,
        });

        expect(wrapper.vm.horseImage).toBe('horse-run.gif');
      });

      it('should return static png when horse has a place', () => {
        wrapper = mount(GameTrackLap, {
          props: {
            ...defaultProps,
            horse: createMockHorse({ place: 1 }),
          },
        });

        expect(wrapper.vm.horseImage).toBe('horse.png');
      });

      it('should return static png when horse has no current distance', () => {
        wrapper = mount(GameTrackLap, {
          props: {
            ...defaultProps,
            horse: createMockHorse({ currentDistance: 0 }),
          },
        });

        expect(wrapper.vm.horseImage).toBe('horse.png');
      });

      it('should return static png when horse has no current distance and is null', () => {
        wrapper = mount(GameTrackLap, {
          props: {
            ...defaultProps,
            horse: createMockHorse({ currentDistance: null }),
          },
        });

        expect(wrapper.vm.horseImage).toBe('horse.png');
      });
    });

    describe('distanceGone', () => {
      it('should calculate correct percentage of distance covered', () => {
        wrapper = mount(GameTrackLap, {
          props: defaultProps,
        });

        // 500 / 1000 * 100 = 50%
        expect(wrapper.vm.distanceGone).toBe(50);
      });

      it('should handle zero distance', () => {
        wrapper = mount(GameTrackLap, {
          props: {
            ...defaultProps,
            horse: createMockHorse({ currentDistance: 0 }),
            distance: 1000,
          },
        });

        expect(wrapper.vm.distanceGone).toBe(0);
      });

      it('should handle full distance', () => {
        wrapper = mount(GameTrackLap, {
          props: {
            ...defaultProps,
            horse: createMockHorse({ currentDistance: 1000 }),
            distance: 1000,
          },
        });

        expect(wrapper.vm.distanceGone).toBe(100);
      });

      it('should handle distance greater than total', () => {
        wrapper = mount(GameTrackLap, {
          props: {
            ...defaultProps,
            horse: createMockHorse({ currentDistance: 1200 }),
            distance: 1000,
          },
        });

        expect(wrapper.vm.distanceGone).toBe(120);
      });
    });

    describe('placeClasses', () => {
      it('should return yellow background for 1st place', () => {
        wrapper = mount(GameTrackLap, {
          props: {
            ...defaultProps,
            horse: createMockHorse({ place: 1 }),
          },
        });

        expect(wrapper.vm.placeClasses).toBe('bg-yellow-400');
      });

      it('should return gray background for 2nd place', () => {
        wrapper = mount(GameTrackLap, {
          props: {
            ...defaultProps,
            horse: createMockHorse({ place: 2 }),
          },
        });

        expect(wrapper.vm.placeClasses).toBe('bg-gray-300');
      });

      it('should return amber background for 3rd place', () => {
        wrapper = mount(GameTrackLap, {
          props: {
            ...defaultProps,
            horse: createMockHorse({ place: 3 }),
          },
        });

        expect(wrapper.vm.placeClasses).toBe('bg-amber-700');
      });

      it('should return invisible for other places', () => {
        wrapper = mount(GameTrackLap, {
          props: {
            ...defaultProps,
            horse: createMockHorse({ place: 4 }),
          },
        });

        expect(wrapper.vm.placeClasses).toBe('invisible');
      });

      it('should return invisible when no place', () => {
        wrapper = mount(GameTrackLap, {
          props: defaultProps,
        });

        expect(wrapper.vm.placeClasses).toBe('invisible');
      });
    });
  });

  describe('horse Position and Animation', () => {
    it('should position horse image based on distance gone', () => {
      wrapper = mount(GameTrackLap, {
        props: defaultProps,
      });

      const horseImage = wrapper.find('[class*="absolute"][class*="transform"]');
      expect(horseImage.exists()).toBe(true);
      expect(horseImage.attributes('style')).toContain('left: 50%');
    });

    it('should cap horse position at 98%', () => {
      wrapper = mount(GameTrackLap, {
        props: {
          ...defaultProps,
          horse: createMockHorse({ currentDistance: 1200 }),
          distance: 1000,
        },
      });

      const horseImage = wrapper.find('[class*="absolute"][class*="transform"]');
      expect(horseImage.attributes('style')).toContain('left: 98%');
    });

    it('should render horse image with correct source', () => {
      wrapper = mount(GameTrackLap, {
        props: defaultProps,
      });

      const horseImage = wrapper.find('img');
      expect(horseImage.exists()).toBe(true);
      expect(horseImage.attributes('src')).toBe('horse-run.gif');
      expect(horseImage.attributes('alt')).toBe('horse');
    });

    it('should have transition animation classes', () => {
      wrapper = mount(GameTrackLap, {
        props: defaultProps,
      });

      const horseImage = wrapper.find('[class*="absolute"][class*="transform"]');
      expect(horseImage.classes()).toContain('transition-all');
      expect(horseImage.classes()).toContain('duration-100');
      expect(horseImage.classes()).toContain('z-10');
    });
  });

  describe('place Display', () => {
    it('should display place number when horse has a place', () => {
      wrapper = mount(GameTrackLap, {
        props: {
          ...defaultProps,
          horse: createMockHorse({ place: 1 }),
        },
      });

      const placeCircle = wrapper.find('.w-8.h-8.text-primary-foreground.shadow-md.rounded-full');
      expect(placeCircle.exists()).toBe(true);
      expect(placeCircle.text()).toBe('1');
      expect(placeCircle.classes()).toContain('bg-yellow-400');
    });

    it('should hide place circle when no place', () => {
      wrapper = mount(GameTrackLap, {
        props: defaultProps,
      });

      const placeCircle = wrapper.find('.w-8.h-8.text-primary-foreground.shadow-md.rounded-full');
      expect(placeCircle.exists()).toBe(true);
      expect(placeCircle.classes()).toContain('invisible');
    });

    it('should apply correct background color for each place', () => {
      const testCases = [
        { place: 1, expectedClass: 'bg-yellow-400' },
        { place: 2, expectedClass: 'bg-gray-300' },
        { place: 3, expectedClass: 'bg-amber-700' },
        { place: 4, expectedClass: 'invisible' },
      ];

      testCases.forEach(({ place, expectedClass }) => {
        wrapper = mount(GameTrackLap, {
          props: {
            ...defaultProps,
            horse: createMockHorse({ place }),
          },
        });

        const placeCircle = wrapper.find('.w-8.h-8.text-primary-foreground.shadow-md.rounded-full');
        expect(placeCircle.classes()).toContain(expectedClass);
      });
    });
  });

  describe('edge Cases', () => {
    it('should handle horse with null currentDistance', () => {
      wrapper = mount(GameTrackLap, {
        props: {
          ...defaultProps,
          horse: createMockHorse({ currentDistance: null }),
        },
      });

      expect(wrapper.vm.distanceGone).toBe(0);
      expect(wrapper.vm.horseImage).toBe('horse.png');
    });

    it('should handle horse with undefined currentDistance', () => {
      wrapper = mount(GameTrackLap, {
        props: {
          ...defaultProps,
          horse: createMockHorse({ currentDistance: undefined }),
        },
      });

      expect(wrapper.vm.distanceGone).toBe(Number.NaN);
      expect(wrapper.vm.horseImage).toBe('horse.png');
    });

    it('should handle zero distance', () => {
      wrapper = mount(GameTrackLap, {
        props: {
          ...defaultProps,
          distance: 0,
        },
      });

      expect(wrapper.vm.distanceGone).toBe(Infinity);
    });

    it('should handle negative distance', () => {
      wrapper = mount(GameTrackLap, {
        props: {
          ...defaultProps,
          distance: -100,
        },
      });

      expect(wrapper.vm.distanceGone).toBe(-500);
    });
  });

  describe('styling and Layout', () => {
    it('should have correct flex layout classes', () => {
      wrapper = mount(GameTrackLap, {
        props: defaultProps,
      });

      const container = wrapper.find('.flex.items-center.h-12');
      expect(container.classes()).toContain('flex');
      expect(container.classes()).toContain('items-center');
      expect(container.classes()).toContain('h-12');
    });

    it('should have correct border styling', () => {
      wrapper = mount(GameTrackLap, {
        props: defaultProps,
      });

      const border = wrapper.find('[class*="border-b"][class*="border-dashed"]');
      expect(border.classes()).toContain('border-b');
      expect(border.classes()).toContain('border-dashed');
      expect(border.classes()).toContain('border-muted-foreground/30');
    });

    it('should have correct spacing between elements', () => {
      wrapper = mount(GameTrackLap, {
        props: defaultProps,
      });

      const horseIdCircle = wrapper.find('.w-8.h-8.text-primary-foreground.rounded-full');
      expect(horseIdCircle.classes()).toContain('mr-4');

      const placeCircle = wrapper.find('.w-8.h-8.text-primary-foreground.shadow-md.rounded-full');
      expect(placeCircle.classes()).toContain('ml-4');
    });
  });
});
