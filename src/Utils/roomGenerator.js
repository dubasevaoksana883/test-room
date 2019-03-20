import React, { Component } from 'react';

let roomGenerate = (rows, places) => {
    let res = []
    let i = 1
    let j = 1
    let ids = 1
    while(i <= rows){
        while(j <= places ){
            res.push({
                id: ids++,
                row: i,
                place: j++,
                flag: Math.random() < 0.2
            })
        }
        j = 1
        i++
    }
    return res
}
export default roomGenerate
