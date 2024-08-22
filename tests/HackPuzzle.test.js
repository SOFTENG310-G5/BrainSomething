import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HackPuzzle from './HackPuzzle';
import ColourPuzzleHelper from './ColourPuzzleHelper';

vi.mock('./ColourPuzzleHelper', () => {
    return {
        __esModule: true,
        default: vi.fn().mockImplementation(() => ({
            getRandomShades: vi.fn(() => ["#ffffff", "#000000", "#ff0000", "#00ff00"]),
            getRandomShapes: vi.fn(() => ["circle", "square", "triangle", "rectangle"]),
            getRandomColours: vi.fn(() => ["red", "green", "blue", "yellow"]),
            getRandomOrderArray: vi.fn(() => [1, 2, 3, 4]),
            getRandomQuestions: vi.fn(() => ["background-colour", "shape-type"]),
            getColorName: vi.fn(hex => {
                const colors = {
                    "#ffffff": "white",
                    "#000000": "black",
                    "#ff0000": "red",
                    "#00ff00": "green",
                };
                return colors[hex];
            }),
        })),
    };
});

describe('HackPuzzle', () => {
    const mockSolutionCalculated = vi.fn();

    beforeEach(() => {
        mockSolutionCalculated.mockClear();
    });

    it('should calculate the correct solution and call onSolutionCalculated', () => {
        render(<HackPuzzle onSolutionCalculated={mockSolutionCalculated} randomOrderArray={[1, 2, 3, 4]} />);

        expect(mockSolutionCalculated).toHaveBeenCalledTimes(1);
        expect(mockSolutionCalculated).toHaveBeenCalledWith("white square");
    });

    it('should render the correct questions based on randomQuestions', () => {
        render(<HackPuzzle onSolutionCalculated={mockSolutionCalculated} randomOrderArray={[1, 2, 3, 4]} />);

        expect(screen.getByText(/background-colour\(1\) and shape-type\(2\)/)).toBeInTheDocument();
    });
});
