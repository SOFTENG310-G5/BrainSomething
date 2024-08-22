import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ColourPuzzle from './ColourPuzzle';
import { BrowserRouter } from 'react-router-dom';

vi.mock('./ColourPuzzleHelper', () => {
    return {
        __esModule: true,
        default: vi.fn().mockImplementation(() => ({
            getRandomOrderArray: vi.fn(() => [1, 2, 3, 4]),
        })),
    };
});

vi.mock('./HackPuzzle', () => ({
    __esModule: true,
    default: ({ onSolutionCalculated }) => {
        onSolutionCalculated('blue square');
        return <div>Mock HackPuzzle</div>;
    },
}));

vi.mock('./OrderCards', () => ({
    __esModule: true,
    default: () => <div>Mock OrderCards</div>,
}));

describe('ColourPuzzle', () => {
    const originalLocation = window.location;

    beforeEach(() => {
        window.location = {
            ...originalLocation,
            search: '?time=10',
        };
    });

    afterEach(() => {
        window.location = originalLocation;
    });

    it('should display order cards initially', () => {
        render(
            <BrowserRouter>
                <ColourPuzzle />
            </BrowserRouter>
        );
        expect(screen.getByText('Mock OrderCards')).toBeInTheDocument();
    });

    it('should display "Time ran out" screen when time is over', () => {
        vi.useFakeTimers();

        render(
            <BrowserRouter>
                <ColourPuzzle />
            </BrowserRouter>
        );

        vi.advanceTimersByTime(13000); // 3 seconds for hiding + 10 seconds puzzle display

        expect(screen.getByText('Time ran out. You lost.')).toBeInTheDocument();

        vi.useRealTimers();
    });

    it('should display "You Won" screen when puzzle is solved', () => {
        render(
            <BrowserRouter>
                <ColourPuzzle />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('eg. blue square...'), {
            target: { value: 'blue square' },
        });

        expect(screen.getByText('You Won')).toBeInTheDocument();
    });
});
