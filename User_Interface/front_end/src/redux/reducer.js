import { DL } from '../shared/DL';
import { NLP } from '../shared/NLP';
import { ML } from '../shared/ML';
import { SW } from '../shared/SW';


export const initialState = {
    dl: DL,
    nlp: NLP,
    ml: ML,
    sw: SW
};

export const Reducer = (state = initialState, action) => {
    return state;
};