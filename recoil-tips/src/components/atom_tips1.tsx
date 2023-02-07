import { useEffect } from 'react';
import {atom, selector, useRecoilState, useRecoilValue,DefaultValue, useResetRecoilState} from 'recoil';


import { columnSelector, rowSelector, matrixSelector} from "../atoms/atom_tips1"
import { useState } from 'react';

export default function AtomTips1() {

    const [columns, setColumns] = useRecoilState(columnSelector)
    const [new_col, set_col] = useState<string>("")

    const [rows, setRows] = useRecoilState(rowSelector)
    const [new_row, set_row] = useState<string>("")

    const matrix = useRecoilValue(matrixSelector)

    useEffect(()=>{

        console.log(matrix)

    }, [])

    const add_column = ()=>{
        setColumns(new_col)
    }

    const add_row = ()=>{
        setRows(new_row)
    }

    const get_matrix = () =>{
        console.log(matrix)
    }

    return (
        <div>
            <h1>Atomを使った行列形式のデータの管理</h1>
            <p>行列形式のデータの中にobjectのデータが入っている</p>
            <div>
                <p>列: {columns.toString()}</p>
                <p>列の追加</p>
                <input value={new_col} onChange={(e)=>set_col(e.target.value)}></input>
                <button onClick={add_column}>Add Column</button>
            </div>
            <div>
                <p>行: {rows.toString()}</p>
                <p>行の追加</p>
                <input value={new_row} onChange={(e)=>set_row(e.target.value)}></input>
                <button onClick={add_row}>Add Column</button>
            </div>
            <button onClick={get_matrix}>Get Matrix</button>
        </div>
    )
}