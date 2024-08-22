import { describe, it, expect, vi, fireEvent } from 'vitest';
import { render, screen } from '@testing-library/react';
import Game1 from './Game1';

describe('Game1', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="dino" style="top: 150px"></div>
            <div id="cactus" style="left: 200px; animation-play-state: running;"></div>
        `;
    });

    it('should trigger jump on keydown', () => {
        render(<Game1 />);
        fireEvent.keyDown(document, { key: ' ' });
        const dino = document.getElementById('dino');
        expect(dino.classList.contains('jump')).toBe(true);
    });

    it('should detect collision and set game over', () => {
        render(<Game1 />);
        const cactus = document.getElementById('cactus');
        cactus.style.left = '100px';
        const dino = document.getElementById('dino');
        dino.style.top = '140px';

        // let collision detection run
        vi.advanceTimersByTime(100);

        expect(screen.getByText('Game Over. Play again.')).toBeInTheDocument();
        expect(cactus.style.animationPlayState).toBe('paused');
    });

    it('should restart game when game over button is clicked', () => {
        render(<Game1 />);
        fireEvent.keyDown(document, { key: ' ' });
        const cactus = document.getElementById('cactus');
        cactus.style.left = '100px';
        const dino = document.getElementById('dino');
        dino.style.top = '140px';

        // trigger game over
        vi.advanceTimersByTime(100);

        fireEvent.click(screen.getByText('Game Over. Play again.'));

        expect(window.location.reload).toHaveBeenCalled();
    });
});
