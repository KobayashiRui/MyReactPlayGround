import {atom, atomFamily, selector} from 'recoil'
import { v4 as uuidv4 } from 'uuid';

export const columnData = atom<any[]>({
    key: 'matrixColumn',
    default: []
})

export const columnSelector = selector<any>({
    key: 'columnSelector',
    get: ({get}:any) => (get(columnData)),
    set: ({get, set}:any, setValue:any) =>{
        const prev_column = get(columnData)
        const new_column_data = [...prev_column, setValue]
        set(columnData, new_column_data)
        //matrix Dataの追加
        //行データの量を確認
        const prev_matrix_data = get(matrixData)
        if(prev_matrix_data != undefined){
            const new_matrix_data = [...prev_matrix_data]

            const rows = get(rowData)
            rows.forEach((row:any, ri:number)=>{
                const new_in_data_uuid = uuidv4()
                const new_row = [...new_matrix_data[ri]]
                new_row.push(new_in_data_uuid)
                new_matrix_data[ri] = new_row
                set(mInData(new_in_data_uuid), {data:"a"})
            })
            console.log(prev_matrix_data)
            set(matrixData, new_matrix_data)
            
        }
    }
})

export const rowData = atom<any[]>({
    key: 'matrixRow',
    default: []
})

export const rowSelector = selector<any>({
    key: 'rowSelector',
    get: ({get}:any) => (get(rowData)),
    set: ({get, set}:any, setValue:any) =>{
        const prev_row = get(rowData)
        set(rowData, [...prev_row, setValue])
        //matrix Dataの追加

        //列データを確認
        const cols= get(columnData)
        let prev_matrix_data:any[]|undefined = get(matrixData)
        if(prev_matrix_data == undefined){
            prev_matrix_data = []
        }
        const new_row_data:any[] = []
        cols.forEach((col:string)=>{
            const new_in_data_uuid = uuidv4()
            new_row_data.push(new_in_data_uuid)
            set(mInData(new_in_data_uuid), {data:"a"})
        })

        set(matrixData, [...prev_matrix_data, new_row_data])
    }
})

export const mInData = atomFamily<any, string>({
    key: "mInData",
    default: {
        data:"hoge"
    }
})

export const matrixData = atom<any[]>({
    key: 'matrixData',
    default: undefined,
})

export const matrixSelector = selector({
    key: 'matrixDataSelector',
    get: ({get})=>{
        const md = get(matrixData)
        if(md === undefined){
            return undefined
        }
        const new_data = md.map((row_data)=>{
            return row_data.map((data_id:any)=>{
                const item_data =get(mInData(data_id))
                console.log(item_data)
                return {...item_data, id:data_id}
            })
        })
        console.log(new_data)

        return new_data
    },
    set: ({set}) =>{
        console.log("SET")
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