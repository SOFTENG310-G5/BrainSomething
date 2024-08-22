import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ColourPuzzleInfo from './ColourPuzzleInfo';

describe('ColourPuzzleInfo', () => {
    it('should render initial puzzle display time', () => {
        render(
            <BrowserRouter>
                <ColourPuzzleInfo />
            </BrowserRouter>
        );
        expect(screen.getByText('10s')).toBeInTheDocument();
    });

    it('should change selected time on button click', () => {
        render(
            <BrowserRouter>
                <ColourPuzzleInfo />
            </BrowserRouter>
        );

        const button5s = screen.getByText('5s');
        fireEvent.click(button5s);

        expect(button5s).toHaveClass('selected');
    });

    it('should link to the correct start URL', () => {
        render(
            <BrowserRouter>
                <ColourPuzzleInfo />
            </BrowserRouter>
        );

        expect(screen.getByText('Play').closest('a')).toHaveAttribute('href', 'start?time=10');
    });
});
