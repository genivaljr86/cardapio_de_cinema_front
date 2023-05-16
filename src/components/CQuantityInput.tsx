import { InputNumber, InputNumberProps } from "antd"

interface QuantityProps extends InputNumberProps {
  quantity: number,
  index?: number,
  handleOnChange: Function
}
const CQuantityInput: React.FC<QuantityProps> = (params) => {
  let { quantity, index, handleOnChange } = params;

  return (
    <InputNumber
      // @todo: Looking ways to transfering props without firing warnings
      // {...params}
      value={quantity}
      autoFocus={true}
      onBlur={(e) => {
        if (e.target.value === '') {
          handleOnChange(1, index)
        }
      }}
      min={0}
      onKeyPress={(e) => !/^[0-9]+$/.test(e.key) && e.preventDefault()}
      onChange={(value) => handleOnChange(value!, index)} />
  )
}

export default CQuantityInput