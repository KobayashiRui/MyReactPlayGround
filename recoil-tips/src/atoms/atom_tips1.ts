import {atom, atomFamily, selector} from 'recoil'

export const columnData = atom<any[]>({
    key: 'matrixColumn',
    default: [],
    effects: [
      ({onSet}) => {
        onSet(newID => {
          console.debug("Current user ID:", newID);
        });
      },
    ],
})

export const rowData = atom<any[]>({
    key: 'matrixRow',
    default: []
})

export const matrixData = atom<any[]>({
    key: 'matrixData',
    default: []
})

export const mInData = atomFamily<any, string>({
    key: "mInData",
    default: {
        data:"hoge"
    }
})

export const rowIndex = atom<number>({
    key: 'rowIndex',
    default: 0
})

export const columnIndex = atom<number>({
    key: 'columnIndex',
    default: 0
})

//export const matrixSelector = selector<any>({
//    key: "matrixSelector",
//
//
//
//})