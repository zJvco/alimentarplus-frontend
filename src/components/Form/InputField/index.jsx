import React from 'react'
import styled from 'styled-components'

function InputField({
  label,
  value,
  placeholder,
  type,
  onChange,
  className,
  id,
  name,
  marginLeft,
  disable=false
}) {
  return (
    <Container
      style={{ marginLeft: marginLeft }}
    >
      {label && <Label htmlFor={id}>{label}</Label>}

      <Input
        placeholder={placeholder}
        defaultValue={value}
        type={type}
        onChange={onChange}
        className={className}
        id={id}
        name={name}
        disabled={disable}
      />
    </Container>
  )
}

const Input = styled.input`
  border: 1px solid ${props => props.theme.colors.borderColor};
  padding: 10px;
  outline: none;
  border-radius: 5px;
  margin: 10px 0;
  width: 100%;
  max-height: 40px;

  &:disabled {
    cursor: not-allowed;
  }
`

const Label = styled.label`
  display: block;
`

const Container = styled.div`
  width: 100%;
  margin: 5px 0;
`

export default InputField