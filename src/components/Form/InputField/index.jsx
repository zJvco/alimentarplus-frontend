import React from 'react'
import styled from 'styled-components'
import InputErrorMessage from '../InputErrorMessage'

const InputField = React.forwardRef(({
  label,
  value,
  placeholder,
  type,
  onChange,
  className,
  id,
  name,
  marginLeft,
  disable=false,
  error,
  numberDecimal,
  numberMin,
  numberMax
}, ref) => {
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
        ref={ref}
        step={numberDecimal}
        min={numberMin}
        max={numberMax}
      />
      {error && <InputErrorMessage error={error} />}
    </Container>
  )
})

const Input = styled.input`
  border: 1px solid ${props => props.theme.colors.borderColor};
  padding: 10px;
  outline: none;
  border-radius: 5px;
  margin: 10px 0 0 0;
  width: 100%;
  max-height: 40px;

  &:disabled {
    cursor: not-allowed;
  }

  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
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