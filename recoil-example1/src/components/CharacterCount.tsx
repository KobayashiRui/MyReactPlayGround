import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import {textState} from './Atom'

const charCountState = selector({
    key: 'charCountState', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const text = get(textState);
  
      return text.length;
    },
  });

export default function CharacterCount() {
    const count = useRecoilValue(charCountState);
  
    return <>Character Count: {count}</>;
  }