import { describe, it, expect, vi, act } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ReactionGame from './ReactionGame';

describe('ReactionGame', () => {
    const mockOnReactionComplete = vi.fn();

    beforeEach(() => {
        mockOnReactionComplete.mockClear();
    });

    it('should render with initial blue color and correct message', () => {
        render(<ReactionGame onReactionComplete={mockOnReactionComplete} />);
        const messageElement = screen.getByText('Click this when you are ready.');
        expect(messageElement).toBeInTheDocument();
        expect(messageElement.closest('div')).toHaveClass('blue');
    });

    it('should turn red and show wait message when clicked on blue', () => {
        render(<ReactionGame onReactionComplete={mockOnReactionComplete} />);
        const cardElement = screen.getByText('Click this when you are ready.').closest('div');

        fireEvent.click(cardElement);

        expect(cardElement).toHaveClass('red');
        expect(screen.getByText('Wait for green...')).toBeInTheDocument();
    });

    it('should reset to blue and show early click message when clicked on red', () => {
        render(<ReactionGame onReactionComplete={mockOnReactionComplete} />);
        const cardElement = screen.getByText('Click this when you are ready.').closest('div');

        // turns red
        fireEvent.click(cardElement);
        // click while red, should reset to blue
        fireEvent.click(cardElement);

        expect(cardElement).toHaveClass('blue');
        expect(screen.getByText('Sorry, too early! Click this when you are ready.')).toBeInTheDocument();
    });

    it('should calculate reaction time and call onReactionComplete when clicked on green', () => {
        render(<ReactionGame onReactionComplete={mockOnReactionComplete} />);
        const cardElement = screen.getByText('Click this when you are ready.').closest('div');

        // turns red
        fireEvent.click(cardElement);

        act(() => {
            // simulate the random delay before green
            vi.advanceTimersByTime(1500);
        });

        // click while green
        fireEvent.click(cardElement);

        expect(mockOnReactionComplete).toHaveBeenCalledTimes(1);
        expect(mockOnReactionComplete.mock.calls[0][0]).toBeGreaterThan(0);
        expect(screen.getByText(/Your reaction time is \d+ ms\. Click this when you are ready\./)).toBeInTheDocument();
    });
});
