import React from 'react'
import styled from 'styled-components'
import { FaImage } from 'react-icons/fa6'
import { useState } from 'react'
import CloseButton from '../../CloseButton'
import { useEffect } from 'react'

function AttachField({
    id,
    label,
    multipleFiles=false,
    marginLeft
}) {
    const [files, setFiles] = useState([])

    const handleAddedFile = (e) => {
        const { files: inputFiles } = e.target

        for (let i = 0; i < inputFiles.length; i++) {
            setFiles((prev) => [...prev, inputFiles[i]])
        }
    }

    const handleRemoveFile = (fileName) => {
        setFiles(files.filter(file => file.name !== fileName))
    }

    useEffect(() => {
        console.log(files)
    }, [files])

    return (
        <Container style={{ marginLeft: marginLeft }}>
            {label && <Title>{label}</Title>}
            <Label htmlFor={id}>
                <Input type='file' id={id} onChange={handleAddedFile} multiple={multipleFiles} />

                <Content>
                    <FaImage style={{ fontSize: "40px" }} />
                    <Text>Anexar arquivo</Text>
                </Content>
            </Label>
            <FileDisplayList>
                {files.map((file, index) => {
                    return (
                        <FileDisplayRow key={index}>
                            <FileDisplayLeftContainer>
                                <FaImage />
                                <FileDisplayName>{file.name}</FileDisplayName>
                            </FileDisplayLeftContainer>

                            <CloseButton style={{ fontSize: "15px" }} onClick={() => handleRemoveFile(file.name)} />
                        </FileDisplayRow>
                    )
                })}
            </FileDisplayList>
        </Container>
    )
}

const Input = styled.input`
    display: none;
`

const Label = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
    margin: 5px 0;
    border: 1px solid ${props => props.theme.colors.borderColor};
    cursor: pointer;
    color: ${props => props.theme.colors.borderColor};
    border-radius: 5px;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Text = styled.span`
    border: 1px solid ${props => props.theme.colors.borderColor};
    border-radius: 5px;
    padding: 5px 10px;
    margin: 10px 0;
`

const Container = styled.div`
    width: 100%;
`

const Title = styled.label`

`

const FileDisplayList = styled.ul`

`

const FileDisplayRow = styled.li`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.theme.colors.borderColor};
    border-radius: 5px;
    padding: 5px 8px;
    margin: 10px 0;

`

const FileDisplayName = styled.span`
    margin: 0 10px;
`

const FileDisplayLeftContainer = styled.div`
    display: flex;
    align-items: center;
`

export default AttachField