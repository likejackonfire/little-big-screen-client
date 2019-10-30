import React, { memo, PureComponent } from 'react'

export const InputGroup = memo(({ labelFor, labelText, inputType, inputClass, inputName, inputID, inputValue, onChange, inputPlaceholder }) => {
  return (
    <p>
      <label htmlFor={labelFor} className="flex pv2">{labelText} <Required /></label>
      <input type={inputType} name={inputName} placeholder={inputPlaceholder} value={inputValue} onChange={onChange} id={inputID} className={`ba b--black-20 pa2 mb2 ${inputClass}`} required />
    </p>
  )
})

export function Required({ className, ...props }) {
  return (
    <span className={['red', className].join(' ')} {...props}>
      &#42;
    </span>
  )
}

export class ShowError extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      return <h2>Could not display show. :(</h2>
    } else {
      return children
    }
  }
}

export const ValidationError = memo(({ message }) => {
  return (
    <span className="red">
      <p>{message}</p>
    </span>
  )
})