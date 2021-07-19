import { store } from 'data/store';
import forEachObjIndexed from 'ramda/src/forEachObjIndexed';
import { JKObject } from './interface/common';

import { actions } from './slice';

const redux: JKObject = {};
forEachObjIndexed((f, k) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  redux[k] = (args: any) => store.dispatch(f(args));
}, actions);

export default redux;
