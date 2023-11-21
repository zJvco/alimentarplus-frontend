import React from 'react'
import styled from 'styled-components'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import CircularLoader from '../CircularLoader'

function DataTable({
    header,
    data,
    margin,
    isLoading,
    additionalHTML
}) {
    const [isCheckedAll, setIsCheckedAll] = useState(false)
    const [checkedList, setCheckedList] = useState([])

    const handleCheckedAll = (e) => {
        setIsCheckedAll(!isCheckedAll)
        setCheckedList(data.map((item, index) => index.toString()))

        if (isCheckedAll) {
            setCheckedList([])
        }
    }

    const handleCheckedClick = (e) => {
        const { id, checked } = e.target
        
        setCheckedList([...checkedList, id])
        
        if (!checked) {
            setCheckedList(checkedList.filter(item => item !== id))
        }
    }

    useEffect(() => {
        if (checkedList.length === 0) {
            setIsCheckedAll(false)
        }
    }, [checkedList])

    return (
        <Table style={{ margin: margin }}>
            <TableThead>
                <TableRow>
                    <Checkbox
                        sx={{
                            color: "#CCCCCC",
                            '&.Mui-checked': {
                                color: "#0097B2"
                            }
                        }}
                        checked={isCheckedAll}
                        onClick={handleCheckedAll}
                    />
                    {header.map(item => {
                        return <TableHeader>{item}</TableHeader>
                    })}
                </TableRow>
            </TableThead>
            
            <TableTbody>
                { isLoading ? (
                    <TableRow>
                        <TableData colSpan="10">
                            <CircularLoader />
                        </TableData>
                    </TableRow>
                ) : (
                    <>
                        {data.map((object, index) => {
                            return (
                                <TableRow>
                                    <TableData>
                                        <Checkbox
                                            id={index.toString()}
                                            sx={{
                                                color: "#CCCCCC",
                                                '&.Mui-checked': {
                                                    color: "#0097B2"
                                                }
                                            }}
                                            checked={checkedList.includes(index.toString())}
                                            onClick={handleCheckedClick}
                                        />
                                    </TableData>

                                    {Object.keys(object).map(item => {
                                        return (
                                            <>
                                                <TableData>{object[item]}</TableData>
                                            </>
                                        )
                                    })}

                                </TableRow>
                            )
                        })}
                    </>
                )}
            </TableTbody>

        </Table>
    )
}

const Table = styled.table`
    width: 100%;
    text-align: left;
    padding: 20px;
`

const TableThead = styled.thead`
`

const TableTbody = styled.tbody`
`

const TableRow = styled.tr`

`

const TableHeader = styled.th`

`

const TableData = styled.td`

`


export default DataTable