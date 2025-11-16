/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResourceCost from './ResourceCost';

describe('ResourceCost', () => {
  const baseCost = {
    food: 60,
    wood: 20,
    gold: 0,
    stone: 0,
  };

  const fullCost = {
    food: 100,
    wood: 50,
    gold: 75,
    stone: 25,
  };

  describe('Basic rendering', () => {
    it('should render food cost when greater than zero', () => {
      render(<ResourceCost cost={baseCost} />);

      // Use getAllByText since there are sr-only and aria-hidden versions
      expect(screen.getAllByText('Food:').length).toBeGreaterThan(0);
      expect(screen.getByText('60')).toBeInTheDocument();
    });

    it('should render wood cost when greater than zero', () => {
      render(<ResourceCost cost={baseCost} />);

      expect(screen.getAllByText('Wood:').length).toBeGreaterThan(0);
      expect(screen.getByText('20')).toBeInTheDocument();
    });

    it('should render all resources when all are non-zero', () => {
      render(<ResourceCost cost={fullCost} />);

      expect(screen.getAllByText('Food:').length).toBeGreaterThan(0);
      expect(screen.getByText('100')).toBeInTheDocument();

      expect(screen.getAllByText('Wood:').length).toBeGreaterThan(0);
      expect(screen.getByText('50')).toBeInTheDocument();

      expect(screen.getAllByText('Gold:').length).toBeGreaterThan(0);
      expect(screen.getByText('75')).toBeInTheDocument();

      expect(screen.getAllByText('Stone:').length).toBeGreaterThan(0);
      expect(screen.getByText('25')).toBeInTheDocument();
    });

    it('should not render resources with zero cost', () => {
      render(<ResourceCost cost={baseCost} />);

      expect(screen.queryAllByText('Gold:')).toHaveLength(0);
      expect(screen.queryAllByText('Stone:')).toHaveLength(0);
    });

    it('should render with only one resource', () => {
      const goldOnly = { food: 0, wood: 0, gold: 100, stone: 0 };
      render(<ResourceCost cost={goldOnly} />);

      expect(screen.getAllByText('Gold:').length).toBeGreaterThan(0);
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.queryAllByText('Food:')).toHaveLength(0);
      expect(screen.queryAllByText('Wood:')).toHaveLength(0);
      expect(screen.queryAllByText('Stone:')).toHaveLength(0);
    });
  });

  describe('Resource icons', () => {
    it('should display food icon with proper aria-label', () => {
      render(<ResourceCost cost={fullCost} />);

      const foodIcon = screen.getByRole('img', { name: 'Food' });
      expect(foodIcon).toBeInTheDocument();
    });

    it('should display wood icon with proper aria-label', () => {
      render(<ResourceCost cost={fullCost} />);

      const woodIcon = screen.getByRole('img', { name: 'Wood' });
      expect(woodIcon).toBeInTheDocument();
    });

    it('should display gold icon with proper aria-label', () => {
      render(<ResourceCost cost={fullCost} />);

      const goldIcon = screen.getByRole('img', { name: 'Gold' });
      expect(goldIcon).toBeInTheDocument();
    });

    it('should display stone icon with proper aria-label', () => {
      render(<ResourceCost cost={fullCost} />);

      const stoneIcon = screen.getByRole('img', { name: 'Stone' });
      expect(stoneIcon).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should include screen reader only text for each resource', () => {
      render(<ResourceCost cost={fullCost} />);

      const srOnlyTexts = document.querySelectorAll('.sr-only');
      expect(srOnlyTexts.length).toBeGreaterThan(0);
    });

    it('should have aria-labels for all resource icons', () => {
      render(<ResourceCost cost={fullCost} />);

      expect(screen.getByRole('img', { name: 'Food' })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'Wood' })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'Gold' })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'Stone' })).toBeInTheDocument();
    });
  });

  describe('Discount display', () => {
    it('should show discounted price without strikethrough when showDiscount is false', () => {
      const discountedCost = { food: 50, wood: 20, gold: 0, stone: 0 };
      render(<ResourceCost cost={discountedCost} baseCost={baseCost} showDiscount={false} />);

      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.queryByText('60')).not.toBeInTheDocument();
    });

    it('should show original price with strikethrough when discount is applied', () => {
      const discountedCost = { food: 50, wood: 20, gold: 0, stone: 0 };
      render(<ResourceCost cost={discountedCost} baseCost={baseCost} showDiscount={true} />);

      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('60')).toBeInTheDocument();
    });

    it('should apply green color class to discounted prices', () => {
      const discountedCost = { food: 50, wood: 20, gold: 0, stone: 0 };
      const { container } = render(
        <ResourceCost cost={discountedCost} baseCost={baseCost} showDiscount={true} />
      );

      const greenText = container.querySelector('.text-green-600');
      expect(greenText).toBeInTheDocument();
    });

    it('should apply strikethrough class to original price', () => {
      const discountedCost = { food: 50, wood: 20, gold: 0, stone: 0 };
      const { container } = render(
        <ResourceCost cost={discountedCost} baseCost={baseCost} showDiscount={true} />
      );

      const strikethrough = container.querySelector('.line-through');
      expect(strikethrough).toBeInTheDocument();
      expect(strikethrough).toHaveTextContent('60');
    });

    it('should not show discount for resources with same price', () => {
      const sameWoodCost = { food: 50, wood: 20, gold: 0, stone: 0 };
      const { container } = render(
        <ResourceCost cost={sameWoodCost} baseCost={baseCost} showDiscount={true} />
      );

      // Wood cost is same (20), so should not have strikethrough
      const strikethroughs = container.querySelectorAll('.line-through');
      expect(strikethroughs).toHaveLength(1); // Only food should have strikethrough
    });

    it('should handle multiple discounted resources', () => {
      const multiDiscount = { food: 80, wood: 40, gold: 60, stone: 20 };
      const originalCost = { food: 100, wood: 50, gold: 75, stone: 25 };

      const { container } = render(
        <ResourceCost cost={multiDiscount} baseCost={originalCost} showDiscount={true} />
      );

      const strikethroughs = container.querySelectorAll('.line-through');
      expect(strikethroughs).toHaveLength(4); // All resources discounted

      // Check original prices are shown
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('75')).toBeInTheDocument();
      expect(screen.getByText('25')).toBeInTheDocument();
    });

    it('should include aria-label for original cost', () => {
      const discountedCost = { food: 50, wood: 20, gold: 0, stone: 0 };
      render(<ResourceCost cost={discountedCost} baseCost={baseCost} showDiscount={true} />);

      const originalCostLabel = screen.getByLabelText('Original cost 60');
      expect(originalCostLabel).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle all zero costs', () => {
      const zeroCost = { food: 0, wood: 0, gold: 0, stone: 0 };
      const { container } = render(<ResourceCost cost={zeroCost} />);

      // Should render empty container
      expect(container.querySelector('.text-xs')).toBeInTheDocument();
      expect(screen.queryByText('Food:')).not.toBeInTheDocument();
    });

    it('should handle very large numbers', () => {
      const largeCost = { food: 999999, wood: 999999, gold: 999999, stone: 999999 };
      render(<ResourceCost cost={largeCost} />);

      expect(screen.getAllByText('999999')).toHaveLength(4);
    });

    it('should render without baseCost prop', () => {
      render(<ResourceCost cost={baseCost} />);

      expect(screen.getAllByText('Food:').length).toBeGreaterThan(0);
      expect(screen.getByText('60')).toBeInTheDocument();
    });

    it('should render with showDiscount but no baseCost', () => {
      render(<ResourceCost cost={baseCost} showDiscount={true} />);

      // Should not crash, just show regular prices
      expect(screen.getByText('60')).toBeInTheDocument();
      expect(screen.queryByText('.line-through')).toBeNull();
    });
  });
});
