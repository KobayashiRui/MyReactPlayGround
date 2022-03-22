import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import {textState} from './Atom'
import CharacterCount from './CharacterCount'


export function CharacterCounter() {
    return (
      <div>
        <TextInput />
        <CharacterCount />
      </div>
    );
}
  
function TextInput() {
      const [text, setText] = useRecoilState(textState);
  
  const onChange = (event:any) => {
        setText(event.target.value);
  };
  
  return (
        <div>
          <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );}