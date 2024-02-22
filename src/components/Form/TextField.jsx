import React from 'react'
import styled from 'styled-components'
import InputErrorMessage from './InputErrorMessage'

function TextField({
  label,
  value,
  placeholder,
  type,
  onChange,
  className,
  id,
  name,
  rows,
  cols,
  error
}) {
  return (
    <Container>
      {label && <Label htmlFor={id}>{label}</Label>}

      <TextArea
        placeholder={placeholder}
        defaultValue={value}
        type={type}
        onChange={onChange}
        className={className}
        id={id}
        name={name}
        rows={rows}
        cols={cols}
      />

      {error && <InputErrorMessage error={error} />}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin: 5px 0;
`

const Label = styled.label`
  display: block;
`

const TextArea = styled.textarea`
  display: flex;
  border: 1px solid ${props => props.theme.colors.borderColor};
  padding: 10px;
  outline: none;
  border-radius: 5px;
  margin: 10px 0 0 0;
  width: 100%;
`

export default TextField