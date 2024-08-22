import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Chimptest from './Chimptest';

describe('Chimptest', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="tiles"></div>';
    });

    it('should generate random tiles on load', () => {
        render(<Chimptest />);
        expect(document.querySelectorAll('.tile').length).toBe(4);
    });

    it('should handle correct tile clicks', () => {
        render(<Chimptest />);
        const tiles = document.querySelectorAll('.tile');
        fireEvent.click(tiles[0]);
        expect(tiles[0].style.backgroundColor).toBe('transparent');
    });

    it('should handle incorrect tile clicks and increase strikes', () => {
        render(<Chimptest />);
        const tiles = document.querySelectorAll('.tile');
        fireEvent.click(tiles[1]); // Click wrong tile
        expect(screen.getByText('Strikes: 1/3')).toBeInTheDocument();
    });

    it('should trigger game over after 3 strikes', () => {
        render(<Chimptest />);
        const tiles = document.querySelectorAll('.tile');
        fireEvent.click(tiles[1]);
        fireEvent.click(tiles[1]);
        fireEvent.click(tiles[1]);
        expect(screen.getByText('Game Over')).toBeInTheDocument();
    });

    it('should reset the game on "Try Again" click', () => {
        render(<Chimptest />);
        const tiles = document.querySelectorAll('.tile');
        fireEvent.click(tiles[1]);
        fireEvent.click(tiles[1]);
        fireEvent.click(tiles[1]);

        fireEvent.click(screen.getByText('Try Again?'));
        expect(screen.getByText('Strikes: 0/3')).toBeInTheDocument();
    });
});
