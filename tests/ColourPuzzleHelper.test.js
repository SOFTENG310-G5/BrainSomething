import { describe, it, beforeEach, expect, vi } from 'vitest';
import ColourPuzzleHelper from './frontend/src/components/ColourPuzzleHelper';

describe('ColourPuzzleHelper', () => {
    let helper;

    beforeEach(() => {
        helper = new ColourPuzzleHelper();
    });

    it('should return an array of [1, 2, 3, 4] in random order', () => {
        const orderArray = helper.getRandomOrderArray();
        expect(orderArray).toHaveLength(4);
        expect(new Set(orderArray)).toEqual(new Set([1, 2, 3, 4]));
        expect(orderArray.sort()).toEqual([1, 2, 3, 4]);
    });

    it('should return an array of 4 random shapes', () => {
        const shapes = helper.getRandomShapes();
        expect(shapes).toHaveLength(4);
        shapes.forEach(shape => {
            expect(helper.shapes).toContain(shape);
        });
    });

    it('should return an array of 4 random colours', () => {
        const colours = helper.getRandomColours();
        expect(colours).toHaveLength(4);
        colours.forEach(colour => {
            expect(helper.colours).toContain(colour);
        });
    });

    it('should return an array of 4 random shades', () => {
        const shades = helper.getRandomShades();
        expect(shades).toHaveLength(4);
        shades.forEach(shade => {
            expect(helper.shades).toContain(shade);
        });
    });

    it('should return an array of 2 random questions', () => {
        const questions = helper.getRandomQuestions();
        expect(questions).toHaveLength(2);
        questions.forEach(question => {
            expect(helper.questions).toContain(question);
        });
    });

    it('should return the correct color name for a given hex value', () => {
        const colorName = helper.getColorName("#ffffff");
        expect(colorName).toBe("white");

        const anotherColorName = helper.getColorName("#1291db");
        expect(anotherColorName).toBe("blue");
    });

    it('should return a random array of specified length from the given array', () => {
        const items = ['item1', 'item2', 'item3', 'item4', 'item5'];
        const randomItems = helper.getRandomItems(items, 3);
        expect(randomItems).toHaveLength(3);
        randomItems.forEach(item => {
            expect(items).toContain(item);
        });
    });

    it('should start a timer and call the callback after the specified time', () => {
        const callback = vi.fn();
        vi.useFakeTimers();
        helper.startTimer(5, callback);
        vi.advanceTimersByTime(5000);
        expect(callback).toHaveBeenCalled();
        vi.useRealTimers();
    });
});
