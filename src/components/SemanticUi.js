import React from 'react'
import {
  Form,
  Input,
  Label,
  Select,
  TextArea
} from 'semantic-ui-react'

import MaskedInput from 'react-text-mask'

export const SemanticTextAreaFormField = ({ input, label, required, meta: { touched, error, warning }, ...rest }) => {
  return (
    <Form.Field error={!!(touched && error)}>
      <label>{label}</label>
      <TextArea required={required} {...input} {...rest} value={input.value} />
      {touched && (error || warning) ? <Label basic color='red' pointing>{error || warning}</Label> : null}
    </Form.Field>
  )
}

export const SemanticMaskedPriceFormField = ({ input, label, placeholder, mask, meta: { touched, error, warning }, ...props }) => {
  return (
    <Form.Field error={!!(touched && error)}>
      <label>{label}</label>
      <Input labelPosition='left'>
        <Label basic>R$</Label>
        <MaskedInput
          {...props}
          {...input}
          value={input.value}
          mask={mask}
          placeholder={placeholder} />
      </Input>
      {touched && (error || warning) ? <Label basic color='red' pointing>{error || warning}</Label> : null}
    </Form.Field>
  )
}

export const SemanticMaskedFormField = ({ input, label, placeholder, mask, meta: { touched, error, warning }, ...props }) => {
  return (
    <Form.Field error={!!(touched && error)}>
      <label>{label}</label>
      <Input
        children={
          <MaskedInput
            {...props}
            {...input}
            value={input.value}
            mask={mask}
            placeholder={placeholder} />}
      />
      {touched && (error || warning) ? <Label basic color='red' pointing>{error || warning}</Label> : null}
    </Form.Field>
  )
}

export const SemanticFormField = ({ input, label, placeholder, meta: { touched, error, warning }, ...props, onBlur }) => {
  return (
    <Form.Field error={!!(touched && error)}>
      <label>{label}</label>
      <Input
        {...props}
        {...input}
        placeholder={placeholder}
        onBlur={onBlur || input.onBlur} />
      {touched && (error || warning) ? <Label basic color='red' pointing>{error || warning}</Label> : null}
    </Form.Field>
  )
}

export const SemanticSelectFormField = ({
  input,
  label,
  required,
  width,
  inline,
  options,
  meta: { touched, error, warning },
  ...custom }) => (
    <Form.Field error={!!(touched && error)}>
      {label && <label>{label}</label>}
      <Select
        search
        value={input.value}
        required={required}
        options={options}
        onChange={(event, data) => input.onChange(data.value)}
        {...custom}
        />
      {touched && (error || warning) ? <Label basic color='red' pointing>{error || warning}</Label> : null}
    </Form.Field>
  )