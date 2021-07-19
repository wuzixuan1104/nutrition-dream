import pipe from 'ramda/src/pipe';
import keys from 'ramda/src/keys';
import length from 'ramda/src/length';

const size = pipe(keys, length);

export default size;