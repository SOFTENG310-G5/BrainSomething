import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ColourPuzzle from './frontend/src/components/ColourPuzzle';
import ColourPuzzleHelper from './frontend/src/components/ColourPuzzleHelper';

// Mocking the ColourPuzzleHelper to control the random order array
vi.mock('./ColourPuzzleHelper', () => {
    return {
        default: vi.fn().mockImplementation(() => ({
            getRandomOrderArray: () => [1, 2, 3, 4],
        })),
    };
});

describe('ColourPuzzle', () => {
    beforeEach(() => {
        vi.useFakeTimers(); // Using fake timers to control time in tests
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it('should show OrderCards initially and hide them after 3 seconds', () => {
        render(
            <MemoryRouter>
                <ColourPuzzle />
            </MemoryRouter>
        );

        // OrderCards should be visible initially
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();

        // Fast-forward 3 seconds to hide OrderCards
        act(() => {
            vi.advanceTimersByTime(3000);
        });

        // OrderCards should no longer be visible
        expect(screen.queryByText('1')).not.toBeInTheDocument();
        expect(screen.queryByText('2')).not.toBeInTheDocument();
        expect(screen.queryByText('3')).not.toBeInTheDocument();
        expect(screen.queryByText('4')).not.toBeInTheDocument();
    });

    it('should display "Time ran out" message when time is over', () => {
        render(
            <MemoryRouter>
                <ColourPuzzle />
            </MemoryRouter>
        );

        // Fast-forward to PUZZLE_DISPLAY_TIME to trigger the timeout
        act(() => {
            vi.advanceTimersByTime(10000);
        });

        expect(screen.getByText('Time ran out. You lost.')).toBeInTheDocument();
    });

    it('should display "You Won" message when the correct solution is entered', () => {
        render(
            <MemoryRouter>
                <ColourPuzzle />
            </MemoryRouter>
        );

        // Fast-forward 3 seconds to hide OrderCards
        act(() => {
            vi.advanceTimersByTime(3000);
        });

        // Simulate correct user input
        const input = screen.getByPlaceholderText('eg. blue square...');
        fireEvent.change(input, { target: { value: 'correct solution' } });

        // Trigger gameWon when input matches solution
        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(screen.getByText('You Won')).toBeInTheDocument();
    });

    it('should correctly restart the game when the "Play again" button is clicked', () => {
        render(
            <MemoryRouter>
                <ColourPuzzle />
            </MemoryRouter>
        );

        // Fast-forward to PUZZLE_DISPLAY_TIME to trigger the timeout
        act(() => {
            vi.advanceTimersByTime(10000);
        });

        // Click the "Play again" button
        const playAgainButton = screen.getByText('Play again');
        fireEvent.click(playAgainButton);

        // Verify that the page is reloaded (window.location.reload)
        expect(global.window.location.reload).toHaveBeenCalled();
    });

    it('should display the remaining time during the puzzle', () => {
        render(
            <MemoryRouter>
                <ColourPuzzle />
            </MemoryRouter>
        );

        // Fast-forward 3 seconds to start the puzzle timer
        act(() => {
            vi.advanceTimersByTime(3000);
        });

        // Check if the timer is displayed
        expect(screen.getByText('10')).toBeInTheDocument();

        // Fast-forward another 5 seconds
        act(() => {
            vi.advanceTimersByTime(5000);
        });

        // Check if the timer has updated correctly
        expect(screen.getByText('5')).toBeInTheDocument();
    });
});
