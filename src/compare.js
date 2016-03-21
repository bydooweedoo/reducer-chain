import R from 'ramda';

export const useFirstAsInitialCustomEquals = equals => initial => {
    let first = true;

    return (previous, current) => {
        if (first === true) {
            initial = current;
            first = false;
            return initial;
        }
        if (current && equals(initial, current) === false) {
            return current;
        } else {
            return previous;
        }
    };
};

export const useFirstAsInitial = useFirstAsInitialCustomEquals(R.equals);

export const compareWithPrevious = initial => (previous, current) => {
    if (current && current !== previous) {
        return current;
    } else {
        return previous;
    }
};
